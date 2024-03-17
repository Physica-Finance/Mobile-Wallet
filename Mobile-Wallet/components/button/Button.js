import React from 'react-native'
import { Text } from "react-native";
import { StyledTouchableOpacity, StyledText } from "../../constants/styledComponents";

export function Button({ btnText, onPress, classBtn, classText }) {
    return (
        <StyledTouchableOpacity className={classBtn} onPress={onPress}>
            <Text classBtn={classText}>{btnText}</Text>
        </StyledTouchableOpacity>
    );
}