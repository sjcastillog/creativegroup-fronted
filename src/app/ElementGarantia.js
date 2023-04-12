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

const Motivo_Garantia = [
  {title: 'TIPO TRABAJO', field: 'tiptra'},
  {title: 'TIPO GARANTIA', field: 'tipgar'},
  {title: 'TIEMPO GARANTIA', field: 'tiegar', type: 'numeric'},
  {title: 'OBSERVACION', field: 'observacion'},
];

const Tipo_Garantia = [
  {title: 'MOTIVO GARANTIA', field: 'motgar'},
  {title: 'TIPO GARANTIA', field: 'tipgar'},
  {title: 'OBSERVACION', field: 'observacion'},
];

export default function Elementop(){
  const classes = useStyles();
  const [ openCli, setOpenCli] = useState(false);
  const [ openCad, setOpenCad] = useState(false);


  const [ motivos, setMotivos] = useState([]);
  const [ tiempos, setTiempos] = useState([]);
  const [ cargandoCli, setCargandoCli] = useState(true);
  const [ cargandoCad, setCargandoCad] = useState(true);

  async function handleFetchclientes(){
    const response = await fetch('/MotivoGarantias');
    const data = await response.json();
    setMotivos(data);
    setCargandoCli(false);
  }

  async function handleFetchcadenas(){
    const response = await fetch('/TipoGarantias');
    const data = await response.json();
    setTiempos(data);
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
                        alt="Motivos"
                        
                        image="/images/elementClientes.png"
                        title="Motivos Garantia"
                      />
                    </CardActionArea>
                  <div className={classes.divcardactions}>
                    <CardActions className={classes.cardactions} disableSpacing>
                      <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setOpenCli(true)}>
                        Motivos / Garantia
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
                        alt="Tipos"
                        image="/images/elementCadenas.png"
                        title="Tipos Garantia"
                      />
                  </CardActionArea>
                    <div className={classes.divcardactions}>
                      <CardActions className={classes.cardactions} disableSpacing>
                        <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>setOpenCad(true)}>
                          Tipos / Garantia
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
              maxWidth='md'
            >
              <MaterialTable
                title="Motivos de Garantia"
                columns={Motivo_Garantia}
                data={motivos}
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
                      let url = 'MotivoGarantias'
                      fetch(url,{
                        method: 'POST',
                        body: JSON.stringify(newData),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        if(result.message){
                            handleFetchclientes();
                            resolve();
                        }else{ 
                          alert(result.Status);
                        }
                      })
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        const url = 'MotivoGarantias';
                        fetch(url, {
                          method: 'PUT',
                          body: JSON.stringify(newData),
                          headers:{
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(response => response.json())
                        .then(result => {
                          if(result.message){
                            handleFetchclientes();
                            resolve();
                          }else{ 
                            alert(result.Status);
                          }
                      })
                    }),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
                      const url = 'MotivoGarantias';
                      fetch(url,{
                        method: 'DELETE',
                        body: JSON.stringify(oldData),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        if(result.message){
                          handleFetchclientes();
                          resolve();
                        }else{ 
                          alert(result.Status);
                        }
                      })
                    }),
                }}
              />      
            </Dialog>
            <Dialog
              open={openCad}
              onClose={()=>setOpenCad(false)}
              fullWidth={true}
              maxWidth='lg'
            >
              <MaterialTable
                title="Tipos de Garantia"
                columns={Tipo_Garantia}
                data={tiempos}
                
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
                      let url = 'TipoGarantias'
                      fetch(url,{
                        method: 'POST',
                        body: JSON.stringify(newData),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        if(result.message){
                          handleFetchcadenas();
                          resolve();
                        }else{ 
                          alert(result.Status);
                        }
                      })
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        const url = 'TipoGarantias';
                        fetch(url, {
                          method: 'PUT',
                          body: JSON.stringify(newData),
                          headers:{
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(response => response.json())
                        .then(result => {
                          if(result.message){
                            handleFetchcadenas();
                            resolve();
                          }else{ 
                            alert(result.Status);
                          }
                      })
                    }),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
                      const url = 'TipoGarantias';
                      fetch(url,{
                        method: 'DELETE',
                        body: JSON.stringify(oldData),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        if(result.message){
                          handleFetchcadenas();
                          resolve();
                        }else{ 
                          alert(result.Status);
                        }
                      })
                    }),
                }}
                
              />      
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
    
  );
}

