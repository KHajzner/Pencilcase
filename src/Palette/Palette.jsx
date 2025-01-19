
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

  const [paletteState, setPaletteState] = useState(palette.case_closed)
  const handleMouseEnter = () => {
    if (paletteState !== palette.case_open){
      setPaletteState(palette.case_hover);
    }
  };
  const handleMouseLeave = () => {
    if (paletteState !== palette.case_open){
      setPaletteState(palette.case_closed);
    }
  };
  const handleClick = () => {
    const newState = paletteState === palette.case_open ? palette.case_closed :palette.case_open
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
  const imageLink = require('../Items/Casings/' + paletteState)

  const containerStyle = {
    backgroundImage: `url(${imageLink})`, 
    backgroundPosition: "center",
    height: palette.height,
    width: palette.width,
    display: "grid",
    gridTemplateColumns: "auto auto auto",
  }

  return(
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <button className='palette' style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
          {paletteState === palette.case_open && (
          <SortableContext items={items} >
            {items.map(id => <Pan key={id.uid} id={id} colour={id.colour} />)}
          </SortableContext>) 
          }
        </button>
      </DndContext>
    </>
  )
}
 
export default Palette;