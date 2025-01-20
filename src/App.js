import React, {useState} from 'react';
import {
  DndContext, 
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import Palette from './Palette/Palette';
import Pan from './Pan/Pan';

import addEmptyPans from './utils/addEmptyPans'

import palettes from  './catalogue/palettes.json'
import mappings from './catalogue/colourMappings.json'

const App = () => {

  // DnD Kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //Fill In blanks with EmptyPans
  const initialiseEmptyPans = () => {
    return palettes.reduce((acc, palette) => {
      acc[palette.name] = addEmptyPans(mappings[palette.name], palette.maxPans);
      return acc;
    }, {});
  };

  const [allMappings, setAllMappings] = useState(() => initialiseEmptyPans());
  const [activeId, setActiveId] = useState();

  //Handle Drag Events
  const handleDragStart = (event) => {
    const {active} = event;
    setActiveId(active.id);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
      >
        {Object.keys(allMappings).map((name) => (
          <Palette
            id={name}
            items={allMappings[name]}
            activeId={activeId}
            key={name}
          />
        ))}
        <DragOverlay>{activeId ? <Pan id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </>
  );

};
export default App;
