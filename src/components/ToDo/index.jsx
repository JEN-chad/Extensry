import { useState,useEffect } from "react";
import { v4 as uuid } from "uuid";

export const ToDo = () => {
  const [todo, setTodo] = useState();
  const [todoList, setTodoList] = useState([]);

  useEffect(()=>{
    const userTodo = JSON.parse(localStorage.getItem("todo"));
    userTodo && setTodoList(userTodo);
  },[])

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };

  const handleTodoEnter = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      const updatedTodoList = [
        ...todoList,
        { _id: uuid(), todo, isCompleted: false },
      ];
      setTodoList(updatedTodoList);
      setTodo("");
      localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }
  };

  const handleTodoCheckChange = (todoId) => {
    const updatedTodoList = todoList.map((todo) =>
      todoId === todo._id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(updatedTodoList);
    localStorage.setItem(updatedTodoList);
  };

  const clearTodoList = (id)=>{
    const updatedTodoList = todoList.filter(todo => todo._id != id);
    setTodoList(updatedTodoList);
    localStorage.setItem(updatedTodoList);
  }
  return (
    <div className="w-[20vw] max-h-[30vh] flex flex-col gap-3 overflow-y-auto overflow-x-hidden absolute top-60 left-180  p-[5px]">
      <input
        value={todo}
        onKeyUp={handleTodoEnter}
        onChange={handleTodoChange}
        className="text-2xl outline-none bg-transparent text-center bg-[#F8FAFC] border-b-2 w-[18vw]"
      />

      <div className="flex flex-col gap-4">
        {todoList.map(({ _id, todo, isCompleted }) => (
          <div key={_id} className="flex items-center gap-3 w-full">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => handleTodoCheckChange(_id)}
              className="w-5 h-5 mt-1 shrink-0"
            />
            <div
              className={`flex-1 break-words whitespace-normal text-xl text-black ${
                isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {todo}
            </div>
            <button className="ml-auto text-gray-600 hover:text-red-500 shrink-0" onClick={()=>clearTodoList(_id)}>
              <span className="material-icons-outlined">clear</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
