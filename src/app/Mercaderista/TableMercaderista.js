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
        background-color:#0E3B5F;
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
        background:#ffffff;
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
        background:transparent;
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

    const TdYounetStyled2 = styled.td`
        color:${props => props.color ? props.color : 'black'};
        font-size:${props => props.fontSize ?  props.fontSize : '10px'};
        font-weight:${props => props.bolder ? 'bold' : 'none'};
        minWidth:${props => props.minWidth || 60};
        text-align:${props => props.align ? props.align : 'left'};
        width:${props => props.width || 60};
        background:transparent;
        border-bottom: 1px solid #E5E8E8;
        display:block;
        height:43px;
        padding:3px 2px 0px 2px;   
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

    const TextYounetStyled = styled.input`
        margin:0px;
        padding:0px;
        font-size:10px;
        width:100%;
        border-radius:2px;
        background:transparent;
        border:1px solid lightgray;
        height:23px;
        
    `;

    const headCellsColumn = [
        { id: 'cadena', numeric: false, disablePadding: false, label: 'CADENA', show:true, fixed:false, width:200, num:0, align:'left', fontSize:'10px', bolder:false , type:'text'    },
        { id: 'local', numeric: false, disablePadding: false, label: 'LOCAL', show:true, fixed:false, width:200, num:1, align:'left', fontSize:'9px', bolder:false , type:'text'    },
        { id: 'provincia', numeric: true, disablePadding: false, label: 'PROVINCIA', show:true, fixed:false, width:150, num:2 , align:'left', fontSize:'10px', bolder:false , type:'text'   },   
        { id: 'ciudad', numeric: false, disablePadding: false, label: 'CIUDAD', show:true, fixed:false, width:150, num:3, align:'left', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'direccion', numeric: true, disablePadding: false, label: 'DIRECCION', show:true, fixed:false, width:400, num:4, align:'center', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'Coordenadas', numeric: true, disablePadding: false, label: 'COORDENADAS', show:true, fixed:false, width:120, num:5, align:'center', fontSize:'9px', bolder:false, type:'text'    },
        { id: 'Status', numeric: false, disablePadding: false, label: 'STATUS', show:true, fixed:false, width:100, num:6, align:'center', fontSize:'10px', bolder:false , type:'text'   },
        { id: 'DiasVisita', numeric: false, disablePadding: false, label: 'DIAS VISITA', show:true, fixed:false, width:110, num:7, align:'center', fontSize:'10px', bolder:false , type:'num'   },  
    ];

    const propsWidth = {
        Numero: 100,
        Cadena: 200,
        Local: 200,
        Provincia: 150,
        Ciudad:150,
        Direccion:400,
        Coordenadas:120,
        Status: 100,
        DiasVisita:110,
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
                    {valueInfo}
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
        const { row, index, headCells, HandleClickRow } = props;
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
        const { setOpen, setHeaderWord } = useAuth();
        const classes = useStyles();
        const { enqueueSnackbar } = useSnackbar();
        const [ rows, setRows ] = useState([]);
        const [ backupsRow, setBackupsRow ] = useState([]);
        const [ order, setOrder] = useState('desc');
        const [ orderBy, setOrderBy] = useState('NumGar');
        const [ page, setPage] = useState(0);
        const [ rowsPerPage, setRowsPerPage] = useState(16);
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
        const [ arrCadenas, setArrCadenas ] = useState([]);
        const [ onlyCadenas, setOnlyCadenas ] = useState([]);
        const [ isFoundProject, setFoundProject ] = useState(false);
        const [ showOptions, setShowOptions ] = useState(false);
        const [ Datos, setDatos ] = useState({Proyecto:'', Cliente:'', Mercaderistas:[{Mercaderista:''}], numpro:'', NumMerc:'', TipTraArr:[{Tiptra:''}]});
        const [ searchBy, setSearchBy ] = useState('');
        const [ dataMerc, setDataMerc ] = useState({TipTraArrMerc:[], Mercaderista:'', FechaInicio:'', FechaFinal:'', Periodo:''});
        const [ continuoProcess, setContinuoProcess ] = useState(false);
        const [ isNewRow, setNewRow ] = useState(false);
        const [ isEditRow, setEditRow ] = useState(false);
        const [ isModeRuta, setModeRuta ] = useState(false);
        const [ isNewRuta, setNewRuta ] = useState(true);
        const [ periodoRuta, setPeriodoRuta ] = useState('');

        useEffect(()=>{
            const handleUseEffect = async ()=>{
                setOpen(false); 
                setHeaderWord('Mercaderista/Supervisora');
                const peticionC = await fetch('/cadenasMerc');
                const resultadoP = await peticionC.json();
                const arrOnCadenas = resultadoP.map(val=> val.cadena.toString());
                const dataArr2 = new Set(arrOnCadenas);
                const dataArr3 = [...dataArr2];
                setOnlyCadenas(dataArr3);
                setArrCadenas(resultadoP);
                setCharging(false);
                fetch('/RutasdeMercaderista',{
                    method: 'POST',
                    body: JSON.stringify({Mercaderista:'JOAO CASTILLO'}),
                    headers:{
                      'Content-Type':'application/json'
                    }
                })
                .then(response=> response.json())
                .then(result =>{
                    setRows(result);
                    setBackupsRow(result);
                })
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
                                if(parseInt(value2[value.idElement]) === (parseInt(value.valorElement))) dataNow.push(value2);
                            });
                        }else if(value.type === 'text'){
                            backupsRow.forEach((value2)=>{
                                if(value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase())) dataNow.push(value2);
                            });
                        }else{
                            backupsRow.forEach((value2)=>{
                                if(value2[value.idElement].toString() === value.valorElement.toString())  dataNow.push(value2);
                            });
                        }
                    }else{
                        if(value.type === 'number'){
                            if(value.selectElement === 'O'){
                                backupsRow.forEach((value2)=>{
                                    if(parseInt(value2[value.idElement]) === (parseInt(value.valorElement))) dataNow.push(value2);
                                });
                            }else{
                                dataNow = dataNow.filter((value2)=>
                                    parseInt(value2[value.idElement]) === (parseInt(value.valorElement))
                                );
                            }
                        }else if(value.type === 'text'){
                            if(value.selectElement === 'O'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase())) dataNow.push(value2);
                                });
                            }else{
                                dataNow = dataNow.filter((value2)=>
                                    value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase())
                                );
                            }          
                        }else{
                            if(value.selectElement === 'O'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase())  dataNow.push(value2);
                                });
                            }else{
                                dataNow = dataNow.filter((value2)=>
                                    value2[value.idElement].toString() === value.valorElement.toString()
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
                                    if(parseInt(value2[value.idElement]) === parseInt(value.valorElement)) dataNow.push(value2);
                                });
                            }else if(value.type === 'text'){
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase())) dataNow.push(value2);
                                });
                            }else{
                                backupsRow.forEach((value2)=>{
                                    if(value2[value.idElement].toString() === value.valorElement.toString())  dataNow.push(value2);
                                });
                            }
                        }else{
                            console.log('!index0');
                            if(value.type === 'number'){
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(parseInt(value2[value.idElement]) === parseInt(value.valorElement)) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        parseInt(value2[value.idElement]) === (parseInt(value.valorElement))
                                    );
                                }
                            }else if(value.idElement === 'text'){
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase())) dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        value2[value.idElement].toString().toLowerCase().includes(value.valorElement.toString().toLowerCase())
                                    );
                                } 
                            }else{
                                if(value.selectElement === 'O'){
                                    backupsRow.forEach((value2)=>{
                                        if(value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase())  dataNow.push(value2);
                                    });
                                }else{
                                    dataNow = dataNow.filter((value2)=>
                                        value2[value.idElement].toString().toLowerCase() === value.valorElement.toString().toLowerCase()
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
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(headersResultStyles))
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
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(headersResultStyles))
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
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(arrSetOrder))
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
                console.log(result);
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
                console.log(result);
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
            setDatos({Proyecto:'', Cliente:'', Mercaderistas:[{Mercaderista:''}], numpro:'', NumMerc:'', TipTraArr:[{Tiptra:''}]});
            setSearchBy('');
            setFoundProject(false);
            setDataMerc({TipTraArrMerc:[], Mercaderista:'', FechaInicio:'2021-08-01', FechaFinal:'2021-08-01', Periodo:''});
            setHeadersColumn(headCellsColumn);
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(headCellsColumn));
            setSavingHeaders(true);
            setTimeout(()=>{
                setSavingHeaders(false);
            },2000);
        };

        const handleDatosSearch = (e)=>{ setSearchBy(e.target.value) };

        const handleSelectMerc = (e)=>{ 
            const MercFilter = Datos.Mercaderistas.filter(val=> val.Mercaderista === e.target.value)[0];
            setDataMerc(MercFilter);
        };

        const handleSelectRuta = e =>{ 
            setPeriodoRuta(e.target.value) };

        const handleProcesarRuta = () =>{
            setSavingHeaders(true);
            setShowOptions(false);
            setModeRuta(true);
            const rutaEdit = dataMerc.Ruta.filter(elRuta => elRuta.Periodo === periodoRuta)[0];
            setRows(rutaEdit.Data);
            setHeadersColumn(rutaEdit.Encabezados);
            window.localStorage.setItem('tableMSupervisora', JSON.stringify(rutaEdit.Encabezados));
            setTimeout(()=>{
                setSavingHeaders(false);
            },1000);
        };

        const handleShowPhotos = ()=>{

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
                    maxWidth={'sm'}
                    aria-labelledby="draggable-dialog-title"
                    TransitionComponent={Transition}
                >
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
                                {
                                    searchBy === 'NUMERO' ?
                                    <TextField
                                        id='NumMerc'
                                        label='Busqueda'
                                        value={Datos.NumMerc || ''}
                                        onChange={handleDatos}
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                    />:
                                    <TextField
                                        id='numpro'
                                        label='Busqueda'
                                        value={Datos.numpro || ''}
                                        onChange={handleDatos}
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                    />
                                }
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={4} xs={12}>
                                <TextField
                                    id='searchBy'
                                    label='searchBy'
                                    value={searchBy || ''}
                                    onChange={handleDatosSearch}
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    select
                                >
                                    <MenuItem  value='NUMPRO' style={{textAlign:'center', fontWeight:'bolder'}}> NUMPRO </MenuItem >
                                    <MenuItem  value='NUMERO' style={{textAlign:'center', fontWeight:'bolder'}}> NUMERO </MenuItem >
                                </TextField>
                            </Grid>
                            <Grid item>
                                <Tooltip title='BUSCAR' arrow placement='top'>
                                    <span>
                                    <Fab onClick={handleSearch} size='small' color='primary'>
                                        <SearchIcon/>
                                    </Fab>
                                    </span>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title='RESET' arrow placement='top'>
                                    <span>
                                    <Fab onClick={handleReset} size='small' color='primary'>
                                        <RefreshIcon/>
                                    </Fab>
                                    </span>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='mercSelect'
                                    label='Mercaderista'
                                    value={dataMerc.Mercaderista || ''}
                                    onChange={handleSelectMerc}
                                    variant='outlined'
                                    size='small'
                                    disabled={!isFoundProject}
                                    fullWidth
                                    select
                                >
                                    {
                                        Datos.Mercaderistas.map((val, index)=><MenuItem key={`merc_${index}`}  value={val.Mercaderista} style={{textAlign:'center', fontWeight:'bolder'}}>{val.Mercaderista} </MenuItem >)
                                    }
                                </TextField>
                            </Grid>
                            {
                                dataMerc.Ruta &&
                                <Grid item xs={12}>
                                <TextField
                                    id='PeriodoSelect'
                                    label='Periodo'
                                    value={ periodoRuta || ''}
                                    onChange={handleSelectRuta}
                                    variant='outlined'
                                    size='small'
                                    disabled={!isFoundProject}
                                    fullWidth
                                    select
                                >
                                    { 
                                        dataMerc.Ruta.map((val, index)=><MenuItem key={`periodo_${index}`}  value={val.Periodo} style={{textAlign:'center', fontWeight:'bolder'}}>{val.Periodo} </MenuItem >)
                                    }
                                </TextField>
                            </Grid>
                            }                      
                            
                            <Grid item xs={6}>
                                <Button onClick={handleProcesarRuta} color='primary' variant='contained' disabled={!isFoundProject} fullWidth>
                                    PROCESAR
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleCloseOptions} color='default' variant='contained' fullWidth>
                                    CERRAR
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display:'block'}}>
                    <Toolbar  >   
                        <div style={{marginRight:30, fontSize:20}}>Rutas</div>
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
                        <Tooltip title='FECHAS' placement='top' >
                            <span>
                            <IconButton color={isFilterDate ? 'secondary' : 'default'} disabled={!isFoundProject} onClick={handleClickMenuDate}  aria-controls="menu-column-date" aria-haspopup="true" style={{marginRight:2}}>
                                    <DateRangeIcon />   
                            </IconButton>
                            </span>
                        </Tooltip>
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
                        <Tooltip title='Fotos' placement='top'>
                            <span>
                            <IconButton style={{marginRight:2}} disabled={!isFoundProject} onClick={handleShowPhotos} color='primary'>
                                <PhotoIcon />
                            </IconButton>
                            </span>
                        </Tooltip>
                        <div style={{margin:'0px 0px 0px auto', display:'block'}}>
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

    function TablaMercaderista(props) {
        return (
        <SnackbarProvider maxSnack={3} hideIconVariant={false} dense anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}>
            <TablaSuperv />
        </SnackbarProvider>
    );
    };

    export default TablaMercaderista;