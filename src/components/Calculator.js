import React from "react";

//useState accepts an initial state and returns two values:
//The current state.
//A function that updates the state.
//The useEffect Hook allows you to perform side effects in your components.
//Some examples of side effects are: fetching data, directly updating the DOM, and timers.
import { useState, useEffect } from "react"; //useEffect runs on every render
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";

export function Caculator() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  //function to handle numbers and decimal buttons.
  const inputNum = (e) => {
    //The includes() method returns true if a string contains a specified string

    if (curState.includes(".") && e.target.innerText === ".") return;
    // it is checking whether the String is containing the dot or not if present it will simply rturn
    //and if we pressdot again it will not let you orint two dots.

    if (total) {
      //if the total is true it will check in background and setPrevious state to empty.
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText) //current state checks if there is a no. in previous state and we press another number it will be added next to it.
      : setCurState(e.target.innerText); //If we donot have any previous state then it will set the current state to what we press the value button
    setTotal(false); // set the total to false now ready of the calculations.
  };

  useEffect(() => {
    setInput(curState); // we will set the input to current state
  }, [curState]); // so every time the current state changes.

  useEffect(() => {
    setInput("0"); // and will set the input to 0.
  }, []); // this will be called once due to empty nodes.

  //function to handle onclick operators(+,-,/,*)
  const operatorType = (e) => {
    setTotal(false); //when we press the button it will set the total to false and do the calculation in background.
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      //if there is a previous state then we call equal function for the calculation and store in memory
      equals();
    } else {
      setPreState(curState); // if we donot have anything in a previous state the set the value of the previous state to current state.
      setCurState(""); // and current state value to null
    }
  };

  //function to manage equal to operator
  const equals = (e) => {
    if (e?.target.innerText === "=") {
      // if we want the final value then check if event if its equal to (=) button it will setTotal to true as it's a boolean.
      setTotal(true); //Now set the total to true and start the calculatons.
    }

    //CALCULATIONS:-
    let cal;
    switch (operator) {
      case "/":
        try {
          if (curState === "0") {
            throw new Error("Arithmetic Exception Occured !!");
          }
          cal = String(parseFloat(preState) / parseFloat(curState)); //dividing the previous state value with the current state value
        } catch (error) {
           toast.error(error.message);
           toast.error(" A number can't be divided by 0");
        }
        //The parseFloat() method parses a value as a string and returns the first number

        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState)); //adding the previous state value with the current state value
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState)); //multiplying the previous state value with the current state value
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState)); //subtracting the previous state value with the current state value
        break;
      default:
        //default state
        return;
    }
    setInput(""); //setting the input to null
    setPreState(cal); // The value which is calculated in 'cal' is assigned to previous state.
    setCurState(""); //setting the current state value to null
  };

  //function to manage +/- button
  const minusPlus = () => {
    //The charAt() method returns the character at a specified index (position) in a string

    if (curState.charAt(0) === "-") {
      //checking the position at index 0 is equal to (-)minus or not.
      //The substring() method extracts characters, between two indices (positions), from a string, and returns the substring.

      setCurState(curState.substring(1)); // If the number is having (-) at 0 index then it will print the number as it is from index 1.
    } else {
      setCurState("-" + curState); // If the number is not having (-) at 0 index then it will put the (-) and then the number.(concatinating with the current state)
    }
  };

  //function to manage percentage button
  const percent = () => {
    preState //check for thr previous state
      ? setCurState(
          String((parseFloat(curState) / Math.pow(100, 1)) * preState)
        ) //if we have a previous state then
      : setCurState(String(parseFloat(curState) / Math.pow(100, 1))); // f we dont have a previous state then perform this.
  };

  //function to manage reset (AC) button
  const reset = () => {
    setPreState(""); //setting the previous state to empty
    setCurState(""); //setting the current state to empty
    setInput("0"); //Input is now set to 0
  };

  return (
    //JSX starts
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? ( // checking the input is not equal to null OR input is equal to 0 then perform Number Format.
            <NumberFormat //It is a React component to format number in an input or as a text
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div className="btn light-gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn" onClick={equals}>
          =
        </div>
      </div>
    </div>
    //JSX ends
  );
}

export default Caculator;
