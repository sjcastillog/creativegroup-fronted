import React from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import { Description as DescriptionIcon } from '@material-ui/icons';
//import Workbook from 'react-excel-workbook'
import ReactExport from "react-data-export";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelComponent = (props)=>{
    const { data, headers } = props;
    const ColumnasExcel = headers.map((value,index)=>{
      if(value.field){
        if(value.field === ''){
          return(
            <ExcelColumn label={value.title} value={'null'} key={`fila${index}`}/>
          )
        }else if(value.field === null){
          return(
            <ExcelColumn label={value.title} value={'null'} key={`fila${index}`}/>
          )
        }else if(value.field === undefined){
          return(
            <ExcelColumn label={value.title} value={'null'} key={`fila${index}`}/>
          )
        }else{
          return(
            <ExcelColumn label={value.title} value={value.field} key={`fila${index}`}/>
          )
        }   
      }else{
        return( 
          <ExcelColumn label={value.title} value={'N/A'} key={`fila${index}`}/>
        )
      }
    });  
  
    return(
        <ExcelFile  filename="database.xlsx" element={<Tooltip title="Excel" placement="right"><Fab size='small'><DescriptionIcon color='primary'/></Fab></Tooltip>}>
          <ExcelSheet data={data} name="database">
              {ColumnasExcel}
          </ExcelSheet>
        </ExcelFile >
    )
};

  
  export default ExcelComponent;