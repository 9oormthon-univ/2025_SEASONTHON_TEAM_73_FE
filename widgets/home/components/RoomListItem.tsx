import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RoomListItemProps {
  room: {
    id: number;
    title: string;
    type: string;
    deposit: string;
    rent: string;
    location: string;
    gender: string;
    image: ImageSourcePropType;
  };
}

export default function RoomListItem({ room }: RoomListItemProps) {
  return (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => router.push(`/detail/${room.id}`)}
    >
      <Image source={room.image} style={styles.roomImage} />
      <View style={styles.roomInfo}>
        <Text style={styles.roomTitle}>{room.title}</Text>

        <View style={styles.roomDetail}>
          <Ionicons
            name="home"
            style={styles.roomDetailIcon}
            size={14}
            color={COLORS.gray[70]}
          />
          <Text style={styles.roomDetailText}>
            {room.type} • {room.deposit} / {room.rent}
          </Text>
        </View>

        <View style={styles.roomDetail}>
          <Ionicons
            name="location"
            style={styles.roomDetailIcon}
            size={14}
            color={COLORS.gray[70]}
          />
          <Text style={styles.roomDetailText}>{room.location}</Text>
        </View>

        <View style={styles.roomDetail}>
          <Ionicons
            name="person"
            style={styles.roomDetailIcon}
            size={14}
            color={COLORS.gray[70]}
          />
          <Text style={styles.roomDetailText}>{room.gender}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roomCard: {
    height: 128,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    padding: SPACING.normal,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  roomImage: {
    width: 90,
    height: 90,
    backgroundColor: COLORS.gray[10],
    borderRadius: RADIUS.sm,
  },
  roomInfo: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: "space-between",
  },
  roomTitle: {
    fontSize: FONT_SIZE.b1,
    fontFamily: FONTS.bold,
    marginBottom: SPACING.xs,
  },
  roomDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  roomDetailIcon: {
    padding: 3,
  },
  roomDetailText: {
    fontSize: FONT_SIZE.c1,
    marginLeft: 6,
    fontFamily: FONTS.regular,
    includeFontPadding: false,
  },
});
