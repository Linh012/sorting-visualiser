import React from 'react';
import './SortingVisualiser.css';
import {bubbleSortAnimation, quickSortAnimation, getMergeSortAnimations, heapSortAnimation} from '../sortingAlgorithms/sortingAlgorithms.js';

const ARR_LENGTH = 30;

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
      array.push(randomIntFromInterval(100,500));

    }
    this.setState({array});
  }



  bubbleSort(){
    const animations = bubbleSortAnimation(this.state.array);
    disable_buttons();
    animate(animations, 30);
  }

  quickSort(){
    const animations = quickSortAnimation(this.state.array)[1];
    disable_buttons();
    animate(animations, 120);
  }

  async mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    disable_buttons();
    //Sets heights rather than swapping heights so animate function not used
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, newHeight] = animations[i];
      const barStyle = arrayBars[barOneIdx].style;
      barStyle.backgroundColor = '#FF522D';
      barStyle.height = `${newHeight}px`;
      document.getElementById(barOneIdx).textContent = newHeight;
      await new Promise(r => setTimeout(r, 60));

      arrayBars[barOneIdx].style.backgroundColor = '#3888ff';
    }
    enable_buttons();
}

  heapSort(){
    const animations = heapSortAnimation(this.state.array);
    disable_buttons();
    animate(animations, 60);
  }


  render() {
    const {array} = this.state;

    return (
      <div className="main">
        <div className="array-container">
          {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: '#3888ff'
            }}>
            <span id={idx} class="hovertext">{value}</span>
          </div>
        ))}
        </div>
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
      arrayBars[barOneIdx].style.backgroundColor = '#FF522D';
      arrayBars[barTwoIdx].style.backgroundColor = '#FF522D';

      const temp = arrayBars[barOneIdx].style.height;
      arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
      document.getElementById(barOneIdx).textContent = arrayBars[barTwoIdx].style.height.slice(0, -2);
      arrayBars[barTwoIdx].style.height = temp;
      document.getElementById(barTwoIdx).textContent = temp.slice(0, -2);

      await new Promise(r => setTimeout(r, speed));

      arrayBars[barOneIdx].style.backgroundColor = '#3888ff';
      arrayBars[barTwoIdx].style.backgroundColor = '#3888ff';
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

//Renable button functionality and change bar colors to indicate completion of sorting
async function enable_buttons()
{
  const arrayBars = document.getElementsByClassName('array-bar');
  for(let i=0; i<arrayBars.length; i++){
    arrayBars[i].style.backgroundColor = '#1abc9c';
  }

  await new Promise(r => setTimeout(r, 2000));

  for(let i=0; i<arrayBars.length; i++){
    arrayBars[i].style.backgroundColor = '#3888ff';
  }

  var x = document.getElementsByClassName("controls-disabled");

  //Enable buttons once sorting is complete
  for(let i=0; i<x.length;)
  {
    x[i].disabled = false;
    x[i].className = "controls";
  }
}
