import React from 'react';
import './SortingVisualiser.css';
import {bubbleSortAnimation, quickSortAnimation, getMergeSortAnimations, heapSortAnimation} from '../sortingAlgorithms/sortingAlgorithms.js';

const ARR_LENGTH = 120;

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
    const r = randomIntFromInterval(1, ARR_LENGTH);

    for (let i=0; i<ARR_LENGTH; i++){
      array.push(randomIntFromInterval(10,500));

      if (i === r){
        array.push(500);
      }

    }
    this.setState({array});
  }



  bubbleSort(){
    const animations = bubbleSortAnimation(this.state.array);
    animate(animations, 1);
    disable_buttons(animations.length, 1);
  }

  quickSort(){
    const animations = quickSortAnimation(this.state.array)[1];
    animate(animations, 35);
    disable_buttons(animations.length, 35);
  }

  mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    disable_buttons(animations.length, 5);

        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barStyle = arrayBars[barOneIdx].style;
            barStyle.height = `${newHeight}px`;
          }, i * 5);
        }
  }

  heapSort(){
    const animations = heapSortAnimation(this.state.array);
    animate(animations, 10);
    disable_buttons(animations.length, 10);
  }


  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            height: `${value}px`,
            backgroundColor: '#3888ff'
          }}>
        </div>

      ))}
        <div className='button-container'>
          <button class="controls" onClick={() => this.resetArray()}>New Array</button>
          <button class="controls" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button class="controls" onClick={() => this.quickSort()}>Quick Sort</button>
          <button class="controls" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button class="controls" onClick={() => this.heapSort()}>Heap Sort</button>
        </div>

      </div>
    );
  }


}

function animate(animations, speed){
    for(let i=0; i<animations.length; i++){

      const arrayBars = document.getElementsByClassName('array-bar');
      const [first, second] = animations[i];
      const firstBarStyle = arrayBars[first].style;
      const secondBarStyle = arrayBars[second].style;

      setTimeout(() => {
        const temp = firstBarStyle.height;
        firstBarStyle.height = secondBarStyle.height;
        secondBarStyle.height = temp;
      }, i * speed)
    }
  }

function complete(){
    for(let i=0; i<ARR_LENGTH+1; i++){

      const arrayBars = document.getElementsByClassName('array-bar');
      arrayBars[i].style.backgroundColor = '#1abc9c';

      setTimeout(() => {
        arrayBars[i].style.backgroundColor = '#3888ff';
      }, i * 7)
    }
  }

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function disable_buttons(len, speed)
{
  var x = document.getElementsByClassName("controls");

  //Disable buttons
  for(let i=0; i<x.length;)
  {
    x[i].disabled = true;
    x[i].className = "controls-disabled";
  }

  x = document.getElementsByClassName("controls-disabled");

  //Enable buttons once sorting is complete
  setTimeout(() => {
    for(let i=0; i<x.length;)
    {
      x[i].disabled = false;
      x[i].className = "controls";
      complete();
    }
  }, len * speed)
}
