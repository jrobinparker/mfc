import React, { Fragment, useState, useLayoutEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTrack } from '../../actions/track';
import { getLessons } from '../../actions/lesson';
import { getCurrentProfile } from '../../actions/profile';
import { loadUser } from '../../actions/auth';
import TitleAndDesc from './TitleAndDesc';
import AddLessons from './AddLessons';
import ReorderLessons from './ReorderLessons';
import ReviewTrack from './ReviewTrack';
import Loading from '../utils/Loading';

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
      this.props.loadUser()
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

    onSubmit = () => {
      const trackData = {
        title: this.state.title,
        rank: this.state.rank,
        style: this.state.style,
        skills: this.state.skills,
        description: this.state.description,
        lessons: this.state.lessons,
        author: this.props.profile.handle,
        authorId: this.props.auth.user.id
      }
      this.props.createTrack(trackData, this.props.history)
    }

    render() {
      if (this.props.auth.loading) {
        return <Loading />
      }

      if (this.props.auth.user.role !== 'admin') {
        return <Redirect to='/dashboard' />
      }

      if (this.props.auth.user.role === 'admin') {
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
          case 2:
            return <AddLessons
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      lessons={this.props.lessons}
                      selectedLessons={this.state.lessons}
                      addLessons={this.addLessons}
                    />
          case 3:
            return <ReorderLessons
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      lessons={this.state.lessons}
                      updateLessonOrder={this.updateLessonOrder}
                    />
          case 4:
            return <ReviewTrack
                      prevStep={this.prevStep}
                      track={this.state}
                      onSubmit={this.onSubmit}
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
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile.profile,
    lessons: state.lesson.lessons
  })

  export default connect(mapStateToProps, { getCurrentProfile, getLessons, createTrack, loadUser })(withRouter(CreateTrack))
