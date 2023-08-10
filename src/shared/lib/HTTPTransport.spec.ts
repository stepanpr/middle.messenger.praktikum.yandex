import HTTPTransport from './HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport', () => {
    const baseUrl = 'http://jsonplaceholder.typicode.com';
    beforeEach(() => {
        global.XMLHttpRequest = require('xhr2');
    });
    it('get', (done) => {
        function get() {
            return new HTTPTransport().get(`${baseUrl}/posts/1`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {},
            });
        }
        get()
            ?.then((res: { status: number }) => {
                expect(res.status).eq(200);
                done();
            })
            .catch((err: any) => {
                done(err);
            });
    });

    it('post', (done) => {
        function post() {
            return new HTTPTransport().post(`${baseUrl}/posts`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    title: 'title',
                    body: 'body',
                    userId: 11,
                },
            });
        }
        post()
            ?.then((res: { status: number }) => {
                expect(res.status).eq(201);
                done();
            })
            .catch((err: any) => {
                done(err);
            });
    });

    it('put', (done) => {
        function put() {
            return new HTTPTransport().put(`${baseUrl}/posts/1`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    id: 1,
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                },
            });
        }
        put()
            ?.then((res: { status: number }) => {
                expect(res.status).eq(200);
                done();
            })
            .catch((err: any) => {
                done(err);
            });
    });
    it('delete item', (done) => {
        function putItem() {
            return new HTTPTransport().delete(`${baseUrl}/posts/1`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {},
            });
        }
        putItem()
            ?.then((res: { status: number }) => {
                expect(res.status).eq(200);
                done();
            })
            .catch((err: any) => {
                done(err);
            });
    });
});
