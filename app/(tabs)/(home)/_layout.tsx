import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { UserFilterProvider } from "@/widgets/home/contexts/filterUserDefault";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeLayout() {
  return (
    <FilterDefaultProvider>
      <UserFilterProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            header: (props) => (
              <View
                style={{
                  paddingHorizontal: SPACING.normal,
                  paddingVertical: SPACING.sm,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SPACING.sm,
                }}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={20} />
                </TouchableOpacity>
                <Text
                  style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 }}
                >
                  {props.options.title || (props.options.headerTitle as string)}
                </Text>
              </View>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: FONTS.bold,
              fontSize: FONT_SIZE.b1,
            },
            contentStyle: { backgroundColor: COLORS.white },
          }}
        >
          <Stack.Screen name="index" options={{ headerTitle: "홈" }} />
          <Stack.Screen
            name="region"
            options={{ headerShown: true, headerTitle: "지역 필터" }}
          />
          <Stack.Screen
            name="filter"
            options={{ headerShown: true, headerTitle: "필터" }}
          />
          <Stack.Screen name="post-create" />
          <Stack.Screen
            name="users"
            options={{ headerShown: true, title: "내가 찜한 사용자" }}
          />
          <Stack.Screen name="user-search" options={{ headerShown: false }} />
          <Stack.Screen
            name="rooms"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </UserFilterProvider>
    </FilterDefaultProvider>
  );
}
