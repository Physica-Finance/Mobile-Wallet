import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
// Import the fetchTokenBalance function
import { fetchTokenBalance } from '../../../utils/wallethelper/fetchTokenBalance';
import { fetchEthBalance, fetchPlanqBalance } from '../../../utils/wallethelper/fetchBalance'; 

const themeColor = { appBackgroundColor: '#fff' };

const CardPortfolio = ({ title, amount }) => (
  <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0' }}>
    <Text>{title}</Text>
    <Text>{amount}</Text>
  </View>
);

const Heading = ({ title }) => <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>;

const ETH_RPC_PROVIDER = 'https://evm-rpc.planq.network/';
// Placeholder RPC endpoint for Planq, replace with your actual Planq RPC endpoint
const PLANQ_RPC_PROVIDER = 'https://your_planq_rpc_endpoint_here';

// Token contract information, replace with your actual data
const TOKEN_CONTRACTS = [
  { address: '0xfD6fF17b542260f95660BBD71470Fe6eEC72801D', name: 'USDT' },
  { address: '0x5EBCdf1De1781e8B5D41c016B0574aD53E2F6E1A', name: 'Wrapped Planq' },
];

export default function PortfolioPage() {
  const [ethAddress, setEthAddress] = useState('Loading...');
  const [planqAddress, setPlanqAddress] = useState('Loading...');
  const [ethBalance, setEthBalance] = useState('Loading...');
  const [planqBalance, setPlanqBalance] = useState('Loading...');
  const [tokenBalances, setTokenBalances] = useState([]);

  useEffect(() => {
    const fetchWalletDataAndBalances = async () => {
      try {
        const walletDataString = await SecureStore.getItemAsync('Wallet');
        if (walletDataString) {
          const walletData = JSON.parse(walletDataString);
          setEthAddress(walletData.ethAddress);
          setPlanqAddress(walletData.planqAddress);

          // Fetch Ethereum and Planq balances as examples, adapt according to your needs
          const ethBal = await fetchEthBalance(walletData.ethAddress, ETH_RPC_PROVIDER);
          setEthBalance(ethBal + ' Planq');

          // Fetch token balances
          const promises = TOKEN_CONTRACTS.map(({ address, name }) =>
            fetchTokenBalance(walletData.ethAddress, ETH_RPC_PROVIDER, address).then(balance => ({
              name,
              balance: balance + ' Tokens'
            }))
          );
          const results = await Promise.all(promises);
          setTokenBalances(results);
        } else {
          setEthAddress('No wallet data found');
          setPlanqAddress('No wallet data found');
        }
      } catch (error) {
        console.error('Error retrieving wallet data and balances:', error);
      }
    };

    fetchWalletDataAndBalances();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: themeColor.appBackgroundColor }}>
        <Heading title="Portfolio" />
        <CardPortfolio title="Ethereum Address" amount={ethAddress} />
        <CardPortfolio title="Planq Address" amount={planqAddress} />
        <CardPortfolio title="Panq Balance" amount={ethBalance} />
        {tokenBalances.map(({ name, balance }) => (
          <CardPortfolio key={name} title={`${name} Balance`} amount={balance} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
