import React, { useState, useEffect, useContext, createContext, useRef} from 'react';
import  {
          Backdrop,
          Box,
          Card,
          CardContent,
          CardHeader,
          CircularProgress,
          Dialog,
          DialogContent,
          Fab,
          Grid,
          IconButton,
          InputAdornment,
          MenuItem,
          Paper,
          Select,
          Switch,
          Tab,
          Tabs,
          Typography,
          TextField,
          Tooltip,
        } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, BlobProvider } from '@react-pdf/renderer';
import  {
          HighlightOff as HighlightOffIcon,
        } from '@material-ui/icons'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Autocomplete } from '@material-ui/lab';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import MaterialTable , { MTableToolbar } from 'material-table';
/***************************************ICONOS************************************/
import { 
    Check as CheckIcon,
    Delete as DeleteIcon,
    Lock as LockIcon,
    Place as PlaceIcon,
    PictureAsPdf as PdfIcon,
    Refresh as RefreshIcon,
    Save as SaveIcon,
    Search as SearchIcon, 
   } from '@material-ui/icons';
/*********************************************************************************/

const Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const useStyles = makeStyles(theme=>({
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

const GarantiaVenta = (props)=>{
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [ data, setData ] = useState([]);
    const [ formulario, setFormulario ] = useState({});
    const [ isFound, setFound ] = useState(false);
    const [ Instalaciones, setInstalaciones ] = useState([]);
    const [ isSelectDirection, setSelectDirection ] = useState(false);
    const [ isPdf, setPdf ] = useState(false);
    const [ dataPdf, setDataPdf ] = useState({});
    const [ dataCrono, setDataCrono ] = useState({});
    const [ dataGarantia, setDataGarantia ] = useState({});
    const [ dataFound, setDataFound ] = useState([]);
    const [ dataTable, setDataTable ] = useState([]);
    const [ searchReport, setSearchReport ] = useState(false);
    const [ showReset, setShowReset ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ readySave, setReadySave ] = useState(false);
    const [ isNew, setNew ] = useState(true);
    const [ showTable, setShowTable ] = useState(false);
    const [ elemTotal, setElemTotal ] = useState(0);
       

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    useEffect(
        ()=>{  
            if(readySave){
                setReadySave(false);
                let sumGar = 0;
                dataGarantia.map(value=>
                    sumGar += parseInt(value.CanElem)
                );
                let totGar = sumGar + formulario.CanElem;
                console.log(sumGar);
                console.log(totGar);
                
                    fetch('/SaveGarantiaVentas',{
                        method: 'POST',
                        body: JSON.stringify(formulario),
                        headers:{
                        'Content-Type':'application/json'
                        }
                    })
                    .then(response=> response.json())
                    .then(result =>{
                        if(result.message){
                            enqueueSnackbar(result.message, {variant:'success'});
                        }else{
                            enqueueSnackbar(result.status, {variant:'error'});
                        }
                    });
               
                    
                
            }
        },[readySave]
    );

    useEffect(
        ()=>{
            if(searchReport){
                setSearchReport(false);            
                if (formulario.isPdf){
                    setPdf(true);
                }else{
                    enqueueSnackbar('NO EXISTE REPORTE',{variant:'error'});
                }
            }
        },[searchReport]
    );

    const HandleSearch = () =>{
        if (formulario.numpro === '' || parseInt(formulario.numpro) < 1000 ){
            enqueueSnackbar('Debe ingresar un Numero de Presupuesto para poder realizar la busqueda!',{variant:'error'});
          }else{
            fetch('/SearchCronoGarantias',{
                    method: 'POST',
                    body: JSON.stringify({numpro:formulario.numpro}),
                    headers:{
                      'Content-Type':'application/json'
                    }
            })
            .then(response=> response.json())
            .then(result =>{
              if (result.message){
                enqueueSnackbar(result.message,{variant:'error'});
              }else
              if(result.status){
                enqueueSnackbar(result.status,{variant:'error'});
              }else{    
                fetch('/SearchCronoGar',{
                    method: 'POST',
                    body: JSON.stringify({numpro:formulario.numpro}),
                    headers:{
                      'Content-Type':'application/json'
                    }
                    })
                    .then(response=> response.json())
                    .then(result2 =>{ 
                        if(result2.status){
                            enqueueSnackbar(result2.status,{variant:'error'});
                        }else{ 
                            setDataCrono(result2); 
                            console.log('Cronograma Encontrado');
                        }
                    });         
                
                enqueueSnackbar('Informacion Cargada',{variant:'info'});
                setFound(true);                  
                setData(result); 
                setDataPdf(result.Reportes); 
                setInstalaciones(result.Instalaciones);   
                setFormulario({...formulario, proyecto:result.proyecto, coordinador:result.coordinador});  
                setDataGarantia(result.Garantia);
                setDataTable(result.Garantia);
              }
            });
          }
    };

    const HandleChange = (e)=>{
        setFormulario({...formulario, [e.target.name]:e.target.value});
    };

    const HandleClearDirection = ()=>{
        setSelectDirection(false);
        setPdf(false);
        setSearchReport(false);
        setDataPdf({});
        setDataFound([]);
        setFormulario({numpro:formulario.numpro, proyecto:formulario.proyecto});
        setShowReset(false);
        setDataGarantia([]);
        setNew(true);
        setShowTable(true);
        setDataTable([]);
    };

    const HandleSelectDirection = (value)=>{
        setShowTable(true);
        let direc = ((value.split('- '))[1]).toString();
        let tipot = ((value.split(' -'))[0]).toString();
        const its = dataCrono.items;
        const dato = Instalaciones.filter(value2=>value2.Direccion.toString() === direc);
        const datoPdf = dataPdf.items.filter(value2=>value2.Direccion.toString() === direc);
        const fil = its.filter(value2=>value2.Direccion.toString() === direc);
        if(dato.length > 1){
            console.log('mayor 1');
            const dato2 = (dato.filter(value2=>value2.TipTra.toString() === tipot))[0];
            const datoPdf2 = (datoPdf.items.filter(value2=>value2.TipTra.toString() === tipot))[0];
            const fil2 = (fil.filter(value2=>value2.TipTra.toString() === tipot))[0];            
            const fecha = new Date(dato2.Creacion);
            let fechaV = new Date(dato2.Creacion);
            fechaV.setDate(fechaV.getDate() + parseInt(fil2.Garantia));
            const Cre = `${fecha.getDate()} - ${Meses[fecha.getMonth()]} - ${fecha.getFullYear()}`;
            const Ven = `${fechaV.getDate()} - ${Meses[fechaV.getMonth()]} - ${fechaV.getFullYear()}`;
            setFormulario({...formulario, Cadena:dato2.Cadena, Local:dato2.Local, TipTra:dato2.TipTra, Direccion:dato2.Direccion, Codigo:dato2.Codigo, FecIns:Cre, Garantia:fil2.Garantia, FecVen:Ven, CanElem:fil2[tipot], isPdf:dato2.isReport});
            setSelectDirection(true);
            setDataFound([datoPdf2]);
            setSearchReport(true);
            setShowReset(true);
            setElemTotal(fil2[inf.TipTra]);
        }else{
            console.log('menor 1');
            const inf = dato[0];
            const filt = fil[0];   
            const datoPd = datoPdf[0];          
            const fecha = new Date(inf.Creacion);
            let fechaV = new Date(inf.Creacion);
            fechaV.setDate(fechaV.getDate() + parseInt(filt.Garantia));
            const Cre = `${fecha.getDate()} - ${Meses[fecha.getMonth()]} - ${fecha.getFullYear()}`;
            const Ven = `${fechaV.getDate()} - ${Meses[fechaV.getMonth()]} - ${fechaV.getFullYear()}`;
            setFormulario({...formulario, Cadena:inf.Cadena, Local:inf.Local, TipTra:inf.TipTra, Codigo:inf.Codigo, Direccion:inf.Direccion, FecIns:Cre, Garantia:filt.Garantia, FecVen:Ven, CanElem:filt[tipot], isPdf:inf.isReport});
            setSelectDirection(true);
            setDataFound([datoPd]);
            setSearchReport(true);
            setShowReset(true);
            setElemTotal(filt[inf.TipTra]);
        }
        
    };

    const HandleSave = async ()=>{
        if(isSelectDirection){
            setLoading(true);
            if(isNew){ 
                const peticion = await fetch('/SearchNumGar');
                const result = await peticion.json();
                console.log(result.message);
                if(result.message){
                    setFormulario({...formulario, isPdf:isPdf, numGar:result.message, Creacion:new Date});
                    setReadySave(true);
                }else{
                    enqueueSnackbar(result.status,{variant:'error'});
                }
            }else{
                setFormulario({...formulario, Modificacion:new Date()});
                setReadySave(true);
            }
            
        }else{
            enqueueSnackbar('Petición Invalidada',{variant:'error'});
        }
    };

    const HandleClear = ()=>{
        setFound(false);
        setInstalaciones([]);
        setSelectDirection(false);
        setPdf(false);
        setSearchReport(false);
        setDataPdf({});
        setFormulario({});
        setShowReset(false);
        setDataGarantia([]);
        setNew(true);
        setShowTable(true);
        setDataTable([]);
    };

    const headers = [
        {title: 'Tipo de Trabajo', field:'TipTra'},
        {title: 'Motivo de Garantía', field:'MotGar'},
        {title: 'Cantidad de Elementos', field:'CanElem'}
    ];

    return(
        <Grid container justify='center' spacing={3}>
            <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                <Paper square elevation={3}>
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
                                fullWidth
                                inputProps={{autoComplete: 'new-password', minLength:999}}
                                value={formulario.numpro || ''}
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
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                                {
                                    showReset &&
                                        <Fab onClick={HandleClear}>
                                            <RefreshIcon />
                                        </Fab>
                                    
                                }
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                                {
                                    isPdf && <Pdf dataPdf={dataPdf} Locales={dataFound}/>
                                }
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        {
                            isFound && (
                                <React.Fragment>
                                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} >
                                        <TextField 
                                            id="numGar"                                
                                            variant="outlined"
                                            name='numGar'
                                            fullWidth
                                            label="NÚMERO DE GARANTÍA"
                                            autoFocus
                                            value={formulario.numGar || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={9} lg={9} md={9} sm={12} xs={12} >
                                        <TextField 
                                            id="proyecto"                                
                                            variant="outlined"
                                            name='Proyecto'
                                            fullWidth
                                            label='PROYECTO'
                                            autoFocus
                                            value={formulario.proyecto || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                        <Autocomplete
                                            id="Direccion"
                                            options={Instalaciones}
                                            getOptionLabel={(option) => {return( `${option.TipTra} - ${option.Direccion}`)}}

                                            renderInput={(params) => <TextField {...params} label="Tipo de Trabajo" fullWidth variant="outlined" inputProps={{...params.inputProps, autoComplete: 'hidden',}}/>}
                                            groupBy={(option) => option.TipTra}
                                            onInputChange={
                                                (e,value, reason)=>{
                                                    if(reason === 'clear'){
                                                        HandleClearDirection();
                                                    }else if(reason === 'reset'){
                                                        HandleSelectDirection(value);
                                                    }
                                            }}
                                        />
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                        {
                            isSelectDirection && (
                                <React.Fragment>
                                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="Cadena"                                
                                            variant="outlined"
                                            name='Cadena'
                                            fullWidth
                                            label="Cadena"
                                            autoFocus
                                            value={formulario.Cadena || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="Local"                                
                                            variant="outlined"
                                            name='Local'
                                            label='Local'
                                            autoFocus
                                            fullWidth
                                            value={formulario.Local || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="Codigo"                                
                                            variant="outlined"
                                            name='Codigo'
                                            label='Código Instalación'
                                            autoFocus
                                            fullWidth
                                            value={formulario.Codigo || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="TipTra"                                
                                            variant="outlined"
                                            name='TipTra'
                                            label='Tipo Trabajo'
                                            autoFocus
                                            fullWidth
                                            value={formulario.TipTra || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="FecIns"                                
                                            variant="outlined"
                                            name='FecIns'
                                            fullWidth
                                            label='Fecha Instalacion'
                                            autoFocus
                                            value={formulario.FecIns || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="FecVen"                                
                                            variant="outlined"
                                            name='FecVen'
                                            fullWidth
                                            label='Fecha Vencimiento'
                                            autoFocus
                                            value={formulario.FecVen || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="CanElem"                                
                                            variant="outlined"
                                            name='CanElem'
                                            fullWidth
                                            label='Cantidad Elementos'
                                            autoFocus
                                            onChange={HandleChange}
                                            value={formulario.CanElem || ''}
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={6} sm={12} xs={12} >
                                        <TextField 
                                            id="MotGar"                                
                                            variant="outlined"
                                            name='MotGar'
                                            fullWidth
                                            label='Motivo Garantía'
                                            multiline
                                            onChange={HandleChange}
                                            value={formulario.MotGar || ''}
                                        />
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                        
                    </Grid>
                </Paper>
            </Grid>
            { showTable && 
                <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                    <MaterialTable
                        title={`Garantia de Ventas`}
                        columns={headers}
                        data={dataTable}
                        //isLoading={cargando}
                        options={{
                            headerStyle: {
                                backgroundColor: '#0E3B5F',
                                color: '#FFF',
                                fontWeight: 'bold',
                            },
                            showTitle:false,
                            search:false,
                            toolbar:false
                        }}
                        localization={{
                            header: {
                                actions: 'Actions'
                            },
                            body:{
                                editRow:{
                                    deleteText: 'Seguro desea Eliminar?'
                                },
                                emptyDataSourceMessage: 'No hay garantía(s) creada(s) para este elemento'
                            },
                            toolbar:{
                                searchPlaceholder: 'Buscador'
                            },
                            pagination:{
                                labelRowsSelect: 'Filas'
                            },
                            grouping:{
                                placeholder:'Arrastre algún encabezado para Agrupar'
                            },
                        }}
                        header={true}
                        editable={{  
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                }),
                            onRowDelete: (oldData) =>
                                new Promise(resolve => {
                                }),
                        }}
                    />
                </Grid>
            }
        </Grid>
    )
};

const Pdf = (props)=>{
    const { dataPdf, Locales } = props;
    //const timer2 = React.useRef();

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
            height:'100%'
        },
        numpro: {
            position:'relative',
            top:-520,
            left:768,
            fontWeight:'extrabold',
            color:'#fff',
            fontSize:22
        },
        proyectobox: {
            width:550,
            height:100,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-420,
            left:270
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
            position:'relative',
            top:-450,
            left:270
        },
        cliente: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:25,
            alignSelf: 'center'
        },
        FotosBox:{
            width:825,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-430,
            left:9
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
            position:'relative',
            top:-430,
            left:9
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
        FotosBoxCompleta:{
            width:825,
            height:332,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-430,
            left:9
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
        ObservBoxCompleta:{
            width:243,
            height:53,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-403,
            left:37
        },
        ObservCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:16,
            alignSelf: 'center'
        },
        CodigoBoxCompleta:{
            width:65,
            height:28,
            
            
            
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-957,
            left:752
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
            top:-951,
            left:631
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
            top:-945,
            left:754
        },
        NotEntCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:11,
            alignSelf: 'center'
        },
        CodigoBoxVariable:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-971,
            left:752
        },
        LocalBoxVariable:{
            width:182,
            height:31,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-964,
            left:631
        },
        NotEntBoxVariable:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-958,
            left:754
        },
        logounit:{
            objectFit:'fill',
            borderRadius:5
        },
    });
    
    const Puntos = Locales.map((value, index)=>{
        if(value.Panoramica ){
            return(
                <React.Fragment  key={value._id}>
                    <View style={styles.first}>
                        { value.Visual.vacio && (
                            <>
                                <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                                <View style={styles.FotosBox}>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                    </View><View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                    </View>
                                </View>
                            </>
                        )}
                        { value.Visual.completo && (
                            <>
                                <ImagePdf source="fondoIns/Ins_Completa.jpg" style={styles.image} />
                                <View style={styles.FotosBoxCompleta}>
                                    <View style={styles.FotoBoxCompleta}>
                                        <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBoxCompleta}>
                                        <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                    </View><View style={styles.FotoBoxCompleta}>
                                        <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                    </View>
                                </View>
                                <View style={styles.ObservBoxCompleta} wrap>
                                    <Text style={styles.ObservCompleta}>
                                        {value.Observacion}
                                    </Text>
                                </View>
                                <View style={styles.CodigoBoxCompleta} wrap>
                                    <Text style={styles.CodigoCompleta}>
                                        {value.Codigo}
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
                            </>
                        )}
                        { value.Visual.variable && (
                            <>
                                <ImagePdf source="fondoIns/Ins_Variable.jpg" style={styles.image} />
                                <View style={styles.FotosBox}>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                    </View><View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                    </View>
                                </View>
                                <View style={styles.CodigoBoxVariable} wrap>
                                    <Text style={styles.CodigoCompleta}>
                                        {value.Codigo}
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
                            </>
                        )}
                    </View>
                    <View style={styles.first} key={`Panoramica-${value._id}`}>
                        <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                        <View style={styles.FotoBoxPanoramicaContainer}>
                            <View style={styles.FotoBoxPanoramica}>
                                    <ImagePdf source={value.Fotos[3].src} style={styles.Foto} />
                            </View>
                        </View>
                    </View>
                </React.Fragment>
            )
        }else if(value.Visual){
            return(
                <View style={styles.first} key={value._id}>
                    { value.Visual.vacio && (
                        <>
                            <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                            <View style={styles.FotosBox}>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                </View>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                </View><View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                </View>
                            </View>
                        </>
                    )}
                    { value.Visual.completo && (
                        <>
                            <ImagePdf source="fondoIns/Ins_Completa.jpg" style={styles.image} />
                            <View style={styles.FotosBoxCompleta}>
                                <View style={styles.FotoBoxCompleta}>
                                    <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                </View>
                                <View style={styles.FotoBoxCompleta}>
                                    <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                </View><View style={styles.FotoBoxCompleta}>
                                    <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                </View>
                            </View>
                            <View style={styles.ObservBoxCompleta} wrap>
                                <Text style={styles.ObservCompleta}>
                                    {value.Observacion}
                                </Text>
                            </View>
                            <View style={styles.CodigoBoxCompleta} wrap>
                                <Text style={styles.CodigoCompleta}>
                                    {value.Codigo}
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
                        </>
                    )}
                    { value.Visual.variable && (
                        <>
                            <ImagePdf source="fondoIns/Ins_Variable.jpg" style={styles.image} />
                            <View style={styles.FotosBox}>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                </View>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                </View><View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                </View>
                            </View>
                            <View style={styles.CodigoBoxVariable} wrap>
                                <Text style={styles.CodigoCompleta}>
                                    {value.Codigo}
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
                        </>
                    )}
                </View>
                    
            )
        }else{
            return(
                <View key={value._id}>

                </View>
            )
        }
    });

    const document =(
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={styles.first}>
            <ImagePdf source="fondoIns/Ins_Principal.jpeg" style={styles.image} />
            <Text style={styles.numpro}>
              {dataPdf.numpro}
            </Text>
            <View style={styles.proyectobox} wrap >
              <Text style={styles.proyecto}>
                {dataPdf.Title ? dataPdf.titulo : dataPdf.proyecto}
              </Text>
            </View>
            <View style={styles.clientebox} >
                <ImagePdf source={`logos/Cadena/${dataPdf.items[0].Cadena}.jpg`} style={styles.logounit} />
            </View>
            
          </View>
            {
                Puntos
            }
        </Page>
      </Document>
    );
    
    
   
    return( 
      <div>
        
            <BlobProvider document={document} fileName="Reporte.pdf">
            {({ url }) => (
                        <Tooltip title='PDF'placement='right' arrow >
                            <Fab href={url} target="_blank" color='secondary' style={{color:'red'}} >
                            <PdfIcon />
                            </Fab>
                        </Tooltip>
                        )}
            </BlobProvider>
        
      </div>
    );
};

function GarantiaVentas(props) {
    return (
      <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <GarantiaVenta />
      </SnackbarProvider>
  );
};

export default GarantiaVentas;