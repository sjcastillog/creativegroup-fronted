import React, { useState, useEffect, useCallback, memo, Fragment, Children, createContext, useContext} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {    Button,
            Card,
            CardHeader,
            CardContent, 
            CardMedia,
            Checkbox,
            Chip,
            CircularProgress,
            Dialog,
            DialogActions,
            DialogContent,
            Divider,
            Fab,
            FormControlLabel,
            FormGroup,
            FormControl,
            Grid,
            Grow,
            IconButton,
            Input,
            MenuItem,
            Paper,
            Stepper ,
            Step,
            StepLabel,
            Switch,
            Table,
            TableContainer,
            TableHead,
            TableBody,
            TableRow,
            TableCell,
            TextField,
            Tooltip,
            Typography
} from '@material-ui/core';
import { 
    Add as AddIcon,
    AccountCircle as AccountCircleIcon,
    Build as BuildIcon,
    Check as CheckIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
    Edit as EditIcon,
    EditLocation as EditLocationIcon,
    Done as DoneIcon,
    Help as HelpIcon,
    HelpOutline as HelpOutlineIcon,
    HighlightOff as HighlightOffIcon,
    ListAlt as ListAltIcon,
    PlaylistAddCheck as PlaylistAddCheckIcon,
    PhotoCamera as PhotoIcon,
    Refresh as RefreshIcon,
    Save as SaveIcon,
    Search as SearchIcon,
} from '@material-ui/icons';
import Viewer from 'react-viewer';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2';
import { Autocomplete } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme)=>(
    {
        container:{
            height:'82vh',
            maxHeight:'83vh',
            width:'100%',
            overflowY:'auto',
        },
        paper:{
            height:'100%',
            width:'100%',
            padding:10,
            overflow:'auto'
        },
        inputUp:{ 
            borderBottom:' 4px solid #0E3B5F',
            borderRight:' 4px solid #0E3B5F',
            borderTop:' 1px solid #0E3B5F',
            borderLeft: '1px solid #0E3B5F',
            padding: 10,
            color:'#0E3B5F',
            textTransform:'uppercase',
            fontWeight:'bolder',
            cursor: 'pointer',
            borderRadius:'8px',
            width:'100%'
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        containerUpload:{
            maxHeight:450,
            height:450
        },
        rootCard:{
            maxHeight:340,
            height:340,
        }
        
    }
));

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h4" color='primary'>{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

const ReporteContext = createContext();

const ButtonPrev = ()=>{
    const { activePageIndex, handleBack } = useContext(ReporteContext);

    return(
        
        <Grid item md={6} sm={12} xs={12}>
            { activePageIndex > 0 ? ( 
            <Grid container justify='center'>
                <Grid item sm={4} xs={6}>
                    <Button onClick={handleBack} variant='contained' color='primary' fullWidth>
                        ATRAS
                    </Button>
                </Grid>
            </Grid>
            ):null}
        </Grid>
        
    )
};

const ButtonNext = ()=>{
    const { activePageIndex, handleNext, steps, isFirstComplete, isSecondComplete, isThirdComplete, handleEnd, isFourComplete } = useContext(ReporteContext);

    return(
        <Grid item md={6} sm={12} xs={12}>
            {
                activePageIndex < steps ? ( 
                <Grid container justify='center'>
                    <Grid item sm={4} xs={6}>
                        {
                            activePageIndex === 0 ?
                            <Button onClick={handleNext} variant='contained' color='primary' fullWidth disabled={isFirstComplete ? false : true}>
                                SIGUIENTE
                            </Button>:
                            activePageIndex === 1 ?
                            <Button onClick={handleNext} variant='contained' color='primary' fullWidth disabled={isSecondComplete ? false : true}>
                                SIGUIENTE
                            </Button>:
                            activePageIndex === 2 ?
                            <Button onClick={handleNext} variant='contained' color='primary' fullWidth disabled={isThirdComplete ? false : true}>
                                SIGUIENTE
                            </Button>:
                            <Button onClick={handleEnd} variant='contained' color='primary' fullWidth disabled={isFourComplete ? false : true}>
                                FINALIZAR
                            </Button>
                        }
                    
                    </Grid>
                </Grid>):null
            }
        </Grid>
    )
};

const Pages = ({children})=>{
    const { activePageIndex, isFirstComplete, isSecondComplete, isThirdComplete, isFourComplete, handleValidateSecond} = useContext(ReporteContext)
    const pages = Children.toArray(children);
    const currentPage = pages[activePageIndex];


    return(
        <Fragment>
            <Grid item  md={9} sm={12} xs={12} style={{minHeight:350}}>
                {currentPage}
            </Grid>
            <Grid item md={9} sm={12} xs={12}>
                    <Divider/>
            </Grid>
            <Grid item md={9} sm={11} xs={12} >
                <Grid container justify='center' spacing={1} style={{height:100}}>
                    <Grid item xs={1} style={{alignSelf:'center', display:'flex', justifyContent:'center'}}>
                        <Fab color={isFirstComplete ? 'primary':'secondary'} size='small' disabled={activePageIndex === 0 ? false : true}>
                            {isFirstComplete ? <CheckIcon/> : <EditLocationIcon/>}
                        </Fab>
                    </Grid>
                    <Grid item xs={2} style={{alignSelf:'center'}}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={1} style={{alignSelf:'center', display:'flex', justifyContent:'center'}}>
                        <Fab color={isSecondComplete ? 'primary':'secondary'} size='small' disabled={activePageIndex === 1 ? false : true} onClick={handleValidateSecond} style={{alignSelf:'center'}}>
                            {isSecondComplete ? <CheckIcon/> : <PhotoIcon/>}
                        </Fab>     
                    </Grid>
                    <Grid item xs={2} style={{alignSelf:'center'}}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={1} style={{alignSelf:'center', display:'flex', justifyContent:'center'}}>
                        <Fab color={isThirdComplete ? 'primary':'secondary'} size='small' disabled={activePageIndex === 2 ? false : true}>
                            {isThirdComplete ? <CheckIcon/> : <ListAltIcon/>}
                        </Fab>
                    </Grid>
                    <Grid item xs={2} style={{alignSelf:'center'}}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={1} style={{alignSelf:'center', display:'flex', justifyContent:'center'}}>
                        <Fab color={isFourComplete ? 'primary':'secondary'} size='small' disabled={activePageIndex === 3 ? false : true}>
                            {isFourComplete ? <CheckIcon/> : <PlaylistAddCheckIcon/>}
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
     )
};

