import React, { useState, useEffect, useContext, createContext} from 'react';
import  {
          Backdrop,
          Box,
          Card,
          CardActions,
          CardContent,
          CardHeader,
          CircularProgress,
          CssBaseline,
          Dialog,
          DialogContent,
          DialogTitle,
          Fab,
          Grid,
          IconButton,
          InputAdornment,
          MenuItem,
          Paper,
          Select,
          Switch,
          Tab,
          Tabs,
          Typography,
          TextField,
          Tooltip,
        } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import  {
          HighlightOff as HighlightOffIcon,
        } from '@material-ui/icons'
import { blue, red, grey } from '@material-ui/core/colors';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{width:'100%'}}
    >
      {value === index && (
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
          <Card>
            <Grid container style={{height:770, overflowY:'auto', padding:10}} spacing={2}>
              {children}
            </Grid>
          </Card>
      </Grid>
          
      
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 770,
    width:'85vw'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#0E3B5F',
    color: '#fff',
    padding:5
  },
  tab:{
    backgroundColor:'#fff', 
    color:'#0E3B5F',
    borderRadius:10,
    marginBottom:5
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  cardheaderbymes:{
    backgroundColor: '#CAD226',
    color:'#0E3B5F'
  },
  cardheaderbyday:{
    color: '#0E3B5F',
    fontWeight:'bold'
  },
  cardbymes:{
    boxShadow: '-3px -2px 1px 1px rgba(14,59,95,1)',
    borderBottomColor:'#CAD226', 
    borderBottomtWidth:2,
  },
  cardbyday:{
    boxShadow: '-3px -2px 1px 1px rgba(14,59,95,1)',
    borderBottomColor:'#CAD226', 
    borderBottomtWidth:2,
    height:150
  }
}));


const PopusDay = (props) =>{
  const classes = useStyles();
  const { data, anio} = props;
  const [ showModal, setShowModal ] = useState(false); 
  const [ dataTarget, setDataTarget] = useState([]);
  const [ tamanio, setTamanio ] = useState(0);
  const [ isDisabled, setDisabled] = useState(false);
  const [ isColor, setColor ] = useState('');
  

  useEffect(()=>{
    if(data.data){
      setDataTarget(data.data);
      let cantidad = data.data.length;
      if(cantidad <= 2){
        if(cantidad === 0){
          setDisabled(true);
          setColor(grey[500])
        }else{
          setColor(blue[500]);
        }
      }else
      if(cantidad > 2 && cantidad < 6){
        setColor(red[400]);
      }else{
        setColor(red[900]);
      }
        
    }
    
    switch(data.diaSem){
      case 'LUNES': setTamanio(2); break;
      case 'MARTES': setTamanio(2); break;
      case 'MIERCOLES': setTamanio(2); break;
      case 'JUEVES': setTamanio(2); break;
      case 'VIERNES': setTamanio(2); break;
      case 'SABADO': setTamanio(1); break;
      case 'DOMINGO': setTamanio(1); break;
    }
  },[]);

  const HandleShowModal = () =>{
    setShowModal(true);
    console.log(data.data);
  };

  const HandleCloseModal = () =>{
    setShowModal(false);
  };

  const diasTar = dataTarget.map((value,index)=>{
    return(
      <Grid item xl={3} lg={3} md={3} sm={3} xs={3} key={`keyEnero${index}`}>
        <Card className={classes.cardbymes} >
            <Card style={{marginTop:4, marginLeft:4, borderColor:'#CAD226', borderWidth:2}} variant="outlined" >
              <CardHeader
                title={value.ciudad}
                className={classes.cardheaderbymes}
              />
              <CardContent>
                <h4>{`${value.caden} - ${value.local}`}</h4>
                <h4>{value.proyecto}</h4>
                <h4>{value.numpro}</h4>
                <h6>{`Cantidad: ${value.valtiptra}`}</h6>
                <h6>{value.insStart}</h6>
              </CardContent>
            </Card>
          </Card>
        </Grid>
    )
  });

  return(
    <React.Fragment>
      <Dialog open={showModal} onClose={HandleCloseModal} maxWidth={'lg'} fullWidth>
        <DialogContent>
          <Grid container spacing={2} style={{padding:5}} alignContent='center' justify='center'>
            {diasTar}
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item xl={tamanio || 2} lg={tamanio || 2 } md={tamanio || 2} sm={tamanio || 2} xs={tamanio || 2} >
          <Card className={classes.cardbyday}>
              {
                tamanio >1
                ? <CardHeader
                    title={data.diaSem}
                    className={classes.cardheaderbyday}
                  />
                : <CardHeader
                    subheader={data.diaSem}
                    className={classes.cardheaderbyday}
                  />
              }
            
            <CardContent style={{textAlign:'center', backgroundImage:`url('images/flechas.png')`,backgroundRepeat:'no-repeat', backgroundSize:50, backgroundPosition:'170px 60px' }}>
              {
                data.diaNum > 0
                ?
                <Tooltip title={dataTarget.length} placement="right">
                  <Fab aria-label="add" color='primary' size='small' onClick={HandleShowModal} disabled={isDisabled}>
                    {data.diaNum}
                  </Fab>
                </Tooltip>
                :
                <Fab aria-label="add" size='small' disabled onClick={HandleShowModal}>
                  < HighlightOffIcon/>
                </Fab>
                
              }
            </CardContent>
          </Card>
      </Grid>
    </React.Fragment>
      
  )
};

