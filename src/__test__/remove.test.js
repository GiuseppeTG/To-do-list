/**
 * @jest-environment jsdom
 */

 import UI from '../modules/ui';
 import Store from '../modules/storage';
 import { expect } from '@jest/globals';
 
 const mockLocalStorage = (() => {
   let store = {
    tasks: [
       {
        description: 'This is a task',
        completed: true,
        index: 0
      },
      {
        description: 'This is a task again',
        completed: false,
        index: 1
      }
     ]   
    };
 
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
 
 describe('Test removing functionalities', () => {
   beforeAll(() => {
     Object.defineProperty(window, 'localStorage', {
       value: mockLocalStorage,
     });
   });
 
   test('It removes a task from the local storage', () => {
     
     Store.removeTasks(true);
     expect(Store.getTasks()).toHaveLength(1);
   });
 
   test('It removes a task from the UI', () => {
    document.body.innerHTML =
    '<div>' +
    '  <ul class="list">' +
    '    <li class="item"></li>'
    '  </ul>' +
    '</div>';
    UI.deleteAll();
    const list = document.querySelectorAll('.list li');
    expect(list).toHaveLength(0);
   })
 });
 