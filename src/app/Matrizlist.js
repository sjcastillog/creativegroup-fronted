import React, { useState, useEffect} from 'react';
import MaterialTable, { MTableToolbar} from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from './Auth';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ExcelComponent from './ExcelComponent';

const headersExcel = [
  { field: 'numpro', numeric: true, disablePadding: false, title: 'Numpro' },
  { field: 'proyecto', numeric: false, disablePadding: false, title: 'Proyecto' },
  { field: 'tiptra', numeric: false, disablePadding: false, title: 'Tipo Trabajo' },
  { field: 'tipreq', numeric: false, disablePadding: false, title: 'Tipo Requerimiento' },
  { field: 'cliente', numeric: false, disablePadding: false, title: 'Cliente' },
  { field: 'ejecutiva', numeric: false, disablePadding: false, title: 'Ejecutiva' },
  { field: 'cantreq', numeric: false, disablePadding: false, title: 'Cantidad Requerida' },
  { field: 'fecreqcli', numeric: false, disablePadding: false, title: 'Fecha req. Cliente' },
  { field: 'creacion', numeric: false, disablePadding: false, title: 'Creación' },
];

function Matrizlist(){
/******************************ESTADOS****************************/
const state = [
    {title: 'TICKET', field: 'numMatriz',editable: 'never' },
    {title: 'CLIENTE', field: 'cliente',},
    {title: 'PROYECTO', field: 'proyecto' },
    {title: 'EJECUTIVA', field: 'ejecutiva', editable: 'never' },
    
];
const [data, setData] = useState([]);
const [ dataExcel, setDataExcel ] = useState([]);
const [cargando, setCargando] = useState(true);
const [snacks, setSnacks] = useState({
  message:'Agregado',
  status:false,
  severity:'success'
});
const [dataState, setDataState] = useState(false);
const {  authTokens, setHeaderWord } = useAuth();
const [ isExcel, setExcel ] = useState(false);
/*****************************************************************/

const Creative = createMuiTheme({
  palette: {
    primary: {
      main: '#0E3B5F',
    },
    secondary: {
      main: '#CAD226',
    },
  },

});

/**************************useEffect**************************/
useEffect(()=>{ 
    async function handleFetchdata(){ 
      const response = await fetch('/fetch_Matriz');
      const data2 = await response.json();
      let arr = [];
      let numMatriz = data2.length;
      data2.forEach((row, index)=>{
        row.formulario.forEach((value, index2)=>{
          let objeto = {};
          objeto.numpro = value.numpro;
          objeto.proyecto = row.proyecto;
          objeto.tiptra = value.tiptra;
          objeto.tipreq = value.tipreq;
          objeto.cliente = row.cliente;
          objeto.ejecutiva = row.ejecutiva;
          objeto.cantreq = value.cantreq;
          objeto.creacion = row.creacion ? row.creacion : 'N/A';
          objeto.fecreqcli = value.fecreqcli ? value.fecreqcli : 'N/A';
          arr.push(objeto);
        });
        if(index === (numMatriz - 1)){
          setDataExcel(arr);
          setTimeout(()=>{
            setExcel(true);
          },1000)
        }
      });
      setData(data2);
      setCargando(false);
    };

    async function handleFetchEjecutiva(){
      const response = await fetch('/fetch_MatrizEjecutiva',{method:'POST',body:JSON.stringify({nombre:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
      const data = await response.json();
      setData(data);
      setCargando(false);
    };

    async function handleFetchCoordinador(){
      const response = await fetch('/fetch_MatrizCoordinadora',{method:'POST',body:JSON.stringify({coordinador:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
      const data = await response.json();
      setData(data);
      setCargando(false);
    };
      
    switch(authTokens.tipo){
      case "EJECUTIVA":
        setHeaderWord('Matriz/List');
        handleFetchEjecutiva();
        break;
      case "COORDINADOR":
        setHeaderWord('Matriz/List');
        handleFetchCoordinador();
        break;
      case "ADMINISTRADOR":
        setHeaderWord('Matriz/List');
        handleFetchdata();
        break;
      default:
        console.log('default Case');
    }
  },[] // eslint-disable-line react-hooks/exhaustive-deps
);

useEffect(()=>{
  async function handleFetchdata(){
    const response = await fetch('/fetch_Matriz');
    const data = await response.json();
    setData(data);
    setCargando(false);
  };

  async function handleFetchEjecutiva(){
    const response = await fetch('/fetch_MatrizEjecutiva',{method:'POST',body:JSON.stringify({nombre:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
    const data = await response.json();
    setData(data);
    setCargando(false);
  };

  async function handleFetchCoordinador(){
    const response = await fetch('/fetch_MatrizCoordinadora',{method:'POST',body:JSON.stringify({coordinador:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
    const data = await response.json();
    setData(data);
    setCargando(false);
  };

  if(dataState){
    switch(authTokens.tipo){
      case "EJECUTIVA":
        handleFetchEjecutiva();
        setDataState(false);
        break;
      case "COORDINADOR":
        handleFetchCoordinador();
        setDataState(false);
        break;
      case "ADMINISTRADOR":
        handleFetchdata();
        setDataState(false);
        break;
      default:
        console.log('default Case');
    }
  }    
},[dataState] // eslint-disable-line react-hooks/exhaustive-deps
);
/*************************************************************/


return (    
  <React.Fragment>     
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
    <MuiThemeProvider theme={Creative}> 
      <MaterialTable
          title="MATRIZ"
          columns={state}
          data={data}
          isLoading={cargando}
          options={{
              grouping: true,
              filtering: true,
              selection: true,
              headerStyle: {
                backgroundColor: '#0E3B5F',
                color: '#FFF',
                fontWeight: 'bold',
              }
          }}
          localization={{
              header: {
                  actions: 'Actions'
              },
              body:{
                  editRow:{
                      deleteText: 'Seguro desea Eliminar?'
                  }
              },
              toolbar:{
                  searchPlaceholder: 'Buscador'
              },
              pagination:{
                  labelRowsSelect: 'Filas'
              },
              grouping:{
                  placeholder:'Arrastre algún encabezado para Agrupar'
              }
          }}
          editable={{  
              onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                  const url = 'fetch_Matriz';
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
                      setSnacks({
                        message:result.message,
                        severity:'success',
                        status:true
                      });
                      setDataState(true);
                      resolve();
                    }else{
                      setSnacks({
                        message:result.status,
                        severity:'error',
                        status:true
                      });
                      resolve();
                    }
                })
              }),
              onRowDelete: (oldData) =>
              new Promise(resolve => {
                if(authTokens.tipo !== 'EJECUTIVA'){
                  const url = 'fetch_Matriz';
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
                        setSnacks({
                          message:result.message,
                          severity:'success',
                          status:true
                        });
                        setDataState(true);
                        resolve();
                      }else{
                        setSnacks({
                          message:result.status,
                          severity:'error',
                          status:true
                        });
                        resolve();
                      }
                  });
                }else{
                  setSnacks({
                    message:'NO TIENE ACCESO PARA ELIMINAR',
                    severity:'error',
                    status:true
                  });
                  resolve();
                }
                  
              }),
          }}
          actions={[
              {
                tooltip: 'Eliminar todas las Matrices Seleccionadas',
                icon: 'delete',
                onClick: (evt, data) => new Promise(resolve => {
                  if(authTokens.tipo !== 'EJECUTIVA'){
                    const url = 'fetch_Matriz';
                    fetch(url,{
                      method: 'DELETE',
                      body: JSON.stringify(data),
                      headers:{
                        'Content-Type': 'application/json'
                      }
                    })
                    .then(response => response.json())
                    .then(result => {
                      if(result.message)
                        {
                          setSnacks({
                            message:result.message,
                            severity:'success',
                            status:true
                          });
                          setDataState(true);
                          resolve();
                        }else{
                          setSnacks({
                            message:result.status,
                            severity:'error',
                            status:true
                          });
                        }
                    });
                  }else{
                    setSnacks({
                      message:'NO TIENE ACCESO PARA ELIMINAR',
                      severity:'error',
                      status:true
                    });
                    resolve();
                  }
                })
              }
          ]}
          detailPanel={rowData => {
            const { formulario } = rowData;
            const FilasItem = formulario.map((value, index)=>(
                          <div style={{width:'100%', height:40, display:'flex', flexDirection:'row', justifyContent:'center', borderBottom:'1px solid #aaa'}} key={`fila${index}-${rowData.numMatriz}`}>
                            <div style={{width:'20%', textAlign:'center'}}>
                              { `PPTO.: ${value.numpro}`}
                            </div>
                            <div style={{width:'30%', textAlign:'left'}}>
                              { `Cadena: ${value.nomest}`}
                            </div>
                            <div style={{width:'30%', textAlign:'left'}}>
                              { `Tipo Trabajo: ${value.tiptra}`}
                            </div>
                            <div style={{width:'20%', textAlign:'left'}}>
                              { `Cantidad: ${value.cantreq}`}
                            </div>
                          </div>))
            
            return (
            <div style={{width:'100%'}}>
              { FilasItem }
            </div>
            )
          }}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{padding: '0px 10px', height:50}}>
                  {
                    isExcel && <ExcelComponent data={dataExcel} headers={headersExcel}/>
                  }
                </div>
              </div>
            ),
          }}
          
      />
    </MuiThemeProvider>
  </React.Fragment> 
  );
};


export default Matrizlist;