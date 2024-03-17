import React from 'react';
import { CoinList } from "../../../components/card/CoinList";
import { StyledView, StyledText } from "../../../constants/styledComponents"
import { CardView } from '../../../components/card/CardView';
import { trendingCoins } from '../../../constants/trendingCoins'
import { themeColor } from '../../../constants/themeColor';


export default function Tab() {
  return (
    <StyledView className="container min-h-screen justify-center items-start px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <CardView title={`Welcome, Alfin Sugestian`} subtitle={`Make your investment today`} buttonText={`Invest Today`} onPress={() => console.log("Button pressed")} />

      <StyledView className="container items-start justify-start">
        <StyledText className="text-white py-4 w-full font-bold text-2xl">Trending Coins</StyledText>
      </StyledView>

      <CoinList list={trendingCoins} />

    </StyledView >
  );
}
