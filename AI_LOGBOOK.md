# 🤖 AI LOGBOOK

Dokumentasi pemanfaatan kecerdasan artifisial dalam proses pengembangan proyek **Sistem Pemesanan Restoran**.

---

## 🧠 Tahap 1: Eksplorasi Ide & Perancangan Solusi

### Interaksi dengan AI

AI digunakan untuk membantu menentukan konsep dan alur dasar sistem pemesanan restoran berbasis web.

Beberapa hal yang didiskusikan dengan AI antara lain:

- 🍜 Konsep halaman pelanggan untuk melihat menu dan melakukan pemesanan.
- 🧾 Konsep halaman struk setelah pesanan berhasil dikirim.
- 🔐 Konsep halaman login untuk kasir.
- 🖥️ Konsep dashboard kasir untuk melihat pesanan yang masuk.
- 🗄️ Alur penyimpanan data pesanan menggunakan MongoDB.
- ⚙️ Penggunaan Node.js dan Express sebagai server.
- 🔄 Penggunaan status pesanan seperti `Diproses` dan `Selesai`.

### Contoh Prompt

> Saya ingin membuat website sistem pemesanan restoran sederhana untuk tugas sekolah. Website memiliki halaman menu pelanggan, pemesanan, struk, login kasir, dan dashboard kasir. Bagaimana alur sistem yang sederhana untuk proyek tersebut?

### Hasil

Dari diskusi tersebut, ditentukan alur utama sistem:

**Pelanggan memilih menu → memasukkan nomor meja → mengirim pesanan → data disimpan ke MongoDB → kasir melihat pesanan → kasir menyelesaikan pesanan → status pesanan berubah → pelanggan dapat melihat perubahan status pada struk.**

### Validasi & Modifikasi Mandiri

Saran dari AI tidak langsung digunakan seluruhnya. Struktur sistem disesuaikan dengan kebutuhan proyek dan kemampuan tim.

Beberapa fitur yang terlalu kompleks tidak digunakan karena proyek dibuat untuk kebutuhan tugas sekolah.

---

## 🧩 Tahap 2: Penyusunan Kerangka Kode (Scaffolding)

### Interaksi dengan AI

AI digunakan untuk membantu menyusun struktur awal HTML, CSS, JavaScript, Node.js, Express, dan koneksi MongoDB.

AI juga membantu memberikan contoh struktur folder dan fungsi dasar untuk:

- Halaman menu pelanggan.
- Halaman struk pesanan.
- Halaman login kasir.
- Dashboard kasir.
- Pengiriman data pesanan ke server.
- Pengambilan data pesanan dari MongoDB.
- Pengubahan status pesanan.

### Contoh Prompt

> Buatkan struktur sederhana untuk website pemesanan restoran menggunakan HTML, CSS, JavaScript, Node.js, Express, dan MongoDB. Pisahkan halaman pelanggan dan halaman kasir.

### Hasil

Struktur proyek yang digunakan menjadi:

```text
Project/
├── images/
├── Sistem_Menu/
│   ├── css/
│   │   └── style.css
│   ├── dashboard.html
│   ├── index.html
│   ├── kasir.js
│   ├── login.html
│   ├── pelanggan.js
│   └── struk.html
├── .env
├── package-lock.json
├── package.json
├── readme.md
└── server.js
```

### Validasi & Modifikasi Mandiri

Kode dari AI diperiksa dan disesuaikan dengan struktur proyek yang digunakan.

Nama variabel, lokasi file, endpoint, tampilan, dan alur program dimodifikasi agar sesuai dengan rancangan proyek.

Struktur folder juga beberapa kali disesuaikan selama proses pengembangan agar lebih sederhana dan sesuai dengan kebutuhan deployment.

---

## 🐛 Tahap 3: Pemecahan Masalah & Penanganan Galat (Debugging)

### Interaksi dengan AI

AI digunakan untuk membantu mencari penyebab beberapa kesalahan selama pengembangan, seperti:

- Kesalahan pemanggilan file JavaScript.
- Error pada halaman dashboard kasir.
- Masalah login dan session kasir.
- Pengambilan data pesanan dari MongoDB.
- Pesanan gagal disimpan dengan status `500 Internal Server Error`.
- Masalah koneksi MongoDB melalui `MONGODB_URI`.
- Masalah Environment Variables saat deployment.
- Status pesanan yang tidak sesuai.
- Dashboard yang tidak menampilkan pesanan baru secara otomatis.
- Tombol `Selesai` yang belum memiliki fungsi.
- Perubahan status pesanan pada halaman struk pelanggan.

