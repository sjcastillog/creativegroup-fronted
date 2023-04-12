import React, { useState, Fragment, useEffect, useCallback } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { 
            Button,
            Checkbox,
            Dialog ,
            Divider ,
            Fab,
            Grid,
            Grow,
            IconButton,
            InputAdornment,
            LinearProgress,
            MenuItem,
            Paper,
            TextField,
            Tooltip,
            Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { 
    Add as AddIcon,
    Cached as CachedIcon,
    Cancel as CancelIcon,
    Check as CheckIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    Description as DescriptionIcon,
    DoneOutline as DoneOutlineIcon,
    Edit as EditIcon,
    InsertDriveFile as InsertDriveFileIcon,
    PictureAsPdf as PictureAsPdfIcon,
    Save as SaveIcon,
    Search as SearchIcon,
} from '@material-ui/icons';
import './Css/Proforma.css';
import Swal from 'sweetalert2';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import useModal from '../hooksPerson/useModal';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PdfProforma from './PdfProforma';
import ReactExport from "react-data-export";
import { useAuth } from "../Auth";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
const headersItems = [ 'TIPO', 'CATEGORIA', 'RUBRO', 'CONCEPTO', 'VALOR', 'CANTIDAD', 'TOTAL', 'TOTALTIEMPO'];
const headersDetalles = [ 'CANTIDAD', 'DESCRIPCION', 'DETALLE', 'SUBTOTAL', 'TOTAL' ];

const ExcelComponentItems = (props)=>{

    const { data } = props;
    const ColumnasExcel = headersItems.map((value, index)=>  <ExcelColumn label={value} value={value} key={`${value}_${index}`}/>) 

    return(
        <ExcelFile  filename="ITEMS.xlsx" element={<InsertDriveFileIcon/>}>
            <ExcelSheet data={data} name="database">
                { ColumnasExcel }
            </ExcelSheet>
        </ExcelFile >
    )
};

const ExcelComponentDetalles = (props)=>{

    const { data } = props;
    const ColumnasExcel = headersDetalles.map((value, index)=>  <ExcelColumn label={value} value={value} key={`${value}_${index}`}/>) 


    return(
        <ExcelFile  filename="DETALLES.xlsx" element='EXCEL'>
            <ExcelSheet data={data} name="database">
                { ColumnasExcel }
            </ExcelSheet>
        </ExcelFile >
    )
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow direction="up" timeout={1000} ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon style={{color:'red'}}/>
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
  
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const db = [
    {Tipo:'Personal', Item:'Mercaderista', Rubro:'Sueldo'},
    {Tipo:'Personal', Item:'Mercaderista', Rubro:'DecimaTercera'},
    {Tipo:'Personal', Item:'Supervisor', Rubro:'DecimaTercera'},
    {Tipo:'Utilitario', Item:'Uniformes', Rubro:'Camiseta'}
];

const ProformaBack = ()=>{
    const { enqueueSnackbar } = useSnackbar();
    const [ Datos, setDatos ] = useState({
        numpro:'',
        Cliente:'',
        TiempoProyecto:'',
        Proyecto:'',
        NumProf:'',
        Unidad:''
    });
    const [ arrItems, setArrItems ] = useState([]);
    const [ arrItemsUtilitarios, setArrItemsUtilitarios ] = useState([]);
    const [ Clientes, setClientes ] = useState([]);
    const [ isNew, setNew ] = useState(true);
    const [ arrDetalles, setArrDetalles ] = useState([]);
    const [ openDetalle, setOpenDetalle ] = useState(false);
    const [ isNewDetalle, setNewDetalle ] = useState(true);
    const [ dbCostos, setDbCostos ] = useState([]);
    const [ openAdd, setOpenAdd ] = useState(false);
    const [ objetoCosto, setObjetoCosto ] = useState({
        isAporteIESS:false, isBonos:false, isHorasExtras:false, isMovilizacion:false, isRecargo:false, 
        isDecimaCuarta:false, isDecimaTercera:false, isVacaciones:false, isIndicador:false, isSelectSueldo:false,
        TIPO:'', CATEGORIA:'', RUBRO:'', CONCEPTO:'', INDICADOR:'', DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:''
    });
    const [ onlyTipos, setOnlyTipos ] = useState([]);
    const [ onlyCategorias, setOnlyCategorias ] = useState([]);
    const [ onlyRubros, setOnlyRubros ] = useState([]);
    const [ onlyConceptos, setOnlyConceptos ] = useState([]);
    const [ isSelectSueldo, setSelectSueldo ] = useState(false);
    const [ openFormulario, handleOpenFormulario, handleCloseFormulario ] = useModal();
    const [ isCreatePdf, setCreatePdf ] = useState(false);
    const [ isCalculate, setCalculate ] = useState(false);
    const [ isCalculated, setCalculated ] = useState(false);
    const { authTokens, setHeaderWord } = useAuth();
    const [ isContinuoSave, setContinuoSave ] = useState(false);
    const [ isMercaderista, setMercaderista ] = useState(true);

    useEffect(()=>{
        async function handleClientes(){
            const reqCli = await fetch('/fetch_clientes');
            const infoCli = await reqCli.json();
            setClientes(infoCli.map(elCli=>elCli.cliente));
            const reqCostos = await fetch('/CostosMercs');
            const infCostos = await reqCostos.json();
            setDbCostos(infCostos);
            setDatos({...Datos, Ejecutiva:authTokens.nombre});
            setHeaderWord('MERCADERISTAS/PROFORMA');
            if(authTokens.tipo === 'ADMINISTRADOR')setMercaderista(false);
        }

        handleClientes();
    },[]);

    useEffect(()=>{
        if(isCalculated){
            setCalculated(false);
            setCalculate(false);
            setCreatePdf(true);
        }
    },[isCalculated]);

    useEffect(()=>{
        if(isContinuoSave){
            setContinuoSave(false);
            handleSaveProforma();
        }
    },[isContinuoSave]);

    const handleDeleteRowNew = useCallback((idTabla)=>{
        switch(idTabla){
            case 'ITEM':
                const arr = [...arrItems];
                arr.pop()
                setArrItems(arr);
                break;
            case 'UTILITARIO':
                const arrUti = [...arrItemsUtilitarios];
                arrUti.pop()
                setArrItemsUtilitarios(arrUti);
                break;
            default:
                console.log('No Aplica');
                break;
        }
        
    },[arrItems])

    const handleUpdateRow = useCallback((row, idTabla)=>{
        switch(idTabla){
            case 'ITEM':
                setArrItems((arr)=>arr.map(el=>{
                    if(row.idEl === el.idEl){
                        return row
                    }else{ 
                        return el
                    }
                }));
                break;
            case 'UTILITARIO':
                setArrItemsUtilitarios((arr)=>arr.map(el=>{
                    if(row.idEl === el.idEl){
                        return row
                    }else{ 
                        return el
                    }
                }));
                break;
            default:
                console.log('No Aplica');
                break;
        }
    },[arrItems])

    const handleEditRow = useCallback((row, idTabla)=>{
        switch(idTabla){
            case 'ITEM':
                setArrItems((arr)=>arr.map(el=>{
                    if(row.idEl === el.idEl){
                        return row
                    }else{ 
                        return el
                    }
                }));
                break;
            case 'UTILITARIO':
                setArrItemsUtilitarios((arr)=>arr.map(el=>{
                    if(row.idEl === el.idEl){
                        return row
                    }else{ 
                        return el
                    }
                }));
                break;
            default:
                console.log('No Aplica');
                break;
        }
    },[arrItems])

    const handleDeleteRow = useCallback((row, idTabla)=>{
        switch(idTabla){
            case 'ITEM':
                setArrItems((arr)=>arr.filter(el=> row.idEl !== el.idEl) );
                break;
            case 'UTILITARIO':
                setArrItemsUtilitarios((arr)=>arr.filter(el=> row.idEl !== el.idEl) );
                break;
            default:
                console.log('No Aplica');
                break;
        }
    },[arrItems])

    const handleAutoCompleteClientes = (e, value)=>{ setDatos({...Datos, Cliente:value}) };

    const handleDatos = ({target})=>{ setDatos({...Datos, [target.id]:target.value}) };

    const handleDatosElemento = ({target})=>{ setDatos({...Datos, Unidad:target.value}) };

    const handleDatosElementoF = ({target})=>{ setDatos({...Datos, FormaPago:target.value}) };

    const handleSearchProforma = ()=>{
        if(Datos.NumProf === ''){
            Swal.fire({
                title:'CAMPO DE NUM. PROFORMA VACIO',
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
        }else{
            fetch('/ProformaMercs/FindOneNum',{
                method: 'POST',
                body: JSON.stringify({NumProf:parseInt(Datos.NumProf)}),
                headers:{
                  'Content-Type':'application/json'
                }
            })
            .then(response=> response.json())
            .then(result =>{
                console.log(result);
                if(result.length > 0){
                    setDatos(result[0]);
                    setArrItems(result[0].dataItems);
                    setArrDetalles(result[0].dataDetalles);
                    setNewDetalle(false);
                    setNew(false);
                    enqueueSnackbar('Proforma Cargada Con Exito',{variant:'info'});
                }else if(result.status){
                    enqueueSnackbar(result.status,{variant:'error'});
                }else{
                    setNew(true);
                    enqueueSnackbar('NO EXISTE ESTE NUMERO EN LA DB',{variant:'error'});
                }
                
            });
        }
    };

    const handleOpenDetalle = ()=>{
        if(isNewDetalle){
            Swal.fire({
                title:'YA NO VA AÑADIR MAS FILAS EN LA TABLA DE ITEMS?',
                showDenyButton:true,
                showCancelButton:true,
                confirmButtonText:'NO',
                confirmButtonColor:'#0E3B5F',
                denyButtonText:'SI',
                width:700,
                grow:true,
                allowEscapeKey:false,
                allowOutsideClick:false
            }).then(result=>{
                if(result.isConfirmed){
                    const arr = arrItems.map(el=>el.CATEGORIA);
                    const arr1 = new Set(arr);
                    const arr2 = [...arr1];
                    const arrNew = [];
                    const arrLogistica = [];
                    let index = 0;
                    for(const x in arr2){
                        index += 1;
                        switch(arr2[x]){
                            case 'PERSONAL ADMINISTRATIVO':
                                const arr_0 = arrItems.filter(eli=>eli.CATEGORIA === 'PERSONAL ADMINISTRATIVO');
                                const arr_30_4 = arr_0.map(el=>el.VALOR);
                                const arr_40_4 = arr_30_4.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const arr_50_4 = arr_0.map(el=>el.VALIDACION ? el.TOTALTIEMPO : el.TOTAL);
                                const arr_60_4 = arr_50_4.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const objeto1 = {};
                                objeto1.ITEM = arr2[x].toString();
                                objeto1.DETALLE = '';
                                objeto1.DESCRIPCION = 'PERSONAL ADMINISTRATIVO';
                                objeto1.id = `${arr_0[0].idEl}_${index}`;
                                objeto1.CANTIDAD = arr_0[0].CANTIDAD;
                                objeto1.SUBTOTAL = parseFloat(arr_40_4).toFixed(2);
                                objeto1.TOTAL = parseFloat(arr_60_4).toFixed(2);
                                arrNew.push(objeto1);
                                break;
                            case 'UTILITARIOS':
                                const arr_1 = arrItems.filter(eli=>eli.CATEGORIA === 'UTILITARIOS');
                                const arr_30_3 = arr_1.map(el=>el.VALOR);
                                const arr_40_3 = arr_30_3.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const arr_50_3 = arr_1.map(el=>el.VALIDACION ? el.TOTALTIEMPO : el.TOTAL);
                                const arr_60_3 = arr_50_3.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const objeto2 = {};
                                objeto2.ITEM = arr2[x].toString();
                                objeto2.DETALLE = '';
                                objeto2.DESCRIPCION = 'UTILITARIOS';
                                objeto2.id = `${arr_1[0].idEl}_${index}`;
                                objeto2.CANTIDAD = arr_1[0].CANTIDAD;
                                objeto2.SUBTOTAL = parseFloat(arr_40_3).toFixed(2);
                                objeto2.TOTAL = parseFloat(arr_60_3).toFixed(2);
                                arrNew.push(objeto2);
                                break;
                            case 'LOGISTICA':
                                const arrLog = arrItems.filter(el=>el.CATEGORIA === 'LOGISTICA');
                                let index_0 = 0;
                                for(const y in arrLog){
                                    index_0 ++;
                                    const objeto3 = {};
                                    objeto3.ITEM = arr2[x].toString();
                                    objeto3.DETALLE = '';
                                    objeto3.DESCRIPCION = `${arrLog[y].TIPO} ${arrLog[y].CATEGORIA} ${arrLog[y].RUBRO}`;
                                    objeto3.CANTIDAD = arrLog[y].CANTIDAD;
                                    objeto3.SUBTOTAL = parseFloat(arrLog[y].VALOR).toFixed(2);
                                    objeto3.TOTAL = parseFloat(arrLog[y].VALIDACION ? arrLog[y].TOTALTIEMPO : arrLog[y].TOTAL).toFixed(2);
                                    objeto3.id = `${arrLog[y].idEl}_${index_0}`;
                                    arrLogistica.push(objeto3);
                                }
                                break;
                            case 'MERCADERISTA':
                                const arr_2 = arrItems.filter(eli=>eli.CATEGORIA === 'MERCADERISTA');
                                const arr_30 = arr_2.map(el=>el.VALOR);
                                const arr_40 = arr_30.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const arr_50 = arr_2.map(el=>el.VALIDACION ? el.TOTALTIEMPO : el.TOTAL);
                                const arr_60 = arr_50.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const objeto4 = {};
                                objeto4.ITEM = arr2[x].toString();
                                objeto4.DETALLE = '';
                                objeto4.DESCRIPCION = 'PERSONAL MERCADERISTA';
                                objeto4.id = `${arr_2[0].idEl}_${index}`;
                                objeto4.CANTIDAD = arr_2[0].CANTIDAD;
                                objeto4.SUBTOTAL = parseFloat(arr_40).toFixed(2);
                                objeto4.TOTAL = parseFloat(arr_60).toFixed(2);
                                arrNew.push(objeto4);
                                break;
                            case 'SUPERVISOR':
                                const arr_3 = arrItems.filter(eli=>eli.CATEGORIA === 'SUPERVISOR');
                                const arr_30_1 = arr_3.map(el=>el.VALOR);
                                const arr_40_1 = arr_30_1.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const arr_50_1 = arr_3.map(el=>el.VALIDACION ? el.TOTALTIEMPO : el.TOTAL);
                                const arr_60_1 = arr_50_1.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const objeto5 = {};
                                objeto5.ITEM = arr2[x].toString();
                                objeto5.DETALLE = '';
                                objeto5.DESCRIPCION = 'PERSONAL SUPERVISOR';
                                objeto5.id = `${arr_3[0].idEl}_${index}`;
                                objeto5.CANTIDAD = arr_3[0].CANTIDAD;
                                objeto5.SUBTOTAL = parseFloat(arr_40_1).toFixed(2);
                                objeto5.TOTAL = parseFloat(arr_60_1).toFixed(2);
                                arrNew.push(objeto5);
                                break;
                            case 'COORDINADOR':
                                const arr_4 = arrItems.filter(eli=>eli.CATEGORIA === 'COORDINADOR');
                                const arr_30_2 = arr_4.map(el=>el.VALOR);
                                const arr_40_2 = arr_30_2.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const arr_50_2 = arr_4.map(el=>el.VALIDACION ? el.TOTALTIEMPO : el.TOTAL);
                                const arr_60_2 = arr_50_2.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr))
                                const objeto6 = {};
                                objeto6.ITEM = arr2[x].toString();
                                objeto6.DETALLE = '';
                                objeto6.DESCRIPCION = 'PERSONAL COORDINADOR';
                                objeto6.id = `${arr_4[0].idEl}_${index}`;
                                objeto6.CANTIDAD = arr_4[0].CANTIDAD;
                                objeto6.SUBTOTAL = parseFloat(arr_40_2).toFixed(2);
                                objeto6.TOTAL = parseFloat(arr_60_2).toFixed(2);
                                arrNew.push(objeto6);
                                break;
                            default:
                                console.log('NO APLICA')
                                break;
                        }
                        
                        
                    };
                    if(arrLogistica.length > 0){
                        const arrNew2 = arrNew.concat(arrLogistica);
                        setArrDetalles(arrNew2);
                        console.log(arrNew2);
                        setOpenDetalle(true);
                    }else{
                        setArrDetalles(arrNew);
                        console.log(arrNew);
                        setOpenDetalle(true);
                    }
                }
            })
           
        }else{
            setOpenDetalle(true);
        }
        
        
        
    };

    const handleCloseDetalle = ()=>{ setOpenDetalle(false); };

    const handleUpdateDetalle = useCallback(
        (id, objeto) => {
           setArrDetalles(elDetalle=>elDetalle.map(el=>{
                if(el.id === id){
                    return objeto;
                }else{
                    return el;
                }
           })) 
        },
        [arrDetalles],
    );

    const handleCloseAdd = ()=>{
        setOpenAdd(false);
        setObjetoCosto({
            isAporteIESS:false, isBonos:false, isHorasExtras:false, isMovilizacion:false, isRecargo:false, 
            isDecimaCuarta:false, isDecimaTercera:false, isVacaciones:false, isIndicador:false, isSelectSueldo:false,
            TIPO:'', CATEGORIA:'', RUBRO:'', CONCEPTO:'', INDICADOR:'', DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:''
        });
    };

    const handleOpenAdd = ()=>{
        const arr = dbCostos.map(elCosto=>elCosto.TIPO);
        const arr1 = new Set(arr);
        const arr2 = [...arr1];
        setOnlyTipos(arr2);
        setOpenAdd(true);
    };

    const handleAutoCompleteTipo = (e, value)=>{
        if(value === null){
            setObjetoCosto({...objetoCosto, TIPO:'', CATEGORIA:'', RUBRO:'', CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false, VALOR:'', CANTIDAD:''}); 
            setOnlyCategorias([]);
            setOnlyRubros([]);
            setOnlyConceptos([]);
        }else{
            setObjetoCosto({...objetoCosto, TIPO:value, CATEGORIA:'', RUBRO:'', CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false, VALOR:'', CANTIDAD:''}); 
            const arr = dbCostos.filter(elDb=> elDb.TIPO === value)
            const arr0 = arr.map(elDb=>elDb.CATEGORIA);
            const arr1 = new Set(arr0);
            const arr2 = [...arr1];
            setOnlyCategorias(arr2);
            setOnlyRubros([]);
            setOnlyConceptos([]);
        }
        
    };

    const handleAutoCompleteCategoria = (e, value)=>{
        if(value === null){
            setObjetoCosto({...objetoCosto, CATEGORIA:'', RUBRO:'', CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false, VALOR:'', CANTIDAD:''}); 
            setOnlyRubros([]);
            setOnlyConceptos([]);
        }else{
            setObjetoCosto({...objetoCosto, CATEGORIA:value, RUBRO:'', CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false, VALOR:'', CANTIDAD:''}); 
            const arr_0 = dbCostos.filter(elDb=> elDb.TIPO === objetoCosto.TIPO);
            const arr = arr_0.filter(elDb=> elDb.CATEGORIA === value);
            const arr0 = arr.map(elDb=>elDb.RUBRO);
            const arr1 = new Set(arr0);
            const arr2 = [...arr1];
            setOnlyRubros(arr2);
            setOnlyConceptos([]);
        }
    };

    const handleAutoCompleteRubro = (e, value)=>{
        if(value === null){
            setObjetoCosto({...objetoCosto, RUBRO:'', CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false, VALOR:'', CANTIDAD:''}); 
            setOnlyConceptos([]);
        }else{
            if(value === 'REMUNERACION'){
                setObjetoCosto({...objetoCosto, RUBRO:value, CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false, VALOR:'', CANTIDAD:''}); 
                const arr_0 = dbCostos.filter(elDb=> elDb.TIPO === objetoCosto.TIPO);
                const arr_1 = arr_0.filter(elDb=> elDb.CATEGORIA === objetoCosto.CATEGORIA);
                const arr = arr_1.filter(elDb=> elDb.RUBRO === value);
                const arr0 = arr.map(elDb=>elDb.CONCEPTO);
                const arr1 = new Set(arr0);
                const arr2 = [...arr1];
                setOnlyConceptos(['SUELDO']);
            }else{
                setObjetoCosto({...objetoCosto, RUBRO:value, CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false}); 
                const arr_0 = dbCostos.filter(elDb=> elDb.TIPO === objetoCosto.TIPO);
                const arr_1 = arr_0.filter(elDb=> elDb.CATEGORIA === objetoCosto.CATEGORIA);
                const arr = arr_1.filter(elDb=> elDb.RUBRO === value);
                const arr0 = arr.map(elDb=>elDb.CONCEPTO);
                const arr1 = new Set(arr0);
                const arr2 = [...arr1];
                setOnlyConceptos(arr2);
            }
            
        }
    };

    const handleAutoCompleteConcepto = (e, value)=>{
        if(value === null){
            setObjetoCosto({...objetoCosto, CONCEPTO:'', isIndicador:false, INDICADOR:'', isSelectSueldo:false, DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', BONOS:'', MOVILIZACION:'', isDecimaCuarta:false, isDecimaTercera:false, isMovilizacion:false, isRecargo:false, isBonos:false, isHorasExtras:false, isVacaciones:false, VALOR:'', CANTIDAD:''}); 
            setSelectSueldo(false);
        }else{
            if(value === 'SUELDO'){
                const arr_1 = dbCostos.filter(elDb=> elDb.TIPO === objetoCosto.TIPO);
                const arr_2 = arr_1.filter(elDb=> elDb.CATEGORIA === objetoCosto.CATEGORIA);
                const arr_5 = arr_2.filter(elDb=> elDb.RUBRO === 'BENEFICIOS SOCIALES');
                const arr_6 = arr_5.filter(elDb=> elDb.CONCEPTO === 'DECIMACUARTA REMUNERACION')[0]; 
                const arr_7 = arr_2.filter(elDb=> elDb.RUBRO === 'REMUNERACION');
                const arr_8 = arr_7.filter(elDb=> elDb.CONCEPTO === 'HORAS EXTRAS')[0];   
                const arr_9 = arr_2.filter(elDb=> elDb.RUBRO === 'REMUNERACION');
                const arr_10 = arr_9.filter(elDb=> elDb.CONCEPTO === 'RECARGO (ADICIONAL)')[0];        
                const arr_11 = arr_5.filter(elDb=> elDb.CONCEPTO === 'APORTE IESS')[0];            
                const arr_3 = arr_2.filter(elDb=> elDb.RUBRO === objetoCosto.RUBRO);
                const arr_4 = arr_3.filter(elDb=>elDb.CONCEPTO === value)[0];
                setSelectSueldo(true);
                setObjetoCosto({...objetoCosto, CONCEPTO:value, isIndicador:true, INDICADOR:arr_4.INDICADOR, isSelectSueldo:true, DECIMACUARTA:arr_6.INDICADOR, HORASEXTRAS:arr_8.INDICADOR, RECARGO:arr_10.INDICADOR, AporteIESS:arr_11.INDICADOR }); 
            }else{
                const arr_1 = dbCostos.filter(elDb=> elDb.TIPO === objetoCosto.TIPO);
                const arr_2 = arr_1.filter(elDb=> elDb.CATEGORIA === objetoCosto.CATEGORIA);
                const arr_3 = arr_2.filter(elDb=> elDb.RUBRO === objetoCosto.RUBRO);
                const arr_4 = arr_3.filter(elDb=>elDb.CONCEPTO === value)[0];
                const arr0 = arrItems.filter(elDb=> elDb.TIPO === objetoCosto.TIPO);
                const arr1 = arr0.filter(elDb=> elDb.CATEGORIA === objetoCosto.CATEGORIA);
                const arr2 = arr1.filter(elDb=> elDb.CONCEPTO === 'SUELDO');
                if(arr_4.INDICADOR === ''){
                    if(arr2.length > 0){
                        setObjetoCosto({...objetoCosto, CONCEPTO:value, isIndicador:false, INDICADOR:'', CANTIDAD:arr2[0].CANTIDAD});
                    }else{
                        setObjetoCosto({...objetoCosto, CONCEPTO:value, isIndicador:false, INDICADOR:''});
                    }
                }else{
                    if(arr2.length > 0){
                        setObjetoCosto({...objetoCosto, CONCEPTO:value, isIndicador:true, INDICADOR:arr_4.INDICADOR, isSelectSueldo:false, CANTIDAD:arr2[0].CANTIDAD});
                    }else{
                        setObjetoCosto({...objetoCosto, CONCEPTO:value, isIndicador:true, INDICADOR:arr_4.INDICADOR, isSelectSueldo:false});
                    }
                    
                }
                 
            }
            
        }
    };

    const handleObjetoCosto = ({target})=>{ setObjetoCosto({...objetoCosto, [target.id]:target.value}) };

    const handleCheckCosto = ({target})=>{ setObjetoCosto({...objetoCosto, [target.id]:target.checked}) };

    const handleProcesarSueldo = ()=>{
        const arr = [...arrItems];
        const IndAporteIESS = parseFloat(objetoCosto.AporteIESS).toFixed(2);
        const Cantidad = parseInt(objetoCosto.CANTIDAD);
        const Bonos = parseFloat(objetoCosto.isBonos ? objetoCosto.BONOS : 0 ).toFixed(2);
        const Recargo = parseFloat(objetoCosto.isRecargo ? objetoCosto.RECARGO : 0).toFixed(2);
        const Sueldo = parseFloat(objetoCosto.SUELDO).toFixed(2);
        const ValRecargo = parseFloat( Recargo * Sueldo).toFixed(2);
        const Movilizacion = parseFloat(objetoCosto.isMovilizacion ? objetoCosto.MOVILIZACION : 0 ).toFixed(2);
        const HorasExtras = parseInt(objetoCosto.isHorasExtras ? objetoCosto.HORASEXTRAS : 0 );
        const ValHorasExtras = parseFloat((Sueldo / 240) * HorasExtras ).toFixed(2);
        const AporteIESS = parseFloat(parseInt(Bonos) +  parseFloat(ValHorasExtras) + parseInt(Sueldo) + parseInt(Movilizacion)  +  parseFloat(ValRecargo)).toFixed(2);
        const ValAporteIESS = parseFloat((AporteIESS * IndAporteIESS) / 100 ).toFixed(2);
        const TotalAporteIESS = parseFloat(ValAporteIESS * Cantidad).toFixed(2);
        const ValDecimaTercera = parseFloat(AporteIESS / 12 ).toFixed(2);
        const TotalDecimaTercera = parseFloat(ValDecimaTercera * Cantidad).toFixed(2);
        const ValDecimaCuarta = parseFloat(parseInt(objetoCosto.DECIMACUARTA) / 12).toFixed(2);
        const TotalDecimaCuarta = parseFloat(ValDecimaCuarta * Cantidad).toFixed(2);
        const ValVacaciones = parseFloat(AporteIESS / 24 ).toFixed(2);
        const TotalVacaciones = parseFloat(ValVacaciones * Cantidad).toFixed(2);
        const TotalSueldo = parseFloat(Sueldo * Cantidad).toFixed(2);
        arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:objetoCosto.CONCEPTO, INDICADOR:objetoCosto.INDICADOR, VALOR:Sueldo, CANTIDAD:Cantidad, TOTAL:TotalSueldo, STATUS:'NOEDIT', TOTALTIEMPO:0, VALIDACION:false, idEl:'PMRS'});
        if(objetoCosto.isBonos) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:'BONOS DE LEY', INDICADOR:'', VALOR:Bonos, CANTIDAD:Cantidad, TOTAL:Bonos * Cantidad, STATUS:'NOEDIT', TOTALTIEMPO:0,VALIDACION:false, idEl:'PMRB'});
        if(objetoCosto.isHorasExtras) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:'HORAS EXTRAS', INDICADOR:'', VALOR:ValHorasExtras , CANTIDAD:Cantidad, TOTAL:parseFloat(ValHorasExtras * Cantidad).toFixed(2), TOTALTIEMPO:0, STATUS:'NOEDIT', VALIDACION:false, idEl:'PMRH'});
        if(objetoCosto.isMovilizacion) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:'MOVILIZACION', INDICADOR:'', VALOR:Movilizacion, CANTIDAD:Cantidad, TOTAL:Movilizacion * Cantidad, STATUS:'NOEDIT', TOTALTIEMPO:0, VALIDACION:false, idEl:'PMRM'});
        if(objetoCosto.isRecargo) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:'RECARGO (ADICIONAL)', INDICADOR:'', VALOR:ValRecargo, CANTIDAD:Cantidad, TOTAL:parseFloat(ValRecargo * Cantidad).toFixed(2), TOTALTIEMPO:0, STATUS:'NOEDIT', VALIDACION:false, idEl:'PMRR'});
        if(objetoCosto.isAporteIESS) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:'BENEFICIOS SOCIALES', CONCEPTO:'APORTE IESS', INDICADOR:'', VALOR: ValAporteIESS , CANTIDAD:Cantidad, TOTAL:TotalAporteIESS , STATUS:'NOEDIT', TOTALTIEMPO:0, VALIDACION:false, idEl:'PMBA'});
        if(objetoCosto.isDecimaTercera) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:'BENEFICIOS SOCIALES', CONCEPTO:'DECIMA TERCERA', INDICADOR:'', VALOR:ValDecimaTercera, CANTIDAD:Cantidad, TOTAL:TotalDecimaTercera ,STATUS:'NOEDIT', TOTALTIEMPO:0, VALIDACION:false, idEl:'PMBDT'});
        if(objetoCosto.isDecimaCuarta) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:'BENEFICIOS SOCIALES', CONCEPTO:'DECIMA CUARTA', INDICADOR:'', VALOR: ValDecimaCuarta, CANTIDAD:Cantidad, TOTAL:TotalDecimaCuarta, STATUS:'NOEDIT', TOTALTIEMPO:0, VALIDACION:false, idEl:'PMBDC'});
        if(objetoCosto.isVacaciones) arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:'BENEFICIOS SOCIALES', CONCEPTO:'VACACIONES', INDICADOR:'', VALOR:ValVacaciones , CANTIDAD:Cantidad, TOTAL:TotalVacaciones, STATUS:'NOEDIT', TOTALTIEMPO:0, VALIDACION:false, idEl:'PMBV'});
        setArrItems(arr);
        setOpenAdd(false);            
        setObjetoCosto({
            isAporteIESS:false, isBonos:false, isHorasExtras:false, isMovilizacion:false, isRecargo:false, 
            isDecimaCuarta:false, isDecimaTercera:false, isVacaciones:false, isIndicador:false, isSelectSueldo:false,
            TIPO:'', CATEGORIA:'', RUBRO:'', CONCEPTO:'', INDICADOR:'', DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:''
        });
        
    };

    const handleProcesarAdd = ()=>{
        switch(objetoCosto.CONCEPTO){
            case 'FONDO DE RESERVA':
                const arr_0 = arrItems.filter(el=>el.CATEGORIA === objetoCosto.CATEGORIA);
                if(arr_0.length > 0){
                    const arr_1 = arr_0.filter(el=>el.CONCEPTO === 'SUELDO');
                    if(arr_1.length > 0){
                        const Sueldo = parseFloat(arr_1[0].VALOR).toFixed(2);
                        const Indicador = parseFloat(objetoCosto.INDICADOR).toFixed(2);
                        const ValFR = parseFloat(Sueldo * Indicador).toFixed(2);
                        const Cantidad = parseInt(arr_1[0].CANTIDAD);
                        const TotalValFR = parseFloat(ValFR * Cantidad).toFixed(2);
                        const arr = [...arrItems];
                        arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:objetoCosto.CONCEPTO, INDICADOR:objetoCosto.INDICADOR, VALOR:ValFR, CANTIDAD:Cantidad, TOTAL:TotalValFR, TOTALTIEMPO:0, STATUS:'NOEDIT', VALIDACION:false, idEl:`PBFR_${Math.random()}`});
                        setArrItems(arr);
                        setOpenAdd(false);            
                        setObjetoCosto({
                            isAporteIESS:false, isBonos:false, isHorasExtras:false, isMovilizacion:false, isRecargo:false, 
                            isDecimaCuarta:false, isDecimaTercera:false, isVacaciones:false, isIndicador:false, isSelectSueldo:false,
                            TIPO:'', CATEGORIA:'', RUBRO:'', CONCEPTO:'', INDICADOR:'', DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', TOTALTIEMPO:0
                        });
                    }else{
                        alert('NO EXISTE UN SUELDO PARA HACER EL CALCULO');
                    }
                }else{
                    alert('NO EXISTE UN SUELDO PARA HACER EL CALCULO');
                }
                break;
            case 'SERVICIOS PRESTADOS (IVA)':
                const arr_00 = arrItems.filter(el=>el.CATEGORIA === objetoCosto.CATEGORIA);
                if(arr_00.length > 0){
                    const arr_1 = arr_00.filter(el=>el.CONCEPTO === 'SERVICIOS PRESTADOS (FACTURA)');
                    if(arr_1.length > 0){
                        const Valor = parseFloat(arr_1[0].VALOR).toFixed(2);
                        const Indicador = parseFloat(objetoCosto.INDICADOR).toFixed(2);
                        const ValFR = parseFloat(Valor * Indicador).toFixed(2);
                        const Cantidad = parseInt(arr_1[0].CANTIDAD)
                        const TotalValFR = parseFloat(ValFR * Cantidad).toFixed(2);
                        const arr = [...arrItems];
                        arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:objetoCosto.CONCEPTO, TOTALTIEMPO:0, INDICADOR:objetoCosto.INDICADOR, VALOR:ValFR, CANTIDAD:Cantidad, TOTAL:TotalValFR, STATUS:'NOEDIT', VALIDACION:false, idEl:`PSSP_${Math.random()}`});
                        setArrItems(arr);
                        setOpenAdd(false);            
                        setObjetoCosto({
                            isAporteIESS:false, isBonos:false, isHorasExtras:false, isMovilizacion:false, isRecargo:false, 
                            isDecimaCuarta:false, isDecimaTercera:false, isVacaciones:false, isIndicador:false, isSelectSueldo:false,
                            TIPO:'', CATEGORIA:'', RUBRO:'', CONCEPTO:'', INDICADOR:'', DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', TOTALTIEMPO:0
                        });
                    }else{
                        alert('NO EXISTE UN VALOR DE SERVICIOS PRESTADOS (FACTURA) PARA HACER EL CALCULO');
                    }
                }else{
                    alert('NO EXISTE UN VALOR DE SERVICIOS PRESTADOS (FACTURA) PARA HACER EL CALCULO');
                }
                break;
            default:
                const Valor = parseFloat(objetoCosto.VALOR).toFixed(2);
                const Cantidad = parseInt(objetoCosto.CANTIDAD)
                const TotalDefault = parseFloat(Valor * Cantidad).toFixed(2);
                const arr = [...arrItems];
                arr.push({ TIPO:objetoCosto.TIPO, CATEGORIA:objetoCosto.CATEGORIA, RUBRO:objetoCosto.RUBRO, CONCEPTO:objetoCosto.CONCEPTO, TOTALTIEMPO:0, INDICADOR:objetoCosto.INDICADOR, VALOR:objetoCosto.VALOR, CANTIDAD:objetoCosto.CANTIDAD, TOTAL:TotalDefault, STATUS:'Normal', VALIDACION:false, idEl:`default_${Math.random()}`});
                setArrItems(arr);
                setOpenAdd(false);            
                setObjetoCosto({
                    isAporteIESS:false, isBonos:false, isHorasExtras:false, isMovilizacion:false, isRecargo:false, 
                    isDecimaCuarta:false, isDecimaTercera:false, isVacaciones:false, isIndicador:false, isSelectSueldo:false,
                    TIPO:'', CATEGORIA:'', RUBRO:'', CONCEPTO:'', INDICADOR:'', DECIMACUARTA:'', HORASEXTRAS:'', RECARGO:'', AporteIESS:'', TOTALTIEMPO:0
                });
                break;
            }
        
    };

    const handleResetDetalles = ()=>{
        if(arrDetalles.length === 0){
            alert('NO HAY NADA QUE RESETEAR')
        }else{
            setOpenDetalle(false);
            Swal.fire({
                title:'DESEA RESETEAR LOS DETALLES?',
                confirmButtonText:'PROCEDER',
                showCancelButton:true,
                confirmButtonColor:'#0E3B5F',
                width:500,
                grow:true,
                allowEscapeKey:false,
                allowOutsideClick:false
            }).then(el=>{
                if(el.isConfirmed){
                    setArrDetalles([]);
                    setNewDetalle(true);
                    Swal.fire({
                        title:'HECHO',
                        icon:'success',
                        confirmButtonText:'OK',
                        showCancelButton:false,
                        confirmButtonColor:'#0E3B5F',
                        width:500,
                        grow:true,
                        allowEscapeKey:false,
                        allowOutsideClick:false
                    })
                }else{
                    setOpenDetalle(true);
                }
            })
        }
        
    };

    const handleCreatePdf = ()=>{
        setCalculate(true);
        if(arrDetalles.length === 0){
            Swal.fire({
                title:'NO HA ESTABLECIDO LOS DETALLES Y DESCRIPCIONES PARA LA FACTURA',
                showDenyButton:false,
                showCancelButton:false,
                confirmButtonText:'OK',
                confirmButtonColor:'#0E3B5F',
                width:700,
                grow:true,
                allowEscapeKey:false,
                allowOutsideClick:false
            }).then(result=>{
                setCalculate(false);
            })
        }else{
            const Desc = parseFloat(Datos.Descuento ? Datos.Descuento : 0).toFixed(2);
            const Fee = parseFloat(Datos.Fee ? Datos.Fee : 0).toFixed(2);
            const arr_50 = arrItems.map(el=>el.VALIDACION ? el.TOTALTIEMPO : el.TOTAL);
            const sub = arr_50.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr));
            const subTotal = parseFloat(sub).toFixed(2);
            const subDes = parseFloat(sub - Desc).toFixed(2);
            const _subFee = parseFloat(subDes) + parseFloat(Fee);
            const Iva = parseFloat(_subFee * 0.12).toFixed(2);
            const _Total = parseFloat(_subFee) + parseFloat(Iva);
            const subFee = parseFloat(_subFee).toFixed(2);
            const Total = parseFloat(_Total).toFixed(2);
            setDatos({...Datos, SUBTOTAL:subTotal, SUBDESC:subDes, SUBFEE:subFee, IVA:Iva, TOTAL:Total});
            setTimeout(()=>{
                setCalculated(true);
            },500)
        }
        
        
    };

    const handleClickPdf = ()=>{
        setTimeout(()=>{
            setCreatePdf(false);
        },5000)
    };

    const handleCalcularTotal = ()=>{
            const Desc = parseFloat(Datos.Descuento ? Datos.Descuento : 0).toFixed(2);
            const Fee = parseFloat(Datos.Fee ? Datos.Fee : 0).toFixed(2);
            const arr_50 = arrItems.map(el=>el.VALIDACION ? el.TOTALTIEMPO : el.TOTAL);
            const sub = arr_50.reduce((prev, curr)=> parseFloat(prev) + parseFloat(curr));
            const subTotal = parseFloat(sub).toFixed(2);
            const subDes = parseFloat(sub - Desc).toFixed(2);
            const _subFee = parseFloat(subDes) + parseFloat(Fee);
            const Iva = parseFloat(_subFee * 0.12).toFixed(2);
            const _Total = parseFloat(_subFee) + parseFloat(Iva);
            const subFee = parseFloat(_subFee).toFixed(2);
            const Total = parseFloat(_Total).toFixed(2);
            setDatos({...Datos, SUBTOTAL:subTotal, SUBDESC:subDes, SUBFEE:subFee, IVA:Iva, TOTAL:Total});
    };

    const handleSaveDetalles = ()=>{ setNewDetalle(false); };

    const handlePreSaveProforma = ()=>{
        if(Datos.TiempoProyecto === '' || Datos.Proyecto === '' || Datos.Cliente === '' || arrItems.length === 0 || arrDetalles.length === 0){
            Swal.fire({
                title:'INFORMACION INCOMPLETA',
                //text:'NO PODRÁ EDITAR ESTE REPORTE',
                confirmButtonText:'OK',
                showDenyButton:false,
                showCancelButton:false,
                confirmButtonColor:'#0E3B5F',
                width:500,
                grow:true,
                allowEscapeKey:false,
                allowOutsideClick:false,
                toast:true,        
            })
        }else{
            handleCalcularTotal();
            setContinuoSave(true);
        }
            
    };

    const handleSaveProforma = ()=>{
        if(isNew){
            const objeto = {...Datos};
            objeto.dataItems = arrItems;
            objeto.dataDetalles = arrDetalles;
            objeto.Status = 'CREADO';
            fetch('/ProformaMercs',{
                method: 'POST',
                body: JSON.stringify( objeto ),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                console.log(result)
                if(result.numProf){
                    setDatos({...Datos, NumProf:result.numProf, Registro:result.Registro});
                    enqueueSnackbar('Proforma Guardada',{variant:'success'});
                }else{
                    enqueueSnackbar(result.status,{variant:'error'});
                }
            });
        }else{
            if(Datos.Status === 'APROBADA'){
                Swal.fire({
                    title:'PROFORMA APROBADA',
                    text:'Esta Proforma ha sido Aprobada, no puede editarla',
                    confirmButtonText:'OK',
                    showDenyButton:false,
                    showCancelButton:false,
                    confirmButtonColor:'#0E3B5F',
                    width:400,
                    grow:true,
                    allowEscapeKey:false,
                    allowOutsideClick:false,
                    toast:true,        
                })
            }else{ 
                const objeto = {...Datos};
                objeto.dataItems = arrItems;
                objeto.dataDetalles = arrDetalles
                fetch('/ProformaMercs',{
                    method: 'PUT',
                    body: JSON.stringify( objeto ),
                    headers:{'Content-Type':'application/json'}
                })
                .then(response=> response.json())
                .then(result =>{
                    if(result.message){
                        enqueueSnackbar(result.message,{variant:'success'});
                    }else{
                        enqueueSnackbar(result.status,{variant:'error'});
                    }
                    
                });
            }
        }
    };

    const handleApprove = ()=>{
        if(Datos.Status === 'APROBADA'){
            Swal.fire({
                title:'PROFORMA APROBADA',
                text:'ESTA PROFORMA YA ESTA APROBADA',
                confirmButtonText:'OK',
                showDenyButton:false,
                showCancelButton:false,
                confirmButtonColor:'#0E3B5F',
                width:400,
                grow:true,
                toast:true,
                allowEscapeKey:false,
                allowOutsideClick:false,
            })
        }else{
            Swal.fire({
                title:'DESEA APROBAR ESTA PROFORMA?',
                //text:'NO PODRÁ EDITAR ESTE REPORTE',
                confirmButtonText:'SI',
                showDenyButton:false,
                showCancelButton:true,
                confirmButtonColor:'#0E3B5F',
                width:500,
                grow:true,
                allowEscapeKey:false,
                allowOutsideClick:false,
            }).then(result=>{
                if(result.isConfirmed){
                    fetch('/ProformaApproved',{
                        method: 'PUT',
                        body: JSON.stringify( Datos ),
                        headers:{'Content-Type':'application/json'}
                    })
                    .then(response=> response.json())
                    .then(result =>{
                        if(result.message){
                            enqueueSnackbar(result.message,{variant:'success'});
                        }else{
                            enqueueSnackbar(result.status,{variant:'error'});
                        }
                    });
                }
            })
        }
        
    };


    return(
        <Paper square className='PaperRoot'>
            <Dialog onClose={handleCloseFormulario} aria-labelledby="customized-dialog-title" open={openFormulario} maxWidth='sm' fullWidth> 
                <DialogTitle id="customized-dialog-title" onClose={handleCloseFormulario}>
                    FORMULARIO PROFORMA
                </DialogTitle>
                <DialogContent dividers style={{padding:10}}>
                    <Grid container justify='center' spacing={1}>
                        <Grid item xs={12}>
                            <TextField 
                                id='Proyecto'
                                value={Datos.Proyecto ||''}
                                onChange={handleDatos}
                                fullWidth
                                label='PROYECTO'
                                margin='dense'
                                variant='outlined'
                                style={{margin:1}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id={'AutoComplete-Clientes'}
                                options={Clientes}
                                renderInput={(params) => <TextField {...params}fullWidth variant="outlined" label='CLIENTE'/>}
                                value={Datos.Cliente || ''}
                                onChange={handleAutoCompleteClientes}
                                size='small'
                                style={{width:'100%'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id='Direccion'
                                value={Datos.Direccion ||''}
                                onChange={handleDatos}
                                fullWidth
                                margin='dense'
                                label='Direccion'
                                variant='outlined'
                                multiline
                                style={{margin:1}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                id='Fecha'
                                value={Datos.Fecha ||'2021-01-01'}
                                onChange={handleDatos}
                                fullWidth
                                label='Fecha'
                                margin='dense'
                                variant='outlined'
                                style={{margin:1}}
                                type='Date'
                            />
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField 
                                id='Descuento'
                                value={Datos.Descuento ||''}
                                onChange={handleDatos}
                                fullWidth
                                label='Descuento'
                                margin='dense'
                                variant='outlined'
                                style={{margin:1}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                       $
                                    </InputAdornment>,
                                }}
                            />
                        </Grid>   
                        <Grid item xs={4}>
                            <TextField 
                                id='Fee'
                                value={Datos.Fee ||''}
                                onChange={handleDatos}
                                fullWidth
                                label='FEE'
                                margin='dense'
                                variant='outlined'
                                style={{margin:1}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                       $
                                    </InputAdornment>,
                                }}
                            />
                        </Grid>                       
                        <Grid item xs={4}>
                            <TextField 
                                id='numpro'
                                value={Datos.numpro ||''}
                                onChange={handleDatos}
                                fullWidth
                                label='PPTO.'
                                margin='dense'
                                variant='outlined'
                                type='number'
                                style={{margin:1}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                id='TiempoProyecto'
                                value={Datos.TiempoProyecto ||''}
                                onChange={handleDatos}
                                fullWidth
                                label='TIEMPO PROYECTO'
                                margin='dense'
                                variant='outlined'
                                type='number'
                                style={{margin:1}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                id='Unidad'
                                value={Datos.Unidad ||''}
                                onChange={handleDatosElemento}
                                fullWidth
                                margin='dense'
                                label='Unidad'
                                variant='outlined'
                                select
                                style={{margin:1}}
                            >
                                <MenuItem  value='MES' style={{textAlign:'center', fontWeight:'bolder'}}> MES (ES) </MenuItem >
                                <MenuItem  value='DIA' style={{textAlign:'center', fontWeight:'bolder'}}> DIA (S) </MenuItem >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id='FormaPago'
                                value={Datos.FormaPago ||''}
                                onChange={handleDatosElementoF}
                                fullWidth
                                margin='dense'
                                label='Forma de Pago'
                                variant='outlined'
                                select
                                style={{margin:1}}
                            >         
                                <MenuItem  value='BANCARIO' style={{textAlign:'center', fontWeight:'bolder'}}> BANCARIO </MenuItem >
                                <MenuItem  value='CREDITO' style={{textAlign:'center', fontWeight:'bolder'}}> CREDITO </MenuItem >
                                <MenuItem  value='EFECTIVO' style={{textAlign:'center', fontWeight:'bolder'}}> EFECTIVO </MenuItem >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id='Validez'
                                value={Datos.Validez ||'2021-01-01'}
                                onChange={handleDatos}
                                fullWidth
                                margin='dense'
                                label='Validez Oferta'
                                variant='outlined'
                                type='date'
                                style={{margin:1}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id='Notas'
                                value={Datos.Notas ||''}
                                onChange={handleDatos}
                                fullWidth
                                margin='dense'
                                label='Notas'
                                variant='outlined'
                                multiline
                                rows={3}
                                style={{margin:1}}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog onClose={handleCloseDetalle} aria-labelledby="customized-dialog-title" open={openDetalle} maxWidth='lg' fullWidth> 
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDetalle}>
                    PROFORMA CG
                </DialogTitle>
                <DialogContent dividers style={{padding:10}}>
                    <Grid container justify='center' spacing={1}>
                        {
                            arrDetalles.map((elDetalle, indexDetalle)=>
                                <Grid item xs={12} key={`${indexDetalle}_${elDetalle.ITEM}`}>
                                    <Detalles
                                        value={elDetalle}
                                        handleUpdateDetalle={handleUpdateDetalle}                                  
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justify={'center'} spacing={1}>
                        <Grid item xs={3}>
                            <Button onClick={handleSaveDetalles} color="primary" startIcon={<SaveIcon/>} variant='contained'>
                                GUARDAR
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="secondary" startIcon={<InsertDriveFileIcon/>} variant='contained'>
                                <ExcelComponentDetalles data={arrDetalles}  />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={handleResetDetalles} color="secondary" startIcon={<CachedIcon/>} variant='contained'>
                                RESET
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
            <Dialog 
                onClose={handleCloseAdd} 
                open={openAdd} maxWidth='sm' 
                fullWidth 
                TransitionComponent={Transition} 
                keepMounted 
                disableEscapeKeyDown
                disableBackdropClick
            > 
                <DialogTitle id="customized-dialog-title" onClose={handleCloseAdd}>
                    AGREGAR ELEMENTO
                </DialogTitle>
                <DialogContent dividers style={{padding:10}}>
                    <Grid container justify='center' spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                id={'AutoComplete-ElementTipo'}
                                options={onlyTipos}
                                renderInput={(params) => <TextField {...params}fullWidth variant="outlined" label='TIPO'/>}
                                value={objetoCosto.TIPO || ''}
                                onChange={handleAutoCompleteTipo}
                                size='small'
                                style={{width:'100%'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id={'AutoComplete-ElementCategoria'}
                                options={onlyCategorias}
                                renderInput={(params) => <TextField {...params}fullWidth variant="outlined" label='CATEGORIA'/>}
                                value={objetoCosto.CATEGORIA || ''}
                                onChange={handleAutoCompleteCategoria}
                                size='small'
                                style={{width:'100%'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id={'AutoComplete-ElementRubro'}
                                options={onlyRubros}
                                renderInput={(params) => <TextField {...params}fullWidth variant="outlined" label='RUBRO'/>}
                                value={objetoCosto.RUBRO || ''}
                                onChange={handleAutoCompleteRubro}
                                size='small'
                                style={{width:'100%'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id={'AutoComplete-ElementConcepto'}
                                options={onlyConceptos}
                                renderInput={(params) => <TextField {...params}fullWidth variant="outlined" label='CONCEPTO'/>}
                                value={objetoCosto.CONCEPTO || ''}
                                onChange={handleAutoCompleteConcepto}
                                size='small'
                                style={{width:'100%'}}
                            />
                        </Grid>
                        {
                            objetoCosto.isSelectSueldo ?
                            <Fragment>
                                <Grid item xs={12}>
                                    <Divider variant="middle" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField 
                                        id='INDICADOR'
                                        value={objetoCosto.INDICADOR ||''}
                                        onChange={handleObjetoCosto}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                          }}
                                        label='INDICADOR'
                                        margin='dense'
                                        variant='outlined'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField 
                                        id='SUELDO'
                                        value={objetoCosto.SUELDO ||''}
                                        onChange={handleObjetoCosto}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                          }}
                                        label='SUELDO'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField 
                                        id='CANTIDAD'
                                        value={objetoCosto.CANTIDAD ||''}
                                        onChange={handleObjetoCosto}
                                        fullWidth
                                        label='CANTIDAD'
                                        margin='dense'
                                        variant='outlined'
                                        type='Number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox 
                                        id='isBonos'
                                        value={objetoCosto.isBonos ||''}
                                        onChange={handleCheckCosto}
                                        color='primary'
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField 
                                        id='BONOS'
                                        value={objetoCosto.BONOS ||''}
                                        onChange={handleObjetoCosto}
                                        disabled={!objetoCosto.isBonos}
                                        fullWidth
                                        label='BONOS DE LEY'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox 
                                        id='isHorasExtras'
                                        value={objetoCosto.isHorasExtras ||''}
                                        onChange={handleCheckCosto}
                                        color='primary'
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField 
                                        id='HORASEXTRAS'
                                        disabled={!objetoCosto.isHorasExtras}
                                        value={objetoCosto.HORASEXTRAS ||''}
                                        onChange={handleObjetoCosto}
                                        fullWidth
                                        label='HORAS EXTRAS'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox 
                                        id='isMovilizacion'
                                        value={objetoCosto.isMovilizacion ||''}
                                        onChange={handleCheckCosto}
                                        color='primary'
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField 
                                        id='MOVILIZACION'
                                        disabled={!objetoCosto.isMovilizacion}
                                        value={objetoCosto.MOVILIZACION ||''}
                                        onChange={handleObjetoCosto}
                                        fullWidth
                                        label='MOVILIZACION'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox 
                                        id='isRecargo'
                                        value={objetoCosto.isRecargo ||''}
                                        onChange={handleCheckCosto}
                                        color='primary'
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField 
                                        id='RECARGO'
                                        disabled={!objetoCosto.isRecargo}
                                        value={objetoCosto.RECARGO ||''}
                                        onChange={handleObjetoCosto}
                                        fullWidth
                                        label='RECARGO ADICIONAL'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container justify='center' spacing={1}>
                                        <Grid item style={{alignSelf:'center'}}>
                                          APORTE IESS
                                        </Grid>
                                        <Grid item>
                                            <Checkbox 
                                                id='isAporteIESS'
                                                value={objetoCosto.isAporteIESS ||''}
                                                onChange={handleCheckCosto}
                                                color='primary'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container justify='center' spacing={1}>
                                        <Grid item style={{alignSelf:'center'}}>
                                          DECIMATERCERA
                                        </Grid>
                                        <Grid item>
                                            <Checkbox 
                                                id='isDecimaTercera'
                                                value={objetoCosto.isDecimaTercera ||''}
                                                onChange={handleCheckCosto}
                                                color='primary'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container justify='center' spacing={1}>
                                        <Grid item style={{alignSelf:'center'}}>
                                          VACACIONES
                                        </Grid>
                                        <Grid item>
                                            <Checkbox 
                                                id='isVacaciones'
                                                value={objetoCosto.isVacaciones ||''}
                                                onChange={handleCheckCosto}
                                                color='primary'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox 
                                        id='isDecimaCuarta'
                                        value={objetoCosto.isRecargo ||''}
                                        onChange={handleCheckCosto}
                                        color='primary'
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField 
                                        id='DECIMACUARTA'
                                        disabled={!objetoCosto.isDecimaCuarta}
                                        value={objetoCosto.DECIMACUARTA ||''}
                                        onChange={handleObjetoCosto}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        fullWidth
                                        label='INDICADOR DECIMACUARTA'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container justify='center' spacing={3}>
                                        <Grid item  xs={6}>
                                            <Button variant='contained' fullWidth size='large' color='primary' onClick={handleProcesarSueldo}>
                                                PROCESAR
                                            </Button>
                                        </Grid>
                                        <Grid item  xs={6}>
                                            <Button variant='contained' fullWidth size='large' onClick={handleCloseAdd} >
                                                CANCELAR
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Fragment>:
                            <Fragment>
                                <Grid item xs={12}>
                                    <Divider variant="middle" />
                                </Grid>
                                {
                                    objetoCosto.isIndicador &&
                                    <Grid item xs={4}>
                                        <TextField 
                                            id='INDICADOR'
                                            value={objetoCosto.INDICADOR ||''}
                                            onChange={handleObjetoCosto}
                                            fullWidth
                                            label='INDICADOR'
                                            margin='dense'
                                            variant='outlined'
                                            style={{margin:1}}
                                        />
                                    </Grid>
                                }     
                                <Grid item xs={4}>
                                    <TextField 
                                        id='CANTIDAD'
                                        value={objetoCosto.CANTIDAD ||''}
                                        onChange={handleObjetoCosto}
                                        fullWidth
                                        label='CANTIDAD'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>                          
                                <Grid item xs={4}>
                                    <TextField 
                                        id='VALOR'
                                        value={objetoCosto.VALOR ||''}
                                        onChange={handleObjetoCosto}
                                        disabled={objetoCosto.CONCEPTO === 'APORTE IESS 4,41% TIEMPO PARCIAL' || objetoCosto.CONCEPTO === 'FONDO DE RESERVA' || objetoCosto.CONCEPTO === 'SERVICIOS PRESTADOS (IVA)'}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                          }}
                                        label='VALOR'
                                        margin='dense'
                                        variant='outlined'
                                        type='number'
                                        style={{margin:1}}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container justify='center' spacing={3}>
                                        <Grid item  xs={6}>
                                            <Button variant='contained' fullWidth size='large' color='primary' onClick={handleProcesarAdd}>
                                                PROCESAR
                                            </Button>
                                        </Grid>
                                        <Grid item  xs={6}>
                                            <Button variant='contained' fullWidth size='large' onClick={handleCloseAdd} >
                                                CANCELAR
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        }
                    </Grid>
                </DialogContent>
            </Dialog>
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12} >
                    <Paper square className='Header' elevation={2}>
                        <Grid container justify='flex-start' spacing={1}>
                            <Grid item lg={2} md={2} sm={4} xs={5}>
                                <TextField 
                                    id='NumProf'
                                    value={Datos.NumProf ||''}
                                    onChange={handleDatos}
                                    fullWidth
                                    label='Num. Proyecto'
                                    margin='dense'
                                    type='number'
                                    variant='outlined'
                                    style={{margin:1}}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={handleSearchProforma} size='medium' color='primary' > 
                                                <SearchIcon/>
                                            </IconButton>
                                            
                                        </InputAdornment>,
                                    }}
                                />
                            </Grid> 
                            <Grid item lg={4} md={4} sm={8} xs={7}>
                                <Grid container spacing={1}>
                                    <Grid item >
                                        <Tooltip placement='top'  title='Aprobar'>
                                            <span>
                                            <IconButton size='medium' color='primary' onClick={handleApprove} disabled={isMercaderista}>
                                                <DoneOutlineIcon/>
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item >
                                        <Tooltip placement='top'  title='Guardar'>
                                            <span>
                                            <IconButton size='medium' color='primary' onClick={handlePreSaveProforma}>
                                                <SaveIcon/>
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item > 
                                        <Tooltip placement='top'  title='EXCEL'>
                                            <span>
                                            <IconButton size='medium' color='primary'>
                                                <ExcelComponentItems data={arrItems}  />
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item > 
                                        <Tooltip placement='top'  title='PDF'>
                                            <span>
                                            <IconButton size='medium' color='primary' onClick={handleCreatePdf}>
                                                <PictureAsPdfIcon/>
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item > 
                                        { isCreatePdf &&
                                            
                                                <Tooltip placement='top'  title='DOWNLOAD'>
                                                    <span>
                                                        <PdfProforma formulario={Datos} detalles={arrDetalles} handleClickPdf={handleClickPdf}/>
                                                    </span>
                                                </Tooltip>
                                            
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12} style={{position:'relative', top:10}}> 
                                <TextField 
                                    id='Proyecto'
                                    value={Datos.Proyecto ||''}
                                    fullWidth
                                    margin='dense'
                                    style={{margin:1}}
                                /> 
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <div style={{width:'100%', height:5}}>
                        {isCalculate && <LinearProgress/>}
                    </div>
                    <div className="grid">
                        <div className="headerBlock">
                            <Paper square style={{width:'100%', height:'100%', padding:10}} elevation={1}>
                            <Grid container justify='space-between' spacing={1}>
                                <Grid item xs={4} style={{textAlign:'center', height:45, paddingTop:14, fontSize:18, fontWeight:'bolder'}}>
                                    ITEMS
                                </Grid>
                                <Grid item xs={5}>
                                    <Grid container spacing={1} justify='flex-end'>
                                        <Grid item xs={5}>
                                            <TextField 
                                                id='ValorProyecto'
                                                value={Datos.TOTAL ||''}
                                                fullWidth
                                                label='VALOR PROYECTO'
                                                margin='dense'
                                                variant='outlined'
                                                style={{margin:1}}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">
                                                    $
                                                    </InputAdornment>,
                                                }}
                                            />
                                        </Grid>  
                                        <Grid item>
                                            <Tooltip placement='top'  title='Calcular'>
                                                <span>
                                                <IconButton size='medium' color='primary' onClick={handleCalcularTotal}>
                                                    <CheckIcon/>
                                                </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip placement='top'  title='Formulario'>
                                                <span>
                                                <IconButton size='medium' color='primary' onClick={handleOpenFormulario}>
                                                    <AssignmentIndIcon/>
                                                </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip placement='top'  title='Detalles'>
                                                <span>
                                                <IconButton size='medium' color='primary' onClick={handleOpenDetalle}>
                                                    <DescriptionIcon/>
                                                </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title='AGREGAR'  placement='top'>
                                                <span>
                                                <IconButton onClick={handleOpenAdd} size='medium' color='primary'>
                                                    <AddIcon/>
                                                </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                            </Paper>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>ACTION</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>TIPO</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>CATEGORIA</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>RUBRO</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>CONCEPTO</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>VALOR</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>CANTIDAD</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>TOTAL</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>TOTAL TIEMPO</div>
                            <div className='lineWidth'></div>
                        </div>
                        <div className="headerCell">
                            <div className='boxText'>VALIDACION</div>
                            <div className='lineWidth'></div>
                        </div>
                        {
                            arrItems.map(elItem=>
                                elItem.STATUS === 'Nuevo' ?
                                    <RowItemNew key={elItem.idEl} dbCostos={dbCostos} value={elItem} idTabla={'ITEM'} handleDeleteRowNew={handleDeleteRowNew} handleUpdateRow={handleUpdateRow} Tiempo={Datos.TiempoProyecto} Unidad={Datos.Unidad} />:
                                    elItem.STATUS === 'Edicion' ?
                                    <RowItemEdit key={elItem.idEl} dbCostos={dbCostos} value={elItem} idTabla={'ITEM'} handleUpdateRow={handleUpdateRow} Tiempo={Datos.TiempoProyecto} Unidad={Datos.Unidad}/>:
                                    elItem.STATUS === 'NOEDIT2' ?
                                    <RowItemNoEdit key={elItem.idEl} dbCostos={dbCostos} value={elItem} idTabla={'ITEM'} handleUpdateRow={handleUpdateRow} Tiempo={Datos.TiempoProyecto} Unidad={Datos.Unidad}/>:
                                    <RowItem key={elItem.idEl} Tiempo={Datos.TiempoProyecto} Unidad={Datos.Unidad} dbCostos={dbCostos} value={elItem} idTabla={'ITEM'} handleDeleteRow={handleDeleteRow} handleEditRow={handleEditRow} />
                            )
                        }
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
                    
};

const Detalles = ({value, handleUpdateDetalle})=>{
    const [ elDetalle, setDetalle] = useState({ITEM:'', DETALLE:'', id:1, DESCRIPCION:'', SUBTOTAL:'', CANTIDAD:'', TOTAL:'', VALIDACION:false});
    const [ backupDetalle, setBackupDetalle ] = useState({});
    

    useEffect(()=>{
        setDetalle(value);
        setBackupDetalle(value)
    },[])

    const handleChange = ({target})=>{
        setDetalle({...elDetalle, [target.id]:target.value})
    };

    const handlePreUpdate = ()=>{
        handleUpdateDetalle(elDetalle.id, elDetalle)
    };

    

    return(
        <Fragment>
            <Grid container spacing={1} >
                <Grid item xs={12} style={{marginBottom:10, marginLeft:4}}>
                    {elDetalle.ITEM}
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id='DESCRIPCION'
                        label='DESCRIPCION'
                        value={elDetalle.DESCRIPCION}
                        onBlur={handlePreUpdate}
                        onChange={handleChange}
                        size='small'
                        fullWidth
                        variant='outlined'
                        multiline
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id='DETALLE'
                        label='DETALLE'
                        value={elDetalle.DETALLE}
                        onBlur={handlePreUpdate}
                        onChange={handleChange}
                        size='small'
                        fullWidth
                        variant='outlined'
                        multiline
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id={`${value.id}`}
                        label='SUBTOTAL'
                        value={elDetalle.SUBTOTAL}
                        size='small'
                        fullWidth
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        id={`${value.id}`}
                        label='CANTIDAD'
                        value={elDetalle.CANTIDAD}
                        size='small'
                        fullWidth
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id={`${value.id}`}
                        label='TOTAL'
                        value={elDetalle.TOTAL}
                        size='small'
                        fullWidth
                        variant='outlined'
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
            </Grid>
        </Fragment>
    )
}

const RowItemNew = ({value, handleDeleteRowNew, handleUpdateRow , idTabla, dbCostos})=>{
    const [ Datos, setDatos ] = useState({ TIPO:'', CATEGORIA:'',RUBRO:'', CONCEPTO:'', INDICADOR:'', VALOR:0, CANTIDAD:1, TOTAL:0, STATUS:'Nuevo', VALIDACION:false });
    const [ onlyTipos, setOnlyTipos ] = useState([]);
    const [ onlyItems, setOnlyItems ] = useState([]);
    const [ onlyCategorias, setOnlyCategorias ] = useState([]);
    const [ onlyRubros, setOnlyRubros ] = useState([]);
    const [ onlyConceptos, setOnlyConceptos ] = useState([]);

    useEffect(()=>{
        setDatos({...Datos, idEl:value.idEl});
        const arr = dbCostos.map(elDb=>elDb.TIPO);
        const arr1 = new Set(arr);
        const arr2 = [...arr1];
        setOnlyTipos(arr2);
    },[])

    const handleDatos = ({target})=>{ 
        if(target.id === 'CANTIDAD'){
            setDatos({...Datos, [target.id]:parseInt(target.value), TOTAL:parseInt(target.value) * parseInt(Datos.VALOR)}) 
        }else if(target.id === 'VALOR'){
            setDatos({...Datos, [target.id]:target.value, TOTAL:parseInt(target.value) * parseInt(Datos.CANTIDAD)}) 
        }else{
            setDatos({...Datos, [target.id]:target.value}) 
        }
        
    };

    const HandleAutoCompleteTipo = (e, value)=>{
        if(value === null){
            setDatos({...Datos, TIPO:'', ITEM:'', RUBRO:''}); 
            setOnlyItems([]);
            setOnlyRubros([]);
        }else{
            setDatos({...Datos, TIPO:value, ITEM:'', RUBRO:''}); 
            const arr = db.filter(elDb=> elDb.Tipo === value)
            const arr0 = arr.map(elDb=>elDb.Item);
            const arr1 = new Set(arr0);
            const arr2 = [...arr1];
            setOnlyItems(arr2);
        }
        
    };

    const HandleAutoCompleteItem = (e, value)=>{
        if(value === null){
            setDatos({...Datos, ITEM:'', RUBRO:''}); 
            setOnlyRubros([]);
        }else{
            setDatos({...Datos, ITEM:value, RUBRO:''}); 
            const arr_0 = db.filter(elDb=> elDb.Tipo === Datos.TIPO);
            const arr = arr_0.filter(elDb=> elDb.Item === value);
            const arr0 = arr.map(elDb=>elDb.Rubro);
            const arr1 = new Set(arr0);
            const arr2 = [...arr1];
            setOnlyRubros(arr2);
        }
    };

    const HandleAutoCompleteRubro = (e, value)=>{
        if(value === null){
            setDatos({...Datos, RUBRO:''}); 
        }else{
            setDatos({...Datos, RUBRO:value});
        }
    };

    const handlePreUpdateRow = ()=>{ 
        const objeto = {...Datos};
        objeto.STATUS = 'Normal';
        handleUpdateRow(objeto, idTabla);
    };

    const handlePreDeleteRow = ()=>{
        handleDeleteRowNew(idTabla);
    };

    const handleCheckbox = ({target})=>{
        setDatos({...Datos, VALIDACION:target.checked});
    };

    return(
        <Fragment>
            <div className='bodyCell'>
                <Grid container justify='center' spacing={1}>
                    <Grid item>
                        <Tooltip title='Guardar' placement='top' >
                            <span>
                            <IconButton onClick={handlePreUpdateRow} size='small'>
                                <CheckIcon className='CheckIcon'/>
                            </IconButton>
                            </span>
                        </Tooltip>
                        
                    </Grid>
                    <Grid item>
                        <Tooltip title='Eliminar' placement='top' >
                            <span>
                            <IconButton onClick={handlePreDeleteRow} size='small'>
                                <DeleteIcon className='DeleteIcon'/>
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
            <div className='bodyCell'>
                <Autocomplete
                    id={'AutoComplete-ElementDate'}
                    options={onlyTipos}
                    renderInput={(params) => <TextField {...params}fullWidth variant="outlined" />}
                    value={Datos.TIPO || ''}
                    onChange={HandleAutoCompleteTipo}
                    size='small'
                    style={{width:'100%'}}
                />
            </div>
            <div className='bodyCell'>
                <Autocomplete
                    id={'AutoComplete-ElementDate'}
                    options={onlyItems}
                    renderInput={(params) => <TextField {...params}fullWidth variant="outlined" />}
                    value={Datos.ITEM || ''}
                    onChange={HandleAutoCompleteItem}
                    size='small'
                    style={{width:'100%'}}
                />
            </div>
            <div className='bodyCell'>
                <Autocomplete
                    id={'AutoComplete-ElementDate'}
                    options={onlyRubros}
                    renderInput={(params) => <TextField {...params}fullWidth variant="outlined" />}
                    value={Datos.RUBRO || ''}
                    onChange={HandleAutoCompleteRubro}
                    size='small'
                    style={{width:'100%'}}
                />
            </div>
            <div className='bodyCell'>
                <TextField 
                    id='VALOR'
                    value={Datos.VALOR ||''}
                    onChange={handleDatos}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    type='number'
                    style={{margin:1}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           $
                        </InputAdornment>,
                    }}
                />
            </div>
            <div className='bodyCell'>
                <TextField 
                    id='CANTIDAD'
                    value={Datos.CANTIDAD ||''}
                    onChange={handleDatos}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    type='number'
                    style={{margin:1}}
                />
            </div>
            <div className='bodyCell'>
                <TextField 
                    id='TOTAL'
                    value={Datos.TOTAL ||''}
                    onChange={handleDatos}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    type='number'
                    style={{margin:1}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           $
                        </InputAdornment>,
                    }}
                />
            </div>
            <div className='bodyCell'>
                <Checkbox
                    checked={Datos.VALIDACION}
                    onChange={handleCheckbox}
                    color='primary'
                />
            </div>
        </Fragment>
    )
};

