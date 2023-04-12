import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CKEditor from 'ckeditor4-react';
// import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import { Paper,
         TextField,
         InputAdornment,
         Tooltip,
         Grid,
         Fab,
         IconButton,
        } from '@material-ui/core';
/***************************************ICONOS************************************/
import { 
         Save as SaveIcon,
        //  PictureAsPdf as PdfIcon,
         Search as SearchIcon, 
         Delete as DeleteIcon,
         Lock as LockIcon,
        } from '@material-ui/icons';
/*********************************************************************************/
import { Autocomplete } from '@material-ui/lab';
import { useAuth } from "./Auth";
import { SnackbarProvider, useSnackbar } from 'notistack';
// import FacebookCircularProgress from './Elementos/FacebookCircularProgress';
import { PdfOt, NotaEntrega } from './Elementos/';

const useStyles = makeStyles(theme => ({
  Autocomplete:{
      borderColor: '#CAD226',
      borderWidth: 2,
  },
  paper:{
    width: '100%',
    textAlign:'center',
    padding: 10,
    margin: 0,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
  textfieldAn:{
    width: '100%',
    marginLeft:0
  },
  wrapperclass:{
    width: '100%'
  },
  toolbarclass:{
    background: '#e3f2fd',
    borderRadius: '5px'
  },
  editorclass:{
    background: '#e3f2fd',
    padding: 10,
    borderRadius: '5px'
  },
}));

const config = {
  toolbarGroups: [
    //{ name: "document", groups: ["mode", "document", "doctools"] },
    //{
      //name: "editing",
      //groups: ["find", "selection", "spellchecker", "editing"]
    //},
    //{ name: "forms", groups: ["forms"] },
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    {
      name: "paragraph",
      groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"]
    },
    
    //{ name: "links", groups: ["links"] },
    { name: "insert", groups: ["insert"] },
    { name: "styles", groups: ["styles"] },
    { name: "colors", groups: ["colors"] },
    { name: "tools", groups: ["tools"] },
    
    { name: "clipboard", groups: ["clipboard", "undo"] },
    { name: "others", groups: ["others"] },
    //{ name: "about", groups: ["about"] }
  ],
  //removeButtons:
    //"Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Replace,Form,Checkbox,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,SpecialChar,PageBreak,Iframe,Anchor,ShowBlocks,About,CopyFormatting,Undo,Redo",
  fontSize_sizes: "8/8px;10/10px;12/12px;14/14px;16/16px;24/24px;48/48px;",
  font_names:
    "Arial/Arial, Helvetica, sans-serif;" +
    "Times New Roman/Times New Roman, Times, serif;" +
    "Verdana",
  allowedContent: true,
  // disableNativeSpellChecker: false
  skin: "kama",
  plugins:
    "dialogui,dialog,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,resize,elementspath,enterkey,entities,popup,filetools,filebrowser,find,fakeobjects,floatingspace,listblock,richcombo,font,forms,horizontalrule,htmlwriter,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showborders,sourcearea,specialchar,scayt,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc"
};


const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: '#CAD226',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderColor: '#0E3B5F',
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);


