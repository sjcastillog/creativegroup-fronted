import React, { useContext, createContext, useState, useEffect } from 'react';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
  Paper,
} from '@material-ui/core';
import { GarantiaCon } from './GarantiaContext';
import {
  AddCircle as AddCircleIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Brightness1 as Brightness1Icon,
  Cached as CachedIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  PhotoAlbum as PhotoAlbumIcon,
  PictureAsPdf as PdfIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
} from '@material-ui/icons'
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
import ImageUploader from 'react-images-upload';
import { Autocomplete } from '@material-ui/lab';
import { 
  Button as ButtonSemantic,
  Icon as IconSemantic, 
} from 'semantic-ui-react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Viewer from 'react-viewer';
import MiniPdf from './MiniPdf';
const moment = require('moment'); 

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const subGarantiaContext = createContext();

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


function TablaPrin() {
  const classes = useStyles();
  const { headers, dataCrono, Instalaciones, dense, isCharged } = GarantiaCon();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Cadena');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
  };

  const Encabezados = headers.map((headCell)=>{
    if(headCell.field === 'Cadena'){
      return(
          <TableCell
            key={headCell.field}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.field ? order : false}
            style={{textAlign:'center',backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', width:headCell.width, zIndex:2, position:'sticky'}}
          >
            <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field)}
            >
              {headCell.title}
              {orderBy === headCell.field ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
      )
    }else{
      return(
        <TableCell
          key={headCell.field}
          align={headCell.numeric ? 'right' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === headCell.field ? order : false}
          style={{textAlign:'center',backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold'}}
        >
          <TableSortLabel
            active={orderBy === headCell.field}
            direction={orderBy === headCell.field ? order : 'asc'}
            onClick={createSortHandler(headCell.field)}
          >
            {headCell.title}
            {orderBy === headCell.field ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      )
        
    }
  });
  
    return (
      <TableHead>
        <TableRow >
          <TableCell style={{textAlign:'center',backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold'}}>
            Actions
          </TableCell>
          {Encabezados}
        </TableRow>
      </TableHead>
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper id='paperParent' square style={{height:80, paddingLeft:50}}>
        <Typography variant="h4" component="h2">
            Garantía: {dataCrono.cliente}
        </Typography>
        <Typography variant="h5" component="h2">
            {dataCrono.proyecto}
        </Typography>
      </Paper>
      <Paper square className={classes.paper}>
      {
        isCharged ?
        (
          <React.Fragment>
            
            <TableContainer style={{minHeight:'55vh',  maxHeight:'58vh', }}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
                stickyHeader
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={Instalaciones.length}
                />
                <TableBody >
                  {stableSort(Instalaciones, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <Roow key={`Row${row._id}`} row={row} index={index} headCells={headers} />     
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={Instalaciones.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
        ):(
          <Grid container style={{height:'71vh',backgroundColor:' #3C3A3A'}} justify='center'>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={6} style={{alignSelf:'center'}}>
                  <FacebookCircularProgress size={40}/>
              </Grid>
          </Grid>
        )
      }
        
      </Paper>
      
    </div>
  );
};

const Roow = (props)=>{

  const { index, row, headCells} = props;
  const [ openRow, setOpenRow ] = useState(false);


  const HeadCellArr = headCells.map((value,index2)=>{
    if(value.field === 'Cadena'){
      return(
        <TableCell key={`Cell${value.field}-${index2}` } style={{width:value.width,  position:'sticky', fontSize:10, textAlign:'center', color:row.FecVen === 'VENCIDO' ? '#fff' : row.FecVen === 'NO APLICA' ? '#fff' : '#000' }}>{row[value.field]}</TableCell>
      )
    }else{
      return( 
        <TableCell key={`Cell${value.field}-${index2}` } style={{width:value.width, fontSize:10, textAlign:'center', color:row.FecVen === 'VENCIDO' ? '#fff' : row.FecVen === 'NO APLICA' ? '#fff' : '#000' }}>{row[value.field]}</TableCell>
        
      )
    }
    
  });

  return(
    <React.Fragment>
      <TableRow key={`fila-${index}-${row._id}`} style={{backgroundColor:row.FecVen === 'VENCIDO' ? '#E2620F' : row.FecVen === 'NO APLICA' ? '#E20F0F' : '#fff' }}>
        <subGarantiaContext.Provider value={{ openRow, setOpenRow}}>
          <CellAction row={row} />
        </subGarantiaContext.Provider>
        { HeadCellArr}
      </TableRow>
      <TableRow key={`subFila-${index}-${row._id}`}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow style={{backgroundColor:'#CAD226', color:'#fff', fontWeight:'bold'}}>
                    <TableCell align="center" style={{width:100}} >Action</TableCell>
                    <TableCell align="center" >Codigo</TableCell>
                    <TableCell align="center" >Cantidad</TableCell>
                    <TableCell align="center" >Motivo</TableCell>
                    <TableCell align="center" >Vencimiento Garantia</TableCell>
                    <TableCell align="center" >Observacion</TableCell>
                    <TableCell align="center" style={{width:130}}>Status</TableCell>
                    <TableCell align="center" >Grafico</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.ElementosArr && row.ElementosArr.map((elementRow) => (
                    <TableRow key={elementRow._id}>
                      <SubCellAction row={elementRow} idInstalacion={row._id}/>
                      <TableCell align="center" style={{fontSize:10}}> {elementRow.Codigo.map(codRow=> codRow.codigo).toString()} </TableCell>
                      <TableCell align="center" style={{fontSize:10}}> {elementRow.CanElem} </TableCell>
                      <TableCell align="center" style={{fontSize:10}}> {elementRow.MotGar.map(motRow=> motRow.motivo).toString()} </TableCell>
                      <TableCell align="center" style={{fontSize:10}}>{elementRow.FecVen}</TableCell>
                      <TableCell align="center" style={{fontSize:10}}> {elementRow.ObservacionGar} </TableCell>
                      <TableCell align="center" style={{fontSize:11}}> {elementRow.Status} </TableCell>
                      <TableCell align="center"> { 
                        elementRow.Status === 'Pre-Creado' ?
                        (
                                    <div>
                                      <Brightness1Icon style={{color:'blue'}}/>
                                      <Brightness1Icon />
                                      <Brightness1Icon />
                                      <Brightness1Icon />
                                    </div>
                        ):  elementRow.Status === 'Creado'?
                        (
                                    <div>
                                      <Brightness1Icon />
                                      <Brightness1Icon style={{color:'red'}}/>
                                      <Brightness1Icon />
                                      <Brightness1Icon />
                                    </div>
                        ) : elementRow.Status === 'En Proceso' ?
                        ( 
                                    <div>
                                      <Brightness1Icon />
                                      <Brightness1Icon />
                                      <Brightness1Icon style={{color:'yellow'}}/>
                                      <Brightness1Icon />
                                    </div>
                        ) : elementRow.Status === 'Finalizado' ?
                        (
                                    <div>
                                      <Brightness1Icon />
                                      <Brightness1Icon />
                                      <Brightness1Icon />
                                      <Brightness1Icon style={{color:'green'}}/>
                                    </div>
                        ):( 

                                      <div>
                                        <Brightness1Icon />
                                        <Brightness1Icon />
                                        <Brightness1Icon />
                                        <Brightness1Icon />
                                      </div>
                        )
                      }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CellAction = (props)=>{
  /*                             VARIABLES                           */
  const { row } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  /*                                                                 */


  /*                             CONTEXTOS                           */
  const { openRow, setOpenRow } = useContext(subGarantiaContext);
  const { enqueueSnackbar } = useSnackbar();
  const { HandleClear,  dataCrono, motivosGarantia, tiposGarantia } = GarantiaCon();
  /*                                                                 */

  /*                              ESTADOS                            */
  const [ listCodigos, setListCodigos ] = useState([]);
  const [ formulario, setFormulario ] = useState({
    Codigo:[],
    MotGar:[],
    ObservacionGar:'',
    idInstalacion:row._id
  });
  const [ pictures, setPictures ] = useState([]);
  const [ isCreatePdf, setCreatePdf ] = useState(false);
  const [ tipos, setTipos ] = useState(tiposGarantia);
  const [ arrMotivos, setArrMotivos ] = useState([{motivo:'', id:'Motivo1' }]);
  const [ cantMotivos, setCantMotivos ] = useState(1);
  /*                                                                 */


  /*                         ESTADOS BOOLEANOS                       */
  const [ isSaving, setSaving ] = useState(false);
  const [ readySave, setReadySave ] = useState(false);
  const [ openAdd, setOpenAdd ] = useState(false);
  const [ openPreAdd, setOpenPreAdd ] = useState(false);
  const [ isContinuoAdd, setContinuoAdd ] = useState(false);
  const [ validacion, setValidacion ] = useState(false);
  const [ unMountPhotos, setUnMountPhotos ] = useState(false);

  
  /*                                                                 */
  useEffect(()=>{
    if(row.FecVen !== 'NO APLICA' || row.FecVen !== 'VENCIDO'){
      const KF = motivosGarantia.filter(value=> value.tiptra.toString() === row.TipTra.toString());
      if(KF.length === 1){
        const TipGarantia = KF[0].tipgar.toString();
        const arrFil2 = tiposGarantia.filter(value=> value.tipgar.toString() === TipGarantia);
        setTipos(arrFil2);
      }
    }
  },[]); // eslint-disable-line react-hooks/exhaustive-deps
 

  useEffect(
    ()=>{
        if(validacion){ 
          setValidacion(false);
          if(formulario.Codigo.length <= 0){
            enqueueSnackbar('Selecione 1 o más Codigos', {variant:'error'}); 
            setSaving(false);            
          }else{ 
            if(formulario.MotGar === ''){
              enqueueSnackbar('Casillero Motivo Vacio', {variant:'error'}); 
              setSaving(false);         
            }else{ 
              if(formulario.ObservacionGar === ''){
                enqueueSnackbar('Casillero Observacion Vacio', {variant:'error'});
                setSaving(false);   
              }else{
                if(pictures.length > 0){
                  HandleSaveImages();
                }else{
                  enqueueSnackbar('DEBE EXISTIR POR LO MENOS UNA FOTO', {variant:'error'});
                  setSaving(false);    
                }
              }
            }
          }   
        }
  },[validacion]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    if(readySave){
      setReadySave(false);
      HandleSave();
    }
  },[readySave]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect (()=>{
    if(unMountPhotos){
      setTimeout(()=>{
        setUnMountPhotos(false);
      },1000)
      
    }
  },[unMountPhotos])// eslint-disable-line react-hooks/exhaustive-deps

  const onDrop = index => e => {
    let newArr = [...pictures];
    newArr[index] = e;
    setPictures(newArr);
  };

  const HandleOpenRow = ()=>{
    switch(row.FecVen){
      case 'VENCIDO': 
        alert('INSTALACION VENCIDA');
        break;
      case 'NO APLICA':
        alert('TIPO DE TRABAJO NO INCLUIDO');
        break;
      default:
        setOpenRow(!openRow);
        break;
    } 
    
  };

  const HandlePdf = ()=>{
    setCreatePdf(true);
  };

  const HandleCloseAdd = ()=>{
    setOpenAdd(false);
  };

  const HandleResetPhotos = ()=>{
    setPictures([]);
    setUnMountPhotos(true);
  };

  const HandleClearAdd = ()=>{
    setFormulario({...formulario,
      Codigo:[],
      MotGar:'',
      ObservacionGar:'',
      Fotos:[]
    });
    HandleResetPhotos();
  };

  const HandleSelectCodigos = (value)=>{
    setFormulario({...formulario, Codigo:value, CanElem:value.length});
  };

  const HandleFormulario = (e)=>{
    setFormulario({...formulario, [e.target.id]: e.target.value});
  };

  const HandlePreOpenDialog = ()=>{
    switch(row.FecVen){
      case 'VENCIDO': 
        alert('INSTALACION VENCIDA');
        break;
      case 'NO APLICA':
        alert('TIPO DE TRABAJO NO INCLUIDO');
        break;
      default:
        HandleValidacionSubEl();
        break;
    }    
  };
  
  const HandleValidacionSubEl = ()=>{
    
    if(row.ElementosArr.length > 0){
      const cantCodi = row.Codigo.length;
      let subCantCodi = 0;
      row.ElementosArr.forEach(value=>{
        subCantCodi += value.Codigo.length;
      });
      if(cantCodi === subCantCodi){
        enqueueSnackbar('NO HAY ELEMENTOS DISPONIBLES', {variant:'info'});
      }else{
        setOpenPreAdd(true);
      }
    }else{ 
      setOpenPreAdd(true);
    }
   
  };

  const HandleClosePreAdd = ()=>{
    setOpenPreAdd(false);
  };

  const HandleProceder = ()=>{
    setContinuoAdd(true);
    const arr = []
    row.ElementosArr.forEach(value=>{
      value.Codigo.forEach(value2=>{ 
        arr.push( value2.codigo )
      })
    });
    setTimeout(()=>{
      const arrFilter = row.Codigo.filter(value=> !arr.includes(value.codigo));
      setTimeout(()=>{
        setListCodigos(arrFilter);
        setTimeout(()=>{
          setContinuoAdd(false);
          setOpenPreAdd(false);
          setOpenAdd(true);
        },1000);
      },500)
    },500)
  };

  const HandleOpenDialogValidacion = ()=>{
    setSaving(true);
    setValidacion(true);
  };

  const HandleSave = ()=>{
    fetch('/Instalacion_GarantiaVentas',{
      method: 'POST',
      body: JSON.stringify(formulario),
      headers:{'Content-Type':'application/json'}
    })
    .then(response=> response.json())
    .then(result =>{
      enqueueSnackbar('Guardado', {variant:'success'});
      setTimeout(()=>{
        HandleCloseAdd();
        setSaving(false);
        setTimeout(()=>{
          HandleClear();
        },500);
      },1000)
    });
    
  };

  const HandleSaveImages = ()=>{
    const fd = new FormData();
    const arr = [];
    const API_URL = '/fetch_GarantiaImagenes';
    const tipos = ['Frontal', 'Lateral A', 'Lateral B', 'Panoramica'];
    const arrCodigos =  formulario.Codigo.map(value=>value.codigo.split('/').join('-'));
    const arrFil = pictures.filter(value=>value !== undefined);
    setTimeout(()=>{
      arrFil.forEach((value,index)=>{
        const objeto = {};
        let name =  `/fotosGarantias/${row.numpro}-${row.Local}-${ arrCodigos }-${row.TipTra.split('/').join('-')}-${row._id}-${index}.jpg`;
        fd.append(value[0].name,arrFil[index][0],name);
        objeto.src =  name;
        objeto.tipo = tipos[index];
        arr.push(objeto);
        if(index === (arrFil.length - 1)){
          if(arrMotivos.length === 1){
            const motPrincipal = arrMotivos[0].motivo.toString();
            const arrFilMotivos = motivosGarantia.filter(motValue=> motValue.tiptra.toString() === row.TipTra.toString());
            const arrFilTipo = (tiposGarantia.filter(tipValue=> tipValue.motgar.toString() === motPrincipal))[0].tipgar.toString();
            const arrFiltrado = arrFilMotivos.filter(arrValue=> arrValue.tipgar.toString() === arrFilTipo);
            const fechaV = new Date(row.Creacion);
            fechaV.setDate(fechaV.getDate() + parseInt(arrFiltrado[0].tiegar));
            const fechaGar =  `${fechaV.getFullYear()}-${fechaV.getMonth() + 1}-${fechaV.getDate()}`;
            setFormulario({...formulario, Fotos:arr, Status:'Pre-Creado', MotGar:arrMotivos, FecVen:fechaGar, TipGar:arrFiltrado[0].tipgar});
            fetch(API_URL, {method: 'POST', body: fd})
                .then(res => res.json()) 
                .then(res => {
                    if(res.message){
                        console.log('ReadySave');
                        enqueueSnackbar(res.message,{variant:'info'});
                        setTimeout(()=>{
                          setReadySave(true);
                        },2000);
                    }else{
                        enqueueSnackbar(res.status,{variant:'error'});
                    }                                    
                });
          }else{
            let arrTiempos = 0;
            let tipgarString = '';
            arrMotivos.forEach(valueMot=>{
              const arrFilMotivos = motivosGarantia.filter(motValue=> motValue.tiptra.toString() === row.TipTra.toString());
              const arrFilTipo = (tiposGarantia.filter(tipValue=> tipValue.motgar.toString() === valueMot.motivo.toString()))[0].tipgar.toString();
              const arrFiltrado = arrFilMotivos.filter(arrValue=> arrValue.tipgar.toString() === arrFilTipo);
              if(arrTiempos.length === 0){
                arrTiempos = parseInt(arrFiltrado[0].tiegar);
                tipgarString = arrFiltrado[0].tipgar.toString();
              }else{
                if(parseInt(arrFiltrado[0].tiegar) > arrTiempos ){
                  arrTiempos = parseInt(arrFiltrado[0].tiegar);
                  tipgarString = arrFiltrado[0].tipgar.toString();
                }
              }
            });
            const fechaV = new Date(row.Creacion);
            fechaV.setDate(fechaV.getDate() + arrTiempos);
            const fechaGar =  `${fechaV.getFullYear()}-${fechaV.getMonth() + 1}-${fechaV.getDate()}`;
            setFormulario({...formulario, Fotos:arr, Status:'Pre-Creado', MotGar:arrMotivos, FecVen:fechaGar, TipGar:tipgarString});
            fetch(API_URL, {method: 'POST', body: fd})
                .then(res => res.json()) 
                .then(res => {
                    if(res.message){
                        console.log('ReadySave');
                        enqueueSnackbar(res.message,{variant:'info'});
                        setTimeout(()=>{
                          setReadySave(true);
                        },2000);
                    }else{
                        enqueueSnackbar(res.status,{variant:'error'});
                    }                                    
                });
          }
          
        }
      });
    },500);
    
  };

  const HandleMotivos = (id, value) =>{
    if(value !== null){ 
      const arrFilMotivos = motivosGarantia.filter(motValue=> motValue.tiptra.toString() === row.TipTra.toString());
      console.log(arrFilMotivos);
      const arrFilTipo = (tiposGarantia.filter(tipValue=> tipValue.motgar.toString() === value.toString()))[0].tipgar.toString();
      console.log(arrFilTipo);
      const arrFiltrado = arrFilMotivos.filter(arrValue=> arrValue.tipgar.toString() === arrFilTipo);
      if(arrFiltrado.length > 0){
          let fechaV = new Date(row.Creacion);
          fechaV.setDate(fechaV.getDate() + parseInt(arrFiltrado[0].tiegar));
          const fechaGar =  `${fechaV.getFullYear()}-${fechaV.getMonth() + 1}-${fechaV.getDate()}`;                             
          var fecha2 = moment(fechaGar);
          var fechaAcTu = (moment().format()).split('T')[0]
          var Status = fecha2.diff(fechaAcTu, 'days');
          console.log(Status)
          if(Status < 0 ){
              alert('MOTIVO DE GARANTIA VENCIDO')
          }else{
            let newArr = [...arrMotivos]; // copying the old datas array
            const arrFilter = newArr.filter(value=>value.id!== id);
            const objeto = {};
            objeto.id = id;
            objeto.motivo = value;
            arrFilter.push(objeto);
            setArrMotivos(arrFilter);
          }  
      }else{
        alert('NO EXISTE ESTE MOTIVO');
      }
    }else{
      let newArr = [...arrMotivos]; // copying the old datas array
      const arrFilter = newArr.filter(value=>value.id!== id);
      const objeto = {};
      objeto.id = id;
      objeto.motivo = value;
      arrFilter.push(objeto);
      setArrMotivos(arrFilter);
    }
};

const HandleCrearMotivos = ()=>{
  setCantMotivos(cantMotivos + 1);
  setArrMotivos([...arrMotivos, {motivo:'', id:`Motivo${cantMotivos + 1}`}]);
};

const HandleBorrarMotivos= (id)=>{
  setCantMotivos( cantMotivos -1);
  let filMotivos = arrMotivos.filter(value=> value.id !== id);
  setArrMotivos(filMotivos);
};

const MotivosEl = arrMotivos.map((value, index)=>(
  <ElementMotivo index={index} key={value.id} valor={value.motivo} id={value.id}  
    total={arrMotivos.length} 
    HandleCrearMotivos={HandleCrearMotivos}
    HandleBorrarMotivos={HandleBorrarMotivos} 
    HandleMotivos={HandleMotivos} 
    arrMotivos={arrMotivos}
    cantMotivos={cantMotivos}
    tipos={tipos}
  />
));


  return(
    <>
      <Dialog
        open={openAdd}
        onClose={HandleCloseAdd}
        // PaperComponent={PaperComponent}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="draggable-dialog-title"
        style={{padding:0}}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="customized-dialog-title" onClose={HandleCloseAdd}>
            Agregar Item
        </DialogTitle>
          <DialogContent style={{margin:0, padding:0, overflowX:'hidden'}}>
            <Divider />
                <Grid container justify='center' style={{margin:0, padding:10}}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{alignSelf:'center'}}>
                    <Grid container justify='center' spacing={2}>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Autocomplete
                          multiple
                          id="Codigos"
                          options={listCodigos}
                          disableCloseOnSelect
                          value={formulario.Codigo || ''}
                          onChange={(e,value)=>{HandleSelectCodigos(value) }}
                          getOptionLabel={(option) => option.codigo}
                          renderOption={(option, { selected }) => (
                              <React.Fragment>
                                  <Checkbox
                                      icon={icon}
                                      checkedIcon={checkedIcon}
                                      style={{ marginRight: 8 }}
                                      checked={selected}
                                  />
                              {option.codigo}
                              </React.Fragment>
                          )}
                          renderInput={(params) => (
                              <TextField {...params} variant="outlined" label="Codigos" fullWidth placeholder="Seleccione..." />
                          )}
                        />
                      </Grid>
                      {
                        MotivosEl
                      }
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextField 
                          id="ObservacionGar"
                          name='ObservacionGar' 
                          fullWidth
                          label="Observacion" 
                          value={formulario.ObservacionGar || ''}
                          onChange={HandleFormulario}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container justify='center'>
                          <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                            {
                              unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                              :
                              <ImageUploader
                                  {...props}
                                  withIcon={false}
                                  onChange={onDrop(0)}
                                  imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                  maxFileSize={15242880}
                                  singleImage={true}
                                  withLabel={false}
                                  withPreview={true}
                                  buttonText='FRONTAL'
                              />
                            }   
                          </Grid>
                          <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                            {
                              unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                              :
                              <ImageUploader
                                  {...props}
                                  withIcon={false}
                                  onChange={onDrop(1)}
                                  imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                  maxFileSize={15242880}
                                  singleImage={true}
                                  withLabel={false}
                                  withPreview={true}
                                  buttonText='LATERAL IZ.'
                              />
                            }
                          </Grid>
                          <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                            {
                              unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                              :
                              <ImageUploader
                                  {...props}
                                  withIcon={false}
                                  onChange={onDrop(2)}
                                  imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                  maxFileSize={15242880}
                                  singleImage={true}
                                  withLabel={false}
                                  withPreview={true}
                                  buttonText='LATERAL DER.'
                              />
                            }
                          </Grid>
                          <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                            {
                              unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                              :
                              <ImageUploader
                                  {...props}
                                  withIcon={false}
                                  onChange={onDrop(3)}
                                  imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                  maxFileSize={15242880}
                                  singleImage={true}
                                  withLabel={false}
                                  withPreview={true}
                                  buttonText='PANORÁMICA'
                              />
                            }
                          </Grid>
                          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}  >
                              <Button 
                                onClick={HandleOpenDialogValidacion} 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                size='large'
                                startIcon= {!isSaving && <SaveIcon/> } >
                                  {isSaving ? <FacebookCircularProgress size={17}/> : 'Guardar'}
                              </Button>
                          </Grid>
                          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}  >
                            <Button 
                              fullWidth 
                              size='large' 
                              variant="contained"
                              color="secondary"
                              onClick={HandleResetPhotos}
                              endIcon={<RefreshIcon/>} >
                              Resetear Fotos
                            </Button>
                          </Grid>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  >
                            <Button 
                              fullWidth 
                              size='large' 
                              variant="contained"
                              onClick={HandleClearAdd}
                              endIcon={<CachedIcon/>} >
                              Limpiar
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
          </DialogContent>
      </Dialog>
      <Dialog
        open={openPreAdd}
        onClose={HandleClosePreAdd}
        // PaperComponent={PaperComponent}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="draggable-dialog-title"
        style={{padding:0}}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="customized-dialog-title" onClose={HandleClosePreAdd}>
            Desea Agregar un Item?
        </DialogTitle>
          <DialogContent style={{margin:0, padding:0, }}>
          <Divider />
              <Paper square style={{margin:0, padding:20,overflow:'hidden'}}>  
                <Grid container justify='center' style={{margin:0, padding:5}}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{alignSelf:'center'}}>
                    <Grid container justify='center' spacing={2}>
                      <ButtonSemantic negative onClick={HandleClosePreAdd}>Cancelar</ButtonSemantic>
                        {
                          isContinuoAdd ?
                          <ButtonSemantic loading>Loading</ButtonSemantic>
                          : (
                          <ButtonSemantic onClick={HandleProceder} primary>
                            Proceder <IconSemantic name='right chevron' />
                          </ButtonSemantic>
                          )
                        }
                       
      
                      </Grid>
                  </Grid>
                </Grid>
              </Paper>
          </DialogContent>
      </Dialog>
    <TableCell>
      <Grid container style={{width:100}}>
        <Grid item>
          <IconButton aria-label="expand row" size="small" onClick={HandleOpenRow}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={HandlePreOpenDialog}>
            <Tooltip title='Agregar' placement='bottom' arrow>
              <AddCircleIcon color={row.FecVen === 'VENCIDO' ? 'disabled' : row.FecVen === 'NO APLICA' ? 'disabled' : 'primary'} />
            </Tooltip>
          </IconButton>
        </Grid>
        <Grid item>
          {
            isCreatePdf ?
              <MiniPdf dataPdf={row} Proyecto={dataCrono.proyecto}/>
            : (
              <IconButton size="small" onClick={HandlePdf}>
                <Tooltip title='Crear Pdf' placement='bottom' arrow>
                  <PdfIcon color={row.FecVen === 'VENCIDO' ? 'primary' : row.FecVen === 'NO APLICA' ? 'primary' : 'secondary'} />
                </Tooltip>
              </IconButton>
            )
          }
        </Grid>
      </Grid>
    </TableCell>
    </>
  )
};

const SubCellAction = (props)=>{
  /*                             VARIABLES                           */
  const { row, idInstalacion } = props;
  /*                                                                 */


  /*                             CONTEXTOS                           */
  const { enqueueSnackbar } = useSnackbar();
  const { HandleClear } = GarantiaCon();
  /*                                                                 */


  /*                         ESTADOS BOOLEANOS                       */
  const [ isContinuoDelete, setContinuoDelete ] = useState(false);
  const [ openPreDelete, setOpenPreDelete ] = useState(false);
  const [ openPhotos, setOpenPhotos ] = useState(false);
  /*                                                                 */

  const HandlePreDelete = ()=>{
    setOpenPreDelete(true);
  };

  const HandleDelete = ()=>{
    setContinuoDelete(true)
    fetch('/Instalacion_GarantiaVentas',{
      method: 'DELETE',
      body: JSON.stringify({idItem:row._id, idInstalacion, Fotos:row.Fotos}),
      headers:{'Content-Type':'application/json'}
    })
    .then(response=> response.json())
    .then(result =>{
      enqueueSnackbar('Eliminado', {variant:'success'});
      setTimeout(()=>{
        HandleClosePreDelete();
        setContinuoDelete(false);
        setTimeout(()=>{
          HandleClear();
        },500);
      },1000)
    });
  };

  const HandleClosePreDelete = ()=>{
    setOpenPreDelete(false);
  };

  const HandleShowPhotos = ()=>{
    if(row.Fotos.length > 0){
      setOpenPhotos(true);
    }else{
      alert('NO EXISTEN FOTOS');
    }
    
  };

  const HandleClosePhotos = ()=>{
    setOpenPhotos(false);
  };

  return(
    <React.Fragment>
      <Dialog
        open={openPreDelete}
        onClose={HandleClosePreDelete}
        // PaperComponent={PaperComponent}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="draggable-dialog-title"
        style={{padding:0}}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="customized-dialog-title" onClose={HandleClosePreDelete}>
            Desea Eliminar este Item?
        </DialogTitle>
          <DialogContent style={{margin:0, padding:0, }}>
          <Divider />
              <Paper square style={{margin:0, padding:20,overflow:'hidden'}}>  
                <Grid container justify='center' style={{margin:0, padding:5}}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{alignSelf:'center'}}>
                    <Grid container justify='center' spacing={2}>
                      <ButtonSemantic negative onClick={HandleClosePreDelete}>Cancelar</ButtonSemantic>
                        {
                          isContinuoDelete ?
                          <ButtonSemantic loading>Loading</ButtonSemantic>
                          : (
                          <ButtonSemantic onClick={HandleDelete} primary>
                            Proceder <IconSemantic name='right chevron' />
                          </ButtonSemantic>
                          )
                        }
                       
      
                      </Grid>
                  </Grid>
                </Grid>
              </Paper>
          </DialogContent>
      </Dialog>
      
      <Viewer
        visible={openPhotos}
        onClose={HandleClosePhotos}
        images={row.Fotos}
        zIndex={2000}
      />
      <TableCell align="center"> 
        <IconButton size='small' onClick={HandlePreDelete}>
          <DeleteIcon color='secondary' />
        </IconButton>
        <IconButton size='small' onClick={HandleShowPhotos}>
          <PhotoAlbumIcon color='secondary' />
        </IconButton>
      </TableCell>
    </React.Fragment>

    
  )
};

const ElementMotivo = (props)=>{
  const { valor, index, total, id, HandleBorrarMotivos, HandleMotivos, HandleCrearMotivos, tipos, arrMotivos } = props;
  let cantItem = index + 1;

  const HandleSubBorraMotivos = ()=>{
    HandleBorrarMotivos(id);
  };

  const HandleSubMotivos = (e, value)=>{
    HandleMotivos(e, value);
  };

  if(arrMotivos.length === 1){
      return(
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'flex', flexDirection:'row'}}>  
            <Grid container>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <Autocomplete
                  id={id}
                  options={tipos.map(value=>value.motgar)}
                  value={valor || ''}                              
                  renderInput={(params) => <TextField {...params} label='Motivo Primario' variant="outlined" fullWidth />}
                  onChange={(e,value, reason)=>{ HandleSubMotivos(id, value); }}  
                />     
              </Grid>
              <Grid item>
                <IconButton onClick={HandleCrearMotivos} >
                    <AddCircleOutlineIcon color='primary'/>
                </IconButton>
              </Grid>
            </Grid>         
          </Grid>   
      )
  }else{
      return(
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'flex', flexDirection:'row'}}>
            <Grid container>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <Autocomplete
                  id={id}
                  options={tipos.map(value=>value.motgar)}
                  value={valor || ''}                              
                  renderInput={(params) => <TextField {...params} label={index > 0 ? 'Motivo Secundario' : 'Motivo Primario'} variant="outlined" fullWidth />}
                  onChange={(e,value, reason)=>{
                        HandleSubMotivos(id, value);
                      
                  }}  
                />     
              </Grid>
              <Grid item>
              { cantItem === total && 
              <>
                  <IconButton onClick={HandleCrearMotivos} >
                      <AddCircleOutlineIcon color='primary'/>
                  </IconButton>
                  <IconButton onClick={HandleSubBorraMotivos}>
                      <DeleteIcon color='secondary'/>
                  </IconButton>
              </>
              }
              </Grid>
              </Grid>
          </Grid>   
      )
  }
  
};


export default function TablaPrincipal(props) {
  const { width } = props;
  return (
    <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
      <TablaPrin ancho={width} />
    </SnackbarProvider>
);
};