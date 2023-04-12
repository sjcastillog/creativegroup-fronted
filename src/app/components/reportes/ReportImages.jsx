import React from 'react';
import '../../styles/stylesReportes.css'
import ReportCompImage from './ReportCompImage';


export const ReportImages = ({images=[]}, checked )=>{


    return(
        <div className='containerImgs'>
            { images.map((el, index)=> <ReportCompImage key={el.src} img={el} position={index} checked={checked}/>) }
        </div>
    )
} 

        
    
