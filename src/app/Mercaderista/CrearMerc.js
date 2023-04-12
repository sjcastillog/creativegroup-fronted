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
            Dialog,
            DialogActions,
            DialogContent,
            Divider,
            Fab,
            FormControlLabel,
            FormGroup,
            FormControl,
            Grid,
            IconButton,
            InputAdornment,
            LinearProgress,
            MenuItem,
            Paper,
            Switch,
            Tooltip,
            TextField,
            Typography
} from '@material-ui/core';
import { 
    Add as AddIcon,
    AccountCircle as AccountCircleIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
    Done as DoneIcon,
    Help as HelpIcon,
    HighlightOff as HighlightOffIcon,
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

const useStyles = makeStyles((theme)=>(
    {
        container:{
            height:'82vh',
            maxHeight:'83vh',
            width:'100%',
            overflowY:'auto',
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
            height:350
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

const CreaMerc = ()=>{
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [ Clientes, setClientes ] = useState([]);
    const [ Datos, setDatos ] = useState({elSearch:'', Proyecto:'', Cliente:'', Mercaderistas:[], TipTraArr:[], MarcasArr:[]});
    const [ searchBy, setSearchBy ] = useState('');
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ arrTipTra, setArrTipTra ] = useState([{Tiptra:''}]);
    const [ arrMarcas, setArrMarcas ] = useState([]);
    const [ arrTipTraBackup, setArrTipTraBackup ] = useState([{Tiptra:''}]);
    const [ isSaving, setSaving ] = useState(false);
    const [ MercaderistasListado, setMercaderistasListado ] = useState([{Mercaderista:''}]);
    const [ isSelectTiptra, setSelectTiptra ] = useState(false);
    const [ openPhoto, setOpenPhoto ] = useState(false);
    const [ isNew, setNew ] = useState(true);

    useEffect(()=>{
        async function handleClientes(){
            const reqCli = await fetch('/fetch_clientes');
            const infoCli = await reqCli.json();
            const reqTiptra = await fetch('/TiptraMercs');
            const infoTiptra = await reqTiptra.json();
            const reqMerc = await fetch('/MercaderistasLists');
            const infoMerc = await reqMerc.json();
            const reqMarcasMerc = await fetch('/MarcasMerc');
            const infoMarcaMerc= await reqMarcasMerc.json();
            const onlyMarc = infoMarcaMerc.map(infM=>infM.MARCA);
            const arrSet = new Set(onlyMarc);
            const arrNew = [...arrSet];
            console.info(arrNew);
            setClientes(infoCli);
            setArrTipTra(infoTiptra);
            setArrTipTraBackup(infoTiptra);
            setMercaderistasListado(infoMerc);
            setArrMarcas(arrNew);
            

        }
        handleClientes();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDatos = (e)=>{ setDatos({...Datos, [e.target.id]:e.target.value}) };

    const handleSearch = ()=>{
        if(Datos.elSearch === ''){
            enqueueSnackbar('CAMPO BUSQUEDA VACIO', {variant:'error'});
        }else if(searchBy === ''){
            enqueueSnackbar('SELECCIONE UN TIPO DE BUSQUEDA', {variant:'error'});
        }else{
            switch(searchBy){
                case 'NUMPRO': handleSearchNumpro();break;
                case 'NUMERO': handleSearchNum(); break;
                case 'PROFORMA': handleSearchProforma();break;
                default: console.log('NO APLICA'); 
            }
        }
    };

    const handleSearchNum = ()=>{
        fetch('/Mercaderistas/FindOneNum',{
            method: 'POST',
            body: JSON.stringify({NumMerc:parseInt(Datos.elSearch)}),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(response=> response.json())
        .then(result =>{
            console.log(result);
            if(result.length > 0){
                setDatos(result[0]);
                setSelectTiptra(true);
                setNew(false);
                enqueueSnackbar('PROJECT CHARGED',{variant:'info'});
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
            body: JSON.stringify({numpro:parseInt(Datos.elSearch)}),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(response=> response.json())
        .then(result =>{
            console.log(result);
            if(result.length > 0){
                setDatos(result[0]);
                setSelectTiptra(true);
                setNew(false);
                enqueueSnackbar('PROJECT CHARGED',{variant:'info'});
            }else if(result.status){
                enqueueSnackbar(result.status,{variant:'error'});
            }else{
                enqueueSnackbar('NO EXISTE ESTE PPTO. EN LA DB',{variant:'error'});
            }
            
        })
    };

    const handleReset = ()=>{
        setDatos({elSearch:'', Proyecto:'', Cliente:'', Mercaderistas:[], TipTraArr:[], MarcasArr:[]});
        setSearchBy('');
        setNew(true);
        setSelectTiptra(false);
        setOpenPhoto(false);
    };

    const handleCloseDialog = ()=>{ setOpenDialog(false) };

    const handleDatosSearch = (e)=>{ setSearchBy(e.target.value) };

    const handleSelectMercaderista = (e,value)=>{ setDatos({...Datos, Mercaderistas:value}) };

    const handleSelectTipTra = (e,value)=>{ 
        if(value.length === 0){
            setSelectTiptra(false);
            setDatos({...Datos, TipTraArr:[]}) 
        }else{
            setSelectTiptra(true);
            setDatos({...Datos, TipTraArr:value}) 
        };
        
    };

    const handleSelectMarcas = (e,value)=>{ 
        if(value.length === 0){
            setDatos({...Datos, MarcasArr:[]});
        }else{
            setDatos({...Datos, MarcasArr:value}) ;
        };
        
    };

    const handleValidacion = () => {
        setSaving(true);
        if(Datos.Proyecto === ''){
            enqueueSnackbar('CAMPO PROYECTO VACIO',{variant:'error'});
            setTimeout(()=>{
                setSaving(false);
            },500)
        }else if(Datos.Cliente === ''){
            enqueueSnackbar('CAMPO CLIENTE VACIO',{variant:'error'});
            setTimeout(()=>{
                setSaving(false);
            },500)
        }else if(Datos.Mercaderistas.length === 0){
            enqueueSnackbar('NO HA ASIGNADO MERCADERISTAS',{variant:'error'});
            setTimeout(()=>{
                setSaving(false);
            },500)
        }else{
            handlePreSave();
        }
    };

    const handlePreSave = ()=>{
        Swal.fire({
            title:'DESEA GUARDAR ESTE PROYECTO?',
            confirmButtonText:'PROCEDER',
            showDenyButton:true,
            showCancelButton:true,
            confirmButtonColor:'#0E3B5F',
            width:600
        }).then(result=>{
            if (result.isConfirmed) {
                handleSave();  
            } else if (result.isDenied) {
                Swal.fire({title:'No Guardado!', icon:'info', confirmButtonColor:'#0E3B5F',})
                setTimeout(()=>{
                    setSaving(false);
                },500)
            }else{
                setTimeout(()=>{
                    setSaving(false);
                },500)
            }
        })
    };

    const handleSave = ()=>{
        if(isNew){
            fetch('/Mercaderistas',{
                method: 'POST',
                body: JSON.stringify(Datos),
                headers:{
                  'Content-Type':'application/json'
                }
            })
            .then(response=> response.json())
            .then(result =>{
                console.log(result);
                if(result._id){
                    Swal.fire({title:'Guardado!',text:`Numero de Proyecto Asignado:${result.NumMerc}`, icon:'success', confirmButtonColor:'#0E3B5F'})
                    .then(result2=>{
                        setTimeout(()=>{
                            setSaving(false);
                        },500)
                    });
                    setNew(false);
                    setDatos(result);
                    setSaving(false);
                }else{
                    enqueueSnackbar(result.status,{variant:'error'});
                }
            });
        }else{
            fetch('/Mercaderistas',{
                method: 'PUT',
                body: JSON.stringify(Datos),
                headers:{
                  'Content-Type':'application/json'
                }
            })
            .then(response=> response.json())
            .then(result =>{
                console.log(result);
                if(result.message){
                    Swal.fire({title:result.message, icon:'success', confirmButtonColor:'#0E3B5F'})
                    .then(result2=>{
                        setTimeout(()=>{
                            setSaving(false);
                        },500)
                    });
                    setNew(false);
                    setSaving(false);
                }else{
                    enqueueSnackbar(result.status,{variant:'error'});
                }
            });
        }
        
    };

    const handleSelectClient = (e,value)=>{
        if(value === '' || value === null){
            setArrTipTra(arrTipTraBackup);
            setDatos({...Datos, Cliente:''})
        }else{
            console.log(value);
            setDatos({...Datos, Cliente:value});
            const arrFil = arrTipTraBackup.filter(val=> val.Cliente.toString() === value.toString());
            setArrTipTra(arrFil);
        }
    };

    const handleUpdatePhoto = useCallback((tiptra, srcNew)=>{
        const arrNew = Datos.TipTraArr.map(elTiptra=>{
            if(elTiptra.Tiptra === tiptra){
                const objeto = {...elTiptra};
                objeto.src = srcNew;
                return objeto
            }else{
                return elTiptra
            }
        })
        setDatos({...Datos, TipTraArr:arrNew})
    },[Datos]);


    const handleOpenPhoto = ()=>{setOpenPhoto(true);};

    const handleClosePhoto = ()=>{setOpenPhoto(false);};

    const handleSearchProforma = ()=>{
            fetch('/ProformaMercs/FindOneNum',{
                method: 'POST',
                body: JSON.stringify({NumProf:parseInt(Datos.elSearch)}),
                headers:{
                  'Content-Type':'application/json'
                }
            })
            .then(response=> response.json())
            .then(result =>{
                console.log(result);
                if(result.length > 0){
                    const { Cliente, numpro, Proyecto, TOTAL, Status } = result[0];
                    if(Status === 'APROBADA'){
                        setDatos({...Datos, Cliente, numpro, Proyecto, VALOR:TOTAL, NumProf:Datos.elSearch});
                        enqueueSnackbar('Proforma Encontrada',{variant:'info'});
                    }else{
                        Swal.fire({
                            title:'PROFORMA NO APROBADA',
                            text:'ESTA PROFORMA NO HA SIDO APROBADA, COMUNIQUESE CON SU SUPERVISORA',
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
                    }
                    
                }else if(result.status){
                    enqueueSnackbar(result.status,{variant:'error'});
                }else{
                    enqueueSnackbar('NO EXISTE ESTE NUMERO EN LA DB',{variant:'error'});
                }
                
            });
    };

    return(
        <Fragment>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth={'sm'}
                style={{padding:0}}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    <Chip color='secondary' label='FOTO PERSONAL' style={{fontWeight:'bolder'}}/>
                </DialogTitle>
                <DialogContent style={{margin:0, padding:0, overflowX:'hidden', height:510}}>
                    <Divider />
                    
                </DialogContent>
            </Dialog> 
            <Dialog
                open={openPhoto}
                onClose={handleClosePhoto}
                fullWidth
                maxWidth={'sm'}
                style={{padding:0}}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClosePhoto}>
                    <Chip color='secondary' label='FOTOS TIPOS / TRABAJO' style={{fontWeight:'bolder'}}/>
                </DialogTitle>
                <DialogContent style={{margin:0, padding:5, overflowX:'hidden'}}>
                    <Divider />
                    <Paper variant="outlined" square style={{padding:10, width:'100%'}} >
                    <Grid container justify='center' spacing={2}>                   
                    {
                        Datos.TipTraArr.map((elTiptra, indexTiptra)=> 
                            <Grid item key={`tiptraphoto_${indexTiptra}`}>
                                <UploadElementYouNET
                                    classes={classes}
                                    handleUpdatePhoto={handleUpdatePhoto}
                                    info={elTiptra}
                                    NumProyecto={Datos.NumMerc}
                                />
                            </Grid>
                        )
                    }
                    </Grid>
                     </Paper>
                    
                </DialogContent>
            </Dialog> 
            <Grid container justify='center' alignItems='center' alignContent='flex-start' spacing={2} className={classes.container}>
                
                <Grid item xl={8} lg={9} md={10} sm={10} xs={12} >
                    <Grid container spacing={1} justify='center' alignContent='center' alignItems='center'>
                    <Grid item xs={12} style={{position:'sticky', top:0, zIndex:2, background:'#fff'}}>
                        <Paper style={{width:'100%', minHeight:55, background:'#fff', padding:10}} square elevation={3}>
                            <Grid container spacing={1} justify='center'>
                                <Grid item md={6} sm={8} xs={12}>
                                    <TextField
                                        id='elSearch'
                                        label='Busqueda'
                                        value={Datos.elSearch || ''}
                                        onChange={handleDatos}
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} sm={4} xs={12}>
                                    <TextField
                                        id='searchBy'
                                        label='searchBy'
                                        value={searchBy || ''}
                                        onChange={handleDatosSearch}
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        select
                                    >
                                        <MenuItem  value='NUMPRO' style={{textAlign:'center', fontWeight:'bolder'}}> NUMPRO </MenuItem >
                                        <MenuItem  value='NUMERO' style={{textAlign:'center', fontWeight:'bolder'}}> NUMERO </MenuItem >
                                        <MenuItem  value='PROFORMA' style={{textAlign:'center', fontWeight:'bolder'}}> PROFORMA </MenuItem >
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <Tooltip title='BUSCAR' arrow placement='top'>
                                        <span>
                                        <Fab onClick={handleSearch} size='small' color='primary'>
                                            <SearchIcon/>
                                        </Fab>
                                        </span>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title='RESET' arrow placement='top'>
                                        <span>
                                        <Fab onClick={handleReset} size='small' color='primary'>
                                            <RefreshIcon/>
                                        </Fab>
                                        </span>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title='GUARDAR' arrow placement='top'>
                                        <span>
                                        <Fab onClick={handleValidacion} size='small' color='primary'>
                                            <SaveIcon/>
                                        </Fab>
                                        </span>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                        <Grid item xs={12}>
                            <Paper style={{width:'100%', background:'#fff', padding:10}} square elevation={2}>
                                <Grid container spacing={1} justify='center'>
                                    <Grid item xs={12} style={{height:10}}>
                                        { isSaving && <LinearProgress /> }
                                    </Grid>
                                    <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
                                        <Autocomplete
                                            id='cliente'
                                            options={Clientes}
                                            inputValue={Datos.Cliente || ''}
                                            onInputChange={handleSelectClient}
                                            getOptionLabel={option => option.cliente}           
                                            renderInput={params => 
                                            <TextField {...params} 
                                                label=" Cliente" 
                                                variant="outlined" 
                                                margin='dense'
                                            />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
                                        <TextField
                                            id='numpro'
                                            label='numpro'
                                            value={Datos.numpro || ''}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type='Number'
                                            margin='dense'
                                        />
                                    </Grid>
                                    <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
                                        <TextField
                                            id='Proyecto'
                                            label='Proyecto'
                                            value={Datos.Proyecto || ''}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            fullWidth
                                            margin='dense'
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
                                        <TextField
                                            id='VALOR'
                                            label='VALOR'
                                            value={Datos.VALOR || ''}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            fullWidth
                                            type='Number'
                                            margin='dense'
                                            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}
                                        />
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="MERCADERISTAS"
                                            options={MercaderistasListado}
                                            disableCloseOnSelect
                                            value={Datos.Mercaderistas || ''}
                                            onChange={handleSelectMercaderista}
                                            getOptionLabel={(option) => option.Mercaderista}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                {option.Mercaderista}
                                                </React.Fragment>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="Mercaderistas" fullWidth placeholder="Mercaderistas"  margin='dense' />
                                            )}
                                        />
                                    </Grid> 
                                    <Grid item xl={4} lg={4} md={4} sm={10} xs={10}>
                                        <Autocomplete
                                            multiple
                                            id="TipTraArr"
                                            options={arrTipTra}
                                            disableCloseOnSelect
                                            value={Datos.TipTraArr || ''}
                                            onChange={handleSelectTipTra}
                                            getOptionLabel={(option) => option.Tiptra}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                {option.Tiptra}
                                                </React.Fragment>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="TIP.TRABAJO" fullWidth placeholder="TIP.TRABAJO"  margin='dense' />
                                            )}
                                        />
                                    </Grid>   
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{alignSelf:'center'}}>
                                        <Button size='large' fullWidth variant='contained' color='primary' disabled={!isSelectTiptra} onClick={handleOpenPhoto}>
                                                <PhotoIcon/>
                                        </Button>
                                    </Grid>                                
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="MarcasArr"
                                            options={arrMarcas}
                                            disableCloseOnSelect
                                            value={Datos.MarcasArr || ''}
                                            onChange={handleSelectMarcas}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                {option}
                                                </React.Fragment>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="MARCAS" fullWidth placeholder="MARCAS"  margin='dense' />
                                            )}
                                        />
                                    </Grid> 
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <TextField
                                            id='MIGO'
                                            label='MIGO'
                                            value={Datos.MIGO || ''}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            fullWidth
                                            margin='dense'
                                        />
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <TextField
                                            id='FECHAMIGO'
                                            label='FECHA MIGO'
                                            value={Datos.FECHAMIGO || '20201-08-12'}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type='Date'
                                            margin='dense'
                                        />
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                        <TextField
                                            id='NUMFACTURACION'
                                            label='NUM. FACT.'
                                            value={Datos.NUMFACTURACION || ''}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type='Number'
                                            margin='dense'
                                        />
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                        <TextField
                                            id='FECHAFACTURA'
                                            label='FECHA FACTURA'
                                            value={Datos.FECHAFACTURA || '20201-08-12'}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type='Date'
                                            margin='dense'
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            id='Observacion'
                                            label='Observacion'
                                            value={Datos.Observacion || ''}
                                            onChange={handleDatos}
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            multiline
                                            rows={2}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>                         
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
        
    );
};

const UploadElementYouNET = ({classes, tipo, NumProyecto, info, handleUpdatePhoto})=>{
    const { enqueueSnackbar } = useSnackbar();
    const [ photoReport, setPhotoReport ] = useState();
    const [ photoReportPreview, setPhotoReportPreview ] = useState('');
    const [ showElement, setShowElement ]= useState(false);
    const [ isSelectElement, setElementSelect ] =useState (false);
    const [ openPhotos, setOpenPhotos ] = useState(false);
    const [ modePhoto, setModePhoto ] = useState(false);

    useEffect(()=>{
        if(info.src){
            if(info.src.length > 0){
                setModePhoto(true);
            }
        }
    },[])

    useEffect(()=>{
        if(showElement)setShowElement(false);
    },[showElement]);

    const handleSubmitPhotoReport = (e)=> {
        e.preventDefault();
        let name = uuidv4();
        const nombreImagen = `${name}.${photoReport.name.split('.').pop().toString()}`;
        let formD = new FormData();
        formD.append('imagen',photoReport, nombreImagen);
        fetch('/Mercaderistas/PhotoTiptra',{method:'POST',body:formD})
        .then(response => response.json())
        .then(result => {             
            if(result.message){
                enqueueSnackbar(result.message, {variant:'success'});
                const srcComplete = `/tiptramerc/${nombreImagen}`;
                handleUpdatePhoto(info.Tiptra, srcComplete);  
            }else{
                enqueueSnackbar(result.status, {variant:'error'})
            }
        });
    };

    const handleImageChangeReport = (e)=>{
        
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
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
                const nameImage = info.src.split('/').pop().toString();
                fetch('/Mercaderistas/PhotoTiptra',{
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

    const HandleClosePhotos = ()=>{
        setOpenPhotos(false);
    };

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
                                    disabled={modePhoto}
                                />
                            }
                            
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                                    title={<Chip color='primary' icon={isSelectElement ? <DoneIcon /> : <HelpIcon/>} label={info.Tiptra} style={{textOverflow:'ellipsis', overflow:'none', width:200}}/> }
                                />
                                <Fragment>
                                    {
                                        modePhoto ?
                                        <CardMedia
                                            className={classes.media}
                                            image={info.src}
                                            title={info.Tiptra}
                                            onClick={HandleShowPhotos}
                                        />:
                                        <Fragment>
                                            {photoReportPreview !== '' &&
                                                <CardMedia
                                                    className={classes.media}
                                                    image={photoReportPreview}
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
                                <Button variant="contained" fullWidth size="large" color="primary" startIcon={<CloudUploadIcon/>} disabled={!isSelectElement} onClick={handleSubmitPhotoReport}>
                                    SUBIR
                                </Button>
                            </Grid>
                    </Grid>      
                </Paper>
            </Grid>
        </Grid>
    );
};


function CrearMerc(props) {
    return (
    <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <CreaMerc />
    </SnackbarProvider>
    );
};

export default CrearMerc;
