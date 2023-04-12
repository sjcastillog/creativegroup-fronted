import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import { 
            Avatar,
            Button,
            Card,
            CardContent,
            CardHeader,
            CardMedia,
            CircularProgress,
            Dialog,
            DialogActions,
            Fab,
            FormControlLabel,
            FormGroup,
            Grid,
            IconButton,
            InputAdornment,
            Paper,
            Switch,
            TextField,
            Tooltip,
            Typography
        } from '@material-ui/core';
/***************************************ICONOS************************************/
import { 
         Check as CheckIcon,
         Delete as DeleteIcon,
         Lock as LockIcon,
         PictureAsPdf as PdfIcon,
         Refresh as RefreshIcon,
         Save as SaveIcon,
         Search as SearchIcon, 
        } from '@material-ui/icons';
/*********************************************************************************/
import { green } from '@material-ui/core/colors';
import { useAuth } from "./Auth";
import { SnackbarProvider, useSnackbar } from 'notistack';
//import ITCAvant from '../public/fonts/ITCAvantGardePro-Md.ttf'
import clsx from 'clsx';
import Viewer from 'react-viewer';
import FacebookCircularProgress from './Elementos/FacebookCircularProgress';

const RepContext = createContext();

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
      top:-10
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }));

const RepIn = (props)=>{
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [ Locales, setLocales ] = useState([]);
    const [ isSearch, setSearch ] = useState(false);
    const [ data, setData ] = useState({});
    const [ lisInst, setListInst ] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ isCharged, setCharged ] = useState(false);
    const [ isPdf, setPdf ] = useState(false);
    const [ isNew, setNew ] = useState(true);
    const [ continuoSave, setContinuoSave ] = useState(false);
    const [ showReset, setShowReset ] = useState(false);
    const timer = useRef();
    const { setHeaderWord } = useAuth();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const [ openDialogDelete, setOpenDialogDelete ] = useState(false);

    useEffect(
        ()=>{
            isSearch && ( 
                fetch('/ListadoInstalaciones',{
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{'Content-Type':'application/json'}
                })
                .then(res=>res.json())
                .then(result=>{
                    console.log('ListadoInstalaciones');
                    console.log(result);
                    fetch('/fetch_SearchCrono',{
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{'Content-Type':'application/json'}
                    })
                    .then(res2=>res2.json())
                    .then(result2=>{
                        console.log('fetch_SearchCrono');
                        console.log(result2);
                        if(!isNew){
                            setPdf(true);
                        }
                        const objeto = {...result2};
                        objeto.titulo = objeto.proyecto;
                        console.log(objeto);
                        setData(objeto);
                        setLocales(result);
                        setSearch(false);
                        setCharged(true);
                    })
                    
                })
            )
        },[isSearch]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
        ()=>{
            lisInst && ( 
                fetch('/ListadoInstalaciones',{
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{'Content-Type':'application/json'}
                })
                .then(res=>res.json())
                .then(result=>{     
                    console.log('ListadoInstalaciones');           
                    if(result.length === Locales.length){
                        console.log('result.length === Locales.length'); 
                        //console.log(result);
                        if(!isNew){
                            setPdf(true);
                        }
                    }else{
                        console.log('result.length != Locales.length'); 
                        const arr = Locales;
                        const arr2 = [];
                        arr.forEach(value=>{
                            if(value.isReport){
                                arr2.push(value);
                            }
                        });
                        result.forEach(value=>{
                            if(!value.isReport){
                                arr2.push(value);
                            }
                        });
                        setLocales(arr2);
                        if(!isNew){
                            setPdf(true);
                        }
                    }
                })
            )
        },[lisInst]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        setHeaderWord('Instalación/Reporte');
        return () => {
          clearTimeout(timer.current);
        };
    }, []// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
        ()=>{
            if(continuoSave){
                const objeto = {};
                objeto.numpro = data.numpro;
                objeto.numot = data.numot ? data.numot : 0;
                objeto.cliente = data.cliente;
                objeto.coordinador = data.coordinador;
                objeto.ejecutiva = data.ejecutiva;
                objeto.fecCreRep = new Date();
                objeto.titulo = data.titulo;
                objeto.proyecto = data.proyecto;
                objeto.items = Locales;
                objeto.Title = data.Title ? data.Title : false;
                objeto.fecCreRep = new Date();
                console.log('fetch_SaveRepIns');
                fetch('/fetch_SaveRepIns',{
                    method: 'POST',
                    body: JSON.stringify(objeto),
                    headers:{'Content-Type':'application/json'}
                })
                .then(res=>res.json())
                .then(result=>{
                    if(result.message){ 
                        console.log('result.message');
                        enqueueSnackbar(result.message,{variant:'success'});
                        setSuccess(true);
                        setLoading(false);
                        setShowReset(true);
                        if(!isNew){
                            setPdf(true);
                        }
                        setContinuoSave(false);
                        timer.current = window.setTimeout(() => {
                            setSuccess(false);
                            setLoading(false);
                        }, 4000);
                    }else{ 
                        console.log('result.status');
                        enqueueSnackbar(result.status,{variant:'error'});
                        console.log(result.status);
                    } 
                })
            }
        },[continuoSave] // eslint-disable-line react-hooks/exhaustive-deps
    );


    const HandleSearch = ()=>{
        if (data.numpro === '' || !data.numpro){
            console.log('Debe ingresar un Numero de Presupuesto para poder realizar la busqueda!');
            enqueueSnackbar('Debe ingresar un Numero de Presupuesto para poder realizar la busqueda!',{variant:'error'});
          }else{
        console.log('fetch_SearchRepIns');
        fetch('/fetch_SearchRepIns',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            if(result === null){ 
                console.log('result===null');
                setSearch(true);
                setNew(true);
                setShowReset(true);
            }else{
                console.log('result!=null');
                setNew(false);
                setCharged(true);
                setData(result);
                setShowReset(true);
                setLocales(result.items);
                setListInst(true);
            } 
        })
    }
        
    };

    const HandleSave = ()=>{
        if(!isCharged){
            enqueueSnackbar('No ha ingresado Informacion',{variant:'error'});
        }else{
            console.log('HandleSave');
            setNew(false);
            setPdf(false);
            setSuccess(false);
            setLoading(true);
            setContinuoSave(true);
        }
    };

    const HandleChange = (e)=>{
        console.log('HandleChange');
        setData({...data, [e.target.name]:e.target.value});
    };

    const HandleChangeChecked = (e)=>{
        console.log('HandleChangeChecked');
        setData({...data, [e.target.name]:e.target.checked});
    };

    const HandleClear = ()=>{
        console.log('HandleClear');
        setPdf(false);
        setTimeout(()=>{
            setLocales([]);
            setSearch(false);
            setData({});
            setListInst(false); 
            setLoading(false);
            setSuccess(false);
            setCharged(false);
            setNew(true);
            setShowReset(false);
            setContinuoSave(false);
        },3000)
    };

    const HandleDeleteReporte = ()=>{
        setOpenDialogDelete(false);
        fetch('/fetch_DeleteRepIns',{
            method: 'DELETE',
            body: JSON.stringify({numpro:data.numpro}),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.message){
                enqueueSnackbar(result.message,{variant:'success'});
                HandleClear();
            }else{
                enqueueSnackbar(result.status,{variant:'error'});
            }
        });
        
    };

    const HandleOpenDialogDelete = () =>{
        setOpenDialogDelete(true);
    };

    const HandleCloseDialogDelete = () =>{
        setOpenDialogDelete(false);
    };


    return( 
    <React.Fragment>
    <Dialog
        open={openDialogDelete}
        onClose={HandleCloseDialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='sm'
      >
        <div style={{width:'100%', textAlign:'center',height:100, marginTop:20}} >  
            <Typography variant="h5" color='primary' gutterBottom>
              ¿Desea Eliminar este Reporte?
            </Typography>
        </div>
        <DialogActions style={{width:'100%',height:60}}>
          <Grid container justify='center' spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleCloseDialogDelete} fullWidth variant="contained" color='secondary'>
                NO
              </Button>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleDeleteReporte} fullWidth color="primary" variant="contained" autoFocus>
                SI
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
        <Grid container justify='center'>
            <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                <Paper>
                    <Grid container justify='center' spacing={3} style={{padding:10}}>
                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12} >
                            <TextField 
                                id="numpro"                                
                                variant="outlined"
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                      <LockIcon />
                                    </InputAdornment>
                                  ),
                                  endAdornment:(
                                    <IconButton onClick={HandleSearch} >
                                      <SearchIcon />
                                    </IconButton>
                                )}}
                                name='numpro'
                                value={data.numpro || ''}
                                onChange={HandleChange}
                                onKeyPress={(e)=>{
                                const code = e.keyCode || e.which;
                                if(code === 13)
                                    HandleSearch();
                                }}
                            />
                        </Grid>
                        <Grid item xl={9} lg={9} md={9} sm={12} xs={12} >
                                <Grid container>
                                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                                        <div className={classes.wrapper}>
                                            <Fab
                                                aria-label="save"
                                                color="primary"
                                                className={buttonClassname}
                                                onClick={HandleSave}
                                            >
                                                {success ? <CheckIcon /> : <SaveIcon />}
                                            </Fab>
                                            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                                        </div>
                                    </Grid>
                                    {
                                        isPdf && 
                                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                                         <Pdf data={data} Locales={Locales} />
                                         </Grid>
                                    }
                                    {
                                        !isNew &&
                                            <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                                                <Fab
                                                    aria-label="save"
                                                    color="secondary"
                                                    className={buttonClassname}
                                                    onClick={HandleOpenDialogDelete}
                                                >
                                                    <DeleteIcon style={{color:'#fff'}}/>
                                                </Fab>                                          
                                            </Grid>
                                    }
                                    {
                                        showReset &&
                                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                                            <Fab onClick={HandleClear}>
                                                <RefreshIcon />
                                            </Fab>
                                        </Grid>
                                    }
                                </Grid>
                        </Grid>
                        {
                            isCharged && (
                                <React.Fragment>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{alignSelf:'center', padding:5}}>
                                            <Card style={{padding:10}} >
                                                <CardHeader
                                                        title='Portada'
                                                />
                                                <CardContent>
                                                    <Grid container>
                                                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>                                 
                                                                <FormControlLabel
                                                                    control={
                                                                    <Switch
                                                                        checked={data.Title || false}
                                                                        onChange={HandleChangeChecked}
                                                                        name="Title"
                                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                    />
                                                                    }
                                                                    label="Titulo"
                                                                />
                                                        </Grid>
                                                        <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                                                            {
                                                                data.Title &&
                                                                <TextField
                                                                    value={data.titulo || ''}
                                                                    onChange={HandleChange}
                                                                    variant='outlined'
                                                                    name='titulo'
                                                                    label='Proyecto'
                                                                    fullWidth
                                                                />   
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <RepContext.Provider value={{setLocales, Locales, enqueueSnackbar, setPdf, isNew, setNew}}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                        {
                                            Locales.map((value, index)=>(
                                                <Vistas value={value}  key={`vista-${index}`}/>
                                            ))
                                        }
                                    </Grid>
                                    </RepContext.Provider>
                                </React.Fragment>
                            )
                        }
                        
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        </React.Fragment>
    )
};