function Opad(props) {
  const classes = useStyles();
  const { authTokens, setHeaderWord } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [cadenas, setCadenas] = useState([]);
  const [formulario, setFormulario] = useState({
          numpro:0,
          cliente:'',
          proyecto:'',
          coordinador:'',
          observacion:'',
          ot:'',
          oc:'',
          feredo:new Date('2020-03-01T21:11:54'),
          cadena:'',
          local:'',
          provincia:'',
          ciudad:'',
          sector:'',
          direccion:'',
          detalle:{},
          creacion: new Date()
  });
  const [updateState, setUpdateState] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [ dataPdf, setDataPdf] = useState({});
  const [ arreglo_cimg, setArreglo_cimg] = useState([]);
  const [ fechaCl, setFechaCl ] = useState('');

  useEffect(()=>{
    async function HandleCliCla(){
      const fclientes = await fetch('/fetch_clientes'); 
      const fcadenas = await fetch('/fetch_soloCadenas');
      const jclientes = await fclientes.json();
      const jcadenas = await fcadenas.json();
        setCadenas(jcadenas); 
        setClientes(jclientes); 
    }
    
    if(authTokens.tipo !== "ADMINISTRADOR"){
     setFormulario({ejecutiva:authTokens.nombre, coordinador:authTokens.coordinador});
    }

    setHeaderWord('O.P./Add');
    HandleCliCla();
  },[]// eslint-disable-line react-hooks/exhaustive-deps
  );


  const handleSearch = ()=>{
    if (formulario.numpro === 0){
      enqueueSnackbar('Debe ingresar un Numero de Presupuesto para poder realizar la busqueda!',{variant:'error'});
    }else{
      fetch('/fetch_opOne',{
              method: 'POST',
              body: JSON.stringify({numpro:formulario.numpro}),
              headers:{
                'Content-Type':'application/json'
              }
      })
      .then(response=> response.json())
      .then(result =>{
        if (result.message){
          enqueueSnackbar(result.message,{variant:'error'});
        }else
        if(result.status){
          enqueueSnackbar(result.status,{variant:'error'});
        }else{
          if(result.numMatriz){
            const { cliente, proyecto, coordinador, ejecutiva, fecreqcli} = result;
            const arrF = result.formulario;
            const arr = [];
            arrF.forEach((value,index)=>{
              if(parseInt(value.numpro) === parseInt(formulario.numpro)){
                arr.push(value);
                if(index === arrF.length - 1){
                    setFormulario({...formulario, cliente, proyecto, coordinador, ejecutiva, fecreqcli, cantreq:arr[0].cantreq, tiptra:arr[0].tiptra});
                    enqueueSnackbar('O.P. Nueva',{variant:'success'});
                }
              }else
              if(index === arrF.length - 1){
                  setFormulario({...formulario, cliente, proyecto, coordinador, ejecutiva, fecreqcli, cantreq:arr[0].cantreq, tiptra:arr[0].tiptra});
                  enqueueSnackbar('O.P. Nueva',{variant:'success'});
              }
            }); 
          }else{
            enqueueSnackbar('O.P Cargada',{variant:'info'});
            
            const { cliente, proyecto, observacion, ot, oc, feredo, cadena, local, provincia, fecreqcli, contacto, ciudad, sector, direccion, detalle, coordinador, ejecutiva, cantreq, tiptra, otDate} = result;
            setFormulario({...formulario, cliente, proyecto, observacion, ot, oc, fecreqcli, feredo, cadena, local, contacto, provincia, ciudad, sector, direccion, detalle, coordinador, ejecutiva, cantreq, tiptra, otDate});
            setUpdateState(true);
            fetch('/fetch_opOne2',{
              method: 'POST',
              body: JSON.stringify({numpro:formulario.numpro}),
              headers:{
                'Content-Type':'application/json'
              }
            })
            .then(response=> response.json())
            .then(result2 =>{
              console.log(result2);
              if(result2.status){
                console.log(result2.status);
                alert(result2.status);
              }else
              if(result2.message){
                console.log(result2.message);
              }else{ 
                console.log(result2);
                if(result2.arreglo_cimg){
                  try{
                    let fechaC = new Date(result2.fecreqcli);
                    setFechaCl(fechaC?.split('T')[0].toString());
                    setArreglo_cimg(result2.arreglo_cimg);
                    setDataPdf(result2);
                    setTimeout(()=>{
                      setIsPdf(true);
                    },1000)
                  }catch(err){
                    setFechaCl(result2.fecreqcli);
                    setArreglo_cimg(result2.arreglo_cimg);
                    setDataPdf(result2);
                    setTimeout(()=>{
                      setIsPdf(true);
                    },1000)
                  }
                }else{
                  if(result2.fichastecnicas.length > 0){
                    try{
                      console.log(result2.fecreqcli)
                      let fechaC = new Date(result2.fecreqcli);
                      setFechaCl(fechaC?.split('T')[0].toString());
                      setArreglo_cimg(result2.fichastecnicas);
                      setDataPdf(result2);
                      setTimeout(()=>{
                        setIsPdf(true);
                      },1000)
                    }catch(err){
                      setFechaCl(result2.fecreqcli);
                      setArreglo_cimg(result2.fichastecnicas);
                      setDataPdf(result2);
                      setTimeout(()=>{
                        setIsPdf(true);
                      },1000)
                    }
                  }else{
                    try{
                      let fechaC = new Date(result2.fecreqcli);
                      setFechaCl(fechaC?.split('T')[0].toString());
                      setDataPdf(result2);
                      setTimeout(()=>{
                        setIsPdf(true);
                      },1000)
                    }catch(err){
                      setFechaCl(result2.fecreqcli);
                      setDataPdf(result2);    
                      setTimeout(()=>{
                        setIsPdf(true);
                      },1000)                 
                    }
                  }
                  
                }
              }
            })
           
          }
        }
      });
    }
  };

  const handleDetalle = (e) =>{
    let html = e.editor.getData();
    setFormulario({ ...formulario, detalle:html});
  };

  const handleSave = ()=>{
    if(formulario.numpro){
      if(formulario.numpro === 0){
        enqueueSnackbar('Inserte Un Numero',{variant:'error'});
        setUpdateState(false);setIsPdf(false);
      }else{ 
        if(!formulario.cliente || !formulario.proyecto /*|| !formulario.cadena || !formulario.local || !formulario.ciudad || !formulario.sector || !formulario.direccion*/){
          enqueueSnackbar('Casilleros Vacios',{variant:'error'});
          setUpdateState(false);
        }else {
          if(updateState){
            fetch('fetch_opPut',{
              method:'PUT',
              body: JSON.stringify({formulario}),
              headers:{'Content-Type':'application/json'}
            })
            .then(response=>response.json())
            .then(result =>{
              if(result.message){
                enqueueSnackbar('Actualizado',{variant:'success'});
                window.location.reload();
              }else{
                enqueueSnackbar(result.status,{variant:'error'});
                setUpdateState(false);
              }
            });
          }else{
            const objeto = {...formulario};
            objeto.Status = 'Activo';
            fetch('fetch_opAdd',{
              method:'POST',
              body: JSON.stringify(objeto),
              headers:{'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(result =>{ 
              if(result.message){
                enqueueSnackbar('Agregado',{variant:'success'});
                window.location.reload();
              }else{
                enqueueSnackbar(result.status,{variant:'error'});
                setUpdateState(false);
              }
              
            });
          }
        }
        
      }
    }else{
      enqueueSnackbar('Inserte Un Numero',{variant:'error'});
      setUpdateState(false);
    }
    
  };

  const handleDelete = ()=>{
    if(authTokens.tipo !== 'EJECUTIVA'){
      fetch('/fetch_opDelete',{
              method:'DELETE',
              body:JSON.stringify({numpro:formulario.numpro}),
              headers:{
                'Content-Type':'application/json'
              }
      })
      .then(response => response.json())
      .then(result => {
            if(result.message){
              enqueueSnackbar(result.message,{variant:'success'});
              setFormulario({...formulario, numpro:0});
              setUpdateState(false);
            }else{
              enqueueSnackbar(result.status,{variant:'error'});
              setUpdateState(false);
            }
      });
    }else{
      enqueueSnackbar('NO TIENE ACCESO PARA ELIMINAR',{variant:'error'});
    }
  };

  const handleFormulario = (e)=>{
    setFormulario({...formulario, [e.target.id]: e.target.value});
  };

 

  return (
    <React.Fragment>
        <Paper className={classes.paper} spacing={4}>
          <Grid container spacing={1} direction="row" justify="center" >
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid container spacing={1} direction="row" justify="center">
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  <TextField 
                    id="numpro" 
                    type='Number' 
                    label="Presupuesto" 
                    color='secondary'
                    size='small' 
                    variant="filled" 
                    InputProps={{startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment:(
                      <IconButton onClick={handleSearch} >
                        <SearchIcon />
                      </IconButton>
                    )}}
                    value={formulario.numpro || ''}
                    onChange={handleFormulario}
                    onKeyPress={(e)=>{
                      const code = e.keyCode || e.which;
                      if(code === 13)
                      handleSearch();
                    }}
                  />
                  
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                  <Tooltip title='Eliminar' placement='right' arrow >
                    <Fab onClick={handleDelete} size='small'color='primary' >
                      <DeleteIcon />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                  <Tooltip title='Guardar'placement='right' arrow >
                    <Fab onClick={handleSave} size='small' color='primary' >
                      <SaveIcon />
                    </Fab>
                  </Tooltip>
                </Grid>
                {/* <Grid item xl={1} lg={1} md={1} sm={1} xs={1} style={{display:'flex', justifyContent:'center'}}>
                  {isPdf && <App dataPdf={dataPdf} fechaCl={fechaCl} arreglo_cimg={arreglo_cimg} />}
                </Grid> */}
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1} style={{display:'flex', justifyContent:'center'}}>
                  {isPdf && <PdfOt dataPdf={dataPdf}/>}
                </Grid>
                {/* <Grid item xl={1} lg={1} md={1} sm={1} xs={1} style={{display:'flex', justifyContent:'center'}}>
                  {isPdf && <NotaEntrega dataPdf={dataPdf}/>}
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Autocomplete
                id='cliente'
                options={clientes}
                inputValue={formulario.cliente || ''}
                onInputChange={(e,value)=>setFormulario({ ...formulario, cliente:value})}
                getOptionLabel={option => option.cliente}           
                renderInput={params => 
                  <TextField {...params} 
                    label=" Cliente" 
                    variant="outlined" 
                  />
                }
                />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <ValidationTextField 
                  fullWidth={true} 
                  id='proyecto'
                  label="Proyecto" 
                  variant="outlined"
                  value={formulario.proyecto || ''}
                  onChange={handleFormulario}
                />
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
              <ValidationTextField
                id='contacto' 
                fullWidth
                label="Contacto" 
                size="small" 
                variant="outlined" 
                value={formulario.contacto || ''}
                onChange={handleFormulario}
              />           
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
              <ValidationTextField
                id='ejecutiva'
                label="Ejecutiva" 
                size="small" 
                fullWidth
                variant="outlined" 
                value={formulario.ejecutiva || ''}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
              <ValidationTextField 
                id='ot'
                label="O.T." 
                size="small"
                type='number' 
                fullWidth
                variant="outlined"
                value={formulario.ot || ''} 
                onChange={handleFormulario}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
              <TextField 
                id='otDate'
                label="Fecha O.T." 
                size="small"
                type='date' 
                fullWidth
                variant="outlined"
                value={formulario.otDate || '2022-01-01'} 
                onChange={handleFormulario}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
              <ValidationTextField
                id='oc'
                label="O.C." 
                size="small" 
                variant="outlined" 
                fullWidth
                value={formulario.oc || ''}
                onChange={handleFormulario}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
              <ValidationTextField
                id="feredo"
                label="Fecha O.C."
                type="date"
                format="dd/MM/yyyy"
                value={formulario.feredo || ''}
                fullWidth
                onChange={handleFormulario}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
              <ValidationTextField
                id="fecreqcli"
                label="Fecha Req. Cliente"
                value={formulario.fecreqcli || ''}
                fullWidth
                variant="outlined" 
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> 
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Autocomplete
                id="cadena"
                options={cadenas}
                size='small'
                inputValue={formulario.cadena || ''}
                getOptionLabel={option => option.cadena}
                renderInput={params => <TextField {...params} label=" Cadena" variant="outlined"/>}
                onInputChange={(e,value)=>{  
                  if(value === ''){
                    setFormulario({...formulario, cadena:'', local:'', ciudad:'', sector:'', direccion:'', provincia:'' });
                  }else{
                    new Promise(resolve => {
                      let url = 'fetch_soloLocales'
                      fetch(url,{
                        method: 'POST',
                        body: JSON.stringify({cadena:value}),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(response => response.json())
                      .then(result => {
                        setFormulario({...formulario, cadena:value});
                        resolve();
                        });
                    })
                  }
              }}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <ValidationTextField 
                id='observacion'
                label="Observacion" 
                size="small" 
                fullWidth
                variant="outlined" 
                value={formulario.observacion || ''}
                onChange={handleFormulario}
              />
            </Grid>
            {/*<Grid item xl={4} lg={3} md={6} sm={12} xs={12}>
              <Autocomplete
                id="local"
                getOptionLabel={option => option.local}
                inputValue={formulario.local || ''}
                options={locales}
                size='small'
                renderInput={params => <TextField {...params} fullWidth={true} label="Local" variant="outlined"  />}
                onInputChange={(e, value)=>{  
                  if(value === ''){
                    setFormulario({...formulario, local:'', ciudad:'', sector:'', direccion:'', provincia:'' });
                  }else{
                    new Promise(resolve => {
                      let url = 'fetch_datosOp';
                      fetch(url,{
                        method: 'POST',
                        body: JSON.stringify({cadena:formulario.cadena,local:value}),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      })
                        .then(response => response.json())
                        .then(result => {
                          setFormulario({...formulario, local:result[0].local, ciudad:result[0].ciudad, sector:result[0].sector, direccion:result[0].direccion, provincia:result[0].provincia });
                          resolve();
                        })
                    }) 
                      
                  }
                  
                }}
              />
            </Grid>
            <Grid item xl={2} lg={3} md={6} sm={12} xs={12}>
              <ValidationTextField 
                label="Provincia" 
                size="small" 
                fullWidth
                variant="outlined" 
                value={formulario.provincia || ''}/>
            </Grid>
            <Grid item xl={2} lg={3} md={6} sm={12} xs={12}>
              <ValidationTextField 
                label="Ciudad" 
                size="small" 
                fullWidth
                variant="outlined"  
                value={formulario.ciudad || ''}/>
            </Grid>
            <Grid item xl={2} lg={3} md={4} sm={12} xs={12}>
              <ValidationTextField 
                label="Sector" 
                variant="outlined"
                size="small"  
                fullWidth
                value={formulario.sector || ''}/>
            </Grid>
            <Grid item xl={6} lg={12} md={8} sm={12} xs={12}>
              <ValidationTextField 
                label="Direccion"
                fullWidth
                size="small"
                value={formulario.direccion || ''} 
                variant="outlined" 
              />
              </Grid>*/}
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <CKEditor
                data={formulario.detalle || ''}
                config={config}
                onChange={handleDetalle}
              />
            </Grid>
          </Grid>
        </Paper>
    </React.Fragment>
  );

};

