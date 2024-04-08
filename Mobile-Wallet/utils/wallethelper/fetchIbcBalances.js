// fetchIBCTokenBalance.js
async function fetchIBCTokenBalance(apiEndpoint, address, ibcDenom) {
    const url = `${apiEndpoint}/cosmos/bank/v1beta1/balances/${address}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data = await response.json();
      const ibcToken = data.balances.find(balance => balance.denom === ibcDenom);
      if (ibcToken) {
        console.log(`${ibcDenom} balance:`, ibcToken.amount);
        return ibcToken.amount;
      } else {
        console.log(`${ibcDenom} not found.`);
        return '0';
      }
    } catch (error) {
      console.error('Error fetching IBC token balance:', error);
    }
  }
  
  export { fetchIBCTokenBalance };
  