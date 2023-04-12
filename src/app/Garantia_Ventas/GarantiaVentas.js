import React, { useState, useEffect } from 'react';
import  {
            Button,
            Card,
            CardContent,
            Checkbox,
            Dialog,
            DialogActions,
            DialogContent,
            DialogTitle,
            Fab,
            Grid,
            Paper,
            TextField,
            Tooltip,
        } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { useAuth } from '../Auth';
import { Button as ButtonSemantic } from 'semantic-ui-react';
/***************************************ICONOS************************************/
import { 
    Refresh as RefreshIcon,
    Save as SaveIcon,
    TableChart as TableChartIcon,
   } from '@material-ui/icons';

import TablaPrincipal from './TablaPrincipal';
import TablaSecundaria from './TablaSecundaria';
import { GarantiaContext } from './GarantiaContext';
import Pdf from './Pdf';
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
const moment2 = require('moment-timezone'); 
const moment = require('moment'); 
/*********************************************************************************/

const Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const headersFixed = [
    {title: 'Cadena', field:'Cadena', width: 150},
    {title: 'Local', field:'Local', width: 150},
    {title: 'Ciudad', field:'Ciudad', width: 150},
    {title: 'Dirección', field:'Direccion', width: 800},
    {title: 'Instalación', field:'FecIns', width: 150},
    {title: 'Vencimiento', field:'FecVen', width: 150},
];

