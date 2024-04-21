import React from 'react';
import { Button, Alert } from 'react-native';
import { useWallet } from '../hooks/useWalletConnect';

const ConnectButton = () => {
  const { connectWallet, disconnectWallet, isWalletConnected, connector } = useWallet();

  const handlePress = async () => {
    if (isWalletConnected) {
      await disconnectWallet();
      Alert.alert("Disconnected", "The wallet has been disconnected.");
    } else {
      await connectWallet();
      Alert.alert("Connected", `Wallet connected: ${connector.accounts[0]}`);
    }
  };

  return (
    <Button
      title={isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      onPress={handlePress}
    />
  );
};

export default ConnectButton;
