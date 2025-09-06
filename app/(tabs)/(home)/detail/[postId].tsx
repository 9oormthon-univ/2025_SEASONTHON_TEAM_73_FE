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
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PropertyDetailView: React.FC = () => {
  const { postId } = useLocalSearchParams();
  if (!postId) return null;
  const accessToken = useAuthStore.getState().accessToken;
  const [postData, setPostData] = useState<any>([]);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await api.get(`/posts/${postId}`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if(res.data.data.isCertified === true) {
        setBadge("대학생 인증");
      } else {
        return;
      }
      setPostData(res.data.data);
      console.log(res.data.data);
      } catch (error) {
        console.error("post 데이터 오류 발생", error);
      }
    };

    getPostData();
  },[]);

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
      pathname: `/chat/room/${chatRoom.chatRoomId}` as any,
      params: { senderName: chatRoom.receiverName },
    });
    console.log("채팅방 생성 및 이동:", chatRoom);
    } catch (err) {
      console.error("채팅방 생성 실패:", err);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PropertyHeader images={postData.imageUrl ? [postData.imageUrl] : []} />

      <ProfileSection
        userId={postData.userId} 
        nickname={postData.userName}
        badgeText={badge}
        profileImageUrl={postData.imageUrl}
      />
      <PropertyTitle
        title={postData.title}
        deposit={postData.deposit}
        monthlyRent={postData.monthlyRent}
        maintenanceFee={postData.maintenanceFee}
        location={postData.location}
      />
      <MapSection
        postId={typeof postId === "string" ? Number(postId) : Array.isArray(postId) ? Number(postId[0]) : 0}
      />
      <PriceSection
        deposit={postData.deposit}
        monthlyRent={postData.monthlyRent}
        maintenanceFee={postData.maintenanceFee}
        depositShare={postData.depositShare}
        rentShare={postData.rentShare}
        maintenanceShare={postData.maintenanceShare}
        utilitiesShare={postData.utilitiesShare}
      />
      <PropertyInfo
        roomType={postData.roomType}
        areaSize={postData.areaSize}
        floor={postData.floor}
        buildingFloor={postData.buildingFloor}
        roomCount={postData.roomCount}
        washroomCount={postData.washroomCount}
        hasElevator={postData.hasElevator}
        availableDate={postData.availableDate}
        minStayMonths={postData.minStayMonths}
        maxStayMonths={postData.maxStayMonths}
      />
      <DescriptionSection
        preferredGender={postData.preferredGender}
        description={postData.content}
      />
      <View style={{ padding: SPACING.normal }}>
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
