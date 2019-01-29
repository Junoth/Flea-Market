import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const { comments, itemId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} itemId={itemId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  itemId: PropTypes.string.isRequired
};

export default CommentFeed;