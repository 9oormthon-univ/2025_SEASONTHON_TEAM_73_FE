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

  return (
    <View style={styles.container}>
      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        height={undefined}
        showExpandIcon={false}
        onMarkerClick={(data) => {
          console.log("marker data:", data);
          setInfo(data);
        }}
      />

      {info && (
        <Pressable
          style={styles.overlay}
          onPress={() => setInfo(null)}
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
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    //backgroundColor: "rgba(0,0,0,0.2)", // 살짝 어둡게 효과 (필요없으면 제거)
    justifyContent: "flex-end",
  },
  infoBox: {
    flexDirection: "row",
    padding: 10,
    margin: 18,
    gap: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 8
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    aspectRatio: 1,
    paddingRight: 10
  },
  textBox: { 
    flex: 1,
    flexShrink: 1
  },
  price: { 
    fontWeight: "bold", 
    fontSize: FONT_SIZE.b1, 
    marginBottom: 4
  },
  desc: { 
    color: COLORS.black, 
    fontSize: FONT_SIZE.c1, 
    marginBottom: 4 
  },
  etc: { 
    color: COLORS.black, 
    fontSize: FONT_SIZE.c1, 
    marginBottom: 4 
  },
  schedule: { 
    color: COLORS.black, 
    fontSize: FONT_SIZE.c1 
  }
});
