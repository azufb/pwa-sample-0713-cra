import { useEffect, useState } from "react";
import { RegisterTodo } from "./components/organisms/RegisterTodo/RegisterTodo";
import { TodoList } from "./components/organisms/TodoList/TodoList";
import { TodoItem } from "./components/organisms/TodoList/TodoListPresenter";
import { LOCAL_STORAGE_NAME } from "./CONST";

function App() {
  const todos = localStorage.getItem(LOCAL_STORAGE_NAME);
  const parsedTodos = todos != null ? JSON.parse(todos) : [];
  const [todoList, setTodoList] = useState<TodoItem[]>(parsedTodos);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          new Notification("通知が許可されました！");
        }
      });
    }
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-center my-6 font-bold text-3xl">PWA TODO</h1>
      {/** Todo登録フォーム */}
      <RegisterTodo setTodoList={setTodoList} />

      <hr className="my-4" />

      {/** Todo一覧 */}
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default App;
