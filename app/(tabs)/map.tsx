import { COLORS, FONT_SIZE } from '@/shared/styles';
import KakaoMap from '@/widgets/detail/KakaoMap';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function MapFullScreen() {
  const params = useLocalSearchParams<{ latitude?: string; longitude?: string }>();
  const lat = Number(params.latitude);
  const lng = Number(params.longitude);
  const latitude = Number.isFinite(lat) ? lat : 37.5665;
  const longitude = Number.isFinite(lng) ? lng : 126.9780;

  const [info, setInfo] = useState<any | null>(null);

  const markers = [
    { id: 0, latitude: latitude, longitude: longitude, info: { image: "https://via.placeholder.com/100", price: "450/35", description: "카카오", etc: "남여 상관없음", schedule: "상시" } },
    { id: 1, latitude: 37.5665, longitude: 126.9780, info: { image: "https://via.placeholder.com/100", price: "500/40", description: "마포구 동교동・투룸, 화장실 1개", etc: "여성・전자담배", schedule: "월~금 오전 8시" } },
    { id: 2, latitude: 37.5651, longitude: 126.9895, info: { image: "https://via.placeholder.com/100", price: "400/30", description: "종로구 청진동・원룸", etc: "남성・비흡연", schedule: "주말만" } },
    { id: 3, latitude: 37.5670, longitude: 126.9820, info: { image: "https://via.placeholder.com/100", price: "450/35", description: "신촌・투룸", etc: "남여 상관없음", schedule: "상시" } },
  ];

  return (
    <View style={styles.container}>
      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        markers={markers}
        onMarkerClick={(data) => setInfo(data)}
        resetSelectedMarker={info === null} // info가 null이면 마커 흰색으로
      />

      {info && (
        <Pressable
          style={styles.overlay}
          onPress={() => setInfo(null)} // overlay 클릭 시 info null
        >
          <Pressable style={styles.infoBox} onPress={(e) => e.stopPropagation()}>
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
  container: { flex: 1 },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "flex-end" },
  infoBox: { flexDirection: "row", padding: 10, margin: 18, gap: 20, borderTopWidth: 1, borderColor: "#ddd", backgroundColor: "#fff", borderRadius: 8 },
  image: { width: 90, height: 90, borderRadius: 8, aspectRatio: 1, paddingRight: 10 },
  textBox: { flex: 1, flexShrink: 1 },
  price: { fontWeight: "bold", fontSize: FONT_SIZE.b1, marginBottom: 4 },
  desc: { color: COLORS.black, fontSize: FONT_SIZE.c1, marginBottom: 4 },
  etc: { color: COLORS.black, fontSize: FONT_SIZE.c1, marginBottom: 4 },
  schedule: { color: COLORS.black, fontSize: FONT_SIZE.c1 },
});
