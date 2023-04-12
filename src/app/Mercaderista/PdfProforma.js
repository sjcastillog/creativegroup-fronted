import { Page, Text, View, Document, StyleSheet, Font, usePDF, Image as ImagePdf } from '@react-pdf/renderer';
import { IconButton, CircularProgress, } from '@material-ui/core';
import React, { Fragment } from 'react';
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';
import { GetApp as GetAppIcon } from '@material-ui/icons';


const CreatePdf = ({formulario, detalles, handleClickPdf})=>{
    console.log(detalles);
    Font.register({family: 'Oswald',src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'});

    Font.register({ family: 'Roboto-BlackCursive', src:'fonts/Roboto-BlackItalic.ttf'});

    const styles = StyleSheet.create({
        image: {
            objectFit:'cover',
            width:595,
            height:841,
          },
        imageBox:{
            objectFit:'scale-down',
            alignSelf:'center',

        },
        boxNumber:{
            width:55,
            height:45,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:-837,
            marginLeft:505
        },
        Number:{
            fontFamily: 'Oswald',
            color: '#fff',
            fontSize:20,
            alignSelf: 'center'
        },
        boxProyecto:{
            width:263,
            height:30,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:37,
            marginLeft:305
        },
        boxCliente:{
            width:458,
            height:21,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:26,
            marginLeft:102,
        },
        boxDireccion:{
            width:461,
            height:19,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:4,
            marginLeft:96,
        },
        boxFecha:{
            width:461,
            height:17,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:3.5,
            marginLeft:96,
        },
        boxDescripcion:{
            width:543,
            height:389,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:48,
            marginLeft:26,
            padding:1,
            display:'flex',
            justifyContent:'flex-start',
            flexDirection:'column',
        },
        boxNotas:{
            width:320,
            height:25,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:1,
            marginLeft:63,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid'
        },
        boxFin:{
            width:365,
            height:30,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:55,
            marginLeft:26,
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
        },
        box_Fin:{
            width:118,
            height:23,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            margin:3
        },
        boxFin1:{
            width:70,
            height:124,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginTop:-110,
            marginLeft:495,
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            paddingTop:0
            
        },
        box_Fin1:{
            width:68,
            height:20.5,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginBottom:2
        },
        head_1:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:14,
            alignSelf: 'center'
        },
        head_2:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:12,
            alignSelf: 'flex-start'
        },
        head_3:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:11,
            alignSelf: 'flex-start'
        },
        head_4:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:10,
            alignSelf: 'flex-start'
        },
        footerLeft:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:12,
            alignSelf: 'center',
            
        },
        footerRight:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:10,
            alignSelf: 'center',
        },
        Notas:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:12,
            alignSelf: 'center'
        },
        boxDetalles:{
            width:539,
            height:72,
            padding:1,
            display:'flex',
            justifyContent:'flex-start',
            flexDirection:'row',
            marginBottom:2,
        },
        box_Detalles1:{
            width:35,
            height:27,
            alignSelf:'flex-start',
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginLeft:4,
            marginRight:6,
            padding:3,
        },
        box_Detalles2:{
            width:148.5,
            height:62,
            alignSelf:'center',
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginRight:3,
            padding:3
        },
        box_Detalles3:{
            width:185,
            height:62,
            alignSelf:'center',
            marginLeft:3,
            marginRight:6,
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid'
        },
        box_Detalles4:{
            width:72.5,
            height:62,
            alignSelf:'center',
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            marginRight:8,
            padding:3,
        },
        box_Detalles5:{
            width:72.5,
            height:62,
            alignSelf:'center',
            borderWidth:0,
            borderColor:'red',
            borderStyle:'solid',
            padding:3
        },
        TextDetalles_1:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:12,
            alignSelf: 'center'
        },
        TextDetalles_2:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:8,
            alignSelf: 'center'
        },
        TextDetalles_3:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:8,
            alignSelf: 'center'
        },
        TextDetalles_4:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:12,
            alignSelf: 'flex-end'
        },
        TextDetalles_5:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:10,
            alignSelf: 'flex-end'
        },
        TextDetalles_6:{
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:11,
            alignSelf: 'flex-end',
        },
        
        
    });

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
    });

    const Descripciones = detalles.map((elDetalle,index)=>{ 
                          
        return( 
                <View style={styles.boxDetalles} key={elDetalle.id}>
                    <View style={styles.box_Detalles1}>
                        <Text style={styles.TextDetalles_1}>
                            {elDetalle.CANTIDAD}
                        </Text>
                    </View>
                    <View style={styles.box_Detalles2}>
                        <Text style={styles.TextDetalles_2}>
                            {elDetalle.DESCRIPCION}
                        </Text>
                    </View>
                    <View style={styles.box_Detalles3}>
                        <Text style={styles.TextDetalles_3}>
                            {elDetalle.DETALLE}
                        </Text>
                    </View>
                    <View style={styles.box_Detalles4}>
                        <Text style={styles.TextDetalles_4}>
                            {elDetalle.SUBTOTAL}
                        </Text>
                    </View>
                    <View style={styles.box_Detalles5}>
                        <Text style={styles.TextDetalles_4}>
                            {elDetalle.TOTAL}
                        </Text>
                    </View>
                </View>
            
        )})

    const MyDoc = (
        <Document>
            <Page size="A4" >
                <View>
                    <ImagePdf source='FORMATO_PROFORMA2.jpg' style={styles.image} />
                    <View style={styles.boxNumber}>
                        <Text style={styles.Number}>
                            {formulario.NumProf}
                        </Text>
                    </View>
                    <View style={styles.boxProyecto}>
                        <Text style={styles.head_1}>
                            {formulario.Proyecto}
                        </Text>
                    </View>
                    <View style={styles.boxCliente}>
                        <Text style={styles.head_2}>
                            {formulario.Cliente}
                        </Text>
                    </View>
                    <View style={styles.boxDireccion}>
                        <Text style={styles.head_3}>
                            {formulario.Direccion}
                        </Text>
                    </View>
                    <View style={styles.boxFecha}>
                        <Text style={styles.head_4}>
                            {formulario.Fecha}
                        </Text>
                    </View>
                    <View style={styles.boxDescripcion}>
                    { Descripciones }
                   </View>
                    <View style={styles.boxNotas}>
                        <Text style={styles.Notas}>
                            {formulario.Notas}
                        </Text>
                    </View>
                    <View style={styles.boxFin}>
                        <View style={styles.box_Fin}>
                            <Text style={styles.footerLeft}>
                                {formulario.FormaPago}
                            </Text>
                        </View>
                        <View style={styles.box_Fin}>
                            <Text style={styles.footerLeft}>
                                {`${formulario.TiempoProyecto} ${formulario.Unidad}`}
                            </Text>
                        </View>
                        <View style={styles.box_Fin}>
                            <Text style={styles.footerLeft}>
                                {formulario.Validez}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.boxFin1}>
                        <View style={styles.box_Fin1}>
                            <Text style={styles.TextDetalles_5}>
                                {formulario.SUBTOTAL}
                            </Text>
                        </View>
                        <View style={styles.box_Fin1}>
                            <Text style={styles.TextDetalles_5}>
                                {parseFloat(formulario.Descuento).toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.box_Fin1}>
                            <Text style={styles.TextDetalles_5}>
                                {parseFloat(formulario.Fee).toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.box_Fin1}>
                            <Text style={styles.TextDetalles_5}>
                                {formulario.SUBFEE}
                            </Text>
                        </View>
                        <View style={styles.box_Fin1}>
                            <Text style={styles.TextDetalles_5}>
                                {formulario.IVA}
                            </Text>
                        </View>
                        <View style={styles.box_Fin1}>
                            <Text style={styles.TextDetalles_6}>
                                {formulario.TOTAL}
                            </Text>
                        </View>
                    </View>
                </View>
                
            </Page>
        </Document>
    );

    const [ instance ] = usePDF({ document: MyDoc });

    if (instance.loading) return <CircularProgress size={25} style={{position:'relative', top:6}}/>;

    if (instance.error) return <div>Something went wrong: {instance.error}</div>;


    return (
        <IconButton href={instance.url} size='medium' download="CreativeDocument.pdf" onClick={handleClickPdf} color='secondary' style={{position:'relative', top:2}}>
            <GetAppIcon />
        </IconButton>
    );
}

export default CreatePdf;