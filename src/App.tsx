import React, {useEffect} from 'react';
import {Greet} from '~src/components/Greet';

export function App() {
  //const {wasmEngine} = useEngines();

  // useEffect(() => {
  //   async function loadWasm() {
  //     await wasmEngine.initialize();
  //   }
  //   loadWasm();
  // }, []);

  //return <Observer>{() => (wasmEngine.loading ? <h1>Loading...</h1> : <Greet />)}</Observer>;
  return (
    <div>
      <label>Greet</label>
      <Greet />
    </div>
  );
}

//export default App;
