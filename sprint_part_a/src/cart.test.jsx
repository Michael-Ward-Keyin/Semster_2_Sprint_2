import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from './Cart';
import { vi } from 'vitest';

test('empty cart message', async () => {

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );


  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );


  await waitFor(() => {
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test('renders cart items and calculates totals', async () => {

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: '1',
            name: 'Product A',
            price: 100,
            quantity: 2,
            image: '/images/product-a.jpg',
          },
          {
            id: '2',
            name: 'Product B',
            price: 50,
            quantity: 1,
            image: '/images/product-b.jpg',
          },
        ]),
    })
  );


  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );


  await waitFor(() => {

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Price: $100')).toBeInTheDocument();
    expect(screen.getByText('Price: $50')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    expect(screen.getByText('Total: $200')).toBeInTheDocument();
    expect(screen.getByText('Total: $50')).toBeInTheDocument();
  });


  await waitFor(() => {
    expect(screen.getByText('Subtotal: $250.00')).toBeInTheDocument();
    expect(screen.getByText('Taxes (HST 15%): $37.50')).toBeInTheDocument();
    expect(screen.getByText('Total: $287.50')).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});
