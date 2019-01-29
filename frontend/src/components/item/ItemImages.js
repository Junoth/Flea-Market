import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';

class ItemImages extends Component {

  render() {

    const {photos} = this.props;

    return (
      <div>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
        >
            {photos.map((photo, index) => (
                <img src={photo} alt="" key={index} style={{ width: "400px", height: "350px" }}/>
            ))}
         </Carousel>
      </div>
    )
  }
}

ItemImages.propTypes = {
  photos: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps)(ItemImages);
