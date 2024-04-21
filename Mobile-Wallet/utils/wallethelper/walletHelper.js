// Ethereum integration using ethers.js and SecureStore for React Native
import { ethers } from 'ethers';
import * as SecureStore from 'expo-secure-store';

export class CustomWalletHelper {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.provider = new ethers.JsonRpcProvider(endpoint);
        this.wallet = null;
    }

    async connectToWallet() {
        const walletDataString = await SecureStore.getItemAsync('Wallet');
        if (!walletDataString) {
            console.error('No wallet data found.');
            return null;
        }

        const walletData = JSON.parse(walletDataString);
        this.wallet = new ethers.Wallet(walletData.privateKey, this.provider);
        console.log('Wallet connected:', this.wallet.address);
        return this.wallet;
    }

    async request({ method, params }) {
        if (!this.wallet) {
            console.error('Wallet not connected.');
            return Promise.reject('Wallet not connected.');
        }

        switch (method) {
            case 'eth_requestAccounts':
                return [this.wallet.address];
            case 'eth_sendTransaction':
                return this.wallet.sendTransaction(params[0]);
            case 'eth_chainId':
                const network = await this.provider.getNetwork();
                return network.chainId.toString(16);  // Return chain ID as a hex string
            default:
                console.error(`Unsupported method: ${method}`);
                return Promise.reject(`Unsupported method: ${method}`);
        }
    }
}

// Use ethers.Wallet directly since it extends Signer and properly implements all methods
export class CustomSigner {
    constructor(privateKey, provider) {
        this.wallet = new ethers.Wallet(privateKey, provider);
    }

    connect(provider) {
        return new CustomSigner(this.wallet.privateKey, provider);
    }

    getAddress() {
        return this.wallet.getAddress();
    }

    signTransaction(transaction) {
        return this.wallet.signTransaction(transaction);
    }

    signMessage(message) {
        return this.wallet.signMessage(message);
    }

    _signTypedData(domain, types, value) {
        return this.wallet._signTypedData(domain, types, value);
    }
}