import React from 'react';
import { StyledView, StyledText, StyledTouchableOpacity } from "../../constants/styledComponents"

export function CardView({ title, subtitle, buttonText, onPress }) {
  return (
    <StyledView className="container h-auto rounded-2xl items-start bg-blue-500 p-5 space-y-4 ">
      <StyledText className="text-white px-3 pt-5 w-full font-bold">{title}</StyledText>
      <StyledText className="text-white px-3 w-full font-bold text-xl">{subtitle}</StyledText>
      <StyledTouchableOpacity
        className="bg-white text-blue-950 px-5 py-3 mx-3 rounded-md"
        onPress={onPress}
      >
        <StyledText className="font-semibold text-blue-950">{buttonText}</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}
