const { ethers } = require('ethers');
const { convertToPlanqAddress } = require('./converter');

function generateWallet() {
    console.log("Starting wallet generation...");

    // Generate a new random mnemonic
    const randomWallet = ethers.Wallet.createRandom();
    const mnemonic = randomWallet.mnemonic.phrase;

    // Create a wallet from the mnemonic
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    console.log("New Wallet Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Mnemonic Phrase:", mnemonic);

    let planqAddress = '';
    try {
        console.log("Converting to Planq Address...");
        planqAddress = convertToPlanqAddress(wallet.address);
        console.log("Corresponding Planq Address:", planqAddress);
    } catch (error) {
        console.error("Error converting Ethereum address to Planq address:", error.message);
    }

    return {
        ethAddress: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: mnemonic,
        planqAddress: planqAddress
    };
}

module.exports = {
  generateWallet
};
