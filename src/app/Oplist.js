import React, { useState, useEffect} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { IconButton, TextField}  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from './Auth';
import { Autocomplete } from '@material-ui/lab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ExcelComponent from './ExcelComponent';

const headersExcel = [
  { field: 'numpro', numeric: true, disablePadding: false, title: 'Numpro' },
  { field: 'proyecto', numeric: false, disablePadding: false, title: 'Proyecto' },
  { field: 'cliente', numeric: false, disablePadding: false, title: 'Cliente' },
  { field: 'ejecutiva', numeric: false, disablePadding: false, title: 'Ejecutiva' },
  { field: 'cadena', numeric: false, disablePadding: false, title: 'Cadena' },
  { field: 'local', numeric: false, disablePadding: false, title: 'Local' },
  { field: 'ciudad', numeric: false, disablePadding: false, title: 'Ciudad' },
  { field: 'sector', numeric: false, disablePadding: false, title: 'Sector' },
  { field: 'direccion', numeric: false, disablePadding: false, title: 'Dirección' },
  { field: 'observacion', numeric: false, disablePadding: false, title: 'Observación' },
  { field: 'proStart', numeric: false, disablePadding: false, title: 'Producción Inicio' },
  { field: 'proAgr', numeric: false, disablePadding: false, title: 'Producción Acuerdo' },
  { field: 'proFin', numeric: false, disablePadding: false, title: 'Producción Fin' },
  { field: 'creacion', numeric: false, disablePadding: false, title: 'Creación' },
];
 
export default function Oplist() {
  /******************************ESTADOS****************************/
    
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [snacks, setSnacks] = useState({
      message:'Agregado',
      status:false,
      severity:'success'
    });
    const [dataState, setDataState] = useState(false);
    const { authTokens, setHeaderWord } = useAuth();
    const [clientes, setClientes] = useState([]);
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
        const response = await fetch('/fetch_oplist');
        const data = await response.json();
        setData(data);
        setCargando(false);
      };

      async function handleFetchEjecutiva(){
        const response = await fetch('/fetch_oplistEjecutiva',{method:'POST',body:JSON.stringify({nombre:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
        const data = await response.json();
        setData(data);
        setCargando(false);
      };
    
      async function handleFetchCoordinador(){
        const response = await fetch('/fetch_oplistCoordinadora',{method:'POST',body:JSON.stringify({coordinador:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
        const data = await response.json();
        setData(data);
        setCargando(false);
      };

      async function HandleClientes(){
        const fclientes = await fetch('/fetch_clientes'); 
        const jclientes = await fclientes.json();
          setClientes(jclientes); 
      };

      switch(authTokens.tipo){
        case "EJECUTIVA":
          setHeaderWord('O.P./List');
          handleFetchEjecutiva();
          HandleClientes();
          break;
        case "COORDINADOR":
          setHeaderWord('O.P./List');
          handleFetchCoordinador();
          HandleClientes();
          break;
        case "ADMINISTRADOR":
          setHeaderWord('O.P./List');
          handleFetchdata();
          HandleClientes();
          break;
        default:
          console.log('default');
          break;
      }
    },[] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
      async function handleFetchdata(){
        const response = await fetch('/fetch_oplist');
        const data = await response.json();
        setData(data);
        setCargando(false);
      }

      async function handleFetchEjecutiva(){
        const response = await fetch('/fetch_oplistEjecutiva',{method:'POST',body:JSON.stringify({nombre:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
        const data = await response.json();
        setData(data);
        setCargando(false);
      };
    
      async function handleFetchCoordinador(){
        const response = await fetch('/fetch_oplistCoordinadora',{method:'POST',body:JSON.stringify({coordinador:authTokens.nombre}),headers:{'Content-Type':'application/json'}});
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
           console.log('default');
            break;
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
              title="O.P."
              columns={[
                        {title: 'N° PROFORMA', field: 'numpro' },
                        {title: 'PROYECTO', field: 'proyecto' },
                        {title: 'CLIENTE', field: 'cliente', editable:'onAdd',headerStyle: {width:300},
                        editComponent: props => (
                          <Autocomplete                                           
                              options={clientes}
                              size='small'
                              style={{position:'relative',top:-9}}
                              getOptionLabel={(option)=>option.cliente}
                              inputValue={props.value}
                              onInputChange={(e,value)=> props.onChange(value)}
                              renderInput={(params) => <TextField {...params} fullWidth label="Cliente" />}
                          />
                        )},
                        {title: 'EJECUTIVA', field: 'ejecutiva', editable:'never' },
              ]}
              data={data}
              isLoading={cargando}
              options={{
                  grouping: true,
                  filtering: true,
                  exportButton: true,
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
              header={true}
              editable={{
                  onRowAdd: newData =>
                  new Promise(resolve => {
                      const url = 'fetch_opAdd';
                      fetch(url,{
                          method: 'POST',
                          body: JSON.stringify({numpro:newData.numpro,proyecto:newData.proyecto,cliente:newData.cliente,ejecutiva:authTokens.nombre,coordinador:authTokens.coordinador}),
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
                  onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                      const url = 'fetch_opPutlist';
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
                  onRowDelete: oldData =>
                  new Promise(resolve => {
                    if(authTokens.tipo !== 'EJECUTIVA'){
                      const url = 'fetch_opDelete';
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
                          }else
                          {
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
                    tooltip: 'Eliminar todas las O.P. Seleccionadas',
                    icon: 'delete',
                    onClick: (evt, data) => new Promise(resolve => {
                      if(authTokens.tipo !== 'EJECUTIVA'){
                        const url = 'fetch_opDelete';
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
                    })
                  }
                ]}
              components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <div style={{padding: '0px 10px', height:50}}>
                      <ExcelComponent data={data} headers={headersExcel}/>
                    </div>
                  </div>
                ),
              }}
          />
        </MuiThemeProvider>
      </React.Fragment> 
      );
}


