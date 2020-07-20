import React, { Fragment, useState, useLayoutEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTrack } from '../../actions/track';
import { getTrack, editTrack } from '../../actions/track';
import { getLessons } from '../../actions/lesson';
import { getCurrentProfile } from '../../actions/profile';
import TitleAndDesc from './TitleAndDesc';
import EditLessons from './EditLessons';
import ReorderLessons from './ReorderLessons';
import ReviewTrack from './ReviewTrack';

class EditTrack extends React.Component {
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
      this.props.getTrack(this.props.match.params.id)
      this.props.getLessons()
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.track || nextProps.trackLessons || nextProps.lessons) {
        this.setState({
          title: nextProps.track.title,
          description: nextProps.track.description,
          rank: nextProps.track.rank,
          style: nextProps.track.style,
          skills: nextProps.track.skills,
          author: nextProps.track.author,
          lessons: nextProps.trackLessons
        })
      }
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
      if (this.state.lessons.length >= 1) {
        this.setState({
          lessons: lessons.filter(lesson => this.state.lessons.some(l => lesson._id !== l._id))
        })
      } else {
        this.setState({
          lessons: this.state.lessons.concat(lessons)
        })
      }

      console.log(this.state.lessons)
    }

    updateLessonOrder = newLessons => {
      this.setState({
        lessons: [...newLessons]
      })
    }

    handleOnSubmit = e => {
      e.preventDefault()
      const trackData = {
        title: this.state.title,
        rank: this.state.rank,
        description: this.state.description,
        lessons: this.state.lessons,
        style: this.state.style,
        skills: this.state.skills
      }
      this.props.editTrack(this.props.match.params.id, trackData, this.props.history);
    }

    render() {
      const { title, description, rank, style, skills } = this.state
      switch (this.state.currentStep) {
        case 1:
          return <TitleAndDesc
                    mode={'Edit Track'}
                    nextStep={this.nextStep}
                    onChange={this.onChange}
                    title={title}
                    description={description}
                    rank={rank}
                    style={style}
                    skills={skills}
                  />
        case 2:
          return <EditLessons
                    mode={'Edit Track'}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    lessons={this.props.lessons}
                    selectedLessons={this.state.lessons}
                    addLessons={this.addLessons}
                  />
        case 3:
          return <ReorderLessons
                    mode={'Edit Track'}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    lessons={this.state.lessons}
                    updateLessonOrder={this.updateLessonOrder}
                  />
        case 4:
          return <ReviewTrack
                    mode={'Edit Track'}
                    buttonText='Update'
                    prevStep={this.prevStep}
                    track={this.state}
                    onSubmit={this.handleOnSubmit}
                  />
        case 5:
          return <Redirect
                    push to={{
                      pathname: '/dashboard'
                    }} />
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
    lessons: state.lesson.lessons,
    track: state.track.track,
    trackLessons: state.track.trackLessons
  })

  export default connect(mapStateToProps, { getCurrentProfile, getLessons, getTrack, createTrack, editTrack })(withRouter(EditTrack))
