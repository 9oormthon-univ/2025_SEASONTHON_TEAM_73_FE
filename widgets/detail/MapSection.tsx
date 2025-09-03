import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import KakaoMap from './KakaoMap';

const MapSection: React.FC = () => {
  const marker = {
    id: 13,
    latitude: 37.5667,
    longitude: 126.9792,
    info: { image: "https://via.placeholder.com/100", price: "500/40", description: "마포구 동교동・투룸, 화장실 1개", etc: "여성・전자담배", schedule: "월~금 오전 8시" }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>집 위치</Text>
        <Text style={styles.disclaimer}>지도에 표기되는 위치는 정확한 위치가 아닙니다.</Text>
      </View>
      <View style={styles.mapContainer}>
        <KakaoMap
          latitude={marker.latitude}
          longitude={marker.longitude}
          height={200}
          markers={[marker]}
          disableMarkerClick={true}
          showExpandIcon={true}   // 확장 아이콘 표시
          onMarkerClick={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderBottomWidth: 3, borderBottomColor: '#F2F2F2', paddingHorizontal: 18, paddingVertical: 20 },
  mapContainer: { height: 200, marginTop: 20 },
  header: { maxWidth: "100%" },
  title: { color: '#17171B', fontSize: 16, fontWeight: '700' },
  disclaimer: { color: '#717173', fontSize: 12, marginTop: 4 },
});

export default MapSection;
