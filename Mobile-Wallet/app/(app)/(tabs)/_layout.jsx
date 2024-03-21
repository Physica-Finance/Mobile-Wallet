import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet } from "react-native";
NavigationBar.setBackgroundColorAsync(themeColor.appBackgroundColor);
import { themeColor } from "../../../constants/themeColor";

export default function AppLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarStyle: {
        backgroundColor: themeColor.appBackgroundColor,
        shadowOpacity: .5,
        shadowColor: themeColor.appBackgroundColor
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="portofolio"
        options={{
          title: "Portofolio",
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="pie-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="bandcamp" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comments" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
    color: "white",
    fontFamily: "Inter_400Regular",
  },
});
