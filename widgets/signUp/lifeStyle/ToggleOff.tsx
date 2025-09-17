import { Chip } from "@/shared/components/chip/Chip";
import { COLORS, FONT_SIZE } from "@/shared/styles";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TimePicker } from "./TimePicker";

interface ToggleProps {
    isOn: boolean;
    onToggle: (value: boolean) => void;
}

const ToggleOff: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
    const [wakeUpTime, setWakeUpTime] = useState('00:00');
    const [sleepTime, setSleepTime] = useState('00:00');
    const [selectedAlarmType, setSelectedAlarmType] = useState<string>('');
    const alarmTypes = ['1회', '2회', '3회 이상'];

    console.log(wakeUpTime);

    const handleAlarmTypeSelect = (type: string) => {
        setSelectedAlarmType(type);
      };

    return (
        <>
            <TimePicker
                label="기상 시간"
                time={wakeUpTime}
                onTimeChange={(newTime) => setWakeUpTime(newTime)}
                />

                <View style={styles.lastTimePicker}>
                <TimePicker
                    label="취침 시간"
                    time={sleepTime}
                    onTimeChange={(newTime) => setSleepTime(newTime)}
                />
            </View>

            <View style={styles.questionSection}>
                <Text style={styles.questionLabel}>알람 횟수</Text>
                <View style={styles.chipContainer}>
                    {alarmTypes.map((type) => (
                        <Chip
                            key={type}
                            label={type}
                            isSelected={selectedAlarmType === type}
                            onPress={() => handleAlarmTypeSelect(type)} />
                    ))}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    questionSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    width: "100%",
    gap: 8,
  },
  questionLabel: {
    fontSize: FONT_SIZE.b2,
    fontWeight: '400',
    color: COLORS.black,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  lastTimePicker: {
    borderBottomWidth: 0,
  },
});

export default ToggleOff