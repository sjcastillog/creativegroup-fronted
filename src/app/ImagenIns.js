import React, { useState, useEffect} from 'react';
import  { Grid, GridList, GridListTile, Hidden, IconButton, InputAdornment, Paper, Switch, TextField, withWidth   } from '@material-ui/core'; 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {  
            Lock as LockIcon,
            Search as SearchIcon,
        } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { Carousel } from "react-responsive-carousel";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Viewer from 'react-viewer';
import { useAuth } from "./Auth";

const useStyles = makeStyles(theme => ({
    root:{
        padding:10
    },
    Instalador:{
        padding:20
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    gridList: {
        width: '100%',
        height: 450,
      },
}));



const Enunciados = ['Cadena', 'Local', 'Direccion', 'Ciudad', 'Sector', 'observacion', 'fecer', 'fecterpro', 'id', 'insAgr', 'insFin', 'insHora', 'insStart', 'Provincia', 'Garantia', 'Personal', 'Observacion', 'observacionM']

function Instalacion(props){
    const classes = useStyles();
    const [ Locales, setLocales ] = useState([]);
    //const [ isFound, setFound ] = useState(false);
    const [ isFound2, setFound2 ] = useState(false);
    const [ isFound3, setFound3 ] = useState(false);
    //const [ isManual, setManual ] = useState(false);
    const [ formulario, setFormulario] = useState({
        Cadena:'',
        Local:'',
        Ciudad:'',
        Sector:'',
        Direccion:'',
        Provincia:'',
        Instaladores:[],
        NotEnt:0,
        numpro:'',
        Codigo:'',
    });
    const [ imagenesArr, setImagenesArr ] = useState([]);
    //const [pictures, setPictures] = useState([]);
    const [ imagenesArrBackup, setImagenesArrBackup ] = useState([]);
    const [ encabezados, setEncabezados ] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    //const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    //const checkedIcon = <CheckBoxIcon fontSize="small" />;
    //const [ isContinuo, setContinuo ] = useState(false);
    const [ TiposTrabajos, setTiposTrabajos ] = useState([]);
    const [ isContinuoDireccion, setContinuoDireccion] = useState(false);
    const [ isCarousel, setCarousel ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const [ Fotos, setFotos ] = useState([{src:'', alt:''}]);
    const [ Instalados, setInstalados ] = useState([]);
    const { setHeaderWord } = useAuth();

useEffect(
    ()=>{
        setHeaderWord('Instalación/Fotos');
    },[] // eslint-disable-line react-hooks/exhaustive-deps
)


    useEffect(
        ()=>{
            if(isContinuoDireccion){
                HandleTipTra();
                setContinuoDireccion(false);
            }
        },[isContinuoDireccion] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
        ()=>{
            if(isFound3){
                setFound2(true);
                setFound3(false);
            }
        },[isFound3] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const HandleClearDireccion = ()=>{
        setImagenesArr([]);
        setTiposTrabajos([]);
        //setImagenesArrBackup([]);
        setFound2(false);
        //setFound(false);
        //setContinuo(false);  
        setFormulario({ numpro:formulario.numpro});  
        setFotos([{src:'', alt:''}]);                                          
    };

    const HandleClearTipTra = ()=>{
        setFound2(false);
        //(false);
        //setFound(false);
        setImagenesArr(imagenesArrBackup);    
        setFormulario({ numpro:formulario.numpro, Direccion:formulario.Direccion, Local:formulario.Local, Ciudad:formulario.Ciudad, Sector:formulario.Sector, Garantia:formulario.Garantia });                                         
        setFotos([{src:'', alt:''}]);
    };

    /*
    const HandleClearAll = () => {
        setFormulario({
            Cadena:'',
            Local:'',
            Ciudad:'',
            Sector:'',
            Direccion:'',
            Provincia:'',
            Instaladores:[],
            NotEnt:0,
            numpro:'',
            Codigo:'',
            Fotos:[],
            NotEntSrc:''
        });
        setImagenesArr([]);
        setImagenesArrBackup([]);
        setLocales([])
        setTiposTrabajos([]);
        setFound(false);        
        setFound2(false);
        setContinuo(false);
        setContinuoDireccion(false);
        setUrlImg({});
        setPictures([]);
        setNotaEntrega([]);
    };

    const HandleClearParts = () => {
        setFormulario({...formulario, Observacion:'', NotEnt:0, Codigo:'', Fotos:[], NotEntSrc:''});
        //setFound(true);
        setFound2(true);
        setActiveStep(0);
        setUrlImg({});
        setContinuo(false);
        setPictures([]);
        setNotaEntrega([]);
    };*/

    const HandleSearch = () =>{
        if (formulario.numpro === '' || parseInt(formulario.numpro) < 1000 ){
            enqueueSnackbar('Debe ingresar un Numero de Presupuesto para poder realizar la busqueda!',{variant:'error'});
          }else{
            fetch('/fetch_SearchCrono',{
                    method: 'POST',
                    body: JSON.stringify({numpro:formulario.numpro}),
                    headers:{
                      'Content-Type':'application/json'
                    }
            })
            .then(response=> response.json())
            .then(result =>{
              if (result.message){
                  console.log(result.message);
                enqueueSnackbar(result.message,{variant:'error'});
              }else
              if(result.status){
                console.log(result.status);
                enqueueSnackbar(result.status,{variant:'error'});
              }else{     
                //console.log(result);
                //console.log(result.Insts);
                enqueueSnackbar('Direcciones Cargadas',{variant:'info'});             
                setInstalados(result.Insts) 
                setLocales(result.items);   
                setEncabezados(result.encabezados);  
              }
            });
          }
    };

    const HandleFormulario = (e)=>{
        setFormulario({...formulario, [e.target.name]:e.target.value});
    };

    const Imagenes = imagenesArr.map((value,index)=>(
        <div key={`Imagen-${index}`}>
            <img alt={value.tiptra} src={value.src} />
            <p className="legend">{value.tiptra}</p>
        </div>
    ));


    const HandleTipTra = ()=>{
        fetch('/fetch_searchInstalacion',{
            method: 'POST',
            body: JSON.stringify({Local:formulario.Local, Direccion:formulario.Direccion, numpro:formulario.numpro, TipTra:formulario.TipTra}),
            headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                if (result.message){
                    //setFound(true);
                    enqueueSnackbar('AÚN NO SE INSTALA ESTE PUNTO',{variant:'success'});
                }else
                if(result.status){
                    enqueueSnackbar(result.status, {variant:'error'});
                }else{
                    if(result.Fotos.length === 0){
                        setFormulario(result);
                        //setFound(true);
                        enqueueSnackbar('AÚN NO SE INSTALA ESTE PUNTO',{variant:'success'});
                        
                    }else{ 
                        setFormulario(result);
                        //setFound(true);
                        //setContinuo(true);
                        setFotos(result.Fotos);
                    }
                    
                }
            });
    };

    const HandleSelectDirection = (value)=>{
        console.log('HandleSelectDirection');
        let direc = ((value.split('_||_'))[1]).toString();
        const dato = (Locales.filter(value2=>value2.Direccion.toString() === direc.toString()))[0];                                     
        const arr = [];
        const arrImg = [];
        const Dkeys = Object.keys(dato);                                 
        for(let i=0; i<Dkeys.length;i++){
            //console.log('intoFor')
            if(Enunciados.includes(Dkeys[i])){
                //console.log(Dkeys[i]);
                console.log('Enunciados.includes');
                if(i === (Dkeys.length - 1)){
                    setImagenesArr(arrImg);
                    setImagenesArrBackup(arrImg);
                    setTiposTrabajos(arr);
                    setFound2(true);
                    if(arr.length < 2){      
                        console.log(dato);    
                        const tip = arr[0].tiptra;   
                        const canti = parseInt(dato[tip]);                                      
                        setFormulario({...formulario, idItem:dato.id, Cantidad:canti, Garantia:dato.Garantia, Cadena:dato.Cadena, Direccion:direc, Local:dato.Local, TipTra:arr[0].tiptra, Provincia:dato.Provincia, Ciudad:dato.Ciudad, Sector:dato.Sector, Instaladores: []});
                        setContinuoDireccion(true);
                    }else{
                        setFormulario({...formulario, idItem:dato.id, Cadena:dato.Cadena, Garantia:dato.Garantia, Direccion:direc, Local:dato.Local, Provincia:dato.Provincia, Ciudad:dato.Ciudad, Sector:dato.Sector});
                    }
                }
            }else{
                //console.log(Dkeys[i]);
                console.log('!Enunciados.includes');
                
                arr.push({tiptra:Dkeys[i]});
                const arr2 = encabezados.filter(value2=> value2.tiptra === Dkeys[i]);
                arrImg.push(arr2[0]);
                if(i === (Dkeys.length - 1)){
                    setImagenesArr(arrImg);
                    setImagenesArrBackup(arrImg);
                    setTiposTrabajos(arr);
                    setFound2(true);
                    if(arr.length < 2){  
                        //console.log(arr);
                        console.log(dato);
                        const tip = arr[0].tiptra; 
                        const canti = parseInt(dato[tip]);     
                        setFormulario({...formulario, idItem:dato.id, Cantidad:canti, Garantia:dato.Garantia, Cadena:dato.Cadena, Direccion:direc, Local:dato.Local, TipTra:arr[0].tiptra, Provincia:dato.Provincia, Ciudad:dato.Ciudad, Sector:dato.Sector, Instaladores:[]});
                        setContinuoDireccion(true);
            
                    }else{
                        setFormulario({...formulario, idItem:dato.id, Garantia:dato.Garantia, Cadena:dato.Cadena, Direccion:direc, Local:dato.Local, Provincia:dato.Provincia, Ciudad:dato.Ciudad, Sector:dato.Sector});
                    }
                }

                
            }
        };
    };

    const HandleSelectTipTra = (value)=>{
        console.log('HandleSelectTipTra');
        console.log(value);
        let arr = encabezados.filter(value2=> value2.tiptra === value);
        const dato = (Locales.filter(value2=>value2.Direccion.toString() === formulario.Direccion))[0]; 
        setImagenesArr(arr);
        setFound2(false);
        setFound3(true);
        fetch('/fetch_searchInstalacion',{
            method: 'POST',
            body: JSON.stringify({Local:formulario.Local, Direccion:formulario.Direccion, numpro:formulario.numpro, TipTra:value}),
            headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                if (result.message){
                    setFormulario({...formulario, idItem:dato.id, Cantidad:dato[value], TipTra:value});
                    //setFound(true);
                    enqueueSnackbar('AUN NO ESTA HECHA ESTA INSTALACION',{variant:'success'});
                }else
                if(result.status){
                    enqueueSnackbar(result.status,{variant:'error'});
                }else{
                    setFormulario(result);
                    setFotos(result.Fotos);
                    //setFound(true);
                    //setContinuo(true);                    
                }
            });
    };

    const HandleCarousel = (e)=>{
        setCarousel(e.target.checked);
    };

    const HandleFoto = ()=>{
        setVisible(true);
    }
    return(
      
        <Grid container justify='center' alignContent='center'>
            <Grid item xl={8} lg={8} md={12} sm={12} xs={12}  >
                <Paper className={classes.root}>
                    <Viewer
                        visible={visible}
                        onClose={() => { setVisible(false); } }
                        images={Fotos}
                    />
                    <Grid container justify='center' alignContent='center' spacing={2}> 
                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} >
                            <TextField 
                                id="numpro"
                                name='numpro' 
                                label="PPTO." 
                                fullWidth
                                autoFocus
                                value={formulario.numpro || ''}
                                variant="outlined"
                                type='Number'
                                onChange={HandleFormulario}

                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment:(
                                        <IconButton onClick={HandleSearch} >
                                            <SearchIcon />
                                        </IconButton>
                                    )
                                }}
                                onKeyPress={(e)=>{
                                    const code = e.keyCode || e.which;
                                    if(code === 13)
                                        HandleSearch();
                                }}
                            />
                        </Grid>                       
                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} >
                            <TextField 
                                id="Local"
                                name='Local' 
                                label='Local'
                                fullWidth
                                value={formulario.Local || ''}
                                variant="outlined"
                                placeholder='Local'
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                            <Autocomplete
                                id="Direccion"
                                options={Instalados}
                                getOptionLabel={(option) => {return( `${option.Local}_||_${option.Direccion}`)}}
                                renderInput={(params) => <TextField {...params} label="Dirección" fullWidth variant="outlined" />}
                                inputValue={formulario.Direccion || ''}
                                onInputChange={
                                    (e,value, reason)=>{
                                        if(reason === 'clear'){
                                            HandleClearDireccion();
                                        }else if(reason === 'reset'){
                                            HandleSelectDirection(value);
                                        }
                                }}
                            />
                        </Grid>
                        <Grid item xl={9} lg={9} md={9} sm={9} xs={9} >
                            <Autocomplete
                                id="TipTra"
                                options={TiposTrabajos}
                                getOptionLabel={(option) => option.tiptra}
                                renderInput={(params) => <TextField {...params} label="Tipos de Trabajo" variant="outlined" />}
                                inputValue={formulario.TipTra || ''}
                                onInputChange={
                                    (e,value, reason)=>{
                                        console.log(reason)
                                        if(reason === 'clear'){
                                            HandleClearTipTra();
                                        }else if(reason === 'reset'){
                                            HandleSelectTipTra(value)
                                        }
                                }}
                            />
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                            <Paper style={{height:55, marginTop:4.5}}>
                                <Grid container justify='center' alignItems='center' alignContent='center' spacing={1}>
                                    <Hidden xsDown>
                                        <Grid item>
                                            OFF
                                        </Grid>
                                    </Hidden>
                                    <Grid item>
                                        <Switch
                                            checked={isCarousel}
                                            onChange={HandleCarousel}
                                            name="Manual"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    </Grid>
                                    <Hidden xsDown>
                                        <Grid item>
                                            ON
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            { isCarousel && 
                                <Carousel autoPlay>
                                    {isFound2 && Imagenes}
                                </Carousel>
                            }
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <GridList cellHeight={400} className={classes.gridList} cols={4}>
                            {Fotos.map((tile) => (
                                <GridListTile key={tile.src} cols={tile.cols || 1}>
                                <img src={tile.src} alt={tile.tipo} onClick={HandleFoto}/>
                                </GridListTile>
                            ))}
                        </GridList>
                            
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    );
};


function ImagenIns(props) {
    const { width } = props;
    return (
      <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <Instalacion ancho={width} />
      </SnackbarProvider>
  );
};

ImagenIns.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  };

export default withWidth()(ImagenIns);