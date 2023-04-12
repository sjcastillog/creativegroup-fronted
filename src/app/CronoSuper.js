import React, { useState, useEffect, useContext, createContext} from 'react';
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {  
          Backdrop,
          Box, 
          Button, 
          Checkbox,
          CircularProgress,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          Fab, 
          Grid,
          IconButton, 
          InputBase,
          InputAdornment,
          MenuItem,
          Paper,
          Table,
          TableBody,
          TableCell,
          TableContainer,
          TableHead,
          TablePagination,
          TableSortLabel,
          TableRow,
          TextField,
          Tooltip,
        } from '@material-ui/core';
import {  
          Add as AddIcon,
          CheckBox as CheckBoxIcon,
          CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
          Close as CloseIcon,
          Edit as EditIcon,
          FilterList as FilterListIcon,
          FirstPage as FirstPageIcon,
          KeyboardArrowLeft,
          KeyboardArrowRight,
          LastPage as LastPageIcon,
          PictureAsPdf as PdfIcon,
          Print as PrintIcon,
          Save as SaveIcon,
          Search as SearchIcon,
        } from '@material-ui/icons';
import { 
          Autocomplete,
        } from '@material-ui/lab';
import { lime, grey } from '@material-ui/core/colors';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useAuth } from "./Auth";
import ExcelComponent from './ExcelComponent';
import FacebookCircularProgress from './Elementos/FacebookCircularProgress';


const SnackContext = createContext();

