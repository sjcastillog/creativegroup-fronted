import React, {useEffect, useState} from 'react';
import MaterialTable , { MTableToolbar } from 'material-table';
import {  IconButton, Fab, Button } from '@material-ui/core';
import {
  PictureAsPdf as PdfIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons';
import { red, lime, teal, grey, lightBlue, blue, green } from '@material-ui/core/colors';
import { useAuth } from './Auth';
import {Link} from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, ReactPDF, PDFDownloadLink, Font,BlobProvider } from '@react-pdf/renderer';

//import { Table, TableBody, TableCell, TableHeader, DataTableCell} from '@david.kucsai/react-pdf-table';
import RichText from "./RichText";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const Creative = createMuiTheme({
  palette: {
    primary: {
      main: '#0E3B5F',
    },
    secondary: {
      main: '#CAD226',
    },
  },

});

function CronogramaTable(){

    const [headers, setHeaders] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [data, setData]= useState([]);
    const { numproCrono, setNumproCrono } = useAuth();
    const [ dataState, setDataState] = useState(false);
    const headersFixed = ['Cadena','Local', 'Ciudad', 'Sector', 'Direccion', 'insStart', 'insAgr', 'insFin', 'insHora', 'Personal', 'Observacion'];
    const [isPdf, setIsPdf] = useState(false);
 

    useEffect(()=>{
     
        fetch('Cronograma_Info',{
          method:'POST',
          body:JSON.stringify({numpro:numproCrono}),
          headers:{'Content-Type':'application/json'}
        })
        .then(response=> response.json())
        .then(result =>{
          let arr = new Array();
          let nume = result[0].encabezados.length -1;
          let numh = headersFixed.length - 1;
          headersFixed.forEach((value, index)=>{
            arr.push({title:value, field:value});
            if(index === numh){
              result[0].encabezados.forEach((value,index)=>{
                arr.push({title:value.tiptra, field:value.tiptra});
                if(index == nume){
                  setHeaders(arr);
                  setCargando(false);
                  setData(result[0].items);
                  setIsPdf(true);
                }
              });
            }
          });
        });
    
    },[])

    useEffect(()=>{
      if(dataState){
        fetch('Cronograma_Info',{
          method:'POST',
          body:JSON.stringify({numpro:numproCrono}),
          headers:{'Content-Type':'application/json'}
        })
        .then(response=> response.json())
        .then(result =>{
            setData(result[0].items);
            setDataState(false);
        });
      }
    },[dataState]);

    return(
      <MuiThemeProvider theme={Creative}> 
        <MaterialTable
          title={`Cronograma ${numproCrono}`}
          columns={headers}
          data={data}
          isLoading={cargando}
          options={{
              grouping: true,
              filtering: true,
              exportButton: true,
              selection: true,
              headerStyle: {
                backgroundColor: '#0E3B5F',
                color: '#FFF',
                fontWeight: 'bold',
              }
          }}
          localization={{
              header: {
                  actions: 'Actions'
              },
              body:{
                  editRow:{
                      deleteText: 'Seguro desea Eliminar?'
                  }
              },
              toolbar:{
                  searchPlaceholder: 'Buscador'
              },
              pagination:{
                  labelRowsSelect: 'Filas'
              },
              grouping:{
                  placeholder:'Arrastre algún encabezado para Agrupar'
              }
          }}
          header={true}
          editable={{  
            onRowAdd: newData =>
                  new Promise(resolve => {
                      const url = 'Crono_Items';
                      fetch(url,{
                          method: 'POST',
                          body: JSON.stringify({numpro:numproCrono,newData}),
                          headers:{
                          'Content-Type': 'application/json'
                          }
                      })
                      .then(response => response.json())
                      .then(result => {
                          if(result.message){ 
                            setDataState(true);
                            resolve();                  
                          }else{                         
                            
                            resolve();
                          }
                      })
                  }),
              onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                  const url = 'Crono_Items';
                  fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify({numpro:numproCrono,newData}),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(response => response.json())
                  .then(result => {
                    if(result.message)
                    {
                      setDataState(true);
                      resolve();
                    }else{
                      resolve();
                    }
                })
              }),
              onRowDelete: (oldData) =>
              new Promise(resolve => {
                  const url = 'Crono_Items';
                  fetch(url, {
                      method: 'DELETE',
                      body: JSON.stringify({numpro:numproCrono,oldData}),
                      headers:{
                      'Content-Type': 'application/json'
                      }
                  })
                  .then(response =>  response.json())
                  .then(result => {
                      if(result.message)
                      {
                        setDataState(true);
                        resolve();
                      }else{
                        resolve();
                      }
                  });
              }),
          }}
          actions={[
              {
                tooltip: 'Eliminar todas las Matrices Seleccionadas',
                icon: 'delete',
                onClick: (evt, data) => new Promise(resolve => {
                  if(authTokens.tipo != 'EJECUTIVA'){
                    const url = 'fetch_Matriz';
                    fetch(url,{
                      method: 'DELETE',
                      body: JSON.stringify(data),
                      headers:{
                        'Content-Type': 'application/json'
                      }
                    })
                    .then(response => response.json())
                    .then(result => {
                      if(result.message)
                        {
                          setSnacks({
                            message:result.message,
                            severity:'success',
                            status:true
                          });
                          setDataState(true);
                          resolve();
                        }else{
                          setSnacks({
                            message:result.status,
                            severity:'error',
                            status:true
                          });
                        }
                    });
                  }else{
                    setSnacks({
                      message:'NO TIENE ACCESO PARA ELIMINAR',
                      severity:'error',
                      status:true
                    });
                    resolve();
                  }
                })
              }
          ]}
          components={{
            Toolbar: props => (
              <>
                <MTableToolbar {...props} />
                <div style={{display:'flex', flexDirection:'row'}}>
                <Link to='/cronogramadd' style={{ textDecoration: 'none' }}>
                  <Fab color="primary" aria-label="back" size='small' style={{backgroundColor:lime[500], marginLeft:10, marginBottom:5}}>
                    <BackIcon/>
                  </Fab>
                </Link>
                {isPdf ? <App />: console.log('Not Ready PDF')}
                </div>
                
              </>
            ),
          }}
        />
      </MuiThemeProvider>
    )
}

