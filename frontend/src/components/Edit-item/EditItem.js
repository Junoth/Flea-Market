import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from '../common/InputField';
import TextField from '../common/TextField';
import SelectField from '../common/SelectField';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { editItem, getItem } from '../../actions/itemActions';
import { clearErrors } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditItem extends Component {

  state = {
    name: '',
    price: '',
    originalprice: '',
    description: '',
    state: 'AL',
    city: '',
    condition: 'Like New',
    contact: '',
    errors: {}
  }

  componentDidMount = () => {
    this.props.getItem(this.props.match.params.id);
    this.props.clearErrors();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.item.item) {

      const { item } = nextProps.item;

      // if item field doesn't exist, make empty stritem
      item.name = isEmpty(item.name) ? '' : item.name;
      item.price = isEmpty(item.price) ? '' : item.price;
      item.originalprice = isEmpty(item.originalprice) ? '' : item.originalprice;
      item.state = isEmpty(item.state) ? 'AL' : item.state;
      item.city = isEmpty(item.city) ? '' : item.city;
      item.description = isEmpty(item.description) ? '' : item.description;
      item.condition = isEmpty(item.condition) ? 'Like New' : item.condition;
      item.contact = isEmpty(item.contact) ? '' : item.contact;

      // set component fields
      this.setState({
        name: item.name,
        price: item.price,
        originalprice: item.originalprice,
        state: item.state,
        city: item.city,
        description: item.description,
        condition: item.condition,
        contact: item.contact
      });
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    
    const newItem = {
      name: this.state.name,
      price: this.state.price,
      originalprice: this.state.originalprice,
      description: this.state.description,
      state: this.state.state,
      city: this.state.city,
      condition: this.state.condition,
      contact: this.state.contact
    }

    this.props.editItem(newItem, this.props.match.params.id, this.props.history);
  }

  render() {
    
    const { auth, errors } = this.props;

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

    const conditionOptions = [
      {value: "Like New", label: "Like New"},
      {value: "Very Good", label: "Very Good"},
      {value: "Good", label: "Good"},
      {value: "Acceptable", label: "Acceptable"}
    ];

    return (
      <div className='create-item'>
        <div className="jumbotron jumbotron-fluid mb-4">
          <div className="row mb-4">
            <div className="container">
              <img src={auth.user.avatar} alt="" className="profile-avatar rounded-circle"/>
            </div>
          </div>
        </div>
        <div className="container px-0 pt-3">
            <div className="row justify-cotent-center mt-2">
              <div className="col-md-12">
                <h1 className="display-4">Your Item</h1>
              </div>
            </div>
            <form noValidate onSubmit={ this.onSubmitHandler }>
              <div className="row justify-content-center mt-3">
                <div className="col-md-10">
                  <InputField
                    name='name'
                    placeholder='Nike shoe'
                    label='Name'
                    value={ this.state.name }
                    error={ errors.name }
                    onChange={ this.onChangeHandler }
                  />
                </div>
                <div className="col-md-5">
                  <InputField
                    name='price'
                    label='Price($)'
                    placeholder='100'
                    value={ this.state.price }
                    error={ errors.price }
                    onChange={ this.onChangeHandler }
                  />
                </div>
                <div className="col-md-5">
                  <InputField
                    name='originalprice'
                    placeholder='200'
                    label='Original Price($)'
                    value={ this.state.originalprice }
                    error={ errors.originalprice }
                    onChange={ this.onChangeHandler }
                  />
                </div> 
              </div> 
              <div className="row mb-3 justify-content-center">
                <div className="col-md-5">
                  <SelectField
                    name="condition"
                    value={ this.state.condition }
                    label="Condition"
                    onChange={ this.onChangeHandler }
                    options={ conditionOptions }
                  />
                </div> 
                <div className="col-md-5">
                  <InputField
                    name='contact'
                    placeholder='Contact'
                    label='Contact'
                    value={ this.state.contact }
                    error={ errors.contact }
                    onChange={ this.onChangeHandler }
                  />
                </div> 
              </div>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-5">
                  <SelectField
                    name="state"
                    value={ this.state.state }
                    label="State"
                    onChange={ this.onChangeHandler }
                    options={ stateOptions }
                  />
                </div>
                <div className="col-md-5">
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
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <TextField
                    name='description'
                    placeholder='A new nike shoe, I bought it last week'
                    label='Description'
                    value={ this.state.description }
                    error={ errors.description }
                    onChange={ this.onChangeHandler }
                  />
                </div>
              </div>
              <div className="row justify-content-center mb-5">
                <div className="col-md-4">
                  <input
                    type="submit"
                    value="Continue"
                    className="btn btn-primary btn-block mt-4"
                  />
                </div>
              </div>
            </form>
          </div>
      </div>
    )
  }
}

EditItem.propTypes = {
  auth: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  item: state.item,
  errors: state.errors
})

export default connect(mapStateToProps, { editItem, getItem, clearErrors })(withRouter(EditItem));