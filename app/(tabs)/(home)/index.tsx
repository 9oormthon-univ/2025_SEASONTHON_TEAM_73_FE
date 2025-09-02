import { Button } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { RoomListItem, RoomSearchFilter } from "@/widgets/home/components";
import { ROOM_LIST } from "@/widgets/home/mock/room";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const onCreatePress = () => {
    router.push("/post-create");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <RoomSearchFilter />
      <ScrollView style={styles.roomList}>
        {ROOM_LIST.map((room) => (
          <RoomListItem key={room.id} room={room} />
        ))}
      </ScrollView>

      {/* 요거는 임시로 만들어둔 글 작성하기 화면 버튼이에용! */}
      <Button
        text="글 작성하기"
        size="md"
        variant="primary"
        onPress={onCreatePress}
        style={styles.createButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  roomList: {
    flex: 1,
  },
  createButton: {
    position: "absolute",
    right: SPACING.normal,
    bottom: SPACING.md,
    zIndex: 1000,
  },
});
