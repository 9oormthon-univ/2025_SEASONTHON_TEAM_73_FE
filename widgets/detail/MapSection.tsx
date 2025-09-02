import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import KakaoMap from './KakaoMap';

const MapSection: React.FC = () => {
    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>집 위치</Text>
            <Text style={styles.disclaimer}>지도에 표기되는 위치는 정확한 위치가 아닙니다.</Text>
        </View>

        <View style={styles.mapContainer}>
            <KakaoMap latitude={33.450701} longitude={126.570667} height={200} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: '#F2F2F2',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  mapContainer: {
    height: 200,
    marginTop: 20,
  },
  header: {
    maxWidth: "100%",
  },
  title: {
    color: '#17171B',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
  disclaimer: {
    color: '#717173',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    marginTop: 4,
  }
});

export default MapSection;
