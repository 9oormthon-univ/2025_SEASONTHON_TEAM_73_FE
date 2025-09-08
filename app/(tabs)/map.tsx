import api from "@/shared/api/axios";
import { COLORS, FONT_SIZE } from "@/shared/styles";
import KakaoMap from "@/widgets/detail/KakaoMap";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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
              image: post.imageUrl, // 나중에 실제 이미지로 교체
              price: post.title, // 임시: title을 price 자리에 표시
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
      //console.log(res.data);
      if (res.data.success) {
        const detail = res.data.data;
        if (!detail) return;
        setInfo({
          id: detail.id,
          image: detail.imageUrl, // TODO: 실제 이미지 필드 있으면 교체
          price: `${detail.deposit}/${detail.monthlyRent}`, // 보증금/월세
          description: `${detail.region} 부근・${detail.roomType}, 화장실 ${detail.washroomCount}개`,
          etc: `${detail.userGender}성 거주 중・${detail.smoking}`,
          schedule: `${detail.workDays} 출근, ${detail.goWorkTime}`,
        });
      }
    } catch (error) {
      console.error("상세 데이터 불러오기 실패:", error);
    }
  };

  // const markers = [
  //   { id: 0, latitude: latitude, longitude: longitude, info: { image: "https://via.placeholder.com/100", price: "450/35", description: "카카오", etc: "남여 상관없음", schedule: "상시" } },
  //   { id: 1, latitude: 37.5665, longitude: 126.9780, info: { image: "https://via.placeholder.com/100", price: "500/40", description: "마포구 동교동・투룸, 화장실 1개", etc: "여성・전자담배", schedule: "월~금 오전 8시" } },
  //   { id: 2, latitude: 37.5651, longitude: 126.9895, info: { image: "https://via.placeholder.com/100", price: "400/30", description: "종로구 청진동・원룸", etc: "남성・비흡연", schedule: "주말만" } },
  //   { id: 3, latitude: 37.5670, longitude: 126.9820, info: { image: "https://via.placeholder.com/100", price: "450/35", description: "신촌・투룸", etc: "남여 상관없음", schedule: "상시" } },
  // ];

  return (
    <View style={styles.container}>
      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        markers={markers}
        onMarkerClick={(data) => handleMarkerClick(data)}
        resetSelectedMarker={info === null} // info가 null이면 마커 흰색으로
        showExpandIcon={false}
      />

      {info && (
        <Pressable
          style={styles.overlay}
          onPress={() => setInfo(null)} // overlay 클릭 시 info null
        >
          <Pressable
            style={styles.infoBox}
            onPress={() => {
              router.push(`/(tabs)/(home)/detail/${info.id}`);
            }}
          >
            <Image source={{ uri: info.image }} style={styles.image} />
            <View style={styles.textBox}>
              <Text style={styles.price}>{info.price}</Text>
              <Text style={styles.desc}>{info.description}</Text>
              <Text style={styles.etc}>{info.etc}</Text>
              <Text style={styles.schedule}>{info.schedule}</Text>
            </View>
          </Pressable>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 80, backgroundColor: COLORS.white },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  infoBox: {
    flexDirection: "row",
    top: 580,
    padding: 10,
    margin: 18,
    gap: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    aspectRatio: 1,
    paddingRight: 10,
  },
  textBox: { flex: 1, flexShrink: 1 },
  price: { fontWeight: "bold", fontSize: FONT_SIZE.b1, marginBottom: 4 },
  desc: { color: COLORS.black, fontSize: FONT_SIZE.c1, marginBottom: 4 },
  etc: { color: COLORS.black, fontSize: FONT_SIZE.c1, marginBottom: 4 },
  schedule: { color: COLORS.black, fontSize: FONT_SIZE.c1 },
});
