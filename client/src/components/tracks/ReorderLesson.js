import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const ReorderLesson = (props) => {
    return (
      <Draggable
        draggableId={String(props.id)}
        index={parseInt(props.index)}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="box" style={{ marginBottom: '15px' }}>{props.lesson.title}</div>
          </div>
        )}
      </Draggable>
    )
}

export default ReorderLesson
