import React,{ useState, useEffect}  from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Opadd from './Opadd';
import Oplist from './Oplist';
import Opft from './Opft';
import Opeditor from './Opeditor';
import Elementcot from './Elementcot';
import Elementop from './Elementop';
import Matrizadd from './Matrizadd';
import Matrizlist from './Matrizlist';
import ElementMatriz from './ElementMatriz';
import ElementCrono from './ElementCrono';
import ElementosPlanificacion from './Opciones/Planificacion';
import ElementosInstaladores from './Opciones/Instaladores';
import Cronogramadd from './Cronogramadd';
import Cronogramatable from './Cronogramatable';
import Calendario from './Calendario';
import Accesos from './Accesos';
import Cronogramatable2 from './Cronogramatable2';
import CronoSuper from './Supervisores/Logistica';
import SupervisorProduccion from './Supervisores/Produccion';
import CronoSuperUni from './CronoSuperUni';
import Entrega from './Entrega';
import Retiro from './Retiro';
import Login from './Login';
import upInstalacion from './SubirInstalacion';
import GarantiaVentas  from './Garantia_Ventas/GarantiaVentas'
import GarantiaSuper from './GarantiaSuper';
import GarantiaContabilidad from './GarantiaContabilidad';
import RepIns from './RepIns';
import { Reportes } from './pages/Reportes';
import ImagenIns from './ImagenIns';
import Inicio from './Inicio';
import PrivateRoute from './PrivateRoute';
import Debug_Matriz from './Debugs/Matriz';
import ElementGarantia from './ElementGarantia';
import ReGarantiaVentas from './ReGarantiaVentas';
import ReGarantiaProduccion from './ReGarantiaProduccion';
import ReporteriaAprobados from './Reporteria/Aprobados';
import ReporteriaFacturados from './Reporteria/Facturados';
import ReporteriaFacturadosD from './Reporteria/FacturadosDetallados';
import ReporteriaHistorico from './Reporteria/Historico';
import ReporteriaResumido from './Reporteria/Resumido';
import ReporteriaProduccion from './Reporteria/Produccion';
import ReporteriaProduccionR from './Reporteria/ProduccionResumido';
import ReporteriaLogisticaR from './Reporteria/LogisticaResumido';
import MercaderistaCrear from './Mercaderista/CrearMerc';
import MercaderistaAdd from './Mercaderista/AddMerc';
import MercaderistaPdf from './Mercaderista/ReportePdf';
import MercaderistaExcel from './Mercaderista/ReporteExcel';
import MercaderistaTS from './Mercaderista/TableSupervisora';
import MercaderistaTR from './Mercaderista/TableMercaderista';
import MercaderistaEl from './Mercaderista/ElementosMerc';
import MercaderistaProforma from './Mercaderista/Proforma';
import MercaderistaProformaList from './Mercaderista/ProformaList';
import useSection from './hooksPerson/useSection';
import clsx from 'clsx';
import { makeStyles, useTheme, createMuiTheme} from '@material-ui/core/styles';
import { AppBar, 
         Avatar,  
         Button,
         Collapse,
         CssBaseline,
         Chip, 
         Dialog,
         DialogActions,
         DialogContent,
         DialogTitle,
         Divider, 
         Drawer, 
         Fab,
         Grid,
         IconButton, 
         List,
         ListItem,
         ListItemIcon,
         ListItemText,
         Menu, 
         MenuItem,
         Slide,
         Snackbar,
         TextField, 
         Toolbar}  from '@material-ui/core';

import {  
          AccountBox as AccountBoxIcon,
          Add as AddIcon,
          AddBox as AddBoxIcon, 
          AddCircle as AddCircleIcon,
          ArrowRight as RightIcon,
          Assignment as AssignmentIcon,
          AssignmentTurnedIn as AssignmentTurnedInIcon,
          Ballot as BallotIcon,
          Bookmark as BookmarkIcon,
          FormatListNumbered as BookmarkAddedIcon,
          ChevronLeft as ChevronLeftIcon,
          ChevronRight as ChevronRightIcon,
          ChromeReaderMode as ChromeReaderModeIcon,
          Close as CloseIcon,
          Create as CreateIcon,
          Description as DescriptionIcon,
          DoneOutline as DoneOutlineIcon,
          Dvr as DvrIcon,
          Edit as EditIcon,
          EditLocation as EditLocationIcon,
          ExpandLess,
          ExpandMore,
          EventNote as EventNoteIcon,
          Image as ImageIcon,
          ListAlt as ListAltIcon,
          LocalAtm as LocalAtmIcon,
          Menu as MenuIcon,
          MonetizationOn as MonetizationOnIcon,
          NoteAdd as NoteAddIcon,
          PersonPin as PersonPinIcon,
          PhonelinkSetup as PhonelinkSetupIcon,
          PostAdd as PostAddIcon,
          QueuePlayNext as QueuePlayNextIcon,
          SaveAlt as SaveAltIcon,
          TableChart as TableChartIcon,
          Today as TodayIcon,
          ViewStream as ViewStreamIcon,
          Warning as WarningIcon,
          PictureAsPdf as PictureAsPdfIcon,
          AvTimer as ContentPasteSearchIcon,
          ArrowDropDownCircle as ArrowDropDownCircleIcon,
        } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/styles';
