import { useState } from 'react';
import { useSnackbar } from 'notistack';

export const useRotateBy = ({reporte, img, getScale}) => {

    const [ getRotate, setRotate ] = useState( img.rotate ? img.rotate : 0 );
    const { enqueueSnackbar } = useSnackbar();

    const handleRotateBy = (value)=>{
      console.log(getScale)
      let elVal = getRotate + value;
      setRotate(elVal);
      fetch('/api/instalacion/reporte',{
        method: 'PUT',
        body: JSON.stringify({idInstalacion:reporte._id, rotate:elVal, tipo:'rotate', src:img.src}),
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
    
  return {
    getRotate,
    handleRotateBy,
  }
}
