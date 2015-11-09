import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Counter from '../../components/Counter';
import * as CounterActions from '../../actions/counter';

/**
 * We bind every state properties to the component props.
 * @param  {Object} state The counter this.state.
 * @return {Object}       The mapping between component props (left) and the state props (right).
 */
function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

/**
 * We bind actions to the component props.
 * These actions are used to dispatch an action to the redux store.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CounterPage extends Component {
  render() {
    return (
      <Counter {...this.props} />
    );
  }
}
