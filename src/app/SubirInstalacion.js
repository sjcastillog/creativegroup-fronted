import React, { useState, useEffect } from 'react';
import  {   Avatar, 
            Backdrop,
            Button, 
            Card,  
            CardMedia, 
            Checkbox, 
            CircularProgress,
            Dialog,
            DialogActions,
            ExpansionPanel, 
            ExpansionPanelSummary, 
            ExpansionPanelDetails, 
            Fab, 
            Grid, 
            Hidden, 
            IconButton, 
            InputAdornment, 
            Paper,    
            Stepper, 
            Step, 
            StepLabel, 
            Switch, 
            TextField, 
            Tooltip, 
            Typography,
            withWidth   } from '@material-ui/core'; 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
//import useGeolocation from 'react-hook-geolocation';
import {  
            AddAPhoto as AddAPhotoIcon,
            CheckBox as CheckBoxIcon,
            CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
            ExpandMore as ExpandMoreIcon,
            Lock as LockIcon,
            PhotoCamera as PhotoCameraIcon,
            Cached as CachedIcon,
            Refresh as RefreshIcon,
            Save as SaveIcon,
            Search as SearchIcon,
        } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { Carousel } from "react-responsive-carousel";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Webcam from "react-webcam";
import 'react-html5-camera-photo/build/css/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageUploader from 'react-images-upload';
//import Viewer from 'react-viewer';
import { useAuth } from "./Auth";
import { v4 as uuidv4 } from 'uuid';
import { 
          Button as ButtonSemantic,
          Icon as IconSemantic, 
          Modal
        } from 'semantic-ui-react';
import { CardParent } from './components/checkOut/CardParent';

const Instaladores = [
    {instalador: "ALAVA ALVAREZ MIGUEL HERNAN"},
    {instalador: "ALVAREZ GURUMENDI MIGUEL ROGELIO"},
    {instalador: "ALVEAR BOWEN ALEXIS DARIO"},
    {instalador: "ASENCIO ORRALA WALTER ENRIQUE"},
    {instalador: "ASENCIO ORRALA SERGIO GABRIEL"},
    {instalador: "ASPIAZU TIGRERO JUAN CARLOS"},
    {instalador: "BAJAÑA NIETO SIXTO ROBIN"},
    {instalador: "BARCIA CHOEZ JAVIER IGNACIO"},
    {instalador: "BARCIA CHOEZ MIGUEL ANGEL"},
    {instalador: "BASTIDAS RODRIGUEZ LUIS VICENTE"},
    {instalador: "BOHORQUEZ JAIME IVAN JAVIER"},
    {instalador: "BOZADA CHOEZ LUIS ALBERTO"},
    {instalador: "BRIONES VERA ALEX DAVID"},
    {instalador: "CABEZAS LOOR ELI DAVID"},
    {instalador: "CANTOS INTRIAGO CRISTHIAN VICENTE"},
    {instalador: "CASTRO SOLEDISPA HENRY OMAR"},
    {instalador: "CEDEÑO PARRALES DAVID MARCELO"},
    {instalador: "CHARCOPA BONE GONZALO ALFREDO"},
    {instalador: "CHOEZ QUIMIS RICHARD GEOVANNY"},
    {instalador: "ESPINOZA GONZALEZ LEONARDO HUGO"},
    {instalador: "FLORES VILLAMAR JOSE RAFAEL"},
    {instalador: "GOMEZ PEREZ LUIS ALBERTO"},
    {instalador: "GOYA GUILLEN WLADIMIR STALIN"},
    {instalador: "GUAMBO GUAMAN CARLOS LUIS"},
    {instalador: "GUARANDA MANZABA RAUL MAURICIO"},
    {instalador: "GUERRERO VERA CRISTOBAL ANDRES"},
    {instalador: "LAINEZ JAIME ANDY ALEX"},
    {instalador: "LAINEZ JAIME DAVID DARWIN"},
    {instalador: "LEON GONZALEZ JUAN ALBERTO"},
    {instalador: "LITARDO GONZALES YUSTHYN JARIB"},
    {instalador: "MAYER VERNAZA GUILLERMO ANDRES"},
    {instalador: "MENDOZA DE LA A MANUEL ANTONIO"},
    {instalador: "MERCHAN MACIAS CHRISTOPHER ANDERSON"},
    {instalador: "MILTON EDUARDO CORDERO ARMIJOS"},
    {instalador: "MONTOYA BOHORQUEZ GUILLERMO JEFFERSON"},
    {instalador: "NAVARRETE UBILLA GUSTAVO FABIAN"},
    {instalador: "OREJUELA ORTIZ OSCAR"},
    {instalador: "ORDOÑEZ CHEME FABRICIO JAVIER"},
    {instalador: "ORRALA YAGUAL WILLIAM JEFFERSON"},
    {instalador: "ORTEGA ALARCON MIGUEL ALFONSO"},
    {instalador: "PAREDES AQUINO CHRISTIAN ENRIQUE"},
    {instalador: "PAZ TENORIO DARWIN GREGORIO"},
    {instalador: "PIBAQUE MERO LUIS ALFREDO"},
    {instalador: "PINEDA ARRIAGA BOLIVAR ANTONIO"},
    {instalador: "PINEDA ARRIAGA DARIO JAVIER"},
    {instalador: "REYES PIGUAVE DIEGO EDUARDO"},
    {instalador: "RIVAS VERA WELLINGTON MICHAELL"},
    {instalador: "ROMERO RIVERA JEFFERSON KLEINE"},
    {instalador: "SALAZAR URDANIGO ANTHONY STEVEN"},
    {instalador: "SEGURA RIVERA CHRISTIAN ALBERTO"},
    {instalador: "TORRES IGLESIAS MIGUEL STEVEN"},
    {instalador: "TUPACYUPANQUI TROYA JORGE MICHAEL"},
    {instalador: "VALENCIA IGLESIAS ERNESTO LEONARDO"},
    {instalador: "VEINTIMILLA MATEO MIGUEL LEOPOLDO"},
    {instalador: "VELIZ GAMBOA ALBERTO LUCIANO"},
    {instalador: "VERA VALENCIA OSCAR ADRIAN"},
    {instalador: "VILLAFUERTE MALDONADO FREDY PAQUITO"},
    {instalador: "ZAMORA PONGUILLO BYRON UFREDO"},    
    {instalador: "VILLAFUERTE SOLEDISPA CESAR ANTONIO"},
    {instalador: "BRIONES JORDAN JOSE RICARDO"},
    {instalador: "ALAVA VELASQUEZ OMAR FREDDY"},
    {instalador: "BARRE MORAN ANDRES FABRICIO"},
    {instalador: "MORALES YAMBAY PETER ELIAN"}, 
    {instalador: "MORENO BURGOS RAUL ANDRES"},
    {instalador: "OROBIO VASQUEZ LEUVIS MOISES"},

];

