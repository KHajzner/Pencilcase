import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import Container from './Container/Container';
import Pan from './Pan/Pan';

const App = () => {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Pan id="draggable">Drag me</Pan>
  );

  return (
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
  );

  function handleDragEnd(event) {
    const {over} = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};
export default App;
