import React, { Component } from 'react';

class ItemDes extends Component {

  render() {
    return (
      <div>
        <div id="item-des pt-5">
          <div className="container py-3">
            <div className="row justify-content-center">
              <div className="col-md-10 text-center pb-4">
                <h1>Description</h1>
              </div>
              <div className="col-md-10 pb-4">
                <h5>{this.props.description}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDes;
