import React, { Component } from 'react';
import InputField from '../common/InputField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';

class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
    
  };

  render() {

    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container-fluid px-0 mx-0 landing-main content">
          <div className="Overlay login-inner">
            <div className="auth-form mx-auto">
              <form noValidate className="form-auth" onSubmit={ this.onSubmitHandler }>
                <h1 className="h3 mb-3 text-white">Log in</h1>
                <InputField 
                  name="email"
                  placeholder="Email Address"
                  icon="far fa-envelope"
                  label="Email"
                  value={ this.state.email }
                  error={ errors.email }
                  type="email"
                  onChange={ this.onChangeHandler }
                />
                <InputField 
                  name="password"
                  placeholder="Password"
                  icon="fas fa-key"
                  label="Password"
                  value={ this.state.password }
                  error={ errors.password }
                  type="password"
                  onChange={ this.onChangeHandler }
                />
                <button className="btn btn-md btn-primary btn-block mt-4 mb-3">Log in</button>
                <small className="text-white">Doesn't have an acount? <Link to="/register">Sign up</Link> now ! <span><i className="fas fa-arrow-circle-right"></i></span></small>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = ({
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));