const useStyles = makeStyles(theme => ({
  root:{
      padding:10
  },
  Instalador:{
      padding:20
  },
  backButton: {
      marginRight: theme.spacing(1),
  },
  instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
  },
  media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


function Instalacion(props){

  /***********************VARIABLES*********************/
    const { enqueueSnackbar } = useSnackbar();
    const { setOpen, setHeaderWord } = useAuth();
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const classes = useStyles();
    const steps = getSteps();
  /*****************************************************/

 
  
  /********************* ESTADOS ***********************/
    const [ formulario, setFormulario] = useState({
      Cadena:'',
      Local:'',
      Ciudad:'',
      Sector:'',
      Direccion:'',
      Provincia:'',
      Instaladores:[],
      InstaladoresEnt_Back:[],
      NotEnt:0,
      numpro:'',
      Codigo:'',
    });
    const [ Locales, setLocales ] = useState([]); // locales y direcciones
    const [ encabezados, setEncabezados ] = useState([]); // tipos de trabajos 
    const [ isSearch, setSearch ] = useState(false);
    const [ isCharged, setCharged ] = useState(false); 
    //const [ coordenadas, setCoordenadas ] = useState({});
    const [ coordenadasInit, setCoordenadasInit ] = useState({});
    const [ TiposTrabajos, setTiposTrabajos ] = useState([]);
    const [ aloneTipTra, setAloneTipTra ] = useState(false);
    const [ moreTipTra, setMoreTipTra ] = useState(false);
    const [ isFotosModelos, setFotosModelos ] = useState(false);
    const [ arrFotosModelos, setArrFotosModelos ] = useState();
    const [ showFotosModelos, setShowFotosModelos ] = useState(true);
    const [ showRest, setShowRest ] = useState(false);
    const [ arrCant, setArrCant ] = useState([]);
    const [ expanded, setExpanded] = useState(false);
    const [ selectionNE, setSelectionNE ] = useState(false);
    const [ showNotEnt, setShowNotEnt ] = useState(false);
    //const [ notEntImage, setNotEntImage ] = useState([]);
    //const [ isViewerNot, setViewerNot ] = useState(false);
    const [ notaEntrega, setNotaEntrega ] = useState([]);
    const [ isResetNotEnt, setResetNotEnt ] = useState(false);
    const [ isNew, setNew ] = useState(true);
    const [ isManual, setManual ] = useState(false);
    const [ isEdited, setEdited ] = useState(false);
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ pictures, setPictures ] = useState([]);
    const [ validacion, setValidacion ] = useState(false);
    const [ urlImg, setUrlImg ] = useState({});
    const [ readySave, setReadySave] = useState(false);
    const [ activeStep, setActiveStep] = useState(0);
    const [ webRef, setWebref ] = useState();
    //const [ arrImagePhoto, setArrImagePhoto ] = useState([]);
    const [ fotosNow, setFotosNow ] = useState(false);
    const [ openDialogFotos1, setOpenDialogFotos1 ] = useState(false);
    const [ openDialogFotos2, setOpenDialogFotos2 ] = useState(false);
    const [ openDialogTipTra, setOpenDialogTipTra ] = useState(false);
    const [ openDialogValidacion, setOpenDialogValidacion] = useState(false);
    const [ showMoreTipTra, setShowMoreTipTra ] = useState(false);
    const [ isSaving, setSaving ] = useState(false);
    const [ resetPhotos2, setResetPhotos2 ] = useState(false);
    const [ data, setData ] = useState({});
    const [ firstOpen, setFirstOpen ] = useState(false);
    const [ secondOpen, setSecondOpen ] = useState(false);
    const [ isPutOt, setPutOt ] = useState(false);
    const [ showAlertOt, setShowAlertOt] = useState(false);
    const [ getInstaladores, setInstaladores ] = useState([]);
    const [ isEntrega, setEntrega ] = useState(false);
    const [ isNewEntrega, setNewEntrega ] = useState(false);
  /*****************************************************/


   /******************** USE EFFECTS ********************/
    useEffect(
      ()=>{
        setOpen(false);
        setHeaderWord('/Instalación/Cargar');
        
        //navigator.mediaDevices.getUserMedia({video: true})
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;    
            //setCoordenadas({Latitud:crd.latitude, Longitud:crd.longitude});  
            setCoordenadasInit({Latitud:crd.latitude, Longitud:crd.longitude});  
            //setFormulario({...formulario, Latitud:crd.latitude, Longitud:crd.longitude});
        };
          
        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);

        (async()=>{
          const ReqInstaladores = await fetch('/Instaladores');
          const JsonInstaladores = await ReqInstaladores.json();
          setInstaladores(JsonInstaladores);
        })()

          
      },[]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
      ()=>{
        if(aloneTipTra){
          fetch('/fetch_searchInstalacion',{
            method: 'POST',
            body: JSON.stringify({Local:formulario.Local, Direccion:formulario.Direccion, numpro:formulario.numpro, TipTra:formulario.TipTra}),
            headers:{'Content-Type':'application/json'}
          })
          .then(response=> response.json())
          .then(result =>{
              if (result.message){
                if(!isEntrega) {
                  setOpenDialogFotos1(true);
                }else{ 
                  setShowRest(true); 
                  setNewEntrega(true);
                }
                const arrY = [];
                for(let p = 0; p < formulario.Cantidad; p++){
                    const objectY = {};
                    objectY.id = `codigo${p}`;
                    objectY.codigo = '';
                    arrY.push(objectY);
                    if(p === formulario.Cantidad - 1){
                        setArrCant(arrY);
                    }
                }
                // console.log(arrY)
                enqueueSnackbar('Instalación Nueva',{variant:'success'});
              }else
              if(result.Error){
                setNewEntrega(false);
                enqueueSnackbar(result.Error, {variant:'error'});
              }else{
                if(result.Status === 'Entregado'){
                  setEntrega(true);
                }else{
                  setNewEntrega(false);
                }
                result.isReport = false;
                setFormulario(result);
                setArrCant(result.Codigo);
                if(result.isNotEnt){
                    setShowNotEnt(true);
                    const arr = [];
                    const objeto = {};
                    objeto.src = result.NotEntSrc;
                    arr.push(objeto);
                    //setNotEntImage(arr);
                    setShowRest(true);
                    setNew(false);
                    if(result.Fotos){ 
                      if(result.Fotos.length === 0 ){
                        setOpenDialogFotos1(true);
                        setEdited(true);
                      }
                    }else{
                      setOpenDialogFotos1(true);
                      setEdited(true);
                    }
                }else{
                  setShowRest(true);
                  setNew(false);
                  if(result.Fotos){ 
                    if(result.Fotos.length === 0 ){
                      setOpenDialogFotos1(true);
                      setEdited(true);
                    }
                  }else{
                    setOpenDialogFotos1(true);
                    setEdited(true);
                  }
                }
              }
          });
          const Inf = TiposTrabajos[0];
          if(Inf.src){
            if(Inf.src !== ""){
              const images = (
                <div>
                    <img src={Inf.src} alt='Imagen'/>
                    <p className="legend"> Inf.tiptra</p>
                </div>
              );
              setArrFotosModelos(images);
              setTimeout(()=>{
                setShowFotosModelos(false);
              },2500)
            }
          }
          
        }
      },[aloneTipTra] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
      ()=>{
        if(moreTipTra){
          fetch('/fetch_searchInstalacion',{
            method: 'POST',
            body: JSON.stringify({Local:formulario.Local, Direccion:formulario.Direccion, numpro:formulario.numpro, TipTra:formulario.TipTra}),
            headers:{'Content-Type':'application/json'}
          })
          .then(response=> response.json())
          .then(result =>{
            const arrFil = Locales.filter(value=> value.Local.toString() === formulario.Local.toString());
            const arrFil1 = arrFil.filter(value=> value.Direccion.toString() === formulario.Direccion.toString());
            const arrFil2 = arrFil1[0];
            const arrFil3 = parseInt(arrFil2[formulario.TipTra.toString()])
              if (result.message){
                if(!isEntrega){
                  setOpenDialogFotos1(true);
                }else{ 
                  setShowRest(true); 
                  setNewEntrega(true);
                }
                const arrY = [];
                for(let p = 0; p < arrFil3; p++){
                    const objectY = {};
                    objectY.id = `codigo${p}`;
                    objectY.codigo = '';
                    arrY.push(objectY);
                    if(p === arrFil3 - 1){
                        setArrCant(arrY);
                    }
                }
                enqueueSnackbar('Instalación Nueva',{variant:'success'});
              }else
              if(result.Error){
                setNewEntrega(false);
                enqueueSnackbar(result.Error, {variant:'error'});
              }else{
                if(result.Status === 'Entregado'){
                  setEntrega(true);
                }else{
                  setNewEntrega(false);
                }
                result.isReport = false;
                setFormulario(result);
                setArrCant(result.Codigo);
                if(result.isNotEnt){
                    setShowNotEnt(true);
                    const arr = [];
                    const objeto = {};
                    objeto.src = result.NotEntSrc;
                    arr.push(objeto);
                    //setNotEntImage(arr);
                    setShowRest(true);
                    setNew(false);
                    if(result.Fotos){ 
                      if(result.Fotos.length === 0 ){
                        setOpenDialogFotos1(true);
                        setEdited(true);
                      }
                    }else{
                      setOpenDialogFotos1(true);
                      setEdited(true);
                    }
                    
                }else{
                  setShowRest(true);
                  setNew(false);
                  if(result.Fotos){ 
                    if(result.Fotos.length === 0 ){
                      setOpenDialogFotos1(true);
                      setEdited(true);
                    }
                  }else{
                    setOpenDialogFotos1(true);
                    setEdited(true);
                  }
                }
              }
          });
          setTimeout(()=>{
            const FotosT = TiposTrabajos.filter(value=> value.tiptra=== formulario.TipTra )
            const Inf = FotosT[0];
            if(Inf){
              if(Inf.src !== ""){
                const images = (
                  <div>
                      <img src={Inf.src} alt='Imagen'/>
                      <p className="legend"> Inf.tiptra</p>
                  </div>
                );
                setArrFotosModelos(images);
                setTimeout(()=>{
                  setShowFotosModelos(false);
                },2000)
              }
            }
            
          },1500)
          
        }
      },[moreTipTra] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
      ()=>{
          if(validacion){ 
              setValidacion(false);
              const arrFilterCanti = arrCant.filter(({codigo})=> codigo === "" );
              const arrFilterCanti2 = [];
              for(const x in arrCant){
                const el = {...arrCant[x]};
                if(el.codigo !== ""){
                  if((el.codigo.split('/')).length === 1){
                    if(parseInt(el.codigo) < 1000){
                      arrFilterCanti2.push(el);
                    }
                  }
                }
              }
              if(formulario.Instaladores.length <= 0){
                enqueueSnackbar('Selecione 1 o más Instaladores', {variant:'error'}); 
                setSaving(false);            
              }else if(arrFilterCanti.length > 0){
                enqueueSnackbar('Casilleros de Codigo de Instalacion Vacios', {variant:'error'}); 
                setSaving(false); 
              }else if(arrFilterCanti2.length > 0){
                enqueueSnackbar('Error en la Validacion de Codigo de Mueble', {variant:'error'}); 
                setSaving(false); 
              }else{
                if(isEntrega){                
                  if(isNewEntrega){
                      const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                      if(existingTokens){
                        if(existingTokens.length <= 4){
                          HandleSave();
                        }else{
                          enqueueSnackbar('SUBA POR LO MENOS 1 FOTO DE LA PRE-ENTREGA', { variant:'error'});
                          setSaving(false); 
                        }
                      }else{
                        enqueueSnackbar('SUBA POR LO MENOS 1 FOTO DE LA PRE-ENTREGA', { variant:'error'});
                        setSaving(false); 
                      }
                    
                    
                  }else{
                    if(selectionNE === false){
                      enqueueSnackbar('DEBE SUBIR LA FOTO DE LA NOTA DE ENTREGA', { variant:'error'});
                      setSaving(false); 
                    }else{
                      if(fotosNow){
                        if(isManual){

                        }else{
                          const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                          if(existingTokens){
                            if(existingTokens.length <= 4){
                              HandleSave();
                            }else{
                              enqueueSnackbar('SUBA POR LO MENOS 1 FOTO DE LA ENTREGA', { variant:'error'});
                              setSaving(false); 
                            }
                          }else{
                            enqueueSnackbar('SUBA POR LO MENOS 1 FOTO DE LA ENTREGA', { variant:'error'});
                            setSaving(false); 
                          }
                        }
                      }else{
                        HandleSave();
                      }
                    }
                  }
                }else{
                  if(fotosNow){
                    if(isManual){
                      if(pictures.length > 3){
                        HandleSave();
                      }else{
                        enqueueSnackbar('FOTOS INCOMPLETAS', {variant:'error'});
                        setSaving(false);    
                      }
                    }else{
                      if(urlImg.src1 && urlImg.src2 && urlImg.src3 && urlImg.src4){
                        HandleSave();
                      }else{
                        enqueueSnackbar('FOTOS INCOMPLETAS', {variant:'error'});
                        setSaving(false);  
                      }
                    }
                  }else{
                    HandleSave();
                  }
                }
              }
          }
      },[validacion]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
      ()=>{
          if(readySave){
              const objeto = {formulario};
              objeto.Status = isEntrega ? 'Entregado' : 'Instalado';
              objeto.isReport = false;
              objeto.idCrono = ''; 
              objeto.Codigo = arrCant;
              objeto.OT = data.numot;
              objeto.Ejecutiva = data.ejecutiva
              objeto.CreacionCrono = data.creacionCrono;
              if(isEdited){
                  console.log('isEdited');
                  fetch('SaveInstalacion',{
                      method: 'PUT',
                      body: JSON.stringify(objeto),
                      headers:{
                      'Content-Type':'application/json'
                      }
                  })
                  .then(response=> response.json())
                  .then(result =>{
                          if (result.message){                                 
                            setReadySave(false);
                            setSaving(false);    
                            if(TiposTrabajos.length > 1){
                              HandleOpenDialogTipTra();
                            }else{
                              enqueueSnackbar(result.message,{variant:'success'});
                              HandleClearDireccion();
                            }
                          }else{ 
                              enqueueSnackbar(result.status,{variant:'error'});
                              HandleClearDireccion();
                              setReadySave(false);
                              setSaving(false);    
                          }
                  });
              }else{
                  console.log('!isEdited');
                  fetch('SaveInstalacion',{
                          method: 'POST',
                          body: JSON.stringify(objeto),
                          headers:{
                          'Content-Type':'application/json'
                          }
                  })
                      .then(response=> response.json())
                      .then(result =>{
                          if (result.message){                                 
                            setReadySave(false);
                            setSaving(false);    
                            if(TiposTrabajos.length > 1){
                              HandleOpenDialogTipTra();
                            }else{
                              enqueueSnackbar(result.message,{variant:'success'});
                              HandleClearDireccion();
                            }
                          }else{ 
                            enqueueSnackbar(result.status,{variant:'error'});
                            setReadySave(false);
                            setSaving(false);    
                          }
                      });
              }
          }
      },[readySave]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(
      ()=>{
        if(resetPhotos2){
          setResetPhotos2(false);
          setManual(true);
        }
      },[resetPhotos2]
    );


  /*****************************************************/



  /******************** HANDLE MANEJADOR ***************/
    const HandleFormulario = (e)=>{
      setFormulario({...formulario, [e.target.id]:e.target.value});
    };

    const HandleFotosModelos = () =>{
      setFotosModelos(!isFotosModelos);
    };

    const HandleSelectInstaladores = (value)=>{
      setFormulario({...formulario, Instaladores:value});
    };
    
    const HandleSelectInstaladores_Back = (value)=>{
      setFormulario({...formulario, InstaladoresEnt_Back:value});
    };

    const HandleCantidades = (e, value)=>{
      const arr = [...arrCant];
      const arrFilter = arr.filter(value=> value.id !== e.target.name);
      const objeto = {};
      objeto.id = e.target.name;
      objeto.codigo = e.target.value;
      arrFilter.push(objeto);
      arrFilter.sort(function(a,b){
          if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            // a must be equal to b
            return 0;
      });
      setArrCant(arrFilter);
    };

    const handleExpanded = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const HandleShowEnt = ()=>{
      setShowNotEnt(false);
      setResetNotEnt(true);
    };

    const HandleOpenVnT = ()=>{
      //setViewerNot(true);
    };

    const onDropNot = index => e => {
      enqueueSnackbar('Nota de Entrega Seleccionada',{variant:'info'});        
      setSelectionNE(true);
      setNotaEntrega(e);
    };

    const HandleResetEnt = ()=>{
      setShowNotEnt(true);
      setResetNotEnt(false);
    };

    const HandleChangeManual = (e)=>{
      setManual(e.target.checked);
    };

    const HandleResetFotos = () =>{
      setNew(!isNew);
      setOpenDialog(!openDialog);
    };

    const HandleDialog = ()=>{
      setOpenDialog(!openDialog);
    };

    const HandleCloseDialogFotos1 =()=>{
      setOpenDialogFotos1(false);
    };

    const HandleNoDialogFotos1 = () =>{
      setOpenDialogFotos1(false);
      setShowRest(true);
    };

    const HandleDialogFotos1 = () =>{
      setOpenDialogFotos1(false);
      setFotosNow(true);
      setShowRest(true);
    };

    const HandleCloseDialogFotos2 =() =>{
      setOpenDialogFotos2(false);
    };

    const HandleDialogFotos2 = () =>{
      setOpenDialogFotos2(false);
      setFotosNow(true);
    };

    const HandleOpenDialogFotos2 = () =>{
      setOpenDialogFotos2(true);
    };

    const HandleOpenDialogTipTra = () =>{
      setOpenDialogTipTra(true);
    };

    const HandleCloseDialogTipTra =() =>{
      setOpenDialogTipTra(true);
    };

    const onDrop = index => e => {
      let newArr = [...pictures];
      newArr[index] = e;
      setPictures(newArr);
    };

    const HandleOpenDialogValidacion = ()=>{
      setOpenDialogValidacion(true);
    };

    const HandleCloseDialogValidacion =() =>{
      setOpenDialogValidacion(false);
    };

    const HandleValidacion = ()=>{
      setOpenDialogValidacion(false);
      setTimeout(()=>{
        setSaving(true);
      },500)
      setTimeout(()=>{
        setValidacion(true);
      },1000)
    };

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Webcam 
                                videoConstraints={videoConstraints || ''}
                                screenshotFormat="image/jpeg"
                                screenshotQuality={1}
                                //screenshotWidth={1024}
                                audio={false}
                                width='100%'
                                ref={setWebref}
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Button variant='contained' color='primary' fullWidth onClick={()=>setUrlImg({...urlImg, src1:webRef.getScreenshot()})} startIcon={<PhotoCameraIcon/>}>Tomar Foto</Button>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Card /* onClick={()=>{setArrImagePhoto([urlImg.src1])}}*/>
                                <CardMedia
                                    className={classes.media}
                                    component='div'
                                    image={ urlImg.src1 }
                                    title="FRONTAL"
                                />
                            </Card>
                            
                        </Grid>
                    </>
                );
            case 1:
                return (
                    <>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                        <Webcam 
                            videoConstraints={videoConstraints || {}}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={1}
                            //screenshotWidth={1024}
                            audio={false}
                            width='100%'
                            ref={setWebref}
                        />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                        <Button variant='contained' color='primary' fullWidth onClick={()=>setUrlImg({...urlImg, src2:webRef.getScreenshot()})} startIcon={<PhotoCameraIcon/>}>Tomar Foto</Button>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                    <Card /*onClick={()=>{setArrImagePhoto([urlImg.src2])}}*/>
                            <CardMedia
                                className={classes.media}
                                component='div'
                                image={ urlImg.src2 }
                                title="LATERAL A"
                            />
                        </Card>
                    </Grid>
                </>
                );
            case 2:
                return (
                    <>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Webcam 
                                videoConstraints={videoConstraints || {}}
                                screenshotFormat="image/jpeg"
                                screenshotQuality={1}
                                //screenshotWidth={1024}
                                audio={false}
                                width='100%'
                                ref={setWebref}
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Button variant='contained' color='primary' fullWidth onClick={()=>setUrlImg({...urlImg, src3:webRef.getScreenshot()})} startIcon={<PhotoCameraIcon/>}>Tomar Foto</Button>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Card /*onClick={()=>{setArrImagePhoto([urlImg.src3])}}*/>
                                <CardMedia
                                    className={classes.media}
                                    component='div'
                                    image={ urlImg.src3 }
                                    title="LATERAL B"
                                />
                            </Card>
                        </Grid>
                    </>
                );
            case 3:
                return (
                    <>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Webcam 
                                videoConstraints={videoConstraints || {}}
                                screenshotFormat="image/jpeg"
                                screenshotQuality={1}
                                //screenshotWidth={1024}
                                audio={false}
                                width='100%'
                                ref={setWebref}
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Button variant='contained' color='primary' fullWidth onClick={()=>setUrlImg({...urlImg, src4:webRef.getScreenshot()})} startIcon={<PhotoCameraIcon/>}>Tomar Foto</Button>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                            <Card /*onClick={()=>{setArrImagePhoto([urlImg.src4])}}*/>
                                <CardMedia
                                    className={classes.media}
                                    component='div'
                                    image={ urlImg.src4 }
                                    title="PANORÁMICA"
                                />
                            </Card>
                        </Grid>
                    </>
                );
            default:
                return(
                    <div></div>
                )
        }
    };

    const videoConstraints = {
      width: 1280,
      height: 720,
      //screenshotWidth:1280,
      facingMode: "environment"
    };

    function getSteps() {
      return ['Frontal', 'Lateral Izquierdo', 'Lateral Derecho', 'Panoramica'];
    };
  /*****************************************************/



  /******************** HANDLE ACCIONES ****************/
    const HandleSearch = () =>{
      if (formulario.numpro === '' || parseInt(formulario.numpro) < 1000 ){
        enqueueSnackbar('Debe ingresar un Numero de Presupuesto para poder realizar la busqueda!',{variant:'error'});
      }else{
        fetch('/fetch_SearchCrono',{
                method: 'POST',
                body: JSON.stringify({numpro:formulario.numpro}),
                headers:{
                  'Content-Type':'application/json'
                }
        })
        .then(response=> response.json())
        .then(result =>{
          if (result.message){
            console.log(result.message);
            enqueueSnackbar('NO EXISTE CRONOGRAMA PARA ESE PPTO',{variant:'error'});
            HandleClearTotal();
          }else if(result.status){
            console.log(result.status);
            enqueueSnackbar(result.status,{variant:'error'});
            HandleClearTotal();
          }else{     
            if(result.numot > 1000){
              console.log(result);
              setSearch(true);
              enqueueSnackbar('Direcciones Cargadas',{variant:'info'});               
              setLocales(result.items);   // locales y direcciones
              setEncabezados(result.encabezados); // tipos de trabajos 
              setData(result);
            }else{ 
              if(result.numotOp > 1000){
                setData(result);
                setTimeout(()=>{
                  setFirstOpen(true);
                },1200)
                
              }else{
                setShowAlertOt(true);
              }
            }
          }
        });
      }
    };

    const HandleClearTotal = ()=>{
      setSearch(false);
      setFormulario({ Cadena:'', Local:'', Ciudad:'', Sector:'', Direccion:'', Provincia:'', Instaladores:[], NotEnt:0, numpro:'', Codigo:'', Fotos:[]});
      setTiposTrabajos([]);
      setCharged(false);
      setLocales([]);
      setEncabezados([]);
      setMoreTipTra(false);
      setAloneTipTra(false);  
      //setCoordenadas({});
      setArrFotosModelos();
      setShowFotosModelos(true);
      setFotosModelos(false);
      setShowRest(false);
      setArrCant([]);
      setExpanded(false);
      setShowNotEnt(false);
      setEdited(false);
      setSelectionNE(false);
      //setViewerNot(false);
      //setNotEntImage(false);
      setNotaEntrega([]);
      setManual(false);
      setNew(true);
      setPictures([]);
      setValidacion(false);
      setUrlImg({});
      setReadySave(false);
      setActiveStep(0);
      setWebref();
      //setArrImagePhoto([]);
      setFotosNow(false);
      setOpenDialogFotos1(false);
      setOpenDialogFotos2(false);
      setOpenDialogTipTra(false);
      setOpenDialogValidacion(false);
      setShowMoreTipTra(false);
      setSaving(false);
      setResetPhotos2(false);
      setFirstOpen(false);
      setSecondOpen(false);
      setShowAlertOt(false);
      setEntrega(false);
      setNewEntrega(false);
    };

    const HandleClearDireccion = () =>{
      setFormulario({ numpro:formulario.numpro, NotEnt:0, Codigo:'', Instaladores:[], Provincia:'', Direccion:'', Sector:'', Ciudad:'', Cadena:'', Local:'', Fotos:[]});
      setCharged(false);
      setTiposTrabajos([]);
      setMoreTipTra(false);
      setAloneTipTra(false);
      //setCoordenadas({});
      setArrFotosModelos();
      setShowFotosModelos(true);
      setFotosModelos(false);
      setShowRest(false);
      setArrCant([]);
      setExpanded(false);
      setShowNotEnt(false);
      setEdited(false);
      setSelectionNE(false);
      //setViewerNot(false);
      //setNotEntImage(false);
      setNotaEntrega([]);
      setManual(false);
      setNew(true);
      setPictures([]);
      setValidacion(false);
      setUrlImg({});
      setReadySave(false);
      setActiveStep(0);
      setWebref();
      //setArrImagePhoto([]);
      setFotosNow(false);
      setOpenDialogFotos1(false);
      setOpenDialogFotos2(false);
      setOpenDialogTipTra(false);
      setOpenDialogValidacion(false);
      setShowMoreTipTra(false);
      setSaving(false);
      setResetPhotos2(false);
      setFirstOpen(false);
      setSecondOpen(false);
      setEntrega(false);
      setNewEntrega(false);
    };

    const HandleClearTipTra = ()=>{
      setOpenDialogFotos1(false);
      setOpenDialogFotos2(false);
      setOpenDialogTipTra(false);
      setMoreTipTra(false);
      setShowFotosModelos(true);
      setArrFotosModelos([]);
      setArrCant([])
      setShowNotEnt(false);
      setEdited(false);
      setFormulario({
        numpro:formulario.numpro,
        Local:formulario.Local,
        Direccion:formulario.Direccion,
        Instaladores:[],
        Latitud:formulario.Latitud,
        Longitud:formulario.Longitud,
        NotEnt:0
      });
      setExpanded(false);
      setShowRest(false);
      setNew(true);
      //setViewerNot(false);
      //setNotEntImage(false);
      setNotaEntrega([]);
      setManual(false);
      setPictures([]);
      setValidacion(false);
      setUrlImg({});
      setReadySave(false);
      setActiveStep(0);
      setWebref();
      //setArrImagePhoto([]);
      setFotosNow(false);
      setSaving(false);
      setResetPhotos2(false);
      setEntrega(false);
      setNewEntrega(false);
    };

    const HandleClearTipTraQuestion = ()=>{
      setOpenDialogFotos1(false);
      setOpenDialogFotos2(false);
      setOpenDialogTipTra(false);
      setMoreTipTra(false);
      setShowFotosModelos(true);
      setArrFotosModelos([]);
      setArrCant([])
      setShowNotEnt(false);
      setEdited(false);
      setFormulario({
        numpro:formulario.numpro,
        Local:formulario.Local,
        Direccion:formulario.Direccion,
        Instaladores:formulario.Instaladores,
        Latitud:formulario.Latitud,
        Longitud:formulario.Longitud,
        NotEnt:0
      });
      setExpanded(false);
      setShowRest(false);
      setNew(true);
      //setViewerNot(false);
      //setNotEntImage(false);
      setNotaEntrega([]);
      setManual(false);
      setPictures([]);
      setValidacion(false);
      setUrlImg({});
      setReadySave(false);
      setActiveStep(0);
      setWebref();
      //setArrImagePhoto([]);
      setFotosNow(false);
      setEntrega(false);
      setNewEntrega(false);
    };

    const HandleSelectDirection = async (value)=>{
      const split_value = value.split("_||_"); // Separa local y direccion;
      const loc = split_value[0].toString(); // local
      const dir = split_value[1].toString(); // direccion
      const dato =  Locales.find(value2=>value2.Direccion.toString() === dir);   
      console.log(dato)                                 
      const Dkeys = Object.keys(dato);
      const FilterEnunciados = encabezados.filter(value=> Dkeys.includes(value.tiptra)); // Array con los tiptra del local
      if(FilterEnunciados.length > 1){
        console.log('FilterEnunciados.length > 1')
        setFormulario({...formulario, idItem:dato.id, Garantia:dato.Garantia, Cadena:dato.Cadena, Direccion:dir, Local:loc, Provincia:dato.Provincia, Ciudad:dato.Ciudad, Sector:dato.Sector, Instaladores: [], Latitud:coordenadasInit.Latitud, Longitud:coordenadasInit.Longitud});
        setTiposTrabajos(FilterEnunciados);
        setShowMoreTipTra(true);
        if(dato.TipoElemento){
          if(dato.TipoElemento === 'Entrega'){
            setEntrega(true);
          }
        }
      }else{
        console.log('FilterEnunciados.length < 1')
        const tip = FilterEnunciados[0].tiptra;   // nombre tipo trabajo
        const canti = parseInt(dato[tip]);  // cantidad tipo trabajo
        setFormulario({...formulario, idItem:dato.id, Cantidad:canti, Garantia:dato.Garantia, Cadena:dato.Cadena, Direccion:dir, Local:loc, TipTra:tip, Provincia:dato.Provincia, Ciudad:dato.Ciudad, Sector:dato.Sector, Instaladores: [], Latitud:coordenadasInit.Latitud, Longitud:coordenadasInit.Longitud});
        setTiposTrabajos(FilterEnunciados);
        setAloneTipTra(true);
        if(dato.TipoElemento){
          if(dato.TipoElemento === 'Entrega'){
            setEntrega(true);
          }
        }
      }
    };

    const HandleSelectTipTra = async (value)=>{
      setFormulario({...formulario, TipTra:value});
      setMoreTipTra(true);
    };

    const HandleResetPhotos1 = ()=>{
      setActiveStep(0);
      setUrlImg({}); 
    };

    const HandleResetPhotos2 = ()=>{
      setPictures([]);
      setManual(false);
      setResetPhotos2(true);
    }

    const HandleSave = async ()=>{
      if(selectionNE){
        console.log('selectionNE');
        let notname =  `/notent/${formulario.numpro}-${formulario.Local}-${formulario.TipTra}-${formulario.NotEnt}.jpg`;
        let fdne = new FormData();
        fdne.append(notaEntrega[0].name,notaEntrega[0],notname);
        fetch('/fetch_InstalacionNotaEntrega', {method: 'POST', body: fdne})
            .then(res => res.json()) 
            .then(res => console.log(res));
            if(isEntrega){
              if(isNewEntrega){
                const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                if(existingTokens){
                  if(existingTokens.length <= 4){
                    setFormulario({...formulario, FotosEnt_Back:existingTokens});
                    localStorage.removeItem("dataInstalacionCG");
                    setReadySave(true);
                  }else{
                    enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                  }
                }else{
                  enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                }
              }else{
                if(formulario.Fotos){
                  if(formulario.Fotos.length === 0){
                    const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                    if(existingTokens){
                      if(existingTokens.length <= 4){
                        setFormulario({...formulario, Fotos:existingTokens});
                        localStorage.removeItem("dataInstalacionCG");
                        setReadySave(true);
                      }else{
                        enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                      }
                    }else{
                      enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                    }
                  }
                  setReadySave(true);
                }else{
                  const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                  if(existingTokens){
                    if(existingTokens.length <= 4){
                      setFormulario({...formulario, Fotos:existingTokens});
                      localStorage.removeItem("dataInstalacionCG");
                      setReadySave(true);
                    }else{
                      enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                    }
                  }else{
                    enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                  }
                }
              }
            }else{
              if(fotosNow){
                console.log('fotosNow');
                if(isManual){
                  console.log('isManual');
                  const fd = new FormData();
                  const arr = [];
                  const API_URL = '/fetch_InstalacionImagenes2';
                  const tipos = ['Frontal', 'Lateral A', 'Lateral B', 'Panoramica'];
                  const locSplit = ((formulario.Local.split('/'))[0]).toString();
                  const tiptra_Split = formulario.TipTra.split('/');
                  const tiptraSplit = tiptra_Split.length > 1 ? (tiptra_Split[1]).toString() : (tiptra_Split[0]).toString() ;
                  const idIt = formulario.idItem ? formulario.idItem : uuidv4();
                  pictures.forEach((value,index)=>{
                      const objeto = {};
                      let name =  `/fotosIns/${formulario.numpro}-${locSplit}-${tiptraSplit}-${idIt}-${index}.jpg`;
                      fd.append(value[0].name,pictures[index][0],name);
                      objeto.src =  name;
                      objeto.tipo = tipos[index];
                      arr.push(objeto);
                      if(index === 3){
                          setFormulario({...formulario, Fotos:arr});
                          fetch(API_URL, {method: 'POST', body: fd})
                              .then(res => res.json()) 
                              .then(res => {
                                  if(res.message){
                                      console.log('ReadySave');
                                      enqueueSnackbar(res.message,{variant:'info'});
                                      setReadySave(true);
                                  }else{
                                      enqueueSnackbar(res.status,{variant:'error'});
                                  }                                    
                              });
                      }
                  });
                }else{
                  console.log('!isManual');
                  const fd = new FormData();
                  const arr = [];
                  let numa = 1;
                  const locSplit = ((formulario.Local.split('/'))[0]).toString();
                  const tiptra_Split = formulario.TipTra.split('/');
                  const tiptraSplit = tiptra_Split.length > 1 ? (tiptra_Split[1]).toString() : (tiptra_Split[0]).toString() ;
                  const idIt = formulario.idItem ? formulario.idItem : uuidv4(); 
                  const tipos = ['', 'Frontal', 'Lateral A', 'Lateral B', 'Panoramica'];
                  for (const property in urlImg) {
                      const objeto = {};
                      const reque = await fetch(urlImg[property]);
                      const blob = await reque.blob();           
                      const file = new File([blob],`${formulario.numpro}-${locSplit}-${tiptraSplit}-${idIt}-${numa}.jpg`);
                          fd.append('image', file);
                          objeto.src =  `/fotosIns/${formulario.numpro}-${locSplit}-${tiptraSplit}-${idIt}-${numa}.jpg`;
                          objeto.tipo = tipos[numa];
                          arr.push(objeto);
                      if(numa === 4){
                          setFormulario({...formulario, Fotos:arr});
                          const API_URL = '/fetch_InstalacionImagenes';
                          fetch(API_URL, {method: 'POST', body: fd})
                              .then(res => res.json()) 
                              .then(res => {
                                  if(res.message){
                                      console.log('ReadySave');
                                      enqueueSnackbar(res.message,{variant:'info'});
                                      setReadySave(true);
                                  }else{
                                      enqueueSnackbar(res.status,{variant:'error'});
                                  }                                    
                              });
                      }
                      numa++;
                  }  
                }
              }else{
                console.log('!fotosNow');
                setReadySave(true);
              }  
            }
            
      }else{
        console.log('!selectionNE');
        if(isEntrega){
          if(isNewEntrega){
            const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
            if(existingTokens){
              if(existingTokens.length <= 4){
                console.log('INTO')
                setFormulario({...formulario, FotosEnt_Back:existingTokens});
                localStorage.removeItem("dataInstalacionCG");
                setReadySave(true);
              }else{
                enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
              }
            }else{
              enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
            }
          }else{
            if(formulario.Fotos){
              if(formulario.Fotos.length === 0){
                const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                if(existingTokens){
                  if(existingTokens.length <= 4){
                    setFormulario({...formulario, Fotos:existingTokens});
                    localStorage.removeItem("dataInstalacionCG");
                    setReadySave(true);
                  }else{
                    enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                  }
                }else{
                  enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                }
              }
              setReadySave(true);
            }else{
              const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
              if(existingTokens){
                if(existingTokens.length <= 4){
                  setFormulario({...formulario, Fotos:existingTokens});
                  localStorage.removeItem("dataInstalacionCG");
                  setReadySave(true);
                }else{
                  enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
                }
              }else{
                enqueueSnackbar('SUBA POR LO MENOS 1 FOTO', { variant:'error'});
              }
            }
          }
        }else{
          if(fotosNow){
            console.log('fotosNow');
            if(isManual){
              console.log('isManual');
              const fd = new FormData();
              const arr = [];
              const API_URL = '/fetch_InstalacionImagenes2';
              const tipos = ['Frontal', 'Lateral A', 'Lateral B', 'Panoramica'];
              const locSplit = ((formulario.Local.split('/'))[0]).toString();
              const tiptra_Split = formulario.TipTra.split('/');
              const tiptraSplit = tiptra_Split.length > 1 ? (tiptra_Split[1]).toString() : (tiptra_Split[0]).toString() ;
              const idIt = formulario.idItem ? formulario.idItem : uuidv4(); 
              pictures.forEach((value,index)=>{
                  const objeto = {};
                  let name =  `/fotosIns/${formulario.numpro}-${locSplit}-${tiptraSplit}-${idIt}-${index}.jpg`;
                  fd.append(value[0].name,pictures[index][0],name);
                  console.log(value[0].name);
                  objeto.src =  name;
                  objeto.tipo = tipos[index];
                  arr.push(objeto);
                  if(index === 3){
                    setFormulario({...formulario, Fotos:arr});
                    console.log(formulario.Fotos);
                    console.log(fd);
                    fetch(API_URL, {method: 'POST', body: fd})
                        .then(res => res.json()) 
                        .then(res => {
                            if(res.message){
                                console.log('ReadySave');
                                enqueueSnackbar(res.message,{variant:'info'});
                                setReadySave(true);
                            }else{
                                enqueueSnackbar(res.status,{variant:'error'});
                            }                                    
                        });
                  }
              });
            }else{
              console.log('!isManual');
              const fd = new FormData();
              const arr = [];
              let numa = 1;
              const tipos = ['', 'Frontal', 'Lateral A', 'Lateral B', 'Panoramica'];
              const locSplit = ((formulario.Local.split('/'))[0]).toString();
              const tiptra_Split = formulario.TipTra.split('/');
              const tiptraSplit = tiptra_Split.length > 1 ? (tiptra_Split[1]).toString() : (tiptra_Split[0]).toString() ;
              const idIt = formulario.idItem ? formulario.idItem : uuidv4(); 
              for (const property in urlImg) {
                  const objeto = {};
                  const reque = await fetch(urlImg[property]);
                  const blob = await reque.blob();            
                  const file = new File([blob],`${formulario.numpro}-${locSplit}-${tiptraSplit}-${idIt}-${numa}.jpg`);
                      fd.append('image', file);
                      objeto.src =  `/fotosIns/${formulario.numpro}-${locSplit}-${tiptraSplit}-${idIt}-${numa}.jpg`;
                      objeto.tipo = tipos[numa];
                      arr.push(objeto);
                  if(numa === 4){
                      setFormulario({...formulario, Fotos:arr});
                      const API_URL = '/fetch_InstalacionImagenes';
                      fetch(API_URL, {method: 'POST', body: fd})
                          .then(res => res.json()) 
                          .then(res => {
                              if(res.message){
                                  console.log('ReadySave');
                                  enqueueSnackbar(res.message,{variant:'info'});
                                  setReadySave(true);
                              }else{
                                  enqueueSnackbar(res.status,{variant:'error'});
                              }                                    
                          });
                  }
                  numa++;
              }  
            }
          }else{
            console.log('!fotosNow');
            setReadySave(true);
          }   
        }
      }              
    };

    const HandlePutOT = ()=>{
      setPutOt(true);
      fetch('/PutOtCrono',{
        method: 'PUT',
        body: JSON.stringify({numpro:formulario.numpro, numot:data.numotOp}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(response=> response.json())
      .then(result =>{
          if(result.message){
            setTimeout(()=>{
              setPutOt(false);
              setSecondOpen(true);
            },800)
            setTimeout(()=>{
              enqueueSnackbar('Cronograma Actualizado',{variant:'success'});
            },1000)
          }else{
            enqueueSnackbar('ERROR REPORTELO CON SISTEMAS',{variant:'error'});
            setTimeout(()=>{
              HandleClearTotal();
            },1000)
          }
      })
    }

  /*****************************************************/
  
  /************************* MAPEOS ********************/
    const Cantidades = arrCant.map((value,index)=>  {
      return(
          <Grid item xl={4} lg={4} md={6} sm={6} xs={12} className={classes.Instalador} key={`cant${index}`}>    
              <TextField label="Codigo" variant="outlined" name={value.id} value={value.codigo || ''} onChange={HandleCantidades}  fullWidth />        
          </Grid>
      );
    });
  
  /*****************************************************/

  return(
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={HandleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{width:'100%', textAlign:'center'}} >  
            <Typography variant="h4" color='primary' gutterBottom>
            DESEA VOLVER A TOMAR O SUBIR LAS FOTOS?
            </Typography>
        </div>
        <DialogActions style={{width:'100%'}}>
          <Grid container justify='center' spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleDialog} fullWidth variant="contained" color='secondary'>
                NO
              </Button>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleResetFotos} fullWidth color="primary" variant="contained" autoFocus>
                SI
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogFotos1}
        onClose={HandleCloseDialogFotos1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen 
      >
        <div style={{width:'100%', textAlign:'center'}} >  
            <Typography variant="h4" color='primary' gutterBottom>
              DESEA TOMAR O SUBIR LAS FOTOS AHORA?
            </Typography>
        </div>
        <DialogActions style={{width:'100%'}}>
          <Grid container justify='center' spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleNoDialogFotos1} fullWidth variant="contained" color='secondary'>
                NO
              </Button>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleDialogFotos1} fullWidth color="primary" variant="contained" autoFocus>
                SI
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogFotos2}
        onClose={HandleCloseDialogFotos2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen 
      >
        <div style={{width:'100%', textAlign:'center'}} >  
            <Typography variant="h4" color='primary' gutterBottom>
            DESEA TOMAR O SUBIR LAS FOTOS AHORA?
            </Typography>
        </div>
        <DialogActions style={{width:'100%'}}>
          <Grid container justify='center' spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleCloseDialogFotos2} fullWidth variant="contained" color='secondary'>
                NO
              </Button>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleDialogFotos2} fullWidth color="primary" variant="contained" autoFocus>
                SI
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogTipTra}
        onClose={HandleCloseDialogTipTra}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
        fullScreen 
      >
        <div style={{width:'100%', textAlign:'center'}} >  
            <Typography variant="h5" color='primary' gutterBottom>
            Desea usar la misma información para otro Tipo de Trabajo?
            </Typography>
        </div>
        <DialogActions style={{width:'100%'}}>
          <Grid container justify='center' spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleClearTotal} fullWidth variant="contained" color='secondary'>
                NO
              </Button>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleClearTipTraQuestion} fullWidth color="primary" variant="contained" autoFocus>
                SI
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogValidacion}
        onClose={HandleCloseDialogValidacion}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='sm'
      >
        <div style={{width:'100%', textAlign:'center'}} >  
            <Typography variant="h5" color='primary' gutterBottom>
              ¿Desea Guardar?
            </Typography>
        </div>
        <DialogActions style={{width:'100%'}}>
          <Grid container justify='center' spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleCloseDialogValidacion} fullWidth variant="contained" color='secondary'>
                NO
              </Button>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <Button onClick={HandleValidacion} fullWidth color="primary" variant="contained" autoFocus>
                SI
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>INSTALACION SIN O.T.</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <p>El cronograma no tiene O.T. pero la O.P. si, dele en proceder para actualizar</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {
            isPutOt ?
            <ButtonSemantic loading>Loading</ButtonSemantic>
            : (
            <ButtonSemantic onClick={HandlePutOT} primary>
              Proceder <IconSemantic name='right chevron' />
            </ButtonSemantic>
            )
          }
        </Modal.Actions>

        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
        >
          <Modal.Header>Actualizado</Modal.Header>
          <Modal.Content>
            <p>Dele en Ok para seguir con la Instalacion</p>
          </Modal.Content>
          <Modal.Actions>
            <ButtonSemantic
              icon='check'
              content='Ok'
              onClick={HandleClearTotal}
              color='green'
            />
          </Modal.Actions>
        </Modal>
      </Modal>
      <Dialog
        open={showAlertOt}
        onClose={HandleClearTotal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen 
      >
        <div style={{width:'100%', textAlign:'center'}} >  
            <Typography variant="h4" color='primary' gutterBottom>
              NO PUEDE CONTINUAR YA QUE NO EXISTE UNA O.T. COMUNIQUESE CON VENTAS
            </Typography>
        </div>
        <DialogActions style={{width:'100%'}}>
          <Grid container justify='center' spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
              <ButtonSemantic onClick={HandleClearTotal} fullWidth color="red" fluid>
                OK
              </ButtonSemantic>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isSaving}>
          <Typography variant="h4" color='secondary' gutterBottom style={{marginRight:20, marginTop:10}}>
            GUARDANDO
          </Typography>
        <CircularProgress color="secondary"/>
      </Backdrop>
      <Grid container justify='center'>
        <Grid item xl={10} lg={10} md={12} sm={12} xs={12}  >
          <Paper elevation={3}>
              <Grid container justify='center' alignContent='center' spacing={2} > 
                  <Grid item xl={3} lg={3} md={3} sm={6} xs={12} >
                    <Grid container spacing={1} style={{padding:3}}>
                      <Grid item  xl={10} lg={10} md={10} sm={10} xs={10}>
                        <TextField 
                            id="numpro"
                            name='numpro' 
                            label="PPTO." 
                            fullWidth
                            autoFocus
                            value={formulario.numpro || ''}
                            variant="outlined"
                            type='Number'
                            onChange={HandleFormulario}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment:(
                                    <IconButton onClick={HandleSearch} >
                                        <SearchIcon color='primary' />
                                    </IconButton>
                                )
                            }}
                            onKeyPress={(e)=>{
                                const code = e.keyCode || e.which;
                                if(code === 13)
                                    HandleSearch();
                            }}
                        />
                      </Grid>
                      <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                        <Fab onClick={HandleClearTotal} disabled={!isSearch} size='small' color='primary' style={{marginTop:8, marginLeft:-3}}>
                          <Tooltip title='Refrescar'>
                            <CachedIcon/>
                          </Tooltip>
                        </Fab>
                      </Grid>
                    </Grid>
                  </Grid>    
                  <Grid item xl={3} lg={3} md={3} sm={6} xs={12} >
                      <TextField 
                          id="Local"
                          name='Local' 
                          label='Local'
                          fullWidth
                          value={formulario.Local || ''}
                          variant="outlined"
                          placeholder='Local'
                          disabled={!isSearch}
                      />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                      <Grid container spacing={1}>
                          <Grid item  xl={10} lg={10} md={10} sm={10} xs={10}>
                              <Autocomplete
                                  id="Direccion"
                                  options={Locales}
                                  getOptionLabel={(option) => {return( `${option.Local}_||_${option.Direccion}`)}}
                                  renderInput={(params) => <TextField {...params} disabled={!isSearch} label="Dirección" fullWidth variant="outlined" />}
                                  inputValue={formulario.Direccion || ''}
                                  onInputChange={
                                      (e,value, reason)=>{ 
                                        console.log(reason);
                                          if(reason === 'clear'){
                                              HandleClearDireccion();
                                          }else if(reason === 'reset'){
                                              if(isCharged === false){
                                                  setCharged(true)
                                                  if(formulario.numpro > 0 ){
                                                    HandleSelectDirection(value);
                                                  }
                                                  
                                              }
                                              
                                          }
                                  }}
                              />
                          </Grid>
                          <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                            <Fab onClick={HandleClearDireccion} color='secondary' disabled={!isCharged} size='small' style={{marginTop:8}}>
                              <Tooltip title='Refrescar'>
                                <RefreshIcon/>
                              </Tooltip>
                            </Fab>
                          </Grid>
                      </Grid>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                    {
                      aloneTipTra &&
                        <Grid container style={{ padding:5}} spacing={2} >
                          <Grid item xl={9} lg={9} md={9} sm={9} xs={9} >
                            <TextField 
                                id="TipTra"
                                name='TipTra' 
                                label='TipTra'
                                fullWidth
                                value={formulario.TipTra || ''}
                                variant="outlined"
                                placeholder='TipTra'
                            />
                          </Grid>
                          <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                            <Paper style={{height:55, marginTop:4.5}}>
                                <Grid container justify='center' alignItems='center' alignContent='center' spacing={1}>
                                    <Hidden xsDown>
                                        <Grid item>
                                            OFF
                                        </Grid>
                                    </Hidden>
                                    <Grid item>
                                        <Switch
                                            checked={isFotosModelos}
                                            onChange={HandleFotosModelos}
                                            name="Manual"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            disabled = {showFotosModelos}
                                        />
                                    </Grid>
                                    <Hidden xsDown>
                                        <Grid item>
                                            ON
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                    }
                    { 
                      showMoreTipTra &&
                        <Grid container style={{ padding:5}} spacing={2} >
                          <Grid item xl={9} lg={9} md={9} sm={9} xs={9} >
                            <Autocomplete
                              id="TipTra"
                              options={TiposTrabajos}
                              getOptionLabel={(option) => option.tiptra}
                              renderInput={(params) => <TextField {...params} label="Tipos de Trabajo" variant="outlined" />}
                              inputValue={formulario.TipTra || ''}
                              onInputChange={
                                  (e,value, reason)=>{
                                      console.log(reason)
                                      if(reason === 'clear'){
                                          HandleClearTipTra();
                                      }else if(reason === 'reset'){
                                          HandleSelectTipTra(value)
                                      }
                              }}
                            />
                          </Grid>
                          <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                            <Paper style={{height:55, marginTop:4.5}}>
                                <Grid container justify='center' alignItems='center' alignContent='center' spacing={1}>
                                    <Hidden xsDown>
                                        <Grid item>
                                            OFF
                                        </Grid>
                                    </Hidden>
                                    <Grid item>
                                        <Switch
                                            checked={isFotosModelos}
                                            disabled = {showFotosModelos}
                                            onChange={HandleFotosModelos}
                                            name="Manual"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    </Grid>
                                    <Hidden xsDown>
                                        <Grid item>
                                            ON
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                    }   
                  </Grid>  
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                    {
                      isFotosModelos && 
                      <Carousel autoPlay>
                        {arrFotosModelos}
                      </Carousel>
                    }
                  </Grid>     
                  {
                    showRest &&
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  >
                      <Grid container style={{padding:5}}  spacing={2}>
                        {
                          isEntrega &&
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            <Autocomplete
                                multiple
                                disabled={!isNewEntrega}
                                id="InstaladoresEnt_Back"
                                options={getInstaladores}
                                disableCloseOnSelect
                                value={formulario.InstaladoresEnt_Back || []}
                                onChange={(e,value)=>{HandleSelectInstaladores_Back(value) }}
                                getOptionLabel={(option) => option.instalador}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                    {option.instalador}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Instaladores CheckIn" fullWidth placeholder="Instaladores CheckIn" />
                                )}
                            />
                          </Grid>
                          }
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            <Autocomplete
                                multiple
                                id="Instaladores"
                                options={getInstaladores}
                                disableCloseOnSelect
                                value={formulario.Instaladores || []}
                                onChange={(e,value)=>{HandleSelectInstaladores(value) }}
                                getOptionLabel={(option) => option.instalador}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                    {option.instalador}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Instaladores" fullWidth placeholder="Instaladores" />
                                )}
                            />
                          </Grid>
                        { !isEntrega && 
                          <React.Fragment>
                          <Grid item xl={6} lg={6} md={6} sm={6} xs={12} >
                            <TextField 
                                id="Latitud"
                                name='latitud' 
                                fullWidth
                                label="Latitud" 
                                value={formulario.Latitud || ''}
                                variant="outlined"
                            />
                          </Grid>
                          <Grid item xl={6} lg={6} md={6} sm={6} xs={12} >
                              <TextField 
                                  id="Longitud"
                                  name='Longitud' 
                                  fullWidth
                                  label="Longitud" 
                                  value={formulario.Longitud || ''}
                                  variant="outlined"
                              />
                          </Grid> 
                        </React.Fragment>}
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleExpanded('panel1')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon style={{color:'#064c91'}}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{justifyContent:'center'}}
                            >
                            <Typography component={'span'} > Codigos</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Grid container justify='center' alignContent='center' spacing={1}>
                              {Cantidades}
                            </Grid>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>                                
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.Instalador} >
                          <Paper square elevation={2} style={{padding:5}}>
                              <Grid container spacing={2} justify='center' alignContent='center' alignItems='center'>
                                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}   >
                                      <TextField 
                                          id="NotEnt"
                                          name='NotEnt' 
                                          fullWidth
                                          type='Number'
                                          label="Nota Entrega" 
                                          value={formulario.NotEnt || ''}
                                          onChange={HandleFormulario}
                                          variant="outlined"
                                      />
                                  </Grid>
                                  {
                                      showNotEnt ?
                                      (
                                          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}   >
                                              <Grid container spacing={2} justify='center' alignContent='center' alignItems='center'>
                                                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display:'flex', justifyContent:'center'}}>  
                                                      <Avatar alt="Remy Sharp" variant='rounded' src={formulario.NotEntSrc} onClick={HandleOpenVnT}/>  
                                                  </Grid>
                                                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>    
                                                      <IconButton onClick={HandleShowEnt} color="primary" ><RefreshIcon/></IconButton>
                                                  </Grid>
                                              </Grid>
                                          </Grid>
                                      )
                                      :
                                      (
                                        <>
                                          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.Instalador} >
                                              <ImageUploader
                                                  {...props}
                                                  withIcon={false}
                                                  onChange={onDropNot(0)}
                                                  imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                  maxFileSize={15242880}
                                                  singleImage={true}
                                                  withLabel={false}
                                                  withPreview={false}
                                                  buttonText='NOTA DE ENTREGA'
                                              />
                                          </Grid>
                                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >   
                                              { isResetNotEnt && <Button onClick={HandleResetEnt} variant="contained" color="primary" fullWidth startIcon={<RefreshIcon/>}></Button> } 
                                          </Grid>
                                        </>
                                      )
                                  }
                                  
                                  
                              </Grid>
                          </Paper>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.Instalador} >
                            <TextField 
                                id="Observacion"
                                name='Observacion' 
                                fullWidth
                                label="Observación" 
                                value={formulario.Observacion || ''}
                                onChange={HandleFormulario}
                                variant="outlined"
                                rows={6}
                                multiline
                            />
                        </Grid>
                        {
                          isEntrega ?
                          <Grid item xs={12}>
                            <Grid 
                              container 
                              justify='center'
                              alignContent='center'
                              spacing={2}>
                                <Grid item xs={12}>
                                  <CardParent
                                    isNewEntrega={isNewEntrega}
                                    data={formulario} />
                                  { formulario.Status === 'Entregado' && fotosNow &&
                                    <CardParent
                                    isFotos={true}
                                    isNewEntrega={isNewEntrega}
                                    data={formulario} />
                                  }
                                </Grid>
                                <Grid item xs={6} className={classes.Instalador} >
                                  <Button 
                                    onClick={HandleOpenDialogValidacion} 
                                    variant="contained" 
                                    disabled={isSaving}
                                    color="primary" 
                                    fullWidth 
                                    size='large'
                                    startIcon={<SaveIcon/>}>
                                    Guardar
                                  </Button>
                                </Grid>
                            </Grid>
                          </Grid>
                          :<React.Fragment>
                          {isNew ?
                            fotosNow ?
                            <React.Fragment>
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                                <Grid component="label" container alignItems="center" spacing={1}>
                                  <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                    <Button fullWidth size='medium' variant="contained" color="primary" disabled={isManual}>
                                      Tomar Foto
                                    </Button>
                                  </Grid>
                                  <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                      <Switch
                                          checked={isManual}
                                          onChange={HandleChangeManual}
                                          name="Manual"
                                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                                      />
                                  </Grid>
                                  <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                    <Button fullWidth size='medium' variant="contained" color="secondary" disabled={!isManual}>
                                      Subir Foto
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                              {
                                !isManual ?
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >                                
                                    <>
                                        <Stepper activeStep={activeStep} alternativeLabel>
                                            {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                            ))}
                                        </Stepper>
                                        <div>
                                            {activeStep === steps.length ? (
                                                <div style={{width:'100%'}}>
                                                  <Grid container>
                                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                                                      <Button 
                                                        onClick={HandleOpenDialogValidacion} 
                                                        variant="contained" 
                                                        disabled={isSaving}
                                                        color="primary" 
                                                        fullWidth 
                                                        size='large'
                                                        startIcon={<SaveIcon/>}>
                                                        Guardar
                                                      </Button>
                                                    </Grid>
                                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                                                      <Button 
                                                        fullWidth 
                                                        size='large' 
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.button}
                                                        onClick={HandleResetPhotos1}
                                                        endIcon={<RefreshIcon/>} >
                                                        Resetear
                                                      </Button>
                                                    </Grid>
                                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                                                      <Button 
                                                        fullWidth 
                                                        size='large' 
                                                        variant="contained"
                                                        onClick={HandleClearTotal}
                                                        endIcon={<CachedIcon/>} >
                                                        Limpiar
                                                      </Button>
                                                    </Grid>
                                                  </Grid>
                                                </div>
                                                ) : (
                                                <div>
                                                    <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                                    <div>
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            onClick={handleBack}
                                                            className={classes.backButton}
                                                        >
                                                            Back
                                                        </Button>
                                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                  </Grid>         
                                :
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >                                
                                    <Grid container>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <ImageUploader
                                                {...props}
                                                withIcon={false}
                                                onChange={onDrop(0)}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                singleImage={true}
                                                withLabel={false}
                                                withPreview={true}
                                                buttonText='FRONTAL'
                                            />
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <ImageUploader
                                                {...props}
                                                withIcon={false}
                                                onChange={onDrop(1)}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                singleImage={true}
                                                withLabel={false}
                                                withPreview={true}
                                                buttonText='LATERAL IZ.'
                                            />
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <ImageUploader
                                                {...props}
                                                withIcon={false}
                                                onChange={onDrop(2)}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                singleImage={true}
                                                withLabel={false}
                                                withPreview={true}
                                                buttonText='LATERAL DER.'
                                            />
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                            <ImageUploader
                                                {...props}
                                                withIcon={false}
                                                onChange={onDrop(3)}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                singleImage={true}
                                                withLabel={false}
                                                withPreview={true}
                                                buttonText='PANORÁMICA'
                                            />
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                                            <Button 
                                              onClick={HandleOpenDialogValidacion} 
                                              variant="contained" 
                                              disabled={isSaving}
                                              color="primary" 
                                              fullWidth 
                                              size='large'
                                              startIcon={<SaveIcon/>}>
                                                Guardar
                                            </Button>
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                                          <Button 
                                            fullWidth 
                                            size='large' 
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={HandleResetPhotos2}
                                            endIcon={<RefreshIcon/>} >
                                            Resetear
                                          </Button>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                                          <Button 
                                            fullWidth 
                                            size='large' 
                                            variant="contained"
                                            onClick={HandleClearTotal}
                                            endIcon={<CachedIcon/>} >
                                            Limpiar
                                          </Button>
                                        </Grid>
                                    </Grid>
                                  </Grid> 
                              }
                            </React.Fragment>
                            :
                            <React.Fragment>
                              <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                                <Button 
                                  fullWidth 
                                  size='large' 
                                  variant="contained"
                                  color="primary"
                                  disabled={isSaving}
                                  className={classes.button}
                                  onClick={HandleOpenDialogValidacion}
                                  endIcon={<SaveIcon/>} >
                                  Guardar
                                </Button>
                              </Grid>
                              <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                                <Button 
                                fullWidth 
                                size='large' 
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={HandleOpenDialogFotos2}
                                endIcon={<AddAPhotoIcon/>} >
                                  Fotos
                                </Button>
                              </Grid>
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                                <Button 
                                  fullWidth 
                                  size='large' 
                                  variant="contained"
                                  onClick={HandleClearTotal}
                                  endIcon={<CachedIcon/>} >
                                  Limpiar
                                </Button>
                              </Grid>
                            </React.Fragment>
                          :
                          <React.Fragment>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                              <Button 
                              fullWidth 
                              size='large' 
                              disabled={isSaving}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={HandleOpenDialogValidacion}
                              endIcon={<SaveIcon/>} >
                                Guardar
                              </Button>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.Instalador} >
                              <Button 
                                fullWidth 
                                size='large' 
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={HandleDialog}
                                endIcon={<RefreshIcon/>} >
                                Resetear
                              </Button>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                              <Button 
                                fullWidth 
                                size='large' 
                                variant="contained"
                                onClick={HandleClearTotal}
                                endIcon={<CachedIcon/>} >
                                Limpiar
                              </Button>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.Instalador} >
                              {
                                formulario.Fotos &&
                                  <Carousel autoPlay>
                                      {formulario.Fotos.map((value,index)=>(
                                          <div key={`Imagen-${index}`}>
                                              <img alt={value.tipo} src={value.src} />
                                              <p className="legend">{value.tipo}</p>
                                          </div>))
                                      }
                                  </Carousel>
                              }
                            </Grid>
                          </React.Fragment>}
                          </React.Fragment>
                        }
                      </Grid>
                    </Grid>
                  }    
              </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

function SubirInstalacion(props) {
    const { width } = props;
    return (
      <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
        <Instalacion ancho={width} />
      </SnackbarProvider>
  );
};

SubirInstalacion.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  };

export default withWidth()(SubirInstalacion);