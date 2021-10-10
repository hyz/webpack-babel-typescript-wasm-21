import React, {useState, useEffect, useRef} from 'react';
//import {useCrate, useTakeEffect} from './wasm';
//import {useEngines} from '../stores/use_engines';
import {usePkg} from '../api/pkg';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
  },
};

/*export function Greet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {wasmEngine} = useEngines();

  useEffect(() => {
    let canvas: HTMLCanvasElement;
    if (wasmEngine.instance && canvasRef.current) {
      canvas = canvasRef.current;
      wasmEngine.instance.start_game(canvas, 'Alex', 'Angelica');
    }
  }, [canvasRef, wasmEngine]);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} width="600" height="800"></canvas>
    </div>
  );
}*/

export function Greet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pkg = usePkg(); //useCrate();
  useEffect(() => {
    if (pkg && canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      pkg.greet(canvas, 'Alex');
      pkg.start_game(canvas, 'Alex', 'Angelica');
    }
  }, [canvasRef, pkg]);

  // const [text, setText] = React.useState('')
  // useTakeEffect(() => {
  //   const hello = wasmEngine.greet('User');
  //   setText(hello);
  // }, [wasmEngine]);
  //return <div>{text || "NNNNN"}</div>

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} width="600" height="800"></canvas>
    </div>
  );
}
