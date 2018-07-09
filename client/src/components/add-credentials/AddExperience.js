import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addExperience } from '../../actions/profileActions'


class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      disabled: false,
      errors: {}
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    this.props.addExperience(this.state, this.props.history)
  }

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md8 m-auto">
             <Link to="/dashboard" className="btn btn-light">Go back</Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p>Add any posision that you have had in the past or current position.</p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
                placeholder="* Company"
                name="company"
                value={this.state.company} 
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup 
                placeholder="* Job Title"
                name="title"
                value={this.state.title} 
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup 
                placeholder="Location"
                name="location"
                value={this.state.location} 
                onChange={this.onChange}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup 
                type="date"
                name="from"
                value={this.state.from} 
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup 
                type="date"
                name="to"
                value={this.state.to} 
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? 'disabled' : ''}
              />
              <div className="form-check mb-4">
                <input 
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                  />
                  <label 
                    htmlFor="current"
                    className="form-check-label">
                    Current Job
                   </label>
              
              </div>
              <TextAreaFieldGroup 
                placeholder="Job Description"
                name="description"
                value={this.state.description} 
                onChange={this.onChange}
                error={errors.description}
              />
              <input className="btn btn-info btn-block mt-4" type="submit" />
            </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience))

