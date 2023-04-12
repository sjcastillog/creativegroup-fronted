import React, { useState, useEffect, useCallback, memo, Fragment} from 'react';
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
    Autorenew as AutorenewIcon,
    Build as BuildIcon,
    Check as CheckIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
    Edit as EditIcon,
    EditLocation as EditLocationIcon,
    Delete as DeleteIcon,
    Done as DoneIcon,
    FilterList as FilterListIcon,
    GetApp as GetAppIcon,
    Help as HelpIcon,
    HelpOutline as HelpOutlineIcon,
    HighlightOff as HighlightOffIcon,
    ListAlt as ListAltIcon,
    PictureAsPdf as PictureAsPdfIcon,
    PlaylistAddCheck as PlaylistAddCheckIcon,
    PhotoCamera as PhotoIcon,
    Refresh as RefreshIcon,
    Save as SaveIcon,
    Search as SearchIcon,
} from '@material-ui/icons';
import Viewer from 'react-viewer';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2';
import { useAuth } from "../Auth";
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
import styled from 'styled-components';
import { Autocomplete } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';
import { Page, Text, View, Document, StyleSheet, Font, usePDF, Image as ImagePdf } from '@react-pdf/renderer';

const Reporte = ()=>{
    const { enqueueSnackbar } = useSnackbar();
    const [ Datos, setDatos ] = useState({Mercaderistas:[]});
    const [ dataMerc, setDataMerc ] = useState({Ruta:[], isFoundProject:false, Status:''});
    const [ Cadenas, setCadenas ] = useState([]);
    const [ Locales, setLocales ] = useState([]);
    const [ Direcciones, setDirecciones ] = useState([]);
    const [ Provincias, setProvincias ] = useState([]);
    const [ Ciudades, setCiudades ] = useState([]);
    const [ Reportes, setReportes ] = useState([]);
    const [ isReadyPdf, setReadyPdf ] = useState(false);
    const [ isSelectPeriodo, setSelectPeriodo ] = useState(false);
    const [ dataPdf, setDataPdf ] = useState([]);
    const [ continuoPdf, setContinuoPdf ] = useState(false);
    const [ dataPeriodos, setDataPeriodos ] = useState(false);
    const [ arrFiltrado, setArrFiltrado ] = useState([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:''}]);
    const [ isContinuoFilter, setContinuoFilter ] = useState(false);
    const [ backupPeriodos, setBackupPeriodos ] = useState([]);
    const [ isSelecMercaderista, setSelectMercaderista ] = useState(false);

    useEffect(()=>{
        if(continuoPdf){
            setContinuoPdf(false);
            setReadyPdf(true);
        };
    },[continuoPdf])


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
        setDirecciones([]);
        setLocales([]);
        setProvincias([]);
        setCiudades([]);
        setSelectPeriodo(false);
        setContinuoFilter(false);
        setDataPeriodos([]);
        setBackupPeriodos([]);
        setDataPdf([]);
        setReportes([]);
        setArrFiltrado([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:''}]);
        setSelectMercaderista(false);
    };

    const handleSelectMerc = ({target})=>{ 
        const MercFilter = Datos.Mercaderistas.filter(val=> val.Mercaderista === target.value)[0];
        const backReport = MercFilter.Reportes.map(elReporte=> elReporte.RutaSelected);
        const newReport = new Set(backReport);
        const arrReport = [...newReport];
        setReportes(arrReport);
        setDataMerc({...dataMerc, Reportes:MercFilter.Reportes, Mercaderista:target.value});
        setSelectMercaderista(true);
    };

    const handleSelectRuta =(e, value) =>{ 
        if(value === ''){
            setCadenas([]);
            setLocales([]);
            setDataMerc({...dataMerc, RutaSelected:''});
            setSelectPeriodo(false);
            setDataPeriodos([]);
            setBackupPeriodos([]);
        }else{
            const rutaEdit = dataMerc.Reportes.filter(elRuta => elRuta.RutaSelected === value);
            setDataPeriodos(rutaEdit);
            setBackupPeriodos(rutaEdit);
            const cad0 = rutaEdit.map(elData => elData.Cadena.toString());
            const dataCad0 = new Set(cad0);
            const resultCad0 = [...dataCad0];
            const cad1 = rutaEdit.map(elData => elData.Direccion.toString());
            const dataCad1 = new Set(cad1);
            const resultCad1 = [...dataCad1];
            const cad2 = rutaEdit.map(elData => elData.Local.toString());
            const dataCad2 = new Set(cad2);
            const resultCad2 = [...dataCad2];
            const cad3 = rutaEdit.map(elData => elData.Provincia.toString());
            const dataCad3 = new Set(cad3);
            const resultCad3 = [...dataCad3];
            const cad4 = rutaEdit.map(elData => elData.Ciudad.toString());
            const dataCad4 = new Set(cad4);
            const resultCad4 = [...dataCad4];
            setDataMerc({...dataMerc, RutaSelected:value});
            setCadenas(resultCad0);
            setDirecciones(resultCad1);
            setLocales(resultCad2);
            setProvincias(resultCad3);
            setCiudades(resultCad4);
            setSelectPeriodo(true);
        }  
    };

    const handleCreatePdf = ()=>{
        const arrPeriodosPdf = [];
        dataPeriodos.forEach(elPeriodo=>{
            const objeto = {...elPeriodo};
            const arrMarcas = elPeriodo.TablaPdv.data.map(elPdv=>elPdv.MARCA)
            const arrOnly1 = new Set(arrMarcas);
            const arrOnly2 = [...arrOnly1];
            const arrNew = []
            arrOnly2.forEach(elArr=>{
                const objeto2 = {};
                objeto2.MARCA = elArr;
                const arrM = [];
                elPeriodo.TablaPdv.data.forEach((elPdv)=>{
                    if(elPdv.MARCA === elArr){
                        const objeto3 =  {...elPdv};
                        arrM.push(objeto3);
                    }
                })
                objeto2.DATA = arrM;
                arrNew.push(objeto2);
            });
            objeto.TablaPdvPdf = arrNew;
            arrPeriodosPdf.push(objeto);
        });
        setDataPdf(arrPeriodosPdf);
        setContinuoPdf(true);
    };

    const handleClickPdf = useCallback(()=>{
        setTimeout(()=>{
            setReadyPdf(false);
        },2000);
    },[]);

    const HandleAddInformacionFilter = useCallback((objeto)=>{
        const arrF = arrFiltrado.map((value,index)=> {
            if(objeto.numero === index){
                return objeto
            }else{
                return value
            }
        })
        setArrFiltrado(arrF);
    },[arrFiltrado]);

    const HandleDeleteFilter = useCallback((infElement)=>{ 
        const arrF = arrFiltrado.filter((value,index)=> infElement !== index);
        setArrFiltrado(arrF);
    },[arrFiltrado]);

    const HandleAddFilter = useCallback(()=>{
        const cant = arrFiltrado.length;
        setArrFiltrado([...arrFiltrado, {numero:cant, valueElement:'', idElement:'', labelElement:'', selectElement:'O'} ]);
    },[arrFiltrado]);

    const ElementMenuFilter = arrFiltrado.map((value,index)=>
        <FiltradoEl 
            key={`filterElement-${index}`} 
            index={index} 
            info={value} 
            HandleAddFilter={HandleAddFilter} 
            HandleDeleteFilter={HandleDeleteFilter}
            HandleAddInformacionFilter={HandleAddInformacionFilter}
            Cadenas={Cadenas}
            Locales={Locales}
            Ciudades={Ciudades}
            Provincias={Provincias}
            Direcciones={Direcciones}
    />);

    const HandleProcessFilterElement = ()=>{
        console.log(arrFiltrado);
        if(arrFiltrado[0].valorElement === ''){
            setTimeout(()=>{
                Swal.fire({
                    title:'NO HAY ELEMENTOS QUE FILTRAR',
                    toast:true,
                    confirmButtonColor:'#0E3B5F',
                });
            },200);
            
        }else{
            let dataNow = [ ];
            arrFiltrado.forEach((value,index)=>{
                if(index === 0){
                    console.log('index0');
                    backupPeriodos.forEach((value2)=>{
                        if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase()) dataNow.push(value2);
                    });
                }else{
                    console.log('!index0');
                    if(value.selectElement === 'O'){
                        backupPeriodos.forEach((value2)=>{
                            if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase()) dataNow.push(value2);
                        });
                    }else{
                        dataNow = dataNow.filter((value2)=>
                            value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase()
                        );
                    } 
                }
            }); 
            let hash = {};
            dataNow = dataNow.filter(o => hash[o._id] ? false : hash[o._id] = true);
            const arrPeriodosPdf = [];
            dataNow.forEach(elPeriodo=>{
                const objeto = {...elPeriodo};
                const arrMarcas = elPeriodo.TablaPdv.data.map(elPdv=>elPdv.MARCA)
                const arrOnly1 = new Set(arrMarcas);
                const arrOnly2 = [...arrOnly1];
                const arrNew = []
                arrOnly2.forEach(elArr=>{
                    const objeto2 = {};
                    objeto2.MARCA = elArr;
                    const arrM = [];
                    elPeriodo.TablaPdv.data.forEach((elPdv)=>{
                        if(elPdv.MARCA === elArr){
                            const objeto3 =  {...elPdv};
                            arrM.push(objeto3);
                        }
                    })
                    objeto2.DATA = arrM;
                    arrNew.push(objeto2);
                });
                objeto.TablaPdvPdf = arrNew;
                arrPeriodosPdf.push(objeto);
            });
            setDataPeriodos(dataNow);
            setDataPdf(arrPeriodosPdf);
            setContinuoPdf(true);
        }
        
    };

    const handleFiltrar = ()=>{ 
        if(isContinuoFilter){
            Swal.fire({
                title:'YA ESTA ACTIVA LA OPCION FILTRAR',
                toast:true,
                confirmButtonColor:'#0E3B5F',
            });
        }else{
            setContinuoFilter(true); 
        }
        
    };

    const handleResetearFiltrado = ()=>{
        setArrFiltrado([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:''}]);
        setDataPeriodos(backupPeriodos);
        setContinuoFilter(false);
    };

    return(   
        <Grid container spacing={1} justify='center' alignContent='center' alignItems='center' style={{padding:10}}>
            <Grid item md={6} sm={10} xs={12} style={{display:'flex', justifyContent:'center'}}>
                <Chip color='secondary' label='INFORMACION PDF' style={{fontWeight:'bolder', width:'100%', height:30}}/>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
                <Divider/>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
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
                    <Grid item md={5} sm={12} xs={12}>
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
                    <Grid item md={5} sm={12} xs={12}>
                        <Autocomplete
                            id="Periodo"
                            options={Reportes}
                            size='small'
                            inputValue={dataMerc.RutaSelected || ''}
                            renderInput={params => <TextField {...params} label=" Periodo" variant="outlined"/>}
                            onInputChange={handleSelectRuta}
                            disabled={!isSelecMercaderista}
                        />
                    </Grid>
                    <Grid item md={10} sm={12} xs={12}>
                    {
                        isSelectPeriodo &&
                        <Grid container justify='center' spacing={1}>
                            <Grid item xs={4}>
                                {
                                    isContinuoFilter ? 
                                    <Button fullWidth color='primary' variant='contained' size='large' onClick={HandleProcessFilterElement} startIcon={<PictureAsPdfIcon />}>
                                        CREAR PDF
                                    </Button> :
                                    <Button fullWidth color='primary' variant='contained' size='large' onClick={handleCreatePdf} startIcon={<PictureAsPdfIcon />}>
                                        CREAR PDF
                                    </Button>
                                }
                                
                            </Grid>
                            <Grid item xs={4}>
                                <Button fullWidth color='primary' variant='contained' size='large' onClick={handleFiltrar} startIcon={<FilterListIcon/>}>
                                    FILTRAR
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button fullWidth color='primary' variant='contained' size='large' onClick={handleResetearFiltrado} startIcon={<AutorenewIcon/>}>
                                    RESETEAR
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    </Grid>
                    <Grid item md={10} sm={12} xs={12}>
                        {
                            isContinuoFilter && 
                            <Paper elevation={2} style={{width:'100%', padding:10}}>
                                <Grid container justify='center' spacing={1}>
                                    { ElementMenuFilter }
                                </Grid>
                            </Paper> 
                        }            
                    </Grid>
                    <Grid item md={5} sm={12} xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        {
                            isReadyPdf &&
                            <CreatePdf dataGeneral={dataPdf} handleClickPdf={handleClickPdf} dataCliente={Datos.Cliente} />   
                        }
                    </Grid>
                </Grid>
            </Grid>        
        </Grid>
    )
};

