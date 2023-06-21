

import EventBus from "../shared/lib/EventBus";
import { set } from "../shared/lib/set";

export enum StoreEvents {
  Updated = "updated",
}

export type Indexed<T = any> = {
  [key in string]: T;
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: any) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();
export default store;