import { useState } from 'react';
import { useSnackbar } from 'notistack';

export const useIncreaseBy = ({reporte, img}) => {

    const [ getScale, setScale ] = useState( img.scale ? img.scale :'1.0, 1.0');
    const { enqueueSnackbar } = useSnackbar();

    const handleIncreaseBy = (value, scale)=>{
        let elVal = '';
        if(scale === 'X'){ 
            let val_X = getScale.split(',')[0].toString();
            switch(value){
                case '-1':
                    let totF_0 = parseFloat(val_X) - parseFloat('0.05');
                    let elVal0  = parseFloat(totF_0).toFixed(2);
                    elVal = `${elVal0},${getScale.split(',')[1].toString()}`;
                    break;
                case '+1':
                    let totF_1 = parseFloat(val_X) + parseFloat('0.05');
                    let elVal1  = parseFloat(totF_1).toFixed(2);
                    elVal = `${elVal1},${getScale.split(',')[1].toString()}`;
                    break;
                default:
                    console.log('NO APLICA');
            }
        }else{
            let val_Y = getScale.split(',')[1].toString();
            switch(value){
                case '-1':
                    let totF_0 = parseFloat(val_Y) - parseFloat('0.05');
                    let elVal0  = parseFloat(totF_0).toFixed(2);
                    elVal = `${getScale.split(',')[0].toString()},${elVal0}`;
                    break;
                case '+1':
                    let totF_1 = parseFloat(val_Y) + parseFloat('0.05');
                    let elVal1  = parseFloat(totF_1).toFixed(2);
                    elVal = `${getScale.split(',')[0].toString()},${elVal1}`;
                    break;
                default:
                    console.log('NO APLICA');
            }
        }
        setScale(elVal);
        fetch('/api/instalacion/reporte',{
            method: 'PUT',
            body: JSON.stringify({idInstalacion:reporte._id, scale:elVal, tipo:'scale', src:img.src}),
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
    getScale,
    handleIncreaseBy
  }
}
