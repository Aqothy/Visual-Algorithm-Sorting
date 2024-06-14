import { Component } from "react";
import Code from "../components/Code";
import Modal from "../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Algorithm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      algorithm: "Bubble",
      delay: 300,
      sorting: false,
      stage: null,
      modal: false,
      customArray: "5,4,3,2,1",
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  //create new array with length 10, all random numbers between 1 and 10
  generateArray(high = 10, low = 1) {
    const array = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * (high - low + 1) + low)
    );
    this.setState({ array });
  }

  // isSorted() {
  //   const { array } = this.state;
  //   const sortedArray = [...array].sort((a, b) => a - b);
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i] !== sortedArray[i]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  handleKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      ",",
      ...Array.from({ length: 10 }, (_, i) => i.toString()),
    ];

    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  handleChange = (e) => {
    this.setState({
      customArray: e.target.value,
    });
  };

  async bubbleSort() {
    //set sorting to true to disable buttons
    this.setState({ sorting: true });
    let swap = true;
    const { array, delay } = this.state;
    let len = array.length;

    while (swap) {
      this.setState({ stage: 1 });
      swap = false;
      //delay here so that the user can see the stage
      await this.sleep(delay / 5);
      for (let i = 1; i < len; i++) {
        this.setState({ stage: 2 });
        //animate the comparison
        await this.animateSort(i - 1, i, "compare", delay);
        if (array[i - 1] > array[i]) {
          //set stage and show swap animation
          this.setState({ stage: 3 });
          await this.animateSort(i - 1, i, "swap", delay);
          [array[i], array[i - 1]] = [array[i - 1], array[i]];
          swap = true;
        }
      }
      this.setState({ stage: 4 });
      len -= 1;
      await this.sleep(delay / 5);
    }
    this.setState({ sorting: false, stage: null });
    toast.success("Array is sorted");
  }

  async selectionSort() {
    this.setState({ sorting: true });
    const { array, delay } = this.state;
    let len = array.length;

    for (let i = 0; i < len - 1; i++) {
      let min = i;
      this.setState({ stage: 1 });
      await this.sleep(delay / 5);
      for (let j = i + 1; j < len; j++) {
        //set stage and animate comparison
        this.setState({ stage: 2 });
        await this.animateSort(min, j, "compare", delay);
        if (array[j] < array[min]) {
          min = j;
          this.setState({ stage: 3 });
          await this.sleep(delay / 5);
        }
      }
      this.setState({ stage: 4 });
      await this.sleep(delay / 5);
      if (min !== i) {
        // Swap elements in the array
        this.setState({ stage: 5 });
        await this.animateSort(min, i, "swap", delay);
        [array[min], array[i]] = [array[i], array[min]];
      }
    }
    this.setState({ sorting: false, stage: null });
    toast.success("Array is sorted");
  }

  async insertionSort() {
    this.setState({ sorting: true });
    const { array, delay } = this.state;
    let len = array.length;

    for (let i = 1; i < len; i++) {
      let x = array[i];
      //copy the element to be inserted and add it to dom for user visuals
      this.copyElement(i);
      let j = i - 1;
      this.setState({ stage: 1 });
      await this.sleep(delay / 5);
      while (j >= 0 && x < array[j]) {
        //set stages and animate the comparison and copy heights
        this.setState({ stage: 2 });
        await this.sleep(delay / 5);
        this.setState({ stage: 3 });
        await this.animateSort(len, j, "compare", delay);
        await this.animateSort(j, j + 1, "copy", delay);
        array[j + 1] = array[j];
        j--;
      }

      const newElement = document.querySelector(`#clonedElement-${i}`);

      await this.sleep(delay / 5);
      this.setState({ stage: 4 });
      await this.animateSort(j + 1, array.length, "swap", delay);

      newElement.remove();

      array[j + 1] = x;
    }

    this.setState({ sorting: false, stage: null });
    toast.success("Array is sorted");
  }

  async copyElement(i) {
    const bars = document.querySelectorAll(".bar");
    const currentElement = bars[i];
    const clone = currentElement.cloneNode(true);
    clone.style.marginLeft = "2rem";
    clone.style.backgroundColor = "crimson";
    clone.id = `clonedElement-${i}`;
    clone.className = `bar`;
    clone.innerText = `${
      parseInt(clone.style.height.replace("px", "")) / 50
    }\nc`;
    bars[i].parentElement.appendChild(clone);
    await this.sleep();
  }

  async merge(array, start, mid, end, delay = this.state.delay) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let origArrIndex = start;
    this.setState({ stage: 10 });
    await this.sleep(delay / 5);
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      const leftValue = leftArray[leftIndex];
      const rightValue = rightArray[rightIndex];

      const leftOriginalIndex = start + leftIndex;
      const rightOriginalIndex = mid + 1 + rightIndex;
      this.setState({ stage: 5 });
      if (leftValue <= rightValue) {
        await this.sleep(delay / 5);
        this.setState({ stage: 6 });
        array[origArrIndex] = leftValue;
        await this.animateSort(
          leftOriginalIndex,
          origArrIndex,
          "compare",
          delay
        );
        await this.animateSort(origArrIndex, leftValue, "change", delay);
        leftIndex++;
      } else {
        await this.sleep(delay / 5);
        this.setState({ stage: 7 });
        array[origArrIndex] = rightValue;
        await this.animateSort(
          rightOriginalIndex,
          origArrIndex,
          "compare",
          delay
        );
        await this.animateSort(origArrIndex, rightValue, "change", delay);
        rightIndex++;
      }
      origArrIndex++;
    }

    await this.sleep(delay / 5);
    this.setState({ stage: 8 });
    while (leftIndex < leftArray.length) {
      array[origArrIndex] = leftArray[leftIndex];
      await this.animateSort(start + leftIndex, origArrIndex, "compare", delay);
      await this.animateSort(
        origArrIndex,
        leftArray[leftIndex],
        "change",
        delay
      );
      leftIndex++;
      origArrIndex++;
    }

    while (rightIndex < rightArray.length) {
      array[origArrIndex] = rightArray[rightIndex];
      await this.animateSort(
        mid + 1 + rightIndex,
        origArrIndex,
        "compare",
        delay
      );
      await this.animateSort(
        origArrIndex,
        rightArray[rightIndex],
        "change",
        delay
      );
      rightIndex++;
      origArrIndex++;
    }

    this.setState({ stage: 11 });
    await this.sleep(delay / 5);
  }

  async mergeSort(
    array = this.state.array,
    left = 0,
    right = this.state.array.length - 1,
    delay = this.state.delay
  ) {
    this.setState({ stage: 1 });
    await this.sleep(delay / 5);
    if (left >= right) {
      this.setState({ stage: 9 });
      await this.sleep(delay / 5);
      return;
    }
    const mid = Math.floor((left + right) / 2);
    this.setState({ stage: 2 });
    await this.sleep(delay / 5);
    await this.mergeSort(array, left, mid);
    this.setState({ stage: 3 });
    await this.sleep(delay / 5);
    await this.mergeSort(array, mid + 1, right);
    this.setState({ stage: 4 });
    await this.sleep(delay / 5);
    await this.merge(array, left, mid, right);
  }

  async quickSort(
    array = this.state.array,
    start = 0,
    end = this.state.array.length - 1,
    delay = this.state.delay
  ) {
    this.setState({ stage: 1 });
    if (end <= start) {
      await this.sleep(delay / 5);
      this.setState({ stage: 2 });
      return;
    }
    await this.sleep(delay / 5);
    this.setState({ stage: 3 });
    const pivot = await this.partition(array, start, end);
    await this.sleep(delay / 5);
    this.setState({ stage: 10 });
    await this.sleep(delay / 5);
    await this.quickSort(array, start, pivot - 1);
    await this.sleep(delay / 5);
    this.setState({ stage: 11 });
    await this.sleep(delay / 5);
    await this.quickSort(array, pivot + 1, end);
    await this.sleep(delay / 5);
  }

  async partition(array, start, end) {
    const bars = document.querySelectorAll(".bar");
    const { delay } = this.state;
    let pivot = array[end];
    bars[end].innerText = `${
      parseInt(bars[end].style.height.replace("px", "")) / 50
    }\np`;
    let i = start - 1;
    this.setState({ stage: 4 });
    await this.sleep(delay / 5);
    this.setState({ stage: 5 });
    await this.sleep(delay / 5);
    for (let j = start; j <= end; j++) {
      this.setState({ stage: 6 });
      await this.animateSort(j, end, "compare", delay);
      if (array[j] < pivot) {
        this.setState({ stage: 7 });
        i++;
        await this.animateSort(i, j, "swap", delay);
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    await this.sleep(delay / 5);
    this.setState({ stage: 8 });
    i++;
    await this.animateSort(i, end, "swap", delay);
    [array[i], array[end]] = [array[end], array[i]];
    bars[end].innerText = `${
      parseInt(bars[end].style.height.replace("px", "")) / 50
    }`;
    await this.sleep(delay / 5);
    this.setState({ stage: 9 });
    return i;
  }

  async animateSort(idx1, idx2, action, delay) {
    const bars = document.querySelectorAll(".bar");

    switch (action) {
      case "compare":
        [bars[idx1].style.backgroundColor, bars[idx2].style.backgroundColor] = [
          "crimson",
          "crimson",
        ];

        await this.sleep(delay);

        [bars[idx1].style.backgroundColor, bars[idx2].style.backgroundColor] = [
          "deepskyblue",
          "deepskyblue",
        ];
        break;

      case "swap":
        // Change the color to indicate swaping
        [bars[idx1].style.backgroundColor, bars[idx2].style.backgroundColor] = [
          "crimson",
          "crimson",
        ];

        // Add transition effect to bars
        bars[idx1].style.transition = `transform ${String(
          delay / 1000 - 0.15
        )}s ease`;

        bars[idx2].style.transition = `transform ${String(
          delay / 1000 - 0.15
        )}s ease`;

        // Get the initial positions of the bars
        let bar1 = bars[idx1].getBoundingClientRect();
        let bar2 = bars[idx2].getBoundingClientRect();

        // Calculate the offset between the bars
        let offsetX = bar2.left - bar1.left;

        // Apply transform to swap the positions
        bars[idx1].style.transform = `translateX(${offsetX}px)`;
        bars[idx2].style.transform = `translateX(${-offsetX}px)`;

        // Wait for the transition to complete
        await this.sleep(delay);

        // Reset the transform property and transition
        bars[idx1].style.transform = "";
        bars[idx2].style.transform = "";
        bars[idx1].style.transition = "";
        bars[idx2].style.transition = "";

        // Swap the heights of the bars instead of actually swapping the bars, but it looks like they swapped, ultimate illusion, also change the text of the bars
        [bars[idx1].style.height, bars[idx2].style.height] = [
          bars[idx2].style.height,
          bars[idx1].style.height,
        ];

        [bars[idx1].innerText, bars[idx2].innerText] = [
          `${parseInt(bars[idx1].style.height.replace("px", "")) / 50}`,
          `${parseInt(bars[idx2].style.height.replace("px", "")) / 50}`,
        ];

        // Change the color back to original
        [bars[idx1].style.backgroundColor, bars[idx2].style.backgroundColor] = [
          "deepskyblue",
          "deepskyblue",
        ];
        break;

      case "copy":
        bars[idx2].style.backgroundColor = "crimson";
        bars[idx2].style.height = bars[idx1].style.height;
        bars[idx2].innerText =
          parseInt(bars[idx2].style.height.replace("px", "")) / 50;
        await this.sleep(delay);
        bars[idx2].style.backgroundColor = "deepskyblue";
        break;

      case "change":
        bars[idx1].style.backgroundColor = "crimson";
        bars[idx1].style.height = `${idx2 * 50}px`;
        await this.sleep();
        bars[idx1].style.backgroundColor = "deepskyblue";
        break;

      default:
        toast.error("invalid animation");
    }
  }

  sleep(delay = this.state.delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  async determineAlg() {
    const { algorithm } = this.state;

    switch (algorithm) {
      case "Bubble":
        this.bubbleSort();
        break;
      case "Selection":
        this.selectionSort();
        break;
      case "Insertion":
        this.insertionSort();
        break;
      case "Merge":
        this.setState({ sorting: true });
        await this.mergeSort();
        this.setState({ sorting: false, stage: null });
        toast.success("Array is sorted");
        break;
      case "Quick":
        this.setState({ sorting: true });
        await this.quickSort();
        this.setState({ sorting: false, stage: null });
        toast.success("Array is sorted");
        break;
      default:
        toast.error(`Select an algorithm first`);
        break;
    }
  }

  render() {
    const { array, delay, sorting } = this.state;

    const algorithms = ["Bubble", "Selection", "Insertion", "Merge", "Quick"];
    return (
      <main>
        <ToastContainer position="top-right" />
        <div className="sort-container">
          {algorithms.map((algorithm) => (
            <div
              onClick={() => this.setState({ algorithm })}
              disabled={sorting}
              key={algorithm}
              style={{
                backgroundColor:
                  algorithm === this.state.algorithm && "deepskyblue",
                color: algorithm === this.state.algorithm && "white",
                padding: "0.5rem",
                borderRadius: "0.2rem",
                textAlign: "center",
              }}
            >
              {algorithm}
            </div>
          ))}
        </div>
        <div className="bars-container">
          {array.map((n, i) => (
            <div
              style={{ height: `${n * 50}px` }}
              key={`${n}-${i}`}
              className="bar"
            >
              {n}
            </div>
          ))}
        </div>
        <div className="delay">
          <input
            type="range"
            min={200}
            max={500}
            value={delay}
            step={100}
            onChange={(e) => this.setState({ delay: e.target.value })}
          />
          <p>Delay: {delay}ms</p>
          <input
            type="text"
            placeholder="Create your own array"
            style={{ height: "30px", paddingLeft: "0.5rem" }}
            value={this.state.customArray}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
          />
          <button
            onClick={() => {
              const customArray = this.state.customArray
                .split(",")
                .map((n) => parseInt(n));
              console.log(customArray);
              if (customArray.some((n) => isNaN(n))) {
                toast.error("Please separate numbers with one comma");
                return;
              } else if (!customArray.every((n) => n <= 10 && n >= 1)) {
                toast.error(
                  "Make sure all numbers are less than or equal to 10 and greater than 0 for display purposes"
                );
                return;
              } else if (customArray.length > 10 || customArray.length < 1) {
                toast.error(
                  "Please enter less than 10 and more than 0 elements in the array"
                );
                return;
              }
              this.setState({ array: customArray });
            }}
          >
            Go
          </button>
        </div>
        <div className="options">
          <button onClick={() => this.generateArray()} disabled={sorting}>
            Generate Array
          </button>
          <button
            onClick={async () => {
              this.determineAlg();
            }}
            disabled={sorting}
          >
            Sort
          </button>
          <img
            src="/info.svg"
            alt="info"
            style={{ height: "20px" }}
            onClick={() => this.setState({ modal: true })}
          />
        </div>
        <Code algorithm={this.state.algorithm} stage={this.state.stage} />
        {this.state.modal && (
          <Modal
            algorithm={this.state.algorithm}
            setModalFalse={() => this.setState({ modal: false })}
          />
        )}
      </main>
    );
  }
}

export default Algorithm;
