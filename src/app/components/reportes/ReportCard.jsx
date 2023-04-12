import React, { createContext, useState } from 'react';
import {
  Paper
} from '@material-ui/core';

export const ReportContext = createContext({});
const { Provider } = ReportContext;




export const ReportCard = ({children, reporte, isCharged }) => {
  const [ isChecked, setChecked ] = useState(undefined);

  return (
    <Provider value={{
      reporte,
      isChecked,
      setChecked
    }}>
      <>
      {
        isCharged ? 
          <Paper 
            elevation={1}
            style={{width:'99%', padding:10, margin:5, display:'flex', gap:10, flexDirection:'column', }}>
            { children }
          </Paper>
        : null
      }
      </>
    </Provider>
  )
}