function Opadd(props) {
  return (
    <SnackbarProvider maxSnack={3} hideIconVariant={false} dense >
      <Opad />
    </SnackbarProvider>
  );
};

// const FichasTecnicas = (props) =>{
//   const { data, numpro, proyecto } = props;
//   let widthF = !data.medidasSwitch && !data.pgSwitch && !data.ftSwitch? 840: 580;
//   let widthI = !data.medidasSwitch && !data.pgSwitch && !data.ftSwitch? 0: 250;
//   let noText = !data.medidasSwitch && !data.pgSwitch && !data.ftSwitch? true: false;
//   const URI = data.url;

//   const styles = StyleSheet.create({
//     fichas:{
//       height:'100vh',
//     },
//     numpro2:{
//       position:'relative',
//       left:'720',
//       top:'-75'
//     },
//     encabezado:{
//       height:100
//     },
//     contenedorimage:{
//       width: widthF,
//       height:470,
//       display:'flex',
//       flexDirection:'row',
//       justifyContent: 'center',
//       alignContent:'center',
//     },
//     contenedorinfo:{
//       width:widthI,
//       height:470,      
//     },
//     contenedorpadre:{
//       display:'flex',
//       flexDirection:'row',
//       marginTop:-5,
//     },
//     imageurl:{
//       objectFit:'scale-down',
//     },
//     boxalone2:{
//       width:419,
//       height:470,
//     },
//     boxalone3:{
//       width:279,
//       height:470,
//     },
//     box2:{
//       width:289,
//       height:470,
//     },
//     box3:{
//       width:193,
//       height:470,
//     },
//     imageurl2:{
//       display:'block',
//       margin:'auto',
//       width:'40%',
//       heigth: 'auto'
//     },
//     imageurl3:{
//       display:'block',
//       margin:'auto',
//       width:'20%',
//       heigth: 'auto'
//     },
//     ft:{ 
//       textAlign:'center',
//       borderWidth: 1,
//       borderColor: '#0E3B5F',
//       borderStyle: 'solid',
//       borderTopLeftRadius:5,
//       borderTopRightRadius:5,
//       position:'relative',
//       left:10,
//       margin:5
//     },
//     medidas:{
//       textAlign:'center',
//       borderWidth: 1,
//       borderColor: '#0E3B5F',
//       borderStyle: 'solid',
//       borderTopLeftRadius:5,
//       borderTopRightRadius:5,
//       position:'relative',
//       left:10,
//       margin:5
//     },
//     pg:{
//       textAlign:'center',
//       borderWidth: 1,
//       borderColor: '#0E3B5F',
//       borderStyle: 'solid',
//       borderTopLeftRadius:5,
//       borderTopRightRadius:5,
//       position:'relative',
//       left:10,
//       margin:5
//     },
//     medidastitle:{
//       color: '#fff'
//     },
//     medidasbox:{
//       backgroundColor:'#0E3B5F',
//       borderTopLeftRadius:5,
//       borderTopRightRadius:5,
//     },
//     ftmed:{
//       fontSize:12
//     },
//     proyecto:{
//       fontSize:14,
//       textAlign:'center',
//       marginTop:-40,
//       position:'relative',
//       top:-28,
//       left:70,
//       width:625,
//       height:40,
//       padding:8
//     },
//     boxes:{
//       position:'relative',
//       left:-8
//     }
//   });

