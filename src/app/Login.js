import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button,
         Grid,
         InputAdornment,
         Paper,
         TextField,} from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useAuth } from "./Auth";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({ 
    root: {
    },
    button:{
        backgroundColor:'#CAD226',
        color:'#fff',
        '&:hover':{
            backgroundColor:'#acb334',
        }
    }
}));

function Log(){
    const classes = useStyles();
    const [ formulario, setFormulario] = useState({});
    const [ stateUser, setStateUser] = useState(false);
    const [ statePassword, setStatePassword] = useState(false);
    const { setAuthTokens, setShowAppbar, setOpen, setAdmin, setAccess } = useAuth();
    const [ isLoggedIn, setLoggedIn] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    
    const handleLogin = () => { 
        fetch('fetch_login',{
            method:'POST',
            body: JSON.stringify(formulario),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(result=>{
            if (result.status){
                if(result.status === 'Usuario no Existe'){
                    enqueueSnackbar(result.status,{variant:'error'});
                    setStateUser(true);
                    setTimeout(()=>{
                        setStateUser(false);
                    },2000)
                }else 
                if(result.status === 'Clave Incorrecta'){
                    enqueueSnackbar(result.status,{variant:'error'});
                    setStatePassword(true);
                    setTimeout(()=>{
                        setStatePassword(true);
                    },2000)
                }else{
                    enqueueSnackbar(result.status,{variant:'error'});
                    setStateUser(true);
                    setStatePassword(true);
                    alert('COMUNIQUESE CON SISTEMAS');
                } 
            }else{
                enqueueSnackbar('Login Correcto',{variant:'success'});
                setAuthTokens(result.message);
                setAccess(result.message.Accesos && result.message.Accesos )
                if(result.message.tipo === 'ADMINISTRADOR'){
                    setAdmin(true);
                  }
                setTimeout(()=>{
                    setOpen(true);
                    setShowAppbar(true)
                    setLoggedIn(true);
                },1000);
            }
        });

    };

    const handleFormulario = (e)=>{
        setFormulario({...formulario, [e.target.id]:e.target.value});
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return(
        <React.Fragment>
            <Grid container justify='center' alignContent='center'spacing={5} className={classes.root} >
                <Grid item xl={4} lg={4} md={6} sm={8} xs={12} >
                    <Paper  elevation={3}>
                        <Grid container justify='center'  style={{height:'80vh'}}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{padding:0,margin:0,height:'20%'}}>
                                <img src='../images/cenefalogin.png' width='100%' height='100%' alt='login'/>
                            </Grid>
                            <Grid item xl={8} lg={8} md={8} sm={10} xs={12} style={{padding:10,margin:'0 20 20 20'}}>
                                <TextField
                                    label='User'
                                    autoFocus={true}
                                    error={stateUser}
                                    variant='outlined'
                                    id='usuario'
                                    fullWidth                                
                                    value={formulario.usuario || ''}
                                    onChange={handleFormulario}  
                                    InputProps={{
                                        startAdornment:(
                                            <InputAdornment position='start'>
                                                <PersonIcon/>
                                            </InputAdornment>
                                        )
                                    }}               
                                />
                            </Grid>
                            <Grid item xl={8} lg={8} md={8} sm={10} xs={12} style={{padding:10,margin:'0 20 20 20'}}>
                                <TextField
                                    label='Password'
                                    error={statePassword}
                                    variant='outlined'
                                    id='pass'
                                    fullWidth
                                    value={formulario.pass || ''}
                                    onChange={handleFormulario}
                                    type='password'
                                    onKeyPress={(event)=>{
                                        const code = event.keyCode || event.which;
                                        if(code === 13)  
                                            handleLogin()
                                        }}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12} style={{padding:10,margin:'0 20 20 20'}}>
                                <Button fullWidth size='large' variant="contained" className={classes.button} onClick={handleLogin}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            
        </React.Fragment>
    );
}


function Login(){
    return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense >
          <Log />
        </SnackbarProvider>
      );
};

export default Login;