import React, { useState, useEffect} from 'react';
import { Button,
         Card,
         Checkbox,         
         Dialog,
         DialogActions,
         DialogContent,
         DialogTitle,
         FormControlLabel,
         Grid,
         Paper,
         TextField
        } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import {
    CloudUpload as CloudUploadIcon,
    DeleteSweep as DeletesIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import ImageUploader from 'react-images-upload';
import { SnackbarProvider, useSnackbar } from 'notistack';


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
    grid:{
        padding:10, 
        height:'100%',
    },
    card:{
        marginTop:20,
        height:'100%'
    }
  
}));


function ElementCron(props){
    const [ Folder, setFolder] = useState({Cliente:false, Cadena:false});
    const [ optionsCliente, setOptionsCliente ] = useState(false);
    //const [ optionsCadena, setOptionsCadena ] = useState(false);
    const [ selection, setSelection ] = useState(false);
    const [ selection2, setSelection2 ] = useState(false);
    const [ clientes, setClientes ] = useState([]);
    const [ cadenas, setCadenas ] = useState([]);
    const [ elementSelect, setElementSelect] = useState('');
    const [ pictures, setPictures ] = useState([]);
    const [ carpeta, setCarpeta ] = useState('');
    const [ pregunta, setPregunta ] = useState(false);
    const classes = useStyles(); 
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        async function HandleCliCla(){
          const fclientes = await fetch('/fetch_clientes'); 
          const fcadenas = await fetch('/fetch_soloCadenas');
          const jclientes = await fclientes.json();
          const jcadenas = await fcadenas.json();
            setCadenas(jcadenas); 
            setClientes(jclientes); 
        }
        
    
        HandleCliCla();
      },[]);
    

    const HandleSelectFolder = (e)=>{
        setFolder({[e.target.name]: e.target.checked});
        if(e.target.checked){            
            setSelection(true);
            if(e.target.name === 'Cliente'){
                setCarpeta('Cliente');
                setOptionsCliente(true);
                //setOptionsCadena(false);
                setSelection2(false);
                setElementSelect('');
            }else{
                setCarpeta('Cadena');
                //setOptionsCadena(true);
                setOptionsCliente(false);
                setSelection2(false);
                setElementSelect('');
            }
        }else{
            setSelection(false);
            setSelection2(false);
            setElementSelect('');
        }
    };

    const InputSelect = () =>{ 
            if(optionsCliente){
                return(
                    <Autocomplete
                        id='cliente'
                        options={clientes}
                        inputValue={elementSelect}
                        clearOnEscape
                        onChange={(e,value)=>{
                            if(value === null){
                                setSelection2(false);
                                setElementSelect(value);
                                setPictures([]);
                            }else{
                                fetch('/SearchLogo', {
                                    method: 'post',
                                    body: JSON.stringify({cliente:value.cliente , ruta:carpeta}),
                                    headers:{'Content-Type': 'application/json'}
                                })
                                    .then(res => res.json())
                                    .then(result =>{
                                        if(result.existe){
                                            setPregunta(true);
                                            setElementSelect(value.cliente);
                                        }else{
                                            setElementSelect(value.cliente);
                                            setSelection2(true);
                                        }
                                    });
                            }
                           
                        }}
                        getOptionLabel={option => option.cliente}           
                        renderInput={params => 
                        <TextField {...params} 
                            label=" Cliente" 
                            variant="outlined" 
                        />
                        }
                    />)
            }else{ 
                return( 
                    <Autocomplete
                        id='cadena'
                        options={cadenas}
                        inputValue={elementSelect}
                        clearOnEscape
                        onChange={(e,value)=>{
                            if(value === null){
                                setSelection2(false);
                                setElementSelect(value);
                                setPictures([]);
                            }else{
                                fetch('/SearchLogo', {
                                    method: 'post',
                                    body: JSON.stringify({cliente:value.cadena , ruta:carpeta}),
                                    headers:{'Content-Type': 'application/json'}
                                })
                                    .then(res => res.json())
                                    .then(result =>{
                                        if(result.existe){
                                            setPregunta(true);
                                            setElementSelect(value.cadena);
                                        }else{
                                            setElementSelect(value.cadena);
                                            setSelection2(true);
                                        }
                                    });
                            }
                           
                        }}
                        getOptionLabel={option => option.cadena}           
                        renderInput={params => 
                        <TextField {...params} 
                            label=" Cadena" 
                            variant="outlined" 
                        />
                        }
                    /> )
            }
    };

    const onDrop = picture  => {
        setPictures([picture]);
    };

    const HandleSave = () =>{
        let formD = new FormData();
        formD.append('Logo',pictures[0][0],`${elementSelect}.jpg`);
        formD.append('ruta', `${carpeta}`);
        fetch('/Cronograma_UpLogos',{method:'POST',body:formD})
        .then(response => response.json())
        .then(result => {     
            if(result.message){         
                enqueueSnackbar(result.message, {variant:'success', anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }});
                setPictures([]);
                setSelection(false);
                setSelection2(false);
                setFolder(false);
                setElementSelect('');
                setOptionsCliente(false);
                //setOptionsCadena(false);
            }else{
                enqueueSnackbar(result.status, {variant:'error', anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }});
            }
        });
    };

    const HandleDeleteLogo = () =>{
        fetch('/SearchLogo', {
            method: 'delete',
            body: JSON.stringify({cliente:elementSelect , ruta:carpeta}),
            headers:{'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(result =>{
                if(result.message){   
                    setPregunta(false);      
                    setSelection2(true);
                    enqueueSnackbar(result.message, {variant:'success', anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }});
                }else{
                    enqueueSnackbar(result.status, {variant:'error', anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }});
                    setPregunta(false);
                }
            })
    };

    return(
        <React.Fragment>
            <Dialog
                open={pregunta}
                onClose={()=>setPregunta(false)}
                aria-labelledby="AddService"
                aria-describedby="ServiceDescription"
                fullWidth
                maxWidth='sm'
                spacing={2}
                disableBackdropClick
                color='secondary'
            >
                <DialogTitle id="AddService"><DeletesIcon style={{ position:'relative', left:-2, top:5}}/>{"Eliminar?"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} justify='center'>
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10} >
                        { 'Logo ya existe en nuestra Base de Datos, desea Eliminarlo?'}
                    </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setPregunta(false)} color="secondary" variant='contained'>
                        Cancelar
                    </Button>
                    <Button onClick={HandleDeleteLogo} color="primary" variant='contained' autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container  alignItems="center" justify='center' >
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Card className={classes.card} raised >
                                    <Grid container spacing={3} className={classes.grid}  alignItems="center" justify='center'>
                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                            <FormControlLabel
                                                control={ 
                                                    <Checkbox
                                                        icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />}
                                                        checked={Folder.Cliente || false}
                                                        onChange={HandleSelectFolder}
                                                        name='Cliente'
                                                        color="primary"
                                                        
                                                    />
                                                }
                                                label='Cliente'
                                            />
                                        </Grid>
                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                            <FormControlLabel
                                                control={ 
                                                    <Checkbox
                                                        icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />}
                                                        checked={Folder.Cadena || false}
                                                        onChange={HandleSelectFolder}
                                                        name='Cadena'
                                                        
                                                        color="primary"
                                                    />
                                                }
                                                label='Cadena'
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            {
                                                selection &&
                                                <InputSelect />
                                            }
                                        </Grid>
                                        {
                                            selection2 &&
                                            <>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    
                                                        <ImageUploader
                                                            {...props}
                                                            withIcon={false}
                                                            onChange={onDrop}
                                                            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                            maxFileSize={5242880}
                                                            singleImage={true}
                                                            withLabel={false}
                                                            withPreview={true}
                                                            buttonText='Seleccionar'
                                                        />
                                                </Grid>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <Button variant="contained" color="primary" fullWidth startIcon={<CloudUploadIcon />} onClick={HandleSave}>
                                                            Upload
                                                        </Button>
                                                    
                                                </Grid>
                                            </>
                                        }
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default function ElementCrono() {
    return (
        <SnackbarProvider maxSnack={3}>
            <ElementCron />
        </SnackbarProvider>
    );
}
