let array = [];

function generateArray() {
  const input = document.getElementById("array-input").value;
  array = input.split(',').map(Number);
  renderArray(array);
}

function renderArray(array) {
  idx = 0;
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  array.forEach(value => {
    const block = document.createElement("div");
    block.classList.add("block")
    block.classList.add(`idx${idx}`)
    idx++;
    block.textContent = value;
    container.appendChild(block);

  });
}



function renderStep0(step) {

  const container = document.getElementById("steps-container");
  const stepDiv = document.createElement("div");
  stepDiv.classList.add("array-step");


  let p = document.createElement("p")
  p.className = "p"
  p.innerText = `Step 0: `
  let index = 0;
  stepDiv.appendChild(p)
  step.forEach(value => {
    const block = document.createElement("div");
    block.classList.add(`block${index}`);
    block.classList.add("block");
    index++;
    block.textContent = value;
    stepDiv.appendChild(block);
  });
  const detail = document.createElement("p");
  detail.className = "details"
  stepDiv.appendChild(detail)
  container.appendChild(stepDiv);
}
function renderStep(step, stepNum, i, j) {

  const container = document.getElementById("steps-container");
  const stepDiv = document.createElement("div");
  stepDiv.classList.add("array-step");
  stepDiv.classList.add(`array-step${stepNum}`);


  let p = document.createElement("p")
  p.className = "p"
  p.innerText = `Step ${stepNum}: `
  let index = 0;
  stepDiv.appendChild(p)
  step.forEach(value => {
    const block = document.createElement("div");
    block.classList.add(`block${index}`);
    block.classList.add("block");
    index++;
    block.textContent = value;
    stepDiv.appendChild(block);
  });
  const detail = document.createElement("p");
  detail.className = "details"
  detail.innerText = `swapped ${step[i]} and ${step[j]}`;
  stepDiv.appendChild(detail);

  container.appendChild(stepDiv);
  document.querySelector(`.array-step${stepNum} .block${i}`).style.backgroundColor = "green";
  document.querySelector(`.array-step${stepNum} .block${j}`).style.backgroundColor = "green";
}


async function bubbleSort(arr) {
  document.getElementById("steps-container").innerHTML = "";
  renderStep0(arr.slice())
  const n = arr.length;
  index = 1;

  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      document.querySelector(`.idx${i}`).classList.add("red");
      document.querySelector(`.idx${i + 1}`).classList.add("red");
      document.querySelector(".swap").innerText = `comparing..... ${arr[i]} and ${arr[i + 1]}`

      // Introduce a 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (arr[i] > arr[i + 1]) {
        document.querySelector(".swap").innerText = `swapping..... ${arr[i]} and ${arr[i + 1]}`
        await swap(arr, i, i + 1);
        renderStep(arr.slice(), index, i, i + 1);
        index++;
        swapped = true;
      }
      document.querySelector(`.idx${i}`).classList.remove("red");
      document.querySelector(`.idx${i + 1}`).classList.remove("red");
      document.querySelector(".swap").innerText = ""
    }
  } while (swapped);

}


async function selectionSort(arr) {
  const n = arr.length;

  document.getElementById("steps-container").innerHTML = "";
  renderStep0(arr.slice());
  index = 1;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;


    for (let j = i + 1; j < n; j++) {
      document.querySelector(`.idx${i}`).classList.add("red");
      document.querySelector(`.idx${j}`).classList.add("red");
      document.querySelector(".swap").innerText = `comparing..... ${arr[i]} and ${arr[j]}`
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
      document.querySelector(`.idx${i}`).classList.remove("red");
      document.querySelector(`.idx${j}`).classList.remove("red");

    }
    if (i !== minIdx) {
      document.querySelector(".swap").innerText = `swapping..... ${arr[i]} and ${arr[minIdx]}`

      await swap(arr, i, minIdx);
      renderStep(arr.slice(), index, i, minIdx)
      index++
    }
    document.querySelector(".swap").innerText = ""
  }

}


function renderInsertStep(step, stepNum, key, i) {

  const container = document.getElementById("steps-container");
  const stepDiv = document.createElement("div");
  stepDiv.classList.add("array-step");
  stepDiv.classList.add(`array-step${stepNum}`);


  let p = document.createElement("p")
  p.className = "p"
  p.innerText = `Step ${stepNum}: `
  let index = 0;
  stepDiv.appendChild(p)
  step.forEach(value => {
    const block = document.createElement("div");
    block.classList.add(`block${index}`);
    block.classList.add("block");
    index++;
    block.textContent = value;
    stepDiv.appendChild(block);
  });
  const detail = document.createElement("p");
  detail.className = "details"
  detail.innerText = `Inserted ${key} at index${i}`;
  stepDiv.appendChild(detail)
  container.appendChild(stepDiv);
  document.querySelector(`.array-step${stepNum} .block${i}`).style.backgroundColor = "purple";

}

async function insertionSort(arr) {
  document.getElementById("steps-container").innerHTML = "";
  renderStep0(arr.slice());

  index = 1;

  const n = arr.length;
  let steps = [arr.slice()];

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      document.querySelector(`.idx${j}`).classList.add("red");
      document.querySelector(`.idx${j + 1}`).classList.add("red");
      document.querySelector(".swap").innerText = `comparing..... ${arr[j + 1]} and ${arr[j]}`
      await new Promise((resolve) => setTimeout(resolve, 2000));
      document.querySelector(".swap").innerText = `swapping..... ${arr[j + 1]} and ${arr[j]}`
      arr[j + 1] = arr[j];
      await swap(arr, j, j + 1);
      renderStep(arr.slice(), index, j + 1, j)
      index++
      document.querySelector(`.idx${j + 1}`).classList.remove("red");
      document.querySelector(`.idx${j}`).classList.remove("red");
      j = j - 1;
      steps.push(arr.slice());

    }
    arr[j + 1] = key;
    document.querySelector(".swap").innerText = `Inserting key..... ${key} at index ${j + 1}`
    await InsertKey(arr, key, j + 1);
    renderInsertStep(arr.slice(), index, key, j + 1)
    index++;
    steps.push(arr.slice());
    document.querySelector(".swap").innerText = ""
  }

}
async function InsertKey(arr, key, j) {

  document.querySelector(`.idx${j}`).classList.add("key")
  await new Promise(resolve => setTimeout(resolve, 1000));

  arr[j] = key

  document.querySelector(`.idx${j}`).classList.remove("key")
  renderArray(arr);
}

async function mergeSort(arr) {
  const n = arr.length;
  if (n <= 1) {
    return arr;
  }

  const middle = Math.floor(n / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(await mergeSort(left), await mergeSort(right));
}

async function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
    renderArray([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}




async function swap(arr, i, j) {
  document.querySelector(`.idx${i}`).classList.add("green")
  document.querySelector(`.idx${j}`).classList.add("green")
  await new Promise(resolve => setTimeout(resolve, 1000));
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  document.querySelector(`.idx${i}`).classList.remove("green")
  document.querySelector(`.idx${j}`).classList.remove("green")
  renderArray(arr);
}



function sortArray() {
  generateArray()
  const algorithm = document.getElementById("sort-algorithm").value;
  const arrayCopy = array.slice(); // Create a copy to sort

  if (algorithm === "bubble") {
    bubbleSort(arrayCopy);
  } else if (algorithm === "selection") {
    selectionSort(arrayCopy);
  } else if (algorithm === "insertion") {
    insertionSort(arrayCopy);
  } else if (algorithm === "merge") {
    mergeSort(arrayCopy).then(sortedArray => {
      renderArray(sortedArray);
    });
  }
}  