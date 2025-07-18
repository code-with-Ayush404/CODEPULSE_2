// import { useState } from "react";
// import Nav from "../NavBarSide/nav";
// function ArrayBar({ value, index, currentIndices, comparingIndices, sortedIndices, mergedIndices }) {
//   const baseClasses = "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-xl hover:scale-105";
  
//   let bgColor = "bg-sky-400";
//   if (mergedIndices.includes(index)) bgColor = "bg-purple-500";
//   else if (sortedIndices.includes(index)) bgColor = "bg-green-500";
//   else if (currentIndices.includes(index)) bgColor = "bg-yellow-500 animate-pulse";
//   else if (comparingIndices.includes(index)) bgColor = "bg-red-500 ring-2 ring-red-300";

//   return (
//     <div className={`${baseClasses} ${bgColor}`} style={{ height: `${value * 3}px` }}>
//       <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">{value}</span>
//     </div>
//   );
// }

// export default function MergeSort() {
//   const [size, setSize] = useState(10);
//   const [speed, setSpeed] = useState(50);
//   const [show, setShow] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [customArray, setCustomArray] = useState([]);
//   const [isSorting, setIsSorting] = useState(false);
//   const [messages, setMessages] = useState([]);
  
//   // Visualization states
//   const [currentIndices, setCurrentIndices] = useState([]); // Current subarrays being processed
//   const [comparingIndices, setComparingIndices] = useState([]); // Elements being compared
//   const [sortedIndices, setSortedIndices] = useState([]); // Already sorted elements
//   const [mergedIndices, setMergedIndices] = useState([]); // Just merged elements

//   const generateRandomArray = () => {
//     const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
//     setCustomArray(arr);
//     resetVisualization();
//   };

//   const handleSubmit = () => {
//     const array = inputValue
//       .split(",")
//       .map((item) => parseInt(item.trim(), 10))
//       .filter((item) => !isNaN(item));
//     setCustomArray(array);
//     resetVisualization();
//   };

//   const resetVisualization = () => {
//     setCurrentIndices([]);
//     setComparingIndices([]);
//     setSortedIndices([]);
//     setMergedIndices([]);
//     setMessages([]);
//   };

//   const addMessage = (text) => {
//     setMessages((msgs) => [...msgs, text]);
//   };

//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   const mergeSort = async () => {
//     setIsSorting(true);
//     resetVisualization();
//     let arr = [...customArray];
//     await performMergeSort(arr, 0, arr.length - 1);
//     setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
//     addMessage("Sorting complete!");
//     setIsSorting(false);
//   };

//   const performMergeSort = async (arr, left, right) => {
//     if (left >= right) return;

//     const mid = Math.floor((left + right) / 2);
    
//     // Visualize the current split
//     setCurrentIndices(Array.from({ length: right - left + 1 }, (_, i) => left + i));
//     addMessage(`Splitting array from index ${left} to ${right}`);
//     await delay(1000 - speed * 9);

//     // Recursively sort left and right halves
//     await performMergeSort(arr, left, mid);
//     await performMergeSort(arr, mid + 1, right);

//     // Visualize merging
//     addMessage(`Merging sorted subarrays from ${left} to ${mid} and ${mid+1} to ${right}`);
//     await merge(arr, left, mid, right);
//   };

//   const merge = async (arr, left, mid, right) => {
//     const temp = [];
//     let i = left;
//     let j = mid + 1;
//     let k = 0;

//     // Highlight the two subarrays being merged
//     const leftSubarray = Array.from({ length: mid - left + 1 }, (_, idx) => left + idx);
//     const rightSubarray = Array.from({ length: right - mid }, (_, idx) => mid + 1 + idx);
//     setCurrentIndices([...leftSubarray, ...rightSubarray]);
//     await delay(1000 - speed * 9);

//     while (i <= mid && j <= right) {
//       // Highlight the elements being compared
//       setComparingIndices([i, j]);
//       await delay(1000 - speed * 9);

