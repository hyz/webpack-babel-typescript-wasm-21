export {};
// import React from 'react';
// import init from './pkg/index';
// import type {InitOutput} from './pkg/index';
//
// type WasmInstanceExports = InitOutput; //typeof import("./crate")
// //export type WASM = typeof import("./crate")
//
// export function useCrate(): WasmInstanceExports {
//   const [wasm, setWasm] = React.useState(undefined as unknown);
//
//   React.useEffect(() => {
//     (async () => {
//       const instance = await init(); //await import('../api/pkg')
//       setWasm(instance);
//       //instance.main_js();
//     })();
//   }, []);
//
//   return wasm as WasmInstanceExports;
// }
//
// export function useTakeEffect(fn: () => void | (() => void), deps: React.DependencyList) {
//   React.useEffect(() => {
//     if (deps.some(d => !d)) return;
//     const destructor = fn();
//     return () => {
//       destructor && destructor();
//     };
//     //// eslint-disable-next-line react-hooks/exhaustive-deps
//   }, deps);
// }
//
