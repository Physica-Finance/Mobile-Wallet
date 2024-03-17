import React from 'react';
import { StyledView, StyledText, StyledImageBackground, StyledTouchableOpacity } from "../../constants/styledComponents"
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function CardVisit({ title, onPress }) {
  return (
    <StyledTouchableOpacity onPress={onPress} className='w-full'>
      <StyledImageBackground className='container my-5 max-h-48'
        imageStyle={{ borderRadius: 10, backgroundSize: "cover" }}
        source={require('../../assets/card/bg-card-discover.png')}
      >
        <StyledView className="flex flex-row justify-between items-center py-5 px-3">
          <StyledText className="text-white font-bold text-xl">{title}</StyledText>
          <FontAwesome size={16} name="chevron-right" color={"white"} />
        </StyledView>
      </StyledImageBackground>
    </StyledTouchableOpacity>
  );
}
