import React, {useEffect, useState, useContext, createContext, Suspense, useCallback} from 'react';
import {  
          AppBar,
          Box,
          Button,
          Card,
          Checkbox,
          Dialog,
          DialogContent,
          Fab, 
          Grid,
          IconButton,
          InputAdornment,
          MenuItem,
          Table,
          TableBody,
          TableCell,
          TableContainer,
          TableHead,
          TableSortLabel,
          TableRow,
          TextField,
          Toolbar,
          Tooltip,
          Typography,
} from '@material-ui/core';
import {
          Add as AddIcon,
          ArrowBack as BackIcon,
          Ballot as BallotIcon,
          Close as CloseIcon,
          Delete as DeleteIcon,
          Edit as EditIcon,
          Favorite as FavoriteIcon,
          FavoriteBorder as FavoriteBorderIcon,
          FilterList as FilterListIcon,
          InsertPhoto as InsertPhotoIcon,
          PictureAsPdf as PdfIcon,
          Print as PrintIcon,
          PrintDisabled as PrintDisabledIcon,
          Save as SaveIcon,
          Search as SearchIcon,
} from '@material-ui/icons';
import {
          Autocomplete
} from '@material-ui/lab'
import { lime, grey, blue } from '@material-ui/core/colors';
import { useAuth } from './Auth';
import {Link} from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles} from '@material-ui/core/styles';
import FacebookCircularProgress from './Elementos/FacebookCircularProgress';
import { NotaEntrega } from './Elementos';

const TipoElementos = [
  "Entrega",
  "Instalacion",
]
const TablContext = createContext();

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  toolbar:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  search:{
    width:200
  },
  add:{
    marginLeft:10
  }
  
}));

function descendingComparator(a, b, orderBy) {
  
  if(orderBy === 'Acuerdo'){
    if (new Date(b['insAgr']).getTime() < new Date(a['insAgr']).getTime()) {
      return -1;
    }
    if (new Date(b['insAgr']).getTime() > new Date(a['insAgr']).getTime()) {
      return 1;
    }
    return 0;
  }else if(orderBy === 'Inicio'){

    if (new Date(b['insStart']).getTime() < new Date(a['insStart']).getTime()) {
      return -1;
    }
    if (new Date(b['insStart']).getTime() > new Date(a['insStart']).getTime()) {
      return 1;
    }
    return 0;
  }else if(orderBy === 'Fin'){

    if (new Date(b['insFin']).getTime() < new Date(a['insFin']).getTime()) {
      return -1;
    }
    if (new Date(b['insFin']).getTime() > new Date(a['insFin']).getTime()) {
      return 1;
    }
    return 0;
  }else{
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
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
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  //console.log(headCells);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  //const Heads = headCells;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => { 
        //alert(headCell.title);
        //console.log(headCell)
        if(index >12){
          return(
            <TableCell
              key={headCell.title}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.title ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.title}
                direction={orderBy === headCell.title ? order : 'asc'}
                onClick={createSortHandler(headCell.title)}
                style={{textAlign:'center', display:'flex', justifyContent:'center'}}
              >
               <span style={{fontSize:12, textAlign:'center', display:'block'}}> {headCell.title} </span>
              </TableSortLabel>
            </TableCell>
          )
        }else{
          return(
            <TableCell
              key={headCell.title}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.title ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.title}
                direction={orderBy === headCell.title ? order : 'asc'}
                onClick={createSortHandler(headCell.title)}
                style={{textAlign:'center', display:'flex', justifyContent:'center'}}
              >
                <span style={{fontSize:14, textAlign:'center', display:'block'}}> {headCell.title} </span>
              </TableSortLabel>
            </TableCell>
          )
        }
        
      }
        )}
      </TableRow>
    </TableHead>
  );
}

