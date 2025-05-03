# 🔐 Extract Private Keys

> Node.js script untuk mengekstrak semua `privateKey` dari file JSON dan menyimpannya ke `privatekey.txt` — cepat, mudah, dan otomatis! 🚀

---

## 📋 Fitur

* 🔍 Mencari `privateKey` secara **rekursif** di struktur JSON apapun
* 📄 Menyimpan semua key ke dalam file `privatekey.txt`, satu per baris
* ⚠️ Peringatan otomatis jika tidak menemukan `privateKey`

---

## 🛠️ Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/username/extract-privatekeys.git
   ```
2. Masuk ke direktori proyek:

   ```bash
   cd extract-privatekeys
   ```
3. Install dependencies (hanya built-in Node.js, no extra packages!):

   ```bash
   npm init -y
   ```

   *atau* jika sudah punya `package.json`:

   ```bash
   npm install
   ```

---

## 🚀 Cara Pakai

1. Pastikan file `accounts.json` ada di folder proyek.
2. Jalankan script:

   ```bash
   node extractPrivateKeys.js
   ```
3. Hasil akan ditulis ke `privatekey.txt`:

   ```bash
   cat privatekey.txt
   ```

> Kalau mau menyesuaikan nama file input/output, edit baris akhir di `extractPrivateKeys.js`:
>
> ```js
> (async () => {
>   await exportPrivateKeys('accounts.json', 'privatekey.txt');
> })();
> ```

---

## 💡 Tips & Trik

* 🛠️ **Custom path**: Ubah parameter `exportPrivateKeys()` untuk menggunakan path lain.
* 📝 **Format JSON**: Pastikan JSON valid—gunakan [JSONLint](https://jsonlint.com/) jika error parsing.
* 🐛 Tambah `console.log(parsed)` di dalam script untuk debugging.

---

## ❤️ Kontribusi

Pull request selalu diterima! Jangan lupa star ⭐ jika bermanfaat.

---

## 📄 Lisensi

MIT © \[Your Name]