const useStyles = makeStyles((theme)=>({
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 10,
  },
  speedDial: {
    position:'absolute',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
    color:'#fff'
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

/*const InstaladoresCompleto = [
  {instalador: "ALAVA ALVAREZ MIGUEL HERNAN"},
  {instalador: "ALVAREZ GURUMENDI MIGUEL ROGELIO"},
  {instalador: "ALVEAR BOWEN ALEXIS DARIO"},
  {instalador: "ASENCIO ORRALA WALTER ENRIQUE"},
  {instalador: "ASENCIO ORRALA SERGIO GABRIEL"},
  {instalador: "BAJAÑA NIETO SIXTO ROBIN"},
  {instalador: "BARCIA CHOEZ JAVIER IGNACIO"},
  {instalador: "BARCIA CHOEZ MIGUEL ANGEL"},
  {instalador: "BASTIDAS RODRIGUEZ LUIS VICENTE"},
  {instalador: "BOHORQUEZ JAIME IVAN JAVIER"},
  {instalador: "BOZADA CHOEZ LUIS ALBERTO"},
  {instalador: "BRIONES VERA ALEX DAVID"},
  {instalador: "CABEZAS LOOR ELI DAVID"},
  {instalador: "CANDELARIO ESPINALES CRISTOPHER"},
  {instalador: "CANTOS INTRIAGO CRISTHIAN VICENTE"},
  {instalador: "CASTRO SOLEDISPA HENRY OMAR"},
  {instalador: "CEDEÑO PARRALES DAVID MARCELO"},
  {instalador: "CHARCOPA BONE GONZALO ALFREDO"},
  {instalador: "CHOEZ QUIMIS RICHARD GEOVANNY"},
  {instalador: "ESPINOZA GONZALEZ LEONARDO HUGO"},
  {instalador: "FLORES VILLAMAR JOSE RAFAEL"},
  {instalador: "GOMEZ PEREZ LUIS ALBERTO"},
  {instalador: "GUAMBO GUAMAN CARLOS LUIS"},
  {instalador: "GUARANDA MANZABA RAUL MAURICIO"},
  {instalador: "GUERRERO VERA CRISTOBAL ANDRES"},
  {instalador: "LAINEZ JAIME ANDY ALEX"},
  {instalador: "LAINEZ JAIME DAVID DARWIN"},
  {instalador: "LEON GONZALEZ JUAN ALBERTO"},
  {instalador: "LITARDO GONZALES YUSTHYN JARIB"},
  {instalador: "MAYER VERNAZA GUILLERMO ANDRES"},
  {instalador: "MENDOZA DE LA A MANUEL ANTONIO"},
  {instalador: "MERO CHILAN ERWIN"},
  {instalador: "MERCHAN MACIAS CHRISTOPHER ANDERSON"},
  {instalador: "MONTOYA BOHORQUEZ GUILLERMO JEFFERSON"},
  {instalador: "MORALES YAMBAY PETER ELIAN"},
  {instalador: "MURILLO MOSQUERA JIMMY JOEL"},
  {instalador: "MILTON EDUARDO CORDERO ARMIJOS"},
  {instalador: "NAVARRETE UBILLA GUSTAVO FABIAN"},
  {instalador: "OREJUELA ORTIZ OSCAR"},
  {instalador: "ORDOÑEZ CHEME FABRICIO JAVIER"},
  {instalador: "ORRALA YAGUAL WILLIAM JEFFERSON"},
  {instalador: "ORTEGA ALARCON MIGUEL ALFONSO"},
  {instalador: "PAREDES AQUINO CHRISTIAN ENRIQUE"},
  {instalador: "PAZ TENORIO DARWIN GREGORIO"},
  {instalador: "PIBAQUE MERO LUIS ALFREDO"},
  {instalador: "PINEDA ARRIAGA BOLIVAR ANTONIO"},
  {instalador: "PINEDA ARRIAGA DARIO JAVIER"},
  {instalador: "RIVAS VERA WELLIGNTON MICHAELL"},
  {instalador: "ROMERO RIVERA JEFFERSON KLEINE"},
  {instalador: "SEGURA RIVERA CHRISTIAN ALBERTO"},
  {instalador: "TORRES IGLESIAS MIGUEL STEVEN"},
  {instalador: "TUPACYUPANQUI TROYA JORGE MICHAEL"},
  {instalador: "VALLE YAGUAL FERNANDO GUSTAVO"},
  {instalador: "VEINTIMILLA MATEO MIGUEL LEOPOLDO"},
  {instalador: "VELIZ GAMBOA ALBERTO LUCIANO"},
  {instalador: "VILLAFUERTE MALDONADO FREDY PAQUITO"},
  {instalador: "VILLAFUERTE SOLEDISPA CESAR ANTONIO"},
  {instalador: "ZAMORA PONGUILLO BYRON UFREDO"},    
  {instalador: "VILLAFUERTE SOLEDISPA CESAR ANTONIO"},
];*/

const Instaladores = [
  {instalador: "ALAVA HERNAN"},
  {instalador: "ALVAREZ ROGELIO"},
  {instalador: "ALVEAR DARIO"},
  {instalador: "AREVALO RICARDO"},
  {instalador: "ASENCIO WALTER"},
  {instalador: "ASENCIO SERGIO"},
  {instalador: "AVILA JOSE"},
  {instalador: "BAJAÑA SIXTO"},
  {instalador: "BARCIA AVIER"},
  {instalador: "BARCIA MIGUEL"},
  {instalador: "BASTIDAS VICENTE"},
  {instalador: "BOHORQUEZ IVAN"},
  {instalador: "BOZADA LUIS"},
  {instalador: "BRIONES ALEX"},
  {instalador: "CABEZAS ELI"},
  {instalador: "CANDELARIO CRISTOPHER"},
  {instalador: "CANTOS CRISTHIAN"},
  {instalador: "CASTRO OMAR"},
  {instalador: "CEDEÑO DAVID"},
  {instalador: "CHARCOPA GONZALO"},
  {instalador: "CHOEZ RICHARD"},
  {instalador: "ESPINOZA LEONARDO"},
  {instalador: "FLORES JOSE"},
  {instalador: "GOMEZ LUIS"},
  {instalador: "GOYA STALIN"},
  {instalador: "GUAMBO CARLOS"},
  {instalador: "GUARANDA RAUL"},
  {instalador: "GUERRERO CRISTOBAL"},
  {instalador: "LAINEZ ANDY"},
  {instalador: "LAINEZ DAVID"},
  {instalador: "LEON JUAN"},
  {instalador: "LITARDO YUSTHYN"},
  {instalador: "MAYER ANDRES"},
  {instalador: "MENDOZA MANUEL"},
  {instalador: "MERO ERWIN"},
  {instalador: "MERCHAN CHRISTOPHER"},
  {instalador: "MONTOYA GUILLERMO"},
  {instalador: "MORALES PETER"},
  {instalador: "MURILLO JIMMY"},
  {instalador: "CORDERO EDUARDO"},
  {instalador: "NAVARRETE GUSTAVO"},
  {instalador: "OREJUELA OSCAR"},
  {instalador: "ORDOÑEZ FABRICIO"},
  {instalador: "ORRALA WILLIAM"},
  {instalador: "ORTEGA MIGUEL"},
  {instalador: "PAREDES CHRISTIAN"},
  {instalador: "PAZ DARWIN"},
  {instalador: "PIBAQUE LUIS"},
  {instalador: "PINEDA BOLIVAR"},
  {instalador: "PINEDA DARIO"},
  {instalador: "REYES DIEGO"},
  {instalador: "RIVAS MICHAELL"},
  {instalador: "ROMERO JEFFERSON"},
  {instalador: "SEGURA CHRISTIAN"},
  {instalador: "TORRES MIGUEL"},
  {instalador: "TUPACYUPANQUI MICHAEL"},
  {instalador: "VALLE FERNANDO"},
  {instalador: "VEINTIMILLA MIGUEL"},
  {instalador: "VELIZ ALBERTO"},
  {instalador: "VILLAFUERTE FREDY"},
  {instalador: "VILLAFUERTE CESAR"},
  {instalador: "ZAMORA BYRON"},    
  {instalador: "LAINEZ JAIME ANDY ALEX"},
  {instalador: "RIVAS VERA WELLINGTON MICHAELL"},
  {instalador: "ASPIAZU TIGRERO JUAN CARLOS"},
  {instalador: "MONTOYA BOHORQUEZ GUILLERMO JEFFERSON"},
  {instalador: "VALENCIA IGLESIAS ERNESTO LEONARDO"},
  {instalador: "BRIONES JORDAN JOSE RICARDO"},
  {instalador: "ALAVA VELASQUEZ OMAR FREDDY"},
  {instalador: "BARRE MORAN ANDRES FABRICIO"},
  {instalador: "MORALES YAMBAY PETER ELIAN"},  
  {instalador: "MORENO BURGOS RAUL ANDRES"},
  {instalador: "OROBIO VASQUEZ LEUVIS MOISES"},

];

const dataHorario = [
  {title:'Apertura'},
  {title:'Durante el Día'},
  {title:'En el Cierre'},
];

const TextFieldDense = withStyles((theme)=>({
  input:{
    fontSize: 12,
    borderRadius: 4,
    border: '1px solid #ced4da',
    width: '100%',
    margin:0,
    textAlign:'center',
    paddingTop:8
  }
}))(InputBase);

const Roow = (props)=>{
  const { row, headCells } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [open, setOpen] = useState(false);
  const [iconsEdit, setIconsEdit] = useState(true);
  const [insS, setInsS] = useState(row.insStart);
  const [insF, setInsF] = useState(row.insFin);
  const [insA, setInsA] = useState(row.ainsAgr);
  const [insH, setInsH] = useState(row.insHora);
  const [ instaladors, setInstaladors ] = useState(row.Personal);
  const tipostrab = [row.tiptra];
  //const [ tipost, setTipost ] = useState([]);
  const [observacionM, setObservacionM] = useState(row.observacionM);   
  const { setOpenSn } = useContext(SnackContext);
  const { enqueueSnackbar } = useSnackbar();

  const HandleIcons = ()=>{
    setOpen(!open);
    setIconsEdit(!iconsEdit);
  };

  const HandleSave = () =>{
      fetch('Crono_ItemsFechas', {
        method: 'PUT',
        body: JSON.stringify({numpro:row.numpro, id:row.id, insStart:insS, insAgr:insA, insFin:insF, insHora:insH, Observacion:observacionM, Personal:instaladors}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(result => { 
          setOpenSn(true);
          setOpen(!open);
          setIconsEdit(!iconsEdit);
          enqueueSnackbar('Agregado', { variant:'success' });
      });
    
    
    
  };


  const HandleSelectInstaladores = (value)=>{
    setInstaladors(value); 
  };

  const tipost = [];
  
  tipostrab.forEach(value=>{
    if(tipostrab.length > 1){
      tipost.push(`${value}, `` `)
    }else{
      tipost.push(`${value}`)
    }
  });

  const Mapeado = headCells.map((value,index)=>{
    if(value.id === 'status'){
      return(
        <TableCell component="th" scope="row" key={`${value.id}-${row.id}`} style={{backgroundColor:'#eee', width:100, padding:0}} >
          {
            iconsEdit
            ?
            <Box style={{width:100, backgroundColor:'#eee', display:'flex', justifyContent:'center'}}>
              <Tooltip placement='top' arrow title='Editar' >
                <Fab size='small' color='primary' onClick={HandleIcons}>
                  <EditIcon/>
                </Fab>
              </Tooltip>
            </Box>
            :
            <Box style={{width:100}}>
              <Fab size='small' color='primary' onClick={HandleSave}>
                <SaveIcon/>
              </Fab>&nbsp;
              <Tooltip placement='right' arrow title='Cancelar' >
                <Fab size='small' color='primary' onClick={HandleIcons}>
                  <CloseIcon/>
                </Fab>
              </Tooltip>
            </Box>
          }
        </TableCell>
      )
    }else
    if(value.id === 'numpro'){
      return(
        <TableCell align="center" key={`${value.id}-${row.id}`}  style={{paddingLeft:4, paddingRight:4}}>
          <TextFieldDense
              variant="outlined"
              style={{width:90}}
              value={row[value.id] || 0}          
              margin="dense"
            />
        </TableCell>
      )
    }else
    if(value.id === 'Proyecto'){
      return(
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>
          <TextFieldDense
            id="Proyecto"
            variant="outlined"
            style={{width:300}}
            value={row.Proyecto}
            margin="dense"
            multiline
            color='secondary'
          />
        </TableCell>
      )
    }else
    if(value.id === 'insStart'){
      return(
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>
          <TextFieldDense
            id="Instalacion"
            variant="outlined"
            style={{width:150}}
            value={insS}
            onChange={(e) => {setInsS(e.target.value); setInsA(e.target.value)}}
            disabled={!open}
            margin="dense"
            type='date'
          />
        </TableCell>
      )
    }else
    if(value.id === 'ainsAgr'){
      return(
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>
          <TextFieldDense 
            id="Acuerdo"
            variant="outlined"
            style={{width:200}}
            value={insA}
            onChange={(e) => {setInsA(e.target.value)}}
            disabled={!open}
            margin="dense"
            type='date'
          />
        </TableCell>
      )
    }else
    if(value.id === 'insFin'){
      return(
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>
          <TextFieldDense
            id="Fin"
            variant="outlined"
            style={{width:150}}
            value={insF}
            onChange={(e) => {setInsF(e.target.value)}}
            disabled={!open}
            margin="dense"
            type='date'
          />
        </TableCell>
      )
    }else
    if(value.id === 'insHora'){
      return(
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}> 
          <Autocomplete
            id="free-solo-demo"
            disabled={!open}
            options={dataHorario.map((option) => option.title)}
            value={insH}
            onInputChange={(e, value) =>setInsH(value)}
            renderInput={(params) => (
              <TextField {...params} margin="dense"  variant="outlined" style={{width: 160, margin:0 }} />
            )}
          />    
        </TableCell>
      )
    }else
    if(value.id === 'Cadena'){
      return( 
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}} >
          <TextFieldDense
              variant="outlined"
              style={{width:200}}
              value={row[value.id] || ''}          
              margin="dense"
            />
        </TableCell>
      )
    }else
    if(value.id === 'Local'){
      return( 
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}} >
          <TextFieldDense
              variant="outlined"
              style={{width:200}}
              value={row[value.id] || ''}          
              margin="dense"
            />
        </TableCell>
      )
    }else
    if(value.id === 'Ciudad'){
      return( 
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>
          <TextFieldDense
              variant="outlined"
              style={{width:200}}
              value={row[value.id] || ''}          
              margin="dense"
            />
        </TableCell>
      )
    }else
    if(value.id === 'Sector'){
      return( 
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}} >
          <TextFieldDense
              variant="outlined"
              style={{width:200}}
              value={row[value.id] || ''}          
              margin="dense"
              multiline
            />
        </TableCell>
      )
    }else
    if(value.id === 'Direccion'){
      return( 
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>
          <TextFieldDense
              variant="outlined"
              multiline
              style={{width:250}}
              value={row[value.id] || ''}          
              margin="dense"
            />
        </TableCell>
      )
    }else
    if(value.id === 'observacion'){
      return(
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>    
          <TextFieldDense
            id="Observacion"
            variant="outlined"
            style={{width:150}}
            value={observacionM}
            onChange={(e)=>setObservacionM(e.target.value)}
            margin="dense"
            multiline
            color='secondary'
            disabled={!open}
          />
        </TableCell>
      )
    }else
    if(value.id === 'Personal'){
      return( 
        <TableCell align="center" key={`${value.id}-${row.id}`} style={{paddingLeft:4, paddingRight:4}}>
          <Autocomplete
            multiple
            id="Instaladores"
            size="small"
            disabled={!open}
            options={Instaladores}
            value={instaladors || []}
            onChange={(e,value)=>{HandleSelectInstaladores(value) }}
            getOptionLabel={(option) => option.instalador}
            renderOption={(option, { selected }) => (
                <React.Fragment style={{fontSize:10}}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                {option.instalador}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" fullWidth placeholder="Personal" style={{width:320}} />
            )}
          />                
        </TableCell>
      )
    }else
    if(value.id === 'tiptra'){
      return( 
        <TableCell style={{paddingLeft:4, paddingRight:4}} align="center" key={`${value.id}-${row.id}`}>
          <TextFieldDense
          variant="outlined"
          style={{width:150}}
          value={tipost || ''}          
          margin="dense"
          multiline
        />
      </TableCell>)
    }else
    if(value.id === 'tipser'){
      return( 
        <TableCell style={{paddingLeft:4, paddingRight:4}} align="center" key={`${value.id}-${row.id}`}>
          <TextFieldDense
          variant="outlined"
          style={{width:150}}
          value={row[value.id] || ''}          
          margin="dense"
        />
      </TableCell>)
    }else
    if(value.id === 'cantidad'){
      return( 
        <TableCell style={{paddingLeft:4, paddingRight:4}} align="center" key={`${value.id}-${row.id}`}>
          <TextFieldDense
          variant="outlined"
          style={{width:130}}
          value={row[value.id] || ''}          
          margin="dense"
        />
      </TableCell>)
    }
  })
  
  return(
      <TableRow key={`fila-${row.id}`}>
        {Mapeado}
      </TableRow>
  )
                      
};

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  //setDataPdf(stabilizedThis.map((el) => el[0]));
  return stabilizedThis.map((el) => el[0]);
  
};

