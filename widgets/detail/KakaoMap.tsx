import Constants, { NativeConstants } from "expo-constants";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

type MarkerType = {
  id: string | number;
  latitude: number;
  longitude: number;
  info: any;
};

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  height?: number;
  showExpandIcon?: boolean;
  disableMarkerClick?: boolean;
  markers?: MarkerType[];
  onMarkerClick?: (data: any) => void;
  resetSelectedMarker?: boolean;
};

export default function KakaoMap({
  latitude,
  longitude,
  height,
  showExpandIcon = true,
  disableMarkerClick = false,
  markers = [],
  onMarkerClick,
  resetSelectedMarker = false,
}: KakaoMapProps) {
  const config = Constants as NativeConstants;
  const { KAKAO_MAP_JS_KEY } = config.expoConfig!.extra!;
  const webRef = useRef<WebView>(null);

  // info 상태가 null일 때 마커 색상 초기화
  useEffect(() => {
    if (resetSelectedMarker) {
      webRef.current?.injectJavaScript(`
        if (window.resetMarker) {
          window.resetMarker();
        }
        true;
      `);
    }
  }, [resetSelectedMarker]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
    <style>
      body, html { margin:0; padding:0; height:100%; width:100%; touch-action:none; }
      #map { width:100%; height:100%; touch-action:none; }
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
      let map;
      let kakaoMarkers = [];
      let selectedMarker = null;

      function initMap() {
        const mapContainer = document.getElementById('map');
        map = new kakao.maps.Map(mapContainer, { center: new kakao.maps.LatLng(${latitude}, ${longitude}), level: 3 });

        const whiteIcon = new kakao.maps.MarkerImage(
          "https://api.builder.io/api/v1/image/assets/TEMP/5e6132a35f2c32e1b7d52b4a998f9f6dae48afc0?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
          new kakao.maps.Size(36,36)
        );
        const blueIcon = new kakao.maps.MarkerImage(
          "https://api.builder.io/api/v1/image/assets/TEMP/f5b4673581cf7cf2b93b1b57c2dcdbf1fdf37fed?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
          new kakao.maps.Size(36,36)
        );

        const markerData = ${JSON.stringify(markers.length > 0 ? markers : [{ id: 1, latitude, longitude, info: {} }])};

        markerData.forEach(item => {
          const position = new kakao.maps.LatLng(item.latitude, item.longitude);
          const marker = new kakao.maps.Marker({ position, image: whiteIcon, map: map });
          marker.itemInfo = item.info;

          if (${disableMarkerClick ? "true" : "false"} === false) {
            kakao.maps.event.addListener(marker, 'click', function() {
              if (selectedMarker) selectedMarker.setImage(whiteIcon);
              marker.setImage(blueIcon);
              selectedMarker = marker;
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerClick', data: item.info }));
            });
          }

          kakaoMarkers.push(marker);
        });

        // 초기 마커 중앙 고정
        if (kakaoMarkers.length > 0) {
          map.setCenter(kakaoMarkers[0].getPosition());
        }

        window.resetMarker = function() {
          if (selectedMarker) selectedMarker.setImage(whiteIcon);
          selectedMarker = null;
          // if (kakaoMarkers.length > 0) {
          //   map.setCenter(kakaoMarkers[0].getPosition());
          // }
        };
      }

      window.onload = function() {
        initMap();

        ${showExpandIcon ? `
        const icon = document.getElementById('expandIcon');
        icon.addEventListener('click', function() {
          window.ReactNativeWebView.postMessage('expand');
        });` : ''}

        window.addEventListener('resize', function() {
          if (kakaoMarkers.length > 0) {
            map.setCenter(kakaoMarkers[0].getPosition());
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
        ref={webRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        nestedScrollEnabled={true}
        onMessage={(event) => {
          const data = event.nativeEvent.data;
          try {
            const msg = JSON.parse(data);
            if (msg.type === 'markerClick') {
              onMarkerClick?.(msg.data);
              return;
            }
          } catch {
            if (data === 'expand') {
              const target = markers[0];
              router.push(`/map?latitude=${target.latitude}&longitude=${target.longitude}`);
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
