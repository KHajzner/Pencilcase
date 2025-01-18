
import React, {useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const Pan = (props) => { 
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const panColour = require('../Items/Colours/' + props.colour + '.png')
  const panStyle = {
    backgroundImage: `url(${panColour})`, 
    backgroundPosition: "center",
    backgroundSize: "contain",
    zIndex: 10,
    height: "100px",
    width: "100px"
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div style={panStyle} />
    </div>
  );}

export default Pan;