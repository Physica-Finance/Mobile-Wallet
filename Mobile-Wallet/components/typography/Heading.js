import React from 'react-native'
import { StyledView, StyledText, StyledTouchableOpacity } from "../../constants/styledComponents";

export function Heading({ title, fontSize, setButton = true, onPress, buttonText }) {
    return (
        <StyledView className="flex flex-row justify-center px-3 items-center">
            <StyledText className={`text-white py-4 w-full font-bold text-${fontSize}`}>{title}</StyledText>
            {setButton ?
                <StyledTouchableOpacity
                    className="bg-transparent text-blue-800 border-blue-800 border py-1 px-3 rounded-lg"
                    onPress={onPress}
                >
                    <StyledText className="font-bold text-lg text-blue-500">{buttonText}</StyledText>
                </StyledTouchableOpacity> : ""}
        </StyledView>
    );
}