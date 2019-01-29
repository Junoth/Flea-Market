import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="container-fluid landing-main">
          <div className="landing-inner">
            <h1>Memoir</h1>
            <br />
            <h2>Online Flea Market for everyone</h2>
            <br />
            <a href="/home" className="btn btn-outline-light">Explore Now <span><i className="fas fa-angle-double-right"></i></span></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
