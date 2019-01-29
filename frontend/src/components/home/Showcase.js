import React, { Component } from 'react';
import SelectField from '../common/SelectField';
import InputField from '../common/InputField';
import { getItemsBySearch } from '../../actions/itemActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Showcase extends Component {

  state = {
    state: '',
    city: '',
    keyword: '',
    maxprice: '',
    errors: {}
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({ errors: newProps.errors });
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const newSearch = {
      state: this.state.state,
      city: this.state.city,
      keyword: this.state.keyword,
      maxprice: this.state.maxprice
    }

    this.props.getItemsBySearch(newSearch, this.props.history);    
  }

  render() {
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
    ]

    return (
      <div id="showcase">
        <div className="container text-center overlay py-4">
          <h1 className="mb-4" id="showcase-title">
            Item Searching Just Got So Easy
          </h1>
          <div className="search">
            <form noValidate onSubmit={ this.onSubmitHandler }>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <InputField 
                    name="keyword"
                    placeholder="Keyword(Computer, Furniture, etc)"
                    label="Keyword"
                    value={ this.state.keyword }
                    onChange={ this.onChangeHandler }
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <InputField 
                    name="city"
                    placeholder="City"
                    label="City"
                    value={ this.state.city }
                    onChange={ this.onChangeHandler }
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <SelectField
                    name="state"
                    value={ this.state.state }
                    label="State"
                    onChange={ this.onChangeHandler }
                    options={ stateOptions }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <InputField
                    name="maxprice"
                    placeholder="Max Price"
                    label="Max Price"
                    error={ this.state.errors.maxprice }
                    value={ this.state.maxprice }
                    onChange={ this.onChangeHandler }
                  />
                </div>
                <div className="col-md-6 pt-2">
                  <input 
                    className="btn btn-primary btn-sm btn-block mt-4" 
                    type="submit"
                    value="Submit"
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

const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps, { getItemsBySearch })(withRouter(Showcase));