const Pdf = (props)=>{
    const { data, Locales } = props;

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
    });

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
        },
        first:{
            width:842,
            height:595
        },
        image: {
            width:'100%',
            height:'100%',
            objectFit:'container',
            //height:595,
        },
        numprobox: {
            width:70,
            height:40,
            marginTop:-522,
            marginLeft:755,
            textAlign:'center',
        },
        numpro: {
            ontWeight:'extrabold',
            color:'#fff',
            fontSize:22,
        },
        proyectobox: {
            width:550,
            height:100,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginLeft:280,
            marginTop:50
            
        },
        proyecto: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:28,
            alignSelf: 'center'
        },
        clientebox: {
            width:550,
            height:200,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginLeft:280,
        },
        cliente: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:25,
            alignSelf: 'center'
        },
        spacingbox:{
            width:'100%',
            height:132.25,
        },
        FotosBox:{
            width:825,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:40,
            left:10,
        },
        FotoBox:{
            width:274,
            height:399,
            padding:2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
        },
        FotoBoxPanoramicaContainer:{
            width:825,
            height:400,            
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-440,
            marginLeft:10,
        },
        FotoBoxPanoramica:{
            width:425,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            
        },
        Foto:{
            alignSelf:'center',
        },
        FotoTransform:{
            alignSelf:'center',
            transform: 'rotate(90deg)'
        },
        FotosBoxCompleta:{
            width:822,
            height:350,
            padding:2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:40,
            left:10,
        },
        FotoBoxCompleta:{
            width:274,
            height:330,
            padding:2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
        },
        FotosBoxVacio:{
            width:825,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-440,
            marginLeft:10
        },
        ObservBoxCompleta:{
            width:243,
            height:53,            
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:66,
            left:37,
        },
        ObservCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:16,
            alignSelf: 'center'
        },
        CodigoBoxCompleta:{
            width:190,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-574,
            marginLeft:630,
        },
        CodigoCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:14,
            alignSelf: 'center'
        },
        LocalBoxCompleta:{
            width:182,
            height:31,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:9,
            left:632,
        },
        LocalCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:11,
            alignSelf: 'center'
        },
        NotEntBoxCompleta:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:13,
            left:752,
        },
        NotEntCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:11,
            alignSelf: 'center',       
        },
        CodigoBoxVariable:{
            width:190,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            marginTop:-574,
            marginLeft:630,
        },
        LocalBoxVariable:{
            width:182,
            height:31,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:9,
            left:632,
        },
        NotEntBoxVariable:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:13,
            left:752,
        },
        logounit:{
            objectFit:'fill',
            borderRadius:5
        },
        first2:{
            width:842,
            height:597,
        },
        image2: {
            width:'100%',
            height:'100%'
        },
        SpacingBoxCompleta:{
            height:82,
        },
        SpacingBoxVariable:{
            height:85,
        },
        SpacingBoxVacio:{
            height:38,
        },
        SpacingBoxPanoramico:{
            height:38,
        },
    });
    
    const Puntos = Locales.map((value, index)=>{
        if(value.Panoramica ){
            return(
                <React.Fragment key={value._id}>
                        <View key={value._id}>
                        { value.Visual.vacio && (
                            <>
                                <View style={styles.first2} >
                                    <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                                </View>
                                <View style={styles.FotosBoxVacio}>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[0].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[1].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View><View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[2].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                </View>
                                <View style={styles.SpacingBoxVacio}>
                                </View>  
                            </>
                        )}
                        { value.Visual.completo && (
                            <>
                                <View style={styles.first2} >
                                    <ImagePdf source="fondoIns/Ins_Completa2.jpg" style={styles.image} />
                                </View>
                                <View style={styles.CodigoBoxCompleta} wrap>
                                    <Text style={styles.CodigoCompleta}>
                                        {value.Codigo.length === 1 ? value.Codigo[0].codigo : value.Codigo.length}
                                    </Text>
                                </View>
                                <View style={styles.LocalBoxCompleta} wrap>
                                    <Text style={styles.LocalCompleta}>
                                        {value.Local}
                                    </Text>
                                </View>
                                <View style={styles.NotEntBoxCompleta} wrap>
                                    <Text style={styles.NotEntCompleta}>
                                        {value.NotEnt}
                                    </Text>
                                </View>
                                <View style={styles.FotosBoxCompleta}>
                                    <View style={styles.FotoBoxCompleta}>
                                        <ImagePdf src={value.Fotos[0].src}style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBoxCompleta}>
                                        <ImagePdf src={value.Fotos[1].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBoxCompleta}>
                                        <ImagePdf src={value.Fotos[2].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                </View>
                                <View style={styles.ObservBoxCompleta} wrap>
                                    <Text style={styles.ObservCompleta}>
                                        {value.Observacion}
                                    </Text>
                                </View>
                                <View style={styles.SpacingBoxCompleta}>
                                </View>                          
                            </>
                        )}
                        { value.Visual.variable && (
                            <>
                                <View style={styles.first2} >
                                    <ImagePdf source="fondoIns/Ins_Variable2.jpg" style={styles.image} />
                                </View>
                                <View style={styles.CodigoBoxVariable} wrap>
                                    <Text style={styles.CodigoCompleta}>
                                        {value.Codigo.length === 1 ? value.Codigo[0].codigo : value.Codigo.length}
                                    </Text>
                                </View>
                                <View style={styles.LocalBoxVariable} wrap>
                                    <Text style={styles.LocalCompleta}>
                                        {value.Local}
                                    </Text>
                                </View>
                                <View style={styles.NotEntBoxVariable} wrap>
                                    <Text style={styles.NotEntCompleta}>
                                        {value.NotEnt}
                                    </Text>
                                </View>
                                <View style={styles.FotosBox}>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[0].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[1].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[2].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                    </View>
                                </View>
                                <View style={styles.SpacingBoxVariable}>
                                </View>  
                            </>
                        )}
                    </View>
                    <View>
                        <View style={styles.first} key={`Panoramica-${value._id}`}>
                            <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                        </View>
                        <View style={styles.FotoBoxPanoramicaContainer}>
                            <View style={styles.FotoBoxPanoramica}>
                                    <ImagePdf source={value.Fotos[3].src} style={styles.Foto} />
                            </View>
                        </View>
                        <View style={styles.SpacingBoxPanoramico}>
                        </View> 
                    </View>
                </React.Fragment>
            )
        }else if(value.Visual){
            return(
                <View key={value._id}>
                    { value.Visual.vacio && (
                        <>
                            <View style={styles.first2} >
                                <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                            </View>
                            <View style={styles.FotosBoxVacio}>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[0].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[1].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View><View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[2].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                            </View>
                            <View style={styles.SpacingBoxVacio}>
                            </View>  
                        </>
                    )}
                    { value.Visual.completo && (
                        <>
                            <View style={styles.first2} >
                                <ImagePdf source="fondoIns/Ins_Completa2.jpg" style={styles.image} />
                            </View>
                            <View style={styles.CodigoBoxCompleta} wrap>
                                <Text style={styles.CodigoCompleta}>
                                    {value.Codigo.length === 1 ? value.Codigo[0].codigo : value.Codigo.length}
                                </Text>
                            </View>
                            <View style={styles.LocalBoxCompleta} wrap>
                                <Text style={styles.LocalCompleta}>
                                    {value.Local}
                                </Text>
                            </View>
                            <View style={styles.NotEntBoxCompleta} wrap>
                                <Text style={styles.NotEntCompleta}>
                                    {value.NotEnt}
                                </Text>
                            </View>
                            <View style={styles.FotosBoxCompleta}>
                                <View style={styles.FotoBoxCompleta}>
                                    <ImagePdf src={value.Fotos[0].src}style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                                <View style={styles.FotoBoxCompleta}>
                                    <ImagePdf src={value.Fotos[1].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                                <View style={styles.FotoBoxCompleta}>
                                    <ImagePdf src={value.Fotos[2].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                            </View>
                            <View style={styles.ObservBoxCompleta} wrap>
                                <Text style={styles.ObservCompleta}>
                                    {value.Observacion}
                                </Text>
                            </View>
                            <View style={styles.SpacingBoxCompleta}>
                            </View>                          
                        </>
                    )}
                    { value.Visual.variable && (
                        <>
                            <View style={styles.first2} >
                                <ImagePdf source="fondoIns/Ins_Variable2.jpg" style={styles.image} />
                            </View>
                            <View style={styles.CodigoBoxVariable} wrap>
                                <Text style={styles.CodigoCompleta}>
                                    {value.Codigo.length === 1 ? value.Codigo[0].codigo : value.Codigo.length}
                                </Text>
                            </View>
                            <View style={styles.LocalBoxVariable} wrap>
                                <Text style={styles.LocalCompleta}>
                                    {value.Local}
                                </Text>
                            </View>
                            <View style={styles.NotEntBoxVariable} wrap>
                                <Text style={styles.NotEntCompleta}>
                                    {value.NotEnt}
                                </Text>
                            </View>
                            <View style={styles.FotosBox}>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[0].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[1].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[2].src} style={value.isTransform ? styles.FotoTransform : styles.Foto} />
                                </View>
                            </View>
                            <View style={styles.SpacingBoxVariable}>
                            </View>  
                        </>
                    )}
                </View>
                    
            )
        }else{
            return(
                <View>

                </View>
            )
        }
    });

    const MyDoc =(
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={styles.first}>
            <ImagePdf source="fondoIns/Ins_Principal.jpeg" style={styles.image} />
            </View>
            <View style={styles.numprobox} >
                <Text style={styles.numpro}>
                    {data.numpro}
                </Text>
            </View>
            <View style={styles.proyectobox} wrap >
              <Text style={styles.proyecto}>
                {data.Title ? data.titulo : data.proyecto}
              </Text>
            </View>
            <View style={styles.clientebox} >
                <ImagePdf source={`logos/Cadena/${Locales[0].Cadena}.jpg`} style={styles.logounit} />
            </View>
            <View style={styles.spacingbox} >
                    
                </View>
            {
                Puntos
            }
        </Page>
      </Document>
    );

    const [ instance ] = usePDF({ document: MyDoc });

    if (instance.loading) {
        return <FacebookCircularProgress size={36}/>;
    }

    if (instance.error) { 
        return <div>Something went wrong: {instance.error}</div>;
    }
    
   
    return( 
        <Fab href={instance.url} target="_blank" color='secondary' >
            <Tooltip title='PDF'placement='right' arrow >
                <PdfIcon  />
            </Tooltip>
        </Fab>
    );
    
};

