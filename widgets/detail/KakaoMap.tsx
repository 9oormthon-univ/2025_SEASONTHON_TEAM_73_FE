import Constants, { NativeConstants } from 'expo-constants';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  height?: number;
  showExpandIcon?: boolean;
  disableMarkerClick?: boolean; // 🔥 추가
  onMarkerClick?: (data: any) => void; // 🔥 추가
};

export default function KakaoMap({
  latitude,
  longitude,
  height,
  showExpandIcon = true,
  disableMarkerClick = false,
  onMarkerClick,
}: KakaoMapProps) {
  const config = Constants as NativeConstants;
  const { KAKAO_MAP_JS_KEY } = config.expoConfig!.extra!;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
      <style>
        body, html { margin:0; padding:0; height:100%; width:100%; }
        #map { width:100%; height:100%; }
        ${showExpandIcon ? `
        #expandIcon {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          z-index: 1000;
          cursor: pointer;
        }` : ''}
      </style>
    </head>
    <body>
      <div id="map"></div>
      ${showExpandIcon ? `<img id="expandIcon" src="https://api.builder.io/api/v1/image/assets/TEMP/eefd1a42aa23ad80d6f3b2a985346280e684d9da?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" />` : ''}
      <script>
        let map, marker;
        function initMap() {
          const mapContainer = document.getElementById('map');
          const mapOption = {
            center: new kakao.maps.LatLng(${latitude}, ${longitude}),
            level: 3
          };
          map = new kakao.maps.Map(mapContainer, mapOption);

          marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(${latitude}, ${longitude})
          });
          marker.setMap(map);

          // 🔥 disableMarkerClick이 false일 때만 이벤트 등록
          if (${disableMarkerClick ? "true" : "false"} === false) {
            kakao.maps.event.addListener(marker, 'click', function() {
              const info = {
                image: "https://api.builder.io/api/v1/image/assets/TEMP/d3791812144ab91c14d2d0514fedca7c4dec99b1?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
                price: "500/40",
                description: "마포구 동교동 부근・투룸, 화장실 1개",
                etc: "여성・전자담배",
                schedule: "월 화 수 목 금 출근, 오전 8시"
              };
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerClick', data: info }));
            });
          }
        }

        window.onload = function() {
          initMap();

          ${showExpandIcon ? `
          const icon = document.getElementById('expandIcon');
          icon.addEventListener('click', function() {
            window.ReactNativeWebView.postMessage('expand');
          });` : ''}

          window.addEventListener('resize', function() {
            if(map && marker) {
              map.setCenter(marker.getPosition());
            }
          });
        };
      </script>
    </body>
    </html>
  `;

  return (
    <View style={[styles.container, height ? { height } : { height: '100%' }]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        nestedScrollEnabled={true}
        renderToHardwareTextureAndroid={true}
        onMessage={(event) => {
          const data = event.nativeEvent.data;
          try {
            const msg = JSON.parse(data);
            if (msg.type === "markerClick") {
              onMarkerClick?.(msg.data);
              return;
            }
          } catch (e) {
            // JSON.parse 실패했을 때는 그냥 문자열로 처리
            if (data === "expand") {
              router.push({
                pathname: "/map",
                params: { latitude: latitude.toString(), longitude: longitude.toString() },
              });
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
