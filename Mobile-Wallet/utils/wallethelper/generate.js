const ethers = require('ethers');
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import 'react-native-get-random-values';
import { crypto } from 'expo-crypto';
const { convertToPlanqAddress } = require('./converter');

async function generateWallet() {
    console.log("Starting wallet generation...");

    try {
        const randomWallet = ethers.Wallet.createRandom();
        const mnemonic = randomWallet.mnemonic.phrase;
        const wallet = ethers.Wallet.fromPhrase(mnemonic); 

        console.log("New Wallet Address:", wallet.address);
        console.log("Private Key:", wallet.privateKey);
        console.log("Mnemonic Phrase:", mnemonic);

        let planqAddress = '';
        try {
            planqAddress = convertToPlanqAddress(wallet.address);
            console.log("Corresponding Planq Address:", planqAddress);
        } catch (error) {
            console.error("Error converting Ethereum address to Planq address:", error.message);
            planqAddress = 'ConversionFailed';
        }
        
        const walletData = {
            ethAddress: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: mnemonic,
            planqAddress: planqAddress
        };

        // Save the wallet data as a JSON string
        await SecureStore.setItemAsync('Wallet', JSON.stringify(walletData));
        console.log('Wallet data saved securely.');

        return walletData;
    } catch (error) {
        console.error('Error during wallet generation or storage:', error);
        throw error; // Rethrow the error to be handled by the caller, if necessary
    }
}

export { generateWallet };