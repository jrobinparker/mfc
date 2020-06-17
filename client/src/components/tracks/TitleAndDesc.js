import React, { Fragment, useState } from 'react';

const TitleAndDesc = ({ title, description, rank, style, skills, onChange, nextStep }) => {

  const saveAndContinue = e => {

    e.preventDefault()

    nextStep()
  }


  return (
    <Fragment>
          <div className="container">
            <h1 className="title">Create a New Track</h1>
            <nav className="panel">
              <p className="panel-heading">About the Track</p>
            <div className="form-wizard">
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
                  <label className="label">About the track</label>
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
                      placeholder='Enter the style(s) covered in this track'
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
                    placeholder='Enter the skills covered in this track (comma separated)'
                    onChange={e => onChange(e)}
                  />
              </div>
          </div>
              <button className="button is-primary" onClick={e => saveAndContinue(e)}>Next</button>
            </div>
            </nav>
          </div>
        </Fragment>
    )
}

export default TitleAndDesc
