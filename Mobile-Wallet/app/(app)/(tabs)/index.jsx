import React from 'react';
import { CoinList } from "../../../components/card/CoinList";
import { StyledView } from "../../../constants/styledComponents"
import { CardView } from '../../../components/card/CardView';
import { themeColor } from '../../../constants/themeColor';
import { Heading } from '../../../components/typography/Heading';
import { fetch } from "../../../api/useAPI";
import { FECTH_TOKEN } from '../../../constants/apiURL';
import { PullToRefreshScrollView } from "../../../components/scroll/index";

export default function Tab() {
  const tokenData = fetch({ API_URL: FECTH_TOKEN, rawLines: 'tokens' });

  return (
    <StyledView className="container items-start justify-center min-h-screen px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <PullToRefreshScrollView>
        <CardView title={`Welcome, Alfin Sugestian`} subtitle={`Make your investment today`} buttonText={`Invest Today`} onPress={() => console.log("Button pressed")} />
        <Heading title={`Trending Coins`} fontSize="xl" setButton={false} />
        <CoinList list={tokenData} isArrow={false} />
      </PullToRefreshScrollView>
    </StyledView >
  );
}