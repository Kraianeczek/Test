import { render } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {
    const action = jest.fn();


    // render component
    render(<CurrencyForm action={action} />);

    // find “convert” button
    const submitButton = screen.getByText('Convert');

    // simulate user click on "convert" button
    userEvent.click(submitButton);
    
    // find fields elements
    const testAmount = screen.getByTestId('testAmount');
    const testFrom = screen.getByTestId('testFrom');
    const testTo = screen.getByTestId('testTo');

    // set test values to fields
    userEvent.type(testAmount, '100');
    userEvent.selectOptions(testFrom, 'PLN');
    userEvent.selectOptions(testTo, 'USD');

    // check if action callback was called once and with proper argument
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
  });
});