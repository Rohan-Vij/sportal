import Navbar from "../components/Navbar";
import Post from "../components/Post";

const Search = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full p-5 bg-background flex flex-col items-center space-y-5 h-full overflow-x-none overflow-y-auto">
        <Post
          sport="Tennis"
          start="5:30pm"
          end="6:45pm"
          location="Park Name"
          difficulty="Beginner"
          description="Have fun playing at the park!"
          spots={2}
          postedBy="John Smith"
        />
        
      </div>
    </div>
  );
};

export default Search;
