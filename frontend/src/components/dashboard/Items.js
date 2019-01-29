import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './Item';
import addItem from '../../img/add_item.png';

class Items extends Component {

  render() {

    const { currentitems } = this.props.item;

    const itemContent = isEmpty(currentitems) ? 
      (<div className="row mt-3">
        <div className="col-md-12 mt-2">
          <h5>You don't have any items yet, go to create <Link to='/create-item'>one</Link> ?</h5>
        </div>
      </div>) :
      (currentitems.map(currentitem => <Item key={currentitem._id} item={currentitem} />)) 

    return (
      <div id="dashboard-items">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 mb-5">
              <h2 className="display-4">Items</h2>
            </div> 
          </div>
          <div className="row justify-content-center">
            {itemContent}
            <div className="col-md-6 col-lg-4 mb-4 align-self-center">
              <Link to="/create-item"><i className="fas fa-plus-circle fa-8x"></i></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Items.propTypes = {
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps)(Items);