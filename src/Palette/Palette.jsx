
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import './Palette.css';
import Pan from '../Pan/Pan';
import addEmptyPans from '../utils/addEmptyPans'
const Palette = (
    paletteInstance
) => {
  const palette = paletteInstance.paletteInstance;

  const imageLink = require('../Items/Casings/' + palette.case_closed)
  
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
        const oldIndex = items.map(e => e.uid).indexOf(active.id)
        const newIndex = items.map(e => e.uid).indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  const containerStyle = {
    backgroundImage: `url(${imageLink})`, 
    backgroundPosition: "center",
    height: palette.height,
     width: palette.width,
     zIndex: 1,
  }

    return(
      <>
            <DndContext   sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <div className='palette' style={containerStyle} >

              <SortableContext items={items}  strategy={verticalListSortingStrategy}>
                {items.map(({uid, colour}) => <Pan key={uid} id={uid} colour={colour} />)}
              </SortableContext>
              
              </div>
            </DndContext>
        </>
    )
}
 
export default Palette;