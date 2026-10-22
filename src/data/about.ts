import { company } from "./company";

// Task 07 owner-supplied copy. Temporary approved images use their actual JPG paths.
// Replace these paths when the final company photographs are supplied.
export const aboutPage = {
  introduction: {
    eyebrow: "معرفی مجموعه",
    title: `${company.name}، همراه مطمئن کسب‌وکار شما`,
    description: `${company.name} در حوزه معرفی و تأمین قطعات خودرو فعالیت می‌کند و تمرکز ویژه‌ای بر قطعات مرتبط با سیستم سوخت‌رسانی، مجموعه پمپ بنزین و درجه باک دارد. هدف این مجموعه، ارائه اطلاعات روشن درباره محصولات و ایجاد مسیر ارتباطی مناسب برای فروشگاه‌ها، تعمیرکاران و فعالان حوزه قطعات خودرو است.`,
    image: { src: "/images/about/About-Products-Image.jpg", alt: "تصویری از مجموعه پمپ‌های بنزین و قطعات مرتبط با سیستم سوخت‌رسانی خودرو", width: 623, height: 628 },
    action: { label: "مشاهده محصولات", href: "/products/" },
  },
  benefits: [
    { title: "تمرکز بر کیفیت", description: "توجه به کیفیت قطعات و ارائه اطلاعات روشن برای انتخاب مناسب‌تر محصولات.", icon: "quality" },
    { title: "تأمین پایدار و مطمئن", description: "تلاش برای معرفی محصولات و بررسی درخواست‌های مشتریان تجاری.", icon: "shield" },
    { title: "پشتیبانی و مشاوره تخصصی", description: "راهنمایی مشتریان برای بررسی مشخصات و انتخاب قطعه متناسب با نیازشان.", icon: "headset" },
  ],
  cooperation: {
    eyebrow: `همکاری با ${company.name}`,
    title: "همکاری در مسیر رشد",
    description: `${company.name} از ارتباط با فروشگاه‌ها، تعمیرگاه‌ها، خریداران تجاری و فعالان بازار قطعات خودرو استقبال می‌کند. برای دریافت اطلاعات بیشتر درباره محصولات، استعلام موجودی و بررسی شرایط همکاری، می‌توانید از طریق صفحه تماس با ما با واحد فروش ارتباط برقرار کنید.`,
    image: { src: "/images/about/About-Warehouse-Image.jpg", alt: "نمای راهروی انبار و قفسه‌های بسته‌بندی قطعات خودرو", width: 1200, height: 746 },
    action: { label: "تماس با ما", href: "/contact/" },
  },
} as const;
