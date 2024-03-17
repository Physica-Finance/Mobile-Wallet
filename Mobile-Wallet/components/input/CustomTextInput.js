import React from 'react';
import { StyledTextInput } from "../../constants/styledComponents"

export function CustomTextInput({ className, placeholder }) {
    return (
        <StyledTextInput className={className} placeholder={placeholder}></StyledTextInput>
    );
}