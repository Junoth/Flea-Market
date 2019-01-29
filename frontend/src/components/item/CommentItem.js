import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/itemActions';

class CommentItem extends Component {
  onDeleteClick(itemId, commentId) {
    this.props.deleteComment(itemId, commentId);
  }

  render() {
    const { comment, itemId, auth } = this.props;

    return (
      <div className="row justify-content-center my-5">
      <div className="card card-body mb-3" style={{width: '50vh'}}>
        <div className="row">
          <div className="col-md-2">
            <div className="row justify-content-center">
              <a href="profile.html">
                <img
                  className="profile-avatar rounded-circle d-none d-md-block"
                  src={comment.avatar}
                  alt=""
                />
              </a>
            </div>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, itemId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);