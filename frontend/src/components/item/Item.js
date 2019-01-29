import React, { Component } from 'react'
import ItemImages from './ItemImages';
import ItemInfos from './ItemInfos';
import ItemDes from './ItemDes';
import CommentFeed from './CommentFeed';
import CommentForm from './CommentForm';
import { connect } from 'react-redux';
import { getItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class Item extends Component {

  componentDidMount = () => {
    this.props.getItem(this.props.match.params.id);
  }

  render() {

    const { item } = this.props.item; 
    let photosContent = null;
    let commentsContent = null;
    let formContent = null;
    let infoContent = null;

    if (!isEmpty(item)) {
      photosContent = (<ItemImages photos={item.photos}/>);
      formContent = (<CommentForm itemId={item._id} />);
      commentsContent = (<CommentFeed itemId={item._id} comments={item.comments} />);
      infoContent = (<ItemInfos item={item}/> );
    }

    return (
      <div id="item-info">
        <section id="showcase-inner" className="py-5 text-black">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h1 className="display-4">{item.name}</h1>
                <p className="lead">
                  <i className="fas fa-map-marker"></i> {item.city} {item.state}</p>
              </div>
            </div>
          </div>
        </section> 
        <section id="item-body">
          <div className="container">
            <div className="row pb-5 justify-content-center">
              <div className="col-lg-8 mb-5">
                {photosContent}
              </div>
              <div className="col-lg-4">
                {infoContent}
              </div>
            </div>
            <hr />
            <ItemDes description={item.description}/>
            <hr />
            {formContent}
            <hr />
            {commentsContent}
          </div>
        </section>
      </div>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  getItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItem })(Item);
