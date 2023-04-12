import React, { useState, useEffect } from 'react';
import {    Button,
            Dialog,
            DialogActions,
            DialogContent,
            DialogTitle,
            Divider,
            FormControlLabel,
            FormGroup,
            FormControl,
            Grid,
            Paper,
            Switch,
        } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
            Save as SaveIcon,
        } from '@material-ui/icons';
import { SnackbarProvider, useSnackbar } from 'notistack';
import MaterialTable from 'material-table';
import { useAuth } from "./Auth";

const CreativeColors = createMuiTheme({
    palette: {
      primary: {
        main: '#0E3B5F'
      },
      secondary: {
        main: '#CAD226',
      },
    },
  });

const Headers = [
    {title:'Usuario', field:'usuario'},
    {title:'Clave', field:'pass'},
    {title:'Nombres', field:'nombre'},
    {title:'Coordinador', field:'coordinador'},
    {title:'Área', field:'area'},
    {title:'Tipo', field:'tipo'},
    {title:'Correo', field:'email'},
    //{title:'Accesos', field:'Accesos'},
];

const HeadersProyecciones = [
    {title:'Año', field:'Anio'},
    {title:'Mes', field:'mes'},
    {title:'Proyeccion', field:'valor'},
];

const Modulos = [
    {title:'Matriz Add', field:'matrizadd'},
    {title:'Matriz List', field:'matrizlist'},
    {title:'O.P. Add', field:'opadd'},
    {title:'O.P. F.T.', field:'opft'},
    {title:'O.P. Editor', field:'opeditor'},
    {title:'O.P. List', field:'oplist'},
    {title:'Cronograma Add', field:'cronoadd'},
    {title:'Cronograma List', field:'cronolist'},
    {title:'Cronograma Entrega', field:'cronoentrega'},
    {title:'Cronograma Retiro', field:'cronoretiro'},
    {title:'Supervisores Unitario', field:'superuni'},
    {title:'Supervisores Completo Dario', field:'supercomdar'},
    {title:'Supervisores Completo Walter', field:'supercomwal'},
    {title:'Calendario', field:'calendario'},
    {title:'Subir Instalacion', field:'upInstalacion'},
    {title:'Reportes Instalacion', field:'RepIns'},
    {title:'Elementos Cronograma', field:'elementoscrono'},
    {title:'Elementos Cotizador', field:'elementoscot'},
    {title:'Elementos Matriz', field:'elementosmat'},
    {title:'Elementos O.P.', field:'elementosop'},
    {title:'Accesos', field:'accesos'},
    {title:'Garantia Ventas', field:'GarantiaVentas'},
    {title:'Garantia Supervisores', field:'GarantiaSuper'},
    {title:'Fotos Instalación', field:'ImagenIns'}, 
    {title:'Debug Matriz', field:'DebugMatriz'}, 
    {title:'Elementos Garantia', field:'elementosgar'}, 
    {title:'Garantia Contabilidad', field:'GarantiaContabilidad'},
    {title:'Re-Garantia Ventas', field:'ReGarantiaVentas'},
    {title:'Re-Garantia Produccion', field:'ReGarantiaProduccion'},
    {title:'Edit Garantia', field:'isEditGarantia'},
    {title:'Edit Re-Garantia', field:'isEditReGarantia'},
    {title:'Reporteria Aprobados', field:'ReporteriaAprobados'},
    {title:'Reporteria Facturados', field:'ReporteriaFacturados'},
    {title:'Mercaderista Add', field:'MercaderistaAdd'},
    {title:'Mercaderista Supervisora', field:'MercaderistaTS'},
    {title:'Mercaderista Rutas', field:'MercaderistaTR'},
    {title:'Mercaderista Crear', field:'MercaderistaCrear'},
    {title:'Mercaderista Elementos', field:'MercaderistaEl'},
    {title:'Mercaderista Pdf', field:'MercaderistaPdf'},
    {title:'Mercaderista Excel', field:'MercaderistaExcel'},
    {title:'Mercaderista Proforma', field:'MercaderistaProforma'},
    {title:'Mercaderista Proforma_List', field:'MercaderistaProformaList'},
    {title:'Reporteria FacturadosD', field:'ReporteriaFacturadosD'},
    {title:'Reporteria Historico', field:'ReporteriaHistorico'},
    {title:'Reporteria Resumido', field:'ReporteriaResumido'},
    {title:'Reporteria Produccion', field:'ReporteriaProduccion'},
    {title:'Reporteria Produccion Resumido', field:'ReporteriaProduccionR'},
    {title:'Elementos Planificacion', field:'ElementosPlanificacion'},
    {title:'Reporteria Logistica Resumido', field:'ReporteriaLogisticaR'},
    {title:'Elementos Instaladores', field:'ElementosInstaladores'},
    {title:'Reportes Instalacion2', field:'RepIns2'},
];

