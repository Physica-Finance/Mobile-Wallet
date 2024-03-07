const { generateWallet } = require('../utils/wallethelper/generate');

// Call generateWallet and store the returned value
const walletInfo = generateWallet();

console.log("Generated Wallet Info:", walletInfo);
// You can now access walletInfo.ethAddress, walletInfo.privateKey, and walletInfo.planqAddress