const TargetsByDay = (props)=>{
  const { mes, dias, anio} = props;
  const cal2019 = [{mes: 'ENERO', empieza: 1, termina: 31}, {mes: 'FEBRERO', empieza: 4, termina: 28}, 
  {mes: 'MARZO', empieza: 4, termina: 31}, {mes: 'ABRIL', empieza: 0, termina: 30}, {mes: 'MAYO', empieza: 2, termina: 31}, 
  {mes: 'JUNIO', empieza: 5, termina: 30}, {mes: 'JULIO', empieza: 0, termina: 31}, {mes: 'AGOSTO', empieza: 3, termina: 31},
  {mes: 'SEPTIEMBRE', empieza: 6, termina: 30}, {mes: 'OCTUBRE', empieza: 1, termina: 31}, {mes: 'NOVIEMBRE', empieza: 4, termina: 30}, {mes: 'DICIEMBRE', empieza: 6, termina: 31}];
  const cal2020 = [{mes: 'ENERO', empieza: 2, termina: 31}, {mes: 'FEBRERO', empieza: 5, termina: 29}, 
  {mes: 'MARZO', empieza: 6, termina: 31}, {mes: 'ABRIL', empieza: 2, termina: 30}, {mes: 'MAYO', empieza: 4, termina: 31}, 
  {mes: 'JUNIO', empieza: 0, termina: 30}, {mes: 'JULIO', empieza: 2, termina: 31}, {mes: 'AGOSTO', empieza: 5, termina: 31},
  {mes: 'SEPTIEMBRE', empieza: 1, termina: 30}, {mes: 'OCTUBRE', empieza: 3, termina: 31}, {mes: 'NOVIEMBRE', empieza: 6, termina: 30}, {mes: 'DICIEMBRE', empieza: 1, termina: 31}];
  const [ calAc, setCalAc ] = useState([]);
  const meses = [ 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const [ mesNum, setMesNum ] = useState(0);
  const [ mesAc, setMesAc ] = useState('');
  const [ newData, setNewData ] = useState([]);
  const [ continuo_1, setContinuo_1 ] = useState(false);
  const [ continuo_2, setContinuo_2 ] = useState(false);
  const [ mesData, setMesData ] = useState({})

  useEffect(()=>{
    switch(anio){
      case 2019: setCalAc(cal2019); break;
      case 2020 : setCalAc(cal2020); break;
    }
    let mesac = 0;
    if(mes.length > 0){
      mesac = parseInt(((mes[0].insAgr).split('-'))[1]) - 1; //define el mes
    }
    setMesNum(mesac);
    setMesAc(meses[mesac]);
    setContinuo_1(true);
    
  },[]);

  useEffect(()=>{
    if(continuo_1){
      let arr = calAc.filter(key=>{
        return key.mes === mesAc
      });
      setMesData(arr);
      setContinuo_1(false);
      setContinuo_2(true);
    }
  },[continuo_1]);

  useEffect(()=>{
    if(continuo_2){
      setContinuo_2(false);
      let arr = new Array();
      let empieza = parseInt(mesData[0].empieza);
      let termina = parseInt(empieza + parseInt(mesData[0].termina));
      let j = 1;
      let i= 0;
      while(i < 38){
        let objeto = new Object();
        if(i == termina){
          break;
        }else{ 
          if(i  >= empieza && i < termina){
              let arr2 = mes.filter(key=>{
                if(key.insAgr !== '.'){
                  if(key.insAgr !== ''){
                    if(key.insAgr !== ' '){
                      if(key.insAgr !== undefined){
                        if(key.insAgr !== null){
                          let a = key.insAgr.split('-');
                            if(a.length > 1){
                              if(parseInt(a[2]) === j){
                                return key
                              }
                            }
                          }
                        }
                      }
                    }
                  }
              });
              objeto.diaNum = j;
              if( i === 0 || i === 7 || i === 14 || i === 21 || i === 28 || i === 35){
                objeto.diaSem = 'LUNES'
              }else
              if( i === 1 || i === 8 || i === 15 || i === 22 || i === 29 || i === 36){
                objeto.diaSem = 'MARTES'
              }else
              if( i === 2 || i === 9 || i === 16 || i === 23 || i === 30 || i === 37){
                objeto.diaSem = 'MIERCOLES'
              }else
              if( i === 3 || i === 10 || i === 17 || i === 24 || i === 31 || i === 38){
                objeto.diaSem = 'JUEVES'
              }else
              if( i === 4 || i === 11 || i === 18 || i === 25 || i === 32 || i === 39){
                objeto.diaSem = 'VIERNES'
              }else
              if( i === 5 || i === 12 || i === 19 || i === 26 || i === 33 || i === 40){
                objeto.diaSem = 'SABADO'
              }else
              if( i === 6 || i === 13 || i === 20 || i === 27 || i === 34 || i === 41){
                objeto.diaSem = 'DOMINGO'
              }
              objeto.data = arr2;
              j++;
              arr.push(objeto);
              i++            
          }else{
              objeto.diaNum = '';
              if( i === 0 || i === 7 || i === 14 || i === 21 || i === 28 || i === 35){
                objeto.diaSem = 'LUNES'
              }else
              if( i === 1 || i === 8 || i === 15 || i === 22 || i === 29 || i === 36){
                objeto.diaSem = 'MARTES'
              }else
              if( i === 2 || i === 9 || i === 16 || i === 23 || i === 30 || i === 37){
                objeto.diaSem = 'MIERCOLES'
              }else
              if( i === 3 || i === 10 || i === 17 || i === 24 || i === 31 || i === 38){
                objeto.diaSem = 'JUEVES'
              }else
              if( i === 4 || i === 11 || i === 18 || i === 25 || i === 32 || i === 39){
                objeto.diaSem = 'VIERNES'
              }else
              if( i === 5 || i === 12 || i === 19 || i === 26 || i === 33 || i === 40){
                objeto.diaSem = 'SABADO'
              }else
              if( i === 6 || i === 13 || i === 20 || i === 27 || i === 34 || i === 41){
                objeto.diaSem = 'DOMINGO'
              }
              arr.push(objeto);
              i++
          }
        }
      };
      setNewData(arr);
    }
  },[continuo_2]);
  
  const Targets = newData.map((value,index)=>{
    return(
      <PopusDay anio={anio} data={value} key={`TargetByDay${index}`}/>
    )
  });

  
  return(
      <Grid container spacing={2} style={{padding:10}}>
        {
          Targets
        }
      </Grid>
  );
}

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

const ValidationTextField = withStyles({
  root: {
    '& label': {
      color: '#fff',
    },
    '& label.Mui-focused': {
      color: '#CAD226',
    },
    '& div': {
      color:'#fff'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
        borderStyle: 'solid',
        borderWidth: 1
      },
    }
  },
})(TextField);