const RowItemEdit = ({value, handleUpdateRow, idTabla, Tiempo, Unidad})=>{
    const [ Datos, setDatos ] = useState({ TIPO:'', ITEM:'',RUBRO:'', VALOR:0, CANTIDAD:1, TOTAL:0, STATUS:'Nuevo', VALIDACION:false, TOTALTIEMPO:0 });
    const [ backupDatos, setBackupDatos ] = useState({})

    useEffect(()=>{
        setDatos(value);
        setBackupDatos(value);
     },[])

    const handleDatos = ({target})=>{ 
        if(target.id === 'CANTIDAD'){
            setDatos({...Datos, [target.id]:parseInt(target.value), TOTAL:parseInt(target.value) * parseInt(Datos.VALOR)}) 
        }else if(target.id === 'VALOR'){
            setDatos({...Datos, [target.id]:target.value, TOTAL:parseInt(target.value) * parseInt(Datos.CANTIDAD)}) 
        }else{
            setDatos({...Datos, [target.id]:target.value}) 
        }
        
    };

    const handleCheckbox = ({target})=>{
        if(Tiempo === ''){
            alert('NO HAY TIEMPO DEFINIDO')
        }else{
            if(target.checked){
                if(Unidad === 'MES'){
                    const valMes = parseInt(Tiempo);
                    const subtotal = parseFloat(Datos.VALOR).toFixed(2) * valMes;
                    const total = parseFloat(Datos.TOTAL).toFixed(2) * valMes;
                    setDatos({...Datos, TOTALTIEMPO:parseFloat(total).toFixed(2), VALIDACION:target.checked});
                }else{
                    if(Tiempo === 30){
                        setDatos({...Datos, VALIDACION:target.checked});
                    }else{
                        const valMes = parseFloat(parseInt(Tiempo) / 30).toFixed(2);
                        const subtotal = parseFloat(Datos.VALOR).toFixed(2) * valMes;
                        const total = parseFloat(Datos.TOTAL).toFixed(2) * valMes;
                        setDatos({...Datos, TOTALTIEMPO:parseFloat(total).toFixed(2), VALIDACION:target.checked});
                    }
                    
                }
            }else{
                setDatos({...Datos, TOTALTIEMPO:0, VALIDACION:target.checked});
            }
        }
    };

    const handlePreUpdateRow = ()=>{ 
        const objeto = {...Datos};
        objeto.STATUS = 'Normal';
        handleUpdateRow(objeto, idTabla);
    };

    const handleCancelar = ()=>{
        const objeto = {...backupDatos};
        objeto.STATUS = 'Normal';
        handleUpdateRow(objeto, idTabla);
    };

    return(
        <Fragment>
            <div className='bodyCell'>
                <Grid container justify='center' spacing={1}>
                    <Grid item>
                        <Tooltip title='Guardar' placement='top' >
                            <span>
                            <IconButton onClick={handlePreUpdateRow} size='small'>
                                <CheckIcon className='CheckIcon'/>
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title='Cancelar' placement='top' >
                            <span>
                            <IconButton onClick={handleCancelar} size='small'>
                                <CancelIcon className='CancelIcon' />
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
            <div className='bodyCell'>
                {Datos.TIPO}
            </div>
            <div className='bodyCell'>
                {Datos.CATEGORIA}
            </div>
            <div className='bodyCell'>
                {Datos.RUBRO}
            </div>
            <div className='bodyCell'>
                {Datos.CONCEPTO}
            </div>
            <div className='bodyCell'>
                <TextField 
                    id='VALOR'
                    value={Datos.VALOR ||''}
                    onChange={handleDatos}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    type='number'
                    style={{margin:1}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           $
                        </InputAdornment>,
                    }}
                />
            </div>
            <div className='bodyCell'>
                <TextField 
                    id='CANTIDAD'
                    value={Datos.CANTIDAD ||''}
                    onChange={handleDatos}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    type='number'
                    style={{margin:1}}
                />
            </div>
            <div className='bodyCell'>
                <TextField 
                    id='TOTAL'
                    value={Datos.TOTAL ||''}
                    onChange={handleDatos}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    type='number'
                    style={{margin:1}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           $
                        </InputAdornment>,
                    }}
                />
            </div>
            <div className='bodyCell'>
                <TextField 
                    id='TOTALTIEMPO'
                    value={Datos.TOTALTIEMPO ||''}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    type='number'
                    style={{margin:1}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           $
                        </InputAdornment>,
                    }}
                />
            </div>
            <div className='bodyCell'>
                <Checkbox
                    checked={Datos.VALIDACION}
                    onChange={handleCheckbox}
                    color='primary'
                />
            </div>
        </Fragment>
    )
};