const App = (props) => { 
  const [dataPdf, setDataPdf] = useState({});
  const [isList, setIsList]= useState(false);
  const [isReady, setIsReady] = useState(false);
  const { numproCrono } = useAuth();
  const [headers, setHeaders] = useState(['Local', 'Ciudad', 'Direccion', 'Observacion', 'insAgr']);
  const [imaHs, setImaHs] = useState([])
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    fetch('/Cronograma_Info',{
      method: 'POST',
      body: JSON.stringify({numpro:numproCrono}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(response=> response.json())
    .then(result =>{
      if(result.status){
        alert(result.status);
      }else{
        setDataPdf(result[0]);;
        setIsList(true);
        let arr = [...headers];
        let arr2 = new Array();
        let num = result[0].encabezados.length - 1;
        result[0].encabezados.forEach((value,index)=>{
          arr.push(value.tiptra);
          arr2.push(value.src);
          if(index == num){
            setHeaders(arr);
            setImaHs(arr2);
          }
        });
        setRows(result[0].items);
      }
    });
  },[]);

  useEffect(()=>{
    if(isList){ 
    let time1 = setTimeout(()=>{setIsReady(true) },3000);
    return (()=>clearTimeout(time1));}
  },[isList])

  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },
    image: {
      //width: '100%',
      objectFit:'container',
    },
    image2: {
      display: 'block',
      margin: 'auto'
    },
    cliente:{
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      position:'relative',
      top:-572,
      left:188,
      width:380,
    },
    numpro: {
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      position:'relative',
      top:-592,
      left:770
    },
    proyecto: {
      fontFamily: 'Roboto-BlackCursive',
      color: '#fff',
      position:'relative',
      top:-540,
      left:5,
      width:380,
      fontSize:16
    },
    
    headers:{
      textAlign: 'center'
    },
    tabla: {
      position:'relative',
      top:-535,
      left:20,
      width:800,
    },
    table: { 
      display: "table", 
      width: 806, 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0,
      margin: 'auto',
      position:'relative',
      top:-445,
      borderColor:'#fff'
    },
    tableRow: {
       margin: "auto", 
       flexDirection: "row" ,
       backgroundColor:grey[300],
      }, 
    tableCol: { 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      width: `${100 / headers.length}%`,
      borderColor:'#fff'
    }, 
    tableRowHeader: {
      margin: "auto", 
      flexDirection: "row" ,
      backgroundColor:lime[600],
      color:'#fff',
     }, 
    tableColHeader: { 
      width: `${100 / headers.length}%`,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      borderColor:'#fff'
    }, 
    tableCellHeader:{
      margin: "auto",  
      fontSize: 15,
      width:'100%',
      textAlign:'center',
      fontFamily: 'Roboto-BlackCursive',
    },
    tableCell: { 
      margin: "auto", 
      fontSize: 10,
      width:'100%',
      textAlign:'center',
    },
    
  });
  
  Font.register({family: 'Oswald',src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'});

  Font.register({ family: 'Roboto-BlackCursive', src:'fonts/Roboto-BlackItalic.ttf'});

  const document =(
    <Document>
      <Page size="A4" orientation="landscape">
        <View>
          <ImagePdf source="images/cronoprin.jpg" style={styles.image} fixed />
          <Text style={styles.cliente}>
            {dataPdf.cliente}
          </Text>
          <Text style={styles.numpro}>
            {dataPdf.numpro}
          </Text>
          <Text style={styles.proyecto}>
            {dataPdf.proyecto}
          </Text>
          
          <View style={styles.table}>
            {/* TableHeader */} 
              <View style={styles.tableRowHeader}> 
                {headers.map((value,index)=>{

                  return( 
                    <View style={styles.tableColHeader}> 
                      <Text style={styles.tableCellHeader}>{value}</Text> 
                    </View>
                  )
                  })
                }
              </View> 
            {/* TableContent */} 
            {rows.map((value1,index)=>{

              return( 
                <View style={styles.tableRow} wrap> 
                  {headers.map((value,index)=>{

                    return(
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{value1[value]}</Text> 
                      </View> 
                    )
                    })
                  }
                </View> 
              )
              })
            }
          </View>
        </View>
      </Page>
    </Document>
  );
  
  return( 
    <div>
      <BlobProvider document={isReady && document} fileName="somenama.pdf">
      {({ url }) => (
                    <Fab color="primary" aria-label="pdf"  href={url} target="_blank" size='small' style={{backgroundColor:red[700], marginLeft:10, marginBottom:5}}>\
                      <PdfIcon/>
                    </Fab>
                    )}
      </BlobProvider>
    </div>
  );
};

export default CronogramaTable;