const Vistas = (props)=>{
    const { setLocales, Locales, enqueueSnackbar, setPdf, isNew } = useContext(RepContext);
    const [ isViewerNot, setViewerNot ] = useState(false);
    const [ notEntImage, setNotEntImage ] = useState([]);
    const { value } = props;
    const [ dataItem, setDataItem ] = useState(value);
    const [ visual, setVisual ] = useState({
        completo:true,
        vacio:false,
        variable:false
    });
    
    const [ save, setSave ] = useState(false);

    useEffect(
        ()=>{
            if(value.Visual) setVisual(value.Visual);
            if(value.isNotEnt){
                //setShowNotEnt(true);
                const arr = [];
                const objeto = {};
                objeto.src = value.NotEntSrc;
                arr.push(objeto);
                setNotEntImage(arr);
            }
        },[]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
        ()=>{
            if(save){
                console.log('StatusReporte');
                setSave(false);
                const objeto = {...dataItem};
                    objeto.isReport = true;
                fetch('/StatusReporte',{
                    method: 'POST',
                    body: JSON.stringify({Local:dataItem.Local, Direccion:dataItem.Direccion, numpro:dataItem.numpro, TipTra:dataItem.TipTra, isReport:true}),
                    headers:{'Content-Type':'application/json'}
                })
                .then(res=>res.json())
                .then(result=>{
                    if(result.message){ 
                        console.log('result.message');
                        enqueueSnackbar(result.message,{variant:'success'});
                        const Locals = Locales;
                        const arr = [];
                        for(let i in Locals){
                            if(Locals[i]._id === dataItem._id){
                                arr.push(objeto);
                            }else{
                                arr.push(Locals[i]);
                            }
                        }
                        setLocales(arr);
                        if(!isNew){
                            setTimeout(()=>{
                                setPdf(true);
                            },1000)
                            
                        }
                        
                    }else{ 
                        console.log('result.status');
                        enqueueSnackbar(result.status,{variant:'error'});
                        console.log(result.status);
                    } 
                })
                console.log('save');
                
            }
        },[save] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const HandleChange = (e)=>{
        switch(e.target.name){
            case 'completo':
                setVisual({completo:true, vacio:false, variable:false});                
                break;
            case 'vacio':
                setVisual({completo:false, vacio:true, variable:false});  
                break;
            case 'variable':
                setVisual({completo:false, vacio:false, variable:true});  
                break;  
            default:
                setDataItem({...dataItem, [e.target.name]:e.target.checked});
                break;
        }
        
    };

    const HandleSave = ()=>{
        console.log('HandleSave');
        setPdf(false); 
        setDataItem({...dataItem, Visual:visual});
        setSave(true); 
    };

    const HandleOpenVnT = ()=>{
        setViewerNot(true);
    };

    const closeViewerNot = () => {
        setViewerNot(false);
    };

    const VisorNot = ()=>(       
                <Viewer
                    visible={isViewerNot}
                    onClose={closeViewerNot }
                    images={notEntImage}
                />
    );

    return(
        <Grid container key={dataItem._id}>
            {isViewerNot && <VisorNot/>}
             <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                 <Paper elevation={3} square >
                    <Grid container spacing={1} style={{padding:5}}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            <Card style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                                <CardHeader
                                        title={dataItem.Local}
                                        subheader={`${dataItem.Direccion} - ${dataItem.TipTra}`}
                                />
                                <CardContent>
                                    {
                                        dataItem.isNotEnt ?
                                        (
                                            <Avatar alt="Remy Sharp" variant='rounded' src={dataItem.NotEntSrc} onClick={HandleOpenVnT} style={{alignSelf:'center', justifySelf:'center', position:'relative', top:5}}/>  
                                        ):
                                        (
                                            console.log('')
                                        )
                                    }
                                   
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{alignSelf:'center'}}>
                            <Card style={{padding:10, height:300}} variant="outlined">
                                <CardContent>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={visual.completo || false}
                                                onChange={HandleChange}
                                                name="completo"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                            }
                                            label="Completo"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={visual.variable || false}
                                                onChange={HandleChange}
                                                name="variable"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                            }
                                            label="Variable"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={visual.vacio || false}
                                                onChange={HandleChange}
                                                name="vacio"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                            }
                                            label="Vacio"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={dataItem.Panoramica || false}
                                                onChange={HandleChange}
                                                name="Panoramica"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                            }
                                            label="Panoramica"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={dataItem.isTransform || false}
                                                onChange={HandleChange}
                                                name="isTransform"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                            }
                                            label="Rotar"
                                        />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                onClick={HandleSave}
                                                startIcon={<SaveIcon />}
                                                style={{position: 'relative', top: 50}}
                                            >
                                                Guardar
                                            </Button>
                                    </FormGroup>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                            {
                                visual.completo && (
                                    <Card style={{height:300, borderWidth:0}}>
                                        <CardMedia
                                            alt="Completo"
                                            component="img"
                                            image="/fondoIns/Ins_Completa.jpg"
                                            title="Completo"
                                            style={{width:'100%', height:'auto', objectFit: 'cover'}}
                                        />
                                    </Card>
                                )
                            }
                            {
                                visual.variable && (
                                    <Card style={{height:300, borderWidth:0}}>
                                        <CardMedia
                                            component="img"
                                            alt="Variable"
                                            height="300"
                                            image="/fondoIns/Ins_Variable.jpg"
                                            title="Variable"
                                            style={{width:'100%', height:'auto', objectFit: 'cover'}}
                                        />
                                    </Card>
                                )
                            }
                            {
                                visual.vacio && (
                                    <Card style={{height:300, borderWidth:0}}>
                                        <CardMedia
                                            component="img"
                                            alt="Vacio"
                                            height="300"
                                            image="/fondoIns/Ins_Vacia.jpeg"
                                            title="Vacio"
                                            style={{width:'100%', height:'auto', objectFit: 'cover'}}
                                        />
                                    </Card>
                                )
                            }
                            
                        </Grid>
                    </Grid>
                 </Paper>
             </Grid>
        </Grid>
    )
};


function RepIns(props) {
    return (
      <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <RepIn />
      </SnackbarProvider>
  );
};
export default RepIns;