
import React from 'react';
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
    display: "inline-grid",
    };

    const panImage = require('../Items/Colours/' + props.colour + '.png')
    const panStyle = {
        backgroundImage: `url(${panImage})`, 
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "90px",
        width: "80px",
        margin: "auto",
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={panStyle} />
        </div>
    );
}

export default Pan;