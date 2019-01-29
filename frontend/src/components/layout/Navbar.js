import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

  onClickHandler = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-3">
          <Link to="/login" className="nav-link">Log in <i className="fa fa-user"></i></Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Sign up <i className="fa fa-user-plus"></i></Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            { user.name }
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/dashboard">Dashboard</a>
            <a className="dropdown-item" href="/create-item">New Item</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={ this.onClickHandler } href="">Logout</a>
          </div>
        </li>
        <li>
          <a href="/dashboard" className="nav-link">
            <img src={ user.avatar } alt="" className="navbar-avatar rounded-circle"/>
          </a>
        </li>
      </ul>
    );

    return (
      <div id="mainNavbar" className="navbar navbar-light navbar-expand-md fixed-top">
        <div className="container">
          <a href="/" className="navbar-brand">Memoir</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navLinks" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navLinks">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/home" className="nav-link">HOME</a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link">ABOUT</a>
              </li>
              <li className="nav-item">
                <a href="/items" className="nav-link">ITEMS</a>
              </li>
            </ul>
            { isAuthenticated ? authLinks : guestLinks } 
          </div>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = ({
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
});

const mapStateToProps = (state) => ({
  auth: state.auth
});
 
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
