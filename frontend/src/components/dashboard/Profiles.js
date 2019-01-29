import React from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import ReadField from '../common/ReadField';

const Profile = (props) => {

  const profile = props.profile;

  const profileContent = !isEmpty(profile) ?
    (<div className="row mt-3">
      <div className="col-md-6">
        <ReadField
          value={profile.familyName}
          label="Family Name"
        />
      </div>
      <div className="col-md-6">
        <ReadField
          value={profile.lastName}
          label="Last Name"
        /> 
      </div>
      <div className="col-md-12">
        <ReadField
          value={profile.birthday}
          label="Birthday"
          type='Date'
        /> 
      </div>
      <div className="col-md-12">
        <ReadField
          value={profile.telephoneNumber}
          label="Telephone"
        />
      </div>
      <div className="col-md-4">
        <ReadField
          value={profile.state}
          label="State"
        />
      </div> 
      <div className="col-md-8 mb-3">
        <ReadField
          value={profile.city}
          label="City"
        />
      </div>
    </div>) :
    (<div className="row mt-3">
      <div className="col-md-12 mt-2">
        <h5>You don't have a profile yet, go to create <Link to='/create-profile'>one</Link> ?</h5>
      </div>
    </div>)

  return (
    <div id="dashboard-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="display-4">Profile</h2>
          </div> 
        </div>
        {profileContent}
      </div>
    </div>
  );
}

export default Profile;