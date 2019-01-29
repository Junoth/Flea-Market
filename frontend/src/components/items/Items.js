import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { getAmount, getItems } from '../../actions/itemActions';
import Listing from './Listing';
import { Link } from 'react-router-dom';

class Items extends Component {

  state = {
    activePage: 1
  }

  handlePageChange = (pageNumber) => {
    this.props.getItems(pageNumber);
    this.setState({ activePage: pageNumber })
  }

  componentDidMount = () => {
    this.props.getItems(1);
    this.props.getAmount();
  }

  render() {
    
    const { item } = this.props;

    return (
      <div id="items" style={{ marginTop: '15vh' }}>
        <h2 className="mb-5">All Items</h2>
        <div className="row justify-content-center mb-5">
          {!isEmpty(item.items) ? (item.items.map((item, index) => (
            <Listing item={item} key={index} />
          ))) : (<h3>No items found, go to create <Link to="create-item">one</Link>?</h3>)
          }
        </div>
        <div className="row justify-content-center mb-5">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={9}
            totalItemsCount={ item.amount }
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    )
  }
}

Items.propTypes = {
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, { getAmount, getItems })(Items);
