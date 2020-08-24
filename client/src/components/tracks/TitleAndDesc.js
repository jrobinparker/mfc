import React, { Fragment } from 'react';

const TitleAndDesc = ({ mode, title, description, rank, style, skills, onChange, nextStep }) => {

  const saveAndContinue = e => {

    e.preventDefault()

    nextStep()
  }


  return (
    <Fragment>
          <div className="container">
            <h1 className="title">{mode}</h1>
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
                        <option value="" disabled selected>Select rank</option>
                        <option name="rank">Beginner</option>
                        <option name="rank">Intermediate</option>
                        <option name="rank">Expert</option>
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
