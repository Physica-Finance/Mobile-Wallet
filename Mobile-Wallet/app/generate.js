import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { generateWallet } from '../utils/wallethelper/generate'; // Adjust the import path as needed

export default function GenerateWalletPage() {
    const [wallet, setWallet] = useState(null);

    const handleGenerateWallet = async () => {
        const newWallet = generateWallet();
        setWallet(newWallet);
    
        try {
           
            const walletData = JSON.stringify({
                ethAddress: newWallet.ethAddress,
                privateKey: newWallet.privateKey,
                mnemonic: newWallet.mnemonic,
                planqAddress: newWallet.planqAddress,
            });
    
            // Securely store the wallet data
            await EncryptedStorage.setItem('userWallet', walletData);
    
            console.log('Wallet data saved securely.');
        } catch (error) {
            console.error('Error saving wallet data:', error);
        }
    };
    
    

    return (
        <View style={styles.container}>
            <Button title="Generate New Wallet" onPress={handleGenerateWallet} />
            {wallet && (
                <>
                    <Text style={styles.text}>Wallet Address: {wallet.ethAddress}</Text>
                    <Text style={styles.text}>Private Key: {wallet.privateKey}</Text>
                    <Text style={styles.text}>Mnemonic: {wallet.mnemonic}</Text>
                    <Text style={styles.text}>Planq Address: {wallet.planqAddress}</Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 20,
    },
});
