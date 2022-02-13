import { cleanup, render } from '@testing-library/react';
import ResultBox from './ResultBox';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';

  describe('Component ResultBox', () => {
      it('should render without crashin', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
      });
      it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            { amount: 10 },
            { amount: 150 },
            { amount: 188 },
            { amount: 12 },
        ];

        for(const testObj of testCases) {
        render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
        const divX = screen.getByTestId('divX');
        const x = convertPLNToUSD(testObj.amount);
        expect(divX).toHaveTextContent('PLN ' + testObj.amount + '.00 = ' + x);
        cleanup();
        }
      });
      it('should render proper info about conversion when USD -> PLN', () => {

        const testCases = [
            { amount: 10 },
            { amount: 150 },
            { amount: 188 },
            { amount: 12 },
        ];

        for(const testObj of testCases) {
        render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
        const divX = screen.getByTestId('divX');
        const x = convertUSDToPLN(testObj.amount);
        expect(divX).toHaveTextContent('$' + testObj.amount + '.00 = ' + x.replace('\xa0', ' '));
        cleanup();
        }
      });
    it('should render the same value for PLN', () => {

        const testCases = [
            { amount: 10 },
            { amount: 150 },
            { amount: 188 },
            { amount: 12 },
        ];

        for(const testObj of testCases) {
        render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);
        const divX = screen.getByTestId('divX');
        expect(divX).toHaveTextContent('PLN ' + testObj.amount + '.00 = PLN ' + testObj.amount);
        cleanup();
        }
      });
    it('should render the same value for USD', () => {

        const testCases = [
            { amount: 10 },
            { amount: 150 },
            { amount: 188 },
            { amount: 12 },
        ];

        for(const testObj of testCases) {
        render(<ResultBox from="USD" to="USD" amount={testObj.amount} />);
        const divX = screen.getByTestId('divX');
        expect(divX).toHaveTextContent('$' + testObj.amount + '.00 = $' + testObj.amount);
        cleanup();
        }
      });  
    it('should render wrong value', () => {

        const testCases = [
            { amount: -10 },
            { amount: -30 },
            { amount: -750 },
        ];

        for(const testObj of testCases) {
            render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
            const divX = screen.getByTestId('divX');
            expect(divX).toHaveTextContent('Wrong value...');
            cleanup();
        }
    });
    it('should render wrongg value', () => {

      const testCases = [
          { amount: -10 },
      ];

      for(const testObj of testCases) {
          render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
          const divX = screen.getByTestId('divX');
          expect(divX).toHaveTextContent('Wrong value...');
          cleanup();
      }
  });
});