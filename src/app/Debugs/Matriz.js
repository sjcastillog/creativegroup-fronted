import React, {useEffect, useState, Fragment} from 'react';
import { Button  } from '@material-ui/core';
import MaterialTable from 'material-table';

const Matriz = ()=>{
    const [ data, setData ] = useState([]);
    const [ dataProcess, setDataProcess ] = useState([]);
    const [ isProcesar, setProcesar ] = useState(false);
    const [ cargando, setCargando ] = useState(true);
    const [ dataM, setDataM ] = useState([]);
    const [ getContinuo, setContinuo ] = useState(false);
    const [ dataUpdate, setDataUpdate ] = useState([]);

    useEffect(()=>{
        (async ()=>{
            const response = await fetch('/fetch_Matriz');
            const data2 = await response.json();
            setDataM(data2);
        })();

    },[]);

    useEffect(()=>{
        if(getContinuo){
            setContinuo(false)
            fetch('/matriz/update',{
                method:'POST',
                body: JSON.stringify({arrMatriz:dataUpdate}),
                headers:{
                    'Content-Type': 'application/json'
                }
            }) 
            .then(response=> response.json())
            .then(result=>{
                console.log(result);
                if(result.message){
                    alert(result.message)
                }else{
                    alert(result.status)
                }
                
                console.log(result);
            })
        }
    },[getContinuo])

    useEffect(
        ()=>{
            if(isProcesar){
                setProcesar(false);
                HandleProcess();
            }
        },[isProcesar] // eslint-disable-line react-hooks/exhaustive-deps
    )

    useEffect(
        ()=>{
            const HandlePeticion = ()=>{
                fetch('/minibot1')
                    .then(response=> response.json())
                    .then(result =>{
                        if(result.status){
                            console.log(result.status);
                            alert(result.status);
                        }else{
                            setData(result);
                            setProcesar(true);
                            
                        }
                    })
            }

            HandlePeticion();
        },[] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const HandleProcess = ()=>{
        //const arr = [];
        const arrRep = [];
        data.forEach((value, index)=>{
            let num = 0;    
            data.forEach((value2, index2)=>{
                if(value.numpro === value2.numpro){
                    num++
                    if(num>1){
                        arrRep.push(value);
                    }else if(index2 === data.length -1){
                        num = 0;
                    }
                }else if(index2 === data.length -1){
                    num = 0;
                }
            })
            if(index === data.length -1){
                setDataProcess(arrRep);
                setCargando(false);
            }

        })
    };

    const handleProcesar = ()=>{
        console.log('handleProcesar');
        const dataMa = [...dataM];
        const arr = dataMa.map((el, index)=>{
            const objeto = {...el};
            objeto.StatusOp = 'Activo';
            return objeto;
        });
        setDataUpdate(arr);
        console.log(arr);
        setTimeout(()=>{
            setContinuo(true); 
        },2000)
    };

    return(
        <Fragment>
        <Button onClick={handleProcesar} variant='contained' color='primary'>
            PROCESAR
        </Button>
        <MaterialTable
              title="MINI BOT_1"
              columns={[
                        {title: 'N. Matriz', field: 'numMatriz' },
                        {title: 'PPTO.', field: 'numpro' },
                        {title: 'EJECUTIVA', field: 'ejecutiva', editable:'never' },
              ]}
              data={dataProcess}
              isLoading={cargando}
              options={{
                
                  filtering: true,
                  exportButton: true,
                  selection: true,
                  headerStyle: {
                    backgroundColor: '#0E3B5F',
                    color: '#FFF',
                    fontWeight: 'bold',
                  },
                  pageSize: 10
              }}
              localization={{
                  header: {
                      actions: 'Actions'
                  },
                  body:{
                      editRow:{
                          deleteText: 'Se Procedera a darle de baja a esta Matriz, desea continuar?'
                      },
                      emptyDataSourceMessage: 'Buscando errores en la D.B. de Matriz'
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
                onRowDelete: oldData =>
                new Promise(resolve => {
                  //alert('Se le dara de baja a esta Matriz, desea proceder?');
                  var r = window.confirm("Presione Aceptar para continuar");
                    if (r === true) {
                        fetch('/BajaMatriz', {
                            method: 'POST',
                            body: JSON.stringify({numpro:dataProcess.numpro}),
                            headers:{
                                'Content-Type':'application/json'
                            }
                        })
                            .then(response=> response.json())
                            .then(result =>{
                                alert('Hecho');
                                resolve();
                            })
                        
                        
                    } else {
                        alert('Cancelado');
                        resolve();
                    }
                })
            }}
              actions={[
                  {
                    tooltip: 'Eliminar todas las O.P. Seleccionadas',
                    icon: 'delete',
                    onClick: (evt, data) => new Promise(resolve => {
                      
                        const url = 'fetch_opDelete';
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
                              alert(result.message)
                              resolve();
                            }else{
                              alert(result.status)
                              resolve();
                            }
                        });
                    
                    })
                  }
                ]}
             
          />
        </Fragment>
    )
};

export default Matriz;