const RowItemNoEdit = ({value, handleUpdateRow, idTabla, Tiempo, Unidad})=>{
    const [ Datos, setDatos ] = useState({ TIPO:'', ITEM:'',RUBRO:'', VALOR:0, CANTIDAD:1, TOTAL:0, STATUS:'Nuevo', VALIDACION:false });
    const [ backupDatos, setBackupDatos ] = useState({})

    useEffect(()=>{
        setDatos(value);
        setBackupDatos(value);
     },[])

    const handlePreUpdateRow = ()=>{ 
        const objeto = {...Datos};
        objeto.STATUS = 'NOEDIT';
        handleUpdateRow(objeto, idTabla);
    };

    const handleCancelar = ()=>{
        const objeto = {...backupDatos};
        objeto.STATUS = 'NOEDIT';
        handleUpdateRow(objeto, idTabla);
    };

    const handleCheckbox = ({target})=>{
        if(Tiempo === ''){
            alert('NO HAY TIEMPO DEFINIDO')
        }else{
            if(target.checked){
                if(Unidad === 'MES'){
                    const valMes = parseInt(Tiempo);
                    const subtotal = parseFloat(Datos.VALOR).toFixed(2) * valMes;
                    const total = parseFloat(Datos.TOTAL).toFixed(2) * valMes;
                    setDatos({...Datos, TOTALTIEMPO:parseFloat(total).toFixed(2), VALIDACION:target.checked});
                }else{
                    if(Tiempo === 30){
                        setDatos({...Datos, VALIDACION:target.checked});
                    }else{
                        const valMes = parseFloat(parseInt(Tiempo) / 30).toFixed(2);
                        const subtotal = parseFloat(Datos.VALOR).toFixed(2) * valMes;
                        const total = parseFloat(Datos.TOTAL).toFixed(2) * valMes;
                        setDatos({...Datos, TOTALTIEMPO:parseFloat(total).toFixed(2), VALIDACION:target.checked});
                    }
                    
                }
            }else{
                setDatos({...Datos, TOTALTIEMPO:0, VALIDACION:target.checked});
            }
        }
    };

    return(
        <Fragment>
            <div className='bodyCell'>
                <Grid container justify='center' spacing={1}>
                    <Grid item>
                        <Tooltip title='Guardar' placement='top' >
                            <span>
                            <IconButton onClick={handlePreUpdateRow} size='small'>
                                <CheckIcon className='CheckIcon'/>
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title='Cancelar' placement='top' >
                            <span>
                            <IconButton onClick={handleCancelar} size='small'>
                                <CancelIcon className='CancelIcon' />
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
            <div className='bodyCell'>
                {Datos.TIPO}
            </div>
            <div className='bodyCell'>
                {Datos.CATEGORIA}
            </div>
            <div className='bodyCell'>
                {Datos.RUBRO}
            </div>
            <div className='bodyCell'>
                {Datos.CONCEPTO}
            </div>
            <div className='bodyCell'>
                {Datos.VALOR}
            </div>
            <div className='bodyCell'>
                {Datos.CANTIDAD}
            </div>
            <div className='bodyCell'>
                {Datos.TOTAL}
            </div>
            <div className='bodyCell'>
                {Datos.TOTALTIEMPO}
            </div>
            <div className='bodyCell'>
                <Checkbox
                    checked={Datos.VALIDACION}
                    onChange={handleCheckbox}
                    color='primary'
                />
            </div>
        </Fragment>
    )
};

