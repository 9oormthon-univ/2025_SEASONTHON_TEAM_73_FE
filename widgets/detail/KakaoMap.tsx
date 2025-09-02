import Constants, { NativeConstants } from 'expo-constants';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  height?: number;
  showExpandIcon?: boolean; // 추가
};

export default function KakaoMap({ latitude, longitude, height, showExpandIcon = true }: KakaoMapProps) {
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
        }

        window.onload = function() {
          initMap();

          ${showExpandIcon ? `
          const icon = document.getElementById('expandIcon');
          icon.addEventListener('click', function() {
            window.ReactNativeWebView.postMessage('expand');
          });` : ''}

          // 리사이즈 시에도 마커 중심으로
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
    <View style={[styles.container, height ? { height } : { height: "100%" }]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        nestedScrollEnabled={true}
        renderToHardwareTextureAndroid={true}
        onMessage={(event) => {
          if (event.nativeEvent.data === 'expand') {
            router.push({
              pathname: "/map",
              params: { latitude: latitude.toString(), longitude: longitude.toString() },
            });
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

