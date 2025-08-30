import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface District {
  id: string;
  name: string;
  isSelected: boolean;
}

interface DistrictListProps {
  districts: District[];
  onSelectDistrict: (id: string) => void;
}

export const DistrictList: React.FC<DistrictListProps> = ({ districts, onSelectDistrict }) => {
  return (
    <View style={styles.container}>
      {districts.map((district) => (
        <TouchableOpacity
          key={district.id}
          style={[
            styles.districtItem,
            district.isSelected ? styles.selectedItem : styles.unselectedItem
          ]}
          onPress={() => onSelectDistrict(district.id)}
        >
          <Text style={[
            styles.districtText,
            district.isSelected ? styles.selectedText : styles.unselectedText
          ]}>
            {district.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: '#B3B3B4',
  },
  districtItem: {
    height: 40,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: '#EDF1FD',
  },
  unselectedItem: {
    backgroundColor: '#FCFCFC',
  },
  districtText: {
    fontSize: 14,
    fontFamily: 'SUIT Variable',
    lineHeight: 21,
  },
  selectedText: {
    color: '#6287F2',
    fontWeight: '700',
  },
  unselectedText: {
    color: '#17171B',
    fontWeight: '400',
  },
});
