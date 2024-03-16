import { Stack, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AppLayout() {
  return (
    <Tabs className="bg-blue-950" screenOptions={{ headerShown: false }}>
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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="pie-chart" color={color} />,
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
