import { COLORS, FONT_SIZE } from '@/shared/styles';
import React, { useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DropdownArrow } from './DropdownArrow';

interface TimePickerProps {
  label: string;
  time?: string;
  onTimeChange: (time: string) => void;
  showExpanded?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({ label, time, onTimeChange, showExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(showExpanded);
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [isHighlighted, setIsHighlighted] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleToggleExpanded = () => setIsExpanded(!isExpanded);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>, type: 'hour' | 'minute') => {
    const index = Math.round(event.nativeEvent.contentOffset.y / 40); // item height
    if (type === 'hour') setSelectedHour(hours[index]);
    else setSelectedMinute(minutes[index]);
  };

  const handleConfirm = () => {
    const newTime = `${selectedHour}:${selectedMinute}`;
    onTimeChange(newTime);
    setIsExpanded(false);
    setIsHighlighted(true);
  };

  const renderItem = ({ item, selected }: { item: string; selected: boolean }) => (
    <View style={[styles.itemContainer, selected && styles.selectedItem]}>
      <Text style={[styles.itemText, selected && styles.selectedItemText]}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 상단 */}
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.timeContainer} onPress={handleToggleExpanded}>
          <Text
            style={[
              styles.timeText,
              isHighlighted ? styles.selectedItemText : styles.timeText
            ]}
          >
            {time}
          </Text>
          <DropdownArrow direction={isExpanded ? 'up' : 'down'} />
        </TouchableOpacity>
      </View>

      {/* 펼쳤을 때 */}
      {isExpanded && (
        <View style={styles.expandedContainer}>
          <View style={styles.timeSelectors}>
            {/* Hour List */}
            <FlatList
              data={hours}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              snapToInterval={40}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => onScrollEnd(e, 'hour')}
              getItemLayout={(_, index) => ({ length: 40, offset: 40 * index, index })}
              extraData={selectedHour} // ← 추가
              renderItem={({ item }) => renderItem({ item, selected: item === selectedHour })}
            />

            {/* Minute List */}
            <FlatList
              data={minutes}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              snapToInterval={40}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => onScrollEnd(e, 'minute')}
              getItemLayout={(_, index) => ({ length: 40, offset: 40 * index, index })}
              extraData={selectedMinute} // ← 추가
              renderItem={({ item }) => renderItem({ item, selected: item === selectedMinute })}
            />

          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>확인</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[5],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: FONT_SIZE.b2,
    color: COLORS.black,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeText: {
    fontSize: FONT_SIZE.b1,
    fontWeight: '700',
  },
  expandedContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'flex-end',
  },
  timeSelectors: {
    flexDirection: 'row',
    gap: 20,
    height: 80, // 휠 높이
    width: '50%',
    overflow: 'hidden',
  },
  itemContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: FONT_SIZE.b1,
    color: COLORS.black,
  },
  selectedItem: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.gray[50],
    width: '100%',
  },
  selectedItemText: {
    color: COLORS.primary[90],
    fontWeight: '700',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary[90],
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.b2,
    fontWeight: '700',
  },
});
