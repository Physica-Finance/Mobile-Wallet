import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, Text, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { ethers } from 'ethers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeColor } from '../../../constants/themeColor';
import CustomWalletHelper from '../../../utils/wallethelper/walletHelper'


const DiscoverPage = () => {
  const [webViewUrl, setWebViewUrl] = useState('https://explorer.tcnetwork.io/planq');
  const [showWebView, setShowWebView] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);
  const [walletHelper, setWalletHelper] = useState(null);

  useEffect(() => {
    const helper = new CustomWalletHelper();
    helper.initialize().then(() => {
      setWalletHelper(helper);
      setIsLoading(false);
    });
    
  }, []);

  const visitUrl = () => {
    setShowWebView(true);
  };

  const goBackHome = () => {
    setShowWebView(false);
    setWebViewUrl('');
  };


  const handleRequestAccounts = async (method) => {
    Alert.alert(
      "Request Accounts",
      "Do you want to share your account address with this site?",
      [
        { text: "Deny", onPress: () => sendErrorResponse(method, 'User denied account access'), style: "cancel" },
        { text: "Allow", onPress: async () => {
          const accounts = await walletHelper.requestAccounts();
          sendResponse(method, accounts);
        }}
      ],
      { cancelable: false }
    );
  };

  const handleethAccounts = async (method) => {
    const accounts = await walletHelper.requestAccounts();
    sendResponse(method, accounts);
  };

  const handleEthCall = async (method, params) => {
    Alert.alert(
      "Confirm Call",
      "Do you want to perform this read operation?",
      [
        { text: "No", onPress: () => sendErrorResponse(method, 'User denied operation'), style: "cancel" },
        { text: "Yes", onPress: async () => {
          const result = await walletHelper.call(params[0]);
          sendResponse(method, result);
        }}
      ],
      { cancelable: false }
    );
  };

  const handleSendTransaction = async (method, params) => {
    const txDetails = params[0]; // Assuming the first parameter contains the transaction details
  
    // Extract details from txDetails to display in the confirmation dialog
    const { value, to } = txDetails;
    const formattedValue = ethers.formatEther(value || '0'); // Ensure value is in Ether
  
    Alert.alert(
      "Confirm Transaction",
      `Approval Request`, 
      [
        {
          text: "Cancel",
          onPress: () => sendErrorResponse(method, 'Transaction cancelled by user'),
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const txResponse = await walletHelper.sendTransaction(txDetails);
              sendResponse(method, txResponse.hash); 
            } catch (error) {
              console.error('Transaction Error:', error);
              sendErrorResponse(method, error.message);
            }
          }
        }
      ],
      { cancelable: false } // This prevents the dialog from being dismissible by tapping outside of it
    );
  };

  const handlePersonalSign = async (method, params) => {
    const message = params[0];
    const signature = await walletHelper.signMessage(message);
    sendResponse(method, signature);
  };

  const handleSendRawTransaction = async (method, params) => {
    const signedTx = params[0];
    const txResponse = await walletHelper.provider.sendTransaction(signedTx);
    sendResponse(method, txResponse.hash);
  };

  const handleEstimateGas = async (method, params) => {
    const gasEstimate = await walletHelper.estimateGas(params[0]);
    sendResponse(method, gasEstimate);
  };

  const handleSwitchEthereumChain = async (method, params) => {
    try {
      const chainId = params[0].chainId; // Ensure params structure is correct
      await walletHelper.switchNetwork(chainId);
      sendResponse(method, {status: 'Switched to chain ' + chainId});
    } catch (error) {
      console.error('Error switching networks:', error);
      sendErrorResponse(method, error.message);
    }
};

  const handleGetTransactionByHash = async (method, params) => {
    try {
      const txHash = params[0];  // The transaction hash is expected as the first parameter
      const transaction = await walletHelper.getTransactionByHash(txHash);
      if (transaction) {
        sendResponse(method, transaction);
      } else {
        sendErrorResponse(method, 'Transaction not found');
      }
    } catch (error) {
      console.error('Error fetching transaction by hash:', error);
      sendErrorResponse(method, error.message);
    }
  };

  const handleEthSign = async (method, params) => {
    const message = params[0];
    Alert.alert(
      "Sign Message",
      `Do you want to sign this message? ${ethers.utils.toUtf8String(message)}`,
      [
        { text: "Cancel", onPress: () => sendErrorResponse(method, 'User denied message signing'), style: "cancel" },
        { text: "Sign", onPress: async () => {
          try {
            const signature = await walletHelper.signMessage(message);
            sendResponse(method, signature);
          } catch (error) {
            console.error('Signing Error:', error);
            sendErrorResponse(method, error.message);
          }
        }}
      ],
      { cancelable: true }
    );
  };

  const handleBlockNumber = async (method) => {
    try {
      const blockNumber = await walletHelper.getBlockNumber();
      sendResponse(method, `0x${blockNumber.toString(16)}`); // Send as hex string
    } catch (error) {
      console.error('Error getting block number:', error);
      sendErrorResponse(method, error.message);
    }
  };
  
  const handleGetTransactionReceipt = async (method, params) => {
    try {
      const txHash = params[0]; // Expect the transaction hash as the first parameter
      const receipt = await walletHelper.getTransactionReceipt(txHash);
      if (receipt) {
        sendResponse(method, receipt);
      } else {
        sendErrorResponse(method, 'Transaction receipt not found');
      }
    } catch (error) {
      console.error('Error fetching transaction receipt:', error);
      sendErrorResponse(method, error.message);
    }
  };

  const sendResponse = (method, result) => {
    console.log(`Sending response for method ${method}:`, result);
    webViewRef.current.postMessage(JSON.stringify({
      type: 'response',
      method,
      result
    }));
  };
  
  const sendErrorResponse = (method, message) => {
    console.log(`Sending error response for method ${method}: ${message}`);
    webViewRef.current.postMessage(JSON.stringify({
      type: 'error',
      method,
      message
    }));
  };


  const handleGetBalance = async (method, params) => {
    try {
      const address = params[0];  // Assuming the first parameter is the address
      const balance = await walletHelper.getBalance(address);
      sendResponse(method, balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      sendErrorResponse(method, 'Error fetching balance');
    }
  };


  const handleMessage = async (event) => {
    console.log("Received message from WebView:", event.nativeEvent.data);
    try {
      const { method, params } = JSON.parse(event.nativeEvent.data);

      if (!walletHelper || !walletHelper.signer) {
        console.error('Signer not available');
        sendErrorResponse(method, 'Signer not available');
        return;
      }

      switch (method) {
        case 'eth_accounts':
          handleethAccounts(method);
          break;
        case 'eth_requestAccounts':
          handleRequestAccounts(method);
          break;
        case 'eth_call':
          handleEthCall(method, params);
          break;
        case 'eth_sendTransaction':
          handleSendTransaction(method, params);
          break;
        case 'personal_sign':
          handlePersonalSign(method, params);
          break;
        case 'eth_sendRawTransaction':
          handleSendRawTransaction(method, params);
          break;
        case 'eth_estimateGas':
          handleEstimateGas(method, params);
          break;
        case 'eth_chainId':
          const network = await walletHelper.provider.getNetwork();
          sendResponse(method, `0x${network.chainId.toString(16)}`);
          break;
        case 'eth_sign':
          handleEthSign(method, params);
          break;
        case 'eth_blockNumber':
          handleBlockNumber(method);
          break;
        case 'eth_getTransactionByHash':
          handleGetTransactionByHash(method, params);
          break;
        case 'eth_getTransactionReceipt':
          handleGetTransactionReceipt(method, params);
          break;
        case 'wallet_switchEthereumChain':
          await handleSwitchEthereumChain(method, params);
          break;
        case 'eth_getBalance':
          handleGetBalance(method, params);
          break;
        default:
          console.log(`Received unsupported method: ${method}`);
          sendErrorResponse(method, 'Unsupported method');
          break;
      }
    } catch (error) {
      console.error('Error handling the message from WebView:', error.message);
      sendErrorResponse(method, error.message);
    }
  };



  const injectedJavaScript = `
    if (!window.ethereum) {
      window.ethereum = {
        isMetaMask: true,
        request: async ({ method, params }) => {
          return new Promise((resolve, reject) => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ method, params }));
            document.addEventListener('message', function listener(event) {
              const data = JSON.parse(event.data);
              if (data.type === 'response' && data.method === method) {
                document.removeEventListener('message', listener);
                if (data.error) {
                  reject(new Error(data.error));
                } else {
                  resolve(data.result);
                }
              }
            });
          });
        },
        enable: () => this.request({ method: 'eth_requestAccounts' }),
        on: (event, handler) => document.addEventListener(event, handler),
        emit: (event, detail) => {
          const customEvent = new CustomEvent(event, { detail });
          document.dispatchEvent(customEvent);
        }
      };

      console.log('Custom Ethereum provider injected');
      window.dispatchEvent(new Event('ethereum#initialized'));
    }
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
      {canGoBack && (
          <TouchableOpacity onPress={handleBackButtonPress} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {!canGoBack && (
          <TouchableOpacity onPress={goBackHome} style={styles.iconButton}>
            <Icon name="home" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.urlInput}
          value={webViewUrl}
          onChangeText={setWebViewUrl}
          placeholder="Type URL here"
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={visitUrl} style={styles.iconButton}>
          <Icon name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {showWebView && (
        <WebView
          ref={webViewRef}
          source={{ uri: webViewUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={handleMessage}
          injectedJavaScript={injectedJavaScript}
          onLoadEnd={() => webViewRef.current.injectJavaScript(injectedJavaScript)}
        />
      )}
      {!showWebView && (
        <View style={styles.content}></View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    width: '100%',
    backgroundColor: themeColor.appBackgroundColor,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  urlInput: {
    flex: 1,
    minHeight: 30,
    maxHeight: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#000',
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
});

export default DiscoverPage;
