import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editLesson, getLesson } from '../../actions/lesson';
import { loadUser } from '../../actions/auth';
import Loading from '../utils/Loading';

const EditLesson = ({ auth, lesson: { lesson, loading }, editLesson, getLesson, history, match }) => {
  const [ formData, setFormData ] = useState({
    title: '',
    rank: '',
    style: '',
    skills: '',
    description: '',
    id: ''
  });

  const { title, rank, style, description, skills } = formData;

  useEffect(() => {
    loadUser();
    getLesson(match.params.id);
    setFormData({
      title: loading || !lesson.title ? '' : lesson.title,
      rank: loading || !lesson.rank ? '' : lesson.rank,
      style: loading || !lesson.style ? '' : lesson.style,
      skills: loading || !lesson.skills ? '' : lesson.skills.join(', '),
      description: loading || !lesson.description ? '' : lesson.description,
      id:  loading || !lesson._id ? '' : lesson._id
    });
  }, [loading, loadUser, match.params.id, getLesson])



  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e, id) => {
    e.preventDefault();
    editLesson(match.params.id, formData, history, true);
  };

  if (auth.loading) {
    return <Loading />
  }

  if (auth.user.role !== 'admin') {
    return <Redirect to='/dashboard' />
  }

  if (auth.user.role === 'admin') {
    return (
        <div className="container">
        <nav className="panel">
          <p className="panel-heading">Edit Lesson</p>
          <div className="form-wizard">
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
        </nav>
      </div>
    )
  }
};

EditLesson.propTypes = {
  editLesson: PropTypes.func.isRequired,
  getLesson: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lesson: state.lesson,
  auth: state.auth
})


export default connect(mapStateToProps, { editLesson, getLesson, loadUser })(withRouter(EditLesson));
