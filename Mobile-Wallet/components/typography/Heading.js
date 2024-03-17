import React from 'react-native'
import { StyledView, StyledText, StyledTouchableOpacity } from "../../constants/styledComponents";

export function Heading({ title, fontSize, setButton = true, onPress, buttonText, setBorder = true }) {
    return (
        <StyledView className="flex flex-row justify-between px-3 items-center max-w-full">
            <StyledText className={`text-white py-4 font-bold text-${fontSize}`}>{title}</StyledText>
            {setButton ?
                <StyledTouchableOpacity
                    className={`bg-transparent text-blue-800  py-1 px-3 rounded-lg ${setBorder ? 'border-blue-800 border' : ''}`}
                    onPress={onPress}
                >
                    <StyledText className="font-bold text-lg text-blue-500">{buttonText}</StyledText>
                </StyledTouchableOpacity> : ""}
        </StyledView>
    );
}