//       if (arr[i] <= arr[j]) {
//         temp[k++] = arr[i++];
//       } else {
//         temp[k++] = arr[j++];
//       }
//     }

//     while (i <= mid) {
//       temp[k++] = arr[i++];
//     }

//     while (j <= right) {
//       temp[k++] = arr[j++];
//     }

//     // Copy the merged elements back to the original array
//     for (let x = 0; x < temp.length; x++) {
//       arr[left + x] = temp[x];
      
//       // Visualize the merge step
//       setMergedIndices(prev => [...prev, left + x]);
//       await delay(1000 - speed * 9);
//     }

//     // Update the array state
//     setCustomArray([...arr]);
//     setMergedIndices([]);
//     setComparingIndices([]);
    
//     // Mark this subarray as sorted
//     const newSorted = Array.from({ length: right - left + 1 }, (_, i) => left + i);
//     setSortedIndices(prev => [...prev, ...newSorted]);
//     await delay(1000 - speed * 9);
//   };

//   return (
//     <><div className="grid grid-cols-5 gap-4">
//             <div className="col-span-1">
//             <Nav></Nav> </div>
//     <div className="col-span-4 min-h-screen w-full  bg-gray-900 text-white p-8 font-sans">
//       <div className="flex flex-wrap items-center gap-4 mb-6  bg-slate-800/80 md:h-25 w-full rounded-xl p-4 border-slate-500 border-1">
//         <label className="flex items-center gap-2">
//           <strong>Size:</strong>
//           <input
//             type="number"
//             value={size}
//             disabled={isSorting}
//             onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))}
//             className="w-16 px-2 py-1 rounded border border-gray-600 bg-gray-800 text-white"
//           />
//         </label>

//         <label className="flex items-center gap-2">
//           <strong>Speed: {speed}%</strong>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={speed}
//             disabled={isSorting}
//             onChange={(e) => setSpeed(+e.target.value)}
//             className="w-32 text-blue-500"
//           />
//         </label>

//         <button
//           onClick={() => setShow((prev) => !prev)}
//           disabled={isSorting}
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300"
//         >
//           {show ? "Hide Custom Input" : "Enter Custom Array"}
//         </button>

//         <button
//           onClick={generateRandomArray}
//           disabled={isSorting}
//           className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition-all duration-300"
//         >
//           Generate Random Array
//         </button>

//         <button
//           onClick={mergeSort}
//           disabled={isSorting || customArray.length === 0}
//           className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg transition-all duration-300"
//         >
//           Start Merge Sort
//         </button>
//       </div>

//       {show && (
//         <div className="mb-6">
//           <p className="mb-2">Enter array values (comma separated):</p>
//           <input
//             type="text"
//             placeholder="e.g. 10, 5, 22, 1, 7"
//             value={inputValue}
//             disabled={isSorting}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-800 text-white text-lg"
//           />
//           <button
//             onClick={handleSubmit}
//             disabled={isSorting}
//             className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg text-lg transition-all duration-300"
//           >
//             Submit
//           </button>
//         </div>
//       )}

//       {customArray.length > 0 && (
//         <>
//           <div className="bg-slate-800 p-8 border-slate-500 border-1 rounded-2xl shadow-2xl w-full mb-6 animate-fade-in">
//             <h2 className="text-2xl font-semibold mb-4 text-center text-white drop-shadow-md">Your Array:</h2>
//             <div className="flex justify-center overflow-x-auto">
//               <div className="flex items-end gap-2 py-8 h-[400px]">
//                 {customArray.map((value, index) => (
//                   <ArrayBar
//                     key={index}
//                     value={value}
//                     index={index}
//                     currentIndices={currentIndices}
//                     comparingIndices={comparingIndices}
//                     sortedIndices={sortedIndices}
//                     mergedIndices={mergedIndices}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div
//             id="messages-container"
//             className="max-h-48 overflow-y-auto border border-gray-700 rounded p-4 space-y-3 bg-gray-800 animate-fade-in"
//           >
//             {messages.length === 0 && (
//               <p className="text-gray-400 text-center italic">Merge sort steps will appear here.</p>
//             )}
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className="border-l-4 border-cyan-400 bg-cyan-900/40 p-3 rounded shadow text-green-300 font-bold font-mono animate-pulse"
//               >
//                 {msg}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div></div></>
//   );
// } 






