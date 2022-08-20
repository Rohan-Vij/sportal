import Icon from "@mdi/react";
import {
  mdiDog
} from "@mdi/js";

function App() {
  return (
    <div>
      <h1 className="text-blue-600">Testing Tailwind!</h1>
      <Icon path={mdiDog} size={1} />
    </div>
  )
}

export default App;
