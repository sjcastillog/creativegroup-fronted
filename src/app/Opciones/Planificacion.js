import React, { useState, useEffect } from 'react';
import {    
            Grid,
            Paper,
        } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { SnackbarProvider, useSnackbar } from 'notistack';
import MaterialTable from 'material-table';
import { useAuth } from "../Auth";

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

const Headers = [
    {title:'Fecha Laborable', field:'fecLab'},
    {title:'Dia Semana', field:'diaSem'},
    {title:'Semana Anio', field:'semAnio'},
    {title:'Semana Mes Anterior', field:'semMesAnt'},
    {title:'Semana del Mes', field:'semMes'},
];



const Acceso = () =>{
    const { enqueueSnackbar } = useSnackbar();
    const [ data, setData ] = useState([]);
    const [ cargando, setCargando] = useState(true);
    const { authTokens } = useAuth();

 
    useEffect(
        ()=>{
            async function handleData(){
                const response = await fetch('/ReporteriaPlanificacion')
                const data = await response.json();
                setData(data);
                setCargando(false);
            };

                handleData();
        },[] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleAdd = (info)=>{
        const dataArr = [...data];
        dataArr.push(info);
        setData(dataArr);
    }

    const handleDelete = (info)=>{
        const dataArr = [...data];
        const dataFilter = dataArr.filter(el=>el._id !== info._id);
        setData(dataFilter);
    }

    const handleUpdate = (info)=>{
        const dataArr = [...data];
        const dataUpdate = dataArr.map(el=>{
            if(el._id === info._id){
                return info;
            }else{
                return el;
            }
        })
        setData(dataUpdate);
    }

    return(
        <ThemeProvider theme={CreativeColors}>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Paper elevation={3}>
                        <MaterialTable
                            title="Planificacion"
                            columns={Headers}
                            data={data}
                            isLoading={cargando}
                            options={{
                                filtering: true,
                                headerStyle: {
                                    backgroundColor: '#0E3B5F',
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                },
                                pageSize:8
                            }}
                            header={true}
                            editable={{  
                                onRowAdd: (newData) =>
                                new Promise(resolve => {
                                    fetch('/ReporteriaPlanificacion', {
                                        method: 'POST',
                                        body: JSON.stringify(newData),
                                        headers:{
                                        'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(result => {
                                        if(result.status)
                                        {
                                            enqueueSnackbar(result.status, { variant:'error'});
                                            resolve();
                                        }else{
                                            handleAdd(result);
                                            enqueueSnackbar('ELEMENTO AGREGADO', { variant:'success'})
                                            resolve();
                                        }
                                    })
                                }),
                                onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    fetch('/ReporteriaPlanificacion', {
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
                                            enqueueSnackbar(result.message, { variant:'success'});
                                            handleUpdate(newData)
                                            resolve();
                                        }else{
                                            enqueueSnackbar(result.status, { variant:'error'})
                                            resolve();
                                        }
                                    })
                                }),
                                onRowDelete: (oldData) =>
                                new Promise(resolve => {
                                    fetch('/ReporteriaPlanificacion', {
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
                                            enqueueSnackbar(result.message, { variant:'success' });
                                            handleDelete(oldData);
                                            resolve();
                                        }else{
                                            enqueueSnackbar(result.status, { variant:'error' })
                                            resolve();
                                        }
                                    })
                                }),
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default function Accesos() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Acceso />
        </SnackbarProvider>
    );
}