import React from 'react';
import { StyledView, StyledText, StyledTouchableOpacity } from "../../constants/styledComponents"
import { themeColor } from '../../constants/themeColor';


export function CardPortfolio({ title, subtitle, amount, onPressSend, onPressReceive, btnSendText, btnReceiveText }) {
  return (
    <StyledView className="container h-auto rounded-2xl bg-blue-500 p-5 justify-center items-start w-full">
      <StyledText className="text-white  font-bold text-3xl pt-2 pb-5">{title}</StyledText>
      <StyledText className="text-white  py-.5 font-semibold text-sm">{subtitle}</StyledText>
      <StyledText className="text-white  py-.5 font-extrabold text-4xl">{amount}</StyledText>
      <StyledView className='flex flex-row h-auto justify-between space-x-3 w-full pt-10 items-center'>
        <StyledTouchableOpacity
          className="px-5 py-3 rounded-full w-full  basis-1/2" style={{ backgroundColor: themeColor.appBackgroundColor }}
          onPress={onPressSend}
        >
          <StyledText className="text-center font-semibold text-white">{btnSendText}</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className="px-5 py-3 rounded-full w-full basis-1/2" style={{ backgroundColor: themeColor.appBackgroundColor }}
          onPress={onPressReceive}
        >
          <StyledText className="text-center font-semibold text-white">{btnReceiveText}</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}

