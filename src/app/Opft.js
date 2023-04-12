import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import ImageUploading from "react-images-uploading";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { red, teal, grey, blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Menu, MenuItem, ListItemIcon, ListItemText, Toolbar, Tooltip, Fab } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Switch} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { v4 as uuidv4 } from 'uuid';
import Grow from '@material-ui/core/Grow';
import { SnackbarProvider, useSnackbar } from 'notistack';

/*************************************ICONOS****************************************/
import { Delete as DeleteIcon,
         Add as AddIcon,
         Save as SaveIcon,
         Ballot as BallotIcon,
         MoreVert as MoreVertIcon,
         Search as SearchIcon,
         Storage as StorageIcon,
         ArrowForwardIos as ArrowForwardIosIcon,                  
         AddPhotoAlternate as AddPhotoAlternateIcon,
         DeleteSweep as DeleteSweepIcon } from '@material-ui/icons';
import { useAuth } from "./Auth";

/***********************************************************************************/
const useStyles = makeStyles(theme => ({
    bad:{
        color:'#0E3B5F',
        '&:hover': {
            color:'#16609c',
            cursor:'pointer',
        },
    },
    IconButtons:{
        color:'#0E3B5F',
        '&:hover':{
            color:'#16609c',
        }
    },
    buttons:{
        backgroundColor:'#0E3B5F',
        color:'#fff',
        '&:hover':{
        backgroundColor:'#16609c',
        }
    },
}));

