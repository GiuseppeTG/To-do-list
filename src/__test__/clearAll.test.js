/**
 * @jest-environment jsdom
 */

import { expect } from '@jest/globals';
import UI from '../modules/ui';
  
  
// let mockTasks = [
//   {
//     description: 'This is a task',
//     completed: false,
//     index: 0,
//   },
//   {
//     description: 'This is a task again',
//     completed: true,
//     index: 1,
//   },
// ]

describe('Delete all tasks', () => {
  
  test('Delete all tasks', () => {
    
    document.body.innerHTML = '<div>'
    + '  <ul class="list">'
    + '    <li class="item"></li>'
    + '    <li class="item"></li>'
    + '    <li class="item"></li>'
    + '  </ul>'
    + '</div>';
    UI.deleteAll()    
    expect(document.querySelectorAll('.list li')).toHaveLength(0);
  });
});