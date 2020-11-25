import React from 'react';
import { render, screen } from '@testing-library/react';

import Greeting from './index';

test('greets the user', () => {
  render(<Greeting userName="pablo ezequiel" />);
  expect(screen.getByText(/Home:greeting/i)).toBeInTheDocument();
  expect(screen.getByText(/Pablo Ezequiel/)).toBeInTheDocument();
});

test('greets the caped crusader with no user', () => {
  render(<Greeting />);
  expect(screen.getByText(/Home:greeting/i)).toBeInTheDocument();
  expect(screen.getByText(/Caped Crusader/)).toBeInTheDocument();
});
