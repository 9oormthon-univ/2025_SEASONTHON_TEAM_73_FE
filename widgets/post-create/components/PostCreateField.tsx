import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FieldProps {
  required?: boolean;
  title?: string;
  description?: string;
}

interface RadioProps extends FieldProps {
  items: string[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
  isMultiSelect?: boolean;
}

interface DatePickerProps extends FieldProps {
  value: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
  placeholder?: string;
}

interface TextAreaProps extends FieldProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

interface PhotoPickerProps extends FieldProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  maxCount?: number;
}

export const PostCreateField = {
  Radio,
  MultiRadio,
  DatePicker,
  TextArea,
  PhotoPicker,
};

function Radio({
  title,
  description,
  required,
  items,
  selected,
  setSelected,
  isMultiSelect = false,
}: RadioProps) {
  const handlePress = (index: number) => {
    setSelected((prev) => {
      if (isMultiSelect) {
        return prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index];
      }
      return [index];
    });
  };

  return (
    <View style={styles.wrapper}>
      {title && (
        <Text style={styles.title}>
          {title} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={styles.radioContainer}>
        {items.map((item, index) => {
          const isSelected = selected.includes(index);
          const isLeft = index === 0;
          const isRight = index === items.length - 1;

          return (
            <TouchableOpacity
              key={`${item}-${index}`}
              onPress={() => handlePress(index)}
              style={[
                styles.radioItem,
                isLeft && styles.radioItemLeft,
                isRight && styles.radioItemRight,
                isSelected ? styles.radioItemSelected : styles.radioItemNormal,
              ]}
            >
              <Text
                style={[
                  styles.radioText,
                  isSelected
                    ? styles.radioTextSelected
                    : styles.radioTextNormal,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

function MultiRadio({
  title,
  description,
  required,
  items,
  selected,
  setSelected,
  isMultiSelect = false,
}: RadioProps) {
  const handlePress = (index: number) => {
    setSelected((prev) => {
      if (isMultiSelect) {
        return prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index];
      }
      return [index];
    });
  };

  return (
    <View style={styles.wrapper}>
      {title && (
        <Text style={styles.title}>
          {title} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={styles.multiRadioContainer}>
        {items.map((item, index) => {
          const isSelected = selected.includes(index);

          return (
            <TouchableOpacity
              key={`${item}-${index}`}
              onPress={() => handlePress(index)}
              style={[
                styles.multiRadioItem,
                isSelected && styles.multiRadioItemSelected,
              ]}
            >
              <Text
                style={[
                  styles.multiRadioText,
                  isSelected
                    ? styles.multiRadioTextSelected
                    : styles.multiRadioTextNormal,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

function DatePicker({
  title,
  description,
  required,
  value,
  setValue,
  placeholder = "날짜를 입력해주세요.",
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setValue(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <View style={styles.wrapper}>
      {title && (
        <Text style={styles.title}>
          {title} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray[40]}
          value={value ? formatDate(value) : ""}
          editable={false}
        />
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setShowPicker(true)}
        >
          <Image
            source={require("@/assets/icons/icon-calendar.png")}
            style={styles.calendarIcon}
          />
        </TouchableOpacity>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}

function TextArea({
  title,
  description,
  required,
  value,
  setValue,
  placeholder,
  multiline = true,
  numberOfLines = 4,
}: TextAreaProps) {
  return (
    <View style={styles.wrapper}>
      {title && (
        <Text style={styles.title}>
          {title} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray[40]}
          value={value}
          onChangeText={setValue}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical="top"
        />
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

function PhotoPicker({
  title,
  description,
  required,
  images,
  setImages,
  maxCount = 10,
}: PhotoPickerProps) {
  const pickImage = async () => {
    if (images.length >= maxCount) {
      Alert.alert("알림", `최대 ${maxCount}장까지 업로드할 수 있습니다.`);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View>
      <View style={styles.photoHeader}>
        {title && (
          <Text style={styles.title}>
            {title} {required && <Text style={styles.required}>*</Text>}
          </Text>
        )}
        <Text style={styles.photoCount}>
          ({images.length}/{maxCount})
        </Text>
      </View>

      <ScrollView horizontal style={styles.photoGrid}>
        {images.length < maxCount && (
          <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
            <Ionicons name="camera-outline" size={24} color={COLORS.gray[40]} />
          </TouchableOpacity>
        )}
        {images.map((image, index) => (
          <View key={index} style={styles.photoItem}>
            <Image source={{ uri: image }} style={styles.photoImage} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Ionicons name="close" size={12} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  container: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.regular,
  },
  description: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
  },
  required: {
    color: COLORS.error,
  },
  radioContainer: {
    flexDirection: "row",
    width: "100%",
  },
  radioItem: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radioItemLeft: {
    borderTopLeftRadius: RADIUS.xs,
    borderBottomLeftRadius: RADIUS.xs,
    borderRightWidth: 0,
  },
  radioItemRight: {
    borderTopRightRadius: RADIUS.xs,
    borderBottomRightRadius: RADIUS.xs,
  },
  radioItemSelected: {
    borderColor: COLORS.primary[90],
    backgroundColor: COLORS.primary[10],
  },
  radioItemNormal: {
    borderColor: COLORS.gray[40],
    backgroundColor: COLORS.white,
  },
  radioText: {
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.regular,
    textAlign: "center",
  },
  radioTextSelected: {
    color: COLORS.primary[90],
  },
  radioTextNormal: {
    color: COLORS.gray[60],
  },
  multiRadioContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  multiRadioItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.gray[40],
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  multiRadioItemSelected: {
    borderColor: COLORS.primary[90],
    backgroundColor: COLORS.primary[10],
  },
  multiRadioText: {
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.regular,
    textAlign: "center",
  },
  multiRadioTextSelected: {
    color: COLORS.primary[90],
  },
  multiRadioTextNormal: {
    color: COLORS.gray[60],
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray[40],
    borderRadius: RADIUS.xs,
    paddingHorizontal: 12,
  },
  dateInput: {
    flex: 1,
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.regular,
  },
  calendarButton: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  calendarIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray[40],
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  textArea: {
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.regular,
    color: COLORS.gray[80],
    minHeight: 100,
    lineHeight: 21,
  },
  photoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photoCount: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    color: COLORS.gray[60],
  },
  photoGrid: {
    paddingTop: 10,
    flexDirection: "row",
  },
  photoItem: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.xs,
    position: "relative",
    marginRight: 10,
  },
  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RADIUS.xs,
  },
  removeButton: {
    position: "absolute",
    top: -4,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gray[80],
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.gray[40],
    borderStyle: "dashed",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
