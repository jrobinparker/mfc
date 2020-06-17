import React from 'react';
import ReorderLesson from './ReorderLesson';
import { Droppable } from 'react-beautiful-dnd';

const ReorderLessonsList = ({ lessons }) =>{

      return (
        <Droppable droppableId='column-1'>
          {provided => (

            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              >
              {lessons.map((lesson, index) => {
                return <ReorderLesson lesson={lesson} id={index} index={index} />
              })}
              {provided.placeholder}
            </div>
          )}

        </Droppable>
      )
}

export default ReorderLessonsList;
