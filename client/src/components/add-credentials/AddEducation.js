import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addEducation } from '../../actions/profileActions'


class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
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

    this.props.addEducation(this.state, this.props.history)
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md8 m-auto">
             <Link to="/dashboard" className="btn btn-light">Go back</Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p>Add any school, bootcamp, etc, that you have attended.</p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
                placeholder="* School"
                name="school"
                value={this.state.school} 
                onChange={this.onChange}
                error={errors.school}
              />
              <TextFieldGroup 
                placeholder="* Certification"
                name="degree"
                value={this.state.degree} 
                onChange={this.onChange}
                error={errors.degree}
              />
              <TextFieldGroup 
                placeholder="Field of Study"
                name="fieldofstudy"
                value={this.state.fieldofstudy} 
                onChange={this.onChange}
                error={errors.fieldofstudy}
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
                    Currently Attending
                   </label>
              
              </div>
              <TextAreaFieldGroup 
                placeholder="Program Description"
                name="description"
                value={this.state.description} 
                onChange={this.onChange}
                error={errors.description}
                info="Tell us more about the program"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))

