import React from 'react';
import { themeColor } from '../../../constants/themeColor';
import { StyledView } from "../../../constants/styledComponents"
import { CardPortfolio } from '../../../components/card/CardPortfolio';
import { yourCoins } from '../../../constants/yourCoins'
import { CoinList } from "../../../components/card/CoinList";
import { Heading } from '../../../components/typography/Heading';

export default function Tab() {
  const countCoins = 2;
  return (
    <StyledView className="container min-h-screen justify-center items-start px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <Heading title={`Portofolio`} fontSize="4xl" setButton={false} />
      <CardPortfolio
        title={`Total Available`}
        amount={`$2,509.75`}
        btnSendText={`Send`}
        onPressSend={() => console.log("Button Send pressed")}
        btnReceiveText={`Receive`}
        onPressReceive={() => console.log("Button Receive pressed")}
      />

      <Heading title={`Your Coins (${countCoins})`} fontSize="xl" setButton={false} />
      <CoinList list={yourCoins} isArrow={true} />

    </StyledView>
  );
}
