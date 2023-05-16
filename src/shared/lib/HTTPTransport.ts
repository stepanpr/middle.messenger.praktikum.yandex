enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: METHOD;
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
};

const queryStringify = (data: string): string => {
    if (!data) throw new Error('Не переданы данные!');
    return `?${Object.entries(data)
        .map((pair) => pair.join('='))
        .join('&')}`;
};

export class HTTPTransport {
    get = (url: string, options: Options) => {
        return this.request(
            url + '' + queryStringify(options.data),
            { ...options, method: METHOD.GET },
            options.timeout
        );
    };

    post = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
    };

    put = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
    };

    delete = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.timeout = timeout;
            if (headers) {
                Object.entries(headers).forEach(([header, value]) =>
                    xhr.setRequestHeader(header, value)
                );
            }

            xhr.onload = () => resolve(xhr);
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) xhr.send();
            else xhr.send(data);
        });
    };
}

export default new HTTPTransport();
