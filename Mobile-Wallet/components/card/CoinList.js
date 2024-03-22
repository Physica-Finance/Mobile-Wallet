import React from 'react';
import { StyledView, StyledText, StyledImage, StyledFlatList } from "../../constants/styledComponents"
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { themeColor } from '../../constants/themeColor';

const CardList = ({ item, setArrow = true }) => (
    <StyledView className="flex flex-row items-center justify-between h-auto px-5 py-3 my-2 rounded-lg" style={{ backgroundColor: themeColor.cardBackgroundColor }}>
        <StyledImage style={{ width: 48, height: 48 }} className='rounded-full' // Use style prop for Image dimensions
            source={{ uri: item.logoURI }}
        />
        <StyledView className='space-y-2 basis-1/2'>
            <StyledText className="text-lg font-semibold text-white">{item.name}</StyledText>
            <StyledText className="text-sm font-semibold text-gray-400">{item.symbol}</StyledText>
        </StyledView>
        <StyledText className="text-sm font-semibold text-right text-white whitespace-normal">
            {/* ${Math.pow(10, item.decimals)} */}
            {item.decimals}
        </StyledText>
        {setArrow ? <FontAwesome size={16} name="chevron-right" color={"gray"} /> : ""}
    </StyledView>
);

export function CoinList({ list, isArrow }) { // Correct prop name to 'data' instead of 'CardList'
    return (
        <StyledView className="flex flex-col flex-1 w-full h-auto overflow-scroll">
            <StyledFlatList
                data={list}
                renderItem={({ item }) => <CardList item={item} setArrow={isArrow} />}
                keyExtractor={item => item.id}
            />
        </StyledView>
    );
}
