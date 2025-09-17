import { Chip } from "@/shared/components/chip/Chip";
import { COLORS, FONT_SIZE } from "@/shared/styles";
import { StyleSheet, Text, View } from "react-native";
import { TimePicker } from "./TimePicker";

interface ToggleProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  toggleOffData: any;
  setToggleOffData: (data: any) => void;
}

const ToggleOff: React.FC<ToggleProps> = ({ toggleOffData, setToggleOffData }) => {
  const alarmTypes = ['1회', '2회', '3회 이상'];

  const handleTimeChange = (key: string, value: string) => {
    setToggleOffData({ ...toggleOffData, [key]: value });
  };

  const handleAlarmTypeSelect = (type: string) => {
    setToggleOffData({ ...toggleOffData, selectedAlarmType: type });
  };

  return (
    <>
      <TimePicker
        label="기상 시간"
        time={toggleOffData.wakeUpTime || '00:00'}
        onTimeChange={(time) => handleTimeChange('wakeUpTime', time)}
      />
      <TimePicker
        label="취침 시간"
        time={toggleOffData.sleepTime || '00:00'}
        onTimeChange={(time) => handleTimeChange('sleepTime', time)}
      />

      <View style={styles.questionSection}>
        <Text style={styles.questionLabel}>알람 횟수</Text>
        <View style={styles.chipContainer}>
          {alarmTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              isSelected={toggleOffData.selectedAlarmType === type}
              onPress={() => handleAlarmTypeSelect(type)}
            />
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  questionSection: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F2F2F2', width: '100%', gap: 8 },
  questionLabel: { fontSize: FONT_SIZE.b2, fontWeight: '400', color: COLORS.black },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});

export default ToggleOff;
