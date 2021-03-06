export function bubbleSortAnimation(array) {
  const animations = [];
  let len = array.length-1;
  for(let i=0; i<len; i++){
    for(let j=0; j<len-i; j++){
      if (array[j] > array[j+1]) {
        swap(array, j, j+1);
        animations.push([j,j+1]);
      }
    }
  }
  return animations;
};

function swap(arr, leftIndex, rightIndex){
    const temp = arr[leftIndex];
    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = temp;
}

function partition(arr, left, right, animations) {
    var pivot = arr[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            if (i !== j)
            {
              animations.push([i,j]);
            }
            i++;
            j--;
        }
    }
    return [i, animations];
}

function quickSort(arr, left, right, animations) {
    var index;
    if (arr.length > 1) {
        [index, animations] = partition(arr, left, right, animations); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(arr, left, index - 1, animations);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(arr, index, right, animations);
        }
    }
    return [arr, animations];
}


export function quickSortAnimation(array) {
  return quickSort(array, 0, array.length-1, []);
}

var array_length;
var heapAnimations;
/* to create MAX  array */
function heap_root(input, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && input[left] > input[max]) {
      max = left;
  }

  if (right < array_length && input[right] > input[max])     {
      max = right;
  }

  if (max !== i) {
      swap(input, i, max);
      heapAnimations.push([i,max]);
      heap_root(input, max);
  }
}

function heapSort(input) {
    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i);
      }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        heapAnimations.push([0,i]);
        array_length--;

        heap_root(input, 0);
    }
}

export function heapSortAnimation(array){
  heapAnimations = [];
  heapSort(array);
  return heapAnimations;
}


export function getMergeSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
