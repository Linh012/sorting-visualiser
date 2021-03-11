import React from 'react';
import './SortingVisualiser.css';

const ARR_LENGTH = 100;

const MAIN_COLOR = 'blue';


export default class SortingVisualiser extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount(){
    this.resetArray();
  }

  resetArray(){
    const array = [];
    for (let i=0; i<ARR_LENGTH; i++){
      array.push(randomIntFromInterval(10,500));
    }
    this.setState({array});
  }

  bubbleSort(){

  }


  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{height: `${value}px`}}>
        </div>

      ))}
      <div>
        <button onClick={() => this.resetArray()}>New Array</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>

      </div>
    );
  }


}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
