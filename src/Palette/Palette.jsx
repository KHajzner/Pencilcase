import React, {useState} from 'react';
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

const Palette = (
    paletteInstance
) => {
  const palette = paletteInstance.paletteInstance;
  const links = require('../Items/Casings/' + palette.case_closed)
  const [items, setItems] = useState([1, 2, 3]);

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
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  const containerStyle = {
    backgroundImage: `url(${links})`, 
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
                {items.map(id => <Pan key={id} id={id} colour="EmptyPan"/>)}
              </SortableContext>
              </div>
            </DndContext>
        </>
    )
}

export default Palette;