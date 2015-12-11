export default {
  getElement: getElement,
  getElements: getElements,
  remove: remove,
  create: create,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  appendChild: appendChild,
  insertAfter: insertAfter,
  insertBefore: insertBefore,
  getChild: getChild,
  getSiblingElement: getSiblingElement,
  isNode: isNode
};

function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

function remove(element) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  if (isNode(element)) {
    element.parentNode.removeChild(element);
  }
}

function create(elementType, options) {
  const element = document.createElement(elementType);

  if (options.hasOwnProperty('innerHTML')) {
    element.innerHTML = options.innerHTML;
  }

  if (options.hasOwnProperty('attributes')) {
    for (const name in options.attributes) {
      const attribute = options.attributes[name];

      element.setAttribute(name, attribute);
    }
  }

  return element;
}

function addClass(element, className) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  element.classList.add(className);
}

function hasClass(element, className) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  return element.classList.contains(className);
}

function removeClass(element, className) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  element.classList.remove(className);
}

function appendChild(element, content) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  element.appendChild(content);
}

function insertAfter(selector, content) {
  const element = getElement(selector);

  element.parentNode.appendChild(content, element.nextSibling);
}

function insertBefore(selector, content) {
  const element = getElement(selector);

  element.parentNode.insertBefore(content, element);
}

function getChild(father, childSelector) {
  if (!isNode(father)) {
    father = getElement(father);
  }

  const child = father.querySelector(childSelector);

  return child;
}

function getSiblingElement(father, childSelector) {
  if (!isNode(father)) {
    father = getElement(father);
  }

  const child = getChild(father.parentNode, childSelector);

  return child;
}

function isNode(o) {
  return (
    typeof Node == 'object' ?
        o instanceof Node :
        o && typeof o == 'object' && typeof o.nodeType == 'number' &&
        typeof o.nodeName == 'string'
  );
}
