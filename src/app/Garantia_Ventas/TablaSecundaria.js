import React, { useContext, createContext, useState } from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import {
  Box,
  Collapse,
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
} from '@material-ui/core';
import {
  Brightness1 as Brightness1Icon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  PhotoAlbum as PhotoAlbumIcon,
} from '@material-ui/icons'
import Viewer from 'react-viewer';


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

const headers = [
  {title: 'Garantia', field:'NumGar', width: 150},
  {title: 'Cliente', field:'Cliente', width: 150},
  {title: 'Proyecto', field:'Proyecto', width: 150},
  {title: 'Creacion', field:'Creacion', width: 350},
];

export default function TablaSecundaria(props) {
  const classes = useStyles();
  const { dataInfo, Meses  } = props;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Cadena');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow >
          <TableCell style={{textAlign:'center',backgroundColor:'#0E3B5F', color:'#fff', fontWeight:'bold'}}>
            Actions
          </TableCell>
          {headers.map((headCell) => (
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
          ))}
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
      <TableContainer >
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size='small'
          aria-label="enhanced table"
          stickyHeader
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={dataInfo.length}
          />
          <TableBody >
            {stableSort(dataInfo, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <Roow key={`Row${row._id}`} row={row} index={index} Meses={Meses}/>     
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

const Roow = (props)=>{

  const { index, row, Meses } = props;
  const [ openRow, setOpenRow ] = useState(false);



  const HeadCellArr = headers.map((value,index2)=>{

    let dataCell = row[value.field];
    let dateCell = '';

    if(index2 === 3){
      let fecha = new Date(row.Creacion);
      dateCell = `${fecha.getDate()}/${Meses[fecha.getMonth()]}/${fecha.getFullYear()}`;
    }
    return(
      <TableCell key={`Cell${value.Field}-${index2}` } style={{textAlign:'center'}}>{index2 === 3 ? dateCell : dataCell}</TableCell>
    )
  });

 

  return(
    <React.Fragment>
      <TableRow key={`fila-${index}-${row._id}`} >
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
                    <TableCell align="center" >Action</TableCell>
                    <TableCell align="center" >Codigo</TableCell>
                    <TableCell align="center" >Motivo</TableCell>
                    <TableCell align="center" >Local</TableCell>
                    <TableCell align="center" >Tipo Trabajo</TableCell>
                    <TableCell align="center" >Observacion</TableCell>
                    <TableCell align="center" >Status</TableCell>
                    <TableCell align="center" >Grafico</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Elementos.map((elementRow) =>(
                    <TableRow key={elementRow._id}>
                      <SubCellAction row={elementRow} idInstalacion={row._id}/>
                      <TableCell align="center"> {elementRow.Codigo.map(codRow=> codRow.codigo).toString()} </TableCell>
                      <TableCell align="center"> {elementRow.MotGar.map(motRow=> motRow.motivo).toString()}  </TableCell>     
                      <TableCell align="center"> {elementRow.TipTra} </TableCell>     
                      <TableCell align="center"> {elementRow.ObservacionGar} </TableCell>
                      <TableCell align="center"> {elementRow.Status} </TableCell>
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
                        ) : elementRow.Status === 'Concluido' ?
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
  //const { row } = props;
  /*                                                                 */


  /*                             CONTEXTOS                           */
  const { openRow, setOpenRow } = useContext(subGarantiaContext);
  /*                                                                 */


  const HandleOpenRow = ()=>{
    setOpenRow(!openRow);
  };
  

  return(
    <TableCell>
      <Grid container style={{width:100}}>
        <Grid item>
          <IconButton aria-label="expand row" size="small" onClick={HandleOpenRow}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  )
};

const SubCellAction = (props)=>{
  /*                             VARIABLES                           */
  const { row } = props;
  /*                                                                 */

  /*                         ESTADOS BOOLEANOS                       */
  const [ openPhotos, setOpenPhotos ] = useState(false);
  /*                                                                 */


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
      <Viewer
        visible={openPhotos}
        onClose={HandleClosePhotos}
        images={row.Fotos}
        zIndex={2000}
      />
      <TableCell align="center"> 
        <IconButton size='small' onClick={HandleShowPhotos}>
          <PhotoAlbumIcon color='secondary' />
        </IconButton>
      </TableCell>
    </React.Fragment>

    
  )
};

