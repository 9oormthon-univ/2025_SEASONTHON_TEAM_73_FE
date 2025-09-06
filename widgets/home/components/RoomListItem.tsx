import { Skeleton } from "@/shared/components";
import { GENDER } from "@/shared/constants";
import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Room } from "../types";

interface RoomListItemProps {
  room: Room;
}

export default function RoomListItem({ room }: RoomListItemProps) {
  return (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => router.push(`/detail/${room.id}`)}
    >
      <Image source={{ uri: room.imageUrl }} style={styles.roomImage} />
      <View style={styles.roomInfo}>
        <Text style={styles.roomTitle} numberOfLines={1} ellipsizeMode="tail">
          {room.title}
        </Text>
        <View style={styles.roomDetail}>
          <Ionicons
            name="home"
            style={styles.roomDetailIcon}
            size={14}
            color={COLORS.gray[70]}
          />
          <Text style={styles.roomDetailText}>
            {room.roomType} • {room.deposit} / {room.monthlyRent}
          </Text>
        </View>

        <View style={styles.roomDetail}>
          <Ionicons
            name="location"
            style={styles.roomDetailIcon}
            size={14}
            color={COLORS.gray[70]}
          />
          <Text style={styles.roomDetailText}>{room.region}</Text>
        </View>

        <View style={styles.roomDetail}>
          <Ionicons
            name="person"
            style={styles.roomDetailIcon}
            size={14}
            color={COLORS.gray[70]}
          />
          <Text style={styles.roomDetailText}>{`${
            GENDER[room.userGender]
          } 거주 중 · ${room.smoking}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function RoomSkeleton() {
  return (
    <View style={styles.roomCard}>
      <Skeleton style={styles.roomImage} />
      <View style={[styles.roomInfo, { gap: SPACING.xs }]}>
        <Skeleton style={styles.roomDetailText} />
        <View style={{ gap: 6, flexDirection: "row" }}>
          <Skeleton style={{ width: 24, marginLeft: 6 }} />
          <Skeleton style={{ width: 100 }} />
        </View>
        <View style={{ gap: 6, flexDirection: "row" }}>
          <Skeleton style={{ width: 24, marginLeft: 6 }} />
          <Skeleton style={{ width: 85 }} />
        </View>
        <View style={{ gap: 6, flexDirection: "row" }}>
          <Skeleton style={{ width: 24, marginLeft: 6 }} />
          <Skeleton style={{ width: 100 }} />
        </View>
      </View>
    </View>
  );
}

RoomListItem.Skeleton = RoomSkeleton;

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
