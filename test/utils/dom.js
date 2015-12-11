require('mocha-jsdom')({
  'skipWindowCheck': true
});

import { expect } from 'chai';
import dom from '../../lib/utils/dom';

describe('dom', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('getElement()', () => {
    it('should return an element', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      const element = dom.getElement('#my-element');

      expect(element.innerHTML).to.equal('My element');
    });

    it('should return null', () => {
      const element = dom.getElement('#my-element');

      expect(element).to.be.null;
    });
  });

  describe('getElements()', () => {
    it('should return an array of element', () => {
      let newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'class': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      newElement = dom.create('div', {
        'innerHTML': 'My element 2',
        'attributes': {
          'class': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      const elements = dom.getElements('.my-element');

      expect(elements.length).to.equal(2);
      expect(elements[0].innerHTML).to.equal('My element');
      expect(elements[1].innerHTML).to.equal('My element 2');
    });

    it('should return an empty object', () => {
      const elements = dom.getElements('.my-element');

      expect(elements.length).to.equal(0);
    });
  });

  describe('remove()', () => {
    it('should remove an element when pass a node', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      expect(dom.getElement('#my-element').innerHTML).to.equal('My element');
      dom.remove(document.querySelector('#my-element'));
      expect(dom.getElement('#my-element')).to.be.null;
    });

    it('should remove an element when pass an element selector', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      expect(dom.getElement('#my-element').innerHTML).to.equal('My element');
      dom.remove('#my-element');
      expect(dom.getElement('#my-element')).to.be.null;
    });

    it('should return an empty object', () => {
      const elements = dom.getElements('.my-element');
      expect(elements.length).to.equal(0);
    });
  });

  describe('create()', () => {
    it('should create an element', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      const element = dom.getElement('#my-element');
      expect(element.innerHTML).to.equal('My element');
      expect(element.getAttribute('id')).to.equal('my-element');
    });

    it('should create an input', () => {
      const newInput = dom.create('input', {
        'attributes': {
          'id': 'my-input',
          'value': 'Test'
        }
      });
      dom.appendChild(document.body, newInput);

      const input = dom.getElement('#my-input');
      expect(input.tagName).to.equal('INPUT');
      expect(input.value).to.equal('Test');
      expect(input.getAttribute('id')).to.equal('my-input');
    });
  });

  describe('hasClass()', () => {
    it('should return true', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element',
          'class': 'my-class'
        }
      });
      dom.appendChild(document.body, newElement);

      expect(dom.hasClass('#my-element', 'my-class')).to.be.true;
    });

    it('should return true', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element',
          'class': 'my-class'
        }
      });
      dom.appendChild(document.body, newElement);

      const element = dom.getElement('#my-element');
      expect(dom.hasClass(element, 'my-class')).to.be.true;
    });

    it('should return false', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element',
          'class': 'my-class'
        }
      });
      dom.appendChild(document.body, newElement);

      expect(dom.hasClass('#my-element', 'my-class2')).to.be.false;
    });
  });

  describe('addClass()', () => {
    it('should add a class', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      dom.addClass('#my-element', 'my-class');

      expect(dom.hasClass('#my-element', 'my-class')).to.be.true;
    });

    it('should return true', () => {
      const newElement = dom.create('div', {
        'innerHTML': 'My element',
        'attributes': {
          'id': 'my-element'
        }
      });
      dom.appendChild(document.body, newElement);

      const element = dom.getElement('#my-element');
      dom.addClass(element, 'my-class');

      expect(dom.hasClass(element, 'my-class')).to.be.true;
    });
  });

  describe('removeClass()', () => {
    it('should remove a class', () => {
      const element = dom.create('div', {
        'attributes': {
          'id': 'my-element',
          'class': 'my-class'
        }
      });
      dom.appendChild(document.body, element);

      dom.removeClass('#my-element', 'my-class');

      expect(dom.hasClass('#my-element', 'my-class')).to.be.false;
    });
  });

  describe('appendChild()', () => {
    it('should append a child element', () => {
      const element = dom.create('div', {
        'attributes': {
          'id': 'my-element'
        }
      });
      dom.appendChild(document.body, element);

      const child = dom.create('h1', {
        'innerHTML': 'Hello world!',
        'attributes': {
          'id': 'my-title'
        }
      });
      dom.appendChild(element, child);

      expect(dom.getElement('#my-title').innerHTML).to.equal('Hello world!');
      expect(dom.getElement('#my-title').parentNode.tagName).to.equal('DIV');
    });
  });

  describe('insertAfter()', () => {
    it('should append an element after another', () => {
      const element = dom.create('div', {
        'attributes': {
          'id': 'wrapper'
        }
      });
      dom.appendChild(document.body, element);

      const child = dom.create('h1', {
        'innerHTML': 'Hello world!',
        'attributes': {
          'id': 'my-title'
        }
      });
      dom.appendChild(element, child);

      const otherChild = dom.create('h2', {
        'innerHTML': 'It\'s me!',
        'attributes': {
          'id': 'my-subtitle'
        }
      });
      dom.insertAfter('#my-title', otherChild);

      expect(dom.getElement('#wrapper').childNodes.length).to.equal(2);
      expect(dom.getElement('#wrapper').childNodes[0].innerHTML).to.equal('Hello world!');
      expect(dom.getElement('#wrapper').childNodes[1].innerHTML).to.equal('It\'s me!');
    });
  });

  describe('insertBefore()', () => {
    it('should append an element before another', () => {
      const element = dom.create('div', {
        'attributes': {
          'id': 'wrapper'
        }
      });
      dom.appendChild(document.body, element);

      const child = dom.create('h1', {
        'innerHTML': 'Hello world!',
        'attributes': {
          'id': 'my-title'
        }
      });
      dom.appendChild(element, child);

      const otherChild = dom.create('h2', {
        'innerHTML': 'It\'s me!',
        'attributes': {
          'id': 'my-subtitle'
        }
      });
      dom.insertBefore('#my-title', otherChild);

      expect(dom.getElement('#wrapper').childNodes.length).to.equal(2);
      expect(dom.getElement('#wrapper').childNodes[1].innerHTML).to.equal('Hello world!');
      expect(dom.getElement('#wrapper').childNodes[0].innerHTML).to.equal('It\'s me!');
    });
  });

  describe('getChild()', () => {
    it('should find a child from an element', () => {
      const element = dom.create('div', {
        'attributes': {
          'id': 'wrapper'
        }
      });
      dom.appendChild(document.body, element);

      const child = dom.create('h1', {
        'innerHTML': 'Hello world!',
        'attributes': {
          'id': 'my-title'
        }
      });
      dom.appendChild(element, child);

      expect(dom.getChild('#wrapper', '#my-title').innerHTML).to.equal('Hello world!');
    });
  });

  describe('getSiblingElement()', () => {
    it('should find a sibling element', () => {
      const element = dom.create('div', {
        'attributes': {
          'id': 'wrapper'
        }
      });
      dom.appendChild(document.body, element);

      let child = dom.create('h1', {
        'innerHTML': 'Hello world!',
        'attributes': {
          'id': 'my-title'
        }
      });
      dom.appendChild(element, child);

      child = dom.create('h2', {
        'innerHTML': 'It\'s me!',
        'attributes': {
          'id': 'my-title-2'
        }
      });
      dom.appendChild(element, child);

      expect(dom.getSiblingElement('#wrapper', '#my-title-2').innerHTML).to.equal('It\'s me!');
    });
  });

  describe('isNode()', () => {
    it('should return true', () => {
      const element = dom.create('div', {
        'attributes': {
          'id': 'wrapper'
        }
      });
      dom.appendChild(document.body, element);

      expect(dom.isNode(element)).to.be.true;
    });

    it('should return false', () => {
      expect(dom.isNode('#element')).to.be.false;
    });
  });
});
