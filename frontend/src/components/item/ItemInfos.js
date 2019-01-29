import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLike } from '../../actions/itemActions';

class ItemInfos extends Component {

  onClickHandler = (e) => {
    this.props.addLike(this.props.item._id);
  }

  render() {

    const { item, auth } = this.props;
    let buttonContent;

    if(item.likes.filter(like => like.user === auth.user.id).length === 0){
      buttonContent = <button className="btn btn-sm btn-block btn-danger mb-4" onClick={ this.onClickHandler }>Like <i className="far fa-heart"></i></button>
    } else {
      buttonContent = <button className="btn btn-sm btn-block btn-danger mb-4" onClick={ this.onClickHandler }>Liked <i className="fas fa-heart"></i></button>
    } 

    return (
      <div id="item-infos">
        <div className="card mx-auto">
          <div className="card-body">
            <h1 style={{fontWeight: "400"}}>{item.name}</h1>

          <div className="row justify-content-center">
            <h4 style={{fontWeight: "400"}}>Price: ${item.price}</h4>
          </div>
          <div className="row justify-content-center">
            <h5 style={{textDecoration: "line-through", fontWeight: "400"}}>origin: ${item.originalprice}</h5>
          </div> 
          <hr />
          <h5 style={{fontWeight: "400", fontSize: "1.2rem"}}>condition: {item.condition}</h5>
          <h5 style={{fontWeight: "400", fontSize: "1.2rem"}}>location: {item.city} {item.state}</h5>
          <h5 style={{fontWeight: "400", fontSize: "1.2rem"}}>contact: {item.contact}</h5>
          <div className="row justify-content-left mt-4">
            <div className="col-md-6">
              {buttonContent} 
            </div>
            <div className="col-md-6">
              <button className="btn btn-block btn-sm btn-primary">Buy <i className="fas fa-shopping-cart"></i></button>
            </div>
          </div> 
          </div>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike })(ItemInfos);
