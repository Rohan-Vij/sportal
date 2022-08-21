import PostsService from "../services/posts";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Post from "../components/Post";

const Search = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setData(await PostsService.getAll());
    })();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full p-5 bg-background flex flex-col items-center space-y-5 h-full overflow-x-none overflow-y-auto">
        {data.map(
          (
            {
              sport,
              location,
              poster,
              start_date,
              end_date,
              description,
              level,
              max_players,
            },
            idx
          ) => {
            <Post
              sport={sport}
              start={start_date}
              end={end_date}
              description={description}
              difficulty={level}
              location={location}
              postedBy={poster}
              spots={max_players}
              key={idx}
            />;
          }
        )}
      </div>
    </div>
  );
};

export default Search;
