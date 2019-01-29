import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profiles from './profile';
import Items from './Items';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { getProfile } from '../../actions/profileActions';
import { getItemsByUser } from '../../actions/itemActions';

class User extends Component {

  componentDidMount = () => {
    this.props.getProfile(this.props.match.params.id);
    this.props.getItemsByUser(this.props.match.params.id);
  }

  render() {

    const { profile } = this.props.profile;
    const { items } = this.props.item;

    return (
      <div className='profile'>
        <div className="jumbotron jumbotron-fluid mb-4">
          <div className="row mb-4">
            <div className="container">
              {isEmpty(profile) ? null : <img src={profile.user.avatar} alt="" className="profile-avatar rounded-circle"/>}
              {isEmpty(profile) ? null : <h4 className="text-white mt-4">{ profile.user.name }</h4>}
            </div>
          </div>
          {isEmpty(profile && profile.social) ? null : (<div className="row">
            <div className="col-md-12">
              <p>
                {isEmpty(profile.social.twitter) ? null : (
                  <a 
                    className="text-white p-2" 
                    href={profile.social.twitter}
                    target="_blank"
                    >
                      <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                
                {isEmpty(profile.social.facebook) ? null : (
                  <a 
                    className="text-white p-2" 
                    href={profile.social.facebook}
                    target="_blank"
                    >
                      <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social.instagram) ? null : (
                  <a 
                    className="text-white p-2" 
                    href={profile.social.instagram}
                    target="_blank"
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )}
              </p>
            </div>
          </div>
          )}
        </div>
        <div className="row">
          <div className="col-12" style={{borderBottom: '2px solid'}}>
            <Profiles profile={ profile }/>
          </div>
          <div className="col-12 my-5">
            {isEmpty(items) ? null : <Items items={ items }/>}
          </div>
        </div>
      </div>
    )
  }
}

User.propTypes = {
  profile: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  item: state.item
});

export default connect(mapStateToProps, { getProfile, getItemsByUser })(User);