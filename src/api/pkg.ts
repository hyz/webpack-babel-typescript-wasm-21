//export * from './pkg/index';
import React from 'react';
//import * as init from './pkg/index';
// import type {InitOutput} from './pkg/index';
//export type WASM = typeof import("./crate")

export interface Pkg {
  instance: unknown; // InitOutput;
  run(canvas: HTMLCanvasElement, name1: string, name2: string): void;
  greet(canvas: HTMLCanvasElement, name: string): void;
}

export function usePkg(): Pkg {
  const [pkg, setPkg] = React.useState<Pkg>(undefined as unknown as Pkg);

  React.useEffect(() => {
    import('./pkg/index').then(init => {
      init.default().then(instance => {
        setPkg({
          instance,
          run: init.start_game,
          greet: init.greet,
        });
      });
    });
    //(async () => {
    //  const instance = await init.default(); //await import('../api/pkg')
    //  setPkg({
    //    instance,
    //    run: init.start_game,
    //    greet: init.greet,
    //  });
    //  //instance.main_js();
    //})();
  }, []);

  return pkg;
}
