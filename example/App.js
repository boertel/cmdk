import React, { useCallback, useEffect } from 'react';

import CmdK from '../.';
import tinykeys from 'tinykeys';

const callback = ({ name }) => console.log(`Navigate to ${name}`);

const search = (query) =>{
  return new Promise(resolve => {
    window.setTimeout(function() {
      resolve(
        OPTIONS.filter(({ name }) =>
          name.toLowerCase().includes(query.trim().toLowerCase())
        )
      );
    }, 500);
  });
}

const OPTIONS = [
  {
    callback,
    category: 'board',
    name: 'aaa',
    shortcut: 'b 1',
  },
  {
    callback,
    category: 'board',
    name: 'aab',
    shortcut: 'b 2',
  },
  { callback, subtitle: 'board', name: 'aabc', shortcut: 'b 3' },
  { callback, subtitle: 'board', name: 'aabd', shortcut: 'b 4' },

  { callback, subtitle: 'action', name: 'aaab', shortcut: 'i' },
  { callback, subtitle: 'workspace', name: 'aabcd' },
  { callback, subtitle: 'workspace', name: 'bbaa' },
];

const defaultOptions = Promise.resolve([
  { callback, subtitle: 'action', name: 'aaab', shortcut: 'i' },
  { callback, subtitle: 'workspace', name: 'aabcd' },
  { callback, subtitle: 'workspace', name: 'bbaa' },
]);


const getOptions = (query = '') => {
  if (query) {
    return search(query)
  } else {
    return defaultOptions
  }
};

function App() {
  return (
    <>
      <CmdK
        placeholder="Type a command or search for..."
        open={true}
        getOptions={getOptions}
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