import { useState } from "react";
import Nav from "../NavBarSide/nav";

function ArrayBar({ value, index, currentIndices, comparingIndices, sortedIndices, mergedIndices }) {
  const baseClasses =
    "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-xl hover:scale-105";

  let bgColor = "bg-[#8C8DC1]";
  let textColor = "text-white";
  let ring = "";
  let shadow = "shadow-[0_0_8px_2px_rgba(59,130,246,0.4)]";

  if (mergedIndices.includes(index)) {
    bgColor = "bg-[#580C8E]";
    ring = "ring-1 ring-[#3e0966]";
    shadow = "shadow-[0_0_16px_4px_rgba(88,12,142,0.65)]";
  } else if (sortedIndices.includes(index)) {
    bgColor = "bg-[#313272]";
    ring = "ring-1 ring-[#1e1f4d]";
    shadow = "shadow-[0_0_20px_5px_rgba(49,50,114,0.8)]";
  } else if (currentIndices.includes(index)) {
    bgColor = "bg-[#DEDEFA]";
    ring = "ring-2 ring-[#b7b7f5]";
    shadow = "shadow-[0_0_18px_4px_rgba(222,222,250,0.7)]";
  } else if (comparingIndices.includes(index)) {
    bgColor = "bg-[#4d4e8c]";
    ring = "ring-1 ring-blue-300";
    shadow = "shadow-[0_0_10px_2px_rgba(147,197,253,0.5)]";
  }

  return (
    <div className={`${baseClasses} ${bgColor} ${textColor} ${ring} ${shadow}`} style={{ height: `${value * 3}px` }}>
      <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">{value}</span>
    </div>
  );
}