const headCell = [
  { id: 'status', numeric: false, disablePadding: true, label: '...' },
  { id: 'numpro', numeric: true, disablePadding: false, label: 'Numpro' },
  { id: 'Proyecto', numeric: false, disablePadding: false, label: 'Proyecto' },
  { id: 'insStart', numeric: false, disablePadding: false, label: 'Inicio' },
  { id: 'ainsAgr', numeric: true, disablePadding: false, label: 'Acuerdo' },
  { id: 'insFin', numeric: false, disablePadding: false, label: 'Fin' },
  { id: 'insHora', numeric: false, disablePadding: false, label: 'Horario' },
  { id: 'Cadena', numeric: false, disablePadding: false, label: 'Cadena' },
  { id: 'Local', numeric: false, disablePadding: false, label: 'Local' },
  { id: 'Ciudad', numeric: false, disablePadding: false, label: 'Ciudad' },
  { id: 'Sector', numeric: false, disablePadding: false, label: 'Sector' },
  { id: 'Direccion', numeric: false, disablePadding: false, label: 'Dirección' },
  { id: 'observacion', numeric: false, disablePadding: false, label: 'Observación' },
  { id: 'Personal', numeric: false, disablePadding: false, label: 'Personal' },
  { id: 'tiptra', numeric: false, disablePadding: true, label: 'Tipo Trabajo' },
  { id: 'tipser', numeric: true, disablePadding: false, label: 'Servicio' },
  { id: 'cantidad', numeric: false, disablePadding: false, label: 'Cantidad' },
];

const headersExcel = [
  { field: 'numpro', numeric: true, disablePadding: false, title: 'Numpro' },
  { field: 'Proyecto', numeric: false, disablePadding: false, title: 'Proyecto' },
  { field: 'insStart', numeric: false, disablePadding: false, title: 'Inicio' },
  { field: 'ainsAgr', numeric: true, disablePadding: false, title: 'Acuerdo' },
  { field: 'insFin', numeric: false, disablePadding: false, title: 'Fin' },
  { field: 'insHora', numeric: false, disablePadding: false, title: 'Horario' },
  { field: 'Cadena', numeric: false, disablePadding: false, title: 'Cadena' },
  { field: 'Local', numeric: false, disablePadding: false, title: 'Local' },
  { field: 'Ciudad', numeric: false, disablePadding: false, title: 'Ciudad' },
  { field: 'Sector', numeric: false, disablePadding: false, title: 'Sector' },
  { field: 'Direccion', numeric: false, disablePadding: false, title: 'Dirección' },
  { field: 'observacion', numeric: false, disablePadding: false, title: 'Observación' },
  { field: 'tiptra', numeric: false, disablePadding: false, title: 'Tipo Trabajo' },
  { field: 'tipser', numeric: false, disablePadding: false, title: 'Servicio' },
  { field: 'valtiptra', numeric: false, disablePadding: false, title: 'Cantidad' },
  { field: 'creacion', numeric: false, disablePadding: false, title: 'Creación' },
];

