/**
 * @jest-environment jsdom
 */

import { expect } from '@jest/globals';
import UI from '../modules/ui';

describe('Delete all tasks', () => {
  test('Delete all tasks', () => {
    document.body.innerHTML = '<div>'
    + '  <ul class="list">'
    + '    <li class="item"></li>'
    + '    <li class="item"></li>'
    + '    <li class="item"></li>'
    + '  </ul>'
    + '</div>';
    UI.deleteAll();
    expect(document.querySelectorAll('.list li')).toHaveLength(0);
  });
  test('Delete all tasks', () => {
    document.body.innerHTML = '<div>'
    + '  <ul class="list">'
    + '    <li></li>'
    + '    <li class="item"></li>'
    + '    <li class="item"></li>'
    + '  </ul>'
    + '</div>';
    UI.deleteAll();
    expect(document.querySelectorAll('.list li')).toHaveLength(1);
  });
});