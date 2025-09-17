export const getRoomText = (isRoom: boolean) => {
  if (isRoom)
    return "🧍 함께 살 룸메이트를 찾고 있나요?\n당신의 공간을 나눠보세요.";
  return "🏠 집을 구하고 있나요?\n당신과 어울릴 룸메이트가 기다리고 있어요.";
};
