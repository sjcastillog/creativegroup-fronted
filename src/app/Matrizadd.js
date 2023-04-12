import React, {useState, useEffect} from 'react';
import { 
         ExpansionPanel,
         ExpansionPanelDetails,
         ExpansionPanelSummary,
         Avatar,
         CircularProgress,
         Fab,
         Grid,
         Hidden,
         IconButton,
         InputAdornment,
         ListItemIcon,
         ListItemText,
         Menu,
         MenuItem,
         Paper,
         Switch,
         TextField,
         Toolbar,
         Tooltip,
         Typography,
         } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon,
         AccountCircle as AccountCircleIcon,
         Autorenew as AutorenewIcon,
         Build as BuildIcon,
         Storage as StorageIcon,
         Save as SaveIcon,
         Search as SearchIcon,
         Delete as DeleteIcon,
         Check as CheckIcon,
         Add as AddIcon,
         ArrowForwardIos as ArrowForwardIosIcon,
         PermIdentity as PermIdentityIcon,
         AttachMoney as AttachMoneyIcon,
         StrikethroughS as StrikethroughSIcon,
         MoreVert as MoreVertIcon,} from '@material-ui/icons';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Autocomplete,
         ToggleButton,
         ToggleButtonGroup } from '@material-ui/lab';
import { lime, blue, green } from '@material-ui/core/colors';
import { SnackbarProvider, useSnackbar } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,
         KeyboardDatePicker,} from '@material-ui/pickers'; 
import { useAuth } from './Auth';
import ITCAvant from '../fonts/ITCAvantGardePro-Md.ttf'; 

const itc = {
  fontFamily: 'Itc',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('ITC'),
    local('ITC-Regular'),
    url(${ITCAvant}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const Creative = createMuiTheme({
  palette: {
    primary: {
      main: '#0E3B5F'
    },
    secondary: {
      main: '#CAD226',
    },
  },
  typography: {
    fontFamily: 'Itc, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [itc],
      },
    },
  },
});


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    date:{
        margin:0,
        paddingBottom:0,
        position:'relative',
        top:-3
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      marginTop:10,
      color: blue[900]
    },
    avatar:{
        backgroundColor: lime[700]
    },
    avatar2:{
        backgroundColor: blue[500]
    },
    wrapper: {
        //margin: theme.spacing(1),
        position: 'relative',
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
        top: -2,
        left: -2,
        zIndex: 1,
    },
    buttons:{
        backgroundColor:'#0E3B5F',
        color:'#fff',
        '&:hover':{
        backgroundColor:'#16609c',
        }
    },
    IconButtons:{
        color:'#0E3B5F',
        '&:hover':{
            color:'#16609c',
        }
    },
}));


