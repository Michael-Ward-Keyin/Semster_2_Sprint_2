import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('render home page', () => {
  render(<App />);
  expect(screen.getByText("Home")).toBeInTheDocument();
});

test('navigate to cart page', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: '1', name: 'Product A', price: 100, quantity: 1 }]),
    })
  );


  await act(async () => {
    render(<App />);
  });


  fireEvent.click(screen.getByText('Cart'));


  await waitFor(() => {
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test('navigate to checkout page', async () => {

  await act(async () => {
    render(<App />);
  });


  act(() => {
    window.history.pushState({}, '', '/checkout');
  });


  await waitFor(() => {
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });
});
