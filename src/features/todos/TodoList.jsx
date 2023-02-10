import { useState } from "react";
import { BiUpload } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../api/apiSlice";
import Spinner from "./Spinner";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const[addTodo]=useAddTodoMutation()
  const[updateTodo]=useUpdateTodoMutation()
  const[deleteTodo]=useDeleteTodoMutation()

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({userId:1, title:newTodo, completed:false})
    setNewTodo("");
  };
  const newItemSection = (
    <form
      autoComplete="off"
      className="w-full h-[70px] relative my-4 border border-slate-700"
      onSubmit={handleSubmit}
    >
      <label htmlFor="new-todo" className="absolute left-[-200%]">
        Enter new todo
      </label>
      <div className="flex justify-between items-center h-full p-4 gap-2">
        <input
          className="w-full h-10 border border-gray-500 px-2 rounded-xl"
          type="text"
          //   checked=""
          value={newTodo}
          name="newTodo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <BiUpload
          size={40}
          className=" bg-slate-400 p-1 text-white duration-500 hover:duration-500 hover:text-green-500 hover:scale-105 cursor-pointer rounded-lg"
        />
      </div>
    </form>
  );

  let content;
  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = todos.map((todo) => (
      <section
        className="w-full h-[80px]   border border-slate-700"
        key={todo.id}
      >
        <div className="flex justify-between items-center h-full p-4 gap-2">
          <div>
            <input
              className="h-7 w-7 border  border-gray-500 px-2  rounded-lg mr-2 cursor-pointer"
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={()=>{updateTodo({...todo,completed:!todo.completed})}}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <BsTrash size={40}
          className="border border-slate-400 p-1 text-orange-500  duration-500 hover:duration-500 hover:text-red-700 hover:scale-125 cursor-pointer rounded-md"
          onClick={()=>{deleteTodo({id:todo.id})}}
          />
        </div>
      </section>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section className="max-w-[600px] p-4 m-auto flex flex-col ">
      <h1 className="text-5xl">Todo List</h1>
      <div>{newItemSection}</div>
      <div>{content}</div>
    </section>
  );
};

export default TodoList;
