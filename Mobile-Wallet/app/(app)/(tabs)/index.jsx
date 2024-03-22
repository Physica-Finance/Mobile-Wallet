import React from 'react';
import { CoinList } from "../../../components/card/CoinList";
import { StyledView } from "../../../constants/styledComponents"
import { CardView } from '../../../components/card/CardView';
import { themeColor } from '../../../constants/themeColor';
import { Heading } from '../../../components/typography/Heading';
import { fetch } from "../../../api/useAPI";
import { FECTH_TOKEN } from '../../../constants/apiURL';

export default function Tab() {
  const tokenData = fetch({ API_URL: FECTH_TOKEN, rawLines: 'tokens' });

  return (
    <StyledView className="container min-h-screen justify-center items-start px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <CardView title={`Welcome, Alfin Sugestian`} subtitle={`Make your investment today`} buttonText={`Invest Today`} onPress={() => console.log("Button pressed")} />
      <Heading title={`Trending Coins`} fontSize="xl" setButton={false} />
      <CoinList list={tokenData} isArrow={false} />
    </StyledView >
  );
}