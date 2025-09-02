import { Button } from "@/shared/components/Button/Button";
import { SPACING } from "@/shared/styles";
import DescriptionSection from "@/widgets/detail/DescriptionSection";
import MapSection from "@/widgets/detail/MapSection";
import PriceSection from "@/widgets/detail/PriceSection";
import ProfileSection from "@/widgets/detail/ProfileSection";
import PropertyHeader from "@/widgets/detail/PropertyHeader";
import PropertyInfo from "@/widgets/detail/PropertyInfo";
import PropertyTitle from "@/widgets/detail/PropertyTitle";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PropertyDetailView: React.FC = () => {
  const { postId } = useLocalSearchParams();
  console.log(postId);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PropertyHeader />
      <ProfileSection />
      <PropertyTitle />
      <MapSection />
      <PriceSection />
      <PropertyInfo />
      <DescriptionSection />
      <View
        style={{
          padding: SPACING.normal,
        }}
      >
        <Button size="lg" text="채팅하기" onPress={() => {}} disabled={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    maxWidth: 480,
  },
});

export default PropertyDetailView;
