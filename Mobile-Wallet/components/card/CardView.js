import React from 'react';
import { StyledView, StyledText, StyledImageBackground, StyledTouchableOpacity } from "../../constants/styledComponents"

export function CardView({ title, subtitle, buttonText, onPress }) {
  return (
    <StyledImageBackground className='container'
      imageStyle={{ borderRadius: 20, backgroundSize: "cover" }}
      source={require('../../assets/card/bg-card-home.png')}
    >
      <StyledView className="container h-auto rounded-2xl items-start p-5 space-y-4 ">
        <StyledText className="text-white pt-5 w-full font-bold">{title}</StyledText>
        <StyledText className="text-white w-full font-bold text-xl">{subtitle}</StyledText>
        <StyledTouchableOpacity
          className="bg-white text-blue-950 px-5 py-3 mb-4 rounded-md"
          onPress={onPress}
        >
          <StyledText className="font-bold text-md text-blue-800">{buttonText}</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledImageBackground>
  );
}
