export class BaseAPI {
    create(_data?: unknown) {
        throw new Error('Not implemented');
    }

    request() {
        throw new Error('Not implemented');
    }

    update() {
        throw new Error('Not implemented');
    }

    delete(_data?: unknown) {
        throw new Error('Not implemented');
    }
}
