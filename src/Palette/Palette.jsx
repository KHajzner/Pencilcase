import React, {useState} from 'react';

import './Palette.css';

const Palette = (
    paletteInstance
) => {
  const palette = paletteInstance.paletteInstance;
  const links = './Casings/' + palette.case_closed

    return(
        <div className='palette' styles={{}}>
            <img src={require(`${links}`)} alt="Lavender Open" className='casing'/>
        </div>
    )
}

export default Palette;