const FiltradoEl = ({ index, info, HandleAddFilter, HandleDeleteFilter, HandleAddInformacionFilter, Cadenas, Locales, Direcciones, Ciudades, Provincias})=>{
    const [ elementValue, setElementValue ] = useState({ idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:'O'});
    const [ dataFilter, setDataFilter ] = useState([]);

    useEffect(()=>{
        setElementValue({ idElement:info.idElement, valorElement:info.valorElement, numero:index, labelElement:info.labelElement, selectElement:info.selectElement})
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleElementValue = (e, value)=>{
        if(value === '' || value === null){
            setElementValue({...elementValue, valorElement:''});
            const objeto = {...elementValue};
            objeto.valorElement = '';
            objeto.labelElement = '';
            HandleAddInformacionFilter(objeto)
        }else{
            setElementValue({...elementValue, valorElement:value});
            const objeto = {...elementValue};
            objeto.valorElement = value;
            HandleAddInformacionFilter(objeto);
        }
    };

    const HandlePreDeleteFilter = ()=>{
        HandleDeleteFilter(index);
    };

    const HandlePreAddInfFilter = (e)=>{ HandleAddInformacionFilter(elementValue)};

    const HandleAutoComplete = (e, value)=>{
        if(value === '' || value === null){
            setElementValue({...elementValue, idElement:'', labelElement:'', valorElement:''});
            setDataFilter([])
        }else{
            setElementValue({...elementValue, idElement:value, labelElement:value });
            switch(value){
                case 'Cadena': setDataFilter(Cadenas);break;
                case 'Local': setDataFilter(Locales);break;
                case 'Ciudad': setDataFilter(Ciudades);break;
                case 'Direccion': setDataFilter(Direcciones);break;
                case 'Provincia': setDataFilter(Provincias);break;
                default: setDataFilter([]);break;
            }
        }
        
    };

    const HandleSelectElement = ({target})=>{
        setElementValue({...elementValue, selectElement:target.value});
    };

    const arrKeys = ['Cadena', 'Local', 'Ciudad', 'Direccion', 'Provincia'];

    if(index === 0){
        return( 
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  key={`ElementMenu-Filtrado-${index}`}>
                <Grid container justify='center' spacing={1}>
                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingTop:12}}>
                        <Autocomplete
                            id={`idElement-${index}`}
                            options={arrKeys}
                            renderInput={(params) => <TextField {...params} label="Elemento" fullWidth variant="outlined" />}
                            value={elementValue.labelElement || ''}    
                            onChange={HandleAutoComplete}
                            size='small'
                        />
                    </Grid>
                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingTop:12}}>
                        <Autocomplete
                            id={`valElement-${index}`}
                            options={dataFilter}
                            renderInput={(params) => <TextField {...params} label={elementValue.labelElement} fullWidth variant="outlined" />}
                            value={elementValue.valorElement || ''}    
                            onChange={handleElementValue}
                            size='small'
                        />
                    </Grid>
                    <Grid item xl={1} lg={2} md={2} sm={2} xs={2}>
                        <IconButton style={{marginTop:5}} onClick={HandleAddFilter}>
                            <AddIcon color='primary'/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    }else{ 
        return(
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={`ElementMenu-Filtrado-${index}`}>
                <Grid container justify='center' spacing={1} >
                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingTop:12}}>
                        <Autocomplete
                            id={`idElement-${index}`}
                            options={arrKeys}
                            renderInput={(params) => <TextField {...params} label="Elemento" fullWidth variant="outlined" />}
                            value={elementValue.labelElement || ''}    
                            onChange={HandleAutoComplete}
                            size='small'
                        />
                    </Grid>
                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingTop:12}}>
                        <Autocomplete
                            id={`valElement-${index}`}
                            options={dataFilter}
                            renderInput={(params) => <TextField {...params} label={elementValue.labelElement} fullWidth variant="outlined" />}
                            value={elementValue.valorElement || ''}    
                            onChange={handleElementValue}
                            size='small'
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                        <TextField
                            id={`selectElement-${index}`}
                            select
                            value={elementValue.selectElement || ''}
                            onChange={HandleSelectElement}
                            style={{marginTop:8}}
                            onBlur={HandlePreAddInfFilter}
                        >
                            <MenuItem value={'O'}>O</MenuItem>
                            <MenuItem value={'Y'}>Y</MenuItem>
                        </TextField>
                        <IconButton onClick={HandlePreDeleteFilter} style={{marginTop:5}} id={`bu-${index}`}>
                            <DeleteIcon style={{color:'red'}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>                                
        )
    }
};

