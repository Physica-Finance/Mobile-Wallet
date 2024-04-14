import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { Icon } from "react-native-paper";

const image = require("../../assets/icon.png");
import { themeColor } from "../../constants/themeColor";

export default function Page() {
  const handleImportFromSeed = () => {
    router.push("/import-seed");
  };
  
  const buttonBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View className="flex flex-row items-center w-full pb-10">
        <TouchableOpacity onPress={buttonBack}>
          <Icon source="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <View className="items-center flex-auto w-full pt-1 mr-8">
          <Text style={styles.text} className="text-lg font-bold text-center">
            Import Wallet
          </Text>
        </View>
      </View>
      <View className="items-center justify-center">
        <Animated.Image source={image} style={{ objectFit: "contain", width: 200, height: 200 }} />
        <Text style={styles.text} className="text-4xl font-bold">
          Physica Finance
        </Text>
      </View>
      <View className="items-center justify-center gap-4 mt-36">
        <Text style={styles.text} className="text-2xl font-bold">
          Jump start your crypto portfolio
        </Text>
        <Text style={styles.text} className="px-16 text-base text-center">
          Import an existing wallet or create a new one
        </Text>
      </View>
      <View className="items-center justify-center w-full gap-4 mt-20">
        <TouchableOpacity className="w-full" onPress={handleImportFromSeed}>
          <Text style={{ ...styles.buttonPrimaryBoarding }}>Import Using Seed Phrase</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-full">
          <Text style={{ ...styles.buttonOutlineBoarding }}>Import From Private Keys</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColor.appBackgroundColor,
    color: "white",
    fontFamily: "Inter_400Regular",
    paddingTop: 0,
    padding: 16,
  },
  text: {
    fontFamily: "Inter_400Regular",
    color: "white",
  },
  buttonPrimaryBoarding: {
    backgroundColor: themeColor.buttonPrimaryBackgroundColor,
    color: themeColor.textColor,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonOutlineBoarding: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: themeColor.buttonOutlineBackgroundColor,
    color: themeColor.textColor,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
