import React, { useState, useEffect, createContext,  } from 'react';
import { 
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Tooltip,
} from '@material-ui/core';
import { 
    Cached as CachedIcon,
    Check as CheckIcon,
    Lock as LockIcon,
    PictureAsPdf as PictureAsPdfIcon,
    RateReview as RateReviewIcon,
    Save as SaveIcon,
    Search as SearchIcon, 
    Wallpaper as WallpaperIcon
   } from '@material-ui/icons';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ReportCard } from '../components/reportes/ReportCard';
import { ReportImages } from '../components/reportes/ReportImages';
import { ReportHeader } from '../components/reportes/ReportHeader';
import { ReportFooter } from '../components/reportes/ReportFooter';
import { Plantillas } from '../components/reportes/Plantillas';
import usePage from '../hooksPerson/usePage';
import { ReportPdf } from '../components/reportes/ReportPdf'; 
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
import { useAuth } from "../Auth";

import { 
    Modal as ModalAntd,
} from 'antd';

import { v4 as uuidv4 } from 'uuid';

const arrElementos = [
    {tipo:'LOGO', src:''},
    {tipo:'PRINCIPAL', src:''},
    {tipo:'COMPLETO', src:''},
    {tipo:'VARIABLE', src:''},
    {tipo:'VACIO', src:''},
];

