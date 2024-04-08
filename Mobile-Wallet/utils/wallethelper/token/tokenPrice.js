async function fetchTokenPrices(tokenIds) {
    const joinedTokenIds = tokenIds.join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${joinedTokenIds}&vs_currencies=usd`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const prices = Object.entries(data).reduce((acc, [tokenId, priceInfo]) => {
        acc[tokenId] = priceInfo.usd;
        return acc;
      }, {});
  
      return prices;
    } catch (error) {
      console.error('Error fetching token prices:', error);
      throw error;
    }
  }
  
  // Export the function to make it available for import in other files
  export default fetchTokenPrices;
  