import React from 'react'; 
//import { Grid } from '@material-ui/core';
//import colorPicker from 'tui-color-picker';
//import ImageEditor from '@toast-ui/react-image-editor';
//import '../node_modules/@toast-ui/react-image-editor/dist/toastui-react-image-editor.css'
//import FileSaver from 'file-saver'

function Opeditor(){
  return(
    <div></div>
  )
};

/*function Opeditor(){
  const mayTheme = {
    'common.bi.image': '/images/confites.png',
    'common.backgroundImage': 'none',
    'common.border': '0px',
    'downloadButton.backgroundColor': '#c0d40f',
    'downloadButton.border': 'none',
    'colorpicker.button.border': '1px solid #1e1e1e',
    'colorpicker.title.color': '#fff'
  };

  return(
      <Grid container justify='center' alignContent='center' style={{marginTop:20, width:'80vw'}}>
        <Grid item xl={10} lg={10} md={10} sm={12} xs={12} style={{height:' 80vh'}} >
          <ImageEditor
            includeUI={{
              loadImage: {
                path: 'sampleImage.jpg',
                name: 'CreativeGroup'
              },
              theme: mayTheme,
              //menu: ['shape', 'text', 'icon'],
              initMenu: 'text',
              uiSize: {
                width: '100%',
                height: '100%'
              },
              menuBarPosition: 'left'
            }}
            cssMaxHeight={600}
            cssMaxWidth={900}
            selectionStyle={{
              cornerSize: 20,
              rotatingPointOffset: 70
            }}
            usageStatistics={true}
          />
        </Grid>
      </Grid>
  );
}*/

export default Opeditor;