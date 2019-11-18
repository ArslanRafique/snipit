import * as React from 'react';
import { shallow } from 'enzyme';
import AddSnippet from './AddSnippet';

test('Render AddSnippet', () => {
  const addSnippet = shallow(<AddSnippet/>);
  expect(addSnippet.html().toString()).toContain("img");
});