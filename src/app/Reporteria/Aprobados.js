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
            Brightness1 as Brightness1Icon,
            CheckBox as CheckBoxIcon,
            Clear as ClearIcon,
            DateRange as DateRangeIcon,
            Delete as DeleteIcon,
            Description as DescriptionIcon,
            FilterList as FilterListIcon,
            GetApp as GetAppIcon,
            MarkunreadMailbox as MarkunreadMailboxIcon,
            NavigateNext as NavigateNextIcon,
            PictureAsPdf as PictureAsPdfIcon,
            //Refresh as RefreshIcon,
            Save as SaveIcon,
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

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const arrMeses = ['', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO','SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

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
        padding-top:${props => props.element ? '0px' : '5px'}; 
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 60};
        background:#ffffff;
        border-bottom: 1px solid #E5E8E8;
        display:block;
        height:30px;
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
        height:30px;
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

    const headCellsColumn = [
        { id: 'Status', numeric: false, disablePadding: false, label: 'Status', show:true, fixed:false, width:100, num:0, align:'left', fontSize:'10px', bolder:false, type:'text' },
        { id: 'numpro', numeric: true, disablePadding: false, label: 'PPTO', show:true, fixed:false, width:80, num:1, align:'right', fontSize:'10px', bolder:false , type:'number'   },
        { id: 'numproAnio', numeric: true, disablePadding: false, label: 'PROFORMA AÑO', show:true, fixed:false, width:150, num:2, align:'right', fontSize:'10px', bolder:false, type:'number' },
        { id: 'numproMes', numeric: false, disablePadding: false, label: 'PROFORMA MES', show:true, fixed:false, width:150, num:3, align:'left', fontSize:'10px', bolder:false , type:'text'    },
        { id: 'numproDate', numeric: false, disablePadding: false, label: 'PROFORMA FECHA', show:true, fixed:false, width:160, num:4, align:'center', fontSize:'9px', bolder:false , type:'date'    },
        { id: 'RefPPTO', numeric: true, disablePadding: false, label: 'REF. PPTO', show:true, fixed:false, width:80, num:5, align:'right', fontSize:'10px', bolder:false , type:'number'   },
        { id: 'ot', numeric: true, disablePadding: false, label: 'N° O.T.', show:true, fixed:false, width:100, num:6, align:'center', fontSize:'10px', bolder:false, type:'text' },
        { id: 'anioOt', numeric: true, disablePadding: false, label: 'AÑO O.T.', show:true, fixed:false, width:100, num:7, align:'center', fontSize:'10px', bolder:false, type:'number' },
        { id: 'mesOt', numeric: false, disablePadding: false, label: 'MES O.T.', show:true, fixed:false, width:140, num:8, align:'left', fontSize:'10px', bolder:false, type:'text' },
        { id: 'otDate', numeric: false, disablePadding: false, label: 'FECHA O.T.', show:true, fixed:false, width:100, num:9, align:'center', fontSize:'10px', bolder:false, type:'date' },
        { id: 'Ejecutiva', numeric: false, disablePadding: false, label: 'Ejecutiva', show:true, fixed:false, width:200, num:10, align:'left', fontSize:'10px', bolder:false , type:'text'    },
        { id: 'Cliente', numeric: false, disablePadding: false, label: 'CLIENTE', show:true, fixed:false, width:300, num:11 , align:'left', fontSize:'10px', bolder:false , type:'text'   },   
        { id: 'Proyecto', numeric: false, disablePadding: false, label: 'PROYECTO', show:true, fixed:false, width:400, num:12, align:'left', fontSize:'9px', bolder:false , type:'text'    },
        { id: 'Usuario', numeric: false, disablePadding: false, label: 'USUARIO', show:true, fixed:false, width:160, num:13, align:'left', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'costot', numeric: false, disablePadding: false, label: 'COST. TOTAL', show:true, fixed:false, width:110, num:14, align:'right', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'destot', numeric: false, disablePadding: false, label: 'DESC. TOTAL', show:true, fixed:false, width:110, num:15, align:'right', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'costotnet', numeric: false, disablePadding: false, label: 'COST. TOTAL NETO', show:true, fixed:false, width:140, num:16, align:'right', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'StatusEjecucion', numeric: false, disablePadding: false, label: 'Status Ejecucion', show:true, fixed:false, width:150, num:17, align:'left', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'Avance', numeric: false, disablePadding: false, label: 'AVANCE INST. LOCALS', show:true, fixed:false, width:130, num:18, align:'left', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'dateInstalacion', numeric: true, disablePadding: false, label: 'Fecha Inst.', show:true, fixed:false, width:140, num:19, align:'left', fontSize:'10px', bolder:false, type:'date'  },
        { id: 'oc', numeric: false, disablePadding: false, label: 'O.C.', show:true, fixed:false, width:100, num:20, align:'left', fontSize:'10px', bolder:false, type:'text'    },
        { id: 'anioOc', numeric: true, disablePadding: false, label: 'AÑO O.C.', show:true, fixed:false, width:100, num:21, align:'left', fontSize:'10px', bolder:false, type:'number' },
        { id: 'mesOc', numeric: false, disablePadding: false, label: 'MES O.C.', show:true, fixed:false, width:100, num:22, align:'left', fontSize:'10px', bolder:false, type:'text' },
        { id: 'dateOc', numeric: false, disablePadding: false, label: 'FECHA O.C.', show:true, fixed:false, width:100, num:23, align:'left', fontSize:'10px', bolder:false, type:'date' },
        { id: 'migo', numeric: false, disablePadding: false, label: 'MIGO', show:true, fixed:false, width:100, num:24, align:'left', fontSize:'10px', bolder:false, type:'text'    },
        { id: 'anioMigo', numeric: true, disablePadding: false, label: 'AÑO MIGO', show:true, fixed:false, width:100, num:25, align:'left', fontSize:'10px', bolder:false, type:'text' },
        { id: 'mesMigo', numeric: false, disablePadding: false, label: 'MES MIGO', show:true, fixed:false, width:100, num:26, align:'left', fontSize:'10px', bolder:false, type:'text' },
        { id: 'migoDate', numeric: false, disablePadding: false, label: 'FECHA MIGO', show:true, fixed:false, width:100, num:27, align:'left', fontSize:'10px', bolder:false, type:'date' },
        { id: 'anioFac', numeric: true, disablePadding: false, label: 'FACTURA AÑO', show:true, fixed:false, width:120, num:28, align:'left', fontSize:'10px', bolder:false, type:'number' },
        { id: 'mesFac', numeric: false, disablePadding: false, label: 'FACTURA MES', show:true, fixed:false, width:120, num:29, align:'left', fontSize:'10px', bolder:false, type:'text' },
        { id: 'dateFac', numeric: false, disablePadding: false, label: 'FACTURA FECHA', show:true, fixed:false, width:150, num:30, align:'left', fontSize:'10px', bolder:false, type:'date' },
        { id: 'numFac', numeric: true, disablePadding: false, label: 'NO. FACTURACION', show:true, fixed:false, width:180, num:31, align:'left', fontSize:'10px', bolder:false, type:'text'  },
        { id: 'subFac', numeric: false, disablePadding: false, label: 'SUBTOTAL', show:true, fixed:false, width:140, num:32, align:'right', fontSize:'10px', bolder:false, type:'text'  },
        { id: 'ivaFac', numeric: false, disablePadding: false, label: 'IVA', show:true, fixed:false, width:140, num:33, align:'right', fontSize:'10px', bolder:false, type:'text'  },
        { id: 'totFac', numeric: false, disablePadding: false, label: 'TOTAL', show:true, fixed:false, width:140, num:34, align:'right', fontSize:'10px', bolder:false, type:'text'  },
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
    
    const TheadYounet2 = memo(({widthDefault, createSortHandler, order, orderBy, headCell, value, classes, align, bgColor})=>( 
        <TheadYounetStyled width={widthDefault} align={align} bgColor={bgColor}>
           {value}
        </TheadYounetStyled>
    ));

    const TdYounet = memo(((props)=>{
        const { minWidth, width, headCells, headCell, valueInfo, fixed, color, align, bolder, fontSize } = props
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
                >
                    {valueInfo === '..Ejecutado..' ? <Brightness1Icon style={{color:'green', marginTop:-3}}/> : valueInfo === '..SinCronograma..' ? <Brightness1Icon style={{color:'red', marginTop:-3}}/> : headCell.id === 'Avance' ? <div style={{display:'flex', justifyContent:'flex-start', flexDirection:'row', flexWrap:'nowrap', marginTop:-5}}><div><Brightness1Icon style={{color:'orange'}}/></div><div style={{alignSelf:'center'}}> {valueInfo.split('_')[1]}</div> </div>: valueInfo}
                </TdYounetStyled>
            }
            </Fragment>
        )
        
        
    }));

    function EnhancedTableHead(props) {
        
        const { classes, order, orderBy, onRequestSort, headCells, HandleChangeWidth } = props;

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
    
        const [ getValores, setValores ] = useState({
            cosuni:0,
            costot:0,
            desuni:0,
            destot:0,
            cosuninet:0,
            costotnet:0,
            alto:0,
            ancho:0,
            fondo:0,
            ejecutiva:'',
            subFac:0,
            ivaFac:0,
            totFac:0
        });
    
        useEffect(()=>{
            let valCosuni = 0;
            let valCostot = 0;
            let valdesuni    = 0;
            let valdestot    = 0;
            let valcosuninet = 0;
            let valcostotnet = 0;
            let valalto      = 0;
            let valancho     = 0;
            let valfondo     = 0;
            let valejecutiva = '';
            let valnumpro    = '';
            let valSub       = 0;
            let valIva       = 0;
            let valTot       = 0;
            let arr = [...selectionArr];
            for(const x in arr){
                let el = arr[x];
                let cosuni = el.cosuni.toString().split(',').join('');
                let costot = el.costot.toString().split(',').join('');
                let desuni = el.desuni.toString().split(',').join('');
                let destot = el.destot.toString().split(',').join('');
                let cosuninet = el.cosuninet.toString().split(',').join('');
                let costotnet = el.costotnet.toString().split(',').join('');
                let subFac = el.subFac.toString().split(',').join('');
                let ivaFac = el.ivaFac.toString().split(',').join('');
                let totFac = el.totFac.toString().split(',').join('');
                valCosuni =     parseFloat(valCosuni) + parseFloat(cosuni);
                valCostot =     parseFloat(valCostot) + parseFloat(costot);
                valdesuni =     parseFloat(valdesuni) + parseFloat(desuni);
                valdestot =     parseFloat(valdestot) + parseFloat(destot);
                valcosuninet =  parseFloat(valcosuninet) + parseFloat(cosuninet);
                valcostotnet =  parseFloat(valcostotnet) + parseFloat(costotnet);
                valalto =       parseFloat(valalto) + parseFloat(el.alto);
                valancho =      parseFloat(valancho) + parseFloat(el.ancho);
                valfondo =      parseFloat(valfondo) + parseFloat(el.fondo);
                valejecutiva =  el.Ejecutiva;
                valnumpro =     el.numpro;
                valSub =        parseFloat(valSub) + parseFloat(subFac);
                valIva =        parseFloat(valIva) + parseFloat(ivaFac);
                valTot =        parseFloat(valTot) + parseFloat(totFac);
            }
            setValores({...getValores,
                cosuni:parseFloat(valCosuni).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                costot:parseFloat(valCostot).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                desuni:parseFloat(valdesuni).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                destot:parseFloat(valdestot).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                cosuninet:parseFloat(valcosuninet).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                costotnet:parseFloat(valcostotnet).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                alto:parseFloat(valalto).toFixed(2),
                ancho:parseFloat(valancho).toFixed(2),
                fondo:parseFloat(valfondo).toFixed(2),
                subFac:parseFloat(valSub).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                ivaFac:parseFloat(valIva).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                totFac:parseFloat(valTot).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,'),
                Ejecutiva:valejecutiva,
                numpro:valnumpro
            });
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

        useEffect(()=>{
            const arr = [...selectionArr];
            const arrMap = arr.filter(el=>el.id === row.id);
            arrMap.length > 0 && setStatusRow(true);
        },[]);

        const HeadCellArr = headCells.map((value, index2)=>( 
            <Fragment key={`${index}_${index2}_${row.id}`} >
                { value.show &&
                    <TdYounet 
                        key={`${index}_${index2}_${row.id}_Td`}
                        width={value.width} 
                        minWidth={propsWidth[value.field]} 
                        headCells={headCells} 
                        headCell={value} 
                        valueInfo={row[value.id]}
                        fixed={value.fixed}
                        align={value.align}
                        fontSize={value.fontSize}
                        bolder={value.bolder}
                    />
                }
            </Fragment>
        ));

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
            <TrYounetStyled key={`fila-${row.id}`}  selected={statusRow}>
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

    const Approved = (props)=>{
        const { setOpen, setHeaderWord } = useAuth();
        const classes = useStyles();
        const { enqueueSnackbar } = useSnackbar();
        const [ rows, setRows ] = useState([]);
        const [ backupsRow, setBackupsRow ] = useState([]);
        const [ order, setOrder] = useState('desc');
        const [ orderBy, setOrderBy] = useState('NumGar');
        const [ page, setPage] = useState(0);
        const [ rowsPerPage, setRowsPerPage] = useState(16);
        const [ headersColumn, setHeadersColumn ] = useState(()=>{
            try{
                if(window.localStorage.getItem('headersRepApproved')){
                    const headersStorage = window.localStorage.getItem('headersRepApproved') ;
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
        const [ DataOp, setDataOp ] = useState([]);
        const [ DataCrono, setDataCrono ] = useState([]);
        const [ DataMatriz, setDataMatriz ] = useState([]);
        const [ isCharging, setCharging ] = useState(true);

        useEffect(()=>{
            const handleUseEffect = async ()=>{
                setOpen(false); 
                setHeaderWord('Reporteria/Aprobados');
                const dataOp = await fetch('/fetch_oplist');
                const dataCrono =  await fetch('CronogramasTot');
                const dataMatriz =  await fetch('/fetch_Matriz');
                const dataInst = await fetch('/api/Instalacion');
                const resultOp = await dataOp.json();
                const resultCrono = await dataCrono.json();
                const resultMatriz = await dataMatriz.json();
                const resultInst = await dataInst.json();
                setDataOp(resultOp);
                setDataCrono(resultCrono);
                setDataMatriz(resultMatriz);
                const arr = [];
                resultOp.forEach((el,index)=>{
                    const objetoFil = {};
                    resultMatriz.filter(el2=>el2.ejecutiva === el.ejecutiva)
                                .forEach(el3=>{
                                if(el3.formulario.length > 0){
                                    let costot_0    = 0;
                                    let destot_0    = 0;
                                    let costotnet_0 = 0;
                                    objetoFil.formularios = el3.formulario;
                                    el3.formulario.forEach((el4, index4)=>{
                                        if(el4.numpro !== ''){
                                            if(parseInt(el4.numpro) === parseInt(el.numpro) ){
                                                costot_0    = parseFloat(el4.costot) + parseFloat(costot_0);
                                                destot_0    = parseFloat(el4.destot) + parseFloat(destot_0);
                                                costotnet_0 = parseFloat(el4.costotnet) + parseFloat(costotnet_0);
                                                objetoFil.numproDate = el4.numproDate;
                                                objetoFil.numproAnio = el4.numproDate ? el4.numproDate.length > 0 ? parseInt( el4.numproDate.toString().split('-')[0], 10) : '':'';
                                                objetoFil.numproMes  = el4.numproDate ? el4.numproDate.length > 0 ? arrMeses[parseInt( el4.numproDate.toString().split('-')[1], 10)] : '':'';
                                                objetoFil.migo       = el4.migo;
                                                objetoFil.migoDate   = el4.migoDate;
                                                objetoFil.anioMigo   = el4.migoDate ? el4.migoDate.length > 0 ? parseInt( el4.migoDate.toString().split('-')[0], 10) : '':'';
                                                objetoFil.mesMigo    = el4.migoDate ? el4.migoDate.length > 0 ? arrMeses[parseInt( el4.migoDate.toString().split('-')[1], 10)] : '':'';
                                                objetoFil.numFac     = el4.numFac;
                                                objetoFil.dateFac    = el4.mesFac;
                                                objetoFil.anioFac    = el4.mesFac ? el4.mesFac.length > 0 ? parseInt( el4.mesFac.toString().split('-')[0], 10) : '':'';
                                                objetoFil.mesFac     = el4.mesFac ? el4.mesFac.length > 0 ? arrMeses[parseInt( el4.mesFac.toString().split('-')[1], 10)] : '':'';
                                                let subFacVal      = parseFloat(el4.subFac).toFixed(2);
                                                let ivaFacVal_0    = parseFloat(subFacVal * 0.12);
                                                let ivaFacVal      = parseFloat(ivaFacVal_0).toFixed(2);
                                                let totFacVal_0    = parseFloat(subFacVal) + parseFloat(ivaFacVal);
                                                let totFacVal      = parseFloat(totFacVal_0).toFixed(2);
                                                objetoFil.subFac     = subFacVal;
                                                objetoFil.ivaFac     = ivaFacVal;
                                                objetoFil.totFac     = totFacVal;
                                                if( index4 === (el3.formulario.length - 1)){
                                                    objetoFil.costot     = costot_0;
                                                    objetoFil.destot     = destot_0;
                                                    objetoFil.costotnet  = costotnet_0;
                                                    objetoFil.Usuario    = el4.usuario;
                                                }
                                            }
                                        }else{
                                            objetoFil.Usuario = '';
                                            objetoFil.cosuni = 0;
                                            objetoFil.costot = 0;
                                            objetoFil.poruni = 0;
                                            objetoFil.desuni = 0;
                                            objetoFil.destot = 0;
                                            objetoFil.cosuninet = 0;
                                            objetoFil.costotnet = 0;
                                        }
                                    })
                                }else{
                                    objetoFil.Usuario = '';
                                    objetoFil.cosuni = 0;
                                    objetoFil.costot = 0;
                                    objetoFil.poruni = 0;
                                    objetoFil.desuni = 0;
                                    objetoFil.destot = 0;
                                    objetoFil.cosuninet = 0;
                                    objetoFil.costotnet = 0;
                                }
                    });
                    const objetoFilCro = {valueNum:0, valueIns:''};
                    resultCrono.filter(el2=>parseInt(el2.numpro) === parseInt(el.numpro)).forEach(el3=>{
                        el3.items.forEach(el4=>{
                            if(el4.insFin){
                                const o = el4.insFin.toString().split('-').map((el5, index5)=> index5 === 1 ? parseInt(el5) * 30 : parseInt(el5)).reduce((a,b)=> a + b);
                                console.log(el4.insFin)
                                console.log(o)
                                if(o > objetoFilCro.valueNum){
                                    objetoFilCro.valueNum = o;
                                    objetoFilCro.valueIns = el4.insFin;
                                }
                            }
                        })
                        
                    });
                    const objeto = {...el};
                    const arrCron = resultCrono.filter(elCron=>elCron.numpro === el.numpro);
                    const arrInst = resultInst.filter(elInst=>elInst.numpro === el.numpro);
                    objeto.StatusEjecucion = arrCron.length === 0 ? 'Sin Cronograma' : arrCron[0].items.length === arrInst.length ? 'Ejecutado' : 'En Proceso';
                    objeto.Avance = arrCron.length === 0 ? '..SinCronograma..' : arrCron[0].items.length === arrInst.length ? '..Ejecutado..' : `En Proceso_${arrInst.length}/${arrCron[0].items.length}`
                    objeto.idGeneral = el._id;
                    objeto.id = el._id;
                    objeto.Ejecutiva = el.ejecutiva;
                    objeto.Proyecto = el.proyecto;
                    objeto.Cliente = el.cliente;
                    objeto.Usuario = objetoFil.Usuario;
                    objeto.cosuni = '0';
                    objeto.poruni = '0';
                    objeto.desuni = '0';
                    objeto.cosuninet = '0';
                    objeto.costot = isNaN(objetoFil.costot) ? '0.00' : parseFloat(objetoFil.costot).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
                    objeto.destot = isNaN(objetoFil.destot) ? '0.00' : parseFloat(objetoFil.destot).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
                    objeto.costotnet = isNaN(objetoFil.costotnet) ? '0.00' : parseFloat(objetoFil.costotnet).toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
                    objeto.numpro = el.numpro;
                    objeto.oc     = el.oc;
                    objeto.dateOc    = el.feredo;
                    objeto.anioOc    =  el.feredo ? el.feredo.length > 0 ? parseInt( el.feredo.toString().split('-')[0], 10) : '':'';
                    objeto.mesOc     = el.feredo ? el.feredo.length > 0 ? arrMeses[parseInt( el.feredo.toString().split('-')[1], 10)] : '':'';
                    objeto.ot        = el.ot;
                    objeto.otDate    = el.otDate;
                    objeto.anioOt    = el.otDate ? el.otDate.length > 0 ? parseInt( el.otDate.toString().split('-')[0], 10) : '':'';
                    objeto.mesOt     = el.otDate ? el.otDate.length > 0 ? arrMeses[parseInt( el.otDate.toString().split('-')[1], 10)] : '':'';
                    objeto.dateInstalacion = objetoFilCro.valueIns;
                    objeto.numproDate = objetoFil.numproDate;
                    objeto.numproAnio = objetoFil.numproAnio;
                    objeto.numproMes  = objetoFil.numproMes;
                    objeto.migo       = objetoFil.migo;
                    objeto.migoDate   = objetoFil.migoDate;
                    objeto.anioMigo   = objetoFil.anioMigo;
                    objeto.mesMigo    = objetoFil.mesMigo; 
                    objeto.numFac     = objetoFil.numFac;   
                    objeto.dateFac    = objetoFil.dateFac;
                    objeto.anioFac    = objetoFil.anioFac;
                    objeto.mesFac     = objetoFil.mesFac;
                    objeto.subFac     = isNaN(objetoFil.subFac) ? 0 : objetoFil.subFac.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
                    objeto.ivaFac     = isNaN(objetoFil.ivaFac) ? 0 : objetoFil.ivaFac.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
                    objeto.totFac     = isNaN(objetoFil.totFac) ? 0 : objetoFil.totFac.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
                    objeto.Status     = el.Status ? el.Status === 'Anulado' ? el.Status :el.ot ? el.ot === null ? 'Activo' : el.ot === '' ? 'Activo' : 'Aprobado' : 'Activo' :el.ot ? el.ot === null ? 'Activo' : el.ot === '' ? 'Activo' : 'Aprobado' : 'Activo';
                    //if(el.Status !== 'Anulado'){
                        if(el.ot !== null){
                            if(el.ot !== ''){
                                if(el.ot !== undefined){
                                    if(el.ot !== ' '){
                                        arr.push(objeto)
                                    }
                                }
                            }
                        }
                    //}
                    
                });
                setRows(arr);
                setBackupsRow(arr);
                setTimeout(()=>{
                    setCharging(false);
                },500);
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

        const handleClickMenu = (event) => {
            setOpenMenuColumn(event.currentTarget);
        };

        const handleClickMenuFixed = (event) => {
            setOpenMenuColumnFixed(event.currentTarget);};

        const handleClickMenuFilter = (event) => {
            setOpenMenuFilter(true);
            setElementFilterShow(true);
        };

        const handleClickMenuDate = (event) => {
            setOpenMenuDate(event.currentTarget);};

        const handleClickMenuPdf = (event) => {
            setOpenMenuPdf(event.currentTarget);};

        const handleClickMenuExcel = (event) => {
            setOpenMenuExcel(event.currentTarget);};

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
            window.localStorage.setItem('headersRepApproved', JSON.stringify(arrMap))
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
            window.localStorage.setItem('headersRepApproved', JSON.stringify(arrMap))
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

        const HandleProcessFilterElement = ()=>{
            console.log(arrFiltrado);
            if(isFilterNow){
                console.log('isFilterNow');
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
                            console.log('!index0');
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
                const resultInicio = elementDate.Inicio.split("-").map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=> a + b, 0);
                const resultFinal = elementDate.Final.split("-").map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=> a + b, 0);
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
                            rows.forEach((value)=>{
                                const dataEl = value[elementDate.idElement];
                                
                                if(dataEl !== undefined){       
                                    if(dataEl !== ''){ 
                                        if(dataEl.length <= 10){
                                            const valFecha = dataEl.split("-").map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=>parseInt(a) + parseInt(b));
                                            if(valFecha >= resultInicio){
                                                if(valFecha <= resultFinal) arrFil.push(value);
                                            } 
                                        }else{
                                            const valFecha2 = dataEl.split("T")[0].toString();
                                            const valFecha = valFecha2.split("-").map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=>parseInt(a) + parseInt(b));
                                            if(valFecha >= resultInicio){
                                                if(valFecha <= resultFinal) arrFil.push(value);
                                            } 
                                        }
    
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
                        }else{
                            const arrFil = [];
                            backupsRow.forEach((value)=>{
                                const dataEl = value[elementDate.idElement];
                                
                                if(dataEl !== undefined){       
                                    if(dataEl !== ''){ 
                                        if(dataEl.length <= 10){
                                            const valFecha = dataEl.split("-").map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=>parseInt(a) + parseInt(b));
                                            if(valFecha >= resultInicio){
                                                if(valFecha <= resultFinal) arrFil.push(value);
                                            } 
                                        }else{
                                            const valFecha2 = dataEl.split("T")[0].toString();
                                            const valFecha = valFecha2.split("-").map((value,index)=>(index === 1 ? parseInt(value) * 30 : parseInt(value))).reduce((a,b)=>parseInt(a) + parseInt(b));
                                            if(valFecha >= resultInicio){
                                                if(valFecha <= resultFinal) arrFil.push(value);
                                            } 
                                        }
    
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
            window.localStorage.setItem('headersRepApproved', JSON.stringify(headersResultStyles))
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
            window.localStorage.setItem('headersRepApproved', JSON.stringify(headersResultStyles));
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
            window.localStorage.setItem('headersRepApproved', JSON.stringify(headersResultStyles))
            setSavingHeaders(true);
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        };

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
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'block'}}>
                    <Toolbar >   
                        <div style={{marginRight:30, fontSize:20}}>PPTOS. APROBADOS</div>
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
                                    getOptionLabel={option => option.label }
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
                                />               
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <Roow 
                                                    key={row.id} 
                                                    row={row} 
                                                    index={index} 
                                                    headCells={headersColumn} 
                                                    HandleClickRow={HandleClickRow}
                                                    HandleSaveRows={HandleSaveRows}
                                                    selectionArr = {selectionArr}
                                                />
                                            
                                            );
                                        })}
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

    function Aprobados(props) {
        return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
            <Approved />
        </SnackbarProvider>
    );
    };

    export default Aprobados;