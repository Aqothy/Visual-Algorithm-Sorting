import React from "react";

function Info({ algorithm }) {
  switch (algorithm) {
    case "Bubble":
      return (
        <div className="info">
          <div>
            <h2>Bubble Sort</h2>
            <p>
              Bubble Sort is a simple sorting algorithm that repeatedly steps
              through the list, compares adjacent elements and swaps them if
              they are in the wrong order.
            </p>
          </div>
          <div>
            <h3>Time Complexity</h3>
            <p>Best: O(n)</p>
            <p>Average: O(n^2)</p>
            <p>Worst: O(n^2)</p>
          </div>
          <div>
            <h3>Space Complexity</h3>
            <p>O(1)</p>
          </div>
          <div>
            <h3>Advantages</h3>
            <p>Simple to implement</p>
          </div>
          <div>
            <h3>Disadvantages</h3>
            <p>Not efficient for large lists</p>
          </div>
        </div>
      );
    case "Selection":
      return (
        <div className="info">
          <div>
            <h2>Selection Sort</h2>
            <p>
              Selection Sort is a simple sorting algorithm that repeatedly
              selects the index of the smallest element swaps it with the first
              unsorted element.
            </p>
          </div>
          <div>
            <h3>Time Complexity</h3>
            <p>Best: O(n^2)</p>
            <p>Average: O(n^2)</p>
            <p>Worst: O(n^2)</p>
          </div>
          <div>
            <h3>Space Complexity</h3>
            <p>O(1)</p>
          </div>
          <div>
            <h3>Advantages</h3>
            <p>Simple to implement</p>
          </div>
          <div>
            <h3>Disadvantages</h3>
            <p>Not efficient for large lists</p>
          </div>
        </div>
      );
    case "Insertion":
      return (
        <div className="info">
          <div>
            <h2>Insertion Sort</h2>
            <p>
              Insertion Sort is a simple sorting algorithm that repeatedly
              inserts an element from the unsorted part into its correct
              position in the sorted part.
            </p>
          </div>
          <div>
            <h3>Time Complexity</h3>
            <p>Best: O(n)</p>
            <p>Average: O(n^2)</p>
            <p>Worst: O(n^2)</p>
          </div>
          <div>
            <h3>Space Complexity</h3>
            <p>O(1)</p>
          </div>
          <div>
            <h3>Advantages</h3>
            <p>Simple to implement</p>
          </div>
          <div>
            <h3>Disadvantages</h3>
            <p>Not efficient for large lists</p>
          </div>
        </div>
      );
    case "Merge":
        return (
            <div className="info">
            <div>
                <h2>Merge Sort</h2>
                <p>
                Merge Sort is a divide and conquer algorithm that divides the
                input array into two halves, calls itself for the two halves, and
                then merges the two sorted halves.
                </p>
            </div>
            <div>
                <h3>Time Complexity</h3>
                <p>Best: O(n log n)</p>
                <p>Average: O(n log n)</p>
                <p>Worst: O(n log n)</p>
            </div>
            <div>
                <h3>Space Complexity</h3>
                <p>O(n)</p>
            </div>
            <div>
                <h3>Advantages</h3>
                <p>Efficient for large lists</p>
            </div>
            <div>
                <h3>Disadvantages</h3>
                <p>Complex to implement</p>
            </div>
            </div>
        );

    case "Quick":
        return (
            <div className="info">
            <div>
                <h2>Quick Sort</h2>
                <p>
                Quick Sort is a divide and conquer algorithm that picks an element
                as pivot and partitions the given array around the picked pivot.
                </p>
            </div>
            <div>
                <h3>Time Complexity</h3>
                <p>Best: O(n log n)</p>
                <p>Average: O(n log n)</p>
                <p>Worst: O(n^2)</p>
            </div>
            <div>
                <h3>Space Complexity</h3>
                <p>O(log n)</p>
            </div>
            <div>
                <h3>Advantages</h3>
                <p>Efficient for large lists</p>
            </div>
            <div>
                <h3>Disadvantages</h3>
                <p>Not stable</p>
            </div>
            </div>
        );
    default:
      alert(`Select an algorithm first`);
      break;
  }
}

export default function Modal({ algorithm, setModalFalse }) {
  return (
    <div className="modal" onClick={setModalFalse}>
      <div onClick={(e) => e.stopPropagation()}>
        <Info algorithm={algorithm} />
      </div>
    </div>
  );
}
