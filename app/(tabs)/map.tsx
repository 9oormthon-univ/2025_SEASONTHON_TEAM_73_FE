
import KakaoMap from '@/widgets/detail/KakaoMap';
import { useSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MapFullScreen() {
  const params = useSearchParams();
  const latitude = parseFloat(params.get('latitude') || '37.5665');
  const longitude = parseFloat(params.get('longitude') || '126.9780');

  return (
    <View style={styles.container}>
      <KakaoMap latitude={latitude} longitude={longitude} height={undefined} showExpandIcon={false} />
      {/* undefined이므로 flex:1로 전체 화면 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
