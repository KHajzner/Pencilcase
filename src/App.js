import React, {useState, useEffect } from 'react';
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
  arrayMove
} from '@dnd-kit/sortable';
import axios from 'axios';


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

  const [activeId, setActiveId] = useState();

  //Fill In blanks with EmptyPans
  const initialiseEmptyPans = () => {
    return palettes.reduce((acc, palette) => {
      acc[palette.name] = addEmptyPans(mappings[palette.name], palette.maxPans);
      return acc;
    }, {});
  };

  const [allMappings, setAllMappings] = useState(() => initialiseEmptyPans());

  //Saving new mappings to the json
  const saveMappings = async () => {
    try {
      await axios.post('http://localhost:5000/updateMappings', allMappings);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(()=>{
      saveMappings();
  }, [allMappings])

  //Handle Drag Events
  const handleDragStart = (event) => {
    const {active} = event;
    setActiveId(active.id);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over.id;

    const activeContainer = Object.keys(allMappings).find((key) => allMappings[key].includes(activeId))
    const overContainer = Object.keys(allMappings).find((key) => allMappings[key].includes(overId))

    if(activeContainer === overContainer){
      const currentPans =  allMappings[activeContainer]
      const updatedPans = arrayMove(
        currentPans,
        currentPans.indexOf(activeId),
        currentPans.indexOf(overId)
      );
      console.log("hello")
      setAllMappings((prevData) => ({
        ...prevData,
        [activeContainer]: updatedPans
      }))
    }
    else{
      //TODO
    }
  }
  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
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
