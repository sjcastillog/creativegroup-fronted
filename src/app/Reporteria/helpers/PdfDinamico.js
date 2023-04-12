
import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, usePDF } from '@react-pdf/renderer';
import { GetApp as GetAppIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import FacebookCircularProgress from '../../Elementos/FacebookCircularProgress';

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
                                <View style={{borderStyle:"solid", borderWidth:1, borderLeftWidth:0, borderTopWidth: 0, borderColor:'#fff', textAlign:value.align, display:'block', width:value.mindWidth, padding:'1px 0px'}} key={`theadcol${index}`}>
                                    <Text style={styles.tableCellHeader}> {value.title}</Text>
                                </View>  
                            ))}
                        </View>
                        {
                            data.map((value,index)=>( 
                                <View style={styles.tableRow} key={`row${index}`}> 
                                    {
                                        headersColumn.map((value2,index2)=>( 
                                            <View style={{borderStyle: "solid",  borderWidth: 1,  borderLeftWidth: 0,  borderTopWidth: 0,width: value2.mindWidth, borderColor:'#fff', display:'block', fontSize:6, fontWeight:'none', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden', textAlign:value2.align, padding:4}} key={`rows-${index}-${index2}`}>   
                                                <Text style={styles.tableCell}>{value[value2.id] ? value[value2.id] : ''}</Text> 
                                            </View>                                    
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

    if (instance.loading) return <FacebookCircularProgress size={30} style={{marginTop:5}}/>;

    if (instance.error) return <div>Something went wrong: {instance.error}</div>;


    return (
        <IconButton href={instance.url} target="_blank"  onClick={HandleClickPdf}>
            <GetAppIcon />
        </IconButton>
    );
};

export default PdfElement;