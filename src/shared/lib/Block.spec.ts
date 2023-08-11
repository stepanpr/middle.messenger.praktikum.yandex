import { expect } from 'chai';
import * as Handlebars from 'handlebars';
import Block from './Block';

import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const dom = new JSDOM(
    '<html><body><div id="app"></div></body></html>',
    {
        url: 'http://localhost',
        runScripts: 'dangerously'
    },
  );

global.document = dom.window.document;
if (dom.window.document.defaultView) {
    global.DocumentFragment = dom.window.document.defaultView.DocumentFragment;
}


class Component extends Block {
    constructor(props: any) {
        super('div', props);
    }  
    
    render() {
        const tmpl = Handlebars.compile('<div>{{content}}</div>');
        return this.compile(tmpl, this.props);
    }
}

describe('Component', () => {
    const component = new Component({ content: 'Test' });

    it('should render content', () => {
        expect(component.getContent().innerHTML).equals('Test');
    });

    it('should change content', () => {
        component.setProps({
            content: 'New test',
        });
        expect(component.getContent().innerHTML).equals('New test');
    });

});