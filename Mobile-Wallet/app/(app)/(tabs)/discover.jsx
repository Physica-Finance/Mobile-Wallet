import React from 'react';
import { themeColor } from '../../../constants/themeColor';
import { StyledTextInput, StyledView } from "../../../constants/styledComponents"
import { CardVisit } from '../../../components/card/CardVisit';
import { Heading } from '../../../components/typography/Heading';
import { HistoryList } from '../../../components/card/HistoryList';
import { history } from '../../../constants/history';

export default function Tab() {
  const countBrowserTab = 2;
  const anyHistories = history.length > 0;

  const handlePressHistory = (item) => {
    console.log("Pressed History:", item);
    // Perform any action you want when a history item is pressed
  };

  const handleRemoveHistory = (item) => {
    console.log("Removed History:", item);
    // Perform any action you want when a history item is removed
  };
  return (
    <StyledView className="container min-h-screen justify-start items-start px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
      <Heading
        title={`Discover Apps`}
        fontSize="4xl"
        setBorder={true}
        setButton={true}
        onPress={() => console.log("Button Discover pressed")}
        buttonText={`${countBrowserTab}`} />

      <StyledTextInput className="bg-white text-gray-500 font-semibold w-full rounded-lg py-5 px-3" placeholderTextColor="gray" placeholder={`Type URL`} />

      <CardVisit title={`Visit Our dApps`} onPress={() => console.log("Button Visit")} />

      <Heading title={`Histories`}
        fontSize="xl"
        setBorder={false}
        setButton={anyHistories ? true : false}
        onPress={anyHistories ? () => console.log("Button Clear pressed") : ""}
        buttonText={anyHistories ? 'Clear' : ""} />
      {anyHistories ?
        <HistoryList list={history} onPress={handlePressHistory} onRemove={handleRemoveHistory} />
         : ""
      }
    </StyledView>
  );
}
