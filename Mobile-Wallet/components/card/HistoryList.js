import React from 'react';
import { StyledView, StyledText, StyledTouchableOpacity, StyledFlatList } from "../../constants/styledComponents"
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { themeColor } from '../../constants/themeColor';

const CardList = ({ item, onPress, onRemove }) => (
    <StyledTouchableOpacity className='my-2 ' style={{ backgroundColor: themeColor.cardBackgroundColor }}>
        <StyledView className="flex flex-row h-16 justify-between py-3 px-5 items-center rounded-lg ">
            <FontAwesome size={20} name="bandcamp" color={"white"} />
            <StyledTouchableOpacity onPress={onPress}>
                <StyledText className="font-medium text-sm text-white basis-1/2">{item.url}</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className='border border-white py-2 px-3 rounded-md' onPress={onRemove}>
                <FontAwesome size={20} name="close" color={"white"} />
            </StyledTouchableOpacity>
        </StyledView>
    </StyledTouchableOpacity>
);

export function HistoryList({ list, onPress, onRemove }) {
    return (
        <StyledView className="flex flex-1 flex-col h-auto w-full overflow-scroll">
            <StyledFlatList
                data={list}
                renderItem={({ item }) => <CardList item={item} onPress={() => onPress(item)} onRemove={() => onRemove(item)} />}
                keyExtractor={item => item.id}
            />
        </StyledView>
    );
}
