import { useEffect, useState } from "react";
import { useBrowsercontext } from "../../context/browser-context";
import { quotes } from "../../db/quotes";
import { ToDo } from "../../components/ToDo";

const index = Math.floor(Math.random() * quotes.length);
const randomQuotes = quotes[index].quote;

export const TaskPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);

  const { time, name, message, task, browserDispatch } = useBrowsercontext();
  useEffect(() => {
    getCurrentTime();
  }, []);

  useEffect(() => {
    const myTask = localStorage.getItem("task");
    browserDispatch({
      type: "TASK",
      payload: myTask,
    });

    if(new Date().getDate() !== Number(localStorage.getItem("date"))){
      localStorage.removeItem("task");
      localStorage.removeItem("date");
      localStorage.removeItem("checkedStatus")
    }
  }, []);

  useEffect(() => {
    const checkStatus = localStorage.getItem("checkedStatus");
    checkStatus === "true" ? setIsChecked(true) : setIsChecked(false);
  }, []);
  const handleTaskChange = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      const enteredTask = event.target.value;
      browserDispatch({
        type: "TASK",
        payload: enteredTask,
      });
      localStorage.setItem("task", enteredTask);
      localStorage.setItem("date", new Date().getDate());
    }
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
  };

  const getCurrentTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    const hour = hours < 10 ? `0:${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}` : minutes;

    const currentTime = `${hour}:${minute}`;
    setTimeout(getCurrentTime, 1000);

    browserDispatch({
      type: "TIME",
      payload: currentTime,
    });

    browserDispatch({
      type: "MESSAGE",
      payload: hours,
    });
  };

  const taskHandler = (event) => {
    if (event.target.checked) {
      setIsChecked((isChecked) => !isChecked);
    } else {
      setIsChecked((isChecked) => !isChecked);
    }
    localStorage.setItem("checkedStatus", !isChecked);
  };

  const handleTaskClear = () => {
    browserDispatch({
      type: "CLEAR",
    });
    localStorage.removeItem("task");
    localStorage.removeItem("checkedStatus");
    setIsChecked(false);
  };

  const handleTodoOpen = () =>{
    setTodoOpen(todoOpen => !todoOpen);
  }

  return (
    <div className="relative ">
      <div className="flex flex-col items-center gap-4 absolute top-40 left-120">
        <span className="text-7xl font-semibold">{time}</span>
        <span className="text-5xl">
          {message}, {name}
        </span>

        {name.length > 0 && task == null ? (
          <>
            <span className="text-4xl">Whats your main focus today ?</span>
            <form onSubmit={handleTaskSubmit}>
              <input
                onKeyUp={handleTaskChange}
                className="text-5xl outline-none bg-transparent text-center bg-[#F8FAFC] border-b-2 w-[35vw]"
              />
            </form>
          </>
        ) : (
          <div className="flex flex-col gap-3.5 absolute top-45">
            <span className="text-4xl">Today's Focus </span>
            <div className="flex items-center justify-between">
              <label
                className={`${
                  isChecked ? "line-through" : ""
                } text-3xl flex items-center gap-10`}
                for="checkbox"
              >
                <input
                  className="w-4 h-4"
                  required
                  id="checkbox"
                  checked={isChecked}
                  type="checkbox"
                  onChange={taskHandler}
                />
                {task}
              </label>
              <button onClick={handleTaskClear}>
                <span class="material-icons-outlined">clear</span>
              </button>
            </div>
          </div>
        )}
        <div className="absolute top-120">
          <p className="text-1xl font-semibold text-gray-500">{randomQuotes}</p>
        </div>
        {
          todoOpen && <ToDo /> 
        }
        <div className="absolute  top-120 left-230">
          <button onClick={handleTodoOpen} className="text-3xl font-medium hover:cursor-pointer">ToDo</button>
        </div>
      </div>
    </div>
  );
};
