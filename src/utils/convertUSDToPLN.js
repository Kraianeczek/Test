export const convertUSDToPLN = (USD) => {
  if (USD < 0) {
    return 'Wrong value...';
  }
  const USDtoPLN = USD * 3.5;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PLN'
  });

  return formatter.format(USDtoPLN);
}