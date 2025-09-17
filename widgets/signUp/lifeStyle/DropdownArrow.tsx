import { COLORS } from '@/shared/styles';
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface DropdownArrowProps {
  direction?: 'up' | 'down';
}

export const DropdownArrow: React.FC<DropdownArrowProps> = ({ direction = 'down' }) => {
  const rotation = direction === 'up' ? 0 : -180;

  return (
    <View style={{ transform: [{ rotate: `${rotation}deg` }] }}>
      <Svg width="12" height="12" viewBox="0 0 14 9" fill="none">
        <Path
          d="M1 1L7 7L13 1"
          stroke={COLORS.gray[40]}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};
