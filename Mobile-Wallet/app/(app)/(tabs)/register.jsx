import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as sdk from "matrix-js-sdk";

// Initialize the Matrix client
const matrixClient = sdk.createClient({
  baseUrl: "http://194.163.150.181:8008",
  store: undefined, // Specify other storage options if necessary
});

// Function to fetch wallet credentials from secure storage
async function fetchWalletCredentials() {
    const walletDataJSON = await SecureStore.getItemAsync('Wallet');
    if (!walletDataJSON) {
        console.error('No wallet data found');
        return null;
    }
    return JSON.parse(walletDataJSON);
}

// Function to register a user using wallet credentials
async function registerUsingWallet() {
    try {
        const walletData = await fetchWalletCredentials();
        if (!walletData) {
            console.error("Wallet data is not available");
            return;
        }

        const username = walletData.ethAddress;  // Using Ethereum wallet address as username
        const password = walletData.privateKey;  // Using Ethereum private key as password

        const response = await matrixClient.register(username, password, null, {
            type: "m.login.dummy"  // This assumes no additional authentication is required
        });

        console.log('Registration successful:', response);
        await saveCredentials(response.user_id, response.access_token); // Save Matrix user ID and access token

        return response;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;  // Re-throw to be handled by the caller or UI
    }
}

// Function to save credentials securely
async function saveCredentials(userId, accessToken) {
    await SecureStore.setItemAsync('userCredentials', JSON.stringify({ userId, accessToken }));
    console.log('Credentials saved successfully');
}

const WalletRegistrationScreen = () => {
    const handleRegistration = async () => {
        try {
            const response = await registerUsingWallet();
            console.log('User registered with wallet credentials:', response);
            // Navigate to home screen or wherever appropriate
        } catch (error) {
            console.error('Registration with wallet credentials failed:', error);
            // Show error message to the user
        }
    };

    return (
        <View style={styles.container}>
            <Text>Use your Wallet Credentials to Register:</Text>
            <Button
                title="Register with Wallet"
                onPress={handleRegistration}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
});

export default WalletRegistrationScreen;
