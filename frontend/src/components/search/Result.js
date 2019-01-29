import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import Listing from './Listing';
import { Link } from 'react-router-dom';

class Result extends Component {
  render() {
    
    const { item } = this.props;

    return (
      <div id="items" style={{ marginTop: '15vh', minHeight: '50vh'}}>
        <h2 className="mb-5">Search Result</h2>
        <div className="row justify-content-center mb-5">
          {!isEmpty(item.items) ? (item.items.map((item, index) => (
            <Listing item={item} key={index} />
          ))) : (
            <div>
              <h4>No items found</h4>
              <Link to="/home" className="btn btn-sm btn-primary">Return</Link>
            </div>
            )
          }
        </div>
      </div>
    )
  }
}

Result.propTypes = {
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps)(Result);
