import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from '../common/InputField';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
import { changeAvatar } from '../../actions/authActions';
import SelectField from '../common/SelectField';

class CreateProfile extends Component {

  state = {
    familyName: '',
    lastName: '',
    birthday: '',
    telephoneNumber: '',
    state: '',
    city: '',
    facebook: '',
    twitter: '',
    instagram: '',
    errors: {},
    displaySocialInputs: false
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    
    const newProfile = {
      familyName: this.state.familyName,
      lastName: this.state.lastName,
      birthday: this.state.birthday,
      telephoneNumber: this.state.telephoneNumber,
      state: this.state.state,
      city: this.state.city,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      instagram: this.state.instagram
    }

    this.props.createProfile(newProfile, this.props.history);
  }

  openDialog = (e) => {
    this.props.changeAvatar(e.target.files[0]);
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  render() {
    
    const { auth, errors } = this.props;

    let socialInputs;

    const stateOptions = [
      {value: "AL", label: "Alabama"},
      {value: "AR" ,label: "Arkansas"},
      {value: "CA" ,label: "California"},
      {value: "CO" ,label: "Colorado"},
      {value: "CT" ,label: "Connecticut"},
      {value: "DE" ,label: "Delaware"},
      {value: "DC" ,label: "District Of Columbia"},
      {value: "FL" ,label: "Florida"},
      {value: "GA" ,label: "Georgia"},
      {value: "HI" ,label: "Hawaii"},
      {value: "ID" ,label: "Idaho"},
      {value: "IL" ,label: "Illinois"},
      {value: "IN" ,label: "Indiana"},
      {value: "IA" ,label: "Iowa"},
      {value: "KS" ,label: "Kansas"},
      {value: "KY" ,label: "Kentucky"},
      {value: "LA" ,label: "Louisiana"},
      {value: "ME" ,label: "Maine"},
      {value: "MD" ,label: "Maryland"},
      {value: "MA" ,label: "Massachusetts"},
      {value: "MI" ,label: "Michigan"},
      {value: "MN" ,label: "Minnesota"},
      {value: "MS" ,label: "Mississippi"},
      {value: "MO" ,label: "Missouri"},
      {value: "MT" ,label: "Montana"},
      {value: "NE" ,label: "Nebraska"},
      {value: "NV" ,label: "Nevada"},
      {value: "NH" ,label: "New Hampshire"},
      {value: "NJ" ,label: "New Jersey"},
      {value: "NM" ,label: "New Mexico"},
      {value: "NY" ,label: "New York"},
      {value: "NC" ,label: "North Carolina"},
      {value: "ND" ,label: "North Dakota"},
      {value: "OH" ,label: "Ohio"},
      {value: "OK" ,label: "Oklahoma"},
      {value: "OR" ,label: "Oregon"},
      {value: "PA" ,label: "Pennsylvania"},
      {value: "RI" ,label: "Rhode Island"},
      {value: "SC" ,label: "South Carolina"},
      {value: "SD" ,label: "South Dakota"},
      {value: "TN" ,label: "Tennessee"},
      {value: "TX" ,label: "Texas"},
      {value: "UT" ,label: "Utah"},
      {value: "VT" ,label: "Vermont"},
      {value: "VA" ,label: "Virginia"},
      {value: "WA" ,label: "Washington"},
      {value: "WV" ,label: "West Virginia"},
      {value: "WI" ,label: "Wisconsin"},
      {value: "WY" ,label: "Wyoming"}
    ];

    if (this.state.displaySocialInputs) {
      socialInputs = (
        <div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <InputField
                name="facebook"
                placeholder="Facebook"
                label="Facebook"
                value={ this.state.facebook }
                error={ errors.facebook }
                onChange={ this.onChangeHandler }
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <InputField
                name="twitter"
                placeholder="Twitter"
                label="Twitter"
                value={ this.state.twitter }
                error={ errors.twitter }
                onChange={ this.onChangeHandler }
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <InputField
                name="instagram"
                placeholder="Instagram"
                label="Instagram"
                value={ this.state.instagram }
                error={ errors.instagram }
                onChange={ this.onChangeHandler }
              />
            </div>
          </div> 
        </div>
      );
    }

    return (
      <div id='create-profile'>
        <div className="jumbotron jumbotron-fluid mb-4">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="container">
                <img src={auth.user.avatar} alt="" className="profile-avatar rounded-circle"/>
                <input 
                  style={{display: 'none'}} 
                  type='file' 
                  onChange={this.openDialog} 
                  ref={fileInput => this.fileInput = fileInput}
                  accept=".jpg,.jpeg,.png"
                />
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <button className="btn btn-outline-light" onClick={() => this.fileInput.click()}>Change avatar</button>
            </div>
          </div>
        </div>
        <div className="dashboard-profile">
          <div className="container">
            <div className="row justify-cotent-center mt-2">
              <div className="col-md-12">
                <h1 className="display-4">Your Profile</h1>
              </div>
            </div>
            <form noValidate onSubmit={ this.onSubmitHandler }>
              <div className="row justify-content-center mt-3">
                <div className="col-md-5">
                  <InputField
                    name='familyName'
                    placeholder='Mark'
                    label='Family Name'
                    value={ this.state.familyName }
                    error={ errors.familyName }
                    onChange={ this.onChangeHandler }
                  />
                </div>
                <div className="col-md-5">
                  <InputField
                    name='lastName'
                    placeholder='Otto'
                    label='Last Name'
                    value={ this.state.lastName }
                    error={ errors.lastName }
                    onChange={ this.onChangeHandler }
                  />
                </div> 
              </div> 
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <InputField
                    name='birthday'
                    label='Birthday'
                    type='Date'
                    value={ this.state.birthday }
                    error={ errors.birthday }
                    onChange={ this.onChangeHandler }
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <InputField
                    name='telephoneNumber'
                    placeholder='Telephone'
                    label='Telephone'
                    value={ this.state.telephoneNumber }
                    error={ errors.telephoneNumber }
                    onChange={ this.onChangeHandler }
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-4">
                  <SelectField
                    name="state"
                    value={ this.state.state }
                    label="State"
                    onChange={ this.onChangeHandler }
                    options={ stateOptions }
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    name='city'
                    placeholder='City'
                    label='City'
                    value={ this.state.city }
                    error={ errors.city }
                    onChange={ this.onChangeHandler }
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-4 text-left">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({
                        displaySocialInputs: !this.state.displaySocialInputs
                      });
                    }}
                    className="btn btn-primary"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">  (Optional)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              { socialInputs }
              <div className="row justify-content-center mb-5">
                <div className="col-md-4">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, changeAvatar })(withRouter(CreateProfile));