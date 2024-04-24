import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import * as SecureStore from 'expo-secure-store';
import { themeColor } from '../../../constants/themeColor';
import { StyledView } from "../../../constants/styledComponents";
import { CardPortfolio } from '../../../components/card/CardPortfolio';
import { CoinList } from "../../../components/card/CoinList"
import { Heading } from '../../../components/typography/Heading';
import { PullToRefreshScrollView } from "../../../components/scroll/index";
import { fetchTokenBalance } from '../../../utils/wallethelper/fetchTokenBalance';
import { fetchEthBalance } from '../../../utils/wallethelper/fetchBalance';
import { fetchIBCTokenBalance } from '../../../utils/wallethelper/fetchIbcBalances';
import { IBC_TOKENS } from '../../../utils/wallethelper/token/ibcToken' 
import AsyncStorage from '@react-native-async-storage/async-storage';



const ETH_RPC_PROVIDER = 'https://evm-rpc.planq.network';
const PLANQ_RPC_PROVIDER = 'https://rpc.planq.network';
const API_ENDPOINT = 'https://rest.planq.network';


const TOKEN_CONTRACTS = [
  { address: '0xfD6fF17b542260f95660BBD71470Fe6eEC72801D', name: 'USDT' },
  { address: '0x5EBCdf1De1781e8B5D41c016B0574aD53E2F6E1A', name: 'Wrapped Planq' },
  { address: '0x75E20C5d4aade76143b8b74d1C5E2865347f9d3B', name: 'USDC' },
  { address: '0x6aF48997671584672e084Bf2296473677598ee58', name: 'Delta' },
  { address: '0xC403e19036dc56B5698B8241D37C86FE87d57003', name: 'Physica' },
];

export default function PortfolioPage() {
  const navigation = useNavigation(); // Hook to access navigation
  const [ethAddress, setEthAddress] = useState('Loading...');
  const [planqAddress, setPlanqAddress] = useState('Loading...');
  const [ethBalance, setEthBalance] = useState('Loading...');
  const [planqBalance, setPlanqBalance] = useState('Loading...');
  const [tokenBalances, setTokenBalances] = useState([]);
  const [ibcTokenBalances, setIbcTokenBalances] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  

  useEffect(() => {
    const fetchWalletDataAndBalances = async () => {
      try {
        const walletDataString = await SecureStore.getItemAsync('Wallet');
        if (!walletDataString) {
          setEthAddress('No wallet data found');
          setPlanqAddress('No wallet data found');
          return;
        }
  
        const walletData = JSON.parse(walletDataString);
        setEthAddress(walletData.ethAddress);
        setPlanqAddress(walletData.planqAddress);
        console.log(walletData.planqAddress);
        console.log(walletData.ethAddress);
        console.log(walletData.privateKey)
  
        
        const ethBalPromise = fetchEthBalance(walletData.ethAddress, ETH_RPC_PROVIDER);
        const tokenBalPromises = TOKEN_CONTRACTS.map(({ address, name }) =>
          fetchTokenBalance(walletData.ethAddress, ETH_RPC_PROVIDER, address)
            .then(balance => ({ name, balance: (balance * 1000)}))
        );
  
        const ibcTokenBalPromises = IBC_TOKENS.map(({ denom, tokenName }) =>
          fetchIBCTokenBalance(API_ENDPOINT, walletData.planqAddress, denom)
            .then(balance => ({ name: tokenName, balance: balance})) 
        );
        const ethBal = await ethBalPromise;
        const tokenBals = await Promise.all(tokenBalPromises);
        const ibcTokenBals = await Promise.all(ibcTokenBalPromises);
  
        setEthBalance(ethBal + ' Planq');
        setTokenBalances([...tokenBals, ...ibcTokenBals]); 
  
      } catch (error) {
        console.error('Error retrieving wallet data and balances:', error);
      }
    };

    const handleConnectWallet = async () => {
      try {
        if (!isConnected) {
          await connect();
          Alert.alert("Wallet Connected", `Connected: ${walletAddress}`);
        } else {
          await disconnect();
          Alert.alert("Wallet Disconnected");
        }
      } catch (error) {
        Alert.alert("Connection Error", error.message);
      }
    };
  
    fetchWalletDataAndBalances();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StyledView style={{ backgroundColor: themeColor.appBackgroundColor }}>
        <Heading title={`Portfolio`} fontSize="4xl" />
        <PullToRefreshScrollView>
          <CardPortfolio title={'Available'} amount={ethBalance} btnSendText={`Send`} onPressSend={() => {}} btnReceiveText={`Receive`} onPressReceive={() => {}} />
          <Heading title={`Tokens`} fontSize="xl" />
          {tokenBalances.map(({ name, balance }) => (
            <View key={name} style={{ marginBottom: 25 }}>
              <CardPortfolio title={name} amount={balance} />
            </View>
          ))}
          {ibcTokenBalances.map(({ name, balance }) => ( 
            <View key={name} style={{ marginBottom: 25 }}>
              <CardPortfolio title={name} amount={balance}  />
            </View>
          ))}
        </PullToRefreshScrollView>
      </StyledView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContainer: {
    marginBottom: 10, 
  },
  swapButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: 'center',
  },
});
