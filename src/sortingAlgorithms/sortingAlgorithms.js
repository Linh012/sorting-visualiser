export function bubbleSortAnimation(array) {
  const animations = [];
  let len = array.length;
  for(let i=0; i<len; i++){
    for(let j=0; j<len; j++){
      if (array[j] > array[j+1]) {
        swap(array, j, j+1);
        animations.push([j,j+1]);
      }
    }
  }
  return animations;
};

function swap(arr, leftIndex, rightIndex){
    var temp = arr[leftIndex];
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
            animations.push([i,j])
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
  const animations = [];
  return quickSort(array, 0, array.length-1, animations);
}
