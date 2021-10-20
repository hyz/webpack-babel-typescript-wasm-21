import React, {useEffect} from 'react';
import {MemoryRouter as Router, Switch, Route} from 'react-router-dom';
import {Greet} from '~src/components/Greet';
import './App.global.css';
import icon from '~/assets/icon.svg';

// export function App() {
//   //const {wasmEngine} = useEngines();

//   // useEffect(() => {
//   //   async function loadWasm() {
//   //     await wasmEngine.initialize();
//   //   }
//   //   loadWasm();
//   // }, []);

//   //return <Observer>{() => (wasmEngine.loading ? <h1>Loading...</h1> : <Greet />)}</Observer>;
//   return (
//     <div>
//       <label>Greet</label>
//       <Greet />
//     </div>
//   );
// }

//export default App;

const Hello = () => {
  return (
    <div>
        <Greet />
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="text-blue-500">TailwindCSS setup</div>
      <div className="Hello">
        <a href="https://electron-react-boilerplate.js.org/" target="_blank" rel="noreferrer">
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a href="https://github.com/sponsors/electron-react-boilerplate" target="_blank" rel="noreferrer">
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
