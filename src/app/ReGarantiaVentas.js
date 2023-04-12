import React, { useState, useEffect, useRef, useCallback, Fragment, memo } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useAuth } from "./Auth";
import  {             
            Box,
            Button,
            Card, 
            CardContent,
            Checkbox,
            Collapse,
            Dialog,
            DialogActions,
            DialogContent,
            DialogTitle,
            Divider,
            Fab,
            FormControlLabel,
            Grid,
            Grow,
            IconButton,
            Menu,
            MenuItem,
            Paper,
            Switch,
            Table,
            TableBody,
            TableCell,
            TableContainer,
            TableHead,
            TablePagination,
            TableSortLabel,
            TableRow,
            Toolbar,
            //Typography,
            TextField,
            Tooltip,
            
} from '@material-ui/core';
import { 
            Add as AddIcon,
            AddCircle as AddCircleIcon,
            AddCircleOutline as AddCircleOutlineIcon,
            Autorenew as AutorenewIcon,
            Block as BlockIcon,
            Brightness1 as Brightness1Icon,
            Cached as CachedIcon,
            CheckBox as CheckBoxIcon,
            CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
            Clear as ClearIcon,
            Close as CloseIcon,
            DateRange as DateRangeIcon,
            Delete as DeleteIcon,
            Description as DescriptionIcon,
            FilterList as FilterListIcon,
            FindReplace as FindReplaceIcon,
            GetApp as GetAppIcon,
            KeyboardArrowUp as KeyboardArrowUpIcon,
            KeyboardArrowDown as KeyboardArrowDownIcon,
            MarkunreadMailbox as MarkunreadMailboxIcon,
            NavigateNext as NavigateNextIcon,
            PhotoAlbum as PhotoAlbumIcon,
            PictureAsPdf as PictureAsPdfIcon,
            Refresh as RefreshIcon,
            Save as SaveIcon,
            //TableChart as TableChartIcon,
            Visibility as VisibilityIcon,
            ViewWeek as ViewWeekIcon,
} from '@material-ui/icons';
import Viewer from 'react-viewer';
//import socketIOClient from "socket.io-client";
import FacebookCircularProgress from './Elementos/FacebookCircularProgress';
import styled from 'styled-components';
import { Autocomplete } from '@material-ui/lab';
import ReactExport from "react-data-export";
import ImageUploader from 'react-images-upload';
import { Button as ButtonSemantic, Icon as IconSemantic } from 'semantic-ui-react';
import { Page, Text, View, Document, StyleSheet, Font, usePDF } from '@react-pdf/renderer';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    IntegratedSorting,
    FilteringState,
     IntegratedFiltering,
  } from '@devexpress/dx-react-grid';
  import {
    Grid as DevGrid,
    Table as DevTable,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
    TableColumnResizing,
    TableColumnReordering,
    TableColumnVisibility,
    ColumnChooser,
    Toolbar as DevToolbar,
    TableFilterRow,
  } from '@devexpress/dx-react-grid-material-ui';
