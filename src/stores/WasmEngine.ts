import {observable, runInAction, action} from 'mobx';
import init from '../../target/pkg';
import type {InitOutput} from '../../target/pkg';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type WasmInstance = InitOutput; //typeof Wasm; //import('../../pkg');

export class WasmEngine {
  @observable
  public instance: WasmInstance | undefined = undefined;

  @observable
  public loading = true;

  @observable
  public error: Error | undefined = undefined;

  @action
  public async initialize() {
    try {
      const wasm = await init(); //import('../../pkg');
      runInAction(() => {
        this.loading = false;
        this.instance = wasm;
      });
    } catch (error: any) {
      runInAction(() => {
        this.loading = false;
        this.error = error;
      });
    }
  }
}
