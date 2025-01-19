
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
    paletteInstance
) => {
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
  //Add empty pans
  const pans = addEmptyPans(palette.filledPans, palette.maxPans);
  const [items, setItems] = useState(pans);

  // DnD Kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  //Styles
  const imageLink = require('../Items/Casings/' + palette.image[paletteState])
  const lidHeight =  parseInt((palette.height["open"]).replace("px", "")) - parseInt((palette.height["closed"]).replace("px", ""))
  console.log(lidHeight)
  const containerStyle = {
    backgroundImage: `url(${imageLink})`, 
    backgroundPosition: "center",
    height: palette.height[paletteState],
    width: palette.width,
    paddingTop: (lidHeight-25) + "px",
  }

  return(
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <button className='palette' style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
          {paletteState === "open" && (
          <SortableContext items={items} >
            {items.map(id => <Pan key={id.uid} id={id} colour={id.colour} height={palette.height["closed"]} />)}
          </SortableContext>) 
          }
        </button>
      </DndContext>
    </>
  )
}
 
export default Palette;