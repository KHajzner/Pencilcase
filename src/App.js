import React, {useState} from 'react';

import Palette from './Palette/Palette';
import palettes from  './catalogue/palettes.json'
const App = () => {

  console.log(palettes);
  
  return (
    <>
      {palettes.map((palette) => (
        <Palette key={palette.name} paletteInstance={palette}/>
      ))}
    </>

  );

};
export default App;