const Reports = (props)=>{
    const { enqueueSnackbar } = useSnackbar();
    const [ getData, setData ] = useState('');
    const [ getInfo, setInfo ] = useState({
        items:[{
            _id:Date(),
            Fotos:[]
        }]
    });
    const [ isCharged, setCharged ] = useState(false);
    const [ openTitle, setOpenTitle ] = useState(false);
    const [ openTitleValidacion, setOpenTitleValidacion ] = useState(false);
    const [ isReadyPdf, setReadyPdf ] = useState(false);
    const [ dataPdf, setDataPdf ] = useState({});
    const [ isReadyData, setReadyData ] = useState(false);
    const [ isSavingTitle, setSavingTitle ] = useState(false);
    const { setOpen, setHeaderWord } = useAuth();
    const { page, increaseBy } = usePage();
    const [ isOpenSrc, setOpenSrc ] = useState(false);
    const [ getSrc, setSrc ] = useState(arrElementos);


    useEffect(()=>{
        setOpen(false);
        setHeaderWord('Instalacion/Reporteria');
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(isReadyData){
            setReadyPdf(true);
            setReadyData(false);
        }
    },[isReadyData]);



    const handleSearchPto = async ()=>{
        const getInfo = await fetch(`/api/InstalacionesbyNumpro/reporte/${getData}`);
        const jsnInfo = await getInfo.json();
        if(jsnInfo.status){
            enqueueSnackbar(jsnInfo.status, { variant:'error'});
        }else{
            !isCharged && enqueueSnackbar('Instalaciones Cargadas', { variant:'success'});
            !isCharged && setInfo(jsnInfo);
            !isCharged && setCharged(true);
             isCharged && setDataPdf(jsnInfo);
             isCharged && setReadyData(true);
            console.log(jsnInfo)
            if(jsnInfo.srcReport?.length > 0){
                const arr = [];
                for(const x in arrElementos){
                    let elArr = arrElementos[x];
                    if(jsnInfo.srcReport.find(el=> el.tipo === elArr.tipo)){
                    arr.push(jsnInfo.srcReport.find(el=> el.tipo === elArr.tipo));
                    }else{
                    arr.push(elArr);
                    }
                }
                setSrc(arr);
            }
             
        }
    };

    const handleData = ({target})=>{ setData(target.value); };

    const handleSaveTitle = ()=>{
        setSavingTitle(true);
        fetch('/api/instalacion/reporte',{
            method: 'PUT',
            body: JSON.stringify({ idCronograma:getInfo._id, titleReport:getInfo.titleReport, tipo:'titleReport', numpro:getData}),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(result=>{
            setSavingTitle(false);
            if(result.message){
                enqueueSnackbar(result.message,{variant:'success'});
                openTitleValidacion && setOpenTitleValidacion(false);
            }else{
                enqueueSnackbar(result.result,{variant:'error'});
            }
        });
    };

    const handleClickPdf = ()=>{ setReadyPdf(false); };

    const handleReset = ()=>{
        setData('');
        setInfo({
            items:[{
                _id:Date(),
                Fotos:[]
            }]
        });
        setCharged(false);
        setReadyPdf(false);
    };

    const handleOpenPlantillas = async ()=>{
        const getInfo = await fetch(`/api/InstalacionesbyNumpro/reporte/${getData}`);
        const jsnInfo = await getInfo.json();
        const arr = [];
        for(const x in arrElementos){
            let elArr = arrElementos[x];
            if(jsnInfo.srcReport.find(el=> el.tipo === elArr.tipo)){
            arr.push(jsnInfo.srcReport.find(el=> el.tipo === elArr.tipo));
            }else{
            arr.push(elArr);
            }
        }
        setSrc(arr);
        setOpenSrc(true);
    }


    return(
        <Paper
            elevation={1}
            style={{width:'100%', height:'88vh'}}>
            <Dialog
                open={openTitle}
                onClose={()=>{ setOpenTitle(false)}}
                fullWidth
                maxWidth={'sm'}
                style={{padding:5}}
                aria-labelledby="alert-dialog-slide-title"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>TITULO REPORTE</span></DialogTitle>
                <DialogContent>
                        <TextField 
                            id="titleReport" 
                            label="TITULO" 
                            color='primary'
                            size='large' 
                            fullWidth
                            variant="outlined" 
                            value={getInfo.titleReport || ''}
                            onChange={({target})=>{ setInfo({...getInfo, titleReport:target.value})}}
                            onKeyPress={(e)=>{
                                const code = e.keyCode || e.which;
                                if(code === 13)
                                handleSaveTitle();
                            }}
                            multiline
                        />
                    
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={()=>{ setOpenTitle(false)}} color="primary" style={{background:'#B71C1C'}}>
                        CERRAR
                    </Button>
                    <Button variant='contained' onClick={()=>{ setOpenTitleValidacion(true)}} color="primary" endIcon={<SaveIcon/>}>
                        GUARDAR
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openTitleValidacion}
                onClose={()=>{ setOpenTitleValidacion(false)}}
                maxWidth={'xs'}
                style={{padding:5}}
                aria-labelledby="alert-dialog-slide-title"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>GUARDAR TITULO?</span></DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={()=>{ setOpenTitleValidacion(false)}} color="primary" style={{background:'#B71C1C'}}>
                        RETROCEDER
                    </Button>
                    <Button variant='contained' onClick={handleSaveTitle} color="primary" endIcon={!isSavingTitle && <CheckIcon/>}>
                        {isSavingTitle ?  <FacebookCircularProgress size={18}/> : 'SI'}
                    </Button>
                </DialogActions>
            </Dialog>
            <ModalAntd title="PLANTILLAS & LOGOS" open={ isOpenSrc } onOk={ ()=>{ setOpenSrc(false) } } onCancel={ ()=>{ setOpenSrc(false) } }>
                <Grid 
                    container
                    justify='center'
                    alignItems='center'
                    spacing={1}>
                        {
                            getSrc.map(el=>
                                <Grid 
                                    item 
                                    xs={12}
                                    key  = { `${el.tipo}_${uuidv4()}`}>
                                        <Plantillas 
                                            tipo = { el.tipo }
                                            src  = { el.src  }
                                            numpro = { getData }/>
                                </Grid>
                            )
                        }
                </Grid>
            </ModalAntd>
            <Grid 
                container 
                justify='center' 
                spacing={2} >
                <Grid 
                    item 
                    xs={12} 
                    style={{height:70, padding:20}}>
                    <Grid 
                        container
                        spacing={1}
                        justify='space-between'
                        alignItems='center'
                        style={{borderBottom:'1px solid #34495E'}}
                        >
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Tooltip placement='top' arrow title='RESET'>
                                            <span>
                                            <IconButton
                                                color="secondary"
                                                disabled={!isCharged}
                                                onClick={handleReset}
                                                style={{background: isCharged ? '#CAD226':'gray', color:'#fff'}}
                                                size='medium'>
                                                <CachedIcon />
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip placement='top' arrow title='TITULO DE REPORTE'>
                                            <span>
                                            <IconButton
                                                color="primary"
                                                disabled={!isCharged}
                                                onClick={()=>{setOpenTitle(true)}}
                                                style={{background: isCharged ? '#0E3B5F':'gray', color:'#fff'}}
                                                size='medium'>
                                                <RateReviewIcon />
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip placement='top' arrow title='PLANTILLAS & LOGOS'>
                                            <span>
                                            <IconButton
                                                color="primary"
                                                disabled={!isCharged}
                                                onClick={ handleOpenPlantillas }
                                                style={{background: isCharged ? '#0E3B5F':'gray', color:'#fff'}}
                                                size='medium'>
                                                <WallpaperIcon />
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip placement='top' arrow title='CREAR PDF?'>
                                            <span>
                                                <IconButton
                                                    color="primary"
                                                    disabled={!isCharged}
                                                    onClick={handleSearchPto}
                                                    style={{background: isCharged ? 'red':'gray', color:'#fff'}}
                                                    size='medium'>
                                                    <PictureAsPdfIcon />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                    { isReadyPdf ?
                                        <Grid item key={`${Date.now}_${getInfo.titleReport}_key`} id={`${Date.now}_${getInfo.titleReport}_id`}>
                                            <ReportPdf
                                                Locales={ dataPdf.items }
                                                data={ dataPdf }
                                                handleClickPdf={handleClickPdf}
                                                srcReport={dataPdf.srcReport}
                                            />
                                        </Grid>:null}
                                </Grid>
                            </Grid>
                            <Grid item lg={3} md={8} sm={12} xs={12} >
                                <Grid 
                                    container 
                                    justify='space-around' 
                                    alignItems='center'
                                    spacing={2}>
                                    <Grid item xs={8}>
                                        <TextField 
                                            id="numpro"  
                                            fullWidth                              
                                            variant="outlined"
                                            InputProps={{startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment:(
                                                <IconButton onClick={handleSearchPto} >
                                                <SearchIcon />
                                                </IconButton>
                                            )}}
                                            name='numpro'
                                            value={getData || ''}
                                            onChange={handleData}
                                            onKeyPress={(e)=>{
                                                const code = e.keyCode || e.which;
                                                if(code === 13)
                                                    handleSearchPto();
                                            }}
                                            size='small'/>
                                    </Grid>
                                    <Grid item xs={4} style={{height:50, display:'grid', placeContent:'center'}}>
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                            <Button
                                                disabled={ getInfo?.items.length < 6 || page === 0 }
                                                onClick={()=>{ increaseBy(-5)}}>-</Button>
                                            <Button 
                                                disabled={ !isCharged }>
                                                    {parseInt(page/5, 10)}</Button>
                                            <Button
                                                disabled={ getInfo?.items.length < 6 || getInfo?.items.length <= (page + 5)} 
                                                onClick={()=>{ increaseBy(+5)}}>+</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item
                    xs={12}
                    style={{overflowY:'auto', minHeight:'78vh', height:'78vh'}}>                    
                        {
                            getInfo.items.slice(0 + page, 5 + page).map(el=>
                                <ReportCard
                                    key={ el._id }
                                    reporte={el}
                                    isCharged={isCharged}>
                                        <ReportHeader idInstalacion={ el._id } reporte={ el } />
                                        <ReportImages images={ el.Fotos } />
                                        <ReportFooter reporte={ el } />
                                </ReportCard>
                            )
                        }
                </Grid>
            </Grid>
        </Paper>
    ) 
    

}

export const Reportes = (props)=>{
    return (
        <SnackbarProvider 
            autoHideDuration={800} 
            maxSnack={2} 
            hideIconVariant={false} 
            dense 
            preventDuplicate
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Reports />
        </SnackbarProvider>
    )
}
