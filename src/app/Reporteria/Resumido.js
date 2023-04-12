import React, { useState, useEffect, useCallback, Fragment, memo } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../Auth";
import  {             
            
            Button,
            Checkbox,
            Chip,
            Dialog,
            DialogActions,
            DialogContent,
            Fab,
            FormControlLabel,
            Grid,
            Grow,
            IconButton,
            LinearProgress,
            Menu,
            MenuItem,
            Paper,
            Slider,
            Switch,          
            TableBody,
            TableHead,
            TablePagination,
            TableSortLabel,
            TableRow,
            Toolbar,
            //Typography,
            TextField,
            Tooltip,
            Typography,
            
} from '@material-ui/core';
import { 
            Add as AddIcon,
            Autorenew as AutorenewIcon,
            BorderVertical as BorderVerticalIcon,
            Brush as BrushIcon,
            Build as BuildIcon,
            Check as CheckIcon,
            CheckBox as CheckBoxIcon,
            CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
            Clear as ClearIcon,
            DateRange as DateRangeIcon,
            Delete as DeleteIcon,
            DeleteSweep as DeleteSweepIcon,
            Description as DescriptionIcon,
            Edit as EditIcon,
            FilterList as FilterListIcon,
            GetApp as GetAppIcon,
            MarkunreadMailbox as MarkunreadMailboxIcon,
            NavigateNext as NavigateNextIcon,
            Photo as PhotoIcon,
            PictureAsPdf as PictureAsPdfIcon,
            PlusOne as PlusOneIcon,
            PostAdd as PostAddIcon,
            Refresh as RefreshIcon,
            Save as SaveIcon,
            Search as SearchIcon,
            //TableChart as TableChartIcon,
            Visibility as VisibilityIcon,
            ViewWeek as ViewWeekIcon,
} from '@material-ui/icons';
//import socketIOClient from "socket.io-client";
import { Button as ButtonSemantic } from 'semantic-ui-react';
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
import styled from 'styled-components';
import { Autocomplete } from '@material-ui/lab';
import ReactExport from "react-data-export";
import { Page, Text, View, Document, StyleSheet, Font, usePDF } from '@react-pdf/renderer';
import Swal from 'sweetalert2';
import Viewer from 'react-viewer';


    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const Meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO','SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    const arrMeses = ['', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO','SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    const opcionesStatus = [ 'ACTIVO', 'ANULADO', 'APROBADO', 'FACTURADO', 'TODOS'];

    const opcionesTabla = [ 'COMPARATIVO', 'CRONOLOGICO'];

    const getTipoFiltro = [ 'COORDINADORA', 'EJECUTIVA', 'TODOS']

    const opcionesTipo = [ 'ANUAL', 'MENSUAL']

    const opcionesAnios = [ '2019', '2020', '2021', '2022'];

    const useStyles = makeStyles((theme) => ({
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
            color:'#fff'
        },
    }));

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Grow direction="up" ref={ref} {...props} timeout={750} />;
    });

    const TableContainerYounet = styled.div`
        min-height:70vh;  
        max-height:70vh;
        min-width:750px; 
        overflow-x: auto;
    `;

    const TableYounet = styled.table`
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;
        border-width: 0px;
        border-style: solid;
        border-color: grey;
    `;

    const TheadYounetStyledFixed = styled.th`
        text-align:${props => props.align ? props.align : 'left'};    
        width:${props => props.width || 100};
        background-color:#0E3B5F;
        color: #fff;
        display:block;
        font-weight:bold;
        height:33px;
        padding-left:10px;
        padding-top:6px;
        position:sticky;
        z-index:1; 
        left:${props => props.left || '0px'};
         
    `;

    const TheadYounetStyled = styled.th`
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 100};
        background-color:${props => props.bgColor ? props.bgColor : '#0E3B5F' };
        color: #fff;
        display:block;
        font-weight:bold, 
        height:33px;
        padding-left:10px;
        padding-top:6px;
        position: relative;
        left:0px;   

    `;

    const TdYounetStyledFixed = styled.td`
        color:${props => props.color ? props.color : 'black'};
        font-size:${props => props.fontSize ?  props.fontSize : '10px'};
        font-weight:${props => props.bolder ? 'bold' : 'none'};
        minWidth:${props => props.minWidth || 60};
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 60};
        background-color:${props => props.backgroundColor ? props.backgroundColor : '#ffffff'}
        border-bottom: 1px solid #E5E8E8;
        display:block;
        height:43px;
        padding:15px 10px 10px 10px; 
        position:sticky;
        z-index:1; 
        left:${props => props.left || '0px'};
        text-overflow: ellipsis; 
        white-space: nowrap;  
        overflow: hidden;
    `;

    const TdYounetStyled = styled.td`
        color:${props => props.color ? props.color : 'black'};
        font-size:${props => props.fontSize ?  props.fontSize : '10px'};
        font-weight:${props => props.bolder ? 'bold' : 'none'};
        minWidth:${props => props.minWidth || 60};
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 60};
        background-color:${props => props.backgroundColor ? props.backgroundColor : 'transparent'}
        border-bottom: 1px solid #E5E8E8;
        display:block;
        height:43px;
        padding:15px 10px 10px 10px;    
        position:relative;
        left:0px;      
        text-overflow: ellipsis;    
        white-space: nowrap; 
        overflow: hidden;
    `;

    const TdYounetStyledFixed2 = styled.td`
        color:${props => props.color ? props.color : 'black'};
        font-size:${props => props.fontSize ?  props.fontSize : '10px'};
        font-weight:${props => props.bolder ? 'bold' : 'none'};
        minWidth:${props => props.minWidth || 60};
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 60};
        background:#ffffff;
        border-bottom: 1px solid #E5E8E8;
        display:block;
        height:43px;
        padding:1px 5px;   
        position:sticky;
        z-index:1; 
        left:${props => props.left || '0px'};
        text-overflow: ellipsis; 
        white-space: nowrap;  
        overflow: hidden;
    `;

    const TrYounetStyled = styled.tr`
        display:flex;
        background-color:${props => props.selected ? 'LightBlue' : '#fff'};
        &:hover{
            background-color:Gainsboro
        }
    `;

    const headCellsColumn = [
        { id: 'Ejecutiva', numeric: false, disablePadding: false, label: 'EJECUTIVA', show:true, fixed:false, width:200, num:0, align:'left', fontSize:'10px', bolder:false , type:'text'    },
        { id: 'total', numeric: false, disablePadding: false, label: 'TOTAL', show:true, fixed:false, width:200, num:1, align:'left', fontSize:'9px', bolder:false , type:'text'    },
    ];

    const propsWidth = {
        Ejecutiva: 200,
        total: 200,
        
    };

    const colBasic = { id: 'colBasic', numeric: true, disablePadding: false, label: 'colBasic', show:true, fixed:false, width:130, num:0, align:'left', fontSize:'10px', bolder:false, type:'text' };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    };
      
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };
      
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const TheadYounetFixed = memo(({widthDefault, createSortHandler, order, orderBy, headCell, classes, headCells, align})=>{
        const [ leftValue, setLeftValue ] = useState('0px')
        
        useEffect(()=>{
            if(headCell.num === 0){
                setLeftValue('0px');
            }else{
                let numero = 0;
                for(let i=0; i<headCell.num; i++){
                    if(headCells[i].fixed) numero += headCells[i].width;
                }
                setLeftValue(`${numero}px`)
            }
            
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        return(
            <TheadYounetStyledFixed width={widthDefault} left={leftValue} align={align}>
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)} 
                    style={{color:'#fff', textAlign:align}}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                    ) : null}
                </TableSortLabel>
            </TheadYounetStyledFixed>
        );
    });

    const TheadYounetFixed2 = memo(({widthDefault, createSortHandler, order, orderBy, headCell, classes, headCells, value, align, bgColor})=>{
        const [ leftValue, setLeftValue ] = useState('0px')
        
        useEffect(()=>{
            if(headCell.num === 0){
                setLeftValue('0px');
            }else{
                let numero = 0;
                for(let i=0; i<headCell.num; i++){
                    if(headCells[i].fixed) numero += headCells[i].width;
                }
                setLeftValue(`${numero}px`)
            }
            
        },[]); // eslint-disable-line react-hooks/exhaustive-deps
    
        return(
            <TheadYounetStyledFixed width={widthDefault} left={leftValue} align={align} bgColor={bgColor}> 
                {value}
            </TheadYounetStyledFixed>
        );
    });

    const TheadYounet = memo(({widthDefault, createSortHandler, order, orderBy, headCell, classes, align})=>( 
        <TheadYounetStyled width={widthDefault} align={align}>
            <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)} 
                style={{color:'#fff', textAlign:align}}
            >
                {headCell.label}
                {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                ) : null}
            </TableSortLabel>
        </TheadYounetStyled>
    ));

    const TheadYounet2 = memo(({widthDefault, createSortHandler, order, orderBy, headCell, value, classes, align, bgColor})=>( 
        <TheadYounetStyled width={widthDefault} align={align} bgColor={bgColor}>
           {value}
        </TheadYounetStyled>
    ));

    const TdYounet = memo(((props)=>{
        const { minWidth, width, headCells, headCell, valueInfo, fixed, color, align, bolder, fontSize, backgroundColor } = props
        const [ leftValue, setLeftValue ] = useState('0px');

        useEffect(()=>{
            if(headCell.num === 0){
                setLeftValue('0px');
            }else{
                console.log(headCell.id);
                let numero = 0;
                for(let i=0; i<headCell.num; i++){
                    if(headCells[i].fixed) numero += headCells[i].width;
                }
               
                setLeftValue(`${numero}px`)
            }
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        
        return(
            <Fragment>
            {
                fixed ?
                <TdYounetStyledFixed 
                    minWidth={minWidth} 
                    width={width} 
                    left={leftValue} 
                    color={color} 
                    bolder={bolder}
                    fontSize={fontSize}
                    align={align}
                    backgroundColor={backgroundColor}
                >
                    {valueInfo}
                </TdYounetStyledFixed>
                :
                <TdYounetStyled 
                    minWidth={minWidth} 
                    width={width} 
                    left={leftValue} 
                    color={color} 
                    bolder={bolder}
                    fontSize={fontSize}
                    align={align}
                    backgroundColor={backgroundColor}
                >
                    {valueInfo}
                </TdYounetStyled>
            }
            </Fragment>
        )
        
        
    }));
    
    function EnhancedTableHead(props) {
        
        const { classes, order, orderBy, onRequestSort, headCells, HandleChangeWidth, selectionArr, handleSelectAll } = props;

        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };

        const preClick = ()=>{ handleSelectAll();}
    
        return (
            <TableHead style={{position:'sticky', top: selectionArr.length > 0 ? 33 : 0, zIndex:2}}>
                <TableRow style={{display:'flex'}} >
                    <TheadYounetStyled width={60} align='center'>
                        <IconButton onClick={preClick} size='small' style={{color:'#fff'}}>
                            <CheckBoxIcon style={{marginLeft:-12}} />
                        </IconButton>
                        
                    </TheadYounetStyled>
                {headCells.map( headCell =>  
                    headCell.show && ( 
                        headCell.fixed 
                        ? 
                        <TheadYounetFixed  
                            headCells={headCells} 
                            HandleChangeWidth={HandleChangeWidth} 
                            key={headCell.id} 
                            widthDefault={headCell.width} 
                            createSortHandler={createSortHandler} 
                            order={order} 
                            orderBy={orderBy} 
                            headCell={headCell} 
                            classes={classes} 
                            align={headCell.align}
                            
                            />
                        : 
                        <TheadYounet  
                            headCells={headCells} 
                            HandleChangeWidth={HandleChangeWidth}
                            key={headCell.id} 
                            widthDefault={headCell.width} 
                            createSortHandler={createSortHandler} 
                            order={order} 
                            orderBy={orderBy} 
                            headCell={headCell} 
                            classes={classes} 
                            align={headCell.align}
                         />
                        
                ))}
                </TableRow>
            </TableHead>
        );
    };

    function EnhancedTableHeadSum(props) {
    
        const { classes, order, orderBy, onRequestSort, headCells, HandleChangeWidth, selectionArr } = props;
    
        const [ getValores, setValores ] = useState({});
    
        useEffect(()=>{

            let arr = [...selectionArr];
            const objeto = {};
            let index = 0;
            for( const x in arr){
                index++
                const objeto1 = {...arr[x]};
                if(arr.length > 1){
                    for(const prop in objeto1){
                        let val_0 = objeto[prop] === undefined ? '0.00' :  parseFloat(objeto[prop]);
                        let val = parseFloat(val_0) +  parseFloat(objeto1[prop]);
                        objeto[prop] = parseFloat(val).toFixed(2);
                    }
                }else{
                    Object.assign(objeto, objeto1);
                }
                if(arr.length === index) objeto.Cliente = ''            
            }
            setValores(objeto);

        },[selectionArr]);
    
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
    
        return (
            <TableHead style={{position:'sticky', top:0, zIndex:2}}>
                <TableRow style={{display:'flex', color:'green'}} >
                    <TheadYounetStyled width={60} align='center' bgColor='#CAD226'>
                        <CheckBoxIcon style={{marginLeft:-12}}/>
                    </TheadYounetStyled>
                {headCells.map( headCell =>  
                    headCell.show && ( 
                        headCell.fixed 
                        ? 
                        <TheadYounetFixed2  
                            headCells={headCells} 
                            HandleChangeWidth={HandleChangeWidth} 
                            key={headCell.id} 
                            widthDefault={headCell.width} 
                            createSortHandler={createSortHandler} 
                            order={order} 
                            orderBy={orderBy} 
                            headCell={headCell} 
                            classes={classes} 
                            align={headCell.align}
                            bgColor='#CAD226'
                            value={getValores[headCell.id] ? getValores[headCell.id] : ''}
                        />:
                        <TheadYounet2  
                            headCells={headCells} 
                            HandleChangeWidth={HandleChangeWidth}
                            key={headCell.id} 
                            widthDefault={headCell.width} 
                            createSortHandler={createSortHandler} 
                            order={order} 
                            orderBy={orderBy} 
                            headCell={headCell} 
                            classes={classes} 
                            align={headCell.align}
                            bgColor='#CAD226'
                            value={getValores[headCell.id] ? getValores[headCell.id] : ''}
                        />
                ))}
                </TableRow>
            </TableHead>
        );
    };
    
    const FiltradoEl = ({ index, info, HandleAddFilter, HandleDeleteFilter, HandleAddInformacionFilter, headersColumn})=>{
        const [ elementValue, setElementValue ] = useState({ idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:'O', type:''});

        useEffect(()=>{
            setElementValue({ idElement:info.idElement, valorElement:info.valorElement, numero:index, labelElement:info.labelElement, selectElement:info.selectElement, type:info.type})
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        const HandleElementValue = (e)=>{
            setElementValue({...elementValue, valorElement:e.target.value});
           // HandleAddInformacionFilter(index, e.target.id, e.target.value)
        };

        const HandlePreDeleteFilter = ()=>{
            HandleDeleteFilter(index);
        };

        const HandlePreAddInfFilter = (e)=>{
            HandleAddInformacionFilter(elementValue)
        };

        const HandleAutoComplete = (e, value)=>{
            if(value === '' || value === null){
                setElementValue({...elementValue, idElement:'', labelElement:'', valorElement:''});
            }else{ 
                const arrFilHeaders = headersColumn.filter(value2=> value2.label === value);
                if(arrFilHeaders.length > 0){
                    setElementValue({...elementValue, idElement:arrFilHeaders[0].id.toString(), labelElement:value, type:arrFilHeaders[0].type.toString()});
                }
                
            }
            
        };

        const HandleSelectElement = (e)=>{
            setElementValue({...elementValue, selectElement:e.target.value});
        };

        if(index === 0){
            return( 
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  key={`ElementMenu-Filtrado-${index}`}>
                    <Grid container justify='center' spacing={1}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingTop:12}}>
                            <Autocomplete
                                id={`idElement-${index}`}
                                options={headersColumn}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} label="Columna" fullWidth variant="outlined" />}
                                inputValue={elementValue.labelElement || ''}
                                
                                onInputChange={HandleAutoComplete}
                                size='small'
                            />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                            {
                                elementValue.type === 'number' ?
                                <TextField 
                                    id={`valorElement-${index}`}
                                    value={elementValue.valorElement ||''}
                                    onChange={HandleElementValue}
                                    fullWidth
                                    margin='dense'
                                    label='Valor'
                                    variant='outlined'
                                    onBlur={HandlePreAddInfFilter}
                                    type='number'
                                />: elementValue.type === 'date' ?
                                <TextField 
                                    id={`valorElement-${index}`}
                                    value={elementValue.valorElement ||''}
                                    onChange={HandleElementValue}
                                    fullWidth
                                    margin='dense'
                                    variant='outlined'
                                    onBlur={HandlePreAddInfFilter}
                                    type='date'
                                />: 
                                <TextField 
                                    id={`valorElement-${index}`}
                                    value={elementValue.valorElement ||''}
                                    onChange={HandleElementValue}
                                    fullWidth
                                    margin='dense'
                                    label='Valor'
                                    variant='outlined'
                                    onBlur={HandlePreAddInfFilter}
                                />
                            }
                        </Grid>
                        <Grid item xl={1} lg={2} md={2} sm={2} xs={2}>
                            <IconButton style={{marginTop:5}} onClick={HandleAddFilter}>
                                <AddIcon color='primary'/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }else{ 
            return(
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={`ElementMenu-Filtrado-${index}`}>
                    <Grid container justify='center' spacing={1} >
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingTop:12}}>
                            <Autocomplete
                                id={`idElement-${index}`}
                                options={headersColumn}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} label="Columna" fullWidth variant="outlined" />}
                                inputValue={elementValue.labelElement || ''}
                                
                                onInputChange={HandleAutoComplete}
                                size='small'
                            />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                            {
                                elementValue.type === 'number' ?
                                <TextField 
                                    id={`valorElement-${index}`}
                                    value={elementValue.valorElement ||''}
                                    onChange={HandleElementValue}
                                    fullWidth
                                    margin='dense'
                                    label='Valor'
                                    variant='outlined'
                                    onBlur={HandlePreAddInfFilter}
                                    type='number'
                                />:elementValue.type === 'date' ?
                                <TextField 
                                    id={`valorElement-${index}`}
                                    value={elementValue.valorElement ||''}
                                    onChange={HandleElementValue}
                                    fullWidth
                                    margin='dense'
                                    variant='outlined'
                                    onBlur={HandlePreAddInfFilter}
                                    type='date'
                                />:
                                <TextField 
                                    id={`valorElement-${index}`}
                                    value={elementValue.valorElement ||''}
                                    onChange={HandleElementValue}
                                    fullWidth
                                    margin='dense'
                                    label='Valor'
                                    variant='outlined'
                                    onBlur={HandlePreAddInfFilter}
                                />
                            }
                            
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                            <TextField
                                id={`selectElement-${index}`}
                                select
                                value={elementValue.selectElement || ''}
                                onChange={HandleSelectElement}
                                style={{marginTop:8}}
                                onBlur={HandlePreAddInfFilter}
                            >
                                <MenuItem value={'O'}>O</MenuItem>
                                <MenuItem value={'Y'}>Y</MenuItem>
                            </TextField>
                            <IconButton onClick={HandlePreDeleteFilter} style={{marginTop:5}} id={`bu-${index}`}>
                                <DeleteIcon style={{color:'red'}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>                                
            )
        }
    };

    const ExcelComponent = ({ data, titulo, headersColumn })=>{

        const ColumnasExcel = headersColumn.filter(value=> value.show).filter(value=> value.type !== 'image' && value.type !== 'action').map((value, index)=>{
                return(<ExcelColumn label={value.label} value={value.id} key={`fila${index}`}/>) 
        });

        return(
            <ExcelFile  filename="database.xlsx" element={titulo}>
                <ExcelSheet data={data} name="database">
                    { ColumnasExcel }
                </ExcelSheet>
            </ExcelFile >
        )
    };

    const PdfElement = ({data, headersColumn, HandleClickPdf})=>{

        Font.register({family: 'Oswald',src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'});

        Font.register({ family: 'Roboto-BlackCursive', src:'fonts/Roboto-BlackItalic.ttf'});

        const styles = StyleSheet.create({
            containerTable:{
                width: 808.5, 
                marginLeft:17.5,
            },
            table: {    
                display: "table", 
                width:'100%',
                borderRightWidth: 0, 
                borderBottomWidth: 0,
            },
            tableRowHeader: {
                marginTop:10,
                flexDirection: "row" ,
                backgroundColor:'#0E3B5F',
                color:'#fff',
            }, 
            tableCellHeader:{
                fontSize: 7,
                fontFamily: 'Roboto-BlackCursive',
            },
            tableRow: {
                flexDirection: "row" ,
                backgroundColor:'#E5E8E8',
                height:20
            }, 
            tableCell: { 
                width:'100%',
            },
            
        });

        const MyDoc = (
            <Document>
                <Page size="A4" orientation="landscape" wrap>
                    <View style={styles.containerTable} wrap>
                        <View style={styles.table} >
                            <View style={styles.tableRowHeader} fixed> 
                                {headersColumn.map((value, index)=>( 
                                    <Fragment>
                                        {   value.show &&
                                            <View style={{borderStyle:"solid", borderWidth:1, borderLeftWidth:0, borderTopWidth: 0, borderColor:'#fff', textAlign:value.align, display:'block', width:value.width, padding:'1px 0px'}} key={`theadcol${index}`}>
                                                <Text style={styles.tableCellHeader}> {value.label}</Text>
                                            </View>
                                        }
                                    </Fragment>
                                        
                                ))}
                            </View>
                            {
                                data.map((value,index)=>( 
                                    <View style={styles.tableRow} key={`row${index}`}> 
                                        {
                                            headersColumn.map((value2,index2)=>( 
                                                <Fragment>
                                                    {   value2.show &&
                                                        <View style={{borderStyle: "solid",  borderWidth: 1,  borderLeftWidth: 0,  borderTopWidth: 0,width: value2.width, borderColor:'#fff', display:'block', fontSize:parseInt(value2.fontSize.split('p')[0]) - 3, fontWeight:value2.bolder ? 'bolder' :'none', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden', textAlign:value2.align, padding:'1px 0px'}} key={`rows-${index}-${index2}`}>   
                                                            <Text style={styles.tableCell}>{value[value2.id] ? value[value2.id] : ''}</Text> 
                                                        </View>  
                                                    }
                                                </Fragment>                                     
                                            ))
                                        }
                                    </View>
                                ))
                            }
                    </View>
                    </View>
                </Page>
            </Document>
        );

        const [ instance ] = usePDF({ document: MyDoc });

        if (instance.loading) return <FacebookCircularProgress size={25}/>;

        if (instance.error) return <div>Something went wrong: {instance.error}</div>;


        return (
            <IconButton href={instance.url} download="CreativeDocument.pdf" onClick={HandleClickPdf}>
                <GetAppIcon />
            </IconButton>
        );
    };

    const Roow = memo((props)=>{
        const { row, index, headCells, HandleClickRow, selectionArr } = props;
        const [ statusRow, setStatusRow ] = useState(false);
        const [ continuoStatus, setContinuoStatus ] = useState(false);

        const HeadCellArr = headCells.map((value, index2)=>( 
            <Fragment key={`${index}_${index2}_${row.idGeneral}`} >
                { value.show &&
                    <TdYounet 
                        key={`${index}_${index2}_${row.idGeneral}_Td`}
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        fixed={value.fixed}
                        align={value.align}
                        fontSize={value.fontSize}
                        bolder={value.bolder}
                        backgroundColor={value.backgroundColor}
                    />
                }
            </Fragment>
        ));

        useEffect(()=>{
            const arr = [...selectionArr];
            const arrMap = arr.filter(el=>el.id === row.id);
            arrMap.length > 0 && setStatusRow(true);
        },[]);

        useEffect(()=>{
            if(continuoStatus){
                setContinuoStatus(false);
                if(statusRow){
                    HandleClickRow(statusRow, row)
                }else{
                    HandleClickRow(statusRow, row)
                }
            }
        },[continuoStatus]); // eslint-disable-line react-hooks/exhaustive-deps

        const HandlePreClickRow = ()=>{
            setStatusRow(!statusRow);
            setContinuoStatus(true);
        };

        return(
            <TrYounetStyled key={`fila-${row.idGeneral}`}  selected={statusRow}>
                <TdYounetStyled minWidth={60} width={60}>
                    <Checkbox
                        checked={statusRow}
                        color='primary'
                        onClick={HandlePreClickRow}
                        style={{marginTop:-10}}
                        size='small'
                    />
                </TdYounetStyled>
                { HeadCellArr }
            </TrYounetStyled>
        );
    });

    const RowHeadersStyle = memo(({rowInfo, HandleProcessHeaders})=>{

        const { id, numeric, disablePadding, label, show, fixed, width, num, align, fontSize, bolder, type } = rowInfo;
        const [ infoRow, setInfoRow ] = useState({ id, numeric, disablePadding, label, show, fixed, width, num, align, fontSize, bolder, type });

        const HandleInformacion = (e)=>{ setInfoRow({...infoRow, [e.target.name]:e.target.value}) };

        const HandleSwitch = (e)=>{setInfoRow({...infoRow, bolder:e.target.checked})};

        const HandleProcess = ()=>{HandleProcessHeaders(infoRow)};

        const handleChangeWidth = (e, value)=>{setInfoRow({...infoRow, width:value})};

        const HandleReset = ()=>{
            const element = headCellsColumn.filter(value=> value.id === rowInfo.id)[0];
            HandleProcessHeaders(element);
        };

        return(
            <Paper elevation={2} style={{width:'100%', padding:10}}>
                <Grid container spacing={1}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={2} style={{height:40}}>
                            <Grid item style={{marginTop:2}}>
                                <Button size='small' variant='contained' color='primary' onClick={HandleProcess} endIcon={<SaveIcon/>}> GUARDAR </Button> 
                            </Grid>
                            <Grid item style={{marginTop:2}}>
                                <Button size='small' variant='contained' color='primary' onClick={HandleReset} endIcon={<AutorenewIcon/>}> RESET </Button> 
                            </Grid>
                            <Grid item style={{textTransform:'uppercase', fontWeight:'bolder'}}>
                                <Chip label={rowInfo.label}  color='secondary'/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField 
                            id={`${rowInfo.id}_${rowInfo.label}`}
                            name={'align'}
                            value={infoRow.align ||''}
                            onChange={HandleInformacion}
                            fullWidth
                            margin='dense'
                            variant='outlined'
                            label='Alinear Texto'
                            select
                        >
                            <MenuItem  value={'left'}>
                                IZQUIERDA
                            </MenuItem>
                            <MenuItem  value={'center'}>
                                CENTRADO
                            </MenuItem>
                            <MenuItem  value={'right'}>
                                DERECHA
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField 
                            id={`${rowInfo.id}_${rowInfo.label}`}
                            name={'fontSize'}
                            value={infoRow.fontSize ||''}
                            onChange={HandleInformacion}
                            fullWidth
                            margin='dense'
                            variant='outlined'
                            label='Tamaño Texto'
                        />
                    </Grid>
                    <Grid item style={{width:100}}>
                        <Slider 
                            value={infoRow.width} 
                            onChange={handleChangeWidth} 
                            aria-labelledby="continuous-slider" 
                            step={5}
                            min={50}
                            max={600}
                        />
                        <p>Ancho:{infoRow.width}</p>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                            <Switch
                                checked={infoRow.bolder}
                                onChange={HandleSwitch}
                                id={`${rowInfo.id}_${rowInfo.label}`}
                                color="primary"
                            />
                            }
                            label={'Negritas'}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );      
    });


    const TablaSuperv = (props)=>{
        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;
        const { setOpen, setHeaderWord } = useAuth();
        const classes = useStyles();
        const { enqueueSnackbar } = useSnackbar();
        const [ rows, setRows ] = useState([]);
        const [ backupsRow, setBackupsRow ] = useState([]);
        const [ order, setOrder] = useState('desc');
        const [ orderBy, setOrderBy] = useState('Ejecutiva');
        const [ page, setPage] = useState(0);
        const [ rowsPerPage, setRowsPerPage] = useState(11);
        const [ headersColumn, setHeadersColumn ] = useState(headCellsColumn);
        const [ openMenuColumn, setOpenMenuColumn ] = useState(null);
        const [ openMenuColumnFixed, setOpenMenuColumnFixed ] = useState(null);
        const [ PreCorreos, setPreCorreos ] = useState([]);
        const [ openPreCorreos, setOpenPreCorreos ] = useState(false);
        const [ isSaving, setSaving ] = useState(false);
        const [ isPreCorreoCreating, setPreCorreoCreating ] = useState(false);
        const [ selection, setSelection ] = useState([]);
        const [ isProcessingMail, setProcessingMail ] = useState(false);
        const [ isSavingHeaders, setSavingHeaders ] = useState(false);
        const [ openMenuFilter, setOpenMenuFilter ] = useState(false);
        const [ openMenuDate, setOpenMenuDate ] = useState(null);
        const [ openMenuPdf, setOpenMenuPdf ] = useState(null);
        const [ openMenuExcel, setOpenMenuExcel ] = useState(null);
        const [ openMenuStyles, setOpenMenuStyles ] = useState(false);
        const [ openMenuPosicion, setOpenMenuPosicion ] = useState(false);
        const [ arrFiltrado, setArrFiltrado ] = useState([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:'', type:''}]);
        const [ elementDate, setElementDate ] = useState({ idElement:'', labelElement:'', Inicio:'', Final:''});
        const [ isFilterDate, setFilterDate ] = useState(false);
        const [ isFilterNow, setFilterNow ] = useState(false);
        const [ isElementFilterShow, setElementFilterShow ] = useState(true);
        const [ rowsFilter, setRowsFilter ] = useState([]);
        const [ rowsFilterDate, setRowsFilterDate ] = useState([]);
        const [ selectionArr, setSelectionArr ] = useState([]);
        const [ isReadyPdf, setReadyPdf ] = useState(false);
        const [ isSelectPdf, setSelectPdf ] = useState(false);
        const [ isContinuoPdf, setContinuoPdf ] = useState(false);
        const [ arrHeadersPdf, setArrHeadersPdf ]= useState([])
        const [ openSelectPersonsMail, setOpenSelectPersonsMail ] = useState(false);
        const [ RemitentesDefined ] = useState([
            'isabel.penaherrera@creativegroup.com.ec',
            'nicolle.medina@creativegroup.com.ec',
            'dario.alvear@creativegroup.com.ec',
            'miguel.barcia@creativegroup.com.ec'
        ]);
        const [ RemitentesAll ] = useState([
            'isabel.penaherrera@creativegroup.com.ec',
            'nicolle.medina@creativegroup.com.ec',
            'diana.maldonado@creativegroup.com.ec',
            'maylin.prado@creativegroup.com.ec',
            'melanie.torres@creativegroup.com.ec',
            'deisy.rodriguez@creativegroup.com.ec',
            'katherine.mosquera@creativegroup.com.ec',
            'denisse.baldeon@creativegroup.com.ec',
            'dario.alvear@creativegroup.com.ec',
            'miguel.barcia@creativegroup.com.ec',
            

        ]);
        const [ Remitentes, setRemitentes ] = useState(RemitentesDefined);
        const [ isCharging, setCharging ] = useState(true);
        const [ openAddCol, setOpenAddCol ] = useState(false);
        const [ openDelCol, setOpenDelCol ] = useState(false);
        const [ NameCol, setNameCol ] = useState('');
        const [ arrHeadersDel, setArrHeadersDel ] = useState([]);
        const [ isFoundProject, setFoundProject ] = useState(false);
        const [ showOptions, setShowOptions ] = useState(false);
        const [ Datos, setDatos ] = useState({Proyecto:'', Cliente:'', Mercaderistas:[{Mercaderista:''}], numpro:'', NumMerc:'', TipTraArr:[{Tiptra:''}]});
        const [ searchBy, setSearchBy ] = useState('');
        const [ continuoProcess, setContinuoProcess ] = useState(false);
        const [ isResetNow, setResetNow ] = useState(false);
        const [ getOpciones, setOpciones ] = useState({
            Status:'TODOS', 
            Ejecutiva:[], 
            Coordinadora:[],
            tipoFiltro:'TODOS',
            Tipo:'', 
            isComparativo:null, 
            isAnual:null, 
            isEjecutiva:null, 
            isTotalFiltro:true, 
            MesesComparar:[],
            AnioInicio:'',
            AnioFinal:'',
            Anios: [],
            Porcentaje:true,
            Seleccionable:true,
            Proyeccion:true
        });
        const [ getOpcionesEjecutiva, setOpcionesEjecutiva ] = useState([]);
        const [ getCoordinadoras, setCoordinadoras ] = useState([]);
        const [ getObjectCoordinadoras, setObjectCoordinadoras ] = useState([]);
        //const [ getDataMatriz, setDataMatriz ] = useState([]);
        const [ getDataMatrizDet, setDataMatrizDet ] = useState([]);
        const [ getDataOp, setDataOp ] = useState([]);
        const [ getDataProcess, setDataProcess ] = useState([]);
        const [ getContinuoSelection, setContinuoSelection ] = useState(false);
        const [ getDataUsers, setDataUsers ] = useState([]);

        useEffect(()=>{
            const handleUseEffect = async ()=>{
                setOpen(false); 
                setHeaderWord('Reporteria/Resumido');
                setCharging(false);
                const getFUsers = await fetch('/UsersList')
                const getDUsers = await getFUsers.json();
                setDataUsers(getDUsers);
                const dataOp = await fetch('/fetch_oplist');
                const resultOp = await dataOp.json();
                setDataOp(resultOp);
                const dataMatriz =  await fetch('/fetch_Matriz');
                const resultMatriz = await dataMatriz.json();
                const arrDet = [];
                for(const u in resultMatriz){
                    const objeto = {...resultMatriz[u]};
                    for(const v in resultMatriz[u].formulario){
                        const objeto2 = {...resultMatriz[u].formulario[v]};
                        const objetoNew = {...objeto, ...objeto2};
                        arrDet.push(objetoNew);
                    }
                }
                setDataMatrizDet(arrDet);
                const arrEjecutivas = resultMatriz.map(el=>el.ejecutiva);
                const filEjecutivas = arrEjecutivas.filter(el=> el !== '' || el !== ' ' || el !== null || el !== undefined);
                const eje1 = filEjecutivas.filter((el, index)=> filEjecutivas.indexOf(el) === index);
                const eje2 = eje1.filter(el=> el !== undefined);
                setOpcionesEjecutiva(eje2);

                const arrObject = [];
                const arrAlone  = [];
                for(const y in eje2){
                    for(const x in getDUsers){
                        if(getDUsers[x].nombre === eje2[y]){
                          const objeto = {};
                          objeto.nombre = getDUsers[x].nombre;
                          objeto.coordinador = getDUsers[x].coordinador;
                          arrObject.push(objeto);
                          arrAlone.push(getDUsers[x].nombre)
                        }
                    }
                } ;
                const arr2 = eje2.map(el=>{
                    if(arrAlone.includes(el)){
                        const elem = arrObject.filter(el2=>el2.nombre === el)[0];
                        return elem;
                    }else{
                        const objeto = {};
                        objeto.nombre = el;
                        objeto.coordinador = 'NICOLLE MEDINA';
                        return objeto;
                    }
                })
                const arr3 = arr2.map(el=>el.coordinador);
                const arr4 = arr3.filter((el, index)=> arr3.indexOf(el) === index );
                setCoordinadoras(arr4);
               
                setObjectCoordinadoras(arr2)
            };
            
            handleUseEffect();

        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        useEffect(()=>{
            if(isProcessingMail){
                setProcessingMail(false);
                setOpenPreCorreos(true); 
                setPreCorreoCreating(false);
            }
        },[isProcessingMail]);

        useEffect(()=>{
            if(isContinuoPdf){
                setContinuoPdf(false);
                setReadyPdf(true);
            }
        },[isContinuoPdf]); // eslint-disable-line react-hooks/exhaustive-deps

        useEffect(()=>{
            if(continuoProcess){
                setContinuoProcess(false);
                setFoundProject(true);
                handleProcesarElementos();
            }
        },[continuoProcess]); // eslint-disable-line react-hooks/exhaustive-deps

        useEffect(()=>{
            if(getContinuoSelection){
                setContinuoSelection(false);
                setRows(backupsRow);
                setSavingHeaders(false);
            }
        },[getContinuoSelection])

        const handleClickMenu = (event) => { setOpenMenuColumn(event.currentTarget)};

        const handleClickMenuFixed = (event) => {setOpenMenuColumnFixed(event.currentTarget);};

        const handleClickMenuFilter = (event) => {
            setOpenMenuFilter(true);
            setElementFilterShow(true);
        };

        const handleClickMenuDate = (event) => {setOpenMenuDate(event.currentTarget);};

        const handleClickMenuPdf = (event) => {setOpenMenuPdf(event.currentTarget);};

        const handleClickMenuExcel = (event) => {setOpenMenuExcel(event.currentTarget);};

        const handleCloseMenu = () => {setOpenMenuColumn(null)};

        const handleCloseMenuFixed = () => { setOpenMenuColumnFixed(null) };

        const handleCloseMenuFilter = () => {
            setOpenMenuFilter(false);
            setElementFilterShow(false);
        };

        const handleCloseMenuDate = () => { setOpenMenuDate(null) };

        const handleCloseMenuPdf = ()=> { setOpenMenuPdf(null) };

        const handleCloseMenuExcel = ()=> { setOpenMenuExcel(null) };

        const handleRequestSort = useCallback((event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        },[order, orderBy])
            
        const handleChangePage = (event, newPage) => { setPage(newPage) };
        
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };
    
        const HandleChangeSwitch = (e)=>{
            const arrMap = headersColumn.map(value=>{
                if(value.id === e.target.name){
                    let objeto = {...value};
                    objeto.show = e.target.checked;
                    return objeto;
                }else{
                    return value;
                }
            });
            setHeadersColumn(arrMap);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrMap))
        };
        
        const ElementMenu = headersColumn.map((value,index)=>{
            return(
                <MenuItem key={`ElementMenu-${index}`}>
                    <FormControlLabel
                        control={
                        <Switch
                            checked={value.show}
                            onChange={HandleChangeSwitch}
                            name={value.id}
                            color="primary"
                        />
                        }
                        label={value.label}
                    />
                </MenuItem>
            )
            
        });

        const HandleChangeSwitchFixed = (e)=>{
            const arrMap = headersColumn.map(value=>{
                if(value.id === e.target.name){
                    let objeto = {...value};
                    objeto.fixed = e.target.checked;
                    return objeto;
                }else{
                    return value;
                }
            });
            setHeadersColumn(arrMap);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrMap))
            setSavingHeaders(true);
            setOpenMenuColumnFixed(false)
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000)
        };

        const ElementMenuFixed = headersColumn.map((value,index)=>( 
                <MenuItem key={`ElementMenuFixed-${index}`}>
                    <FormControlLabel
                        control={
                        <Switch
                            checked={value.fixed}
                            onChange={HandleChangeSwitchFixed}
                            name={value.id}
                            color="primary"
                        />
                        }
                        label={value.label}
                    />
                </MenuItem>
        ));

        const HandleAddInformacionFilter = useCallback((objeto)=>{
            const arrF = arrFiltrado.map((value,index)=> {
                if(objeto.numero === index){
                    return objeto
                }else{
                    return value
                }
            })
            setArrFiltrado(arrF);
        },[arrFiltrado]);

        const HandleDeleteFilter = useCallback((infElement)=>{ 
            const arrF = arrFiltrado.filter((value,index)=> infElement !== index);
            setArrFiltrado(arrF);
        },[arrFiltrado]);

        const HandleAddFilter = useCallback(()=>{
            const cant = arrFiltrado.length;
            setArrFiltrado([...arrFiltrado, {numero:cant, valueElement:'', idElement:'', labelElement:'', selectElement:'O'} ]);
        },[arrFiltrado]);

        const ElementMenuFilter = arrFiltrado.map((value,index)=>
            <FiltradoEl 
                key={`filterElement-${index}`} 
                index={index} 
                info={value} 
                HandleAddFilter={HandleAddFilter} 
                HandleDeleteFilter={HandleDeleteFilter}
                HandleAddInformacionFilter={HandleAddInformacionFilter}
                headersColumn={headersColumn}
        />);

        const HandleProcessFilterElement = ()=>{
            if(isFilterNow){
                let dataNow = [ ];
                arrFiltrado.forEach((value,index)=>{
                    if(index === 0){
                        if(value.type === 'number'){
                            backupsRow.forEach((value2)=>{
                                if(value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))) dataNow.push(value2);
                            });
                        }else if(value.type === 'text'){
                            backupsRow.forEach((value2)=>{
                                if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))) dataNow.push(value2);
                            });
                        }else{
                            backupsRow.forEach((value2)=>{
                                if(value2[value.idElement] && (value2[value.idElement].toString() === value.valorElement.toString()))  dataNow.push(value2);
                            });
                        }
                    }else{
                        if(value.type === 'number'){
                            if(value.selectElement === 'O'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))) dataNow.push(value2);
                                });
                            }else{
                                dataNow = dataNow.filter((value2)=>
                                    value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))
                                );
                            }
                        }else if(value.type === 'text'){
                            if(value.selectElement === 'O'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))) dataNow.push(value2);
                                });
                            }else{
                                dataNow = dataNow.filter((value2)=>
                                    value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))
                                );
                            }          
                        }else{
                            if(value.selectElement === 'O'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase()))  dataNow.push(value2);
                                });
                            }else{
                                dataNow = dataNow.filter((value2)=>
                                    value2[value.idElement] && (value2[value.idElement].toString() === value.valorElement.toString())
                                );
                            }
                                
                        }
                    }
                }); 
                let hash = {};
                dataNow = dataNow.filter(o => hash[o._id] ? false : hash[o._id] = true);
                setRows(dataNow);
                setRowsFilter(dataNow);
            }else{
                if(arrFiltrado[0].valorElement === ''){
                    setOpenMenuFilter(false);
                    setTimeout(()=>{
                        Swal.fire({
                            title:'NO HAY ELEMENTOS QUE FILTRAR',
                            toast:true,
                            confirmButtonColor:'#0E3B5F',
                        });
                    },200);
                    
                }else{
                    let dataNow = [ ];
                    arrFiltrado.forEach((value,index)=>{
                        if(index === 0){
                            if(value.type === 'number'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement] && (parseInt(value2[value.idElement]) === parseInt(value.valorElement))) dataNow.push(value2);
                                });
                            }else if(value.type === 'text'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))) dataNow.push(value2);
                                });
                            }else{
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement] && (value2[value.idElement].toString() === value.valorElement.toString()))  dataNow.push(value2);
                                });
                            }
                        }else{
                            if(value.type === 'number'){
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2[value.idElement] && (parseInt(value2[value.idElement]) === parseInt(value.valorElement))) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))
                                    );
                                }
                            }else if(value.idElement === 'text'){
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))
                                    );
                                } 
                            }else{
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase()))  dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        value2[value.idElement] && (value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase())
                                    );
                                }  
                            }
                        }
                    }); 
                    let hash = {};
                    dataNow = dataNow.filter(o => hash[o._id] ? false : hash[o._id] = true);
                    setFilterNow(true);
                    setRows(dataNow);
                    setRowsFilter(dataNow);
                }
            }
        };

        const HandleResetFilter = ()=>{
            setElementFilterShow(false);
            setArrFiltrado([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:'', type:''}])
            setFilterNow(false);
            if(isFilterDate){
                setRows(rowsFilterDate);
            }else{
                setRows(backupsRow);
            }
            setTimeout(()=>{
                setElementFilterShow(true);
            },1000)
        };

        const HandleAutoComplete = (e, value)=>{
            if(value === '' || value === null){
                setElementDate({...elementDate, idElement:'', labelElement:'', valorElement:''});
            }else{ 
                const arrFilHeaders = headersColumn.filter(value2=> value2.label === value);
                if(arrFilHeaders.length > 0){
                    setElementDate({...elementDate, idElement:arrFilHeaders[0].id.toString(), labelElement:value});
                }  
            }
            
        };

        const HandleClickRow = useCallback((statusRow, row)=>{
            if(statusRow){
                const arr = [...selectionArr];
                arr.push(row);
                setSelectionArr(arr);
            }else{
                const arr = selectionArr.filter(value=> value.id !== row.id);
                setSelectionArr(arr);
            }
        },[selectionArr]);

        const HandleExportSelectPdf = ()=>{
            if(selectionArr.length === 0){
                setOpenMenuPdf(null);
                Swal.fire({
                    title:'NO HAY ELEMENTOS A EXPORTAR',
                    toast:true,
                    confirmButtonColor:'#0E3B5F',
                });
            }else{
                if(isReadyPdf){
                    const FiltHeaders = headersColumn.filter(value=> value.show);
                    const FiltHeaders1 = FiltHeaders.filter(value=> value.id !== 'Action');
                    const FiltHeaders2 = FiltHeaders1.filter(value=> value.id !== 'Fotos');
                    setArrHeadersPdf(FiltHeaders2);
                    setReadyPdf(false);
                    setSelectPdf(true);
                    setContinuoPdf(true);
                }else{
                    const FiltHeaders = headersColumn.filter(value=> value.show);
                    const FiltHeaders1 = FiltHeaders.filter(value=> value.id !== 'Action');
                    const FiltHeaders2 = FiltHeaders1.filter(value=> value.id !== 'Fotos');
                    setArrHeadersPdf(FiltHeaders2);
                    setSelectPdf(true);
                    setContinuoPdf(true);
                }
                
            }
        };

        const HandleExportAllPdf = ()=>{
            if(isReadyPdf){
                const FiltHeaders = headersColumn.filter(value=> value.show);
                const FiltHeaders1 = FiltHeaders.filter(value=> value.id !== 'Action');
                const FiltHeaders2 = FiltHeaders1.filter(value=> value.id !== 'Fotos');
                setArrHeadersPdf(FiltHeaders2);
                setReadyPdf(false);
                setSelectPdf(false);
                setContinuoPdf(true);
            }else{
                const FiltHeaders = headersColumn.filter(value=> value.show);
                const FiltHeaders1 = FiltHeaders.filter(value=> value.id !== 'Action');
                const FiltHeaders2 = FiltHeaders1.filter(value=> value.id !== 'Fotos');
                setArrHeadersPdf(FiltHeaders2);
                setSelectPdf(false);
                setContinuoPdf(true);
                
            }
        };

        const HandleClickPdf = useCallback(()=>{
            setTimeout(()=>{
                setReadyPdf(false);
            },2000)
        },[]);

        const handleCloseSelectPersonsMail = ()=>{
            setOpenSelectPersonsMail(false);
            setSaving(false);
            setRemitentes(RemitentesDefined);
        };

        const HandleRemitentes = (e, value)=>{ setRemitentes(value) };

        const HandleSelectPersonsMail = ()=>{
            if(selection.length > 0){
                setSaving(true);
                setOpenSelectPersonsMail(true);
            }else{
                enqueueSnackbar('SELECCIONE UN CORREO POR LO MENOS', {variant:'info'});
            }
            
        };

        const HandleShowCorreosCreated = ()=>{
            setPreCorreoCreating(true);
            const arrFil = rows.filter(value=> value.Status === 'En Proceso');
            const arrFil2 = rows.filter(value=> value.Status === 'Concluido');
            const arrResult = arrFil.concat(arrFil2);
            setPreCorreos(arrResult);
            setTimeout(()=>{
                setProcessingMail(true);
            },500);
        };

        const HandleSendCorreos = ()=>{
            setOpenSelectPersonsMail(false);
            const arrFil = PreCorreos.filter((value,index)=>selection.includes(index));
            fetch('/CorreosSupervisoresGarantias',{ 
                method: 'POST',
                body: JSON.stringify({ELEMENTOS:arrFil, Remitentes}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Correos Enviados', {variant:'success'});
                setTimeout(()=>{
                    setSaving(false);
                },1000)
                
            });
        };
        
        const HandleProcessHeaders = useCallback((dataHeadersStyle)=>{
            const headersResultStyles = headersColumn.map(value=>{
                if(value.id === dataHeadersStyle.id){
                    return dataHeadersStyle;
                }else{
                    return value;
                }
            });
            setHeadersColumn(headersResultStyles);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(headersResultStyles))
            setSavingHeaders(true);
            setOpenMenuStyles(false)
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        },[headersColumn]);

        const ElementMenuStyles = headersColumn.map((value,index)=>( 
            <Grid item key={`ElementMenuStyles_${index}`} xl={12} lg={12} md={12} sm={12} xs={12} >
                <RowHeadersStyle rowInfo={value} HandleProcessHeaders={HandleProcessHeaders}/>
            </Grid>
                
        ));

        const handleOpenMenuStyles = ()=>{ setOpenMenuStyles(true) };

        const handleCloseMenuStyles = ()=>{ setOpenMenuStyles(false) };

        const HandleHeadersPosicion = (e)=>{
            const idEl = e.target.id.split('_')[0];
            const arr =  headersColumn.map(value=>{
                if(value.id.toString() === idEl.toString()){
                    const objeto = {...value};
                    objeto.num = e.target.value;
                    return objeto;
                }else{
                    return value;
                }
            })
            setHeadersColumn(arr);
        };

        const ElementMenuPosicion = headersColumn.map((value,index)=>( 
            <Grid item style={{width:100}} key={`ElementFixed_${index}`}>
                <TextField 
                    id={`${value.id}_${value.num}`}
                    name={'num'}
                    value={value.num ||''}
                    onChange={HandleHeadersPosicion}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    label={value.label}
                />
            </Grid>
        ));

        const handleClickMenuPosicion = () => { setOpenMenuPosicion(true)};
        
        const handleCloseMenuPosicion = ()=> { setOpenMenuPosicion(false) };

        const HandleResetPosicion = ()=>{
            const headersResultStyles = [];
            headersColumn.forEach(value=>{
                headCellsColumn.forEach(value2=>{
                    if(value.id === value2.id){
                        const objeto = {...value};
                        objeto.num = value2.num;
                        headersResultStyles.push(objeto);
                    }
                })
            })
            headersResultStyles.sort(function (a, b) {
                if (a.num > b.num) {
                  return 1;
                }
                if (a.num < b.num) {
                  return -1;
                }
                return 0;
            });
            setHeadersColumn(headersResultStyles);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(headersResultStyles));
            setOpenMenuPosicion(false);
            setSavingHeaders(true);
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        };

        const HandleProcessPosicion = ()=>{
            const headersResultStyles = [...headersColumn];
            headersResultStyles.sort(function (a, b) {
                if (a.num > b.num) {
                  return 1;
                }
                if (a.num < b.num) {
                  return -1;
                }
                return 0;
            });
            setHeadersColumn(headersResultStyles);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(headersResultStyles))
            setSavingHeaders(true);
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        };

        const handleOpenAddCol = ()=>{ setOpenAddCol(true) };

        const handleCloseAddCol = ()=>{ setOpenAddCol(false) };
        
        const handleAddColumn = ()=>{
            setOpenAddCol(false);
            const headersResultStyles = [...headersColumn];
            const objeto = {...colBasic};
            objeto.id = NameCol;
            objeto.label = NameCol;
            objeto.num = headersResultStyles.length;
            headersResultStyles.push(objeto);
            setHeadersColumn(headersResultStyles);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(headersResultStyles))
            setSavingHeaders(true);
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        };

        const handleNameCol = (e)=>{ setNameCol(e.target.value) };

        const handleOpenDelCol = ()=>{ setOpenDelCol(true) };

        const handleCloseDelCol = ()=>{ setOpenDelCol(false) };

        const handleDeleteColumn = ()=>{
            setOpenDelCol(false);
            const arrHeadDelNum = arrHeadersDel.map(val=> parseInt(val));
            const arrSet = headersColumn.filter(val=> !arrHeadDelNum.includes(val.num));
            const arrSetOrder = arrSet.map((val,index)=>{
                const objeto = {...val};
                objeto.num = index;
                return objeto
            });
            setHeadersColumn(arrSetOrder);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrSetOrder))
            setSavingHeaders(true);
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        };

        const handleCheckedCol = (e)=>{
            if(e.target.checked){
                setArrHeadersDel([...arrHeadersDel, e.target.name ]);
            }else{
                const arrHeaDel = arrHeadersDel.filter(val=> val.toString() !== e.target.name);
                setArrHeadersDel(arrHeaDel);
            }
        };

        const handleShowOptions = ()=>{ setShowOptions(true) };

        const handleCloseOptions = ()=>{ setShowOptions(false) };

        const handleDatos = (e)=>{ setDatos({...Datos, [e.target.id]:e.target.value}) };

        const handleSearch = ()=>{
            if(Datos.numpro === '' && Datos.NumMerc === ''){
                enqueueSnackbar('CAMPO BUSQUEDA VACIO', {variant:'error'});
            }else if(searchBy === ''){
                enqueueSnackbar('SELECCIONE UN TIPO DE BUSQUEDA', {variant:'error'});
            }else{
                if(searchBy === 'NUMPRO'){
                    handleSearchNumpro()
                }else{
                    handleSearchNum()
                }
            }
        };
    
        const handleSearchNum = ()=>{
            fetch('/Mercaderistas/FindOneNum',{
                method: 'POST',
                body: JSON.stringify({NumMerc:parseInt(Datos.NumMerc)}),
                headers:{
                  'Content-Type':'application/json'
                }
            })
            .then(response=> response.json())
            .then(result =>{
                if(result.length > 0){
                    setDatos(result[0]);
                    enqueueSnackbar('PROJECT CHARGED',{variant:'info'});
                    setFoundProject(true);
                }else if(result.status){
                    enqueueSnackbar(result.status,{variant:'error'});
                }else{
                    enqueueSnackbar('NO EXISTE ESTE NUMERO EN LA DB',{variant:'error'});
                }
                
            });
        };
    
        const handleSearchNumpro = ()=>{
            fetch('/Mercaderistas/FindOneNumpro',{
                method: 'POST',
                body: JSON.stringify({numpro:parseInt(Datos.numpro)}),
                headers:{
                  'Content-Type':'application/json'
                }
            })
            .then(response=> response.json())
            .then(result =>{
                if(result.length > 0){
                    setDatos(result[0]);
                    enqueueSnackbar('PROJECT CHARGED',{variant:'info'});
                    setFoundProject(true);
                }else if(result.status){
                    enqueueSnackbar(result.status,{variant:'error'});
                }else{
                    enqueueSnackbar('NO EXISTE ESTE PPTO. EN LA DB',{variant:'error'});
                }
                
            })
        };
    
        const handleReset = ()=>{
            setResetNow(true);
            setSavingHeaders(true);
            setDatos({Proyecto:'', Cliente:'', Mercaderistas:[{Mercaderista:''}], numpro:'', NumMerc:'', TipTraArr:[{Tiptra:''}]});
            setSearchBy('');
            setHeadersColumn(headCellsColumn);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(headCellsColumn));
            setRows([]);
            setTimeout(()=>{
                setSavingHeaders(false);
                setResetNow(false);
            },2000);
        };

        const handlePreProcesar = ()=>{
            setSavingHeaders(true);
            setShowOptions(false);
            setHeadersColumn([]);
            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(headCellsColumn));
            setTimeout(()=>{
                setContinuoProcess(true);
            },500)
            
        };

        const handleProcesarElementos = ()=>{
            const dataArr = [...getDataProcess];
            switch(getOpciones.tipoFiltro){
                case 'EJECUTIVA':
                    const arrEje3 = dataArr.filter(el=> getOpciones.Ejecutiva.includes(el.ejecutiva)); //ARR ELEMENTOS APROBADOS FILTRADOS POR EJECUTIVA
                    switch(getOpciones.Tabla){
                        case 'COMPARATIVO':
                            const arrfilM = arrEje3.filter(el=> getOpciones.MesesComparar.includes(el.mesCreacion))
                            const arrInicio = arrfilM.filter(el=> el.anioCreacion.toString().trim() === getOpciones.AnioInicio.toString().trim());
                            const arrFinal  = arrfilM.filter(el=> el.anioCreacion.toString().trim() === getOpciones.AnioFinal.toString().trim());
                            const arrdata_0 = getOpciones.Ejecutiva.map(el=>{
                                const objeto = {};
                                objeto.Ejecutiva = el;
                                const filEjePro = getDataUsers.filter(el2=>el2.nombre === el);
                                for(const p in getOpciones.MesesComparar){
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    if(filEjePro.length > 0 ){
                                        const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                        if(arrProyecciones.length > 0){
                                            const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === anioIni.toString().trim());
                                            if(arrfilterYear.length > 0){
                                                const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                if(arrfilterMonth.length > 0){
                                                    const valProMonth = arrfilterMonth[0].valor;
                                                    const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valVaria  = parseFloat(valFilCliIni) - parseFloat(valProMonth);
                                                    objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioIni}`] = parseFloat(valProMonth).toFixed(2)
                                                    objeto[`Variacion_${mesComp}_${anioIni}`] = parseFloat(valVaria).toFixed(2)
                                                }else{
                                                    const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                                    objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                                objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                            }
                                        }else{
                                            const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                            objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                            objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                        }
                                    }else{
                                        const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                        const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                        const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                        const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                        objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                        objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                    }
                                }
                                for(const p in getOpciones.MesesComparar){
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;
                                    if(filEjePro.length > 0 ){
                                        const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                        if(arrProyecciones.length > 0){
                                            const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === anioFin.toString().trim());
                                            if(arrfilterYear.length > 0){
                                                const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                if(arrfilterMonth.length > 0){
                                                    const valProMonth = arrfilterMonth[0].valor;
                                                    const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valVaria  = parseFloat(valFilCliFin) - parseFloat(valProMonth);
                                                    objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioFin}`] = parseFloat(valProMonth).toFixed(2);
                                                    objeto[`Variacion_${mesComp}_${anioFin}`] = parseFloat(valVaria).toFixed(2);
                                                }else{
                                                    const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                                    objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                                objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                            }
                                        }else{
                                            const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                            const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                            objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                            objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                        }
                                    }else{
                                        const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                        const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                        const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                        const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                        objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                        objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                    }

                                }
                                return objeto;
                            });                    
                            const arrdata = arrdata_0.map((el,index)=>{
                                const objeto       = {...el};
                                const objetoReturn = {...el};
                                    delete objeto.Ejecutiva;
                                const arrObject = Object.values(objeto);
                                const infoEl = arrObject.length; 
                                const arrIni = [];
                                const arrFin = [];
                                for(let i = 0; i < infoEl / 2; i++){ //0 <3
                                    arrIni.push(arrObject[i]);
                                }
                                for(let o = infoEl / 2; o < infoEl; o++){
                                    arrFin.push(arrObject[o]);
                                }
                                const valNewArrIni = arrIni.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                const valNewArrFin = arrFin.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                    objetoReturn[`Total_${getOpciones.AnioInicio}`]= parseFloat(valNewArrIni).toFixed(2);
                                    objetoReturn[`Total_${getOpciones.AnioFinal}`]= parseFloat(valNewArrFin).toFixed(2);
                                const idElemento = Math.random();
                                    objetoReturn.idGeneral = idElemento;
                                    objetoReturn.id = idElemento;
                                return objetoReturn
                            })
                            let valInicio = 0;
                            let valFinal  = 0;
                            for(const x in arrdata){
                                const objetoData = {...arrdata[x]}
                                let valorInicio  = objetoData[`Total_${getOpciones.AnioInicio}`];
                                let valorFinal   = objetoData[`Total_${getOpciones.AnioFinal}`];
                                let valInicio_0  = parseFloat(valInicio) + parseFloat(valorInicio);
                                let valFinal_0   = parseFloat(valFinal) + parseFloat(valorFinal);
                                valInicio        = parseFloat(valInicio_0).toFixed(2);
                                valFinal         = parseFloat(valFinal_0).toFixed(2);
                            }
                            const arrDataNuevoPor = arrdata.map(el=>{
                                const objeto = {...el};
                                let valorInicio  = objeto[`Total_${getOpciones.AnioInicio}`];
                                let valorFinal   = objeto[`Total_${getOpciones.AnioFinal}`];
                                let calT1 = parseFloat(valorInicio) * parseFloat(100);
                                let calT2 = parseFloat(valorFinal) * parseFloat(100);
                                let divT1 = parseFloat(calT1) / parseFloat(valInicio);
                                let divT2 = parseFloat(calT2) / parseFloat(valFinal);
                                objeto[`Porcentaje_${getOpciones.AnioInicio}`] = isNaN(divT1) ? '0.00' : parseFloat(divT1).toFixed(2);
                                objeto[`Porcentaje_${getOpciones.AnioFinal}`]  = isNaN(divT2) ? '0.00' : parseFloat(divT2).toFixed(2);
                                return objeto;
                            })
                            const arrHeaders = [];
                            const objeto_cli = { };
                                objeto_cli.id       = 'Ejecutiva';
                                objeto_cli.label    = 'EJECUTIVA';
                                objeto_cli.numeric  = false;
                                objeto_cli.show     = true;
                                objeto_cli.fixed    = false;
                                objeto_cli.width    = 200;
                                objeto_cli.num      = 0;
                                objeto_cli.align    = 'left';
                                objeto_cli.fontSize = '10px';
                                objeto_cli.bolder   = false;
                                objeto_cli.type     = 'text';
                            arrHeaders.push(objeto_cli)
                            if(getOpciones.Porcentaje){
                                let numSum = 0;
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioIni}`;
                                        objeto_0.label    = `${anioIni} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }
                                    
                                }
                                const objeto_total5 = { };
                                    objeto_total5.id       = `Total_${getOpciones.AnioInicio}`;
                                    objeto_total5.label    = `${getOpciones.AnioInicio} TOTAL`;
                                    objeto_total5.numeric  = false;
                                    objeto_total5.show     = true;
                                    objeto_total5.fixed    = false;
                                    objeto_total5.width    = 100;
                                    objeto_total5.num      = 0;
                                    objeto_total5.align    = 'right';
                                    objeto_total5.fontSize = '10px';
                                    objeto_total5.bolder   = false;
                                    objeto_total5.type     = 'text';
                                arrHeaders.push(objeto_total5);
                                const objeto_porcentaje = { };
                                    objeto_porcentaje.id       = `Porcentaje_${getOpciones.AnioInicio}`;
                                    objeto_porcentaje.label    = `${getOpciones.AnioInicio} %`;
                                    objeto_porcentaje.numeric  = false;
                                    objeto_porcentaje.show     = true;
                                    objeto_porcentaje.fixed    = false;
                                    objeto_porcentaje.width    = 100;
                                    objeto_porcentaje.num      = 0;
                                    objeto_porcentaje.align    = 'right';
                                    objeto_porcentaje.fontSize = '10px';
                                    objeto_porcentaje.bolder   = false;
                                    objeto_porcentaje.type     = 'text';
                                arrHeaders.push(objeto_porcentaje);
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;  
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioFin}`;
                                        objeto_0.label    = `${anioFin} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                const objeto_total = { };
                                    objeto_total.id       = `Total_${getOpciones.AnioFinal}`;
                                    objeto_total.label    = `${getOpciones.AnioFinal} TOTAL`;
                                    objeto_total.numeric  = false;
                                    objeto_total.show     = true;
                                    objeto_total.fixed    = false;
                                    objeto_total.width    = 100;
                                    objeto_total.num      = 0;
                                    objeto_total.align    = 'right';
                                    objeto_total.fontSize = '10px';
                                    objeto_total.bolder   = false;
                                    objeto_total.type     = 'text';
                                arrHeaders.push(objeto_total)
                                const objeto_porcentaje2 = { };
                                    objeto_porcentaje2.id       = `Porcentaje_${getOpciones.AnioFinal}`;
                                    objeto_porcentaje2.label    = `${getOpciones.AnioFinal} %`;
                                    objeto_porcentaje2.numeric  = false;
                                    objeto_porcentaje2.show     = true;
                                    objeto_porcentaje2.fixed    = false;
                                    objeto_porcentaje2.width    = 100;
                                    objeto_porcentaje2.num      = 0;
                                    objeto_porcentaje2.align    = 'right';
                                    objeto_porcentaje2.fontSize = '10px';
                                    objeto_porcentaje2.bolder   = false;
                                    objeto_porcentaje2.type     = 'text';
                                    arrHeaders.push(objeto_porcentaje2);
                            }else{
                                let numSum = 0;
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioIni}`;
                                        objeto_0.label    = `${anioIni} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                numSum++;
                                const objeto_total5 = { };
                                    objeto_total5.id       = `Total_${getOpciones.AnioInicio}`;
                                    objeto_total5.label    = `${getOpciones.AnioInicio} TOTAL`;
                                    objeto_total5.numeric  = false;
                                    objeto_total5.show     = true;
                                    objeto_total5.fixed    = false;
                                    objeto_total5.width    = 100;
                                    objeto_total5.num      = numSum;
                                    objeto_total5.align    = 'right';
                                    objeto_total5.fontSize = '10px';
                                    objeto_total5.bolder   = false;
                                    objeto_total5.type     = 'text';
                                arrHeaders.push(objeto_total5)
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;  
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioFin}`;
                                        objeto_0.label    = `${anioFin} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                numSum++;
                                const objeto_total = { };
                                    objeto_total.id       = `Total_${getOpciones.AnioFinal}`;
                                    objeto_total.label    = `${getOpciones.AnioFinal} TOTAL`;
                                    objeto_total.numeric  = false;
                                    objeto_total.show     = true;
                                    objeto_total.fixed    = false;
                                    objeto_total.width    = 100;
                                    objeto_total.num      = numSum;
                                    objeto_total.align    = 'right';
                                    objeto_total.fontSize = '10px';
                                    objeto_total.bolder   = false;
                                    objeto_total.type     = 'text';
                                arrHeaders.push(objeto_total)
                            }
                            setRows(arrDataNuevoPor);
                            setBackupsRow(arrDataNuevoPor);
                            setHeadersColumn(arrHeaders);
                            getOpciones.Seleccionable && setSelectionArr(arrDataNuevoPor);
                            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeaders));
                            setTimeout(()=>{
                                setSavingHeaders(false);
                            },1000);
                            break;
                        default:
                            switch(getOpciones.Tipo){
                                case 'ANUAL':
                                    const arrfilAnual = arrEje3.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                                    const arrdataAnual_0 = getOpciones.Ejecutiva.map(el=>{
                                        const objeto = {};
                                        objeto.Ejecutiva = el;
                                        for(const p in Meses){
                                            let mesComp = Meses[p];
                                            const arrFilCli_2 = arrfilAnual.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                        }
                                        return objeto;
                                    })
                                    const arrdataAnual = arrdataAnual_0.map(el=>{
                                        const objeto       = {...el};
                                        const objetoReturn = {...el};
                                            delete objeto.Ejecutiva;
                                        const arrObject = Object.values(objeto);
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el.Ejecutiva);
                                        if(filEjePro.length > 0 ){
                                            const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                            if(arrProyecciones.length > 0){
                                                const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                if(arrfilterYear.length > 0){
                                                    const arrfilterMonth   = arrfilterYear.map(el=>el.valor);
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = arrfilterMonth.reduce((a,b)=> parseFloat(a) + parseFloat(b), 0);
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }else{
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = 0;
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }
                                            }else{
                                                const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                const valProyec = 0;
                                                const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                    objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                    objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                    objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                const idElemento = Math.random();
                                                    objetoReturn.idGeneral = idElemento;
                                                    objetoReturn.id = idElemento;
                                                return objetoReturn
                                            }
                                        }else{
                                            const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            const valProyec = 0;
                                            const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                            const idElemento = Math.random();
                                                objetoReturn.idGeneral = idElemento;
                                                objetoReturn.id = idElemento;
                                            return objetoReturn
                                        }
                                    })
                                    const arrHeadersAnual = [];
                                    const objeto_cliA = { };
                                        objeto_cliA.id       = 'Ejecutiva';
                                        objeto_cliA.label    = 'EJECUTIVA';
                                        objeto_cliA.numeric  = false;
                                        objeto_cliA.show     = true;
                                        objeto_cliA.fixed    = false;
                                        objeto_cliA.width    = 200;
                                        objeto_cliA.num      = 0;
                                        objeto_cliA.align    = 'left';;
                                        objeto_cliA.fontSize = '10px';
                                        objeto_cliA.bolder   = false;
                                        objeto_cliA.type     = 'text';
                                    arrHeadersAnual.push(objeto_cliA)
                                    let numSumA = 0;
                                    for(const p in Meses){
                                        numSumA++;
                                        let mesComp = Meses[p];
                                        const objeto_0A = { };
                                            objeto_0A.id       = `${mesComp}`;
                                            objeto_0A.label    = `${mesComp}`;
                                            objeto_0A.numeric  = false;
                                            objeto_0A.show     = true;
                                            objeto_0A.fixed    = false;
                                            objeto_0A.width    = 100;
                                            objeto_0A.num      = numSumA;
                                            objeto_0A.align    = 'right';
                                            objeto_0A.fontSize = '10px';
                                            objeto_0A.bolder   = false;
                                            objeto_0A.type     = 'text';
                                        arrHeadersAnual.push(objeto_0A)
                                    }
                                    numSumA++;
                                    const objeto_total = { };
                                        objeto_total.id       = 'Total';
                                        objeto_total.label    = 'TOTAL';
                                        objeto_total.numeric  = false;
                                        objeto_total.show     = true;
                                        objeto_total.fixed    = false;
                                        objeto_total.width    = 100;
                                        objeto_total.num      = numSumA;
                                        objeto_total.align    = 'right';
                                        objeto_total.fontSize = '10px';
                                        objeto_total.bolder   = false;
                                        objeto_total.type     = 'text';
                                    arrHeadersAnual.push(objeto_total);
                                    if(getOpciones.Proyeccion){
                                        numSumA++
                                        const objeto_total1 = { };
                                            objeto_total1.id       = 'Proyeccion';
                                            objeto_total1.label    = 'PROYECCION';
                                            objeto_total1.numeric  = false;
                                            objeto_total1.show     = true;
                                            objeto_total1.fixed    = false;
                                            objeto_total1.width    = 100;
                                            objeto_total1.num      = numSumA;
                                            objeto_total1.align    = 'right';
                                            objeto_total1.fontSize = '10px';
                                            objeto_total1.bolder   = false;
                                            objeto_total1.type     = 'text';
                                            objeto_total1.backgroundColor = '#aec0cf';
                                        numSumA++                                  
                                        const objeto_total2 = { };
                                            objeto_total2.id       = 'Variacion';
                                            objeto_total2.label    = 'VARIACION';
                                            objeto_total2.numeric  = false;
                                            objeto_total2.show     = true;
                                            objeto_total2.fixed    = false;
                                            objeto_total2.width    = 100;
                                            objeto_total2.num      = numSumA;
                                            objeto_total2.align    = 'right';
                                            objeto_total2.fontSize = '10px';
                                            objeto_total2.bolder   = false;
                                            objeto_total2.type     = 'text';
                                            objeto_total2.backgroundColor = '#aec0cf';
                                        arrHeadersAnual.push(objeto_total1)
                                        arrHeadersAnual.push(objeto_total2)
                                    }

                                    if(getOpciones.Porcentaje){
                                        numSumA++
                                        const objeto_porcentaje = { };
                                            objeto_porcentaje.id       = 'Porcentaje';
                                            objeto_porcentaje.label    = '%';
                                            objeto_porcentaje.numeric  = false;
                                            objeto_porcentaje.show     = true;
                                            objeto_porcentaje.fixed    = false;
                                            objeto_porcentaje.width    = 100;
                                            objeto_porcentaje.num      = numSumA;
                                            objeto_porcentaje.align    = 'right';
                                            objeto_porcentaje.fontSize = '10px';
                                            objeto_porcentaje.bolder   = false;
                                            objeto_porcentaje.type     = 'text';
                                        arrHeadersAnual.push(objeto_porcentaje);
                                        const valoresTotal = arrdataAnual.map(el=>el.Total);
                                        const valTotal_0 = valoresTotal.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        const valTotal = parseFloat(valTotal_0).toFixed(2);
                                        const arrdataAnualPorcentaje = arrdataAnual.map(el=>{
                                            const objeto = {...el};
                                            let valT = objeto.Total;
                                            let calT = parseFloat(valT) * parseFloat(100);
                                            let divT = parseFloat(calT) / parseFloat(valTotal);
                                            objeto.Porcentaje = isNaN(divT) ? '0.00' : parseFloat(divT).toFixed(2);
                                            return objeto;
                                        })
                                        setRows(arrdataAnualPorcentaje);
                                        setBackupsRow(arrdataAnualPorcentaje);
                                        setHeadersColumn(arrHeadersAnual);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnualPorcentaje);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);
                                    }else{
                                        setRows(arrdataAnual);
                                        setBackupsRow(arrdataAnual);     
                                        setHeadersColumn(arrHeadersAnual);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnual);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);    
                                    }                               
                                    break;
                                default:
                                    const arrfilAnual1 = arrEje3.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                                    const arrdataAnual1_0 = getOpciones.Ejecutiva.map(el=>{
                                        const objeto = {};
                                        objeto.Ejecutiva = el;
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el);
                                        for(const p in getOpciones.MesesComparar){
                                            let mesComp = getOpciones.MesesComparar[p];
                                            if(filEjePro.length > 0 ){
                                                const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                                if(arrProyecciones.length > 0){
                                                    const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                    if(arrfilterYear.length > 0){
                                                        const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                        if(arrfilterMonth.length > 0){
                                                            const valProMonth = arrfilterMonth[0].valor;
                                                            const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                            const valVaria  = parseFloat(valFilCliIni) - parseFloat(valProMonth);
                                                            objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                            objeto[`Proyeccion_${mesComp}`] = parseFloat(valProMonth).toFixed(2);
                                                            objeto[`Variacion_${mesComp}`] = parseFloat(valVaria).toFixed(2);                                                           
                                                        }else{
                                                            const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                            objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                            objeto[`Proyeccion_${mesComp}`] = 0;
                                                            objeto[`Variacion_${mesComp}`] = 0;
                                                        }
                                                    }else{
                                                        const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                        const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                        const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                        const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                        objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                        objeto[`Proyeccion_${mesComp}`] = 0;
                                                        objeto[`Variacion_${mesComp}`] = 0;
                                                    }
                                                }else{
                                                    const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}`] = 0;
                                                    objeto[`Variacion_${mesComp}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}`] = 0;
                                                objeto[`Variacion_${mesComp}`] = 0;
                                            }
                                            
                                        }
                                        return objeto;
                                    })
                                    const arrdataAnual1 = arrdataAnual1_0.map(el=>{
                                        const objeto       = {...el};
                                        const objetoReturn = {...el};
                                            delete objeto.Ejecutiva;
                                        const arrObject = Object.values(objeto);
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el.Ejecutiva);
                                        if(filEjePro.length > 0 ){
                                            const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                            if(arrProyecciones.length > 0){
                                                const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                if(arrfilterYear.length > 0){
                                                    const arrfilterMonth   = arrfilterYear.map(el=>el.valor);
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = arrfilterMonth.reduce((a,b)=> parseFloat(a) + parseFloat(b), 0);
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }else{
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = 0;
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }
                                            }else{
                                                const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                const valProyec = 0;
                                                const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                    objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                    objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                    objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                const idElemento = Math.random();
                                                    objetoReturn.idGeneral = idElemento;
                                                    objetoReturn.id = idElemento;
                                                return objetoReturn
                                            }
                                        }else{
                                            const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            const valProyec = 0;
                                            const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                            const idElemento = Math.random();
                                                objetoReturn.idGeneral = idElemento;
                                                objetoReturn.id = idElemento;
                                            return objetoReturn
                                        }
                                    })
                                    const arrHeadersAnual1 = [];
                                    const objeto_cliA1 = { };
                                        objeto_cliA1.id       = 'Ejecutiva';
                                        objeto_cliA1.label    = 'EJECUTIVA';
                                        objeto_cliA1.numeric  = false;
                                        objeto_cliA1.show     = true;
                                        objeto_cliA1.fixed    = false;
                                        objeto_cliA1.width    = 200;
                                        objeto_cliA1.num      = 0;
                                        objeto_cliA1.align    = 'left';;
                                        objeto_cliA1.fontSize = '10px';
                                        objeto_cliA1.bolder   = false;
                                        objeto_cliA1.type     = 'text';
                                    arrHeadersAnual1.push(objeto_cliA1)
                                    let numSumA1 = 0;
                                    for(const p in getOpciones.MesesComparar){
                                        numSumA1++;
                                        let mesComp = getOpciones.MesesComparar[p];
                                        const objeto_0A = { };
                                            objeto_0A.id       = `${mesComp}`;
                                            objeto_0A.label    = `${mesComp}`;
                                            objeto_0A.numeric  = false;
                                            objeto_0A.show     = true;
                                            objeto_0A.fixed    = false;
                                            objeto_0A.width    = 100;
                                            objeto_0A.num      = numSumA1;
                                            objeto_0A.align    = 'right';
                                            objeto_0A.fontSize = '10px';
                                            objeto_0A.bolder   = false;
                                            objeto_0A.type     = 'text';
                                        arrHeadersAnual1.push(objeto_0A);
                                        if(getOpciones.Proyeccion){
                                            numSumA1++;
                                            const objetoPro_0 = {
                                                id       : `Proyeccion_${mesComp}`,
                                                label    : `PROYECCION ${mesComp}`,
                                                numeric  : false,
                                                show     : true,
                                                fixed    : false,
                                                width    : 100,
                                                num      : numSumA1,
                                                align    : 'right',
                                                fontSize : '10px',
                                                bolder   : false,
                                                type     : 'text'
                                            };
                                            numSumA1++;
                                            const objetoVa_0 = {
                                                id       : `Variacion_${mesComp}`,
                                                label    : `VARIACION ${mesComp}`,
                                                numeric  : false,
                                                show     : true,
                                                fixed    : false,
                                                width    : 100,
                                                num      : numSumA1,
                                                align    : 'right',
                                                fontSize : '10px',
                                                bolder   : false,
                                                type     : 'text'
                                            };
                                            arrHeadersAnual1.push(objetoPro_0);
                                            arrHeadersAnual1.push(objetoVa_0);  
                                        }
  
                                    };
                                    numSumA1++;
                                    const objeto_total15 = { };
                                        objeto_total15.id       = 'Total';
                                        objeto_total15.label    = 'TOTAL';
                                        objeto_total15.numeric  = false;
                                        objeto_total15.show     = true;
                                        objeto_total15.fixed    = false;
                                        objeto_total15.width    = 100;
                                        objeto_total15.num      = numSumA1;
                                        objeto_total15.align    = 'right';
                                        objeto_total15.fontSize = '10px';
                                        objeto_total15.bolder   = false;
                                        objeto_total15.type     = 'text';
                                    arrHeadersAnual1.push(objeto_total15);
                                    if(getOpciones.Proyeccion){
                                        numSumA1++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion`,
                                            label    : `PROYECCION`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSumA1,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSumA1++;
                                        const objetoVa_0 = {
                                            id       : `Variacion`,
                                            label    : `VARIACION`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSumA1,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeadersAnual1.push(objetoPro_0);
                                        arrHeadersAnual1.push(objetoVa_0);
                                    }
                                    if(getOpciones.Porcentaje){
                                        numSumA1++;
                                        const objeto_porcentaje = { };
                                            objeto_porcentaje.id       = 'Porcentaje';
                                            objeto_porcentaje.label    = '%';
                                            objeto_porcentaje.numeric  = false;
                                            objeto_porcentaje.show     = true;
                                            objeto_porcentaje.fixed    = false;
                                            objeto_porcentaje.width    = 100;
                                            objeto_porcentaje.num      = numSumA1;
                                            objeto_porcentaje.align    = 'right';
                                            objeto_porcentaje.fontSize = '10px';
                                            objeto_porcentaje.bolder   = false;
                                            objeto_porcentaje.type     = 'text';
                                        arrHeadersAnual1.push(objeto_porcentaje);
                                        const valoresTotal = arrdataAnual1.map(el=> getOpciones.Proyeccion ? el.Variacion : el.Total);
                                        const valTotal_0 = valoresTotal.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        const valTotal = parseFloat(valTotal_0).toFixed(2);
                                        const arrdataAnualPorcentaje1 = arrdataAnual1.map(el=>{
                                            const objeto = {...el};
                                            let valT = getOpciones.Proyeccion ? el.Variacion : el.Total;
                                            let calT = parseFloat(valT) * parseFloat(100);
                                            let divT = parseFloat(calT) / parseFloat(valTotal);
                                            let newT = parseFloat(divT).toFixed(2);
                                            objeto.Porcentaje = newT === 'NaN' ? 0 : newT ;
                                            return objeto;
                                        })
                                        
                                        setRows(arrdataAnualPorcentaje1);
                                        setBackupsRow(arrdataAnualPorcentaje1);
                                        setHeadersColumn(arrHeadersAnual1);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnualPorcentaje1);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual1));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);
                                    }else{
                                        setRows(arrdataAnual1);
                                        setBackupsRow(arrdataAnual1);
                                        setHeadersColumn(arrHeadersAnual1);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnual1);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual1));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);
                                    }   
                                    }
                            break;
                    }
                    break;
                case 'COORDINADORA':
                    const arrCoor3 = dataArr.filter(el=>getOpciones.Coordinadora.includes(el.coordinadora));
                    switch(getOpciones.Tabla){
                        case 'COMPARATIVO':
                            const arrfilM = arrCoor3.filter(el=> getOpciones.MesesComparar.includes(el.mesCreacion))
                            const arrInicio = arrfilM.filter(el=> el.anioCreacion.toString().trim() === getOpciones.AnioInicio.toString().trim());
                            const arrFinal  = arrfilM.filter(el=> el.anioCreacion.toString().trim() === getOpciones.AnioFinal.toString().trim());
                            const arrdata_0 = getOpciones.Ejecutiva.map(el=>{
                                const objeto = {};
                                objeto.Ejecutiva = el;
                                const filEjePro = getDataUsers.filter(el2=>el2.nombre === el);
                                for(const p in getOpciones.MesesComparar){
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    if(filEjePro.length > 0 ){
                                        const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                        if(arrProyecciones.length > 0){
                                            const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === anioIni.toString().trim());
                                            if(arrfilterYear.length > 0){
                                                const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                if(arrfilterMonth.length > 0){
                                                    const valProMonth = arrfilterMonth[0].valor;
                                                    const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valVaria  = parseFloat(valFilCliIni) - parseFloat(valProMonth);
                                                    objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioIni}`] = parseFloat(valProMonth).toFixed(2)
                                                    objeto[`Variacion_${mesComp}_${anioIni}`] = parseFloat(valVaria).toFixed(2)
                                                }else{
                                                    const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                                    objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                                objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                            }
                                        }else{
                                            const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                            objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                            objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                        }
                                    }else{
                                        const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                        const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                        const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                        const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                        objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                        objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                    }
                                }
                                for(const p in getOpciones.MesesComparar){
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;
                                    if(filEjePro.length > 0 ){
                                        const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                        if(arrProyecciones.length > 0){
                                            const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === anioFin.toString().trim());
                                            if(arrfilterYear.length > 0){
                                                const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                if(arrfilterMonth.length > 0){
                                                    const valProMonth = arrfilterMonth[0].valor;
                                                    const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valVaria  = parseFloat(valFilCliFin) - parseFloat(valProMonth);
                                                    objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioFin}`] = parseFloat(valProMonth).toFixed(2);
                                                    objeto[`Variacion_${mesComp}_${anioFin}`] = parseFloat(valVaria).toFixed(2);
                                                }else{
                                                    const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                                    objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                                objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                            }
                                        }else{
                                            const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                            const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                            objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                            objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                        }
                                    }else{
                                        const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                        const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                        const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                        const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                        objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                        objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                    }

                                }
                                return objeto;
                            })
                            const arrdata = arrdata_0.map(el=>{
                                const objeto       = {...el};
                                const objetoReturn = {...el};
                                    delete objeto.Ejecutiva;
                                const arrObject = Object.values(objeto);
                                const infoEl = arrObject.length; 
                                const arrIni = [];
                                const arrFin = [];
                                for(let i = 0; i < infoEl / 2; i++){ //0 <3
                                    arrIni.push(arrObject[i]);
                                }
                                for(let o = infoEl / 2; o < infoEl; o++){
                                    arrFin.push(arrObject[o]);
                                }
                                const valNewArrIni = arrIni.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                const valNewArrFin = arrFin.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                    objetoReturn[`Total_${getOpciones.AnioInicio}`]= parseFloat(valNewArrIni).toFixed(2);
                                    objetoReturn[`Total_${getOpciones.AnioFinal}`]= parseFloat(valNewArrFin).toFixed(2);
                                const idElemento = Math.random();
                                    objetoReturn.idGeneral = idElemento;
                                    objetoReturn.id = idElemento;
                                return objetoReturn
                            });
                            let valInicio = 0;
                            let valFinal  = 0;
                            for(const x in arrdata){
                                const objetoData = {...arrdata[x]}
                                let valorInicio  = objetoData[`Total_${getOpciones.AnioInicio}`];
                                let valorFinal   = objetoData[`Total_${getOpciones.AnioFinal}`];
                                let valInicio_0  = parseFloat(valInicio) + parseFloat(valorInicio);
                                let valFinal_0   = parseFloat(valFinal) + parseFloat(valorFinal);
                                valInicio        = parseFloat(valInicio_0).toFixed(2);
                                valFinal         = parseFloat(valFinal_0).toFixed(2);
                            }
                            const arrDataNuevoPor = arrdata.map(el=>{
                                const objeto = {...el};
                                let valorInicio  = objeto[`Total_${getOpciones.AnioInicio}`];
                                let valorFinal   = objeto[`Total_${getOpciones.AnioFinal}`];
                                let calT1 = parseFloat(valorInicio) * parseFloat(100);
                                let calT2 = parseFloat(valorFinal) * parseFloat(100);
                                let divT1 = parseFloat(calT1) / parseFloat(valInicio);
                                let divT2 = parseFloat(calT2) / parseFloat(valFinal);
                                objeto[`Porcentaje_${getOpciones.AnioInicio}`] = parseFloat(divT1).toFixed(2);
                                objeto[`Porcentaje_${getOpciones.AnioFinal}`]  = parseFloat(divT2).toFixed(2);
                                return objeto;
                            });
                            const arrHeaders = [];
                            const objeto_cli = { };
                                objeto_cli.id       = 'Ejecutiva';
                                objeto_cli.label    = 'EJECUTIVA';
                                objeto_cli.numeric  = false;
                                objeto_cli.show     = true;
                                objeto_cli.fixed    = false;
                                objeto_cli.width    = 200;
                                objeto_cli.num      = 0;
                                objeto_cli.align    = 'left';;
                                objeto_cli.fontSize = '10px';
                                objeto_cli.bolder   = false;
                                objeto_cli.type     = 'text';
                            arrHeaders.push(objeto_cli)
                            if(getOpciones.Porcentaje){
                                let numSum = 0;
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioIni}`;
                                        objeto_0.label    = `${anioIni} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                const objeto_total5 = { };
                                    objeto_total5.id       = `Total_${getOpciones.AnioInicio}`;
                                    objeto_total5.label    = `${getOpciones.AnioInicio} TOTAL`;
                                    objeto_total5.numeric  = false;
                                    objeto_total5.show     = true;
                                    objeto_total5.fixed    = false;
                                    objeto_total5.width    = 100;
                                    objeto_total5.num      = 0;
                                    objeto_total5.align    = 'right';
                                    objeto_total5.fontSize = '10px';
                                    objeto_total5.bolder   = false;
                                    objeto_total5.type     = 'text';
                                arrHeaders.push(objeto_total5);
                                const objeto_porcentaje = { };
                                    objeto_porcentaje.id       = `Porcentaje_${getOpciones.AnioInicio}`;
                                    objeto_porcentaje.label    = `${getOpciones.AnioInicio} %`;
                                    objeto_porcentaje.numeric  = false;
                                    objeto_porcentaje.show     = true;
                                    objeto_porcentaje.fixed    = false;
                                    objeto_porcentaje.width    = 100;
                                    objeto_porcentaje.num      = 0;
                                    objeto_porcentaje.align    = 'right';
                                    objeto_porcentaje.fontSize = '10px';
                                    objeto_porcentaje.bolder   = false;
                                    objeto_porcentaje.type     = 'text';
                                arrHeaders.push(objeto_porcentaje);
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;  
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioFin}`;
                                        objeto_0.label    = `${anioFin} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                const objeto_total = { };
                                    objeto_total.id       = `Total_${getOpciones.AnioFinal}`;
                                    objeto_total.label    = `${getOpciones.AnioFinal} TOTAL`;
                                    objeto_total.numeric  = false;
                                    objeto_total.show     = true;
                                    objeto_total.fixed    = false;
                                    objeto_total.width    = 100;
                                    objeto_total.num      = 0;
                                    objeto_total.align    = 'right';
                                    objeto_total.fontSize = '10px';
                                    objeto_total.bolder   = false;
                                    objeto_total.type     = 'text';
                                arrHeaders.push(objeto_total)
                                const objeto_porcentaje2 = { };
                                    objeto_porcentaje2.id       = `Porcentaje_${getOpciones.AnioFinal}`;
                                    objeto_porcentaje2.label    = `${getOpciones.AnioFinal} %`;
                                    objeto_porcentaje2.numeric  = false;
                                    objeto_porcentaje2.show     = true;
                                    objeto_porcentaje2.fixed    = false;
                                    objeto_porcentaje2.width    = 100;
                                    objeto_porcentaje2.num      = 0;
                                    objeto_porcentaje2.align    = 'right';
                                    objeto_porcentaje2.fontSize = '10px';
                                    objeto_porcentaje2.bolder   = false;
                                    objeto_porcentaje2.type     = 'text';
                                    arrHeaders.push(objeto_porcentaje2);
                            }else{
                                let numSum = 0;
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioIni}`;
                                        objeto_0.label    = `${anioIni} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                numSum++;
                                const objeto_total5 = { };
                                    objeto_total5.id       = `Total_${getOpciones.AnioInicio}`;
                                    objeto_total5.label    = `${getOpciones.AnioInicio} TOTAL`;
                                    objeto_total5.numeric  = false;
                                    objeto_total5.show     = true;
                                    objeto_total5.fixed    = false;
                                    objeto_total5.width    = 100;
                                    objeto_total5.num      = numSum;
                                    objeto_total5.align    = 'right';
                                    objeto_total5.fontSize = '10px';
                                    objeto_total5.bolder   = false;
                                    objeto_total5.type     = 'text';
                                arrHeaders.push(objeto_total5)
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;  
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioFin}`;
                                        objeto_0.label    = `${anioFin} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                numSum++;
                                const objeto_total = { };
                                    objeto_total.id       = `Total_${getOpciones.AnioFinal}`;
                                    objeto_total.label    = `${getOpciones.AnioFinal} TOTAL`;
                                    objeto_total.numeric  = false;
                                    objeto_total.show     = true;
                                    objeto_total.fixed    = false;
                                    objeto_total.width    = 100;
                                    objeto_total.num      = numSum;
                                    objeto_total.align    = 'right';
                                    objeto_total.fontSize = '10px';
                                    objeto_total.bolder   = false;
                                    objeto_total.type     = 'text';
                                arrHeaders.push(objeto_total);
                                if(getOpciones.Proyeccion){
                                    numSum++;
                                    const objetoPro_0 = {
                                        id       : `Proyeccion`,
                                        label    : `PROYECCION`,
                                        numeric  : false,
                                        show     : true,
                                        fixed    : false,
                                        width    : 100,
                                        num      : numSum,
                                        align    : 'right',
                                        fontSize : '10px',
                                        bolder   : false,
                                        type     : 'text'
                                    };
                                    numSum++;
                                    const objetoVa_0 = {
                                        id       : `Variacion`,
                                        label    : `VARIACION`,
                                        numeric  : false,
                                        show     : true,
                                        fixed    : false,
                                        width    : 100,
                                        num      : numSum,
                                        align    : 'right',
                                        fontSize : '10px',
                                        bolder   : false,
                                        type     : 'text'
                                    };
                                    arrHeaders.push(objetoPro_0);
                                    arrHeaders.push(objetoVa_0);
                                }
                                if(getOpciones.Porcentaje){
                                    numSum++;
                                    const objeto_porcentaje = { };
                                        objeto_porcentaje.id       = 'Porcentaje';
                                        objeto_porcentaje.label    = '%';
                                        objeto_porcentaje.numeric  = false;
                                        objeto_porcentaje.show     = true;
                                        objeto_porcentaje.fixed    = false;
                                        objeto_porcentaje.width    = 100;
                                        objeto_porcentaje.num      = numSum;
                                        objeto_porcentaje.align    = 'right';
                                        objeto_porcentaje.fontSize = '10px';
                                        objeto_porcentaje.bolder   = false;
                                        objeto_porcentaje.type     = 'text';
                                    arrHeaders.push(objeto_porcentaje);
                                    const valoresTotal = arrDataNuevoPor.map(el=> getOpciones.Proyeccion ? el.Variacion : el.Total);
                                    const valTotal_0 = valoresTotal.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                    const valTotal = parseFloat(valTotal_0).toFixed(2);
                                    const arrdataAnualPorcentaje1 = arrDataNuevoPor.map(el=>{
                                        const objeto = {...el};
                                        let valT = getOpciones.Proyeccion ? el.Variacion : el.Total;
                                        let calT = parseFloat(valT) * parseFloat(100);
                                        let divT = parseFloat(calT) / parseFloat(valTotal);
                                        let newT = parseFloat(divT).toFixed(2);
                                        objeto.Porcentaje = newT === 'NaN' ? 0 : newT ;
                                        return objeto;
                                    })
                                    
                                    setRows(arrdataAnualPorcentaje1);
                                    setBackupsRow(arrdataAnualPorcentaje1);
                                    setHeadersColumn(arrHeaders);
                                    getOpciones.Seleccionable && setSelectionArr(arrdataAnualPorcentaje1);
                                    window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeaders));
                                    setTimeout(()=>{
                                        setSavingHeaders(false);
                                    },1000);
                                }else{
                                    setRows(arrDataNuevoPor);
                                    setBackupsRow(arrDataNuevoPor);
                                    setHeadersColumn(arrHeaders);
                                    getOpciones.Seleccionable && setSelectionArr(arrDataNuevoPor);
                                    window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeaders));
                                    setTimeout(()=>{
                                        setSavingHeaders(false);
                                    },1000);
                                }  
                            }
                        default:
                            switch(getOpciones.Tipo){
                                case 'ANUAL':
                                    const arrfilAnual = arrCoor3.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                                    const arrdataAnual_0 = getOpciones.Ejecutiva.map(el=>{
                                        const objeto = {};
                                        objeto.Ejecutiva = el;
                                        for(const p in Meses){
                                            let mesComp = Meses[p];
                                            const arrFilCli_2 = arrfilAnual.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                        }
                                        return objeto;
                                    })
                                    const arrdataAnual = arrdataAnual_0.map(el=>{
                                        const objeto       = {...el};
                                        const objetoReturn = {...el};
                                            delete objeto.Ejecutiva;
                                        const arrObject = Object.values(objeto);
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el.Ejecutiva);
                                        if(filEjePro.length > 0 ){
                                            const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                            if(arrProyecciones.length > 0){
                                                const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                if(arrfilterYear.length > 0){
                                                    const arrfilterMonth   = arrfilterYear.map(el=>el.valor);
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = arrfilterMonth.reduce((a,b)=> parseFloat(a) + parseFloat(b), 0);
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }else{
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = 0;
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }
                                            }else{
                                                const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                const valProyec = 0;
                                                const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                    objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                    objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                    objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                const idElemento = Math.random();
                                                    objetoReturn.idGeneral = idElemento;
                                                    objetoReturn.id = idElemento;
                                                return objetoReturn
                                            }
                                        }else{
                                            const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            const valProyec = 0;
                                            const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                            const idElemento = Math.random();
                                                objetoReturn.idGeneral = idElemento;
                                                objetoReturn.id = idElemento;
                                            return objetoReturn
                                        }
                                    })
                                    const arrHeadersAnual = [];
                                    const objeto_cliA = { };
                                        objeto_cliA.id       = 'Ejecutiva';
                                        objeto_cliA.label    = 'EJECUTIVA';
                                        objeto_cliA.numeric  = false;
                                        objeto_cliA.show     = true;
                                        objeto_cliA.fixed    = false;
                                        objeto_cliA.width    = 200;
                                        objeto_cliA.num      = 0;
                                        objeto_cliA.align    = 'left';;
                                        objeto_cliA.fontSize = '10px';
                                        objeto_cliA.bolder   = false;
                                        objeto_cliA.type     = 'text';
                                    arrHeadersAnual.push(objeto_cliA)
                                    let numSumA = 0;
                                    for(const p in Meses){
                                        numSumA++;
                                        let mesComp = Meses[p];
                                        const objeto_0A = { };
                                            objeto_0A.id       = `${mesComp}`;
                                            objeto_0A.label    = `${mesComp}`;
                                            objeto_0A.numeric  = false;
                                            objeto_0A.show     = true;
                                            objeto_0A.fixed    = false;
                                            objeto_0A.width    = 100;
                                            objeto_0A.num      = numSumA;
                                            objeto_0A.align    = 'right';
                                            objeto_0A.fontSize = '10px';
                                            objeto_0A.bolder   = false;
                                            objeto_0A.type     = 'text';
                                        arrHeadersAnual.push(objeto_0A)
                                    }
                                    numSumA++;
                                    const objeto_total = { };
                                        objeto_total.id       = 'Total';
                                        objeto_total.label    = 'TOTAL';
                                        objeto_total.numeric  = false;
                                        objeto_total.show     = true;
                                        objeto_total.fixed    = false;
                                        objeto_total.width    = 100;
                                        objeto_total.num      = numSumA;
                                        objeto_total.align    = 'right';
                                        objeto_total.fontSize = '10px';
                                        objeto_total.bolder   = false;
                                        objeto_total.type     = 'text';
                                    arrHeadersAnual.push(objeto_total);
                                    if(getOpciones.Proyeccion){
                                        numSumA++
                                        const objeto_total1 = { };
                                            objeto_total1.id       = 'Proyeccion';
                                            objeto_total1.label    = 'PROYECCION';
                                            objeto_total1.numeric  = false;
                                            objeto_total1.show     = true;
                                            objeto_total1.fixed    = false;
                                            objeto_total1.width    = 100;
                                            objeto_total1.num      = numSumA;
                                            objeto_total1.align    = 'right';
                                            objeto_total1.fontSize = '10px';
                                            objeto_total1.bolder   = false;
                                            objeto_total1.type     = 'text';
                                            objeto_total1.backgroundColor = '#aec0cf';
                                        numSumA++                                  
                                        const objeto_total2 = { };
                                            objeto_total2.id       = 'Variacion';
                                            objeto_total2.label    = 'VARIACION';
                                            objeto_total2.numeric  = false;
                                            objeto_total2.show     = true;
                                            objeto_total2.fixed    = false;
                                            objeto_total2.width    = 100;
                                            objeto_total2.num      = numSumA;
                                            objeto_total2.align    = 'right';
                                            objeto_total2.fontSize = '10px';
                                            objeto_total2.bolder   = false;
                                            objeto_total2.type     = 'text';
                                            objeto_total2.backgroundColor = '#aec0cf';
                                        arrHeadersAnual.push(objeto_total1)
                                        arrHeadersAnual.push(objeto_total2)
                                    }

                                    if(getOpciones.Porcentaje){
                                        numSumA++
                                        const objeto_porcentaje = { };
                                            objeto_porcentaje.id       = 'Porcentaje';
                                            objeto_porcentaje.label    = '%';
                                            objeto_porcentaje.numeric  = false;
                                            objeto_porcentaje.show     = true;
                                            objeto_porcentaje.fixed    = false;
                                            objeto_porcentaje.width    = 100;
                                            objeto_porcentaje.num      = numSumA;
                                            objeto_porcentaje.align    = 'right';
                                            objeto_porcentaje.fontSize = '10px';
                                            objeto_porcentaje.bolder   = false;
                                            objeto_porcentaje.type     = 'text';
                                        arrHeadersAnual.push(objeto_porcentaje);
                                        const valoresTotal = arrdataAnual.map(el=>el.Total);
                                        const valTotal_0 = valoresTotal.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        const valTotal = parseFloat(valTotal_0).toFixed(2);
                                        const arrdataAnualPorcentaje = arrdataAnual.map(el=>{
                                            const objeto = {...el};
                                            let valT = objeto.Total;
                                            let calT = parseFloat(valT) * parseFloat(100);
                                            let divT = parseFloat(calT) / parseFloat(valTotal);
                                            objeto.Porcentaje = isNaN(divT) ? '0.00' : parseFloat(divT).toFixed(2);
                                            return objeto;
                                        })
                                        setRows(arrdataAnualPorcentaje);
                                        setBackupsRow(arrdataAnualPorcentaje);
                                        setHeadersColumn(arrHeadersAnual);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnualPorcentaje);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);
                                    }else{
                                        setRows(arrdataAnual);
                                        setBackupsRow(arrdataAnual);     
                                        setHeadersColumn(arrHeadersAnual);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnual);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);    
                                    }    
                                    break;
                                default:
                                    const arrfilAnual1 = arrCoor3.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                                    const arrdataAnual1_0 = getOpciones.Ejecutiva.map(el=>{
                                        const objeto = {};
                                        objeto.Ejecutiva = el;
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el);
                                        for(const p in getOpciones.MesesComparar){
                                            let mesComp = getOpciones.MesesComparar[p];
                                            if(filEjePro.length > 0 ){
                                                const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                                if(arrProyecciones.length > 0){
                                                    const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                    if(arrfilterYear.length > 0){
                                                        const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                        if(arrfilterMonth.length > 0){
                                                            const valProMonth = arrfilterMonth[0].valor;
                                                            const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                            const valVaria  = parseFloat(valFilCliIni) - parseFloat(valProMonth);
                                                            objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                            objeto[`Proyeccion_${mesComp}`] = parseFloat(valProMonth).toFixed(2);
                                                            objeto[`Variacion_${mesComp}`] = parseFloat(valVaria).toFixed(2);                                                           
                                                        }else{
                                                            const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                            objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                            objeto[`Proyeccion_${mesComp}`] = 0;
                                                            objeto[`Variacion_${mesComp}`] = 0;
                                                        }
                                                    }else{
                                                        const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                        const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                        const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                        const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                        objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                        objeto[`Proyeccion_${mesComp}`] = 0;
                                                        objeto[`Variacion_${mesComp}`] = 0;
                                                    }
                                                }else{
                                                    const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}`] = 0;
                                                    objeto[`Variacion_${mesComp}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}`] = 0;
                                                objeto[`Variacion_${mesComp}`] = 0;
                                            }
                                            
                                        }
                                        return objeto;
                                    })
                                    const arrdataAnual1 = arrdataAnual1_0.map(el=>{
                                        const objeto       = {...el};
                                        const objetoReturn = {...el};
                                            delete objeto.Ejecutiva;
                                        const arrObject = Object.values(objeto);
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el.Ejecutiva);
                                        if(filEjePro.length > 0 ){
                                            const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                            if(arrProyecciones.length > 0){
                                                const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                if(arrfilterYear.length > 0){
                                                    const arrfilterMonth   = arrfilterYear.map(el=>el.valor);
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = arrfilterMonth.reduce((a,b)=> parseFloat(a) + parseFloat(b), 0);
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }else{
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = 0;
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }
                                            }else{
                                                const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                const valProyec = 0;
                                                const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                    objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                    objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                    objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                const idElemento = Math.random();
                                                    objetoReturn.idGeneral = idElemento;
                                                    objetoReturn.id = idElemento;
                                                return objetoReturn
                                            }
                                        }else{
                                            const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            const valProyec = 0;
                                            const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                            const idElemento = Math.random();
                                                objetoReturn.idGeneral = idElemento;
                                                objetoReturn.id = idElemento;
                                            return objetoReturn
                                        }
                                    })
                                    const arrHeadersAnual1 = [];
                                    const objeto_cliA1 = { };
                                        objeto_cliA1.id       = 'Ejecutiva';
                                        objeto_cliA1.label    = 'EJECUTIVA';
                                        objeto_cliA1.numeric  = false;
                                        objeto_cliA1.show     = true;
                                        objeto_cliA1.fixed    = false;
                                        objeto_cliA1.width    = 200;
                                        objeto_cliA1.num      = 0;
                                        objeto_cliA1.align    = 'left';;
                                        objeto_cliA1.fontSize = '10px';
                                        objeto_cliA1.bolder   = false;
                                        objeto_cliA1.type     = 'text';
                                    arrHeadersAnual1.push(objeto_cliA1)
                                    let numSumA1 = 0;
                                    for(const p in getOpciones.MesesComparar){
                                        numSumA1++;
                                        let mesComp = getOpciones.MesesComparar[p];
                                        const objeto_0A = { };
                                            objeto_0A.id       = `${mesComp}`;
                                            objeto_0A.label    = `${mesComp}`;
                                            objeto_0A.numeric  = false;
                                            objeto_0A.show     = true;
                                            objeto_0A.fixed    = false;
                                            objeto_0A.width    = 100;
                                            objeto_0A.num      = numSumA1;
                                            objeto_0A.align    = 'right';
                                            objeto_0A.fontSize = '10px';
                                            objeto_0A.bolder   = false;
                                            objeto_0A.type     = 'text';
                                        arrHeadersAnual1.push(objeto_0A);
                                        if(getOpciones.Proyeccion){
                                            numSumA1++;
                                            const objetoPro_0 = {
                                                id       : `Proyeccion_${mesComp}`,
                                                label    : `PROYECCION ${mesComp}`,
                                                numeric  : false,
                                                show     : true,
                                                fixed    : false,
                                                width    : 100,
                                                num      : numSumA1,
                                                align    : 'right',
                                                fontSize : '10px',
                                                bolder   : false,
                                                type     : 'text'
                                            };
                                            numSumA1++;
                                            const objetoVa_0 = {
                                                id       : `Variacion_${mesComp}`,
                                                label    : `VARIACION ${mesComp}`,
                                                numeric  : false,
                                                show     : true,
                                                fixed    : false,
                                                width    : 100,
                                                num      : numSumA1,
                                                align    : 'right',
                                                fontSize : '10px',
                                                bolder   : false,
                                                type     : 'text'
                                            };                                     
                                            arrHeadersAnual1.push(objetoPro_0);
                                            arrHeadersAnual1.push(objetoVa_0);    
                                        }
                                    }
                                    numSumA1++;
                                    const objeto_total19 = { };
                                        objeto_total19.id       = 'Total';
                                        objeto_total19.label    = 'TOTAL';
                                        objeto_total19.numeric  = false;
                                        objeto_total19.show     = true;
                                        objeto_total19.fixed    = false;
                                        objeto_total19.width    = 100;
                                        objeto_total19.num      = numSumA1;
                                        objeto_total19.align    = 'right';
                                        objeto_total19.fontSize = '10px';
                                        objeto_total19.bolder   = false;
                                        objeto_total19.type     = 'text';
                                    arrHeadersAnual1.push(objeto_total19)
                                    setRows(arrdataAnual1);
                                    setBackupsRow(arrdataAnual1);
                                    setHeadersColumn(arrHeadersAnual1);
                                    getOpciones.Seleccionable && setSelectionArr(arrdataAnual1);
                                    window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual1));
                                    setTimeout(()=>{
                                        setSavingHeaders(false);
                                    },1000);
                                    break;
                                    }
                            break;
                    }
                    break;
                default:
                    const arrEjecutivasString = [...getOpcionesEjecutiva];
                    switch(getOpciones.Tabla){
                        case 'COMPARATIVO':
                            const arrfilM = dataArr.filter(el=> getOpciones.MesesComparar.includes(el.mesCreacion))
                            const arrInicio = arrfilM.filter(el=> el.anioCreacion.toString().trim() === getOpciones.AnioInicio.toString().trim());
                            const arrFinal  = arrfilM.filter(el=> el.anioCreacion.toString().trim() === getOpciones.AnioFinal.toString().trim());
                            const arrdata_0 = arrEjecutivasString.map(el=>{
                                const objeto = {};
                                objeto.Ejecutiva = el;
                                const filEjePro = getDataUsers.filter(el2=>el2.nombre === el);
                                for(const p in getOpciones.MesesComparar){
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    if(filEjePro.length > 0 ){
                                        const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                        if(arrProyecciones.length > 0){
                                            const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === anioIni.toString().trim());
                                            if(arrfilterYear.length > 0){
                                                const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                if(arrfilterMonth.length > 0){
                                                    const valProMonth = arrfilterMonth[0].valor;
                                                    const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valVaria  = parseFloat(valFilCliIni) - parseFloat(valProMonth);
                                                    objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioIni}`] = parseFloat(valProMonth).toFixed(2)
                                                    objeto[`Variacion_${mesComp}_${anioIni}`] = parseFloat(valVaria).toFixed(2)
                                                }else{
                                                    const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                                    objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                                const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                                objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                            }
                                        }else{
                                            const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                            objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                            objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                        }
                                    }else{
                                        const arrFilCli_0 = arrInicio.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                        const arrFilCli_1 = arrFilCli_0.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                        const arrFilCli = arrFilCli_1.map(el2=> el2.subFac);
                                        const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        objeto[`${mesComp}_${anioIni}`] = parseFloat(valFilCliIni).toFixed(2);
                                        objeto[`Proyeccion_${mesComp}_${anioIni}`] = 0;
                                        objeto[`Variacion_${mesComp}_${anioIni}`] = 0;
                                    }
                                }
                                for(const p in getOpciones.MesesComparar){
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;
                                    if(filEjePro.length > 0 ){
                                        const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                        if(arrProyecciones.length > 0){
                                            const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === anioFin.toString().trim());
                                            if(arrfilterYear.length > 0){
                                                const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                if(arrfilterMonth.length > 0){
                                                    const valProMonth = arrfilterMonth[0].valor;
                                                    const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valVaria  = parseFloat(valFilCliFin) - parseFloat(valProMonth);
                                                    objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioFin}`] = parseFloat(valProMonth).toFixed(2);
                                                    objeto[`Variacion_${mesComp}_${anioFin}`] = parseFloat(valVaria).toFixed(2);
                                                }else{
                                                    const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                                    objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                                const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                                objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                            }
                                        }else{
                                            const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                            const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                            objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                            objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                        }
                                    }else{
                                        const arrFilCli_2 = arrFinal.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                        const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                        const arrFilCli_4 = arrFilCli_3.map(el2=> el2.subFac);
                                        const valFilCliFin = arrFilCli_4.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        objeto[`${mesComp}_${anioFin}`] = parseFloat(valFilCliFin).toFixed(2);
                                        objeto[`Proyeccion_${mesComp}_${anioFin}`] = 0;
                                        objeto[`Variacion_${mesComp}_${anioFin}`] = 0;
                                    }

                                }
                                return objeto;
                            })
                            const arrdata = arrdata_0.map(el=>{
                                const objeto       = {...el};
                                const objetoReturn = {...el};
                                    delete objeto.Ejecutiva;
                                const arrObject = Object.values(objeto);
                                const infoEl = arrObject.length; 
                                const arrIni = [];
                                const arrFin = [];
                                for(let i = 0; i < infoEl / 2; i++){ //0 <3
                                    arrIni.push(arrObject[i]);
                                }
                                for(let o = infoEl / 2; o < infoEl; o++){
                                    arrFin.push(arrObject[o]);
                                }
                                const valNewArrIni = arrIni.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                const valNewArrFin = arrFin.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                    objetoReturn[`Total_${getOpciones.AnioInicio}`]= parseFloat(valNewArrIni).toFixed(2);
                                    objetoReturn[`Total_${getOpciones.AnioFinal}`]= parseFloat(valNewArrFin).toFixed(2);
                                const idElemento = Math.random();
                                    objetoReturn.idGeneral = idElemento;
                                    objetoReturn.id = idElemento;
                                return objetoReturn
                            })
                            let valInicio = 0;
                            let valFinal  = 0;
                            for(const x in arrdata){
                                const objetoData = {...arrdata[x]}
                                let valorInicio  = objetoData[`Total_${getOpciones.AnioInicio}`];
                                let valorFinal   = objetoData[`Total_${getOpciones.AnioFinal}`];
                                let valInicio_0  = parseFloat(valInicio) + parseFloat(valorInicio);
                                let valFinal_0   = parseFloat(valFinal) + parseFloat(valorFinal);
                                valInicio        = parseFloat(valInicio_0).toFixed(2);
                                valFinal         = parseFloat(valFinal_0).toFixed(2);
                            }
                            const arrDataNuevoPor = arrdata.map(el=>{
                                const objeto = {...el};
                                let valorInicio  = objeto[`Total_${getOpciones.AnioInicio}`];
                                let valorFinal   = objeto[`Total_${getOpciones.AnioFinal}`];
                                let calT1 = parseFloat(valorInicio) * parseFloat(100);
                                let calT2 = parseFloat(valorFinal) * parseFloat(100);
                                let divT1 = parseFloat(calT1) / parseFloat(valInicio);
                                let divT2 = parseFloat(calT2) / parseFloat(valFinal);
                                objeto[`Porcentaje_${getOpciones.AnioInicio}`] = isNaN(divT1) ? '0.00' : parseFloat(divT1).toFixed(2);
                                objeto[`Porcentaje_${getOpciones.AnioFinal}`]  = isNaN(divT2) ? '0.00' : parseFloat(divT2).toFixed(2);
                                return objeto;
                            })
                            const arrHeaders = [];
                            const objeto_cli = { };
                                objeto_cli.id       = 'Ejecutiva';
                                objeto_cli.label    = 'EJECUTIVA';
                                objeto_cli.numeric  = false;
                                objeto_cli.show     = true;
                                objeto_cli.fixed    = false;
                                objeto_cli.width    = 200;
                                objeto_cli.num      = 0;
                                objeto_cli.align    = 'left';;
                                objeto_cli.fontSize = '10px';
                                objeto_cli.bolder   = false;
                                objeto_cli.type     = 'text';
                            arrHeaders.push(objeto_cli)
                            if(getOpciones.Porcentaje){
                                let numSum = 0;
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioIni}`;
                                        objeto_0.label    = `${anioIni} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }
                                }
                                const objeto_total5 = { };
                                    objeto_total5.id       = `Total_${getOpciones.AnioInicio}`;
                                    objeto_total5.label    = `${getOpciones.AnioInicio} TOTAL`;
                                    objeto_total5.numeric  = false;
                                    objeto_total5.show     = true;
                                    objeto_total5.fixed    = false;
                                    objeto_total5.width    = 100;
                                    objeto_total5.num      = 0;
                                    objeto_total5.align    = 'right';
                                    objeto_total5.fontSize = '10px';
                                    objeto_total5.bolder   = false;
                                    objeto_total5.type     = 'text';
                                arrHeaders.push(objeto_total5);
                                const objeto_porcentaje = { };
                                    objeto_porcentaje.id       = `Porcentaje_${getOpciones.AnioInicio}`;
                                    objeto_porcentaje.label    = `${getOpciones.AnioInicio} %`;
                                    objeto_porcentaje.numeric  = false;
                                    objeto_porcentaje.show     = true;
                                    objeto_porcentaje.fixed    = false;
                                    objeto_porcentaje.width    = 100;
                                    objeto_porcentaje.num      = 0;
                                    objeto_porcentaje.align    = 'right';
                                    objeto_porcentaje.fontSize = '10px';
                                    objeto_porcentaje.bolder   = false;
                                    objeto_porcentaje.type     = 'text';
                                arrHeaders.push(objeto_porcentaje);
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;  
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioFin}`;
                                        objeto_0.label    = `${anioFin} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                const objeto_total = { };
                                    objeto_total.id       = `Total_${getOpciones.AnioFinal}`;
                                    objeto_total.label    = `${getOpciones.AnioFinal} TOTAL`;
                                    objeto_total.numeric  = false;
                                    objeto_total.show     = true;
                                    objeto_total.fixed    = false;
                                    objeto_total.width    = 100;
                                    objeto_total.num      = 0;
                                    objeto_total.align    = 'right';
                                    objeto_total.fontSize = '10px';
                                    objeto_total.bolder   = false;
                                    objeto_total.type     = 'text';
                                arrHeaders.push(objeto_total)
                                const objeto_porcentaje2 = { };
                                    objeto_porcentaje2.id       = `Porcentaje_${getOpciones.AnioFinal}`;
                                    objeto_porcentaje2.label    = `${getOpciones.AnioFinal} %`;
                                    objeto_porcentaje2.numeric  = false;
                                    objeto_porcentaje2.show     = true;
                                    objeto_porcentaje2.fixed    = false;
                                    objeto_porcentaje2.width    = 100;
                                    objeto_porcentaje2.num      = 0;
                                    objeto_porcentaje2.align    = 'right';
                                    objeto_porcentaje2.fontSize = '10px';
                                    objeto_porcentaje2.bolder   = false;
                                    objeto_porcentaje2.type     = 'text';
                                    arrHeaders.push(objeto_porcentaje2);
                            }else{
                                let numSum = 0;
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioIni = getOpciones.AnioInicio;
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioIni}`;
                                        objeto_0.label    = `${anioIni} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioIni}`,
                                            label    : `${anioIni} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                const objeto_total5 = { };
                                    objeto_total5.id       = `Total_${getOpciones.AnioInicio}`;
                                    objeto_total5.label    = `${getOpciones.AnioInicio} TOTAL`;
                                    objeto_total5.numeric  = false;
                                    objeto_total5.show     = true;
                                    objeto_total5.fixed    = false;
                                    objeto_total5.width    = 100;
                                    objeto_total5.num      = 0;
                                    objeto_total5.align    = 'right';
                                    objeto_total5.fontSize = '10px';
                                    objeto_total5.bolder   = false;
                                    objeto_total5.type     = 'text';
                                arrHeaders.push(objeto_total5)
                                for(const p in getOpciones.MesesComparar){
                                    numSum++;
                                    let mesComp = getOpciones.MesesComparar[p];
                                    let anioFin = getOpciones.AnioFinal;  
                                    const objeto_0 = { };
                                        objeto_0.id       = `${mesComp}_${anioFin}`;
                                        objeto_0.label    = `${anioFin} ${mesComp}`;
                                        objeto_0.numeric  = false;
                                        objeto_0.show     = true;
                                        objeto_0.fixed    = false;
                                        objeto_0.width    = 100;
                                        objeto_0.num      = numSum;
                                        objeto_0.align    = 'right';
                                        objeto_0.fontSize = '10px';
                                        objeto_0.bolder   = false;
                                        objeto_0.type     = 'text';
                                    arrHeaders.push(objeto_0);
                                    if(getOpciones.Proyeccion){
                                        numSum++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} PROYECCION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSum++;
                                        const objetoVa_0 = {
                                            id       : `Variacion_${mesComp}_${anioFin}`,
                                            label    : `${anioFin} VARIACION ${mesComp}`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSum,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeaders.push(objetoPro_0);
                                        arrHeaders.push(objetoVa_0);
                                    }

                                }
                                const objeto_total = { };
                                    objeto_total.id       = `Total_${getOpciones.AnioFinal}`;
                                    objeto_total.label    = `${getOpciones.AnioFinal} TOTAL`;
                                    objeto_total.numeric  = false;
                                    objeto_total.show     = true;
                                    objeto_total.fixed    = false;
                                    objeto_total.width    = 100;
                                    objeto_total.num      = 0;
                                    objeto_total.align    = 'right';
                                    objeto_total.fontSize = '10px';
                                    objeto_total.bolder   = false;
                                    objeto_total.type     = 'text';
                                arrHeaders.push(objeto_total)
                            }
                            setRows(arrDataNuevoPor);
                            setBackupsRow(arrDataNuevoPor);
                            setHeadersColumn(arrHeaders);
                            getOpciones.Seleccionable && setSelectionArr(arrDataNuevoPor);
                            window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeaders));
                            setTimeout(()=>{
                                setSavingHeaders(false);
                            },1000);
                            break;
                        default:
                            switch(getOpciones.Tipo){
                                case 'ANUAL':
                                    const arrfilAnual = dataArr.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                                    const arrdataAnual_0 = arrEjecutivasString.map(el=>{
                                        const objeto = {};
                                        objeto.Ejecutiva = el;
                                        for(const p in Meses){
                                            let mesComp = Meses[p];
                                            const arrFilCli_2 = arrfilAnual.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            objeto[`${mesComp}`] = parseFloat(valFilCliIni).toFixed(2);
                                        }
                                        return objeto;
                                    })
                                    const arrdataAnual = arrdataAnual_0.map(el=>{
                                        const objeto       = {...el};
                                        const objetoReturn = {...el};
                                            delete objeto.Ejecutiva;
                                        const arrObject = Object.values(objeto);
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el.Ejecutiva);
                                        if(filEjePro.length > 0 ){
                                            const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                            if(arrProyecciones.length > 0){
                                                const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                if(arrfilterYear.length > 0){
                                                    const arrfilterMonth   = arrfilterYear.map(el=>el.valor);
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = arrfilterMonth.reduce((a,b)=> parseFloat(a) + parseFloat(b), 0);
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }else{
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = 0;
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }
                                            }else{
                                                const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                const valProyec = 0;
                                                const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                    objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                    objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                    objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                const idElemento = Math.random();
                                                    objetoReturn.idGeneral = idElemento;
                                                    objetoReturn.id = idElemento;
                                                return objetoReturn
                                            }
                                        }else{
                                            const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            const valProyec = 0;
                                            const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                            const idElemento = Math.random();
                                                objetoReturn.idGeneral = idElemento;
                                                objetoReturn.id = idElemento;
                                            return objetoReturn
                                        }
                                        
                                    })
                                    const arrHeadersAnual = [];
                                    const objeto_cliA = { };
                                        objeto_cliA.id       = 'Ejecutiva';
                                        objeto_cliA.label    = 'EJECUTIVA';
                                        objeto_cliA.numeric  = false;
                                        objeto_cliA.show     = true;
                                        objeto_cliA.fixed    = false;
                                        objeto_cliA.width    = 200;
                                        objeto_cliA.num      = 0;
                                        objeto_cliA.align    = 'left';;
                                        objeto_cliA.fontSize = '10px';
                                        objeto_cliA.bolder   = false;
                                        objeto_cliA.type     = 'text';
                                    arrHeadersAnual.push(objeto_cliA)
                                    let numSumA = 0;
                                    for(const p in Meses){
                                        numSumA++;
                                        let mesComp = Meses[p];
                                        const objeto_0A = { };
                                            objeto_0A.id       = `${mesComp}`;
                                            objeto_0A.label    = `${mesComp}`;
                                            objeto_0A.numeric  = false;
                                            objeto_0A.show     = true;
                                            objeto_0A.fixed    = false;
                                            objeto_0A.width    = 100;
                                            objeto_0A.num      = numSumA;
                                            objeto_0A.align    = 'right';
                                            objeto_0A.fontSize = '10px';
                                            objeto_0A.bolder   = false;
                                            objeto_0A.type     = 'text';
                                        arrHeadersAnual.push(objeto_0A)
                                    }
                                    const objeto_total = { };
                                        objeto_total.id       = 'Total';
                                        objeto_total.label    = 'TOTAL';
                                        objeto_total.numeric  = false;
                                        objeto_total.show     = true;
                                        objeto_total.fixed    = false;
                                        objeto_total.width    = 100;
                                        objeto_total.num      = numSumA;
                                        objeto_total.align    = 'right';
                                        objeto_total.fontSize = '10px';
                                        objeto_total.bolder   = false;
                                        objeto_total.type     = 'text';
                                        objeto_total.backgroundColor = '#aec0cf'
                                    arrHeadersAnual.push(objeto_total)
                                    numSumA++
                                    const objeto_total1 = { };
                                        objeto_total1.id       = 'Proyeccion';
                                        objeto_total1.label    = 'PROYECCION';
                                        objeto_total1.numeric  = false;
                                        objeto_total1.show     = true;
                                        objeto_total1.fixed    = false;
                                        objeto_total1.width    = 100;
                                        objeto_total1.num      = numSumA;
                                        objeto_total1.align    = 'right';
                                        objeto_total1.fontSize = '10px';
                                        objeto_total1.bolder   = false;
                                        objeto_total1.type     = 'text';
                                        objeto_total1.backgroundColor = '#aec0cf';
                                    numSumA++                                  
                                    const objeto_total2 = { };
                                        objeto_total2.id       = 'Variacion';
                                        objeto_total2.label    = 'VARIACION';
                                        objeto_total2.numeric  = false;
                                        objeto_total2.show     = true;
                                        objeto_total2.fixed    = false;
                                        objeto_total2.width    = 100;
                                        objeto_total2.num      = numSumA;
                                        objeto_total2.align    = 'right';
                                        objeto_total2.fontSize = '10px';
                                        objeto_total2.bolder   = false;
                                        objeto_total2.type     = 'text';
                                        objeto_total2.backgroundColor = '#aec0cf';
                                    getOpciones.Proyeccion && arrHeadersAnual.push(objeto_total1)
                                    getOpciones.Proyeccion && arrHeadersAnual.push(objeto_total2)
                                    if(getOpciones.Porcentaje){
                                        numSumA++
                                        const objeto_porcentaje = { };
                                            objeto_porcentaje.id       = 'Porcentaje';
                                            objeto_porcentaje.label    = '%';
                                            objeto_porcentaje.numeric  = false;
                                            objeto_porcentaje.show     = true;
                                            objeto_porcentaje.fixed    = false;
                                            objeto_porcentaje.width    = 100;
                                            objeto_porcentaje.num      = numSumA;
                                            objeto_porcentaje.align    = 'right';
                                            objeto_porcentaje.fontSize = '10px';
                                            objeto_porcentaje.bolder   = false;
                                            objeto_porcentaje.type     = 'text';
                                        arrHeadersAnual.push(objeto_porcentaje);
                                        const valoresTotal = arrdataAnual.map(el=>getOpciones.Proyeccion ? el.Variacion : el.Total);
                                        const valTotal_0 = valoresTotal.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        const valTotal = parseFloat(valTotal_0).toFixed(2);
                                        const arrdataAnualPorcentaje = arrdataAnual.map(el=>{
                                            const objeto = {...el};
                                            let valT = objeto.Total;
                                            let calT = parseFloat(valT) * parseFloat(100);
                                            let divT = parseFloat(calT) / parseFloat(valTotal);
                                            objeto.Porcentaje = isNaN(divT) ? '0.00' : parseFloat(divT).toFixed(2);
                                            return objeto;
                                        })
                                        setRows(arrdataAnualPorcentaje);
                                        setBackupsRow(arrdataAnualPorcentaje);
                                        setHeadersColumn(arrHeadersAnual);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnualPorcentaje);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);
                                    }else{
                                        setRows(arrdataAnual);
                                        setBackupsRow(arrdataAnual);     
                                        setHeadersColumn(arrHeadersAnual);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnual);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);    
                                    }    
                                    break;
                                default:
                                    const arrfilAnual1 = dataArr.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                                    const arrdataAnual1_0 = arrEjecutivasString.map(el=>{
                                        const objeto = {};
                                        objeto.Ejecutiva = el;
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el);
                                        for(const p in getOpciones.MesesComparar){
                                            let mesComp = getOpciones.MesesComparar[p];
                                            if(filEjePro.length > 0 ){
                                                const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                                if(arrProyecciones.length > 0){
                                                    const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                    if(arrfilterYear.length > 0){
                                                        const arrfilterMonth   = arrfilterYear.filter(el=>el.mes.toString().toUpperCase().trim() === mesComp);
                                                        if(arrfilterMonth.length > 0){
                                                            const valProMonth = arrfilterMonth[0].valor;
                                                            const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                            const valVaria  = parseFloat(valFilCliIni) - parseFloat(valProMonth);
                                                            objeto[mesComp] = parseFloat(valFilCliIni).toFixed(2);
                                                            objeto[`Proyeccion_${mesComp}`] = parseFloat(valProMonth).toFixed(2);
                                                            objeto[`Variacion_${mesComp}`] = parseFloat(valVaria).toFixed(2);                                                           
                                                        }else{
                                                            const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                            const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                            const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                            const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                            objeto[mesComp] = parseFloat(valFilCliIni).toFixed(2);
                                                            objeto[`Proyeccion_${mesComp}`] = 0;
                                                            objeto[`Variacion_${mesComp}`] = 0;
                                                        }
                                                    }else{
                                                        const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                        const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                        const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                        const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                        objeto[mesComp] = parseFloat(valFilCliIni).toFixed(2);
                                                        objeto[`Proyeccion_${mesComp}`] = 0;
                                                        objeto[`Variacion_${mesComp}`] = 0;
                                                    }
                                                }else{
                                                    const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                    const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                    const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                    const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    objeto[mesComp] = parseFloat(valFilCliIni).toFixed(2);
                                                    objeto[`Proyeccion_${mesComp}`] = 0;
                                                    objeto[`Variacion_${mesComp}`] = 0;
                                                }
                                            }else{
                                                const arrFilCli_2 = arrfilAnual1.filter(el2=>el2.ejecutiva.toString().trim() == el.toString().trim());
                                                const arrFilCli_3 = arrFilCli_2.filter(el2=>el2.mesCreacion.toString().trim() == mesComp.toString().trim());
                                                const arrFilCli   = arrFilCli_3.map(el2=> el2.subFac);
                                                const valFilCliIni = arrFilCli.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                objeto[mesComp] = parseFloat(valFilCliIni).toFixed(2);
                                                objeto[`Proyeccion_${mesComp}`] = 0;
                                                objeto[`Variacion_${mesComp}`] = 0;
                                            }
                                            
                                        }
                                        return objeto;
                                    })
                                    const arrdataAnual1 = arrdataAnual1_0.map(el=>{
                                        const objeto       = {...el};
                                        const objetoReturn = {...el};
                                            delete objeto.Ejecutiva;
                                        const arrObject = Object.values(objeto);
                                        const filEjePro = getDataUsers.filter(el2=>el2.nombre === el.Ejecutiva);
                                        if(filEjePro.length > 0 ){
                                            const arrProyecciones = filEjePro[0].Proyecciones ? filEjePro[0].Proyecciones : [];
                                            if(arrProyecciones.length > 0){
                                                const arrfilterYear = arrProyecciones.filter(el=> el.Anio.toString().trim() === getOpciones.Anio.toString().trim());
                                                if(arrfilterYear.length > 0){
                                                    const arrfilterMonth   = arrfilterYear.map(el=>el.valor);
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = arrfilterMonth.reduce((a,b)=> parseFloat(a) + parseFloat(b), 0);
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }else{
                                                    const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                    const valProyec = 0;
                                                    const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                        objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                        objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                        objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                    const idElemento = Math.random();
                                                        objetoReturn.idGeneral = idElemento;
                                                        objetoReturn.id = idElemento;
                                                    return objetoReturn
                                                }
                                            }else{
                                                const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                                const valProyec = 0;
                                                const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                    objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                    objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                    objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                                const idElemento = Math.random();
                                                    objetoReturn.idGeneral = idElemento;
                                                    objetoReturn.id = idElemento;
                                                return objetoReturn
                                            }
                                        }else{
                                            const valNewArr = arrObject.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                            const valProyec = 0;
                                            const valVaria  = parseFloat(valNewArr) - parseFloat(valProyec);
                                                objetoReturn.Total = parseFloat(valNewArr).toFixed(2);
                                                objetoReturn.Proyeccion = parseFloat(valProyec).toFixed(2);;
                                                objetoReturn.Variacion = parseFloat(valVaria).toFixed(2);
                                            const idElemento = Math.random();
                                                objetoReturn.idGeneral = idElemento;
                                                objetoReturn.id = idElemento;
                                            return objetoReturn
                                        }
                                    })
                                    const arrHeadersAnual1 = [];
                                    const objeto_cliA1 = { };
                                        objeto_cliA1.id       = 'Ejecutiva';
                                        objeto_cliA1.label    = 'EJECUTIVA';
                                        objeto_cliA1.numeric  = false;
                                        objeto_cliA1.show     = true;
                                        objeto_cliA1.fixed    = false;
                                        objeto_cliA1.width    = 200;
                                        objeto_cliA1.num      = 0;
                                        objeto_cliA1.align    = 'left';;
                                        objeto_cliA1.fontSize = '10px';
                                        objeto_cliA1.bolder   = false;
                                        objeto_cliA1.type     = 'text';
                                    arrHeadersAnual1.push(objeto_cliA1)
                                    let numSumA1 = 0;
                                    for(const p in getOpciones.MesesComparar){
                                        numSumA1++;
                                        let mesComp = getOpciones.MesesComparar[p];
                                        const objeto_0A = { };
                                            objeto_0A.id       = mesComp;
                                            objeto_0A.label    = mesComp;
                                            objeto_0A.numeric  = false;
                                            objeto_0A.show     = true;
                                            objeto_0A.fixed    = false;
                                            objeto_0A.width    = 100;
                                            objeto_0A.num      = numSumA1;
                                            objeto_0A.align    = 'right';
                                            objeto_0A.fontSize = '10px';
                                            objeto_0A.bolder   = false;
                                            objeto_0A.type     = 'text';
                                            arrHeadersAnual1.push(objeto_0A);
                                            if(getOpciones.Proyeccion){
                                                numSumA1++;
                                                const objetoPro_0 = {
                                                    id       : `Proyeccion_${mesComp}`,
                                                    label    : `PROYECCION ${mesComp}`,
                                                    numeric  : false,
                                                    show     : true,
                                                    fixed    : false,
                                                    width    : 100,
                                                    num      : numSumA1,
                                                    align    : 'right',
                                                    fontSize : '10px',
                                                    bolder   : false,
                                                    type     : 'text'
                                                };
                                                numSumA1++;
                                                const objetoVa_0 = {
                                                    id       : `Variacion_${mesComp}`,
                                                    label    : `VARIACION ${mesComp}`,
                                                    numeric  : false,
                                                    show     : true,
                                                    fixed    : false,
                                                    width    : 100,
                                                    num      : numSumA1,
                                                    align    : 'right',
                                                    fontSize : '10px',
                                                    bolder   : false,
                                                    type     : 'text'
                                                };
                                                arrHeadersAnual1.push(objetoPro_0);
                                                arrHeadersAnual1.push(objetoVa_0);
                                            }
                                    }
                                    numSumA1++;
                                    const objeto_total22 = { };
                                        objeto_total22.id       = 'Total';
                                        objeto_total22.label    = 'TOTAL';
                                        objeto_total22.numeric  = false;
                                        objeto_total22.show     = true;
                                        objeto_total22.fixed    = false;
                                        objeto_total22.width    = 100;
                                        objeto_total22.num      = numSumA1;
                                        objeto_total22.align    = 'right';
                                        objeto_total22.fontSize = '10px';
                                        objeto_total22.bolder   = false;
                                        objeto_total22.type     = 'text';
                                        objeto_total22.backgroundColor = '#aec0cf';
                                    arrHeadersAnual1.push(objeto_total22);
                                    if(getOpciones.Proyeccion){
                                        numSumA1++;
                                        const objetoPro_0 = {
                                            id       : `Proyeccion`,
                                            label    : `PROYECCION`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSumA1,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        numSumA1++;
                                        const objetoVa_0 = {
                                            id       : `Variacion`,
                                            label    : `VARIACION`,
                                            numeric  : false,
                                            show     : true,
                                            fixed    : false,
                                            width    : 100,
                                            num      : numSumA1,
                                            align    : 'right',
                                            fontSize : '10px',
                                            bolder   : false,
                                            type     : 'text'
                                        };
                                        arrHeadersAnual1.push(objetoPro_0);
                                        arrHeadersAnual1.push(objetoVa_0);
                                    }
                                    if(getOpciones.Porcentaje){
                                        numSumA1++;
                                        const objeto_porcentaje = { };
                                            objeto_porcentaje.id       = 'Porcentaje';
                                            objeto_porcentaje.label    = '%';
                                            objeto_porcentaje.numeric  = false;
                                            objeto_porcentaje.show     = true;
                                            objeto_porcentaje.fixed    = false;
                                            objeto_porcentaje.width    = 100;
                                            objeto_porcentaje.num      = numSumA1;
                                            objeto_porcentaje.align    = 'right';
                                            objeto_porcentaje.fontSize = '10px';
                                            objeto_porcentaje.bolder   = false;
                                            objeto_porcentaje.type     = 'text';
                                        arrHeadersAnual1.push(objeto_porcentaje);
                                        const valoresTotal = arrdataAnual1.map(el=> getOpciones.Proyeccion ? el.Variacion : el.Total);
                                        const valTotal_0 = valoresTotal.reduce((a,b)=> parseFloat(a) + parseFloat(b) ,0);
                                        const valTotal = parseFloat(valTotal_0).toFixed(2);
                                        const arrdataAnualPorcentaje1 = arrdataAnual1.map(el=>{
                                            const objeto = {...el};
                                            let valT = getOpciones.Proyeccion ? el.Variacion : el.Total;
                                            let calT = parseFloat(valT) * parseFloat(100);
                                            let divT = parseFloat(calT) / parseFloat(valTotal);
                                            let newT = parseFloat(divT).toFixed(2);
                                            objeto.Porcentaje = newT === 'NaN' ? 0 : newT ;
                                            return objeto;
                                        })
                                        
                                        setRows(arrdataAnualPorcentaje1);
                                        setBackupsRow(arrdataAnualPorcentaje1);
                                        setHeadersColumn(arrHeadersAnual1);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnualPorcentaje1);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual1));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);
                                    }else{
                                        setRows(arrdataAnual1);
                                        setBackupsRow(arrdataAnual1);
                                        setHeadersColumn(arrHeadersAnual1);
                                        getOpciones.Seleccionable && setSelectionArr(arrdataAnual1);
                                        window.localStorage.setItem('headersReporteriaResumido', JSON.stringify(arrHeadersAnual1));
                                        setTimeout(()=>{
                                            setSavingHeaders(false);
                                        },1000);
                                    }    
                                    
                                    break;
                            }
                            break;
                    }
                    break;
            }
        };

        const handleProcesar = () =>{
            setShowOptions(false)
            Swal.fire({
                title: 'DESEA PROCESAR LA INFORMACION?',
                icon:'info',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonColor:'#005596',
                cancelButtonText:'NO',
                confirmButtonText:'SI',
                width:500,
            }).then((result)=>{
                if(result.isConfirmed){
                    setSavingHeaders(true);
                    switch(getOpciones.Status){
                        case 'ACTIVO':
                            const arrActivo = []; //ARR ELEMENTOS TOTALES
                            const arrFil1 = [];
                            for(const x in getDataOp){
                                const elNumpro = getDataOp[x].numpro;
                                const objeto3 = {...getDataOp[x]};
                                objeto3.idGeneral = getDataOp[x]._id;
                                objeto3.id = getDataOp[x]._id;
                                objeto3.coordinadora = (getObjectCoordinadoras.filter(el=>el.nombre === objeto3.ejecutiva)[0]).coordinador;
                                const arrFiltrado3 = getDataMatrizDet.filter(el=> el.numpro === elNumpro);
                                if(objeto3.StatusOp !== 'Anulado'){
                                    //if(getDataOp[x].ot === null || getDataOp[x].ot === undefined || getDataOp[x].ot === '' || getDataOp[x].ot === ' '){
                                        if(arrFiltrado3.length > 0){
                                            //if(arrFiltrado3[0].numFac === '' || arrFiltrado3[0].numFac === null || arrFiltrado3[0].numFac === undefined){
                                                const matFil = arrFiltrado3[0];
                                                if(matFil.numproDate){
                                                    if( matFil.numproDate !== '' || matFil.numproDate !== null || matFil.numproDate !== undefined){
                                                        const dCreacion = matFil.numproDate.toString().split('-');
                                                        objeto3.fcreacion = matFil.numproDate.toString().split('T')[0];
                                                        objeto3.anioCreacion = dCreacion[0];
                                                        objeto3.mesCreacion  = arrMeses[parseInt(dCreacion[1])];
                                                        objeto3.mesCreacionNum = dCreacion[1];
                                                        arrFil1.push(objeto3);
                                                    }
                                                }
                                            //}
                                        }
                                    //}
                                }
                                        
                            }
                            
                            for(const x in arrFil1){
                                const elNumpro = arrFil1[x].numpro;
                                const arrFiltrado3 = getDataMatrizDet.filter(el=> el.numpro === elNumpro);
                                let valSumado = 0;
                                if(arrFiltrado3.length > 0){
                                    const objeto3 = {...arrFil1[x]};
                                    for(const t in arrFiltrado3){
                                        let valT = arrFiltrado3[t].costotnet ? arrFiltrado3[t].costotnet === undefined ? 0 : arrFiltrado3[t].costotnet === null ? 0 : arrFiltrado3[t].costotnet === '' ? 0 : arrFiltrado3[t].costotnet === ' ' ? 0 : arrFiltrado3[t].costotnet : arrFiltrado3[t].costotnet;
                                        valSumado = parseFloat(valSumado) + parseFloat(valT);

                                    }
                                    objeto3.subFac = parseFloat(valSumado).toFixed(2) === 'NaN' ? '0.00' : parseFloat(valSumado).toFixed(2);
                                    arrActivo.push(objeto3);
                                }
                            }
                            setDataProcess(arrActivo);
                            setTimeout(()=>{
                                setContinuoProcess(true);
                            },500);
                            break;
                        case 'ANULADO':
                            const arrAnulado = []; //ARR ELEMENTOS ANULADOS 
                            const arrFil2 = [];
                            for(const x in getDataOp){
                                if(getDataOp[x].StatusOp === 'Anulado'){
                                    const objeto3 = {...getDataOp[x]};
                                    objeto3.idGeneral = getDataOp[x]._id;
                                    objeto3.id = getDataOp[x]._id;
                                    let dateCreacion = '2021-1-1'
                                    if(objeto3.creacion){
                                        dateCreacion = objeto3.creacion;
                                    }else{
                                        if(objeto3.fecer){
                                            if(objeto3.fecer !== ''){
                                                dateCreacion = objeto3.fecer;
                                            }
                                        }else{
                                            if(objeto3.feced){
                                                if(objeto3.feced !== ''){
                                                    dateCreacion = objeto3.feced;
                                                }
                                            }
                                        }
                                    }
                                    const dCreacion = dateCreacion.toString().split('-');
                                    objeto3.fcreacion = dateCreacion;
                                    objeto3.anioCreacion = dCreacion[0];
                                    objeto3.mesCreacion  = arrMeses[parseInt(dCreacion[1])];
                                    objeto3.mesCreacionNum = dCreacion[1];
                                    objeto3.coordinadora = (getObjectCoordinadoras.filter(el=>el.nombre === objeto3.ejecutiva)[0]).coordinador;
                                    arrFil2.push(objeto3);
                                }         
                            }
                            for(const x in arrFil2){
                                const elNumpro = arrFil2[x].numpro;
                                const arrFiltrado3 = getDataMatrizDet.filter(el=> el.numpro === elNumpro);
                                let valSumado = 0;
                                if(arrFiltrado3.length > 0){
                                    const objeto3 = {...arrFil2[x]};
                                    for(const t in arrFiltrado3){
                                        let valT = arrFiltrado3[t].costotnet ? arrFiltrado3[t].costotnet === undefined ? 0 : arrFiltrado3[t].costotnet === null ? 0 : arrFiltrado3[t].costotnet === '' ? 0 : arrFiltrado3[t].costotnet === ' ' ? 0 : arrFiltrado3[t].costotnet : arrFiltrado3[t].costotnet;
                                        valSumado = parseFloat(valSumado) + parseFloat(valT);

                                    }
                                    objeto3.subFac = parseFloat(valSumado).toFixed(2) === 'NaN' ? '0.00' : parseFloat(valSumado).toFixed(2);
                                    arrAnulado.push(objeto3);
                                }
                            }
                            setDataProcess(arrAnulado);
                            setTimeout(()=>{
                                setContinuoProcess(true);
                            },500);
                            break;
                        case 'APROBADO':
                            const arrAprobado = []; //ARR ELEMENTOS APROBADOS 
                            const arrFil3 = [];
                            for(const x in getDataOp){
                                if(getDataOp[x].ot)
                                    if(getDataOp[x].ot !== null || getDataOp[x].ot !== undefined || getDataOp[x].ot !== '' || getDataOp[x].ot !== ' '){
                                        const objeto3 = {...getDataOp[x]};
                                        objeto3.idGeneral = getDataOp[x]._id;
                                        objeto3.id = getDataOp[x]._id;
                                        let dateCreacion = '2021-1-1'
                                        if(objeto3.creacion){
                                            dateCreacion = objeto3.creacion;
                                        }else{
                                            if(objeto3.fecer){
                                                if(objeto3.fecer !== ''){
                                                    dateCreacion = objeto3.fecer;
                                                }
                                            }else{
                                                if(objeto3.feced){
                                                    if(objeto3.feced !== ''){
                                                        dateCreacion = objeto3.feced;
                                                    }
                                                }
                                            }
                                        }
                                        const dCreacion = dateCreacion.toString().split('-');
                                        objeto3.fcreacion = dateCreacion;
                                        objeto3.anioCreacion = dCreacion[0];
                                        objeto3.mesCreacion  = arrMeses[parseInt(dCreacion[1])];
                                        objeto3.mesCreacionNum = dCreacion[1];
                                        objeto3.coordinadora = (getObjectCoordinadoras.filter(el=>el.nombre === objeto3.ejecutiva)[0]).coordinador;
                                        arrFil3.push(objeto3);
                                    } 
                                        
                            }
                            for(const x in arrFil3){
                                const elNumpro = arrFil3[x].numpro;
                                const arrFiltrado3 = getDataMatrizDet.filter(el=> el.numpro === elNumpro);
                                let valSumado = 0;
                                if(arrFiltrado3.length > 0){
                                    const objeto3 = {...arrFil3[x]};
                                    for(const t in arrFiltrado3){
                                        let valT = arrFiltrado3[t].costotnet ? arrFiltrado3[t].costotnet === undefined ? 0 : arrFiltrado3[t].costotnet === null ? 0 : arrFiltrado3[t].costotnet === '' ? 0 : arrFiltrado3[t].costotnet === ' ' ? 0 : arrFiltrado3[t].costotnet : arrFiltrado3[t].costotnet;
                                        valSumado = parseFloat(valSumado) + parseFloat(valT);

                                    }
                                    objeto3.subFac = parseFloat(valSumado).toFixed(2) === 'NaN' ? '0.00' : parseFloat(valSumado).toFixed(2);
                                    arrAprobado.push(objeto3);
                                }
                            }
                            setDataProcess(arrAprobado);
                            setTimeout(()=>{
                                setContinuoProcess(true);
                            },500);
                            break;
                        case 'FACTURADO':
                            const arrFacturados = []; //ARR ELEMENTOS APROBADOS 
                            for(const x in getDataOp){
                                const elNumpro = getDataOp[x].numpro;
                                const objeto3 = {...getDataOp[x]};
                                objeto3.idGeneral = getDataOp[x]._id;
                                objeto3.id = getDataOp[x]._id;
                                const arrFiltrado3 = getDataMatrizDet.filter(el=> el.numpro === elNumpro);
                                if(arrFiltrado3.length > 0){
                                    if(arrFiltrado3[0].numFac !== '' || arrFiltrado3[0].numFac !== null || arrFiltrado3[0].numFac !== undefined){
                                        let dateCreacion = '2021-1-1'
                                        objeto3.subFac = arrFiltrado3[0].subFac ? arrFiltrado3[0].subFac : 0;
                                        objeto3.numFac = arrFiltrado3[0].numFac; 
                                        if(arrFiltrado3[0].mesFac){
                                            if(arrFiltrado3[0].mesFac !== '' || arrFiltrado3[0].mesFac !== null || arrFiltrado3[0].mesFac !== undefined) dateCreacion = arrFiltrado3[0].mesFac;
                                        }                     
                                        const dCreacion = dateCreacion.toString().split('-');
                                        objeto3.fcreacion = dateCreacion;
                                        objeto3.anioCreacion = dCreacion[0];
                                        objeto3.mesCreacion  = arrMeses[parseInt(dCreacion[1])];
                                        objeto3.mesCreacionNum = dCreacion[1];
                                        objeto3.coordinadora = (getObjectCoordinadoras.filter(el=>el.nombre === objeto3.ejecutiva)[0]).coordinador;
                                        arrFacturados.push(objeto3);
                                    }
                                }
                            }
                            setDataProcess(arrFacturados);
                            setTimeout(()=>{
                                setContinuoProcess(true);
                            },500);
                            break;
                        default:
                            const arrTotal = []; //ARR ELEMENTOS TOTALES
                            const arrFil5 = [];
                            for(const x in getDataOp){
                                const objeto3 = {...getDataOp[x]};
                                objeto3.idGeneral = getDataOp[x]._id;
                                objeto3.id = getDataOp[x]._id;
                                let dateCreacion = '2021-1-1'
                                if(objeto3.creacion){
                                    dateCreacion = objeto3.creacion;
                                }else{
                                    if(objeto3.fecer){
                                        if(objeto3.fecer !== ''){
                                            dateCreacion = objeto3.fecer;
                                        }
                                    }else{
                                        if(objeto3.feced){
                                            if(objeto3.feced !== ''){
                                                dateCreacion = objeto3.feced;
                                            }
                                        }
                                    }
                                }
                                const dCreacion = dateCreacion.toString().split('-');
                                objeto3.fcreacion = dateCreacion;
                                objeto3.anioCreacion = dCreacion[0];
                                objeto3.mesCreacion  = arrMeses[parseInt(dCreacion[1])];
                                objeto3.mesCreacionNum = dCreacion[1];
                                objeto3.coordinadora = (getObjectCoordinadoras.filter(el=>el.nombre === objeto3.ejecutiva)[0]).coordinador;
                                arrFil5.push(objeto3);
                                        
                            }
                            for(const x in arrFil5){
                                const elNumpro = arrFil5[x].numpro;
                                const arrFiltrado3 = getDataMatrizDet.filter(el=> el.numpro === elNumpro);
                                let valSumado = 0;
                                if(arrFiltrado3.length > 0){
                                    const objeto3 = {...arrFil5[x]};
                                    for(const t in arrFiltrado3){
                                        let valT = arrFiltrado3[t].costotnet ? arrFiltrado3[t].costotnet === undefined ? 0 : arrFiltrado3[t].costotnet === null ? 0 : arrFiltrado3[t].costotnet === '' ? 0 : arrFiltrado3[t].costotnet === ' ' ? 0 : arrFiltrado3[t].costotnet : arrFiltrado3[t].costotnet;
                                        valSumado = parseFloat(valSumado) + parseFloat(valT);

                                    }
                                    objeto3.subFac = parseFloat(valSumado).toFixed(2) === 'NaN' ? '0.00' : parseFloat(valSumado).toFixed(2);
                                    arrTotal.push(objeto3);
                                }
                            }
                            setDataProcess(arrTotal);
                            setTimeout(()=>{
                                setContinuoProcess(true);
                            },500);
                            break;
                    }
                }
            })
        };

        const handleOpcionesStatus = (e, value)=> {
            if(value === '' || value === null){
                setOpciones({...getOpciones, Status:''});
            }else{ 
                setOpciones({...getOpciones, Status:value});
            }
        };

        const handleOpcionesEjecutiva = (e, value)=>{ setOpciones({...getOpciones, Ejecutiva:value}); };

        const handleOpcionesCoordinadora = (e, value)=>{ setOpciones({...getOpciones, Coordinadora:value}); };

        const handleOpcionesTipoFiltro = (e, value)=>{
            if(value === '' || value === null){
                setOpciones({...getOpciones, tipoFiltro:'', isCoordinadora:null, isTotalFiltro:false});
            }else{ 
                if(value === 'COORDINADORA'){
                    setOpciones({...getOpciones, tipoFiltro:value, isCoordinadora:true, isTotalFiltro:false});
                }else if(value === 'TODOS'){
                    setOpciones({...getOpciones, tipoFiltro:value, isCoordinadora:null, isTotalFiltro:true});
                }else{
                    setOpciones({...getOpciones, tipoFiltro:value, isCoordinadora:null, isTotalFiltro:false});
                }
            }
        };

        const handleOpcionesTabla = (e, value)=>{
            if(value === '' || value === null){
                setOpciones({...getOpciones, Tabla:'', isComparativo:null, AnioInicio:'', AnioFinal:'', MesesComparar:[]});
            }else{       
                if(value === 'COMPARATIVO'){
                    setOpciones({...getOpciones, Tabla:value, isComparativo:true, AnioInicio:'', AnioFinal:'', MesesComparar:[]});
                }else{
                    setOpciones({...getOpciones, Tabla:value, isComparativo:false, AnioInicio:'', AnioFinal:'', MesesComparar:[]});
                }
                
            }
        };

        const handleSelectMeses = (e, value)=>{ setOpciones({...getOpciones, MesesComparar:value}); };

        const handleSelectAnios = (e, value)=>{ setOpciones({...getOpciones, Anios:value}); };

        const handleOpcionesCompInicio = (e, value)=>{
            if(value === '' || value === null){
                setOpciones({...getOpciones, AnioInicio:''});
            }else{       
                setOpciones({...getOpciones, AnioInicio:value});
            }
        };

        const handleOpcionesCompFinal = (e, value)=>{
            if(value === '' || value === null){
                setOpciones({...getOpciones, AnioFinal:''});
            }else{       
                setOpciones({...getOpciones, AnioFinal:value});
            }
        };

        const handleOpcionesTipo = (e, value)=>{
            if(value === '' || value === null){
                setOpciones({...getOpciones, Tipo:'', isAnual:null});
            }else{    
                if(value === 'ANUAL'){
                    setOpciones({...getOpciones, Tipo:value, isAnual:true});
                }else{
                    setOpciones({...getOpciones, Tipo:value, isAnual:false});
                }   
            }
        };

        const handleOpcionesAnio = (e, value)=>{
            if(value === '' || value === null){
                setOpciones({...getOpciones, Anio:''});
            }else{    
                setOpciones({...getOpciones, Anio:value}); 
            }
        };

        const handleChangeSwitchSeleccionable = ({target})=>{ setOpciones({...getOpciones, Seleccionable:target.checked}); };

        const handleChangeSwitchProyeccion = ({target})=>{ setOpciones({...getOpciones, Proyeccion:target.checked});}

        const handleChangeSwitchPorcentaje = ({target})=>{ setOpciones({...getOpciones, Porcentaje:target.checked}); };

        const handleSelectAll = useCallback(()=>{
            if(selectionArr.length === rows.length){
                setSavingHeaders(true);
                setSelectionArr([]);
                setRows([]);
                setContinuoSelection(true);
            }else{
                setSavingHeaders(true);
                setSelectionArr(rows);
                setRows([]);
                setContinuoSelection(true);
            }
        },[selectionArr, rows]);

        
        return(
            <Grid container style={{width:'100%'}}>
                <Dialog
                    open={openMenuFilter}
                    onClose={handleCloseMenuFilter}
                    fullWidth
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogContent>
                        <Grid container justify='center' spacing={1}>
                            { isElementFilterShow ? ElementMenuFilter
                            : <FacebookCircularProgress size={25} style={{marginTop:5}}/>}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container justify='flex-start' spacing={2} style={{padding:15}}>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Button variant='contained' color="default" fullWidth onClick={handleCloseMenuFilter} endIcon={<ClearIcon/>}>
                                    Cerrar
                                </Button>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Button variant='contained' color="secondary" fullWidth onClick={HandleResetFilter} endIcon={<AutorenewIcon/>}>
                                    Resetear
                                </Button>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Button variant='contained' color="primary" fullWidth onClick={HandleProcessFilterElement} endIcon={<NavigateNextIcon/>}>
                                    Procesar
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openMenuStyles}
                    onClose={handleCloseMenuStyles}
                    fullWidth
                    maxWidth={'md'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    TransitionComponent={Transition}
                >
                    <DialogContent>
                        <Grid container spacing={2}>
                            {ElementMenuStyles}
                        </Grid>
                        
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openMenuPosicion}
                    onClose={handleCloseMenuPosicion}
                    fullWidth
                    maxWidth={'md'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    TransitionComponent={Transition}
                >
                    <DialogContent>
                        <Grid container spacing={2}>
                            {ElementMenuPosicion}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                    <Grid container justify='flex-start' spacing={2} style={{padding:15}}>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Button variant='contained' color="default" fullWidth onClick={handleCloseMenuPosicion} endIcon={<ClearIcon/>}>
                                    Cerrar
                                </Button>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Button variant='contained' color="secondary" fullWidth onClick={HandleResetPosicion} endIcon={<AutorenewIcon/>}>
                                    Resetear
                                </Button>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Button variant='contained' color="primary" fullWidth onClick={HandleProcessPosicion} endIcon={<NavigateNextIcon/>}>
                                    Procesar
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openSelectPersonsMail}
                    onClose={handleCloseSelectPersonsMail}
                    fullWidth
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogContent>
                        <Autocomplete
                            id="Remitentes"
                            freeSolo
                            options={RemitentesAll}
                            value={Remitentes || ''}
                            onChange={HandleRemitentes}
                            multiple
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  label="Remitentes"
                                />
                              )}
                        /> 
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={handleCloseSelectPersonsMail} color="secondary" style={{height:40}}>
                            Cancelar
                        </Button>
                        <ButtonSemantic primary onClick={HandleSendCorreos}  style={{margin:3, height:40}}>
                            <i className="icon envelope"></i>
                            Enviar
                        </ButtonSemantic>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openAddCol}
                    onClose={handleCloseAddCol}
                    fullWidth
                    maxWidth={'xs'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogContent style={{padding:10}}>
                        <Grid container justify='center' spacing={2} >
                            <Grid item xs={12}>
                                <TextField
                                    id='NameCol'
                                    label='NOMBRE'
                                    value={NameCol || ''}
                                    onChange={handleNameCol}
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='contained' onClick={handleAddColumn} color="primary" style={{height:40}} fullWidth>
                                    Guardar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='contained' onClick={handleCloseAddCol} color="default" style={{height:40}} fullWidth>
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openDelCol}
                    onClose={handleCloseDelCol}
                    fullWidth
                    maxWidth={'xs'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogContent style={{padding:10}}>
                        <Grid container justify='center' spacing={2} >
                            {
                                headersColumn.map((val,index)=>{
                                    return(
                                        <Fragment key={`headDel_${index}`}>
                                            {
                                                index > 8 &&
                                                <Grid item xs={12} >
                                                    <Grid container spacing={1} justify='center'>
                                                        <Grid item>
                                                            <Chip label={val.label} color='primary' style={{width:200, textOverflow:'ellipsis', overflow:'hidden'}}/>
                                                        </Grid>
                                                        <Grid item>
                                                            <Checkbox
                                                                name={`${index}`}
                                                                onChange={handleCheckedCol}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    
                                                </Grid> 
                                            }
                                        </Fragment>

                                    )
                                })
                            }
                            <Grid item xs={6}>
                                <Button variant='contained' onClick={handleDeleteColumn} color="primary" fullWidth size='small'>
                                    Proceder
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='contained' onClick={handleCloseDelCol} color="default" fullWidth size='small'>
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={showOptions}
                    onClose={handleCloseOptions}
                    fullWidth
                    maxWidth={'xs'}
                    aria-labelledby="draggable-dialog-title"
                    TransitionComponent={Transition}
                >
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id='OPCNSTATUS'
                                    options={opcionesStatus}
                                    size='small'
                                    value={getOpciones.Status || ''}
                                    margin='dense'
                                    style={{marginTop:-8}}
                                    renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='STATUS'/>}
                                    onChange={handleOpcionesStatus} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id='OPCNTIPOFILTRO'
                                    options={getTipoFiltro}
                                    size='small'
                                    value={getOpciones.tipoFiltro || ''}
                                    margin='dense'
                                    style={{marginTop:-8}}
                                    renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='FILTRO'/>}
                                    onChange={handleOpcionesTipoFiltro} 
                                />
                            </Grid>
                            {
                                getOpciones.isCoordinadora ?
                                <>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disabled={getOpciones.isTotalFiltro}
                                        multiple
                                        id="OPCNCOORDINADORA"
                                        options={getCoordinadoras}
                                        disableCloseOnSelect
                                        value={getOpciones.Coordinadora || ''}
                                        onChange={handleOpcionesCoordinadora}
                                        renderOption={(option, { selected }) => (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                            {option}
                                            </React.Fragment>
                                        )}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="COORDINADORA" fullWidth placeholder="COORDINADORA" />
                                        )}
                                    />
                                </Grid> 
                                </>:
                                <>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disabled={getOpciones.isTotalFiltro}
                                        multiple
                                        id="OPCNEJECUTIVA"
                                        options={getOpcionesEjecutiva}
                                        disableCloseOnSelect
                                        value={getOpciones.Ejecutiva || ''}
                                        onChange={handleOpcionesEjecutiva}
                                        renderOption={(option, { selected }) => (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                            {option}
                                            </React.Fragment>
                                        )}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="EJECUTIVAS" fullWidth placeholder="EJECUTIVA" />
                                        )}
                                    />
                                </Grid>
                                </>
                            }
                            <Grid item xs={12}>
                                <Autocomplete
                                    id='OPCNTABLA'
                                    options={opcionesTabla}
                                    size='small'
                                    value={getOpciones.Tabla || ''}
                                    margin='dense'
                                    style={{marginTop:-8}}
                                    renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='TABLA'/>}
                                    onChange={handleOpcionesTabla} 
                                />
                            </Grid>
                            {
                                getOpciones.isComparativo ? 
                                <Fragment>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="Meses"
                                            options={Meses}
                                            disableCloseOnSelect
                                            value={getOpciones.MesesComparar || ''}
                                            onChange={handleSelectMeses}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                {option}
                                                </React.Fragment>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="MESES A COMPARAR" fullWidth placeholder="Meses" />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            id='OPCNAI'
                                            options={opcionesAnios}
                                            size='small'
                                            value={getOpciones.AnioInicio || ''}
                                            margin='dense'
                                            style={{marginTop:-8}}
                                            renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='INICIO'/>}
                                            onChange={handleOpcionesCompInicio} 
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            id='OPCNAF'
                                            options={opcionesAnios}
                                            size='small'
                                            value={getOpciones.AnioFinal || ''}
                                            margin='dense'
                                            style={{marginTop:-8}}
                                            renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='FINAL'/>}
                                            onChange={handleOpcionesCompFinal} 
                                        />
                                    </Grid>
                                </Fragment>:
                                <Fragment>
                                    {getOpciones.isComparativo !== null &&
                                        <Fragment>
                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    id='OPCNCRONOLOGICO'
                                                    options={opcionesTipo}
                                                    size='small'
                                                    value={getOpciones.Tipo || ''}
                                                    margin='dense'
                                                    style={{marginTop:-8}}
                                                    renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='TIPO'/>}
                                                    onChange={handleOpcionesTipo} 
                                                />
                                            </Grid>
                                            {
                                                getOpciones.isAnual?
                                                <Fragment>
                                                    <Grid item xs={12}>
                                                        <Autocomplete
                                                            id='OPCNCRONOLOGICO'
                                                            options={opcionesAnios}
                                                            size='small'
                                                            value={getOpciones.Anio || ''}
                                                            margin='dense'
                                                            style={{marginTop:-8}}
                                                            renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='AÑO'/>}
                                                            onChange={handleOpcionesAnio} 
                                                        />
                                                    </Grid>
                                                </Fragment>:
                                                <Fragment>
                                                    {
                                                        getOpciones.isAnual !== null &&
                                                        <Fragment>
                                                            <Grid item xs={12}>
                                                            <Autocomplete
                                                                id='OPCNCRONOLOGICO'
                                                                options={opcionesAnios}
                                                                size='small'
                                                                value={getOpciones.Anio || ''}
                                                                margin='dense'
                                                                style={{marginTop:-8}}
                                                                renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='AÑO'/>}
                                                                onChange={handleOpcionesAnio} 
                                                            />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Autocomplete
                                                                    multiple
                                                                    id="Meses"
                                                                    options={Meses}
                                                                    disableCloseOnSelect
                                                                    value={getOpciones.MesesComparar || ''}
                                                                    onChange={handleSelectMeses}
                                                                    renderOption={(option, { selected }) => (
                                                                        <React.Fragment>
                                                                            <Checkbox
                                                                                icon={icon}
                                                                                checkedIcon={checkedIcon}
                                                                                style={{ marginRight: 8 }}
                                                                                checked={selected}
                                                                            />
                                                                        {option}
                                                                        </React.Fragment>
                                                                    )}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} variant="outlined" label="MESES" fullWidth placeholder="Meses" />
                                                                    )}
                                                                />
                                                            </Grid>
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                            }
                                        </Fragment>
                                    }
                                </Fragment>
                            }
                            <Fragment>
                                <Grid item xs={12}>
                                    <Grid container justify='center' spacing={2}>
                                        <Grid item xs={4}>
                                            <FormControlLabel
                                                control={
                                                <Switch
                                                    checked={getOpciones.Seleccionable}
                                                    onChange={handleChangeSwitchSeleccionable}
                                                    color="primary"
                                                />
                                                }
                                                label='Seleccionable'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControlLabel
                                                control={
                                                <Switch
                                                    checked={getOpciones.Porcentaje}
                                                    onChange={handleChangeSwitchPorcentaje}
                                                    color="primary"
                                                />
                                                }
                                                label='Porcentaje'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControlLabel
                                                control={
                                                <Switch
                                                    checked={getOpciones.Proyeccion}
                                                    onChange={handleChangeSwitchProyeccion}
                                                    color="primary"
                                                />
                                                }
                                                label='Proyeccion'
                                            />
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={handleProcesar} color='primary' variant='contained' fullWidth>
                                        PROCESAR
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={handleCloseOptions} color='default' variant='contained' fullWidth>
                                        CERRAR
                                    </Button>
                                </Grid>
                            </Fragment>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'block'}}>
                    <Toolbar  >   
                        <div style={{marginRight:30, fontSize:20}}>Resumido</div>
                        <Tooltip title='VER' placement='top'>
                            <span>
                            <IconButton color='primary' disabled={!isFoundProject} onClick={handleClickMenu}  aria-controls="menu-column" aria-haspopup="true" style={{marginRight:2}}>
                                    <VisibilityIcon />
                            </IconButton>
                            </span>
                        </Tooltip>
                        <Menu
                            id="menu-column"
                            anchorEl={openMenuColumn}
                            keepMounted
                            open={Boolean(openMenuColumn)}
                            onClose={handleCloseMenu}
                            >
                            {ElementMenu}
                        </Menu>  
                        <Tooltip title='FIJAR' placement='top' >
                            <span>
                                <IconButton color='primary' disabled={!isFoundProject} onClick={handleClickMenuFixed}  aria-controls="menu-column-fixed" aria-haspopup="true" style={{marginRight:2}}>                          
                                        <ViewWeekIcon />                          
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Menu
                            id="menu-column-fixed"
                            anchorEl={openMenuColumnFixed}
                            keepMounted
                            open={Boolean(openMenuColumnFixed)}
                            onClose={handleCloseMenuFixed}
                            >
                            {ElementMenuFixed}
                        </Menu>
                        <Tooltip title='FILTRAR' placement='top' >
                            <span>
                                <IconButton color={isFilterNow ? 'secondary' : 'default'} disabled={!isFoundProject} onClick={handleClickMenuFilter} style={{marginRight:2}}>
                                    <FilterListIcon />                       
                                </IconButton>
                            </span>
                        </Tooltip> 
                        <Tooltip title='Export PDF' placement='top'>
                            <span>
                            <IconButton aria-controls="menu-cpdf" disabled={!isFoundProject} aria-haspopup="true" style={{marginRight:2}} onClick={handleClickMenuPdf} color='primary'>  
                                    <PictureAsPdfIcon />
                            </IconButton> 
                            </span>
                        </Tooltip>
                        <Menu
                            id="menu-pdf"
                            anchorEl={openMenuPdf}
                            keepMounted
                            open={Boolean(openMenuPdf)}
                            onClose={handleCloseMenuPdf}
                        >
                            <MenuItem onClick={HandleExportSelectPdf} >
                                Export Select
                            </MenuItem>
                            <MenuItem onClick={HandleExportAllPdf} >
                                Export All
                            </MenuItem>
                            <MenuItem style={{display:'flex', justifyContent:'center'}}>
                                {
                                    isReadyPdf ? <PdfElement data={isSelectPdf ? selectionArr : rows} headersColumn={arrHeadersPdf} HandleClickPdf={HandleClickPdf}/>
                                    : '...'
                                }
                            </MenuItem>
                        </Menu>
                        <Tooltip title='Export EXCEL' placement='top'>
                            <span>
                            <IconButton aria-controls="menu-excel" disabled={!isFoundProject} aria-haspopup="true" style={{marginRight:2}} onClick={handleClickMenuExcel} color='primary'>                            
                                <DescriptionIcon />
                            </IconButton>
                            </span>
                        </Tooltip>
                        <Menu
                            id="menu-excel"
                            anchorEl={openMenuExcel}
                            keepMounted
                            open={Boolean(openMenuExcel)}
                            onClose={handleCloseMenuExcel}
                        >
                            <MenuItem >
                                {
                                    selectionArr.length === 0 ? <span onClick={()=>{ setOpenMenuExcel(null);
                                        Swal.fire({
                                            title:'NO HAY ELEMENTOS A EXPORTAR',
                                            toast:true,
                                            confirmButtonColor:'#0E3B5F',
                                        });}}>Export Select</span>
                                    :<ExcelComponent data={selectionArr} titulo={'Export Select'} headersColumn={headersColumn}/>
                                }
                            </MenuItem>
                            <MenuItem >
                                <ExcelComponent data={rows} titulo={'Export All'} headersColumn={headersColumn} />
                            </MenuItem>
                        </Menu>
                        {
                            isPreCorreoCreating ?
                            <FacebookCircularProgress size={25}  style={{marginRight:2, marginLeft:10}}/>
                            :
                            <Tooltip title='CORREOS' placement='top'>
                                <span>
                                <IconButton color='primary' disabled={!isFoundProject} onClick={HandleShowCorreosCreated}  style={{marginRight:2}}> 
                                    <MarkunreadMailboxIcon/>
                                </IconButton>
                                </span>
                            </Tooltip>
                        }     
                        <Tooltip title='Estilos' placement='top'>
                            <span>
                            <IconButton style={{marginRight:2}} disabled={!isFoundProject} onClick={handleOpenMenuStyles} color='primary'>                         
                                <BrushIcon />
                            </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title='Posicion' placement='top'>
                            <span>
                            <IconButton style={{marginRight:2}} disabled={!isFoundProject} onClick={handleClickMenuPosicion} color='primary'>
                                <BorderVerticalIcon />
                            </IconButton>
                            </span>
                        </Tooltip>
                        <div style={{margin:'0px 0px 0px auto', display:'block'}}>
                            {
                                getOpciones.isComparativo === false &&
                                <Chip label={getOpciones.Anio} style={{fontWeight:'bolder', position:'relative', left:-5}}/>
                            }
                            <Tooltip title='OPCIONES' placement='top'>
                                <span>
                                <Fab color='secondary' onClick={handleShowOptions}  aria-controls="menu-column" aria-haspopup="true"  size='small'>
                                        <BuildIcon />
                                </Fab>
                                </span>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                    <Paper square style={{minHeight:'75vh',  maxHeight:'75vh'}}>
                        { isSavingHeaders ? 
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{height:'100%', display:'flex', justifyContent:'center', marginTop:'33vh'}}  >                                                                                                                                                                                                                  
                                <FacebookCircularProgress size={40} style={{alignSelf:'center'}}/>
                            </Grid>
                        </Grid>
                        :
                        <Fragment>
                        {isCharging && <LinearProgress color='secondary' />}
                        <TableContainerYounet>
                            <TableYounet>
                                {selectionArr.length > 0 && 
                                    <EnhancedTableHeadSum
                                        classes       = {classes}
                                        order         = {order}
                                        orderBy       = {orderBy}
                                        onRequestSort = {handleRequestSort}
                                        rowCount      = {rows.length}
                                        headCells     = {headersColumn}
                                        selectionArr  = {selectionArr}
                                    /> 
                                }
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                    headCells={headersColumn}
                                    selectionArr  = {selectionArr}
                                    handleSelectAll = {handleSelectAll}
                                />               
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => 
                                            <Roow 
                                                row={row} 
                                                index={index} 
                                                headCells={headersColumn} 
                                                HandleClickRow={HandleClickRow}
                                                selectionArr  = {selectionArr}
                                                key={row.idGeneral}
                                            />
                                        )}
                                </TableBody>
                            </TableYounet>
                        </TableContainerYounet>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        </Fragment>
                        }
                    </Paper>
                </Grid>
            </Grid>  
        )
    };

    function TablaSupervisora(props) {
        return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
            <TablaSuperv />
        </SnackbarProvider>
    );
    };

    export default TablaSupervisora;