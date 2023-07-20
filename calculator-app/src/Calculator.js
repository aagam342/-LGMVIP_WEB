import React, { useState } from "react";
import Button from "./Components/Button";
import Display from "./Components/Display";
import "./Styles/main.scss";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("");
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleButtonPress = (label) => {
    setDisplayValue((prevValue) => prevValue + label);
  };

  const handleClear = () => {
    setDisplayValue("");
  };

  const handleEquals = () => {
    try {
      const operators = ["+", "-", "*", "/", "^", "%"];
      const parts = displayValue.split(
        new RegExp(`([${operators.join("\\")}]|\\s)`, "g")
      );
      let result = parseFloat(parts[0]);

      for (let i = 1; i < parts.length; i++) {
        const operator = parts[i];
        const operand = parseFloat(parts[i + 1]);

        switch (operator) {
          case "+":
            result += operand;
            break;
          case "-":
            result -= operand;
            break;
          case "*":
            result *= operand;
            break;
          case "/":
            result /= operand;
            break;
          case "^":
            const powerResult = handlePower(result, operand);
            if (powerResult === null) {
              throw new Error("Invalid power operation");
            }
            result = powerResult;
            break;
          case "%":
            const percentageResult = handlePercentage(result, operand);
            if (percentageResult === null) {
              throw new Error("Invalid percentage operation");
            }
            result = percentageResult;
            break;
          default:
            break;
        }
      }
      if (!isNaN(result)) {
        setHistory((prevHistory) => [
          ...prevHistory,
          { expression: displayValue, result },
        ]);
        setDisplayValue(result.toString());
      }
    } catch (error) {
      setDisplayValue("ERROR");
    }
  };

  const handleBackspace = () => {
    setDisplayValue((prevDisplay) => {
      if (!prevDisplay || prevDisplay.length === 1) {
        return "0";
      } else {
        return prevDisplay.slice(0, -1);
      }
    });
  };

  const handlePower = (base, exponent) => {
    if (!isNaN(base) && !isNaN(exponent)) {
      return Math.pow(base, exponent);
    } else {
      return null;
    }
  };

  const handlePercentage = (percent, totalValue) => {
    if (!isNaN(percent) && !isNaN(totalValue)) {
      return (percent * totalValue) / 100;
    } else {
      return null;
    }
  };

  const handleToggleSign = () => {
    setDisplayValue((prevDisplay) => {
      if (prevDisplay[0] === "-") {
        return prevDisplay.slice(1);
      } else {
        return "-" + prevDisplay;
      }
    });
  };

  const handleSquareRoot = () => {
    try {
      const result = Math.sqrt(parseFloat(displayValue));
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue("ERROR");
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleToggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="button-row">
        {/* Number Buttons */}
        <Button label="1" onClick={() => handleButtonPress("1")} />
        <Button label="2" onClick={() => handleButtonPress("2")} />
        <Button label="3" onClick={() => handleButtonPress("3")} />
        {/* Parentheses */}
        <Button label="(" onClick={() => handleButtonPress("(")} />
        <Button label=")" onClick={() => handleButtonPress(")")} />
      </div>
      <div className="button-row">
        <Button label="4" onClick={() => handleButtonPress("4")} />
        <Button label="5" onClick={() => handleButtonPress("5")} />
        <Button label="6" onClick={() => handleButtonPress("6")} />
        <Button label="+" onClick={() => handleButtonPress("+")} />
        <Button label="-" onClick={() => handleButtonPress("-")} />
      </div>
      <div className="button-row">
        <Button label="7" onClick={() => handleButtonPress("7")} />
        <Button label="8" onClick={() => handleButtonPress("8")} />
        <Button label="9" onClick={() => handleButtonPress("9")} />
        <Button label="*" onClick={() => handleButtonPress("*")} />
        <Button label="/" onClick={() => handleButtonPress("/")} />
      </div>
      <div className="button-row">
        {/* Scientific Functions */}
        <Button label="√" onClick={handleSquareRoot} />
        <Button label="0" onClick={() => handleButtonPress("0")} />
        <Button label="." onClick={() => handleButtonPress(".")} />
        <Button label="=" onClick={handleEquals} />
        <Button label="C" onClick={handleClear} />
      </div>
      <div className="button-row">
        {/* Additional Buttons */}
        <Button label="^" onClick={() => handleButtonPress("^")} />
        <Button label="%" onClick={() => handleButtonPress("%")} />
        <Button label="←" onClick={handleBackspace} />
        <Button label="+/-" onClick={handleToggleSign} />
        <button className="history-button" onClick={handleToggleHistory}>
          {isHistoryOpen ? "Hide History" : "Show History"}
        </button>
      </div>
      {isHistoryOpen && (
        <div className="history-section">
          <h3>History</h3>
          <div className="history-list">
            {history.length > 0 ? (
              <>
                <ul>
                  {history.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => setDisplayValue(item.expression)}
                    >
                      <span className="expression">
                        &nbsp;{item.expression} ={" "}
                      </span>
                      <span className="result">&nbsp;{item.result}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No History Available</p>
            )}
          </div>
          {history.length > 0 ? (
            <button
              className="clear-history-button"
              onClick={handleClearHistory}
            >
              Clear History
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;