export default function MergeSort() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customArray, setCustomArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [messages, setMessages] = useState([]);

  const [currentIndices, setCurrentIndices] = useState([]);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [mergedIndices, setMergedIndices] = useState([]);

  const generateRandomArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setCustomArray(arr);
    resetVisualization();
  };

  const handleSubmit = () => {
    const array = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    setCustomArray(array);
    resetVisualization();
  };

  const resetVisualization = () => {
    setCurrentIndices([]);
    setComparingIndices([]);
    setSortedIndices([]);
    setMergedIndices([]);
    setMessages([]);
  };

  const addMessage = (text) => {
    setMessages((msgs) => [...msgs, text]);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const mergeSort = async () => {
    setIsSorting(true);
    resetVisualization();
    let arr = [...customArray];
    await performMergeSort(arr, 0, arr.length - 1);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
    addMessage("Sorting complete!");
    setIsSorting(false);
  };

  const performMergeSort = async (arr, left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    setCurrentIndices(Array.from({ length: right - left + 1 }, (_, i) => left + i));
    addMessage(`Splitting array from index ${left} to ${right}`);
    await delay(1000 - speed * 9);

    await performMergeSort(arr, left, mid);
    await performMergeSort(arr, mid + 1, right);

    addMessage(`Merging subarrays from ${left} to ${mid} and ${mid + 1} to ${right}`);
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    const temp = [];
    let i = left;
    let j = mid + 1;
    let k = 0;

    const leftSub = Array.from({ length: mid - left + 1 }, (_, idx) => left + idx);
    const rightSub = Array.from({ length: right - mid }, (_, idx) => mid + 1 + idx);
    setCurrentIndices([...leftSub, ...rightSub]);
    await delay(1000 - speed * 9);

    while (i <= mid && j <= right) {
      setComparingIndices([i, j]);
      await delay(1000 - speed * 9);
      if (arr[i] <= arr[j]) {
        temp[k++] = arr[i++];
      } else {
        temp[k++] = arr[j++];
      }
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (let x = 0; x < temp.length; x++) {
      arr[left + x] = temp[x];
      setMergedIndices((prev) => [...prev, left + x]);
      await delay(1000 - speed * 9);
    }

    setCustomArray([...arr]);
    setMergedIndices([]);
    setComparingIndices([]);
    setSortedIndices((prev) => [...prev, ...Array.from({ length: right - left + 1 }, (_, i) => left + i)]);
    await delay(1000 - speed * 9);
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <Nav />
        </div>
        <div className="col-span-4 min-h-screen w-full bg-white text-white p-8 font-sans">
          <div className="flex flex-wrap items-center gap-4 mb-6 bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] rounded-xl p-10 border-white border-1">
            <label className="flex items-center gap-2">
              <strong className="text-black text-lg">Size:</strong>
              <input
                type="number"
                value={size}
                disabled={isSorting}
                onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))}
                className="w-16 px-2 py-1 rounded border border-gray-600 bg-white text-black"
              />
            </label>

            <label className="flex items-center gap-2">
              <strong className="text-black text-lg">Speed: {speed}%</strong>
              <input
                type="range"
                min="0"
                max="100"
                value={speed}
                disabled={isSorting}
                onChange={(e) => setSpeed(+e.target.value)}
                className="w-32 text-blue-500"
              />
            </label>

            <button
              onClick={() => setShow((prev) => !prev)}
              disabled={isSorting}
              className="px-4 py-2 text-white font-semibold bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg shadow-lg hover:to-blue-800"
            >
              {show ? "Hide Custom Input" : "Enter Custom Array"}
            </button>

            <button
              onClick={generateRandomArray}
              disabled={isSorting}
              className="px-4 py-2 font-semibold bg-gradient-to-r from-blue-800 to-blue-900 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg"
            >
              Generate Random Array
            </button>

            <button
              onClick={mergeSort}
              disabled={isSorting || customArray.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg"
            >
              Start Merge Sort
            </button>
          </div>

          {show && (
            <div className="mb-6">
              <p className="mb-2 text-black text-lg">Enter array values (comma separated):</p>
              <input
                type="text"
                placeholder="e.g. 10, 5, 22, 1, 7"
                value={inputValue}
                disabled={isSorting}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 rounded border border-purple-500 bg-purple-100 text-black text-lg"
              />
              <button
                onClick={handleSubmit}
                disabled={isSorting}
                className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 hover:text-white rounded-lg shadow-lg text-lg"
              >
                Submit
              </button>
            </div>
          )}

          {customArray.length > 0 && (
            <>
              <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] p-8 rounded-2xl shadow-2xl w-full mb-6 animate-fade-in border-white border-1">
                <h2 className="text-2xl font-semibold mb-4 text-center text-black drop-shadow-md">Your Array:</h2>
                <div className="flex justify-center overflow-x-auto">
                  <div className="flex items-end gap-2 py-8 h-[400px]">
                    {customArray.map((value, index) => (
                      <ArrayBar
                        key={index}
                        value={value}
                        index={index}
                        currentIndices={currentIndices}
                        comparingIndices={comparingIndices}
                        sortedIndices={sortedIndices}
                        mergedIndices={mergedIndices}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                id="messages-container"
                className="max-h-48 overflow-y-auto border border-gray-600 rounded p-4 space-y-3 bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] animate-fade-in"
              >
                {messages.length === 0 && (
                  <p className="text-black text-center italic">Merge sort steps will appear here.</p>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-[#313272] bg-[#8C8DC1] p-3 rounded shadow text-white font-bold font-mono"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
