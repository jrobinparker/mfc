import React, { Fragment, useState, useLayoutEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTrack } from '../../actions/track';
import { getLessons } from '../../actions/lesson';
import { getCurrentProfile } from '../../actions/profile';
import TitleAndDesc from './TitleAndDesc';

class CreateTrack extends React.Component {
    state = {
      currentStep: 1,
      title: '',
      description: '',
      rank: '',
      style: '',
      skills: '',
      lessons: [],
      author: ''
    }

    componentDidMount() {
      this.props.getCurrentProfile()
      this.props.getLessons()
    }

    nextStep = () => {
      let currentStep = this.state.currentStep;
     // Make sure currentStep is set to something reasonable
      if (currentStep >= 5) {
       currentStep = 5;
      } else {
        currentStep = currentStep + 1;
      }

     this.setState({
       currentStep: currentStep
     });
    }

    prevStep = () => {
     let currentStep = this.state.currentStep;
     if (currentStep <= 1) {
       currentStep = 1;
     } else {
       currentStep = currentStep - 1;
     }

     this.setState({
       currentStep: currentStep
     });
   }

    onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    addLessons = lessons => {
      const newLessons = lessons
      this.setState({
        lessons: this.state.lessons.concat(newLessons)
      })
    }

    updateLessonOrder = newLessons => {
      this.setState({
        lessons: [...newLessons]
      })
    }

    onSubmit = e => {
      e.preventDefault()
      const trackData = {
        title: this.state.title,
        rank: this.state.rank,
        description: this.state.description,
        lessons: this.state.lessons,
        author: this.props.profile.handle,
        authorId: this.props.auth.user.id
      }
      this.props.createTrack(trackData)
      this.nextStep()
    }

    render() {
      const { title, description, rank, style, skills } = this.state
      switch (this.state.currentStep) {
        case 1:
          return <TitleAndDesc
                    nextStep={this.nextStep}
                    onChange={this.onChange}
                    title={title}
                    description={description}
                    rank={rank}
                    style={style}
                    skills={skills}
                  />
        default:
          return <TitleAndDesc
                    nextStep={this.nextStep}
                    onChange={this.onChange}
                    title={title}
                    description={description}
                    rank={rank}
                    style={style}
                    skills={skills}
                  />
      }
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile.profile,
    lessons: state.lesson.lessons
  })

  export default connect(mapStateToProps, { getCurrentProfile, getLessons, createTrack })(CreateTrack)
