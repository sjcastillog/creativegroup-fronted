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
            DialogTitle,
            Fab,
            FormControlLabel,
            Grid,
            Grow,
            IconButton,
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
            TextField,
            Tooltip,
            
} from '@material-ui/core';
import { 
            Add as AddIcon,
            Autorenew as AutorenewIcon,
            Block as BlockIcon,
            BorderVertical as BorderVerticalIcon,
            Brush as BrushIcon,
            CheckBox as CheckBoxIcon,
            CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
            Clear as ClearIcon,
            Close as CloseIcon,
            DateRange as DateRangeIcon,
            Delete as DeleteIcon,
            Description as DescriptionIcon,
            FilterList as FilterListIcon,
            GetApp as GetAppIcon,
            MarkunreadMailbox as MarkunreadMailboxIcon,
            NavigateNext as NavigateNextIcon,
            PhotoAlbum as PhotoAlbumIcon,
            PictureAsPdf as PictureAsPdfIcon,
            //Refresh as RefreshIcon,
            Save as SaveIcon,
            //TableChart as TableChartIcon,
            Visibility as VisibilityIcon,
            ViewWeek as ViewWeekIcon,
} from '@material-ui/icons';
import Viewer from 'react-viewer';
//import socketIOClient from "socket.io-client";
import { Button as ButtonSemantic } from 'semantic-ui-react';
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
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
  import styled from 'styled-components';
  import { Autocomplete } from '@material-ui/lab';
  import ReactExport from "react-data-export";
  import { Page, Text, View, Document, StyleSheet, Font, usePDF } from '@react-pdf/renderer';
  import Swal from 'sweetalert2';
  import helperDatos from '../helpers/helperDatos.js';

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

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Grow direction="up" ref={ref} {...props} timeout={500} />;
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
        height:33.5px;
        padding-left:10px;
        padding-top:6px;
        position:sticky;
        z-index:1; 
        left:${props => props.left || '0px'};
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;   
    `;

    const TheadYounetStyled = styled.th`
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 100};
        background-color:${props => props.bgColor ? props.bgColor : '#0E3B5F' };
        color: #fff;
        display:block;
        font-weight:bold, 
        height:33px;
        paddinleft:10px;
        padding-top:6px;
        position: relative;
        left:0px;   
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;   
    `;

    const TdYounetStyledFixed = styled.td`
        color:${props => props.color ? props.color : 'black'};
        font-size:${props => props.fontSize ?  props.fontSize : '10px'};
        font-weight:${props => props.bolder ? 'bold' : 'none'};
        minWidth:${props => props.minWidth || 60};
        padding-top:${props => props.element ? '0px' : '5px'}; 
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 60};
        background:#ffffff;
        border-bottom: 1px solid #E5E8E8;
        display:block;
        min-height:35px;
        padding:10px; 
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
        padding-top:${props => props.element ? '0px' : '5px'}; 
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 60};
        background:transparent;
        border-bottom: 1px solid #E5E8E8;
        display:block;
        min-height:35px;
        padding:10px;   
        position:relative;
        left:0px;      
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

    const InputYounetStyled = styled.input`
        font-size:12px;
        height:29px;
        border:${props => props.border ? '2px solid #0E3B5F':'none'};
        border-radius:${props => props.border ? '5px':'none'};
        background-color:transparent;
        font-family:Helvetica;
        min-width:120px;
        width:100%;
        position:relative;
        top:4px;
        color:#0E3B5F;
        white-space: nowrap;
    `;

    const headCellsColumn = [
        { id: 'numpro', numeric: true, disablePadding: false, label: 'Numpro', show:true, fixed:false, width:90, num:0, type:'number', align:'left', fontSize:'10px', bolder:false},
        { id: 'Proyecto', numeric: false, disablePadding: false, label: 'Proyecto', show:true, fixed:false, width:350, num:1, type:'text', align:'left', fontSize:'10px', bolder:false},
        { id: 'insStart', numeric: false, disablePadding: false, label: 'Inicio', show:true, fixed:false, width:200, num:2, type:'date', align:'left', fontSize:'10px', bolder:false },
        { id: 'insAgr', numeric: false, disablePadding: false, label: 'Acuerdo', show:true, fixed:false, width:200, num:3, type:'date', align:'left', fontSize:'10px', bolder:false },      
        { id: 'insFin', numeric: false, disablePadding: false, label: 'Fin', show:true, fixed:false, width:200, num:4, type:'date', align:'left', fontSize:'10px', bolder:false },
        { id: 'insHora', numeric: false, disablePadding: false, label: 'Hora', show:true, fixed:false, width:200, num:5, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'logResponsable', numeric: false, disablePadding: false, label: 'Responsable', show:true, fixed:false, width:230, num:6, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'insStatus', numeric: false, disablePadding: false, label: 'Status', show:true, fixed:false, width:120, num:7, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'Cadena', numeric: false, disablePadding: false, label: 'Cadena', show:true, fixed:false, width:200, num:8, type:'text', align:'left', fontSize:'10px', bolder:false},      
        { id: 'Local', numeric: false, disablePadding: false, label: 'Local', show:true, fixed:false, width:100, num:9, type:'text', align:'left', fontSize:'10px', bolder:false }, 
        { id: 'Ciudad', numeric: false, disablePadding: false, label: 'Ciudad', show:true, fixed:false, width:120, num:10, type:'text', align:'left', fontSize:'10px', bolder:false},  
        { id: 'Sector', numeric: false, disablePadding: false, label: 'Sector', show:true, fixed:false, width:200, num:11, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'Direccion', numeric: false, disablePadding: false, label: 'Direccion', show:true, fixed:false, width:350, num:12, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'observacionLogistica', numeric: false, disablePadding: false, label: 'Observacion', show:true, fixed:false, width:300, num:13, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'Personal', numeric: false, disablePadding: false, label: 'Personal', show:true, fixed:false, width:450, num:14, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'tiptra', numeric: false, disablePadding: false, label: 'Tipo Trabajo', show:true, fixed:false, width:200, num:15, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'tipser', numeric: false, disablePadding: false, label: 'Servicio', show:true, fixed:false, width:100, num:16, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'valtiptra', numeric: true, disablePadding: false, label: 'Cantidad', show:true, fixed:false, width:100, num:17, type:'number', align:'left', fontSize:'10px', bolder:false },
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
        Fotos:120,
        Creacion:100,
        Action:80,
        FotosFirs:120,
        isRegarantia:100
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

    const TheadYounetFixed = memo(({widthDefault, createSortHandler, order, orderBy, headCell, classes, headCells})=>{
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
        },[]);// eslint-disable-line react-hooks/exhaustive-deps

        return(
            <TheadYounetStyledFixed width={widthDefault}  left={leftValue}>
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
            </TheadYounetStyledFixed>
        );
    });

    const TheadYounet = memo(({widthDefault, createSortHandler, order, orderBy, headCell, classes})=>{
        
        return(
            <TheadYounetStyled width={widthDefault} >
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
            </TheadYounetStyled>
        );
    });

    const TdYounet = memo(((props)=>{
        const { getInstaladores, minWidth, width, headCells, headCell, valueInfo, fotos, fotosFirst, fixed, color, changeNA, insHoraElem, logResponsable, fechas, observacionLogistica, Personal, HandleSaveRows } = props
        const [ leftValue, setLeftValue ] = useState('0px');

        useEffect(()=>{
            if(headCell.num === 0){
                setLeftValue('0px');
                
            }else{
                let numero = 0;
                for(let i=0; i<headCell.num; i++){
                    if(headCells[i].fixed) numero += headCells[i].width;
                }
               
                setLeftValue(`${numero}px`);
                
            }
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        if(fotos){
            return(
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed 
                        minWidth={minWidth} 
                        width={width} 
                        left={leftValue} 
                        element={true} 
                        color={color}>
                        <FotosRow info={valueInfo} statusRow={props.statusRow}/>
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color} >
                        <FotosRow info={valueInfo} statusRow={props.statusRow}/>
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(fotosFirst){
            return(
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <FotosFirstRow info={valueInfo} statusRow={props.statusRow} />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color} >
                        <FotosFirstRow info={valueInfo} statusRow={props.statusRow} />
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(fechas){
            return(
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed 
                        minWidth={minWidth} 
                        width={width} 
                        left={leftValue} 
                        element={false} 
                        color={color}
                    >
                        <CellRowDate info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled 
                        minWidth={minWidth} 
                        width={width} 
                        left={leftValue} 
                        element={false} 
                        color={color}
                    >
                        <CellRowDate info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(observacionLogistica){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRow info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRow info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(Personal){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowInstaladores info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} getInstaladores={getInstaladores}  />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowInstaladores info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} getInstaladores={getInstaladores}  />
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(insHoraElem){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowHora info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowHora info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(changeNA){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowChangeNA data={props.data} statusRow={props.statusRow} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowChangeNA data={props.data} statusRow={props.statusRow} HandleSaveRows={HandleSaveRows}  />
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(logResponsable){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowResponsable data={props.data} info={valueInfo} headCell={headCell} HandleSaveRows={HandleSaveRows} />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowResponsable data={props.data} info={valueInfo} headCell={headCell} HandleSaveRows={HandleSaveRows}/>
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
        
        const { classes, order, orderBy, onRequestSort, headCells } = props;

        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
    
        return (
            <TableHead style={{position:'sticky', top:0, zIndex:2}}>
                <TableRow style={{display:'flex'}} >
                <TheadYounetStyled width={60} align='center'>
                    <CheckBoxIcon style={{marginLeft:-12}}/>
                </TheadYounetStyled>
                {headCells.map( headCell =>  
                    headCell.show && ( 
                        headCell.fixed 
                        ? 
                            <TheadYounetFixed  
                                headCells={headCells}  
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
    
    const FiltradoEl = ({ index, info, HandleAddFilter, HandleDeleteFilter, HandleAddInformacionFilter, headersColumn, getCiudades, isFilterDate})=>{
        const [ elementValue, setElementValue ] = useState({ idElement:'', valorElement:'', numero:0, labelElement:'', selectElement:'O', type:''});

        useEffect(()=>{
            setElementValue({ idElement:info.idElement, valorElement:info.valorElement, numero:index, labelElement:info.labelElement, selectElement:info.selectElement, type:info.type})
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        const HandleElementValue = (e)=>{
            setElementValue({...elementValue, valorElement:e.target.value});
           // HandleAddInformacionFilter(index, e.target.id, e.target.value)
        };

        const HandleElementValueCiudades = (e, value)=>{
            setElementValue({...elementValue, valorElement:value});
            const objeto = {...elementValue};
            objeto.valorElement = value;
            HandleAddInformacionFilter(objeto)
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
                                <Fragment>
                                    {
                                        isFilterDate ?
                                        <Fragment>
                                            {
                                                elementValue.idElement === 'Ciudad' ?
                                                    <Autocomplete
                                                        id={`idElement-${index}`}
                                                        options={getCiudades}
                                                        renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                                                        value={elementValue.valorElement || ''}
                                                        onChange={HandleElementValueCiudades}
                                                        size='small'
                                                        style={{marginTop:8}}
                                                    />
                                                :
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
                                        </Fragment>
                                            
                                        :
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
                                </Fragment>
                                
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
                                <Fragment>
                                    {
                                        isFilterDate ?
                                        <Fragment>
                                            {
                                                elementValue.idElement === 'Ciudad' ?
                                                    <Autocomplete
                                                        id={`idElement-${index}`}
                                                        options={getCiudades}
                                                        renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                                                        value={elementValue.valorElement || ''}
                                                        onChange={HandleElementValueCiudades}
                                                        size='small'
                                                        style={{marginTop:8}}
                                                    />
                                                :
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
                                        </Fragment>
                                            
                                        :
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
                                </Fragment>
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
  
    const GarantiaSup = (props)=>{

        /***********************VARIABLES*********************/
        const { setOpen, setHeaderWord} = useAuth();
        const classes = useStyles();
        const { enqueueSnackbar } = useSnackbar();
    /*****************************************************/

        const [ rows, setRows ] = useState([]);
        const [ backupsRow, setBackupsRow ] = useState([]);
        const [ backupsRow2, setBackupsRow2 ] = useState([]);
        const [ order, setOrder] = useState('desc');
        const [ orderBy, setOrderBy] = useState('numpro');
        const [ page, setPage] = useState(0);
        const [ rowsPerPage, setRowsPerPage] = useState(16);
        const [ headersColumn, setHeadersColumn ] = useState(()=>{
            try{
                if(window.localStorage.getItem('headersSupLogistica')){
                    const headersStorage = window.localStorage.getItem('headersSupLogistica') ;
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
        const [ isSavingHeaders, setSavingHeaders ] = useState(false);
        const [ openMenuFilter, setOpenMenuFilter ] = useState(false);
        const [ openMenuDate, setOpenMenuDate ] = useState(null);
        const [ openMenuPdf, setOpenMenuPdf ] = useState(null);
        const [ openMenuExcel, setOpenMenuExcel ] = useState(null);
        const [ openMenuStyles, setOpenMenuStyles ] = useState(false);
        const [ openMenuPosicion, setOpenMenuPosicion ] = useState(false);
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
        const [ getCiudades, setCiudades ] = useState([])
        const [ getAniosWork, setAniosWork ] = useState([]);
        const [ getAnioWork, setAnioWork ] = useState('');
        const [ getInstaladores, setInstaladores ] = useState([]);

        useEffect(()=>{
            setOpen(false); 
            setHeaderWord('Supervisor/Logistica');
            (async ()=>{
                const ReqCrono = await fetch('/CronogramasTot');
                const ReqEntregas = await fetch('/EntregasTot'); 
                const ReqRetiros = await fetch('/RetirosTot');
                const ReqInstaladores = await fetch('/Instaladores');
                //const ReqHeads = await fetch('HandleHeadCells');
                const JsonCrono = await  ReqCrono.json();
                const JsonEntregas = await  ReqEntregas.json();
                const JsonRetiros = await  ReqRetiros.json();
                const JsonInstaladores = await ReqInstaladores.json();
                setInstaladores(JsonInstaladores);
                //const JsonHeads = await  ReqHeads.json();
                let numCronos = JsonCrono.length;
                
                let arr = [];
                JsonCrono.forEach((row,index)=>{  
                  
                  let enc = [];
                  row.encabezados.forEach(value=>{
                    enc.push(value.tiptra);
                  });
                  row.items.forEach((subRows, index2)=>{
                    const arrK = Object.keys(subRows);
                    let tip = [];
                    let Objeto = {};
                    let valtip = 0;
                    let valReal = 0;
                    arrK.forEach(valk=>{
                     if(enc.includes(valk.toString())){
                       tip.push(`${valk}`);
                     }
                    });
                    
                    if(tip.length > 1){                   
                      Objeto.tiptra = 'N/A';
                      valReal = valtip;
                    }else{
                      let tipt = tip[0];
                      let tipt2 = tipt === undefined ? 'N/A' : tipt === '' ? 'N/A' : tipt === ' ' ? 'N/A' : tipt === null ? 'N/A' : tipt;
                      Objeto.tiptra = tipt2.toString();
                      valReal = parseInt(subRows[tipt]);
                    }
                    Objeto._id = subRows.id ? subRows.id : `Elemento_${index}_${index2}_${Math.random()}`;
                    Objeto.idCronograma = row._id;
                    Objeto.Proyecto = row.proyecto === undefined ? '' :  row.proyecto === NaN ? "" : row.proyecto === null ? '' : row.proyecto;;
                    Objeto.numpro = row.numpro;
                    Objeto.idGeneral = subRows.id ? subRows.id : `Elemento_${index}_${index2}_${Math.random()}`;
                    Objeto.ejecutiva = row.ejecutiva === undefined ? '' : row.ejecutiva === NaN ? "" : row.ejecutiva === null ? '' : row.ejecutiva;
                    Objeto.coordinador = row.coordinador;
                    Objeto.Cliente = row.cliente;
                    Objeto.valtiptra = valReal === undefined ? 0 : valReal === NaN ? 0 : valReal === null ? 0 : valReal;
                    Objeto.id = subRows.id ? subRows.id : `Elemento_${index}_${index2}_${Math.random()}`;
                    Objeto.idElemento = subRows.id ? subRows.id : `Elemento_${index}_${index2}_${Math.random()}`;
                    Objeto.Cadena = subRows.Cadena === undefined ? '' : subRows.Cadena === NaN ? "" : subRows.Cadena === null ? '' : subRows.Cadena;
                    Objeto.Local = subRows.Local === undefined ? '' : subRows.Local === NaN ? "" : subRows.Local === null ? '' : subRows.Local;
                    Objeto.Ciudad = subRows.Ciudad === undefined ? '' : subRows.Ciudad === NaN ? "" : subRows.Ciudad === null ? '' : subRows.Ciudad;
                    Objeto.Sector = subRows.Sector === undefined ? '' : subRows.Sector === NaN ? "" : subRows.Sector === null ? '' : subRows.Sector;
                    Objeto.Direccion = subRows.Direccion === undefined ? '' : subRows.Direccion === NaN ? "" : subRows.Direccion === null ? '' : subRows.Direccion;
                    Objeto.insStart = subRows.insStart === undefined ? '' : subRows.insStart === NaN ? "" : subRows.insStart === null ? '' : subRows.insStart;
                    Objeto.insAgr = subRows.insAgr === undefined ? '' : subRows.insAgr === NaN ? "" : subRows.insAgr === null ? '' : subRows.insAgr;
                    Objeto.insFin = subRows.insFin === undefined ? '' : subRows.insFin === NaN ? "" : subRows.insFin === null ? '' : subRows.insFin;
                    Objeto.insHora = subRows.insHora === undefined ? '' : subRows.insHora === NaN ? "" : subRows.insHora === null ? '' : subRows.insHora;
                    Objeto.insStatus = subRows.insStatus === undefined ? '' : subRows.insStatus === NaN ? "" : subRows.insStatus === null ? '' : subRows.insStatus;
                    Objeto.logResponsable = subRows.logResponsable === undefined ? '' : subRows.logResponsable === NaN ? "" : subRows.logResponsable === null ? '' : subRows.logResponsable;
                    Objeto.Personal = subRows.Personal === undefined ? '' : subRows.Personal === NaN ? "" : subRows.Personal === null ? '' : Array.isArray(subRows.Personal) ? subRows.Personal.length > 0 ? subRows.Personal.map(el=> el.instalador).join(', ') : '' : '';
                    Objeto.PersonalArr = subRows.Personal === undefined ? [] : subRows.Personal === NaN ? [] : subRows.Personal === null ? [] : Array.isArray(subRows.Personal) ? subRows.Personal.length > 0 ? subRows.Personal : [] : [];
                    Objeto.observacionLogistica =  subRows.observacionLogistica === undefined ? '' : subRows.observacionLogistica === NaN ? "" : subRows.observacionLogistica === null ? '' : subRows.observacionLogistica;
                    Objeto.tipser = 'INSTALACIÓN';
                    Objeto.creacion = row.creacion ? row.creacion : '2021-01-01';
                    arr.push(Objeto);
                  })
                  if(index === (numCronos - 1)){

                    setRows(arr);
                    setBackupsRow(arr);
                    setBackupsRow2(arr);
                  }
                });
                const aniosW = arr.map(el=> el.creacion.split('-')[0]);
                const aniosWFilter = aniosW.filter((el, index)=> aniosW.indexOf(el) === index);
                aniosWFilter.push('TODOS')
                setAniosWork(aniosWFilter);
            })()

        

        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        useEffect( 
            ()=>{
                const dato = stableSort(rows, getComparator(order, orderBy));
                setRows(dato);
            },[orderBy] // eslint-disable-line react-hooks/exhaustive-deps
        );
      
        useEffect( 
            ()=>{
                const dato = stableSort(rows, getComparator(order, orderBy));
                setRows(dato);
            },[order] // eslint-disable-line react-hooks/exhaustive-deps
        );

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

        /****************** MANEJADORES ****************/
            
            const handleClickMenu = (event) => {
                setOpenMenuColumn(event.currentTarget);
            };

            const handleClickMenuFixed = (event) => {
                setOpenMenuColumnFixed(event.currentTarget);
            };

            const handleClickMenuFilter = (event) => {
                setOpenMenuFilter(true);
                setElementFilterShow(true);
            };

            const handleClickMenuDate = (event) => {
                setOpenMenuDate(event.currentTarget);
            };

            const handleClickMenuPdf = (event) => {
                setOpenMenuPdf(event.currentTarget);
            };

            const handleClickMenuExcel = (event) => {
                setOpenMenuExcel(event.currentTarget);
            };

            const handleCloseMenu = () => {
                setOpenMenuColumn(null);
            };

            const handleCloseMenuFixed = () => {
                setOpenMenuColumnFixed(null);
            };

            const handleCloseMenuFilter = () => {
                setOpenMenuFilter(false);
                setElementFilterShow(false);
            };

            const handleCloseMenuDate = () => {
                setOpenMenuDate(null);
            };

            const handleCloseMenuPdf = ()=>{
                setOpenMenuPdf(null);
            };

            const handleCloseMenuExcel = ()=>{
                setOpenMenuExcel(null);
            };

            const handleRequestSort = useCallback((event, property) => {
                const isAsc = orderBy === property && order === 'asc';
                setOrder(isAsc ? 'desc' : 'asc');
                setOrderBy(property);
            },[order, orderBy])
                
            const handleChangePage = (event, newPage) => {
                setPage(newPage);
            };
            
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
                window.localStorage.setItem('headersSupLogistica', JSON.stringify(arrMap))
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
                window.localStorage.setItem('headersSupLogistica', JSON.stringify(arrMap))
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
                    getCiudades={getCiudades}
                    isFilterDate={isFilterDate}
            />);

            const HandleProcessFilterElement = ()=>{
                const arrInfo = isFilterDate ? [...rows] : [...backupsRow];
                if(isFilterNow){
                    console.log('isFilterNow');
                    let dataNow = [ ];
                    arrFiltrado.forEach((value,index)=>{
                        if(index === 0){
                            if(value.type === 'number'){
                                arrInfo.forEach((value2)=>{
                                    if(value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))) dataNow.push(value2);
                                });
                            }else if(value.type === 'text'){
                                arrInfo.forEach((value2)=>{
                                    if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))) dataNow.push(value2);
                                });
                            }else{
                                arrInfo.forEach((value2)=>{
                                    if(value2[value.idElement] && (value2[value.idElement].toString() === value.valorElement.toString()))  dataNow.push(value2);
                                });
                            }
                        }else{
                            if(value.type === 'number'){
                                if(value.selectElement === 'O'){
                                    arrInfo.forEach((value2)=>{
                                        if(value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))
                                    );
                                }
                            }else if(value.type === 'text'){
                                if(value.selectElement === 'O'){
                                    arrInfo.forEach((value2)=>{
                                        if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))
                                    );
                                }          
                            }else{
                                if(value.selectElement === 'O'){
                                    arrInfo.forEach((value2)=>{
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
                    console.log('!isFilterNow');
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
                                console.log('index0');
                                if(value.type === 'number'){
                                    arrInfo.forEach((value2)=>{
                                        if(value2[value.idElement] && (parseInt(value2[value.idElement]) === parseInt(value.valorElement))) dataNow.push(value2);
                                    });
                                }else if(value.type === 'text'){
                                    arrInfo.forEach((value2)=>{
                                        if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))){ 
                                            dataNow.push(value2);
                                            console.log(value2);
                                        }
                                    });
                                }else{
                                    arrInfo.forEach((value2)=>{
                                        if(value2[value.idElement] && (value2[value.idElement].toString() === value.valorElement.toString()))  dataNow.push(value2);
                                    });
                                }
                            }else{
                                console.log('!index0');
                                if(value.type === 'number'){
                                    if(value.selectElement === 'O'){
                                        arrInfo.forEach((value2)=>{
                                            if(value2[value.idElement] && (parseInt(value2[value.idElement]) === parseInt(value.valorElement))) dataNow.push(value2);
                                        });
                                    }else{
                                        dataNow = dataNow.filter((value2)=>
                                            value2[value.idElement] && (parseInt(value2[value.idElement]) === (parseInt(value.valorElement)))
                                        );
                                    }
                                }else if(value.idElement === 'text'){
                                    if(value.selectElement === 'O'){
                                        arrInfo.forEach((value2)=>{
                                            if(value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))) dataNow.push(value2);
                                        });
                                    }else{
                                        dataNow = dataNow.filter((value2)=>
                                            value2[value.idElement] && (value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase()))
                                        );
                                    } 
                                }else{
                                    if(value.selectElement === 'O'){
                                        arrInfo.forEach((value2)=>{
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

            const HandleMenuDate = (e)=>{ setElementDate({...elementDate, [e.target.id]:e.target.value })};

            const HandleClearDate = ()=>{
                setElementDate({});
                setOpenMenuDate(null);
                setFilterDate(false);
            };

            const HandleProcessFilterDate = ()=>{
                if(elementDate.Inicio === '' || elementDate.Final === ''){
                    if(elementDate.Inicio === ''){
                        setOpenMenuDate(null);
                        Swal.fire({
                            title:'FECHA DE INICIO REQUERIDA',
                            toast:true,
                            confirmButtonColor:'#0E3B5F',
                        });
                    }else{
                        setOpenMenuDate(null);
                        Swal.fire({
                            title:'FECHA DE FINAL REQUERIDA',
                            toast:true,
                            confirmButtonColor:'#0E3B5F',
                        });
                    }
                }else{
                    const resultInicio = new Date(elementDate.Inicio)
                    const resultFinal = new Date(elementDate.Final)
                    if(elementDate.idElement === ''){
                        setOpenMenuDate(null);
                        Swal.fire({
                            title:'DEBE SELECCIONAR UNA FILA',
                            toast:true,
                            confirmButtonColor:'#0E3B5F',
                        });
                    }else{ 
                        if(resultInicio > resultFinal){ 
                            setOpenMenuDate(null);
                            Swal.fire({
                                title:'FECHA DE INICIO DEBE SER MENOR A LA FECHA FINAL',
                                toast:true,
                                confirmButtonColor:'#0E3B5F',
                                width:'450px'
                            });
                        }else{
                            if(isFilterNow){
                                const arrFil = [];
                                for(const a in rows){
                                    const el ={...rows[a]};
                                    const dataEl = el[elementDate.idElement];
                                    if(dataEl !== null){  
                                        if(dataEl !== undefined){       
                                            if(dataEl !== ''){ 
                                                if(dataEl.length <= 10){
                                                    const valFecha = new Date(dataEl)
                                                    if(valFecha.getTime() >= resultInicio.getTime()){
                                                        if(valFecha <= resultFinal) arrFil.push(el);
                                                    } 
                                                }else{
                                                    const valFecha2 = dataEl.split("T")[0].toString();
                                                    const valFecha = new Date(valFecha2)
                                                    if(valFecha.getTime() >= resultInicio.getTime()){
                                                        if(valFecha.getTime() <= resultFinal.getTime()) arrFil.push(el);
                                                    } 
                                                }
            
                                            }                  
                                        }}
                                }    
                                if(arrFil.length === 0){
                                   alert('NO HAY ELEMENTOS QUE VISUALIZAR')
                                }else{
                                    setFilterDate(true);
                                    setOpenMenuDate(null);
                                    setRows(arrFil);
                                    setRowsFilterDate(arrFil);
                                } 
                            }else{
                                const arrFil = [];
                                for(const a in backupsRow){
                                    const el ={...backupsRow[a]};
                                    const dataEl = el[elementDate.idElement];
                                    if(dataEl !== null){  
                                        if(dataEl !== undefined){       
                                            if(dataEl !== ''){ 
                                                if(dataEl.length <= 10){
                                                    const valFecha = new Date(dataEl)
                                                    if(valFecha.getTime() >= resultInicio.getTime()){
                                                        if(valFecha <= resultFinal) arrFil.push(el);
                                                    } 
                                                }else{
                                                    const valFecha2 = dataEl.split("T")[0].toString();
                                                    const valFecha = new Date(valFecha2)
                                                    if(valFecha.getTime() >= resultInicio.getTime()){
                                                        if(valFecha.getTime() <= resultFinal.getTime()) arrFil.push(el);
                                                    } 
                                                }
            
                                            }                  
                                        }}
                                }                           
                                if(arrFil.length === 0){
                                   alert('NO HAY ELEMENTOS QUE VISUALIZAR')
                                }else{
                                    setFilterDate(true);
                                    setOpenMenuDate(null);
                                    setRows(arrFil);
                                    const arrCity = arrFil.map(el=>el.Ciudad);
                                    const arrNewCity = arrCity.filter((el, index)=> arrCity.indexOf(el) === index);
                                    setCiudades(arrNewCity);
                                    setRowsFilterDate(arrFil);
                                } 
                            }
                        }
                    }
                }
                
            };

            const HandleClosePre = ()=>{
                setOpenPreCorreos(false);
                setSelection([]);
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

            const HandleProcessHeaders = useCallback((dataHeadersStyle)=>{
                const headersResultStyles = headersColumn.map(value=>{
                    if(value.id === dataHeadersStyle.id){
                        return dataHeadersStyle;
                    }else{
                        return value;
                    }
                });
                setHeadersColumn(headersResultStyles);
                window.localStorage.setItem('headersSupLogistica', JSON.stringify(headersResultStyles))
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
                window.localStorage.setItem('headersSupLogistica', JSON.stringify(headersResultStyles));
                setOpenMenuPosicion(false);
                setSavingHeaders(true);
                setTimeout(()=>{
                    setSavingHeaders(false);
                },2000);
            };
    
            const HandleProcessPosicion = ()=>{
                const headersResultStyles = headersColumn;
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
                window.localStorage.setItem('headersSupLogistica', JSON.stringify(headersResultStyles))
                setSavingHeaders(true);
                setTimeout(()=>{
                    setSavingHeaders(false);
                },2000);
            };

            const handleAnioWork = (e, value)=>{
                switch(value){
                    case 'TODOS':
                        setBackupsRow(backupsRow2);
                        setRows(backupsRow2);
                        setFilterNow(false);
                        setFilterDate(false);
                        setElementDate({});
                        setRowsFilter([]);
                        setRowsFilterDate([]);
                        setArrFiltrado([]);
                        break;
                    case null:
                        setBackupsRow(backupsRow2);
                        setRows(backupsRow2);
                        setFilterNow(false);
                        setFilterDate(false);
                        setElementDate({});
                        setRowsFilter([]);
                        setRowsFilterDate([]);
                        setArrFiltrado([]);
                        break;
                    default:
                        const arrTotalW = [...backupsRow2];
                        const arrFilterW = arrTotalW.filter(el=> el.creacion.split('-')[0] === value);
                        setBackupsRow(arrFilterW);
                        setRows(arrFilterW);
                        setFilterNow(false);
                        setFilterDate(false);
                        setElementDate({});
                        setRowsFilter([]);
                        setRowsFilterDate([]);
                        setArrFiltrado([]);
                    }
                setAnioWork(value) 
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
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'block'}}>
                    <Toolbar >   
                        <div style={{marginRight:30, fontSize:20}}>Supervisor Logistica</div>
                        <IconButton color='primary' onClick={handleClickMenu}  aria-controls="menu-column" aria-haspopup="true" style={{marginRight:2}}>
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
                        <IconButton color='primary' onClick={handleClickMenuFixed}  aria-controls="menu-column-fixed" aria-haspopup="true" style={{marginRight:2}}>
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
                        <IconButton color={isFilterNow ? 'secondary' : 'default'} onClick={handleClickMenuFilter} style={{marginRight:2}}>
                            <Tooltip title='FILTRAR' placement='top' >
                                <FilterListIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton color={isFilterDate ? 'secondary' : 'default'} onClick={handleClickMenuDate}  aria-controls="menu-column-date" aria-haspopup="true" style={{marginRight:2}}>
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
                                    options={headersColumn.filter(el=>el.type==='date')}
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
                        <IconButton aria-controls="menu-cpdf" aria-haspopup="true" style={{marginRight:2}} onClick={handleClickMenuPdf} color='primary'>
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
                        <IconButton aria-controls="menu-excel" aria-haspopup="true" style={{marginRight:2}} onClick={handleClickMenuExcel} color='primary'>
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
                        {
                            isPreCorreoCreating ?
                            <FacebookCircularProgress size={25}  style={{marginRight:2, marginLeft:10}}/>
                            :
                            <IconButton color='primary' onClick={HandleShowCorreosCreated}  style={{marginRight:2}}>
                                <Tooltip title='CORREOS' placement='top'>
                                    <MarkunreadMailboxIcon/>
                                </Tooltip>
                            </IconButton>
                        }  
                        <IconButton style={{marginRight:2}} onClick={handleOpenMenuStyles} color='primary'>
                            <Tooltip title='Estilos' placement='top'>
                                <BrushIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton style={{marginRight:2}} onClick={handleClickMenuPosicion} color='primary'>
                            <Tooltip title='Posicion' placement='top'>
                                <BorderVerticalIcon />
                            </Tooltip>
                        </IconButton>  
                        <div style={{margin:'0px 0px 0px auto', display:'block'}}>
                            <Autocomplete
                                id={`idElement-AniosWork`}
                                options={getAniosWork}
                                renderInput={(params) => <TextField {...params} fullWidth variant="outlined" style={{minWidth:150}} />}
                                value={getAnioWork || ''}
                                onChange={handleAnioWork}
                                size='small'
                            />
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
                        <TableContainerYounet>
                            <TableYounet >
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                    headCells={headersColumn}
                                />               
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <Roow 
                                                    key={row.idGeneral} 
                                                    row={row} 
                                                    index={index} 
                                                    headCells={headersColumn} 
                                                    HandleClickRow={HandleClickRow}
                                                    HandleSaveRows={HandleSaveRows}
                                                    selectionArr={selectionArr}
                                                    getInstaladores={getInstaladores}
                                                    
                                                />
                                            
                                            );
                                        })}
                                </TableBody>
                            </TableYounet>
                        </TableContainerYounet>
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
                    </Paper>
                </Grid>
            </Grid>  
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
            <IconButton href={instance.url} target="_blank"  onClick={HandleClickPdf}>
                <GetAppIcon />
            </IconButton>
        );
    };

    const Roow = memo((props)=>{
        const { row, index, headCells, HandleClickRow, HandleSaveRows, selectionArr, getInstaladores} = props;
        const [ statusRow, setStatusRow ] = useState(false);
        const [ continuoStatus, setContinuoStatus ] = useState(false);


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

        const HeadCellArr = headCells.map((value, index2)=>{
            if(value.id === 'insStatus'){ 
                if(value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        label={value.label} 
                        idCell={row.idElemento}
                        fixed={value.fixed}
                        color={row.insStatus === '' ? 'red' : row.insStatus === 'En Proceso' ? 'green' : row.insStatus === 'Concluido' ? 'blue' : 'DeepPink'}
                    />         
                )
                } 
            }else
            if(value.id === 'changeNA'){ 
                if(value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        label={value.label} 
                        idCell={row.idElemento}
                        fixed={value.fixed}
                        data={row}
                        element={true}
                        changeNA={true}
                        statusRow={statusRow}
                        HandleSaveRows={HandleSaveRows}
                        
                        
                        
                    /> 
                )}
            }else
            if( value.id === 'insStart' || value.id === 'insAgr' || value.id === 'insFin'){
                if(value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]} //info
                        label={value.label} 
                        idCell={row.idElemento}
                        fixed={value.fixed}
                        data={row}
                        element={false}
                        fechas={true}
                        HandleSaveRows={HandleSaveRows}
                    /> 
                )}
            }else
            if( value.id === 'observacionLogistica' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]} //info
                        label={value.label} 
                        idCell={row.idElemento}
                        fixed={value.fixed}
                        data={row}
                        element={true}
                        observacionLogistica={true}
                        HandleSaveRows={HandleSaveRows}
                    /> 
                );
            }else
            if( value.id === 'logResponsable' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        data={row}
                        idCell={row.idElemento}
                        fixed={value.fixed}
                        logResponsable={true}
                        valueInfo={row[value.id]} //info
                        HandleSaveRows={HandleSaveRows}
                    />
                );
            }else
            if( value.id === 'Personal' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        data={row}
                        idCell={row.idElemento}
                        fixed={value.fixed}
                        Personal={true}
                        valueInfo={row[value.id]} //info
                        HandleSaveRows={HandleSaveRows}
                        getInstaladores={getInstaladores}
                    />
                );
            }else 
            if( value.id === 'insHora' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        data={row}
                        idCell={row.idElemento}
                        fixed={value.fixed}
                        insHoraElem={true}
                        valueInfo={row[value.id]} //info
                        HandleSaveRows={HandleSaveRows}
                    />
                );
            }else{
                if(value.show){ 
                return( 
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGeneral}`} 
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


        return(
            <TrYounetStyled key={`fila-${index}-${row.idGeneral}`}  selected={statusRow}>
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

        const HandleInformacion = (e)=>{
            setInfoRow({...infoRow, [e.target.name]:e.target.value})
        };

        const HandleSwitch = (e)=>{
            setInfoRow({...infoRow, bolder:e.target.checked})
        };

        const HandleProcess = ()=>{
            HandleProcessHeaders(infoRow);
        };

        const handleChangeWidth = (e, value)=>{
            setInfoRow({...infoRow, width:value})
        };

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

    const CellRow = memo((props)=>{

        const { info, data, headCell, HandleSaveRows } = props;

        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCell, setInfoCell ] = useState('');
        const [ infoCellBackup, setInfoCellBackup ] = useState('');
        
        useEffect(()=>{
            setInfoCell(info);
            setInfoCellBackup(info);
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        const { enqueueSnackbar } = useSnackbar();

        const HandleEditMode = ()=>{ setEditMode(true); };

        const HandleInfoCell = (e)=>{
            setInfoCell(e.target.value);
        };

        const HandleSave = ()=>{
            const objeto = {...data};
            objeto.observacionLogistica = infoCell;
            objeto.ColumnaEl = 'observacionLogistica'
            fetch('/FechasProduccionLogistica',{
                method: 'PUT',
                body: JSON.stringify({objetoFronted:objeto}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                HandleSaveRows(objeto);
                setEditMode(false);
            });
        };

        const HandleCancelar = ()=>{
            setEditMode(false);
            setInfoCell(infoCellBackup);
        };


        if(editMode){
            return(
                <Grid container style={{padding:0, width:headCell.width, marginTop:-14 }} spacing={1}>
                    <Grid item xs={8} style={{padding:0, minWidth:160 }}>
                        <InputYounetStyled 
                            id={data.idElemento}
                            name={data.label} 
                            value={infoCell || ''}
                            onChange={HandleInfoCell}
                            border={true}
                        />
                    </Grid>
                    <Grid item >
                        <IconButton  color='primary' onClick={HandleSave} size='small'>
                            <SaveIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton  color='primary' onClick={HandleCancelar} size='small'>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            )
        }else{
            return(
                <Button 
                    id={data.idElemento}
                    name={data.label} 
                    fullWidth
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'none', padding:0, margin:0, height:30, width:'100%', marginTop:-10 }}
                >
                    {infoCell || 'Editar'}
                </Button>
            )
        }
        
    });

    const CellRowChangeNA = ({ data, statusRow, HandleSaveRows })=>{
        const [ confirmAnulado, setConfirmAnulado ] = useState(false);
        const { enqueueSnackbar } = useSnackbar();

        const HandleProcess = ()=>{
            const objeto = {...data};
            objeto.StatusProduccion = 'NO APLICA';
            objeto.proini = 'N/A';
            objeto.proacu = 'N/A';
            objeto.proter = 'N/A';
            objeto.ColumnaEl = 'NoAplica';
            HandleSaveRows(objeto); 
            fetch('/FechasProduccionSupervisor',{
                method: 'PUT',
                body: JSON.stringify({objetoFronted:objeto}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'info'});
                HandleCloseAnulado();
            });
            
        };

        const HandleCloseAnulado = ()=>{ setConfirmAnulado(false); };

        const HandleOpenAnulado = ()=>{ setConfirmAnulado(true); };


        return(
            <Fragment>
                <Dialog
                    open={confirmAnulado}
                    onClose={HandleCloseAnulado}
                    fullWidth
                    maxWidth={'xs'}
                    style={{padding:10}}
                    aria-labelledby="alert-dialog-slide-title"
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>Desea Aplicar N/A a este Elemento?</span></DialogTitle>
                    <DialogActions >
                        <Grid container justify='center' spacing={2}>
                            <Grid item>
                                <Button variant='contained' onClick={HandleCloseAnulado} color="secondary">
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' onClick={HandleProcess} color="Primary">
                                    Proceder
                                </Button>
                            </Grid>
                        </Grid>

                        
                        
                    </DialogActions>
                </Dialog>
                <IconButton size='small' onClick={HandleOpenAnulado} disabled={data.Status === 'Anulado' ? true : false}>
                    <BlockIcon style={{color:data.Status === 'Anulado' ? 'grey' : statusRow ? 'red' : '#0E3B5F'}}/>
                </IconButton>
            </Fragment>
        )
        
    };

    const CellRowDate = (props)=>{

        const { info, data, headCell, HandleSaveRows  } = props;
        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCell, setInfoCell ] = useState(data[headCell.id]);
        const { enqueueSnackbar } = useSnackbar();
        const [ isSaving, setSaving ] = useState(false);
        const [ openPreAdd, setOpenPreAdd ] = useState(false);
        const [ continuoSave, setContinuoSave ] = useState(false);

        useEffect(()=>{
            if(continuoSave){
                setContinuoSave(false);
                setTimeout(()=>{
                    HandleSave();
                },500);
            }
        },[continuoSave]); // eslint-disable-line react-hooks/exhaustive-deps

        const HandleEditMode = ()=>{ setEditMode(true); };

        const HandleInfoCell = (e)=>{
            setInfoCell(e.target.value);
        };

        const HandleSave = ()=>{
            const objeto = {...data};
            objeto[headCell.id] = infoCell;
            objeto.ColumnaEl = headCell.id;
            objeto.insStatus = headCell.id === 'insFin' ? 'Concluido' : 'En Proceso';
            HandleSaveRows(objeto);
            fetch('/FechasProduccionLogistica',{
                method: 'PUT',
                body: JSON.stringify({objetoFronted:objeto}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                HandleCancelar();
                
                setSaving(false);
            });
        };

        const HandlePreSave = async ()=>{ 
            const info = await helperDatos({db:'Matriz', numpro:data.numpro});
            if(info.length > 0){
                if(info[0].formulario.length > 0){
                    const arr = info[0].formulario.filter(el=> el.proini)
                    if(arr.length > 0){
                        setOpenPreAdd(true);
                    }else{
                        alert('OP SIN FECHA EN PRODUCCION')
                    }
                }else{
                    alert('PROYECTO SIN ELEMENTOS')
                }
                
            }else{
                alert('PROYECTO SIN ELEMENTOS');
            } 
            /*
            if(headCell.id === 'insAgr'){
                const dataInicio = new Date (data.insStart);
                const dataFinal = new Date (infoCell);
                if(dataInicio.getTime() > dataFinal.getTime() ){
                    enqueueSnackbar('FECHA DE INICIO MAYOR A LA DE ACUERDO',{variant:'error'});
                }else{
                    setOpenPreAdd(true);
                }
            }else if(headCell.id === 'insFin'){
                const dataInicio = new Date (data.insStart);
                const dataFinal = new Date (infoCell);
                if(dataInicio.getTime() > dataFinal.getTime() ){
                    enqueueSnackbar('FECHA DE TERMINO MAYOR A LA DE INICIO ASIGNADA',{variant:'error'});
                }else{
                    setOpenPreAdd(true);
                }
            }else{
                setOpenPreAdd(true);
            }  */
            
        }

        const HandleCancelar = ()=>{
            setEditMode(false);
        };

        const HandleClosePreAdd = ()=>{
            setOpenPreAdd(false);
        };

        const HandlePositiveAdd = ()=>{
            setContinuoSave(true);
            setSaving(true);
        };

        if(editMode){
            return(
                <Fragment>
                <Dialog
                    open={openPreAdd}
                    onClose={HandleClosePreAdd}
                    // PaperComponent={PaperComponent}
                    fullWidth
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    disableBackdropClick
                    disableEscapeKeyDown
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="customized-dialog-title" onClose={HandleClosePreAdd}>
                        Esta Correcta la Informacion?
                    </DialogTitle>
                    <DialogActions>
                        <Button variant='contained' onClick={HandleClosePreAdd} color="secondary">
                            No
                        </Button>
                        {
                            isSaving ?
                            <ButtonSemantic primary loading style={{margin:3}}>
                                Loading
                            </ButtonSemantic>
                            :<ButtonSemantic primary onClick={HandlePositiveAdd}  style={{margin:3}}>
                                Si
                            </ButtonSemantic>
                        }
                    </DialogActions>
                </Dialog>
                <Grid container style={{width:headCell.width, marginTop:-10}} spacing={1} >
                    <Grid item style={{padding:0}} xs={6}>
                        <InputYounetStyled 
                            id={data.idElemento}
                            name={headCell.label} 
                            value={infoCell || ''}
                            onChange={HandleInfoCell}
                            type='date'
                            style={{width:'100%'}}
                        />
                    </Grid>
                    <Grid item style={{marginLeft:20}}>
                        <IconButton size='small' color='primary' onClick={HandlePreSave} >
                            <SaveIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item >
                        <IconButton size='small' color='primary' onClick={HandleCancelar} >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                </Fragment>
            );
        }else{
            return(
                <Button 
                    id={data._id}
                    name={headCell.label} 
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'underline', padding:0, marginTop:-10, height:30 }}
                >
                    {info || '__/__/____'}
                </Button>
            );
        }
        
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

        const HandleClosePhotos = ()=>{
            setOpenPhotos(false);
        };

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

    const FotosFirstRow = ({info, statusRow, ifExist})=>{                                                    
    
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

        const HandleClosePhotos = ()=>{
            setOpenPhotos(false);
        };

        return(
            <Fragment>
                {
                    ifExist && <Fragment>
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
                }
                
            </Fragment>
        );
    };

    const CellRowResponsable = (props)=>{
        const [ arrProduccion ] = useState([ 'Produccion', 'Comercial', 'Logistica']);
        const { info, data, headCell, HandleSaveRows  } = props;
        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCell, setInfoCell ] = useState(data.proResponsable);
        const { enqueueSnackbar } = useSnackbar();
        const [ isSaving, setSaving ] = useState(false);
        const [ openPreAdd, setOpenPreAdd ] = useState(false);
        const [ continuoSave, setContinuoSave ] = useState(false);

        useEffect(()=>{
            if(continuoSave){
                setContinuoSave(false);
                setTimeout(()=>{
                    HandleSave();
                },500);
            }
        },[continuoSave]); // eslint-disable-line react-hooks/exhaustive-deps

        const HandleEditMode = ()=>{ setEditMode(true); };

        const HandleInfoCell = (e, value)=>{ setInfoCell(value); };

        const HandleSave = ()=>{
            const objeto = {...data};
            objeto.logResponsable = infoCell;
            objeto.ColumnaEl = headCell.id;
            HandleSaveRows(objeto);
            fetch('/FechasProduccionLogistica',{
                method: 'PUT',
                body: JSON.stringify({objetoFronted:objeto}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                HandleCancelar();
                
                setSaving(false);
            });
        };

        const HandlePreSave = ()=>{ setOpenPreAdd(true); }

        const HandleCancelar = ()=>{ setEditMode(false);};

        const HandleClosePreAdd = ()=>{ setOpenPreAdd(false);};

        const HandlePositiveAdd = ()=>{
            setContinuoSave(true);
            setSaving(true);
        };

        if(editMode){
            return(
                <Fragment>
                <Dialog
                    open={openPreAdd}
                    onClose={HandleClosePreAdd}
                    // PaperComponent={PaperComponent}
                    fullWidth
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    disableBackdropClick
                    disableEscapeKeyDown
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="customized-dialog-title" onClose={HandleClosePreAdd}>
                        Esta Correcta la Informacion?
                    </DialogTitle>
                    <DialogActions>
                        <Button variant='contained' onClick={HandleClosePreAdd} color="secondary">
                            No
                        </Button>
                        {
                            isSaving ?
                            <ButtonSemantic primary loading style={{margin:3}}>
                                Loading
                            </ButtonSemantic>
                            :<ButtonSemantic primary onClick={HandlePositiveAdd}  style={{margin:3}}>
                                Si
                            </ButtonSemantic>
                        }
                    </DialogActions>
                </Dialog>
                <Grid container style={{width:headCell.width, marginTop:-10}} spacing={1} >
                    <Grid item style={{padding:0}} xs={6}>
                        <Autocomplete
                            id="ElAutocomplete"
                            options={arrProduccion}
                            value={infoCell || ''}
                            onChange={HandleInfoCell}
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                />
                              )}
                        /> 
                    </Grid>
                    <Grid item style={{marginLeft:30}}>
                        <IconButton size='small' color='primary' onClick={HandlePreSave} >
                            <SaveIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item >
                        <IconButton size='small' color='primary' onClick={HandleCancelar} >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                </Fragment>
            );
        }else{
            return(
                <Button 
                    id={`${Math.random()}_Button`}
                    name={headCell.label} 
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'underline', padding:0, margin:0, height:30, marginTop:-10}}
                >
                    {info || 'Click'}
                </Button>
            );
        }
        
    };

    const CellRowHora = memo((props)=>{

        const { info, data, headCell, HandleSaveRows } = props;

        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCell, setInfoCell ] = useState('');
        const [ infoCellBackup, setInfoCellBackup ] = useState('');
        
        useEffect(()=>{
            setInfoCell(info);
            setInfoCellBackup(info);
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        const { enqueueSnackbar } = useSnackbar();

        const HandleEditMode = ()=>{ setEditMode(true); };

        const HandleInfoCell = (e)=>{
            setInfoCell(e.target.value);
        };

        const HandleSave = ()=>{
            const objeto = {...data};
            objeto.insHora = infoCell;
            fetch('/FechasProduccionLogistica',{
                method: 'PUT',
                body: JSON.stringify({objetoFronted:objeto}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                HandleSaveRows(objeto);
                HandleCancelar();
            });
        };

        const HandleCancelar = ()=>{
            setEditMode(false);
            setInfoCell(infoCellBackup);
        };


        if(editMode){
            return(
                <Grid container style={{padding:0, width:headCell.width, marginTop:-13.5 }} spacing={1} >
                    <Grid item xs={7} style={{padding:0, minWidth:50 }}>
                        <InputYounetStyled 
                            id={data.idElemento}
                            name={data.label} 
                            value={infoCell || ''}
                            onChange={HandleInfoCell}
                            border={true}
                            type='time'
                        />
                    </Grid>
                    <Grid item style={{marginLeft:5}}>
                        <IconButton size='small'  color='primary' onClick={HandleSave} >
                            <SaveIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item >
                        <IconButton size='small'  color='primary' onClick={HandleCancelar} >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            )
        }else{
            return(
                <Button 
                    id={data.idElemento}
                    name={data.label} 
                    fullWidth
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'none', padding:0, margin:0, height:30, width:'100%', marginTop:-10 }}
                >
                    {infoCell || 'Editar'}
                </Button>
            )
        }
        
    });

    const InstaladoresArr = [
        {instalador: "ALAVA HERNAN"},
        {instalador: "ALVAREZ ROGELIO"},
        {instalador: "ALVEAR DARIO"},
        {instalador: "AREVALO RICARDO"},
        {instalador: "ASENCIO WALTER"},
        {instalador: "ASENCIO SERGIO"},
        {instalador: "AVILA JOSE"},
        {instalador: "BAJAÑA SIXTO"},
        {instalador: "BARCIA AVIER"},
        {instalador: "BARCIA MIGUEL"},
        {instalador: "BASTIDAS VICENTE"},
        {instalador: "BOHORQUEZ IVAN"},
        {instalador: "BOZADA LUIS"},
        {instalador: "BRIONES ALEX"},
        {instalador: "CABEZAS ELI"},
        {instalador: "CANDELARIO CRISTOPHER"},
        {instalador: "CANTOS CRISTHIAN"},
        {instalador: "CASTRO OMAR"},
        {instalador: "CEDEÑO DAVID"},
        {instalador: "CHARCOPA GONZALO"},
        {instalador: "CHOEZ RICHARD"},
        {instalador: "ESPINOZA LEONARDO"},
        {instalador: "FLORES JOSE"},
        {instalador: "GOMEZ LUIS"},
        {instalador: "GOYA STALIN"},
        {instalador: "GUAMBO CARLOS"},
        {instalador: "GUARANDA RAUL"},
        {instalador: "GUERRERO CRISTOBAL"},
        {instalador: "LAINEZ ANDY"},
        {instalador: "LAINEZ DAVID"},
        {instalador: "LEON JUAN"},
        {instalador: "LITARDO YUSTHYN"},
        {instalador: "MAYER ANDRES"},
        {instalador: "MENDOZA MANUEL"},
        {instalador: "MERO ERWIN"},
        {instalador: "MERCHAN CHRISTOPHER"},
        {instalador: "MONTOYA GUILLERMO"},
        {instalador: "MORALES PETER"},
        {instalador: "MURILLO JIMMY"},
        {instalador: "CORDERO EDUARDO"},
        {instalador: "NAVARRETE GUSTAVO"},
        {instalador: "OREJUELA OSCAR"},
        {instalador: "ORDOÑEZ FABRICIO"},
        {instalador: "ORRALA WILLIAM"},
        {instalador: "ORTEGA MIGUEL"},
        {instalador: "PAREDES CHRISTIAN"},
        {instalador: "PAZ DARWIN"},
        {instalador: "PIBAQUE LUIS"},
        {instalador: "PINEDA BOLIVAR"},
        {instalador: "PINEDA DARIO"},
        {instalador: "REYES DIEGO"},
        {instalador: "RIVAS MICHAELL"},
        {instalador: "ROMERO JEFFERSON"},
        {instalador: "SEGURA CHRISTIAN"},
        {instalador: "TORRES MIGUEL"},
        {instalador: "TUPACYUPANQUI MICHAEL"},
        {instalador: "VALLE FERNANDO"},
        {instalador: "VEINTIMILLA MIGUEL"},
        {instalador: "VELIZ ALBERTO"},
        {instalador: "VILLAFUERTE FREDY"},
        {instalador: "VILLAFUERTE CESAR"},
        {instalador: "ZAMORA BYRON"},    
        {instalador: "LAINEZ JAIME ANDY ALEX"},
        {instalador: "RIVAS VERA WELLINGTON MICHAELL"},
        {instalador: "ASPIAZU TIGRERO JUAN CARLOS"},
        {instalador: "MONTOYA BOHORQUEZ GUILLERMO JEFFERSON"},
        {instalador: "VALENCIA IGLESIAS ERNESTO LEONARDO"},
        {instalador: "BRIONES JORDAN JOSE RICARDO"},
        {instalador: "ALAVA VELASQUEZ OMAR FREDDY"},
        {instalador: "BARRE MORAN ANDRES FABRICIO"},
        {instalador: "MORALES YAMBAY PETER ELIAN"},  
        {instalador: "MORENO BURGOS RAUL ANDRES"},
        {instalador: "OROBIO VASQUEZ LEUVIS MOISES"},
      
      ];

    const CellRowInstaladores = (props)=>{
        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;
        const { info, data, headCell, HandleSaveRows, getInstaladores  } = props;
        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCellArr, setInfoCellArr ] = useState(data.PersonalArr);
        const [ backupCellArr, setBackupCellArr ] = useState(data.PersonalArr);
        const { enqueueSnackbar } = useSnackbar();
        const [ isSaving, setSaving ] = useState(false);
        const [ openPreAdd, setOpenPreAdd ] = useState(false);
        const [ continuoSave, setContinuoSave ] = useState(false);

        useEffect(()=>{
            if(continuoSave){
                setContinuoSave(false);
                setTimeout(()=>{
                    HandleSave();
                },500);
            }
        },[continuoSave]); // eslint-disable-line react-hooks/exhaustive-deps

        const HandleEditMode = ()=>{ setEditMode(true); console.log(infoCellArr) };

        const HandleInfoCell = (e, value)=>{ setInfoCellArr(value); };

        const HandleSave = ()=>{
            const objeto = {...data};
            objeto.Personal = infoCellArr.map(el=>el.instalador).join(', ');
            objeto.PersonalArr = infoCellArr;
            objeto.ColumnaEl = headCell.id;
            HandleSaveRows(objeto);
            fetch('/FechasProduccionLogistica',{
                method: 'PUT',
                body: JSON.stringify({objetoFronted:objeto}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                HandleCancelar();
                setBackupCellArr(infoCellArr);
                setSaving(false);
            });
        };

        const HandlePreSave = ()=>{ setOpenPreAdd(true); }

        const HandleCancelar = ()=>{ 
            setEditMode(false);
            setInfoCellArr(backupCellArr);
        };

        const HandleClosePreAdd = ()=>{ setOpenPreAdd(false);};

        const HandlePositiveAdd = ()=>{
            setContinuoSave(true);
            setSaving(true);
        };

        if(editMode){
            return(
                <Fragment>
                <Dialog
                    open={openPreAdd}
                    onClose={HandleClosePreAdd}
                    // PaperComponent={PaperComponent}
                    fullWidth
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    style={{padding:0}}
                    disableBackdropClick
                    disableEscapeKeyDown
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="customized-dialog-title" onClose={HandleClosePreAdd}>
                        Esta Correcta la Informacion?
                    </DialogTitle>
                    <DialogActions>
                        <Button variant='contained' onClick={HandleClosePreAdd} color="secondary">
                            No
                        </Button>
                        {
                            isSaving ?
                            <ButtonSemantic primary loading style={{margin:3}}>
                                Loading
                            </ButtonSemantic>
                            :<ButtonSemantic primary onClick={HandlePositiveAdd}  style={{margin:3}}>
                                Si
                            </ButtonSemantic>
                        }
                    </DialogActions>
                </Dialog>
                <Grid container style={{width:headCell.width, marginTop:-10}} spacing={1} >
                    <Grid item style={{padding:0}} xs={8}>
                        <Autocomplete
                            id="ElAutocomplete"
                            options={getInstaladores}
                            value={infoCellArr || []}
                            multiple
                            onChange={HandleInfoCell}
                            getOptionLabel={(option) => option.instalador}
                            renderOption={(option, { selected }) => (
                                <React.Fragment style={{fontSize:10}}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                {option.instalador}
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Personal"
                                  fullWidth
                                  variant="standard"
                                />
                              )}
                        /> 
                    </Grid>
                    <Grid item  xs={1} style={{marginLeft:10}}>
                        <IconButton size='small' color='primary' onClick={HandlePreSave} >
                            <SaveIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item >
                        <IconButton size='small' color='primary' onClick={HandleCancelar} >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                </Fragment>
            );
        }else{
            return(
                <Button 
                    id={`${Math.random()}_Button`}
                    name={headCell.label} 
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'underline', padding:0, margin:0, height:30, marginTop:-10}}
                >
                    {info || 'Click'}
                </Button>
            );
        }
        
    };


    function GarantiaSuper(props) {
        return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
            <GarantiaSup />
        </SnackbarProvider>
    );
    };

export default GarantiaSuper;