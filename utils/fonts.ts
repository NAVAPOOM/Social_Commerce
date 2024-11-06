// config/fonts.ts
import { Lato, Noto_Sans_Thai } from 'next/font/google';

// ฟอนต์สำหรับภาษาอังกฤษ
export const fontSans = Lato({
  subsets: ['latin'], // รองรับตัวอักษรละติน
  weight: ['300', '400', '700', '900'], // ระบุน้ำหนักของฟอนต์ให้หลากหลายขึ้น
  variable: '--font-sans',
});

// ฟอนต์สำหรับภาษาไทย
export const fontThai = Noto_Sans_Thai({
  subsets: ['latin', 'thai'], // รองรับตัวอักษรละตินและไทย
  weight: ['300', '400', '700', '900'], // ระบุน้ำหนักของฟอนต์ให้หลากหลายขึ้น
  variable: '--font-thai',
});
