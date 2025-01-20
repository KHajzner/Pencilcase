
import React, { useState } from "react";
import {
  useDroppable
} from '@dnd-kit/core';
import {
  SortableContext,
} from '@dnd-kit/sortable';

import './Palette.css';

import Pan from '../Pan/Pan';
import palettes from  '../catalogue/palettes.json'

const Palette = (props
) => {
  const { id, items } = props;
  const { setNodeRef } = useDroppable({ id });
  const palette = palettes.find(instance => instance.name === id)

  //States
  const [paletteState, setPaletteState] = useState("closed")
  const handleMouseEnter = () => {
    if (paletteState !== "open"){
      setPaletteState("hover");
    }
  };
  const handleMouseLeave = () => {
    if (paletteState !== "open"){
      setPaletteState("closed");
    }
  };
  const handleClick = () => {
    const newState = paletteState === "open" ? "closed" : "open"
    setPaletteState(newState);
  };

  //Styles
  const imageLink = require('../Items/Casings/' + palette.image[paletteState])
  const lidHeight =  parseInt((palette.height["open"]).replace("px", "")) - parseInt((palette.height["closed"]).replace("px", ""))
  const containerStyle = {
    backgroundImage: `url(${imageLink})`, 
    backgroundPosition: "center",
    height: palette.height[paletteState],
    width: palette.width,
    padding: `${(lidHeight-25) + 'px'} 10px 0 10px`,
  }

  return(
    <>
        <button className='palette' style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
          {paletteState === "open" && (
          <SortableContext items={items} id={id} >
            <div ref={setNodeRef}>
              {items.map(id => <Pan key={id.uid} id={id} colour={id.colour} height={palette.height["closed"]}/>)}
            </div>
          </SortableContext>) 
          }
        </button>

    </>
  )
}
 
export default Palette;