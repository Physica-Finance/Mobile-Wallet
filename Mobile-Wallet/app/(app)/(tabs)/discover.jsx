import React from 'react';
import { themeColor } from '../../../constants/themeColor';
import { StyledView } from "../../../constants/styledComponents"
import { CardVisit } from '../../../components/card/CardPortfolio';
import { Heading } from '../../../components/typography/Heading';
import { CustomTextInput } from '../../../components/input/CustomTextInput';

export default function Tab() {
  const countBrowserTab = 2;
  return (
    <StyledView className="container min-h-screen justify-center items-start px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <Heading title={`Discover Apps`} fontSize="4xl" setButton={true} onPress={() => console.log("Button Discover pressed")} buttonText={`${countBrowserTab}`} />
      <CustomTextInput className="bg-white text-gray-500 w-full " placeholder={`Type URL`} />
    </StyledView>
  );
}
