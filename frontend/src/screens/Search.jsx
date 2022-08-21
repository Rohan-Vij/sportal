import Icon from '@mdi/react'
import { mdiAccount, mdiAccountCircle, mdiBaseball, mdiBasketball, mdiCricket, mdiFootball, mdiHockeySticks, mdiMapMarker, mdiRun, mdiSoccer, mdiTennis, mdiVolleyball } from '@mdi/js'
import Button from "../components/Button";


const Search = () => {
  const sports=["Volleyball", "Basketball", "Running", "Football", "Tennis", "Cricket", "Baseball", "Hockey", "Soccer"];
  let sportIcon;
  const sport=sports[4];
  if (sport=="Volleyball"){
    sportIcon=mdiVolleyball
  }
  else if (sport=="Basketball"){
    sportIcon=mdiBasketball
  }
  else if (sport=="Running"){
    sportIcon=mdiRun
  }
  else if (sport=="Football"){
    sportIcon=mdiFootball
  }
  else if (sport=="Tennis"){
    sportIcon=mdiTennis
  }
  else if (sport=="Cricket"){
    sportIcon=mdiCricket
  }
  else if (sport=="Baseball"){
    sportIcon=mdiBaseball
  }
  else if (sport=="Hockey"){
    sportIcon=mdiHockeySticks
  }
  else if (sport=="Soccer"){
    sportIcon=mdiSoccer
  }
  return (
  <div className="bg-background h-full">
    <div className="p-6 max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-md dark:bg-white dark:border-white">
        <div className="flex">
          <div className="">
            <Icon className="mr-1" path={mdiAccountCircle} title="Tennis" size={3} color="black"/>
          </div>
          <div className="mt-2 w-[500px]">
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Tennis @ Emerald Glen</h5>
            <p className="mb-2 text-md font-normal text-gray-700 dark:text-gray-400">Posted by Ronaldo M.</p>
            <Icon className="float-left mr-1" path={sportIcon} title="Tennis" size={0.75} color="black"/>
            <p className="mb-4 text-xs font-normal text-black dark:text-black">{sport}</p>
            <p className="mb-6 font-normal text-black dark:text-black">Tennis in emerald glen for fun beginners lorem ipsum dolar sit amet bla bla bla bla bla bla bla bla bla bla...</p>
            <Icon className="float-left mr-1" path={mdiMapMarker} title="Tennis" size={0.75} color="black"/>
            <p className=" text-xs font-normal text-black dark:text-black">Emerald Glen Park (5 mi away)</p>
          </div>
          <div className="mt-2 w-40">
            <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-black">5:30pm - 6:45pm</h5>
            <Icon className="float-left mr-1" path={mdiAccount} title="Tennis" size={0.75} color="black"/>
            <p className="mb-4 text-xs font-normal text-black dark:text-black">2 Spots Available</p>
            <p className="mb-4 text-sm font-normal text-black dark:text-black">Beginner</p>
            <Button text="Submit" />
          </div>
        </div>
    </div>
  </div>
  );
};

export default Search;
