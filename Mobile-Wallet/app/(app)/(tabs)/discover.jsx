import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { CustomWalletHelper, CustomSigner } from '../../../utils/wallethelper/walletHelper';
import { themeColor } from '../../../constants/themeColor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DiscoverPage = () => {
  const [webViewUrl, setWebViewUrl] = useState('https://example.com');
  const [showWebView, setShowWebView] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const customWalletHelper = new CustomWalletHelper('https://evm-rpc-atlas.planq.network');
    const connectWallet = async () => {
      try {
        const wallet = await customWalletHelper.connectToWallet();
        if (wallet) {
          const customSigner = new CustomSigner(wallet.privateKey, customWalletHelper.provider);
          setSigner(customSigner);
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    connectWallet();
  }, []);

  const visitUrl = () => {
    setShowWebView(true);
  };

  const goBackHome = () => {
    setShowWebView(false);
    setWebViewUrl('');
  };

  const handleGoBackInWebView = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const handleMessage = (event) => {
    try {
      const { method, params } = JSON.parse(event.nativeEvent.data);
      console.log("Received message:", method, params);

      if (!signer) {
        console.log('Signer is not available');
        webViewRef.current.postMessage(JSON.stringify({
          type: 'response',
          method,
          error: 'Signer not available'
        }));
        return;
      }

      switch (method) {
        case 'eth_requestAccounts':
          signer.getAddress().then(address => {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'response',
              method,
              result: [address]
            }));
          }).catch(error => {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'response',
              method,
              error: 'Failed to retrieve address: ' + error.message
            }));
          });
          break;
        case 'eth_chainId':
          signer.provider.getNetwork().then(network => {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'response',
              method,
              result: `0x${network.chainId.toString(16)}`
            }));
          }).catch(error => {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'response',
              method,
              error: error.message
            }));
          });
          break;
        case 'eth_sendTransaction':
          signer.signTransaction(params[0]).then(transaction => {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'response',
              method,
              result: transaction
            }));
          }).catch(error => {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'response',
              method,
              error: error.message
            }));
          });
          break;
        default:
          webViewRef.current.postMessage(JSON.stringify({
            type: 'response',
            method,
            error: 'Unsupported method'
          }));
      }
    } catch (error) {
      console.error('Failed to handle message from WebView:', error);
      webViewRef.current.postMessage(JSON.stringify({
        type: 'response',
        method: 'error',
        error: 'Internal error handling message'
      }));
    }
  };

  const injectedJavaScript = `
  (function() {
    if (!window.ethereum) {
      window.ethereum = {
        isMetaMask: true,
        request: async ({ method, params }) => {
          return new Promise((resolve, reject) => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ method, params }));
            document.addEventListener('message', function(event) {
              const data = JSON.parse(event.data);
              if (data.type === 'response' && data.method === method) {
                if (data.error) {
                  reject(new Error(data.error));
                } else {
                  resolve(data.result);
                }
              }
            });
          });
        },
        enable: () => window.ethereum.request({ method: 'eth_requestAccounts' }),
        selectedAddress: '${signer ? signer.getAddress() : ''}',
        networkVersion: '7077',
        chainId: '0x1ba5'
      };
      window.dispatchEvent(new Event('ethereum#initialized'));
    }
  })();
  true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={goBackHome} style={styles.iconButton}>
          <Icon name="home" size={24} color="#fff" />
        </TouchableOpacity>
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
        {showWebView && (
          <TouchableOpacity onPress={handleGoBackInWebView} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      {showWebView ? (
       <WebView
       ref={webViewRef}
       source={{ uri: webViewUrl }}
       onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
       javaScriptEnabled={true}
       domStorageEnabled={true}
       startInLoadingState={true}
       onMessage={handleMessage}
       injectedJavaScript={injectedJavaScript}
       onLoadEnd={() => webViewRef.current.injectJavaScript(injectedJavaScript)}
   />
      ) : (
        <View style={styles.content}></View>
      )}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
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
