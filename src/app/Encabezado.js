import React,{ useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
const Encabezado = (props)=> {
    const [ShowSide, setShowSide] = useState(true);

        return( 
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu" onClick={()=>{props.showside = ShowSide;}}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={useStyles.title}>
                            CreativeGroup
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
        );
    
}

export default Encabezado;
