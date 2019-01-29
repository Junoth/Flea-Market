import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import Item from './Item';

class Items extends Component {

  render() {

    const { items } = this.props;

    const itemContent = isEmpty(items)? 
      (<div className="row mt-3">
        <div className="col-md-12 mt-2">
          <h5>This user doesn't have any items</h5>
        </div>
      </div>) :
      (items.map(currentitem => <Item key={currentitem._id} item={currentitem} />)) 

    return (
      <div id="dashboard-items">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-5">
              <h2 className="display-4">Items</h2>
            </div> 
          </div>
          <div className="row justify-content-center">
            {itemContent}
          </div>
        </div>
      </div>
    );
  }
}

Items.propTypes = {
  items: PropTypes.array.isRequired
}

export default Items;