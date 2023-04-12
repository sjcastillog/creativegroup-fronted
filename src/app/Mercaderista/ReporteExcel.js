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
    Description as DescriptionIcon,
    Done as DoneIcon,
    FilterList as FilterListIcon,
    GetApp as GetAppIcon,
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
import { useAuth } from "../Auth";
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
import styled from 'styled-components';
import { Autocomplete } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
    const [ isReadyExcel, setReadyExcel ] = useState(false);
    const [ isSelectPeriodo, setSelectPeriodo ] = useState(false);
    const [ dataExcel, setDataExcel ] = useState([]);
    const [ headersExcel, setHeadersExcel ] = useState([]);
    const [ continuoExcel, setContinuoExcel ] = useState(false);
    const [ dataPeriodos, setDataPeriodos ] = useState(false);
    const [ arrFiltrado, setArrFiltrado ] = useState([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:''}]);
    const [ isContinuoFilter, setContinuoFilter ] = useState(false);
    const [ backupPeriodos, setBackupPeriodos ] = useState([]);
    const [ isSelectMercaderista, setSelectMercaderista ] = useState(false);
    const [ isReadyExcelGeneral, setReadyExcelGeneral ] = useState(false);
    const [ continuoExcelGeneral, setContinuoExcelGeneral ] = useState(false);
    const [ isReadyExcelMercaderista, setReadyExcelMercaderista ] = useState(false);
    const [ continuoExcelMixto, setContinuoExcelMixto ] = useState(false);
    const [ isReadyExcelMixto, setReadyExcelMixto ] = useState(false);
    const [ continuoExcelMercaderista, setContinuoExcelMercaderista ] = useState(false);
    const [ isReadyExcelPeriodo, setReadyExcelPeriodo ] = useState(false);
    const [ continuoExcelPeriodo, setContinuoExcelPeriodo ] = useState(false);
    const [ isFoundProject, setFoundProject ] = useState(false);
    const [ MarcasArr, setMarcasArr ] = useState([]);

    useEffect(()=>{
        const handleApi = async ()=>{
            const datM = await fetch('/MarcasMerc');
            const resM = await datM.json();
            setMarcasArr(resM);
        };

        handleApi();
        
    },[]) 
    useEffect(()=>{
        if(continuoExcel){
            setContinuoExcel(false);
            setReadyExcel(true);
        };
    },[continuoExcel])

    useEffect(()=>{
        if(continuoExcelGeneral){
            setContinuoExcelGeneral(false);
            setReadyExcelGeneral(true);
        };
    },[continuoExcelGeneral]);

    useEffect(()=>{
        if(continuoExcelPeriodo){
            setContinuoExcelPeriodo(false);
            setReadyExcelPeriodo(true);
        };
    },[continuoExcelPeriodo]);

    useEffect(()=>{
        if(continuoExcelMercaderista){
            setContinuoExcelMercaderista(false);
            setReadyExcelMercaderista(true);
        };
    },[continuoExcelMercaderista]);

    useEffect(()=>{
        if(continuoExcelMixto){
            setContinuoExcelMixto(false);
            setReadyExcelMixto(true);
        };
    },[continuoExcelMixto]);

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
                setFoundProject(true);
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
                setFoundProject(false);
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
        setDataExcel([]);
        setReportes([]);
        setArrFiltrado([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:''}]);
        setSelectMercaderista(false);
    };

    const handleSelectMerc = (e, value)=>{ 
        if(value === '' || value === null){
            setCadenas([]);
            setLocales([]);
            setDataMerc({...dataMerc, Reportes:'', Mercaderista:'', RutaSelected:''});
            setSelectMercaderista(false);
            setSelectPeriodo(false);
            setDataPeriodos([]);
            setBackupPeriodos([]);
            setReportes([]);
        }else{
            const MercFilter = Datos.Mercaderistas.filter(val=> val.Mercaderista === value)[0];
            const backReport = MercFilter.Reportes.map(elReporte=> elReporte.RutaSelected);
            const newReport = new Set(backReport);
            const arrReport = [...newReport];
            setReportes(arrReport);
            setDataMerc({...dataMerc, Reportes:MercFilter.Reportes, Mercaderista:value});
            setSelectMercaderista(true);
        }
        
    };

    const handleSelectRuta =(e, value) =>{ 
        if(value === '' || value === null){
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
            const arr1 = [
                {id:'Cadena', label:'Cadena'},
                {id:'Local', label:'Local'},
                {id:'Ciudad', label:'Ciudad'},
                {id:'Direccion', label:'Direccion'},
                {id:'Provincia', label:'Provincia'},
                {id:'Status', label:'Status'},
                {id:'Registro', label:'Dia Visita'},
                {id:'countStock', label:'Stock Disponible'},
                {id:'motivoStock', label:'Motivo Stock'},
            ];
            const arr2 = Datos.MarcasArr.map(elMarca=>{
                const objeto = {};
                objeto.id = elMarca;
                objeto.label = elMarca;
                return objeto;
            });
            const arr3 = Datos.TipTraArr.map(elTip=>{
                const objeto = {};
                objeto.id = elTip.Tiptra;
                objeto.label = elTip.Tiptra;
                return objeto;
            });
            const arrNew = dataNow.map(elReporte=>{
                const objeto = {...elReporte};
                objeto.countStock = elReporte.TablaPdv.countStock ? 'SI' : 'NO';
                objeto.motivoStock = !elReporte.TablaPdv.countStock ? elReporte.TablaPdv.motivoStock : '';
                elReporte.TablaPdv.data.forEach(elPdv=>{
                    objeto[elPdv.MARCA] = objeto[elPdv.MARCA] ? parseInt(objeto[elPdv.MARCA]) + parseInt(elPdv.CANTIDAD) : parseInt(elPdv.CANTIDAD);
                });
                elReporte.TablaTiptra.forEach(elTip=>{
                    objeto[elTip.Tiptra] = elTip.STATUS;
                });
                return objeto;
            })
            const arrHeaders = arr1.concat(arr2, arr3);
            setHeadersExcel(arrHeaders);
            setDataPeriodos(arrNew);
            setDataExcel(arrNew);
            setContinuoExcel(true);
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

    const handleCreateExcelGeneral = ()=>{
        const arr1 = [
            {id:'Cadena', label:'Cadena'},
            {id:'Local', label:'Local'},
            {id:'Ciudad', label:'Ciudad'},
            {id:'Direccion', label:'Direccion'},
            {id:'Provincia', label:'Provincia'},
            {id:'Status', label:'Status'},
            {id:'Mercaderista', label:'Mercaderista'},
            {id:'RutaSelected', label:'Periodo'},
            {id:'Registro', label:'Dia Visita'},
            {id:'countStock', label:'Stock Disponible'},
            {id:'motivoStock', label:'Motivo Stock'},
        ];
        const arr22 = MarcasArr.map(elMarca=>{
            if(Datos.MarcasArr.includes(elMarca.MARCA)){
                const objeto = {};
                objeto.id = `${elMarca.MARCA}_${elMarca.PRESENTACION}_${elMarca.TAMANO}_${elMarca.VARIANTE}`;
                objeto.label = `${elMarca.MARCA}_${elMarca.PRESENTACION}_${elMarca.TAMANO}_${elMarca.VARIANTE}`;
                return objeto;
            }
        });
        const arr2 = arr22.filter(elArr=> elArr !== undefined);
        const arr3 = Datos.TipTraArr.map(elTip=>{
            const objeto = {};
            objeto.id = elTip.Tiptra;
            objeto.label = elTip.Tiptra;
            return objeto;
        });
        
        const arrHeaders = arr1.concat(arr2, arr3);
        setHeadersExcel(arrHeaders);
        const arrExcel = [];
        Datos.Mercaderistas.forEach(elMerc=>{
            elMerc.Reportes.forEach(elReporte=>{
                const objeto = {...elReporte};
                objeto.Registro = elReporte.Registro.split('T')[0];
                objeto.countStock = elReporte.TablaPdv.countStock ? 'SI' : 'NO';
                objeto.motivoStock = !elReporte.TablaPdv.countStock ? elReporte.TablaPdv.motivoStock : '';
                elReporte.TablaPdv.data.forEach(elPdv=>{
                    objeto[`${elPdv.MARCA}_${elPdv.PRESENTACION}_${elPdv.TAMANO}_${elPdv.VARIANTE}`] = elPdv.CANTIDAD;
                });
                elReporte.TablaTiptra.forEach(elTip=>{
                    objeto[elTip.Tiptra] = elTip.STATUS;
                });
                arrExcel.push(objeto);
            })
        });
        setHeadersExcel(arrHeaders);
        setDataExcel(arrExcel);
        setContinuoExcelGeneral(true);
        setTimeout(()=>{
            setReadyExcelGeneral(true);
        },7000)
    };

    const handleCreateExcelMercaderista = ()=>{
        const arr1 = [
            {id:'Cadena', label:'Cadena'},
            {id:'Local', label:'Local'},
            {id:'Ciudad', label:'Ciudad'},
            {id:'Direccion', label:'Direccion'},
            {id:'Provincia', label:'Provincia'},
            {id:'Status', label:'Status'},
            {id:'RutaSelected', label:'Periodo'},
            {id:'Registro', label:'Dia Visita'},
            {id:'countStock', label:'Stock Disponible'},
            {id:'motivoStock', label:'Motivo Stock'},
        ];

        const arr22 = MarcasArr.map(elMarca=>{
            if(Datos.MarcasArr.includes(elMarca.MARCA)){
                const objeto = {};
                objeto.id = `${elMarca.MARCA}_${elMarca.PRESENTACION}_${elMarca.TAMANO}_${elMarca.VARIANTE}`;
                objeto.label = `${elMarca.MARCA}_${elMarca.PRESENTACION}_${elMarca.TAMANO}_${elMarca.VARIANTE}`;
                return objeto;
            }
        });
        const arr2 = arr22.filter(elArr=> elArr !== undefined);
        const arr3 = Datos.TipTraArr.map(elTip=>{
            const objeto = {};
            objeto.id = elTip.Tiptra;
            objeto.label = elTip.Tiptra;
            return objeto;
        });
        const arrHeaders = arr1.concat(arr2, arr3);
        setHeadersExcel(arrHeaders);
        const arrExcel = [];
        Datos.Mercaderistas.forEach(elMerc=>{
            elMerc.Reportes.forEach(elReporte=>{
                const objeto = {...elReporte};
                objeto.Registro = elReporte.Registro.split('T')[0];
                objeto.countStock = elReporte.TablaPdv.countStock ? 'SI' : 'NO';
                objeto.motivoStock = !elReporte.TablaPdv.countStock ? elReporte.TablaPdv.motivoStock : '';
                elReporte.TablaPdv.data.forEach(elPdv=>{
                    objeto[`${elPdv.MARCA}_${elPdv.PRESENTACION}_${elPdv.TAMANO}_${elPdv.VARIANTE}`] = elPdv.CANTIDAD;
                });
                elReporte.TablaTiptra.forEach(elTip=>{
                    objeto[elTip.Tiptra] = elTip.STATUS;
                });
                arrExcel.push(objeto);
            })
        });
        const arrFillExcel = arrExcel.filter(elExcel=> elExcel.Mercaderista === dataMerc.Mercaderista)
        setHeadersExcel(arrHeaders);
        setDataExcel(arrFillExcel);
        setContinuoExcelMercaderista(true);
        setTimeout(()=>{
            setReadyExcelMercaderista(true);
        },7000)
    };

    const handleCreateExcelPeriodo = ()=>{
        const arr1 = [
            {id:'Cadena', label:'Cadena'},
            {id:'Local', label:'Local'},
            {id:'Ciudad', label:'Ciudad'},
            {id:'Direccion', label:'Direccion'},
            {id:'Provincia', label:'Provincia'},
            {id:'Status', label:'Status'},
            {id:'Mercaderista', label:'Mercaderista'},
            {id:'Registro', label:'Dia Visita'},
            {id:'countStock', label:'Stock Disponible'},
            {id:'motivoStock', label:'Motivo Stock'},
        ];
        const arr22 = MarcasArr.map(elMarca=>{
            if(Datos.MarcasArr.includes(elMarca.MARCA)){
                const objeto = {};
                objeto.id = `${elMarca.MARCA}_${elMarca.PRESENTACION}_${elMarca.TAMANO}_${elMarca.VARIANTE}`;
                objeto.label = `${elMarca.MARCA}_${elMarca.PRESENTACION}_${elMarca.TAMANO}_${elMarca.VARIANTE}`;
                return objeto;
            }
        });
        const arr2 = arr22.filter(elArr=> elArr !== undefined);
        const arr3 = Datos.TipTraArr.map(elTip=>{
            const objeto = {};
            objeto.id = elTip.Tiptra;
            objeto.label = elTip.Tiptra;
            return objeto;
        });
        const arrHeaders = arr1.concat(arr2, arr3);
        setHeadersExcel(arrHeaders);
        const arrExcel = [];
        Datos.Mercaderistas.forEach(elMerc=>{
            elMerc.Reportes.forEach(elReporte=>{
                const objeto = {...elReporte};
                objeto.Registro = elReporte.Registro.split('T')[0];
                objeto.countStock = elReporte.TablaPdv.countStock ? 'SI' : 'NO';
                objeto.motivoStock = !elReporte.TablaPdv.countStock ? elReporte.TablaPdv.motivoStock : '';
                elReporte.TablaPdv.data.forEach(elPdv=>{
                    objeto[elPdv.MARCA] = objeto[elPdv.MARCA] ? parseInt(objeto[elPdv.MARCA]) + parseInt(elPdv.CANTIDAD) : parseInt(elPdv.CANTIDAD);
                });
                elReporte.TablaTiptra.forEach(elTip=>{
                    objeto[elTip.Tiptra] = elTip.STATUS;
                });
                arrExcel.push(objeto);
            })
        });
        const arrFillExcel = arrExcel.filter(elExcel=> elExcel.RutaSelected === dataMerc.RutaSelected)
        setHeadersExcel(arrHeaders);
        setDataExcel(arrFillExcel);
        setContinuoExcelPeriodo(true);
        setTimeout(()=>{
            setReadyExcelPeriodo(true);
        },7000)
    };

    const handleCreateExcelMixto = ()=>{
        const arr1 = [
            {id:'Cadena', label:'Cadena'},
            {id:'Local', label:'Local'},
            {id:'Ciudad', label:'Ciudad'},
            {id:'Direccion', label:'Direccion'},
            {id:'Provincia', label:'Provincia'},
            {id:'Status', label:'Status'},
            {id:'Mercaderista', label:'Mercaderista'},
            {id:'Registro', label:'Dia Visita'},
            {id:'countStock', label:'Stock Disponible'},
            {id:'motivoStock', label:'Motivo Stock'},
        ];
        const arr2 = Datos.MarcasArr.map(elMarca=>{
            const objeto = {};
            objeto.id = elMarca;
            objeto.label = elMarca;
            return objeto;
        });
        const arr3 = Datos.TipTraArr.map(elTip=>{
            const objeto = {};
            objeto.id = elTip.Tiptra;
            objeto.label = elTip.Tiptra;
            return objeto;
        });
        const arrHeaders = arr1.concat(arr2, arr3);
        setHeadersExcel(arrHeaders);
        const arrExcel = [];
        Datos.Mercaderistas.forEach(elMerc=>{
            elMerc.Reportes.forEach(elReporte=>{
                const objeto = {...elReporte};
                objeto.countStock = elReporte.TablaPdv.countStock ? 'SI' : 'NO';
                objeto.motivoStock = !elReporte.TablaPdv.countStock ? elReporte.TablaPdv.motivoStock : '';
                elReporte.TablaPdv.data.forEach(elPdv=>{
                    objeto[elPdv.MARCA] = objeto[elPdv.MARCA] ? parseInt(objeto[elPdv.MARCA]) + parseInt(elPdv.CANTIDAD) : parseInt(elPdv.CANTIDAD);
                });
                elReporte.TablaTiptra.forEach(elTip=>{
                    objeto[elTip.Tiptra] = elTip.STATUS;
                });
                arrExcel.push(objeto);
            })
        });
        const arrFillExcel1 = arrExcel.filter(elExcel=> elExcel.Mercaderista === dataMerc.Mercaderista)
        const arrFillExcel2 = arrFillExcel1.filter(elExcel=> elExcel.RutaSelected === dataMerc.RutaSelected)
        setHeadersExcel(arrHeaders);
        setDataExcel(arrFillExcel2);
        setContinuoExcelMixto(true);
        setTimeout(()=>{
            setReadyExcelMixto(true);
        },7000)
    };



    return(   
        <Grid container spacing={1} justify='center' alignContent='center' alignItems='center' style={{padding:10}}>
            <Grid item md={6} sm={10} xs={12} style={{display:'flex', justifyContent:'center'}}>
                <Chip color='secondary' label='INFORMACION Excel' style={{fontWeight:'bolder', width:'100%', height:30}}/>
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
                        {
                            isReadyExcelGeneral ?
                            <Button fullWidth style={{color:'green'}} variant='contained' size='large' startIcon={<GetAppIcon/>} >   
                                <ExcelComponent data={dataExcel} titulo={'DESCARGAR'} headersColumn={headersExcel} />
                            </Button>   :
                            <Button fullWidth disabled={!isFoundProject} style={{color:'green'}} variant='contained' size='large' onClick={handleCreateExcelGeneral} startIcon={<DescriptionIcon/>}>   
                                EXCEL GENERAL
                            </Button>
                            
                        }
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        {
                            isReadyExcelMixto ?
                            <Button fullWidth style={{color:'green'}} variant='contained' size='large' startIcon={<GetAppIcon/>} >   
                                <ExcelComponent data={dataExcel} titulo={'DESCARGAR'} headersColumn={headersExcel} />
                            </Button>   :
                            <Button fullWidth disabled={!isSelectPeriodo} style={{color:'green'}} variant='contained' size='large' onClick={handleCreateExcelMixto} startIcon={<DescriptionIcon/>}>   
                                EXCEL MIXTO
                            </Button>
                            
                        }
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Autocomplete
                            id="mercSelect"
                            options={Datos.Mercaderistas}
                            size='small'
                            getOptionLabel={(option)=>option.Mercaderista}
                            inputValue={dataMerc.Mercaderista || ''}
                            renderInput={params => <TextField {...params} label=" Mercaderista" variant="outlined"/>}
                            onInputChange={handleSelectMerc}
                            disabled={!dataMerc.isFoundProject}
                        />
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        {
                            isReadyExcelMercaderista ?
                            <Button fullWidth style={{color:'green'}} variant='contained' size='large' startIcon={<GetAppIcon/>} >   
                                <ExcelComponent data={dataExcel} titulo={'DESCARGAR'} headersColumn={headersExcel} />
                            </Button>   :
                            <Button fullWidth disabled={!isSelectMercaderista} style={{color:'green'}} variant='contained' size='large' onClick={handleCreateExcelMercaderista} startIcon={<DescriptionIcon/>}>   
                                MERCADERISTA
                            </Button>                          
                        }
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Autocomplete
                            id="Periodo"
                            options={Reportes}
                            size='small'
                            inputValue={dataMerc.RutaSelected || ''}
                            renderInput={params => <TextField {...params} label=" Periodo" variant="outlined"/>}
                            onInputChange={handleSelectRuta}
                            disabled={!isSelectMercaderista}
                        />
                    </Grid>               
                    <Grid item md={5} sm={12} xs={12}>
                        {
                            isReadyExcelPeriodo ?
                            <Button fullWidth style={{color:'green'}} variant='contained' size='large' startIcon={<GetAppIcon/>} >   
                                <ExcelComponent data={dataExcel} titulo={'DESCARGAR'} headersColumn={headersExcel} />
                            </Button>   :
                            <Button fullWidth disabled={!isSelectPeriodo} style={{color:'green'}} variant='contained' size='large' onClick={handleCreateExcelPeriodo} startIcon={<DescriptionIcon/>}>   
                                PERIODO
                            </Button>
                            
                        }
                    </Grid>
                    <Grid item md={10} sm={12} xs={12}>
                        {
                            isSelectPeriodo &&
                            <Grid container justify='center' spacing={1}>
                                <Grid item xs={4}>
                                    {
                                        isReadyExcel ? 
                                        <Button fullWidth style={{color:'green'}} variant='contained' size='large' startIcon={<GetAppIcon/>} >   
                                            <ExcelComponent data={dataExcel} titulo={'DESCARGAR'} headersColumn={headersExcel} />
                                        </Button>   :
                                        <Button fullWidth variant='contained' style={{color:'green'}} size='large' onClick={HandleProcessFilterElement} startIcon={<DescriptionIcon />}>
                                            CREAR EXCEL
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

const ExcelComponent = ({ data, titulo, headersColumn, handleClickExcelGeneral })=>{

    const ColumnasExcel = headersColumn.map((value, index)=>{
            return(<ExcelColumn label={value.label} value={value.id} key={`fila${index}`}/>) 
    });

    return(
        <ExcelFile  filename="database.xlsx" element={titulo} >
            <ExcelSheet data={data} name="database">
                { ColumnasExcel }
            </ExcelSheet>
        </ExcelFile >
    )
};

export default function ReporteExcel() {
    return (
    <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <Reporte/>
    </SnackbarProvider>
    );
};