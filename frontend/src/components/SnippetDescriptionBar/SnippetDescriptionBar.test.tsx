import React from 'react';
import ReactDOM from 'react-dom';
import SnippetDescriptionBar from './SnippetDescriptionBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SnippetDescriptionBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});