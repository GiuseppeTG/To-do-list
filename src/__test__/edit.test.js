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
     
   });
 });
 