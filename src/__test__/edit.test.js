/**
 * @jest-environment jsdom
 */

import { expect } from '@jest/globals';
 
let store = {
  tasks: [
    {
      description: 'This is a task',
      completed: true,
      index: 0,
    },
    {
      description: 'This is a task again',
      completed: false,
      index: 1,
    },
  ],
};
 
 const mockLocalStorage = (() => ({
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
 }))();
 
describe('Test removing functionalities', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });
  test('Edit task description', () => {
   document.body.innerHTML = '<div>'
   + '  <ul class="list">'
   + '    <li class="item">'
   + '      <input type="text" class="edit-input">'
   + '    </li>'
   + '  </ul>'
   + '</div>';
    
   let editInput = document.querySelector('.edit-input');
   editInput.value = 'hello';
   let text = document.createElement('p');
   text.textContent = editInput.value;
   editInput.parentElement.replaceChild(text, editInput);
   expect(text.textContent).toBe('hello');
  });
  
  test('Edit task description', () => {
   let tasks = [
     {
       description: 'This is a task',
       completed: false,
       index: 0,
     },
     {
       description: 'This is a task again',
       completed: false,
       index: 1,
     },
   ]
   document.body.innerHTML = '<div>'
   + '  <ul class="list">'
   + '    <li class="item">'
   + '      <input type="text" class="edit-input">'
   + '    </li>'
   + '  </ul>'
   + '</div>';
    
   let editInput = document.querySelector('.edit-input');
   editInput.value = 'hello';
   let text = document.createElement('p');
   text.dataset.index = 0;
   text.textContent = editInput.value;
   editInput.parentElement.replaceChild(text, editInput);
   tasks[text.dataset.index].description = text.textContent;
   expect(tasks[0].description).toBe('hello');
  });  
});
 