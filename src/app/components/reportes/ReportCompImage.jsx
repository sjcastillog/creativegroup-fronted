import React, { useState, useEffect, useContext } from 'react';
import '../../styles/stylesReportes.css';
import {
    Button,
    ButtonGroup,
    Checkbox,
    Chip,
    FormControlLabel,
    Grid,
    IconButton,
    Tooltip
} from '@material-ui/core';

import {
    Backup as BackupIcon,
    Cached as CachedIcon,
    Close as CloseIcon,
    GetApp as GetAppIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    RotateLeft as RotateLeftIcon,
    RotateRight as RotateRightIcon,
} from '@material-ui/icons';

import styled from 'styled-components'
import Viewer from 'react-viewer';
import { useIncreaseBy } from './hooks/useIncreaseBy';
import { useRotateBy } from './hooks/useRotateBy';
import {
    ReportContext
} from './ReportCard';
import { useSnackbar } from 'notistack';
import FacebookCircularProgress from '../../Elementos/FacebookCircularProgress';

const Img = styled.img`
    border-radius: 5px;
    height:auto;
    transition: all 0.5s;
    width:100%;
    transform: ${props => `scale(${props.scale}) rotate(${props.rotate}deg) ` || "scale(1.0, 1.0) rotate(0)"} ;
    &:hover{
        transform: ${props => `scale(${parseFloat(props.scale[0]) + parseFloat('0.05')},${parseFloat(props.scale[1]) + parseFloat('0.05')}) rotate(${props.rotate}deg) ` || "scale(1.05, 1.05) rotate(0)"} ;
        box-shadow:2px 2px 2px rgba(1, 22, 78, 0.2);
        cursor: pointer;
    }
`;

