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
            TableContainer,
            Table,         
            TableBody,
            TableCell,
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
            BorderVertical as BorderVerticalIcon,
            Brush as BrushIcon,
            Build as BuildIcon,
            CheckBox as CheckBoxIcon,
            CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
            Clear as ClearIcon,
            Description as DescriptionIcon,
            GetApp as GetAppIcon,
            MarkunreadMailbox as MarkunreadMailboxIcon,
            NavigateNext as NavigateNextIcon,
            PictureAsPdf as PictureAsPdfIcon,
            Save as SaveIcon,
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
const moment = require('moment'); 

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const Meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO','SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    const arrMeses = ['', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO','SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    const opcionesStatus = [ 'ACTIVO', 'ANULADO', 'APROBADO', 'FACTURADO', 'TODOS'];


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

    const TrYounetStyled = styled.tr`
        display:flex;
        background-color:${props => props.selected ? 'LightBlue' : '#fff'};
        &:hover{
            background-color:Gainsboro
        }
    `;

    const headCellsColumn = [
        { id: 'semMes', numeric: true, disablePadding: false, label: 'SEMANA DEL MES', show:true, fixed:false, width:150, num:0, align:'left', fontSize:'10px', bolder:false , type:'number', isHover:false, isTabla:false    },
        { id: 'semMesAnio', numeric: true, disablePadding: false, label: 'SEMANA DEL ANIO', show:true, fixed:false, width:150, num:1, align:'left', fontSize:'10px', bolder:false , type:'number', isHover:false, isTabla:false    },
        { id: 'rangoFecha', numeric: true, disablePadding: false, label: 'RANGO DE SEMANA', show:true, fixed:false, width:150, num:2, align:'left', fontSize:'10px', bolder:false , type:'text', isHover:false, isTabla:false    },
        { id: 'total', numeric: true, disablePadding: false, label: 'TOTAL', show:true, fixed:false, width:150, num:3, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'totalHover', isHover:true, valueTabla:'totalTabla' , isTabla:true  },
        { id: 'opCorLog', numeric: true, disablePadding: false, label: 'OP ACORDADAS', show:true, fixed:false, width:150, num:4, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'opCorLogHover', isHover:true, valueTabla:'opCorLogTabla' , isTabla:true    },
        { id: 'opEnt', numeric: true, disablePadding: false, label: 'OP TERMINADAS', show:true, fixed:false, width:150, num:5, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'opEntHover', isHover:true, valueTabla:'opEntTabla', isTabla:true     },        
        { id: 'opEntSemana', numeric: true, disablePadding: false, label: 'OP EMERGENTES SEMANA', show:true, fixed:false, width:180, num:6, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'opEntSemanaHover', isHover:true, valueTabla:'opEntSemanaTabla', isTabla:true     },
        { id: 'opEntLogistica', numeric: true, disablePadding: false, label: 'TOTAL OP ENTR. LOG. SEMANAL', show:true, fixed:false, width:180, num:7, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'opEntLogisticaHover', isHover:true, valueTabla:'opEntLogisticaTabla', isTabla:true     },
        { id: 'opAdel', numeric: true, disablePadding: false, label: 'OP ADELANTADAS', show:true, fixed:false, width:150, num:8, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'opAdelHover', isHover:true , valueTabla:'opAdelTabla' , isTabla:true   },
        { id: 'opAtr', numeric: true, disablePadding: false, label: 'OP ATRASADAS', show:true, fixed:false, width:150, num:9, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'opAtrHover' , isHover:true, valueTabla:'opAtrTabla' , isTabla:true   },
        { id: 'opAtrFecha', numeric: true, disablePadding: false, label: 'OP ATR. FECHA.', show:true, fixed:false, width:150, num:10, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'opAtrFechaHover' , isHover:true , valueTabla:'opAtrFechaTabla' , isTabla:true  },
        { id: 'cronpen', numeric: true, disablePadding: false, label: 'CRONOGRAMAS PENDIENTES', show:true, fixed:false, width:150, num:11, align:'left', fontSize:'9px', bolder:false , type:'number', hover:'cronpenHover' , isHover:true, valueTabla:'cronpenTabla' , isTabla:true    },
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
        const { minWidth, width, headCells, headCell, valueInfo, fixed, color, align, bolder, fontSize, backgroundColor, valueHover, valueTabla, isTabla } = props
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
                    backgroundColor={backgroundColor}
                >
                    <CelDinamica isTabla={isTabla} valueInfo={ valueInfo } isHover={headCell.isHover} valueHover={valueHover === undefined ? '': valueHover} valueTabla={valueTabla}/>
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
                    <CelDinamica isTabla={isTabla} valueInfo={ valueInfo } isHover={headCell.isHover} valueHover={valueHover === undefined ? '': valueHover} valueTabla={valueTabla}/>
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
                        valueHover={row[value.hover]}
                        valueTabla={row[value.valueTabla]}
                        isTabla={value.isTabla}
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
  
    const CelDinamica = ({ valueInfo, valueHover, valueTabla, isHover, isTabla })=>{
        const [ isTable, setTable] = useState(false);

        const handleShowTabla = ()=>{ setTable(true)}
        const handleNoShowTabla = ()=>{ setTable(false)}

        return(
            <React.Fragment>
                <Dialog
                    open={isTable}
                    onClose={handleNoShowTabla}
                    fullWidth
                    maxWidth={'xl'}
                    aria-labelledby="draggable-dia-log-title"
                    style={{padding:0}}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogContent>
                        <TableContainer component={Paper} style={{maxHeight: 540}}>
                            <Table stickyHeader size="small"  sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead >
                                <TableRow >
                                    <TableCell style={{backgroundColor:'#0E3B5F', color:"white"}}> PPTO</TableCell>
                                    <TableCell style={{backgroundColor:'#0E3B5F', color:"white"}} align="left">CLIENTE</TableCell>
                                    <TableCell style={{backgroundColor:'#0E3B5F', color:"white"}} align="left">PROYECTO</TableCell>
                                    <TableCell style={{backgroundColor:'#0E3B5F', color:"white", minWidth:100}} align="left">APROBACION</TableCell>
                                    <TableCell style={{backgroundColor:'#0E3B5F', color:"white", minWidth:100}} align="left">INICIO</TableCell>
                                    <TableCell style={{backgroundColor:'#0E3B5F', color:"white", minWidth:100}} align="left">ACUERDO</TableCell>
                                    <TableCell style={{backgroundColor:'#0E3B5F', color:"white", minWidth:100}} align="left">FIN</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isTabla &&
                                    <React.Fragment>
                                        {valueTabla.map((row) => (
                                            <TableRow hover key={row.idElement} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell component="th" style={{fontSize:'0.8rem', fontWeight:'bolder'}} scope="row"> {row.numpro}</TableCell>
                                                <TableCell align="left" style={{fontSize:'0.7rem', fontWeight:'bolder'}}>{row.cliente}</TableCell>
                                                <TableCell align="left" style={{fontSize:'0.7rem', fontWeight:'bolder'}}>{row.proyecto}</TableCell>
                                                <TableCell align="left" style={{minWidth:100, fontSize:'0.8rem', fontWeight:'bolder'}}>{row.fcreacion}</TableCell>
                                                <TableCell align="left" style={{minWidth:100, fontSize:'0.8rem', fontWeight:'bolder'}}>{row.proini}</TableCell>
                                                <TableCell align="left" style={{minWidth:100, fontSize:'0.8rem', fontWeight:'bolder'}}>{row.proacu}</TableCell>
                                                <TableCell align="left" style={{minWidth:100, fontSize:'0.8rem', fontWeight:'bolder'}}>{row.proter}</TableCell>
                                            </TableRow>
                                        ))}
                                    </React.Fragment>}
                                
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </DialogContent>
                    <DialogActions>
                        <Grid container justify='center' spacing={2} style={{padding:15}}>
                            <Grid item xl={2} lg={2} md={3} sm={3} xs={4}>
                                <Button variant='contained' color="default" fullWidth onClick={handleNoShowTabla} endIcon={<ClearIcon/>}>
                                    Cerrar
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </DialogActions>
                </Dialog>
                { isHover ?
                <Tooltip title={valueHover} >
                    <IconButton onClick={handleShowTabla} size='small' style={{fontSize:'1rem', color:'black'}}>
                        { valueInfo }
                    </IconButton>
                </Tooltip>:
                <IconButton onClick={handleShowTabla} size='small'  style={{fontSize:'1rem', color:'black'}} disabled={!isTabla}>
                    { valueInfo }
                </IconButton>
                }
                
                
            </React.Fragment>
           
        )
    }

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
        const [ openMenuPdf, setOpenMenuPdf ] = useState(null);
        const [ openMenuExcel, setOpenMenuExcel ] = useState(null);
        const [ openMenuStyles, setOpenMenuStyles ] = useState(false);
        const [ openMenuPosicion, setOpenMenuPosicion ] = useState(false);
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
        const [ isFoundProject, setFoundProject ] = useState(true);
        const [ showOptions, setShowOptions ] = useState(false);
        const [ continuoProcess, setContinuoProcess ] = useState(false);
        const [ getOpciones, setOpciones ] = useState({
            Status:'TODOS', 
            Ejecutiva:[], 
            Coordinadora:[],
            tipoFiltro:'TODOS',
            Tipo:'', 
            isComparativo:false, 
            isAnual:false, 
            isEjecutiva:null, 
            isTotalFiltro:true, 
            MesesComparar:[],
            AnioInicio:'',
            AnioFinal:'',
            Anios: [],
            Tabla:'CRONOLOGICO',
            Mes:'',
            Anio:'',
            isSemAnio:false,
            semAnioArr:[]
        });
        const [ getOpcionesEjecutiva, setOpcionesEjecutiva ] = useState([]);
        const [ getCoordinadoras, setCoordinadoras ] = useState([]);
        const [ getObjectCoordinadoras, setObjectCoordinadoras ] = useState([]);
        //const [ getDataMatriz, setDataMatriz ] = useState([]);
        const [ getDataMatrizDet, setDataMatrizDet ] = useState([]);
        const [ getDataOp, setDataOp ] = useState([]);
        const [ getContinuoSelection, setContinuoSelection ] = useState(false);
        const [ getDataUsers, setDataUsers ] = useState([]);
        const [ getPlanificacion, setPlanificacion] = useState([]);
        const [ getPlanificacionUnique, setPlanificacionUnique ] = useState([]);
        const [ getDataActive, setDataActive ] = useState([]);
        const [ isWaiting, setWaiting ] = useState(true);

        useEffect(()=>{
            const handleUseEffect = async ()=>{
                setOpen(false);  
                setHeaderWord('Reporteria/Resumido');
                setCharging(false);
                const getFUsers = await fetch('/UsersList')
                const getDUsers = await getFUsers.json();
                setDataUsers(getDUsers);
                const responsePlan = await fetch('/ReporteriaPlanificacion')
                const dataPlan = await responsePlan.json();
                const dataPlan_ = dataPlan.map(el=> el.semAnio)
                const dataPlanUnique = [...new Set( dataPlan_ )];
                setPlanificacionUnique(dataPlanUnique);
                setPlanificacion(dataPlan);
                const dataOp = await fetch('/fetch_oplist');
                const resultOp = await dataOp.json();
                setDataOp(resultOp);
                const dataMatriz =  await fetch('/CronogramasTot');
                const resultMatriz = await dataMatriz.json();
                const arrDet = [];
                for(const u in resultMatriz){
                    const objeto = {...resultMatriz[u]};
                    for(const v in resultMatriz[u].items){
                        const objeto2 = {...resultMatriz[u].items[v]};
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
                const arrActivo = []; //ARR ELEMENTOS TOTALES ACTIVOS
                for(const x in resultOp){
                    const elNumpro = resultOp[x].numpro;
                    if(resultOp[x].ot)
                        if(resultOp[x].ot !== null || resultOp[x].ot !== undefined || resultOp[x].ot !== '' || resultOp[x].ot !== ' '){
                            const objeto3 = {...resultOp[x]};
                            objeto3.idGeneral = resultOp[x]._id;
                            objeto3.id = resultOp[x]._id;
                            let dateCreacion = '2021-1-1';
                            const arrFiltrado3 = arrDet.filter(el=> el.numpro === elNumpro);
                            if(objeto3.otDate){
                                dateCreacion = objeto3.otDate;
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
                            let fecini = 0;
                            let valorIni = 0;
                            let fecacu = 0;
                            let valorAcu = 0;
                            let fecacu_ = 0;
                            let valorAcu_ = 0;
                            let fecter = 0;
                            let valorTer = 0;
                            let indexFec = 0;
                            if(arrFiltrado3.length > 0){
                                for(const u in arrFiltrado3){
                                    if(arrFiltrado3[u].insStart){
                                        if(arrFiltrado3[u].insStart !== 'N/A' || arrFiltrado3[u].insStart !== '' || arrFiltrado3[u].insStart !==  null || arrFiltrado3[u].insStart !== undefined){
                                            let valIni = new Date(arrFiltrado3[u].insStart)
                                            if(indexFec === 0){
                                                fecini = arrFiltrado3[u].insStart;
                                                valorIni = arrFiltrado3[u].insStart; 
                                            }else{
                                                let iniBack = new Date(fecini);
                                                if(valIni.getTime() < iniBack.getTime()){ 
                                                    fecini = valIni;
                                                    valorIni = arrFiltrado3[u].insStart; 
                                                }
                                            }
                                            
                                        }
                                    }
                                    if(arrFiltrado3[u].insAgr){
                                        if(arrFiltrado3[u].insAgr !== 'N/A' || arrFiltrado3[u].insAgr !== '' || arrFiltrado3[u].insAgr !==  null || arrFiltrado3[u].insAgr !== undefined){
                                            
                                            let valAcu = new Date(arrFiltrado3[u].insAgr);
                                            let acuBack = new Date(fecacu);
                                            if(valAcu.getTime() > acuBack.getTime()){ 
                                                fecacu = valAcu;
                                                valorAcu = arrFiltrado3[u].insAgr;
                                            }

                                        }
                                    }
                                    if(arrFiltrado3[u].fecInsAgr){
                                        if(arrFiltrado3[u].fecInsAgr !== 'N/A' || arrFiltrado3[u].fecInsAgr !== '' || arrFiltrado3[u].fecInsAgr !==  null || arrFiltrado3[u].fecInsAgr !== undefined){
                                            
                                            let valAcu_ = new Date(arrFiltrado3[u].fecInsAgr );
                                            let acuBack_ = new Date(fecacu_);
                                            if(valAcu_.getTime() > acuBack_.getTime()){ 
                                                fecacu_ = valAcu_;
                                                valorAcu_ = arrFiltrado3[u].fecInsAgr;
                                            }

                                        }
                                    }
                                    if(arrFiltrado3[u].insFin){
                                        if(arrFiltrado3[u].insFin !== 'N/A' || arrFiltrado3[u].insFin !== '' || arrFiltrado3[u].insFin !==  null || arrFiltrado3[u].insFin !== undefined){
                                            let valTer = new Date(arrFiltrado3[u].insFin);
                                            let terBack = new Date(fecter);
                                            if(valTer.getTime() > terBack.getTime()){ 
                                                fecter = valTer;
                                                valorTer = arrFiltrado3[u].insFin;
                                            }
                                        }
                                    }
                                    indexFec += 1;
                                }
                            }
                            const dCreacion = dateCreacion.toString().split('-');
                            const fechCre = dateCreacion.toString().split('T')[0];
                            const infoSem = dataPlan.filter(el=>el.fecLab.toString().trim() === fechCre.toString().trim());
                            const infoSemAcu = dataPlan.filter(el=>el.fecLab.toString().trim() === valorAcu.toString().trim());
                            const infoSemAcu_ = dataPlan.filter(el=>el.fecLab.toString().trim() === valorAcu_.toString().trim());
                            const infoSemTer = dataPlan.filter(el=>el.fecLab.toString().trim() === valorTer.toString().trim());
                            objeto3.semMes = infoSem.length > 0 ? infoSem[0].semMes : 0;
                            objeto3.semMesAcu = infoSemAcu.length > 0 ? infoSemAcu[0].semMes : 0;
                            objeto3.semMesAcu_ = infoSemAcu_.length > 0 ? infoSemAcu_[0].semMes : 0;
                            objeto3.semMesTer = infoSemTer.length > 0 ? infoSemTer[0].semMes : 0;
                            objeto3.semMesAnio = infoSem.length > 0 ? infoSem[0].semAnio : 0;
                            objeto3.semMesAcuAnio = infoSemAcu.length > 0 ? infoSemAcu[0].semAnio : 0;
                            objeto3.semMesAcu_Anio = infoSemAcu_.length > 0 ? infoSemAcu_[0].semAnio : 0;
                            objeto3.semMesTerAnio = infoSemTer.length > 0 ? infoSemTer[0].semAnio : 0;
                            objeto3.fcreacion = dateCreacion;
                            objeto3.anioCreacion = dCreacion[0];
                            objeto3.anioAcuerdo = valorAcu.length > 0 && parseInt(valorAcu.split('-')[0]);
                            objeto3.anioAcuerdo_ = valorAcu_.length > 0 && parseInt(valorAcu_.split('-')[0]);
                            objeto3.anioTermino = valorTer.length > 0 && parseInt(valorTer.split('-')[0]);
                            objeto3.mesCreacion  = arrMeses[parseInt(dCreacion[1])];
                            objeto3.mesAcuerdo  = valorAcu.length > 0 && arrMeses[parseInt(valorAcu.split('-')[1])];
                            objeto3.mesAcuerdo_  = valorAcu_.length > 0 && arrMeses[parseInt(valorAcu_.split('-')[1])];
                            objeto3.mesTermino  = valorTer.length > 0 && arrMeses[parseInt(valorTer.split('-')[1])];
                            objeto3.mesCreacionNum = dCreacion[1];
                            objeto3.coordinadora = (arr2.filter(el=>el.nombre === objeto3.ejecutiva)[0])?.coordinador;
                            objeto3.proini = valorIni;
                            objeto3.proacu = valorAcu;
                            objeto3.proter = valorTer;
                            objeto3.fechaAcu = valorAcu_;
                            arrActivo.push(objeto3);
                        } 
                            
                }
                setDataActive(arrActivo);
                setCoordinadoras(arr4);
                setObjectCoordinadoras(arr2);
                setWaiting(false);
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

        const handleClickMenuPdf = (event) => {setOpenMenuPdf(event.currentTarget);};

        const handleClickMenuExcel = (event) => {setOpenMenuExcel(event.currentTarget);};

        const handleCloseMenu = () => {setOpenMenuColumn(null)};

        const handleCloseMenuFixed = () => { setOpenMenuColumnFixed(null) };

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
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(arrMap))
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
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(arrMap))
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
            window.localStorage.setItem('tableReporteriaHistorico', JSON.stringify(headersResultStyles))
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
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(headersResultStyles));
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
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(headersResultStyles))
            setSavingHeaders(true);
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        };

        const handleShowOptions = ()=>{ setShowOptions(true) };

        const handleCloseOptions = ()=>{ setShowOptions(false) };

        const handleProcesarElementos = ()=>{
            const dataArr = [...getDataActive];
            const dataPlan = [...getPlanificacion];
            switch(getOpciones.tipoFiltro){
                case 'EJECUTIVA':
                    const arrEje3 = dataArr.filter(el=> getOpciones.Ejecutiva.includes(el.ejecutiva)); //ARR ELEMENTOS APROBADOS FILTRADOS POR EJECUTIVA
                    (()=>{
                        const arrfilAnual1 = arrEje3.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                        const arrMensual1 = arrfilAnual1.filter(el=> getOpciones.Mes.toString().trim() === el.mesCreacion.toString().trim());
                        const arr1 = [];
                        const arr2 = [];
                        const arr3 = [];
                        const arr4 = [];
                        const arr5 = [];
                        let numAcu1 = 0;
                        let numAcu2 = 0;
                        let numAcu3 = 0;
                        let numAcu4 = 0;
                        let numAcu5 = 0;
                        let numTer1 = 0;
                        let numTer2 = 0;
                        let numTer3 = 0;
                        let numTer4 = 0;
                        let numTer5 = 0;
                        let numAdel1 = 0;
                        let numAdel2 = 0;
                        let numAdel3 = 0;
                        let numAdel4 = 0;
                        let numAdel5 = 0;
                        const arrFechas1 = [];
                        const arrFechas2 = [];
                        const arrFechas3 = [];
                        const arrFechas4 = [];
                        const arrFechas5 = [];
                        const arrFechaBack = [];                   
                        let numMesBack = arrMeses.indexOf(getOpciones.Mes) - 1;
                        let mesBack = arrMeses[numMesBack === 0 ? 12 :numMesBack];
                        let anioBack = parseInt(getOpciones.Anio) -1;
                        for(const x in dataPlan){
                            let fecSplit = dataPlan[x].fecLab.split('-');
                            let anioPlan = fecSplit[0];
                            let mesPlan = arrMeses[parseInt(fecSplit[1])];   
                            if(getOpciones.Anio.toString() === anioPlan.toString()){
                                if(getOpciones.Mes.toString() === mesPlan.toString()){
                                    switch(dataPlan[x].semMes){
                                        case 1:
                                            arrFechas1.push(dataPlan[x].fecLab);
                                            break;
                                        case 2:
                                            arrFechas2.push(dataPlan[x].fecLab);
                                            break;
                                        case 3:
                                            arrFechas3.push(dataPlan[x].fecLab);
                                            break;
                                        case 4:
                                            arrFechas4.push(dataPlan[x].fecLab);
                                            break;
                                        case 5:
                                            arrFechas5.push(dataPlan[x].fecLab);
                                            break;
                                        default:                                            
                                            console.log('NO APLICA');
                                            break;
                                    }
                                }
                            }
                        }
                        for(const x in dataPlan){
                            let fecSplit = dataPlan[x].fecLab.split('-');
                            let anioPlan = fecSplit[0];
                            let mesPlan = arrMeses[parseInt(fecSplit[1])];   
                            if(numMesBack === 0){
                                if(anioBack.toString() === anioPlan.toString()){
                                    if(mesPlan.toString() === mesBack.toString()){
                                        arrFechaBack.push(dataPlan[x].fecLab);
                                    }
                                }
                            }else{
                                if(getOpciones.Anio.toString() === anioPlan.toString()){
                                    if(mesBack.toString() === mesPlan.toString()){
                                        arrFechaBack.push(dataPlan[x].fecLab);
                                    }
                                }
                            }
                        }
                        for(const u in arrMensual1){
                            switch(arrMensual1[u].semMes){
                                case 1:
                                    arr1.push(arrMensual1[u]);
                                    if(arrFechas1.includes(arrMensual1[u].proacu)) numAcu1 += 1;
                                    if(arrFechas1.includes(arrMensual1[u].proter)) numTer1 += 1;
                                    if(arrFechaBack.includes(arrMensual1[u].proter)) numAdel1 +=1;
                                    break;
                                case 2:
                                    arr2.push(arrMensual1[u]);
                                    if(arrFechas2.includes(arrMensual1[u].proacu)) numAcu2 += 1;
                                    if(arrFechas2.includes(arrMensual1[u].proter)) numTer2 += 1;
                                    if(arrFechas1.includes(arrMensual1[u].proter)) numAdel2 +=1;
                                    break;
                                case 3:
                                    arr3.push(arrMensual1[u]);
                                    if(arrFechas3.includes(arrMensual1[u].proacu)) numAcu3 += 1;
                                    if(arrFechas3.includes(arrMensual1[u].proter)) numTer3 += 1;
                                    if(arrFechas2.includes(arrMensual1[u].proter)) numAdel3 +=1;
                                    break;
                                case 4:
                                    arr4.push(arrMensual1[u]);
                                    if(arrFechas4.includes(arrMensual1[u].proacu)) numAcu4 += 1;
                                    if(arrFechas4.includes(arrMensual1[u].proter)) numTer4 += 1;
                                    if(arrFechas3.includes(arrMensual1[u].proter)) numAdel4 +=1;
                                    break;
                                case 5:
                                    arr5.push(arrMensual1[u]);
                                    if(arrFechas5.includes(arrMensual1[u].proacu)) numAcu5 += 1;
                                    if(arrFechas5.includes(arrMensual1[u].proter)) numTer5 += 1;
                                    if(arrFechas4.includes(arrMensual1[u].proter)) numAdel5 +=1;
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                        }
                        const arrTot = [];
                        for(let i =1; i < 6; i++){
                            const objeto={};
                            objeto.semMes = i;
                            objeto.id = `idRow_${i}`;
                            objeto.idGeneral = `idRow_${i}`;
                            switch(i){
                                case 1:
                                    objeto.total = arr1.length;
                                    objeto.opCorLog = numAcu1;
                                    objeto.opEnt = numTer1;
                                    objeto.opAdel = numAdel1;
                                    arrTot.push(objeto);
                                    break;
                                case 2:
                                    objeto.total = arr2.length;
                                    objeto.opCorLog = numAcu2;
                                    objeto.opEnt = numTer2;
                                    objeto.opAdel = numAdel2;
                                    arrTot.push(objeto);
                                    break;
                                case 3:
                                    objeto.total = arr3.length;
                                    objeto.opCorLog = numAcu3;
                                    objeto.opEnt = numTer3;
                                    objeto.opAdel = numAdel3;
                                    arrTot.push(objeto);
                                    break;
                                case 4:
                                    objeto.total = arr4.length;
                                    objeto.opCorLog = numAcu4;
                                    objeto.opEnt = numTer4;
                                    objeto.opAdel = numAdel4;
                                    arrTot.push(objeto);
                                    break;
                                case 5:
                                    objeto.total = arr5.length;
                                    objeto.opCorLog = numAcu5;
                                    objeto.opEnt = numTer5;
                                    objeto.opAdel = numAdel5;
                                    arrTot.push(objeto);
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                            
                        }
                        setRows(arrTot);
                        setBackupsRow(arrTot);
                        setSavingHeaders(false);
                    })()

                    break;

                case 'COORDINADORA':
                    const arrCoor3 = dataArr.filter(el=>getOpciones.Coordinadora.includes(el.coordinadora));
                    (()=>{
                        const arrfilAnual1 = arrCoor3.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                        const arrMensual1 = arrfilAnual1.filter(el=> getOpciones.Mes.toString().trim() === el.mesCreacion.toString().trim());
                        const arr1 = [];
                        const arr2 = [];
                        const arr3 = [];
                        const arr4 = [];
                        const arr5 = [];
                        let numAcu1 = 0;
                        let numAcu2 = 0;
                        let numAcu3 = 0;
                        let numAcu4 = 0;
                        let numAcu5 = 0;
                        let numTer1 = 0;
                        let numTer2 = 0;
                        let numTer3 = 0;
                        let numTer4 = 0;
                        let numTer5 = 0;
                        let numAdel1 = 0;
                        let numAdel2 = 0;
                        let numAdel3 = 0;
                        let numAdel4 = 0;
                        let numAdel5 = 0;
                        const arrFechas1 = [];
                        const arrFechas2 = [];
                        const arrFechas3 = [];
                        const arrFechas4 = [];
                        const arrFechas5 = [];
                        const arrFechaBack = [];                   
                        let numMesBack = arrMeses.indexOf(getOpciones.Mes) - 1;
                        let mesBack = arrMeses[numMesBack === 0 ? 12 :numMesBack];
                        let anioBack = parseInt(getOpciones.Anio) -1;
                        for(const x in dataPlan){
                            let fecSplit = dataPlan[x].fecLab.split('-');
                            let anioPlan = fecSplit[0];
                            let mesPlan = arrMeses[parseInt(fecSplit[1])];   
                            if(getOpciones.Anio.toString() === anioPlan.toString()){
                                if(getOpciones.Mes.toString() === mesPlan.toString()){
                                    switch(dataPlan[x].semMes){
                                        case 1:
                                            arrFechas1.push(dataPlan[x].fecLab);
                                            break;
                                        case 2:
                                            arrFechas2.push(dataPlan[x].fecLab);
                                            break;
                                        case 3:
                                            arrFechas3.push(dataPlan[x].fecLab);
                                            break;
                                        case 4:
                                            arrFechas4.push(dataPlan[x].fecLab);
                                            break;
                                        case 5:
                                            arrFechas5.push(dataPlan[x].fecLab);
                                            break;
                                        default:                                            
                                            console.log('NO APLICA');
                                            break;
                                    }
                                }
                            }
                        }
                        for(const x in dataPlan){
                            let fecSplit = dataPlan[x].fecLab.split('-');
                            let anioPlan = fecSplit[0];
                            let mesPlan = arrMeses[parseInt(fecSplit[1])];   
                            if(numMesBack === 0){
                                if(anioBack.toString() === anioPlan.toString()){
                                    if(mesPlan.toString() === mesBack.toString()){
                                        arrFechaBack.push(dataPlan[x].fecLab);
                                    }
                                }
                            }else{
                                if(getOpciones.Anio.toString() === anioPlan.toString()){
                                    if(mesBack.toString() === mesPlan.toString()){
                                        arrFechaBack.push(dataPlan[x].fecLab);
                                    }
                                }
                            }
                        }
                        for(const u in arrMensual1){
                            switch(arrMensual1[u].semMes){
                                case 1:
                                    arr1.push(arrMensual1[u]);
                                    if(arrFechas1.includes(arrMensual1[u].proacu)) numAcu1 += 1;
                                    if(arrFechas1.includes(arrMensual1[u].proter)) numTer1 += 1;
                                    if(arrFechaBack.includes(arrMensual1[u].proter)) numAdel1 +=1;
                                    break;
                                case 2:
                                    arr2.push(arrMensual1[u]);
                                    if(arrFechas2.includes(arrMensual1[u].proacu)) numAcu2 += 1;
                                    if(arrFechas2.includes(arrMensual1[u].proter)) numTer2 += 1;
                                    if(arrFechas1.includes(arrMensual1[u].proter)) numAdel2 +=1;
                                    break;
                                case 3:
                                    arr3.push(arrMensual1[u]);
                                    if(arrFechas3.includes(arrMensual1[u].proacu)) numAcu3 += 1;
                                    if(arrFechas3.includes(arrMensual1[u].proter)) numTer3 += 1;
                                    if(arrFechas2.includes(arrMensual1[u].proter)) numAdel3 +=1;
                                    break;
                                case 4:
                                    arr4.push(arrMensual1[u]);
                                    if(arrFechas4.includes(arrMensual1[u].proacu)) numAcu4 += 1;
                                    if(arrFechas4.includes(arrMensual1[u].proter)) numTer4 += 1;
                                    if(arrFechas3.includes(arrMensual1[u].proter)) numAdel4 +=1;
                                    break;
                                case 5:
                                    arr5.push(arrMensual1[u]);
                                    if(arrFechas5.includes(arrMensual1[u].proacu)) numAcu5 += 1;
                                    if(arrFechas5.includes(arrMensual1[u].proter)) numTer5 += 1;
                                    if(arrFechas4.includes(arrMensual1[u].proter)) numAdel5 +=1;
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                        }
                        const arrTot = [];
                        for(let i =1; i < 6; i++){
                            const objeto={};
                            objeto.semMes = i;
                            objeto.id = `idRow_${i}`;
                            objeto.idGeneral = `idRow_${i}`;
                            switch(i){
                                case 1:
                                    objeto.total = arr1.length;
                                    objeto.opCorLog = numAcu1;
                                    objeto.opEnt = numTer1;
                                    objeto.opAdel = numAdel1;
                                    arrTot.push(objeto);
                                    break;
                                case 2:
                                    objeto.total = arr2.length;
                                    objeto.opCorLog = numAcu2;
                                    objeto.opEnt = numTer2;
                                    objeto.opAdel = numAdel2;
                                    arrTot.push(objeto);
                                    break;
                                case 3:
                                    objeto.total = arr3.length;
                                    objeto.opCorLog = numAcu3;
                                    objeto.opEnt = numTer3;
                                    objeto.opAdel = numAdel3;
                                    arrTot.push(objeto);
                                    break;
                                case 4:
                                    objeto.total = arr4.length;
                                    objeto.opCorLog = numAcu4;
                                    objeto.opEnt = numTer4;
                                    objeto.opAdel = numAdel4;
                                    arrTot.push(objeto);
                                    break;
                                case 5:
                                    objeto.total = arr5.length;
                                    objeto.opCorLog = numAcu5;
                                    objeto.opEnt = numTer5;
                                    objeto.opAdel = numAdel5;
                                    arrTot.push(objeto);
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                            
                        }
                        setRows(arrTot);
                        setBackupsRow(arrTot);
                        setSavingHeaders(false);
                    })()

                    break;

                default:
                    //const arrEjecutivasString = [...getOpcionesEjecutiva];       
                    const arrfilAnual1 = dataArr.filter(el=> getOpciones.Anio.toString().trim() === el.anioCreacion.toString().trim()) //ARR ELEMENTOS FILTRADO ANUAL
                    const arrTot = [];                    
                    if(getOpciones.isSemAnio){
                        for(let i = 0; i < getOpciones.semAnioArr.length; i++){
                            const arr_Atraso = [];
                            const arr_AtrasoTabla = [];
                            const arr_nico = arrfilAnual1.filter(el=>el.semMesAcuAnio === getOpciones.semAnioArr[i] )
                            for(let p = 0; p< arr_nico.length; p++){

                                const fechaAprobacion1 = moment(arr_nico[p].fcreacion.toString().split('T')[0]);
                                const fechaAcuerdo1 = moment(arr_nico[p].proacu.toString().split('T')[0]);
                                const diasDif1 = fechaAcuerdo1.diff(fechaAprobacion1, 'days');
                                if(parseInt( diasDif1 ) > 3){ 
                                    arr_Atraso.push(arr_nico[p].numpro)
                                    arr_AtrasoTabla.push(arr_nico[p])
                                }
                            }
                            const objeto={};
                            objeto.semMes = '';
                            objeto.id = `idRow_${i + 100}`;
                            objeto.idGeneral = `idRow_${i + 100}`;
                            objeto.semMesAnio = getOpciones.semAnioArr[i];
                            const fechasRango = dataPlan.filter(el=>el.semAnio === getOpciones.semAnioArr[i]).filter(el=> el.fecLab.split('-')[0].toString() === getOpciones.Anio.toString().trim());
                            const rangoFecha = `${fechasRango[0].fecLab.split('-')[2]}/${fechasRango[0].fecLab.split('-')[1]} - ${fechasRango[4].fecLab.split('-')[2]}/${fechasRango[4].fecLab.split('-')[1]}`;
                            const elTotal = arrfilAnual1.filter(el=>el.semMesAnio === getOpciones.semAnioArr[i] ).map(el=>el.numpro);
                            const elOpEntSemana = arrfilAnual1.filter(el=>el.semMesAcuAnio === getOpciones.semAnioArr[i] && el.semMesAnio === getOpciones.semAnioArr[i]).map(el=>el.numpro);
                            const elOpCorLog = arrfilAnual1.filter(el=>el.semMesAcuAnio === getOpciones.semAnioArr[i] ).map(el=>el.numpro).filter(el=> !elOpEntSemana.includes(el));
                            const elOpEnt = arrfilAnual1.filter(el=>el.semMesTerAnio === getOpciones.semAnioArr[i] ).map(el=>el.numpro).filter(el=> !elOpEntSemana.includes(el));
                            const elOpAdel = arrfilAnual1.filter(el=>el.semMesTerAnio === getOpciones.semAnioArr[i] && new Date(el.proter) < new Date(el.proacu) && el.proter !== 0).map(el=>el.numpro);
                            const elOpAtr = arrfilAnual1.filter(el=>el.semMesAcuAnio === getOpciones.semAnioArr[i] && new Date(el.proter) > new Date(el.proacu) && el.proter !== 0).map(el=>el.numpro);
                            const elCronPen = arrfilAnual1.filter(el=>el.semMesAnio === getOpciones.semAnioArr[i] && el.proini === 0 && el.proacu === 0 && el.proter === 0).map(el=>el.numpro);
                            const elTotalTabla = arrfilAnual1.filter(el=>el.semMesAnio === getOpciones.semAnioArr[i] );
                            const elOpEntSemanaTabla = arrfilAnual1.filter(el=>el.semMesAcuAnio === getOpciones.semAnioArr[i] && el.semMesAnio === getOpciones.semAnioArr[i]);
                            const elOpCorLogTabla = arrfilAnual1.filter(el=>el.semMesAcuAnio === getOpciones.semAnioArr[i] ).filter(el=> !elOpEntSemana.includes(el.numpro));
                            const elOpEntTabla = arrfilAnual1.filter(el=>el.semMesTerAnio === getOpciones.semAnioArr[i] ).filter(el=> !elOpEntSemana.includes(el.numpro));
                            const elOpAdelTabla = arrfilAnual1.filter(el=>el.semMesTerAnio === getOpciones.semAnioArr[i] && new Date(el.proter) < new Date(el.proacu) && el.proter !== 0);
                            const elOpAtrTabla = arrfilAnual1.filter(el=>el.semMesAcuAnio === getOpciones.semAnioArr[i] && new Date(el.proter) > new Date(el.proacu) && el.proter !== 0);
                            const elCronPenTabla = arrfilAnual1.filter(el=>el.semMesAnio === getOpciones.semAnioArr[i] && el.proini === 0 && el.proacu === 0 && el.proter === 0)
                            objeto.total = elTotal.length; 
                            objeto.opCorLog = elOpCorLog.length;
                            objeto.opEnt = elOpEnt.length;
                            objeto.opAdel = elOpAdel.length
                            objeto.opEntSemana = elOpEntSemana.length
                            objeto.opEntLogistica = elOpEntSemana.length  + elOpEnt.length;
                            objeto.opAtr = elOpAtr.length
                            objeto.opAtrFecha = arr_Atraso.length;
                            objeto.cronpen = elCronPen.length;
                            objeto.totalHover = elTotal.toString();
                            objeto.opCorLogHover = elOpCorLog.toString();
                            objeto.opEntHover = elOpEnt.toString();
                            objeto.opAdelHover = elOpAdel.toString();
                            objeto.opEntSemanaHover = elOpEntSemana.toString();
                            objeto.opEntLogisticaHover = `${elOpEntSemana.toString()}, ${elOpEnt.toString()}`;
                            objeto.opAtrHover = elOpAtr.toString();
                            objeto.opAtrFechaHover = arr_Atraso.toString();
                            objeto.cronpenHover = elCronPen.toString();
                            objeto.totalTabla = elTotalTabla; 
                            objeto.opCorLogTabla = elOpCorLogTabla;
                            objeto.opEntTabla = elOpEntTabla;
                            objeto.opAdelTabla = elOpAdelTabla;
                            objeto.opEntSemanaTabla = elOpEntSemanaTabla;
                            objeto.opEntLogisticaTabla = elOpEntSemanaTabla.concat(elOpEntTabla);
                            objeto.opAtrTabla = elOpAtrTabla;
                            objeto.opAtrFechaTabla = arr_AtrasoTabla;
                            objeto.cronpenTabla = elCronPenTabla;
                            objeto.rangoFecha = rangoFecha;
                            arrTot.push(objeto);               
                        }
                    }else{
                        const arrfilAnualAcuerdo1 = dataArr.filter(el=> getOpciones.Anio.toString().trim() === el.anioAcuerdo.toString().trim() && getOpciones.Mes.toString().trim() === el.mesAcuerdo.toString().trim() ) //ARR ELEMENTOS FILTRADO ANUAL & MENSUAL POR ACUERDO
                        const arrfilAnualTermino1 = dataArr.filter(el=> getOpciones.Anio.toString().trim() === el.anioTermino.toString().trim() && getOpciones.Mes.toString().trim() === el.mesTermino.toString().trim() ) //ARR ELEMENTOS FILTRADO ANUAL & MENSUAL POR TERMINO
                        const arrMensual1 = arrfilAnual1.filter(el=> getOpciones.Mes.toString().trim() === el.mesCreacion.toString().trim());
                        const arrfilAnualAcuerdo1_ = dataArr.filter(el=> getOpciones.Anio.toString().trim() === el.anioAcuerdo_?.toString().trim() && getOpciones.Mes.toString().trim() === el.mesAcuerdo_.toString().trim() ) //ARR ELEMENTOS FILTRADO ANUAL & MENSUAL POR ACUERDO2
                        const arrDataPlanFiltrado_ = dataPlan.filter(el=> el.fecLab.split('-')[0].toString().trim() === getOpciones.Anio.toString().trim()); // filtrado anio
                        const arrDataPlanFiltrado = arrDataPlanFiltrado_.filter(el=> arrMeses[parseInt(el.fecLab.split('-')[1], 10)] === getOpciones.Mes.toString().trim()); // filtrado mes
                        const arr1 = [];
                        const arr2 = [];
                        const arr3 = [];
                        const arr4 = [];
                        const arr5 = [];
                        const arr6 = [];
                        const numTer1 = [];
                        const numTer2 = [];
                        const numTer3 = [];
                        const numTer4 = [];
                        const numTer5 = [];
                        const numTer6 = [];
                        const numEntSem1 = [];
                        const numEntSem2 = [];
                        const numEntSem3 = [];
                        const numEntSem4 = [];
                        const numEntSem5 = [];
                        const numEntSem6 = [];
                        const numAtrFecSem1 = [];
                        const numAtrFecSem2 = [];
                        const numAtrFecSem3 = [];
                        const numAtrFecSem4 = [];
                        const numAtrFecSem5 = [];
                        const numAtrFecSem6 = [];
                        const arrFechas1 = [];
                        const arrFechas2 = [];
                        const arrFechas3 = [];
                        const arrFechas4 = [];
                        const arrFechas5 = [];
                        const arrFechas6 = [];
                        const arrFechasAtr1 = [];
                        const arrFechasAtr2 = [];
                        const arrFechasAtr3 = [];
                        const arrFechasAtr4 = [];
                        const arrFechasAtr5 = [];
                        const arrFechasAtr6 = [];
                        const arrFechasAde1 = [];
                        const arrFechasAde2 = [];
                        const arrFechasAde3 = [];
                        const arrFechasAde4 = [];
                        const arrFechasAde5 = [];
                        const arrFechasAde6 = [];
                        const arr1Tabla = [];
                        const arr2Tabla = [];
                        const arr3Tabla = [];
                        const arr4Tabla = [];
                        const arr5Tabla = [];
                        const arr6Tabla = [];
                        const numTer1Tabla = [];
                        const numTer2Tabla = [];
                        const numTer3Tabla = [];
                        const numTer4Tabla = [];
                        const numTer5Tabla = [];
                        const numTer6Tabla = [];
                        const numEntSem1Tabla = [];
                        const numEntSem2Tabla = [];
                        const numEntSem3Tabla = [];
                        const numEntSem4Tabla = [];
                        const numEntSem5Tabla = [];
                        const numEntSem6Tabla = [];
                        const numAtrFecSem1Tabla = [];
                        const numAtrFecSem2Tabla = [];
                        const numAtrFecSem3Tabla = [];
                        const numAtrFecSem4Tabla = [];
                        const numAtrFecSem5Tabla = [];
                        const numAtrFecSem6Tabla = [];
                        const arrFechasAtr1Tabla = [];
                        const arrFechasAtr2Tabla = [];
                        const arrFechasAtr3Tabla = [];
                        const arrFechasAtr4Tabla = [];
                        const arrFechasAtr5Tabla = [];
                        const arrFechasAtr6Tabla = [];
                        const arrFechasAde1Tabla = [];
                        const arrFechasAde2Tabla = [];
                        const arrFechasAde3Tabla = [];
                        const arrFechasAde4Tabla = [];
                        const arrFechasAde5Tabla = [];
                        const arrFechasAde6Tabla = [];
                        const arrFechaBack = [];                   
                        let numMesBack = arrMeses.indexOf(getOpciones.Mes) - 1;
                        let mesBack = arrMeses[numMesBack === 0 ? 12 :numMesBack];
                        let anioBack = parseInt(getOpciones.Anio) -1;
                        for(const x in dataPlan){
                            let fecSplit = dataPlan[x].fecLab.split('-');
                            let anioPlan = fecSplit[0];
                            let mesPlan = arrMeses[parseInt(fecSplit[1])];   
                            if(getOpciones.Anio.toString() === anioPlan.toString()){
                                if(getOpciones.Mes.toString() === mesPlan.toString()){
                                    switch(dataPlan[x].semMes){
                                        case 1:
                                            arrFechas1.push(dataPlan[x].fecLab);
                                            break;
                                        case 2:
                                            arrFechas2.push(dataPlan[x].fecLab);
                                            break;
                                        case 3:
                                            arrFechas3.push(dataPlan[x].fecLab);
                                            break;
                                        case 4:
                                            arrFechas4.push(dataPlan[x].fecLab);
                                            break;
                                        case 5:
                                            arrFechas5.push(dataPlan[x].fecLab);
                                            break;
                                        case 6:
                                            arrFechas6.push(dataPlan[x].fecLab);
                                            break;
                                        default:   
                                            console.log('NO APLICA');
                                            break;
                                    }
                                }
                            }
                        }
                        for(const x in dataPlan){
                            let fecSplit = dataPlan[x].fecLab.split('-');
                            let anioPlan = fecSplit[0];
                            let mesPlan = arrMeses[parseInt(fecSplit[1])];   
                            if(numMesBack === 0){
                                if(anioBack.toString() === anioPlan.toString()){
                                    if(mesPlan.toString() === mesBack.toString()){
                                        arrFechaBack.push(dataPlan[x].fecLab);
                                    }
                                }
                            }else{
                                if(getOpciones.Anio.toString() === anioPlan.toString()){
                                    if(mesBack.toString() === mesPlan.toString()){
                                        arrFechaBack.push(dataPlan[x].fecLab);
                                    }
                                }
                            }
                        }     
                        const arrAcordadas1 = [];
                        const arrAcordadas2 = [];
                        const arrAcordadas3 = [];
                        const arrAcordadas4 = [];
                        const arrAcordadas5 = [];
                        const arrAcordadas6 = [];
                        const arrAcordadas1Tabla = [];
                        const arrAcordadas2Tabla = [];
                        const arrAcordadas3Tabla = [];
                        const arrAcordadas4Tabla = [];
                        const arrAcordadas5Tabla = [];
                        const arrAcordadas6Tabla = [];
                        for(const u in arrfilAnualAcuerdo1){
                            switch(arrfilAnualAcuerdo1[u].semMesAcu){
                                case 1:
                                    if(arrFechas1.includes(arrfilAnualAcuerdo1[u].proacu) && !numEntSem1.includes(arrfilAnualAcuerdo1[u].numpro)) {
                                        arrAcordadas1.push(arrfilAnualAcuerdo1[u].numpro);
                                        arrAcordadas1Tabla.push(arrfilAnualAcuerdo1[u])
                                    }                                   
                                    if(arrfilAnualAcuerdo1[u].proter !== 0){
                                        const fechaAcu1 = new Date( arrfilAnualAcuerdo1[u].proacu );
                                        const fechaTer2 = new Date( arrfilAnualAcuerdo1[u].proter );
                                        if( fechaTer2.getTime() > fechaAcu1.getTime() ){ 
                                            arrFechasAtr1.push(arrfilAnualAcuerdo1[u].numpro);
                                            arrFechasAtr1Tabla.push(arrfilAnualAcuerdo1[u]);
                                        }
                                    }
                                    break;
                                case 2:
                                    if(arrFechas2.includes(arrfilAnualAcuerdo1[u].proacu) && !numEntSem2.includes(arrfilAnualAcuerdo1[u].numpro)) {
                                        arrAcordadas2.push(arrfilAnualAcuerdo1[u].numpro);
                                        arrAcordadas2Tabla.push(arrfilAnualAcuerdo1[u]);
                                    }
                                    if(arrfilAnualAcuerdo1[u].proter !== 0){
                                        const fechaAcu3 = new Date( arrfilAnualAcuerdo1[u].proacu );
                                        const fechaTer4 = new Date( arrfilAnualAcuerdo1[u].proter );
                                        if( fechaTer4.getTime() > fechaAcu3.getTime() ){                                             
                                            arrFechasAtr2.push(arrfilAnualAcuerdo1[u].numpro);
                                            arrFechasAtr2Tabla.push(arrfilAnualAcuerdo1[u]);
                                        }
                                    }                                                          
                                    break;
                                case 3:
                                    if(arrFechas3.includes(arrfilAnualAcuerdo1[u].proacu) && !numEntSem3.includes(arrfilAnualAcuerdo1[u].numpro)){ 
                                        arrAcordadas3.push(arrfilAnualAcuerdo1[u].numpro);
                                        arrAcordadas3Tabla.push(arrfilAnualAcuerdo1[u]) 
                                    }
                                    if(arrfilAnualAcuerdo1[u].proter !== 0){
                                        const fechaAcu5 = new Date( arrfilAnualAcuerdo1[u].proacu );
                                        const fechaTer6 = new Date( arrfilAnualAcuerdo1[u].proter );
                                        if( fechaTer6.getTime() > fechaAcu5.getTime() ){ 
                                            arrFechasAtr3.push(arrfilAnualAcuerdo1[u].numpro);
                                            arrFechasAtr3Tabla.push(arrfilAnualAcuerdo1[u]);
                                        }
                                    }  
                                    break;
                                case 4:
                                    if(arrFechas4.includes(arrfilAnualAcuerdo1[u].proacu) && !numEntSem4.includes(arrfilAnualAcuerdo1[u].numpro)) {
                                        arrAcordadas4.push(arrfilAnualAcuerdo1[u].numpro);
                                        arrAcordadas4Tabla.push(arrfilAnualAcuerdo1[u]);
                                    }
                                    if(arrfilAnualAcuerdo1[u].proter !== 0){
                                        const fechaAcu7 = new Date( arrfilAnualAcuerdo1[u].proacu );
                                        const fechaTer8 = new Date( arrfilAnualAcuerdo1[u].proter );
                                        if( fechaTer8.getTime() > fechaAcu7.getTime() ){ 
                                            arrFechasAtr4.push(arrfilAnualAcuerdo1[u].numpro);
                                            arrFechasAtr4Tabla.push(arrfilAnualAcuerdo1[u]);
                                        }
                                    }
                                    break;
                                case 5:
                                    if(arrFechas5.includes(arrfilAnualAcuerdo1[u].proacu) && !numEntSem5.includes(arrfilAnualAcuerdo1[u].numpro)){ 
                                        arrAcordadas5.push(arrfilAnualAcuerdo1[u].numpro);
                                        arrAcordadas5Tabla.push(arrfilAnualAcuerdo1[u]);
                                    }
                                    if(arrfilAnualAcuerdo1[u].proter !== 0){
                                        const fechaAcu9 = new Date( arrfilAnualAcuerdo1[u].proacu );
                                        const fechaTer10 = new Date( arrfilAnualAcuerdo1[u].proter );
                                        if( fechaTer10.getTime() > fechaAcu9.getTime() ){
                                            arrFechasAtr5.push(arrfilAnualAcuerdo1[u].numpro);
                                            arrFechasAtr5Tabla.push(arrfilAnualAcuerdo1[u]);
                                        }
                                    }
                                    break;
                                case 6:
                                    if(arrFechas6.includes(arrfilAnualAcuerdo1[u].proacu) && !numEntSem6.includes(arrfilAnualAcuerdo1[u].numpro)) {
                                        arrAcordadas6.push(arrfilAnualAcuerdo1[u].numpro);
                                        arrAcordadas6Tabla.push(arrfilAnualAcuerdo1[u].numpro);
                                    }
                                    if(arrfilAnualAcuerdo1[u].proter !== 0){
                                        const fechaAcu1_ = new Date( arrfilAnualAcuerdo1[u].proacu );
                                        const fechaTer2_ = new Date( arrfilAnualAcuerdo1[u].proter );
                                        if( fechaTer2_.getTime() > fechaAcu1_.getTime() ){ 
                                            arrFechasAtr6.push(arrfilAnualAcuerdo1[u].numpro);
                                            arrFechasAtr6Tabla.push(arrfilAnualAcuerdo1[u]);
                                        }
                                    }
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                        }
                        for(const u in arrfilAnualAcuerdo1_){
                            switch(arrfilAnualAcuerdo1_[u].semMesAcu){
                                case 1:
                                    const fechaAprobacion1 = moment(arrfilAnualAcuerdo1_[u].fcreacion.toString().split('T')[0]);
                                    const fechaAcuerdo1 = moment(arrfilAnualAcuerdo1_[u].fechaAcu.toString().split('T')[0]);
                                    const diasDif1 = fechaAcuerdo1.diff(fechaAprobacion1, 'days');
                                    if(parseInt( diasDif1 ) > 3){
                                        numAtrFecSem1.push(arrfilAnualAcuerdo1_[u].numpro);
                                        numAtrFecSem1Tabla.push(arrfilAnualAcuerdo1_[u]);
                                    }
                                    break;
                                case 2:      
                                    const fechaAprobacion2 = moment(arrfilAnualAcuerdo1_[u].fcreacion.toString().split('T')[0]);
                                    const fechaAcuerdo2 = moment(arrfilAnualAcuerdo1_[u].fechaAcu.toString().split('T')[0]);
                                    const diasDif2 = fechaAcuerdo2.diff(fechaAprobacion2, 'days');
                                    if(parseInt( diasDif2 ) > 3){
                                        numAtrFecSem2.push(arrfilAnualAcuerdo1_[u].numpro);           
                                        numAtrFecSem2Tabla.push(arrfilAnualAcuerdo1_[u]);           
                                    }             
                                    break;
                                case 3: 
                                    const fechaAprobacion3 = moment(arrfilAnualAcuerdo1_[u].fcreacion.toString().split('T')[0]);
                                    const fechaAcuerdo3 = moment(arrfilAnualAcuerdo1_[u].fechaAcu.toString().split('T')[0]);
                                    const diasDif3 = fechaAcuerdo3.diff(fechaAprobacion3, 'days');
                                    if(parseInt( diasDif3 ) > 3) {
                                        numAtrFecSem3.push(arrfilAnualAcuerdo1_[u].numpro); 
                                        numAtrFecSem3Tabla.push(arrfilAnualAcuerdo1_[u]); 
                                    }
                                    break;
                                case 4:
                                    const fechaAprobacion4 = moment(arrfilAnualAcuerdo1_[u].fcreacion.toString().split('T')[0]);
                                    const fechaAcuerdo4 = moment(arrfilAnualAcuerdo1_[u].fechaAcu.toString().split('T')[0]);
                                    const diasDif4 = fechaAcuerdo4.diff(fechaAprobacion4, 'days');
                                    if(parseInt( diasDif4 ) > 3){
                                        numAtrFecSem4.push(arrfilAnualAcuerdo1_[u].numpro);
                                        numAtrFecSem4Tabla.push(arrfilAnualAcuerdo1_[u]);
                                    }
                                    break;
                                case 5:
                                    const fechaAprobacion5 = moment(arrfilAnualAcuerdo1_[u].fcreacion.toString().split('T')[0]);
                                    const fechaAcuerdo5 = moment(arrfilAnualAcuerdo1_[u].fechaAcu.toString().split('T')[0]);
                                    const diasDif5 = fechaAcuerdo5.diff(fechaAprobacion5, 'days');
                                    if(parseInt( diasDif5 ) > 3){
                                        numAtrFecSem5.push(arrfilAnualAcuerdo1_[u].numpro);
                                        numAtrFecSem5Tabla.push(arrfilAnualAcuerdo1_[u]);
                                    }
                                    break;
                                case 6:
                                    const fechaAprobacion6 = moment(arrfilAnualAcuerdo1_[u].fcreacion.toString().split('T')[0]);
                                    const fechaAcuerdo6 = moment(arrfilAnualAcuerdo1_[u].fechaAcu.toString().split('T')[0]);
                                    const diasDif6 = fechaAcuerdo6.diff(fechaAprobacion6, 'days');
                                    if(parseInt( diasDif6 ) > 3){
                                        numAtrFecSem6.push(arrfilAnualAcuerdo1_[u].numpro);
                                        numAtrFecSem6Tabla.push(arrfilAnualAcuerdo1_[u]);
                                    }
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                        }
                        for(const u in arrfilAnualTermino1){
                            switch(arrfilAnualTermino1[u].semMesTer){
                                case 1:
                                    if(arrFechas1.includes(arrfilAnualTermino1[u].proter) && !numEntSem1.includes(arrfilAnualTermino1[u].numpro)){
                                        numTer1.push(arrfilAnualTermino1[u].numpro);
                                        numTer1Tabla.push(arrfilAnualTermino1[u]);
                                    }
                                    if(arrfilAnualTermino1[u].proter !== 0){
                                        const fechaAcu11 = new Date( arrfilAnualTermino1[u].proacu );
                                        const fechaTer12 = new Date( arrfilAnualTermino1[u].proter );
                                        if( fechaTer12.getTime() < fechaAcu11.getTime() ){ 
                                            arrFechasAde1.push(arrfilAnualTermino1[u].numpro);
                                            arrFechasAde1Tabla.push(arrfilAnualTermino1[u]);
                                        }}               
                                    break;
                                case 2:
                                    if(arrFechas2.includes(arrfilAnualTermino1[u].proter) && !numEntSem2.includes(arrfilAnualTermino1[u].numpro)){ 
                                        numTer2.push(arrfilAnualTermino1[u].numpro);
                                        numTer2Tabla.push(arrfilAnualTermino1[u]);
                                    }
                                    if(arrfilAnualTermino1[u].proter !== 0){  
                                        const fechaAcu13 = new Date( arrfilAnualTermino1[u].proacu );
                                        const fechaTer14 = new Date( arrfilAnualTermino1[u].proter );
                                        if( fechaTer14.getTime() < fechaAcu13.getTime() ){ 
                                            arrFechasAde2.push(arrfilAnualTermino1[u].numpro);
                                            arrFechasAde2Tabla.push(arrfilAnualTermino1[u]);
                                        }}                           
                                    break;
                                case 3:
                                    if(arrFechas3.includes(arrfilAnualTermino1[u].proter) && !numEntSem3.includes(arrfilAnualTermino1[u].numpro)){
                                        numTer3.push(arrfilAnualTermino1[u].numpro);
                                        numTer3Tabla.push(arrfilAnualTermino1[u]);
                                    }
                                    if(arrfilAnualTermino1[u].proter !== 0){
                                        const fechaAcu15 = new Date( arrfilAnualTermino1[u].proacu );
                                        const fechaTer16 = new Date( arrfilAnualTermino1[u].proter );
                                        if( fechaTer16.getTime() < fechaAcu15.getTime() ){ 
                                            arrFechasAde3.push(arrfilAnualTermino1[u].numpro);
                                            arrFechasAde3Tabla.push(arrfilAnualTermino1[u]);
                                        }}
                                    break;
                                case 4:
                                    if(arrFechas4.includes(arrfilAnualTermino1[u].proter) && !numEntSem4.includes(arrfilAnualTermino1[u].numpro)){
                                        numTer4.push(arrfilAnualTermino1[u].numpro);
                                        numTer4Tabla.push(arrfilAnualTermino1[u]);
                                    }
                                    if(arrfilAnualTermino1[u].proter !== 0){
                                        const fechaAcu17 = new Date( arrfilAnualTermino1[u].proacu );
                                        const fechaTer18 = new Date( arrfilAnualTermino1[u].proter );
                                        if( fechaTer18.getTime() < fechaAcu17.getTime() ){ 
                                            arrFechasAde4.push(arrfilAnualTermino1[u].numpro);
                                            arrFechasAde4Tabla.push(arrfilAnualTermino1[u]);
                                        }}
                                    break;
                                case 5:
                                    if(arrFechas5.includes(arrfilAnualTermino1[u].proter) && !numEntSem5.includes(arrfilAnualTermino1[u].numpro)){
                                        numTer5.push(arrfilAnualTermino1[u].numpro);
                                        numTer5Tabla.push(arrfilAnualTermino1[u]);
                                    }
                                    if(arrfilAnualTermino1[u].proter !== 0){
                                        const fechaAcu19 = new Date( arrfilAnualTermino1[u].proacu );
                                        const fechaTer20 = new Date( arrfilAnualTermino1[u].proter );
                                        if( fechaTer20.getTime() < fechaAcu19.getTime() ){ 
                                            arrFechasAde5.push(arrfilAnualTermino1[u].numpro);
                                            arrFechasAde5Tabla.push(arrfilAnualTermino1[u]);
                                        }}
                                    break;
                                case 6:
                                    if(arrFechas6.includes(arrfilAnualTermino1[u].proter) && !numEntSem6.includes(arrfilAnualTermino1[u].numpro)){
                                        numTer6.push(arrfilAnualTermino1[u].numpro);
                                        numTer6Tabla.push(arrfilAnualTermino1[u]);
                                    }
                                    if(arrfilAnualTermino1[u].proter !== 0){
                                        const fechaAcu21 = new Date( arrfilAnualTermino1[u].proacu );
                                        const fechaTer22 = new Date( arrfilAnualTermino1[u].proter );
                                        if( fechaTer22.getTime() < fechaAcu21.getTime() ){
                                            arrFechasAde6.push(arrfilAnualTermino1[u].numpro);
                                            arrFechasAde6Tabla.push(arrfilAnualTermino1[u]);
                                        }}
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                        }
                        for(const u in arrMensual1){
                            switch(arrMensual1[u].semMes){
                                case 1:
                                    arr1.push(arrMensual1[u].numpro);
                                    arr1Tabla.push(arrMensual1[u]);
                                    if(arrFechas1.includes(arrMensual1[u].proacu)) {
                                        numEntSem1.push(arrMensual1[u].numpro);
                                        numEntSem1Tabla.push(arrMensual1[u]);
                                    }
                                    break;
                                case 2:
                                    arr2.push(arrMensual1[u].numpro);
                                    arr2Tabla.push(arrMensual1[u]);
                                    if(arrFechas2.includes(arrMensual1[u].proacu)){
                                        numEntSem2.push(arrMensual1[u].numpro);
                                        numEntSem2Tabla.push(arrMensual1[u]);
                                    }                                                       
                                    break;
                                case 3:
                                    arr3.push(arrMensual1[u].numpro);
                                    arr3Tabla.push(arrMensual1[u]);
                                    if(arrFechas3.includes(arrMensual1[u].proacu)){
                                        numEntSem3.push(arrMensual1[u].numpro);
                                        numEntSem3Tabla.push(arrMensual1[u]);
                                    }
                                    break;
                                case 4:
                                    arr4.push(arrMensual1[u].numpro);
                                    arr4Tabla.push(arrMensual1[u]);
                                    if(arrFechas4.includes(arrMensual1[u].proacu)){
                                        numEntSem4.push(arrMensual1[u].numpro);
                                        numEntSem4Tabla.push(arrMensual1[u]);
                                    }
                                    break;
                                case 5:
                                    arr5.push(arrMensual1[u].numpro);
                                    arr5Tabla.push(arrMensual1[u]);
                                    if(arrFechas5.includes(arrMensual1[u].proacu)){
                                        numEntSem5.push(arrMensual1[u].numpro);
                                        numEntSem5Tabla.push(arrMensual1[u]);
                                    }
                                    break;
                                case 6:
                                    arr6.push(arrMensual1[u].numpro);
                                    arr6Tabla.push(arrMensual1[u]);
                                    if(arrFechas6.includes(arrMensual1[u].proacu)){
                                        numEntSem6.push(arrMensual1[u].numpro);
                                        numEntSem6Tabla.push(arrMensual1[u]);
                                    }
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                        }
                        for(let i =1; i <= 6; i++){
                            const objeto={};
                            objeto.semMes = i;
                            objeto.id = `idRow_${i}`;
                            objeto.idGeneral = `idRow_${i}`;
                            switch(i){
                                case 1:
                                    const _data = arrDataPlanFiltrado.filter(el=>el.semMes === i)[0]?.semAnio;
                                    const fechasRango0 = _data === undefined ? '': dataPlan.filter(el=>el.semAnio === _data).filter(el=> el.fecLab.split('-')[0].toString() === getOpciones.Anio.toString().trim());
                                    const rangoFecha0 = _data === undefined ? '': `${fechasRango0[0].fecLab.split('-')[2]}/${fechasRango0[0].fecLab.split('-')[1]} - ${fechasRango0[4].fecLab.split('-')[2]}/${fechasRango0[4].fecLab.split('-')[1]}`;
                                    objeto.rangoFecha = rangoFecha0;
                                    objeto.semMesAnio = arrDataPlanFiltrado.filter(el=>el.semMes === 1)[0]?.semAnio;
                                    objeto.total = arr1.length;
                                    objeto.opCorLog = arrAcordadas1.length;
                                    objeto.opEnt = numTer1.length;
                                    objeto.opAdel = arrFechasAde1.length;
                                    objeto.opEntSemana = numEntSem1.length;
                                    objeto.opEntLogistica = numTer1.length + numEntSem1.length;
                                    objeto.opAtr = arrFechasAtr1.length;
                                    objeto.opAtrFecha = numAtrFecSem1.length;
                                    objeto.totalHover = arr1.toString();
                                    objeto.opCorLogHover = arrAcordadas1.toString();
                                    objeto.opEntHover = numTer1.toString();
                                    objeto.opAdelHover = arrFechasAde1.toString();
                                    objeto.opEntSemanaHover = numEntSem1.toString();
                                    objeto.opEntLogisticaHover = `${numTer1.toString()}, ${numEntSem1.toString()}`;
                                    objeto.opAtrHover = arrFechasAtr1.toString();
                                    objeto.opAtrFechaHover = numAtrFecSem1.toString();
                                    objeto.totalTabla = arr1Tabla;
                                    objeto.opCorLogTabla = arrAcordadas1Tabla;
                                    objeto.opEntTabla = numTer1Tabla;
                                    objeto.opAdelTabla = arrFechasAde1Tabla;
                                    objeto.opEntSemanaTabla = numEntSem1Tabla;
                                    objeto.opEntLogisticaTabla = numTer1Tabla.concat(numEntSem1Tabla);
                                    objeto.opAtrTabla = arrFechasAtr1Tabla;
                                    objeto.opAtrFechaTabla = numAtrFecSem1Tabla;
                                    arrTot.push(objeto);
                                    break;
                                case 2:
                                    const _data2 = arrDataPlanFiltrado.filter(el=>el.semMes === i)[0]?.semAnio;
                                    const fechasRango2 = _data2 === undefined ? '': dataPlan.filter(el=>el.semAnio === _data2).filter(el=> el.fecLab.split('-')[0].toString() === getOpciones.Anio.toString().trim());
                                    const rangoFecha2 = _data2 === undefined ? '': `${fechasRango2[0].fecLab.split('-')[2]}/${fechasRango2[0].fecLab.split('-')[1]} - ${fechasRango2[4].fecLab.split('-')[2]}/${fechasRango2[4].fecLab.split('-')[1]}`;
                                    objeto.rangoFecha = rangoFecha2;
                                    objeto.semMesAnio = arrDataPlanFiltrado.filter(el=>el.semMes === 2)[0]?.semAnio;
                                    objeto.total = arr2.length;
                                    objeto.opCorLog = arrAcordadas2.length;
                                    objeto.opEnt = numTer2.length;
                                    objeto.opAdel = arrFechasAde2.length;
                                    objeto.opEntSemana = numEntSem2.length;
                                    objeto.opEntLogistica = numTer2.length + numEntSem2.length;
                                    objeto.opAtr = arrFechasAtr2.length;
                                    objeto.opAtrFecha = numAtrFecSem2.length;
                                    objeto.totalHover = arr2.toString();
                                    objeto.opCorLogHover = arrAcordadas2.toString();
                                    objeto.opEntHover = numTer2.toString();
                                    objeto.opAdelHover = arrFechasAde2.toString();
                                    objeto.opEntSemanaHover = numEntSem2.toString();
                                    objeto.opEntLogisticaHover = `${numTer2.toString()}, ${numEntSem2.toString()}`;
                                    objeto.opAtrHover = arrFechasAtr2.toString();
                                    objeto.opAtrFechaHover = numAtrFecSem2.toString();
                                    objeto.totalTabla = arr2Tabla;
                                    objeto.opCorLogTabla = arrAcordadas2Tabla;
                                    objeto.opEntTabla = numTer2Tabla;
                                    objeto.opAdelTabla = arrFechasAde2Tabla;
                                    objeto.opEntSemanaTabla = numEntSem2Tabla;
                                    objeto.opEntLogisticaTabla = numTer2Tabla.concat(numEntSem2Tabla);
                                    objeto.opAtrTabla = arrFechasAtr2Tabla;
                                    objeto.opAtrFechaTabla = numAtrFecSem2Tabla;
                                    arrTot.push(objeto);
                                    break;
                                case 3:
                                    const _data3 = arrDataPlanFiltrado.filter(el=>el.semMes === i)[0]?.semAnio;
                                    const fechasRango3 = _data3 === undefined ? '': dataPlan.filter(el=>el.semAnio === _data3).filter(el=> el.fecLab.split('-')[0].toString() === getOpciones.Anio.toString().trim());
                                    const rangoFecha3 = _data3 === undefined ? '': `${fechasRango3[0].fecLab.split('-')[2]}/${fechasRango3[0].fecLab.split('-')[1]} - ${fechasRango3[4].fecLab.split('-')[2]}/${fechasRango3[4].fecLab.split('-')[1]}`;
                                    objeto.rangoFecha = rangoFecha3;
                                    objeto.semMesAnio = arrDataPlanFiltrado.filter(el=>el.semMes === 3)[0]?.semAnio;
                                    objeto.total = arr3.length;
                                    objeto.opCorLog = arrAcordadas3.length;
                                    objeto.opEnt = numTer3.length;
                                    objeto.opAdel = arrFechasAde3.length;
                                    objeto.opEntSemana = numEntSem3.length;
                                    objeto.opEntLogistica = numTer3.length + numEntSem3.length;
                                    objeto.opAtr = arrFechasAtr3.length;
                                    objeto.opAtrFecha = numAtrFecSem3.length;
                                    objeto.totalHover = arr3.toString();
                                    objeto.opCorLogHover = arrAcordadas3.toString();
                                    objeto.opEntHover = numTer3.toString();
                                    objeto.opAdelHover = arrFechasAde3.toString();
                                    objeto.opEntSemanaHover = numEntSem3.toString();
                                    objeto.opEntLogisticaHover = `${numTer3.toString()}, ${numEntSem3.toString()}`;
                                    objeto.opAtrHover = arrFechasAtr3.toString();
                                    objeto.opAtrFechaHover = numAtrFecSem3.toString();
                                    objeto.totalTabla = arr3Tabla;
                                    objeto.opCorLogTabla = arrAcordadas3Tabla;
                                    objeto.opEntTabla = numTer3Tabla;
                                    objeto.opAdelTabla = arrFechasAde3Tabla;
                                    objeto.opEntSemanaTabla = numEntSem3Tabla;
                                    objeto.opEntLogisticaTabla = numTer3Tabla.concat(numEntSem3Tabla);
                                    objeto.opAtrTabla = arrFechasAtr3Tabla;
                                    objeto.opAtrFechaTabla = numAtrFecSem3Tabla;
                                    arrTot.push(objeto);
                                    break;
                                case 4:
                                    const _data4 = arrDataPlanFiltrado.filter(el=>el.semMes === i)[0]?.semAnio;
                                    const fechasRango4 = _data4 === undefined ? '': dataPlan.filter(el=>el.semAnio === _data4).filter(el=> el.fecLab.split('-')[0].toString() === getOpciones.Anio.toString().trim());
                                    const rangoFecha4 = _data4 === undefined ? '': `${fechasRango4[0].fecLab.split('-')[2]}/${fechasRango4[0].fecLab.split('-')[1]} - ${fechasRango4[4].fecLab.split('-')[2]}/${fechasRango4[4].fecLab.split('-')[1]}`;
                                    objeto.rangoFecha = rangoFecha4;
                                    objeto.semMesAnio = arrDataPlanFiltrado.filter(el=>el.semMes === 4)[0]?.semAnio;
                                    objeto.total = arr4.length;
                                    objeto.opCorLog = arrAcordadas4.length;
                                    objeto.opEnt = numTer4.length;
                                    objeto.opAdel = arrFechasAde4.length;
                                    objeto.opEntSemana = numEntSem4.length;
                                    objeto.opEntLogistica = numTer4.length + numEntSem4.length;
                                    objeto.opAtr = arrFechasAtr4.length;
                                    objeto.opAtrFecha = numAtrFecSem4.length;
                                    objeto.totalHover = arr4.toString();
                                    objeto.opCorLogHover = arrAcordadas4.toString();
                                    objeto.opEntHover = numTer4.toString();
                                    objeto.opAdelHover = arrFechasAde4.toString();
                                    objeto.opEntSemanaHover = numEntSem4.toString();
                                    objeto.opEntLogisticaHover = `${numTer4.toString()}, ${numEntSem4.toString()}`;
                                    objeto.opAtrHover = arrFechasAtr4.toString();
                                    objeto.opAtrFechaHover = numAtrFecSem4.toString();
                                    objeto.totalTabla = arr4Tabla;
                                    objeto.opCorLogTabla = arrAcordadas4Tabla;
                                    objeto.opEntTabla = numTer4Tabla;
                                    objeto.opAdelTabla = arrFechasAde4Tabla;
                                    objeto.opEntSemanaTabla = numEntSem4Tabla;
                                    objeto.opEntLogisticaTabla = numTer4Tabla.concat(numEntSem4Tabla);
                                    objeto.opAtrTabla = arrFechasAtr4Tabla;
                                    objeto.opAtrFechaTabla = numAtrFecSem4Tabla;
                                    arrTot.push(objeto);
                                    break;
                                case 5:
                                    const _data5 = arrDataPlanFiltrado.filter(el=>el.semMes === i)[0]?.semAnio;
                                    const fechasRango5 = _data5 === undefined ? '': dataPlan.filter(el=>el.semAnio === _data5).filter(el=> el.fecLab.split('-')[0].toString() === getOpciones.Anio.toString().trim());
                                    const rangoFecha5 = _data5 === undefined ? '': `${fechasRango5[0].fecLab.split('-')[2]}/${fechasRango5[0].fecLab.split('-')[1]} - ${fechasRango5[4].fecLab.split('-')[2]}/${fechasRango5[4].fecLab.split('-')[1]}`;
                                    objeto.rangoFecha = rangoFecha5;
                                    objeto.semMesAnio = arrDataPlanFiltrado.filter(el=>el.semMes === 5)[0]?.semAnio;
                                    objeto.total = arr5.length;
                                    objeto.opCorLog = arrAcordadas5.length;
                                    objeto.opEnt = numTer5.length;
                                    objeto.opAdel = arrFechasAde5.length;
                                    objeto.opEntSemana = numEntSem5.length;
                                    objeto.opEntLogistica = numTer5.length + numEntSem5.length;
                                    objeto.opAtr = arrFechasAtr5.length;
                                    objeto.opAtrFecha = numAtrFecSem5.length;
                                    objeto.totalHover = arr5.toString();
                                    objeto.opCorLogHover = arrAcordadas5.toString();
                                    objeto.opEntHover = numTer5.toString();
                                    objeto.opAdelHover = arrFechasAde5.toString();
                                    objeto.opEntSemanaHover = numEntSem5.toString();
                                    objeto.opEntLogisticaHover = `${numTer5.toString()}, ${numEntSem5.toString()}`;
                                    objeto.opAtrHover = arrFechasAtr5.toString();
                                    objeto.opAtrFechaHover = numAtrFecSem5.toString();
                                    objeto.totalTabla = arr5Tabla;
                                    objeto.opCorLogTabla = arrAcordadas5Tabla;
                                    objeto.opEntTabla = numTer5Tabla;
                                    objeto.opAdelTabla = arrFechasAde5Tabla;
                                    objeto.opEntSemanaTabla = numEntSem5Tabla;
                                    objeto.opEntLogisticaTabla = numTer5Tabla.concat(numEntSem5Tabla);
                                    objeto.opAtrTabla = arrFechasAtr5Tabla;
                                    objeto.opAtrFechaTabla = numAtrFecSem5Tabla;
                                    arrTot.push(objeto);
                                    break;
                                case 6:
                                    const _data6 = arrDataPlanFiltrado.filter(el=>el.semMes === i)[0]?.semAnio;
                                    const fechasRango6 = _data6 === undefined ? '': dataPlan.filter(el=>el.semAnio === _data6).filter(el=> el.fecLab.split('-')[0].toString() === getOpciones.Anio.toString().trim());
                                    const rangoFecha6 = _data6 === undefined ? '': `${fechasRango6[0].fecLab.split('-')[2]}/${fechasRango6[0].fecLab.split('-')[1]} - ${fechasRango6[4].fecLab.split('-')[2]}/${fechasRango6[4].fecLab.split('-')[1]}`;
                                    objeto.rangoFecha = rangoFecha6;
                                    objeto.semMesAnio = arrDataPlanFiltrado.filter(el=>el.semMes === 6)[0]?.semAnio;
                                    objeto.total = arr6.length;
                                    objeto.opCorLog = arrAcordadas6.length;
                                    objeto.opEnt = numTer6.length;
                                    objeto.opAdel = arrFechasAde6.length;
                                    objeto.opEntSemana = numEntSem6.length;
                                    objeto.opEntLogistica = numTer6.length + numEntSem6.length;
                                    objeto.opAtr = arrFechasAtr6.length;
                                    objeto.opAtrFecha = numAtrFecSem6.length;
                                    objeto.totalHover = arr6.toString();
                                    objeto.opCorLogHover = arrAcordadas6.toString();
                                    objeto.opEntHover = numTer6.toString();
                                    objeto.opAdelHover = arrFechasAde6.toString();
                                    objeto.opEntSemanaHover = numEntSem6.toString();
                                    objeto.opEntLogisticaHover = `${numTer6.toString()}, ${numEntSem6.toString()}`;
                                    objeto.opAtrHover = arrFechasAtr6.toString();
                                    objeto.opAtrFechaHover = numAtrFecSem6.toString();
                                    objeto.totalTabla = arr6Tabla;
                                    objeto.opCorLogTabla = arrAcordadas6Tabla;
                                    objeto.opEntTabla = numTer6Tabla;
                                    objeto.opAdelTabla = arrFechasAde6Tabla;
                                    objeto.opEntSemanaTabla = numEntSem6Tabla;
                                    objeto.opEntLogisticaTabla = numTer6Tabla.concat(numEntSem6Tabla);
                                    objeto.opAtrTabla = arrFechasAtr6Tabla;
                                    objeto.opAtrFechaTabla = numAtrFecSem6Tabla;
                                    arrTot.push(objeto);
                                    break;
                                default:
                                    console.log('NO APLICA')
                                    break;
                            }
                            
                        }
                    }
                    //console.log(arrTot)
                    setRows(arrTot);
                    setBackupsRow(arrTot);
                    setSavingHeaders(false);
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
                    handleProcesarElementos();
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

        const handleOpcionesEjecutiva = (e, value)=>{ setOpciones({...getOpciones, Ejecutiva:value }); };

        const handleOpcionesCoordinadora = (e, value)=>{ setOpciones({...getOpciones, Coordinadora:value }); };

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

        const handleSelectMes = (e, value)=>{ 
            if(value === '' || value === null){
                setOpciones({...getOpciones, Mes:''});
            }else{ 
                setOpciones({...getOpciones, Mes:value}); 
            }
            
        };

        const handleOpcionesAnio = (e, value)=>{
            if(value === '' || value === null){
                setOpciones({...getOpciones, Anio:''});
            }else{    
                setOpciones({...getOpciones, Anio:value}); 
            }
        };

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

        const handleSemAnio = ({target})=>{ setOpciones({ ...getOpciones, isSemAnio:target.checked })};

        const handleSelectSemAnio = (e, value)=>{ setOpciones({ ...getOpciones, semAnioArr:value })};

        
        return(
            <Grid container style={{width:'100%'}}>

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
                                <Grid component="label" container alignItems="center" spacing={1} justify='center'>
                                    <Grid item>MENSUAL</Grid>
                                    <Grid item>
                                        <Switch checked={getOpciones.isSemAnio} onChange={handleSemAnio} name="semAnioChecked" />
                                    </Grid>
                                    <Grid item>SEMANA ANUAL</Grid>
                                </Grid>
                            </Grid>
                            {
                                getOpciones.isSemAnio ?
                                <Grid item xs={12} style={{minHeight:90}}>
                                   <Autocomplete
                                    id="ElAutocomplete"
                                    options={getPlanificacionUnique}
                                    value={getOpciones.semAnioArr || []}
                                    multiple
                                    onChange={handleSelectSemAnio}
                                    //getOptionLabel={(option) => option}
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment style={{fontSize:10}} key={option.fecLab}>
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
                                        <TextField
                                        {...params}
                                        placeholder="Sem Anio"
                                        fullWidth
                                        variant="outlined"
                                        />
                                    )}
                                /> 
                                </Grid>:
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="Meses"
                                        options={Meses}
                                        size='small'
                                        value={getOpciones.Mes || ''}
                                        margin='dense'
                                        style={{marginTop:-8}}
                                        renderInput={params => <TextField {...params}  variant="outlined" margin='dense' label='MES'/>}
                                        onChange={handleSelectMes}
                                    />
                                </Grid>
                            }
                            
                            <Fragment>
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
                        <div style={{marginRight:30, fontSize:20}}>Logistica</div>
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
                                <Chip label={`${getOpciones.Mes} - ${getOpciones.Anio}`} style={{fontWeight:'bolder', position:'relative', left:-5}}/>
                            }
                            <Tooltip title='OPCIONES' placement='top'>
                                <span>
                                <Fab disabled={isWaiting} color='secondary' onClick={handleShowOptions}  aria-controls="menu-column" aria-haspopup="true"  size='small'>
                                        {isWaiting ? <FacebookCircularProgress size={30} style={{alignSelf:'center', marginTop:5}}/>:<BuildIcon />}
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