const RowItem = ({value, handleDeleteRow, handleEditRow, idTabla})=>{
    const [ Datos, setDatos ] = useState({ TIPO:'', ITEM:'',RUBRO:'', VALOR:0, CANTIDAD:1, TOTAL:0, STATUS:'Nuevo', VALIDACION:false });

    useEffect(()=>{ setDatos(value); },[])

    const handlePreEditRow = ()=>{
        const objeto = {...Datos};
        if(Datos.STATUS === 'Normal'){
            objeto.STATUS = 'Edicion';
            handleEditRow(objeto, idTabla);
        }else{
            objeto.STATUS = 'NOEDIT2';
            handleEditRow(objeto, idTabla);
        }
    };

    const handlePreDeleteRow = ()=>{ handleDeleteRow(Datos, idTabla); };

    return(
        <Fragment>
            <div className='bodyCell'>
                <Grid container justify='center' spacing={1}>
                    <Grid item>
                        <Tooltip title='Editar' placement='top' >
                            <span>
                            <IconButton onClick={handlePreEditRow} size='small'>
                                <EditIcon className='EditIcon'/>
                            </IconButton>
                            </span>
                        </Tooltip>                      
                    </Grid>
                    <Grid item>
                        <Tooltip title='Eliminar' placement='top' >
                            <span>
                            <IconButton onClick={handlePreDeleteRow} size='small'>
                                <DeleteIcon className='DeleteIcon'/>
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
            <div className='bodyCell'>
                {Datos.TIPO}
            </div>
            <div className='bodyCell'>
                {Datos.CATEGORIA}
            </div>
            <div className='bodyCell'>
                {Datos.RUBRO}
            </div>
            <div className='bodyCell'>
                {Datos.CONCEPTO}
            </div>
            <div className='bodyCell'>
                {Datos.VALOR}
            </div>
            <div className='bodyCell'>
                {Datos.CANTIDAD}
            </div>
            <div className='bodyCell'>
                {Datos.TOTAL}
            </div>
            <div className='bodyCell'>
                {Datos.TOTALTIEMPO}
            </div>
            <div className='bodyCell'>
                {Datos.VALIDACION ? <CheckBoxIcon style={{marginTop:8}}/> : <CheckBoxOutlineBlankIcon style={{marginTop:8}}/>}
            </div>
        </Fragment>
    )
};

const Proforma = () => {
    return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
            <ProformaBack />
        </SnackbarProvider>
    )
}

export default Proforma;
