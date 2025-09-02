import KakaoMap from "@/widgets/detail/KakaoMap";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MapFullScreen() {
  const params = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
  }>();
  const lat = Number(params.latitude);
  const lng = Number(params.longitude);
  const latitude = Number.isFinite(lat) ? lat : 37.5665;
  const longitude = Number.isFinite(lng) ? lng : 126.978;

  return (
    <View style={styles.container}>
      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        height={undefined}
        showExpandIcon={false}
      />
      {/* undefined이므로 flex:1로 전체 화면 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