const CronoSupe = ()=>{
    const classes = useStyles();   
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [ dataState, setDataState] = useState(false);
    const [cargandoBackDrop, setCargandoBackDrop] = useState(true);
    const [numRows, setNumRows] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataNew, setDataNew] = useState([]);
    const [openSn, setOpenSn] = useState(false);
    //const [filtro, setFiltro ] = useState({});
    const [ filtrosArr, setFiltrosArr ] = useState({});
    const [isFilterActive, setFilterActive] = useState(true);
    const [dataEdit, setDataEdit] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [cadenas, setCadenas] = useState([]);
    const [locales, setLocales] = useState([]);
    const [isPdf, setIsPdf] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('numpro');
    const [selected, setSelected] = React.useState([]);
    const [ isFiltradoSelect, setFiltradoSelect ] = useState(false);
    const [ fila0, setFila0 ] = useState([]);
    const [ fila1, setFila1 ] = useState([]);
    const [ fila3, setFila3 ] = useState([]);
    const [ fila7, setFila7 ] = useState([]);
    const [ fila8, setFila8 ] = useState([]);
    const [ fila9, setFila9 ] = useState([]);
    const [ fila10, setFila10 ] = useState([]);
    const [ dataPdf, setDataPdf ] = useState([]);
    const [ filtroSearch, setFiltroSearch ] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [ headCells, setHeadCells] = useState(headCell);
    const [ subHeadCells, setSubHeadCells ] = useState([]);
    const [ pHead, setPHead ] = useState(false);
    const { setOpen, setHeaderWord } = useAuth();
    const [ isExcel, setExcel ] = useState(false);

    useEffect(()=>{
        async function Req (){
            const ReqCrono = await fetch('CronogramasTot');
            const ReqEntregas = await fetch('EntregasTot');
            const ReqRetiros= await fetch('RetirosTot');
            const ReqCadenas = await fetch('fetch_soloCadenas');
            const ReqHeads = await fetch('HandleHeadCells');
            const JsonCadenas = await  ReqCadenas.json();
            const JsonCrono = await  ReqCrono.json();
            const JsonEntregas = await  ReqEntregas.json();
            const JsonRetiros = await  ReqRetiros.json();
            const JsonHeads = await  ReqHeads.json();
            setCadenas(JsonCadenas);
            let numCronos = JsonCrono.length;
            let numSubCronos = 0;
            let arr = [];
            JsonCrono.forEach((row,index)=>{  
              numSubCronos += row.items.length;
              let enc = [];
              row.encabezados.forEach(value=>{
                enc.push(value.tiptra);
              });
              row.items.forEach((subRows, index2)=>{
                const arrK = Object.keys(subRows);
                let tip = [];
                let Objeto = {};
                let valtip = 0;
                arrK.forEach(valk=>{
                 if(enc.includes(valk.toString())){
                   tip.push(`${valk}`);
                 }
                });
                
                if(tip.length > 1){                   
                  Objeto.tiptra = 'N/A';
                  Objeto.valtiptra = valtip;
                }else{
                  let tipt = tip[0];
                  let tipt2 = tipt === undefined ? 'N/A' : tipt === '' ? 'N/A' : tipt === ' ' ? 'N/A' : tipt === null ? 'N/A' : tipt;
                  Objeto.tiptra = tipt2.toString();
                  Objeto.valtiptra = parseInt(subRows[tipt]);
                }
                Objeto.Proyecto = row.proyecto;
                Objeto.numpro = row.numpro;
                Objeto.ejecutiva = row.ejecutiva;
                Objeto.coordinador = row.coordinador;
                Objeto.Cliente = row.cliente;
                Objeto.id = subRows.id;
                Objeto.Cadena = subRows.Cadena;
                Objeto.Local = subRows.Local;
                Objeto.Ciudad = subRows.Ciudad;
                Objeto.Sector = subRows.Sector;
                Objeto.Direccion = subRows.Direccion;
                Objeto.insStart = subRows.insStart;
                Objeto.ainsAgr = subRows.insAgr; 
                Objeto.insFin = subRows.insFin;
                Objeto.insHora = subRows.insHora;
                Objeto.Personal = subRows.Personal === ""  || subRows.Personal === null ? [] : !subRows.Personal ? []: subRows.Personal;
                Objeto.observacionM =  subRows.observacionM;
                Objeto.tipser = 'INSTALACIÓN';
                Objeto.creacion = row.creacion ? row.creacion : 'N/A';
                arr.push(Objeto);
              })
              if(index === (numCronos - 1)){
                const arr2 = arr.concat(JsonEntregas, JsonRetiros);
                setNumRows(numSubCronos);
                setDataNew(arr2);
                setDataEdit(arr2);
                setFiltradoSelect(true);
                setHeadCells(JsonHeads[0].Arreglo.length === 0 ? headCell : JsonHeads[0].Arreglo);
                setSubHeadCells(JsonHeads[0].Arreglo);
                setExcel(true);
              }
            });
          }
    
          Req();
          setOpen(false);
          setHeaderWord('Cronograma/Logística');
      },[]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
      if(dataState){
        async function Req (){
          const ReqCrono = await fetch('CronogramasTot');
          const JsonCrono = await  ReqCrono.json();
          let numCronos = JsonCrono.length;
          let numSubCronos = 0;
          let arr = [];
          JsonCrono.forEach((row,index)=>{  
            numSubCronos += row.items.length;
            let enc = [];
            row.encabezados.forEach(value=>{
              enc.push(value.tiptra);
            });
            row.items.forEach((subRows, index2)=>{
              const arrK = Object.keys(subRows);
              let tip = [];
              let Objeto = {};
              let valtip = 0;
              arrK.forEach(valk=>{
               if(enc.includes(valk.toString())){
                 tip.push(`${valk}`);
               }
              });
              
              if(tip.length > 1){                   
                Objeto.tiptra = tip;
                Objeto.valtiptra = valtip;
              }else{
                let tipt = tip[0];
                Objeto.tiptra = tipt;
                Objeto.valtiptra = subRows[tipt];
              }
              Objeto.Proyecto = row.proyecto;
              Objeto.numpro = row.numpro;
              Objeto.ejecutiva = row.ejecutiva;
              Objeto.coordinador = row.coordinador;
              Objeto.Cliente = row.cliente;
              Objeto.id = subRows.id;
              Objeto.Cadena = subRows.Cadena;
              Objeto.Local = subRows.Local;
              Objeto.Ciudad = subRows.Ciudad;
              Objeto.Sector = subRows.Sector;
              Objeto.Direccion = subRows.Direccion;
              Objeto.insStart = subRows.insStart;
              Objeto.ainsAgr = subRows.insAgr;
              Objeto.insFin = subRows.insFin;
              Objeto.insHora = subRows.insHora;
              Objeto.Personal = subRows.Personal === ""  || subRows.Personal === null ? [] : !subRows.Personal ? []: subRows.Personal;
              Objeto.observacion =  subRows.observacionM;
              Objeto.tipser = 'INSTALACIÓN';
              arr.push(Objeto);
            })
            
            if(index === (numCronos - 1)){
              setNumRows(numSubCronos);
              setDataNew(arr);
              setCargandoBackDrop(false);
              setDataState(false);
              setDataEdit(arr);
            }
          });
        }
        Req();
      }
    },[dataState]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
      ()=>{
        if(isFiltradoSelect){
          let arr = dataEdit;
          let arr0 = arr.map(value=>{return(value.numpro)});
          let arr1 = arr.map(value=>{return(value.Proyecto)});
          let arr3 = arr.map(value=>{return(value.ainsAgr)});
          let arr7 = arr.map(value=>{return(value.Cadena)});
          let arr8 = arr.map(value=>{return(value.Local)});
          let arr9 = arr.map(value=>{return(value.Ciudad)});
          let arr10 = arr.map(value=>{return(value.Sector)});
          let subArr0 = arr0.filter((el, index) => arr0.indexOf(el) === index);
          let subArr1 = arr1.filter((el, index) => arr1.indexOf(el) === index);
          let subArr3 = arr3.filter((el, index) => arr3.indexOf(el) === index);
          let subArr7 = arr7.filter((el, index) => arr7.indexOf(el) === index);
          let subArr8 = arr8.filter((el, index) => arr8.indexOf(el) === index);
          let subArr9 = arr9.filter((el, index) => arr9.indexOf(el) === index);
          let subArr10 = arr10.filter((el, index) => arr10.indexOf(el) === index);
            subArr0.sort();
            subArr1.sort();
            subArr3.sort();
            subArr7.sort();
            subArr8.sort();
            subArr9.sort();
            subArr10.sort();
          let arr0New = subArr0.map(value=>{
            let objeto = {};
            objeto.title = value;
            return(objeto);
          });
          let arr1New = subArr1.map(value=>{
           // console.log(value);
            let objeto = {};
            objeto.title = value === null ? 'nulo' : value === '' ? 'nulo' : value;
            return(objeto);
          });
          let arr3New = subArr3.map(value=>{
            let objeto = {};
            objeto.title = value;
            return(objeto);
          });
          let arr7New = subArr7.map(value=>{
            let objeto = {};
            objeto.title = value;
            return(objeto);
          });
          let arr8New = subArr8.map(value=>{
            let objeto = {};
            objeto.title = value;
            return(objeto);
          });
          let arr9New = subArr9.map(value=>{
            let objeto = {};
            objeto.title = value;
            return(objeto);
          });
          let arr10New = subArr10.map(value=>{
            let objeto = {};
            objeto.title = value;
            return(objeto);
          });
          setFila0(arr0New);
          setFila1(arr1New);
          setFila3(arr3New);
          setFila7(arr7New);
          setFila8(arr8New);
          setFila9(arr9New);
          setFila10(arr10New);
          setCargandoBackDrop(false);
        }
      },[isFiltradoSelect] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect( 
      ()=>{
        const dato = stableSort(dataNew, getComparator(order, orderBy));
        setDataPdf(dato);
      },[orderBy] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect( 
      ()=>{
        const dato = stableSort(dataNew, getComparator(order, orderBy));
        setDataPdf(dato);
      },[order] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
      ()=>{
        if(pHead){
          setPHead(false);
          if(subHeadCells.length === 0){
            setHeadCells(headCell);
            fetch('/HandleHeadCells',{
              method:'POST',
              body: JSON.stringify([]),
              headers:{'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(result =>{  
              console.log(result);
            
            })
          }else{
            setHeadCells(subHeadCells);
            fetch('/HandleHeadCells',{
              method:'POST',
              body: JSON.stringify(subHeadCells),
              headers:{'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(result =>{  
              console.log(result);
            
            })
          }
        }
      },[pHead] // eslint-disable-line react-hooks/exhaustive-deps
    );

    function EnhancedTableHead(props) {
      const { classes, order, orderBy, onRequestSort } = props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };
    
      return (
          <TableHead >
            <TableRow >
              {headCells.map((headCell,index) => {
                if(headCell.id === 'status'){
                  return(
                    <TableCell key={headCell.id} style={{backgroundColor:'#eee', fontWeight:'bold', textAlign:'center',width:100, padding:0}}>
                        {headCell.label}
                    </TableCell>
                  )
                }else if(headCell.id === 'numpro'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center',width:160}}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'Proyecto'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center',width:308, padding:0 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'insStart'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:158 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'ainsAgr'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:208 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'insFin'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:158 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'insHora'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:88 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'Cadena'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:208 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'Local'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:208 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'Ciudad'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:208 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'Sector'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:208 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'Direccion'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:258 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'observacion'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:158 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'Personal'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:328 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'tiptra'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:158 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'tipser'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:158 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }else
                if(headCell.id === 'cantidad'){
                  return(
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center', width:138 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
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
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      style={{backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold', textAlign:'center',width:100 }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        style={{color:'#fff', fontWeight:'bold' }}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                }
                }
              )}
            </TableRow>
          </TableHead>
      
      );
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = dataNew.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, numRows - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };

    const HandlefilterStatus = ()=>{
      setFilterActive(!isFilterActive);
      if(isFilterActive){
        setDataNew(dataEdit);
        //setFiltro({});
      }
    };

    const HandleSearch = (e)=>{
      setSearch(e.target.value)
      let arr2 = dataNew;
      let lova = e.target.value.toLowerCase();
      let result = arr2.filter((item)=>{ 
        if(lova === null)
          return item
        else if(item.numpro.toString().includes(lova) || item.proyecto.toLowerCase().includes(lova)){
          return item
        }else if(item.ciudad){
          if(item.ciudad.toLowerCase().includes(lova)){
            return item
          }
        }else if(item.sector){
          if(item.ciudad.toLowerCase().includes(lova)){
            return item
          }
        }else if(item.caden){
          if(item.ciudad.toLowerCase().includes(lova)){
            return item
          }
        }else if(item.tiptra){
          if(item.tiptra.toLowerCase().includes(lova)){
            return item
          }
        }else if(item.tipser){
          if(item.tipser.toLowerCase().includes(lova)){
            return item
          }
        }else if(item.observacion){
          if(item.observacion.toLowerCase().includes(lova)){
            return item
          }
        }
      });
      setDataNew(result);
    };

    const HandleFilterSearch = (e)=>{
      if(isPdf){
        alert('Desactive la Impresora')
      }else{
        let lova = search.toLowerCase();
        let arr2 = dataEdit;
        let result = arr2.filter((item)=>{ 
          if(lova == null)
            return item
          else if(item.numpro.toString().includes(lova) || item.proyecto.toLowerCase().includes(lova)){
            return item
          }else if(item.ciudad){
            if(item.ciudad.toLowerCase().includes(lova)){
              return item
            }
          }else if(item.sector){
            if(item.ciudad.toLowerCase().includes(lova)){
              return item
            }
          }else if(item.caden){
            if(item.ciudad.toLowerCase().includes(lova)){
              return item
            }
          }else if(item.tiptra){
            if(item.tiptra.toLowerCase().includes(lova)){
              return item
            }
          }else if(item.tipser){
            if(item.tipser.toLowerCase().includes(lova)){
              return item
            }
          }else if(item.observacion){
            if(item.observacion.toLowerCase().includes(lova)){
              return item
            }
          }
        });
        setDataNew(result);
      }
      
    };

    const HandleAddModal = ()=>{
      setShowModal(false);
    };

    const HandleShowModal = ()=>{
      setShowModal(true);
    };

    const HandleModalInfo = (e)=>{
      setModalInfo({...modalInfo, [e.target.id]: e.target.value})
    };

    const HandleSaveModal = ()=>{
      let arr = dataNew;
      arr.push(modalInfo);
      fetch('SaveModal',{
        method: 'POST',
        body: JSON.stringify({modalInfo}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response=> response.json())
      .then(result=>{
        enqueueSnackbar(result.message, { variant:'success' });
        setShowModal(false);
        setModalInfo({});
        setDataNew(arr);
      });
    };

    const HandlePrinter = ()=>{
      if(isFilterActive){
        setIsPdf(!isPdf);
      }else{
        if(search === ''){
          alert('Active el Filtrado o Filtre Información');
        }else{
          setIsPdf(!isPdf);
        }
        
      }
      
    };

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    
    //const isSelected = (name) => selected.indexOf(name) !== -1;

    const HandleSearchProyecto = ()=>{
      fetch('fetch_ProyectoOpCrono',{
        method: 'POST',
        body: JSON.stringify({numpro:modalInfo.numpro}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response=> response.json())
      .then(result => setModalInfo({...modalInfo, proyecto:result[0].proyecto}))
    };

    const HandleHead = (e, value)=>{
        setSubHeadCells(value);
    };

    const ProcessHead = ()=>{
        setPHead(true);
    };

    const FiltradosH = headCells.map((value,index)=>{
      if(value.id === 'status'){
        return(
          <TableCell align="center" style={{backgroundColor:'#eee', width:100}} key={`filter${index}`}></TableCell>
        )
      }else
      if(value.id === 'numpro'){
        return(
          <TableCell align="center" key={`filter${index}`} style={{justifyContent:'center', paddingLeft:4, paddingRight:4}}>
            <AutocompleteCreative data={fila0} Nombre={'numpro'} Label={'Presupuesto'} ancho={150}/>
          </TableCell>
        )
      }else
      if(value.id === 'Proyecto'){
        return(
          <TableCell align="center" key={`filter${index}`} style={{justifyContent:'center', paddingLeft:4, paddingRight:4}}>
            <AutocompleteCreative data={fila1} Nombre={'Proyecto'} Label={'Proyecto'} ancho={300}/>
          </TableCell>
          )
      }else
      if(value.id === 'insStart'){
        return(
          <TableCell align="center" style={{backgroundColor:'#fff', paddingLeft:4, paddingRight:4}} key={`filter${index}`}></TableCell>
        )
      }else
      if(value.id === 'ainsAgr'){
        return(
          <TableCell align="center" key={`filter${index}`} style={{justifyContent:'center', paddingLeft:4, paddingRight:4}}>
            <AutocompleteCreative data={fila3} Nombre={'ainsAgr'} Label={'Acuerdo'} ancho={200}/>
          </TableCell>
        )
      }else
      if(value.id === 'insFin'){
        return(
          <TableCell align="center" style={{backgroundColor:'#fff', paddingLeft:4, paddingRight:4}} key={`filter${index}`}></TableCell>
        )
      }else
      if(value.id === 'insHora'){
        return(
          <TableCell align="center" style={{backgroundColor:'#fff', paddingLeft:4, paddingRight:4}} key={`filter${index}`}></TableCell>
        )
      }else
      if(value.id === 'Cadena'){
        return( 
          <TableCell align="center" key={`filter${index}`} style={{justifyContent:'center', paddingLeft:4, paddingRight:4}}>
            <AutocompleteCreative data={fila7} Nombre={value.id} Label={value.id} ancho={200}/>
          </TableCell>
        )
      }else
      if(value.id === 'Local'){
        return( 
          <TableCell align="center" key={`filter${index}`} style={{justifyContent:'center', paddingLeft:4, paddingRight:4}}>
            <AutocompleteCreative data={fila8} Nombre={value.id} Label={value.id} ancho={200}/>
          </TableCell>
        )
      }else
      if(value.id === 'Ciudad'){
        return( 
          <TableCell align="center" key={`filter${index}`} style={{justifyContent:'center', paddingLeft:4, paddingRight:4}}>
            <AutocompleteCreative data={fila9} Nombre={value.id} Label={value.id} ancho={200}/>
          </TableCell>
        )
      }else
      if(value.id === 'Sector'){
        return( 
          <TableCell align="center" key={`filter${index}`} style={{justifyContent:'center', paddingLeft:4, paddingRight:4}}>
            <AutocompleteCreative data={fila10} Nombre={value.id} Label={value.id} ancho={200}/>
          </TableCell>
        )
      }else{
        return(
          <TableCell align="center" style={{backgroundColor:'#fff', paddingLeft:4, paddingRight:4, justifyContent:'center'}} key={`filter${index}`} ></TableCell>
        )
      }
    })

    return(
      <React.Fragment> 
          <Grid container style={{padding:0}}>
            <Backdrop className={classes.backdrop} open={cargandoBackDrop}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{position:'fixed', display:'block', height:subHeadCells.length >=8 ? 110 : 90, marginTop:-10,backgroundColor:'#fff', zIndex:1}}>
              <Paper square style={{width:'97.5vw', paddingLeft:4, paddingRight:4}}>
                <Grid container style={{marginBottom:5}} justify='center' spacing={1}>
                  <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                    <IconButton onClick={HandlefilterStatus}>
                      <FilterListIcon color='secondary'/> 
                    </IconButton>
                    <IconButton onClick={HandleShowModal}>
                      <AddIcon/>
                    </IconButton>
                    <IconButton onClick={HandlePrinter}>
                      <PrintIcon color='secondary'/>
                    </IconButton>
                    { isPdf &&  <AppPrint dataNew={dataPdf}/>}
                  </Grid>
                  <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                    <TextField 
                      id="search" 
                      value={search || ''} 
                      margin="dense" 
                      variant='outlined'
                      fullWidth
                      InputProps={{startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
                      onChange={HandleSearch}
                      onKeyUp={(e)=>{
                        const code = e.keyCode || e.which;
                        if(code === 8)
                            HandleFilterSearch();
                      }}
                    />
                  </Grid>
                  <Grid item xl={5} lg={5} md={5} sm={11} xs={11}>
                    <Autocomplete
                      multiple
                      rows={2}
                      clearText={'Limpiar'}
                      id={`Encabezados`}
                      options={headCell}
                      size="small"
                      disableCloseOnSelect
                      onChange={HandleHead}
                      value={subHeadCells}
                      getOptionLabel={(option) => option.label}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.label}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined"  margin="dense" rows={2} fullWidth placeholder='Columnas' />
                      )}
                    />
                  </Grid>
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1} style={{alignSelf:'center'}}>
                        <Fab color='primary' size='small' onClick={ProcessHead}>
                          <SaveIcon/>
                        </Fab>
                  </Grid>
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1} style={{alignSelf:'center'}}>
                        {
                          isExcel &&
                          <ExcelComponent data={dataNew} headers={headersExcel}/>
                        }
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{minHeight:subHeadCells.length >=8 ? '72vh' : '82vh', padding:0, display:'block',marginTop:subHeadCells.length >=8 ? 80: 50}} >
              <Paper square> 
                <TableContainer  style={{minHeight:subHeadCells.length >=8 ? '72vh' : '82vh',  maxHeight: subHeadCells.length >=8 ? '72vh' : '82vh'}} >
                  <Table aria-label="Cronograma Supervisores" size="small" stickyHeader>
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={dataNew.length}
                      />
                      <SnackContext.Provider value={{ openSn, setOpenSn, cargandoBackDrop, setCargandoBackDrop, setDataState, setDataPdf, dataPdf, dataNew, setDataNew, dataEdit, setDataEdit, filtroSearch, setFiltroSearch, filtrosArr, setFiltrosArr, setFila3, setFila7, setFila8, setFila9, setFila10}}>
                     
                      <TableBody>
                      {isFilterActive
                          ?<TableRow >
                             {FiltradosH}
                          </TableRow>
                          :<TableRow></TableRow>
                        }
                        
                          {
                            stableSort(dataNew, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            //.pdfDat()
                            .map((row, index) => {
                              //const isItemSelected = isSelected(dataNew.name);
                              //const labelId = `enhanced-table-checkbox-${index}`;
                              
                                return( 
                                  <Roow key={`roow${row.id}`} row={row} index={index} headCells={headCells} />
                                )
                            })
                          }
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                          <TableRow>
                            <TablePagination 
                                rowsPerPageOptions={[5, 8, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={numRows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                  inputProps: { 'aria-label': 'rows per page' },
                                  native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                labelRowsPerPage={'Filas por Hoja'}
                              />
                          </TableRow>
                      </TableBody>
                  
                      </SnackContext.Provider>
                      </Table>
                </TableContainer>
                    
                        
                      
                  
             
              </Paper>
            </Grid>
          </Grid>
          <Dialog
            open={showModal}
            onClose={HandleAddModal}
            aria-labelledby="AddService"
            aria-describedby="ServiceDescription"
            fullWidth
            maxWidth='md'
            spacing={2}
            disableBackdropClick
            color='secondary'
          >
            <DialogTitle id="AddService">{"Agregar"}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4} >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="numpro"
                      label="Numpro"
                      fullWidth
                      variant='outlined'
                      value={modalInfo.numpro  || ''}
                      onChange={HandleModalInfo}
                      type='Number'
                      onKeyPress={(e)=>{
                        if(e.charCode === 13 || e.keyCode === 13){
                          HandleSearchProyecto();
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4} >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="tiptra"
                      label="Tipo Trabajo"
                      fullWidth
                      variant='outlined'
                      value={modalInfo.tiptra  || ''}
                      onChange={HandleModalInfo}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4} >
                    <TextField
                      value={modalInfo.tipser || ''}
                      onChange={(e)=>setModalInfo({...modalInfo, tipser:e.target.value})}
                      fullWidth
                      margin="dense"
                      style={{marginTop:8}}
                      variant='outlined'
                      select
                      label='Tipo Servicio'
                      id='tipser'
                    >
                      <MenuItem value="RETIRO">Retiro</MenuItem>
                      <MenuItem value="ENTREGA">Entrega</MenuItem>
                      <MenuItem value="INSTALACION">Instalación</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="proyecto"
                      label="Proyecto"
                      fullWidth
                      variant='outlined'
                      value={modalInfo.proyecto  || ''}
                      disabled
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <TextField
                      id="insStart"
                      label="Inicio"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={modalInfo.insStart  || ''}
                      onChange={HandleModalInfo}
                      margin="dense"
                      type='date'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <TextField
                      id="insAgr"
                      label="Acuerdo"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={HandleModalInfo}
                      margin="dense"
                      type='date'
                      value={modalInfo.insAgr  || ''}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <TextField
                      id="insFin"
                      label="Fin"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={modalInfo.insFin  || ''}
                      onChange={HandleModalInfo}
                      margin="dense"
                      type='date'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <TextField
                      id="insHora"
                      label="Hora"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={modalInfo.insHora  || ''}
                      onChange={HandleModalInfo}
                      margin="dense"
                      type='time'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <Autocomplete
                      id="caden"
                      options={cadenas}
                      getOptionLabel={(option) => option.cadena}
                    
                      inputValue={modalInfo.caden}
                      renderInput={(params) => <TextField {...params}   fullWidth label="Cadena" margin='dense' variant="outlined" />}
                      onInputChange={(e,value)=>{
                        if(value === ''){
                          setModalInfo({...modalInfo, local:'', ciudad:'', sector:'',direccion:''});
                          setLocales([]);
                        }else{
                        setModalInfo({...modalInfo, caden:value});
                        fetch('fetch_soloLocales',{
                          method: 'POST',
                          body: JSON.stringify({cadena:value}),
                          headers:{
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(response => response.json())
                        .then(result => {
                          setLocales(result);
                        })
                      }}
                    }
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <Autocomplete
                      id="local"
                      options={locales}
                      getOptionLabel={(option) => option.local}                    
                      renderInput={(params) => <TextField {...params} value={modalInfo.local} fullWidth label="Local" margin='dense' variant="outlined" />}
                      onInputChange={(e,value)=>{
                        if(value === ''){
                          setModalInfo({...modalInfo, local:'', ciudad:'', sector:'',direccion:''});
                        }else{
                          setModalInfo({...modalInfo, local:value});
                          fetch('fetch_CiSecDir',{
                            method: 'POST',
                            body: JSON.stringify({cadena:modalInfo.caden, local:value}),
                            headers:{
                              'Content-Type': 'application/json'
                            }
                          })
                          .then(response => response.json())
                          .then(result => {
                            const { ciudad, sector, direccion} = result[0];
                            setModalInfo({...modalInfo, ciudad, sector, direccion});
                          })
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <TextField
                      id="ciudad"
                      label="Ciudad"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={modalInfo.ciudad  || ''}
                      onChange={HandleModalInfo}
                      margin="dense"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <TextField
                      id="sector"
                      label="Sector"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={modalInfo.sector  || ''}
                      onChange={HandleModalInfo}
                      margin="dense"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <TextField
                      id="direccion"
                      label="Direccion"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={modalInfo.direccion  || ''}
                      onChange={HandleModalInfo}
                      margin="dense"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      id="observacion"
                      label="Observación"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={modalInfo.observacion  || ''}
                      onChange={HandleModalInfo}
                      margin="dense"
                      fullWidth
                      multiline
                    />
                </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={HandleAddModal} color="secondary" variant='contained'>
                  Cancelar
                </Button>
                <Button onClick={HandleSaveModal} color="primary" variant='contained' autoFocus>
                  Agregar
                </Button>
              </DialogActions>
          </Dialog>
      </React.Fragment>
    );
};

const AppPrint = (props) => { 
  const { dataNew } = props;
  const headCells2 = [
    { id: 'ainsAgr', numeric: false, disablePadding: false, label: 'FECHA' },
    { id: 'numpro', numeric: true, disablePadding: false, label: 'PPTO' },
    { id: 'Proyecto', numeric: false, disablePadding: false, label: 'PROYECTO' },
    { id: 'Ciudad', numeric: false, disablePadding: false, label: 'CIUDAD' },
    { id: 'Cadena', numeric: false, disablePadding: false, label: 'CADENA' },
    { id: 'Local', numeric: false, disablePadding: false, label: 'LOCAL' },   
    { id: 'valtiptra', numeric: false, disablePadding: false, label: 'CANTIDAD' }, 
    { id: 'tiptra', numeric: false, disablePadding: true, label: 'Tipo Trabajo' },
    { id: 'Personal', numeric: false, disablePadding: false, label: 'PERSONAL' },
  ];
  const MarginB = 40;
  const MarginT = 80;
  
  
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
    headers:{
      textAlign: 'center'
    },
    cliente:{
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      position:'relative',
      top:20,
      left:188,
      width:380,
    },
    numpro: {
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      position:'relative',
      top:-2,
      left:770
    },
    proyecto: {
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      width: 380,
      fontSize:16,
      marginTop:parseInt(MarginT),
      marginBottom: parseInt(MarginB),
      position:'relative',
      left:10
    },
    containerTable:{
      width: 808.5, 
      marginLeft:17.5,
    },
    table: {    
      display: "table", 
      width:'100%',
      //borderWidth:1,
      //borderStyle: "solid", 
      borderRightWidth: 0, 
      borderBottomWidth: 0,
      //borderColor:'#fff',
    },
    tableRowHeader: {
      marginTop:84,
      //margin: "auto", 
      flexDirection: "row" ,
      backgroundColor:lime[600],
      color:'#fff',
    }, 
    headerAgr: { 
      width:60,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      borderColor:'#fff'
    },
    headerNumpro: { 
      width: 40,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      borderColor:'#fff'
    },
    headerProyecto: { 
      width: 210,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      borderColor:'#fff'
    },
    headerCantidad: { 
      width: 50,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      borderColor:'#fff'
    },
    tableColHeader: { 
      width: `${100 / headCells2.length}%`,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      borderColor:'#fff'
    }, 
    tableCellHeader:{
      margin: "auto",  
      fontSize: 8,
      width:'100%',
      textAlign:'center',
      fontFamily: 'Roboto-BlackCursive',
    },
    tableRow: {
      margin: "auto", 
      flexDirection: "row" ,
      backgroundColor:grey[300],
      height:20
    }, 
    tableCol: { 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      width: `${100 / headCells2.length}%`,
      borderColor:'#fff'
    }, 
    colAgr: { 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      width:60,
      borderColor:'#fff'
    }, 
    colNumpro: { 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      width:40,
      borderColor:'#fff'
    }, 
    colProyecto: { 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      width:210,
      borderColor:'#fff'
    }, 
    colCantidad: { 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      width:50,
      borderColor:'#fff'
    }, 
    tableCellDir: { 
      margin: "auto", 
      fontSize: 6,
      width:'100%',
      textAlign:'center',
    },
    tableCell: { 
      margin: "auto", 
      padding:1,
      fontSize: 7,
      width:'100%',
      textAlign:'center',
    },
    tableCellTip: { 
      margin: "auto", 
      padding:1,
      fontSize: 5,
      width:'100%',
      textAlign:'center',
    },
    tableCellPer: { 
      margin: "auto", 
      padding:1,
      fontSize: 4,
      width:'100%',
      textAlign:'center',
    },
    tableCellPro: { 
      margin: "auto", 
      fontSize: 6,
      width:'100%',
      textAlign:'center',
      padding:2,
    },
  });
  
  Font.register({family: 'Oswald',src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'});

  Font.register({ family: 'Roboto-BlackCursive', src:'fonts/Roboto-BlackItalic.ttf'});
  
  const tipost = (data)=>{
    const arr = [data];
    const arr1 = [];
    try{
      data.forEach((value,index)=>{
        if(data.length > 1 && index < (data.length - 1)){      
            arr1.push(`${value}, `);
        }else{
         arr1.push(value);
        }
      });
      return(arr1);
    }catch(err){
      return(arr);
    }
    
    
    
  } 

  const trab = (data)=>{
    const arr = [data];
    const arr1 = [];
    try{
      data.forEach(value=>{
        if(value.instalador){
          if(data.length>1){
            arr1.push(`${value.instalador}, `);
          }else{
            arr1.push(value.instalador);
          }
            
          }else{
            console.log('noins');
          }
      });
      return(arr1)
    }catch(err){
      return(arr)
    }

    
  };

  const MyDoc =(
    <Document>
      <Page size="A4" orientation="landscape" wrap>
        <ImagePdf source="images/cronoprinsupervisor.jpg" style={styles.image} fixed/>
          <View style={styles.containerTable} wrap>
            <View style={styles.table} >
              {/* TableHeader */}
                <View style={styles.tableRowHeader} fixed> 
                  {
                    headCells2.map((value,index)=>{
                      if(value.id === 'ainsAgr'){
                        return(
                          <View style={styles.headerAgr} key={`rows${index}`}>   
                            <Text style={styles.tableCellHeader}>{value.label}</Text> 
                          </View> 
                        )
                      }else if(value.id === 'numpro'){
                        return(
                          <View style={styles.headerNumpro} key={`rows${index}`}>   
                            <Text style={styles.tableCellHeader}>{value.label}</Text> 
                          </View>
                        )
                      }else if(value.id === 'Proyecto'){
                        return(
                          <View style={styles.headerProyecto} key={`rows${index}`}>   
                            <Text style={styles.tableCellHeader}>{value.label}</Text> 
                          </View>
                        )
                      }else if(value.id === 'valtiptra'){
                        return(
                          <View style={styles.headerCantidad} key={`rows${index}`}>   
                            <Text style={styles.tableCellHeader}>{value.label}</Text> 
                          </View>
                        )
                      }else{
                        return(
                          <View style={styles.tableColHeader} key={`rows${index}`}>   
                            <Text style={styles.tableCellHeader}>{value.label}</Text> 
                          </View>
                        )
                        
                      }
                      
                    })
                  }
                </View> 
              {/* TableContent */} 
              {dataNew.map((value1,index1)=>{
                  return( 
                    <View style={styles.tableRow} key={`row${index1}`}> 
                      {headCells2.map((value,index)=>{
                        if(value.id === 'ainsAgr'){
                          return(
                            <View style={styles.colAgr} key={`rows${index}`}>   
                              <Text style={styles.tableCell}>{value1[value.id]}</Text> 
                            </View> 
                          )
                        }else if(value.id === 'numpro'){
                          return(
                            <View style={styles.colNumpro} key={`rows${index}`}>   
                              <Text style={styles.tableCell}>{value1[value.id]}</Text> 
                            </View>
                          )
                        }else if(value.id === 'Proyecto'){
                          return(
                            <View style={styles.colProyecto} key={`rows${index}`} >   
                              <Text style={styles.tableCellPro}>{value1[value.id]}</Text> 
                            </View>
                          )
                        }else if(value.id === 'valtiptra'){
                          return(
                            <View style={styles.colCantidad} key={`rows${index}`} >   
                              <Text style={styles.tableCell}>{value1[value.id]}</Text> 
                            </View>
                          )
                        }else if(value.id === 'tiptra'){
                          return(
                            <View style={styles.tableCol} key={`rows${index}`} >   
                              <Text style={styles.tableCellTip}>{tipost(value1[value.id])}</Text> 
                            </View>
                          )
                        }else if(value.id === 'Personal'){
                          return(
                            <View style={styles.tableCol} key={`rows${index}`} >   
                              <Text style={styles.tableCellPer}>{trab(value1[value.id])}</Text> 
                            </View>
                          )
                        }else{
                          return(
                            <View style={styles.tableCol} key={`rows${index}`}>   
                              <Text style={styles.tableCell}>{value1[value.id]}</Text> 
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
          </View>
       
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document: MyDoc });

  if (instance.loading) {
    return <FacebookCircularProgress size={25} />;
  }

  if (instance.error) { 
      return <div>Something went wrong: {instance.error}</div>;
  }

  return( 
    <IconButton color="primary" aria-label="pdf" href={instance.url} target="_blank" size='small'>
        <Tooltip title='PDF'placement='right' arrow >
            <PdfIcon  />
        </Tooltip>
    </IconButton>
    
  );
  
};

const AutocompleteCreative = (props)=>{
  const { data, Nombre, Label, ancho} = props;
  const {setDataNew, dataEdit, setFiltrosArr, filtrosArr,setFila3, setFila7, setFila8, setFila9, setFila10, setDataPdf } = useContext(SnackContext);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const HandleFiltro = (e, value) =>{
    let arr = filtrosArr;
    if(arr[Nombre]){
      delete arr[Nombre];
      arr[Nombre] = value
      setFiltrosArr(arr);
    }else{
      setFiltrosArr({...filtrosArr, [Nombre]:value });
    }
  };

  const HandleCloseFiltro = (e, value)=>{
    const arr = filtrosArr; 
    const ordered = {};
    Object.keys(arr).sort().map(function(key) {
      ordered[key] = arr[key];
    });
    let dat = dataEdit;
    for (const property in ordered) {
      if(ordered[property].length > 0){
        let arrV = ordered[property].map(value=>{
          return value.title;
        });
        let arrF = dat.filter((value)=>{
          return arrV.includes(value[property])
        });
      dat = arrF
      }
    }
    setDataNew(dat);
    setDataPdf(dat);
    if(Nombre === 'numpro' || Nombre === 'Proyecto' || Nombre === "ainsAgr"){
      let arr3 = dat.map(value=>{return(value.ainsAgr)});
      //console.log(arr3);
      let arr7 = dat.map(value=>{return(value.Cadena)});
      let arr8 = dat.map(value=>{return(value.Local)});
      let arr9 = dat.map(value=>{return(value.Ciudad)});
      let arr10 = dat.map(value=>{return(value.Sector)});
      let subArr3 = arr3.filter((el, index) => arr3.indexOf(el) === index);
      let subArr7 = arr7.filter((el, index) => arr7.indexOf(el) === index);
      let subArr8 = arr8.filter((el, index) => arr8.indexOf(el) === index);
      let subArr9 = arr9.filter((el, index) => arr9.indexOf(el) === index);
      let subArr10 = arr10.filter((el, index) => arr10.indexOf(el) === index);
        subArr3.sort();
        subArr7.sort();
        subArr8.sort();
        subArr9.sort();
        subArr10.sort();
      let arr3New = subArr3.map(value=>{
        let objeto = {};
        objeto.title = value;
        return(objeto);
      });
      let arr7New = subArr7.map(value=>{
        let objeto = {};
        objeto.title = value;
        return(objeto);
      });
      let arr8New = subArr8.map(value=>{
        let objeto = {};
        objeto.title = value;
        return(objeto);
      });
      let arr9New = subArr9.map(value=>{
        let objeto = {};
        objeto.title = value;
        return(objeto);
      });
      let arr10New = subArr10.map(value=>{
        let objeto = {};
        objeto.title = value;
        return(objeto);
      });
      setFila3(arr3New);
      setFila7(arr7New);
      setFila8(arr8New);
      setFila9(arr9New);
      setFila10(arr10New);
    }
  };

  if(Nombre === 'numpro'){
    return(
      <Autocomplete
        multiple
        clearText={'Limpiar'}
        id={`${Nombre}-Filtro`}
        options={data}
        size="small"
        disableCloseOnSelect
        onChange={HandleFiltro}
        onClose={HandleCloseFiltro}
        getOptionLabel={(option) => option.title}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </React.Fragment>
        )}
        //style={{width: 250 }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined"  fullWidth style={{width: ancho, margin:0 }} placeholder={Label} />
        )}
      />
    );
  }else{
    return(
      <Autocomplete
        multiple
        disableListWrap
        clearText={'Limpiar'}
        id={`${Nombre}-Filtro`}
        options={data}
        size="small"
        disableCloseOnSelect
        onChange={HandleFiltro}
        onClose={HandleCloseFiltro}
        getOptionLabel={option => option.title}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth style={{width: ancho, margin:0 }} placeholder={Label} />
        )}
      />
    );
  }
    
};

export default function CronoSuper() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CronoSupe />
    </SnackbarProvider>
  );
}