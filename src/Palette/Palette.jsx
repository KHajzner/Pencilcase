
import React, { useState } from "react";
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import './Palette.css';
import Pan from '../Pan/Pan';
import addEmptyPans from '../utils/addEmptyPans'
const Palette = (
   { paletteInstance }
) => {
  const items = paletteInstance.items;
  const palette = paletteInstance.paletteInstance;

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
          <SortableContext items={items} >
            {items.map(id => <Pan key={id.uid} id={id} colour={id.colour} height={palette.height["closed"]} />)}
          </SortableContext>) 
          }
        </button>

    </>
  )
}
 
export default Palette;