import EventBus from '../shared/lib/EventBus';
import { set } from '../shared/lib/set';

export enum StoreEvents {
    Updated = 'updated',
}

export type Indexed<T = any> = {
    [key in string]: T;
};

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(keypath: string, data: any) {
        set(this.state, keypath, data);
        // this.emit(StoreEvents.Updated);
        this.emit(StoreEvents.Updated, this.getState());
    }
}

const store = new Store();
export default store;
