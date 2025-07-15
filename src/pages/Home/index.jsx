import { useBrowsercontext } from "../../context/browser-context";
import { Footer } from "../footer";

export const Home = () => {
  const { name, browserDispatch } = useBrowsercontext();
  const handleNameChange = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      event.preventDefault();
      browserDispatch({
        type: "NAME",
        payload: event.target.value,
      });
      localStorage.setItem("name", event.target.value);
    }
  };

  const handleRefresh = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="flex flex-col gap-10 justify-center absolute top-60 left-120">
        <span className="text-5xl">Hello, What's Your Name</span>
        <form onSubmit={handleRefresh}>
          <input
            onKeyDown={handleNameChange}
            className="text-5xl outline-none bg-transparent text-center bg-[#F8FAFC] border-b-2 w-[40vw]"
          />
        </form>
      </div>

      <Footer />
    </>
  );
};
