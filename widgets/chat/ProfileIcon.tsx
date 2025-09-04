import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Mask, Path, Rect } from 'react-native-svg';

interface ProfileIconProps {
  size?: number;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ size = 48 }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg
        width={size}
        height={size + 1}
        viewBox={`0 0 ${size} ${size + 1}`}
        fill="none"
      >
        <Rect
          y="0.5"
          width={size}
          height={size}
          rx={size / 2}
          fill="#F2F2F2"
        />
        <Mask
          id="mask0"
          maskType="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={size}
          height={size + 1}
        >
          <Circle
            cx={size / 2}
            cy={size / 2 + 0.5}
            r={size / 2}
            fill="#D9D9D9"
          />
        </Mask>
        <G mask="url(#mask0)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.381 20.6903C16.381 18.6696 17.1837 16.7317 18.6126 15.3029C20.0414 13.874 21.9793 13.0713 24 13.0713C26.0207 13.0713 27.9587 13.874 29.3875 15.3029C30.8164 16.7317 31.6191 18.6696 31.6191 20.6903C31.6191 22.711 30.8164 24.649 29.3875 26.0778C27.9587 27.5067 26.0207 28.3094 24 28.3094C21.9793 28.3094 20.0414 27.5067 18.6126 26.0778C17.1837 24.649 16.381 22.711 16.381 20.6903ZM16.381 32.1189C13.8551 32.1189 11.4327 33.1223 9.64664 34.9084C7.86058 36.6944 6.85718 39.1168 6.85718 41.6427C6.85718 43.1582 7.45922 44.6117 8.53085 45.6833C9.60249 46.755 11.0559 47.357 12.5715 47.357H35.4286C36.9441 47.357 38.3976 46.755 39.4692 45.6833C40.5409 44.6117 41.1429 43.1582 41.1429 41.6427C41.1429 39.1168 40.1395 36.6944 38.3534 34.9084C36.5674 33.1223 34.145 32.1189 31.6191 32.1189H16.381Z"
            fill="#CBCBCB"
          />
        </G>
        <Circle
          cx={size / 2}
          cy={size / 2 + 0.5}
          r={size / 2 - 0.6667}
          stroke="#CBCBCB"
          strokeWidth="1.33333"
        />
      </Svg>
    </View>
  );
};
