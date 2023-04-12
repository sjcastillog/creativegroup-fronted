import React, {useState, useEffect} from 'react';
import {    
            Button,
            Card,
            CardContent,
            Grid,
            IconButton,
            MenuItem,
            Paper,
            TextField } from '@material-ui/core';
import {
            Add as AddIcon,
            DeleteOutline as DeleteOutlineIcon,
            Lock as LockIcon,
            Refresh as RefreshIcon,
            Save as SaveIcon,
            Search as SearchIcon,
        } from '@material-ui/icons';
import { red, lime, teal, lightBlue, blue } from '@material-ui/core/colors';
import ImageUploader from 'react-images-upload';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './Auth';
import Sticky from 'react-sticky-el';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';


const useStyles = makeStyles(theme => ({
    cardTrue:{
        marginTop:50
    },
    cardFalse:{
        marginTop:0
    },
    items:{
        marginTop:50
    }
}));

function Cronogramadd (props){
    const [formulario, setFormulario] = useState([]);
    const [Datos, setDatos] = useState({numpro:''});
    const [founded, setFounded] = useState(false);
    const [isNew, setNew] = useState(true);
    const [isError, setIsError] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [saveImage, setSaveImage] =  useState(false);
    const [arrayComplete, setArrayComplete] = useState(false);
    const { authTokens, setNumproCrono } = useAuth();
    const [isEdit, setEdit] = useState(false);
    const [ motivosGarantia, setMotivosGarantia ] = useState([]);
    
    const classes =  useStyles();

    useEffect(()=>{
        const HandleMGarantias = async ()=>{
            const motivosG = await fetch('/MotivoGarantias');
            let datam = await motivosG.json();
            let objeto = {};
            datam = datam.filter(element => objeto[element.tiptra] ? false : objeto[element.tiptra] = true);
            setMotivosGarantia(datam);
        };
        
        HandleMGarantias();
        if(authTokens.tipo !== "Administrador") setDatos({...Datos, ejecutiva:authTokens.nombre, coordinador:authTokens.coordinador, creacion:new Date()});
    },[] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
        if(saveImage){
            fetch('/Cronograma_Save',{
                method: 'POST',
                body: JSON.stringify(Datos),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                setNumproCrono(Datos.numpro);
                if(result.message === 'Editado'){
                    let arr = [];
                    let num = formulario.length - 1;
                    formulario.forEach((value,index)=>{
                        arr.push(value.src);
                        if (num === index){
                           setPictures(arr);
                           alert(result.message);
                           setSaveImage(false);
                        }
                    });
                }else{
                    alert(result.message);
                    setSaveImage(false);
                }
            })
        }
    },[saveImage]// eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(()=>{
        if(arrayComplete){
            if (pictures.length < 1){
                setDatos({...Datos, encabezados:formulario});
                setSaveImage(true);
                setArrayComplete(false);
            }else{
                let num = pictures.length - 1;
                pictures.forEach((value,index)=>{
                    if(value.length !== 1){
                        if(num === index){
                            setDatos({...Datos, encabezados:formulario});
                            setSaveImage(true);
                            setArrayComplete(false);
                        }
                    }else{
                        let formD = new FormData();
                        formD.append(value[0].name,pictures[index][0],formulario[index].src);
                        fetch('/Cronograma_UpImage',{method:'POST',body:formD})
                        .then(response => response.json())
                        .then(result => {             
                            if(num === index){
                                setDatos({...Datos, encabezados:formulario});
                                setSaveImage(true);
                                setArrayComplete(false);
                               
                            }
                        });
                    }
                    
                });
            }
            
        }
    },[arrayComplete]// eslint-disable-line react-hooks/exhaustive-deps
    );

    const HandleAddItem = ()=>{
        const num = formulario.length;
        setFormulario ([...formulario, {id:`tiptra${num}`, src:'', tiptra:''}]);
    };

    const HandleProcesar = ()=>{
        if(Datos.numpro === '' || Datos.numpro <= 0){
            setIsError(true);
        }else{
            fetch('Cronograma_Info',{
                method:'POST',
                body:JSON.stringify({numpro:Datos.numpro}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                if(result.numMatriz){
                    setDatos({...Datos, cliente:result.cliente, proyecto:result.proyecto});
                    let ArrayInfo = [];
                    const ResultTot = result.formulario.length - 1;
                    result.formulario.forEach( (value,index)=>{
                        ArrayInfo.push({id:`tiptra${index}`, tiptra:value.tiptra, src:''});
                        if(index === ResultTot){
                            setFormulario(ArrayInfo);
                            setFounded(true);
                            setNew(false);
                        }
                    });
                }else if(result.status){
                    alert(result.status);
                }else{
                    setNumproCrono(Datos.numpro);
                    setFormulario(result[0].encabezados);
                    setDatos({...Datos, cliente:result[0].cliente, proyecto:result[0].proyecto, creacion:result[0].creacion});
                    let arru = [];
                    let num = result[0].encabezados.length -1;
                    result[0].encabezados.forEach((value,index)=>{
                        arru.push(value.src);
                        if(num === index){
                            setPictures(arru);
                        }
                    });
                    setFounded(true);
                    setNew(false);
                    setEdit(true);
                }
            });
        }   
    };

    const HandleInfo = (e)=>{
        setDatos({...Datos, [e.target.id]: e.target.value});
        setIsError(false);
    };

    const HandleEditItem = (e, value, index)=>{
        let newArr = [...formulario]; // copying the old datas array
        newArr[index].tiptra = value; // replace e.target.value with whatever you want to change it to
        setFormulario(newArr);
    };

    const HandleDeleteItem = index => e => {
        let newArr = [...formulario];
        let newPic = [...pictures];
        //alert(newArr[index].src);
        if(newArr[index].src !==''){
            fetch('/Cronograma_DeleteImage',{
                method:'POST',
                body:JSON.stringify({name:newArr[index].src}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response => response.json())
            .then(result =>{
                newArr.splice(index,1);
                newPic.splice(index,1);
                setPictures(newPic);
                setFormulario(newArr);
                //console.log(result.message);
            })
        }else{
            newArr.splice(index,1);
            setFormulario(newArr);
        }
    };

    const HandleRefresh = ()=>{
        setFormulario([]);
        setNew(true);
        setFounded(false);
        setDatos({numpro:''});
        setPictures([])
    };

    const onDrop2 = index => e => {
        let newArr = [...pictures];
        let newForm = [...formulario];
        if (newArr[index] !== undefined){
            if(newArr[index].length > 0){
                fetch('/Cronograma_DeleteImage',{
                    method:'DELETE',
                    body: JSON.stringify({name:newArr[index]}),
                    headers:{'Content-Type': 'application/json'}
                })
                .then(response => response.json())
                .then(result =>{
                    newArr[index] = e; // replace e.target.value with whatever you want to change it to
                    newForm[index].src= '';
                    setFormulario(newForm);
                    setPictures(newArr);
                });
            }else{
                newArr[index] = e; // replace e.target.value with whatever you want to change it to
                newForm[index].src= '';
                setFormulario(newForm);
                setPictures(newArr);
            }
        }else{
            newArr[index] = e;
            newForm[index].src= '';
            setFormulario(newForm);
            setPictures(newArr);
        }
    };

    const onDrop = index => e => {
        let newArr = [...pictures];
        newArr[index] = e;
        setPictures(newArr);
    };

    const HandleSave = ()=>{
        let arr =  [...formulario];
        if(pictures.length < 1){
            setArrayComplete(true);
        }else{
            let num = pictures.length - 1;
            pictures.forEach((value,index)=>{
               if(value.length !== 1){
                console.log('No Edit');
                if(num === index){
                    setFormulario(arr);
                    setArrayComplete(true);
                }
               }else{
                    let ext = (value[0].name.split('.'))[1];
                    let name = uuidv4();
                    let namext = `/imagescrono/${name}.${ext}`;
                    arr[index].src = namext;
                    if(num === index){
                        setFormulario(arr);
                        setArrayComplete(true);
                    }
                }
            });
        }
        
    };

    const TiposTrabajo = formulario.map((value,index)=>
        <Grid item key={'item-'+index} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card style={{zIndex:10}}>
                <CardContent>
                    <Grid container direction='row' justify='space-around' alignItems="center">
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                            <ImageUploader
                                {...props}
                                withIcon={false}
                                onChange={onDrop(index)}
                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                maxFileSize={5242880}
                                singleImage={true}
                                withLabel={false}
                                withPreview={true}
                                buttonText='Seleccionar'
                            />
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} >
                            <IconButton onClick={HandleDeleteItem(index)} style={{color:red[900]}}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                            <Autocomplete
                                id={`tiptra${index}`}
                                options={motivosGarantia.map(value2=>value2.tiptra)}
                                value={value.tiptra || ''}  
                                freeSolo                            
                                renderInput={(params) => <TextField {...params} label="Tip. Trabajo" variant="outlined" fullWidth />}
                                onChange={(e,value, reason)=>{HandleEditItem(e, value, index)}}  
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );

    const TiposTrabajo2 = formulario.map((value,index)=>
        <Grid item key={`item${index}`} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card style={{zIndex:10}}>
                <CardContent>
                    <Grid container direction='row' justify='space-around' alignItems="center">
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} >
                            {value.src !==''?
                                <ImageUploader
                                    {...props}
                                    withIcon={false}
                                    defaultImages={[value.src]}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                    maxFileSize={5242880}
                                    onChange={onDrop2(index)}
                                    singleImage={true}
                                    withLabel={false}
                                    withPreview={true}
                                    buttonText='Seleccionar'
                                />
                            :
                                <ImageUploader
                                    {...props}
                                    withIcon={false}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    onChange={onDrop2(index)}
                                    withLabel={false}
                                    withPreview={true}
                                    buttonText='Seleccionar'
                                />
                            }       
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} >
                            <IconButton onClick={HandleDeleteItem(index)} style={{color:red[900]}}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                            <Autocomplete
                                id={`tiptra${index}`}
                                options={motivosGarantia.map(value2=>value2.tiptra)}
                                value={value.tiptra || ''}  
                                freeSolo                            
                                renderInput={(params) => <TextField {...params} label="Tip. Trabajo" variant="outlined" fullWidth />}
                                onChange={(e,value, reason)=>{HandleEditItem(e, value, index)}}  
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
        
    return(
            <Grid container spacing={2} alignItems="center" justify='center'>       
                <Grid item xl={8} lg={8} md={8} sm={8} xs={8} style={{zIndex:1}}>
                    <Sticky>
                        <Paper elevation={3} spacing={2} style={{padding:20}}  >
                            <Grid container direction='row' justify='space-around' spacing={2}  alignItems="center" >
                                <Grid item xl={9} lg={9} md={9} sm={9} xs={9} className={founded ? classes.cardTrue : classes.cardFalse}>
                                    <TextField
                                        id='numpro'
                                        fullWidth
                                        required
                                        label='Num. Pro.'
                                        variant='outlined'
                                        InputProps={{startAdornment: <LockIcon/> }}
                                        type="Number"
                                        value={Datos.numpro || ''}
                                        onChange={HandleInfo}
                                        autoFocus
                                        error={isError}
                                        onKeyPress={(e)=>{
                                            const code = e.keyCode || e.which;
                                            if(code === 13)
                                                HandleProcesar();
                                        }}
                                    />
                                </Grid>
                                {isNew ? 
                                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                        <IconButton onClick={HandleProcesar} style={{color:lightBlue[500]}}>
                                            <SearchIcon/>
                                        </IconButton>
                                    </Grid>
                                    :console.log('')
                                }       
                                {founded ? 
                                    <React.Fragment>
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} className={classes.items}>
                                            <IconButton onClick={HandleRefresh} style={{color:lightBlue[500]}}>
                                                <RefreshIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} className={classes.items}>
                                            <IconButton onClick={HandleAddItem} style={{color:teal[700]}}>
                                                <AddIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} className={classes.items}>
                                            <IconButton onClick={HandleSave} style={{color:blue[700]}}>
                                                <SaveIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <TextField
                                                id='cliente'
                                                fullWidth
                                                disabled
                                                label='Cliente'
                                                variant='outlined'
                                                InputProps={{startAdornment: <LockIcon/> }}
                                                value={Datos.cliente || ''}
                                                onChange={HandleInfo}
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <TextField
                                                id='proyecto'
                                                fullWidth
                                                label='Proyecto'
                                                variant='outlined'
                                                InputProps={{startAdornment: <LockIcon/> }}
                                                value={Datos.proyecto || ''}
                                                onChange={HandleInfo}
                                            />
                                        </Grid>
                                    </React.Fragment>
                                    : console.log('')
                                }
                                
                            </Grid>
                        </Paper>
                    </Sticky>
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Paper elevation={3} spacing={2} style={{padding:20}}>
                        <Grid container justify='space-around' spacing={2}  alignItems="center">
                            {isEdit ? TiposTrabajo2 : TiposTrabajo}
                            {founded ? 
                                <Link to='/cronogramatable' style={{ textDecoration: 'none', width:'100%' }}>
                                    <Button variant="contained" color="primary" fullWidth style={{margin:10,backgroundColor:lime[700]}}>Continuar</Button>
                                </Link>
                                : console.log('')
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            
        
    );
}

export default Cronogramadd; 