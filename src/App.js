import React, {useState, useEffect, useRef} from 'react';
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
import Palette from './Palette/Palette';
import palettes from  './catalogue/palettes.json'
import addEmptyPans from './utils/addEmptyPans'

const App = () => {

    // DnD Kit
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    const initialisePalettes = (isRerender, whichPalette=null, updatedItems=null) =>{
      return(
        palettes.map((palette) => ({
          paletteInstance: palette,
          items: isRerender && whichPalette === palette.name ? updatedItems : addEmptyPans(palette.filledPans, palette.maxPans, palette.name),
        }))
      )
    }
    const [allPalettes, setAllPalettes] = useState(()=> initialisePalettes(false));
    // const [dragEvent, setDragEvent] = useState(null); 

    const handleDragEnd = (event) => {
      const {active, over} = event;
      if (active.id !== over.id) {
        if(active.id["palette"] === over.id["palette"]){
           console.log("Same palette")
          const currentItems = allPalettes.find(item => item.paletteInstance.name === active.id["palette"]).items
          const updatedItems = arrayMove(
            currentItems,
            currentItems.indexOf(active.id),
            currentItems.indexOf(over.id)
          );
          setAllPalettes(
            (prevPalettes) => prevPalettes.map((palette) => {
            if (palette.paletteInstance.name === over.id["palette"]) {
              return { ...palette, items: updatedItems };
            }
            return  palette ;
          }))
        }
        else{
          const activeItems = allPalettes.find(item => item.paletteInstance.name === active.id["palette"]).items
          const overItems = allPalettes.find(item => item.paletteInstance.name === over.id["palette"]).items
          const activePalette = active.id["palette"]
          const overPalette = over.id["palette"]
          const newActiveItems = activeItems.map((item, i) => {
            if (i == activeItems.indexOf(active.id)){
              const wantedOverItem = overItems[overItems.indexOf(over.id)]
              wantedOverItem["palette"] = activePalette
              return item = wantedOverItem
            }
            else{
              return item = activeItems[i]
            } 
          })
          const newOverItems = overItems.map((item, i) => {
            if (i == overItems.indexOf(over.id)){
              const wantedItem = activeItems[activeItems.indexOf(active.id)]
              wantedItem["palette"] = overPalette
              return item = wantedItem
            }
            else{
              return item = overItems[i]
            }
          })

          setAllPalettes(
            (prevPalettes) => prevPalettes.map((palette) => {
            if (palette.paletteInstance.name === overPalette) {
              return { ...palette, items: newOverItems };
            }
            else if (palette.paletteInstance.name === overPalette) {
              return  { ...palette, items: newActiveItems };
            }
            return palette;
          }))
        }
      }
    }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {allPalettes.map((items) => (
          <Palette key={items.name} paletteInstance={items}
          />
        ))}
      </DndContext>
    </>

  );

};
export default App;
