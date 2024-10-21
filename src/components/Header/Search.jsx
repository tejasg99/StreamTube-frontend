import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function Search() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
      console.log("Search query: ", data?.query);
      navigate(`/search/${data?.query}`);
    }
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className="flex items-center w-full max-w-lg"
    >
      <div className="relative flex-grow">
        <input
          className="w-full border border-slate-400 rounded-l-3xl bg-transparent py-2 pl-10 pr-3 placeholder-white outline-none focus:border-white"
          placeholder="Search"
          {...register("query", { required: true})}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
      </div>
      <button 
      type="submit"
      className="bg-slate-700 border border-l-0 border-slate-400 text-white rounded-r-3xl px-4 py-2 hover:bg-slate-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