const moment = require('moment'); 
const moment2 = require('moment-timezone'); 

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
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

    const styles = theme => ({
        tableStriped: {
            color:'#ffffff', 
            backgroundColor:'#0E3B5F'
        },

    });

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Grow direction="up" ref={ref} {...props} timeout={500} />;
    });

    //const Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const TheadYounetStyledFixed = styled.th`
        text-align:center;
        background-color:#0E3B5F;
        color: #fff;
        font-weight:bold, 
        width:${props => props.width || 100};
        display:block;
        position:sticky;
        z-index:1; 
        left:${props => props.left || '0px'};
        padding-top:6px;
        height:33px;
    `;

    const TheadYounetStyled = styled.th`
        text-align:center;
        background-color:#0E3B5F;
        color: #fff;
        font-weight:bold, 
        width:${props => props.width || 100};
        display:block;
        position: relative;
        left:0px;
        padding-top:6px;
        height:33px;
    `;

    const TdYounetStyledFixed = styled.td`
        minWidth:${props => props.minWidth || 100};, 
        padding:0px; 
        text-align:center; 
        display:block;
        width:${props => props.width || 100};
        position:sticky;
        z-index:1; 
        left:${props => props.left || '0px'};
        color:black;
        border-bottom: 1px solid #E5E8E8;
        background:#ffffff;
        font-size:${props => props.proyecto ? '9px' : '10px'};
        padding-top:${props => props.element ? '0px' : '5px'};
        height:30px;
    `;

    const TdYounetStyled = styled.td`
        minWidth:${props => props.minWidth || 100};, 
        padding:0px; 
        text-align:center; 
        display:block;
        width:${props => props.width || 100};
        position:relative;
        left:0px;
        color:${props => props.color ? props.color : 'black'};
        border-bottom: 1px solid #E5E8E8;
        background:transparent;
        font-size:${props => props.proyecto ? '9px'  : props.bolder? '12px': '10px'};
        padding-top:${props => props.element ? '0px' : '5px'};
        height:30px;
        font-weight:${props => props.bolder ? 'bold' : 'none'};, 
    `;

    const TrYounetStyled = styled.tr`
        display:flex;
        background-color:${props => props.selected ? 'LightBlue' : '#fff'};
        &:hover{
            background-color:Gainsboro
        }
    `;
    
    const ResizerStyled = styled.div`
        display: inline-block;
        touch-action:none;
        background:#273C73;
        width: 3px;
        height: 33px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 30;
        &:hover {
            background: #CAD226;
            width: 4px;
            cursor:col-resize;
        }
    `;

    const headCellsColumn = [
        { id: 'NumGar', numeric: true, disablePadding: false, label: 'Garantia', show:true, fixed:false, width:100, num:0 },
        { id: 'Creacion', numeric: false, disablePadding: false, label: 'Creacion', show:true, fixed:false, width:100, num:1 },
        { id: 'Fotos', numeric: false, disablePadding: false, label: 'Fotos', show:true, fixed:false, width:100, num:2 },
        { id: 'numpro', numeric: true, disablePadding: false, label: 'PPTO', show:true, fixed:false, width:80, num:3 },      
        { id: 'CanElem', numeric: true, disablePadding: false, label: 'Cantidad', show:true, fixed:false, width:100, num:4 }, 
        { id: 'TipTra', numeric: false, disablePadding: false, label: 'Tipo Trabajo', show:true, fixed:false, width:210, num:5  },  
        { id: 'ObservacionGar', numeric: false, disablePadding: false, label: 'Observacion Ventas', show:true, fixed:false, width:200, num:6  },
        { id: 'FecIns', numeric: false, disablePadding: false, label: 'Fec. Instalacion', show:true, fixed:false, width:170, num:7  },
        { id: 'FecVen', numeric: false, disablePadding: false, label: 'Fec. Vencimiento', show:true, fixed:false, width:170, num:8  },
        { id: 'MotGar', numeric: false, disablePadding: false, label: 'Motivo Garantia', show:true, fixed:false, width:200, num:9  },
        { id: 'TipGar', numeric: false, disablePadding: false, label: 'Tipo Garantia', show:true, fixed:false, width:150, num:10 },
        { id: 'Status', numeric: false, disablePadding: false, label: 'Status', show:true, fixed:false, width:90, num:11  },
        { id: 'FechaInicio', numeric: false, disablePadding: false, label: 'Fecha Inicio', show:true, fixed:false, width:200, num:12  },
        { id: 'FechaTermino', numeric: false, disablePadding: false, label: 'Fecha Acuerdo', show:true, fixed:false, width:200, num:13  },
        { id: 'FechaTerminoReal', numeric: false, disablePadding: false, label: 'Fecha Termino', show:true, fixed:false, width:200, num:14  },
        { id: 'ObservacionSuper', numeric: false, disablePadding: false, label: 'Observacion', show:true, fixed:false, width:240, num:15  },
        { id: 'OT', numeric: true, disablePadding: false, label: 'O.T.', show:true, fixed:false, width:80 , num:16 },
        { id: 'Proyecto', numeric: false, disablePadding: false, label: 'Proyecto', show:true, fixed:false, width:300, num:17  },
        { id: 'Cliente', numeric: true, disablePadding: false, label: 'Cliente', show:true, fixed:false, width:300, num:18  },          
        { id: 'Ejecutiva', numeric: false, disablePadding: false, label: 'Ejecutiva', show:true, fixed:false, width:200, num:19  },
        { id: 'Cadena', numeric: false, disablePadding: false, label: 'Cadena', show:true, fixed:false, width:100, num:20  },
        { id: 'Local', numeric: false, disablePadding: false, label: 'Local', show:true, fixed:false, width:100, num:21 },   
        { id: 'Codigo', numeric: false, disablePadding: false, label: 'Codigo', show:true, fixed:false, width:100, num:22  },
    ];

    const propsWidth = {
        numpro: 80,
        OT: 80,
        Proyecto: 300,
        NumGar: 100,
        Cliente:300,
        CanElem:100,
        TipTra:210,
        Ejecutiva: 200,
        Cadena:100,
        Local:100,
        FecIns:170,
        FecVen:170,
        MotGar:200,
        ObservacionGar:200,
        Codigo:100,
        Status:90,
        FechaInicio: 200,
        FechaTermino: 200,
        FechaTerminoReal: 200,
        ObservacionSuper:240,
        Fotos:100,
        Creacion:100,
        Action:80,
        TipGar:120
    };

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

    const TheadYounetFixed = memo(({widthDefault, createSortHandler, order, orderBy, headCell, classes, HandleChangeWidth, headCells})=>{
        let myRef = useRef();
        const [ leftValue, setLeftValue ] = useState('0px')
        const mouseDown = (index) => {
            HandleChangeWidth(index, myRef)
        };
        
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
            <TheadYounetStyledFixed width={widthDefault} ref={myRef} left={leftValue}>
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)} 
                    style={{color:'#fff'}}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                    ) : null}
                </TableSortLabel>
                <ResizerStyled  onMouseDown={()=>mouseDown(headCell.id)} />
            </TheadYounetStyledFixed>
        );
    });

    const TheadYounet = memo(({widthDefault, createSortHandler, order, orderBy, headCell, classes, HandleChangeWidth})=>{
        const [ myRef ] = useState(useRef());
        const mouseDown = (index) => {
            HandleChangeWidth(index, myRef)
        };

        
        return(
            <TheadYounetStyled width={widthDefault} ref={myRef} >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)} 
                    style={{color:'#fff'}}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                    ) : null}
                </TableSortLabel>
                <ResizerStyled  onMouseDown={()=>mouseDown(headCell.id)} />
            </TheadYounetStyled>
        );
    });

    const TdYounet = memo(((props)=>{
        const { minWidth, width, headCells, headCell, valueInfo, fotos, fixed, color, HandleSaveRows } = props
        const [ leftValue, setLeftValue ] = useState('0px');

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

        if(fotos){
            return(
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <FotosRow info={valueInfo} statusRow={props.statusRow}/>
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color} >
                        <FotosRow info={valueInfo} statusRow={props.statusRow}/>
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else{
            return(
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} color={color} proyecto={headCell.id === 'Proyecto' ? true: false} bolder={headCell.id === 'Status'}>
                        {valueInfo}
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} color={color} proyecto={headCell.id === 'Proyecto' ? true: false} bolder={headCell.id === 'Status'}>
                        {valueInfo}
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }
        
    }));

    function EnhancedTableHead(props) {
        
        const { classes, order, orderBy, onRequestSort, headCells, HandleChangeWidth } = props;

        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
    
        return (
            <TableHead >
                <TableRow style={{display:'flex'}} >
                <TheadYounetStyled width={60}>
                    <CheckBoxIcon/>
                </TheadYounetStyled>
                <TheadYounetStyled width={100}>
                    Action
                </TheadYounetStyled>
                {headCells.map( headCell =>  
                    headCell.show && ( 
                        headCell.fixed 
                        ? <TheadYounetFixed  headCells={headCells} HandleChangeWidth={HandleChangeWidth} key={headCell.id} widthDefault={headCell.width} createSortHandler={createSortHandler} order={order} orderBy={orderBy} headCell={headCell} classes={classes} />
                        : <TheadYounet  headCells={headCells} HandleChangeWidth={HandleChangeWidth} key={headCell.id} widthDefault={headCell.width} createSortHandler={createSortHandler} order={order} orderBy={orderBy} headCell={headCell} classes={classes} />
                ))}
                </TableRow>
            </TableHead>
        );
    };
    
    const FiltradoEl = ({ index, info, HandleAddFilter, HandleDeleteFilter, HandleAddInformacionFilter, headersColumn})=>{
        const [ elementValue, setElementValue ] = useState({ idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:'O'});

        useEffect(()=>{
            setElementValue({ idElement:info.idElement, valorElement:info.valorElement, numero:index, labelElement:info.labelElement, selectElement:info.selectElement})
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
                    setElementValue({...elementValue, idElement:arrFilHeaders[0].id.toString(), labelElement:value});
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
                                onBlur={HandlePreAddInfFilter}
                                onInputChange={HandleAutoComplete}
                                size='small'
                            />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                            {
                                elementValue.idElement === 'numpro' ?
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
                                />: elementValue.idElement === 'NumGar' ?
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
                                />: elementValue.idElement === 'CanElem' ?
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
                                onBlur={HandlePreAddInfFilter}
                                onInputChange={HandleAutoComplete}
                                size='small'
                            />
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
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

    const ExcelComponent = (props)=>{

        const { data, titulo, headersColumn } = props;
        const ColumnasExcel = headersColumn.filter(value=> value.show).filter(value=> value.id !== 'Fotos' && value.id !== 'Action').map((value, index)=>{
            if(value.id === 'MotGar'){
                return(<ExcelColumn label={value.label} value={'MotivosString'} key={`fila${index}`}/>) 
            }else{
                return(<ExcelColumn label={value.label} value={value.id} key={`fila${index}`}/>) 
            }
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
            tableColHeader: { 
                width: `${100 / headersColumn.length}%`,
                borderStyle: "solid", 
                borderWidth: 1, 
                borderLeftWidth: 0, 
                borderTopWidth: 0,
                borderColor:'#fff',
                textAlign:'center',
            }, 
            tableCellHeader:{
                margin: "auto",  
                fontSize: 7,
                textAlign:'center',
                fontFamily: 'Roboto-BlackCursive',
            },
            tableRow: {
                margin: "auto", 
                flexDirection: "row" ,
                backgroundColor:'#E5E8E8',
                height:20
            }, 
            tableCol: { 
                borderStyle: "solid", 
                borderWidth: 1, 
                borderLeftWidth: 0, 
                borderTopWidth: 0,
                width: `${100 / headersColumn.length}%`,
                borderColor:'#fff'
            }, 
            tableCell: { 
                margin: "auto", 
                padding:1,
                fontSize: 7,
                width:'100%',
                textAlign:'center',
            },
            
        });

        const MyDoc = (
            <Document>
                <Page size="A4" orientation="landscape" wrap>
                    <View style={styles.containerTable} wrap>
                        <View style={styles.table} >
                            <View style={styles.tableRowHeader} fixed> 
                                {headersColumn.map((value, index)=>{
                                    return (
                                        <View style={styles.tableColHeader} key={`theadcol${index}`}>
                                            <Text style={styles.tableCellHeader}> {value.label}</Text>
                                        </View>
                                )})}
                            </View>
                            {
                                data.map((value,index)=>{
                                    return( 
                                    <View style={styles.tableRow} key={`row${index}`}> 
                                        {
                                            headersColumn.map((value2,index2)=>{
                                                if(value2.id === 'MotGar'){
                                                    return(
                                                        <View style={styles.tableCol} key={`rows-${index}-${index2}`}>   
                                                            <Text style={styles.tableCell}>{value.MotivosString}</Text> 
                                                        </View>
                                                    )
                                                }else{
                                                    return(
                                                        <View style={styles.tableCol} key={`rows-${index}-${index2}`}>   
                                                            <Text style={styles.tableCell}>{value[value2.id] ? value[value2.id] : ''}</Text> 
                                                        </View>
                                                    )
                                                }
                                                
                                            })
                                        }
                                    </View>
                                )})
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
        const { row, index, headCells, HandleClickRow, HandleSaveRows, motivosGarantia, tiposGarantia, HandleClear } = props;
        const [ statusRow, setStatusRow ] = useState(false);
        const [ continuoStatus, setContinuoStatus ] = useState(false);
        const [ openRow, setOpenRow ] = useState(false);
        const HeadCellArr = headCells.map((value, index2)=>{
            if(value.id === 'Status'){ 
                if(value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        label={value.label} 
                        idCell={row.idSubGarantia}
                        fixed={value.fixed}
                        color={row.Status === 'Creado' ? 'red' : row.Status === 'En Proceso' ? 'green' : row.Status === 'Concluido' ? 'blue' : 'DeepPink'}
                    />         
                )
                } 
            }else
            if(value.id === 'Fotos'){ 
                if(value.show){            
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        fotos={true}
                        label={value.label} 
                        idCell={row.idSubGarantia}
                        fixed={value.fixed}
                        statusRow={statusRow}
                    />    
                )}
            }else
            if( value.id === 'MotGar' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row.MotivosString}
                        fixed={value.fixed}
                    />
                );
            }else{
                if(value.show){ 
                return( 
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        fixed={value.fixed}
                    />
                );
                }
            }
        });

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

        const HandleOpenRow = ()=>{
            setOpenRow(!openRow);
        };

        return(
            <Fragment>
                <TrYounetStyled key={`fila-${index}-${row.idSubGarantia}`}  selected={statusRow}>
                    <TableCell padding="checkbox" style={{maxWidth:60, minWidth:60, paddingTop:3}}>
                        <Checkbox
                            checked={statusRow}
                            color='primary'
                            onClick={HandlePreClickRow}
                        />
                    </TableCell>
                    <TableCell padding="checkbox" style={{maxWidth:100, minWidth:100, paddingTop:3}}>
                        <CellAction 
                            data={row} 
                            HandleSaveRows={HandleSaveRows}
                            tiposGarantia={tiposGarantia}
                            motivosGarantia={motivosGarantia}
                            HandleClear={HandleClear}
                        />
                        <IconButton aria-label="expand row" size="small" onClick={HandleOpenRow} color='primary' style={{marginLeft:10}}>
                            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    { HeadCellArr }
                </TrYounetStyled>
                <TrYounetStyled key={`subFila-${index}-${row.id}`} selected={statusRow}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={openRow} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                            <Table size="small">
                                <TableHead>
                                <TableRow style={{backgroundColor:'#CAD226', color:'#fff', fontWeight:'bold'}}>
                                    <TableCell align="center" style={{width:100}} >Action</TableCell>
                                    <TableCell align="center" >Codigo</TableCell>
                                    <TableCell align="center" >Cantidad</TableCell>
                                    <TableCell align="center" >Motivo</TableCell>
                                    <TableCell align="center" >Vencimiento Garantia</TableCell>
                                    <TableCell align="center" >Observacion</TableCell>
                                    <TableCell align="center" style={{width:130}}>Status</TableCell>
                                    <TableCell align="center" >Grafico</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                { row.ElementosArr && row.ElementosArr.map((elementRow) => (
                                    <TableRow key={elementRow._id}>
                                    <SubCellAction row={elementRow} idGarantia={row.idGarantia} idSubGarantia={row.idSubGarantia}HandleClear={HandleClear}/>
                                    <TableCell align="center" style={{fontSize:10}}> {elementRow.Codigo.map(codRow=> codRow.codigo).toString()} </TableCell>
                                    <TableCell align="center" style={{fontSize:10}}> {elementRow.CanElem} </TableCell>
                                    <TableCell align="center" style={{fontSize:10}}> {elementRow.MotGar.map(motRow=> motRow.motivo).toString()} </TableCell>
                                    <TableCell align="center" style={{fontSize:10}}>{elementRow.FecVen}</TableCell>
                                    <TableCell align="center" style={{fontSize:10}}> {elementRow.ObservacionGar} </TableCell>
                                    <TableCell align="center" style={{fontSize:11}}> {elementRow.Status} </TableCell>
                                    <TableCell align="center"> { 
                                        elementRow.Status === 'Pre-Creado' ?
                                        (
                                                    <div>
                                                    <Brightness1Icon style={{color:'blue'}}/>
                                                    <Brightness1Icon />
                                                    <Brightness1Icon />
                                                    <Brightness1Icon />
                                                    </div>
                                        ):  elementRow.Status === 'Creado'?
                                        (
                                                    <div>
                                                    <Brightness1Icon />
                                                    <Brightness1Icon style={{color:'red'}}/>
                                                    <Brightness1Icon />
                                                    <Brightness1Icon />
                                                    </div>
                                        ) : elementRow.Status === 'En Proceso' ?
                                        ( 
                                                    <div>
                                                    <Brightness1Icon />
                                                    <Brightness1Icon />
                                                    <Brightness1Icon style={{color:'yellow'}}/>
                                                    <Brightness1Icon />
                                                    </div>
                                        ) : elementRow.Status === 'Finalizado' ?
                                        (
                                                    <div>
                                                    <Brightness1Icon />
                                                    <Brightness1Icon />
                                                    <Brightness1Icon />
                                                    <Brightness1Icon style={{color:'green'}}/>
                                                    </div>
                                        ):( 
                
                                                    <div>
                                                        <Brightness1Icon />
                                                        <Brightness1Icon />
                                                        <Brightness1Icon />
                                                        <Brightness1Icon />
                                                    </div>
                                        )
                                    }
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TrYounetStyled>
          </Fragment>
        );
    });

    const SubCellAction = (props)=>{
        /*                             VARIABLES                           */
        const { row, idGarantia, idSubGarantia, HandleClear } = props;
        /*                                                                 */
      
      
        /*                             CONTEXTOS                           */
        const { enqueueSnackbar } = useSnackbar();
        /*                                                                 */
      
      
        /*                         ESTADOS BOOLEANOS                       */
        const [ isContinuoDelete, setContinuoDelete ] = useState(false);
        const [ openPreDelete, setOpenPreDelete ] = useState(false);
        const [ openPhotos, setOpenPhotos ] = useState(false);
        /*                                                                 */
      
        const HandlePreDelete = ()=>{
          setOpenPreDelete(true);
        };
      
        const HandleDelete = ()=>{
          setContinuoDelete(true)
          fetch('/Instalacion_ReGarantiaVentas',{
            method: 'DELETE',
            body: JSON.stringify({idElement:row._id, idGarantia, idSubGarantia, Fotos:row.Fotos}),
            headers:{'Content-Type':'application/json'}
          })
          .then(response=> response.json())
          .then(result =>{
            enqueueSnackbar('Eliminado', {variant:'success'});
            setTimeout(()=>{
              HandleClosePreDelete();
              setContinuoDelete(false);
              setTimeout(()=>{
                HandleClear();
              },500);
            },1000)
          });
        };
      
        const HandleClosePreDelete = ()=>{
          setOpenPreDelete(false);
        };
      
        const HandleShowPhotos = ()=>{
          if(row.Fotos.length > 0){
            setOpenPhotos(true);
          }else{
            alert('NO EXISTEN FOTOS');
          }
          
        };
      
        const HandleClosePhotos = ()=>{
          setOpenPhotos(false);
        };
      
        return(
          <React.Fragment>
            <Dialog
              open={openPreDelete}
              onClose={HandleClosePreDelete}
              // PaperComponent={PaperComponent}
              fullWidth
              maxWidth={'sm'}
              aria-labelledby="draggable-dialog-title"
              style={{padding:0}}
              disableBackdropClick
              disableEscapeKeyDown
            >
              <DialogTitle id="customized-dialog-title" onClose={HandleClosePreDelete}>
                  Desea Eliminar este Item?
              </DialogTitle>
                <DialogContent style={{margin:0, padding:0, }}>
                <Divider />
                    <Paper square style={{margin:0, padding:20,overflow:'hidden'}}>  
                      <Grid container justify='center' style={{margin:0, padding:5}}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{alignSelf:'center'}}>
                          <Grid container justify='center' spacing={2}>
                            <ButtonSemantic negative onClick={HandleClosePreDelete}>Cancelar</ButtonSemantic>
                              {
                                isContinuoDelete ?
                                <ButtonSemantic loading>Loading</ButtonSemantic>
                                : (
                                <ButtonSemantic onClick={HandleDelete} primary>
                                  Proceder <IconSemantic name='right chevron' />
                                </ButtonSemantic>
                                )
                              }
                             
            
                            </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                </DialogContent>
            </Dialog>
            
            <Viewer
              visible={openPhotos}
              onClose={HandleClosePhotos}
              images={row.Fotos}
              zIndex={2000}
            />
            <TableCell align="center"> 
              <IconButton size='small' onClick={HandlePreDelete}>
                <DeleteIcon color='secondary' />
              </IconButton>
              <IconButton size='small' onClick={HandleShowPhotos}>
                <PhotoAlbumIcon color='secondary' />
              </IconButton>
            </TableCell>
          </React.Fragment>
      
          
        )
    };

    const FotosRow = ({info, statusRow})=>{                                                            
    
        /*                         ESTADOS BOOLEANOS                       */
        const [ openPhotos, setOpenPhotos ] = useState(false);
        /*                                                                 */

        const HandleShowPhotos = ()=>{
            if(info.length > 0){
            setOpenPhotos(true);
            }else{
            alert('NO EXISTEN FOTOS');
            }
        };

        const HandleClosePhotos = ()=>{ setOpenPhotos(false)};

        return(
            <Fragment>
                <Viewer
                    visible={openPhotos}
                    onClose={HandleClosePhotos}
                    images={info}
                    zIndex={2000}
                />
                <IconButton size='small' onClick={HandleShowPhotos} >
                    <PhotoAlbumIcon color={statusRow ? 'primary':'secondary'} />
                </IconButton>
            </Fragment>
        );
    };

    const CellAction = (props)=>{
        const {data, tiposGarantia, motivosGarantia, HandleClear} = props;
        const { enqueueSnackbar } = useSnackbar();
        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;
        const [ listCodigos, setListCodigos ] = useState([]);
        const [ formulario, setFormulario ] = useState({
          Codigo:[],
          MotGar:[],
          ObservacionGar:'',
          idInstalacion:data._id
        });
        const [ pictures, setPictures ] = useState([]);
        const [ tipos, setTipos ] = useState(tiposGarantia);
        const [ arrMotivos, setArrMotivos ] = useState([{motivo:'', id:'Motivo1' }]);
        const [ cantMotivos, setCantMotivos ] = useState(1);
      
      
        /*                         ESTADOS BOOLEANOS                       */
        const [ isSaving, setSaving ] = useState(false);
        const [ readySave, setReadySave ] = useState(false);
        const [ openAdd, setOpenAdd ] = useState(false);
        const [ openPreAdd, setOpenPreAdd ] = useState(false);
        const [ isContinuoAdd, setContinuoAdd ] = useState(false);
        const [ validacion, setValidacion ] = useState(false);
        const [ unMountPhotos, setUnMountPhotos ] = useState(false);

        useEffect(()=>{
            if(data.FecVen !== 'NO APLICA' || data.FecVen !== 'VENCIDO'){
              const KF = motivosGarantia.filter(value=> value.tiptra.toString() === data.TipTra.toString());
              if(KF.length === 1){
                const TipGarantia = KF[0].tipgar.toString();
                const arrFil2 = tiposGarantia.filter(value=> value.tipgar.toString() === TipGarantia);
                setTipos(arrFil2);
              }
            }
        },[]); // eslint-disable-line react-hooks/exhaustive-deps
             
        useEffect(
        ()=>{
            if(validacion){ 
                setValidacion(false);
                if(formulario.Codigo.length <= 0){
                enqueueSnackbar('Selecione 1 o más Codigos', {variant:'error'}); 
                setSaving(false);            
                }else{ 
                if(formulario.MotGar === ''){
                    enqueueSnackbar('Casillero Motivo Vacio', {variant:'error'}); 
                    setSaving(false);         
                }else{ 
                    if(formulario.ObservacionGar === ''){
                    enqueueSnackbar('Casillero Observacion Vacio', {variant:'error'});
                    setSaving(false);   
                    }else{
                    if(pictures.length > 0){
                        HandleSaveImages();
                    }else{
                        enqueueSnackbar('DEBE EXISTIR POR LO MENOS UNA FOTO', {variant:'error'});
                        setSaving(false);    
                    }
                    }
                }
                }   
            }
        },[validacion]);// eslint-disable-line react-hooks/exhaustive-deps
        
        useEffect(()=>{
            if(readySave){
                setReadySave(false);
                HandleSave();
            }
        },[readySave]);// eslint-disable-line react-hooks/exhaustive-deps
        
        useEffect (()=>{
            if(unMountPhotos){
                setTimeout(()=>{
                setUnMountPhotos(false);
                },1000)
                
            }
        },[unMountPhotos])// eslint-disable-line react-hooks/exhaustive-deps

        const HandleCloseAdd = ()=>{ setOpenAdd(false); };

        const HandleSelectCodigos = (value)=>{ setFormulario({...formulario, Codigo:value, CanElem:value.length})};

        const HandleFormulario = (e)=>{ setFormulario({...formulario, [e.target.id]: e.target.value})};

        const HandleClosePreAdd = ()=>{ setOpenPreAdd(false)};

        const HandleProceder = ()=>{
            setContinuoAdd(true);
            if(data.ElementosArr){
                const arr = [];
                data.ElementosArr.forEach(value=>{
                    value.CodigosArr.forEach(value2=>{ 
                      arr.push( value2.codigo )
                    })
                });
                setTimeout(()=>{
                    const arrFilter = data.CodigosArr.filter(value=> !arr.includes(value.codigo));
                    setTimeout(()=>{
                      setListCodigos(arrFilter);
                      setTimeout(()=>{
                        setContinuoAdd(false);
                        setOpenPreAdd(false);
                        setOpenAdd(true);
                      },1000);
                    },500)
                },500);
            }else{
                setListCodigos(data.CodigosArr);
                setTimeout(()=>{
                    setContinuoAdd(false);
                    setOpenPreAdd(false);
                    setOpenAdd(true);
                },1000);
            }
            
        };

        const HandleOpenDialogValidacion = ()=>{
            setSaving(true);
            setValidacion(true);
        };

        const onDrop = index => e => {
            let newArr = [...pictures];
            newArr[index] = e;
            setPictures(newArr);
        };

        const HandleResetPhotos = ()=>{
            setPictures([]);
            setUnMountPhotos(true);
        };

        const HandleClearAdd = ()=>{
            setFormulario({...formulario,
              Codigo:[],
              MotGar:'',
              ObservacionGar:'',
              Fotos:[]
            });
            HandleResetPhotos();
        };

        const HandleAddElement = ()=>{
            switch(data.FecVen){
                case 'VENCIDO': 
                    enqueueSnackbar('INSTALACION VENCIDA', {variant:'error'});
                    break;
                case 'NO APLICA':
                    enqueueSnackbar('TIPO DE TRABAJO NO INCLUIDO', {variant:'error'});
                    break;
                default:
                    HandleValidacionSubEl();
                    break;
            }   
        };

        const HandleValidacionSubEl = ()=>{    
            if(data.ElementosArr){
                if(data.ElementosArr.length > 0){
                    const cantCodi = data.CodigosArr.length;
                    let subCantCodi = 0;
                    data.ElementosArr.forEach(value=>{
                      subCantCodi += value.Codigo.length;
                    });
                    if(cantCodi === subCantCodi){
                      enqueueSnackbar('NO HAY ELEMENTOS DISPONIBLES', {variant:'info'});
                    }else{
                      setOpenPreAdd(true);
                    }
                  }else{ 
                    setOpenPreAdd(true);
                  }
            }else{
                setOpenPreAdd(true);
            }
            
        };

        const HandleMotivos = (id, value) =>{
            if(value !== null){ 
              const arrFilMotivos = motivosGarantia.filter(motValue=> motValue.tiptra.toString() === data.TipTra.toString());
              console.log(arrFilMotivos);
              const arrFilTipo = (tiposGarantia.filter(tipValue=> tipValue.motgar.toString() === value.toString()))[0].tipgar.toString();
              console.log(arrFilTipo);
              const arrFiltrado = arrFilMotivos.filter(arrValue=> arrValue.tipgar.toString() === arrFilTipo);
              if(arrFiltrado.length > 0){
                  let fechaV = new Date(data.Creacion);
                  fechaV.setDate(fechaV.getDate() + parseInt(arrFiltrado[0].tiegar));
                  const fechaGar =  `${fechaV.getFullYear()}-${fechaV.getMonth() + 1}-${fechaV.getDate()}`;                             
                  var fecha2 = moment(fechaGar);
                  var fechaAcTu = (moment().format()).split('T')[0]
                  var Status = fecha2.diff(fechaAcTu, 'days');
                  console.log(Status)
                  if(Status < 0 ){
                      alert('MOTIVO DE GARANTIA VENCIDO')
                  }else{
                    let newArr = [...arrMotivos]; // copying the old datas array
                    const arrFilter = newArr.filter(value=>value.id!== id);
                    const objeto = {};
                    objeto.id = id;
                    objeto.motivo = value;
                    arrFilter.push(objeto);
                    setArrMotivos(arrFilter);
                  }  
              }else{
                alert('NO EXISTE ESTE MOTIVO');
              }
            }else{
              let newArr = [...arrMotivos]; // copying the old datas array
              const arrFilter = newArr.filter(value=>value.id!== id);
              const objeto = {};
              objeto.id = id;
              objeto.motivo = value;
              arrFilter.push(objeto);
              setArrMotivos(arrFilter);
            }
        };
        
        const HandleCrearMotivos = ()=>{
          setCantMotivos(cantMotivos + 1);
          setArrMotivos([...arrMotivos, {motivo:'', id:`Motivo${cantMotivos + 1}`}]);
        };
        
        const HandleBorrarMotivos= (id)=>{
          setCantMotivos( cantMotivos -1);
          let filMotivos = arrMotivos.filter(value=> value.id !== id);
          setArrMotivos(filMotivos);
        };

        const MotivosEl = arrMotivos.map((value, index)=>(
            <ElementMotivo index={index} key={value.id} valor={value.motivo} id={value.id}  
              total={arrMotivos.length} 
              HandleCrearMotivos={HandleCrearMotivos}
              HandleBorrarMotivos={HandleBorrarMotivos} 
              HandleMotivos={HandleMotivos} 
              arrMotivos={arrMotivos}
              cantMotivos={cantMotivos}
              tipos={tipos}
            />
        ));

        const HandleSave = ()=>{
            fetch('/Instalacion_ReGarantiaVentas',{
              method: 'POST',
              body: JSON.stringify({formulario, idGarantia:data.idGarantia, idSubGarantia:data.idSubGarantia, NumGar:data.NumGar}),
              headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                setTimeout(()=>{
                    HandleCloseAdd();
                    setSaving(false);
                    setTimeout(()=>{
                    HandleClear();
                    },500);
                },1000)
            });
        };
        
        const HandleSaveImages = ()=>{
            const fd = new FormData();
            const arr = [];
            const API_URL = '/fetch_GarantiaImagenes';
            const tipos = ['Frontal', 'Lateral A', 'Lateral B', 'Panoramica'];
            const arrCodigos =  formulario.Codigo.map(value=>value.codigo).toString();
            const arrFil = pictures.filter(value=>value !== undefined);
            setTimeout(()=>{
                arrFil.forEach((value,index)=>{
                const objeto = {};
                let name =  `/fotosGarantias/${data.numpro}-${data.Local}-${arrCodigos}-${data.TipTra}-${data.idSubGarantia}-${index}.jpg`;
                fd.append(value[0].name,arrFil[index][0],name);
                objeto.src =  name;
                objeto.tipo = tipos[index];
                arr.push(objeto);
                if(index === (arrFil.length - 1)){
                    if(arrMotivos.length === 1){
                    const motPrincipal = arrMotivos[0].motivo.toString();
                    const arrFilMotivos = motivosGarantia.filter(motValue=> motValue.tiptra.toString() === data.TipTra.toString());
                    const arrFilTipo = (tiposGarantia.filter(tipValue=> tipValue.motgar.toString() === motPrincipal))[0].tipgar.toString();
                    const arrFiltrado = arrFilMotivos.filter(arrValue=> arrValue.tipgar.toString() === arrFilTipo);
                    const fechaV = new Date(data.Creacion);
                    fechaV.setDate(fechaV.getDate() + parseInt(arrFiltrado[0].tiegar));
                    const fechaGar =  `${fechaV.getFullYear()}-${fechaV.getMonth() + 1}-${fechaV.getDate()}`;
                    setFormulario({...formulario, FotosFirst:data.Fotos, Fotos:arr, Status:'Pre-Creado', MotGar:arrMotivos, FecVen:fechaGar, TipGar:arrFiltrado[0].tipgar});
                    fetch(API_URL, {method: 'POST', body: fd})
                        .then(res => res.json()) 
                        .then(res => {
                            if(res.message){
                                console.log('ReadySave');
                                enqueueSnackbar(res.message,{variant:'info'});
                                setTimeout(()=>{
                                    setReadySave(true);
                                },2000);
                            }else{
                                enqueueSnackbar(res.status,{variant:'error'});
                            }                                    
                        });
                    }else{
                    let arrTiempos = 0;
                    let tipgarString = '';
                    arrMotivos.forEach(valueMot=>{
                        const arrFilMotivos = motivosGarantia.filter(motValue=> motValue.tiptra.toString() === data.TipTra.toString());
                        const arrFilTipo = (tiposGarantia.filter(tipValue=> tipValue.motgar.toString() === valueMot.motivo.toString()))[0].tipgar.toString();
                        const arrFiltrado = arrFilMotivos.filter(arrValue=> arrValue.tipgar.toString() === arrFilTipo);
                        if(arrTiempos.length === 0){
                            arrTiempos = parseInt(arrFiltrado[0].tiegar);
                            tipgarString = arrFiltrado[0].tipgar.toString();
                        }else{
                            if(parseInt(arrFiltrado[0].tiegar) > arrTiempos ){
                                arrTiempos = parseInt(arrFiltrado[0].tiegar);
                                tipgarString = arrFiltrado[0].tipgar.toString();
                            }
                        }
                    });
                    const fechaV = new Date(data.Creacion);
                    fechaV.setDate(fechaV.getDate() + arrTiempos);
                    const fechaGar =  `${fechaV.getFullYear()}-${fechaV.getMonth() + 1}-${fechaV.getDate()}`;
                    setFormulario({...formulario, FotosFirst:data.Fotos, Fotos:arr, Status:'Pre-Creado', MotGar:arrMotivos, FecVen:fechaGar, TipGar:tipgarString});
                    fetch(API_URL, {method: 'POST', body: fd})
                        .then(res => res.json()) 
                        .then(res => {
                            if(res.message){
                                console.log('ReadySave');
                                enqueueSnackbar(res.message,{variant:'info'});
                                setTimeout(()=>{
                                    setReadySave(true);
                                },2000);
                            }else{
                                enqueueSnackbar(res.status,{variant:'error'});
                            }                                    
                        });
                    }
                    
                }
                });
            },500);
        };

        return(
            <Fragment>
                <Dialog
                    open={openAdd}
                    onClose={HandleCloseAdd}
                    fullWidth
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="customized-dialog-title" onClose={HandleCloseAdd}>
                        Agregar Item
                    </DialogTitle>
                    <DialogContent style={{margin:0, padding:0, overflowX:'hidden'}}>
                        <Divider />
                            <Grid container justify='center' style={{margin:0, padding:10}}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{alignSelf:'center'}}>
                                    <Grid container justify='center' spacing={2}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Autocomplete
                                                multiple
                                                id="Codigos"
                                                options={listCodigos}
                                                disableCloseOnSelect
                                                value={formulario.Codigo || ''}
                                                onChange={(e,value)=>{HandleSelectCodigos(value) }}
                                                getOptionLabel={(option) => option.codigo}
                                                renderOption={(option, { selected }) => (
                                                    <React.Fragment>
                                                        <Checkbox
                                                            icon={icon}
                                                            checkedIcon={checkedIcon}
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        />
                                                    {option.codigo}
                                                    </React.Fragment>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" label="Codigos" fullWidth placeholder="Seleccione..." />
                                                )}
                                            />
                                        </Grid>
                                        {
                                            MotivosEl
                                        }
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <TextField 
                                            id="ObservacionGar"
                                            name='ObservacionGar' 
                                            fullWidth
                                            label="Observacion" 
                                            value={formulario.ObservacionGar || ''}
                                            onChange={HandleFormulario}
                                            variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Grid container justify='center'>
                                                <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                                    {
                                                    unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                                                    :
                                                    <ImageUploader
                                                        withIcon={false}
                                                        onChange={onDrop(0)}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={15242880}
                                                        singleImage={true}
                                                        withLabel={false}
                                                        withPreview={true}
                                                        buttonText='FRONTAL'
                                                    />
                                                    }   
                                                </Grid>
                                                <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                                    {
                                                    unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                                                    :
                                                    <ImageUploader
                                                        withIcon={false}
                                                        onChange={onDrop(1)}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={15242880}
                                                        singleImage={true}
                                                        withLabel={false}
                                                        withPreview={true}
                                                        buttonText='LATERAL IZ.'
                                                    />
                                                    }
                                                </Grid>
                                                <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                                    {
                                                    unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                                                    :
                                                    <ImageUploader
                                                        withIcon={false}
                                                        onChange={onDrop(2)}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={15242880}
                                                        singleImage={true}
                                                        withLabel={false}
                                                        withPreview={true}
                                                        buttonText='LATERAL DER.'
                                                    />
                                                    }
                                                </Grid>
                                                <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
                                                    {
                                                    unMountPhotos ? <FacebookCircularProgress size={35} style={{marginLeft:40}}/>
                                                    :
                                                    <ImageUploader
                                                        withIcon={false}
                                                        onChange={onDrop(3)}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={15242880}
                                                        singleImage={true}
                                                        withLabel={false}
                                                        withPreview={true}
                                                        buttonText='PANORÁMICA'
                                                    />
                                                    }
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}  >
                                                    <Button 
                                                        onClick={HandleOpenDialogValidacion} 
                                                        variant="contained" 
                                                        color="primary" 
                                                        fullWidth 
                                                        size='large'
                                                        startIcon= {!isSaving && <SaveIcon/> } >
                                                        {isSaving ? <FacebookCircularProgress size={17}/> : 'Guardar'}
                                                    </Button>
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}  >
                                                    <Button 
                                                    fullWidth 
                                                    size='large' 
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={HandleResetPhotos}
                                                    endIcon={<RefreshIcon/>} >
                                                        Resetear Fotos
                                                    </Button>
                                                </Grid>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  >
                                                    <Button 
                                                    fullWidth 
                                                    size='large' 
                                                    variant="contained"
                                                    onClick={HandleClearAdd}
                                                    endIcon={<CachedIcon/>} >
                                                    Limpiar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openPreAdd}
                    onClose={HandleClosePreAdd}
                    fullWidth
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="customized-dialog-title" onClose={HandleClosePreAdd}>
                        Desea Agregar un Item?
                    </DialogTitle>
                    <DialogContent style={{margin:0, padding:0, }}>
                    <Divider />
                        <Paper square style={{margin:0, padding:20,overflow:'hidden'}}>  
                            <Grid container justify='center' style={{margin:0, padding:5}}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{alignSelf:'center'}}>
                                <Grid container justify='center' spacing={2}>
                                <ButtonSemantic negative onClick={HandleClosePreAdd}>Cancelar</ButtonSemantic>
                                    {
                                    isContinuoAdd ?
                                    <ButtonSemantic loading>Loading</ButtonSemantic>
                                    : (
                                    <ButtonSemantic onClick={HandleProceder} primary>
                                        Proceder <IconSemantic name='right chevron' />
                                    </ButtonSemantic>
                                    )
                                    }
                                
                
                                </Grid>
                            </Grid>
                            </Grid>
                        </Paper>
                    </DialogContent>
                </Dialog>
                <IconButton size='small' onClick={HandleAddElement}>
                    <AddCircleIcon color='primary'/>
                </IconButton>
            </Fragment>
            
        )
    };

    const ElementMotivo = (props)=>{
        const { valor, index, total, id, HandleBorrarMotivos, HandleMotivos, HandleCrearMotivos, tipos, arrMotivos } = props;
        let cantItem = index + 1;
      
        const HandleSubBorraMotivos = ()=>{ HandleBorrarMotivos(id) };
      
        const HandleSubMotivos = (e, value)=>{ HandleMotivos(e, value) };
      
        if(arrMotivos.length === 1){
            return(
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'flex', flexDirection:'row'}}>  
                  <Grid container>
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                      <Autocomplete
                        id={id}
                        options={tipos.map(value=>value.motgar)}
                        value={valor || ''}                              
                        renderInput={(params) => <TextField {...params} label='Motivo Primario' variant="outlined" fullWidth />}
                        onChange={(e,value, reason)=>{ HandleSubMotivos(id, value); }}  
                      />     
                    </Grid>
                    <Grid item>
                      <IconButton onClick={HandleCrearMotivos} >
                          <AddCircleOutlineIcon color='primary'/>
                      </IconButton>
                    </Grid>
                  </Grid>         
                </Grid>   
            )
        }else{
            return(
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'flex', flexDirection:'row'}}>
                  <Grid container>
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                      <Autocomplete
                        id={id}
                        options={tipos.map(value=>value.motgar)}
                        value={valor || ''}                              
                        renderInput={(params) => <TextField {...params} label={index > 0 ? 'Motivo Secundario' : 'Motivo Primario'} variant="outlined" fullWidth />}
                        onChange={(e,value, reason)=>{
                              HandleSubMotivos(id, value);
                            
                        }}  
                      />     
                    </Grid>
                    <Grid item>
                    { cantItem === total && 
                    <>
                        <IconButton onClick={HandleCrearMotivos} >
                            <AddCircleOutlineIcon color='primary'/>
                        </IconButton>
                        <IconButton onClick={HandleSubBorraMotivos}>
                            <DeleteIcon color='secondary'/>
                        </IconButton>
                    </>
                    }
                    </Grid>
                    </Grid>
                </Grid>   
            )
        }
        
    };

    const ReGarantiaVenta = (props)=>{

        /***********************VARIABLES*********************/
        //const { enqueueSnackbar } = useSnackbar();
        const { setOpen, setHeaderWord } = useAuth();
        const classes = useStyles();
        const dense = true;
        const tableElement = useRef(null);
        const { enqueueSnackbar } = useSnackbar();
    /*****************************************************/

        const [ rows, setRows ] = useState([]);
        const [ backupsRow, setBackupsRow ] = useState([]);
        const [ order, setOrder] = useState('asc');
        const [ orderBy, setOrderBy] = useState('NumGar');
        const [ page, setPage] = useState(0);
        const [ rowsPerPage, setRowsPerPage] = useState(25);
        const [ headersColumn, setHeadersColumn ] = useState(()=>{
            try{
                if(window.localStorage.getItem('headersReGar')){
                    const headersStorage = window.localStorage.getItem('headersReGar') ;
                    const headersParse = JSON.parse(headersStorage);
                    return headersParse
                }else{
                    return headCellsColumn
                }
            }catch(err){
                console.log(err);
                return headCellsColumn
            }
        });
        const [ openMenuColumn, setOpenMenuColumn ] = useState(null);
        const [ openMenuColumnFixed, setOpenMenuColumnFixed ] = useState(null);
        const [ activeIndex, setActiveIndex] = useState(null);
        const [ activeRef, setActiveRef] = useState(null);
        const [ isSavingHeaders, setSavingHeaders ] = useState(false);
        const [ openMenuFilter, setOpenMenuFilter ] = useState(false);
        const [ openMenuDate, setOpenMenuDate ] = useState(null);
        const [ openMenuPdf, setOpenMenuPdf ] = useState(null);
        const [ openMenuExcel, setOpenMenuExcel ] = useState(null);
        const [ arrFiltrado, setArrFiltrado ] = useState([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:''}]);
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
        const [ arrHeadersPdf, setArrHeadersPdf ]= useState([]);
        const [ isWaitingSearch, setWaitingSearch ] = useState(true);
        const [ numproSearch, setNumproSearch ] = useState('');
        const [ motivosGarantia, setMotivosGarantia ] = useState([]);
        const [ tiposGarantia, setTiposGarantia ] = useState([]);
        const [ isSavingGarantia, setSavingGarantia ] = useState(false);
        const [ PreIngresos, setPreIngresos ] = useState([]);
        const [ openPreSave, setOpenPreSave ] = useState(false);
        const [ textSave, setTexSave ] = useState('Guardar');
        const [ showNumGar, setShowNumGar ] = useState(false);
        const [ numGarCreated, setNumGarCreated] = useState('');
        const [ isResearch, setResearch ] = useState(false);
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
        const [ PreCorreos, setPreCorreos ] = useState([]);
        const [ openPreCorreos, setOpenPreCorreos ] = useState(false);
        const [ isSaving, setSaving ] = useState(false);
        const [ isPreCorreoCreating, setPreCorreoCreating ] = useState(false);
        const [ columns ] = useState([
            { name: 'NumGar', title: 'GARANTIA' },
            { name: 'numpro', title: 'PPTO' },
            { name: 'Ejecutiva', title: 'EJECUTIVA' },
            { name: 'CanElem', title: 'CANTIDAD' },
            { name: 'TipTra', title: 'TIPO TRABAJO' },
            { name: 'Local', title: 'LOCAL' },
            { name: 'MotivosString', title: 'MOTIVOS GARANTIA' },
            { name: 'Proyecto', title: 'PROYECTO' },
            { name: 'FechaInicio', title: 'F. INICIO' },
            { name: 'FechaAcuerdo', title: 'F. ACUERDO' },
            { name: 'FechaTermino', title: 'F. TERMINO' },
        ]);
        const [ defaultColumnWidths ] = useState([
            { columnName: 'NumGar', width: 105 },
            { columnName: 'numpro', width: 80 },
            { columnName: 'Ejecutiva', width: 160 },
            { columnName: 'CanElem', width: 100 },
            { columnName: 'TipTra', width: 160 },
            { columnName: 'Local', width: 140 },
            { columnName: 'MotivosString', width: 290 },
            { columnName: 'Proyecto', width: 480 },
            { columnName: 'FechaInicio', width: 110 },
            { columnName: 'FechaAcuerdo', width: 120 },
            { columnName: 'FechaTermino', width: 120 },
        ]);
        const [ hiddenColumnNames, setHiddenColumnNames ] = useState([]);
        const [ selection, setSelection ] = useState([]);
        const [ isProcessingMail, setProcessingMail ] = useState(false);
        const [ tableColumnExtensions] = useState([
            { columnName: 'NumGar', align: 'center' },
            { columnName: 'numpro', align: 'center' },
            { columnName: 'FechaInicio', align: 'right' },
            { columnName: 'FechaAcuerdo', align: 'right' },
            { columnName: 'FechaTermino', align: 'right' },
        ]);

        useEffect(()=>{
            const HandleSearchInfGar = async ()=>{
                const motivosG = await fetch('/MotivoGarantias');
                const datam = await motivosG.json();
                const tiposG = await fetch('/TipoGarantias');
                const datat = await tiposG.json();
                enqueueSnackbar('Ingrese un PPTO', {variant:'info'});
                setMotivosGarantia(datam);
                setTiposGarantia(datat);
            };

            setOpen(false); 
            setHeaderWord('Garantia/ReGarantiaVentas');
            HandleSearchInfGar();
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        useEffect(()=>{
           if(isResearch){
               setResearch(false);
               HandleSearchGarantia();
           }
        },[isResearch]); // eslint-disable-line react-hooks/exhaustive-deps

        useEffect(()=>{
            if(isContinuoPdf){
                setContinuoPdf(false);
                setReadyPdf(true);
            }
        },[isContinuoPdf]); // eslint-disable-line react-hooks/exhaustive-deps

        useEffect(()=>{
            if(isProcessingMail){
                setProcessingMail(false);
                setOpenPreCorreos(true); 
                setPreCorreoCreating(false);
            }
        },[isProcessingMail]);

        /****************** MANEJADORES ****************/
            const handleClickMenu = (event) => { setOpenMenuColumn(event.currentTarget) };

            const handleClickMenuFixed = (event) => { setOpenMenuColumnFixed(event.currentTarget);};

            const handleClickMenuFilter = (event) => {
                setOpenMenuFilter(true);
                setElementFilterShow(true);
            };

            const handleClickMenuDate = (event) => { setOpenMenuDate(event.currentTarget);};

            const handleClickMenuPdf = (event) => { setOpenMenuPdf(event.currentTarget);};

            const handleClickMenuExcel = (event) => { setOpenMenuExcel(event.currentTarget);};

            const handleCloseMenu = () => { setOpenMenuColumn(null) };

            const handleCloseMenuFixed = () => { setOpenMenuColumnFixed(null) };

            const handleCloseMenuFilter = () => {
                setOpenMenuFilter(false);
                setElementFilterShow(false);
            };

            const handleCloseMenuDate = () => { setOpenMenuDate(null)};

            const handleCloseMenuPdf = ()=>{ setOpenMenuPdf(null)};

            const handleCloseMenuExcel = ()=>{ setOpenMenuExcel(null) };

            const HandleChangeWidth = useCallback((id, ref)=>{
                setActiveIndex(id);
                setActiveRef(ref)
            },[setActiveIndex, setActiveRef])

            const mouseMove = useCallback((e) => {
                console.log(activeRef);
                const gridColumns = headersColumn.map((col, index) => {
                    if (col.id.toString() === activeIndex.toString()) {
                        const widthAct = e.clientX - activeRef.current.offsetLeft;
                        const objeto = {...col};
                        if (widthAct >= propsWidth[activeIndex]) {
                            objeto.width = widthAct;
                            return objeto;
                        }
                    }
                    const objeto = {...col};
                    //objeto.width = activeRef.current.offsetWidth
                    return objeto ;
                });
                console.log(gridColumns)
                setHeadersColumn(gridColumns)
                //tableElement.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
            },[activeIndex, headersColumn, activeRef]);
                
            const removeListeners = useCallback(() => {
                window.removeEventListener("mousemove", mouseMove);
                window.removeEventListener("mouseup", removeListeners);
            }, [mouseMove]);
            
            const mouseUp = useCallback(() => {
                setActiveIndex(null);
                setActiveRef(null)
                removeListeners();
            },[setActiveIndex, removeListeners]);
            
            useEffect(() => {
                if (activeIndex !== null) {
                    window.addEventListener("mousemove", mouseMove);
                    window.addEventListener("mouseup", mouseUp);
                }
            
                return () => {
                    removeListeners();
                };
            }, [activeIndex, mouseMove, mouseUp, removeListeners]);

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
                window.localStorage.setItem('headersReGar', JSON.stringify(arrMap))
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
                window.localStorage.setItem('headersReGar', JSON.stringify(arrMap))
                setSavingHeaders(true);
                setOpenMenuColumnFixed(false)
                setTimeout(()=>{
                    setSavingHeaders(false);
                },2000)
            };

            const ElementMenuFixed = headersColumn.map((value,index)=>{
                return(
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
                )
                
            });

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

            const HandleSaveRows = useCallback((row)=>{
                console.log(row);
                const arrNico = rows.map(value=>{
                    if(value.id === row.id){
                        return row
                    }else{
                        return value
                    }
                });
                setRows(arrNico);
                setBackupsRow(arrNico);
            },[rows]);

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

            const HandleMenuDate = (e)=>{ setElementDate({...elementDate, [e.target.id]:e.target.value })};

            const HandleClearDate = ()=>{
                setElementDate({});
                setOpenMenuDate(null);
                setFilterDate(false);
            };

            const HandleProcessFilterDate = ()=>{
                if(elementDate.Inicio === '' || elementDate.Final === ''){
                    if(elementDate.Inicio === ''){
                        alert('FECHA DE INICIO REQUERIDA');
                    }else{
                        alert('FECHA FINAL REQUERIDA');
                    }
                }else{
                    const resultInicio = elementDate.Inicio.split("-").reduce((a,b)=> parseInt(a) + parseInt(b), 0);
                    const resultFinal = elementDate.Final.split("-").reduce((a,b)=> parseInt(a) + parseInt(b), 0);
                    if(elementDate.idElement === 'NumGar' || elementDate.idElement === 'numpro' || elementDate.idElement === 'Action' || elementDate.idElement === 'Fotos' 
                    || elementDate.idElement === 'CanElem' || elementDate.idElement === 'TipTra' ||  elementDate.idElement === 'ObservacionGar' || elementDate.idElement === 'ObservacionSuper' 
                    || elementDate.idElement === 'MotGar' || elementDate.idElement === 'Status' || elementDate.idElement === 'Ejecutiva' || elementDate.idElement === 'Local' 
                    || elementDate.idElement === 'OT' || elementDate.idElement === 'Proyecto' || elementDate.idElement === 'Cadena' || elementDate.idElement === 'Codigo' || elementDate.idElement === '' ){
                        alert('COLUMNA NO ES COMPARABLE');
                    }else if(resultInicio > resultFinal){ 
                        alert('FECHA DE INICIO DEBE SER MENOR A LA FECHA FINAL');
                    }else{
                        const arrFil = [];
                        backupsRow.forEach((value)=>{
                            const dataEl = value[elementDate.idElement];
                            if(dataEl !== undefined){                         
                                const valFecha = dataEl.split("-").reduce((a,b)=>parseInt(a) + parseInt(b));
                                if(valFecha >= resultInicio){
                                    if(valFecha <= resultFinal) arrFil.push(value);
                                } 
                            }
                        })
                        if(arrFil.length === 0){
                            alert('NO HAY ELEMENTOS QUE VISUALIZAR')
                        }else{
                            setFilterDate(true);
                            setOpenMenuDate(null);
                            setRows(arrFil);
                            setRowsFilterDate(arrFil);
                        }
                        
                    }
                }
                
            };

            const HandleResetFilterDate = ()=>{
                setElementDate({ idElement:'', labelElement:'', Inicio:'', Final:''});
                setFilterDate(false);
                if(isFilterNow){
                    setRows(rowsFilter)
                }else{
                    setRows(backupsRow);
                }    
            };

            const HandleProcessFilterElement = ()=>{
                console.log(arrFiltrado);
                if(isFilterNow){
                    let dataNow = [ ];
                    arrFiltrado.forEach((value,index)=>{
                        if(index === 0){
                            if(value.idElement === 'numpro' || value.idElement === 'CanElem' || value.idElement === 'NumGar' || value.idElement === 'OT'){
                                backupsRow.forEach((value2)=>{
                                    if(parseInt(value2[value.idElement]) === parseInt(value.valorElement)) dataNow.push(value2);
                                });
                            }else if(value.idElement === 'MotGar'){
                                backupsRow.forEach((value2)=>{
                                    if(value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()) dataNow.push(value2);
                                });
                            }else{
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase())  dataNow.push(value2);
                                });
                            }
                        }else{
                            if(value.idElement === 'numpro' || value.idElement === 'CanElem' || value.idElement === 'NumGar' || value.idElement === 'OT'){
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(parseInt(value2[value.idElement]) === parseInt(value.valorElement)) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        parseInt(value2[value.idElement]) === parseInt(value.valorElement)
                                    );
                                }
                            }else if(value.idElement === 'MotGar'){
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                            value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()
                                    );
                                }          
                            }else{
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase())  dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                            value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()
                                    );
                                }
                                    
                            }
                        }
                    }); 
                    let hash = {};
                    dataNow = dataNow.filter(o => hash[o.id] ? false : hash[o.id] = true);
                    setRows(dataNow);
                    setRowsFilter(dataNow);
                }else{
                    if(arrFiltrado[0].valorElement === ''){
                        alert('NO HAY INFORMACION QUE FILTRAR')
                    }else{
                        let dataNow = [ ];
                        arrFiltrado.forEach((value,index)=>{
                            if(index === 0){
                                if(value.idElement === 'numpro' || value.idElement === 'CanElem' || value.idElement === 'NumGar' || value.idElement === 'OT'){
                                    backupsRow.forEach((value2)=>{
                                        if(parseInt(value2[value.idElement]) === parseInt(value.valorElement)) dataNow.push(value2);
                                    });
                                }else if(value.idElement === 'MotGar'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()) dataNow.push(value2);
                                    });
                                }else{
                                    backupsRow.forEach((value2)=>{
                                        if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase())  dataNow.push(value2);
                                    });
                                }
                            }else{
                                if(value.idElement === 'numpro' || value.idElement === 'CanElem' || value.idElement === 'NumGar' || value.idElement === 'OT'){
                                    if(value.selectElement === 'O'){
                                        backupsRow.forEach((value2)=>{
                                            if(parseInt(value2[value.idElement]) === parseInt(value.valorElement)) dataNow.push(value2);
                                        });
                                    }else{
                                        dataNow = dataNow.filter((value2)=>
                                            parseInt(value2[value.idElement]) === parseInt(value.valorElement)
                                        );
                                    }
                                }else if(value.idElement === 'MotGar'){
                                    if(value.selectElement === 'O'){
                                        backupsRow.forEach((value2)=>{
                                            if(value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()) dataNow.push(value2);
                                        });
                                    }else{
                                        dataNow = dataNow.filter((value2)=>
                                            value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()
                                        );
                                    } 
                                }else{
                                    if(value.selectElement === 'O'){
                                        backupsRow.forEach((value2)=>{
                                            if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase())  dataNow.push(value2);
                                        });
                                    }else{
                                        dataNow = dataNow.filter((value2)=>
                                            value2.MotivosString.toString().toLowerCase() === value.valorElement.toString().toLowerCase()
                                        );
                                    }  
                                }
                            }
                        }); 
                        let hash = {};
                        dataNow = dataNow.filter(o => hash[o.id] ? false : hash[o.id] = true);
                        setFilterNow(true);
                        setRows(dataNow);
                        setRowsFilter(dataNow);
                    }
                }
            };

            const HandleResetFilter = ()=>{
                setElementFilterShow(false);
                setArrFiltrado([{idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:''}])
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
                    alert('NO HAY ELEMENTOS A EXPORTAR');
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

            const HandleSearchGarantia = ()=>{
                if(numproSearch === '' || numproSearch < 1000){
                    enqueueSnackbar('Debe ingresar un Numero de Presupuesto Valido para poder realizar la busqueda!',{variant:'error'});
                }else{
                    fetch('/SearchGarantiasCreated',{
                        method: 'POST',
                        body: JSON.stringify({numpro:parseInt(numproSearch)}),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                        .then(response=> response.json())
                        .then(result =>{ 
                            if(result.status){
                                enqueueSnackbar(result.status,{variant:'error'});
                            }else{ 
                                setRows(result);
                                setBackupsRow(result);
                                setWaitingSearch(false);
                            }
                        });   
                    
                }
                
            };

            const HandleNumproGarantia = (e)=>{ setNumproSearch(e.target.value) };

            const HandleResetAll = ()=>{
                setRows([]);
                setBackupsRow([]);
                setWaitingSearch(true);
                setNumproSearch('');
            };

            const HandleClear = useCallback(()=>{
                setWaitingSearch(false);
                setRows([]);
                setBackupsRow([]);
                setPreIngresos([]);
                setOpenPreSave(false);
                setNumGarCreated('');
                setShowNumGar(false);
                setRowsFilter([]);
                setRowsFilterDate([]);
                setFilterDate(false);
                setFilterNow(false);
                setElementFilterShow(true);
                setSelectionArr([]);
                setResearch(true);
            },[]);

            const HandlePreSave = ()=>{
                setSavingGarantia(true);
                const arr = [];
                const arrFilter = [];
                rows.forEach(({ElementosArr})=>{
                    ElementosArr.forEach(({Status})=>{
                         if(Status === 'Pre-Creado'){
                             arrFilter.push('Elem');
                         }
                    })
                });
                if(arrFilter.length > 0){
                    rows.forEach((value,index)=>{
                        const { ElementosArr } = value;             
                        ElementosArr.forEach((value2, index2)=>{
                        if(value2.Status === 'Pre-Creado'){
                            const objeto = {};
                            objeto.idGarantia = value.idGarantia;
                            objeto.idSubGarantia = value.idSubGarantia;
                            objeto.Codigo = value2.Codigo;
                            objeto.CanElem = value2.CanElem;
                            objeto.MotGar = value2.MotGar;
                            objeto.TipGar = value2.TipGar;
                            objeto.ObservacionGar = value2.ObservacionGar;
                            objeto.Status = 'Creado';
                            objeto.Cadena = value.Cadena;
                            objeto.Local = value.Local;
                            objeto.Ciudad = value.Ciudad;
                            objeto.Direccion = value.Direccion;
                            objeto.TipTra = value.TipTra;
                            objeto.FecVen = value2.FecVen;
                            objeto.FecIns = value.FecIns;
                            objeto.Fotos =  value2.Fotos;
                            objeto.isSave = false;
                            objeto.id = `${index}-${index2}`
                            objeto.isRegarantia = true;
                            objeto.NumGarOrigin = value.NumGar;
                            objeto.idGarOrigin = value.idGarantia;
                            objeto.idSubGarOrigin = value.idSubGarantia;
                            objeto.idElementReGar = value2._id;
                            objeto.Creacion = value2.Creacion;
                            objeto.Modificacion = value2.Modificacion;
                            objeto.FotosFirst = value2.FotosFirst;
                            arr.push(objeto);
                        }
                        });
                        if(index === (rows.length - 1)){
                            setPreIngresos(arr);
                            setTimeout(()=>{
                                setOpenPreSave(true);
                            },1000);
                        
                        }
                    });
                }else{
                    enqueueSnackbar('NO EXISTEN ELEMENTOS A GUARDAR',{variant:'info'});
                    setSavingGarantia(false);
                }
            };

            const HandleClosePre = ()=>{
                setOpenPreSave(false);
                setSavingGarantia(false);
            };
        
            const HandleSaveGarantia = (e)=>{
                setSaving(true);
                const laZona="America/Guayaquil";
                const laFecha = moment2().tz(laZona).format();
                const objetoInfo = {};
                objetoInfo.Proyecto = rows[0].Proyecto;
                objetoInfo.Cliente = rows[0].Cliente;
                objetoInfo.numpro = rows[0].numpro;
                objetoInfo.Status = 'Creado';
                objetoInfo.OT = rows[0].OT;
                objetoInfo.Ejecutiva = rows[0].Ejecutiva;
                const arr = [];
                PreIngresos.forEach((values, index)=>{
                    if(values.isSave) arr.push(values);  
                    if(index === (PreIngresos.length - 1))
                    {
                        objetoInfo.Elementos = arr;
                        //setIngresos(arr);
                        fetch('/SaveReGarantiaVentas',{
                            method: 'POST',
                            body: JSON.stringify(objetoInfo),
                            headers:{'Content-Type':'application/json'}
                            })
                            .then(response=> response.json())
                            .then(result =>{
                                enqueueSnackbar(`Garantía N°:${result.message} Creada`,{variant:'success'});
                                //setNumGarNew(result.message);
                                setSaving(false);
                                setSavingGarantia(false);
                                setTexSave('Guardado');
                                setNumGarCreated(result.message);
                                setTimeout(()=>{
                                    setShowNumGar(true);
                                },700);
                                setTimeout(()=>{
                                    setTexSave('Guardar');
                                },500)
                        })
        
                    }
                })
            };

            const HandleCheck = (e)=>{
                const arr = [];
                PreIngresos.forEach((value, index)=>{
                    if(value.id === e.target.name){
                        const objeto = {...value};
                        objeto.isSave = e.target.checked;
                        arr.push(objeto);
                        if(index === (PreIngresos.length - 1) ){
                            setPreIngresos(arr);
                        }
                    }else{
                        arr.push(value);
                        if(index === (PreIngresos.length - 1) ){
                            setPreIngresos(arr);
                        }
                    }
                })
            };

            const handleCloseSelectPersonsMail = ()=>{
                setOpenSelectPersonsMail(false);
                setSaving(false);
                setRemitentes(RemitentesDefined);
            };

            const HandleRemitentes = (e, value)=>{
                setRemitentes(value);
            };

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

        /*******************************************************************************************/
        return(
            <Grid container style={{width:'100%'}}>
                <Dialog
                    open={openPreCorreos}
                    onClose={HandleClosePre}
                    style={{padding:0}}
                    fullScreen 
                    aria-labelledby="alert-dialog-slide-title"
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogContent style={{margin:0, padding:5, minHeight:500}}>
                    < DevGrid
                        rows={PreCorreos}
                        columns={columns}
                    >
                        < SortingState
                            defaultSorting={[{ columnName: 'FechaInicio', direction: 'asc' }]}
                        />
                        < IntegratedSorting />
                        < SelectionState
                            selection={selection}
                            onSelectionChange={setSelection}
                        />
                        < PagingState
                            defaultCurrentPage={0}
                            pageSize={9}
                        />
                        < IntegratedSelection />
                        < IntegratedPaging />
                        < FilteringState defaultFilters={[]} />
                        < IntegratedFiltering />
                        < DevTable 
                            columnExtensions={tableColumnExtensions} 
                        />
                        < TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                        < TableHeaderRow showSortingControls />
                        < TableFilterRow />
                        < TableSelection showSelectAll selectByRowClick/>
                        < TableColumnVisibility
                            hiddenColumnNames={hiddenColumnNames}
                            onHiddenColumnNamesChange={setHiddenColumnNames}
                        />
                        <DevToolbar />
                    
                        <ColumnChooser />
                        <TableColumnReordering
                            defaultOrder={['NumGar', 'numpro', 'Ejecutiva', 'Proyecto', 'CanElem', 'TipTra', 'Local', 'MotivosString', 'FechaInicio', 'FechaAcuerdo', 'FechaTermino' ]}
                        />
                        <PagingPanel />

                    </DevGrid>
                    
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={HandleClosePre} color="secondary" style={{height:40}}>
                            Cancelar
                        </Button>
                        {
                            isSaving ?
                            <ButtonSemantic primary loading style={{margin:3, height:40}}>
                                Loading
                            </ButtonSemantic>
                            :<ButtonSemantic primary onClick={HandleSelectPersonsMail}  style={{margin:3, height:40}}>
                                <i className="icon envelope"></i>
                                Proceder
                            </ButtonSemantic>
                        }
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openMenuFilter}
                    onClose={handleCloseMenuFilter}
                    // PaperComponent={PaperComponent}
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
                    open={openPreSave}
                    onClose={HandleClosePre}
                    fullWidth
                    maxWidth={'xl'}
                    style={{padding:0}}
                    aria-labelledby="alert-dialog-slide-title"
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="alert-dialog-slide-title"><span style={{fontWeight:'bold'}}>Seleccione los elementos a Procesar:</span></DialogTitle>
                    <DialogContent style={{margin:0, padding:5, minHeight:500}}>
                        <Grid container>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16}} square>           
                                    {""}
                                </Paper>
                            </Grid>
                            <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                        Códigos
                                </Paper>
                            </Grid>
                            <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                        Tipo Trabajo
                                </Paper>
                            </Grid>
                            <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                        Cadena
                                </Paper>
                            </Grid>
                            <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                        Local
                                </Paper>
                            </Grid>
                            <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                        Cantidad
                                </Paper>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>                   
                                        Motivo
                                </Paper>
                            </Grid>
                            <Grid item xl={4} lg={4} md={5} sm={5} xs={5}> 
                                <Paper style={{height:60, background:'#0E3B5F', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:16, paddingTop:20}} square>
                                        Observación
                                </Paper>
                            </Grid>
                        </Grid>
                        {
                            PreIngresos.map((value,index)=>(
                            
                                    <Grid container key={`Pre${index}`}>
                                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}> 
                                            <Card style={{minHeight:75}} variant='outlined'>
                                                <CardContent>
                                                    <Checkbox
                                                        checked={value.isSave}
                                                        onChange={HandleCheck}
                                                        name={value.id}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                            <Card style={{minHeight:75}} variant='outlined'>
                                                <CardContent>
                                                    {value.Codigo.map((value2,index2)=> { 
                                                        if(value.Codigo.length === 1){
                                                            return(value2.codigo)
                                                        }else{
                                                            if(index2 === value.Codigo.length - 1){
                                                                return(value2.codigo)
                                                            }else{
                                                                return(`${value2.codigo}, `)
                                                            }
                                                        }
                                                        
                                                    })}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                            <Card style={{minHeight:75, fontSize:10}} variant='outlined'>
                                                <CardContent>
                                                    {value.TipTra}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                            <Card style={{minHeight:75}} variant='outlined'>
                                                <CardContent>
                                                    {value.Cadena}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                            <Card style={{minHeight:75}} variant='outlined'>
                                                <CardContent>
                                                    {value.Local}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xl={1} lg={1} md={2} sm={2} xs={2}> 
                                            <Card style={{minHeight:75, textAlign:'center'}} variant='outlined'>
                                                <CardContent>
                                                    {value.CanElem}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}> 
                                            <Card style={{minHeight:75}} variant='outlined'>
                                                <CardContent>
                                                    {value.MotGar.map(rowMot=>rowMot.motivo).toString()}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}> 
                                            <Card style={{minHeight:75}} variant='outlined'>
                                                <CardContent>
                                                    {value.ObservacionGar}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                            ))
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={HandleClosePre} color="secondary">
                            Cancelar
                        </Button>
                        {
                            isSaving ?
                            <ButtonSemantic primary loading style={{margin:3}}>
                                Loading
                            </ButtonSemantic>
                            :<ButtonSemantic primary onClick={HandleSaveGarantia}  style={{margin:3}}>
                                {textSave}
                            </ButtonSemantic>
                        }
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={showNumGar}
                    onClose={HandleClear}
                    fullWidth
                    maxWidth={'sm'}
                    style={{padding:0}}
                    aria-labelledby="alert-dialog-slide-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>{`Se ha creado la Garantia No:${numGarCreated}`}</span></DialogTitle>
                    
                    <DialogActions>
                        <Button variant='contained' onClick={HandleClear} color="primary">
                            Ok
                        </Button>
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
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'block'}}>
                    <Toolbar >  
                        <Grid container justify='flex-start' spacing={1} style={{width:'100%'}}>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} >
                                <Grid container justify='flex-start' spacing={1}>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                        <TextField
                                            style={{position:'relative', top:3}}
                                            id='numproSearch'
                                            label='PPTO'
                                            value={ numproSearch || ''}
                                            onChange={HandleNumproGarantia}
                                            variant='outlined'
                                            fullWidth
                                            autoFocus
                                            color='primary'
                                            size='small'
                                            type='number'
                                            onKeyPress={(e)=>{
                                                const code = e.keyCode || e.which;
                                                if(code === 13)
                                                HandleSearchGarantia();
                                            }}
                                        />
                                    </Grid>
                                    <Grid item >
                                        <IconButton color='primary' onClick={HandleSearchGarantia}>
                                            <Tooltip title='BUSCAR' placement='top'>
                                                <FindReplaceIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </Grid>
                                    <Grid item >
                                        <IconButton color='primary' onClick={HandleResetAll} disabled={isWaitingSearch}>
                                            <Tooltip title='RESETEAR' placement='top'>
                                                <AutorenewIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </Grid>
                                    <Grid item >
                                        {
                                            isSavingGarantia ?                                            
                                                <FacebookCircularProgress size={25} style={{marginTop:10}}/>
                                            :
                                                <IconButton onClick={HandlePreSave} color='primary' size='small' disabled={isWaitingSearch} style={{marginTop:10}}> 
                                                    <Tooltip title='Guardar'>
                                                        <SaveIcon/>
                                                    </Tooltip>
                                                </IconButton>
                                        } 
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} >
                                <IconButton color='primary' onClick={handleClickMenu}  disabled={isWaitingSearch} aria-controls="menu-column" aria-haspopup="true" style={{marginRight:2}}>
                                    <Tooltip title='VER' placement='top'>
                                        <VisibilityIcon />
                                    </Tooltip>
                                </IconButton>
                                <Menu
                                    id="menu-column"
                                    anchorEl={openMenuColumn}
                                    keepMounted
                                    open={Boolean(openMenuColumn)}
                                    onClose={handleCloseMenu}
                                    >
                                    {ElementMenu}
                                </Menu>  
                                <IconButton color='primary' onClick={handleClickMenuFixed}  disabled={isWaitingSearch}aria-controls="menu-column-fixed" aria-haspopup="true" style={{marginRight:2}}>
                                    <Tooltip title='FIJAR' placement='top' >
                                        <ViewWeekIcon />
                                    </Tooltip>
                                </IconButton>
                                <Menu
                                    id="menu-column-fixed"
                                    anchorEl={openMenuColumnFixed}
                                    keepMounted
                                    open={Boolean(openMenuColumnFixed)}
                                    onClose={handleCloseMenuFixed}
                                    >
                                    {ElementMenuFixed}
                                </Menu>
                                <IconButton color={isFilterNow ? 'secondary' : 'default'} disabled={isWaitingSearch} onClick={handleClickMenuFilter} style={{marginRight:2}}>
                                    <Tooltip title='FILTRAR' placement='top' >
                                        <FilterListIcon />
                                    </Tooltip>
                                </IconButton>
                                <IconButton color={isFilterDate ? 'secondary' : 'default'} disabled={isWaitingSearch} onClick={handleClickMenuDate}  aria-controls="menu-column-date" aria-haspopup="true" style={{marginRight:2}}>
                                    <Tooltip title='FECHAS' placement='top' >
                                        <DateRangeIcon />
                                    </Tooltip>
                                </IconButton>
                                <Menu
                                    id="menu-column-date"
                                    anchorEl={openMenuDate}
                                    keepMounted
                                    open={Boolean(openMenuDate)}
                                    onClose={handleCloseMenuDate}
                                >
                                    <MenuItem key={'ElementMenuDate-Columna'} style={{width:'100%'}}>
                                        <Autocomplete
                                            id={'AutoComplete-ElementDate'}
                                            options={headersColumn}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => <TextField {...params} label="Columna" fullWidth variant="outlined" />}
                                            inputValue={elementDate.labelElement || ''}
                                            onInputChange={HandleAutoComplete}
                                            size='small'
                                            style={{width:'100%'}}
                                        />
                                    </MenuItem>
                                    <MenuItem key={'ElementMenuDate-Inicio'}>
                                        <TextField 
                                            id='Inicio'
                                            value={elementDate.Inicio || new Date()}
                                            onChange={HandleMenuDate}
                                            fullWidth
                                            margin='dense'
                                            type='date'
                                            label='Inicio'
                                            autoFocus
                                        />
                                    </MenuItem>
                                    <MenuItem key={'ElementMenuDate-Final'}>
                                        <TextField 
                                            id='Final'
                                            value={elementDate.Final ||  new Date()}
                                            onChange={HandleMenuDate}
                                            fullWidth
                                            margin='dense'
                                            type='date'
                                            label='Final'
                                            autoFocus
                                        />
                                    </MenuItem>
                                    <MenuItem key={'ElementMenuDate-Process'}>
                                        <Grid container justify='center'>
                                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <Fab color="default" size='small' onClick={HandleClearDate} >
                                                    <ClearIcon />
                                                </Fab>
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <Fab color="secondary" size='small' onClick={HandleResetFilterDate} >
                                                    <AutorenewIcon />
                                                </Fab>
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <Fab color="primary" size='small' onClick={HandleProcessFilterDate}>
                                                    <NavigateNextIcon />
                                                </Fab>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                </Menu>     
                                <IconButton aria-controls="menu-cpdf" aria-haspopup="true" style={{marginRight:2}} disabled={isWaitingSearch} onClick={handleClickMenuPdf} color='primary'>
                                    <Tooltip title='Export PDF' placement='top'>
                                        <PictureAsPdfIcon />
                                    </Tooltip>
                                </IconButton> 
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
                                <IconButton aria-controls="menu-excel" aria-haspopup="true" style={{marginRight:2}} disabled={isWaitingSearch} onClick={handleClickMenuExcel} color='primary'>
                                    <Tooltip title='Export EXCEL' placement='top'>
                                        <DescriptionIcon />
                                    </Tooltip>
                                </IconButton>
                                <Menu
                                    id="menu-excel"
                                    anchorEl={openMenuExcel}
                                    keepMounted
                                    open={Boolean(openMenuExcel)}
                                    onClose={handleCloseMenuExcel}
                                >
                                    <MenuItem >
                                        {
                                            selectionArr.length === 0 ? <span onClick={()=>alert('NO HAY ELEMENTOS SELECCIONADOS')}>Export Select</span>
                                            :<ExcelComponent data={selectionArr} titulo={'Export Select'} headersColumn={headersColumn}/>
                                        }
                                    </MenuItem>
                                    <MenuItem >
                                        <ExcelComponent data={rows} titulo={'Export All'} headersColumn={headersColumn} />
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid> 
                        <Grid item xl={2} lg={2} md={2} sm={6} xs={6} style={{fontSize:20}}>
                                Ventas
                        </Grid>
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
                            {
                                isWaitingSearch ?
                                <Grid container>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{height:'100%', display:'flex', justifyContent:'center', marginTop:'33vh'}}  >                                                                                                                                                                                                                  
                                        <FacebookCircularProgress size={40} style={{alignSelf:'center'}}/>
                                    </Grid>
                                </Grid>:
                                <Fragment>
                                    <TableContainer style={{minHeight:'70vh',  maxHeight:'70vh', minWidth:750, }}>
                                        <Table
                                            style={{width:'100%', display:'grid'}}
                                            aria-labelledby="tableTitle"
                                            size={dense ? 'small' : 'medium'}
                                            aria-label="enhanced table"
                                            padding={dense ? 'none' : 'default'}
                                            ref={tableElement}
                                        >
                                            <EnhancedTableHead
                                                classes={classes}
                                                order={order}
                                                orderBy={orderBy}
                                                onRequestSort={handleRequestSort}
                                                rowCount={rows.length}
                                                headCells={headersColumn}
                                                tableElement={tableElement}
                                                HandleChangeWidth={HandleChangeWidth}
                                            />               
                                            <TableBody>
                                                {stableSort(rows, getComparator(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, index) => {
                                                        return (
                                                            <Roow 
                                                                key={`Row${row.idSubGarantia}`} 
                                                                row={row} 
                                                                index={index} 
                                                                headCells={headersColumn} 
                                                                HandleClickRow={HandleClickRow}
                                                                HandleSaveRows={HandleSaveRows}
                                                                tiposGarantia={tiposGarantia}
                                                                motivosGarantia={motivosGarantia}
                                                                HandleClear={HandleClear}
                                                            />
                                                        
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Fragment>
                            }
                        </Fragment>
                        }
                    </Paper>
                </Grid>
            </Grid>  
        )
    };

    function ReGarantiaVentas(props) {
        return (
            <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
                <ReGarantiaVenta />
            </SnackbarProvider>
        );
    };

    export default ReGarantiaVentas;