import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profiles from './Profiles';
import Items from './Items';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { deleteUser } from '../../actions/authActions';
import { getCurrentProfile } from '../../actions/profileActions';
import { getCurrentItems } from '../../actions/itemActions';

class Dashboard extends Component {

  componentDidMount = () => {
    this.props.getCurrentProfile();
    this.props.getCurrentItems();
  }

  onClickHandler = (e) => {
    this.props.deleteUser(this.props.history);
  }

  render() {

    const { user } = this.props.auth;
    const { currentProfile } = this.props.profile;

    const profileButton = isEmpty(currentProfile) ? 
    (<Link to='/create-profile' className='btn btn-outline-light'>Create Profile</Link>) : 
    (<Link to='/edit-profile' className='btn btn-outline-light'>Edit profile</Link>)

    return (
      <div className='profile'>
        <div className="jumbotron jumbotron-fluid mb-4">
          <div className="row mb-4">
            <div className="container">
              <img src={user.avatar} alt="" className="profile-avatar rounded-circle"/>
            </div>
          </div>
          {isEmpty(currentProfile && currentProfile.social) ? null : (<div className="row">
            <div className="col-md-12">
              <p>
                {isEmpty(currentProfile.social.twitter) ? null : (
                  <a 
                    className="text-white p-2" 
                    href={currentProfile.social.twitter}
                    target="_blank"
                    >
                      <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                
                {isEmpty(currentProfile.social.facebook) ? null : (
                  <a 
                    className="text-white p-2" 
                    href={currentProfile.social.facebook}
                    target="_blank"
                    >
                      <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {isEmpty(currentProfile.social.instagram) ? null : (
                  <a 
                    className="text-white p-2" 
                    href={currentProfile.social.instagram}
                    target="_blank"
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )}
              </p>
            </div>
          </div>
          )}
          <div className="row">
            <div className="col-md-12">
              { profileButton }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{borderBottom: '2px solid'}}>
            <Profiles profile={ currentProfile }/>
          </div>
          <div className="col-12 my-5">
          <Items />
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, getCurrentItems, deleteUser })(Dashboard);