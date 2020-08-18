import React from 'react';
import ReactPlayer from 'react-player';
import Loading from '../../utils/Loading';

class LessonVideo extends React.Component {
  state = {
    video: ''
  };

  componentDidMount() {
    this.setState({
      video: `https://modernfightingconcepts.herokuapp.com/api/lessons/videos/${this.props.video}`
    })
  };

  render() {
    return (
      <div>
      <ReactPlayer
        url={`${this.state.video}`}
        controls
        width='100%'
        height='50%'
        playsInline
        loop
        muted
        playing
        onStart={() => this.props.addInProgress(this.props.id)}
        onEnded={() => this.props.addComplete(this.props.id)}
      />
      <video width="320" height="240" controls autoPlay="autoplay" loop muted>
        <source src={`${this.state.video}`} type="video/mp4" />
        <source src={`${this.state.video}`} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
      </div>
    )
  }
};

export default LessonVideo;
