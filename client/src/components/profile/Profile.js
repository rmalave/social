import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getProfileByHandle } from '../../actions/profileActions'

import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import Spinner from '../common/Spinner'

class Profile extends Component {

  componentDidMount = () => {
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    let profileContent

    if(!profile || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
          <div>
            <div className="col-md-12">
              <Link to="/profiles" className="btn btn-light mb-3">
                Back to profiles
              </Link>
            </div>
            <div>
              <ProfileHeader profile={profile}/>
              <ProfileAbout />
              <ProfileCreds />
              <ProfileGithub />
            </div>
          </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="column-md-12">
              {profileContent}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
