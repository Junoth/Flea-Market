import React, { Component } from 'react';
import Listing from './Listing';
import { connect } from 'react-redux';
import { getItems } from '../../actions/itemActions';
import PropTypes from 'prop-types';

class Listings extends Component {

  state = {
    activePage: 1
  }

  handlePageChange = (pageNumber) => {
    this.props.getItems(pageNumber);
    this.setState({ activePage: pageNumber })
  }

  render() {

    const {items} = this.props;

    return (
        <div id="listings" className="container">
          <h3 className="text-center mb-5">Latest Items</h3>
          <div className="row justify-content-center mb-5">
            {items.map((item, index) => (
              <Listing item={item} key={index} />
            ))}
          </div>
        </div>
    )
  }
}

Listings.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

export default connect(null, { getItems })(Listings);