const AgregarMerc = ({children, steps})=>{
    const classes = useStyles();
    const [ activePageIndex, setActivePageIndex ] = useState(0);
    const [ isFirstComplete, setFirstComplete ] = useState(false);
    const [ isSecondComplete, setSecondComplete ] = useState(false);
    const [ isThirdComplete, setThirdComplete ] = useState(false);
    const [ isFourComplete, setFourComplete ] = useState(false);
    const [ DatosLocal, setDatosLocal ] = useState({
        searchBy:'', NumMerc:'', numpro:'', Mercaderista:'', Periodo:'', Cadena:'', Local:'', Status:'', Mercaderistas:[], Ruta:[], Fotos:[]
    });
    const [ DatosProyecto, setDatosProyecto ] = useState({Mercaderistas:[]});
    const [ DatosCadenas, setDatosCadenas ] = useState([]);
    const [ DatosLocales, setDatosLocales ] = useState([]);
    const [ DatosPhotos, setDatosPhotos ] = useState([
        {tipo:'PERSONAL', num:1, src:'', name:'', status:false}, 
        {tipo:'ELEMENTO', num:2, src:'', name:'', status:false}, 
        {tipo:'PANORAMICA', num:3, src:'', name:'', status:false}, 
        {tipo:'ADJUNTA', num:4, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:5, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:6, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:7, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:8, src:'', name:'', status:false},
    ]);

    const [ DatosPdv, setDatosPdv] = useState({
        isNew:true,
        countStock:false,
        motivoStock:'',
        MarcasArr:[],
        isProcess:false,
        data:[{MARCA:'',PRESENTACION:'', VARIANTE:'', TAMANO:0, CANTIDAD:0, idEl:'data_0'}]
    });

    const [ arrMarcas, setArrMarcas ] = useState([]);
    const [ onlyMarcas, setOnlyMarcas ] = useState([]);
    const [ TiptraLocales, setTiptraLocales ] = useState([]);

    const handleBack = ()=>{ setActivePageIndex( index => index - 1 )};

    const handleNext = ()=>{ setActivePageIndex( index => index + 1 )};

    const handleDatosProyecto = useCallback((data)=>{
        setDatosProyecto(data);
        setOnlyMarcas(data.MarcasArr);
    },[DatosProyecto, setDatosProyecto]);

    const handleDatosLocal = useCallback((data, cadenas, locales)=>{
        setDatosLocal(data);
        setDatosCadenas(cadenas);
        setDatosLocales(locales);
    },[DatosLocal, setDatosLocal, DatosCadenas, DatosLocales, setDatosCadenas, setDatosLocales])

    const handleResetDatas = useCallback(()=>{
        setDatosProyecto({Mercaderistas:[]})
        setDatosLocal({searchBy:'', NumMerc:'', numpro:'', Mercaderista:'', Periodo:'', Cadena:'', Local:'', Status:'', Mercaderistas:[], Ruta:[] });
        setDatosCadenas([]);
        setDatosLocales([]);
        setTiptraLocales([]);
        setDatosPhotos([
            {tipo:'PERSONAL', num:1, src:'', name:'', status:false}, 
            {tipo:'ELEMENTO', num:2, src:'', name:'', status:false}, 
            {tipo:'PANORAMICA', num:3, src:'', name:'', status:false}, 
            {tipo:'ADJUNTA', num:4, src:'', name:'', status:false},
            {tipo:'ADJUNTA', num:5, src:'', name:'', status:false},
            {tipo:'ADJUNTA', num:6, src:'', name:'', status:false},
            {tipo:'ADJUNTA', num:7, src:'', name:'', status:false},
            {tipo:'ADJUNTA', num:8, src:'', name:'', status:false},
        ]);
        setDatosPdv({
            isNew:true,
            countStock:false,
            motivoStock:'',
            data:[{MARCA:'',PRESENTACION:'', VARIANTE:'', TAMANO:0, CANTIDAD:0, idEl:'data_0', OBSERVACION:''}]
        })
    },[DatosLocal, DatosPdv, setDatosLocal, DatosCadenas, DatosLocales, setDatosCadenas, setDatosLocales, DatosProyecto, setDatosProyecto]);

    const handleDatosFotos = useCallback((tipo, num, src, name, status)=>{
        const arr = DatosPhotos.map((elPhoto)=>{
            if(elPhoto.num === num){
                const objeto = {};
                objeto.tipo = tipo;
                objeto.num = num;
                objeto.src = src;
                objeto.name = name;
                objeto.status = status;
                console.log(objeto);
                return objeto;
            }else{
                return elPhoto;
            }
        });
        setDatosPhotos(arr);
    },[DatosPhotos, setDatosPhotos]);

    const handleAddDatosPdv = useCallback((countStock, dataPdv)=>{
        if(countStock){
            setDatosPdv({...DatosPdv, data:dataPdv});
        }else{
            setDatosPdv({...DatosPdv, motivoStock:dataPdv});
        }
    },[DatosPdv, setDatosPdv]);

    const handleNewStatus = useCallback((nuevo, count, arr)=>{
        if(count){
            setDatosPdv({...DatosPdv, isNew:nuevo, countStock:count, data:arr});
        }else{
            setDatosPdv({...DatosPdv, isNew:nuevo, countStock:count});
        }
        
    },[DatosPdv, setDatosPdv]);

    const handleUpdateTiptraLocales = useCallback((data)=>{
        setTiptraLocales(data);
    },[TiptraLocales, setTiptraLocales ])

    const handleEnd = useCallback(()=>{
        const objeto = {...DatosLocal};
            delete objeto.Ruta;
            delete objeto.isFoundProject;
        objeto.idProyecto = DatosProyecto._id;
        objeto.Photos = DatosPhotos;
        objeto.TablaPdv = DatosPdv;
        objeto.TablaTiptra = TiptraLocales;
        Swal.fire({
            title:'LA INFORMACION ES CORRECTA?',
            text:'NO PODRÁ EDITAR ESTE REPORTE',
            confirmButtonText:'PROCEDER',
            showDenyButton:true,
            showCancelButton:true,
            denyButtonText:'NO',
            confirmButtonColor:'#0E3B5F',
            width:700,
            grow:true,
            allowEscapeKey:false,
            allowOutsideClick:false
        }).then(result=>{
            if(result.isConfirmed){
                fetch('/Mercaderistas/Reporte',{
                    method: 'POST',
                    body: JSON.stringify(objeto),
                    headers:{
                      'Content-Type':'application/json'
                    }
                })
                .then(response=> response.json())
                .then(result =>{
                    console.log(result)
                    if(result.message){
                        Swal.fire({
                            title:'REPORTE GUARDADO',
                            icon:'success',
                            confirmButtonText:'OK',
                            showDenyButton:false,
                            showCancelButton:false,
                            confirmButtonColor:'#0E3B5F',
                            width:400,
                            grow:true,
                            allowEscapeKey:false,
                            allowOutsideClick:false
                        }).then(resultS=>{
                            if(resultS.isConfirmed){
                                console.info('ok')
                                window.location.reload();
                            }
                        })
                   }else{
                       alert('ERROR');
                   }
                })
                
            }else if(result.isDenied){
                Swal.fire({
                    title:'VUELVA A REVISAR LA INFORMACION',
                    toast:true,
                    confirmButtonText:'OK',
                    showDenyButton:false,
                    showCancelButton:false,
                    confirmButtonColor:'#0E3B5F',
                    width:500,
                    grow:true,
                    allowEscapeKey:false,
                    allowOutsideClick:false
                })
            }
        })
    });

    useEffect(()=>{
        async function handleMarcas(){
            const reqMarcasMerc = await fetch('/MarcasMerc');
            const infoMarcaMerc= await reqMarcasMerc.json();
            setArrMarcas(infoMarcaMerc);
        }
        handleMarcas();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const context = {
        activePageIndex,
        handleBack,
        handleNext,
        steps,
        isFirstComplete,
        isSecondComplete,
        isThirdComplete,
        isFourComplete,
        setFirstComplete,
        setSecondComplete,
        setThirdComplete,
        setFourComplete,
        DatosLocal,
        DatosProyecto,
        DatosCadenas,
        DatosLocales,
        DatosPhotos,
        DatosPdv,
        arrMarcas,
        onlyMarcas,
        TiptraLocales,
        handleEnd,
        handleDatosLocal,
        handleDatosProyecto,
        handleResetDatas,
        handleDatosFotos,
        handleNewStatus,
        handleAddDatosPdv,
        handleUpdateTiptraLocales
    };

    return(
        <Paper className={classes.paper} variant="outlined">
            <ReporteContext.Provider value={context}>
            <Grid container justify='center' alignItems='flex-start' alignContent='flex-start' spacing={2} className={classes.container}>
                {children}
            </Grid>
            </ReporteContext.Provider>
        </Paper>   
    );
};

AgregarMerc.Pages = Pages;
AgregarMerc.ButtonPrev = ButtonPrev;
AgregarMerc.ButtonNext = ButtonNext;

const FirstEl = ()=>{
    const { enqueueSnackbar } = useSnackbar();
    const { 
        DatosLocal, 
        DatosProyecto, 
        DatosCadenas, 
        DatosLocales, 
        handleDatosLocal, 
        handleDatosProyecto, 
        setFirstComplete, 
        setSecondComplete,
        setThirdComplete,
        setFourComplete,
        handleResetDatas,
        handleUpdateTiptraLocales,
    } = useContext(ReporteContext);
    const [ Datos, setDatos ] = useState({Mercaderistas:[]});
    const [ dataMerc, setDataMerc ] = useState({Ruta:[], isFoundProject:false, Status:''});
    const [ dataLocal, setDataLocal ] = useState({});
    const [ Cadenas, setCadenas ] = useState([]);
    const [ Locales, setLocales ] = useState([]);
    //const [ TipTra, setTipTra ] = useState([]);

    useEffect(()=>{
        setDatos(DatosProyecto);
        setDataMerc(DatosLocal);
        setCadenas(DatosCadenas);
        setLocales(DatosLocales);

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;   
            setDataMerc({...dataMerc, Coordenadas:{Latitud:crd.latitude, Longitud:crd.longitude}});  
        };
          
        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    },[]);

    const handleDatosSearch = (e)=>{ setDataMerc({...dataMerc, searchBy:e.target.value}) };

    const handleDataMerc = ({target})=>{ setDataMerc({...dataMerc, [target.id]:target.value})}

    const handleSearch = ()=>{
        if(dataMerc.numpro === '' && dataMerc.NumMerc === ''){
            enqueueSnackbar('CAMPO BUSQUEDA VACIO', {variant:'error'});
        }else if(dataMerc.searchBy === ''){
            enqueueSnackbar('SELECCIONE UN TIPO DE BUSQUEDA', {variant:'error'});
        }else{
            if(dataMerc.searchBy === 'NUMPRO'){
                handleSearchNumpro()
            }else{
                handleSearchNum()
            }
        }
    };

    const handleSearchNum = ()=>{
        fetch('/Mercaderistas/FindOneNum',{
            method: 'POST',
            body: JSON.stringify({NumMerc:parseInt(dataMerc.NumMerc)}),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(response=> response.json())
        .then(result =>{
            console.log(result);
            if(result.length > 0){
                setDatos(result[0]);
                enqueueSnackbar('PROJECT CHARGED',{variant:'info'});
                setDataMerc({...dataMerc, isFoundProject:true, numpro:result[0].numpro, NumMerc:result[0].NumMerc});
            }else if(result.status){
                enqueueSnackbar(result.status,{variant:'error'});
            }else{
                enqueueSnackbar('NO EXISTE ESTE NUMERO EN LA DB',{variant:'error'});
            }
            
        });
    };

    const handleSearchNumpro = ()=>{
        fetch('/Mercaderistas/FindOneNumpro',{
            method: 'POST',
            body: JSON.stringify({numpro:parseInt(dataMerc.numpro)}),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(response=> response.json())
        .then(result =>{
            console.log(result);
            if(result.length > 0){
                setDatos(result[0]);
                enqueueSnackbar('PROJECT CHARGED',{variant:'info'});
                setDataMerc({...dataMerc, isFoundProject:true, numpro:result[0].numpro, NumMerc:result[0].NumMerc});
            }else if(result.status){
                enqueueSnackbar(result.status,{variant:'error'});
            }else{
                enqueueSnackbar('NO EXISTE ESTE PPTO. EN LA DB',{variant:'error'});
            }
            
        })
    };

    const handleReset = ()=>{
        setDatos({Proyecto:'', Cliente:'', Mercaderistas:[{Mercaderista:''}], numpro:'', NumMerc:'', TipTraArr:[{Tiptra:''}]});
        setDataMerc({TipTraArrMerc:[], Mercaderista:'', FechaInicio:'2021-08-01', FechaFinal:'2021-08-01', Periodo:'', isFoundProject:false, RutaSelected:'', Status:''});
        setCadenas([]);
        setLocales([]);
        //setDataLocal({Cadena:'', Local:'', Ciudad:'', Direccion:'', Provincia:'', Coordenadas:'' });
        //setTipTra([]);
        handleResetDatas();
        setFirstComplete(false);
        setSecondComplete(false);
        setThirdComplete(false);
        setFourComplete(false);
    };

    const handleSelectMerc = ({target})=>{ 
        const MercFilter = Datos.Mercaderistas.filter(val=> val.Mercaderista === target.value)[0];
        setDataMerc({...dataMerc, Ruta:MercFilter.Ruta, Mercaderista:target.value});
    };

    const handleSelectRuta =(e, value) =>{ 
        if(value === ''){
            setCadenas([]);
            setLocales([]);
            setDataMerc({...dataMerc, RutaSelected:'', Status:''});
            setDatos({...Datos, Status:''});
        }else{
            const rutaEdit = dataMerc.Ruta.filter(elRuta => elRuta.Periodo === value)[0];
            const cad = rutaEdit.Data.map(elData => elData.cadena.toString());
            const dataCad = new Set(cad);
            const resultCad = [...dataCad];
            setDataMerc({...dataMerc, RutaSelected:value});
            setCadenas(resultCad);
        }  
    };

    const handleSelectCadena = (e, value)=>{
        if(value === '' || value === null){
            setDataMerc({...dataMerc, Cadena:'', Local:'', Ciudad:'', Direccion:'', Provincia:'', Coordenadas:'', Status:'' });
        }else{
            const rutaEdit = dataMerc.Ruta.filter(elRuta => elRuta.Periodo === dataMerc.RutaSelected)[0];
            const arr1 = rutaEdit.Data.filter(elData => elData.cadena.toString() === value.toString());
            const arr2 = arr1.map(elData => elData.local.toString());
            const dataLocal2 = new Set(arr2);
            const resultLocal = [...dataLocal2];
            setDataMerc({...dataMerc, Cadena:value });
            setLocales(resultLocal);
        }
    };

    const handleSelectLocal = (e, value)=>{
        if(value === '' || value === null){
            setDataMerc({...dataMerc, Local:'', Ciudad:'', Direccion:'', Provincia:'', Coordenadas:'', Status:'' });
            handleUpdateTiptraLocales([]);
        }else{      
            const rutaEdit = dataMerc.Ruta.filter(elRuta => elRuta.Periodo === dataMerc.RutaSelected)[0];
            const arr1 = rutaEdit.Data.filter(elData => elData.cadena.toString() === dataMerc.Cadena.toString());
            const infoLocal = arr1.filter(elData => elData.local.toString() === value.toString())[0];
            const arrTiptra = [];
            for (const property in infoLocal) {
                if(infoLocal[property] ===  '1' ) arrTiptra.push(property)
            }
            const arrNewTt = arrTiptra.map((elTip, index)=>{
                const objeto = {};
                objeto.Tiptra = elTip;
                objeto.STATUS = '';
                objeto.OBSERVACION = '';
                objeto.idEl = `${elTip}_${index}`
                return objeto;
            });
            const objectLocal = {...infoLocal};
            objectLocal.Coordenadas = dataMerc.Coordenadas;
            setDataLocal(objectLocal)
            handleUpdateTiptraLocales(arrNewTt);
            if(infoLocal.Coordenadas){
                setDataMerc({...dataMerc, Local:infoLocal.local, Ciudad:infoLocal.ciudad, Direccion:infoLocal.direccion, Provincia:infoLocal.provincia, Coordenadas:infoLocal.Coordenadas });
            }else{
                setDataMerc({...dataMerc, Local:infoLocal.local, Ciudad:infoLocal.ciudad, Direccion:infoLocal.direccion, Provincia:infoLocal.provincia });
            }
            
        }
    };

    const handleSaveCoordenadas = ()=>{
        fetch('/cadenasmerc/coordenadas',{
            method: 'PUT',
            body: JSON.stringify(dataLocal),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(response=> response.json())
        .then(result =>{
            console.log(result);
            if(result.message) console.info('COORDENADAS ALMACENADAS')
        })
    };

    const handleDatosStatus = ({target})=>{ 
        setDataMerc({...dataMerc, Status:target.value});
        if(target.value === 'ACTIVO'){
            setFirstComplete(true);
            const objeto = {...dataMerc};
            objeto.Status = target.value;
            console.info(objeto);
            handleDatosLocal(objeto, Cadenas, Locales);
            handleDatosProyecto(Datos);
            handleSaveCoordenadas();
        }else{
            setFirstComplete(false);
            const objeto = {...dataMerc};
            objeto.Status = target.value
            handleDatosLocal(objeto, Cadenas, Locales);
            handleDatosProyecto(Datos);
        }

    };

    return(   
        <Grid container spacing={1} justify='center' alignContent='center' alignItems='center' style={{padding:10}}>
            <Grid item md={6} sm={10} xs={12} style={{display:'flex', justifyContent:'center'}}>
                <Chip color='secondary' label='INFORMACION LOCAL' style={{fontWeight:'bolder', width:'100%', height:30}}/>
            </Grid>
            <Grid item md={9} sm={12} xs={12}>
                <Divider/>
            </Grid>
            <Grid item md={9} sm={12} xs={12}>
                <Grid container justify='center' spacing={1} style={{height:300}}>
                    <Grid item md={5} sm={12} xs={12}>
                        {
                            dataMerc.searchBy === 'NUMERO' ?
                            <TextField
                                id='NumMerc'
                                label='Busqueda'
                                value={dataMerc.NumMerc || ''}
                                onChange={handleDataMerc}
                                variant='outlined'
                                size='small'
                                fullWidth
                            />:
                            <TextField
                                id='numpro'
                                label='Busqueda'
                                value={dataMerc.numpro || ''}
                                onChange={handleDataMerc}
                                variant='outlined'
                                size='small'
                                fullWidth
                            />
                        }
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Grid container justify='flex-start' spacing={1}>
                            <Grid item md={8} sm={8} xs={8}>
                                <TextField
                                    id='searchBy'
                                    label='searchBy'
                                    value={dataMerc.searchBy || ''}
                                    onChange={handleDatosSearch}
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    select
                                >
                                    <MenuItem  value='NUMPRO' style={{textAlign:'center', fontWeight:'bolder'}}> NUMPRO </MenuItem >
                                    <MenuItem  value='NUMERO' style={{textAlign:'center', fontWeight:'bolder'}}> NUMERO </MenuItem >
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title='BUSCAR' arrow placement='top'>
                                    <span>
                                    <Fab onClick={handleSearch} size='small' color='primary'>
                                        <SearchIcon/>
                                    </Fab>
                                    </span>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title='RESET' arrow placement='top'>
                                    <span>
                                    <Fab onClick={handleReset} size='small' color='primary'>
                                        <RefreshIcon/>
                                    </Fab>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={10} sm={12} xs={12}>
                        <TextField
                            id='mercSelect'
                            label='Mercaderista'
                            value={dataMerc.Mercaderista || ''}
                            onChange={handleSelectMerc}
                            variant='outlined'
                            size='small'
                            disabled={!dataMerc.isFoundProject}
                            fullWidth
                            select
                        >
                            {
                                Datos.Mercaderistas.map((val, index)=><MenuItem key={`merc_${index}`}  value={val.Mercaderista} style={{textAlign:'center', fontWeight:'bolder'}}>{val.Mercaderista} </MenuItem >)
                            }
                        </TextField>
                    </Grid>
                    <Grid item md={10} sm={12} xs={12}>
                        <Autocomplete
                            id="Periodo"
                            options={dataMerc.Ruta}
                            disabled={!dataMerc.isFoundProject}
                            size='small'
                            inputValue={dataMerc.RutaSelected || ''}
                            renderInput={params => <TextField {...params} label=" Periodo" variant="outlined"/>}
                            onInputChange={handleSelectRuta}
                            getOptionLabel={option => option.Periodo}
                        />
                    </Grid>
                    <Grid item md={10} sm={12} xs={12}>
                        <Autocomplete
                            id="cadena"
                            options={Cadenas}
                            size='small'
                            value={dataMerc.Cadena || ''}
                            renderInput={params => <TextField {...params} label=" Cadena" variant="outlined"/>}
                            onChange={handleSelectCadena}
                        />
                    </Grid>
                    <Grid item md={10} sm={12} xs={12}>
                        <Autocomplete
                            id="local"
                            options={Locales}
                            size='small'
                            value={dataMerc.Local || ''}
                            renderInput={params => <TextField {...params} label=" Local" variant="outlined"/>}
                            onChange={handleSelectLocal}
                        />
                    </Grid>
                    <Grid item md={10} sm={12} xs={12} >
                        <TextField
                            id='Status'
                            label='Status'
                            value={dataMerc.Status || ''}
                            onChange={handleDatosStatus}
                            variant='outlined'
                            size='small'
                            fullWidth
                            select
                        >
                            <MenuItem  value='ACTIVO' style={{color:'green', textAlign:'center', fontWeight:'bolder'}}> ACTIVO </MenuItem >
                            <MenuItem  value='INACTIVO' style={{color:'red', textAlign:'center', fontWeight:'bolder'}}> INACTIVO </MenuItem >
                            <MenuItem  value='ERRADO' style={{color:'blue', textAlign:'center', fontWeight:'bolder'}}> ERRADO </MenuItem >
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
        
    )
};

const SecondEl = ()=>{
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { DatosPhotos, handleDatosFotos, setSecondComplete, isSecondComplete } = useContext(ReporteContext);
    const [ openPhotoPersonal, setOpenPhotoPersonal ] = useState(false);
    const [ openPhotoElement, setOpenPhotoElement ] = useState(false);
    const [ openPhotoPanoramica, setOpenPhotoPanoramica ] = useState(false);
    const [ openPhotosAdjuntas, setOpenPhotosAdjuntas ] = useState(false);
    const [ Datos, setDatos ] = useState([ 
        {tipo:'PERSONAL', num:1, src:'', name:'', status:false}, 
        {tipo:'ELEMENTO', num:2, src:'', name:'', status:false}, 
        {tipo:'PANORAMICA', num:3, src:'', name:'', status:false}, 
        {tipo:'ADJUNTA', num:4, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:5, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:6, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:7, src:'', name:'', status:false},
        {tipo:'ADJUNTA', num:8, src:'', name:'', status:false},
    ]);
    const [ showPersonal, setShowPersonal ] = useState(false);
    const [ showElement, setShowElement ] = useState(false);
    const [ showPanoramica, setShowPanoramica ] = useState(false);
    const [ showAdjuntas, setShowAdjuntas ] = useState(false);

    useEffect(()=>{
        setDatos(DatosPhotos);
        setTimeout(()=>{
            setShowPersonal(true);
            setTimeout(()=>{
                setShowElement(true);
                setTimeout(()=>{
                    setShowPanoramica(true);
                    setTimeout(()=>{
                        setShowAdjuntas(true);
                    },300)
                },300)
            },300)
        },300)
    },[]);

    const handleClosePhotoPersonal=()=>{setOpenPhotoPersonal(false)};
    const handleClosePhotoElement=()=>{setOpenPhotoElement(false)};
    const handleClosePhotoPanoramica=()=>{setOpenPhotoPanoramica(false)};
    const handleClosePhotosAdjuntas=()=>{setOpenPhotosAdjuntas(false)};

    const handleOpenPhotoPanoramica = ()=>{
        const arr = Datos.filter(elPhoto=> elPhoto.status);
        if(arr.length >= 2){
            setOpenPhotoPanoramica(true);
        }else{
            enqueueSnackbar('FALTAN FOTOS', {variant:'error'})
        }
    };

    const handleUpdatePhoto = useCallback((tipo, num, src, name, status )=>{
        //console.log('SecondEl')
        handleDatosFotos(tipo, num, src, name, status);
        const arr = Datos.map(elElem=>{
            if(elElem.num === num){
                const objeto = {};
                objeto.tipo = tipo;
                objeto.num = num;
                objeto.src = src;
                objeto.name = name;
                objeto.status = status;
                return objeto;
            }else{
                return elElem
            }
        });
        setDatos(arr);
        const elarr = arr.filter(elar=> elar.status);
        if(elarr.length >=5 ){ 
            setSecondComplete(true);
        }else{
            setSecondComplete(false);
        }
    },[ Datos, setDatos]);

    return(
        <Fragment>
            <Dialog
                open={openPhotoPersonal}
                onClose={handleClosePhotoPersonal}
                fullWidth
                maxWidth={'sm'}
                style={{padding:0}}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="customized-dialog-personal" onClose={handleClosePhotoPersonal}>
                    <Chip color='secondary' label='FOTO PERSONAL' style={{fontWeight:'bolder'}}/>
                </DialogTitle>
                <DialogContent style={{margin:0, padding:0, overflowX:'hidden', height:510}}>
                    <Divider />
                    <UploadElementYouNET classes={classes} tipo='PERSONAL'  handleUpdatePhoto={handleUpdatePhoto} info={Datos[0]} num={1}/>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openPhotoElement}
                onClose={handleClosePhotoElement}
                fullWidth
                maxWidth={'sm'}
                style={{padding:0}}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="customized-dialog-elemento" onClose={handleClosePhotoElement}>
                    <Chip color='secondary' label='FOTO ELEMENTO' style={{fontWeight:'bolder'}}/>
                </DialogTitle>
                <DialogContent style={{margin:0, padding:0, overflowX:'hidden', height:510}}>
                    <Divider />                         
                    <UploadElementYouNET classes={classes} tipo='ELEMENTO'  handleUpdatePhoto={handleUpdatePhoto} info={Datos[1]} num={2}/>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openPhotoPanoramica}
                onClose={handleClosePhotoPanoramica}
                fullWidth
                maxWidth={'sm'}
                style={{padding:0}}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="customized-dialog-panoramica" onClose={handleClosePhotoPanoramica}>
                    <Chip color='secondary' label='FOTO PANORAMICA' style={{fontWeight:'bolder'}}/>
                </DialogTitle>
                <DialogContent style={{margin:0, padding:0, overflowX:'hidden', height:510}}>
                    <Divider /> 
                    <UploadElementYouNET classes={classes} tipo='PANORAMICA'  handleUpdatePhoto={handleUpdatePhoto} info={Datos[2]} num={3}/>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openPhotosAdjuntas}
                onClose={handleClosePhotosAdjuntas}
                fullWidth
                maxWidth={'sm'}
                style={{padding:0}}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="customized-dialog-adjuntas" onClose={handleClosePhotosAdjuntas}>
                    <Chip color='secondary' label='FOTOS ADJUNTAS' style={{fontWeight:'bolder'}}/>
                </DialogTitle>
                <DialogContent style={{margin:0, padding:0, overflowX:'hidden', height:510}}>
                    <Divider />
                    <UploadElementYouNET classes={classes} tipo='ADJUNTA' handleUpdatePhoto={handleUpdatePhoto} info={Datos[3]} num={4} />
                    <UploadElementYouNET classes={classes} tipo='ADJUNTA' handleUpdatePhoto={handleUpdatePhoto} info={Datos[4]} num={5} />
                    <UploadElementYouNET classes={classes} tipo='ADJUNTA' handleUpdatePhoto={handleUpdatePhoto} info={Datos[5]} num={6} />
                    <UploadElementYouNET classes={classes} tipo='ADJUNTA' handleUpdatePhoto={handleUpdatePhoto} info={Datos[6]} num={7} />
                    <UploadElementYouNET classes={classes} tipo='ADJUNTA' handleUpdatePhoto={handleUpdatePhoto} info={Datos[7]} num={8} />
                </DialogContent>
            </Dialog>  
            <Grid container spacing={1} justify='center' alignContent='center' alignItems='center' style={{padding:10}}>
                <Grid item md={6} sm={10} xs={12} style={{display:'flex', justifyContent:'center'}}>
                    <Chip color='secondary' label='FOTOS' style={{fontWeight:'bolder', width:'100%', height:30}}/>
                </Grid>
                <Grid item md={9} sm={12} xs={12}>
                    <Divider/>
                </Grid>
                <Grid item md={7} sm={10} xs={12}>     
                    <Grow in={showPersonal}>
                        <Button fullWidth onClick={()=>setOpenPhotoPersonal(true)} color={Datos[0].status ? 'primary':'secondary'} variant='contained' startIcon={Datos[0].status? <CheckIcon/> : <PhotoIcon/>} size='large'>
                            PERSONAL
                        </Button>
                    </Grow>      
                </Grid>
                <Grid item md={7} sm={10} xs={12} >
                    <Grow in={showElement}>
                        <Button fullWidth onClick={()=>setOpenPhotoElement(true)} color={Datos[1].status ? 'primary':'secondary'} variant='contained' startIcon={Datos[1].status ? <CheckIcon/> : <PhotoIcon/>} size='large'>
                            ELEMENTO
                        </Button>
                    </Grow>
                </Grid>
                <Grid item md={7} sm={10} xs={12} >
                    <Grow in={showPanoramica}>
                        <Button fullWidth onClick={handleOpenPhotoPanoramica} color={Datos[2].status ? 'primary':'secondary'} variant='contained' startIcon={Datos[2].status ? <CheckIcon/> : <PhotoIcon/>} size='large'>
                            PANORAMICA
                        </Button>
                    </Grow>
                </Grid>
                <Grid item md={7} sm={9} xs={9}>
                    <Grow in={showAdjuntas}>
                    <Button fullWidth onClick={()=>setOpenPhotosAdjuntas(true)} color={isSecondComplete? 'primary':'secondary'} variant='contained' startIcon={isSecondComplete ? <CheckIcon/> : <PhotoIcon/>} size='large'>
                        ADJUNTAS
                    </Button>
                    </Grow>
                </Grid>
            </Grid>
        </Fragment>
    )
}

const ThirdEl = ()=>{
    const { DatosPdv, handleAddDatosPdv, handleNewStatus, arrMarcas, onlyMarcas, setThirdComplete, isThirdComplete } = useContext(ReporteContext)
    const [ Datos, setDatos ] = useState({
        isNew:true,
        countStock:false,
        motivoStock:'',
        data:[{MARCA:'',PRESENTACION:'', VARIANTE:'', TAMANO:0, CANTIDAD:0, idEl:'data_0', OBSERVACION:''}]
    });
    const [ showElement1, setShowElement1 ] = useState(false);
    const [ showElement2, setShowElement2 ] = useState(false);
    const [ modeEdit, setModeEdit ] = useState(true);
   
    useEffect(()=>{
        if(DatosPdv.isNew){
            Swal.fire({
                title:'TE PERMITIERON TOMAR EL STOCK EN EL PDV?',
                showDenyButton:true,
                showCancelButton:false,
                confirmButtonText:'SI',
                denyButtonText:'NO',
                confirmButtonColor:'#0E3B5F',
                width:700,
                grow:true,
                allowEscapeKey:false,
                allowOutsideClick:false
            }).then(result=>{
                if(result.isConfirmed){
                    const arrM = arrMarcas.filter(elMarca=> onlyMarcas.includes(elMarca.MARCA));
                    const newArr = arrM.map((elmap, index)=>{
                        const objeto = {...elmap};
                        objeto.CANTIDAD = 0;
                        objeto.idEl = `data_${index}`;
                        objeto.OBSERVACION = '';
                        return objeto;
                    });
                    setDatos({...Datos, isNew:false, countStock:true,  data:newArr});
                    handleNewStatus(false, true, newArr);
                }else{
                    handleNewStatus(false, false);
                    setDatos({...Datos, isNew:false, countStock:false});
                    setTimeout(()=>{
                        setShowElement1(true);
                        setTimeout(()=>{
                            setShowElement2(true);
                        },300);
                    },300);
                }
            })
        }else{
            setDatos(DatosPdv);
            setModeEdit(false);
            setTimeout(()=>{
                setShowElement1(true);
                setTimeout(()=>{
                    setShowElement2(true);
                },300);
            },300);
        }
    },[]); 

    const handleUpdateCell = (id, idEl, value)=>{
        const arr = Datos.data.map(elDato=>{
            if(elDato.idEl === idEl){
                const objeto = {...elDato};
                objeto[id] = value;
                return objeto
            }else{
                return elDato
            }
        })
        setDatos({...Datos, data:arr});
    };

    const handleDatos = ({target})=>{ 
        setDatos({...Datos, motivoStock:target.value});
        handleAddDatosPdv(Datos.countStock, target.value);
        setThirdComplete(true);
    };


    const handleSave = ()=>{
        if(modeEdit){
            handleAddDatosPdv(Datos.countStock, Datos.data);
            setModeEdit(false);
            if(!isThirdComplete)setThirdComplete(true);
        }else{
            setModeEdit(true);
        }
    };

    const handleValidar = ()=>{
        if(Datos.motivoStock === ''){
            alert('INGRESE UN MOTIVO')
        }else{
            setThirdComplete(true);
        }
    };

    return(
        <Grid container justify={Datos.countStock ? 'flex-end' : 'center'} spacing={2} style={{width:'100%'}}>
                
            {   Datos.countStock ?
                <Fragment>
                <Grid item xs={1} style={{height:30}}>
                    <Tooltip title={modeEdit ? 'GUARDAR': 'EDITAR'} placement='left'>
                        <span>
                        <IconButton color='primary' variant='contained'  onClick={handleSave}>
                        { modeEdit ? <SaveIcon/> : <EditIcon/>}
                        </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper} style={{height:335, maxHeight:335, minHeight:335, overflowX:'hidden', overflowY:'auto', marginTop:10}}>
                        <Table stickyHeader  style={{minWidth: 650}} aria-label="simple table">
                            <TableHead >
                            <TableRow >
                                <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff'}}>MARCA</TableCell>
                                <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff'}}>PRESENTACION</TableCell>
                                <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff'}}>VARIANTE</TableCell>
                                <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff'}}>TAMAÑO</TableCell>
                                <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff', maxWidth:100, width:100}}>CANTIDAD</TableCell>
                                <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff'}}>OBSERVACION</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody >
                            {Datos.data.map((row) => (
                                <TableRow key={row.idEl}>
                                    <TableCell align="center" style={{maxWidth:150, width:150}}>{row.MARCA}</TableCell>
                                    <TableCell align="center" style={{maxWidth:150, width:150}}>{row.PRESENTACION}</TableCell>
                                    <TableCell align="center" style={{maxWidth:150, width:150}}>{row.VARIANTE}</TableCell>
                                    <TableCell align="center" style={{maxWidth:100, width:100}}>{row.TAMANO}</TableCell>
                                    <CellThird info={row.CANTIDAD} handleUpdateCell={handleUpdateCell} modeEdit={modeEdit} idEl={row.idEl} id={'CANTIDAD'}/>
                                    <CellThird info={row.OBSERVACION} handleUpdateCell={handleUpdateCell} modeEdit={modeEdit} idEl={row.idEl} id={'OBSERVACION'}/>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                </Fragment>
                
            :
            <Fragment>
                <Grid item xs={8} style={{textAlign:'center', alignSelf:'center'}}>
                    <Grow in={showElement1}>
                        <Typography variant="h5" gutterBottom>
                            INGRESE EL MOTIVO POR EL CUAL NO TOMO EL STOCK
                        </Typography>
                    </Grow>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title='VALIDAR' placement='right'>
                        <span>
                            <Fab color={isThirdComplete ? 'primary': 'secondary'} size='small'  onClick={handleValidar}>
                            { isThirdComplete ? <CheckIcon style={{color:'#fff'}}/> : <HelpOutlineIcon style={{color:'#fff'}}/>}
                            </Fab>
                        </span>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Grow in={showElement2}>
                        <TextField
                            value={Datos.motivoStock}
                            onChange={handleDatos}
                            variant='outlined'
                            label='MOTIVO'
                            fullWidth
                            select
                        >
                        <MenuItem  value='EL PDV NO ESTÁ AUTORIZADO A ENTREGAR STOCK' style={{textAlign:'center', fontWeight:'bolder'}}> EL PDV NO ESTÁ AUTORIZADO A ENTREGAR STOCK </MenuItem >
                        <MenuItem  value='EL PDV INDICA QUE NO TENEMOS AUTORIZACIÓN POR PARTE DE LA CADENA PARA ESTA INFO' style={{textAlign:'center', fontWeight:'bolder'}}> EL PDV INDICA QUE NO TENEMOS AUTORIZACIÓN POR PARTE DE LA CADENA PARA ESTA INFO </MenuItem >
                        <MenuItem  value='NO SE ENCUENTRA EL ENCARGADO QUE ENTREGA ESTA INFO' style={{textAlign:'center', fontWeight:'bolder'}}> NO SE ENCUENTRA EL ENCARGADO QUE ENTREGA ESTA INFO </MenuItem >
                        <MenuItem  value='EL PDV SE ENCUENTRA EN MOVIMIENTO CON CLIENTES Y POR ÉSTE MOTIVO, NO NOS PUDIERON ENTREGAR ESTA INFO' style={{textAlign:'center', fontWeight:'bolder'}}> EL PDV SE ENCUENTRA EN MOVIMIENTO CON CLIENTES Y POR ÉSTE MOTIVO, NO NOS PUDIERON ENTREGAR ESTA INFO </MenuItem >
                        </TextField>
                    </Grow>
                </Grid>
            </Fragment>
            }
        </Grid>
    );
};

const FourEl = ()=>{
    const { TiptraLocales, handleUpdateTiptraLocales, setFourComplete } = useContext(ReporteContext);
    const [ Datos, setDatos ] = useState([]);
    const [ modeEdit, setModeEdit ] = useState(true);

    useEffect(()=>{
        setDatos(TiptraLocales);
        handleUpdateTiptraLocales(TiptraLocales);
    },[]);

    const handleUpdateCell = (id, idEl, value)=>{
        const arr = Datos.map(elDato=>{
            if(elDato.idEl === idEl){
                const objeto = {...elDato};
                objeto[id] = value;
                return objeto
            }else{
                return elDato
            }
        })
        setDatos(arr);
    };

    const handleSave = ()=>{
        if(modeEdit){
            handleUpdateTiptraLocales(Datos);
            setModeEdit(false);
            setFourComplete(true);
        }else{
            setModeEdit(true);
        }
    };

    return(
        <Grid container justify='flex-end' spacing={1}>
            <Grid item xs={1} style={{height:30}}>
                <Tooltip title={modeEdit ? 'GUARDAR': 'EDITAR'} placement='left'>
                    <span>
                    <IconButton color='primary' variant='contained'  onClick={handleSave}>
                    { modeEdit ? <SaveIcon/> : <EditIcon/>}
                    </IconButton>
                    </span>
                </Tooltip>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} style={{height:335, maxHeight:335, minHeight:335, overflowX:'hidden', overflowY:'auto', marginTop:10}}>
                    <Table stickyHeader  style={{minWidth: 500}} aria-label="simple table">
                        <TableHead >
                        <TableRow >
                            <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff', maxWidth:200, width:200}}>TIPO TRABAJO</TableCell>
                            <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff', maxWidth:100, width:100}}>STATUS</TableCell>
                            <TableCell align="center" style={{backgroundColor:'#0E3B5F', color:'#fff', maxWidth:200, width:200}}>OBSERVACION</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody >
                        {Datos.map((row) => (
                            <TableRow key={row.idEl}>
                                <TableCell align="center" style={{maxWidth:200, width:200}}>{row.Tiptra}</TableCell>
                                <CellThird2 info={row.STATUS} handleUpdateCell={handleUpdateCell} modeEdit={modeEdit} idEl={row.idEl} id={'STATUS'}/>
                                <CellThird info={row.OBSERVACION} handleUpdateCell={handleUpdateCell} modeEdit={modeEdit} idEl={row.idEl} id={'OBSERVACION'}/>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

const CellThird = ({modeEdit, handleUpdateCell, info, id, idEl })=>{
    const [ infoCell, setInfoCell ] = useState('');

    useEffect(()=>{
        setInfoCell(info);
    },[]);

    const handleDatos = ({target})=>{ setInfoCell(target.value)}

    const handleUpdate = ({target})=>{
        handleUpdateCell(id, idEl, target.value)
    };

    return(
        <Fragment>
            {
                modeEdit ?
                <TableCell style={{maxWidth:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200 , width:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200}}>
                    <Input
                        value={infoCell}
                        onChange={handleDatos}
                        onBlur={handleUpdate}
                        fullWidth
                        margin='dense'
                    />
                </TableCell>:
                <TableCell align="center" style={{maxWidth:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200 , width:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200}}>{infoCell}</TableCell>
            }
        </Fragment>
    
    )
};

const CellThird2 = ({modeEdit, handleUpdateCell, info, id, idEl })=>{
    const [ infoCell, setInfoCell ] = useState('');

    useEffect(()=>{
        setInfoCell(info);
    },[]);

    const handleDatos = ({target})=>{ 
        setInfoCell(target.value)
        handleUpdateCell(id, idEl, target.value)
    };

    return(
        <Fragment>
            {
                modeEdit ?
                <TableCell style={{maxWidth:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200 , width:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200}}>
                    <TextField
                        value={infoCell}
                        onChange={handleDatos}
                        fullWidth
                        margin='dense'
                        select
                    >
                        <MenuItem  value='SI' style={{textAlign:'center', fontWeight:'bolder'}}> SI </MenuItem >
                        <MenuItem  value='NO' style={{textAlign:'center', fontWeight:'bolder'}}> NO </MenuItem >
                    </TextField>
                </TableCell>:
                <TableCell align="center" style={{maxWidth:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200 , width:id === 'CANTIDAD' || id === 'STATUS' ? 100 : 200}}>{infoCell}</TableCell>
            }
        </Fragment>
    
    )
};

const UploadElementYouNET = ({classes, tipo, info, handleUpdatePhoto, num})=>{
    const { enqueueSnackbar } = useSnackbar();
    const [ photoReport, setPhotoReport ] = useState();
    const [ photoReportPreview, setPhotoReportPreview ] = useState('');
    const [ showElement, setShowElement ]= useState(false);
    const [ isSelectElement, setElementSelect ] =useState (false);
    const [ openPhotos, setOpenPhotos ] = useState(false);
    const [ modePhoto, setModePhoto ] = useState(false);
    const [ Datos, setDatos ] = useState({tipo:'', src:'', num:0, name:'', status:false});
    const [ isUpdating, setUpdating ] = useState(false);

    useEffect(()=>{
        console.info(photoReport)
        if(info.src){
            if(info.src !== ''){
                setModePhoto(true);
                setDatos(info)
            }
        }
    },[]);

    useEffect(()=>{
        if(showElement) setShowElement(false);
    },[showElement]);

    const handleSubmitPhotoReport = (e)=> {
        setUpdating(true);
        e.preventDefault();
        let name = uuidv4();
        const nombreImagen = `${name}.${photoReport.name.split('.').pop().toString()}`;
        let formD = new FormData();
        formD.append('imagen',photoReport, nombreImagen);
        fetch('/Mercaderistas/Photos',{method:'POST',body:formD})
        .then(response => response.json())
        .then(result => {             
            if(result.message){
                enqueueSnackbar(result.message, {variant:'success'});
                const srcComplete = `/fotosmerc/${nombreImagen}`;
                setDatos({...Datos, src:srcComplete, name});
                setUpdating(false);
                setModePhoto(true);
                handleUpdatePhoto(tipo, num, srcComplete, name, true);
            }else{
                enqueueSnackbar(result.status, {variant:'error'})
                setUpdating(false);
            }
        });
    };

    const handleImageChangeReport = (e)=>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            console.info(file);
            setPhotoReport(file);
            setPhotoReportPreview(reader.result);
            setElementSelect(true);
        }
    
        reader.readAsDataURL(file)
    };

    const handleDeleteImage = ()=>{
        if(modePhoto){
            const conf = window.confirm('SE ELIMINARA ESTA IMAGEN DE LA BASE DE DATOS');
            if(conf){
                setPhotoReport();
                setPhotoReportPreview('');
                setShowElement(true);
                setElementSelect(false);
                const nameImage = info.src.split('/').pop().toString();
                fetch('/Mercaderistas/Photos',{
                    method: 'DELETE',
                    body: JSON.stringify({nameImage}),
                    headers:{
                      'Content-Type':'application/json'
                    }
                })
                .then(response => response.json())
                .then(result => {             
                    if(result.message){
                        enqueueSnackbar(result.message, {variant:'success'});
                        setDatos({tipo:'', src:'', num:0, name:'', status:false});
                        handleUpdatePhoto(tipo, num, '', '', false, false);
                        setModePhoto(false);
                    }else{
                        enqueueSnackbar(result.status, {variant:'error'});
                    }
                });
            }
        }else{
            setPhotoReport();
            setPhotoReportPreview('');
            setShowElement(true);
            setElementSelect(false);
        }
    };

    const HandleClosePhotos = ()=>{ setOpenPhotos(false) };

    const HandleShowPhotos = ()=>{
        if(modePhoto){
            setOpenPhotos(true);
        }else{
            if(photoReportPreview === ''){
                alert('NO HAY FOTOS')
            }else{
                setOpenPhotos(true);
            }
        }
    };

    return(
        <Grid container className={classes.containerUpload} justify='center'>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Viewer
                    visible={openPhotos}
                    onClose={HandleClosePhotos}
                    images={[{src:modePhoto ? info.src : photoReportPreview, alt:''}]}
                    zIndex={2000}
                />
                <Paper square className={classes.paper}>
                    <Grid container justify='center' spacing={1}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'flex', justifyContent:'center', height:50}}>
                            {
                                !showElement &&
                                <input 
                                    type="file" 
                                    onChange={handleImageChangeReport} 
                                    className={classes.inputUp}
                                />
                            }
                            
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            <Card className={classes.rootCard}>
                                <CardHeader
                                    action={
                                        <Tooltip title='ELIMINAR' arrow placement='left'>
                                            <span>
                                                <IconButton onClick={handleDeleteImage} disabled={modePhoto ? false : !isSelectElement}>
                                                    <HighlightOffIcon style={{color:isSelectElement ?'red' : modePhoto ? 'red': 'gray'}}/>
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    }
                                    title={<Chip color='primary' icon={isSelectElement ? <DoneIcon /> : <HelpIcon/>} label={Datos.name} style={{textOverflow:'ellipsis', overflow:'none', width:200}}/> }
                                />
                                <Fragment>
                                    {
                                        modePhoto ?
                                        <CardMedia
                                            className={classes.media}
                                            image={Datos.src || ''}
                                            title={Datos.name || ''}
                                            onClick={HandleShowPhotos}
                                        />:
                                        <Fragment>
                                            {photoReportPreview !== '' &&
                                                <CardMedia
                                                    className={classes.media}
                                                    image={photoReportPreview || ''}
                                                    title={photoReportPreview === '' ? '' :photoReport.name}
                                                    onClick={HandleShowPhotos}
                                                />
                                            }
                                        </Fragment>
                                    }
                                </Fragment>
                            </Card>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {
                                isUpdating ?
                                <Button variant="contained" fullWidth size="large" color="primary" >
                                    <CircularProgress size={25} style={{color:'#fff'}}/>
                                </Button>
                                :<Button variant="contained" fullWidth size="large" color="primary" startIcon={<CloudUploadIcon/>} disabled={modePhoto ? true : photoReport === undefined ? true : false} onClick={handleSubmitPhotoReport}>
                                    SUBIR
                                </Button>
                            }            
                        </Grid>
                    </Grid>      
                </Paper>
            </Grid>
        </Grid>
    );
};

function AddMerc() {

    return (
    <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <AgregarMerc steps={4}>
            <AgregarMerc.Pages>  
                <FirstEl />               
                <SecondEl />
                <ThirdEl /> 
                <FourEl />   
            </AgregarMerc.Pages>  
            <AgregarMerc.ButtonPrev/>  
            <AgregarMerc.ButtonNext/>
                   
        </AgregarMerc>
    </SnackbarProvider>
    );
};

export default AddMerc;
