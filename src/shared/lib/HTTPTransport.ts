interface Options {
    method?: string;
    data?: Record<string, any>;
    headers?: Record<string, any>;
    timeout?: number;
}

const enum Methods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown> | undefined;

const queryStringify = (data: Record<string, any>): string => {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    return Object.keys(data)
        .reduce((acc, cur) => `${acc}${cur}=${data[cur]}&`, '?')
        .slice(0, -1);
};

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        const { data } = options;
        if (data) `${url}${queryStringify(data)}`;

        return this.request(url, { ...options, method: Methods.GET }, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.PUT }, options.timeout);
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.POST }, options.timeout);
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.DELETE }, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000) => {
        const { method, data, headers } = options;
        if (typeof url !== 'string') return;
        if (method === undefined) return;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            for (const headerName in headers) {
                xhr.setRequestHeader(headerName, headers[headerName]);
            }

            xhr.withCredentials = true;
            xhr.onload = function () {
                resolve(xhr);
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = function () {
                reject();
            };

            if (method === Methods.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport;
