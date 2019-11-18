import React from 'react';
import ReactDOM from 'react-dom';
import LoaderIcon from './LoaderIcon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoaderIcon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
