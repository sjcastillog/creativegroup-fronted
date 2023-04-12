import React from 'react';
import {
            Fab,
            Tooltip
} from '@material-ui/core';
import {
            PictureAsPdf as PdfIcon,
} from '@material-ui/icons';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import FacebookCircularProgress from '../Elementos/FacebookCircularProgress';

const Pdf = (props)=>{

    const { dataPdf4, Locales } = props;
    //const timer2 = React.useRef();

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
            height:595,
        },
        image: {
            objectFit:'container',
            height:595,
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
            fontSize:22,
        },
        proyectobox: {
            width:550,
            height:100,
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
            height:340,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:40,
            left:10
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
            height:332,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-430,
            left:9
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
        ObservBoxCompleta:{
            width:243,
            height:53,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:74,
            left:38
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
            marginTop:-573,
            marginLeft:630,
        },
        CodigoCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:9,
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
        first2:{
            width:842,
            height:597,
        },
        image2: {
            width:'100%',
            height:'100%'
        },
        SpacingBox:{
            height:91
        }
    });
    
    const Puntos = Locales.map((value, index)=>{ 

        let cods = value.Codigo.map((value2, index2)=>{  
            if(value.Codigo.length === 1){
                return( value2.codigo)
            }else{
                if(index === (value.Codigo.length - 1)){
                    return(value2.codigo)
                }else{
                    return(`${value2.codigo}, `)
                }   
            }
        });

        return( 
            <View key={value._id}>
                <View style={styles.first2} >
                    <ImagePdf source="fondoIns/Ins_Completa2.jpg" style={styles.image} />   
                </View>  
                <View style={styles.CodigoBoxCompleta} wrap>
                    <Text style={styles.CodigoCompleta}>
                        {cods}
                    </Text>
                </View>  
                <View style={styles.LocalBoxCompleta} wrap>
                    <Text style={styles.LocalCompleta}>
                        {value.Local}
                    </Text>
                </View>
                <View style={styles.NotEntBoxCompleta} wrap>
                    <Text style={styles.NotEntCompleta}>
                        {value.NotEnt}
                    </Text>
                </View>
                <View style={styles.FotosBox}>
                    <View style={styles.FotoBoxCompleta}>
                        <ImagePdf source={ value.Fotos.length > 1 ? value.Fotos[0].src : '/fotosIns/ImagenCr.jpg' } style={styles.Foto} />
                    </View>
                    <View style={styles.FotoBoxCompleta}>
                        <ImagePdf source={ value.Fotos.length > 1 ? value.Fotos[1].src : '/fotosIns/ImagenCr.jpg'} style={styles.Foto} />
                    </View>
                    <View style={styles.FotoBoxCompleta}>
                        <ImagePdf source={ value.Fotos.length > 1 ? value.Fotos[2].src : '/fotosIns/ImagenCr.jpg'} style={styles.Foto} />
                    </View>
                </View>
                <View style={styles.ObservBoxCompleta} wrap>
                    <Text style={styles.ObservCompleta}>
                        {value.Observacion}
                    </Text>
                </View>
                <View style={styles.SpacingBox}>
                </View>
            </View>
                     
        )
    });
    

    const MyDoc =(
        <Document>
            <Page size="A4" orientation="landscape">
                <View style={styles.first}>
                    <ImagePdf source="fondoIns/Ins_Principal.jpeg" style={styles.image} />
                </View>
                <View style={styles.numprobox} >
                    <Text style={styles.numpro}>
                        {dataPdf4.numpro}
                    </Text>
                </View>
                <View style={styles.proyectobox} wrap >
                    <Text style={styles.proyecto}>
                        {dataPdf4.Title ? dataPdf4.titulo : dataPdf4.proyecto}
                    </Text>
                </View>
                <View style={styles.clientebox} >
                    <ImagePdf source={`logos/Cadena/${dataPdf4.items[0].Cadena}.jpg`} style={styles.logounit} />
                </View>
                <View style={styles.spacingbox} >
                    
                </View>
                {
                    Puntos
                }
            </Page>
        </Document>
    );
   
    const [instance] = usePDF({ document: MyDoc });

    if (instance.loading) {
        return <FacebookCircularProgress size={36}/>;
    }

    if (instance.error) { 
        return <div>Something went wrong: {instance.error}</div>;
    }
    
   
    return( 
        <Fab href={instance.url} target="_blank" color='primary' size='small' >
            <Tooltip title='PDF'placement='right' arrow >
                <PdfIcon  />
            </Tooltip>
        </Fab>
    );
};

export default Pdf;