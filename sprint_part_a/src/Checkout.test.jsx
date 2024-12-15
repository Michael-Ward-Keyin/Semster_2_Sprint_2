import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from './Checkout';

test('checkout page and confirm order', async () => {
 
  render(<Checkout />);

  expect(screen.getByText('Final Step: Confirm Your Order')).toBeInTheDocument();
  expect(screen.getByText('Thank you for shopping with us! Click the button below to place your order.')).toBeInTheDocument();


  const placeOrderButton = screen.getByText('Place Order');
  fireEvent.click(placeOrderButton);


  await waitFor(() => {
    expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('Your order has been successfully placed. Thank you for shopping with us!')).toBeInTheDocument();
  });
});
