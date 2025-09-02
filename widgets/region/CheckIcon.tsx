import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CheckIconProps {
  color?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({ color = '#6287F2' }) => {
  return (
    <View>
      <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
        <Path
          d="M5.7 14.025L0 8.325L1.425 6.9L5.7 11.175L14.875 2L16.3 3.425L5.7 14.025Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};