const Acceso = () =>{
    const { enqueueSnackbar } = useSnackbar();
    const [ data, setData ] = useState([]);
    const [ cargando, setCargando] = useState(true);
    const [ dataState, setDataState ] = useState(0);
    const [ formulario, setFormulario ] = useState({});
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ openDialogProyections, setOpenDialogProyections ] = useState(false);
    const [ isChange, setIsChange ] = useState(false);
    const { authTokens } = useAuth();
    const [ access, setAccess ] = useState({
        matrizadd: false,
        matrizlist: false,
        opadd: false,
        opft: false,
        opeditor: false,
        oplist: false,
        cronoadd: false,
        cronolist: false,
        cronoentrega: false,
        cronoretiro: false,
        superuni: false,
        supercomdar: false,
        supercomwal: false,
        calendario: false,
        elementoscrono: false,
        elementoscot: false,
        elementosmat: false,
        elementosop: false,
        accesos: false,
        upInstalacion:false,
        RepIns:false,
        GarantiaVentas:false,
        GarantiaSuper:false,
        ImagenIns:false,
        DebugMatriz:false,
        elementosgar:false,
        GarantiaContabilidad:false,
        ReGarantiaVentas:false,
        ReGarantiaProduccion:false,
        isEditGarantia:false,
        isEditReGarantia:false,
        ReporteriaAprobados:false,
        ReporteriaFacturados:false,
        MercaderistaAdd:false,
        MercaderistaTS:false,
        MercaderistaTR:false,
        MercaderistCrear:false,
        MercaderistaEl:false,
        MercaderistaPdf:false,
        MercaderistaExcel:false,
        MercaderistaProforma:false,
        MercaderistaProformaList:false,
        ReporteriaFacturadosD:false,
        ReporteriaHistorico:false,
        ReporteriaResumido:false,
        ReporteriaProduccionR:false,
        ReporteriaLogisticaR:false,
        ElementosPlanificacion:false,
        RepIns2:false,
    });
    const [ getProyections, setProyections ] = useState([]);
    const [ getUpdateEl, setUpdateEl ] = useState(false);
    const [ getElementoUp, setElementoUp ] = useState({});
 
    useEffect(
        ()=>{
            async function handleData(){
                const response = await fetch('/UsersList')
                const data = await response.json();
                setData(data);
                setCargando(false);
            };

            async function handleData2(){
                const response = await fetch('/UsersList2')
                const data = await response.json();
                setData(data);
                setCargando(false);
            };


            if(authTokens.tipo === 'ADMINISTRADOR'){
                handleData();
            }else{
                handleData2();
            }
            

        },[] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
        ()=>{
            async function handleData(){
                const response = await fetch('/UsersList')
                const data = await response.json();
                setData(data);
                setCargando(false);
            };

            async function handleData2(){
                const response = await fetch('/UsersList2')
                const data = await response.json();
                setData(data);
                setCargando(false);
            };


            if(authTokens.tipo === 'ADMINISTRADOR'){
                handleData();
            }else{
                handleData2();
            }

        },[dataState] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
        if(getUpdateEl){
            setFormulario(getElementoUp);
            setProyections(getElementoUp.Proyecciones);
            setUpdateEl(false);
            setElementoUp({});
            setOpenDialogProyections(true);
            
        }
    },[getUpdateEl])

    const HandleCloseDialog = ()=>{
        setOpenDialog(false);
        setAccess({
            matrizadd: false,
            matrizlist: false,
            opadd: false,
            opft: false,
            opeditor: false,
            oplist: false,
            cronoadd: false,
            cronolist: false,
            cronoentrega: false,
            cronoretiro: false,
            superuni: false,
            supercomdar: false,
            supercomwal: false,
            calendario: false,
            elementoscrono: false,
            elementoscot: false,
            elementosmat: false,
            elementosop: false,
            accesos: false,
            upInstalacion:false,
            RepIns: false,
            GarantiaVentas:false,
            GarantiaSupervisores:false,
            elementosgar:false,
            GarantiaContabilidad:false,
            ReGarantiaVentas:false,
            ReGarantiaProduccion:false,
            isEditGarantia:false,
            isEditReGarantia:false,
            ReporteriaAprobados:false,
            ReporteriaFacturados:false,
            MercaderistaAdd:false,
            MercaderistaTS:false,
            MercaderistaTR:false,
            MercaderistCrear:false,
            MercaderistaEl:false,
            MercaderistaPdf:false,
            MercaderistaExcel:false,
            MercaderistaProforma:false,
            MercaderistaProformaList:false,
            ReporteriaFacturadosD:false,
            ReporteriaHistorico:false,
            ReporteriaResumido:false,
            ElementosInstaladores:false,
            ElementosPlanificacion:false,
            ReporteriaProduccionR:false,
            ReporteriaLogisticaR:false,
            ReporteriaProduccion:false,
            RepIns2:false,
        });
    };

    const HandleCloseDialogProyections = ()=>{
        setOpenDialogProyections(false);
        setProyections([]);
    };

    const HandleAccess = (e) =>{
        setAccess({...access, [e.target.value]:e.target.checked});
        setIsChange(true);
    };

    const ModAccessAdmin = () =>{
        return( 
        <FormControl component="fieldset">
            <FormGroup aria-label="Matriz" row> 
                <FormControlLabel
                    value={Modulos[0].field}
                    control={<Switch color="primary" checked={access.matrizadd} onChange={HandleAccess}/>}
                    label={Modulos[0].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[1].field}
                    control={<Switch color="primary" checked={access.matrizlist} onChange={HandleAccess}/>}
                    label={Modulos[1].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="O.P." row>
                <FormControlLabel
                    value={Modulos[2].field}
                    control={<Switch color="primary" checked={access.opadd} onChange={HandleAccess}/>}
                    label={Modulos[2].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[3].field}
                    control={<Switch color="primary" checked={access.opft} onChange={HandleAccess}/>}
                    label={Modulos[3].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[4].field}
                    control={<Switch color="primary" checked={access.opeditor} onChange={HandleAccess}/>}
                    label={Modulos[4].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[5].field}
                    control={<Switch color="primary" checked={access.oplist} onChange={HandleAccess}/>}
                    label={Modulos[5].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Cronogramas" row>
                <FormControlLabel
                    value={Modulos[6].field}
                    control={<Switch color="primary" checked={access.cronoadd} onChange={HandleAccess}/>}
                    label={Modulos[6].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[7].field}
                    control={<Switch color="primary" checked={access.cronolist} onChange={HandleAccess}/>}
                    label={Modulos[7].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[8].field}
                    control={<Switch color="primary" checked={access.cronoentrega} onChange={HandleAccess}/>}
                    label={Modulos[8].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[9].field}
                    control={<Switch color="primary" checked={access.cronoretiro} onChange={HandleAccess}/>}
                    label={Modulos[9].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Supervisores" row>
                    <FormControlLabel
                        value={Modulos[10].field}
                        control={<Switch color="primary" checked={access.superuni} onChange={HandleAccess}/>}
                        label={Modulos[10].title}
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value={Modulos[11].field}
                        control={<Switch color="primary" checked={access.supercomdar} onChange={HandleAccess}/>}
                        label={Modulos[11].title}
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value={Modulos[12].field}
                        control={<Switch color="primary" checked={access.supercomwal} onChange={HandleAccess}/>}
                        label={Modulos[12].title}
                        labelPlacement="end"
                    />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Calendario" row>
                <FormControlLabel
                    value={Modulos[13].field}
                    control={<Switch color="primary" checked={access.calendario} onChange={HandleAccess}/>}
                    label={Modulos[13].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Instalacion" row>
                <FormControlLabel
                    value={Modulos[14].field}
                    control={<Switch color="primary" checked={access.upInstalacion} onChange={HandleAccess}/>}
                    label={Modulos[14].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[15].field}
                    control={<Switch color="primary" checked={access.RepIns} onChange={HandleAccess}/>}
                    label={Modulos[15].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[50].field}
                    control={<Switch color="primary" checked={access.RepIns2} onChange={HandleAccess}/>}
                    label={Modulos[50].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[23].field}
                    control={<Switch color="primary" checked={access.ImagenIns} onChange={HandleAccess}/>}
                    label={Modulos[23].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Elementos" row>
                <FormControlLabel
                    value={Modulos[16].field}
                    control={<Switch color="primary" checked={access.elementoscrono} onChange={HandleAccess}/>}
                    label={Modulos[16].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[17].field}
                    control={<Switch color="primary" checked={access.elementoscot} onChange={HandleAccess}/>}
                    label={Modulos[17].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[18].field}
                    control={<Switch color="primary" checked={access.elementosmat} onChange={HandleAccess}/>}
                    label={Modulos[18].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[19].field}
                    control={<Switch color="primary" checked={access.elementosop} onChange={HandleAccess}/>}
                    label={Modulos[19].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[25].field}
                    control={<Switch color="primary" checked={access.elementosgar} onChange={HandleAccess}/>}
                    label={Modulos[25].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[20].field}
                    control={<Switch color="primary" checked={access.accesos} onChange={HandleAccess}/>}
                    label={Modulos[20].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[47].field}
                    control={<Switch color="primary" checked={access.ElementosPlanificacion} onChange={HandleAccess}/>}
                    label={Modulos[47].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[49].field}
                    control={<Switch color="primary" checked={access.ElementosInstaladores} onChange={HandleAccess}/>}
                    label={Modulos[49].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Garantia" row>
                <FormControlLabel
                    value={Modulos[21].field}
                    control={<Switch color="primary" checked={access.GarantiaVentas} onChange={HandleAccess}/>}
                    label={Modulos[21].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[22].field}
                    control={<Switch color="primary" checked={access.GarantiaSuper} onChange={HandleAccess}/>}
                    label={Modulos[22].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[26].field}
                    control={<Switch color="primary" checked={access.GarantiaContabilidad} onChange={HandleAccess}/>}
                    label={Modulos[26].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[27].field}
                    control={<Switch color="primary" checked={access.ReGarantiaVentas} onChange={HandleAccess}/>}
                    label={Modulos[27].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[28].field}
                    control={<Switch color="primary" checked={access.ReGarantiaProduccion} onChange={HandleAccess}/>}
                    label={Modulos[28].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[29].field}
                    control={<Switch color="secondary" checked={access.isEditGarantia} onChange={HandleAccess}/>}
                    label={Modulos[29].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[30].field}
                    control={<Switch color="secondary" checked={access.isEditReGarantia} onChange={HandleAccess}/>}
                    label={Modulos[30].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Mercaderista" row>
                <FormControlLabel
                    value={Modulos[36].field}
                    control={<Switch color="primary" checked={access.MercaderistaCrear} onChange={HandleAccess}/>}
                    label={Modulos[36].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[33].field}
                    control={<Switch color="primary" checked={access.MercaderistaAdd} onChange={HandleAccess}/>}
                    label={Modulos[33].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[34].field}
                    control={<Switch color="primary" checked={access.MercaderistaTS} onChange={HandleAccess}/>}
                    label={Modulos[34].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[35].field}
                    control={<Switch color="primary" checked={access.MercaderistaTR} onChange={HandleAccess}/>}
                    label={Modulos[35].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[37].field}
                    control={<Switch color="primary" checked={access.MercaderistaEl} onChange={HandleAccess}/>}
                    label={Modulos[37].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[38].field}
                    control={<Switch color="primary" checked={access.MercaderistaPdf} onChange={HandleAccess}/>}
                    label={Modulos[38].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[39].field}
                    control={<Switch color="primary" checked={access.MercaderistaExcel} onChange={HandleAccess}/>}
                    label={Modulos[39].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[40].field}
                    control={<Switch color="primary" checked={access.MercaderistaProforma} onChange={HandleAccess}/>}
                    label={Modulos[40].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[41].field}
                    control={<Switch color="primary" checked={access.MercaderistaProformaList} onChange={HandleAccess}/>}
                    label={Modulos[41].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Repoteria" row>
                <FormControlLabel
                    value={Modulos[31].field}
                    control={<Switch color="primary" checked={access.ReporteriaAprobados} onChange={HandleAccess}/>}
                    label={Modulos[31].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[32].field}
                    control={<Switch color="primary" checked={access.ReporteriaFacturados} onChange={HandleAccess}/>}
                    label={Modulos[32].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[42].field}
                    control={<Switch color="primary" checked={access.ReporteriaFacturadosD} onChange={HandleAccess}/>}
                    label={Modulos[42].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[43].field}
                    control={<Switch color="primary" checked={access.ReporteriaHistorico} onChange={HandleAccess}/>}
                    label={Modulos[43].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[44].field}
                    control={<Switch color="primary" checked={access.ReporteriaResumido} onChange={HandleAccess}/>}
                    label={Modulos[44].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[45].field}
                    control={<Switch color="primary" checked={access.ReporteriaProduccion} onChange={HandleAccess}/>}
                    label={Modulos[45].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[46].field}
                    control={<Switch color="primary" checked={access.ReporteriaProduccionR} onChange={HandleAccess}/>}
                    label={Modulos[46].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[48].field}
                    control={<Switch color="primary" checked={access.ReporteriaLogisticaR} onChange={HandleAccess}/>}
                    label={Modulos[48].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Debugs" row>
                <FormControlLabel
                    value={Modulos[24].field}
                    control={<Switch color="primary" checked={access.DebugMatriz} onChange={HandleAccess}/>}
                    label={Modulos[24].title}
                    labelPlacement="end"
                />
            </FormGroup>
        </FormControl>
        );

    };

    const ModAccessVentas = () =>{
        return( 
        <FormControl component="fieldset">
            <FormGroup aria-label="Matriz" row> 
                <FormControlLabel
                    value={Modulos[0].field}
                    control={<Switch color="primary" checked={access.matrizadd} onChange={HandleAccess}/>}
                    label={Modulos[0].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[1].field}
                    control={<Switch color="primary" checked={access.matrizlist} onChange={HandleAccess}/>}
                    label={Modulos[1].title}
                    labelPlacement="end"
                />                
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="O.P." row>
                <FormControlLabel
                    value={Modulos[2].field}
                    control={<Switch color="primary" checked={access.opadd} onChange={HandleAccess}/>}
                    label={Modulos[2].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[3].field}
                    control={<Switch color="primary" checked={access.opft} onChange={HandleAccess}/>}
                    label={Modulos[3].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[4].field}
                    control={<Switch color="primary" checked={access.opeditor} onChange={HandleAccess}/>}
                    label={Modulos[4].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[5].field}
                    control={<Switch color="primary" checked={access.oplist} onChange={HandleAccess}/>}
                    label={Modulos[5].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Cronogramas" row>
                <FormControlLabel
                    value={Modulos[6].field}
                    control={<Switch color="primary" checked={access.cronoadd} onChange={HandleAccess}/>}
                    label={Modulos[6].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[7].field}
                    control={<Switch color="primary" checked={access.cronolist} onChange={HandleAccess}/>}
                    label={Modulos[7].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[8].field}
                    control={<Switch color="primary" checked={access.cronoentrega} onChange={HandleAccess}/>}
                    label={Modulos[8].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[9].field}
                    control={<Switch color="primary" checked={access.cronoretiro} onChange={HandleAccess}/>}
                    label={Modulos[9].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Calendario" row>
                <FormControlLabel
                    value={Modulos[13].field}
                    control={<Switch color="primary" checked={access.calendario} onChange={HandleAccess}/>}
                    label={Modulos[13].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Instalacion" row>
                <FormControlLabel
                    value={Modulos[14].field}
                    control={<Switch color="primary" checked={access.upInstalacion} onChange={HandleAccess}/>}
                    label={Modulos[14].title}
                    labelPlacement="end"
                />
             <FormControlLabel
                    value={Modulos[15].field}
                    control={<Switch color="primary" checked={access.RepIns} onChange={HandleAccess}/>}
                    label={Modulos[15].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <FormControlLabel
                    value={Modulos[50].field}
                    control={<Switch color="primary" checked={access.RepIns2} onChange={HandleAccess}/>}
                    label={Modulos[50].title}
                    labelPlacement="end"
                />
            <Divider/>
            <FormGroup aria-label="Elementos" row>
                <FormControlLabel
                    value={Modulos[16].field}
                    control={<Switch color="primary" checked={access.elementoscrono} onChange={HandleAccess}/>}
                    label={Modulos[16].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[17].field}
                    control={<Switch color="primary" checked={access.elementoscot} onChange={HandleAccess}/>}
                    label={Modulos[17].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[18].field}
                    control={<Switch color="primary" checked={access.elementosmat} onChange={HandleAccess}/>}
                    label={Modulos[18].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[19].field}
                    control={<Switch color="primary" checked={access.elementosop} onChange={HandleAccess}/>}
                    label={Modulos[19].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[20].field}
                    control={<Switch color="primary" checked={access.accesos} onChange={HandleAccess}/>}
                    label={Modulos[20].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[47].field}
                    control={<Switch color="primary" checked={access.ElementosPlanificacion} onChange={HandleAccess}/>}
                    label={Modulos[47].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[49].field}
                    control={<Switch color="primary" checked={access.ElementosInstaladores} onChange={HandleAccess}/>}
                    label={Modulos[49].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Garantia" row>
                <FormControlLabel
                    value={Modulos[21].field}
                    control={<Switch color="primary" checked={access.GarantiaVentas} onChange={HandleAccess}/>}
                    label={Modulos[21].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[22].field}
                    control={<Switch color="primary" checked={access.GarantiaSupervisores} onChange={HandleAccess}/>}
                    label={Modulos[22].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[26].field}
                    control={<Switch color="primary" checked={access.GarantiaContabilidad} onChange={HandleAccess}/>}
                    label={Modulos[26].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[27].field}
                    control={<Switch color="primary" checked={access.ReGarantiaVentas} onChange={HandleAccess}/>}
                    label={Modulos[27].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[28].field}
                    control={<Switch color="primary" checked={access.ReGarantiaProduccion} onChange={HandleAccess}/>}
                    label={Modulos[28].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[29].field}
                    control={<Switch color="secondary" checked={access.isEditGarantia} onChange={HandleAccess}/>}
                    label={Modulos[29].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[30].field}
                    control={<Switch color="secondary" checked={access.isEditReGarantia} onChange={HandleAccess}/>}
                    label={Modulos[30].title}
                    labelPlacement="end"
                />
            </FormGroup>
            <Divider/>
            <FormGroup aria-label="Mercaderista" row>
                <FormControlLabel
                    value={Modulos[36].field}
                    control={<Switch color="primary" checked={access.MercaderistaCrear} onChange={HandleAccess}/>}
                    label={Modulos[36].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[33].field}
                    control={<Switch color="primary" checked={access.MercaderistaAdd} onChange={HandleAccess}/>}
                    label={Modulos[33].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[34].field}
                    control={<Switch color="primary" checked={access.MercaderistaTS} onChange={HandleAccess}/>}
                    label={Modulos[34].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[35].field}
                    control={<Switch color="primary" checked={access.MercaderistaTR} onChange={HandleAccess}/>}
                    label={Modulos[33].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[37].field}
                    control={<Switch color="primary" checked={access.MercaderistaEl} onChange={HandleAccess}/>}
                    label={Modulos[37].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[38].field}
                    control={<Switch color="primary" checked={access.MercaderistaPdf} onChange={HandleAccess}/>}
                    label={Modulos[38].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[39].field}
                    control={<Switch color="primary" checked={access.MercaderistaExcel} onChange={HandleAccess}/>}
                    label={Modulos[39].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[40].field}
                    control={<Switch color="primary" checked={access.MercaderistaProforma} onChange={HandleAccess}/>}
                    label={Modulos[40].title}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={Modulos[41].field}
                    control={<Switch color="primary" checked={access.MercaderistaProformaList} onChange={HandleAccess}/>}
                    label={Modulos[41].title}
                    labelPlacement="end"
                />
            </FormGroup>
        </FormControl>
        );

    };

    const HandleSave = () =>{
        if(isChange){
            fetch('/UsersList', {
                method: 'post',
                body: JSON.stringify({_id: formulario._id , Accesos:access}),
                headers:{'Content-Type': 'application/json'}
            })
                .then(res=> res.json())
                .then(result => {
                    if(result.message){
                        setCargando(true);
                        setAccess({
                            matrizadd: false,
                            matrizlist: false,
                            opadd: false,
                            opft: false,
                            opeditor: false,
                            oplist: false,
                            cronoadd: false,
                            cronolist: false,
                            cronoentrega: false,
                            cronoretiro: false,
                            superuni: false,
                            supercomdar: false,
                            supercomwal: false,
                            calendario: false,
                            elementoscrono: false,
                            elementoscot: false,
                            elementosmat: false,
                            elementosop: false,
                            accesos: false,
                            elementosgar:false,
                            GarantiaContabilidad:false,
                            ReGarantiaVentas:false,
                            ReGarantiaProduccion:false,
                            isEditGarantia:false,
                            isEditReGarantia:false,
                            ReporteriaAprobados:false,
                            ReporteriaFacturados:false,
                            MercaderistaAdd:false,
                            MercaderistaTS:false,
                            MercaderistaTR:false,
                            MercaderistCrear:false,
                            MercaderistEl:false,
                            MercaderistaPdf:false,
                            MercaderistaExcel:false,
                            MercaderistaProforma:false,
                            MercaderistaProformaList:false,
                            ReporteriaFacturadosD:false,
                            ReporteriaHistorico:false,
                            ReporteriaResumido:false,
                            ElementosPlanificacion:false,
                            ReporteriaProduccionR:false,
                            ReporteriaLogisticaR:false,
                            ReporteriaProduccion:false
                        });
                        setProyections([
                            {mes:'Enero', valor:0},
                            {mes:'Febrero', valor:0},
                            {mes:'Marzo', valor:0},
                            {mes:'Abril', valor:0},
                            {mes:'Mayo', valor:0},
                            {mes:'Junio', valor:0},
                            {mes:'Julio', valor:0},
                            {mes:'Agosto', valor:0},
                            {mes:'Septiembre', valor:0},
                            {mes:'Octubre', valor:0},
                            {mes:'Noviembre', valor:0},
                            {mes:'Diciembre', valor:0},
                        ])
                        setFormulario({});
                        enqueueSnackbar(result.message, { variant:'success'});
                        setDataState(dataState + 1);
                        setOpenDialog(false);
                    }else{
                        enqueueSnackbar(result.status, { variant:'error'});
                    }
                    
                })
        }else{
            enqueueSnackbar('No ha hecho ningún cambio', { variant:'error'});
        }
        
    };

    const handleUpdateProyecciones = (elem)=>{
        const arrMap = [...data];
        const updateEl = arrMap.map(el=> {
            if(el._id === elem._id){
                return elem;
            }else{
                return el;
            }
        });
        setData(updateEl);
        setElementoUp(elem);
        setOpenDialogProyections(false);
        setProyections([]);
        setFormulario({});
        setUpdateEl(true);
    };

    return(
        <ThemeProvider theme={CreativeColors}>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Paper elevation={3}>
                        <MaterialTable
                            title="Accesos"
                            columns={Headers}
                            data={data}
                            isLoading={cargando}
                            options={{
                                filtering: true,
                                headerStyle: {
                                    backgroundColor: '#0E3B5F',
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                },
                                pageSize:10
                            }}
                            header={true}
                            editable={{  
                                onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    const url = 'UsersList';
                                    fetch(url, {
                                        method: 'PUT',
                                        body: JSON.stringify(newData),
                                        headers:{
                                        'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(result => {
                                        if(result.message)
                                        {
                                            enqueueSnackbar(result.message, { variant:'success'});
                                            setCargando(true);
                                            setDataState(dataState + 1);
                                            resolve();
                                        }else{
                                            enqueueSnackbar(result.message, { variant:'error'})
                                            resolve();
                                        }
                                    })
                                }),
                                onRowDelete: (oldData) =>
                                new Promise(resolve => {
                                    const url = 'UsersList';
                                    fetch(url, {
                                        method: 'DELETE',
                                        body: JSON.stringify(oldData),
                                        headers:{
                                        'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response =>  response.json())
                                    .then(result => {
                                        if(result.message)
                                        {
                                            enqueueSnackbar(result.message, { variant:'success' });
                                            setCargando(true);
                                            setDataState(dataState + 1);
                                            resolve();
                                        }else{
                                            enqueueSnackbar(result.message, { variant:'error' })
                                            resolve();
                                        }
                                    })
                                }),
                            }}
                            actions={[
                                {
                                    icon: 'security',
                                    tooltip: 'Acceso',
                                    onClick: (event, rowData) => {
                                        rowData.Accesos ? setAccess(rowData.Accesos) : console.log('Acceso Vacio');
                                        setFormulario(rowData);
                                        setOpenDialog(true);
                                    }
                                },
                                {
                                    icon: 'library_add',
                                    tooltip: 'Proyeccion',
                                    onClick: (event, rowData) => {
                                        setFormulario(rowData);
                                        rowData.Proyecciones ? rowData.Proyecciones.length === 0 ?  console.log('Acceso Vacio') : setProyections(rowData.Proyecciones)  : console.log('Acceso Vacio');
                                        setOpenDialogProyections(true);
                                    }
                                },
                            ]}
                        />
                    </Paper>
                </Grid>
                <Dialog
                    fullWidth={true}
                    maxWidth='`md`'
                    open={openDialog}
                    onClose={HandleCloseDialog}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Modulos</DialogTitle>
                    <DialogContent>
                    {
                        authTokens.tipo === 'ADMINISTRADOR'? <ModAccessAdmin /> : <ModAccessVentas/>
                    }
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={HandleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>
                        Guardar
                    </Button>
                    <Button onClick={HandleCloseDialog} variant="contained" color="secondary">
                        Cerrar
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    fullWidth={true}
                    maxWidth='sm'
                    open={openDialogProyections}
                    onClose={HandleCloseDialogProyections}
                    aria-labelledby="max-width-dialog-title"
                    style={{minHeight:'100vh', height:'100vh'}}
                >
                    <DialogContent >
                    <Paper elevation={3} >
                        <MaterialTable
                            title="Proyecciones"
                            columns={HeadersProyecciones}
                            data={getProyections}
                            isLoading={cargando}
                            options={{
                                filtering: true,
                                headerStyle: {
                                    backgroundColor: '#0E3B5F',
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                },
                                pageSize:10
                            }}
                            header={true}
                            editable={{  
                                onRowAdd: (newData) =>
                                new Promise(resolve => {
                                    const url = '/Users/Proyecciones';
                                    const objeto        = {...newData};
                                    objeto.idUsuario    = formulario._id;
                                    if(formulario.Proyecciones){
                                        if(formulario.Proyecciones.length > 0){
                                            const arrN = [...formulario.Proyecciones];
                                            arrN.push(newData);
                                            objeto.Proyecciones = [...arrN];
                                        }else{
                                            const arrEl = [];
                                            arrEl.push(newData);
                                            objeto.Proyecciones = [...arrEl];
                                        }
                                    }else{
                                        const arrEl = [];
                                        arrEl.push(newData);
                                        objeto.Proyecciones = [...arrEl];
                                    }
                                    fetch(url, {
                                        method: 'PUT',
                                        body: JSON.stringify(objeto),
                                        headers:{
                                        'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(result => {
                                        if(result.status){
                                            enqueueSnackbar(result.status, { variant:'error'})
                                            resolve();
                                        }else{
                                            enqueueSnackbar('Agregado', { variant:'success'});
                                            handleUpdateProyecciones(result)
                                            //setCargando(true);
                                            resolve();
                                        }
                                    })
                                }),
                                onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    const url = '/Users/Proyecciones';
                                    const objeto        = {...newData};
                                    objeto.idUsuario    = formulario._id;
                                    if(formulario.Proyecciones){
                                        if(formulario.Proyecciones.length > 0){
                                            const arrN = formulario.Proyecciones.map(el=>{
                                                if(el.mes === newData.mes){
                                                    return newData
                                                }else{
                                                    return el
                                                }
                                            })
                                            objeto.Proyecciones = [...arrN];
                                        }else{
                                            const arrEl = [];
                                            arrEl.push(newData);
                                            objeto.Proyecciones = [...arrEl];
                                        }
                                    }else{
                                        const arrEl = [];
                                        arrEl.push(newData);
                                        objeto.Proyecciones = [...arrEl];
                                    }
                                    fetch(url, {
                                        method: 'PUT',
                                        body: JSON.stringify(objeto),
                                        headers:{
                                        'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(result => {
                                        if(result.status){
                                            enqueueSnackbar(result.status, { variant:'error'})
                                            resolve();
                                        }else{
                                            enqueueSnackbar('Actualizado', { variant:'success'});
                                            handleUpdateProyecciones(result)
                                            //setCargando(true);
                                            resolve();
                                        }
                                    })
                                }),
                            }}
                        />
                    </Paper>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={HandleCloseDialogProyections} variant="contained" color="secondary">
                        Cerrar
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </ThemeProvider>
    );
};

export default function Accesos() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Acceso />
        </SnackbarProvider>
    );
}