//   return(
//       <View style={styles.fichas}>
//         <ImagePdf source="fondoop2.png" style={styles.encabezado} />
//         <Text  style={styles.numpro2}>
//           {numpro}
//         </Text>
//         <Text  style={styles.proyecto}>
//           {proyecto}
//         </Text>
//         <View style={styles.contenedorpadre}>
//           <View style={styles.contenedorinfo}>
//             <View style={styles.boxes}>
//               { data.medidasSwitch 
//                 ?<View style={styles.medidas}>
//                   <View style={styles.medidasbox}>
//                     <Text style={styles.medidastitle}>
//                       Medidas
//                     </Text>
//                   </View>
//                   <Text>
//                     {`Alto: ${data.alto} mts`} 
//                   </Text>
//                   <Text>
//                     {`Ancho: ${data.ancho} mts`} 
//                   </Text>
//                   <Text>
//                     {`Fondo: ${data.fondo} mts`} 
//                   </Text>
//                 </View>
//                 :<></>
//               }
//             </View>
//             <View style={styles.boxes}>
//               {
//                 data.ftSwitch 
//                 ?<View style={styles.ft}>
//                   <View style={styles.medidasbox}>
//                     <Text style={styles.medidastitle}>
//                      Ficha Técnica
//                     </Text>
//                   </View>
//                   <Text style={styles.ftmed} wrap>
//                     {data.fichaTecnica}
//                   </Text>
//                 </View>
//                 :<></>
//               }
//             </View>
//             <View style={styles.boxes}>
//               {
//                 data.pgSwitch 
//                 ? <View style={styles.pg}>
//                   <View style={styles.medidasbox}>
//                     <Text style={styles.medidastitle}>
//                     Planograma
//                     </Text>
//                   </View>
//                   <Text style={styles.ftmed} wrap>
//                     {data.planograma}
//                   </Text>
//                 </View>
//                 :<></>
//               }
//             </View>
//           </View>
//           <View style={styles.contenedorimage}>
//             { noText
//             ? Array.isArray(URI) && URI.map((value,index)=>{
//               const cantidad = URI.length;
//               switch(cantidad){
//                 case 1:
//                   return(<ImagePdf source={value.name} key={`imagen${value}-${index}`} style={styles.imageurl}/> );
//                 case 2:
//                   return(
//                     <View  key={`imagen${value}-${index}`} style={styles.boxalone2}>
//                       <ImagePdf source={value.name} style={styles.imageurl}/>
//                     </View>
//                   );
//                 case 3:
//                   return(
//                     <View  key={`imagen${value}-${index}`} style={styles.boxalone3}>
//                       <ImagePdf source={value.name} style={styles.imageurl}/>
//                     </View>
//                   );
//                 default:
//                   return(
//                     <div></div>
//                   )

