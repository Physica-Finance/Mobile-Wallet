import { ethers } from 'ethers';
import * as SecureStore from 'expo-secure-store';

class CustomWalletHelper {
    constructor() {
      this.wallet = null;
      this.provider = null;
      this.networks = {
        '0x1b9e': 'https://planq-rpc.nodies.app',
        '0x1ba5': 'https://evm-rpc-atlas.planq.network',
        '0x2105': 'https://base-pokt.nodies.app',
        '0x38': 'https://binance.llamarpc.com',
        '0x89': 'https://polygon-pokt.nodies.app'       

      };
      this.currentNetwork = '0x1b9e'; // Default network
    }
  
    async initialize() {
      try {
        const walletDataString = await SecureStore.getItemAsync('Wallet');
        if (!walletDataString) {
          console.error('No wallet data found.');
          return;
        }
        const walletData = JSON.parse(walletDataString);
        this.setProvider(this.currentNetwork);
        
        // Wait for the provider to be ready
        await this.provider.ready;
  
        this.wallet = new ethers.Wallet(walletData.privateKey, this.provider);
        this.signer = this.wallet.connect(this.provider);
        console.log('Wallet connected:', this.wallet.address);
        console.log('Network chainId:', await this.provider.getNetwork().then(net => net.chainId));
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    }

    async signTypedData(domain, types, value) {
        try {
            // Ensure the wallet is connected to the provider
            const signer = this.wallet.connect(this.provider);

            // Using the corrected and public method for EIP-712 typed data signing
            const signature = await signer.signTypedData(domain, types, value); // Corrected usage
            return signature;
        } catch (error) {
            console.error('Signing typed data failed:', error);
            throw error;
        }
    }
  
    setProvider(chainId) {
      const rpcUrl = this.networks[chainId];
      if (!rpcUrl) {
        throw new Error(`No RPC URL available for chainId: ${chainId}`);
      }
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      // No need to reconnect the wallet here if it's not initialized yet
    }
  
    async switchNetwork(chainId) {
      if (!this.networks[chainId]) {
        console.error(`Network ${chainId} is not configured.`);
        return false;
      }
      this.setProvider(chainId);
      if (this.wallet) {
        this.signer = this.wallet.connect(this.provider);
      }
      console.log(`Switched to ${chainId}`);
      return true;
    }
  
    async getBalance(address) {
        try {
          const balance = await this.provider.getBalance(address);
          return ethers.formatEther(balance); // Converts the balance from Wei to Ether
        } catch (error) {
          console.error('Failed to fetch balance:', error);
          throw error;
        }
      }

      async sendTransaction(txObject) {
        try {
          const transactionResponse = await this.signer.sendTransaction(txObject);
          await transactionResponse.wait();  // Wait for the transaction to be mined
          return transactionResponse;
        } catch (error) {
          console.error('Transaction failed:', error);
          throw error;
        }
      }

  async estimateGas(txObject) {
    try {
      const gasEstimate = await this.signer.estimateGas(txObject);
      return gasEstimate.toString();
    } catch (error) {
      console.error('Estimate Gas failed:', error);
      throw error;
    }
  }

  // Added method to handle eth_call (read-only calls)
  async call(txObject) {
    try {
      const result = await this.provider.call(txObject);
      return result;
    } catch (error) {
      console.error('eth_call failed:', error);
      throw error;
    }
  }

  // Sign a message using the wallet
  async signMessage(message) {
    try {
      const signature = await this.signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error('Signing message failed:', error);
      throw error;
    }
  }

  // Request account access, simulating eth_requestAccounts
  async requestAccounts() {
    if (this.wallet) {
      return [this.wallet.address]; // Returns the connected account
    } else {
      console.error('No wallet connected');
      return [];
    }
  }
  async ethAccount() {
    if (this.wallet) {
      return [this.wallet.address]; // Returns the connected account
    } else {
      console.error('No wallet connected');
      return [];
    }
  }

  async getBlockNumber() {
    return await this.provider.getBlockNumber();
  }

  async getTransactionByHash(txHash) {
    return await this.provider.getTransaction(txHash);
  }

  async getTransactionReceipt(txHash) {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      return receipt;
    } catch (error) {
      console.error("Failed to get transaction receipt:", error);
      throw error;
    }
  }

  async ethSign(params) {
    const [account, data] = params;
    if (this.wallet.address.toLowerCase() === account.toLowerCase()) {
        return await this.signer.signMessage(ethers.utils.arrayify(data));
    } else {
        throw new Error("Account not found");
    }
}
}

export default CustomWalletHelper;
