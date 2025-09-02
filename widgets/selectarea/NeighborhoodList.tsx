import { COLORS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckIcon } from './CheckIcon';

interface Neighborhood {
  id: string;
  name: string;
  isSelected: boolean;
}

interface NeighborhoodListProps {
  neighborhoods: Neighborhood[];
  onToggleNeighborhood: (id: string) => void;
}

export const NeighborhoodList: React.FC<NeighborhoodListProps> = ({
  neighborhoods,
  onToggleNeighborhood
}) => {
  return (
    <View style={styles.container}>
      {neighborhoods.map((neighborhood) => (
        <TouchableOpacity
          key={neighborhood.id}
          style={[
            styles.neighborhoodItem,
            neighborhood.isSelected ? styles.selectedItem : styles.unselectedItem
          ]}
          onPress={() => onToggleNeighborhood(neighborhood.id)}
        >
          <Text style={[
            styles.neighborhoodText,
            neighborhood.isSelected ? styles.selectedText : styles.unselectedText
          ]}>
            {neighborhood.name}
          </Text>
          <CheckIcon color={neighborhood.isSelected ? '#6287F2' : '#CBCBCB'} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  neighborhoodItem: {
    height: 40,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: COLORS.primary[10],
  },
  unselectedItem: {
    backgroundColor: COLORS.white,
  },
  neighborhoodText: {
    fontSize: 14,
    fontFamily: 'SUIT Variable',
    lineHeight: 21,
  },
  selectedText: {
    color: COLORS.primary[100],
    fontWeight: '700',
  },
  unselectedText: {
    color: COLORS.black,
    fontWeight: '400',
  },
});
