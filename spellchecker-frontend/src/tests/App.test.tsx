import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

beforeEach(() => render(<App />));

describe('UI Tests', () => {
  test('Should display submit message button', () => {
    screen.getByRole('button');
  });

  test('Should display input message', () => {
    screen.getByRole('textbox');
  });

  test('Should display loading message', () => {
    screen.getByText('Fetching data...');
  });

  test('Should display 4 table headers', async () => {
    const [ number, host, method, message] = await screen.findAllByRole('columnheader');
    expect(number).toBeInTheDocument();
    expect(host).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
