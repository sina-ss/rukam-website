export const contactTexts = {
  page: {
    title: "تماس با رکام",
    subtitle: "راه‌های ارتباط با ما",
    description:
      "ما آماده پاسخگویی به سوالات شما و ارائه مشاوره تخصصی هستیم. از طریق راه‌های زیر می‌توانید با ما در ارتباط باشید.",
  },

  hero: {
    badge: "تماس با ما",
    title: "همیشه در دسترس شما هستیم",
    titleHighlight: "در دسترس",
    description:
      "تیم رکام آماده پاسخگویی به سوالات شما و ارائه مشاوره در تمام زمینه‌های فعالیت است. با ما در ارتباط باشید.",
    cta: "شروع گفتگو",
  },

  contactInfo: {
    title: "اطلاعات تماس",
    description: "از طریق راه‌های زیر می‌توانید با ما در ارتباط باشید",
    methods: [
      {
        id: "telegram",
        title: "تلگرام",
        value: "@rokum_ir",
        description: "پاسخگویی سریع در تلگرام",
        icon: "MessageCircle",
        link: "https://t.me/rokum_ir",
        primary: true,
      },
      {
        id: "email",
        title: "ایمیل",
        value: "rokum_ir@email.com",
        description: "ارسال ایمیل برای سوالات تخصصی",
        icon: "Mail",
        link: "mailto:rokum_ir@email.com",
        primary: true,
      },
      {
        id: "phone",
        title: "تماس تلفنی",
        value: "۰۲۱-۱۲۳۴۵۶۷۸",
        description: "پاسخگویی ۲۴ ساعته",
        icon: "Phone",
        link: "tel:+982112345678",
        primary: false,
      },
      {
        id: "address",
        title: "آدرس دفتر مرکزی",
        value: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
        description: "مراجعه حضوری با هماهنگی قبلی",
        icon: "MapPin",
        link: "#",
        primary: false,
      },
    ],
  },

  workingHours: {
    title: "ساعات کاری",
    description: "زمان‌های پاسخگویی ما",
    schedule: [
      {
        days: "شنبه تا چهارشنبه",
        hours: "۸:۰۰ - ۱۷:۰۰",
        type: "regular",
      },
      {
        days: "پنج‌شنبه",
        hours: "۸:۰۰ - ۱۳:۰۰",
        type: "half",
      },
      {
        days: "جمعه",
        hours: "تعطیل",
        type: "closed",
      },
    ],
    note: "پاسخگویی تلگرام ۲۴ ساعته است",
  },

  departments: {
    title: "تماس با دپارتمان‌ها",
    description: "برای سوالات تخصصی با دپارتمان مربوطه تماس بگیرید",
    items: [
      {
        name: "بازرگانی",
        description: "خرید و فروش، صادرات و واردات",
        contact: "@rokum_business",
      },
      {
        name: "حقوقی",
        description: "مشاوره حقوقی، ثبت شرکت",
        contact: "@rokum_legal",
      },
      {
        name: "آموزش",
        description: "دوره‌ها و کلاس‌های آموزشی",
        contact: "@rokum_education",
      },
      {
        name: "بهداشت و سلامت",
        description: "خدمات درمانی و بهداشتی",
        contact: "@rokum_health",
      },
      {
        name: "فرهنگی و هنری",
        description: "فعالیت‌های فرهنگی و هنری",
        contact: "@rokum_culture",
      },
      {
        name: "فناوری اطلاعات",
        description: "خدمات فنی و نرم‌افزاری",
        contact: "@rokum_tech",
      },
    ],
  },

  faq: {
    title: "سوالات متداول",
    description: "پاسخ سوالات رایج در اینجا",
    items: [
      {
        question: "چگونه می‌توانم عضو رکام شوم؟",
        answer:
          "برای عضویت در رکام می‌توانید از طریق فرم موجود در سایت یا تماس مستقیم با ما اقدام کنید. تیم ما شما را راهنمایی خواهد کرد.",
      },
      {
        question: "آیا خدمات رکام واقعاً بدون وجه نقد است؟",
        answer:
          "بله، تمام خدمات رکام بر اساس سیستم اعتباری و بدون نیاز به پرداخت وجه نقد ارائه می‌شود. جزئیات بیشتر را از تیم ما بپرسید.",
      },
      {
        question: "در چه مناطقی رکام فعالیت دارد؟",
        answer:
          "رکام به صورت بین‌المللی فعالیت می‌کند و در حال گسترش خدمات خود در نقاط مختلف است.",
      },
      {
        question: "چه مدارکی برای عضویت نیاز است؟",
        answer:
          "مدارک مورد نیاز بسته به نوع عضویت و دپارتمان انتخابی متفاوت است. تیم ما شما را راهنمایی خواهد کرد.",
      },
    ],
  },

  form: {
    title: "فرم تماس با ما",
    description: "پیام خود را برای ما ارسال کنید",
    successMessage:
      "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.",
    fields: {
      name: {
        label: "نام و نام خانوادگی *",
        placeholder: "نام کامل خود را وارد کنید",
      },
      phone: {
        label: "شماره تماس *",
        placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
      },
      email: {
        label: "ایمیل (اختیاری)",
        placeholder: "example@email.com",
      },
      subject: {
        label: "موضوع *",
        placeholder: "موضوع پیام خود را وارد کنید",
      },
      message: {
        label: "پیام *",
        placeholder: "پیام خود را اینجا بنویسید...",
      },
    },
    submit: "ارسال پیام",
    disclaimer: "با ارسال این فرم، شما با شرایط و قوانین رکام موافقت می‌کنید",
  },

  features: {
    title: "چرا با رکام تماس بگیرید؟",
    items: [
      {
        title: "پاسخگویی سریع",
        description: "پاسخ به پیام‌ها در کمترین زمان ممکن",
        icon: "Zap",
      },
      {
        title: "مشاوره تخصصی",
        description: "راهنمایی توسط کارشناسان مجرب",
        icon: "Users",
      },
      {
        title: "پشتیبانی ۲۴/۷",
        description: "آماده خدمت‌رسانی در تمام ساعات",
        icon: "Clock",
      },
      {
        title: "رایگان و بدون تعهد",
        description: "مشاوره اولیه کاملاً رایگان",
        icon: "Gift",
      },
    ],
  },

  cta: {
    title: "آماده شروع همکاری هستید؟",
    description:
      "همین حالا با ما تماس بگیرید و از مزایای عضویت در رکام بهره‌مند شوید",
    primaryButton: "تماس فوری",
    secondaryButton: "مشاهده دپارتمان‌ها",
  },
};
