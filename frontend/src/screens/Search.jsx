import UserService from "../services/posts";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Post from "../components/Post";

const Search = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await UserService.getAll();
      console.log(response);
      setData(response);
    })();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full p-5 bg-background flex flex-col items-center space-y-5 h-full overflow-x-none overflow-y-auto">
        {data.length > 0 ? data.map((post) => (
          <Post
            sport={post.sport}
            start={post.start_date}
            end={post.end_date}
            description={post.description}
            difficulty={post.level}
            location={post.location}
            postedBy={post.poster}
            spots={post.max_players}
            key={post._id}
          />
        )) : <h1 className="text-3xl mt-10">No posts! Create one to get started.</h1>}
      </div>
    </div>
  );
};

export default Search;
