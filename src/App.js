import React, {useState, useEffect, useRef} from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import Palette from './Palette/Palette';
import Pan from './Pan/Pan';
import palettes from  './catalogue/palettes.json'
import addEmptyPans from './utils/addEmptyPans'
import mappings from './catalogue/colourMappings.json'

const App = () => {

    // DnD Kit
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    const initialiseEmptyPans = () =>{
      return palettes.reduce((acc, palette) => {
          acc[palette.name] = addEmptyPans(mappings[palette.name], palette.maxPans, palette.name);
          return acc;
        }, {});
    }
    const [allMappings, setAllMappings] = useState(() => initialiseEmptyPans());
    
    const initialisePalettes = () =>{
      return(
        palettes.map((palette) => ({
          palette: palette,
          items: allMappings[palette.name],
        }))
      )
    }
    const [allPalettes, setAllPalettes] = useState(()=> initialisePalettes());
    
    useEffect(()=>{
      setAllPalettes(() => initialisePalettes());
    },[allMappings]);
    
  //DND Kit 2.0
  const [activeId, setActiveId] = useState();
    console.log(allPalettes);
  const findContainer = (id) => {
    if (id in allMappings) {
      return id;
    }

    return Object.keys(allMappings).find((key) => allMappings[key].includes(id));
  }

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  const handleDragOver = (event) => {
    const { active, over, draggingRect } = event;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }
    
    setAllMappings((prev)=>{
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]

      const activeIndex = activeItems.indexOf(active.id);
      const overIndex = overItems.indexOf(over.id);
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].slice(0, activeIndex),
          prev[overContainer][overIndex], // Add the item from overContainer at newIndex
          ...prev[activeContainer].slice(activeIndex+1)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, overIndex),
          prev[activeContainer][activeIndex], // Add the item from activeContainer at activeIndex
          ...prev[overContainer].slice(overIndex+1)
        ]
      };
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }
    const activeIndex = allMappings[activeContainer].indexOf(active.id);
    const overIndex = allMappings[overContainer].indexOf(over.id);
    if (activeIndex !== overIndex) {
      setAllMappings((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
  }
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {allPalettes.map((items) => (
          <Palette key={items.palette.name} id={items.palette.name} palette={items.palette} items={items.items} activeId={activeId}
          />
        ))}
        <DragOverlay>{activeId ? <Pan id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </>

  );

};
export default App;
