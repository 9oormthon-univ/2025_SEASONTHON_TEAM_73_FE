import api from '@/shared/api/axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import KakaoMap from './KakaoMap';

type MapSectionProps = {
  postId: number;
};

const MapSection: React.FC<MapSectionProps> = ({ postId }) => {
  const [marker, setMarker] = useState<any | null>(null);

  useEffect(() => {
    console.log(postId);
    const fetchDetailMap = async () => {
      try {
        const res = await api.get(`/map/posts/${postId}/detail`);
        if (res.data.success) {
          const data = res.data.data;
          setMarker({
            id: data.id,
            latitude: data.displayLatitude, // 정확 좌표 대신 display 좌표 사용
            longitude: data.displayLongitude,
            info: {
              image: "https://via.placeholder.com/100",
              price: data.title, // title을 price 자리 예시로
              description: data.exactAddress,
              etc: "",
              schedule: "",
            },
          });
        }
      } catch (error) {
        console.error("상세 지도 불러오기 실패:", error);
      }
    };

    fetchDetailMap();
  }, [postId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>집 위치</Text>
        <Text style={styles.disclaimer}>
          지도에 표기되는 위치는 정확한 위치가 아닙니다.
        </Text>
      </View>
      <View style={styles.mapContainer}>
        {marker && (
          <KakaoMap
            latitude={marker.latitude}
            longitude={marker.longitude}
            height={200}
            markers={[marker]}
            disableMarkerClick={true} // 상세보기 지도에서는 클릭 비활성화
            showExpandIcon={true}     // 확장 아이콘 표시
          />
        )}
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
  mapContainer: { height: 200, marginTop: 20 },
  header: { maxWidth: "100%" },
  title: { color: '#17171B', fontSize: 16, fontWeight: '700' },
  disclaimer: { color: '#717173', fontSize: 12, marginTop: 4 },
});

export default MapSection;
