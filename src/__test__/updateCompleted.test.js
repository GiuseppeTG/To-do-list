/**
 * @jest-environment jsdom
 */

import { expect } from '@jest/globals';
import updateCompletedStatus from '../modules/updateCompletedStatus';

const tasks = [
  {
    description: 'This is a task',
    completed: false,
    index: 0,
  },
  {
    description: 'This is a task again',
    completed: true,
    index: 1,
  },
];

describe('Test change status', () => {
  test('Update completed status', () => {
    const checkboxIndex = 0;
    updateCompletedStatus(tasks, checkboxIndex);
    expect(tasks[checkboxIndex].completed).toBeTruthy();
  });

  test('Update completed status', () => {
    const checkboxIndex = 1;
    updateCompletedStatus(tasks, checkboxIndex);
    expect(tasks[checkboxIndex].completed).toBeFalsy();
  });
});
