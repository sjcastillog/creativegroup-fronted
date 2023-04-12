import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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

function Entrega(){

    const [cargando, setCargando] = useState(true);
    const [data, setData]= useState([]);
    //const [ dataState, setDataState] = useState(false);
    const headersFixed = [{title:'Numpro', field:'numpro'},{title:'Ejecutiva', field:'ejecutiva'} ,{title:'Coordinadora', field:'coordinador'}];
    

    useEffect(()=>{
      async function Req (){
        const ReqCrono = await fetch('EntregasTot');
        const JsonCrono = await  ReqCrono.json();
        setData(JsonCrono);
        setCargando(false);
      }

      Req();
      
    },[]);

    return(
      <MuiThemeProvider theme={Creative}> 
        <MaterialTable
          title={'Entregas'}
          columns={headersFixed}
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
                      const url = 'Crono_Items';
                      fetch(url,{
                          method: 'POST',
                          body: JSON.stringify({numpro:data.numpro,newData}),
                          headers:{
                          'Content-Type': 'application/json'
                          }
                      })
                      .then(response => response.json())
                      .then(result => {
                          if(result.message){ 
                            //setDataState(true);
                            resolve();                  
                          }else{                         
                            
                            resolve();
                          }
                      })
                  }),
              onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                  const url = 'Crono_Items';
                  fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify({numpro:data.numpro,newData}),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(response => response.json())
                  .then(result => {
                    if(result.message)
                    {
                      //setDataState(true);
                      resolve();
                    }else{
                      resolve();
                    }
                })
              }),
              onRowDelete: (oldData) =>
              new Promise(resolve => {
                  const url = 'Crono_Items';
                  fetch(url, {
                      method: 'DELETE',
                      body: JSON.stringify({numpro:data.numpro,oldData}),
                      headers:{
                      'Content-Type': 'application/json'
                      }
                  })
                  .then(response =>  response.json())
                  .then(result => {
                      if(result.message)
                      {
                        //setDataState(true);
                        resolve();
                      }else{
                        resolve();
                      }
                  });
              }),
          }}
          actions={[
            
              {
                tooltip: 'Eliminar todas las Matrices Seleccionadas',
                icon: 'delete',
                onClick: (evt, data) => new Promise(resolve => {
                  
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
                          
                          //setDataState(true);
                          resolve();
                        }else{
                          
                        }
                    });
                  
                })
              }
              
          ]}
        />
      </MuiThemeProvider> 
    )
}


export default Entrega;