function CronogramaTable(){
    const classes = useStyles();
    //const headersFixed = ['','Cadena','Local', 'Ciudad', 'Sector', 'Direccion', 'insStart', 'insAgr', 'insFin', 'insHora', 'Personal', 'Garantia','Observacion'];

    const headersFixed = [
      {title:'', field:''},
      {title:'Cadena', field:'Cadena'},
      {title:'Local', field:'Local'},
      {title:'Ciudad', field:'Ciudad'},
      {title:'Sector', field:'Sector'},
      {title:'Direccion', field:'Direccion'},
      {title:'Inicio', field:'insStart'},
      {title:'Acuerdo', field:'insAgr'},
      {title:'Fin', field:'insFin'},
      {title:'Hora', field:'insHora'},
      {title:'Personal', field:'Personal'},
      {title:'Garantia', field:'Garantia'},
      {title:'Observacion', field:'Observacion'},
      {title:'Tipo Elemento', field:'TipoElemento'}
    ];

    const [ headersPdf ] = useState([{tiptra:'Cadena'},{tiptra:'Local'},{tiptra: 'Ciudad'},{tiptra: 'Direccion'},{tiptra: 'insAgr'}]);

    const { numproCrono, authTokens, setOpen } = useAuth();
    const [ headers, setHeaders] = useState([]);
    const [ data, setData]= useState([]);
    const [ dataNew, setDataNew]= useState([]);
    const [ dataState, setDataState] = useState(false);
    const [ isPdf, setIsPdf] = useState(false);
    const [ dataPdf, setDataPdf ] = useState([]);
    const [ openDialog, setOpenDialog] = useState(false);
    const [ continuo, setContinuo] = useState(false);
    const [ continuo2, setContinuo2] = useState(false);
    const [ cadenas, setCadenas] = useState([]);
    const [ informacion, setInformacion ] = useState();
    const [ cadens, setCadens ] = useState([]);
    const [ isEdit, setEdit ] = useState(false);
    const [ order, setOrder] = useState('asc');
    const [ orderBy, setOrderBy] = useState('calories');
    const [ selected, setSelected] = useState([]);
    const page = 0;
    const rowsPerPage = 200;
    const [ isFilterActive, setFilterActive ] = useState(false);
    const [ filtro, setFiltro ]= useState({});
    const [ search, setSearch ] = useState('');
    const [ establecioLogos, setEstablecerLogos ] = useState(false); 
    const [ LogosA , setLogosA ] = useState([]);
    const [ logoSelect, setLogoSelect] = useState({Cliente:false, Cadena:false});
    const [ openAddCadena, setOpenAddCadena ] = useState(false);
    const [ addForm, setAddForm ] = useState({});
    const [ headersToPdf, setHeadersToPdf ] = useState([]);
    const [ getInfoOp, setInfoOp ] = useState({});
    const [ getEncabezados, setEncabezados ] = useState([]);
    //const [ createPdf, setCreatePdf ] = useState(false);
    
    useEffect( 
      ()=>{
        const dato = stableSort(data, getComparator(order, orderBy));
        setDataPdf(dato);
      },[orderBy] // eslint-disable-line react-hooks/exhaustive-deps
    ); 

    useEffect( 
      ()=>{
        const dato = stableSort(data, getComparator(order, orderBy));
        setDataPdf(dato);
      },[order] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{ 
      const Req = async () =>{ 
        const ReqCadenas = await fetch('fetch_cadenasOnly');
        const JsonCadenas = await  ReqCadenas.json();
              setCadens(JsonCadenas);
              setCadenas(JsonCadenas);
              setContinuo2(true);
      }

      setOpen(false);
      Req();
      
    },[]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
      if(continuo2){
        fetch('Cronograma_Info',{
          method:'POST',
          body:JSON.stringify({numpro:numproCrono}),
          headers:{'Content-Type':'application/json'}
        })
        .then(response=> response.json())
        .then(result =>{
          setInfoOp(result[0]);
          const { Logos } = result[0];
          fetch('BusquedaLogos',{
            method:'POST',
            body:JSON.stringify({
              cliente: result[0].cliente ? result[0].cliente : 'null', 
              cadena: result[0].items.length !== 0 ? result[0].items[0].Cadena : 'null'
            }),
            headers:{'Content-Type':'application/json'}
          })
            .then(response => response.json())
            .then(result2 => {
              const cant = result2.length;
              const arrLogos = [];
              const objetoLogos = {};
              for (let i = 0; i<cant; i++){
                let ruta = (result2[i].toString().split('.'))[0];
                let objeto = {};
                let dir = '';
                if(ruta === 'Cadena'){
                  dir = `/logos/${ruta}/${result[0].items[0].Cadena}.jpg`;
                }else{
                  dir = `/logos/${ruta}/${result[0].cliente}.jpg`;
                }
                objeto.src = dir;
                objeto.alt = ruta;
                objeto.downloadUrl = dir;
                arrLogos.push(objeto);
                objetoLogos[ruta] = Logos ? Logos[ruta] ? Logos[ruta]: false :false;
              }
              setLogoSelect(objetoLogos);
              setLogosA(arrLogos)
            });
          let arr = [];
          let nume = result[0].encabezados.length -1;
          let numh = headersFixed.length - 1;
          headersFixed.forEach((value, index)=>{
            if(index === numh){
              arr.push({title:value.title, field:value.field, numeric:false, disablePadding: false, label:value })
              setEncabezados(result[0].encabezados);
              result[0].encabezados.forEach((value,index)=>{
                arr.push({title:value.tiptra, field:value.tiptra, numeric:true, disablePadding: false, label:value });
                if(index === nume){
                  setHeaders(arr);
                  setData(result[0].items);
                  setDataNew(result[0].items);
                  setDataPdf(result[0].items);
                  setContinuo2(false);
                  setInformacion(result[0]);
                  let arrR = headersPdf;
                  let arrR2 = [];
                  let numR = result[0].encabezados.length - 1;
                  result[0].encabezados.forEach((valueR,indexR)=>{
                    arrR.push({tiptra:valueR.tiptra, src:valueR.src});
                    arrR2.push(valueR.src);
                    if(indexR === numR){
                      setHeadersToPdf(arrR);
                    }
                  }); 
                }
              });
            }else{
              arr.push({title:value.title, field:value.field, numeric:false, disablePadding: false, label:value })
            }
          });
          
        });
      }
    },[continuo2]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
      if(dataState){
        fetch('Cronograma_Info',{
          method:'POST',
          body:JSON.stringify({numpro:numproCrono}),
          headers:{'Content-Type':'application/json'}
        })
        .then(response=> response.json())
        .then(result =>{
          setDataState(false);
          setIsPdf(false);
          setDataPdf(result[0].items);
          setData(result[0].items);
          setInformacion(result[0]);
          let arrR = headersPdf;
          let arrR2 = [];
          let numR = result[0].encabezados.length - 1;
          result[0].encabezados.forEach((valueR,indexR)=>{
            arrR.push({tiptra:valueR.tiptra, src:valueR.src});
            arrR2.push(valueR.src);
            if(indexR === numR){
              setHeadersToPdf(arrR);
            }
          }); 
        });
      }
    },[dataState]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
      if(continuo){
        setContinuo(false);
      }
    },[continuo]// eslint-disable-line react-hooks/exhaustive-deps
    );

    const HandlePdfCreate = ()=>{
      if(isPdf){
        setIsPdf(false);
      }else{
        setIsPdf(true);   
      }
    }

    const HandleOpenDialog = ()=>{
      setOpenDialog(true);
    };

    const HandleCloseDialog = ()=>{
      if(establecioLogos){ 
        fetch('/SaveStatusLogos',{
          method:'POST',
          body:JSON.stringify({numpro:numproCrono, Logos:logoSelect}),
          headers:{'Content-Type':'application/json'}
        })
        .then(response=> response.json())
        .then(result =>{
            if(result.message){
              console.log(result.message);
              setOpenDialog(false);
            }else{
              console.log(result.status);
              setOpenDialog(false);
            }
        })
      }
      else{ 
        setOpenDialog(false);
      }
      
    };

    const HandleSelectLogo = (e) =>{
      setEstablecerLogos(true);
      setLogoSelect({...logoSelect, [e.target.name]: e.target.checked});
    }

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = dataNew.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const HandleAdd = () =>{
      if(isEdit){
        alert('Cancele o Guarde');
      }else{
        let arr = data;
        arr.push({
          cadena:'',
          local:'',
          ciudad:'',
          sector:'',
          direccion:'',
          tipo:'nuevo'
        })
        setData(arr);
        setEdit(true);
      }
    };

    const HandleAddCadena = () =>{
      if(isEdit){
        alert('Cancele o Guarde');
      }else{
        setOpenAddCadena(true);
      }
    };

    const HandleFiltros = (e) =>{
      setFiltro({...filtro, [e.target.id]: e.target.value});
      let arr2 = data;
      let result = arr2.filter((data)=>{ 
        let info = data[e.target.id];
        if(e.target.id == null)
          return data
        else if(info){
          if(e.target.id === 'numpro'){
            if(info.toString().includes(e.target.value)){ 
              return data
            }
          }else{
            if(info.toLowerCase().includes(e.target.value.toLowerCase())){ 
              return data
            }
          }
        }
      });
      setData(result);
    };

    const HandleFilterNumpro = (e)=>{
      let keyO = Object.keys(filtro);
      let valO = Object.values(filtro);
      let arr2 = dataNew;
      for (let i=0; i<keyO.length;i++){
        let result = arr2.filter((data)=>{ 
          if(valO[i] == null || '')
            return data
          else if(data[keyO[i]]){
            if(keyO[i] === 'numpro'){
              if(data[keyO[i]].toString().includes(valO[i])){ 
                return data
              }
            }else{
              if(data[keyO[i]].toLowerCase().includes(valO[i].toLowerCase())){ 
                return data
              }
            }
          }
        });
        setData(result);
      }
      
    };

    const HandleSearch = (e)=>{
      setSearch(e.target.value)
      let arr2 = data;
      let lova = e.target.value.toLowerCase();
      let result = arr2.filter((item)=>{
        if(lova == null){ 
          return item
        }else if(item.Cadena.toLowerCase().includes(lova) || item.Local.toLowerCase().includes(lova) || item.Ciudad.toLowerCase().includes(lova) || item.Sector.toLowerCase().includes(lova) || item.Direccion.toLowerCase().includes(lova)){
          return item
        }
      })
      setData(result);
    };

    const HandleFilterSearch = (e)=>{
      let lova = search.toLowerCase();
      let arr2 = dataNew;
      let result = arr2.filter((item)=>{
        if(lova === null){ 
          return item
        }else if(item.Cadena.toLowerCase().includes(lova) || item.Local.toLowerCase().includes(lova) || item.Ciudad.toLowerCase().includes(lova) || item.Sector.toLowerCase().includes(lova) || item.Direccion.toLowerCase().includes(lova)){
          return item
        }
      })
      setData(result);
    };

    const HandleAddCade = (e)=>{
      setAddForm({...addForm, [e.target.name]:e.target.value.toUpperCase()})
    };

    const HandleSaveCadena = () =>{
      if(addForm.cadena && addForm.local && addForm.ciudad && addForm.sector && addForm.provincia && addForm.direccion){
        const FormularioCadena = addForm;
        addForm.ejecutiva = authTokens.nombre;
        addForm.fechaIng = new Date();
        fetch('/fetch_addcadenaReturn',{
          method: 'POST',
          body: JSON.stringify(FormularioCadena),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(result => {
          if(result.Status)
            {
              alert(result.Status);
              console.log(result.Status)
            }else{
              setCadens(result);
              setCadenas(result);
              setAddForm({});
            }
        });
      }else{
        alert('FALTA INFORMACION')
      }
      
    };

    const handleCreateNumNE = useCallback(async ()=>{
      const findNE = await Promise.all(data.filter(el=> el.numNE));
      return {numNE:`${numproCrono}-${data.length}-${(findNE.length + 1)}`};
    },[data])

    return(
          <Grid container >
            <Dialog open={openDialog} onClose={HandleCloseDialog} fullWidth maxWidth={'sm'}>
              <Grid container>
                {
                  LogosA.map((value, index)=>( 
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{padding:10}}  key={`logo${index}`}>
                      <Grid container justify='center' spacing={2} style={{backgroundColor:'#eee'}}>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} style={{height:100, alignSelf:'center'}}>
                          <Card style={{height:100, display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Checkbox
                              icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />}
                              checked={logoSelect[value.alt] || false}
                              onChange={HandleSelectLogo}
                              name={value.alt}
                              color="primary"
                              style={{ width:40, alignSelf:'center', }}
                            />
                          </Card>
                        </Grid>
                        <Grid item xl={9} lg={9} md={9} sm={9} xs={9} style={{alignSelf:'center'}}>
                            <Card style={{padding:5}}>
                              <Suspense>
                                <img
                                  src={value.src}
                                  width='100%' 
                                  alt={value.src}
                                />
                              </Suspense>
                            </Card>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Dialog>
            <Dialog open={openAddCadena} onClose={()=>setOpenAddCadena(false)} maxWidth={'md'} style={{overflowX:'hidden', overflowY:'hidden'}}>
              <DialogContent>
                <Grid container justify='center' spacing={1} style={{padding:10, overflowX:'hidden', overflowY:'hidden'}}>
                  <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                    <TextField
                      name='cadena'
                      variant='outlined'
                      placeholder='Cadena'
                      value={addForm.cadena || ''} 
                      fullWidth
                      margin='dense'
                      onChange={HandleAddCade}
                      color='primary'
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                    <TextField
                      name='local'
                      variant='outlined'
                      placeholder='Local'
                      value={addForm.local || ''} 
                      fullWidth
                      margin='dense'
                      onChange={HandleAddCade}
                      color='primary'
                    />
                  </Grid>
                  <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField
                      name='ciudad'
                      variant='outlined'
                      placeholder='Ciudad'
                      value={addForm.ciudad || ''} 
                      fullWidth
                      margin='dense'
                      onChange={HandleAddCade}
                      color='primary'
                    />
                  </Grid>
                  <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField
                      name='provincia'
                      variant='outlined'
                      placeholder='Provincia'
                      value={addForm.provincia || ''} 
                      fullWidth
                      margin='dense'
                      onChange={HandleAddCade}
                      color='primary'
                    />
                  </Grid>
                  <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField
                      name='sector'
                      variant='outlined'
                      placeholder='Sector'
                      value={addForm.sector || ''} 
                      fullWidth
                      margin='dense'
                      onChange={HandleAddCade}
                      color='primary'
                    />
                  </Grid>
                  <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                    <TextField
                      name='direccion'
                      variant='outlined'
                      placeholder='direccion'
                      value={addForm.direccion || ''} 
                      fullWidth
                      margin='dense'
                      onChange={HandleAddCade}
                      color='primary'
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <Button  margin='dense' fullWidth color="primary" size="medium" startIcon={<SaveIcon />} variant="contained" onClick={HandleSaveCadena} style={{position:'relative', top:10}}>
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            <Grid item xl={12} lg={12} md={12} sm={12}>
              <AppBar position='static'>
                <Toolbar variant='dense' className={classes.toolbar}>
                  <Typography variant="h6" style={{color:'#fff'}}>
                    {`Cronograma ${numproCrono} `}
                  </Typography>
                  <div style={{height:50, display:'flex', flexDirection:'row'}}>
                    <Tooltip arrow placement='top' title='Back'>
                      <Link to='/cronogramadd' style={{ textDecoration: 'none' }}>
                        <IconButton color='secondary'>
                          <BackIcon/>
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip arrow placement='top' title='Logo'>
                        <IconButton color='secondary' onClick={HandleOpenDialog}>
                          <InsertPhotoIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement='top' title='Filtrar'>
                      <IconButton color='secondary'onClick={()=>{setFilterActive(!isFilterActive)}}>
                        <FilterListIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement='top' title='PDF'>
                      <IconButton color='secondary'onClick={HandlePdfCreate}>
                        { isPdf ? <PrintIcon /> : <PrintDisabledIcon/>}
                      </IconButton>
                    </Tooltip>
                    {isPdf && <App datos={informacion} dat={dataPdf} stateLogos={logoSelect} headers={headersToPdf}/>}
                  </div>
                  <div className={classes.search}>
                    <TextField
                      id='search'
                      variant='outlined'
                      placeholder='Buscar..'
                      value={search || ''} 
                      InputProps={{startAdornment: (<InputAdornment position="start" ><SearchIcon color='secondary'/></InputAdornment>)}}
                      fullWidth
                      margin='dense'
                      onChange={HandleSearch}
                      color='secondary'
                      onKeyUp={(e)=>{
                        const code = e.keyCode || e.which;
                        if(code === 8)
                            HandleFilterSearch();
                      }}
                    />
                  </div>
                  <Tooltip arrow placement='top' title='Agregar'>
                    <Fab color='secondary' size='small' className={classes.add} onClick={HandleAdd}>
                      <AddIcon/>
                    </Fab>
                  </Tooltip>
                  <Tooltip arrow placement='top' title='Agregar Cadenas'>
                    <Fab color='secondary' size='small' className={classes.add} onClick={HandleAddCadena}>
                      <BallotIcon style={{color:'#eee'}}/>
                    </Fab>
                  </Tooltip>
                </Toolbar>
              </AppBar>
            </Grid>
          
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{minHeight:'72vh', padding:0, display:'block'}} >
            <TableContainer style={{maxHeight:'80vh'}}>
                <Table stickyHeader aria-label="Cronograma">
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={data.length}
                      headCells={headers}
                    />
                  <TablContext.Provider value={{isEdit, setEdit, data, setData, dataState, setDataState, numproCrono}}>
                  <TableBody>
                    {isFilterActive &&
                      <TableRow>
                        {
                          headers.map((value,index)=>{ 
                          if(index === 0){
                            return(                         
                              <TableCell align="center" key={'Filtro'+index}>
                              </TableCell>
                            )
                          }else{
                            return(                         
                              <TableCell align="center" key={'Filtro'+index}>
                                <TextField 
                                  id={value.title} 
                                  value={filtro[value.title]|| ''} 
                                  margin="dense" 
                                  fullWidth
                                  color='secondary'
                                  InputProps={{startAdornment: (<InputAdornment position="start"><FilterListIcon /></InputAdornment>)}}
                                  onChange={HandleFiltros}
                                  onKeyUp={(e)=>{
                                    const code = e.keyCode || e.which;
                                    if(code === 8)
                                        HandleFilterNumpro();
                                  }}
                                />
                              </TableCell>
                            )
                          }
                          })
                      }
                    </TableRow>
                      }
                      { 
                        stableSort(data, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((value,index)=>
                        ( 
                          <Roow 
                            info={value} 
                            cadens={cadens} 
                            headers={headers} 
                            cadenas={cadenas} 
                            indexN={index} 
                            key={`${value.id}.${index}`}
                            getInfoOp={getInfoOp}
                            getEncabezados={getEncabezados}
                            handleCreateNumNE={handleCreateNumNE}
                          />
                        ))   
                      }
                  </TableBody>
                  </TablContext.Provider>
                </Table>
            </TableContainer>
          </Grid>
        </Grid>
    )
}

const App = (props) => { 
  const { datos, stateLogos, dat, headers } = props;

  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },
    image: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '125%',
        width: '100.1%',
        margin:'auto'
    },
    image2: {
      display: 'block',
      margin: 'auto',
      width:'90%'
    },
    clienteBox:{
      position:'relative',
      top:10,
      left:180,
      width:400,
      height:40,
      textAlign:'center'
    },
    cliente:{
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      fontSize:14
    },
    numpro: {
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      marginTop:-20,
      position:'relative',
      top:-2,
      left:770
    },
    proyectoBox: {
      width: 380,
      height:72,
      textAlign:'center',
      position:'relative',
      left:10,
      marginTop:56,
      marginBottom:13,
      display:'flex',
      flexDirection:'row',
    },
    proyecto: {
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      fontSize:16,
      alignSelf:'center'
    },
    headers:{
      textAlign: 'center'
    },
    containerTable:{
      width: 808.5, 
      marginTop:0,
      marginLeft:17,
    },
    table: { 
      display: "table", 
      width:'100%',
      borderWidth:1,
      borderStyle: "solid", 
      borderRightWidth: 0, 
      borderBottomWidth: 0,
      borderColor:'#fff',
    },
    tableRow: {
       margin: "auto", 
       flexDirection: "row" ,
       backgroundColor:grey[300],
       height:21
      }, 
    tableRow2: {
       margin: "auto", 
       flexDirection: "row" ,
       backgroundColor:blue[300],
       height:20,
      }, 
    tableCol: { 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      width: `${100 / headers.length}%`,
      borderColor:'#fff'
    }, 
    tableRowHeader: {
      margin: "auto", 
      flexDirection: "row" ,
      backgroundColor:lime[600],
      color:'#fff',
     }, 
    tableColHeader: { 
      width: `${100 / headers.length}%`,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      borderColor:'#fff',
      display:'flex',
      justifyContent:'center'
    }, 
    tableCellHeader:{
      margin: "auto",  
      fontSize: 10,
      width:'100%',
      textAlign:'center',
      fontFamily: 'Roboto-BlackCursive',
    },
    tableCell: { 
      margin: "auto", 
      fontSize: 6,
      width:'100%',
      textAlign:'center',
    },
    tableCellDir: { 
      margin: "auto", 
      fontSize: 4,
      width:'100%',
      textAlign:'center',
    },
    logounit:{
      objectFit:'fill',
      borderRadius:5
    },
    logos:{
      width:220,
      height:115,
      marginLeft: 601,
      marginTop:-125,
      marginBottom:12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center',
    },
    logodual:{
      width:106,
      height:56,
      alignSelf:'center',
      margin:'1px 2px'
    }
  });
  
  Font.register({family: 'Oswald',src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'});

  Font.register({ family: 'Roboto-BlackCursive', src:'fonts/Roboto-BlackItalic.ttf'});

  const LogosPicture = () =>{
    if(stateLogos.Cliente && stateLogos.Cadena){
      return(
        <>
          <View style={styles.logodual} >
            <ImagePdf source={`logos/Cliente/${datos.cliente}.jpg`} style={styles.logounit} />
          </View>
          <View style={styles.logodual} >
            <ImagePdf source={`logos/Cadena/${datos.items[0].Cadena}.jpg`} style={styles.logounit} />
          </View>
        </>
      )
    }else{
      if(stateLogos.Cliente){
        return(
          <ImagePdf source={`logos/Cliente/${datos.cliente}.jpg`} style={styles.logounit} />
        )
      }else if(stateLogos.Cadena){
        return( 
          <ImagePdf source={`logos/Cadena/${datos.items[0].Cadena}.jpg`} style={styles.logounit} />
        )
      }else{
        return( 
          <View></View>
        )
      }
    }
  };


  const MyDoc =(
    <Document>
      <Page size="A4" orientation="landscape" wrap>
          <ImagePdf source="images/cronoprin.jpg" style={styles.image} fixed/>
          <View style={styles.clienteBox} wrap fixed>
            <Text style={styles.cliente}  >
              {datos.cliente}
            </Text>
          </View>
          <Text style={styles.numpro} fixed >
            {datos.numpro}
          </Text>
          <View style={styles.proyectoBox} wrap fixed>
            <Text style={styles.proyecto}>
              {datos.proyecto}
            </Text>
          </View>
          <View style={styles.logos} fixed>
            <LogosPicture />
            
          </View>
          <View style={styles.containerTable} wrap>
            {/* TableHeader */}
            <View style={styles.tableRowHeader} fixed> 
                  {
                    headers.map((value,index)=>{
                      if(index > 4){
                        return( 
                          <View style={styles.tableColHeader} key={`header${index}`}> 
                            <ImagePdf source={value.src === ''? '/fotosIns/ImagenCr.jpg' : value.src } style={styles.image2}/>
                            <Text style={styles.tableCellHeader}>{value.tiptra}</Text> 
                          </View>
                        )
                      }else if(index === 4){
                        return( 
                          <View style={styles.tableColHeader} key={`header${index}`}> 
                            <Text style={styles.tableCellHeader}>FECHA DE INSTALACIÓN</Text> 
                          </View>
                        )
                      }else{ 
                        return( 
                          <View style={styles.tableColHeader} key={`header${index}`}> 
                            <Text style={styles.tableCellHeader}>{value.tiptra}</Text> 
                          </View>
                        )
                      }
                    })
                  }
                </View> 
             
              {/* TableContent */} 
              {dat.map((value1,index)=>{
                  return( 
                    <View style={styles.tableRow} key={`row${index}`}> 
                      {headers.map((value,index)=>{
                        if(index === 2){
                          return(
                            <View style={styles.tableCol} key={`rows${index}`}> 
                              <Text style={styles.tableCellDir}>{value1[value.tiptra]}</Text> 
                            </View> 
                          )
                        }else{
                          return(
                            <View style={styles.tableCol} key={`rows${index}`}> 
                              <Text style={styles.tableCell}>{value1[value.tiptra]}</Text> 
                            </View> 
                          )
                        }
                        
                        })
                      }
                    </View> 
                  )
                
                })
              }
            
          </View>
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document: MyDoc });

  if (instance.loading) {
    return <FacebookCircularProgress size={25} style={{marginTop:10, marginRight:5}}/>;
  }

  if (instance.error) { 
    console.log(instance.error)
    throw new Error(instance.error)
    return <div>Something went wrong: {instance.error}</div>;

  }


  return( 
    <IconButton color="secondary" aria-label="pdf" href={instance.url} target="_blank" size='small' style={{backgroundColor:'#0E3B5F', marginTop:8, marginRight:5}}>
        <Tooltip title='PDF'placement='right' arrow >
            <PdfIcon  />
        </Tooltip>
    </IconButton>
    
  );

  
};