const ReportCompImage = ({ img })=>{
    const { isChecked, reporte } = useContext(ReportContext);
    const { getScale, handleIncreaseBy } = useIncreaseBy({ reporte, img});
    const { getRotate, handleRotateBy } = useRotateBy({ reporte, img});
    const [ isShow, setShow ] = useState(false);
    const [ getFileUpload, setFileUpload ] = useState({length:0});
    const [ photoReportPreview, setPhotoReportPreview ] = useState('');
    const [ isSelectElement, setElementSelect ] =useState (false);
    const [ openPhotos, setOpenPhotos ] = useState(false);
    const [ isChangeImage, setChangeImage ] = useState(false);
    const [ getSrc, setSrc ] = useState('');
    const [ extImg, setExtImg ] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        setExtImg(img?.src.split('.').pop());
        setSrc(img.src);
        img.show && setShow(img.show);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(isChecked ===  true){
            setShow(true);
        }else if(isChecked ===  false){
            setShow(false);
        }
    },[isChecked]);
    

    const handleImageChangeReport = (e)=>{
        e.preventDefault();
        if(e.target.files.length > 0){ 
            if(e.target.files[0].name.split('.').pop().toString().toLowerCase() === extImg.toString().toLowerCase()){
                

                let reader = new FileReader();
                let file = e.target.files[0];
            
                reader.onloadend = () => {
                    setPhotoReportPreview(reader.result);
                    setElementSelect(true);
                }
            
                reader.readAsDataURL(file)
                setFileUpload(e.target.files);
                
            }else{
                alert('FORMATO DE IMAGEN NO COINCIDE CON LA ORIGINAL')
            }
        }
    };

    const handleDeleteImage = ()=>{
        setPhotoReportPreview('')
        setElementSelect(false);
        setFileUpload({length:0})
    };

    const handleSubmitImage = (e)=> { 
        setChangeImage(true);
        e.preventDefault();

        fetch('/api/InstalacionImagen',{
            method: 'DELETE',
            body: JSON.stringify({src:getSrc}),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.message){
                enqueueSnackbar(result.message, {variant:'success'});
                let srcNew = getSrc.slice(0,-`${extImg.length + 1}`).replace('/fotosIns/', "");
                const nombreImagen = `${srcNew}_${Date.now()}.${extImg}`;
                srcNew = `/fotosIns/${srcNew}_${Date.now()}.${extImg}`;
                let formD = new FormData();
                formD.append('imagen', getFileUpload[0], nombreImagen);
                fetch('/api/InstalacionImagen',{method:'POST',body:formD})
                .then(response => response.json())
                .then(result => {     
                    if(result.message){
                        enqueueSnackbar(result.message, {variant:'success'});
                        fetch('/api/instalacion/reporte',{
                            method: 'PUT',
                            body: JSON.stringify({idInstalacion:reporte._id, tipo:'changeImage', tipoFoto:img.tipo, srcBack:getSrc, srcNew}),
                            headers:{'Content-Type':'application/json'}
                        })
                        .then(res=>res.json())
                        .then(result=>{
                            if(result.message){
                                enqueueSnackbar(result.message,{variant:'success'});
                                setSrc(srcNew);
                                setElementSelect(false);
                                setFileUpload({length:0});
                                setPhotoReportPreview('');
                                setChangeImage(false);
                            }else{
                                enqueueSnackbar(result.result,{variant:'error'});
                            }
                        });
                    }else{
                        enqueueSnackbar(result.status, {variant:'error'});
                    }   
                });
            }else{
                enqueueSnackbar(result.status, {variant:'error'});
            }
        })
    };

    const handleShow = ({target})=>{
        setShow(target.checked);
        fetch('/api/instalacion/reporte',{
            method: 'PUT',
            body: JSON.stringify({idInstalacion:reporte._id, show:target.checked, tipo:'show', src:getSrc}),
            headers:{'Content-Type':'application/json'}
          })
          .then(res=>res.json())
          .then(result=>{
              if(result.message){
                  enqueueSnackbar(result.message,{variant:'success'});
              }else{
                  enqueueSnackbar(result.result,{variant:'error'});
              }
          });
    };

    return(
        <div className='containerImg'>
            <Viewer
                visible={openPhotos}
                onClose={()=>{setOpenPhotos(false)}}
                images={[{src:isSelectElement ? photoReportPreview : getSrc, alt:''}]}
                zIndex={2000}
                downloadable
            />
            <div className='div_img'>
                {
                    isChangeImage ?
                    <Grid container justify='center' alignItems='center'>
                        <Grid item>
                            <FacebookCircularProgress size={25}/>
                        </Grid>
                    </Grid>
                    :
                    <Img 
                        scale   = { getScale }
                        rotate  = { getRotate }
                        src     = { isSelectElement ? photoReportPreview : getSrc } 
                        alt     = "Younet"
                        onClick = { ()=>{ setOpenPhotos(true) } }
                    /> 
                }
            </div>
            <div className='div_text'>
                <Grid container spacing={1} direction='column' alignItems='center'>
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems='center' justify='center'>
                            <Grid item>
                                <Chip 
                                    size  = "medium" 
                                    label = { img.tipo } 
                                    color = 'secondary' 
                                    style={{fontWeight:'bold'}}/>
                            </Grid>
                            <Grid item>
                                <Tooltip placement='top' arrow title='DESCARGAR IMAGEN'>
                                    <span>
                                        <IconButton 
                                            size='small'                                                     
                                            href={`http://app.creativegroup.com.ec:1000/${getSrc}`}
                                            target='_blank' 
                                            download
                                            // onClick={downloadImage}
                                            style={{background:'#CAD226', color:'#fff'}} >
                                                <GetAppIcon/>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <input 
                                    accept="image/*" 
                                    style={{display:'none'}} 
                                    onChange={handleImageChangeReport} 
                                    id={`icon-button-file_${img.src}`} 
                                    type="file" />
                                <label htmlFor={`icon-button-file_${img.src}`} >
                                    <Tooltip placement='top' arrow title='CAMBIAR IMAGEN'>
                                        <span>
                                            <IconButton 
                                                color="primary" 
                                                aria-label="upload picture" 
                                                component="span"  
                                                style={{background:'#CAD226', color:'#fff'}}
                                                size='small'>
                                                    <CachedIcon/>
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </label>
                            </Grid>
                            {
                                getFileUpload.length > 0 &&
                                <>
                                    {   isChangeImage ?
                                        <FacebookCircularProgress size={20}/>
                                        :
                                        <>
                                        <Grid item>
                                            <Tooltip placement='top' arrow title='SUBIR IMAGEN'>
                                                <span>
                                                    <IconButton 
                                                        onClick={handleSubmitImage}
                                                        size='small' 
                                                        style={{background:'#0E3B5F', color:'#fff'}}>
                                                        <BackupIcon/>
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Grid>
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
                                        </Grid>
                                        </>
                                    }
                                </>
    
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'flex-start'}}>
                        <FormControlLabel
                            control={<Checkbox checked={isShow} onChange={handleShow} name="el_Visualizar" />}
                            label="Visualizar"
                        />
                    </Grid>
                    <Grid item xs={4} style={{height:50, display:'grid', placeContent:'center'}}>
                        <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                            <Button
                                onClick={()=>{ handleIncreaseBy('-1', 'X')}}>
                                    <KeyboardArrowLeftIcon/>
                            </Button>
                            <Button
                                onClick={()=>{ handleIncreaseBy('+1', 'X')}}>
                                    <KeyboardArrowRightIcon/>
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={4} style={{height:50, display:'grid', placeContent:'center'}}>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button
                                onClick={()=>{ handleIncreaseBy('-1', 'Y')}}>
                                    <KeyboardArrowDownIcon/>
                            </Button>
                            <Button
                                onClick={()=>{ handleIncreaseBy('+1', 'Y')}}>
                                    <KeyboardArrowUpIcon/>
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'flex-start'}}>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button
                                onClick={()=>{ handleRotateBy(-90)}}>
                                    <RotateLeftIcon/>
                            </Button>
                            <Button
                                onClick={()=>{ handleRotateBy(+90)}}>
                                    <RotateRightIcon/>
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ReportCompImage;