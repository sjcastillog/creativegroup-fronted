import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import FacebookCircularProgress from '../../Elementos/FacebookCircularProgress';
import { 
    IconButton,
} from '@material-ui/core';
import { 
    GetApp as GetAppIcon,
} from '@material-ui/icons';

export const ReportPdf = (props)=>{
    const { data, Locales = [], handleClickPdf, srcReport } = props;

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
    });

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
        },
        first:{
            width:842,
            height:595
        },
        image: {
            width:'100%',
            height:'100%',
            objectFit:'container',
            //height:595,
        },
        numprobox: {
            width:70,
            height:40,
            marginTop:-522,
            marginLeft:755,
            textAlign:'center',
        },
        numpro: {
            fontWeight:'extrabold',
            color:'#fff',
            fontSize:19,
        },
        proyectobox: {
            width:550,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginLeft:280,
            marginTop:50
            
        },
        proyecto: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:28,
            alignSelf: 'center'
        },
        clientebox: {
            width:550,
            height:200,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginLeft:280,
        },
        cliente: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:25,
            alignSelf: 'center'
        },
        spacingbox:{
            width:'100%',
            height:132.25,
        },
        FotosBox:{
            width:825,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:40,
            left:10,
        },
        FotoBox:{
            width:274,
            height:399,
            padding:2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
        },
        FotoBoxPanoramicaContainer:{
            width:825,
            height:400,            
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-320,
            marginLeft:10,
        },
        FotoBoxPanoramica:{
            width:800,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
        },
        Foto:{
            alignSelf:'center',
        },
        FotoTransform:{
            alignSelf:'center',
            transform: 'rotate(90deg)'
        },
        FotosBoxCompleta:{
            width:822,
            height:350,
            padding:2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:40,
            left:10,
        },
        FotoBoxCompleta:{
            width:274,
            height:330,
            padding:2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
        },
        FotosBoxVacio:{
            width:825,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-440,
            marginLeft:10
        },
        ObservBoxCompleta:{
            width:243,
            height:53,            
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:61,
            left:37,
        },
        ObservCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:16,
            alignSelf: 'center'
        },
        CodigoBoxCompleta:{
            width:190,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-574,
            marginLeft:630,
        },
        CodigoCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:14,
            alignSelf: 'center'
        },
        LocalBoxCompleta:{
            width:182,
            height:31,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:9,
            left:632,
        },
        LocalCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:11,
            alignSelf: 'center'
        },
        NotEntBoxCompleta:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:13,
            left:752,
        },
        NotEntCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:11,
            alignSelf: 'center',       
        },
        CodigoBoxVariable:{
            width:190,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            marginTop:-574,
            marginLeft:630,
        },
        LocalBoxVariable:{
            width:182,
            height:31,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:9,
            left:632,
        },
        NotEntBoxVariable:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:13,
            left:752,
        },
        logounit:{
            objectFit:'fill',
            borderRadius:5
        },
        first2:{
            width:842,
            height:589,
        },
        first3:{
            width:842,
            height:588,
        },
        image2: {
            width:'100%',
            height:'100%'
        },
        SpacingBoxCompleta:{
            height:82,
        },
        SpacingBoxVariable:{
            height:85,
        },
        SpacingBoxVacio:{
            height:38,
        },
        SpacingBoxPanoramico:{
            height:38,
        },
    });

    const MyDoc =(
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={styles.first}>
            <ImagePdf source={srcReport.find(el=> el.tipo === 'PRINCIPAL') ? srcReport.find(el=> el.tipo === 'PRINCIPAL').src : "fondoIns/Ins_Principal.jpeg"} style={styles.image} />
            </View>
            <View style={styles.numprobox} >
                <Text style={styles.numpro}>
                    { data.numpro }
                </Text>
            </View>
            <View style={styles.proyectobox} wrap >
              <Text style={styles.proyecto} wrap>
                { data.titleReport  }
              </Text>
            </View>
            <View style={styles.clientebox} >
                <ImagePdf source={srcReport.find(el=> el.tipo === 'LOGO') ? srcReport.find(el=> el.tipo === 'LOGO').src : `logos/Cadena/${Locales[0].Cadena}.jpg`} style={styles.logounit} />
            </View>
        </Page>
        {
            Locales.map((el)=>( 
                <React.Fragment key={el._id}>
                    {
                        el.Fotos[0].show || el.Fotos[1].show || el.Fotos[2].show ?
                        <Page size="A4" orientation="landscape">
                            <View style={styles.first} >
                            {
                                    el.TipoReporte ?
                                    el.TipoReporte === 'Variable'?
                                    <ImagePdf source={srcReport.find(el=> el.tipo === 'VARIABLE') ? srcReport.find(el=> el.tipo === 'VARIABLE').src : "fondoIns/Ins_Variable2.jpg"} style={styles.first3} />:
                                    el.TipoReporte === 'Vacio' ?
                                    <ImagePdf source={srcReport.find(el=> el.tipo === 'VACIA') ? srcReport.find(el=> el.tipo === 'VACIA').src : "fondoIns/Ins_Vacia.jpeg"} style={styles.first} />:
                                    el.TipoReporte === 'Completo'?
                                    <ImagePdf source={srcReport.find(el=> el.tipo === 'COMPLETA') ? srcReport.find(el=> el.tipo === 'COMPLETA').src : "fondoIns/Ins_Completa2.jpg"} style={styles.first3} />:
                                    <ImagePdf source={srcReport.find(el=> el.tipo === 'VACIA') ? srcReport.find(el=> el.tipo === 'VACIA').src : "fondoIns/Ins_Vacia.jpeg"} style={styles.first} />:
                                    <ImagePdf source={srcReport.find(el=> el.tipo === 'VACIA') ? srcReport.find(el=> el.tipo === 'VACIA').src : "fondoIns/Ins_Vacia.jpeg"} style={styles.first} />
                            }
                                
                            </View>
                            <View style={styles.CodigoBoxCompleta} wrap>
                                <Text style={styles.CodigoCompleta}>
                                    {el.TipoReporte ? el.TipoReporte !== 'Vacio' && el.Codigo.length === 1 ? el.Codigo[0].codigo : '' : ''}
                                </Text>
                            </View>
                            <View style={styles.LocalBoxCompleta} wrap>
                                <Text style={styles.LocalCompleta}>
                                    {el.TipoReporte ? el.TipoReporte !== 'Vacio' && el.Local : ''}
                                </Text>
                            </View>
                            <View style={styles.NotEntBoxCompleta} wrap>
                                <Text style={styles.NotEntCompleta}>
                                    {el.TipoReporte ? el.TipoReporte !== 'Vacio' && el.NotEnt : ''}
                                </Text>
                            </View>
                            <View style={styles.FotosBoxCompleta}>
                            {
                                el.Fotos.filter(el=> el.tipo !== 'Panoramica').filter(el2=> el2.show ).map(value=>(
                                    <View style={styles.FotoBoxCompleta} key={`${value.src}_${Date.now()}_view_key`} id={`${value.src}_${Date.now()}_view_id`}>
                                        <ImagePdf 
                                            id={`${Date.now()}_${value.src}_img`}
                                            src={value.src} 
                                            style={{ alignSelf:'center', transform:`scale(${value.scale ? `${parseFloat(value.scale.split(',')[0])}, ${parseFloat(value.scale.split(',')[1])}` : `${parseFloat('1.0')}, ${parseFloat('1.0')}`}) rotate(${value.rotate ? value.rotate : 0}deg)`}} />
                                    </View>
                                ))
                            }
                            </View>
                            {
                                el.TipoReporte === 'Completo' &&
                                <View style={styles.ObservBoxCompleta} wrap>
                                    <Text style={styles.ObservCompleta}>
                                        {el.Observacion}
                                    </Text>
                                </View>  
                            }
                        </Page>: null
                    }
                    {
                        el.Fotos.find(el=>el.tipo === 'Panoramica').show ?
                        <Page size="A4" orientation="landscape" >
                            <View style={styles.imagesPdf} >
                                <ImagePdf source={srcReport.find(el=> el.tipo === 'VACIA') ? srcReport.find(el=> el.tipo === 'VACIA').src : "fondoIns/Ins_Vacia.jpeg"} style={styles.image} />
                            </View>
                            <View style={styles.FotoBoxPanoramicaContainer}>
                                <View style={styles.FotoBoxPanoramica}>
                                    <ImagePdf 
                                        id={`${Date.now()}_${el.Fotos[3].src}`}
                                        source={el.Fotos[3].src} 
                                        style={{ alignSelf:'center', transform:`scale(${el.Fotos[3].scale ? `${parseFloat(el.Fotos[3].scale.split(',')[0])}, ${parseFloat(el.Fotos[3].scale.split(',')[1])}` : `${parseFloat('1.0')}, ${parseFloat('1.0')}`}) rotate(${el.Fotos[3].rotate ? el.Fotos[3].rotate : 0}deg)`}} />
                                </View>
                            </View>
                            <View style={styles.SpacingBoxPanoramico}>
                            </View> 
                        </Page> : null
                    }
                </React.Fragment>
            ))
        }
      </Document>
    );

    const [ instance ] = usePDF({ document: MyDoc });

    if (instance.loading) {
        return <FacebookCircularProgress size={36}/>;
    }

    if (instance.error) { 
        return <div>Something went wrong: {instance.error}</div>;
    }
    
   
    return( 
        <IconButton 
            href={instance.url} 
            target="_blank"
            color='secondary' 
            onClick={handleClickPdf} 
            style={{backgroundColor:'dodgerblue', color:'#fff'}}
            size='medium'>
                <GetAppIcon  />
        </IconButton>
    );
    
};

