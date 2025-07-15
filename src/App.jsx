import { images } from "./db/images";
import { Home } from "./pages/Home";
import "./App.css";
import { useBrowsercontext } from "./context/browser-context";
import { TaskPage } from "./pages/Tasks";
import { useEffect } from "react";

const index = Math.floor(Math.random() * images.length);
const bgImage = images[index].image;

function App() {
  const { name, browserDispatch } = useBrowsercontext();

  useEffect(() => {
    const userName = localStorage.getItem("name");
    browserDispatch({
      type: "NAME",
      payload: userName,
    });
  }, []);

  return (
    <div
      className="h-screen w-full bg-no-repeat bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {name ? <TaskPage /> : <Home />}
    </div>
  );
}

export default App;
