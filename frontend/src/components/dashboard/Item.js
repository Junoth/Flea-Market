import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {

  render() {

    const { item } = this.props;

    return (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card listing-preview mx-auto">
          <Link to={`/item/${item._id}`}><img className="card-img-top" src={item.photos[0]} alt="" /></Link>
          <div className="card-body">
            <div className="listing-heading text-center">
              <h4 className="text-primary">{item.name}</h4>
              <p>
                <i className="fas fa-map-marker text-secondary"></i> {item.city} {item.state}</p>
            </div>
            <hr/>
            <div className="row py-2 text-secondary">
              <div className="col-6">
                <i className="fas fa-dollar-sign"></i> {item.price}</div>
              <div className="col-6">
                <i className="fab fa-gratipay"></i> {item.likes.length} likes</div>
            </div>
            <hr/>
            <div className="row py-2 text-secondary">
              <div className="col-12">
                <Link className="btn btn-primary btn-md" to={`/edit-item/${item._id}`}>Edit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Item;