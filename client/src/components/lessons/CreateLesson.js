import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLesson } from '../../actions/lesson';

const CreateLesson = ({ createLesson, history }) => {
  const [ formData, setFormData ] = useState({
    title: '',
    rank: '',
    style: '',
    skills: '',
    description: ''
  })

  const { title, rank, style, description, skills} = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createLesson(formData, history);
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Create a New Lesson</h1>
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
                  <select onChange={e => onChange(e)} name="rank" >
                    <option value="" disabled selected>Select your rank</option>
                    <option name="rank">White</option>
                    <option name="rank">Yellow</option>
                    <option name="rank">Green</option>
                    <option name="rank">Purple</option>
                    <option name="rank">Brown</option>
                    <option name="rank">Black</option>
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
          <button className="button is-primary">Create Lesson</button>
        </form>
      </div>
    </Fragment>
  )
};

CreateLesson.propTypes = {
  createLesson: PropTypes.func.isRequired
};

export default connect(null, { createLesson })(withRouter(CreateLesson));
