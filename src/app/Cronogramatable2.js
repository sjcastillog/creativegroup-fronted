import React, {useEffect, useState} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ExcelComponent from './ExcelComponent';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const headersFixed = [
  {title:'Numpro', field:'numpro'},
  {title:'Cliente', field:'cliente'},
  {title:'Proyecto', field:'proyecto'},
  {title:'Ejecutiva', field:'ejecutiva'},
];

const headersExcel = [
  {title:'Numero Proforma', field:'numpro'},
  {title:'Proyecto ', field:'Proyecto'  },
  {title: 'Instalación Inicio', field:'insStart'},
  {title:'Instalación Acuerdo ', field:'ainsAgr'},
  {title:'Instalación Fin', field:'insFin'},
  {title: 'Producción Inicio', field:'proStart'},
  {title:'Producción Acuerdo ', field:'proAgr'},
  {title:'Producción Fin', field:'proFin'},
  {title:'Hora', field:'insHora'},
  {title:'Cadena', field:'Cadena'},
  {title:'Local', field:'Local'},
  {title:'Ciudad', field:'Ciudad'},
  {title:'Sector', field:'Sector'},
  {title:'Dirección', field:'Direccion'},
  {title:'Observación', field:'observacion'},
  {title:'Tipo Trabajo', field:'tiptra'},
  {title:'Servicio', field:'tipser'},
  {title:'Cantidad', field:'valtiptra'},
  {title:'Creación', field:'creacion'},
];

function CronogramaTable2(){

    const [ cargando, setCargando] = useState(true);
    const [ data, setData]= useState([]);
    const [ dataState, setDataState] = useState(false);
    const [ snackBar, setSnackBar] = useState({status:false, message:'Eliminado', severity:'success'});
    const [ dataExcel, setDataExcel ] = useState([]);
    const [ isExcel, setExcel ] = useState(false);

    useEffect(()=>{
      async function Req (){
        const ReqCrono = await fetch('/CronogramasTot');
        const JsonCrono = await  ReqCrono.json();
        let numCronos = JsonCrono.length;
        //let numSubCronos = 0 ;
        let arr = [];
        setData(JsonCrono);
        setCargando(false);
        JsonCrono.forEach((row,index)=>{  
          //numSubCronos += row.items.length;
          let enc = [];
          row.encabezados.forEach(value=>{
            enc.push(value.tiptra);
          });
          row.items.forEach((subRows, index2)=>{
            const arrK = Object.keys(subRows);
            let tip = [];
            let Objeto = {};
            let valtip = 0;
            arrK.forEach(valk=>{
             if(enc.includes(valk.toString())){
               tip.push(`${valk}`);
             }
            });   
            if(tip.length > 1){                   
              Objeto.tiptra = 'N/A';
              Objeto.valtiptra = valtip;
            }else{
              let tipt = tip[0];
              let tipt2 = tipt === undefined ? 'N/A' : tipt === '' ? 'N/A' : tipt === ' ' ? 'N/A' : tipt === null ? 'N/A' : tipt;
              Objeto.tiptra = tipt2.toString();
              Objeto.valtiptra = parseInt(subRows[tipt]);
            }
            Objeto.Proyecto = row.proyecto;
            Objeto.numpro = row.numpro;
            Objeto.ejecutiva = row.ejecutiva;
            Objeto.coordinador = row.coordinador;
            Objeto.Cliente = row.cliente;
            Objeto.id = subRows.id;
            Objeto.Cadena = subRows.Cadena;
            Objeto.Local = subRows.Local;
            Objeto.Ciudad = subRows.Ciudad;
            Objeto.Sector = subRows.Sector;
            Objeto.Direccion = subRows.Direccion;
            Objeto.insStart = subRows.insStart;
            Objeto.ainsAgr = subRows.insAgr;
            Objeto.insFin = subRows.insFin;
            Objeto.insHora = subRows.insHora;
            Objeto.Personal = subRows.Personal === ""  || subRows.Personal === null ? [] : !subRows.Personal ? []: subRows.Personal;
            Objeto.observacion =  subRows.Observacion ? subRows.Observacion : subRows.observacion;
            Objeto.tipser = 'INSTALACIÓN';
            Objeto.creacion = row.creacion ? row.creacion : 'N/A';
            arr.push(Objeto);
          })
            if(index === (numCronos - 1)){
              setDataExcel(arr);
              setExcel(true);
            }
        });
      }

      Req();
      
    },[]);

    useEffect(()=>{
      async function Req (){
        const ReqCrono = await fetch('CronogramasTot');
        const JsonCrono = await  ReqCrono.json();
        setData(JsonCrono);
      }

      Req();
      
    },[dataState]);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackBar({...snackBar, status:false});
    };

    return(
      <>
        <Snackbar open={snackBar.status} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackBar.severity}>
            {snackBar.message}
          </Alert>
        </Snackbar>
        <MaterialTable
          title={'CRONOGRAMAS'}
          columns={headersFixed}
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
              onRowDelete: (oldData) =>
              new Promise(resolve => {
                  const url = '/CronoTable';
                  fetch(url, {
                      method: 'DELETE',
                      body: JSON.stringify(oldData),
                      headers:{
                      'Content-Type': 'application/json'
                      }
                  })
                  .then(response =>  response.json())
                  .then(result => {
                      if(result.message)
                      {
                        setDataState(true);
                        setSnackBar({status:true, severity:'success', message:result.message});
                        resolve();
                      }else{
                        setSnackBar({status:true, severity:'error', message:result.status})
                        resolve();
                      }
                  });
              }),
          }}
          actions={[
              {
                tooltip: 'Eliminar todas los Cronogramas Seleccionadas',
                icon: 'delete',
                onClick: (evt, data) => new Promise(resolve => {

                    alert('NO TIENE ACCESO PARA ELIMINAR');
                    resolve();
                
                })
              }
          ]}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{padding: '0px 10px', height:50}}>
                {
                  isExcel && < ExcelComponent data={dataExcel} headers={headersExcel}/>
                }
                </div>
              </div>
            ),
          }}
        />
      </>
    )
}



export default CronogramaTable2;