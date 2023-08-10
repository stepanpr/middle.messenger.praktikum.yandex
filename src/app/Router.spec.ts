import Router from './Router';
import { JSDOM } from 'jsdom';
import Block from '../shared/lib/Block';
import { expect } from 'chai';
import * as Handlebars from 'handlebars';

const templatePage = `<h1 id="page">Page</h1>`;
const templateOtherPage = `<h1 id="otherPage">OtherPage</h1>`;

class Page extends Block {
    constructor() {
        super('div');
    }

    render() {
        const templateHandlebars = Handlebars.compile(templatePage);
        return this.compile(templateHandlebars, this.props);
    }
}

class OtherPage extends Block {
    constructor() {
        super('div');
    }

    render() {
        const templateHandlebars = Handlebars.compile(templateOtherPage);
        return this.compile(templateHandlebars, this.props);
    }
}

describe('Router', () => {
    beforeEach(() => {
        const { window } = new JSDOM(
            `<html>
         <body>
          <div id="root"></div>
         </body>
       </html>`,
            { url: 'http://localhost' }
        ) as unknown as Window;

        global.window = window as any;
        global.document = window.document;
    });

    it('use', () => {
        Router.use('/', Page);
        expect(Router.routes.length).eq(1);
    });

    it('start', () => {
        Router.use('/', Page).start();
        expect(document.body.innerHTML).to.contain(templatePage);
    });
    it('go', () => {
        Router.use('/', Page).use('/otherPage', OtherPage).start();
        Router.go('/otherPage');
        expect('/otherPage').to.eq(Router.getCurrentRouter()?._pathname);
        expect(document.body.innerHTML).to.contain(templateOtherPage);
    });
});
