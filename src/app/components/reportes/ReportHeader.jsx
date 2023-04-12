import React, { useState, useContext, useEffect } from 'react';
import { 
  Chip,
  // Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { 
  Cancel as CancelIcon,
  Check as CheckIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  DoneOutline as DoneOutlineIcon,
  ThumbUp as ThumbUpIcon,
 } from '@material-ui/icons';
 import {
  ToggleButton,
  ToggleButtonGroup
} from '@material-ui/lab';
import {
  ReportContext
} from './ReportCard';
import { useSnackbar } from 'notistack';


export const ReportHeader = ({idInstalacion, reporte }) => {
    const [ getModel, setModel ] = useState('');
    const { setChecked, isChecked } = useContext(ReportContext);
    const { enqueueSnackbar } = useSnackbar();
    

    useEffect(()=>{
      setModel(reporte.TipoReporte);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleModel = (e, newValue)=>{ 
      setModel(newValue); 
      fetch('/api/instalacion/reporte',{
        method: 'PUT',
        body: JSON.stringify({ idInstalacion, tipoModel:newValue, tipo:'tipoReporte'}),
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
    
    const handleShow = ()=>{
      setChecked((checkedOld)=> !checkedOld )
      fetch('/api/instalacion/reporte',{
        method: 'PUT',
        body: JSON.stringify({ idInstalacion, show:!isChecked, tipo:'showAll'}),
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



  return (
    <Grid 
      container
      justify='space-between'
      alignItems='center'
      spacing={1}>
        
        <Grid item>
            <Typography variant="h5" gutterBottom style={{color:'#0E3B5F'}}>
              { reporte.Local }
            </Typography>
            <Chip 
              size  = "medium" 
              label = { reporte.Cadena } 
              color = 'secondary'  
              style={{fontWeight:'bold', color:'#fff'}}/>
        </Grid>
        <Grid item>
          <Grid 
            container
            alignItems='center'
            justify='center'
            spacing={1} >
              <Grid item>
                <ToggleButtonGroup
                  value={getModel}
                  exclusive
                  onChange={handleModel}
                  aria-label="text alignment"
                >
                  <ToggleButton value="Completo" >
                    <Tooltip title="Completo" arrow placement='top'>
                      <span>        
                          <CheckBoxIcon />
                      </span>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="Variable" >
                    <Tooltip title="Variable" arrow placement='top'>
                      <span>
                        
                          <CheckIcon />
                      </span>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="Vacio" >
                    <Tooltip title="Vacio" arrow placement='top'>
                      <span>     
                        <CheckBoxOutlineBlankIcon />
                      </span>
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item>
                <Tooltip 
                  arrow 
                  placement='top' 
                  title={isChecked ? 'DESELECCIONAR TODAS' : 'SELECCIONAR TODAS'}>
                  <span>
                    <IconButton
                      size='small'
                      style={{background:'#0E3B5F', color:'#fff', padding:5}}
                      onClick={handleShow}>
                        <DoneOutlineIcon/>
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
          </Grid>

        </Grid>
        <Grid item>
          
        </Grid>
        <Grid item>
          <Chip 
            size    = "medium" 
            label   = { reporte.Status } 
            icon    = { reporte.Status === 'Instalado' ? <ThumbUpIcon/> : <CancelIcon/> }
            color   = { reporte.Status === 'Instalado' ? 'primary': 'secondary' } />
        </Grid>
    </Grid>
  )
}
