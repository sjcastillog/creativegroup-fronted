import React, { useState, useEffect} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Button,
         Card,
         CardActions, 
         CardActionArea,
         CardMedia,
         CssBaseline,
         Grid,
         Paper,
         Dialog,
} from '@material-ui/core';

import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import ITCAvant from '../../fonts/ITCAvantGardePro-Md.ttf'; 
import useModal from '../hooksPerson/useModal';

const itc = {
  fontFamily: 'Itc',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('ITC'),
    local('ITC-Regular'),
    url(${ITCAvant}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const Creative = createMuiTheme({
  palette: {
    primary: {
      main: '#0E3B5F'
    },
    secondary: {
      main: '#CAD226',
    },
  },
  typography: {
    fontFamily: 'Itc, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [itc],
      },
    },
  },
});


const useStyles = makeStyles(theme => ({
    paper:{
        width: '85vw',
        height: '88vh',
        marginTop:-18,
        borderColor: '#0E3B5F',
        borderStyle: 'solid',
        borderWidth: 2,
        bordeTopStyle: 'none',
        backgroundImage: `url('/images/fondoElementMatriz.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '600px 500px',
        backgroundPosition: '1060px 350px',
      },
  card:{
    width: 200,
    height:180,
    textAlign:'center',
    padding: 10,
    margin: 0,
  },
  cardactions:{
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  divcardactions:{
    display: 'flex',
    justifyContent: 'center',
  },
  buttons:{
    color:'#0E3B5F',
    textAlign: 'center',
    width: 120,
    fontWeight:'bold'
  },
  buttonsE:{
    color:'#0E3B5F',
    textAlign: 'center',
    width: 160,
    fontWeight:'bold'
  },
  grid:{
    padding:10, 
    height:'100%',
  },
  cards:{
    borderStyle:'none',
    boxShadow: 'none',
    backgroundColor: 'transparent'
  }
}));


function Elements(){
    const classes = useStyles(); 
    const { enqueueSnackbar } = useSnackbar();
    const [ Cadenas, setCadenas] = useState([]);
    const [ Mercaderistas, setMercaderistas] = useState([]);
    const [ Marcas, setMarcas] = useState([]);
    const [ TiposTrabajo, setTiposTrabajo] = useState([]);
    const [ Costos, setCostos] = useState([]);
    const [ openCad, handleOpenCad, handleCloseCad ] = useModal();
    const [ openMer, handleOpenMer, handleCloseMer ] = useModal();
    const [ openMar, handleOpenMar, handleCloseMar ] = useModal();
    const [ openTip, handleOpenTip, handleCloseTip ] = useModal();
    const [ openCostos, handleOpenCostos, handleCloseCostos ] = useModal();

    useEffect(()=>{
        async function handleInformacion(){
            const response =  await fetch('/MercaderistasLists')
            const info = await response.json()
            const resTiptra = await fetch('/TiptraMercs')
            const infoTipTra = await resTiptra.json()
            const resMarca = await fetch('/MarcasMerc')
            const infoMarca = await resMarca.json()
            const resCadenas = await fetch('/cadenasmerc')
            const infoCadenas= await resCadenas.json()
            const resCostos = await fetch('/CostosMercs')
            const infoCostos= await resCostos.json()
            setMercaderistas(info)
            setTiposTrabajo(infoTipTra)
            setMarcas(infoMarca)
            setCadenas(infoCadenas)
            setCostos(infoCostos)
        };

        handleInformacion()
    },[]);

    const handleAdd = ( Db, info )=>{
        switch(Db){
            case 'CADENAS':
                const arr1 = [...Cadenas];
                arr1.push(info);
                setCadenas(arr1);
                break;
            case 'MARCAS':
                const arr2 = [...Marcas];
                arr2.push(info);
                setMarcas(arr2);
                break;
            case 'MERCADERISTAS':
                const arr3 = [...Mercaderistas];
                arr3.push(info);
                setMercaderistas(arr3);
                break;
            case 'TIPTRA':
                const arr4 = [...TiposTrabajo];
                arr4.push(info);
                setTiposTrabajo(arr4);
                break;
            case 'COSTOS':
                const arr5 = [...Costos];
                arr5.push(info);
                setCostos(arr5);
                break;
            default: console.log('DEFAULT HANDLE ADD');
        }
    };

    const handleUpdate = ( Db, info )=>{
        switch(Db){
            case 'CADENAS':
                const arr1 = Cadenas.map(elDato=>{
                    if(elDato._id === info._id){
                        return info
                    }else{
                        return elDato
                    }
                });
                setCadenas(arr1);
                break;
            case 'MARCAS':
                const arr2 = Marcas.map(elDato=>{
                    if(elDato._id === info._id){
                        return info
                    }else{
                        return elDato
                    }
                });
                setMarcas(arr2);
                break;
            case 'MERCADERISTAS':
                const arr3 = Mercaderistas.map(elDato=>{
                    if(elDato._id === info._id){
                        return info
                    }else{
                        return elDato
                    }
                });
                setMercaderistas(arr3);
                break;
            case 'TIPTRA':
                const arr4 = TiposTrabajo.map(elDato=>{
                    if(elDato._id === info._id){
                        return info
                    }else{
                        return elDato
                    }
                });
                setTiposTrabajo(arr4);
                break;
            case 'COSTOS':
                const arr5 = Costos.map(elDato=>{
                    if(elDato._id === info._id){
                        return info
                    }else{
                        return elDato
                    }
                });
                setCostos(arr5);
                break;
            default: console.log('DEFAULT HANDLE UPDATE');
        }
    };

    const handleDelete = ( Db, info )=>{
        switch(Db){
            case 'CADENAS':
                const arr1 = Cadenas.filter(elDato=> elDato._id !== info._id);
                setCadenas(arr1);
                break;
            case 'MARCAS':
                const arr2 = Marcas.filter(elDato=> elDato._id !== info._id);
                setMarcas(arr2);
                break;
            case 'MERCADERISTAS':
                const arr3 = Mercaderistas.filter(elDato=> elDato._id !== info._id);
                setMercaderistas(arr3);
                break;
            case 'TIPTRA':
                const arr4 = TiposTrabajo.filter(elDato=> elDato._id !== info._id);
                setTiposTrabajo(arr4);
                break;
            case 'COSTOS':
                const arr5 = Costos.filter(elDato=> elDato._id !== info._id);
                setCostos(arr5);
                break;
            default: console.log('DEFAULT HANDLE DELETE');
        }
    };


    return(
        <React.Fragment>
            <ThemeProvider theme={Creative}>
                <CssBaseline />
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3} className={classes.grid}  alignItems="center">
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea onClick={handleOpenMer}>
                                        <CardMedia
                                            component="img"
                                            alt="MERCADERISTAS"
                                            image="/images/Mesa de trabajo 26.png"
                                            title="MERCADERISTAS"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                            <Button variant="contained" color="secondary" className={classes.buttons} onClick={handleOpenMer}>
                                                MERCADERITAS
                                            </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea onClick={handleOpenTip}>
                                        <CardMedia
                                            component="img"
                                            alt="TIPO TRABAJO"
                                            image="/images/Mesa de trabajo 28.png"
                                            title="TIPO TRABAJO"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={handleOpenTip}>
                                            TIPO TRABAJO
                                        </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>                             
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea  onClick={handleOpenMar}>
                                        <CardMedia
                                            component="img"
                                            alt="MARCAS"
                                            image="/images/Mesa de trabajo 30.png"
                                            title="MARCAS"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={handleOpenMar}>
                                            MARCAS
                                        </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                        <CardActionArea onClick={handleOpenCad}>
                                            <CardMedia
                                                component="img"
                                                alt="CADENAS"
                                                image="/images/Mesa de trabajo 34.png"
                                                title="CADENAS"
                                                />
                                        </CardActionArea>
                                        <div className={classes.divcardactions}>
                                            <CardActions className={classes.cardactions} disableSpacing>
                                            <Button variant="contained" color="secondary" className={classes.buttonsE} size='large' onClick={handleOpenCad}>
                                            CADENAS
                                            </Button>
                                            </CardActions>
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                        <CardActionArea onClick={handleOpenCad}>
                                            <CardMedia
                                                component="img"
                                                alt="COSTOS"
                                                image="/images/Mesa de trabajo 34.png"
                                                title="COSTOS"
                                                />
                                        </CardActionArea>
                                        <div className={classes.divcardactions}>
                                            <CardActions className={classes.cardactions} disableSpacing>
                                            <Button variant="contained" color="secondary" className={classes.buttonsE} size='large' onClick={handleOpenCostos}>
                                            COSTOS
                                            </Button>
                                            </CardActions>
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </ThemeProvider>

            <Dialog
                open={openMer}
                onClose={handleCloseMer}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="MERCADERISTAS"
                    columns={[{title: 'MERCADERISTA', field: 'Mercaderista'}]}
                    data={Mercaderistas}
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Usuarios Clientes'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            fetch('/MercaderistasLists',{
                                method: 'POST',
                                body: JSON.stringify(newData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result._id){
                                    enqueueSnackbar('MERCADERISTA ADD', {variant:'success'})
                                    handleAdd('MERCADERISTAS', result);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            fetch('/MercaderistasLists',{
                            method: 'PUT',
                            body: JSON.stringify(newData),
                            headers:{
                                'Content-Type': 'application/json'
                            }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleUpdate('MERCADERISTAS', newData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) =>{ 
                            fetch('/MercaderistasLists',{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleDelete('MERCADERISTAS', oldData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            });
                        }),
                    }}             
                />   
            </Dialog>
            <Dialog
                open={openMar}
                onClose={handleCloseMar}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="MARCAS"
                    columns={[{title: 'MARCA', field: 'MARCA'}, {title: 'PRESENTACION', field: 'PRESENTACION'}, {title: 'TAMANO', field: 'TAMANO'}, {title: 'VARIANTE', field: 'VARIANTE'}]}
                    data={Marcas}
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Usuarios Clientes'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            fetch('/MarcasMerc',{
                                method: 'POST',
                                body: JSON.stringify(newData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result._id){
                                    enqueueSnackbar('MARCA ADD', {variant:'success'})
                                    handleAdd('MARCAS', result);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            fetch('/MarcasMerc', {
                            method: 'PUT',
                            body: JSON.stringify(newData),
                            headers:{
                                'Content-Type': 'application/json'
                            }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleUpdate('MARCAS', newData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            fetch('/MarcasMerc',{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleDelete('MARCAS', oldData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            });
                        }),
                    }}
                />   
            </Dialog>
            <Dialog
                open={openTip}
                onClose={handleCloseTip}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="TIPOS DE TRABAJO"
                    columns={[{title: 'CLIENTE', field: 'Cliente'}, {title: 'TIPTRA', field: 'Tiptra'}, {title: 'MARCA', field: 'Marca'}]}
                    data={TiposTrabajo}
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Usuarios Clientes'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            fetch('/TiptraMercs',{
                                method: 'POST',
                                body: JSON.stringify(newData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result._id){
                                    enqueueSnackbar('TIPTRA ADD', {variant:'success'})
                                    handleAdd('TIPTRA', result);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            fetch('/TiptraMercs', {
                            method: 'PUT',
                            body: JSON.stringify(newData),
                            headers:{
                                'Content-Type': 'application/json'
                            }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleUpdate('TIPTRA', newData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            fetch('/TiptraMercs',{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleDelete('TIPTRA', oldData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            });
                        }),
                    }}
                />   
            </Dialog>
            <Dialog
                open={openCad}
                onClose={handleCloseCad}   
                fullWidth={true}                         
                maxWidth='md'
            >
                <MaterialTable
                    title="CADENAS"
                    columns={[{title: 'CADENA', field: 'cadena'}, {title: 'LOCAL', field: 'local'}, {title: 'CIUDAD', field: 'ciudad'}, {title: 'DIRECCION', field: 'direccion'}, {title: 'PROVINCIA', field: 'provincia'}]}
                    data={Cadenas}
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Usuarios Clientes'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            fetch('/cadenasmerc',{
                                method: 'POST',
                                body: JSON.stringify(newData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result._id){
                                    enqueueSnackbar('CADENA ADD', {variant:'success'})
                                    handleAdd('CADENAS', result);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            fetch('/cadenasmerc', {
                            method: 'PUT',
                            body: JSON.stringify(newData),
                            headers:{
                                'Content-Type': 'application/json'
                            }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleUpdate('CADENAS', newData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            fetch('/cadenasmerc',{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleDelete('CADENAS', oldData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            });
                        }),
                    }}
                />   
            </Dialog>
            <Dialog
                open={openCostos}
                onClose={handleCloseCostos}   
                fullWidth={true}                         
                maxWidth='md'
            >
                <MaterialTable
                    title="COSTOS"
                    columns={[{title: 'TIPO', field: 'TIPO'}, {title: 'CATEGORIA', field: 'CATEGORIA'}, {title: 'RUBRO', field: 'RUBRO'}, {title: 'CONCEPTO', field: 'CONCEPTO'}, {title: 'INDICADOR', field: 'INDICADOR'}]}
                    data={Costos}
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'COSTOS'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            fetch('/CostosMercs',{
                                method: 'POST',
                                body: JSON.stringify(newData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result._id){
                                    enqueueSnackbar('COSTO ADD', {variant:'success'})
                                    handleAdd('COSTOS', result);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            fetch('/CostosMercs', {
                            method: 'PUT',
                            body: JSON.stringify(newData),
                            headers:{
                                'Content-Type': 'application/json'
                            }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleUpdate('COSTOS', newData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            fetch('/CostosMercs',{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result);
                                if(result.message){
                                    enqueueSnackbar(result.message, {variant:'success'})
                                    handleDelete('COSTOS', oldData);
                                    resolve();
                                }else{
                                    enqueueSnackbar(result.status, {variant:'error'})
                                }
                            });
                        }),
                    }}
                />   
            </Dialog>
        </React.Fragment>
        
        
    );
}

const ElementMerc = ()=>{

    return(
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
            <Elements/>
        </SnackbarProvider>
    )
}

export default ElementMerc;