const CreatePdf = ({dataGeneral, handleClickPdf, dataCliente})=>{

    console.log(dataGeneral);

    Font.register({family: 'Oswald',src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'});

    Font.register({ family: 'Roboto-BlackCursive', src:'fonts/Roboto-BlackItalic.ttf'});

    const styles = StyleSheet.create({
        image: {
            objectFit:'cover',
            width:842,
            height:595,
        },
        boxMercaderista:{
            height:23,
            width:268,
            textAlign:'center',
            marginTop:-578,
            marginLeft:308
        },
        boxTop:{
            height:23,
            width:268,
            textAlign:'center',
            marginTop:4.5,
            marginLeft:308
        },
        textBox:{ 
            color:'#000',
            fontSize:14,
            padding:2.5
        },
        boxTopLogo:{
            height:50,
            width:100,
            textAlign:'center',
            marginTop:-50,
            marginLeft:590,
            display:'flex',
            justifyContent:'center'
        },
        boxPhotos:{
            width:810,
            marginLeft:10,
            marginTop:10,
            height:400,
            display:'flex',
            justifyContent:'center',
            flexDirection:'row'
        },
        boxPhoto:{
            borderWidth:2,
            borderColor:'#CAD226',
            borderStyle:'solid',
            margin:5,
            width:252,
            height:390,
            display:'flex',
            justifyContent:'center',
            flexDirection:'row',
            borderRadius:5
        },
        imageBox:{
            objectFit:'scale-down',
            alignSelf:'center'
        },
        boxNoCountStock:{
            width:320,
            marginLeft:510,
            marginTop:28,
            padding:2,
            height:49,
            textAlign:'left',
            fontSize:'12px'
        },
        
    });

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
    });

    const MyDoc = (
        <Document>
            <Page size="A4" orientation="landscape" >
                { dataGeneral.map((data,indexG)=>
                    <Fragment key={`ReportePdf_${indexG}`}>
                        <View >
                            {
                                data.TablaPdv.countStock ?
                                <ImagePdf source="mercaderistas/REPORTE2.png" style={styles.image} /> :
                                <ImagePdf source="mercaderistas/REPORTE3.jpg" style={styles.image} />
                            }
                            
                            <View style={styles.boxMercaderista}>
                                <Text style={styles.textBox}>
                                    {data.Mercaderista}
                                </Text>
                            </View>
                            <View style={styles.boxTop}>
                                <Text style={styles.textBox}>
                                    {data.Cadena}
                                </Text>
                            </View>
                            <View style={styles.boxTop}>
                                <Text style={styles.textBox}>
                                    {data.Registro.split('T')[0]}
                                </Text>
                            </View>
                            <View style={styles.boxTopLogo}>
                                <ImagePdf source={`mercaderistas/logos/${dataCliente.split(' ').reduce((a,b)=>a+b).toString()}.png`} style={styles.imageBox} />
                            </View>
                            <View style={styles.boxPhotos}>
                                <View style={styles.boxPhoto}>
                                    <ImagePdf source={data.Photos[0].src} style={styles.imageBox} />
                                </View>
                                <View style={styles.boxPhoto}>
                                    <ImagePdf source={data.Photos[1].src} style={styles.imageBox} />
                                </View>
                                <View style={styles.boxPhoto}>
                                    <ImagePdf source={data.Photos[2].src} style={styles.imageBox} />
                                </View>
                            </View>
                            {
                                !data.TablaPdv.countStock &&
                                <View style={styles.boxNoCountStock}>
                                    <Text >
                                        {data.TablaPdv.motivoStock}
                                    </Text>
                                </View>
                            }
                            
                        </View>
                        {
                            data.TablaPdv.countStock &&
                            <View >
                                <ImagePdf source="mercaderistas/REPORTE2.png" style={styles.image} />
                                <View style={styles.boxMercaderista}>
                                    <Text style={styles.textBox}>
                                        {data.Mercaderista}
                                    </Text>
                                </View>
                                <View style={styles.boxTop}>
                                    <Text style={styles.textBox}>
                                        {data.Cadena}
                                    </Text>
                                </View>
                                <View style={styles.boxTop}>
                                    <Text style={styles.textBox}>
                                        {data.Registro.split('T')[0]}
                                    </Text>
                                </View>
                                <View style={styles.boxPhotos}>
                                    {
                                        data.TablaPdvPdf.map((elPdv,index)=>{
                                            
                                            return(
                                                <View style={{width:770 / data.TablaPdvPdf.length, display:'flex', justifyContent:'center', margin:5}} key={`${elPdv.MARCA}_${index}`}>
                                                    <View style={{width:'100%', height:100, display:'flex', justifyContent:'center'}}>
                                                        <ImagePdf source={`mercaderistas/marcas/${elPdv.MARCA}.png`} style={styles.imageBox} />
                                                    </View>
                                                    <View style={{width:'100%', height:300, border:'3px solid #CAD226', borderRadius:5, fontSize:11}}>
                                                    {
                                                        elPdv.DATA.map(elDataPdv=>
                                                                <View style={{marginBottom:10, padding:10}}>
                                                                    <Text>
                                                                        {`- PRESENTACION: ${elDataPdv.PRESENTACION}`}
                                                                    </Text>
                                                                    <Text>
                                                                        {`- TAMAÑO: ${elDataPdv.TAMANO}`}
                                                                    </Text>
                                                                    <Text>
                                                                        {`- VARIANTE: ${elDataPdv.VARIANTE}`}
                                                                    </Text>
                                                                    <Text>
                                                                        {`- CANTIDAD: ${elDataPdv.CANTIDAD}`}
                                                                    </Text>
                                                                    <Text>
                                                                        {`- OBSERVACION: ${elDataPdv.OBSERVACION}`}
                                                                    </Text>
                                                                </View>
                                                        )
                                                    }
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        }
                    </Fragment>)
                }
            </Page>
        </Document>
    );

    const [ instance ] = usePDF({ document: MyDoc });

    if (instance.loading) return <FacebookCircularProgress size={25} style={{alignSelf:'center'}}/>;

    if (instance.error) return <div>Something went wrong: {instance.error}</div>;


    return (
        <Button href={instance.url} style={{alignSelf:'center'}} size='large' fullWidth download="CreativeDocument.pdf" onClick={handleClickPdf} startIcon={<GetAppIcon />} style={{backgroundColor:'red', color:'#fff'}}>
            DESCARGAR PDF
        </Button>
    );
}

export default function ReportePdf() {
    return (
    <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <Reporte/>
    </SnackbarProvider>
    );
};