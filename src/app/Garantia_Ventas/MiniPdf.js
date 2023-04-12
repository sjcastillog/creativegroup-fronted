import React from 'react';
import {
    IconButton,
    Tooltip
} from '@material-ui/core';
import {
    PictureAsPdf as PdfIcon,
} from '@material-ui/icons';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';



const MiniPdf = (props)=>{ 


    const { dataPdf, Proyecto } = props;

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
            height:'100%'
        },
        numpro: {
            position:'relative',
            top:-520,
            left:768,
            fontWeight:'extrabold',
            color:'#fff',
            fontSize:22
        },
        proyectobox: {
            width:370,
            height:50,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-508,
            marginLeft:235,
        },
        proyecto: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:16,
            alignSelf: 'center'
        },
        clientebox: {
            width:170,
            height:113,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:-60,
            marginLeft:655,
        },
        cliente: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:25,
            alignSelf: 'center'
        },
        FotosBox:{
            width:825,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-430,
            left:9,
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
            position:'relative',
            top:-430,
            left:9
        },
        FotoBoxPanoramica:{
            width:425,
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
        },
        Foto:{
            alignSelf:'center',
        },
        FotosBoxCompleta:{
            width:825,
            height:322,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginTop:10,
            marginLeft:7,
            
        },
        FotoBoxCompleta:{
            width:274,
            height:320,
            padding:2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
        },
        ObservBoxCompleta:{
            width:300,
            height:53,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            marginLeft:50,
            marginTop:47,
            
        },
        ObservCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:16,
            alignSelf: 'center',
        },
        CodigoBoxCompleta:{
            width:208,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-86,
            left:594,  
                   
        },
        CodigoCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:dataPdf.Codigo.length === 1 ? 14 : 8,
            alignSelf: 'center'
        },
        LocalBoxCompleta:{
            width:222,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-79,
            left:583,
        },
        LocalCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:14,
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
            top:-73,
            left:739,
            
        },
        NotEntCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:14,
            alignSelf: 'center'
        },
        CodigoBoxVariable:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-971,
            left:752
        },
        LocalBoxVariable:{
            width:182,
            height:31,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-964,
            left:631
        },
        NotEntBoxVariable:{
            width:65,
            height:28,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-958,
            left:754
        },
        logounit:{
            objectFit:'fill',
            borderRadius:5
        },
    });

    const cods = dataPdf.Codigo.map((value, index)=>{  
        if(dataPdf.Codigo.length === 1){
            return( value.codigo)
        }else{
            if(index === (dataPdf.Codigo.length - 1)){
                return(value.codigo)
            }else{
                return(`${value.codigo}, `)
            }
            
        }
       
    });

    const MyDoc =(
        <Document>
          <Page size="A4" orientation="landscape">
            <View style={styles.first}>
              <ImagePdf source="fondoIns/Ins_Individual2.jpg" style={styles.image} />
              <View style={styles.proyectobox} wrap >
                <Text style={styles.proyecto}>
                  {Proyecto}
                </Text>
              </View>
              <View style={styles.clientebox} >
                  <ImagePdf source={`logos/Cadena/${dataPdf.Cadena}.jpg`} style={styles.logounit} />
              </View>
              <View style={styles.FotosBoxCompleta}>
                  <View style={styles.FotoBoxCompleta}>
                      <ImagePdf source={ dataPdf.Fotos.length > 1 ? dataPdf.Fotos[0].src : '/fotosIns/ImagenCr.jpg'} style={styles.Foto} />
                  </View>
                  <View style={styles.FotoBoxCompleta}>
                      <ImagePdf source={ dataPdf.Fotos.length > 1 ? dataPdf.Fotos[1].src : '/fotosIns/ImagenCr.jpg'} style={styles.Foto} />
                  </View>
                  <View style={styles.FotoBoxCompleta}>
                      <ImagePdf source={ dataPdf.Fotos.length > 1 ? dataPdf.Fotos[2].src : '/fotosIns/ImagenCr.jpg'} style={styles.Foto} />
                  </View>
              </View>
              <View style={styles.ObservBoxCompleta} wrap>
                  <Text style={styles.ObservCompleta}>
                      {dataPdf.Observacion}
                  </Text>
              </View>
              <View style={styles.CodigoBoxCompleta} wrap>
                  <Text style={styles.CodigoCompleta}>
                      {cods}
                  </Text>
              </View>
              <View style={styles.LocalBoxCompleta} wrap>
                  <Text style={styles.LocalCompleta}>
                      {dataPdf.Local}
                  </Text>
              </View>
              <View style={styles.NotEntBoxCompleta} wrap>
                  <Text style={styles.NotEntCompleta}>
                      {dataPdf.NotEnt}
                  </Text>
              </View>
          </View>
          </Page>
        </Document>
    );

    

    const [instance] = usePDF({ document: MyDoc });

    

    if (instance.loading) {
        return <FacebookCircularProgress size={25}/>;
    }

    if (instance.error) { 
        return <div>Something went wrong: {instance.error}</div>;
    }
    
   
    return( 
        <IconButton href={instance.url} target="_blank"  size='small' >
            <Tooltip title='PDF'placement='right' arrow >
                <PdfIcon color='primary'/>
            </Tooltip>
        </IconButton>
    );
};

export default MiniPdf;