const CalendarioCliente = ()=>{
    const classes = useStyles();
    const [ data, setData ] = useState([]);
    const [ dataResp, setDataResp ] = useState([]);
    const [ dataState, setDataState] = useState(false);
    const [ numRows, setNumRows] = useState(0);
    const [ mesEnero, setEnero] = useState([]);
    const [ mesFebrero, setFebrero] = useState([]);
    const [ mesMarzo, setMarzo] = useState([]);
    const [ mesAbril, setAbril] = useState([]);
    const [ mesMayo, setMayo]= useState([]);
    const [ mesJunio, setJunio] = useState([]);
    const [ mesJulio, setJulio] = useState([]);
    const [ mesAgosto, setAgosto] = useState([]);
    const [ mesSeptiembre, setSeptiembre] = useState([]);
    const [ mesOctubre, setOctubre] = useState([]);
    const [ mesNoviembre, setNoviembre]  = useState([]);
    const [ mesDiciembre, setDiciembre] = useState([]);
    const [ isContinuo, setContinuo ] = useState(false);
    const [ isContinuo2, setContinuo2 ] = useState(false);
    const [ value, setValue] = useState(0);
    const [ diasEnero, setDiasEnero] = useState([]);
    const [ diasFebrero, setDiasFebrero] = useState([]);
    const [ diasMarzo, setDiasMarzo] = useState([]);
    const [ diasAbril, setDiasAbril] = useState([]);
    const [ diasMayo, setDiasMayo] = useState([]);
    const [ diasJunio, setDiasJunio] = useState([]);
    const [ diasJulio, setDiasJulio] = useState([]);
    const [ diasAgosto, setDiasAgosto] = useState([]);
    const [ diasSeptiembre, setDiasSeptiembre] = useState([]);
    const [ diasOctubre, setDiasOctubre] = useState([]);
    const [ diasNoviembre, setDiasNoviembre] = useState([]);
    const [ diasDiciembre, setDiasDiciembre] = useState([]);
    const [ isActivebyDia, setActiveByDia] = useState(false);
    const [ anios, setAnios] = useState([]);
    const [ isAnio, setIsAnio] = useState();
    const [ cadenas, setCadenas] = useState([]);
    const [ cadena, setCadena] = useState()
    const [ anioChange, setAnioChange ] = useState(false);
    const [ unMount, setUnMount ] = useState(false);
    const [ openBackdrop, setOpenBackdrop] = useState(false);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(()=>{
        async function Req (){
            const ReqCrono = await fetch('CronogramasTot');
            const ReqEntregas = await fetch('EntregasTot');
            const ReqRetiros= await fetch('RetirosTot');
            const ReqCadenas = await fetch('fetch_soloCadenas');
            const JsonCadenas = await ReqCadenas.json();
            const JsonCrono = await ReqCrono.json();
            const JsonEntregas = await ReqEntregas.json();
            const JsonRetiros = await ReqRetiros.json();
            setCadenas(JsonCadenas);
            let numCronos = JsonCrono.length;
            let numSubCronos = 0;
            let arr = new Array();
            JsonCrono.map((row,index)=>{  
              numSubCronos += row.items.length;
              row.items.map((subRows, index2)=>{
                let Objeto = new Object();
                Objeto.proyecto = row.proyecto;
                Objeto.numpro = row.numpro;
                Objeto.ejecutiva = row.ejecutiva;
                Objeto.coordinador = row.coordinador;
                Objeto.cliente = row.cliente;
                Objeto.id = subRows.id;
                Objeto.caden = subRows.Cadena;
                Objeto.local = subRows.Local;
                Objeto.ciudad = subRows.Ciudad;
                Objeto.sector = subRows.Sector;
                Objeto.Direccion = subRows.Direccion;
                Objeto.insStart = subRows.insStart;
                Objeto.insAgr = subRows.insAgr;
                Objeto.insFin = subRows.insFin;
                Objeto.insHora = subRows.insHora;
                Objeto.personal = subRows.Personal;
                Objeto.observacion = subRows.Observacion;
                Objeto.tiptra = (Object.keys(subRows))[12];
                Objeto.valtiptra = (Object.values(subRows))[12];
                Objeto.tipser = 'INSTALACIÓN';
                arr.push(Objeto);
              })
              if(index === (numCronos - 1)){
                const arr2 = arr.concat(JsonEntregas, JsonRetiros);
                setNumRows(numSubCronos);
                setData(arr2);
                setDataResp(arr2);
                setAnioChange(true);
              }
            });

          }
    
          Req();
    },[]);

    useEffect(()=>{
      if(anioChange){
        let arrAnio = data.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-'); 
                    if(parseInt(a[0]) > 2010) {
                        return parseInt(a[0])
                      }                    
                    }
                  }
                }
              }
            }
        });
        let newArrAnio = (Array.from(new Set(arrAnio))).sort(function(a,b){return a - b;});        
        let arrCadena = data.map((key,index)=>{
          return key.caden
        });
        let newArrCadena = (Array.from(new Set(arrCadena))).sort();  
        console.log(newArrCadena);
        setCadenas(newArrCadena);
        setAnios(newArrAnio);
        setIsAnio(parseInt(newArrAnio[1]))
        setContinuo(true);
      }
    },[anioChange]);

    useEffect(()=>{
      if(isContinuo){
        setAnioChange(false);
        let arr = data;
        let january = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 1){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let february = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 2){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let march = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 3){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let april = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 4){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let may = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 5){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let june = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 6){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let july = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 7){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let august = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 8){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let september = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 9){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let october = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 10){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let november = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 11){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        let december = arr.filter(key=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');
                      if(a.length > 1){
                        if(parseInt(a[1]) === 12){
                          return key
                        }
                      }
                    }
                  }
                }
              }
            }
        });
        setEnero(january);
        setFebrero(february);
        setMarzo(march);
        setAbril(april);
        setMayo(may);
        setJunio(june);
        setJulio(july);
        setAgosto(august);
        setSeptiembre(september);
        setOctubre(october);
        setNoviembre(november);
        setDiciembre(december);
        setContinuo(false);
        setContinuo2(true);
      }
    },[isContinuo]);

    useEffect(()=>{
      if(isContinuo2){
        let arrEn = mesEnero.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrFe = mesFebrero.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrMar = mesMarzo.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrAb = mesAbril.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrMay = mesMayo.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrJun = mesJunio.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrJul = mesJulio.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrAg = mesAgosto.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrSep = mesSeptiembre.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrOct = mesOctubre.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrNov = mesNoviembre.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrDic = mesDiciembre.map((key,index)=>{
          if(key.insAgr !== '.'){
            if(key.insAgr !== ''){
              if(key.insAgr !== ' '){
                if(key.insAgr !== undefined){
                  if(key.insAgr !== null){
                    let a = key.insAgr.split('-');                      
                    return parseInt(a[2])
                    }
                  }
                }
              }
            }
        }); 
        let arrNewEn= (Array.from(new Set(arrEn))).sort(function(a,b){return a - b;});
        let arrNewFe= (Array.from(new Set(arrFe))).sort(function(a,b){return a - b;});
        let arrNewMar= (Array.from(new Set(arrMar))).sort(function(a,b){return a - b;});
        let arrNewAb= (Array.from(new Set(arrAb))).sort(function(a,b){return a - b;});
        let arrNewMay= (Array.from(new Set(arrMay))).sort(function(a,b){return a - b;});
        let arrNewJun= (Array.from(new Set(arrJun))).sort(function(a,b){return a - b;});
        let arrNewJul= (Array.from(new Set(arrJul))).sort(function(a,b){return a - b;});
        let arrNewAg= (Array.from(new Set(arrAg))).sort(function(a,b){return a - b;});
        let arrNewSep= (Array.from(new Set(arrSep))).sort(function(a,b){return a - b;});
        let arrNewOct= (Array.from(new Set(arrOct))).sort(function(a,b){return a - b;});
        let arrNewNov= (Array.from(new Set(arrNov))).sort(function(a,b){return a - b;});
        let arrNewDic= (Array.from(new Set(arrDic))).sort(function(a,b){return a - b;});
        setDiasEnero(arrNewEn);
        setDiasFebrero(arrNewFe);
        setDiasMarzo(arrNewMar);
        setDiasAbril(arrNewAb);
        setDiasMayo(arrNewMay);
        setDiasJunio(arrNewJun);
        setDiasJulio(arrNewJul);
        setDiasAgosto(arrNewAg);
        setDiasSeptiembre(arrNewSep);
        setDiasOctubre(arrNewOct);
        setDiasNoviembre(arrNewNov);
        setDiasDiciembre(arrNewDic);
        setContinuo2(false);
      }
    },[isContinuo2]);

    useEffect(()=>{
      if(dataState){
        async function Req (){
          const ReqCrono = await fetch('CronogramasTot');
          const JsonCrono = await  ReqCrono.json();
          let numCronos = JsonCrono.length;
          let numSubCronos = 0;
          let arr = new Array();
          JsonCrono.map((row,index)=>{  
            numSubCronos += row.items.length;
            row.items.map((subRows, index2)=>{
              let Objeto = new Object();
              Objeto.proyecto = row.proyecto;
              Objeto.numpro = row.numpro;
              Objeto.ejecutiva = row.ejecutiva;
              Objeto.coordinador = row.coordinador;
              Objeto.cliente = row.cliente;
              Objeto.id = subRows.id;
              Objeto.caden = subRows.Cadena;
              Objeto.local = subRows.Local;
              Objeto.ciudad = subRows.Ciudad;
              Objeto.sector = subRows.Sector;
              Objeto.Direccion = subRows.Direccion;
              Objeto.insStart = subRows.insStart;
              Objeto.insAgr = subRows.insAgr;
              Objeto.insFin = subRows.insFin;
              Objeto.insHora = subRows.insHora;
              Objeto.personal = subRows.Personal;
              Objeto.observacion = subRows.Observacion;
              Objeto.tiptra = (Object.keys(subRows))[12];
              Objeto.valtiptra = (Object.values(subRows))[12];
              Objeto.tipser = 'INSTALACIÓN';
              arr.push(Objeto);
            })
            if(index === (numCronos - 1)){
              setNumRows(numSubCronos);
              setData(arr);
              setDataState(false);
            }
          });
        }
        Req();
      }
    },[dataState]);

    useEffect(()=>{
      if(unMount){
        setUnMount(false);
        setActiveByDia(true);
        setTimeout(()=>{
          setOpenBackdrop(false);
        },1000)
        
      }
    },[unMount])

  function Targets(value){
    let arr = value;
    return arr.map((value,index)=>{
      return(
        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} key={`keyMes${index}`} >
          <Card className={classes.cardbymes} >
            <Card style={{marginTop:4, marginLeft:4, borderColor:'#CAD226', borderWidth:2}} variant="outlined" >
              <CardHeader
                title={value.ciudad}
                className={classes.cardheaderbymes}
              />
              <CardContent>
                <h4>{`${value.caden} - ${value.local}`}</h4>
                <h4>{value.proyecto}</h4>
                <h4>{value.numpro}</h4>
                <h6>{`Cantidad: ${value.valtiptra}`}</h6>
                <h6>{value.insStart}</h6>
              </CardContent>
            </Card>
          </Card>
        </Grid>
      )
    })
  };

  const HandleChangeSwitch = ()=>{
    setActiveByDia(!isActivebyDia);
  };

  const SelectsAnio = anios.map((valuea,index)=>(
    <MenuItem value={valuea} key={`Select${index}`}>{valuea}</MenuItem>
  ));

  const SelectsCadena = cadenas.map((valuea,index)=>(
    <MenuItem value={valuea} key={`Cadenas${index}`}>{valuea}</MenuItem>
  ));

  const HandleChangeAnio = (e)=>{
    setIsAnio(e.target.value);
    if(cadena === undefined || cadena === ''){
      let arr = dataResp.filter(data=>{
        let info = data.insStart;
          if(e.target.value == null)
            return data
          else if(info){
                if(info.includes(e.target.value)){ 
                  return data
              }
            }
      });
      setData(arr);
      setContinuo(true);
    }else{
      let arr = dataResp.filter(data=>{
        let info = data.caden;
          if(cadena == null)
            return data
          else if(info){
                if(info.includes(cadena)){ 
                  return data
              }
            }
      });
      arr.filter(data=>{
        let info = data.insStart;
          if(e.target.value == null)
            return data
          else if(info){
                if(info.includes(e.target.value)){ 
                  return data
              }
            }
      });
      setData(arr);
      setContinuo(true);
    }
   
  };

  const HandleChangeCadena = (e)=>{
    setCadena(e.target.value);
    let arr = dataResp.filter(data=>{
      let info = data.insStart;
        if(isAnio == null)
          return data
        else if(info){
              if(info.includes(isAnio)){ 
                let info2 = data.caden;
                if(info2){
                  if(info2.includes(e.target.value)){
                    return data
                  }
                }
            }
          }
    });
    setOpenBackdrop(true);
    setData(arr);
    setContinuo(true);
    setActiveByDia(false);
    setUnMount(true);
   

  };

  const HandleClearCadena = ()=>{
    setCadena('');
    let arr = dataResp.filter(data=>{
      let info = data.insStart;
        if(isAnio == null)
          return data
        else if(info){
              if(info.includes(isAnio)){ 
                return data
            }
          }
    });
    setOpenBackdrop(true);
    setData(arr);
    setContinuo(true);
    setActiveByDia(false);
    setUnMount(true);
    
  };

    return(
      <ThemeProvider theme={CreativeColors}>
        <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper elevation={3} style={{backgroundColor:'#0E3B5F'}}>
                  <Grid container spacing={3} style={{padding:4,marginTop:5,marginLeft:10, width:'80vw', backgroundColor:'#0E3B5F'}}>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1} style={{marginLeft:15}}>
                      <ValidationTextField
                        value={isAnio || ''}
                        onChange={HandleChangeAnio}
                        variant='outlined'
                        label="Año"
                        fullWidth
                        color='secondary'
                        select
                      >
                        {
                          SelectsAnio
                        }
                      </ValidationTextField>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                      <ValidationTextField
                        value={cadena || ''}
                        onChange={HandleChangeCadena}
                        variant='outlined'
                        label="Cadena"
                        fullWidth
                        select
                        color='secondary'
                        InputProps={{
                          startAdornment: (
                            <IconButton onClick={HandleClearCadena}>
                              <HighlightOffIcon />
                            </IconButton>
                          ),
                        }}
                      >
                        {
                          SelectsCadena
                        }
                    </ValidationTextField>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={4} xs={4} style={{marginTop:8, color:'#fff'}}>
                      General
                      <Switch 
                        checked={isActivebyDia}
                        onChange={HandleChangeSwitch}
                        name="checkedA"
                      />
                      Día
                    </Grid>
                  </Grid>
                    <div className={classes.root}>
                      <Backdrop className={classes.backdrop} open={openBackdrop}>
                        <CircularProgress color="inherit" />
                      </Backdrop>
                      <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                        selectionFollowsFocus
                        scrollButtons='on'
                      >
                        <Tab label="Enero" className={classes.tab} {...a11yProps(0)} />
                        <Tab label="Febrero" className={classes.tab} {...a11yProps(1)} />
                        <Tab label="Marzo" className={classes.tab} {...a11yProps(2)} />
                        <Tab label="Abril" className={classes.tab} {...a11yProps(3)} />
                        <Tab label="Mayo" className={classes.tab} {...a11yProps(4)} />
                        <Tab label="Junio" className={classes.tab} {...a11yProps(5)} />
                        <Tab label="Julio" className={classes.tab} {...a11yProps(6)} />
                        <Tab label="Agosto" className={classes.tab} {...a11yProps(7)} />
                        <Tab label="Septiembre" className={classes.tab} {...a11yProps(8)} />
                        <Tab label="Octubre" className={classes.tab} {...a11yProps(9)} />
                        <Tab label="Noviembre" className={classes.tab} {...a11yProps(10)} />
                        <Tab label="Diciembre" className={classes.tab} {...a11yProps(11)} />
                      </Tabs>
                      <TabPanel value={value} index={0}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesEnero} dias={diasEnero} anio={isAnio}/>
                          :Targets(mesEnero)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesFebrero} dias={diasFebrero} anio={isAnio}/>
                          :Targets(mesFebrero)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesMarzo} dias={diasMarzo} anio={isAnio}/>
                          :Targets(mesMarzo)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={3}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesAbril} dias={diasAbril} anio={isAnio}/>
                          :Targets(mesAbril)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={4}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesMayo} dias={diasMayo} anio={isAnio}/>
                          :Targets(mesMayo)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={5}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesJunio} dias={diasJunio} anio={isAnio}/>
                          :Targets(mesJunio)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={6}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesJulio} dias={diasJulio} anio={isAnio}/>
                          :Targets(mesJulio)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={7}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesAgosto} dias={diasAgosto} anio={isAnio}/>
                          :Targets(mesAgosto)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={8}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesSeptiembre} dias={diasSeptiembre} anio={isAnio}/>
                          :Targets(mesSeptiembre)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={9}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesOctubre} dias={diasOctubre} anio={isAnio}/>
                          :Targets(mesOctubre)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={10}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesNoviembre} dias={diasNoviembre} anio={isAnio}/>
                          :Targets(mesNoviembre)
                        }
                      </TabPanel>
                      <TabPanel value={value} index={11}>
                        {isActivebyDia
                          ?<TargetsByDay mes={mesDiciembre} dias={diasDiciembre} anio={isAnio}/>
                          :Targets(mesDiciembre)
                        }
                      </TabPanel>
                    </div>
                </Paper>
            </Grid>
        </Grid>
      </ThemeProvider>
    );
};

export default CalendarioCliente;