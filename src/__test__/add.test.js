/**
 * @jest-environment jsdom
 */

import UI from '../modules/ui';
import Store from '../modules/storage';
import { expect } from '@jest/globals';

const mockLocalStorage = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

const task = {
  description: 'This is a task',
  completed: false,
  index: 0,
};

describe('Test adding functionalities', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });

  test('It adds a new task to the local storage', () => {
    Store.addTask(task);
    expect(Store.getTasks()).toHaveLength(1);
  });

  test('It adds a new task to the UI', () => {
    document.body.innerHTML =
    '<div>' +
    '  <ul class="list"></ul>' +
    '</div>';
    UI.getToDoList(task);
    const list = document.querySelectorAll('.list li');
    expect(list).toHaveLength(1);
  })
});
