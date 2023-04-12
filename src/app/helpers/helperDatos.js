const helperDatos = ({db, numpro})=>{
    return new Promise((resolve,reject)=>{
        fetch(`/api/${db}/Busqueda`,
        { 
            method:'POST', 
            body: JSON.stringify({numpro}), 
            headers:{'Content-Type': 'application/json'}
        })
        .then(response=> response.json())
        .then(result =>{
            if(result.status){
                resolve([]);
            }else{
                resolve(result);
            }
        })
})}

export default helperDatos;