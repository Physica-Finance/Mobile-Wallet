

const {ethers,formatUnits} =require('ethers');

export const fetchEthBalance = async (ethAddress, providerUrl) => {
  try {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const balance = await provider.getBalance(ethAddress);
    return formatUnits(balance);
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    throw new Error('Failed to fetch balance');
  }
};