### Contoh Prompt

> Pesanan gagal disimpan dan muncul error 500 pada endpoint `/pesanan`. Tolong bantu mencari penyebabnya berdasarkan kode server dan pesan error yang muncul.

### Hasil

Beberapa perbaikan dilakukan, antara lain:

- 🔧 Memperbaiki path file JavaScript pelanggan.
- 🔐 Menambahkan pengecekan session untuk membatasi akses dashboard kasir.
- 🗄️ Memperbaiki koneksi MongoDB menggunakan `MONGODB_URI`.
- 🌐 Menyesuaikan Environment Variables untuk deployment.
- 🔄 Menggunakan polling untuk mengecek pesanan baru tanpa melakukan refresh seluruh halaman.
- 📋 Mengatur urutan pesanan berdasarkan waktu pembuatan sehingga pesanan yang masuk lebih dahulu dapat diproses lebih dahulu.
- ✅ Menambahkan endpoint untuk mengubah status pesanan.
- 🧾 Menampilkan perubahan status pesanan pada halaman struk.
- 🚀 Menyesuaikan server agar dapat dijalankan melalui Vercel.

### Validasi & Modifikasi Mandiri

Setiap solusi dari AI diuji menggunakan program yang sedang dibuat.

Jika solusi tidak sesuai dengan kondisi proyek, kode diubah atau disederhanakan.

Hasil akhir diperiksa melalui browser, console, server, dan database MongoDB sebelum digunakan.

Konfigurasi deployment juga diuji kembali setelah perubahan dilakukan untuk memastikan website dapat mengakses server dan database dengan benar.

---

## 🔍 Tahap 4: Refleksi & Penjelasan Kode

### Interaksi dengan AI

AI digunakan untuk membantu memahami fungsi kode yang telah dibuat, bukan hanya untuk menghasilkan kode.

Beberapa bagian yang dipelajari antara lain:

- Fungsi `fetch()` untuk komunikasi antara halaman web dan server.
- Fungsi `async` dan `await`.
- Penggunaan endpoint HTTP seperti `GET`, `POST`, dan `PUT`.
- Penggunaan Express.js sebagai server.
- Penggunaan MongoDB untuk menyimpan dan mengambil data.
- Penggunaan `ObjectId` untuk mencari data berdasarkan ID.
- Penggunaan session untuk login kasir.
- Penggunaan `setInterval()` untuk mengecek perubahan data secara berkala.
- Penggunaan Environment Variables untuk menyimpan konfigurasi seperti `MONGODB_URI`.

### Contoh Prompt

> Jelaskan alur kerja sistem pemesanan dari pelanggan mengirim pesanan sampai pesanan muncul di dashboard kasir. Jelaskan juga fungsi fetch, endpoint POST, MongoDB, dan session pada program.

### Hasil

Tim dapat memahami hubungan antara halaman pelanggan, server, dan database.

Data yang dikirim pelanggan dikirim melalui request `POST` ke server, kemudian disimpan di MongoDB. Data tersebut dapat diambil kembali oleh dashboard kasir.

Kasir dapat mengubah status pesanan melalui request `PUT`, kemudian perubahan status tersebut dapat ditampilkan kembali pada halaman struk pelanggan.

### Validasi & Modifikasi Mandiri

Penjelasan dari AI dibandingkan dengan hasil pengujian program dan kode yang digunakan dalam proyek.

Kode tidak hanya digunakan berdasarkan jawaban AI, tetapi dipelajari kembali agar anggota tim memahami fungsi setiap bagian yang digunakan.

Apabila terdapat penjelasan atau kode yang tidak sesuai dengan kondisi proyek, bagian tersebut diperiksa kembali dan disesuaikan secara mandiri.

---

## 📌 Kesimpulan

AI digunakan sebagai alat bantu selama proses perancangan, penyusunan kode, debugging, deployment, dan pemahaman program.

AI membantu memberikan alternatif solusi dan penjelasan selama proses pengembangan, tetapi setiap saran tetap diperiksa, diuji, dan disesuaikan dengan kebutuhan proyek sebelum diterapkan.

Dengan proses tersebut, penggunaan AI tidak hanya digunakan untuk menghasilkan kode, tetapi juga membantu anggota tim memahami cara kerja program yang dibuat.