//               }
//             })
//             : Array.isArray(URI) && URI.map((value,index)=>{ 
//               const cantidad = URI.length;
//               switch(cantidad){
//                 case 1:{ 
//                   return(<ImagePdf source={value.name} key={`imagen${value}-${index}`} style={styles.imageurl}/>);
//                   }
//                 case 2:
//                   return(
//                     <View  key={`imagen${value}-${index}`} style={styles.box2}>
//                       <ImagePdf source={value.name} style={styles.imageurl}/>
//                     </View>
//                   );
//                 case 3:
//                   return(
//                     <View  key={`imagen${value}-${index}`} style={styles.box3}>
//                       <ImagePdf source={value.name} style={styles.imageurl}/>
//                     </View>
//                   );
//                 default:
//                   return(
//                     <div></div>
//                   )
//               }
//             })
//             }
//           </View>
//         </View>    
//       </View>
//   );
// };

// const App = (props) => { 
//   const { dataPdf, arreglo_cimg, fechaCl } = props;

  
//   const styles = StyleSheet.create({
//     page: {
//       flexDirection: 'row',
//     },
//     image: {
//       objectFit:'cover',
//       width:842,
//       height:595,
//     },
//     image3: {
//       objectFit:'fill',
//     },
//     textWrapper: {
//       width: '40%',
//       height: '100%',
//       backgroundColor: '#f0f0f0',
//       paddingHorizontal: 50,
//       paddingVertical: 30,
//     },
//     numpro: {
//       marginTop:-570,
//       marginLeft:615,
//       width:50,
//       height:30,
//       textAlign:'center',
//       fontFamily: 'Oswald',
//       color: '#000',
//       fontWeight: 'ultrabold',
//     },
//     ot: {
//       marginTop:-30,
//       marginLeft:762,
//       width:60,
//       height:30,
//       textAlign:'center',
//       fontFamily: 'Oswald',
//       color: '#000',
//       fontWeight: 'ultrabold'
//     },
//     proyectobox: {
//       width:418,
//       height:67,
//       display: 'flex',
//       justifyContent: 'center',
//       alignContent: 'center',
//       flexDirection:'row',
//       marginTop:6.5,
//       marginLeft:366
//     },
//     proyecto: {
//       fontFamily: 'Oswald',
//       color: '#212121',
//       fontSize:20,
//       alignSelf: 'center'
//     },
//     oc: {
//       marginTop:20,
//       marginLeft:672,
//       width:168,
//       height:36,
//       textAlign:'center',
//       fontFamily: 'Oswald',
//       color: '#000',
//       fontWeight: 'ultrabold'
//     },
//     feredo: {
//       marginTop:16,
//       marginLeft:672,
//       width:168,
//       height:26,
//       textAlign:'center',
//       fontFamily: 'Oswald',
//       color: '#000',
//       fontWeight: 'ultrabold'
//     },
//     fecreqcli: {
//       marginTop:12,
//       marginLeft:672,
//       width:168,
//       height:25,
//       color:'black',
//       fontSize:16,
//       textAlign:'center',
//       //fontFamily: 'Oswald',
//       fontWeight: 'ultrabold' ,
//     },
//     responsables: {
//       fontFamily: 'Oswald',
//       color: '#212121',
//       width:248,
//       //textAlign:'center',
//       height:38,
//       fontSize:16,
//       marginTop:35,
//       marginLeft:594,
//       display:'flex',
//       justifyContent:'center',
//       flexDirection:'row',
//       flexWrap:'wrap'
//     },
//     coordinador:{
//       position:'relative',
//       top:-6
//     },
//     lodir: {
//       fontFamily: 'Oswald',
//       color: '#212121',
//       fontSize:16,
//       height:63,
//       width:240,
//       marginTop:38,
//       marginLeft:600,
//       textAlign:'center'
//     },
//     direccion: {
//       //fontFamily: 'Oswald',
//       color: '#212121',
//       fontSize:15,
//       width:238
//     },
//     local: {
//       position:'relative',
//       top:-5,
//       fontSize:14
//     },
//     contacto: {
//       //fontFamily: 'Oswald',
//       color: '#212121',
//       fontSize:12,
//       width:248,
//       textAlign:'center',
//       height:25,
//       paddingTop:6,
//       marginTop:40.5,
//       marginLeft:594,
//     },
//     observacion: {
//       fontFamily: 'Oswald',
//       color: 'red',
//       marginTop:33.5,
//       marginLeft:602,
//       width:241,
//       fontSize:12,
//       height:53
//     },
//     detalle:{ 
//       marginTop:-354,
//       marginLeft:20,
//       marginBottom:62,
//       width: 530,
//       height: 300,
//     },
//     imageop2:{
//       width: 550,
//       height: 300,
//     },
//     textresponsables:{
//       alignSelf:'center'
//     }
//   });
  
