import { get } from 'axios';

async function fetchTokenAssets(url) {
  try {
    const response = await get(url);
    const data = response.data;

    let filteredData;
    if (Array.isArray(data)) {
      filteredData = data.map(token => ({
        logoURI: token.logoURI,
        address: token.address,
        name: token.name,
        symbol: token.symbol,
      }));
    } else if (data.tokens && Array.isArray(data.tokens)) {
      filteredData = data.tokens.map(token => ({
        logoURI: token.logoURI,
        address: token.address,
        name: token.name,
        symbol: token.symbol,
      }));
    } else {
      throw new Error('Unexpected data structure or path');
    }

    return filteredData;
  } catch (error) {
    console.error('Error fetching token assets:', error);
    return []; 
  }
}

export default { fetchTokenAssets };