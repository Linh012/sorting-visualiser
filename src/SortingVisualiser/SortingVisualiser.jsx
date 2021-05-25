import React from 'react';
import './SortingVisualiser.css';
import {bubbleSortAnimation, quickSortAnimation, getMergeSortAnimations, heapSortAnimation} from '../sortingAlgorithms/sortingAlgorithms.js';

const ARR_LENGTH = 120;

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
    var r = randomIntFromInterval(1, ARR_LENGTH);

    for (let i=0; i<ARR_LENGTH; i++){
      array.push(randomIntFromInterval(10,500));

      if (i == r){
        array.push(500);
      }

    }
    this.setState({array});
  }



  bubbleSort(){
    const animations = bubbleSortAnimation(this.state.array);
    disable_buttons(animations.length, 1);
    animate(animations, 1);
  }

  quickSort(){
    const animations = quickSortAnimation(this.state.array)[1];
    disable_buttons(animations.length, 50);
    animate(animations, 50);
  }

  mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    disable_buttons(animations.length, 5);

        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'blue' : 'blue'; //color change disabled
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * 5);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * 5);
          }
        }
  }

  heapSort(){
    const animations = heapSortAnimation(this.state.array);
    disable_buttons(animations.length, 15);
    animate(animations, 15);
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
            backgroundColor: MAIN_COLOR
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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function disable_buttons(len, speed)
{
  var x = document.getElementsByClassName("controls");

  //Disable buttons
  for(let i=0; i<x.length; i++)
  {
    x[i].disabled = true;
  }

  //Enable buttons once sorting is complete
  setTimeout(() => {
    for(let i=0; i<x.length; i++)
    {
      x[i].disabled = false;
    }
  }, len * speed)
}
