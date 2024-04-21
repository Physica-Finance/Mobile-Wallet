import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Platform, UIManager, findNodeHandle, NativeModules } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RNCWebView = NativeModules.RNCWebView;

class CustomWebView extends Component {
  constructor(props) {
    super(props);
    this.webViewRef = React.createRef();
  }

  postMessage(message) {
    const handle = findNodeHandle(this.webViewRef.current);
    RNCWebView.postMessage(handle, message);
  }

  render() {
    return <WebView ref={this.webViewRef} {...this.props} />;
  }
}

export default CustomWebView;
