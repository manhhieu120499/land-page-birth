export interface CornerPhoto {
  id: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  imageUrl: string;
  caption: string;
  dateTag: string;
  rotation: number;
}

export interface BirthdayConfig {
  recipientName: string;
  recipientNickname: string;
  birthdayDate: string;
  ageBadge: string;
  mainPhotoUrl: string;
  mainPhotoCaption: string;
  headerLeftFlowerUrl: string;
  headerRightFlowerUrl: string;
  loadingDurationMs: number;
  loadingMessages: {
    threshold: number;
    text: string;
  }[];
  envelope: {
    title: string;
    subtitle: string;
    buttonText: string;
    sealLabel: string;
  };
  letter: {
    greeting: string;
    paragraphs: string[];
    wishHighlight: string;
    closing: string;
    senderSignature: string;
  };
  cornerPhotos: [CornerPhoto, CornerPhoto, CornerPhoto, CornerPhoto];
  music: {
    trackTitle: string;
    artistName: string;
    /**
     * Đường dẫn file nhạc .mp3 (ví dụ: '/birthday-song.mp3' đặt trong thư mục public/).
     * Nếu để trống '', trang sẽ tự động phát giai điệu hộp nhạc "Happy Birthday to You" tích hợp sẵn!
     */
    audioUrl: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipientName: "Ngọc Diệu",
  recipientNickname: "Bestie ✨",
  birthdayDate: "Happy Birthday Party",
  ageBadge: "Sweet & Shining Day 🎂",
  mainPhotoUrl: "/anh_3.jpg",
  mainPhotoCaption: "Nụ cười tỏa nắng nhất hôm nay ✨",
  headerLeftFlowerUrl: "/hydrangea_left.svg",
  headerRightFlowerUrl: "/hydrangea_right.svg",
  loadingDurationMs: 4200,
  loadingMessages: [
    { threshold: 0, text: "Đang thắp nến trên bánh sinh nhật... 🕯️" },
    { threshold: 28, text: "Mèo nhỏ đang gói ghém những lời chúc... 🐾" },
    { threshold: 62, text: "Đang chuẩn bị âm nhạc và pháo giấy... 🎶" },
    { threshold: 90, text: "Sắp xong rồi, chuẩn bị đón bất ngờ nhé! 🎁" },
  ],
  envelope: {
    title: "Một Bức Thư Sinh Nhật Dành Riêng Cho Bạn!",
    subtitle: "Chú mèo nhỏ đã mang thư tới đích 100% rồi nè 🐱💌",
    buttonText: "Chạm vào phong bì để mở thư & phát nhạc 🎵",
    sealLabel: "MỞ THƯ",
  },
  letter: {
    greeting: "Gửi hai của em nhân ngày sinh nhật thật rực rỡ,",
    paragraphs: [
      "Chúc mừng sinh nhật hai! Vậy là một tuổi mới thật đẹp lại gõ cửa rồi. Em chúc hai luôn vui vẻ, yêu đời, có sức khỏe tốt, gặp nhiều may mắn trong công việc và mọi chuyện nhé. Hãy luôn giữ vững nụ cười rạng rỡ như ánh nến lung linh trên chiếc bánh sinh nhật hôm nay nhé!",
    ],
    wishHighlight:
      "✨ Chúc hai tuổi mới: Bình An — Rực Rỡ — Trọn Vẹn Yêu Thương - Sớm tìm được người thương ✨",
    closing: "Thân thương gửi hai,",
    senderSignature: "Người em thân thiết của hai 🐱💝",
  },
  cornerPhotos: [
    {
      id: "corner-tl",
      position: "top-left",
      imageUrl: "/anh_1.jpg",
      caption: "Khoảnh khắc đáng yêu 💕",
      dateTag: "Kỷ niệm #01",
      rotation: -6,
    },
    {
      id: "corner-tr",
      position: "top-right",
      imageUrl: "/anh_2.jpg",
      caption: "Ngày thật rạng rỡ 🌈",
      dateTag: "Kỷ niệm #02",
      rotation: 6,
    },
    {
      id: "corner-bl",
      position: "bottom-left",
      imageUrl: "/anh_2.jpg",
      caption: "Ngọt ngào như bánh kem 🍓",
      dateTag: "Kỷ niệm #03",
      rotation: 5,
    },
    {
      id: "corner-br",
      position: "bottom-right",
      imageUrl: "/anh_1.jpg",
      caption: "Tỏa sáng theo cách của bạn ✨",
      dateTag: "Kỷ niệm #04",
      rotation: -5,
    },
  ],
  music: {
    trackTitle: "Happy Birthday Melody (Sweet Music Box)",
    artistName: "Birthday Cat Orchestra 🐾",
    audioUrl: "",
  },
};
