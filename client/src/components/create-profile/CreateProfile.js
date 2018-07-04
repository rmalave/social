import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import { createProfile } from '../../actions/profileActions'
import { withRouter } from 'react-router-dom'

class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
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

    this.props.createProfile(this.state, this.props.history)
  }

  displaySocialInputs = () => {
    this.setState({
      displaySocialInputs: !this.state.displaySocialInputs
    })
  }

  render() {
    const { errors, displaySocialInputs } = this.state
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
         <InputGroup 
          placeholder="Twitter profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.tiwtter}
         />
        <InputGroup 
          placeholder="Facebook profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
         />
        <InputGroup 
          placeholder="Instagram profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
         />
        <InputGroup 
          placeholder="Youtube profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
         />
        <InputGroup 
          placeholder="LinkedIn profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={this.state.linkedin}
          onChange={this.onChange}
          error={errors.linkedin}
         />
        </div>
      )
    }

    // select options for status
    const options = [
      {label: '* Select Professoinal Status', value: 0},
      {label: 'Developer', value: 'Developer'},
      {label: 'Junior Developer', value: 'Junior Developer'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: 'Student', value: 'Student'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Other', value: 'Other'}
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center display-4">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc."
                />
                <SelectListGroup 
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career."
                />
                <TextFieldGroup 
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Your own company or one you work for."
                />
                <TextFieldGroup 
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Link to your website or company website."
                />
                <TextFieldGroup 
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)."
                />
                <TextFieldGroup 
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma-separated values (eg. HTML, CSS, JavaScript."
                />
                <TextFieldGroup 
                  placeholder="githubusername"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a github link, include your username."
                />
                <TextAreaFieldGroup 
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us something about yourself."
                />


               <div className="mb-3">
                 <button className="btn btn-light"
                 onClick={this.displaySocialInputs}>
                 Add Social Network
                 </button>
                 <span className="text-muted">optional</span>
                 {socialInputs}
               </div>
               <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))