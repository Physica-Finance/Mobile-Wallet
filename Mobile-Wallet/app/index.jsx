const React = require('react');
const { useState } = React;
const { View, Text, Button, StyleSheet } = require('react-native');
const AsyncStorage = require('@react-native-async-storage/async-storage').default;
const { ethers } = require('ethers');

const generateWallet = async () => {
  // Generate a new wallet
  const wallet = ethers.Wallet.createRandom();
  
  // Store wallet information securely
  try {
    await AsyncStorage.setItem('walletAddress', wallet.address);
    await AsyncStorage.setItem('walletPrivateKey', wallet.privateKey);
    console.log('Wallet generated and stored successfully!');
  } catch (error) {
    console.error('Failed to store the wallet data:', error);
  }
};

const getStoredWallet = async () => {
  try {
    const address = await AsyncStorage.getItem('walletAddress');
    const privateKey = await AsyncStorage.getItem('walletPrivateKey');
    
    if (!address || !privateKey) {
      console.log('No wallet information found.');
      return;
    }
    console.log('Stored Wallet Address:', address);
    console.log('Stored Private Key:', privateKey);
  } catch (error) {
    console.error('Failed to retrieve the wallet data:', error);
  }
};

function App() {
  const [walletInfo, setWalletInfo] = useState('');

  const handleGenerateWallet = async () => {
    await generateWallet();
    await getStoredWallet(); // Optional: for displaying or further processing
  };

  return (
    <View style={styles.container}>
      <Text>Wallet Generator Example</Text>
      <Button title="Generate Wallet" onPress={handleGenerateWallet} />
      {/* Display wallet info or other UI elements here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = App;
