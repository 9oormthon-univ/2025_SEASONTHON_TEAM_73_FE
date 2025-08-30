import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const BackIcon: React.FC = () => {
  return (
    <View>
      <Svg width="9" height="14" viewBox="0 0 9 14" fill="none">
        <Path d="M8 1L2 7L8 13" stroke="#17171B" strokeWidth="2" />
      </Svg>
    </View>
  );
};
