import React, { useState, useEffect, createContext, useContext, useRef } from 'react';

import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, BlobProvider } from '@react-pdf/renderer';
import { 
            Button,
            Card,
            CardContent,
            CardHeader,
            CardMedia,
            CircularProgress,
            CssBaseline,
            Fab,
            FormControlLabel,
            FormGroup,
            Grid,
            IconButton,
            InputAdornment,
            Paper,
            Switch,
            TextField,
            Tooltip,
        } from '@material-ui/core';
/***************************************ICONOS************************************/
import { 
         Check as CheckIcon,
         Delete as DeleteIcon,
         Lock as LockIcon,
         Place as PlaceIcon,
         PictureAsPdf as PdfIcon,
         Refresh as RefreshIcon,
         Save as SaveIcon,
         Search as SearchIcon, 
        } from '@material-ui/icons';
/*********************************************************************************/

const PdfCreate = (props)=>{
    const { isReady, setReady, data, Locales } = useContext(RepContext)
    const timer2 = React.useRef();

    useEffect(
        ()=>{
            timer2.current = window.setTimeout(() => {
                setReady(true);
                console.log(Locales);
            }, 500);

            return () => {
                clearTimeout(timer2.current);
            };
        },[]
    );

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
            width:550,
            height:100,
            
            
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-420,
            left:270
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
            position:'relative',
            top:-450,
            left:270
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
            left:9
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
            top:-403,
            left:37
        },
        ObservCompleta: {
            fontFamily: 'Oswald',
            color: '#212121',
            fontSize:16,
            alignSelf: 'center'
        },
        CodigoBoxCompleta:{
            width:65,
            height:28,
            
            
            
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection:'row',
            position:'relative',
            top:-957,
            left:752
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
            top:-951,
            left:631
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
            top:-945,
            left:754
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
    });
    
    const Puntos = Locales.map((value, index)=>{
        if(value.Panoramica ){
            return(
                <React.Fragment>
                    <View style={styles.first} key={value._id}>
                        { value.Visual.vacio && (
                            <>
                                <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                                <View style={styles.FotosBox}>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                    </View><View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                    </View>
                                </View>
                            </>
                        )}
                        { value.Visual.completo && (
                            <>
                                <ImagePdf source="fondoIns/Ins_Completa.jpg" style={styles.image} />
                                <View style={styles.FotosBoxCompleta}>
                                    <View style={styles.FotoBoxCompleta}>
                                        <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBoxCompleta}>
                                        <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                    </View><View style={styles.FotoBoxCompleta}>
                                        <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                    </View>
                                </View>
                                <View style={styles.ObservBoxCompleta} wrap>
                                    <Text style={styles.ObservCompleta}>
                                        {value.Observacion}
                                    </Text>
                                </View>
                                <View style={styles.CodigoBoxCompleta} wrap>
                                    <Text style={styles.CodigoCompleta}>
                                        {value.Codigo}
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
                            </>
                        )}
                        { value.Visual.variable && (
                            <>
                                <ImagePdf source="fondoIns/Ins_Variable.jpg" style={styles.image} />
                                <View style={styles.FotosBox}>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                    </View>
                                    <View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                    </View><View style={styles.FotoBox}>
                                        <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                    </View>
                                </View>
                                <View style={styles.CodigoBoxVariable} wrap>
                                    <Text style={styles.CodigoCompleta}>
                                        {value.Codigo}
                                    </Text>
                                </View>
                                <View style={styles.LocalBoxVariable} wrap>
                                    <Text style={styles.LocalCompleta}>
                                        {value.Local}
                                    </Text>
                                </View>
                                <View style={styles.NotEntBoxVariable} wrap>
                                    <Text style={styles.NotEntCompleta}>
                                        {value.NotEnt}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                    <View style={styles.first} key={`Panoramica-${value._id}`}>
                        <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                        <View style={styles.FotoBoxPanoramicaContainer}>
                            <View style={styles.FotoBoxPanoramica}>
                                    <ImagePdf source={value.Fotos[3].src} style={styles.Foto} />
                            </View>
                        </View>
                    </View>
                </React.Fragment>
            )
        }else if(value.Visual){
            return(
                <View style={styles.first} key={value._id}>
                    { value.Visual.vacio && (
                        <>
                            <ImagePdf source="fondoIns/Ins_Vacia.jpeg" style={styles.image} />
                            <View style={styles.FotosBox}>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                </View>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                </View><View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                </View>
                            </View>
                        </>
                    )}
                    { value.Visual.completo && (
                        <>
                            <ImagePdf source="fondoIns/Ins_Completa.jpg" style={styles.image} />
                            <View style={styles.FotosBoxCompleta}>
                                <View style={styles.FotoBoxCompleta}>
                                    <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                </View>
                                <View style={styles.FotoBoxCompleta}>
                                    <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                </View><View style={styles.FotoBoxCompleta}>
                                    <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                </View>
                            </View>
                            <View style={styles.ObservBoxCompleta} wrap>
                                <Text style={styles.ObservCompleta}>
                                    {value.Observacion}
                                </Text>
                            </View>
                            <View style={styles.CodigoBoxCompleta} wrap>
                                <Text style={styles.CodigoCompleta}>
                                    {value.Codigo}
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
                        </>
                    )}
                    { value.Visual.variable && (
                        <>
                            <ImagePdf source="fondoIns/Ins_Variable.jpg" style={styles.image} />
                            <View style={styles.FotosBox}>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[0].src} style={styles.Foto} />
                                </View>
                                <View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[1].src} style={styles.Foto} />
                                </View><View style={styles.FotoBox}>
                                    <ImagePdf source={value.Fotos[2].src} style={styles.Foto} />
                                </View>
                            </View>
                            <View style={styles.CodigoBoxVariable} wrap>
                                <Text style={styles.CodigoCompleta}>
                                    {value.Codigo}
                                </Text>
                            </View>
                            <View style={styles.LocalBoxVariable} wrap>
                                <Text style={styles.LocalCompleta}>
                                    {value.Local}
                                </Text>
                            </View>
                            <View style={styles.NotEntBoxVariable} wrap>
                                <Text style={styles.NotEntCompleta}>
                                    {value.NotEnt}
                                </Text>
                            </View>
                        </>
                    )}
                </View>
                    
            )
        }else{
            return(
                <View>

                </View>
            )
        }
    });

    const document =(
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={styles.first}>
            <ImagePdf source="fondoIns/Ins_Principal.jpeg" style={styles.image} />
            <Text style={styles.numpro}>
              {data.numpro}
            </Text>
            <View style={styles.proyectobox} wrap >
              <Text style={styles.proyecto}>
                {data.Title ? data.titulo : data.proyecto}
              </Text>
            </View>
            <View style={styles.clientebox} >
                <ImagePdf source={`logos/Cadena/${Locales[0].Cadena}.jpg`} style={styles.logounit} />
            </View>
            
          </View>
            {
                Puntos
            }
        </Page>
      </Document>
    );
    
    
   
    return( 
      <div>
        {
            isReady && 
            <BlobProvider document={isReady && document} fileName="Reporte.pdf">
            {({ url }) => (
                        <Tooltip title='PDF'placement='right' arrow >
                            <Fab href={url} target="_blank" color='secondary' style={{color:'red'}} >
                            <PdfIcon />
                            </Fab>
                        </Tooltip>
                        )}
            </BlobProvider>
        }
      </div>
    );
};

export default PdfCreate;