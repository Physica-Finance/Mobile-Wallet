import React from 'react';
import { StyledView, StyledText, StyledImage, StyledFlatList } from "../../constants/styledComponents"
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CardList = ({ item, setArrow = true }) => (
    <StyledView className="flex flex-row h-auto justify-between py-3 px-5 my-2 items-center rounded-lg bg-blue-900">
        <StyledImage style={{ width: 48, height: 48 }} // Use style prop for Image dimensions
            source={{ uri: item.img }}
        />
        <StyledView className='space-y-2 basis-1/2'>
            <StyledText className="font-semibold text-lg text-white">{item.coin}</StyledText>
            <StyledText className="font-semibold text-sm text-gray-400">{item.ticker}</StyledText>
        </StyledView>
        <StyledText className="font-semibold text-lg text-right text-white">{item.price}</StyledText>
        {setArrow ? <FontAwesome size={16} name="chevron-right" color={"gray"} /> : ""}
    </StyledView>
);

export function CoinList({ list, isArrow }) { // Correct prop name to 'data' instead of 'CardList'
    return (
        <StyledView className="flex flex-1 flex-col h-auto w-full overflow-scroll">
            <StyledFlatList
                data={list}
                renderItem={({ item }) => <CardList item={item} setArrow={isArrow} />}
                keyExtractor={item => item.id}
            />
        </StyledView>
    );
}
