import React, { useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import MuiAlert from '@material-ui/lab/Alert';
import {
            Grid,
            Paper,
            Snackbar,
            TextField
        } from '@material-ui/core';
import { useAuth } from './Auth';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    const [ headers, setHeaders] = useState([]);
    const [ search, setSearch ] = useState('');
    const headersFixed = ['Cadena','Local', 'Ciudad', 'Sector', 'Direccion', 'insStart', 'insAgr', 'insFin', 'insHora', 'Observacion'];
    const { setHeaderWord } = useAuth();

    useEffect(
        ()=>{
            setHeaderWord('Cronograma/Unitario');
        },[] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
        ()=>{
            dataState && ( 
            fetch('Cronograma_Info',{
                method:'POST',
                body:JSON.stringify({numpro:search}),
                headers:{'Content-Type':'application/json'}
                })
                .then(response=> response.json())
                .then(result =>{
                    setDataState(false);
                    setData(result[0].items);
              }))
        },[dataState] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const HandleSearchSet =(e)=>{
        if(e.target.value === ''){
            setSearch(e.target.value);
            setData([]);
            setCargando(true);
            setDataState(false);
            setHeaders([]);
        }else{
            setSearch(e.target.value);
        }
        
    };

    const HandleSearch = () =>{
        fetch('Cronograma_Info',{
            method:'POST',
            body:JSON.stringify({numpro:search}),
            headers:{'Content-Type':'application/json'}
          })
          .then(response=> response.json())
          .then(result =>{
            if(result.status){
                setSnacks({
                    message:result.status,
                    severity:'error',
                    status:true
                    });
            }else{
                setSnacks({
                    message:'Cargado',
                    severity:'success',
                    status:true
                    });  
                let arr = [];
                let nume = result[0].encabezados.length -1;
                let numh = headersFixed.length - 1;
                headersFixed.foreach((value, index)=>{
                  if(index === numh){
                    result[0].encabezados.foreach((value,index)=>{
                      arr.push({title:value.tiptra, field:value.tiptra });
                      if(index === nume){
                        setHeaders(arr);
                        setCargando(false);
                        setData(result[0].items);
                      }
                    });
                  }else{
                    arr.push({title:value, field:value })
                  }
                });
            }
            
            
            
          });
    }

    return (    
      <React.Fragment>     
        <Snackbar
            open={snacks.status}
            onClose={()=>setSnacks({...snacks, status:false})}
            autoHideDuration={4000}
        >
          <Alert onClose={()=>setSnacks({...snacks, status:false})}  severity={snacks.severity}>
            {snacks.message}
          </Alert>
        </Snackbar>
        <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Paper elevation={2} style={{padding:5}} square>
                                <TextField
                                    id='Search'
                                    label='Presupuesto'
                                    fullWidth
                                    variant='outlined'
                                    onChange={HandleSearchSet}
                                    value={search || ''}
                                    type='Number'
                                    autoFocus
                                    size='small'
                                    onKeyPress={(e)=>{
                                        const code = e.keyCode || e.which;
                                        if(code === 13)
                                            HandleSearch();
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div style={{maxWidth:'100%'}}>
                                <MaterialTable
                                    title="O.P."
                                    columns={headers}
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
                                    header
                                    editable={{
                                        onRowAdd: newData =>
                                        new Promise(resolve => {
                                            const url = 'fetch_opAdd';
                                            fetch(url,{
                                                method: 'POST',
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
                                            const url = 'fetch_opPutlist';
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
                                        }),
                                    }}
                                    actions={[
                                    {
                                        tooltip: 'Eliminar todas las O.P. Seleccionadas',
                                        icon: 'delete',
                                        onClick: (evt, data) => new Promise(resolve => {
                                        
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
    
                                        })
                                    }
                                    ]}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
      </React.Fragment> 
      );
}


