import React, { Component } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import API from "../../utils/API";
import "./Auth.scss";

class Auth extends Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    confirmPassword: "",
    user: null,
    message: "",
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleLogin = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      API.login({
        username: this.state.username,
        password: this.state.password,
      }).then((user) => {
        console.log(user);
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user,
          });
          console.log("log in successful");
          window.location.href = "/dashboard";
        } else if (user.data.message) {
          this.setState({
            message: user.data.message,
          });
        }
      });
    }
  };
  handleSignup = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.signup({
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        orgname: this.state.orgname,
        orgaddress: this.state.orgaddress,
        email: this.state.email,
      }).then((user) => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user,
          });
          console.log("log in successful");
          window.location.href = "/dashboard";
        } else {
          console.log("something went wrong :(");
          console.log(user.data);
          this.setState({
            message: user.data,
          });
        }
      });
    }
  };
  handleVehicleUpload = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.vehicleUpload({
        locname: this.state.locname,
        poc: this.state.poc,
        pocphone: this.state.pocphone,
        vehicleinfo: this.state.vehicleinfo,
        spaces: this.state.spaces,
        comments: this.state.comments,
      }).then((user) => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user,
          });
          console.log("log in successful");
          window.location.href = "/dashboard";
        } else {
          console.log("something went wrong :(");
          console.log(user.data);
          this.setState({
            message: user.data,
          });
        }
      });
    }
  };
  render() {
    return (
      <div className="authBox">
        {this.props.action === "login" ? (
          <Login
            username={this.state.username}
            password={this.state.password}
            handleLogin={this.handleLogin}
            handleInputChange={this.handleInputChange}
            message={this.state.message}
          />
        ) : (
          <Signup
            username={this.state.username}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            handleSignup={this.handleSignup}
            handleInputChange={this.handleInputChange}
            message={this.state.message}
          />
        )}
      </div>
    );
  }
}

export default Auth;
