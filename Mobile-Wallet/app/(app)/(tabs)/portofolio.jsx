import React from 'react';
import { themeColor } from '../../../constants/themeColor';
import { StyledView, StyledText } from "../../../constants/styledComponents"
import { CardPortfolio } from '../../../components/card/CardPortfolio';
import { yourCoins } from '../../../constants/yourCoins'
import { CoinList } from "../../../components/card/CoinList";



export default function Tab() {
  return (
    <StyledView className="container min-h-screen justify-center items-start px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <CardPortfolio
        title={`Portofolio`}
        subtitle={`Total Available`}
        amount={`$2,509.75`}
        btnSendText={`Send`}
        onPressSend={() => console.log("Button Send pressed")}
        btnReceiveText={`Receive`} 
        onPressReceive={() => console.log("Button Receive pressed")}
      />

      <StyledView className="container items-start justify-start">
        <StyledText className="text-white py-4 w-full font-bold text-2xl">Your Coins</StyledText>
      </StyledView>

      <CoinList list={yourCoins} />

    </StyledView>
  );
}
