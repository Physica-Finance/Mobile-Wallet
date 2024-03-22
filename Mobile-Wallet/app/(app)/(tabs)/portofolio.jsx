import React from 'react';
import { themeColor } from '../../../constants/themeColor';
import { StyledView } from "../../../constants/styledComponents"
import { CardPortfolio } from '../../../components/card/CardPortfolio';
import { CoinList } from "../../../components/card/CoinList";
import { Heading } from '../../../components/typography/Heading';
import { FECTH_TOKEN } from '../../../constants/apiURL';
import { PullToRefreshScrollView } from "../../../components/scroll/index";

export default function Tab() {
  const countCoins = 2;
  const tokenData = fetch({ API_URL: FECTH_TOKEN, rawLines: 'tokens' });
  
  return (
    <StyledView className="container items-start justify-center min-h-screen px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <Heading title={`Portofolio`} fontSize="4xl" setButton={false} />
      <PullToRefreshScrollView>
        <CardPortfolio
          title={`Total Available`}
          amount={`$2,509.75`}
          btnSendText={`Send`}
          onPressSend={() => console.log("Button Send pressed")}
          btnReceiveText={`Receive`}
          onPressReceive={() => console.log("Button Receive pressed")}
        />

        <Heading title={`Your Coins (${countCoins})`} fontSize="xl" setButton={false} />
        <CoinList list={tokenData} isArrow={true} />

      </PullToRefreshScrollView>
    </StyledView>
  );
}
