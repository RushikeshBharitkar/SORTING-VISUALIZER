let array = [];
let arraySize = document.getElementById('arraySize').value;
let speed = 101 - document.getElementById('speed').value;
let algorithm = document.getElementById('algorithm').value;
let isSorting = false;

const arrayContainer = document.getElementById('arrayContainer');
const arraySizeValue = document.getElementById('arraySizeValue');
const speedValue = document.getElementById('speedValue');
const generateArrayBtn = document.getElementById('generateArray');
const startSortBtn = document.getElementById('startSort');
const resetSortBtn = document.getElementById('resetSort');
const timeComplexity = document.getElementById('timeComplexity');
const spaceComplexity = document.getElementById('spaceComplexity');
const stepsLog = document.getElementById('stepsLog');

const complexityMap = {
  bubble: {time: 'Best: O(n) | Avg: O(n²) | Worst: O(n²)', space: 'O(1)'},
  selection: {time: 'Best/Avg/Worst: O(n²)', space: 'O(1)'},
  insertion: {time: 'Best: O(n) | Avg/Worst: O(n²)', space: 'O(1)'},
  merge: {time: 'Best/Average/Worst: O(n log n)', space: 'O(n)'},
  quick: {time: 'Best/Average: O(n log n) | Worst: O(n²)', space: 'O(log n)'}
};

function updateComplexity() {
  timeComplexity.innerText = complexityMap[algorithm].time;
  spaceComplexity.innerText = `Space: ${complexityMap[algorithm].space}`;
}

document.getElementById('arraySize').addEventListener('input', e => {
  arraySize = e.target.value;
  arraySizeValue.innerText = arraySize;
  generateArray();
});

document.getElementById('speed').addEventListener('input', e => {
  speed = 101 - e.target.value;
  speedValue.innerText = e.target.value;
});

document.getElementById('algorithm').addEventListener('change', e => {
  algorithm = e.target.value;
  updateComplexity();
});

generateArrayBtn.addEventListener('click', generateArray);
startSortBtn.addEventListener('click', () => { if(!isSorting) startSorting(); });
resetSortBtn.addEventListener('click', generateArray);

function generateArray() {
  array = [];
  stepsLog.innerHTML = '';
  for (let i = 0; i < arraySize; i++) array.push(Math.floor(Math.random()*400)+20);
  renderArray();
  stepsLog.innerHTML += `<p>Generated new array: [${array.join(', ')}]</p>`;
  updateComplexity();
  isSorting = false;
}

function renderArray(highlight = [], swap = []) {
  arrayContainer.innerHTML = '';
  array.forEach((value, idx) => {
    const bar = document.createElement('div');
    bar.classList.add('array-bar');
    bar.style.height = `${value}px`;
    if(highlight.includes(idx)) bar.classList.add('comparing');
    if(swap.includes(idx)) bar.classList.add('swapping');
    const val = document.createElement('span');
    val.innerText = value;
    bar.appendChild(val);
    arrayContainer.appendChild(bar);
  });
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// Bubble Sort with steps log
async function bubbleSort() {
  for(let i=0;i<array.length-1;i++){
    for(let j=0;j<array.length-i-1;j++){
      stepsLog.innerHTML += `<p>Comparing ${array[j]} and ${array[j+1]}</p>`;
      renderArray([j,j+1]);
      await sleep(speed);
      if(array[j]>array[j+1]){
        [array[j],array[j+1]]=[array[j+1],array[j]];
        stepsLog.innerHTML += `<p>Swapped ${array[j]} and ${array[j+1]}</p>`;
        renderArray([], [j,j+1]);
        await sleep(speed);
      }
    }
  }
  stepsLog.innerHTML += `<p>Bubble Sort Completed!</p>`;
}

// Dispatcher
async function startSorting() {
  isSorting = true;
  switch(algorithm){
    case 'bubble': await bubbleSort(); break;
    // Other algorithms can be added similarly
    default: await bubbleSort();
  }
  renderArray();
  stepsLog.innerHTML += `<p>Sorting Finished!</p>`;
  isSorting = false;
}

// Initialize
generateArray();
