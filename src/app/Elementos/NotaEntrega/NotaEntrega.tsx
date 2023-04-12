import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image as ImagePdf,
  Font,
  usePDF,
} from "@react-pdf/renderer";
import FacebookCircularProgress from "../FacebookCircularProgress";
import { IconButton, Tooltip } from "@material-ui/core";
import {
  GetApp as GetAppIcon,
  // PictureAsPdf as PdfIcon
} from "@material-ui/icons";

interface Detalles {
  tiptra: string;
  value: string;
}

interface DataPdf {
  numpro: number;
  ejecutiva: string;
  feredo: string;
  cliente: string;
}

interface Formulario {
  Direccion?: string;
  Ciudad?: string;
  Cadena?: string;
  Local?: string;
  insAgr?: string;
  Observacion?: string;
  numNE: string;
}

interface Props {
  dataPdf: DataPdf;
  handleCreatePdf: () => void;
  formulario: Formulario;
  getDetalles: Array<Detalles>;
}

export const NotaEntrega = ({
  dataPdf,
  handleCreatePdf,
  formulario,
  getDetalles,
}: Props) => {
  
  const styles = StyleSheet.create({
    image: {
      objectFit: "cover",
      width:419, 
      height:595
    },
    NumSecuencial: {
      marginTop: -512,
      marginLeft: 310,
      width: 100,
      height: 30,
      fontSize: 16,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "nowrap",
      flexDirection: "row",
    },
    Ejecutiva: {
      marginTop: 29,
      marginLeft: 30,
      width: 225,
      height: 20,
      textAlign: "center",
      fontSize: 12,
      paddingTop: 3,
    },
    Fecha: {
      marginTop: -20,
      marginLeft: 264,
      width: 122,
      height: 20,
      textAlign: "center",
      fontSize: 12,
      paddingTop: 3,
    },
    Cliente: {
      marginTop: -20,
      marginLeft: 264,
      width: 122,
      height: 20,
      textAlign: "center",
      fontSize: 8,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
    },
    Dirigido: {
      marginTop: 18,
      marginLeft: 30,
      width: 225,
      height: 20,
      textAlign: "center",
      fontSize: 12,
      paddingTop: 3,
    },
    Direccion: {
      marginTop: 18,
      marginLeft: 30,
      width: 225,
      height: 20,
      textAlign: "center",
      fontSize: 8,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
    },
    textCenterH: {
      textAlign: "justify",
      padding: 0,
    },
    textCenterL: {
      textAlign: "left",
      padding: 0,
    },
    Detalles: {
      marginTop: 34,
      marginLeft: 29,
      width: 370,
      height: 200,
    },
    Detalle: {
      width: 360,
      height: 13.8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      flexDirection: "row",
      fontSize: 9,
    },
    Tiptra: {
      width: 49,
      height: 13.8,
      paddingLeft: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      flexDirection: "row",
    },
    DetalleTiptra: {
      width: 311,
      height: 13.8,
      paddingLeft: 4,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "nowrap",
      flexDirection: "row",
    },
    Observacion: {
      marginTop: 12,
      marginLeft: 35,
      width: 350,
      height: 23,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "nowrap",
      flexDirection: "row",
      fontSize: 10,
    },
  });

  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  const MyDoc = (
    <>
    <Document>
      <Page size="A4" orientation="landscape" style={{display:'flex', justifyContent:'space-between', flexWrap:'nowrap', flexDirection:'row'}}>
        <View style={{width:419, height:595}}> 
          <View style={{ backgroundColor: "#fff" }}>
            <ImagePdf source="NOTAENTREGA.jpg" style={styles.image} />
          </View>
          <View style={styles.NumSecuencial}>
            <Text style={styles.textCenterH}>
              {formulario.numNE ? formulario.numNE : 12345-1}
            </Text>
          </View>
          <View style={styles.Ejecutiva}>
            <Text>{dataPdf.ejecutiva ? dataPdf.ejecutiva : ""}</Text>
          </View>
          <View style={styles.Fecha}>
            <Text>{formulario.insAgr ? formulario.insAgr : ""}</Text>
          </View>
          <View style={styles.Direccion}>
            <Text style={styles.textCenterH}>
              {`${formulario.Cadena ? formulario.Cadena : ""} - ${
                formulario.Local ? formulario.Local : ""
              }`}
            </Text>
          </View>
          <View style={styles.Cliente}>
            <Text style={styles.textCenterH}>
              {dataPdf.cliente ? dataPdf.cliente : ""}
            </Text>
          </View>
          <View style={styles.Direccion}>
            <Text style={styles.textCenterH} wrap>
              {formulario.Direccion ? formulario.Direccion : ""}
            </Text>
          </View>
          <View style={styles.Fecha}>
            <Text style={{ fontSize: 10 }}>
              {formulario.Ciudad ? formulario.Ciudad : ""}
            </Text>
          </View>
          <View style={styles.Detalles}>
            {getDetalles.map((el) => (
              <View style={styles.Detalle}>
                <View style={styles.Tiptra}>
                  <Text style={styles.textCenterH}>{el.value}</Text>
                </View>
                <View style={styles.DetalleTiptra}>
                  <Text style={styles.textCenterH}>{el.tiptra}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.Observacion}>
            <Text style={styles.textCenterH} wrap>
              {formulario.Observacion ? formulario.Observacion : ""}
            </Text>
          </View>
        </View>
        <View style={{width:419, height:595}}> 
          <View style={{ backgroundColor: "#fff" }}>
            <ImagePdf source="NOTAENTREGA.jpg" style={styles.image} />
          </View>
          <View style={styles.NumSecuencial}>
            <Text style={styles.textCenterH}>
              {formulario.numNE ? formulario.numNE : 12345-1}
            </Text>
          </View>
          <View style={styles.Ejecutiva}>
            <Text>{dataPdf.ejecutiva ? dataPdf.ejecutiva : ""}</Text>
          </View>
          <View style={styles.Fecha}>
            <Text>{formulario.insAgr ? formulario.insAgr : ""}</Text>
          </View>
          <View style={styles.Direccion}>
            <Text style={styles.textCenterH}>
              {`${formulario.Cadena ? formulario.Cadena : ""} - ${
                formulario.Local ? formulario.Local : ""
              }`}
            </Text>
          </View>
          <View style={styles.Cliente}>
            <Text style={styles.textCenterH}>
              {dataPdf.cliente ? dataPdf.cliente : ""}
            </Text>
          </View>
          <View style={styles.Direccion}>
            <Text style={styles.textCenterH} wrap>
              {formulario.Direccion ? formulario.Direccion : ""}
            </Text>
          </View>
          <View style={styles.Fecha}>
            <Text style={{ fontSize: 10 }}>
              {formulario.Ciudad ? formulario.Ciudad : ""}
            </Text>
          </View>
          <View style={styles.Detalles}>
            {getDetalles.map((el) => (
              <View style={styles.Detalle}>
                <View style={styles.Tiptra}>
                  <Text style={styles.textCenterH}>{el.value}</Text>
                </View>
                <View style={styles.DetalleTiptra}>
                  <Text style={styles.textCenterH}>{el.tiptra}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.Observacion}>
            <Text style={styles.textCenterH} wrap>
              {formulario.Observacion ? formulario.Observacion : ""}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
    </>
  );

  const [instance] = usePDF({ document: MyDoc });

  if (instance.loading)
    return (
      <div>
        <FacebookCircularProgress size={18} />
      </div>
    );

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  return (
    <IconButton
      href={instance.url ? instance.url : "..."}
      target="_blank"
      color="primary"
      size="small"
      onClick={() => {
        handleCreatePdf();
      }}
    >
      <Tooltip title="PDF" placement="right" arrow>
        <GetAppIcon />
      </Tooltip>
    </IconButton>
  );
};
