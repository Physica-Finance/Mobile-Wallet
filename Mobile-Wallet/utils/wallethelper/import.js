const { ethers } = require('ethers');
const { convertToPlanqAddress } = require('./converter');

function importWallet(privateKey = '', mnemonic = '') {
    let wallet;

    if (privateKey) {
        wallet = new ethers.Wallet(privateKey);
    } else if (mnemonic) {
        wallet = ethers.Wallet.fromMnemonic(mnemonic);
    } else {
        console.log("Please provide a private key or a mnemonic to import/recover a wallet.");
        return;
    }

    console.log("Wallet Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    
    const planqAddress = convertToPlanqAddress(wallet.address);
    console.log("Corresponding Planq Address:", planqAddress);
}

module.exports = {
    importWallet
};
