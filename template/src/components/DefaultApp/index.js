
import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import { defaultAction } from '../../redux/actions';
import './index.sass';
import './index.css';

class DefaultApp extends Component {

  componentDidMount() {
    store.dispatch(defaultAction('users', 'User Results'));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>

        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to='/poop' > Get Poop </Link> <br/>
        <button onClick={this.alterState}>if Poop then add more</button>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    propName: store
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    alterState: function() {
      dispatch(defaultAction('add-to-new', 'add-more'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);
