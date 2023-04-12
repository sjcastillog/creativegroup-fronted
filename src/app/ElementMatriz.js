import React, { useState, useEffect} from 'react';
import { Button,
         Card,
         CardActions, 
         CardActionArea,
         CardMedia,
         CssBaseline,
         Grid,
         Paper,
         Dialog,
         Snackbar,
         IconButton,
         Slide} from '@material-ui/core';
import {
         Close as CloseIcon
        } from '@material-ui/icons';
import { Alert } from '@material-ui/lab'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import ITCAvant from '../fonts/ITCAvantGardePro-Md.ttf'; 

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


function ElementMatriz(){

    async function handleFetchUsuarios(){
        const response =  await fetch('/fetch_getMatrizUsuarios')
        const info = await response.json()
        setUsuarios(info)
    };

    async function handleFetchMatPrin(){
        const resMatPrin = await fetch('/Matriz_MaterialPrincipal')
        const infoMatPrin = await resMatPrin.json()
        setMatPrin_Tags(infoMatPrin)
    };

    async function handleFetchTipTra(){
        const resTiptra = await fetch('/Matriz_TiposTrabajo')
        const infoTipTra = await resTiptra.json()
        setTipTra_Tags(infoTipTra)
    };

    async function handleFetchMarca(){
        const resMarca = await fetch('/Matriz_Marcas')
        const infoMarca = await resMarca.json()
        setMarca_Tags(infoMarca)
    };

    async function handleFetchCliente(){
        const resCliente = await fetch('/fetch_clientes')
        const infoCliente = await resCliente.json()
        setCliente_Tags(infoCliente)
    }

    async function handleFetchTipReq(){
        const resTipReq = await fetch('/Matriz_TipReq')
        const infoTipReq = await resTipReq.json()
        setTipReq_Tags(infoTipReq)
    }

    async function handleFetchEstablecimientos(){
        const resEst = await fetch('/Matriz_Establecimientos')
        const infoEst = await resEst.json()
        setEstablecimientos_Tags(infoEst)
    }

    async function handleFetchTipVen(){
        const restv = await fetch('/Matriz_TipVentas')
        const infotv = await restv.json()
        setTipVen_Tags(infotv)
    }

    const [usuarios, setUsuarios] = useState([]);
    const [ matPrin_Tags, setMatPrin_Tags] = useState([]);
    const [ tipTra_Tags, setTipTra_Tags] = useState([]);
    const [ marca_Tags, setMarca_Tags] = useState([]);
    //const [ area_Tags, setArea_Tags] = useState([]);
    //const [ categoria_Tags, setCategoria_Tags] = useState([]);
    const [ cliente_Tags, setCliente_Tags] = useState([]);
    const [ establecimientos_Tags, setEstablecimientos_Tags] = useState([]);
    const [ tipReq_Tags, setTipReq_Tags] = useState([]);
    const [ tipVen_Tags, setTipVen_Tags] = useState([]);
    const [snacks, setSnacks] = useState({status:false, message:'', severity:'success'});
    const [dialogState, setDialogState] = useState({
        cliente:false,
        usuario:false,
        tipreq:false,
        tiptra:false,
        matprin:false,
        marca:false,
        categoria:false,
        establecimientos:false,
        area:false,
        tipven:false
    });

    useEffect(()=>{
        handleFetchUsuarios()
        handleFetchMatPrin()
        handleFetchTipTra()
        handleFetchMarca()
        handleFetchCliente()
        handleFetchTipReq()
        handleFetchEstablecimientos()
        handleFetchTipVen()
    },[])

    const classes = useStyles(); 
    return(
        <React.Fragment>
            <Snackbar
                open={snacks.status}
                onClose={()=>setSnacks({...snacks, status:false})}
                anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
                TransitionComponent={Slide}
                autoHideDuration={2500}
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
            <ThemeProvider theme={Creative}>
                <CssBaseline />
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3} className={classes.grid}  alignItems="center">
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea onClick={()=>setDialogState({dialogState, cliente:true})}>
                                        <CardMedia
                                            component="img"
                                            alt="Clientes"
                                            image="/images/Mesa de trabajo 25.png"
                                            title="Clientes"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                            <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setDialogState({dialogState, cliente:true})}>
                                                Clientes
                                            </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                        <CardActionArea onClick={()=>setDialogState({dialogState, usuario:true})}>
                                            <CardMedia
                                                component="img"
                                                alt="Usuarios"
                                                image="/images/Mesa de trabajo 26.png"
                                                title="Usuarios"
                                                />
                                        </CardActionArea>
                                        <div className={classes.divcardactions}>
                                            <CardActions className={classes.cardactions} disableSpacing>
                                            <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setDialogState({dialogState, usuario:true})}>
                                                Usuarios
                                            </Button>
                                            </CardActions>
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Tipo Req"
                                            image="/images/Mesa de trabajo 27.png"
                                            title="Tipo Req."
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                            <Button variant="contained" size='large' color="secondary" className={classes.buttons} onClick={()=>setDialogState({dialogState, tipreq:true})}>
                                                Tipo Req.
                                            </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Tipo Trabajo"
                                            image="/images/Mesa de trabajo 28.png"
                                            title="Tipo Trabajo"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setDialogState({dialogState, tiptra:true})}>
                                            Tipo Trabajo
                                        </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="M. Principal"
                                            image="/images/Mesa de trabajo 29.png"
                                            title="M. Principal"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setDialogState({dialogState, matprin:true})}>
                                            M. Principal
                                        </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Marca"
                                            image="/images/Mesa de trabajo 30.png"
                                            title="Marca"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setDialogState({dialogState, marca:true})}>
                                            Marca
                                        </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Tipo Venta"
                                            image="/images/Mesa de trabajo 33.png"
                                            title="Tipo Venta"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setDialogState({dialogState, tipven:true})}>
                                            Tipo Venta
                                        </Button>
                                        </CardActions>
                                    </div>
                                </Card>
                                </Grid>
                                <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
                                    <Card className={classes.cards}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Establecimientos"
                                            image="/images/Mesa de trabajo 34.png"
                                            title="Establecimientos"
                                            />
                                    </CardActionArea>
                                    <div className={classes.divcardactions}>
                                        <CardActions className={classes.cardactions} disableSpacing>
                                        <Button variant="contained" color="secondary" className={classes.buttonsE} size='large' onClick={()=>setDialogState({dialogState, establecimientos:true})}>
                                            ESTABLECIMIENTOS
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
                open={dialogState.usuario}
                onClose={()=>setDialogState({...dialogState, usuario:false})}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="Usuarios"
                    columns={[{title: 'USUARIO', field: 'usuario'}]}
                    data={usuarios}
                    options={{
                        selection: true
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
                            let url = 'fetch_addMatrizUsuario'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchUsuarios();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'fetch_putMatrizUsuario';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchUsuarios();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'fetch_deleteMatrizUsuario';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchUsuarios();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos los Usuarios Seleccionados',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'fetch_deleteMatrizUsuario';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchUsuarios();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
            <Dialog
                open={dialogState.matprin}
                onClose={()=>setDialogState({...dialogState, matprin:false})}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="Material Principal"
                    columns={[{title: 'Material', field: 'matprin'}]}
                    data={matPrin_Tags}
                    options={{
                        selection: true
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Material Principal'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            let url = 'Matriz_MaterialPrincipal'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchMatPrin();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'Matriz_MaterialPrincipal';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchMatPrin();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'Matriz_MaterialPrincipal';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchMatPrin();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos los Materiales Seleccionados',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'Matriz_MaterialPrincipal';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchMatPrin();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
            <Dialog
                open={dialogState.tiptra}
                onClose={()=>setDialogState({...dialogState, tiptra:false})}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="Tipos de Trabajo"
                    columns={[{title: 'Trabajo', field: 'tiptra'}]}
                    data={tipTra_Tags}
                    options={{
                        selection: true,
                        exportButton: true,
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Tipos de Trabajo'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            let url = 'Matriz_TiposTrabajo'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipTra();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'Matriz_TiposTrabajo';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipTra();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'Matriz_TiposTrabajo';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipTra();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos los Trabajos Seleccionados',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'Matriz_TiposTrabajo';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchTipTra();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
            <Dialog
                open={dialogState.marca}
                onClose={()=>setDialogState({...dialogState, marca:false})}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="Marcas"
                    columns={[{title: 'Marca', field: 'marca'}, {title: 'Categoria', field: 'categoria'}, {title: 'Area', field: 'area'}]}
                    data={marca_Tags}
                    options={{
                        selection: true,
                        exportButton: true,
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Marcas'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            let url = 'Matriz_Marcas'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchMarca();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'Matriz_Marcas';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchMarca();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'Matriz_Marcas';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchMarca();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos las Marcas Seleccionadas',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'Matriz_Marcas';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchMarca();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
            <Dialog
                open={dialogState.cliente}
                onClose={()=>setDialogState({...dialogState, cliente:false})}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="Clientes"
                    columns={[{title: 'Cliente', field: 'cliente'}]}
                    data={cliente_Tags}
                    options={{
                        selection: true
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Clientes'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            let url = 'fetch_addcliente'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchCliente();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'fetch_putcliente';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchCliente();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'fetch_deletecliente';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchCliente();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos los TClientes Seleccionados',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'fetch_deletecliente';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchCliente();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
            <Dialog
                open={dialogState.tipreq}
                onClose={()=>setDialogState({...dialogState, tipreq:false})}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="Tipo Req."
                    columns={[{title: 'Tipo', field: 'tipreq'}]}
                    data={tipReq_Tags}
                    options={{
                        selection: true
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Tipos'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            let url = 'Matriz_TipReq'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipReq();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'Matriz_TipReq';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipReq();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'Matriz_TipReq';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipReq();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos los Tipos Seleccionados',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'Matriz_TipReq';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchTipReq();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
            <Dialog
                open={dialogState.establecimientos}
                onClose={()=>setDialogState({...dialogState, establecimientos:false})}   
                fullWidth={true}                         
                maxWidth='md'
            >
                <MaterialTable
                    title="Establecimientos"
                    columns={[{title: 'Local', field: 'local'}, {title: 'Ciudad', field: 'ciudad'}, {title: 'Sector', field: 'sector'}, {title: 'Direccion', field: 'direccion'}]}
                    data={establecimientos_Tags}
                    options={{
                        selection: true
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Establecimientos'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            let url = 'Matriz_Establecimientos'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchEstablecimientos();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'Matriz_Establecimientos';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchEstablecimientos();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'Matriz_Establecimientos';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchEstablecimientos();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos los Items Seleccionados',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'Matriz_Establecimientos';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchEstablecimientos();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
            <Dialog
                open={dialogState.tipven}
                onClose={()=>setDialogState({...dialogState, tipven:false})}   
                fullWidth={true}                         
                maxWidth='sm'
            >
                <MaterialTable
                    title="Tipos de Venta"
                    columns={[{title: 'Tipo', field: 'tipven'}]}
                    data={tipVen_Tags}
                    options={{
                        selection: true
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
                            searchPlaceholder: 'Buscador',
                            nRowsSelected: '{0} fila(s) seleccionada(s)'
                        },
                        pagination:{
                            labelRowsSelect: 'Filas'
                        },
                        grouping:{
                            placeholder:'Arrastre algún encabezado para Agrupar'
                        },
                        exportFileName:'Tipos'
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            let url = 'Matriz_TipVentas'
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipVen();
                                    resolve();
                                }else
                                {
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            const url = 'Matriz_TipVentas';
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
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipVen();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            })
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            const url = 'Matriz_TipVentas';
                            fetch(url,{
                                method: 'DELETE',
                                body: JSON.stringify(oldData),
                                headers:{
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                if(result.message)
                                {
                                    setSnacks({status:true,severity:'success',message:result.message});
                                    handleFetchTipVen();
                                    resolve();
                                }else{
                                    setSnacks({status:true,severity:'error',message:result.status});
                                }
                            });
                        }),
                    }}
                    actions={[
                    {
                        tooltip: 'Eliminar todos las Marcas Seleccionadas',
                        icon: 'delete',
                        onClick: (evt, data) => new Promise(resolve => {
                        const url = 'Matriz_TipVentas';
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
                                setSnacks({status:true,severity:'success',message:result.message});
                                handleFetchTipVen();
                                resolve();
                            }else{
                                setSnacks({status:true,severity:'error',message:result.status});
                            }
                        })
                        })
                    }
                    ]}
                />   
            </Dialog>
        </React.Fragment>
        
        
    );
}

export default ElementMatriz;