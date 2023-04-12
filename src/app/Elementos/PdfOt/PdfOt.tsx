import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image as ImagePdf, Font, usePDF } from '@react-pdf/renderer';
import FacebookCircularProgress from '../FacebookCircularProgress';
import { Fab, Tooltip } from '@material-ui/core';
import { PictureAsPdf as PdfIcon } from '@material-ui/icons';

interface Images{
    name:string;
}

interface FichasTecnicas{
    alto?:number;
    ancho?:number;
    fondo?:number;
    fichaTecnica?:string;
    planograma?:string;
    url:Array<Images>;
    _id:string;
    pgSwitch:boolean;
    ftSwitch:boolean;
    medidasSwitch:boolean;
}

interface DataPdf{
    numpro:number;
    oc?:string;
    ot?:number;
    proyecto:string;
    fecreqcli?:string;
    ejecutiva:string;
    fichastecnicas:Array<FichasTecnicas>;
}

interface Props{
    dataPdf:DataPdf;
}

export const PdfOt = ({dataPdf}:Props)=>{

  const styles = StyleSheet.create({
    image: {
      objectFit:'cover',
      width:842,
      height:595,
    },
    boxOc:{
        marginTop:-575,
        marginLeft:250,
        width:150,
        height:38,
        fontSize:13,
        padding:1,
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'nowrap'
    },
    boxOt:{
        marginTop:-38,
        marginLeft:460,
        width:120,
        height:38,
        textAlign:'center',
    },
    boxNumpro:{
        marginTop:-38,
        height:38,
        marginLeft:705,
        width:105,
        color:'#fff',
        fontSize:21,
        textAlign:'center'
    },
    textCenterV:{
        marginTop:8,
    },
    boxTitle:{
        marginTop:-2,
        marginLeft:245,
        width:448,
        height:44,
        fontSize:14,
        padding:1,
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'nowrap'
    },
    textCenterH:{
        textAlign:'justify',
        padding:0
    },
    boxfrc:{
        marginTop:28,
        marginLeft:150,
        width:120,
        height:38,
        fontSize:15,
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'nowrap'
    },
    boxResponsable:{
        marginTop:32,
        marginLeft:30,
        width:240,
        height:30,
        fontSize:14,
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'nowrap'
    },
    boxParentMedidas:{
      width:255,
      height:68,
      marginTop:10,
      marginLeft:20,
    },
    imagesContain:{
      objectFit:'contain'
    },
    boxImageAll:{
      width:'100%',
      height:'100%',
    },
    boxMedidas:{
      marginLeft:60,
      marginTop:-37,
      fontSize:10,
      width:200,
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'row',
      alignContent:'center',
      alignItems:'center',
      flexWrap:'nowrap',
      height:18,
    },
    boxesMedidas:{
        width:35,
        height:17,
        textAlign:'center'
    },
    boxParentFT:{
      width:264,
      height:190,
      marginTop:10,
      marginLeft:12,
    },
    boxFichaTecnica:{
        marginTop:-170,
        marginLeft:30,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignContent:'flex-start',
        alignItems:'flex-start',
        flexWrap:'nowrap',
        height:159,
        width:244,
        fontSize:9,
        padding:3,
        
    },
    boxParentObservaciones:{
      width:264,
      height:68,
      marginTop:9,
      marginLeft:15.5,
    },
    boxObservaciones:{
        marginTop:-47,
        marginLeft:27,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignContent:'flex-start',
        alignItems:'flex-start',
        flexWrap:'nowrap',
        height:45,
        width:246,
        fontSize:9,
        padding:2,
    },
    boxImage:{
        position:'absolute',
        top:112,
        left: 300,
        width: 500,
        height:400,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'nowrap',
        // border:'1px solid red'
    },
    imageurl:{
        width: 495,
        height:395,
        objectFit:'scale-down',
    },
    imageurl2:{
        objectFit:'scale-down',
    },
    box2:{
        width:240,
        height:400,
        margin:3,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'nowrap',
      },
      box3:{
        width:160,
        height:400,
        margin:1,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'nowrap',
      },
  });

  
  Font.register({
      family: 'Oswald',
      src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  });

  const MyDoc = (
    <Document>
        {
            dataPdf.fichastecnicas.map((el)=>(
                <Page size="A4" orientation="landscape" key={el._id}>
                <View>
                  <ImagePdf source="OP2023_2.png" style={styles.image} />
                </View>
                <View style={styles.boxOc}>
                  <Text wrap style={styles.textCenterH}>
                    {dataPdf.oc}
                  </Text>
                </View>
                <View style={styles.boxOt}>
                  <Text style={styles.textCenterV}>
                    {dataPdf.ot}
                  </Text>
                </View>
                <View style={styles.boxNumpro}>
                  <Text>
                    {dataPdf.numpro}
                  </Text>
                </View>
                <View style={styles.boxTitle}>
                  <Text wrap style={styles.textCenterH}>
                    {dataPdf.proyecto}
                  </Text>
                </View>
                <View style={styles.boxfrc}>
                  <Text wrap style={styles.textCenterH}>
                    {dataPdf.fecreqcli ? dataPdf.fecreqcli?.split('T')[0] : ''}
                  </Text>
                </View>
                <View style={styles.boxResponsable}>
                  <Text wrap style={styles.textCenterH}>
                    {dataPdf.ejecutiva}
                  </Text>
                </View>
                {el.medidasSwitch &&
                  <>
                    <View style={styles.boxParentMedidas}>
                      <View style={styles.boxImageAll}>
                        <ImagePdf source="MEDIDAS_2023.png" style={styles.imagesContain} />
                      </View>
                    </View>
                    <View style={styles.boxMedidas}>
                      <Text style={styles.boxesMedidas}>
                        {el.alto ? `${el.alto} Mts` : ''}
                      </Text>
                      <Text style={styles.boxesMedidas}>
                        {el.ancho ? `${el.ancho} Mts` : ''}
                      </Text>
                      <Text style={styles.boxesMedidas}>
                        {el.fondo ? `${el.fondo} Mts` : ''}
                      </Text>
                    </View>
                  </>
                }
                {
                  el.ftSwitch &&
                  <>
                    <View style={styles.boxParentFT}>
                      <View style={styles.boxImageAll}>
                        <ImagePdf source="FT_2023.png" style={styles.imagesContain} />
                      </View>
                    </View>
                    <View style={styles.boxFichaTecnica}>
                      <Text wrap style={styles.textCenterH}>
                        {el.fichaTecnica ? el.fichaTecnica : ''}
                      </Text>
                    </View>
                  </>
                }
                {
                  el.pgSwitch &&
                  <>
                    <View style={styles.boxParentObservaciones}>
                      <View style={styles.boxImageAll}>
                        <ImagePdf source="OBS_2023.png" style={styles.imagesContain} />
                      </View>
                    </View>
                    <View style={styles.boxObservaciones}>
                      <Text wrap style={styles.textCenterH}>
                        {el.planograma ? el.planograma : ''}
                      </Text>
                    </View>
                  </>
                }
                <View style={styles.boxImage}>
                    {
                         Array.isArray(el.url) && el.url.map((value,index)=>{ 
                            switch(el.url.length){
                              case 1:{ 
                                return(<ImagePdf source={value.name} key={`imagen${value}-${index}`} style={styles.imageurl}/>);
                                }
                              case 2:
                                return(
                                  <View  key={`imagen${value}-${index}`} style={styles.box2}>
                                    <ImagePdf source={value.name} style={styles.imageurl2}/>
                                  </View>
                                );
                              case 3:
                                return(
                                  <View  key={`imagen${value}-${index}`} style={styles.box3}>
                                    <ImagePdf source={value.name} style={styles.imageurl2}/>
                                  </View>
                                );
                              default:
                                return(
                                  <div></div>
                                )
                            }
                          })
                    }
                </View>
              </Page>
            ))
        }

    </Document>
  );

  const [instance] = usePDF({ document: MyDoc });

  if (instance.loading) return <FacebookCircularProgress size={36}/>

  if (instance.error) return <div>Something went wrong: {instance.error}</div>


  return( 
    <Fab href={instance.url ? instance.url : '...'} target="_blank" color='primary' size='small' >
        <Tooltip title='PDF'placement='right' arrow >
            <PdfIcon  />
        </Tooltip>
    </Fab>
  );
}

