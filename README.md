# E-Commerce ระบบร้านค้าออนไลน์

ระบบร้านค้าออนไลน์ที่พัฒนาด้วยภาษา JavaScript โดยมีระบบหลังบ้านสำหรับผู้ดูแลที่สามารถจัดการหมวดหมู่สินค้า, สินค้า, บัญชี และ คำสั่งซื้อได้ พร้อมรอบรองการชำระเงินผ่าน Stripe


## วิธีการติดตั้งและตั้งค่า

**Server**
```
cd server
npm install
```
**Client**
```
cd client
npm install
```
**ตั้งค่า**
```
Server/.env
STRIPE_SECRET_KEY=				# รหัสสำหรับเชื่อมต่อ Stripe
STRIPE_WEBHOOK_SECRET=			# รหัสสำหรับยืนยัน Webhook จาก Stripe
JWT=ecommerce=					# รหัสสำหรับการเข้ารหัสและถอดรหัส JWT
DATABASE_URL=					# เชื่อมต่อฐานข้อมูล

Client/.env
VITE_STRIPE_KEY=				# รหัสสำหรับเชื่อมต่อ Stripe
```
## วิธีการใช้งาน

**Server**
```
npm run start
```

**Client**
```
npm run dev
```

**Browser**
```
http://localhost:5173
```

