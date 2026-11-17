<h1 align="center">🍜 Simple Ordering System 🍜</h1>

<p align="center"><img src="https://media.tenor.com/TXdUAkpSyjwAAAAm/sleepy-cat-transparent-sleepy.webp" width="200" alt="Warung"></p>

<p align="center"><strong>Website Sistem Pemesanan Makanan</strong> </p>

---

## 🚀 Perkenalan

**Simple Ordering System** adalah sebuah website sistem pemesanan makanan yang dibuat untuk mempermudah pelanggan untuk melihat menu, melakukan pemesanan, serta membantu kasir dalam mengelola pesanan yang masuk.

Pelanggan dapat memilih menu, menentukan jumlah pesanan, memasukkan nomor meja, lalu mengirim pesanan langsung ke dashboard kasir.

Untuk bagian backend, sistem menggunakan **Node.js + Express.js**, sedangkan data pesanan disimpan menggunakan **MongoDB**.

Jika kamu ingin melihat-lihat tampilan awal laman Ordering System-nya, kamu bisa kunjungi [link di sini.](https://www.aurellzproject.my.id/)

---

## 📊 Informasi Projek

- **Versi saat ini**: `v26.1.1`
- **Bahasa**: `HTML, CSS, JavaScript`
- **Database**: `MongoDB`
- **Deployment**: `Vercel`

---

## ✨ Fitur

- 🍜 **Halaman Menu** — Halaman utama untuk melihat daftar makanan, memilih jumlah pesanan, memasukkan nomor meja, dan mengirim pesanan.
- 🧾 **Struk Pesanan** — Menampilkan rincian pesanan, total pembayaran, serta status pesanan.
- 🔐 **Login Kasir** — Halaman khusus untuk kasir melakukan login sebelum mengakses sistem.
- 🖥️ **Dashboard Kasir** — Menampilkan pesanan yang masuk dan menyediakan tombol untuk menyelesaikan pesanan.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi     | Kegunaan                              |
| ------------- | ------------------------------------- |
| 🟧 HTML       | Membuat struktur halaman website      |
| 🎨 CSS        | Mengatur tampilan dan desain          |
| 🟨 JavaScript | Mengatur interaksi dan logika website |
| 🟢 Node.js    | Menjalankan backend                   |
| 🚂 Express.js | Membuat server dan API                |
| 🍃 MongoDB    | Menyimpan data pesanan                |
| ▲ Vercel      | Deployment website                    |

---

## 📖 Tutorial Cara Pasang & Menjalankan

### 1. Persyaratan ⚙️

Pastikan sudah terinstal:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)

---

### 2. Kloning Repositori 📂

```bash
git clone https://github.com/ItzAurel/Simple-Ordering-System
```

---

### 3. Instal Dependensi 📦

```bash
npm install
```

Perintah tersebut akan menginstal semua package yang dibutuhkan berdasarkan `package.json`.

---

### 4. Konfigurasi Environment 🔐

Ganti isi file `.env` di folder utama project.

```env
MONGODB_USERNAME="USERNAME"
MONGODB_PASSWORD="PASSWORD"
MONGODB_URI="mongodb+srv://USERNAME:PASSWORDL@NAMACLUSTER.HURUFRANDOM.mongodb.net/restoran?retryWrites=true&w=majority"
```

---

### 5. Jalankan Website 🚀

```bash
npm start
```

Setelah server berhasil dijalankan, buka:

```halaman pelanggan
http://localhost:3000
```
```halaman kasir
http://localhost:3000/kasir/login.html
```

### 6. Buat Kata Sandi Dashboard Kasir🔐

Untuk membuat kata sandi baru untuk akun kasir, gunakan kode berikut:

```bash
node buat-password.js
```

Namun sebelum kamu bash kode tersebut, kamu bisa terlebih dahulu mengedit isi buat-password.js terlebih dahulu

### Contoh Yang Sudah Jadi
Contoh kata sandi yang ada di [aurellzproject.my.id/login](https://www.aurellzproject.my.id/kasir/login.html) adalah
```
Username: Kasir
Password: KerjaYangBener
```
Sehingga setelah kamu mencoba memesan satu menu, maka semua list pesanan akan muncul di bagian ini.

## 🌐 Deployment

Project ini juga dapat dijalankan secara online menggunakan **Vercel**.

Environment Variable yang perlu ditambahkan pada Vercel:

```text
MONGODB_URI
SESSION_SECRET
```

Setelah repository terhubung dengan Vercel, project akan otomatis di-build dan dijalankan oleh server.

---

## 🤖 AI Usage Disclosure

### AI yang Digunakan

- 🤖 **ChatGPT**
- ♊ **Gemini**
- 🛩️ **Copilot**
  
### Penggunaan AI

AI digunakan sebagai alat bantu selama proses pengembangan project, terutama untuk:

- 💡 Membantu memahami konsep pemrograman.
- 🐛 Membantu mencari dan memperbaiki error pada program.
- 🔧 Membantu debugging kode.
- 🧠 Memberikan saran mengenai struktur dan logika program.
- 📚 Membantu menjelaskan penggunaan teknologi yang digunakan.

### Penyesuaian oleh Pengembang

Saran dan kode yang diberikan oleh AI tidak langsung digunakan seluruhnya. Kode disesuaikan, diperbaiki, diuji, dan dikembangkan kembali agar sesuai dengan kebutuhan project.

---

## 📝 Catatan

Project ini dibuat sebagai bagian dari tugas/proyek pembelajaran.
Beberapa bagian dari project masih dapat dikembangkan lebih lanjut, seperti sistem autentikasi yang lebih lengkap, pengelolaan menu, serta fitur administrasi lainnya.

---

<h3>📜 Contributor</h3>

* 🎓 **Pendidikan   :** SMK Negeri 1 Suruh
* 📖 **Kejuruan     :** Teknik Komputer Jaringan
* 💬 **Nama Peserta :** Aurellio Ahmad Karuniawan - Dhesta Fadilah

<p align="center">
&#x20; Dibuat dengan ❤️ oleh <b>ItzAurel | Leviathan-a13</b>
</p>