const GarantiaVenta = (props)=>{
    const { setHeaderWord, setOpen } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const [ formulario, setFormulario ] = useState({});
    const [ Instalaciones, setInstalaciones ] = useState([]);
    const [ dataCrono, setDataCrono ] = useState({cliente:'', proyecto:''});
    const [ headers, setHeaders ] = useState([]);
    const [ searchData, setSearchData ] = useState(false);
    const [ dataIns, setDataIns ] = useState({});
    const [ arrIns, setArrIns ] = useState([]);
    const [ cantCubGar, setCantCubGar ] = useState(0);
    const [ isPdf, setPdf ]= useState(false);
    const [ Garantias, setGarantias ] = useState([]);
    const [ PreIngresos, setPreIngresos ] = useState([]);
    const [ openPreSave, setOpenPreSave ] = useState(false);
    const [ showTableGarantiasCreated, setShowTableGarantiasCreated ] = useState( false );
    const [ isSaving, setSaving ] = useState(false);
    const [ textSave, setTexSave ] = useState('Guardar');
    const [ dense ] = useState(true);
    const [ isCharged, setCharged ] = useState(false);
    const [ unMountTable, setUnMountTable ] = useState(true);
    const [ isSavingGarantia, setSavingGarantia ] = useState(false);
    const [ showNumGar, setShowNumGar ] = useState(false);
    const [ numGarCreated, setNumGarCreated] = useState('');
    const [ motivosGarantia, setMotivosGarantia ] = useState([]);
    const [ tiposGarantia, setTiposGarantia ] = useState([]);

    useEffect(
        ()=>{
            const HandleSearchInfGar = async ()=>{
                const motivosG = await fetch('/MotivoGarantias');
                const datam = await motivosG.json();
                const tiposG = await fetch('/TipoGarantias');
                const datat = await tiposG.json();
                setMotivosGarantia(datam);
                setTiposGarantia(datat);
            };

           enqueueSnackbar('Ingrese un PPTO', {variant:'info'});
           setHeaderWord('Garantía/Ventas');
           HandleSearchInfGar();
           setOpen(false);
        },[] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
        ()=>{
            if(searchData){
                setSearchData(false);
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
                    }else{ 
                        const arr = [];
                        result.forEach((value,index)=>{
                            const objeto = {...value};
                            //const fechaIns = new Date(value.Creacion);
                            const fecha = new Date(value.Creacion);      
                            const fechaIns = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
                            objeto.FecIns = fechaIns;
                            objeto[value.TipTra] = value.Cantidad;
                            const arrFil = motivosGarantia.filter(({tiptra})=> tiptra.toString() === value.TipTra.toString());
                            if(value.ElementosArr.length > 0 ){
                                if(value.ElementosArr.length === 1){
                                    var fecha2 = moment(value.ElementosArr[0].FecVen);
                                    var fechaAcTu = (moment().format()).split('T')[0]
                                    var Status = fecha2.diff(fechaAcTu, 'days');
                                    if(Status < 0 ){
                                        objeto.FecVen = 'VENCIDO';
                                        arr.push(objeto);
                                    }else{
                                        objeto.FecVen = value.ElementosArr[0].FecVen ;
                                        arr.push(objeto);
                                    }
                                }else{
                                    const arrFechas = value.ElementosArr.map(valArr=> valArr.FecVen);
                                    const fecMax = arrFechas.reduce(function (fecAnt, fecAct) { return new Date(fecAnt) > new Date(fecAct) ? fecAnt : fecAct; });
                                    var fecha21 = moment(fecMax);
                                    var fechaAcTu1 = (moment().format()).split('T')[0]
                                    var Status1 = fecha21.diff(fechaAcTu1, 'days');
                                    if(Status1 < 0 ){
                                        objeto.FecVen = 'VENCIDO';
                                        arr.push(objeto);
                                    }else{
                                        objeto.FecVen = fecMax ;
                                        arr.push(objeto);
                                    }
                                }
                                
                                
                            }else{
                                if(arrFil.length > 0){
                                    let fechaV = new Date(value.Creacion);
                                    fechaV.setDate(fechaV.getDate() + parseInt(arrFil[0].tiegar));
                                    const fechaGar =  `${fechaV.getFullYear()}-${fechaV.getMonth() + 1}-${fechaV.getDate()}`;                             
                                    var fecha22 = moment(fechaGar);
                                    var fechaAcTu2 = (moment().format()).split('T')[0]
                                    var Status2 = fecha22.diff(fechaAcTu2, 'days');
                                    if(Status2 < 0 ){
                                        objeto.FecVen = 'VENCIDO';
                                        arr.push(objeto);
                                    }else{
                                        objeto.FecVen = fechaGar;
                                        arr.push(objeto);
                                    }
                                    
                                }else{
                                    objeto.FecVen = 'NO APLICA'
                                    arr.push(objeto);
                                }
                            }
                            
                            
                            if(index === (result.length - 1)){
                                setInstalaciones(arr);
                                setPdf(true);
                                fetch('/SearchGarantiaVentas',{
                                    method: 'POST',
                                    body: JSON.stringify({numpro:formulario.numpro}),
                                    headers:{
                                      'Content-Type':'application/json'
                                    }
                                })
                                .then(response2=> response2.json())
                                .then(result2 =>{
                                    console.log(result2);
                                    setGarantias(result2);
                                    setUnMountTable(false);
                                    setTimeout(()=>{
                                        setCharged(true);
                                    },100)
                                });
                            }
                        });
                        
                    }
                })
            };
        },[searchData] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const HandleSearch = () =>{
        if (formulario.numpro === '' || parseInt(formulario.numpro) < 1000 ){
            enqueueSnackbar('Debe ingresar un Numero de Presupuesto para poder realizar la busqueda!',{variant:'error'});
        }else{ 
            fetch('/SearchCronoGar',{
                method: 'POST',
                body: JSON.stringify({numpro:formulario.numpro}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
                .then(response=> response.json())
                .then(result =>{ 
                    if(result.status){
                        enqueueSnackbar(result.status,{variant:'error'});
                    }else{ 
                        console.log('Cronograma Encontrado');
                        const heads = result.encabezados;
                        const arr = [];
                        headersFixed.forEach((value, index)=>{                           
                            arr.push(value);
                            if(index === (headersFixed.length - 1)){
                                heads.forEach((value2, index2)=>{
                                    arr.push({title:value2.tiptra, field:value2.tiptra, width: 180, numeric:true});
                                    if(index2 === (heads.length - 1)){
                                        setHeaders(arr);
                                        console.log(arr);
                                        setSearchData(true);
                                        setDataCrono(result); 
                                    }
                                })
                            }
                        })
                        
                    }
                });         
              
        }
    };
    
    const HandleClear = ()=>{
        setCharged(false);
        setUnMountTable(true);
        setArrIns([]);
        setGarantias([]);
        setCantCubGar(0);
        setDataIns({});
        setOpenPreSave(false);
        setNumGarCreated('');
        setShowNumGar(false);
        setTimeout(()=>{
            HandleSearch();
        },500)
        
    };

    const HandleClearButton = ()=>{
        setPdf(false);
        setCharged(false);
        setUnMountTable(true);
        setArrIns([]);
        setGarantias([]);
        setCantCubGar(0);
        setDataIns({});
        setOpenPreSave(false);
        setNumGarCreated('');
        setShowNumGar(false);
        setInstalaciones([]);
        setPreIngresos([]);
        setDataCrono({cliente:'', proyecto:''});
        setFormulario({});
    };

    const HandleSave = ()=>{
        setSavingGarantia(true);
        const arr = [];
        const arrFilter = [];
        Instalaciones.forEach(({ElementosArr})=>{
            ElementosArr.forEach(({Status})=>{
                 if(Status === 'Pre-Creado'){
                     arrFilter.push('Elem');
                 }
            })
        });
        if(arrFilter.length > 0){
            Instalaciones.forEach((value,index)=>{
                const { ElementosArr } = value;             
                ElementosArr.forEach((value2, index2)=>{
                if(value2.Status === 'Pre-Creado'){
                    const objeto = {};
                    objeto.idElementInstalacion = value2._id;
                    objeto.idInstalacion = value._id;
                    objeto.Codigo = value2.Codigo;
                    objeto.CanElem = value2.CanElem;
                    objeto.MotGar = value2.MotGar;
                    objeto.TipGar = value2.TipGar;
                    objeto.ObservacionGar = value2.ObservacionGar;
                    objeto.Status = 'Creado';
                    objeto.Cadena = value.Cadena;
                    objeto.Local = value.Local;
                    objeto.Ciudad = value.Ciudad;
                    objeto.Direccion = value.Direccion;
                    objeto.TipTra = value.TipTra;
                    objeto.FecVen = value2.FecVen;
                    objeto.FecIns = value.FecIns;
                    objeto.Fotos =  value2.Fotos;
                    objeto.isRegarantia = false;
                    objeto.isSave = false;
                    objeto.id = `${index}-${index2}`
                    arr.push(objeto);
                }
                });
                if(index === (Instalaciones.length - 1)){
                    setPreIngresos(arr);
                    setTimeout(()=>{
                        setOpenPreSave(true);
                    },1000);
                
                }
            });
        }else{
            enqueueSnackbar('NO EXISTEN ELEMENTOS A GUARDAR',{variant:'info'});
            setSavingGarantia(false);
        }
        

    };

    const HandleCheck = (e)=>{
        const arr = [];
        PreIngresos.forEach((value, index)=>{
            if(value.id === e.target.name){
                const objeto = {...value};
                objeto.isSave = e.target.checked;
                arr.push(objeto);
                if(index === (PreIngresos.length - 1) ){
                    setPreIngresos(arr);
                }
            }else{
                arr.push(value);
                if(index === (PreIngresos.length - 1) ){
                    setPreIngresos(arr);
                }
            }
        })
    };

    const HandleClosePre = ()=>{
        setOpenPreSave(false);
        setSavingGarantia(false);
    };

    const HandleSaveGarantia = (e)=>{
        setSaving(true);
        const laZona="America/Guayaquil";
        const laFecha = moment2().tz(laZona).format();
        const objetoInfo = {};
        objetoInfo.Proyecto = dataCrono.proyecto;
        objetoInfo.Cliente = dataCrono.cliente;
        objetoInfo.numpro = formulario.numpro;
        objetoInfo.Status = 'Creado';
        objetoInfo.OT = dataCrono.numot;
        objetoInfo.Ejecutiva = dataCrono.ejecutiva;
        const arr = [];
        PreIngresos.forEach((values, index)=>{
            if(values.isSave){
                const objetoNew = {...values};
                objetoNew.Creacion = laFecha;
                objetoNew.Modificacion = laFecha;
                arr.push(objetoNew); 
            }              
            if(index === (PreIngresos.length - 1))
            {
                objetoInfo.Elementos = arr;
                //setIngresos(arr);
                fetch('/SaveGarantiaVentas',{
                    method: 'POST',
                    body: JSON.stringify(objetoInfo),
                    headers:{'Content-Type':'application/json'}
                    })
                    .then(response=> response.json())
                    .then(result =>{
                        enqueueSnackbar(`Garantía N°:${result.message} Creada`,{variant:'success'});
                        //setNumGarNew(result.message);
                        setSaving(false);
                        setSavingGarantia(false);
                        setTexSave('Guardado');
                        setNumGarCreated(result.message);
                        setTimeout(()=>{
                            setShowNumGar(true);
                        },700);
                        setTimeout(()=>{
                            setTexSave('Guardar');
                        },500)
                })

            }
        })
    }; 

    /************************ MANEJADORES ***************************/

    const HandleShowTableGarantiasCreated = ()=>{
        setShowTableGarantiasCreated(true);
    };

    const HandleCloseTableGarantiasCreated = ()=>{
        setShowTableGarantiasCreated(false);
    };

    //const HandleChangeDense = (e)=>{
    //    setDense(e.target.checked);
    //};

   
    /***************************************************************/

    return(

        <React.Fragment>  
            <Dialog
                open={openPreSave}
                onClose={HandleClosePre}
                fullWidth
                maxWidth={'xl'}
                style={{padding:0}}
                aria-labelledby="alert-dialog-slide-title"
            >
                <DialogTitle id="alert-dialog-slide-title"><span style={{fontWeight:'bold'}}>Seleccione los elementos a Procesar:</span></DialogTitle>
                <DialogContent style={{margin:0, padding:5, minHeight:500}}>
                    <Grid container>
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16}} square>           
                                   {""}
                            </Paper>
                        </Grid>
                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                    Códigos
                            </Paper>
                        </Grid>
                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                    Tipo Trabajo
                            </Paper>
                        </Grid>
                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                    Cadena
                            </Paper>
                        </Grid>
                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                    Local
                            </Paper>
                        </Grid>
                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                    Cantidad
                            </Paper>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>                   
                                    Motivo
                            </Paper>
                        </Grid>
                        <Grid item xl={4} lg={4} md={5} sm={5} xs={5}> 
                            <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                    Observación
                            </Paper>
                        </Grid>
                    </Grid>
                    {
                        PreIngresos.map((value,index)=>(
                        
                                <Grid container key={`Pre${index}`}>
                                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}> 
                                        <Card style={{minHeight:75}} variant='outlined'>
                                            <CardContent>
                                                <Checkbox
                                                    checked={value.isSave}
                                                    onChange={HandleCheck}
                                                    name={value.id}
                                                    color="primary"
                                                    size="small"
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                        <Card style={{minHeight:75}} variant='outlined'>
                                            <CardContent>
                                                {value.Codigo.map((value2,index2)=> { 
                                                    if(value.Codigo.length === 1){
                                                        return(value2.codigo)
                                                    }else{
                                                        if(index2 === value.Codigo.length - 1){
                                                            return(value2.codigo)
                                                        }else{
                                                            return(`${value2.codigo}, `)
                                                        }
                                                    }
                                                    
                                                })}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                        <Card style={{minHeight:75, fontSize:10}} variant='outlined'>
                                            <CardContent>
                                                {value.TipTra}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                        <Card style={{minHeight:75}} variant='outlined'>
                                            <CardContent>
                                                {value.Cadena}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                        <Card style={{minHeight:75}} variant='outlined'>
                                            <CardContent>
                                                {value.Local}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                        <Card style={{minHeight:75, textAlign:'center'}} variant='outlined'>
                                            <CardContent>
                                                {value.CanElem}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}> 
                                        <Card style={{minHeight:75}} variant='outlined'>
                                            <CardContent>
                                                {value.MotGar.map(rowMot=>rowMot.motivo).toString()}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={4}> 
                                        <Card style={{minHeight:75}} variant='outlined'>
                                            <CardContent>
                                                {value.ObservacionGar}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={HandleClosePre} color="secondary">
                        Cancelar
                    </Button>
                    {
                        isSaving ?
                        <ButtonSemantic primary loading style={{margin:3}}>
                            Loading
                        </ButtonSemantic>
                        :<ButtonSemantic primary onClick={HandleSaveGarantia}  style={{margin:3}}>
                            {textSave}
                        </ButtonSemantic>
                    }
                </DialogActions>
            </Dialog>
            <Dialog
                open={showTableGarantiasCreated}
                onClose={HandleCloseTableGarantiasCreated}
                fullScreen 
                style={{padding:10}}
                aria-labelledby="alert-dialog-slide-title"
            >
                <DialogTitle id="alert-dialog-slide-title"><span style={{fontWeight:'bold'}}>Garantias Creadas</span></DialogTitle>
                <DialogContent style={{margin:0, padding:5}}>
                    <div style={{maxWidth:'100%'}} id='divDialog'> 
                        <TablaSecundaria dataInfo={Garantias} Meses={Meses}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={HandleCloseTableGarantiasCreated} color="secondary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showNumGar}
                onClose={HandleClear}
                fullWidth
                maxWidth={'sm'}
                style={{padding:0}}
                aria-labelledby="alert-dialog-slide-title"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>{`Se ha creado la Garantia No:${numGarCreated}`}</span></DialogTitle>
                
                <DialogActions>
                    <Button variant='contained' onClick={HandleClear} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Paper>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Paper elevation={2} style={{padding:5}} square>
                                    <Grid container justify='flex-start' spacing={1}>      
                                        <Grid item xl={3} lg={3} md={3} sm={4} xs={4}>
                                            <TextField
                                                id='Search'
                                                label='Presupuesto'
                                                fullWidth
                                                variant='outlined'
                                                onChange={(e)=>{setFormulario({numpro:e.target.value})}}
                                                value={formulario.numpro || ''}
                                                type='Number'
                                                autoFocus
                                                size='small'
                                                onKeyPress={(e)=>{
                                                    const code = e.keyCode || e.which;
                                                    if(code === 13)
                                                        HandleSearch();
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={2} xs={2}>
                                            <Fab color='primary' onClick={HandleShowTableGarantiasCreated} size='small'>
                                                <Tooltip title='Garantias Creadas'>
                                                    <TableChartIcon />
                                                </Tooltip>
                                            </Fab>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={2} xs={2}>
                                            <Fab onClick={HandleClearButton} color='primary' size='small'> 
                                                <Tooltip title='Limpiar'>
                                                    <RefreshIcon/>
                                                </Tooltip>
                                            </Fab>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={2} xs={2}>
                                            {
                                                isSavingGarantia ?                                            
                                                    <FacebookCircularProgress size={35}/>
                                                :
                                                    <Fab onClick={HandleSave} color='primary' size='small'> 
                                                        <Tooltip title='Guardar'>
                                                            <SaveIcon/>
                                                        </Tooltip>
                                                    </Fab>
                                            }
                                            
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={2} xs={2}>
                                            {isPdf &&
                                                <Pdf dataPdf4={dataCrono} Locales={Instalaciones}/>
                                            }
                                        </Grid>
                                    </Grid>                              
                                </Paper>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                <Paper square style={{minHeight:'71vh',  maxHeight:'73vh'}}>
                                    <GarantiaContext.Provider value={{headers, motivosGarantia, tiposGarantia, setShowTableGarantiasCreated, HandleClear, arrIns, cantCubGar, isSaving, setSaving, dataCrono, dataIns, Instalaciones, setDataIns, dense, setArrIns,  isCharged, setCharged}}>
                                        { unMountTable ?
                                        <Grid container style={{height:'65vh', backgroundColor:'#3C3A3A'}} justify='center'>
                                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{alignSelf:'center', height:100}}>
                                                <FacebookCircularProgress size={35}/>
                                            </Grid>
                                        </Grid>
                                        :
                                            <TablaPrincipal />
                                        }
                                    </GarantiaContext.Provider>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>           
        </React.Fragment>   
    )
};

function GarantiaVentas(props) {
    return (
      <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <GarantiaVenta />
      </SnackbarProvider>
  );
};

export default GarantiaVentas;