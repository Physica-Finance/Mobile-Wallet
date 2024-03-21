import React from 'react';
import { StyledView, StyledText, StyledTouchableOpacity, StyledImageBackground } from "../../constants/styledComponents"
import { themeColor } from '../../constants/themeColor';


export function CardPortfolio({ title, amount, onPressSend, onPressReceive, btnSendText, btnReceiveText }) {
  return (
    <StyledImageBackground className='container'
      imageStyle={{ borderRadius: 20, backgroundSize: "cover" }}
      source={require('../../assets/card/bg-card-portfolio.png')}
    >
      <StyledView className="container h-auto p-5 justify-center items-start">
        <StyledText className="text-white py-1 font-semibold text-sm">{title}</StyledText>
        <StyledText className="text-white py-1 font-extrabold text-4xl">{amount}</StyledText>
        <StyledView className='flex flex-row gap-2 justify-center pt-5 items-center'>
          <StyledTouchableOpacity
            className="py-3 rounded-full basis-1/2" style={{ backgroundColor: themeColor.appBackgroundColor }}
            onPress={onPressSend}
          >
            <StyledText className="text-center font-semibold text-white">{btnSendText}</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            className="py-3 rounded-full basis-1/2" style={{ backgroundColor: themeColor.appBackgroundColor }}
            onPress={onPressReceive}
          >
            <StyledText className="text-center font-semibold text-white">{btnReceiveText}</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledImageBackground>
  );
}

