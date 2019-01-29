import React, { Component } from 'react'

class About extends Component {
  render() {
    return (
      <div id="About">
        <div className="container-fluid py-5">
          <div className="row align-items-center">
            <div className="col-md-6 px-0">
              <div className="row justify-content-center">
                <div className="col-10 col-lg-8 mt-5 pt-5">
                  <h2>No idea with unused items?</h2> 
                  <p className="lead">There are often some special items - memorabilia and furniture, and ones like that you don’t wanna let go of. Sometimes you find it really wasteful to drop some unused but still valuable items</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-5 pt-md-5">
              <container>
              <img src={require('../../img/welcome-2.jpg')} alt="" className="img-fluid rounded mx-auto d-block" />
              </container>
            </div>
          </div>
        </div>
        <div className="container-fluid py-5" style={{backgroundColor: "rgb(47,79,79)"}}>
          <div className="row align-items-center">
            <div className="col-md-6 order-2 order-md-1 mt-md-0 mt-5">
              <img src={require('../../img/welcome-3.jpg')} alt="" className="img-fluid rounded mx-auto d-block" />
            </div>
            <div className="col-md-6 order-1 order-md-2">
              <div className="row justify-content-center">
                <div className="col-10 col-lg-8 mt-5">
                  <h2 className="text-white">Now, anytime and anywhere</h2> 
                  <p className="lead text-white">No matter where you are, when you try to sell your products, all you need to do is just go to our website and post your item.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="row justify-content-center">
                <div className="col-10 col-lg-8 mt-5">
                  <h2>More quick, more reliable deal</h2> 
                  <p className="lead">Once you find something like, you can contact with seller immediately. No charge, no wait.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-md-0 mt-5">
              <img src={require('../../img/welcome-4.jpg')} alt="" className="img-fluid rounded mx-auto d-block" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About;
