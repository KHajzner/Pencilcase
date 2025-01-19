
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

    const panImage = require('../Items/Colours/' + props.id.colour + '.png')
    const panStyle = {
        backgroundImage: `url(${panImage})`, 
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "80px",
        width: "70px",
        marginRight: "10px",
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={panStyle} />
        </div>
    );
}

export default Pan;