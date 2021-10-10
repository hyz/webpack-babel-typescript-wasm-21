//export * from './pkg/index';
import React from 'react';
//import * as init from './pkg/index';

import type {InitOutput} from './pkg/index';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type PkgIndex = typeof import('./pkg/index');
type PkgState = {index: PkgIndex; xo: InitOutput};

export function usePkg(): PkgIndex {
  const [pkg, setPkg] = React.useState<PkgState>(undefined as unknown as PkgState);
  console.log(`wasm:pkg ${typeof pkg}: ${JSON.stringify(pkg)}`);

  React.useEffect(() => {
    //import('./pkg/index').then(index => {
    //  index.default().then(xo => {
    //    setPkg({ index, xo, });
    //  });
    //});
    (async () => {
      const index = await import('./pkg/index');
      const xo = await index.default();
      setPkg({index, xo});
    })();
  }, []);

  return pkg?.index;
}
