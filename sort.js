let userArr = [];
let userParentdiv = document.getElementById('user-parentdiv');

async function startSorting(algorithm) {
    userParentdiv.innerHTML = '';
    let userInput = document.getElementById('userArray').value;
    userArr = userInput.split(',').map(element => parseInt(element.trim(), 10));

    switch (algorithm) {
        case 'bubble':
            await bubbleSort(userArr, userParentdiv);
            break;
        case 'selection':
            await selectionSort(userArr, userParentdiv);
            break;
        case 'insertion':
            await insertionSort(userArr, userParentdiv);
            break;
        case 'quick':
            await quickSort(userArr, userParentdiv, 0, userArr.length - 1);
            break;
        case 'merge':
            await mergeSort(userArr, userParentdiv);
            break;
        case 'heap':
            await heapSort(userArr, userParentdiv);
            break;
        case 'radix':
            await radixSort(userArr, userParentdiv);
            break;
        default:
            console.log('Invalid algorithm');
    }
}

async function bubbleSort(arr, parentdiv) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            await sleep(500);
            let isSwapped = false;
            if (arr[j] > arr[j + 1]) {
                swapNumber(arr, j, j + 1);
                isSwapped = true;
            }
            visualizeUserArray(parentdiv, arr, j, j + 1, isSwapped);
        }
    }

    // Set all bars to purple after sorting
    visualizeUserArray(parentdiv, arr, -1, -1, true);
}

async function selectionSort(arr, parentdiv) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            await sleep(500);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swapNumber(arr, i, minIndex);
        visualizeUserArray(parentdiv, arr, i, minIndex);
    }

    // Set all bars to purple after sorting
    visualizeUserArray(parentdiv, arr, -1, -1, true);
}

async function insertionSort(arr, parentdiv) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            await sleep(500);
            arr[j + 1] = arr[j];
            j--;
            visualizeUserArray(parentdiv, arr, j + 1, j, false);
        }
        arr[j + 1] = current;
        visualizeUserArray(parentdiv, arr, j + 1, i, false);
    }
    visualizeUserArray(parentdiv, arr, -1, -1, true);
}

async function quickSort(arr, parentdiv, low, high) {
    if (low < high) {
        let pivotIndex = await partition(arr, parentdiv, low, high);
        await quickSort(arr, parentdiv, low, pivotIndex - 1);
        await quickSort(arr, parentdiv, pivotIndex + 1, high);
    }

    visualizeUserArray(parentdiv, arr, -1, -1, low === 0 && high === arr.length - 1);
}

async function partition(arr, parentdiv, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        await sleep(500);
        if (arr[j] < pivot) {
            i++;
            swapNumber(arr, i, j);
            visualizeUserArray(parentdiv, arr, i, j);
        }
    }

    swapNumber(arr, i + 1, high);
    visualizeUserArray(parentdiv, arr, i + 1, high);

    return i + 1;
}

async function mergeSort(arr, parentdiv) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const sortedLeft = await mergeSort(left, parentdiv);
    const sortedRight = await mergeSort(right, parentdiv);

    const mergedArray = merge(sortedLeft, sortedRight, parentdiv);

    visualizeUserArray(parentdiv, mergedArray, -1, -1, true);

    await sleep(500); 

    return mergedArray;
}


async function merge(left, right, parentdiv) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }

        visualizeUserArray(parentdiv, result.concat(left.slice(i)).concat(right.slice(j)), i, j);
        await sleep(500);
    }

    const mergedArray = result.concat(left.slice(i)).concat(right.slice(j));

    return mergedArray;
}



async function heapSort(arr, parentdiv) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i, parentdiv);
    }

    for (let i = n - 1; i > 0; i--) {
        await sleep(500);
        swapNumber(arr, 0, i);
        visualizeUserArray(parentdiv, arr, 0, i);
        await heapify(arr, i, 0, parentdiv);
    }

    visualizeUserArray(parentdiv, arr, -1, -1, true);
}

async function heapify(arr, n, i, parentdiv) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await sleep(500);
        swapNumber(arr, i, largest);
        visualizeUserArray(parentdiv, arr, i, largest);
        await heapify(arr, n, largest, parentdiv);
    }
}

async function radixSort(arr, parentdiv) {
    let maxNum = Math.max(...arr);
    let exp = 1;

    while (Math.floor(maxNum / exp) > 0) {
        await countSort(arr, parentdiv, exp);
        exp *= 10;
    }

    visualizeUserArray(parentdiv, arr, -1, -1, true);
}

async function countSort(arr, parentdiv, exp) {
    let output = Array.from({ length: arr.length }, () => 0);
    let count = Array.from({ length: 10 }, () => 0);

    for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        await sleep(500);
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
        visualizeUserArray(parentdiv, output, i, -1, false);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        visualizeUserArray(parentdiv, arr, i, -1, false);
    }
}
/************************************************ */
function visualizeUserArray(parentdiv, arr, swapIndex1, swapIndex2, sorted = false) {
    parentdiv.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let innerdiv = document.createElement('div');
        innerdiv.style.height = arr[i] * 6 + 'px';
        innerdiv.style.backgroundColor = sorted ? '#8e44ad' : (i === swapIndex1 || i === swapIndex2 ? '#f1c40f' : '#e74c3c');
        innerdiv.style.borderRadius = '8px';
        innerdiv.classList.add('innerdiv');
        let span = document.createElement('span');
        span.textContent = arr[i];
        innerdiv.appendChild(span);
        parentdiv.appendChild(innerdiv);
    }
}
/************************************************** */

function swapNumber(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}
