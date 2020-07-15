import React from 'react';
import ReorderLessonsList from './ReorderLessonsList';
import { DragDropContext } from 'react-beautiful-dnd';

class ReorderLessons extends React.Component {
  state = {
    column: {
      id: 'column-1',
      lessons: [...this.props.lessons]
    }

  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result
    let movedLesson
    if (!destination) {
      return
    }

    if (
      destination.index === source.index
    ) {
      return
    }

    const newLessons = Array.from(this.state.column.lessons)
     newLessons.map((lesson, i) => {
       const lessonIndex = String(i)
       if (lessonIndex === draggableId) {
         movedLesson = newLessons[i]
       }
     })

     newLessons.splice(source.index, 1)
     newLessons.splice(destination.index, 0, movedLesson)

      this.setState({
        column: {
          lessons: [...newLessons]
        }
      })
  }

  saveAndContinue = e => {
    e.preventDefault()
    const newLessons = this.state.column.lessons
    this.props.updateLessonOrder(newLessons)
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="container">
        <h1 className="title">{this.props.mode}</h1>
          <nav className="panel">
            <p className="panel-heading">Reorder Lessons</p>
            <div className="form-wizard">
              <ReorderLessonsList lessons={this.state.column.lessons} id={this.state.column.id} />
            </div>
          </nav>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={this.goBack} className="button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
          <button onClick={this.saveAndContinue} className="button is-primary" style={{ width: '40%' }}>Next</button>
        </div>
        </div>
    </DragDropContext>
      )
  }
}

export default ReorderLessons
