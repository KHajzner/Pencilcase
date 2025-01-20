
import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const Pan = ({id}) => { 
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id});

    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "inline-grid",

    };

    const panImage = require('../Items/Colours/' + id.colour + '.png')
    const panStyle = {
        backgroundImage: `url(${panImage})`, 
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "80px",
        width: "70px",
        marginRight: "10px",
        opacity: isDragging? 0.5 : 1
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={panStyle} />
        </div>
    );
}

export default Pan;