import React, { useState, useEffect, useCallback } from 'react';
import {
    AddAPhoto as AddAPhotoIcon
} from '@material-ui/icons';
import { CardPhoto } from './CardPhoto';
import { 
    Card,
    CardMedia,
    Grid,   
    IconButton,
    Paper,
    // Tooltip
} from '@material-ui/core'; 
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import Viewer from 'react-viewer';

export const CardParent = ({data, isNewEntrega, isFotos}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [ getCards, setCards ] = useState([
        {id:`${data.numpro}_${uuidv4()}_${Date.now()}`}
    ]);
    const [ openPhotos, setOpenPhotos ] = useState(false);
    const [ isVisual, setVisual ] = useState(false);
    const [ isCharged, setCharged ] = useState(false);

    useEffect(()=>{
        
        if(data.Status){
            if(data.Status === 'Entregado'){
                if(isFotos){
                    if(data.Fotos){
                        if(data.Fotos.length === 0){
                            setCharged(true);
                        }else{
                            setCards(data.Fotos);
                            setVisual(true);
                            setCharged(true);
                        }
                    }else{
                        setCharged(true);
                    }
                }else{
                    setCards(data.FotosEnt_Back);
                    setVisual(true);
                    setCharged(true);
                }
            }else{
                setCharged(true);
            }
        }else{
            setCharged(true);
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddPhoto = ()=>{ 
        if(getCards.length < 4){
            setCards(old=>{ 
                const arr = [...old];
                arr.push({id:`${data.numpro}_${uuidv4()}_${Date.now()}`});
                return arr
            });
        }else{
            enqueueSnackbar('LIMITE 4 FOTOS', { variant:'error' } );
        }
    };

    const handleRemovePhoto = useCallback((idCard)=>{
        if(getCards.length === 1){
            enqueueSnackbar('POR LO MENOS TIENE QUE HABER UNA FOTO', { variant:'info' } );
        }else{
            setCards(old=> old.filter(el=> el.id !== idCard));
        }
    },[getCards]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Grid 
        container
        justify='center'
        alignItems='center'
        spacing={2}>
            <Viewer
                visible={openPhotos}
                onClose={()=>{setOpenPhotos(false)}}
                images= { getCards }
                zIndex={2000}
                downloadable
            />
            <Grid item xs={12}>
                <Paper elevation={1} square>
                    <Grid container spacing={2} justify='center' alignItems='center'>
                        <Grid item>
                            <p>{isFotos ? 'FOTOS CHECK-OUT': 'FOTOS CHECK-IN' }</p>
                        </Grid>
                        <Grid item>
                            <IconButton 
                                disabled={isVisual}
                                size='small'
                                onClick={handleAddPhoto}
                                style={{background:isVisual ? 'gray':'#CAD226', color:'#fff', padding:5}}>
                                    <AddAPhotoIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {
            isCharged ? 
                getCards.map(el=>
                isVisual?
                <Grid item xs={12} md={4} lg={3} style={{padding:5, minHeight:100}} key={el._id}>
                    <Card onClick={()=>{setOpenPhotos(true)}} >
                        <CardMedia
                            style={{height: 0, paddingTop: '56.25%'}}
                            component='div'
                            image={ el.src }
                            title="FRONTAL"
                        />
                    </Card>
                </Grid>:
                <CardPhoto
                    key={el.id}
                    idCard={el.id}
                    data={data}
                    isFotos={isFotos}
                    handleRemovePhoto={handleRemovePhoto}/>
                ) : null
            }
    </Grid>
  )
}
