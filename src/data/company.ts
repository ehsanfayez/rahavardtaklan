export const company = {
  name: "رهاورد تکلان",
  phone: "09373020029",
  phoneDisplay: "۰۹۳۷۳۰۲۰۰۲۹",
  address: "تهران، خیابان سعدی جنوبی، خیابان اکباتان، کوچه آهنین، مجتمع تجاری آهنین، واحد ۲۲۰",
  // Location supplied and approved by the company owner.
  location: { latitude: 35.688851, longitude: 51.426723 },
  workingHours: [
    { days: "شنبه تا چهارشنبه", hours: "۱۰:۳۰ تا ۱۶:۳۰" },
    { days: "پنجشنبه", hours: "۱۰:۳۰ تا ۱۳:۳۰" },
  ],
} as const;
