import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiAccountCircle,
  mdiBaseball,
  mdiBasketball,
  mdiCricket,
  mdiFootball,
  mdiHockeySticks,
  mdiMapMarker,
  mdiRun,
  mdiSoccer,
  mdiTennis,
  mdiVolleyball,
} from "@mdi/js";
import Button from "../components/Button";
import formatTime from "../util/formatTime";

const Post = ({
  sport,
  start,
  location,
  spots,
  end,
  description,
  difficulty,
  postedBy,
  key
}) => {
  let sportIcon;
  if (sport === "Volleyball") {
    sportIcon = mdiVolleyball;
  } else if (sport === "Basketball") {
    sportIcon = mdiBasketball;
  } else if (sport === "Running") {
    sportIcon = mdiRun;
  } else if (sport === "Football") {
    sportIcon = mdiFootball;
  } else if (sport === "Tennis") {
    sportIcon = mdiTennis;
  } else if (sport === "Cricket") {
    sportIcon = mdiCricket;
  } else if (sport === "Baseball") {
    sportIcon = mdiBaseball;
  } else if (sport === "Hockey") {
    sportIcon = mdiHockeySticks;
  } else if (sport === "Soccer") {
    sportIcon = mdiSoccer;
  }

  return (
    <div className="relative p-6 max-w-3xl h-52 bg-white rounded-2xl border border-gray-200 shadow-md" key={key}>
      <div className="flex">
        <div className="">
          <Icon
            className="mr-1"
            path={mdiAccountCircle}
            size={3}
            color="black"
          />
        </div>
        <div className="mt-2 w-[500px]">
          <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
            {sport} @ {location}
          </h5>
          <p className="mb-2 text-md font-normal text-gray-700">
            Posted by {postedBy}
          </p>
          <div className="flex items-center mb-2">
            <Icon
              className="float-left mr-1"
              path={sportIcon}
              title="Tennis"
              size={1}
              color="black"
            />
            <p className="text-xs font-normal text-black">{sport}</p>
          </div>
          <p className="mb-2 font-normal text-black">{description}</p>
          <div className="flex items-center">
            <Icon
              className="float-left"
              path={mdiMapMarker}
              size={1}
              color="black"
            />
            <p className="text-sm font-normal text-black">{location}</p>
          </div>
        </div>
        <div className="mt-2 w-40">
          <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 text-end">
            {formatTime(start)} - {formatTime(end)}
          </h5>
          <div className="flex justify-end mb-1">
            <Icon
              className="float-left mr-1"
              path={mdiAccount}
              size={0.75}
              color="black"
            />
            <p className="text-xs font-normal text-black">
              {spots} Spot(s) Available
            </p>
          </div>
          <p className="mb-4 text-sm font-normal text-black text-end">
            {difficulty}
          </p>
          <Button
            text="Sign Up"
            className="absolute h-12 bottom-3 right-3 text-xl p-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
