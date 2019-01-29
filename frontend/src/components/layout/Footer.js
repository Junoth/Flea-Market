import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className="footer container-fluid py-5 text-white">
        <div className="container extraSpace mt-5">
            <ul className="centerLinks socialIcons">
                <li style={{display: "inline-block"}}>
                    <a href="https://github.com/Junoth/Flea-Market"><i className="fab fa-github text-white fa-4x"></i></a>
                </li>
            </ul>
            <p className="footerText subP">All the source code of the website has been provided on the github</p>
        </div>
        <div className="bottomLinksDiv">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6 col-md">
                        <a className="text-white" href="/">Home</a>
                    </div><div className="col-md rm"><p>|</p></div>
                    <div className="col-6 col-md" >
                        <a className="text-white" href="/software">Software</a>
                    </div><div className="col-md rm"><p>|</p></div>
                    <div className="col-6 col-md">
                        <a className="text-white" href="/electronics">Electronics</a>
                    </div><div className="col-md rm"><p>|</p></div>
                    <div className="col-6 col-md">
                        <a className="text-white" href="/films" style={{textAlign: "center"}}>Films</a>
                    </div><div className="col-md rm"><p>|</p></div>
                    <div className="col-6 col-md">
                        <a className="text-white" href="/photography">Photography</a>
                    </div><div className="col-md rm"><p>|</p></div>
                    <div className="col-6 col-md">
                        <a className="text-white" href="/contact">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
  }
}

export default Footer;