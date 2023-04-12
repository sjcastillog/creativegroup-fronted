import React, { useState, useEffect } from 'react';
import { 
    Card,
    CardMedia,
    Grid,
    IconButton,
    Paper,
    Tooltip,
} from '@material-ui/core';
import { 
    Backup as BackupIcon,
    Close as CloseIcon,
    // Cached as CachedIcon,
    // Check as CheckIcon,
    // Lock as LockIcon,
    // PictureAsPdf as PictureAsPdfIcon,
    // RateReview as RateReviewIcon,
    // Save as SaveIcon,
    // Search as SearchIcon, 
    // Wallpaper as WallpaperIcon
   } from '@material-ui/icons';
import { 
    Switch as SwitchAntd
} from 'antd';
import ImageUploader from 'react-images-upload';
import FacebookCircularProgress from '../../Elementos/FacebookCircularProgress';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

const API_URL = '/api/Reportes/Plantillas/CheckOne';

export const Plantillas = (props) => {
    const { tipo, src, numpro } = props;
    const [ isActive, setActive ] = useState(false);
    const [ getPictures, setPictures ] = useState([]);
    const [ getRutaImg, setRutaImg ] = useState('');
    const [ isChangeImage, setChangeImage ] = useState(false);
    const [ isUploadImage, setUploadImage ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        if(src !== ''){
            setRutaImg(src);
            setUploadImage(true);  
            setActive(true)
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDeleteImage = ()=>{
        setChangeImage(true);
        fetch(API_URL,{
            method: 'DELETE',
            body: JSON.stringify({src:getRutaImg, tipo, numpro}),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(res => res.json()) 
        .then(res => {
            if(res.message){
                setChangeImage(false);
                setUploadImage(false);
                setPictures([]);
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
            const idEl =  `${numpro}_${tipo}_${Date.now()}_${uuidv4()}`;
            const namePicture = `${idEl}.${extImg}`;
            const fd = new FormData();
            const srcImg  = `/reportesIns/${namePicture}`;
            fd.append('image', getPictures[0][0], namePicture);
            fetch(API_URL, {method: 'POST', body: fd})
            .then(res => res.json()) 
            .then(res => {
                if(res.message){
                    setChangeImage(false);
                    setRutaImg(srcImg);
                    setUploadImage(true);
                }else{
                    enqueueSnackbar(res.status,{variant:'error'});
                }                                    
            });  
        }
        
    };

    const handleChecked = (checked)=>{
        setActive( checked );
        if(isActive) handleDeleteImage();
    }

  return (
    <Paper 
        square 
        elevation={1}
        style={{minHeight:130, padding:10}}>
            <Grid 
                container
                justify='space-between'
                alignItems='center'
                spacing={1}>
                    <Grid item style={{display:'grid', placeContent:'center', minHeight:120,}}> 
                        <SwitchAntd 
                            checkedChildren={tipo} 
                            unCheckedChildren={tipo}
                            checked={ isActive  || false }
                            onChange={ handleChecked }/>
                    </Grid> 
                    {
                        isActive &&
                        <>
                            {
                                isUploadImage ? 
                                <>
                                <Grid item xs={9} style={{padding:5}} >
                                    <Card /* onClick={()=>{setArrImagePhoto([urlImg.src1])}}*/>
                                        <CardMedia
                                            style={{height: 0, paddingTop: '56.25%'}}
                                            component='div'
                                            image={ getRutaImg }
                                            title={tipo}
                                        />
                                    </Card>
                                </Grid>
                                <Grid item xs={6} style={{display:'grid', placeContent:'center'}}>
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
                                </Grid>
                                </>:
                                <Grid item xs={9} style={{display:'grid', placeContent:'center', padding:20}} >
                                    <Grid container justify='center' spacing={1}>
                                        <Grid item xs={12}>
                                            <ImageUploader
                                                {...props}
                                                withIcon={false}
                                                onChange={onDrop(0)}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                maxFileSize={15242880}
                                                singleImage={true}
                                                withLabel={false}
                                                withPreview={true}
                                                buttonText={tipo}
                                                fileContainerStyle={{padding:0, margin:0}}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {   
                                                isChangeImage ?
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
                                                    <>
                                                        { getPictures.length > 0 &&
                                                            <Grid item>
                                                                <Tooltip placement='top' arrow title='SUBIR IMAGEN'>
                                                                    <span>
                                                                        <IconButton 
                                                                            onClick={handleUploadPicture}
                                                                            size='small' 
                                                                            style={{background:'#0E3B5F', color:'#fff'}}>
                                                                            <BackupIcon/>
                                                                        </IconButton>
                                                                    </span>
                                                                </Tooltip>
                                                            </Grid>
                                                        }
                                                    </>
                                                }
                                                </React.Fragment>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                        </>
                    }
            </Grid>
    </Paper>

  )
}
