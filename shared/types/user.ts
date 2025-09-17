import type { Gender } from "../constants";

export type UserProfile = {
  id: number;
  nickname: string;
  age: number;
  verified: boolean;
  gender: Gender;
  room: boolean;
  smoking: boolean;
  certified: boolean;
  boosted: boolean;
};

export type LikedUser = {
  id: number;
  userId: number;
  likedUserId: number;
  nickname: string;
  gender: string;
  age: number;
  profileImageUrl: string;
  smoking: boolean;
};