const Roow = (props) =>{
  const { setEdit, data, setData, setDataState, numproCrono } = useContext(TablContext);
  const { info, cadens, headers, indexN, getInfoOp, getEncabezados, handleCreateNumNE } = props;
  const [iconsEdit, setIconsEdit] = useState(info.tipo?false:true);
  const [open, setOpen] = useState(false);
  const [ formulario, setFormulario ] = useState({id:info.id});
  const [ infoAnt , setinfoAnt] = useState({})
  const [ locales, setLocales ] = useState([]);
  const [ cont, setCont ] = useState(0);
  const [ isDisabled, setDisabled] = useState(info.tipo?false:true);
  const [ insta, setInsta ] = useState([]);
  const [ isCreateNE, setCreateNE ] = useState(false);
  const [ getDetalles, setDetalles ] = useState([]);
  const { Personal } = info;

  
  // useEffect(()=>{
  //   if(isCreateNE){
  //     setCreateNE(false);
  //   }
  // },[isCreateNE])

  useEffect(()=>{
    //console.log(info);
    let objeto = {};
    let num = headers.length - 1;
    headers.forEach((value,index)=>{
      objeto[value.title] = info[value.title]
      if(index === num){
        if(info.tipo){
          setFormulario(objeto);
          setinfoAnt(objeto);
        }else{
          //objeto.id = info.id;
          setFormulario(info);
          setinfoAnt(info);
        }
        
      }
    });
    try{   
      const arr = [];
      Personal.forEach((value,index)=>{
        if(value.instalador){
          arr.push(`${value.instalador}, `);
        }
      });
      setInsta(arr);
    }catch(err){
      setInsta(formulario.Personal)
    }
    const keys = Object.keys(info)
    const tips = getEncabezados.map(el=>el.tiptra);
    const arrTips = [];
    for(const x in keys){
      if(tips.includes(keys[x]))
        arrTips.push({tiptra:keys[x], value:info[keys[x]]})
    }
    setDetalles(arrTips);
    
  },[] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const HandleIcons = () =>{
    setIconsEdit(!iconsEdit);
    setDisabled(!isDisabled);
  };

  const HandleDelete = () =>{
    fetch('Crono_Items',{
      method: 'DELETE',
      body: JSON.stringify({numpro:numproCrono, item:formulario}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=> res.json())
    .then(result =>{
      if(result.message){
        setEdit(false);
        setDataState(true);
        HandleIcons();
      }else{
        alert(result.status)
      }
    })
  };

  const HandleSave = () =>{
    if(info.tipo){
      if(formulario.Cadena === undefined){
        alert('Ingrese Informacion');
        const arr = new Array(data);
        arr[0].pop();
        setData(arr[0]);
        setEdit(false);
        HandleIcons();
      }else{
        let arr = {...formulario};
        arr.fecer = new Date();
        arr.id = uuidv4();
        fetch('Crono_Items',{
          method: 'POST',
          body: JSON.stringify({numpro:numproCrono, item:arr}),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(res=> res.json())
        .then(result =>{
          if(result.message){
            setEdit(false);
            setDataState(true);
            HandleIcons();
          }else{
            alert(result.status)
          }
        })
      }
      
    }else{
      let arr = {...formulario};
      arr.fecer = new Date();
      fetch('Crono_Items',{
        method: 'PUT',
        body: JSON.stringify({numpro:numproCrono, item:arr}),
        headers:{ 'Content-Type': 'application/json' }
      })
      .then(res=> res.json())
      .then(result =>{
        if(result.message){
          setEdit(false);
          setDataState(true);
          HandleIcons();
        }else{
          alert(result.status)
        }
      })
    }
      
  };

  const HandleCancelar = () =>{
    if(info.tipo){
      const arr = new Array(data);
      arr[0].pop();
      setData(arr[0]);
      setEdit(false);
    }else{
      setOpen(!open);
      setIconsEdit(!iconsEdit);
      setDisabled(!isDisabled);
      setFormulario(infoAnt);
    }
  };

  const HandleTipsTras = ({target}) =>{
    setFormulario({...formulario, [target.name]:target.value});
  };

  const handleTipElem = ({target})=>{
    setFormulario({...formulario, TipoElemento:target.value});
  };

  const handleCreatePdf = useCallback(() => {setCreateNE(back=> !back)},[isCreateNE]);
  
  const handlePdf = async ()=>{
    if(formulario.numNE){
      setCreateNE(back=> !back);
    }else{
      const infoNE = await handleCreateNumNE();
      let infoForm = {...formulario, numNE:infoNE.numNE};
      infoForm.fecer = new Date();
      fetch('Crono_Items',{
        method: 'PUT',
        body: JSON.stringify({numpro:numproCrono, item:infoForm}),
        headers:{ 'Content-Type': 'application/json' }
      })
      .then(res=> res.json())
      .then(async (result) =>{
        if(result.message){
          const arr = await Promise.all(data.map(el=>{
            if(el.id === info.id){
              return{
                ...el,
                numNE:infoNE.numNE
              }
            }else{
              return el;
            }
          }));
          setFormulario({...formulario, numNE:infoNE.numNE});
          setData(arr);
          setCreateNE(back=> !back);
        }else{
          alert(result.status)
        }
      })
      
    }
    
  };


  return(
    <TableRow>
      {
        headers.map((value,index)=>{
          switch(index){
            case 0 :
              return(
                <TableCell component="th" scope="row" key={`cell${value.title}-${indexN}`}>
                  {
                    iconsEdit
                    ?
                    <Box style={{width:130}}>
                      <Grid 
                        container
                        justifyContent='spacing-between'
                        alignContent='center'>
                        <Grid item>
                          <Tooltip placement='top' arrow title='Editar' >
                            <span>
                              <IconButton size='small' color='primary' onClick={HandleIcons}>
                                <EditIcon/>
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip placement='top' arrow title='Eliminar' >
                            <span>
                            <IconButton size='small' color='primary' onClick={HandleDelete}>
                              <DeleteIcon />
                            </IconButton>
                          </span>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip placement='top' arrow title='Crear Nota Entrega' >
                            <span>
                            <IconButton size='small' color='primary' onClick={handlePdf}>
                              <PdfIcon  />
                            </IconButton>
                          </span>
                          </Tooltip>
                        </Grid>
                        {isCreateNE &&
                        <Grid item style={{display:'grid', placeContent:'center'}}>
                           <NotaEntrega 
                            dataPdf={getInfoOp} 
                            handleCreatePdf={handleCreatePdf} 
                            formulario={formulario} 
                            getDetalles={getDetalles}/>
                        </Grid>
                        } 
                      </Grid>
                    </Box>
                    :
                    <Box style={{width:130}}>
                      <IconButton size='small' color='primary' onClick={HandleSave}>
                        <SaveIcon/>
                      </IconButton>&nbsp;
                      <Tooltip placement='right' arrow title='Cancelar' >
                        <IconButton size='small' color='primary' onClick={HandleCancelar}>
                          <CloseIcon/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                </TableCell>
              )
            case 1 :
              return(
                <TableCell style={{minWidth:200, textAlign:'center'}} key={`cell${value.title}-${indexN}`}>
                  <Autocomplete
                    id={`cell${value.title}-${indexN}`}
                    options={cadens}
                    size='small'
                    inputValue={formulario.Cadena || ''}
                    getOptionLabel={option => option.cadena}
                    disabled={isDisabled}
                    renderInput={params => <TextField {...params} variant="outlined" />}
                    onInputChange={(e,value)=>{ 
                      if(cont < 1){
                        setCont(cont + 1);
                      }else{
                        if(value === ''){
                          setFormulario({
                            id:info.id,
                            Cadena:'',
                            Local:'',
                            Ciudad:'',
                            Sector:'',
                            Direccion:''
                          })
                        }else{
                          new Promise(resolve => {
                            let url = 'fetch_soloLocales'
                            fetch(url,{
                              method: 'POST',
                              body: JSON.stringify({cadena:value}),
                              headers:{
                                'Content-Type': 'application/json'
                              }
                            })
                            .then(response => response.json())
                            .then(result => {
                              setLocales(result);
                              setFormulario({...formulario, Cadena:value});
                              resolve();
                            });
                          })
                        }
                        
                      }
                    }}
                  />
                </TableCell>
              );
            case 2 :
              return(
                <TableCell style={{minWidth:250, textAlign:'center'}} key={`cell${value.title}-${indexN}`}>
                  <Autocomplete
                    id={`cell${value.title}-${indexN}`}
                    options={locales}
                    size='small'
                    inputValue={formulario.Local || ''}
                    getOptionLabel={option => option.local}
                    disabled={isDisabled}
                    renderInput={params => <TextField {...params}  variant="outlined" />}
                    onInputChange={(e,value)=>{ 
                      if(cont < 1){
                        setCont(cont + 1);
                      }else{
                        new Promise(resolve => {
                          let url = 'fetch_datosOp';
                          fetch(url,{
                            method: 'POST',
                            body: JSON.stringify({cadena:formulario.Cadena,local:value}),
                            headers:{
                              'Content-Type': 'application/json'
                            }
                          })
                          .then(response => response.json())
                          .then(result => {
                            setFormulario({...formulario, 
                                            Local:result[0].local,
                                            Ciudad:result[0].ciudad,
                                            Sector:result[0].sector,
                                            Direccion:result[0].direccion,
                                            Provincia:result[0].provincia});
                          }) 
                          resolve();
                        })
                      }
                    }}
                  />
                </TableCell>
              );
            case 3 :
              return(
                <TableCell style={{minWidth:180, textAlign:'center'}} key={`cell${value.title}-${indexN}`}>
                  <TextField                    
                    size="small" 
                    fullWidth
                    disabled 
                    variant="outlined" 
                    value={formulario.Ciudad || ''}
                  />
                </TableCell>
              );
            case 4 :
              return(
                <TableCell style={{minWidth:200, textAlign:'center'}} key={`cell${value.title}-${indexN}`}>
                  <TextField 
                    size="small" 
                    multiline
                    fullWidth
                    disabled 
                    variant="outlined" 
                    value={formulario.Sector || ''}
                  />
                </TableCell>
              );
            case 5 :
              return(
                <TableCell style={{minWidth:350}} key={`cell${value.title}-${indexN}`}>
                  <TextField 
                    size="small" 
                    fullWidth
                    disabled 
                    multiline
                    variant="outlined" 
                    value={formulario.Direccion || ''}
                  />
                </TableCell>
              );
            case 6:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                  <TextField 
                    size="small" 
                    fullWidth
                    disabled 
                    variant="outlined" 
                    value={info.insStart || ''}
                    style={{width:120}}
                  />
                </TableCell>
              );
            case 7:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                   <TextField 
                    size="small" 
                    fullWidth
                    disabled 
                    variant="outlined" 
                    value={info.insAgr || ''}
                    style={{width:120}}
                  />
                </TableCell>
              );
            case 8:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                    <TextField 
                      size="small" 
                      fullWidth
                      disabled 
                      variant="outlined" 
                      value={info.insFin || ''}
                      style={{width:120}}
                    />
                </TableCell>
              );
            case 9:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                    <TextField 
                      size="small" 
                      fullWidth
                      disabled 
                      variant="outlined" 
                      value={info.insHora || ''}
                      style={{width:80}}
                    />
                </TableCell>
              );
            case 10:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                     <TextField 
                      size="small" 
                      fullWidth
                      disabled 
                      multiline
                      variant="outlined" 
                      value={insta || ''}
                      style={{width:250}}
                    />
                </TableCell>
              );
            case 11:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                  <TextField 
                    label="Dias" 
                    size="small"
                    name='Garantia' 
                    fullWidth
                    type='Number'
                    disabled={isDisabled}
                    onChange={HandleTipsTras}
                    variant="outlined" 
                    value={formulario.Garantia || ''}
                  />
                </TableCell>
              );
            case 12:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                  <TextField 
                    size="small"
                    name='Observacion' 
                    fullWidth
                    disabled={isDisabled}
                    value={formulario.Observacion || ''}
                    onChange={HandleTipsTras}
                    variant="outlined" 
                    style={{width:200}}
                    multiline
                  />
                </TableCell>
              );
              case 13:
                return(
                  <TableCell key={`cell${value.title}-${indexN}`}>
                    <TextField 
                      size="small"
                      name='Instalacion' 
                      fullWidth
                      disabled={isDisabled}
                      value={formulario.TipoElemento || 'Instalacion'}
                      onChange={handleTipElem}
                      variant="outlined" 
                      style={{width:200}}
                      select
                    >
                      {
                        TipoElementos.map((el,index)=>                                   
                        <MenuItem value={el} key={`${index}_${el}`}>
                            {el}
                        </MenuItem>
                        )
                      }
                    </TextField>
                  </TableCell>
                );
            default:
              return(
                <TableCell key={`cell${value.title}-${indexN}`}>
                  <TextField 
                    size="small" 
                    id={`cell${value.title}-${indexN}`}
                    name={value.title}
                    fullWidth={true} 
                    type='Number'
                    variant="outlined" 
                    value={formulario[value.title] || ''}
                    disabled={isDisabled}
                    onChange={HandleTipsTras}
                    style={{textAlign:'center', width:180}}
                  />
                </TableCell>
              );
          }
        })
      }
    </TableRow>
  );
};

export default CronogramaTable;