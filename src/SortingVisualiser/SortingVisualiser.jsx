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

    for (let i=0; i<ARR_LENGTH; i++){
      array.push(randomIntFromInterval(10,500));

    }
    this.setState({array});
  }



  bubbleSort(){
    const animations = bubbleSortAnimation(this.state.array);
    disable_buttons();
    animate(animations, 1);
  }

  quickSort(){
    const animations = quickSortAnimation(this.state.array)[1];
    disable_buttons();
    animate(animations, 35);
  }

  async mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    disable_buttons(animations.length, 7);
    //Sets heights rather than swapping heights so animate function not used
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, newHeight] = animations[i];
      const barStyle = arrayBars[barOneIdx].style;
      barStyle.height = `${newHeight}px`;
      await new Promise(r => setTimeout(r, 1));
    }
    enable_buttons();
}

  heapSort(){
    const animations = heapSortAnimation(this.state.array);
    disable_buttons();
    animate(animations, 8);
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
          <button class="controls" onClick={() => this.quickSort()}>Quick Sort</button>
          <button class="controls" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button class="controls" onClick={() => this.heapSort()}>Heap Sort</button>
          <button class="controls" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>

      </div>
    );
  }
}



//Visualise sorting
async function animate(animations, speed){
    for(let i=0; i<animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const temp = arrayBars[barOneIdx].style.height;
      arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
      arrayBars[barTwoIdx].style.height = temp;
      await new Promise(r => setTimeout(r, speed));
    }
    enable_buttons();
  }

//Get random integer
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Make button unclickable when sorting
function disable_buttons()
{
  var x = document.getElementsByClassName("controls");

  //Disable buttons
  for(let i=0; i<x.length;)
  {
    x[i].disabled = true;
    x[i].className = "controls-disabled";
  }
}

//Renable button functionality
function enable_buttons()
{
  var x = document.getElementsByClassName("controls-disabled");

  //Enable buttons once sorting is complete
  for(let i=0; i<x.length;)
  {
    x[i].disabled = false;
    x[i].className = "controls";
  }
}
