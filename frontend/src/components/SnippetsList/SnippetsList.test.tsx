import React from 'react';
import ReactDOM from 'react-dom';
import SnippetsList from './SnippetsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SnippetsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});