import { cleanup, render } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {

    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
];

const action = jest.fn();

for(const testObj of testCases) {
  render(<CurrencyForm action={action} />);
  
  const testAmount = screen.getByTestId('testAmount');
  const testFrom = screen.getByTestId('testFrom');
  const testTo = screen.getByTestId('testTo');
  userEvent.type(testAmount, testObj.amount);
  userEvent.selectOptions(testFrom, testObj.from);
  userEvent.selectOptions(testTo, testObj.to);

  
  const submitButton = screen.getByText('Convert');
  userEvent.click(submitButton);
  expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to });
  cleanup();
}
expect(action).toHaveBeenCalledTimes(4);
  });
});