import React, { useState, useEffect, useRef, useCallback, Fragment, memo } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useAuth } from "./Auth";
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
            TableCell,
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
            Autorenew as AutorenewIcon,
            Block as BlockIcon,
            BorderVertical as BorderVerticalIcon,
            Brush as BrushIcon,
            CheckBox as CheckBoxIcon,
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
import FacebookCircularProgress from './Elementos/FacebookCircularProgress';
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

  const TIPOSGARANTIA = [ 'CREATIVEGROUP', 'CLIENTE'];
  const DPTORESPONSABLES = [ 'PRODUCCION', 'LOGISTICA', 'COMERCIAL', 'CLIENTE'];
  const VALIDADOPOR = [ 'ANTONIO BARCIA', 'DARIO ALVEAR', 'MIGUEL BARCIA' ];


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

    //const Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
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
        min-height:20px;
        padding:5px;   
        position:relative;
        left:0px;      
        // text-overflow: ellipsis;    
        // white-space: nowrap; 
        // overflow: hidden;
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
        { id: 'NumGar', numeric: true, disablePadding: false, label: 'Garantia', show:true, fixed:false, width:100, num:0, type:'number', align:'left', fontSize:'10px', bolder:false },
        { id: 'isRegarantia', numeric: false, disablePadding: false, label: 'ReGarantia', show:true, fixed:false, width:100, num:1, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'Creacion', numeric: false, disablePadding: false, label: 'Creacion', show:true, fixed:false, width:100, num:2, type:'date', align:'left', fontSize:'10px', bolder:false },
        { id: 'Action', numeric: false, disablePadding: false, label: 'Action', show:true, fixed:false, width:80, num:3, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'Fotos', numeric: false, disablePadding: false, label: 'Fotos Garantia', show:true, fixed:false, width:120, num:4, type:'text', align:'left', fontSize:'10px', bolder:false},
        { id: 'FotosFirst', numeric: false, disablePadding: false, label: 'Fotos First', show:true, fixed:false, width:120, num:5, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'numpro', numeric: true, disablePadding: false, label: 'PPTO', show:true, fixed:false, width:80, num:6, type:'text', align:'left', fontSize:'10px', bolder:false },      
        { id: 'CanElem', numeric: true, disablePadding: false, label: 'Cantidad', show:true, fixed:false, width:100, num:7, type:'text', align:'left', fontSize:'10px', bolder:false }, 
        { id: 'TipTra', numeric: false, disablePadding: false, label: 'Tipo Trabajo', show:true, fixed:false, width:210, num:8, type:'text', align:'left', fontSize:'10px', bolder:false  },  
        { id: 'Personal', numeric: false, disablePadding: false, label: 'Personal', show:true, fixed:false, width:350, num:9, type:'text', align:'left', fontSize:'10px', bolder:false  },  
        { id: 'ObservacionGar', numeric: false, disablePadding: false, label: 'Observacion Ventas', show:true, fixed:false, width:200, num:10, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'FecIns', numeric: false, disablePadding: false, label: 'Fec. Instalacion', show:true, fixed:false, width:170, num:11, type:'date', align:'left', fontSize:'10px', bolder:false  },
        { id: 'FecVen', numeric: false, disablePadding: false, label: 'Fec. Vencimiento', show:true, fixed:false, width:170, num:12, type:'date', align:'left', fontSize:'10px', bolder:false  },
        { id: 'MotGar', numeric: false, disablePadding: false, label: 'Motivo Garantia', show:true, fixed:false, width:200, num:13, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'Status', numeric: false, disablePadding: false, label: 'Status', show:true, fixed:false, width:90, num:14, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'FechaInicio', numeric: false, disablePadding: false, label: 'Fecha Inicio', show:true, fixed:false, width:200, num:15, type:'date', align:'left', fontSize:'10px', bolder:false },
        { id: 'FechaTermino', numeric: false, disablePadding: false, label: 'Fecha Acuerdo', show:true, fixed:false, width:200, num:16, type:'date', align:'left', fontSize:'10px', bolder:false  },
        { id: 'FechaTerminoReal', numeric: false, disablePadding: false, label: 'Fecha Termino', show:true, fixed:false, width:200, num:17, type:'date', align:'left', fontSize:'10px', bolder:false  },
        { id: 'ObservacionSuper', numeric: false, disablePadding: false, label: 'Observacion Supervisor', show:true, fixed:false, width:240, num:18, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'OT', numeric: true, disablePadding: false, label: 'O.T.', show:true, fixed:false, width:80 , num:19, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'Proyecto', numeric: false, disablePadding: false, label: 'Proyecto', show:true, fixed:false, width:300, num:20, type:'text', align:'left', fontSize:'10px', bolder:false },
        { id: 'Cliente', numeric: true, disablePadding: false, label: 'Cliente', show:true, fixed:false, width:300, num:21, type:'text', align:'left', fontSize:'10px', bolder:false  },          
        { id: 'Ejecutiva', numeric: false, disablePadding: false, label: 'Ejecutiva', show:true, fixed:false, width:200, num:22, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'Cadena', numeric: false, disablePadding: false, label: 'Cadena', show:true, fixed:false, width:100, num:23, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'Local', numeric: false, disablePadding: false, label: 'Local', show:true, fixed:false, width:100, num:24, type:'text', align:'left', fontSize:'10px', bolder:false },   
        { id: 'Codigo', numeric: false, disablePadding: false, label: 'Codigo', show:true, fixed:false, width:100, num:25, type:'text', align:'left', fontSize:'10px', bolder:false  },
        { id: 'TiposGarantia', numeric: false, disablePadding: false, label: 'Tipo Garantia', show:true, fixed:false, width:220, num:26, type:'select', align:'center', fontSize:'10px', bolder:false  },
        { id: 'DptoResponsable', numeric: false, disablePadding: false, label: 'Dpto. Responsable', show:true, fixed:false, width:250, num:27, type:'select', align:'center', fontSize:'10px', bolder:false  },
        { id: 'ValidadoPor', numeric: false, disablePadding: false, label: 'Validado Por:', show:true, fixed:false, width:220, num:28, type:'select', align:'center', fontSize:'10px', bolder:false  },
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
        const { minWidth, width, headCells, headCell, valueInfo, fotos, fotosFirst, fixed, color, anulado, fechas, observacionSuper, HandleSaveRows, isRegarantia, isEditableGarantia, isEditableReGarantia, select } = props
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
        }else if(fotosFirst){
            return(
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <FotosFirstRow info={valueInfo} statusRow={props.statusRow} ifExist={isRegarantia}/>
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color} >
                        <FotosFirstRow info={valueInfo} statusRow={props.statusRow} ifExist={isRegarantia}/>
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(fechas){
            return(
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowDate info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowDate info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(observacionSuper){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRow info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRow info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(anulado){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowAnulado data={props.data} statusRow={props.statusRow} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowAnulado data={props.data} statusRow={props.statusRow} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(isRegarantia){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowRegarantia data={valueInfo} />
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowRegarantia data={valueInfo} />
                    </TdYounetStyled>
                }
                </Fragment>
            )
        }else if(select){
            return( 
                <Fragment>
                {
                    fixed ?
                    <TdYounetStyledFixed minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowSelect info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
                    </TdYounetStyledFixed>
                    :
                    <TdYounetStyled minWidth={minWidth} width={width} left={leftValue} element={true} color={color}>
                        <CellRowSelect info={valueInfo} headCell={headCell} data={props.data} HandleSaveRows={HandleSaveRows} isRegarantia={isRegarantia} isEditableGarantia={isEditableGarantia} isEditableReGarantia={isEditableReGarantia}/>
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

    
    const GarantiaSup = (props)=>{

        /***********************VARIABLES*********************/
        //const { enqueueSnackbar } = useSnackbar();
        const { setOpen, setHeaderWord, authTokens} = useAuth();
        const classes = useStyles();
        const { enqueueSnackbar } = useSnackbar();
    /*****************************************************/

        const [ rows, setRows ] = useState([]);
        const [ backupsRow, setBackupsRow ] = useState([]);
        const [ order, setOrder] = useState('desc');
        const [ orderBy, setOrderBy] = useState('NumGar');
        const [ page, setPage] = useState(0);
        const [ rowsPerPage, setRowsPerPage] = useState(25);
        const [ headersColumn, setHeadersColumn ] = useState(()=>{
            try{
                if(window.localStorage.getItem('headersGarantiaSuper')){
                    const headersStorage = window.localStorage.getItem('headersGarantiaSuper') ;
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
        const [ isEditableGarantia, setEditableGarantia ] = useState(false);
        const [ isEditableReGarantia, setEditableReGarantia ] = useState(false);
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


        useEffect(()=>{
            setOpen(false); 
            setHeaderWord('Garantia/Supervisores');
            setEditableGarantia(authTokens.Accesos.isEditGarantia ? authTokens.Accesos.isEditGarantia : false);
            setEditableReGarantia(authTokens.Accesos.isEditReGarantia ? authTokens.Accesos.isEditReGarantia : false);
            fetch('/DataGarantias')
            .then(res=>res.json())
            .then(dataInf => {
                if(dataInf.status){
                    console.log(dataInf.status);
                }else{
                    console.log(dataInf)
                    setRows(dataInf);
                    setBackupsRow(dataInf);
                }
            })
            //const socket = socketIOClient();
            //socket.on('GarantiaSocket', data4 => {   
            //    setRows(data4);
            //});
            
            //return(()=>{ 
            //    socket.off('GarantiaSocket');
            //})
        

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
                window.localStorage.setItem('headersGarantiaSuper', JSON.stringify(arrMap))
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
                window.localStorage.setItem('headersGarantiaSuper', JSON.stringify(arrMap))
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
                                    setRowsFilterDate(arrFil);
                                } 
                            }
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

            const HandleClosePre = ()=>{
                setOpenPreCorreos(false);
                setSelection([]);
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
                window.localStorage.setItem('headersGarantiaSuper', JSON.stringify(headersResultStyles))
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
                window.localStorage.setItem('headersGarantiaSuper', JSON.stringify(headersResultStyles));
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
                window.localStorage.setItem('headersGarantiaSuper', JSON.stringify(headersResultStyles))
                setSavingHeaders(true);
                setTimeout(()=>{
                    setSavingHeaders(false);
                },2000);
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
                        <div style={{marginRight:30, fontSize:20}}>Garantia Supervisor</div>
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
                        <TableContainerYounet style={{minHeight:'70vh',  maxHeight:'70vh', minWidth:750, }}>
                            <TableYounet>
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
                                                    key={`Row${row.idSubGarantia}`} 
                                                    row={row} 
                                                    index={index} 
                                                    headCells={headersColumn} 
                                                    HandleClickRow={HandleClickRow}
                                                    HandleSaveRows={HandleSaveRows}
                                                    isEditableGarantia={isEditableGarantia}
                                                    isEditableReGarantia={isEditableReGarantia}
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
            <IconButton href={instance.url} target='_blank' onClick={HandleClickPdf}>
                <GetAppIcon />
            </IconButton>
        );
    };

    const Roow = memo((props)=>{
        const { row, index, headCells, HandleClickRow, HandleSaveRows, isEditableGarantia, isEditableReGarantia } = props;
        const [ statusRow, setStatusRow ] = useState(false);
        const [ continuoStatus, setContinuoStatus ] = useState(false);

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
            if(value.id === 'Action'){ 
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
                        data={row}
                        element={true}
                        anulado={true}
                        statusRow={statusRow}
                        HandleSaveRows={HandleSaveRows}
                        isEditableGarantia={isEditableGarantia}
                        isEditableReGarantia={isEditableReGarantia}
                        isRegarantia={row.isRegarantia}
                    /> 
                )}
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
            if(value.id === 'FotosFirst'){ 
                if(value.show){            
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        fotosFirst={true}
                        label={value.label} 
                        idCell={row.idSubGarantia}
                        fixed={value.fixed}
                        statusRow={statusRow}
                        isRegarantia={row.isRegarantia}
                    />    
                )}
            }else
            if( value.id === 'FechaInicio' || value.id === 'FechaTermino' || value.id === 'FechaTerminoReal'){
                if(value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]} //info
                        label={value.label} 
                        idCell={row.idSubGarantia}
                        fixed={value.fixed}
                        data={row}
                        element={true}
                        fechas={true}
                        HandleSaveRows={HandleSaveRows}
                        isEditableGarantia={isEditableGarantia}
                        isEditableReGarantia={isEditableReGarantia}
                        isRegarantia={row.isRegarantia}
                    /> 
                )}
            }else
            if( value.id === 'ObservacionSuper' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]} //info
                        label={value.label} 
                        idCell={row.idSubGarantia}
                        fixed={value.fixed}
                        data={row}
                        element={true}
                        observacionSuper={true}
                        HandleSaveRows={HandleSaveRows}
                        isEditableGarantia={isEditableGarantia}
                        isEditableReGarantia={isEditableReGarantia}
                        isRegarantia={row.isRegarantia}
                    /> 
                );
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
            }else
            if( value.id === 'isRegarantia' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value}
                        valueInfo={row.isRegarantia}
                        fixed={value.fixed}
                        isRegarantia={row.isRegarantia}
                    />
                );
            
            }else
            if( value.type === 'select' && value.show){
                return(
                    <TdYounet 
                        key={`${index}-${index2}-${row.idGarantia}`} 
                        width={value.width} 
                        minWidth={value.width} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]} //info
                        label={value.label} 
                        idCell={row.idSubGarantia}
                        fixed={value.fixed}
                        data={row}
                        element={true}
                        select={true}
                        HandleSaveRows={HandleSaveRows}
                        isEditableGarantia={isEditableGarantia}
                        isEditableReGarantia={isEditableReGarantia}
                        isRegarantia={row.isRegarantia}
                    /> )
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

        return(
            <TrYounetStyled key={`fila-${index}-${row.idSubGarantia}`}  selected={statusRow}>
                <TableCell padding="checkbox" style={{maxWidth:60, minWidth:60, paddingTop:3}}>
                    <Checkbox
                        checked={statusRow}
                        color='primary'
                        onClick={HandlePreClickRow}
                    />
                </TableCell>
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

        const { info, data, headCell, HandleSaveRows, isEditableReGarantia, isEditableGarantia, isRegarantia  } = props;

        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCell, setInfoCell ] = useState('');
        
        useEffect(()=>{
            setInfoCell(info)
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        const { enqueueSnackbar } = useSnackbar();

        const HandleEditMode = ()=>{
            if(isRegarantia){
                if(isEditableReGarantia){
                    setEditMode(true);
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ANULAR ESTA RE-GARANTIA',{variant:'error'});
                }
            }else{
                if(isEditableGarantia){
                    setEditMode(true);
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ANULAR ESTA GARANTIA',{variant:'error'});
                }
            }
            
        };

        const HandleInfoCell = (e)=>{
            setInfoCell(e.target.value);
        };

        const HandleSave = ()=>{
            fetch('/Instalacion_GarantiaVentas_Other',{
                method: 'PUT',
                body: JSON.stringify({formulario:data, celda:headCell.id, data:infoCell}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                const objeto = {...data};
                objeto.ObservacionSuper = infoCell;
                HandleSaveRows(objeto);
                HandleCancelar();
            });
        };

        const HandleCancelar = ()=>{
            setEditMode(false);
        };


        if(editMode){
            return(
                <Grid container style={{padding:0, width:headCell.width }} spacing={1}>
                    <Grid item style={{padding:0, width:160 }}>
                        <InputYounetStyled 
                            id={data.idSubGarantia}
                            name={data.label} 
                            value={infoCell || ''}
                            onChange={HandleInfoCell}
                            border={true}
                        />
                    </Grid>
                    <Grid item style={{width:35}}>
                        <IconButton  color='primary' onClick={HandleSave} style={{position:'relative', top:-8}}>
                            <SaveIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item style={{width:35}}>
                        <IconButton  color='primary' onClick={HandleCancelar} style={{position:'relative', top:-8}}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            )
        }else{
            return(
                <Button 
                    id={data.idSubGarantia}
                    name={data.label} 
                    fullWidth
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'none', padding:0, margin:0, height:30, width:'100%' }}
                >
                    {infoCell || 'Editar'}
                </Button>
            )
        }
        
    });

    const CellRowSelect = memo((props)=>{

        const { info, data, headCell, HandleSaveRows, isEditableReGarantia, isEditableGarantia, isRegarantia  } = props;

        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCell, setInfoCell ] = useState('');
        const [ getSelect, setSelect  ] = useState([]);
        
        useEffect(()=>{
            setInfoCell(info);
            switch(headCell.id){
                case 'TiposGarantia':
                    setSelect(TIPOSGARANTIA);
                    break;
                case 'DptoResponsable':
                    setSelect(DPTORESPONSABLES);
                    break;
                case 'ValidadoPor':
                    setSelect(VALIDADOPOR);
                    break;
                default:
                    console.log('NO APLICA');
            }
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

        const { enqueueSnackbar } = useSnackbar();

        const HandleEditMode = ()=>{
            if(isRegarantia){
                if(isEditableReGarantia){
                    setEditMode(true);
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ANULAR ESTA RE-GARANTIA',{variant:'error'});
                }
            }else{
                if(isEditableGarantia){
                    setEditMode(true);
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ANULAR ESTA GARANTIA',{variant:'error'});
                }
            }
            
        };

        const HandleInfoCell = ({target})=>{
            setInfoCell(target.value);
        };

        const HandleSave = ()=>{
            fetch('/Instalacion_GarantiaVentas_Other',{
                method: 'PUT',
                body: JSON.stringify({formulario:data, celda:headCell.id, data:infoCell}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                const objeto = {...data};
                objeto[headCell.id] = infoCell;
                HandleSaveRows(objeto);
                HandleCancelar();
            });
        };

        const HandleCancelar = ()=>{
            setEditMode(false);
        };


        if(editMode){
            return(
                <Grid container style={{padding:0, width:headCell.width }} spacing={1}>
                    <Grid item xs={8}>
                        <TextField
                            id={data.idSubGarantia}
                            name={data.label} 
                            value={infoCell || ''}
                            onChange={HandleInfoCell}
                            select
                            size='small'
                            fullWidth
                        >
                            {getSelect.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <IconButton size='small' color='primary' onClick={HandleSave} >
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
                    id={data.idSubGarantia}
                    name={data.label} 
                    fullWidth
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'none', padding:0, margin:0, height:30, width:'100%' }}
                >
                    {infoCell || 'Editar'}
                </Button>
            )
        }
        
    });

    const CellRowAnulado = ({ data, statusRow, HandleSaveRows, isEditableReGarantia, isEditableGarantia, isRegarantia })=>{
        const [ confirmAnulado, setConfirmAnulado ] = useState(false);
        const [ confirmNoAnulado, setConfirmNoAnulado ] = useState(false);
        const [ wordNoAnulado, setWordNoAnulado ] = useState('');
        const { enqueueSnackbar } = useSnackbar();

        const HandleProcess = ()=>{
            if(data.Status === 'En Proceso' || data.Status === 'Concluido'){
                HandleCloseAnulado();
                setWordNoAnulado(data.Status);
                setTimeout(()=>{
                    HandleOpenNoAnulado();
                },500);
            }else{ 
                fetch('/Instalacion_GarantiaVentasAnulado',{
                    method: 'PUT',
                    body: JSON.stringify({formulario:data, celda:'Anulado'}),
                    headers:{'Content-Type':'application/json'}
                })
                .then(response=> response.json())
                .then(result =>{
                    enqueueSnackbar('Anulado', {variant:'info'});
                    HandleCloseAnulado();
                    const objeto = {...data};
                    objeto.Status = 'Anulado';
                    HandleSaveRows(objeto); 
                });
            }
        };

        const HandleCloseAnulado = ()=>{
            setConfirmAnulado(false);
        };

        const HandleOpenAnulado = ()=>{
            if(isRegarantia){
                if(isEditableReGarantia){
                    setConfirmAnulado(true);
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ANULAR ESTA RE-GARANTIA',{variant:'error'});
                }
            }else{
                if(isEditableGarantia){
                    setConfirmAnulado(true);
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ANULAR ESTA GARANTIA',{variant:'error'});
                }
            }
            
        };

        const HandleCloseNoAnulado = ()=>{
            setConfirmNoAnulado(false);
        };

        const HandleOpenNoAnulado = ()=>{
            setConfirmNoAnulado(true);
        };

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
                    <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><span style={{fontWeight:'bold', textAlign:'center'}}>Desea Anular esta Garantia?</span></DialogTitle>
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
                <Dialog
                    open={confirmNoAnulado}
                    onClose={HandleCloseNoAnulado}
                    fullWidth
                    maxWidth={'xs'}
                    style={{padding:10}}
                    aria-labelledby="alert-dialog-slide-title"
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}>
                        <p style={{fontWeight:'bold', textAlign:'center'}}>
                            No se puede anular una Garantia en status: 
                        </p>
                        <p style={{fontWeight:'bold', textAlign:'center', color:data.Status === 'En Proceso' ? 'green' : 'blue'}}>{`${wordNoAnulado}`}</p>
                        </DialogTitle>
                    <DialogActions >
                        <Grid container justify='center' spacing={2}>
                            <Grid item>
                                <Button variant='contained' onClick={HandleCloseNoAnulado} color="secondary">
                                    Cerrar
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

        const { info, data, headCell, HandleSaveRows, isEditableReGarantia, isEditableGarantia, isRegarantia  } = props;
        const [ editMode, setEditMode ] =  useState(false);
        const [ infoCell, setInfoCell ] = useState(data[headCell.id]);
        const { enqueueSnackbar } = useSnackbar();
        const [ isCorreo, setCorreo ] = useState(false);
        const [ isSaving, setSaving ] = useState(false);
        const [ openPreAdd, setOpenPreAdd ] = useState(false);
        const [ continuoSave, setContinuoSave ] = useState(false);

        useEffect(()=>{
            if(continuoSave){
                setContinuoSave(false);
                setTimeout(()=>{
                    HandleSave();
                },1500);
            }
        },[continuoSave]); // eslint-disable-line react-hooks/exhaustive-deps

        const HandleEditMode = ()=>{
            if(isRegarantia){
                if(isEditableReGarantia){
                    if(data.Status === 'Anulado'){
                        enqueueSnackbar('NO PUEDE AÑADIR FECHA CON STATUS ANULADO',{variant:'error'});
                    }else if(data.Status === 'Concluido'){
                        enqueueSnackbar('NO PUEDE EDITAR FECHAS CON STATUS CONCLUIDO',{variant:'error'});
                    }else{
                        setEditMode(true);
                    }
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ASIGNAR FECHAS',{variant:'error'});
                }
            }else{
                if(isEditableGarantia){
                    if(data.Status === 'Anulado'){
                        enqueueSnackbar('NO PUEDE AÑADIR FECHA CON STATUS ANULADO',{variant:'error'});
                    }else if(data.Status === 'Concluido'){
                        enqueueSnackbar('NO PUEDE EDITAR FECHAS CON STATUS CONCLUIDO',{variant:'error'});
                    }else{
                        setEditMode(true);
                    }
                }else{
                    enqueueSnackbar('NO TIENE LOS PERMISOS PARA ASIGNAR FECHAS',{variant:'error'});
                }
            }
            
        };

        const HandleInfoCell = (e)=>{
            setInfoCell(e.target.value);
        };

        const HandleSave = ()=>{
            const objeto = {...data};
            objeto[headCell.id] = infoCell;
            objeto.Status = headCell.id === 'FechaInicio' ? 'En Proceso' : headCell.id === 'FechaTermino' ? 'En Proceso' : 'Concluido';
            objeto.ColumnaEl = headCell.id;
            HandleSaveRows(objeto);
            fetch('/Instalacion_GarantiaVentas',{
                method: 'PUT',
                body: JSON.stringify({objetoFronted:objeto, isCorreo}),
                headers:{'Content-Type':'application/json'}
            })
            .then(response=> response.json())
            .then(result =>{
                enqueueSnackbar('Guardado', {variant:'success'});
                HandleCancelar();
                
                setSaving(false);
            });
        };

        const HandlePreSave = ()=>{
            if(data.Status === 'Anulado'){
                enqueueSnackbar('ELEMENTO ANULADO',{variant:'error'});
            }else{
                if(headCell.id === 'FechaTermino'){
                    const dataInicio = data.FechaInicio.split('-').map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=> parseInt(a) + parseInt(b),0);
                    const dataFinal = infoCell.split('-').map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=> parseInt(a) + parseInt(b),0);
                    if(dataInicio > dataFinal ){
                        enqueueSnackbar('FECHA DE INICIO MAYOR A LA DE TERMINO',{variant:'error'});
                    }else{
                        setOpenPreAdd(true);
                    }
                }else if(headCell.id === 'FechaTerminoReal'){
                    const dataInicio = data.FechaTermino.split('-').map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=> parseInt(a) + parseInt(b),0);
                    const dataFinal = infoCell.split('-').map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=> parseInt(a) + parseInt(b),0);
                    if(dataInicio > dataFinal ){
                        enqueueSnackbar('FECHA DE TERMINO MAYOR A LA DE ASIGNADA',{variant:'error'});
                    }else{
                        setOpenPreAdd(true);
                    }
                }else{
                    setOpenPreAdd(true);
                }
            }
            
        }

        const HandleCancelar = ()=>{
            setEditMode(false);
        };

        const HandleClosePreAdd = ()=>{
            setOpenPreAdd(false);
        };

        const HandlePositiveAdd = ()=>{
            setCorreo(true);
            setContinuoSave(true);
            setSaving(true);
        };

        const HandleNegativeAdd = ()=>{
            setCorreo(false);
            setSaving(true);
            setContinuoSave(true);
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
                        Desea Enviar Correo Electronico?
                    </DialogTitle>
                    <DialogActions>
                        <Button variant='contained' onClick={HandleNegativeAdd} color="secondary">
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
                <Grid container style={{width:headCell.width}} spacing={1}>
                    <Grid item style={{padding:0}} xl={6} lg={6} md={6} sm={6} xs={6}>
                        <InputYounetStyled 
                            id={data.idSubGarantia}
                            name={headCell.label} 
                            value={infoCell || ''}
                            onChange={HandleInfoCell}
                            type='date'
                            style={{width:'100%'}}
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
                    id={data.idSubGarantia}
                    name={headCell.label} 
                    onClick={HandleEditMode}
                    color="primary"
                    style={{textAlign:'center', textDecoration:'underline', padding:0, margin:0, height:30 }}
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

    const CellRowRegarantia = ({ data, statusRow, HandleSaveRows })=>{


        return(
            <Grid container justify='center' style={{height:'100%'}}>
                <Grid item style={{height:'100%', padding:0}}>
                    <Checkbox checked={true} name="ReGarantia" style={{height:'100%'}}/>
                </Grid>
            </Grid>
        );
        
    };


    function GarantiaSuper(props) {
        return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
            <GarantiaSup />
        </SnackbarProvider>
    );
    };

export default GarantiaSuper;