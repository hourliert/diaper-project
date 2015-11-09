import React, { Component, PropTypes } from 'react';
import './Counter.css';

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // this props are here thanks to mapStateToProps, mapDispatchToProps in
    // `../../containers/CounterPage/CounterPage.js`
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;

    return (
      <div className="Counter">
        <p>
          Clicked: {counter} times
          {' '}
          <button onClick={increment}>+</button>
          {' '}
          <button onClick={decrement}>-</button>
          {' '}
          <button onClick={incrementIfOdd}>Increment if odd</button>
          {' '}
          <button onClick={() => incrementAsync()}>Increment async</button>
        </p>
      </div>
    );
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};
