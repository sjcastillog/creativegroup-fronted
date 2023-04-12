import React, { useEffect, useState } from 'react';
import { 
  Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
    Typography
  } from '@material-ui/core';
import { 
  Check as CheckIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import FacebookCircularProgress from '../../Elementos/FacebookCircularProgress';

export const ReportFooter = ({reporte}) => {
  const [ isSavingTitle, setSavingTitle ] = useState(false);
  const [ openTitle, setOpenTitle ] = useState(false);
  const [ openTitleValidacion, setOpenTitleValidacion ] = useState(false);
  const [ getObservacion, setObservacion ] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    if(reporte.Observacion){
      setObservacion(reporte.Observacion)
    }
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveObs = ()=>{
    setSavingTitle(true);
    fetch('/api/instalacion/reporte',{
        method: 'PUT',
        body: JSON.stringify({ idInstalacion:reporte._id, obsReport:getObservacion, tipo:'obsReport'}),
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

  return (
    <div style={{marginTop:10}}>
        <Dialog
            open={openTitle}
            onClose={()=>{ setOpenTitle(false)}}
            fullWidth
            maxWidth={'sm'}
            style={{padding:5}}
            aria-labelledby="alert-dialog-slide-title"
        >
            <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>OBSERVACION INSTALADOR</span></DialogTitle>
            <DialogContent>
                    <TextField 
                        id="observacionReport" 
                        label="OBSERVACION" 
                        color='primary'
                        size='large' 
                        fullWidth
                        variant="outlined" 
                        value={getObservacion || ''}
                        onChange={({target})=>{ setObservacion(target.value)}}
                        onKeyPress={(e)=>{
                            const code = e.keyCode || e.which;
                            if(code === 13)
                            handleSaveObs();
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
            <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>GUARDAR OBSERVACION?</span></DialogTitle>
            <DialogActions>
                <Button variant='contained' onClick={()=>{ setOpenTitleValidacion(false)}} color="primary" style={{background:'#B71C1C'}}>
                    RETROCEDER
                </Button>
                <Button variant='contained' onClick={handleSaveObs} color="primary" endIcon={!isSavingTitle && <CheckIcon/>}>
                    {isSavingTitle ?  <FacebookCircularProgress size={18}/> : 'SI'}
                </Button>
            </DialogActions>
        </Dialog>
        {
          reporte.Observacion && 
          <div style={{ border:'1px solid #CAD226', borderRadius:2, padding:5}}>
            <Typography variant="h6" gutterBottom style={{fontWeight:'bold'}}>
              <Tooltip placement='top' arrow title='EDITAR'>
                <span>
                    <IconButton
                        color="primary"
                        onClick={()=>{ setOpenTitle(true)}}
                        style={{background: '#0E3B5F', color:'#fff'}}
                        size='small'>
                        <EditIcon />
                    </IconButton>
                </span>
              </Tooltip>
             &nbsp; Observación:
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              { getObservacion }
            </Typography>
          </div>
        }
    </div>
  )
}