const CreativeSwitch2 = withStyles({
    switchBase: {
      color: '#16609c',
      '&$checked': {
        color: '#0E3B5F',
      },
      '&$checked + $track': {
        backgroundColor: '#0E3B5F',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const CreativeSwitch = withStyles({
    switchBase: {
      color: '#acb334',
      '&$checked': {
        color: '#CAD226',
      },
      '&$checked + $track': {
        backgroundColor: '#CAD226',
      },
    },
    checked: {},
    track: {},
  })(Switch);

function Opf(){
    const classes = useStyles();
    const [pictures, setPictures] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [switcha, setSwitcha] = useState(true);
    const [numft, setNumft] = useState(0);
    const [fichas, setFichas] = useState([]);
    const [formulario, setFormulario] = useState({
        alto:"", 
        ancho:"", 
        fondo:"", 
        planograma:'', 
        fichaTecnica:'',
        url:[],
        medidasSwitch:true,
        pgSwitch:true,
        ftSwitch:true
    });
    const [numproState, setNumproState] = useState("");
    const [toggleState, setToggleState] = useState({});
    const [montarImg, setMontarImg] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [imj, setImj] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const { setHeaderWord } = useAuth();
    
    
    useEffect(()=>{
        handleImagesView();
        setHeaderWord('O.P./Ficha Técnica');
    },[]// eslint-disable-line react-hooks/exhaustive-deps
    ); 

    useEffect(()=>{
        if(montarImg){
            setImj(
                <ImageUploading onChange={onDrop} defaultValue={pictures} maxNumber={3} multiple  maxFileSize={5}>
                    {({ imageList, onImageUpload, onImageRemoveAll }) => (
                        <Paper elevation={2} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Grid container spacing={2} style={{padding:8}}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container justify='center' alignContent='center' spacing={2}>
                                        <Grid item>
                                            <Tooltip arrow title='Seleccionar' placement='top'>
                                                <Fab className={classes.buttons} size='small' aria-label="Agregar" onClick={onImageUpload}>
                                                    <AddPhotoAlternateIcon  />
                                                </Fab>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip arrow title='Vaciar' placement='top'>
                                                <Fab className={classes.buttons} size='small' aria-label="Eliminar" onClick={onImageRemoveAll}>
                                                    <DeleteSweepIcon onClick={handleRemovell} />
                                                </Fab>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justify='center' alignContent='center'>
                                {imageList.map((image,index) => (               
                                    <Grow in={true} key={`Imagen${index}`} timeout={2000} >
                                        <Grid item elevation={3}>
                                            <Card raised={true}>
                                                <CardMedia 
                                                    style={{width:350, height:350}}
                                                    component="img"
                                                    image={image.dataURL ? image.dataURL : image.name}
                                                    title={index}
                                                />
                                                {/*<CardActions style={{height:40}}>
                                                    <Grid container spacing={2} justify='center' alignContent='center'>
                                                        <Grid item>
                                                            <IconButton aria-label="Actualizar" onClick={image.onUpdate}>
                                                                <FlipCameraIosIcon style={{color:blue[900]}}/>
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item >
                                                            <IconButton aria-label="Eliminar" onClick={image.onRemove}>
                                                                <DeleteIcon  style={{color:red[700]}}/>
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </CardActions>*/}
                                            </Card>
                                        </Grid>
                                    </Grow>
                                ))}
                            </Grid>
                        </Paper>
                    )}
                </ImageUploading>
            );
            setMontarImg(false);
        }

    },[montarImg]// eslint-disable-line react-hooks/exhaustive-deps
    )

    useEffect(()=>{
        if(isUpload){
            handleSave();
        }
    },[isUpload]// eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleSave = () =>{
        if (formulario._id){
            const url = '/fetch_fichatecnica';
            fetch(url,{
                method:'PUT',
                body: JSON.stringify({formulario,numpro:numproState}),
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result =>{ 
                if(result.message){
                    enqueueSnackbar('Ficha Tecnica Guardada',{variant:'success'});
                    setPictures([]);
                    setImj();
                    setIsUpload(false);
                    if (switcha){
                        setFormulario({
                            alto:"",
                            ancho:"",
                            fondo:"",
                            fichaTecnica:'',
                            planograma:'',
                            url:[],
                            medidasSwitch:true,
                            pgSwitch:true,
                            ftSwitch:true
                        });
                        handleGet();
                        handleCont();
                        setMontarImg(true);
                    }else{
                        setNumproState("");
                        setFormulario({
                            alto:"",
                            ancho:"",
                            fondo:"",
                            fichaTecnica:'',
                            planograma:'',
                            url:[],
                            medidasSwitch:true,
                            pgSwitch:true,
                            ftSwitch:true
                        });
                        setNumft("");
                        setMontarImg(true);
                    }
                }else{
                    setIsUpload(false);
                    enqueueSnackbar(result.status,{variant:'error'});
                }
            });
        }else{
            fetch('/fetch_fichatecnica',{
                method:'POST',
                body: JSON.stringify({numpro:numproState,formulario}),
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result =>{ 
                if(result.message){
                    enqueueSnackbar('Ficha Tecnica Guardada',{variant:'success'});
                    setPictures([]);
                    setImj();
                    setIsUpload(false);
                    if (switcha){
                        setFormulario({
                            alto:"",
                            ancho:"",
                            fondo:"",
                            fichaTecnica:'',
                            planograma:'',
                            url:[],
                            medidasSwitch:true,
                            pgSwitch:true,
                            ftSwitch:true
                        });
                        handleGet();
                        handleCont();
                        setMontarImg(true);
                        
                    }else{
                        setNumproState(0);
                        setFormulario({
                            alto:"",
                            ancho:"",
                            fondo:"",
                            fichaTecnica:'',
                            planograma:'',
                            url:[],
                            medidasSwitch:true,
                            pgSwitch:true,
                            ftSwitch:true
                        });
                        setNumft("");
                        setMontarImg(true);
                    }
                }else{
                    setIsUpload(false);
                    enqueueSnackbar(result.status,{variant:'error'});
                }
            });
        }
    };

    const handleImgform = () =>{
        setAnchorEl(null);  
        try{
            let formD = new FormData();
            let arr = pictures[0].map((value,index)=>{
                let ext = (value.name.split('.'))[1];
                let name = uuidv4();
                let namext = `/imagesop/${name}.${ext}`;
                formD.append('images',value,namext);
                return namext;
            });
            Promise.all(arr)
            .then(response => {
                let obj = [];
                arr.forEach((value)=>{
                    obj.push({name:value});
                })
                setFormulario({...formulario,  url:obj})
            })
            fetch('/fetch_upImgOp',{method:'POST',body:formD})
            .then(response => response.json())
            .then(result => {
                if(result.message){
                    enqueueSnackbar('Imagen(s) Subida(s)',{variant:'success'});
                    setIsUpload(true);
                }else{
                    enqueueSnackbar(result.status,{variant:'error'});
                }
            });
        }catch(err){
            setIsUpload(true);
        }
    };

    const handleSwitcha = () => {
        setSwitcha(!switcha);
    };

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick2 = event => {
        setAnchorEl2(event.currentTarget);
    };
    
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const onDrop = (picture) =>{
        let jj = picture.map((value)=>{
            return value.file
        });
        setPictures([jj]);
    };
    
    const handleCont = () =>{
        const url = '/fetch_opOne';
        fetch(url,{
            method:'POST',
            body: JSON.stringify({numpro:numproState}),
            headers:{'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(result => setNumft(result.fichastecnicas.length + 1));
    };

    const handleGet = () =>{
        const url = '/fetch_opOne';
        fetch(url,{
            method:'POST',
            body: JSON.stringify({numpro:numproState}),
            headers:{
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            setFichas(result.fichastecnicas);
            handleCont();
        });
        
    };

    const handleFormulario = e =>{
        if (e.target.id === 'medidasSwitch' || e.target.id === 'ftSwitch' || e.target.id === 'pgSwitch'){
            setFormulario({...formulario, [e.target.id]:e.target.checked})
        }else{
            setFormulario({...formulario, [e.target.id] : e.target.value});
        }
        
    }; 

    const handleToggle = (event, newToggleState)=>{
        if (newToggleState !== null) {
            setImj();
            setToggleState(newToggleState);
            setFormulario(newToggleState);
            setPictures(newToggleState.url);
            setAnchorEl2(null);
            setNumft("");
            setMontarImg(true);
        }
    };

    const handleRemovell = () =>{
        setImj();
        fetch('/fetch_deleteImgOp',{
            method:'DELETE',
            body: JSON.stringify(formulario.url),
            headers:{'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(result => {
            if (result.message){
                enqueueSnackbar('Imagen(s) Eliminada(s)',{variant:'success'});
                fetch('/fetch_fichatecnicasaveimage',{
                    method:'PUT',
                    body: JSON.stringify({numpro:numproState, id:formulario._id}),
                    headers:{
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(result =>{ 
                    if(result.message){
                        enqueueSnackbar('Ficha Tecnica Actualizada',{variant:'success'});
                        setFormulario({...formulario, url:[]});
                        setToggleState({...toggleState, url:[]});
                        setPictures([]);
                        setMontarImg(true);
                    }else{
                        enqueueSnackbar(result.status,{variant:'error'});
                    }
                    
                });
            }else{
                enqueueSnackbar(result.status,{variant:'error'});
            }
            
            
        });
        
            
    }

    const handleImagesView = ()=>{
        setImj(
            <ImageUploading onChange={onDrop} defaultValue={pictures} maxNumber={3} multiple  maxFileSize={5}>
                {({ imageList, onImageUpload, onImageRemoveAll }) => (
                    <Paper elevation={2} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={2} style={{padding:8}}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Grid container justify='center' alignContent='center' spacing={2}>
                                    <Grid item>
                                        <Tooltip arrow title='Seleccionar' placement='top'>
                                            <Fab className={classes.buttons} size='small' aria-label="Agregar" onClick={onImageUpload}>
                                                <AddPhotoAlternateIcon />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip arrow title='Vaciar' placement='top'>
                                            <Fab className={classes.buttons} size='small' aria-label="Eliminar" onClick={onImageRemoveAll}>
                                                <DeleteSweepIcon onClick={handleRemovell} />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justify='center' alignContent='center'>
                            {imageList.map((image,index) => (               
                                <Grow in={true} key={`Imagen${index}`} timeout={2000} >
                                    <Grid item elevation={3}>
                                        <Card raised={true}>
                                            <CardMedia 
                                                style={{width:350, height:350}}
                                                component="img"
                                                image={image.dataURL ? image.dataURL : image.name}
                                                title={index}
                                            />
                                            {/*<CardActions style={{height:40}}>
                                                <Grid container spacing={2} justify='center' alignContent='center'>
                                                    <Grid item>
                                                        <IconButton aria-label="Actualizar" onClick={image.onUpdate}>
                                                            <FlipCameraIosIcon style={{color:blue[900]}}/>
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item >
                                                        <IconButton aria-label="Eliminar" onClick={image.onRemove}>
                                                            <DeleteIcon  style={{color:red[700]}}/>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>*/}
                                        </Card>
                                    </Grid>
                                </Grow>
                            ))}
                        </Grid>
                    </Paper>
                )}
            </ImageUploading>
        );
    };

    const handleNew = () =>{
        setAnchorEl(null);
        setPictures([]);
        setImj();
        setToggleState([]);
        setFormulario({
            alto:"",
            ancho:"",
            fondo:"",
            fichaTecnica:'',
            planograma:'',
            url:[],
            medidasSwitch:true,
            pgSwitch:true,
            ftSwitch:true
        });
        if (switcha){
            handleCont();
            setMontarImg(true);
        }else{
            setNumproState("");
            setNumft("");
            setFichas([]);
           setMontarImg(true);
        }
    };

    const handleDelete = () =>{
        setToggleState([]);
        const url = '/fetch_fichatecnica';
        fetch(url,{
            method: 'DELETE',
            body: JSON.stringify({formulario, numpro:numproState}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result =>{
                alert('Eliminado');
                        setAnchorEl(null);
                        setPictures([]);
                        setImj();  
                        setFormulario({
                            alto:"",
                            ancho:"",
                            fondo:"",
                            fichaTecnica:'',
                            planograma:'',
                            url:[],
                            medidasSwitch:true,
                            pgSwitch:true,
                            ftSwitch:true
                        });
                        handleGet();  
                        fetch('/fetch_deleteImgOp',{
                            method:'DELETE',
                            body: JSON.stringify(formulario.url),
                            headers:{'Content-Type': 'application/json'}
                        });
                        setMontarImg(true);          
        });
    };
   
    const fit = fichas.map((value,index)=>
        <ToggleButton
            value={value}  
            key={index}    
        >
            <ArrowForwardIosIcon fontSize="small" />
            {index + 1}
        </ToggleButton>
    );


    return(
        <Grid container spacing={1}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Paper elevation={3} style={{padding:3}} >
                    <Grid container spacing={1}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Toolbar style={{display:'flex', justifyContent:'space-between',padding:0,backgroundColor:grey[50]}}>
                                <TextField
                                    fullWidth={false}
                                    label="NumPro"
                                    type='Number'
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        endAdornment:
                                        <CreativeSwitch2
                                            checked={switcha}
                                            onChange={handleSwitcha}
                                            size='small'
                                            name="checkedB"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />,
                                    }}
                                    value={numproState}
                                    onChange={(e)=>setNumproState(e.target.value)}
                                    onKeyPress={(e)=>{
                                        const code = e.keyCode || e.which;
                                        if(code === 13)
                                        handleGet();
                                    }}
                                />
                                <IconButton className={classes.IconButtons} onClick={handleGet}>
                                    <SearchIcon/>
                                </IconButton>
                                <Tooltip title='Status' placement='top' arrow>
                                    <Badge 
                                        badgeContent={numft} 
                                        color="primary"
                                        className={classes.bad}
                                        onClick={handleCont}
                                    >
                                        <BallotIcon />
                                    </Badge>
                                </Tooltip>
                                <Tooltip title="Fichas" placement="top" arrow>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick2}
                                        className={classes.IconButtons}
                                    >
                                        <StorageIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu anchorEl={anchorEl2} keepMounted open={Boolean(anchorEl2)} onClose={handleClose2}>
                                    <ToggleButtonGroup
                                        value={toggleState}
                                        exclusive
                                        onChange={handleToggle}
                                        aria-label="text alignment"
                                    >
                                        {fit}
                                    </ToggleButtonGroup>
                                </Menu>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    className={classes.IconButtons}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem onClick={handleNew}>
                                        <ListItemIcon>
                                            <AddIcon fontSize="small"  style={{color:teal[600]}} />
                                        </ListItemIcon>
                                        <ListItemText primary="Nuevo" />
                                    </MenuItem>
                                    <MenuItem onClick={handleImgform}>
                                        <ListItemIcon>
                                            <SaveIcon fontSize="small"  style={{color:blue[600]}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Guardar" />
                                    </MenuItem>
                                    <MenuItem onClick={handleDelete}>
                                        <ListItemIcon>
                                            <DeleteIcon fontSize="small" style={{color:red[600]}} />
                                        </ListItemIcon>
                                        <ListItemText primary="Eliminar" />
                                    </MenuItem>
                                </Menu>
                            </Toolbar>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card>
                                <CardHeader 
                                    title='Medidas'
                                    action={
                                        <CreativeSwitch
                                            checked={formulario.medidasSwitch}
                                            onChange={handleFormulario}
                                            name="Switch-Medidas"
                                            id='medidasSwitch'
                                        />
                                        }
                                    style={{backgroundColor: '#0E3B5F',height:50,color:'#fff'}}
                                />
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                            <TextField
                                                id='alto'
                                                fullWidth={true}
                                                label="Alto"
                                                size='small'
                                                type='Number'
                                                variant="outlined"
                                                disabled={!formulario.medidasSwitch}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">Mts</InputAdornment>,
                                                }}
                                                value={formulario.alto || ""}
                                                onChange={handleFormulario}
                                            />
                                        </Grid>
                                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                            <TextField
                                                id='ancho'
                                                fullWidth={true}
                                                label="Ancho"
                                                type='Number'
                                                size='small'
                                                disabled={!formulario.medidasSwitch}
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">Mts</InputAdornment>,
                                                }}
                                                value={formulario.ancho || ""}
                                                onChange={handleFormulario}
                                            />
                                        </Grid>
                                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                            <TextField
                                                id='fondo'
                                                fullWidth={true}
                                                label="Fondo"
                                                type='Number'
                                                size='small'
                                                disabled={!formulario.medidasSwitch}
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">Mts</InputAdornment>,
                                                }}
                                                value={formulario.fondo || ""}
                                                onChange={handleFormulario}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card >
                                <CardHeader 
                                    title='Ficha Técnica'
                                    action={
                                        <CreativeSwitch
                                            checked={formulario.ftSwitch}
                                            onChange={handleFormulario}
                                            name="Switch-FichaTecnica"
                                            id='ftSwitch'
                                        />
                                        }
                                    style={{backgroundColor: '#0E3B5F',height:50,color:'#fff'}}
                                />
                                <CardContent>
                                <TextField
                                    id="fichaTecnica"
                                    fullWidth={true}
                                    label="Ficha Tecnica"
                                    disabled={!formulario.ftSwitch}
                                    multiline
                                    variant="outlined"
                                    value={formulario.fichaTecnica || ''}
                                    onChange={handleFormulario}
                                />
                                </CardContent>
                            </Card >
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card>
                                <CardHeader 
                                    title='Formulario'
                                    action={
                                        <CreativeSwitch
                                            checked={formulario.pgSwitch}
                                            onChange={handleFormulario}
                                            name="Switch-Planograma"
                                            id='pgSwitch'
                                        />
                                        }
                                    style={{backgroundColor:'#0E3B5F',height:50,color:'#fff'}}
                                />
                                <CardContent>
                                <TextField
                                    id="planograma"
                                    fullWidth={true}
                                    label="PlanoGrama"
                                    multiline
                                    disabled={!formulario.pgSwitch}
                                    variant="outlined"
                                    value={formulario.planograma || ''}
                                    onChange={handleFormulario}
                                />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                <Paper elevation={3} style={{marginTop:8}}>
                    {imj}
                </Paper>
            </Grid>
        </Grid>
    );

};

function Opft(){
    return( 
        <SnackbarProvider maxSnack={6} hideIconVariant={false} dense >
            <Opf />
        </SnackbarProvider>
    );
};



export default Opft;