function Matrizad(){
    const [expanded, setExpanded] = useState(false);
    const [expandedPro, setExpandedPro] = useState(false);
    const [matrizState, setMatrizState] = useState({
        numMatriz:0,
        cliente:'',
        proyecto:'',
        ejecutiva:{},
        coordinadora:'',
        formulario:[]
    });
    const [formulario, setFormulario] = useState({
        cantreq:0,
        cosuni:0,
    });
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [switcha, setSwitcha] =  useState(false);
    const [matrizCreate, setMatrizCreate] = useState(false);
    const [ticketCreate, setTicketCreate] = useState(false);
    const [editState, setEditState]= useState(false);
    const [disabledState, setDisabledState] =  useState(false);
    const [items, setItems] = useState([]);
    const [toggleState, setToggleState] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const { authTokens, setHeaderWord } = useAuth();
    const [ porDes, setPorDes] = useState(true);
    const [ matPrin_Tags, setMatPrin_Tags] = useState([]);
    const [ marca_Tags, setMarca_Tags] = useState([]);
    const [ tipVen_Tags, setTipVen_Tags] = useState([]);
    const [ tipReq_Tags, setTipReq_Tags] = useState([]);
    const [ usuario_tags, setUsuario_Tags] = useState([]);
    const [ establecimientos_Tags, setEstablecimientos_Tags] = useState([]);
    const reqRep_Tags = [
        {require: "Si"},
        {require: "No"},
        {require: "N/A"},
    ];
    const [ motivosGarantia, setMotivosGarantia ] = useState([]);

    const classes = useStyles();
    //const buttonClassname = clsx(classes.buttons, {
    //    [classes.buttonSuccess]: success,
    //});
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        async function handleClientes(){
            const res = await fetch('/fetch_clientes')
            const info = await res.json()
            const resMatPrin = await fetch('/Matriz_MaterialPrincipal')
            const infoMatPrin = await resMatPrin.json()
            const resMarca = await fetch('/Matriz_Marcas')
            const infoMarca = await resMarca.json()
            const resTipReq = await fetch('/Matriz_TipReq')
            const infoTipReq = await resTipReq.json()
            const resCiudad = await fetch('/Matriz_EstablecimientosOnly')
            const infoCiudad = await resCiudad.json()
            const resUsuario =  await fetch('/fetch_getMatrizUsuarios')
            const infoUsuario = await resUsuario.json()
            const restv = await fetch('/Matriz_TipVentas')
            const infotv = await restv.json()
            const motivosG = await fetch('/MotivoGarantias');
            let datam = await motivosG.json();
            let objeto = {};
            datam = datam.filter(element => objeto[element.tiptra] ? false : objeto[element.tiptra] = true);
                setMotivosGarantia(datam);
                setTipVen_Tags(infotv)
                setUsuario_Tags(infoUsuario)
                //console.log(infoUsuario);
                setEstablecimientos_Tags(infoCiudad)
                setTipReq_Tags(infoTipReq)
                setMatPrin_Tags(infoMatPrin)
                setClientes(info)
                setMarca_Tags(infoMarca)
        };

        handleClientes();
        setHeaderWord('Matriz/Add');
        if(authTokens.tipo !== "Administrador"){
                setMatrizState({ejecutiva:authTokens.nombre, coordinador: authTokens.coordinador});

        }
        
    },[]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
        if (ticketCreate){
            fetch('fetch_Matriz',{
                method:'POST',
                body:JSON.stringify(matrizState),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response=> response.json())
            .then(result=>{
                console.log(result.message);
                enqueueSnackbar('Formulario Ingresado',{variant:'info'});
                setMatrizCreate(true);
                setTicketCreate(false);
            });
        }
    },[ticketCreate && matrizState.numMatriz]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
        if(matrizCreate){
            if(formulario._id){
                fetch('/fetch_ItemsMatriz',{ 
                    method:'PUT',
                    body:JSON.stringify({numMatriz:matrizState.numMatriz,formulario, fecreqcli:matrizState.fecreqcli}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(response => response.json())
                .then(result=>{
                    //const { message } = result;     
                    TotalMat();                               
                    enqueueSnackbar('Item Editado',{variant:'success'});
                    setMatrizCreate(false);
                    setSuccess(true);
                    setLoading(false);
                    setTimeout(() => {
                        setSuccess(false);                        
                    }, 2000);
                    setFormulario({});
                    if(!switcha){
                        setMatrizState({...matrizState, numMatriz:'', cliente:'',proyecto:''});
                        setItems([]);
                        setToggleState({});
                    }
                });
            }else{
                if(switcha){
                    fetch('/fetch_ItemsMatrizData',{
                        method:'POST',
                        body:JSON.stringify({numMatriz:matrizState.numMatriz,formulario, fecreqcli:matrizState.fecreqcli}),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(result=>{         
                        console.log(result);               
                        setFormulario({});
                        enqueueSnackbar('Item Agregado',{variant:'success'});
                        setMatrizCreate(false);
                        setSuccess(true);
                        setLoading(false);
                        setTimeout(() => {
                            setSuccess(false);                        
                        }, 2000);                        
                        setEditState(true);
                        setDisabledState(true);
                        setMatrizState(result[0]);
                        if(result[0].formulario !== null){
                            setItems(result[0].formulario);
                        }else{
                            alert('ERROR COMUNICAR A SISTEMAS');
                        }                         
                    });
                }else{
                    fetch('/fetch_ItemsMatriz',{
                        method:'POST',
                        body:JSON.stringify({numMatriz:matrizState.numMatriz,formulario, fecreqcli:matrizState.fecreqcli}),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(result=>{
                        //const { message } = result;        
                        setFormulario({});
                        enqueueSnackbar('Item Agregado',{variant:'info'});
                        setMatrizCreate(false);
                        setSuccess(true);
                        setLoading(false);
                        setTimeout(() => {
                            setSuccess(false);                        
                        }, 2000);
                        setMatrizState({...matrizState, numMatriz:'', cliente:'',proyecto:''});
                        setItems([]);
                        setToggleState({});
                        setDisabledState(false);
                    });
                }
                
            }
        }
    },[matrizCreate]// eslint-disable-line react-hooks/exhaustive-deps
    );
    
    
    const handleNew = ()=>{
        if(switcha){
            setFormulario({});
            setExpanded('panel1');
            setExpandedPro(false);
            setToggleState({});
        }else{
            setFormulario({});
            setMatrizState({...matrizState,
                numMatriz:'',
                cliente:'',
                proyecto:'',
                formulario:[]
            });
            setItems([]);
            setToggleState({});
            setEditState(false);
            setDisabledState(false);
            setExpanded(false);
            setExpandedPro(false);
        }
    };

    const handleFormulario = (e) =>{
        setFormulario({...formulario, [e.target.id]:e.target.value});
    };

    const handleValFac = ({target})=>{
        if(target.value.length > 17) alert('SE HA EXCEDIDO DE LOS DIGITOS REQUERIDOS')
    };

    const handleChangePorDes = (e) =>{
        setPorDes(!porDes);
    }

    const handleSwitcha = ()=>{
        setSwitcha(!switcha);
    };

    const handleMatrizState = (e) =>{
        setMatrizState({...matrizState, [e.target.id]:e.target.value});
    };

    const handleExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleExpandedPro = (panel) => (event, isExpanded) => {
        setExpandedPro(isExpanded ? panel : false);
    };

    const handleSave = ()=> {
        if(matrizState.cliente === '' || matrizState.proyecto === ''){
            enqueueSnackbar('Campo Cliente o Proyecto Vacio',{variant:'error'});
        }else{            
            setLoading(true);
            if(editState){
                setMatrizCreate(true);
            }else{
                fetch('ValidacionMatrizNumpro', {
                    method: 'POST',
                    body: JSON.stringify({numpro:formulario.numpro}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res => res.json())
                .then(result =>{
                    if(result.ticket){
                        enqueueSnackbar(`NUMERO DE PRESUPUESTO YA EXISTE EN EL TICKET ${result.ticket}`,{variant:'error'});
                        setSuccess(true);
                        setLoading(false);
                        setTimeout(() => {
                            setSuccess(false);                        
                        }, 2000);
                    }else if(result.status){
                        enqueueSnackbar(result.status,{variant:'error'});
                        setSuccess(true);
                        setLoading(false);
                        setTimeout(() => {
                            setSuccess(false);                        
                        }, 2000);
                    }else{ 
                        fetch('/fetch_ComprobarProyectoMatriz',{
                            method: 'POST',
                            body: JSON.stringify({proyecto:matrizState.proyecto}),
                            headers:{
                                'Content-Type':'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(result =>{
                            if(result.message){
                                fetch('/fetch_TicketMatriz')
                                .then(response => response.json())
                                .then(result=>{         
                                    setMatrizState({...matrizState, numMatriz:result.num});  
                                    enqueueSnackbar('Ticket Creado',{variant:'success'});
                                    setTicketCreate(true);                            
                                });
                            }else{
                                enqueueSnackbar(result.status,{variant:'error'});
                                setSuccess(true);
                                setLoading(false);
                                setTimeout(() => {
                                    setSuccess(false);                        
                                }, 2000);
                            }
                        });
                    } 
                })
            }
        }
    };

    const handleSearch =()=>{        
        fetch('fetch_SearchMatriz',{
            method:'POST',
            body: JSON.stringify({numMatriz:matrizState.numMatriz}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(result =>{
            console.log(result);
            if(result.status){
                enqueueSnackbar('No Existe ese Ticket',{variant:'error'});
            }else{              
                enqueueSnackbar('Matriz Encontrada',{variant:'success'});  
                setEditState(true);
                setDisabledState(true);
                TotalMat();
            }
        })
        
    };

    function TotalMat(){
        fetch('fetch_TotalMatriz',{
            method:'POST',
            body: JSON.stringify({numMatriz:matrizState.numMatriz}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            setMatrizState(result[0]);
            if(result[0].formulario !== null){
                enqueueSnackbar('Items Cargados',{variant:'info'});
                setItems(result[0].formulario);
            }else{
                enqueueSnackbar('Error Comunicar a Sistemas',{variant:'error'});
            }
            
        });
    };

    const handleDelete = () =>{
        
        if(editState){
            if(formulario._id){
                let a = window.confirm('Desea Eliminar este Item?');
                if(a){ 
                    fetch('fetch_ItemsMatriz',{
                        method:'DELETE',
                        body:JSON.stringify({numMatriz:matrizState.numMatriz,_id:formulario._id}),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(result =>{                        
                        if(switcha){
                            if (result.message){                                
                                enqueueSnackbar('Item Eliminado',{variant:'success'});
                                setToggleState({});
                                TotalMat();
                                setFormulario({});
                            }else{
                                enqueueSnackbar('Error Comunicar a Sistemas',{variant:'error'});
                            }
                        }else{
                            if (result.message){   
                                enqueueSnackbar('Item Eliminado',{variant:'success'});
                                setFormulario({});
                                setMatrizState({...matrizState,
                                    numMatriz:'',
                                    cliente:'',
                                    proyecto:'',
                                    formulario:[]
                                });
                                setItems([]);
                                setToggleState({});
                                setEditState(false);
                                setDisabledState(false);
                                setExpanded(false);
                                setExpandedPro(false);
                            }else{
                                enqueueSnackbar('Error Comunicar a Sistemas',{variant:'error'});
                            }
                        }
                        
                    });
                }
            }else{
                let r = window.confirm('Desea Eliminar la Matriz?');
                if(r){
                    if(authTokens.tipo !== 'EJECUTIVA'){
                        fetch('fetch_Matriz',{
                            method:'DELETE',
                            body:JSON.stringify({numMatriz:matrizState.numMatriz}),
                            headers:{
                                'Content-Type':'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(result =>{
                            if (result.message){
                                enqueueSnackbar('Matriz Eliminada',{variant:'success'});
                                setFormulario({});
                                setMatrizState({...matrizState,
                                    numMatriz:'',
                                    cliente:'',
                                    proyecto:'',
                                    formulario:[]
                                });
                                setItems([]);
                                setToggleState({});
                                setEditState(false);
                                setDisabledState(false);
                                setExpanded(false);
                                setExpandedPro(false);
                            }else{
                                enqueueSnackbar('Error Comunicar a Sistemas',{variant:'error'});
                            }                        
                            
                        });
                    }else{
                        enqueueSnackbar('NO TIENE ACCESO PARA ELIMINAR',{variant:'error'});
                    }
                }
            }
        }else{
            let r = window.confirm('Desea Eliminar la Matriz?');
            if(r){
                if(authTokens.tipo !== 'EJECUTIVA'){
                    fetch('fetch_Matriz',{
                        method:'DELETE',
                        body:JSON.stringify({numMatriz:matrizState.numMatriz}),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(result =>{
                        if(result.message){
                            enqueueSnackbar('Matriz Eliminada',{variant:'success'});
                            setMatrizState({...matrizState,
                                numMatriz:'',
                                cliente:'',
                                proyecto:'',
                                formulario:[]
                            });
                        }else{
                            enqueueSnackbar('Error Comunicar a Sistemas',{variant:'error'});
                        }                                        
                        
                    });
                }else{
                    enqueueSnackbar('NO TIENE ACCESO PARA ELIMINAR',{variant:'error'});
                }
            }
        }
    };

    const its = items.map((value,index)=>
        <ToggleButton
            value={value}  
            key={index}    
        >
            <ArrowForwardIosIcon fontSize="small" />
            {index + 1}
        </ToggleButton>
    );

    const handleToggle = (e, newToggleState)=>{
        if (newToggleState !== null) {
            setToggleState(newToggleState);
            setFormulario(newToggleState);
            setAnchorEl(null);
            console.log(newToggleState);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleSaveFrcli = ()=> {
        if(editState){
            fetch('/fetch_SaveFreqCli',{
                method:'POST',
                body:JSON.stringify({numMatriz:matrizState.numMatriz, fecreqcli:matrizState.fecreqcli}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response => response.json())
            .then(result=>{
                //const { message } = result;        
                setFormulario({});
                enqueueSnackbar('Fecha Cambiada',{variant:'info'});
                setMatrizCreate(false);
                setSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setSuccess(false);                        
                }, 2000);
                setMatrizState({...matrizState, numMatriz:'', cliente:'',proyecto:'', fecreqcli:''});
                setItems([]);
                setToggleState({});
                setDisabledState(false);
            });
        }
    };

    const handleMenu = ({currentTarget}) => { setAnchorEl2(currentTarget); };

    const HandleReset = ()=>{
        setFormulario({});
        //enqueueSnackbar('Fecha Cambiada',{variant:'info'});
        setMatrizCreate(false);
        setMatrizState({...matrizState, numMatriz:'', cliente:'',proyecto:'', fecreqcli:''});
        setItems([]);
        setEditState(false);
        setToggleState({});
        setDisabledState(false);
    };
    
    return (   
        <React.Fragment>
            <ThemeProvider theme={Creative}>
                <Paper> 
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            <Toolbar variant='dense' >
                                <Grid container spacing={1} style={{padding:10}} justify='center'>
                                    <Grid item xl={4} lg={5} md={6} sm={6} xs={7} >
                                        <TextField
                                            id='numtic'
                                            value={matrizState.numMatriz || ''}
                                            type='Number'
                                            label='Ticket'
                                            onChange={(e)=>setMatrizState({...matrizState, numMatriz:e.target.value})}
                                            size='small'
                                            variant='outlined'
                                            fullWidth
                                            autoFocus
                                            color='secondary'
                                            required
                                            className={classes.numtic}
                                            InputProps={{
                                                endAdornment:
                                                <Switch
                                                    checked={switcha}
                                                    onChange={handleSwitcha}
                                                    color='primary'
                                                    size='small'
                                                    name="checkedB"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />,
                                            }}
                                            onKeyPress={(e)=>{
                                                const code = e.keyCode || e.which;
                                                if(code === 13)
                                                handleSearch();
                                              }}
                                        />
                                    </Grid>   
                                        <Hidden only='xs'>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                <div className={classes.wrapper}>
                                                    <Fab
                                                        aria-label="save"
                                                        color='primary'
                                                        onClick={handleSave}
                                                        size='small'
                                                    >
                                                        {success ? <CheckIcon /> : <SaveIcon />}
                                                    </Fab>
                                                    {loading && <CircularProgress size={43} className={classes.fabProgress} />}
                                                </div>
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>    
                                                <Tooltip title='Buscar' placement='top' arrow>                           
                                                    <Fab size='small' color='primary' onClick={handleSearch}>
                                                        <SearchIcon />
                                                </Fab>
                                                </Tooltip> 
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                <Tooltip title='Nuevo' placement='top' arrow>    
                                                    <Fab size='small' color='primary' onClick={handleNew}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                <Tooltip title='Items' placement='top' arrow>    
                                                    <Fab size='small' color='primary' onClick={handleClick}>
                                                        <StorageIcon />
                                                    </Fab>
                                                </Tooltip>
                                                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                                    <ToggleButtonGroup
                                                        value={toggleState}
                                                        exclusive
                                                        onChange={handleToggle}
                                                        aria-label="text alignment"
                                                    >
                                                        {its}
                                                    </ToggleButtonGroup>
                                                </Menu>
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                <Tooltip title='Eliminar' placement='top' arrow>   
                                                    <Fab size='small' onClick={handleDelete} color='primary'>
                                                        <DeleteIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                <Tooltip title='Limpiar'placement='right' arrow >
                                                    <Fab onClick={HandleReset} size='small' color='primary' >
                                                        <AutorenewIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </Grid>
                                        </Hidden>   
                                        <Hidden only={['xl','lg','md','sm']}>
                                            <Grid item xl={2}>
                                                <IconButton
                                                    size='small'
                                                    onClick={handleSearch}                                        
                                                    color='primary'
                                                >
                                                    <SearchIcon/>
                                                </IconButton>

                                            </Grid>
                                            <Grid item xl={2}>
                                                <IconButton
                                                    size='small'
                                                    onClick={handleClick}
                                                    color='primary'
                                                >
                                                    <StorageIcon/>
                                                </IconButton>
                                                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                                    <ToggleButtonGroup
                                                        value={toggleState}
                                                        exclusive
                                                        onChange={handleToggle}
                                                        aria-label="text alignment"
                                                    >
                                                        {its}
                                                    </ToggleButtonGroup>
                                                </Menu>
                                            </Grid>
                                            <Grid item xl={1}>
                                            <IconButton
                                                size='small' 
                                                color='primary'
                                                onClick={handleMenu}>
                                                <MoreVertIcon/>
                                            </IconButton>
                                            <Menu anchorEl={anchorEl2} keepMounted open={Boolean(anchorEl2)} onClose={handleClose2}>
                                                <MenuItem onClick={handleSave}>
                                                    <ListItemIcon>
                                                        <SaveIcon fontSize="small"  />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Guardar" />
                                                </MenuItem>                                        
                                                <MenuItem onClick={handleNew}>
                                                    <ListItemIcon>
                                                        <AddIcon fontSize="small" className={classes.IconButtons} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Nuevo" />
                                                </MenuItem>                                        
                                                <MenuItem onClick={handleDelete}>
                                                    <ListItemIcon>
                                                        <DeleteIcon fontSize="small" className={classes.IconButtons} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Eliminar" />
                                                </MenuItem>
                                            </Menu>
                                        </Grid>
                                        </Hidden>                     
                                </Grid>
                            </Toolbar>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div style={{width:'100%'}}>
                                <ExpansionPanel expanded={expanded === 'panel1'} /* TransitionProps={{ unmountOnExit: true }} */ onChange={handleExpanded('panel1')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{color:'#064c91'}}/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                    <Avatar src='images/matriz/00 clientes.png' /> &nbsp;
                                    <Typography className={classes.heading} style={{color:'#064c91'}}> Informacion Cliente</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container spacing={2} justify='center'>
                                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='cliente'                                            
                                                    options={clientes}
                                                    disabled={disabledState}
                                                    getOptionLabel={(option)=>option.cliente}
                                                    inputValue={matrizState.cliente || ''}
                                                    onInputChange={(e,value)=>setMatrizState({...matrizState, cliente:value})}
                                                    renderInput={(params) => <TextField {...params} InputProps={{...params.InputProps,
                                                        startAdornment: <AccountCircleIcon/>,
                                                    }} fullWidth label="Cliente" variant="outlined" required/>}
                                                />
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                                <TextField 
                                                    id='proyecto'
                                                    fullWidth
                                                    required
                                                    label='Proyecto'
                                                    disabled={disabledState}
                                                    variant='outlined'
                                                    InputProps={{startAdornment: <BuildIcon/> }}
                                                    value={matrizState.proyecto || ''}
                                                    onChange={handleMatrizState}
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={4} sm={5} xs={5}>
                                                <TextField
                                                    id="fecreqcli"
                                                    label="Fecha Req. Cliente"
                                                    type="date"
                                                    format="MM/dd/yyyy"
                                                    value={matrizState.fecreqcli || ''}
                                                    fullWidth
                                                    onChange={handleMatrizState}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                            <Tooltip title='Guardar Fecha' placement='top' arrow> 
                                                <Fab
                                                    size='small'
                                                    onClick={handleSaveFrcli}                                        
                                                    color='secondary'
                                                    disabled= {!editState}
                                                >
                                                    <SaveIcon/>
                                                </Fab>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                                <TextField 
                                                    id='pptocliente'
                                                    fullWidth={true}
                                                    type='Number'                                                
                                                    label='PPTO. Cliente'
                                                    variant='outlined'
                                                    value={formulario.pptocliente || ''}
                                                    onChange={handleFormulario}
                                                    size='small'
                                                    InputProps={{
                                                        startAdornment: <AttachMoneyIcon/>,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>  
                                                <Autocomplete
                                                    id='usuario'                                                                                       
                                                    options={usuario_tags}
                                                    getOptionLabel={(option)=>option.usuario}
                                                    inputValue={formulario.usuario || ''}
                                                    onInputChange={(e,value)=>setFormulario({...formulario, usuario:value})}
                                                    renderInput={(params) => <TextField {...params} InputProps={{...params.InputProps,
                                                        startAdornment: <PermIdentityIcon/>,
                                                    }} fullWidth label="usuario" size='small' variant="outlined" />}
                                                />                                      
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={12} sm={6} xs={6}> 
                                                <TextField
                                                    id='ejecutiva'
                                                    fullWidth={true}
                                                    label='Ejecutiva'
                                                    value={matrizState.ejecutiva || ''}
                                                    variant='outlined'
                                                    size='small'
                                                 
                                                />
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === 'panel2'} /*TransitionProps={{ unmountOnExit: true }} */ onChange={handleExpanded('panel2')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{color:'#064c91'}}/>}
                                        aria-controls="panel1b-content"
                                        id="panel1b-header"
                                    >
                                        <Avatar src='images/matriz/01 elementos.png' /> &nbsp;
                                        <Typography className={classes.heading} style={{color:'#064c91'}}> Elementos</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container spacing={1}>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='tipreq'                                            
                                                    options={tipReq_Tags}
                                                    getOptionLabel={(option)=>option.tipreq}
                                                    inputValue={formulario.tipreq || ''}
                                                    size='small'
                                                    onInputChange={(e,value)=>setFormulario({...formulario, tipreq:value})}
                                                    renderInput={(params) => <TextField {...params} fullWidth label="Tipo Req." variant="outlined" />}
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='numretreqant'
                                                    fullWidth={true}
                                                    label='N° Ret. Requerimiento Anterior'
                                                    value={formulario.numretreqant || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='tiptra'                                            
                                                    options={motivosGarantia}
                                                    getOptionLabel={(option)=>option.tiptra}
                                                    inputValue={formulario.tiptra || ''}
                                                    size='small'
                                                    onInputChange={(e,value)=>setFormulario({...formulario, tiptra:value})}
                                                    renderInput={(params) => <TextField {...params} fullWidth label="Tip. Trabajo" variant="outlined" />}
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='cantreq'
                                                    fullWidth={true}
                                                    label='Cantidad Requerida'
                                                    type='Number'
                                                    value={formulario.cantreq || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='matprin'                                            
                                                    options={matPrin_Tags}
                                                    getOptionLabel={(option)=>option.matprin}
                                                    inputValue={formulario.matprin || ''}
                                                    size='small'
                                                    onInputChange={(e,value)=>setFormulario({...formulario, matprin:value})}
                                                    renderInput={(params) => <TextField {...params} fullWidth label="Material Prin." variant="outlined" />}
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='descripcion'
                                                    fullWidth
                                                    label='Descripcion'
                                                    value={formulario.descripcion || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='alto'
                                                    fullWidth={true}
                                                    label='Alto'
                                                    type='Number'
                                                    value={formulario.alto  || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='ancho'
                                                    fullWidth={true}
                                                    label='Ancho'
                                                    type='Number'
                                                    value={formulario.ancho || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='fondo'
                                                    fullWidth={true}
                                                    label='Fondo'
                                                    type='Number'
                                                    value={formulario.fondo || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='nomest'                                            
                                                    options={establecimientos_Tags}
                                                    getOptionLabel={(option)=>option.local}
                                                    inputValue={formulario.nomest || ''}
                                                    size='small'
                                                    onInputChange={(e,value )=>{
                                                        if(value === ''){
                                                            setFormulario({...formulario, nomest:'', ciudad:'', sector:'', direst:''})
                                                        }else{
                                                            setFormulario({...formulario, nomest:value})
                                                        }
                                                    }}
                                                    onChange={(e,value)=>{
                                                        if(value === null){
                                                            //alert('ELIGA UNA OPCION O INGRESE EL LOCAL QUE DESEA EN LA BASE DE DATOS ');
                                                            setFormulario({...formulario, nomest:'', ciudad:'', sector:'', direst:''})
                                                        }else{
                                                            fetch('/Matriz_EstablecimientosOnly',{
                                                                method:'POST',
                                                                body:JSON.stringify({local:value.local}),
                                                                headers:{
                                                                    'Content-Type':'application/json'
                                                                }
                                                            })
                                                            .then(resp=> resp.json())
                                                            .then(result=>{
                                                                    if(result.status){
                                                                        enqueueSnackbar(result.status,{variant:'error'});
                                                                    }else{
                                                                        if(result.length === 0){
                                                                            alert('ESTE LOCAL ESTA MAL INGRESADO EN LA BASE DE DATOS POR FAVOR CORREGIR');
                                                                            window.location.reload();
                                                                        }else{
                                                                            setFormulario({...formulario, nomest:value.local, ciudad:result[0].ciudad, sector:result[0].sector, direst:result[0].direccion})
                                                                        }
                                                                        
                                                                    }
                                                                
                                                            });
                                                        }
                                                    }}
                                                    renderInput={(params) => <TextField {...params} fullWidth label="Local" variant="outlined" />}
                                                />
                                            </Grid>
                                            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='ciudad'
                                                    fullWidth                                            
                                                    label='Ciudad'
                                                    value={formulario.ciudad || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='sector'
                                                    fullWidth={true}
                                                    label='Sector'
                                                    value={formulario.sector || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='direst'
                                                    fullWidth={true}
                                                    label='Direccion'
                                                    value={formulario.direst || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='marca'                                            
                                                    options={marca_Tags}
                                                    getOptionLabel={(option)=>option.marca}
                                                    inputValue={formulario.marca || ''}
                                                    size='small'
                                                    onInputChange={(e,value)=>{
                                                        if(value === ''){
                                                            setFormulario({...formulario, marca:'', categoria:'', area:''})
                                                        }else{
                                                            fetch('/FindMatriz_Marcas',{
                                                                method:'POST',
                                                                body:JSON.stringify({marca:value}),
                                                                headers:{
                                                                    'Content-Type':'application/json'
                                                                }
                                                            })
                                                            .then(resp=> resp.json())
                                                            .then(result=>{
                                                                if(result.status){
                                                                    enqueueSnackbar(result.status,{variant:'error'});
                                                                }else{
                                                                    setFormulario({...formulario, marca:value, categoria:result[0].categoria, area:result[0].area})
                                                                }
                                                            });
                                                        }
                                                        
                                                    }}
                                                    renderInput={(params) => <TextField {...params} fullWidth label="Marca" variant="outlined" />}
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='categoria'
                                                    fullWidth={true}
                                                    label='Categoria'
                                                    value={formulario.categoria || ''}                                                    
                                                    variant='outlined'
                                                    size='small'
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField
                                                    id='area'
                                                    fullWidth={true}
                                                    label='Area'
                                                    value={formulario.area || ''}                                                    
                                                    variant='outlined'
                                                    size='small'
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === 'panel3'} /*TransitionProps={{ unmountOnExit: true }}*/ onChange={handleExpanded('panel3')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{color:'#064c91'}}/>}
                                        aria-controls="panel1c-content"
                                        id="panel1c-header"
                                    >
                                        <Avatar src='images/matriz/02 procesos.png' /> &nbsp;
                                        <Typography className={classes.heading} style={{color:'#064c91'}}>Procesos</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container justify='center'>
                                            <Grid item xl={10} lg={11} md={11} sm={12} xs={12}>
                                                <ExpansionPanel expanded={expandedPro === 'subpanel1'} TransitionProps={{ unmountOnExit: true }} onChange={handleExpandedPro('subpanel1')}>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="subpanel1a-content"
                                                        id="subpanel1a-header"
                                                    >
                                                        <Avatar src='images/matriz/procesos/Mesa de trabajo 1.png' /> &nbsp;
                                                        <Typography className={classes.heading}>BRIEF</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Grid container spacing={1}>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        id="briini"
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        label="Inicio"
                                                                        value={formulario.briini}
                                                                        onChange={date=>setFormulario({...formulario, briini:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="briacu"
                                                                        label="Acuerdo"
                                                                        value={formulario.briacu}
                                                                        onChange={date=>setFormulario({...formulario, briacu:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        id="briter"
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        label="Termino"
                                                                        value={formulario.briter}
                                                                        onChange={date=>setFormulario({...formulario, briter:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                                                <TextField
                                                                    id='briobs'
                                                                    label='Observacion'
                                                                    value={formulario.briobs}
                                                                    onChange={handleFormulario}
                                                                    fullWidth
                                                                    variant='outlined'
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expandedPro === 'subpanel2'} TransitionProps={{ unmountOnExit: true }} onChange={handleExpandedPro('subpanel2')}>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="subpanel1b-content"
                                                        id="subpanel1b-header"
                                                    >
                                                        <Avatar src='images/matriz/procesos/Mesa de trabajo 2.png' /> &nbsp;
                                                        <Typography className={classes.heading}>ARTES</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Grid container spacing={1}>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="artini"
                                                                        label="Inicio"
                                                                        value={formulario.artini}
                                                                        onChange={date=>setFormulario({...formulario, artini:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="artacu"
                                                                        label="Acuerdo"
                                                                        value={formulario.artacu}
                                                                        onChange={date=>setFormulario({...formulario, artacu:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="artter"
                                                                        label="Termino"
                                                                        value={formulario.artter}
                                                                        onChange={date=>setFormulario({...formulario, artter:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="artapr"
                                                                        label="Aprobado"
                                                                        value={formulario.artapr}
                                                                        onChange={date=>setFormulario({...formulario, artapr:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                                                                <TextField
                                                                    id='artobs'
                                                                    label='Observacion'
                                                                    value={formulario.artobs}
                                                                    onChange={handleFormulario}
                                                                    fullWidth
                                                                    variant='outlined'
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expandedPro === 'subpanel3'} TransitionProps={{ unmountOnExit: true }} onChange={handleExpandedPro('subpanel3')}>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="subpanel1c-content"
                                                        id="subpanel1c-header"
                                                    >
                                                        <Avatar src='images/matriz/procesos/Mesa de trabajo 3.png' /> &nbsp;
                                                        <Typography className={classes.heading}>MED/CRONO</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Grid container spacing={1}>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="medcroini"
                                                                        label="Inicio"
                                                                        value={formulario.medcroini}
                                                                        onChange={date=>setFormulario({...formulario, medcroini:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="medcroacu"
                                                                        label="Acuerdo"
                                                                        value={formulario.medcroacu}
                                                                        onChange={date=>setFormulario({...formulario, medcroacu:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="medcroter"
                                                                        label="Termino"
                                                                        value={formulario.medcroter}
                                                                        onChange={date=>setFormulario({...formulario, medcroter:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                                                <TextField
                                                                    id='briobs'
                                                                    label='Observacion'
                                                                    value={formulario.medcroobs}
                                                                    onChange={handleFormulario}
                                                                    fullWidth
                                                                    variant='outlined'
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expandedPro === 'subpanel4'} TransitionProps={{ unmountOnExit: true }} onChange={handleExpandedPro('subpanel4')}>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="subpanel1d-content"
                                                        id="subpanel1d-header"
                                                    >
                                                        <Avatar src='images/matriz/procesos/Mesa de trabajo 4.png' /> &nbsp;
                                                        <Typography className={classes.heading}>COTIZACION</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Grid container spacing={1}>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="cotini"
                                                                        label="Inicio"
                                                                        value={formulario.cotini}
                                                                        onChange={date=>setFormulario({...formulario, cotini:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="cotenv"
                                                                        label="Enviada"
                                                                        value={formulario.cotenv}
                                                                        onChange={date=>setFormulario({...formulario, cotenv:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="cotapr"
                                                                        label="Aprobada"
                                                                        value={formulario.cotapr}
                                                                        onChange={date=>setFormulario({...formulario, cotapr:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                                                <TextField
                                                                    id='cotobs'
                                                                    label='Observacion'
                                                                    value={formulario.cotobs}
                                                                    onChange={handleFormulario}
                                                                    fullWidth
                                                                    variant='outlined'
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expandedPro === 'subpanel5'} TransitionProps={{ unmountOnExit: true }} onChange={handleExpandedPro('subpanel5')}>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="subpanel1e-content"
                                                        id="subpanel1e-header"
                                                    >
                                                        <Avatar src='images/matriz/procesos/Mesa de trabajo 5.png' /> &nbsp;
                                                        <Typography className={classes.heading}>Produccion</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Grid container spacing={1}>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="proini"
                                                                        label="Inicio"
                                                                        value={formulario.proini}
                                                                        onChange={date=>setFormulario({...formulario, proini:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="proacu"
                                                                        label="Acuerdo"
                                                                        value={formulario.proacu}
                                                                        onChange={date=>setFormulario({...formulario, proacu:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <KeyboardDatePicker
                                                                        className={classes.date}
                                                                        variant="outlined"
                                                                        format="MM/dd/yyyy"
                                                                        margin="normal"
                                                                        id="proter"
                                                                        label="Termino"
                                                                        value={formulario.proter}
                                                                        onChange={date=>setFormulario({...formulario, proter:date})}
                                                                        KeyboardButtonProps={{
                                                                            'aria-label': 'change date',
                                                                        }}
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                                                                <TextField
                                                                    id='ot'
                                                                    label='O.T.'
                                                                    type='Number'
                                                                    variant='outlined'
                                                                    value={formulario.ot}
                                                                    onChange={handleFormulario}
                                                                    fullWidth
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                                                                <TextField
                                                                    id='proobs'
                                                                    label='Observacion'
                                                                    value={formulario.proobs}
                                                                    onChange={handleFormulario}
                                                                    fullWidth
                                                                    variant='outlined'
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === 'panel4'} /*TransitionProps={{ unmountOnExit: true }} */ onChange={handleExpanded('panel4')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{color:'#064c91'}}/>}
                                        aria-controls="panel1d-content"
                                        id="panel1d-header"
                                    >
                                        <Avatar src='images/matriz/03 proforma.png' /> &nbsp;
                                        <Typography className={classes.heading} style={{color:'#064c91'}}>Proforma</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container spacing={1}>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='numpro'
                                                    label='Num Proforma'
                                                    value={formulario.numpro || ''}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='numproDate'
                                                    label='Fecha Num. Proforma'
                                                    value={formulario.numproDate || '2021-10-01'}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth 
                                                    type='date'
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='tipven'                                            
                                                    options={tipVen_Tags}
                                                    getOptionLabel={(option)=>option.tipven}
                                                    inputValue={formulario.tipven || ''}
                                                    size='small'
                                                    onInputChange={(e,value)=>setFormulario({...formulario, tipven:value})}
                                                    renderInput={(params) => <TextField {...params} fullWidth label="Tip. Venta" variant="outlined" />}
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='numrefpro'
                                                    label='Num. Ref.Proforma Ant.'
                                                    value={formulario.numrefpro || ''}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='coshis'
                                                    label='Costo Historico'
                                                    value={formulario.coshis || ''}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <AttachMoneyIcon/>,
                                                    }} 
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='cosuni'
                                                    label='Costo Unitario'
                                                    value={formulario.cosuni || ''}
                                                    type='Number'
                                                    onChange={(e)=>{
                                                        setFormulario({...formulario, cosuni:parseFloat(e.target.value), costot:parseFloat(formulario.cantreq * e.target.value)})
                                                    }}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <AttachMoneyIcon/>,
                                                    }} 
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='costot'
                                                    label='Costo Total'
                                                    value={formulario.costot || ''}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <AttachMoneyIcon/>,
                                                    }} 
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='poruni'
                                                    label='Porcentaje Descuento'
                                                    value={formulario.poruni || ''}
                                                    onChange={(e)=>{
                                                        if(porDes){
                                                            setFormulario({...formulario, poruni:e.target.value})
                                                        }else{
                                                            let nico = ((e.target.value * formulario.costot) / 100)
                                                            let nicoa = nico / formulario.cantreq
                                                            let cosunine = formulario.cosuni - nicoa
                                                            let costotne = formulario.cantreq * cosunine
                                                            setFormulario({...formulario, poruni:e.target.value, desuni:nicoa, destot:nico, cosuninet:cosunine, costotnet:costotne})
                                                        }        
                                                    }}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    disabled={porDes}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                            <StrikethroughSIcon />
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment:(
                                                            <Switch
                                                                checked={porDes}
                                                                onChange={handleChangePorDes}
                                                                color="primary"
                                                                name="SwitchVal"
                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                            />
                                                        )
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='desuni'
                                                    label='Descuento Unitario'
                                                    value={formulario.desuni || ''}
                                                    type='Number'
                                                    onChange={(e)=>{
                                                        let nico = (e.target.value * 100) / formulario.cosuni
                                                        let nicoa = formulario.costot - ((formulario.cosuni - e.target.value) * formulario.cantreq)
                                                        let cosunine = formulario.cosuni - e.target.value
                                                        let costotne = formulario.cantreq * cosunine
                                                        setFormulario({ ...formulario, desuni:e.target.value, poruni:nico, destot:nicoa, cosuninet:cosunine, costotnet:costotne})
                                                    }}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    disabled={!porDes}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AttachMoneyIcon />
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment:(
                                                            <Switch
                                                                checked={porDes}
                                                                onChange={handleChangePorDes}
                                                                color="primary"
                                                                name="SwitchVal"
                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                            />
                                                        )
                                                    }}
                                                />
                                            </Grid>                                   
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='destot'
                                                    label='Descuento Total'
                                                    value={formulario.destot || ''}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <AttachMoneyIcon/>,
                                                    }} 
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='cosuninet'
                                                    label='Costo Unitario Neto'
                                                    value={formulario.cosuninet || ''}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <AttachMoneyIcon/>,
                                                    }} 
                                                />
                                            </Grid>
                                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    id='costotnet'
                                                    label='Costo Total Neto'
                                                    value={formulario.costotnet || ''}
                                                    type='Number'
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <AttachMoneyIcon/>,
                                                    }} 
                                                />
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === 'panel5'}/*TransitionProps={{ unmountOnExit: true }} */ onChange={handleExpanded('panel5')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{color:'#064c91'}} />}
                                        aria-controls="panel1e-content"
                                        id="panel1e-header"
                                    >
                                        <Avatar src='images/matriz/04 reporte.png' /> &nbsp;
                                        <Typography className={classes.heading} style={{color:'#064c91'}}>Requiere Reporte</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container justify='center' spacing={1}>
                                            <Grid item xl={2} lg={2} md={4} sm={12} xs={12}>
                                                <Autocomplete
                                                    id='reqrep'                                            
                                                    options={reqRep_Tags}
                                                    getOptionLabel={(option)=>option.require}
                                                    inputValue={formulario.reqrep || ''}
                                                    size='small'
                                                    onInputChange={(e,value)=>setFormulario({...formulario, reqrep:value})}
                                                    renderInput={(params) => <TextField {...params} fullWidth label="Req. Reporte" variant="outlined" />}
                                                />                       
                                            </Grid>
                                            <Grid item xl={2} lg={2} md={4} sm={12} xs={12}>
                                                <TextField
                                                    id='linrep'
                                                    label='Link Reporte'
                                                    value={formulario.linrep || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                />    
                                            </Grid>
                                            <Grid item xl={2} lg={2} md={4} sm={12} xs={12}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        className={classes.date}
                                                        variant="outlined"
                                                        format="MM/dd/yyyy"
                                                        margin="normal"
                                                        id="Fecenvrep"
                                                        label="Fecha Envio Reporte"
                                                        value={formulario.fecenvrep}
                                                        onChange={date=>setFormulario({...formulario, fecenvrep:date})}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>  
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                                <TextField
                                                    id='repobs'
                                                    label='Observaciones'
                                                    value={formulario.repobs || ''}
                                                    onChange={handleFormulario}
                                                    variant='outlined'
                                                    size='small'
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === 'panel6'} /*TransitionProps={{ unmountOnExit: true }} */ onChange={handleExpanded('panel6')}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon style={{color:'#064c91'}}/>}
                                    aria-controls="panel1f-content"
                                    id="panel1f-header"
                                >
                                    <Avatar src='images/matriz/05 garantia.png' /> &nbsp;
                                    <Typography className={classes.heading} style={{color:'#064c91'}}>Factura</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container justify='center' spacing={1}>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <TextField
                                                id='migo'
                                                label='MIGO - GR'
                                                value={formulario.migo || ''}
                                                onChange={handleFormulario}
                                                variant='standard'
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <TextField
                                                id='migoDate'
                                                active
                                                label='FECHA MIGO'
                                                value={formulario.migoDate || '2021-01-01'}
                                                type='date'
                                                onChange={handleFormulario}
                                                variant='standard'
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <TextField
                                                id='mesFac'
                                                label='FECHA FACTURACION'
                                                value={formulario.mesFac || '2022-01-01'}
                                                type='date'
                                                onChange={handleFormulario}
                                                variant='standard'
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>
                                         <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <TextField
                                                id='subFac'
                                                label='SUB. FACTURACION'
                                                value={formulario.subFac || ''}
                                                type='string'
                                                onChange={handleFormulario}
                                                variant='standard'
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <TextField
                                                id='numFac'
                                                label='NUM. FACTURA'
                                                value={formulario.numFac || ''}
                                                type='string'
                                                onChange={handleFormulario}
                                                onBlur={handleValFac}
                                                variant='standard'
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </React.Fragment>
    );
};

function Matrizadd(){
    return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense >
          <Matrizad />
        </SnackbarProvider>
    );
};

export default Matrizadd;