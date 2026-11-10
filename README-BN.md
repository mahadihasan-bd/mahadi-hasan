# ডিপ্লয়মেন্ট গাইড (বাংলা)
1. ZIP ডাউনলোড করে Extract করুন।
2. https://nodejs.org থেকে Node.js (LTS) ইনস্টল করুন।
3. VS Code-এ ফোল্ডারটি খুলুন (File > Open Folder)।
4. Terminal খুলুন (Terminal > New Terminal)।
5. `npm install` চালান।
6. `npm run build` চালান।
7. প্রজেক্টে `dist` নামে একটি ফোল্ডার তৈরি হবে।
8. https://app.netlify.com এ বিনামূল্যে অ্যাকাউন্ট খুলুন।
9. Manual deploy: Add new site > Deploy manually, এরপর `dist` ফোল্ডারটি ড্র্যাগ করে ছাড়ুন।
10. GitHub দিয়ে: কোড GitHub-এ আপলোড করুন, Netlify-তে Import from Git দিন। Build command `npm run build`, Publish directory `dist`। এরপর প্রতিটি পরিবর্তনে অটো ডিপ্লয় হবে।
11. Contact Form: ডিপ্লয়ের পর Netlify > Forms-এ ফর্ম দেখা যাবে। Settings > Forms > Notifications এ ইমেইল নোটিফিকেশন চালু করুন। ডিপ্লয়ের আগে ফর্ম কাজ করবে না।
12. আপডেট: `src/data.js` এডিট করে আবার build/push করুন।
13. নিজের ছবি: `public/` এ ছবি রাখুন এবং কোডে ব্যবহার করুন। CV PDF থাকলে `public/cv.pdf` রেখে `src/data.js` এ `cvPdf:'/cv.pdf'` দিন।
14. কাস্টম ডোমেইন: Netlify > Domain management এ যোগ করুন।
15. রং পরিবর্তন: `src/styles.css`-এর একদম উপরে `:root` এবং `[data-accent=...]` অংশে রঙের কোড আছে। মেনুর নিচের রঙিন বিন্দুতে চাপলে অ্যাকসেন্ট কালার বদলায়।

## নতুন সংযোজন (v2)
- `src/data.js`-এর নিচে `TESTIMONIALS`, `SAMPLES`, `POSTS` আছে। এগুলোতে আইটেম যোগ করলে সেকশন নিজে থেকে দেখা যাবে, ফাঁকা থাকলে লুকানো থাকে।
- `PRICING`-এ `price:null` মানে "কাজ বুঝে মূল্য"। নিজের দাম বসাতে চাইলে `price:'৳৫০০ / পেজ'` লিখুন।
- প্রজেক্টে `image`, `demo`, `code` (GitHub লিংক) দিলে স্ক্রিনশট, লাইভ ডেমো ও সোর্স কোড বাটন দেখাবে।
- কেস স্টাডির লেখা (`CASE`, `BN_P`) আমার খসড়া। নিজের সত্যিকারের গল্প অনুযায়ী বদলে নিন।

## v3 সংযোজন
- **ফ্রি টুলস:** শব্দ গণনা, বাংলা⇄ইংরেজি সংখ্যা, অক্ষরের ধরন (সব ব্রাউজারেই চলে)।
- **প্রজেক্ট ফিল্টার:** সব / টুলস / গেম / ক্রিয়েটিভ। ক্যাটাগরি `PROJECT_CATS`-এ।
- **ভিজিটর অ্যানালিটিক্স:** `src/data.js`-এ `ANALYTICS` এ goatcounter কোড (ফ্রি, https://www.goatcounter.com) বা plausible/ga দিন। ফাঁকা থাকলে বন্ধ।
- **SEO:** বাংলা+ইংরেজি description, JSON-LD (Person, WebSite, FAQ), noscript কনটেন্ট, 404 পেজ, `/typing` শর্ট লিংক, সিকিউরিটি হেডার।
- ডিপ্লয়ের পর Google Search Console-এ সাইট যোগ করে sitemap.xml জমা দিন।
