import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

beforeEach(() => render(<App />));

test('Should display submit message button', () => {
  screen.getByRole('button');
});

test('Should display input message', () => {
  screen.getByRole('textbox');
});


test('Should display loading message', () => {
  screen.getByText('Fetching data...');
});
/*
test('Should display history table', () => {
  screen.getByRole('table');
});

test('Should display 4 table headers', () => {
  const [ number, host, method, message] = screen.getAllByRole('columnheader');
  expect(number).toBeInTheDocument();
  expect(host).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});*/
