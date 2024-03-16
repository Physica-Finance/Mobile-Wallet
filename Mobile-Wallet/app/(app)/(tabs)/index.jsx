import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const data = [
  { id: "1", coin: "Planq", ticker: "PLQ", price: "$1.00", img: "https://cdn.builder.io/api/v1/image/assets/580ff9284d33405f94bd899116dbdf56/1846b26b1cf2456bb5da6004e6629645?width=500" },
  { id: "2", coin: "Wrapped Planq", ticker: "WPLQ", price: "$1.00", img: "https://cdn.builder.io/api/v1/image/assets/580ff9284d33405f94bd899116dbdf56/1846b26b1cf2456bb5da6004e6629645?width=500" },
  { id: "3", coin: "Delta Token", ticker: "DELTA", price: "$1.00", img: "https://cdn.builder.io/api/v1/image/assets/580ff9284d33405f94bd899116dbdf56/1846b26b1cf2456bb5da6004e6629645?width=500" },
  { id: "4", coin: "Physica Token", ticker: "PHYSICA", price: "$1.00", img: "https://cdn.builder.io/api/v1/image/assets/580ff9284d33405f94bd899116dbdf56/1846b26b1cf2456bb5da6004e6629645?width=500" },
  { id: "5", coin: "PLANQ USDC", ticker: "USDC", price: "$1.00", img: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022" },
  { id: "6", coin: "USDT - Tron", ticker: "USDT", price: "$1.00", img: "https://key.fi/assets/usdt.4dc1d978.png" },
  // Add more items as needed
];

const CoinList = ({ item }) => (
  <StyledView className="flex flex-row h-auto justify-between py-3 px-5 my-2 items-center rounded-lg bg-blue-900">
    <Image className="basis-1/8" width={48} height={48}
      source={{ uri: item.img }}
    />
    <StyledView className='space-y-2 basis-1/2'>
      <StyledText className="font-semibold text-lg text-white w-full">{item.coin}</StyledText>
      <StyledText className="font-semibold text-sm text-gray-400 ">{item.ticker}</StyledText>
    </StyledView>
    <StyledText className="basis-1/4 font-semibold text-lg text-right text-white">{item.price}</StyledText>
  </StyledView>
);

export default function Tab() {
  return (
    <StyledView className="container min-h-screen justify-center items-start bg-blue-950 px-5 py-16 space-y-2">
      {/* Card Welcome */}
      <StyledView className="container h-auto rounded-2xl items-start bg-blue-500 p-5 space-y-4 ">
        <StyledText className="text-white px-3 pt-5 w-full font-bold">Welcome, Agilan</StyledText>
        <StyledText className="text-white px-3 w-full font-bold text-xl">Make your first Investment today</StyledText>
        <StyledTouchableOpacity
          className="bg-white text-blue-950 px-5 py-3 mx-3 rounded-md"
          onPress={() => console.log("Button pressed")}
        >
          <StyledText className="font-semibold text-blue-950">Invest Today</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      <StyledView className="container items-start justify-start">
        <StyledText className="text-white py-4 w-full font-bold text-2xl">Trending Coins</StyledText>
      </StyledView>

      <StyledView className="flex flex-1 flex-col h-auto w-full overflow-scroll">
        <FlatList
          data={data}
          renderItem={CoinList} // Use CoinList component for renderItem
          keyExtractor={item => item.id}
        />
      </StyledView>

    </StyledView>
  );
}