import { lime, blue, red, teal, green } from '@material-ui/core/colors';
import { AuthContext } from './Auth'
import Alert from '@material-ui/lab/Alert';
import { Scrollbars } from 'react-custom-scrollbars';
import ITCAvant from '../fonts/ITCAvantGardePro-Md.ttf'; 
import prueba from "./prueba";
import 'semantic-ui-css/semantic.min.css';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    //background:`url('/images/Mesa de trabajo 13.png')`,
    //backgroundSize: 'contain',
    //backgroundRepeat: 'no-repeat',
    //backgroundSize: '100% 100%',
  },
  root2: {
    display: 'flex',
    background:`url('/images/FONDO.JPG')`,
    //backgroundSize: 'container',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100.5% 100%',
    height: '100vh',
    width: '100vw',
    overflow:'hidden',
  },
  appBar: {
    color:'white',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage: `url('/images/fondocenefa.png')`,
    //backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    height:70,
  },
  
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background:lime,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundImage: `url('/images/fondocenefa.png')`,
    backgroundRepeat: 'no-repeat',
    //backgroundSize: 'contain',
    backgroundSize: '100% 100%',
    height:70,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    position:'fixed',
    width: drawerWidth,
    zIndex:'1',
    backgroundColor:'#fff',
    marginTop:-70,
  },
  drawerbody:{
    display:'block',
    marginTop:70,
    width: drawerWidth,
    zIndex:'2',
    backgroundColor:'#fff'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60,
    overflow:'auto'
},
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginTop:60,
    overflow:'auto'
  },
  nested: {
    padding:0,
    margin:5,
    color:'#fff',
  },
  listit: {
    color:'#0E3B5F',
  },
  lisact: {
    backgroundColor:'#CAD226',
    color:'#fff',
  },
  listot:{
      color:'#0E3B5F',
  },
  navlink:{
    textDecoration: 'none', 
    width:'100%', 
    height:'100%',
  },
  navlinkA:{
    textDecoration: 'none', 
    width:'100%', 
    height:'100%',
    paddingTop:15,
  },
  toolBar:{
    display:'flex',
    justifyContent:'space-between',
    backgroundImage: `url('/images/iconossolos.png')`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'contain',
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: lime[500],
    '&:hover': {
      backgroundColor: lime[600],
    },
  },
  divAv:{
    backgroundImage: `url('/images/pestanaverde.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  },
}));

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

function NoAcceso (){
  return (<div><h1 style={{color:'red'}}>No Tiene Acceso</h1></div>);
};

export default function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [ anchorEl, setAnchorEl] = useState(null);
  const openUser = Boolean(anchorEl);
  const [ open, setOpen] = useState(false);
  const [ showAppbar, setShowAppbar] =  useState(false);
  const [ auth, setAuth] = useState(true);
  const [ isAdmin, setAdmin] = useState(false);
  const [ dialogState, setDialogState] = useState(false);
  const [ subscripcion, setSubscripcion] = useState({});
  const [ snacks, setSnacks] = useState(false);
  const [ newPass, setNewPass] =  useState('');
  const [ openPassNew, setOpenPassNew] =  useState(false);
  const [ numproCrono, setNumproCrono] = useState('');
  const [ headerWord, setHeaderWord ] = useState('...');
  const [ opencro, handleClickcro] = useSection();
  const [ openDebug, handleClickDebug ] = useSection();
  const [ openGar, handleClickGar] = useSection();
  const [ openIns, handleClickIns ] = useSection();
  const [ openel, handleClickel] = useSection();
  const [ openMerc, handleClickmerc] = useSection();
  const [ openma, handleClickma] = useSection(); 
  const [ openop, handleClickop] = useSection();
  const [ openReporteria, handleClickRepoteria ] = useSection();
  const [ openelsup, handleClickSup] = useSection();
  const [ isMercaderista, setMercaderista ] = useState(false);
  
  //let location = useLocation();
  
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));

  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [ Access, setAccess ] = useState({
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
        elementosgar:false,
        ElementosInstaladores:false,
        ElementosPlanificacion:false,
        accesos: false,
        upInstalacion:false,
        GarantiaVentas:false,
        ImagenIns:false, 
        GarantiaSuper:false,
        GarantiaContabilidad:false,
        DebugMatriz:false,
        ReGarantiaVentas:false,
        ReGarantiaProduccion:false,
        ReporteriaAprobados:false,
        ReporteriaFacturados:false,
        ReporteriaFacturadosD:false,
        ReporteriaHistorico:false,
        ReporteriaResumido:false,
        ReporteriaProduccion:false,
        ReporteriaProduccionR:false,
        ReporteriaLogisticaR:false,
        MercaderistaAdd:false,
        MercaderistaTS:false,
        MercaderistaTR:false,
        MercaderisCrear:false,
        MercaderistaEl:false,
        MercaderistaPdf:false,
        MercaderistaProforma:false,
        MercaderistaProformaList:false,
        RepIns2:false
  });
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  useEffect(()=>{
    if(localStorage.getItem("tokens")){
      setShowAppbar(true);
      setOpen(true);
      setAccess(existingTokens.Accesos);
      if(existingTokens.tipo === 'MERCADERISTA') setMercaderista(true);
    }
  },[] // eslint-disable-line react-hooks/exhaustive-deps
  );
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const handleCloseSession = () =>{
    setShowAppbar(false);
    setAnchorEl(null);
    setOpen(false);
    setAdmin(false);
    setAuthTokens();
    localStorage.removeItem("tokens");
  };

  const handleSubscripcion = (e) =>{
    setSubscripcion({...subscripcion, [e.target.name]: e.target.value})
  };

  const handleAdd = () => {
      fetch('fetch_addlogin',{
          method:'POST',
          body: JSON.stringify(subscripcion),
          headers:{
              'Content-Type':'application/json'
          }
      })
      .then(response => response.json())
      .then(result=>{
          if (result.message){
              setSnacks({status:true,message:'Agregado',severity:'success'});
              setSubscripcion({});
          }else{
              setSnacks({status:true,message:result.status,severity:'error'});
          }
      });
  };

  const handleChangePass = () => {
    fetch('fetch_changePass',{
      method:'DELETE',
      body: JSON.stringify({usuario:authTokens.usuario,pass:newPass}),
      headers:{
          'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(result =>{
      if(result.message){
        setSnacks({status:true,message:result.message,severity:'success'});
        setOpenPassNew(false);
      }else{
        setSnacks({status:true,message:result.status,severity:'error'});
      }
      
    });
  };

  const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Fab size='small' className={classes.fabGreen} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Fab>
          
        </div>    
        <div  className={classes.drawerbody}>
        <Divider />
        <List>
            <ListItem button onClick={handleClickma}>
              <Grid container style={{padding:0, margin:0}}>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'left'}}>
                  <BallotIcon className={classes.listit}/>
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5,  textAlign:'left'}}>
                  <ListItemText className={classes.listot} primary='MATRIZ' />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                  {openma ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </ListItem>
            <Collapse in={openma} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { Access.matrizadd &&
                      <ListItem button className={classes.nested}>
                        <NavLink to ="/matrizadd" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Matriz/Add')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <AddCircleIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="Add" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                    { Access.matrizlist &&
                      <ListItem button className={classes.nested}>
                        <NavLink to ="/matrizlist" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Matriz/List')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <ListAltIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="List" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                </List>
            </Collapse>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={handleClickop}>
              <Grid container style={{padding:0, margin:0}}>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'left'}}>
                  <DvrIcon className={classes.listit}/>
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5,  textAlign:'left'}}>
                  <ListItemText className={classes.listot} primary='O.P.' />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                  {openop ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </ListItem>
            <Collapse in={openop} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { Access.opadd &&
                      <ListItem button className={classes.nested} >
                        <NavLink to ="/opadd" activeClassName={classes.lisact} className={classes.navlink}  onClick={()=>setHeaderWord('O.P./Add')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <AddCircleIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="Add" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                    { Access.opft &&
                      <ListItem button className={classes.nested} >
                        <NavLink to ="/opft" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('O.P./F.T.')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <AddBoxIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="F.T." />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                    { Access.opeditor &&
                      <ListItem button className={classes.nested} >
                        <NavLink to ="/opeditor" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('O.P./Editor')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <ImageIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="Editor" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                    { Access.oplist &&
                      <ListItem button={true} className={classes.nested} >
                        <NavLink to ="/oplist" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('O.P./List')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <ListAltIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="List" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                </List>
            </Collapse>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={handleClickcro}>
              <ListItemIcon className={classes.listot}><TableChartIcon/></ListItemIcon>
              <ListItemText className={classes.listot} primary='CRONOGRAMA' />
              {opencro ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={opencro} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { Access.cronoadd &&
                      <ListItem button className={classes.nested}>
                        <NavLink to ="/cronogramadd" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Cronograma/Add')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <AddCircleIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="Add" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                    { Access.cronolist &&
                      <>
                      <ListItem button className={classes.nested}>
                        <NavLink to ="/cronogramalist" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Cronograma/List')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <ListAltIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="List" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                      <Divider />
                      </>
                    }
                    { Access.cronoentrega &&
                      <ListItem button className={classes.nested}>
                        <NavLink to ="/entregaList" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Cronograma/Entrega')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <ListAltIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="Entrega" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                    { Access.cronoretiro &&
                      <ListItem button className={classes.nested}>
                        <NavLink to ="/retiroList" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Cronograma/Retiro')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <ListAltIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="Retiro" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                      </ListItem>
                    }
                </List>
            </Collapse>
        </List>
        <Divider />
        <List>
              <ListItem button onClick={handleClickSup}>
                <ListItemIcon className={classes.listot}><ChromeReaderModeIcon /></ListItemIcon>
                <ListItemText className={classes.listot} primary='SUPERVISORES' />
                {openelsup ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openelsup} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  { Access.superuni &&
                    <ListItem button className={classes.nested}>
                        <NavLink to ="/cronogramasuperuni" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Cronograma/Unitario')}>
                          <Grid container style={{padding:0, margin:0}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                                <AddCircleIcon className={classes.listit} />
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                              <ListItemText className={classes.listit} primary="Unitario" />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                                <RightIcon />
                            </Grid>
                          </Grid>
                        </NavLink>
                    </ListItem>
                  }
                  { Access.supercomdar &&
                  <ListItem button={true} className={classes.nested} >
                    <NavLink to ="/cronogramalogistica" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Cronograma/Logística')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AddCircleIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Logística" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                  </ListItem>
                  }
                  { Access.supercomwal &&
                  <ListItem button={true} className={classes.nested} >
                    <NavLink to ="/cronogramaproduccion" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Cronograma/Producción')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AddCircleIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Producción" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                  </ListItem>
                  }
                </List>
              </Collapse>
          </List>
        <Divider />
        { Access.calendario &&
          <ListItem style={{padding:0, height:60}}>
            <NavLink to ="/calendario" activeClassName={classes.lisact} className={classes.navlinkA} onClick={()=>setHeaderWord('Calendario')}>
              <Grid container style={{padding:0, margin:0}}>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4} style={{paddingLeft:15, paddingTop:2, textAlign:'left'}}>
                    <EventNoteIcon className={classes.listit} />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{paddingLeft:5, textAlign:'left'}}>
                  <ListItemText className={classes.listit} primary="CALENDARIO" />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                    <RightIcon />
                </Grid>
              </Grid>
            </NavLink>
          </ListItem>
        }
        <Divider />
        <List>
            <ListItem button onClick={handleClickel}>
              <ListItemIcon className={classes.listot}><EditIcon /></ListItemIcon>
              <ListItemText className={classes.listot} primary='ELEMENTOS' />
              {openel ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openel} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { Access.elementosop &&
                  <ListItem button className={classes.nested}>
                      <NavLink to ="/elementop" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/O.P.')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <AddCircleIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="O.P." />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                  </ListItem>
                }
                { Access.elementoscrono &&
                  <ListItem button className={classes.nested}>
                      <NavLink to ="/elementcrono" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/Cronograma')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <AddCircleIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Cronograma" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                  </ListItem>
                }
                { Access.elementoscot &&
                  <ListItem button={true} className={classes.nested} >
                    <NavLink to ="/elementcot" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/Cotizacion')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AddCircleIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Cotizador" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                  </ListItem>
                }
                { Access.elementosmat &&
                  <ListItem button={true} className={classes.nested}>
                    <NavLink to ="/elementMatriz" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/Matriz')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AddCircleIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Matriz" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                  </ListItem>
                }
                { Access.elementosgar &&
                  <ListItem button={true} className={classes.nested}>
                    <NavLink to ="/elementGarantias" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/Garantia')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AddCircleIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Garantia" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                  </ListItem>
                }
                { Access.accesos &&
                  <ListItem button={true} className={classes.nested}>
                  <NavLink to ="/accesos" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/Accesos')}>
                    <Grid container style={{padding:0, margin:0}}>
                      <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                          <AddCircleIcon className={classes.listit} />
                      </Grid>
                      <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                        <ListItemText className={classes.listit} primary="Accesos" />
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                          <RightIcon />
                      </Grid>
                    </Grid>
                  </NavLink>
                </ListItem>
                }
                { Access.ElementosPlanificacion &&
                  <ListItem button={true} className={classes.nested}>
                  <NavLink to ="/elementPlanificacion" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/Planificacion')}>
                    <Grid container style={{padding:0, margin:0}}>
                      <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                          <AddCircleIcon className={classes.listit} />
                      </Grid>
                      <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                        <ListItemText className={classes.listit} primary="Planificacion" />
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                          <RightIcon />
                      </Grid>
                    </Grid>
                  </NavLink>
                </ListItem>
                }
                { Access.ElementosInstaladores &&
                  <ListItem button={true} className={classes.nested}>
                  <NavLink to ="/elementInstaladores" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Elementos/Instaladores')}>
                    <Grid container style={{padding:0, margin:0}}>
                      <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                          <AddCircleIcon className={classes.listit} />
                      </Grid>
                      <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                        <ListItemText className={classes.listit} primary="Instaladores" />
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                          <RightIcon />
                      </Grid>
                    </Grid>
                  </NavLink>
                </ListItem>
                }
              </List>
            </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickIns}>
            <ListItemIcon className={classes.listot}><EditLocationIcon /></ListItemIcon>
            <ListItemText className={classes.listot} primary='INSTALACIÓN' />
            {openIns ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openIns} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { Access.upInstalacion &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/upInstalacion" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Instalación/Cargar')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AddCircleIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Cargar" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ImagenIns &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/ImagenIns" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Instalación/Fotos')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AccountBoxIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Fotos" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.RepIns &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/RepIns" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Instalación/Reporte')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AssignmentTurnedInIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Reporte" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.RepIns2 &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/RepIns2" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Instalación/Reporte2')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <AssignmentTurnedInIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Reporte" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickGar}>
            <ListItemIcon className={classes.listot}><LocalAtmIcon /></ListItemIcon>
            <ListItemText className={classes.listot} primary='GARANTÍA' />
            {openGar ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGar} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { Access.GarantiaVentas &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/GarantiaVentas" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Garantía/Ventas')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <PostAddIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Ventas" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.GarantiaSuper &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/GarantiaSuper" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Garantía/Supervisores')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <TodayIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Supervisores" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.GarantiaContabilidad &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/GarantiaContabilidad" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Garantía/Contabiidad')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <ViewStreamIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Contabilidad" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
               { Access.ReGarantiaVentas &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/ReGarantiaVentas" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Garantía/ReGarantiaVentas')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <PostAddIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="ReGarantVtas" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              
            </List>
          </Collapse>
        </List>
        <Divider/>
        <Divider />
        <List>
            <ListItem button onClick={handleClickmerc}>
              <Grid container style={{padding:0, margin:0}}>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3} style={{paddingRight:5, paddingTop:2, textAlign:'left'}}>
                  <BallotIcon className={classes.listit}/>
                </Grid>
                <Grid item xl={7} lg={7} md={7} sm={7} xs={7} style={{paddingRight:5,  textAlign:'left'}}>
                  <ListItemText className={classes.listot} primary='MERCADERISTA' />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                  {openMerc ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </ListItem>
            <Collapse in={openMerc} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                { Access.MercaderistaProforma &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercProforma" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Proforma')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <AssignmentIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Proforma" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaProformaList &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercProformaList" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Proforma_List')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <ListAltIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Proforma List" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaCrear &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/CrearMerc" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Crear')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <QueuePlayNextIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Crear Proyecto" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaAdd &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/AddMerc" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Add')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <NoteAddIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Crear Reporte" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaTS &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercSupervisora" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Supervisora')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PostAddIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Supervisora" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaTR &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercRutas" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Rutas')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PersonPinIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Rutas" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaEl &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercEl" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Elementos')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PhonelinkSetupIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Elementos" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaPdf &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercPdf" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/ReportePdf')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PictureAsPdfIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="ReportePdf" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaExcel &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercExcel" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/ReporteExcel')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <DescriptionIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="ReporteExcel" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                </List>
            </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickRepoteria}>
            <ListItemIcon className={classes.listot}><SaveAltIcon /></ListItemIcon>
            <ListItemText className={classes.listot} primary='REPORTERIA' />
            {openReporteria ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openReporteria} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { Access.ReporteriaAprobados &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaAprobados" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/Aprobados')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <DoneOutlineIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Aprobados" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ReporteriaFacturados &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaFacturados" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/Facturados')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <MonetizationOnIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Facturados" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ReporteriaFacturadosD &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaFacturadosD" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/FacturadosD')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <LocalAtmIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Fact. Detllds." />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ReporteriaHistorico &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaHistorico" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/Historico')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <ContentPasteSearchIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Historico" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ReporteriaResumido &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaResumido" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/Resumido')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <ArrowDropDownCircleIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Resumido" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ReporteriaProduccion &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaProduccion" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/Produccion')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <BookmarkIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Planificacion" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ReporteriaProduccionR &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaProduccionR" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/Produccion Resumido')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <BookmarkAddedIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Prod. Resmd." />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
              { Access.ReporteriaLogisticaR &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/reporteriaLogisticaR" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Reporteria/Logistica Resumido')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <PlaylistAddCheckIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Log. Resmd." />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
            </List>
          </Collapse>
        </List>
        <Divider/>
        <List>
          <ListItem button onClick={handleClickDebug}>
            <ListItemIcon className={classes.listot}><WarningIcon /></ListItemIcon>
            <ListItemText className={classes.listot} primary='DEBUGS' />
            {openDebug ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDebug} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { Access.DebugMatriz &&
                <ListItem button className={classes.nested}>
                    <NavLink to ="/debugMatriz" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Debugs/Matriz')}>
                      <Grid container style={{padding:0, margin:0}}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                            <BallotIcon className={classes.listit} />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                          <ListItemText className={classes.listit} primary="Matriz" />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                            <RightIcon />
                        </Grid>
                      </Grid>
                    </NavLink>
                </ListItem>
              }
            </List>
          </Collapse>
        </List>
        <Divider/>
        </div>
    </div>
  );

  const mercaderistaDrawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Fab size='small' className={classes.fabGreen} onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Fab>
        
      </div>  
      <div  className={classes.drawerbody}>
      <Divider />
        <List>
            <ListItem button onClick={handleClickmerc}>
              <Grid container style={{padding:0, margin:0}}>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3} style={{paddingRight:5, paddingTop:2, textAlign:'left'}}>
                  <BallotIcon className={classes.listit}/>
                </Grid>
                <Grid item xl={7} lg={7} md={7} sm={7} xs={7} style={{paddingRight:5,  textAlign:'left'}}>
                  <ListItemText className={classes.listot} primary='MERCADERISTA' />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                  {openMerc ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </ListItem>
            <Collapse in={openMerc} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  { Access.MercaderistaCrear &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/CrearMerc" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Crear')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <QueuePlayNextIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Crear Proyecto" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaAdd &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/AddMerc" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Add')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <NoteAddIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Crear Reporte" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaTS &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercSupervisora" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Supervisora')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PostAddIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Supervisora" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaTR &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercRutas" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Rutas')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PersonPinIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Rutas" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaEl &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercEl" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/Elementos')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PhonelinkSetupIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="Elementos" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaPdf &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercPdf" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/ReportePdf')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <PictureAsPdfIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="ReportePdf" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                  { Access.MercaderistaExcel &&
                    <ListItem button className={classes.nested}>
                      <NavLink to ="/mercExcel" activeClassName={classes.lisact} className={classes.navlink} onClick={()=>setHeaderWord('Mercaderista/ReporteExcel')}>
                        <Grid container style={{padding:0, margin:0}}>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:5, paddingTop:2, textAlign:'right'}}>
                              <DescriptionIcon className={classes.listit} />
                          </Grid>
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingLeft:5, textAlign:'left'}}>
                            <ListItemText className={classes.listit} primary="ReporteExcel" />
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingTop:3, textAlign:'right', color:'#fff'}}>
                              <RightIcon />
                          </Grid>
                        </Grid>
                      </NavLink>
                    </ListItem>
                  }
                </List>
            </Collapse>
        </List>
      </div>
    </div>
  );

  return (
      <Router>
         <ThemeProvider theme={Creative}>
          <CssBaseline />
          <div className={clsx(classes.root, {[classes.root2]: !showAppbar,})}>
            <Snackbar
              open={snacks.status}
              onClose={()=>setSnacks({...snacks, status:false})}
              anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
              TransitionComponent={Slide}
              autoHideDuration={3000}
              action={
                <React.Fragment>
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={()=>setSnacks({...snacks, status:false})}
                  >
                    <CloseIcon />
                  </IconButton>
                </React.Fragment>
              }
            >
              <Alert onClose={()=>setSnacks({...snacks, status:false})}  severity={snacks.severity}>
                {snacks.message}
              </Alert>
            </Snackbar>
        
            <Dialog
              open={openPassNew}
              onClose={()=>setOpenPassNew(false)}
              fullWidth
              maxWidth='sm'
            >
              <DialogContent>
                <Grid container spacing={4} style={{overflow:'hidden'}}>
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <TextField 
                      value={newPass || ''}
                      onChange={(e)=>setNewPass(e.target.value)}
                      fullWidth
                      size='small'
                      variant='outlined'
                      label='Clave Nueva'
                      required
                      type='password'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" color="primary" onClick={handleChangePass}>
                      Cambiar
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            {showAppbar && 
              <AppBar position='fixed' className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                  <Toolbar className={classes.toolBar}>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <img src='./images/logosolo.png'  alt='logo' style={{width:180,height:65}}/>
                    <Chip
                      avatar={<Avatar alt={headerWord}  src={`/avatares/${authTokens.usuario}.jpg`}/>}
                      label={headerWord}                      
                      
                    />
                    {auth && (
                      <div className={classes.divAv}>
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenuUser}
                          color="inherit"
                        >
                          <Avatar style={{position:'relative', left:-6,top:5}} alt={authTokens.nombre} src={`/avatares/${authTokens.usuario}.jpg`}/>
                        </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={openUser}
                        onClose={handleCloseUser}
                      >

                        <MenuItem onClick={()=>{
                          if(authTokens){
                            if(authTokens.tipo !== 'EJECUTIVA'){
                              setDialogState(true);setAnchorEl(null);}
                              else{
                                setSnacks({status:true,message:"No tiene este Acceso",severity:'error'});
                                setAnchorEl(null);
                              }
                          }
                          }}>
                            <AddIcon style={{color:green[500]}}/>Crear Usuario
                        </MenuItem>
                        <MenuItem onClick={()=>{setOpenPassNew(true);setAnchorEl(null);}}><CreateIcon style={{color:teal[700]}}/>Cambiar Clave</MenuItem>    
                        <MenuItem onClick={handleCloseSession}><CloseIcon style={{color:red[700]}}/>Cerrar Sesion</MenuItem>      
                        <Dialog open={dialogState} onClose={()=>setDialogState(false)} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Subscripcion</DialogTitle>
                            <DialogContent>            
                                <TextField
                                    name='usuario'
                                    margin="dense"
                                    label="Usuario"
                                    fullWidth
                                    variant='outlined'
                                    value={subscripcion.usuario || ''}
                                    onChange={handleSubscripcion}
                                />
                                <TextField
                                    name='nombre'
                                    margin="dense"
                                    label="Nombre"
                                    fullWidth
                                    variant='outlined'
                                    value={subscripcion.nombre || ''}
                                    onChange={handleSubscripcion}
                                />
                                <TextField
                                    name='email'
                                    margin="dense"
                                    label="Email"
                                    type='email'
                                    fullWidth
                                    variant='outlined'
                                    value={subscripcion.email || ''}
                                    onChange={handleSubscripcion}
                                />
                                <TextField
                                    name='coordinador'
                                    margin="dense"
                                    label="Coordinador"
                                    fullWidth
                                    variant='outlined'
                                    value={subscripcion.coordinador || ''}
                                    onChange={handleSubscripcion}
                                />
                                <TextField
                                    name='tipo'
                                    margin="dense"
                                    label="Tipo"
                                    fullWidth
                                    variant='outlined'
                                    value={subscripcion.tipo || ''}
                                    onChange={handleSubscripcion}
                                />
                                <TextField
                                    name='area'
                                    margin="dense"
                                    label="Area"
                                    fullWidth
                                    variant='outlined'
                                    value={subscripcion.area || ''}
                                    onChange={handleSubscripcion}
                                />
                                <TextField
                                    name='pass'
                                    margin="dense"
                                    label="Password"
                                    fullWidth
                                    variant='outlined'
                                    value={subscripcion.pass || ''}
                                    onChange={handleSubscripcion}
                                />
                            
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={()=>setDialogState(false)} style={{color:red[500]}}>
                                Cancel
                            </Button>
                            <Button onClick={handleAdd} style={{color:blue[500]}}>
                                Agregar
                            </Button>
                            </DialogActions>
                        </Dialog>                
                      </Menu>
                    </div>)}
                  </Toolbar>
              </AppBar>
            }
            <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{paper: classes.drawerPaper}} ModalProps={{keepMounted: true}}>
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                >
                  {isMercaderista ? mercaderistaDrawer : drawer}
              </Scrollbars>
            </Drawer>
              <main className={clsx(classes.content, {[classes.contentShift]: open,})} id='mainParent'>
                <Switch >
                  <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, Access, setAccess, setShowAppbar, setOpen, setAdmin, numproCrono, setNumproCrono, setHeaderWord }}>
                    <PrivateRoute exact path="/" component={Inicio}/>
                    <PrivateRoute path="/matrizadd" component={Access.matrizadd ? Matrizadd : NoAcceso}/>
                    <PrivateRoute path="/matrizlist" component={Access.matrizlist ? Matrizlist : NoAcceso}/>
                    <PrivateRoute path="/opadd" component={Access.opadd ? Opadd : NoAcceso}/>
                    <PrivateRoute path="/opft" component={Access.opft ? Opft : NoAcceso}/>
                    <PrivateRoute path="/opeditor" component={Access.opeditor ? Opeditor  : NoAcceso}/>
                    <PrivateRoute path="/oplist" component={Access.oplist ? Oplist  : NoAcceso}/>
                    <PrivateRoute path="/cronogramadd" component={Access.cronoadd ? Cronogramadd : NoAcceso}/>
                    <PrivateRoute path="/cronogramatable" component={Access.cronoadd ? numproCrono !== '' ? Cronogramatable : Cronogramadd : NoAcceso }/>
                    <PrivateRoute path="/cronogramalist" component={Access.cronolist ? Cronogramatable2 : NoAcceso }/>
                    <PrivateRoute path="/entregalist" component={Access.cronoentrega ? Entrega : NoAcceso }/>
                    <PrivateRoute path="/retirolist" component={Access.cronoretiro ? Retiro : NoAcceso}/>
                    <PrivateRoute path="/cronogramasuperuni" component={Access.superuni ? CronoSuperUni : NoAcceso }/>
                    <PrivateRoute path="/cronogramalogistica" component={Access.supercomdar ? CronoSuper: NoAcceso }/>
                    <PrivateRoute path="/cronogramaproduccion" component={Access.supercomwal ? SupervisorProduccion: NoAcceso }/>
                    <PrivateRoute path="/calendario" component={Access.calendario ?  Calendario : NoAcceso }/>
                    <PrivateRoute path="/elementMatriz" component={Access.elementosmat ? ElementMatriz : NoAcceso }/>
                    <PrivateRoute path="/elementop" component={Access.elementosop ? Elementop : NoAcceso }/>
                    <PrivateRoute path="/elementcrono" component={Access.elementoscrono ? ElementCrono : NoAcceso }/>
                    <PrivateRoute path="/elementcot" component={Access.elementoscot ? Elementcot : NoAcceso }/>
                    <PrivateRoute path="/elementPlanificacion" component={Access.ElementosPlanificacion ? ElementosPlanificacion : NoAcceso }/>
                    <PrivateRoute path="/elementInstaladores" component={Access.ElementosInstaladores ? ElementosInstaladores : NoAcceso }/>
                    <PrivateRoute path="/elementGarantias" component={Access.elementosgar ? ElementGarantia : NoAcceso }/>
                    <PrivateRoute path="/upInstalacion" component={Access.upInstalacion ? upInstalacion : NoAcceso }/>
                    <PrivateRoute path="/ImagenIns" component={Access.ImagenIns ? ImagenIns : NoAcceso }/>
                    <PrivateRoute path="/RepIns" component={Access.RepIns ? Reportes : NoAcceso }/>
                    <PrivateRoute path="/RepIns2" component={Access.RepIns2 ? Reportes : NoAcceso }/>
                    <PrivateRoute path="/AddMerc" component={Access.MercaderistaAdd ? MercaderistaAdd : NoAcceso}/>
                    <PrivateRoute path="/CrearMerc" component={Access.MercaderistaCrear ? MercaderistaCrear : NoAcceso}/>
                    <PrivateRoute path="/mercSupervisora" component={Access.MercaderistaTS ? MercaderistaTS : NoAcceso}/>
                    <PrivateRoute path="/mercRutas" component={Access.MercaderistaTR ? MercaderistaTR : NoAcceso}/>
                    <PrivateRoute path="/mercEl" component={Access.MercaderistaEl ? MercaderistaEl : NoAcceso}/>
                    <PrivateRoute path="/mercPdf" component={Access.MercaderistaPdf ? MercaderistaPdf : NoAcceso}/>
                    <PrivateRoute path="/mercExcel" component={Access.MercaderistaExcel ? MercaderistaExcel : NoAcceso}/>
                    <PrivateRoute path="/mercProforma" component={Access.MercaderistaProforma ? MercaderistaProforma : NoAcceso}/>
                    <PrivateRoute path="/mercProformaList" component={Access.MercaderistaProformaList ? MercaderistaProformaList : NoAcceso}/>
                    <PrivateRoute path="/GarantiaVentas" component={Access.GarantiaVentas ? GarantiaVentas : NoAcceso }/>
                    <PrivateRoute path="/GarantiaSuper" component={Access.GarantiaSuper ? GarantiaSuper : NoAcceso }/>
                    <PrivateRoute path="/GarantiaContabilidad" component={Access.GarantiaContabilidad ? GarantiaContabilidad : NoAcceso }/>
                    <PrivateRoute path="/ReGarantiaVentas" component={Access.ReGarantiaVentas ? ReGarantiaVentas : NoAcceso }/>
                    <PrivateRoute path="/ReGarantiaProduccion" component={Access.ReGarantiaProduccion ? ReGarantiaProduccion : NoAcceso }/>
                    <PrivateRoute path="/reporteriaAprobados" component={Access.ReporteriaAprobados ? ReporteriaAprobados : NoAcceso }/>
                    <PrivateRoute path="/reporteriaFacturados" component={Access.ReporteriaFacturados ? ReporteriaFacturados : NoAcceso }/>
                    <PrivateRoute path="/reporteriaFacturadosD" component={Access.ReporteriaFacturadosD ? ReporteriaFacturadosD : NoAcceso }/>
                    <PrivateRoute path="/reporteriaHistorico" component={Access.ReporteriaHistorico ? ReporteriaHistorico : NoAcceso }/>
                    <PrivateRoute path="/reporteriaResumido" component={Access.ReporteriaResumido ? ReporteriaResumido : NoAcceso }/>
                    <PrivateRoute path="/reporteriaProduccion" component={Access.ReporteriaProduccion ? ReporteriaProduccion : NoAcceso }/>
                    <PrivateRoute path="/reporteriaProduccionR" component={Access.ReporteriaProduccionR ? ReporteriaProduccionR : NoAcceso }/>
                    <PrivateRoute path="/reporteriaLogisticaR" component={Access.ReporteriaLogisticaR ? ReporteriaLogisticaR : NoAcceso }/>
                    <PrivateRoute path="/prueba" component={Access.prueba ? prueba : NoAcceso }/>
                    <PrivateRoute path="/debugMatriz" component={Access.DebugMatriz ? Debug_Matriz : NoAcceso }/>
                    <PrivateRoute path="/accesos" component={Access.accesos ?  Accesos : NoAcceso }/> 
                    <Route path="/Login">
                        <Login />
                    </Route>
                  </AuthContext.Provider>    
                </Switch>
              </main>
          </div>
          </ThemeProvider>
      </Router>
     
  );
}


