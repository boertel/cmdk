import React, { useCallback, useEffect } from "react";

import CmdK from "../.";
import tinykeys from "tinykeys";

const callback = ({ name }) => console.log(`Navigate to ${name}`)
const options = [
  { callback, subtitle: "workspace", name: "Personal" },
  { callback, subtitle: "workspace", name: "Ondeck" },
  {
    callback,
    category: "board",
    name: "Inspirations",
    shortcut: "b 1"
  },
  {
    callback,
    category: "board",
    name: "Parking Lot",
    shortcut: "b 2"
  },
  { callback, subtitle: "board", name: "Now", shortcut: "b 3" },
  { callback, subtitle: "board", name: "Command", shortcut: "b 4" },
  { callback, subtitle: "action", name: "Add ticket", shortcut: "i" },
];

function App() {
  const shortcuts = {};
  options.forEach(option => {
    const { callback, shortcut } = option;
    shortcuts[shortcut] = useCallback(evt => callback(option, evt), [option]);
  });

  useEffect(
    () => {
      const unsubscribe = tinykeys(window, shortcuts);
      return unsubscribe;
    },
    [shortcuts]
  );
  return (
    <>
    <CmdK
      placeholder="Type a command or search for..."
      open={true}
      options={options}
    />
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
    </>
  );
}

export default App;
