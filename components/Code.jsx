import React from "react";

export default function Code({ algorithm, stage }) {
  switch (algorithm) {
    case "Bubble":
      return (
        <div className="code-container">
          <div className={`${stage === 1 ? "highlight" : ""}`}>
            while (swap) <br /> &emsp;swap = false <br /> &emsp;for i = 1 to
            length of array - 1
          </div>
          <div className={`${stage === 2 ? "highlight" : ""}`}>
            &emsp;&emsp;if element at i is less than element at i - 1
          </div>
          <div className={`${stage === 3 ? "highlight" : ""}`}>
            &emsp;&emsp;&emsp;swap the 2 elements <br /> &emsp;&emsp;&emsp;swap
            = true
          </div>
          <div className={`${stage === 4 ? "highlight" : ""}`}>
            &emsp;-1 from the length of the array
          </div>
        </div>
      );
    case "Selection":
      return (
        <div className="code-container">
          <div className={`${stage === 1 ? "highlight" : ""}`}>
            for i = 0 to length of array - 1 <br /> &emsp;set the element at
            position i as the minimum <br />
            &emsp;for j = i + 1 to length of array
          </div>
          <div className={`${stage === 2 ? "highlight" : ""}`}>
            &emsp;&emsp;if element at position j is less than element at the
            minimum position
          </div>
          <div className={`${stage === 3 ? "highlight" : ""}`}>
            &emsp;&emsp;&emsp;set minimum to j
          </div>
          <div className={`${stage === 4 ? "highlight" : ""}`}>
            &emsp;if minimum is not equal to i
          </div>
          <div className={`${stage === 5 ? "highlight" : ""}`}>
            &emsp;&emsp;swap the elements at position i and minimum
          </div>
        </div>
      );
    case "Insertion":
      return (
        <div className="code-container">
          <div className={`${stage === 1 ? "highlight" : ""}`}>
            for i = 1 to length of array - 1 <br />
            &emsp;copy the element at position i<br />
            &emsp;set j = i - 1
          </div>
          <div className={`${stage === 2 ? "highlight" : ""}`}>
            &emsp;while j &gt;= to 0 and element at position j is greater than
            the copied element
          </div>
          <div className={`${stage === 3 ? "highlight" : ""}`}>
            &emsp;&emsp;copy the element at position j to position j + 1
            <br /> &emsp;&emsp;-1 from j
          </div>
          <div className={`${stage === 4 ? "highlight" : ""}`}>
            &emsp;set the copied element to position j + 1
          </div>
        </div>
      );

    case "Merge":
      return (
        <div className="code-container">
          <div>function mergeSort(array)</div>
          <div className={`${stage === 1 ? "highlight" : ""}`}>
            &emsp;if length of array is less than 2
          </div>{" "}
          <div className={`${stage === 9 ? "highlight" : ""}`}>
            &emsp;&emsp;return
          </div>
          <div className={`${stage === 2 ? "highlight" : ""}`}>
            &emsp;recursively call mergeSort on the left half of the array
          </div>
          <div className={`${stage === 3 ? "highlight" : ""}`}>
            &emsp;recursively call mergeSort on the right half of the array
          </div>
          <div className={`${stage === 4 ? "highlight" : ""}`}>
            &emsp;merge the left and right halves of the array
          </div>
          <div>
            <br className={`${stage === 10 ? "highlight" : ""}`} />
            function merge(leftArray, rightArray)
            <br /> &emsp;create an empty array to store the result <br />
            &emsp;let i, j = 0 <br /> &emsp;while i is less than length of
            leftArray and j is less than length of rightArray
          </div>
          <div className={`${stage === 5 ? "highlight" : ""}`}>
            &emsp;&emsp;if element at position i in leftArray is less than
            element at position j in rightArray
          </div>
          <div className={`${stage === 6 ? "highlight" : ""}`}>
            &emsp;&emsp;&emsp;add element at position i in leftArray to the
            result array
          </div>
          <div className={`${stage === 7 ? "highlight" : ""}`}>
            &emsp;&emsp;else <br /> &emsp;&emsp;&emsp;add element at position j
            in rightArray
          </div>
          <div className={`${stage === 8 ? "highlight" : ""}`}>
            &emsp;append rest of elements in leftArray or rightArray to the
            result array
          </div>
          <div className={`${stage === 11 ? "highlight" : ""}`}>
            &emsp;return the result array
          </div>
        </div>
      );

    case "Quick":
      return (
        <div className="code-container">
          <div className={`${stage === 1 ? "highlight" : ""}`}>
            function quickSort(array, start=0, end = array length - 1) <br />{" "}
            &emsp;if end is less than or equal to start
          </div>
          <div className={`${stage === 2 ? "highlight" : ""}`}>
            &emsp;&emsp;return
          </div>
          <div className={`${stage === 3 ? "highlight" : ""}`}>
            &emsp;Call partition(array, start, end) to get a pivot
          </div>
          <div className={`${stage === 10 ? "highlight" : ""}`}>
            &emsp;Call quickSort(array, start, pivot - 1)
          </div>
          <div className={`${stage === 11 ? "highlight" : ""}`}>
            &emsp;Call quickSort(array, pivot + 1, end)
          </div>
          <br />
          <div className={`${stage === 4 ? "highlight" : ""}`}>
            function partition(array, start, end) <br />
            &emsp;set pivot element to element at position end
            <br />
            &emsp;let i start - 1
          </div>
          <div className={`${stage === 5 ? "highlight" : ""}`}>
            &emsp;for j = start till j is greater than end
          </div>
          <div className={`${stage === 6 ? "highlight" : ""}`}>
            &emsp;&emsp;if element at position j is less than pivot
          </div>
          <div className={`${stage === 7 ? "highlight" : ""}`}>
            &emsp;&emsp;&emsp;increase i by 1 <br /> &emsp;&emsp;&emsp;swap
            element at position i with element at position j
          </div>
          <div className={`${stage === 8 ? "highlight" : ""}`}>
            &emsp;increase i by 1 <br /> &emsp;swap element at position i with
            element at position end
          </div>
          <div className={`${stage === 9 ? "highlight" : ""}`}>
            &emsp;return i as the pivot
          </div>
        </div>
      );

    default:
      alert(`Select an algorithm first`);
      break;
  }
}
