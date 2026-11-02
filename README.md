# 🛒 বাজার দর (BazarDor) — বাংলাদেশি নিত্যপ্রয়োজনীয় পণ্যের দাম ট্র্যাকার

**বাজার দর (BazarDor)** হলো একটি আধুনিক ও পূর্ণাঙ্গ বাংলাদেশি নিত্যপ্রয়োজনীয় পণ্যের বাজার দর ট্র্যাকিং প্ল্যাটফর্ম। এই ওয়েব অ্যাপ্লিকেশনটির মাধ্যমে ব্যবহারকারীরা চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার প্রতিদিনের বাজার দর, গতকালের তুলনায় দামের হ্রাস-বৃদ্ধি (▲/▼ %), সর্বনিম্ন ও সর্বাধিক দর এবং দেশের ৬টি বিভাগের ১২টি প্রধান বাজারের বিস্তারিত মূল্য তালিকা এক নজরে দেখতে ও তুলনা করতে পারবেন।

- 🌐 **Live Website:** [https://b14-a7-bazar-dor-phi.vercel.app](https://b14-a7-bazar-dor-phi.vercel.app)
- 💻 **GitHub Repository:** [https://github.com/alaminbd7598/B14-A7-Bazar-Dor](https://github.com/alaminbd7598/B14-A7-Bazar-Dor)

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

- **Frontend Framework:** React 19, TypeScript, Next.js App Router Architecture Patterns & React Router v7
- **Styling & UI:** Tailwind CSS v4, Hind Siliguri & Plus Jakarta Sans Typography, Lucide Icons
- **Authentication:** BetterAuth (`authClient.signIn.email`, `authClient.signUp.email`, `authClient.signIn.social`, `authClient.updateUser`, `authClient.signOut`)
- **Notifications:** `react-hot-toast` (`data-rht-toaster`)
- **API Integration:** Programming Hero BazarDor REST API (`https://openapi.programming-hero.com/api/bazardor` & `https://api.api-store.workers.dev/api/bazardor`)
- **Testing:** Node.js Built-in Test Runner (`node:test` + `tsx`)

---

## ✨ প্রজেক্টের প্রধান বৈশিষ্ট্যসমূহ (Key Features — 5+ Core Features)

1. **📊 প্রতিদিনের বাজার দর এবং লাইভ প্রাইস টিকার (Live Price Marquee & Movers):**
   - ন্যাভবারের নিচেই স্ক্রলিং প্রাইস টিকারে ৩৩টি নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দর এবং দামের পরিবর্তন (`▲ / ▼ %`) দেখানো হয়।
   - হোম পেজে **"আজ দাম বেড়েছে ▲"** (Top 6 Risers) এবং **"আজ দাম কমেছে ▼"** (Top 6 Fallers) আলাদা সেকশনে প্রদর্শিত হয়।

2. **🗂️ বিভাগভিত্তিক ফিল্টারিং এবং বাংলা সংখ্যার সঠিক সর্টিং (Category Filtering & Numeric Sorting - Challenge C1):**
   - চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ এবং মসলা — প্রতিটি বিভাগের জন্য ডায়নামিক ক্যাটাগরি পেজ (`/category/[slug]`)।
   - **"সাজান"** ড্রপডাউনের (`ডিফল্ট`, `দাম: কম থেকে বেশি`, `দাম: বেশি থেকে কম`) মাধ্যমে বাংলা সংখ্যার (`১৪৮ টাকা`, `১,৮৫০ টাকা`) সঠিক সংখ্যাত্মক (Numeric) ক্রমানুসারে পণ্য সাজানো যায়।

3. **🔐 BetterAuth অথেনটিকেশন এবং প্রটেক্টেড রাউট (Authentication & Protected Routes):**
   - ইমেইল ও পাসওয়ার্ড দিয়ে সাইন আপ (`/signup`) এবং সাইন ইন (`/signin`) করার সুবিধা।
   - **Google** এবং **GitHub** সোশ্যাল লগইন বাটনের মাধ্যমে এক-ক্লিকে দ্রুত লগইন।
   - প্রোডাক্ট ডিটেইলস পেজ (`/product/[slug]`) এবং প্রোফাইল পেজ (`/profile`) প্রটেক্টেড রাউট হিসেবে সুরক্ষিত; লগইন ছাড়া প্রবেশের চেষ্টা করলে টোস্ট নোটিফিকেশন দেখিয়ে সাইন ইন পেজে রিডাইরেক্ট করা হয়।

4. **🏪 বাজারভিত্তিক বিস্তারিত দর ও দামের সারসংক্ষেপ (Product Details & 12-Market Breakdown):**
   - প্রতিটি পণ্যের বিস্তারিত পেজে (`/product/[slug]`) **সর্বনিম্ন দাম**, **সর্বাধিক দাম**, এবং **গড় দাম** কার্ড আকারে দেখানো হয়।
   - ঢাকা, চট্টগ্রাম, রাজশাহী, ময়মনসিংহ, খুলনা ও সিলেটের ১২টি বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম টেবিল আকারে এবং বিভাগ অনুযায়ী ফিল্টার করে দেখা যায়।

5. **👤 আমার প্রোফাইল ও তথ্য আপডেট ফিচার (My Profile & Update User Info - Challenge C3):**
   - ব্যবহারকারী তার প্রোফাইল পেজে (`/profile`) নাম, ইমেইল এবং লগইন মাধ্যম দেখতে পারেন।
   - **আপডেট (Update Information)** বাটনে ক্লিক করে `/profile/update` রাউটে গিয়ে `BetterAuth`-এর `updateUser` মেথড ব্যবহার করে নিজের নাম রিয়েল-টাইমে আপডেট করতে পারেন।

6. **⚖️ বাজার তুলনা এবং কাস্টম ৪০৪ হ্যান্ডলিং (Market Comparison & Friendly 404 States):**
   - `/compare` পেজে যেকোনো দুটি বাজারের পণ্যের গড় দর পাশাপাশি তুলনা করা যায়।
   - ভুল ক্যাটাগরি (`/category/invalid`), ভুল প্রোডাক্ট (`/product/unknown`) বা যেকোনো অজানা লিংকে গেলে সুন্দর ৪০৪ মেসেজ এবং **"হোম পেজে ফিরে যান"** বাটন দেখানো হয়।

---

## 🔗 API Endpoints Used

- **All Products:** `GET /products`
- **Filter by Category:** `GET /products?category=chal`
- **Single Product:** `GET /products/1`
- **Categories:** `GET /categories`
- **Single Category:** `GET /categories/chal`

---

## 📂 প্রজেক্ট ফোল্ডার স্ট্রাকচার (Project Structure)

```text
├── public/
│   ├── bazar-hero.png
│   ├── logo-icon.png
│   └── _redirects
├── src/
│   ├── components/      # Navbar, Footer, ProductCard, SortDropdown, ProtectedRoute
│   ├── context/         # AuthContext (BetterAuth state & toast notifications)
│   ├── data/            # Fallback product & category dataset
│   ├── pages/           # Home, Category, ProductDetails, SignIn, SignUp, Profile, UpdateProfile, Compare, NotFound
│   ├── services/        # BazarDor API client & BetterAuth client
│   └── utils/           # Bengali digit converters, price mover logic & numeric sorting
├── vercel.json          # SPA rewrite rules for dynamic routes
└── README.md
```

---

## 🚀 লোকালি রান করার নিয়ম (How to Run Locally)

```bash
# ১. ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# ২. ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev

# ৩. ইউনিট টেস্ট রান করুন
npx tsx --test src/utils/bazarLogic.test.ts src/services/authClient.test.ts
```

