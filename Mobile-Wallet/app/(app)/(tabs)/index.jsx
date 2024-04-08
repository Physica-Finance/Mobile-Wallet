import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image } from 'react-native';
import { StyledView } from "../../../constants/styledComponents";
import { CardView } from '../../../components/card/CardView';
import { themeColor } from '../../../constants/themeColor';
import { useNavigation } from '@react-navigation/native';
import { Heading } from '../../../components/typography/Heading';
import { PullToRefreshScrollView } from "../../../components/scroll/index";

export default function HomePage() {
  const navigation = useNavigation();
  const [tokenData, setTokenData] = useState([]);

  const handleInvestNowPress = () => {
    // Navigate to DiscoveryScreen with the URL as a parameter
    navigation.navigate('discover', { url: 'https://physica.finance' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=planq%2Cbitcoin%2Cethereum%2Ccosmos%2Cosmosis%2Ckujira%2Cbinancecoin');
        const data = await response.json();
        const formattedData = data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          price: coin.current_price.toFixed(2),
        }));
        setTokenData(formattedData);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StyledView style={styles.content}>
        <PullToRefreshScrollView>
          <CardView  
            title="Hello" 
            subtitle="Make your investment today" 
            buttonText="Invest Today" 
            onPress={handleInvestNowPress} // Use the handleInvestNowPress function here
          />
          <Heading title="Trending Coins" />
          <FlatList
            data={tokenData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.coinCard}>
                <Image source={{ uri: item.image }} style={styles.coinImage} />
                <Text style={styles.coinText}>{item.name} ({item.symbol.toUpperCase()}) - ${item.price}</Text>
              </View>
            )}
          />
        </PullToRefreshScrollView>
      </StyledView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
  },
  content: {
    flex: 1, // Take up all available space
    padding: 20,
  },
  coinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: themeColor.appBackgroundColor, // Dark background for the card
    padding: 10,
    borderRadius: 8, // Rounded corners
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  coinText: {
    color: '#fff', // White text color
    fontSize: 16,
  },
});