//   Font.register({
//       family: 'Oswald',
//       src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
//   });

//   const MyDoc =(
//     <Document>
//       <Page size="A4" orientation="landscape">
//         <View>
//           <ImagePdf source="fondoop3.jpg" style={styles.image} />
//           <Text style={styles.numpro}>
//             {dataPdf.numpro}
//           </Text>
//           <Text style={styles.ot}>
//             {dataPdf.ot}
//           </Text>
//           <View style={styles.proyectobox} >
//             <Text style={styles.proyecto}>
//               {dataPdf.proyecto}
//             </Text>
//           </View>
//           <Text style={styles.oc}>
//             {dataPdf.oc}
//           </Text>
//           <Text style={styles.feredo}>
//             {dataPdf.feredo}
//           </Text>
//           <Text style={styles.fecreqcli}>
//             {fechaCl?.split('T')[0]}
//           </Text>
//           <View style={styles.responsables}>
//             <Text style={styles.textresponsables}>
//               {dataPdf.ejecutiva} 
//             </Text>
//           </View>
//           <View style={styles.lodir}>
//             <Text wrap style={styles.direccion}>
//               {dataPdf.cadena} 
//             </Text>
//             <Text style={styles.local}>
//               {dataPdf.local}
//             </Text>
//           </View>
//           <Text style={styles.contacto}>
//             {dataPdf.contacto}
//           </Text>
//           <Text wrap style={styles.observacion}>
//             {dataPdf.observacion}
//           </Text>
//           <View style={styles.detalle}>
//             <ImagePdf source={`/detallesOp/${dataPdf.numpro}.png`} style={styles.image3}/>
//           </View>
//           {arreglo_cimg.map((value,index)=>{ 
//             if(arreglo_cimg.length > 0){ 
//             return( 
//               <FichasTecnicas data={value} numpro={dataPdf.numpro} proyecto={dataPdf.proyecto} key={`fichat${index}`}/>
//             )
//             }else{
//               return( 
//                 <View></View>
//               )
//             }
//             })
//           }
//         </View>
//       </Page>
//     </Document>
//   );

//   const [instance] = usePDF({ document: MyDoc });

//   if (instance.loading) {
//     return <FacebookCircularProgress size={36}/>;
//   }

//   if (instance.error) { 
//       return <div>Something went wrong: {instance.error}</div>;
//   }


//   return( 
//     <Fab href={instance.url} target="_blank" color='primary' size='small' >
//         <Tooltip title='PDF'placement='right' arrow >
//             <PdfIcon  />
//         </Tooltip>
//     </Fab>
//   );
// };

export default Opadd;