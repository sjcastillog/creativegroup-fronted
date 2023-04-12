import React, { useState } from 'react';

import { 
    Button,
    Card,
    CardMedia,
    Grid,   
    IconButton,
    Paper,
    Tooltip
} from '@material-ui/core'; 
import {  
    Backup as BackupIcon,
    Cached as CachedIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    PhotoCamera as PhotoCameraIcon,
} from '@material-ui/icons';
import Webcam from "react-webcam";
import 'react-html5-camera-photo/build/css/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import FacebookCircularProgress from '../../Elementos/FacebookCircularProgress';
import { Switch as SwitchAntd } from 'antd';
import ImageUploader from 'react-images-upload';

const videoConstraints = {
    width: 1280,
    height: 720,
    //screenshotWidth:1280,
    facingMode: "environment"
  };

const API_URL = '/api/Entregas/Fotos/CheckOne';

// ESTAS IMAGENES SE SUBEN A LA INS
export const CardPhoto = (props) => {
    const { data, isFotos, handleRemovePhoto, idCard } = props;
    const [ urlImg, setUrlImg ] = useState(undefined);
    const [ webRef, setWebref ] = useState();
    const [ isTake, setTake ] = useState(false);
    const [ isChangeImage, setChangeImage ] = useState(false);
    const [ isUploadImage, setUploadImage ] = useState(false);
    const [ getRutaImg, setRutaImg ] = useState('');
    const [ isUpload, setUpload ] = useState(false);
    const [ getPictures, setPictures ] = useState([]);
 
    const { enqueueSnackbar } = useSnackbar();


    const handleTakePicture = ()=>{
        setUrlImg(webRef.getScreenshot());
        setTake(true);
    };

    const handleResetTake = ()=>{
        setUrlImg(undefined);
        setTake(false);
    };

    const handleUpload = async ()=>{
        setChangeImage(true);
        const idEl =  `${data.numpro}_${isFotos ? 'later' : 'back'}${Date.now()}_${uuidv4()}`;
        const namePicture = `${idEl}.jpg`;
        const fd = new FormData();
        const srcImg  = `/fotosIns/${namePicture}`;
        const reque = await fetch(urlImg);
        const blob = await reque.blob();           
        const file = new File([blob], namePicture);
            fd.append('image', file);
        fetch(API_URL, {method: 'POST', body: fd})
        .then(res => res.json()) 
        .then(res => {
            if(res.message){
                setRutaImg(srcImg);
                setChangeImage(false);
                setUploadImage(true);
                const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                if(existingTokens){
                    const arrBack = [...existingTokens];
                    arrBack.push({ src:srcImg });
                    localStorage.setItem("dataInstalacionCG", JSON.stringify(arrBack));
                }else{
                    const arrNew = [
                        { src:srcImg }
                    ]
                    localStorage.setItem("dataInstalacionCG", JSON.stringify(arrNew));
                }
            }else{
                enqueueSnackbar(res.status,{variant:'error'});
            }                                    
        });  
    } 

    const handleDeleteImage = ()=>{
        setChangeImage(true);
        setUploadImage(false);
        fetch(API_URL,{
            method: 'DELETE',
            body: JSON.stringify({src:getRutaImg}),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(res => res.json()) 
        .then(res => {
            if(res.message){
                setUrlImg(undefined);
                setTake(false);
                setChangeImage(false);
                const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                if(existingTokens){
                    const arrBack = [...existingTokens];
                    const arrNew = arrBack.filter(el=> el.src !== getRutaImg);
                    if(arrNew.length === 0){
                        localStorage.removeItem("dataInstalacionCG");
                        setRutaImg('');
                    }else{
                        localStorage.setItem("dataInstalacionCG", JSON.stringify(arrNew));
                         setRutaImg('');
                    }
                    
                }
            }else{
                enqueueSnackbar(res.status,{variant:'error'});
            }                                    
        }); 
        
    };

    const onDrop = index => e => {    
        if(e.length === 0){
            setPictures([]);
        }else{
            let newArr = [...getPictures];
            newArr[index] = e;
            setPictures(newArr);
        }
    };

    const handleUploadPicture = async ()=>{
        if(getPictures.length === 0){
            enqueueSnackbar('SELECCIONE UNA IMAGEN',{variant:'error'});
        }else{
            setChangeImage(true);
            const extImg = getPictures[0][0]?.name.split('.').pop();
            const idEl =  `${data.numpro}_${isFotos ? 'later' : 'back'}${Date.now()}_${uuidv4()}`;
            const namePicture = `${idEl}.${extImg}`;
            const fd = new FormData();
            const srcImg  = `/fotosIns/${namePicture}`;
            fd.append('image', getPictures[0][0], namePicture);
            fetch(API_URL, {method: 'POST', body: fd})
            .then(res => res.json()) 
            .then(res => {
                if(res.message){
                    setRutaImg(srcImg);
                    setChangeImage(false);
                    setUploadImage(true);
                    const existingTokens = JSON.parse(localStorage.getItem("dataInstalacionCG"));
                    if(existingTokens){
                        const arrBack = [...existingTokens];
                        arrBack.push({ src:srcImg });
                        localStorage.setItem("dataInstalacionCG", JSON.stringify(arrBack));
                    }else{
                        const arrNew = [
                            { src:srcImg }
                        ]
                        localStorage.setItem("dataInstalacionCG", JSON.stringify(arrNew));
                    }
                }else{
                    enqueueSnackbar(res.status,{variant:'error'});
                }                                    
            });  
        }
        
    }

  return (
    <Grid item xs={12} md={4} lg={3} >
        <Paper 
            elevation={1}
            square
            style={{padding:10, width:'100%', minHeight:260, maxHeight:260}}>
                <Grid 
                    container
                    style={{width:'100%'}}>
                    <Grid item xs={12} style={{padding:5}} >
                        <Grid container justify='space-between' spacing={1}>
                            <Grid item xs={4} style={{display:'grid', placeContent:'center'}}>
                                {
                                    isUpload ?
                                    <>
                                        {
                                            isChangeImage ? <FacebookCircularProgress size={29}/>:
                                            <Button 
                                                variant='contained' 
                                                color='primary' 
                                                disabled={isUploadImage}
                                                fullWidth 
                                                onClick={handleUploadPicture} 
                                                startIcon={<BackupIcon/>}>
                                                    Subir
                                            </Button>
                                        }
                                    </>:
                                    <Button 
                                        variant='contained' 
                                        color='primary' 
                                        disabled={isTake}
                                        fullWidth 
                                        onClick={handleTakePicture} 
                                        startIcon={<PhotoCameraIcon/>}>
                                            Tomar
                                    </Button>

                                }
                            </Grid>
                            <Grid item xs={4} style={{display:'grid', placeContent:'center'}}>
                                <SwitchAntd 
                                    checkedChildren="SUBIR" 
                                    unCheckedChildren="TOMAR" 
                                    value={ isUpload || false }
                                    disabled={isUploadImage}
                                    onChange={ (checked)=>{ setUpload( checked ) } }/>
                            </Grid>
                            <Grid item>
                                <IconButton 
                                    size='small'
                                    onClick={()=>{ handleRemovePhoto(idCard)}}
                                    style={{color:'red'}}>
                                        <DeleteIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    { 
                        isTake ?
                            <React.Fragment>
                                <Grid item xs={12} style={{padding:5}} >
                                    <Card /* onClick={()=>{setArrImagePhoto([urlImg.src1])}}*/>
                                        <CardMedia
                                            style={{height: 0, paddingTop: '56.25%'}}
                                            component='div'
                                            image={ urlImg }
                                            title="FRONTAL"
                                        />
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid 
                                        container
                                        justify='center'
                                        alignItems='center'
                                        spacing={1}>
                                            <Grid item>
                                                <IconButton 
                                                    size='small'
                                                    onClick={handleResetTake}
                                                    style={{background:'#CAD226', color:'#fff', padding:5}}>
                                                        <CachedIcon/>
                                                </IconButton>
                                            </Grid>
                                            {   isChangeImage ?
                                                    <FacebookCircularProgress size={20}/> :
                                                <React.Fragment>
                                                { isUploadImage ?
                                                    <Grid item>
                                                        <Tooltip placement='top' arrow title='DESHACER'>
                                                            <span>
                                                                <IconButton 
                                                                    onClick={handleDeleteImage}
                                                                    size='small' 
                                                                    style={{background:'red', color:'#fff'}}>
                                                                    <CloseIcon/>
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    </Grid>:
                                                    <Grid item>
                                                        <Tooltip placement='top' arrow title='SUBIR IMAGEN'>
                                                            <span>
                                                                <IconButton 
                                                                    onClick={handleUpload}
                                                                    size='small' 
                                                                    style={{background:'#0E3B5F', color:'#fff'}}>
                                                                    <BackupIcon/>
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    </Grid>
                                                }
                                                </React.Fragment>
                                            }
                                    </Grid>
                                </Grid>
                            </React.Fragment>  :
                            <Grid item xs={12} style={{padding:10}} >
                                {
                                    isUpload ?
                                    <ImageUploader
                                        {...props}
                                        withIcon={false}
                                        onChange={onDrop(0)}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                        maxFileSize={15242880}
                                        singleImage={true}
                                        withLabel={false}
                                        withPreview={true}
                                        buttonText='SELECCIONAR'
                                        fileContainerStyle={{padding:0, margin:0}}
                                    />:
                                    <Webcam 
                                        videoConstraints={videoConstraints || ''}
                                        screenshotFormat="image/jpeg"
                                        screenshotQuality={1}
                                        //screenshotWidth={1024}
                                        audio={false}
                                        width='100%'
                                        ref={setWebref}
                                    />
                                }
                                
                            </Grid>
                    }
                </Grid>
        </Paper>
    </Grid>
    
  )
}
