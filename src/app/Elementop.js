import React, { useState, useEffect} from 'react'
import {
          Button,
          Card,
          CardActionArea,
          CardActions,
          CardMedia,
          CssBaseline,
          Dialog,
          Grid,
          Paper,
        } from '@material-ui/core'
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
    backgroundImage: `url('/images/fondoElementOp.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '900px 800px',
    backgroundPosition: '730px 50px',
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
  grid:{
    padding:10, 
    height:'100%',
  },
  cards:{
    borderStyle:'none',
    boxShadow: 'none'
  }
}));

export default function Elementop(){
  const classes = useStyles();
  const [openCli, setOpenCli] = useState(false);
  const [openCad, setOpenCad] = useState(false);
  const cliente = [
        {title: 'CLIENTE', field: 'cliente'}
  ];
  
  const cadena = [
        {title: 'CADENA', field: 'cadena'},
        {title: 'LOCAL', field: 'local'},
        {title: 'PROVINCIA', field: 'provincia'},
        {title: 'CIUDAD', field: 'ciudad'},
        {title: 'SECTOR', field: 'sector'},
        {title: 'DIRECCION', field: 'direccion'},
  ];

  const [clientes, setClientes] = useState([]);
  const [cadenas, setCadenas] = useState([]);
  const [cargandoCli, setCargandoCli] = useState(true);
  const [cargandoCad, setCargandoCad] = useState(true);

  async function handleFetchclientes(){
    const response = await fetch('/fetch_clientes');
    const data = await response.json();
    setClientes(data);
    setCargandoCli(false);
  }

  async function handleFetchcadenas(){
    const response = await fetch('/fetch_cadenas');
    const data = await response.json();
    setCadenas(data);
    setCargandoCad(false);
  }

  

  useEffect(()=>{handleFetchclientes()},[]);

  useEffect(()=>{handleFetchcadenas()},[]);

  return(
    <ThemeProvider theme={Creative}>
      <CssBaseline />
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3} className={classes.grid}  alignItems="center">
              <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className={classes.cards}>
                  <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Clientes"
                        
                        image="/images/elementClientes.png"
                        title="Clientes"
                      />
                    </CardActionArea>
                  <div className={classes.divcardactions}>
                    <CardActions className={classes.cardactions} disableSpacing>
                      <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setOpenCli(true)}>
                        Clientes
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className={classes.cards}>
                  <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Cadenas"
                        image="/images/elementCadenas.png"
                        title="Cadenas"
                      />
                  </CardActionArea>
                    <div className={classes.divcardactions}>
                      <CardActions className={classes.cardactions} disableSpacing>
                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setOpenCad(true)}>
                          Cadenas
                        </Button>
                      </CardActions>
                    </div>
                </Card>
              </Grid>
            </Grid>
            <Dialog
              open={openCli}
              onClose={()=>setOpenCli(false)}
              fullWidth={true}
              maxWidth='sm'
            >
              <MaterialTable
                title="Clientes"
                columns={cliente}
                data={clientes}
                isLoading={cargandoCli}
                options={{
                    exportButton: true,
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
                    exportFileName:'Clientes CG'
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
                        if(result.Status === 'Add')
                          {
                            handleFetchclientes();
                            resolve();
                          }else
                        if(result.Status === "YA EXISTE")
                          {
                            alert(result.Status);
                            resolve();
                          }else
                          {
                            alert(result.Status);
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
                          if(result.Status === 'Update')
                          {
                            handleFetchclientes();
                            resolve();
                          }else{
                            alert(result.Status);
                          }
                      })
                    }),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
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
                        if(result.Status === 'Delete')
                          {
                            handleFetchclientes();
                            resolve();
                          }else{
                            alert(result.Status);
                          }
                      })
                    }),
                }}
                actions={[
                  {
                    tooltip: 'Eliminar todos los Clientes Seleccionados',
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
                        if(result.Status === 'Delete')
                          {
                            handleFetchclientes();
                            resolve();
                          }else{
                            alert(result.Status);
                          }
                      })
                    })
                  }
                ]}
              />      
            </Dialog>
            <Dialog
              open={openCad}
              onClose={()=>setOpenCad(false)}
              fullWidth={true}
              maxWidth='lg'
            >
              <MaterialTable
                title="Cadenas"
                columns={cadena}
                data={cadenas}
                
                isLoading={cargandoCad}
                options={{
                    exportButton: true,
                    selection: true,
                    filtering: true
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
                    }
                }}
                editable={{
                    onRowAdd: newData =>
                    new Promise(resolve => {
                      let url = 'fetch_addcadena'
                      fetch(url,{
                        method: 'POST',
                        body: JSON.stringify(newData),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        if(result.Status === 'Add')
                          {
                            handleFetchcadenas();
                            resolve();
                          }else{
                            alert(result.Status);
                          }
                      })
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        const url = 'fetch_putcadena';
                        fetch(url, {
                          method: 'PUT',
                          body: JSON.stringify(newData),
                          headers:{
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(response => response.json())
                        .then(result => {
                          if(result.Status === 'Update')
                          {
                            handleFetchcadenas();
                            resolve();
                          }else{
                            alert(result.Status);
                          }
                      })
                    }),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
                      const url = 'fetch_deletecadena';
                      fetch(url,{
                        method: 'DELETE',
                        body: JSON.stringify(oldData),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        if(result.Status === 'Delete')
                          {
                            handleFetchcadenas();
                            resolve();
                          }else{
                            alert(result.Status);
                          }
                      })
                    }),
                }}
                actions={[
                  {
                    tooltip: 'Eliminar todas las Cadenas Seleccionados',
                    icon: 'delete',
                    onClick: (evt, data) => new Promise(resolve => {
                      const url = 'fetch_deletecadena';
                      fetch(url,{
                        method: 'DELETE',
                        body: JSON.stringify(data),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        if(result.Status === 'Delete')
                          {
                            handleFetchcadenas();
                            resolve();
                          }else{
                            alert(result.Status);
                          }
                      })
                    })
                  }
                ]}
              />      
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
    
  );
}

