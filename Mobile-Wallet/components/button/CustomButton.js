import React from 'react-native'
import { StyledTouchableOpacity, StyledText } from "../../constants/styledComponents";

export function CustomButton({ btnText, onPress, classBtn, backgroundColor, classText }) {
    return (
        <StyledTouchableOpacity
            className={classBtn}
            style={{ backgroundColor: { backgroundColor } }}
            onPress={onPress}
        >
            <StyledText className={classText}>
                {btnText}
            </StyledText>
        </StyledTouchableOpacity>
    );
}