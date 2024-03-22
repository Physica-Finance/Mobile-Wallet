import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { themeColor } from "../../constants/themeColor";

export function PullToRefreshScrollView({ children }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Adjust the timeout as needed
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[themeColor.buttonPrimaryTextColor]} // Set the color of the loading indicator
          tintColor={themeColor.buttonPrimaryTextColor} // Set the color of the loading indicator on iOS
        />
      }
      style={{ width: '100%', backgroundColor: themeColor.appBackgroundColor, minHeight: '100vh' }}
    >
      {children}
    </ScrollView>
  );
};

