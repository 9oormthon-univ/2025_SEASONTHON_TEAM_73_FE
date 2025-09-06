import api from "@/shared/api/axios";
import { Button } from "@/shared/components/Button/Button";
import { useAuthStore } from "@/shared/store";
import { COLORS, SPACING } from "@/shared/styles";
import DescriptionSection from "@/widgets/detail/DescriptionSection";
import MapSection from "@/widgets/detail/MapSection";
import PriceSection from "@/widgets/detail/PriceSection";
import ProfileSection from "@/widgets/detail/ProfileSection";
import PropertyHeader from "@/widgets/detail/PropertyHeader";
import PropertyInfo from "@/widgets/detail/PropertyInfo";
import PropertyTitle from "@/widgets/detail/PropertyTitle";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PropertyDetailView: React.FC = () => {
  const { postId } = useLocalSearchParams();
  if (!postId) return null;
  const accessToken = useAuthStore.getState().accessToken;
  const [postData, setPostData] = useState<any>([]);

  const handleCreateChatRoom = async () => {
    try {
      const res = await api.post(`/chatrooms/${postId}`, 
    {},  // body는 빈 객체
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
      const chatRoom = res.data.data;

      // 채팅방 화면으로 이동 (chatRoomId 전달)
      router.push({
        pathname: `/room/${chatRoom.chatRoomId}` as any,
        params: { senderName: chatRoom.receiverName },
      });
      console.log("채팅방 생성 및 이동:", chatRoom);
    } catch (err) {
      console.error("채팅방 생성 실패:", err);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PropertyHeader />
      <ProfileSection
        userId={postData.userId} 
        nickname={postData.nickname}
        badgeText={postData.badge}
        profileImageUrl={postData.profileImage}
      />
      <PropertyTitle />
      <MapSection postId={typeof postId === "string" ? Number(postId) : Array.isArray(postId) ? Number(postId[0]) : 0} />
      <PriceSection />
      <PropertyInfo />
      <DescriptionSection />
      <View
        style={{
          padding: SPACING.normal,
        }}
      >
        <Button size="lg" text="채팅하기" onPress={handleCreateChatRoom} disabled={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    maxWidth: 480,
  },
});

export default PropertyDetailView;
