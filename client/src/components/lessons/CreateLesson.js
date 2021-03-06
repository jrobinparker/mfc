import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLesson, uploadVideo } from '../../actions/lesson';
import { loadUser } from '../../actions/auth';
import Loading from '../utils/Loading';
import axios from 'axios';
import './create-lesson.css';

const CreateLesson = ({ loadUser, auth, createLesson, uploadVideo, history }) => {

  const [ formData, setFormData ] = useState({
    title: '',
    rank: '',
    style: '',
    skills: '',
    description: '',
    video: '',
    thumbnail: ''
  });

  useEffect(() => {
    loadUser();
  }, [loadUser])


  const [ videoObj, setVideoObj ] = useState('');
  const [ videoObjName, setVideoObjName ] = useState('Choose Video');
  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [ message, setMessage ] = useState('');
  const [ uploadPercentage, setUploadPercentage ] = useState(0);
  const [ displayProgress, setDisplayProgress ] = useState(false);
  const [ uploadStage, setUploadStage ] = useState(0);

  const { title, rank, style, description, skills } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onVideoChange = e => {
    setVideoObj(e.target.files[0]);
    setVideoObjName(e.target.files[0].name);
  }

  let videoFile, thumbFile

  const onVideoSubmit = e => {
   e.preventDefault();
   const videoData = new FormData();
   videoData.append('video', videoObj);
   //uploadVideo(videoData);
   setUploadStage(1)
   try {
     const config = {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     }

     const res = axios.post('/api/lessons/videos', videoData,
     { config,
       onUploadProgress: progressEvent => {
         setDisplayProgress(true);
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      }).then(async res => {
        const { filename } = res.data.file;
        setUploadStage(2)
        videoFile = filename
        await extractThumbnail(filename)
      }).then(res => {
        setFormData({...formData, video: videoFile, thumbnail: thumbFile})
      })
    } catch(err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }

  }

  const extractThumbnail = async filename => {
    let fileData = { url: `https://modernfightingconcepts.herokuapp.com/api/lessons/videos/${filename}` }

    let fileName
    const response = await axios.post('/api/lessons/temp-thumbnails', fileData)
                    .then(response => {
                          const { success } = response.data
                          console.log(success)
                          thumbFile = success
                          setUploadStage(3)
                        })
    }


  const onSubmit = e => {
    e.preventDefault();
    createLesson(formData, history);
  };

  const uploadStageIcon = stage => {
    switch (stage) {
      case 0:
        return <></>
      case 1:
        return (
          <Fragment>
            <p>Uploading... </p>
            <progress class="progress is-small is-primary" max="100">15%</progress>
          </Fragment>
        )
      case 2:
        return (
          <Fragment>
            <p>Creating video thumbnail... </p>
            <progress class="progress is-small is-primary" max="100">15%</progress>
          </Fragment>
        )
      case 3:
        return <p>Complete!</p>
      default:
        return <></>
    }
  }

  if (auth.loading) {
    return <Loading />
  }

  if (auth.user.role !== 'admin') {
    return <Redirect to='/dashboard' />
  }

  if (auth.user.role === 'admin') {
    return (
      <Fragment>
        <div className="container">
        <nav className="panel">
          <p className="panel-heading">Create a New Lesson</p>
          <div className="form-wizard">
          <form onSubmit={e => onVideoSubmit(e)} style={{ marginBottom: '20px' }}>
            <label className="label">Lesson Video</label>
            <div className="file has-name">
              <label className="file-label">
                <input className="file-input" type="file" name="video" onChange={e => onVideoChange(e)}/>
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Select Video
                  </span>
                </span>
                {!videoObj ? <></> : <span class="file-name">{videoObjName}</span>}
              </label>
              <button type="submit" className="button is-primary" style={{ marginLeft: '2.5%' }}>Upload Video</button>
            </div>
            <div style={{ marginTop: '15px' }}>
              {uploadStageIcon(uploadStage)}
            </div>
          </form>
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
          </nav>
        </div>
      </Fragment>
    )
  }
}

CreateLesson.propTypes = {
  createLesson: PropTypes.func.isRequired,
  uploadVideo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser, createLesson, uploadVideo })(withRouter(CreateLesson));
