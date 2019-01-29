import React, { Component } from 'react';
import Showcase from './Showcase';
import Listings from './Listings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItemsByNumber, getAmount } from '../../actions/itemActions';
import isEmpty from '../../validation/is-empty';

class Home extends Component {

  componentDidMount = () => {
    this.props.getItemsByNumber(9);
    this.props.getAmount();
  }

  render() {

    const { item } = this.props;
    let items;

    if (isEmpty(item.items)) {
      items = (<h4 style={{ marginTop: '30vh' }}>There is no item currently, go to create <Link to="create-item">one</Link> ?</h4>);
    } else {
      items = (<Listings 
        items={item.items}
        amount={item.amount}
      />)
    }

    return (
      <div id="home">
        <Showcase />
        <div className="container" style={{ minHeight: '50vh' }}>
         {items}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  item: PropTypes.object.isRequired,
  getAmount: PropTypes.func.isRequired,
  getItemsByNumber: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItemsByNumber, getAmount })(Home);
