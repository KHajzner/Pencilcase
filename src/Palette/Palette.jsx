import React, {useState} from 'react';

import './Palette.css';
import Container from '../Container/Container';
import Pan from '../Pan/Pan';
import {DndContext} from '@dnd-kit/core';

const Palette = (
    paletteInstance
) => {
    const palette = paletteInstance.paletteInstance;
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Pan id="draggable">Drag me</Pan>
  );
  const links = './Casings/' + palette.case_closed
  console.log(palette)
    return(
        <div className='palette' styles={{}}>
            <DndContext onDragEnd={handleDragEnd}>
                        {parent === null ? draggableMarkup : null}
                        {containers.map((id) => (
                        // We updated the Droppable component so it would accept an `id`
                        // prop and pass it to `useDroppable`
                        <Container key={id} id={id}>
                            {parent === id ? draggableMarkup : 'Drop here'}
                        </Container>
                        ))}
            </DndContext>
            <img src={require(`${links}`)} alt="Lavender Open" className='casing'/>
        </div>
    )
    function handleDragEnd(event) {
        const {over} = event;
    
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
      }
}

export default Palette;