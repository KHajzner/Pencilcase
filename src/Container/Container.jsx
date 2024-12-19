import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import './Container.css'

const Container = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  return (
    <div ref={setNodeRef} style={style} className="container">
      {props.children}
    </div>
  );
}

export default Container;