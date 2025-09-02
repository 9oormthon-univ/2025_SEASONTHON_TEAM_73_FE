import Constants, { NativeConstants } from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type KakaoMapProps = {
  latitude: number;
  longitude: number;
};

export default function KakaoMap({ latitude, longitude }: KakaoMapProps) {
    const config = Constants as NativeConstants;
    const { KAKAO_MAP_JS_KEY } = config.expoConfig!.extra!;
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
            <style>
            body { margin: 0; padding: 0; height: 100%; }
            html { height: 100%; }
            #map { width: 100%; height: 100%; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
            window.onload = function() {
                console.log('Kakao Map API Loaded');
                if (typeof kakao !== 'undefined' && kakao.maps) {
                console.log('Kakao Maps is available');
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                    level: 3
                };
                const map = new kakao.maps.Map(mapContainer, mapOption);

                // 마커 추가 (선택 사항)
                const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
                const marker = new kakao.maps.Marker({
                    position: markerPosition
                });
                marker.setMap(map);
                } else {
                console.error('Kakao Maps is not available');
                }
            };
            </script>
        </body>
        </html>
    `;

  console.log(KAKAO_MAP_JS_KEY);

  return (
    <View style={styles.container}>
        <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={false}   // ← WebView 자체 스크롤 막기
            nestedScrollEnabled={true} // ← 상위 스크롤뷰와 충돌 방지
            onLoad={() => console.log('WebView loaded successfully')}
            onError={(e) => console.error('WebView error: ', e.nativeEvent)}
            injectedJavaScript={`(function() {
                window.console.log = function(message) {
                window.ReactNativeWebView.postMessage(message);
                }
            })();`}
            onMessage={(event) => console.log(event.nativeEvent.data)}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  webview: {
    flex: 1,
  },
});