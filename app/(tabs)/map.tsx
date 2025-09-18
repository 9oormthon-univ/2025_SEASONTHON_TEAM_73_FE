import api from "@/shared/api/axios";
import { COLORS, FONT_SIZE } from "@/shared/styles";
import { KakaoMap } from "@/widgets/detail";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function MapFullScreen() {
  const params = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
  }>();
  const lat = Number(params.latitude);
  const lng = Number(params.longitude);
  const latitude = Number.isFinite(lat) ? lat : 37.5665;
  const longitude = Number.isFinite(lng) ? lng : 126.978;

  const [info, setInfo] = useState<any | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const getMapInfo = async () => {
      try {
        const res = await api.get("/map/posts");
        if (res.data.success) {
          const posts = res.data.data;
          const markers = posts.map((post: any) => ({
            id: post.id,
            latitude: post.displayLatitude,
            longitude: post.displayLongitude,
            info: {
              image: post.imageUrl,
              price: post.title,
              description: post.title,
              etc: "",
              schedule: "",
            },
          }));
          setMarkers(markers);
        }
      } catch (error) {
        console.error("지도 데이터 불러오기 실패:", error);
      }
    };
    getMapInfo();
  }, []);

  const handleMarkerClick = async (marker: { id: number }) => {
    try {
      const res = await api.get(`/map/posts/${marker.id}`);
      if (res.data.success) {
        const detail = res.data.data;
        if (!detail) return;
        setInfo({
          id: detail.id,
          image: detail.imageUrl,
          price: `${detail.deposit}/${detail.monthlyRent}`,
          description: `${detail.region} 부근・${detail.roomType}, 화장실 ${detail.washroomCount}개`,
          etc: `${detail.userGender}성 거주 중・${detail.smoking}`,
          schedule: `${detail.workDays} 출근, ${detail.goWorkTime}`,
        });
      }
    } catch (error) {
      console.error("상세 데이터 불러오기 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        markers={markers}
        onMarkerClick={handleMarkerClick}
        resetSelectedMarker={info === null}
        showExpandIcon={false}
      />

      {info && (
        <Pressable style={styles.overlay} onPress={() => setInfo(null)}>
          <Pressable
            style={styles.infoBox}
            onPress={() => router.push(`/post/${info.id}`)}
          >
            <Image source={{ uri: info.image }} style={styles.image} />
            <View style={styles.textBox}>
              <Text style={styles.price}>{info.price}</Text>
              <Text style={styles.desc}>{info.description}</Text>
              <Text style={styles.etc}>{info.etc}</Text>
              <Text style={styles.schedule}>{info.schedule}</Text>
            </View>
          </Pressable>

          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              실제 위치와 200m정도 차이가 날 수 있습니다.
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  infoWrapper: {
    position: "absolute",
    bottom: 40,
    left: 18,
    right: 18,
  },
  infoBox: {
    flexDirection: "row",
    top: 520,
    padding: 10,
    margin: 18,
    gap: 20,
    borderWidth: 1,
    borderColor: COLORS.gray[5],
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    aspectRatio: 1,
    paddingRight: 10,
  },
  textBox: {
    flex: 1,
    flexShrink: 1,
  },
  price: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.b1,
    marginTop: 4,
    marginBottom: 8,
  },
  desc: {
    color: COLORS.black,
    fontSize: FONT_SIZE.c1,
    marginBottom: 4,
  },
  etc: {
    color: COLORS.black,
    fontSize: FONT_SIZE.c1,
    marginBottom: 4,
  },
  schedule: {
    color: COLORS.black,
    fontSize: FONT_SIZE.c1,
  },
  noticeBox: {
    top: 520,
    padding: 6,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  noticeText: {
    fontSize: FONT_SIZE.c1,
    color: "red",
    opacity: 0.7,
  },
});
