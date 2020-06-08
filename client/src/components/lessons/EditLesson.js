import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLesson, getLesson } from '../../actions/lesson';

const EditLesson = ({ lesson: { lesson, loading }, createLesson, getLesson, history, match }) => {
  const [ formData, setFormData ] = useState({
    title: '',
    rank: '',
    style: '',
    skills: '',
    description: ''
  });

  const { title, rank, style, description, skills} = formData;

  useEffect(() => {
    getLesson(match.params.id);
    console.log(lesson)
    setFormData({
      title: loading || !lesson.title ? '' : lesson.title,
      rank: loading || !lesson.rank ? '' : lesson.rank,
      style: loading || !lesson.style ? '' : lesson.style,
      skills: loading || !lesson.skills ? '' : lesson.skills.join(', '),
      description: loading || !lesson.description ? '' : lesson.description
    });
  }, [loading])



  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createLesson(formData, history, true);
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Edit Lesson</h1>
        <form onSubmit={e => onSubmit(e)}>
          <div className="field">
            <label className="label">Title</label>
              <div class="control">
                <input
                  className="input"
                  type='input'
                  value={title}
                  name='title'
                  placeholder='Lesson title'
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">About the lesson</label>
                <div class="control">
                  <textarea
                    className="textarea"
                    value={description}
                    name='description'
                    placeholder='This lesson covers...'
                    onChange={e => onChange(e)}
                  />
              </div>
            </div>
            <div className="field">
              <label className="label">Rank</label>
                <div class="select">
                  <select onChange={e => onChange(e)} name="rank" value={rank}>
                    <option value="">None</option>
                    <option>White</option>
                    <option>Yellow</option>
                    <option>Green</option>
                    <option>Blue</option>
                    <option>Purple</option>
                    <option>Brown</option>
                    <option>Black</option>
                  </select>
                </div>
              </div>
          <div className="field">
            <label className="label">Styles</label>
              <div class="control">
                <input
                  className="input"
                  type='input'
                  value={style}
                  name='style'
                  placeholder='Enter the lesson style'
                  onChange={e => onChange(e)}
                />
            </div>
        </div>
        <div className="field">
          <label className="label">Skills</label>
            <div class="control">
              <input
                className="input"
                type='input'
                value={skills}
                name='skills'
                placeholder='Enter the lesson skills (comma separated)'
                onChange={e => onChange(e)}
              />
          </div>
      </div>
          <button className="button is-primary">Update</button>
        </form>
      </div>
    </Fragment>
  )
};

EditLesson.propTypes = {
  createLesson: PropTypes.func.isRequired,
  getLesson: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lesson: state.lesson
})


export default connect(mapStateToProps, { createLesson, getLesson })(withRouter(EditLesson));
