import { readFile, writeFile, access } from 'fs/promises';
import { constants } from 'fs';

const JSON_PATH    = './accounts.json';
const ADDRESS_PATH = './address.txt';
const privateKey_PATH   = './privateKey.txt';

async function simpanDataKeFile() {
  try {
    // Pastikan file JSON ada dan bisa dibaca
    await access(JSON_PATH, constants.R_OK);
  } catch {
    console.error(`❌ File tidak ditemukan atau tidak bisa dibaca: ${JSON_PATH}`);
    process.exit(1);
  }

  try {
    const raw = await readFile(JSON_PATH, 'utf8');
    const data = JSON.parse(raw);

    let addresses = [];
    let phones = [];

    if (Array.isArray(data)) {
      // Jika JSON berupa array objek
      console.log(`Ditemukan array dengan ${data.length} item`);
      addresses = data
        .map(c => c.address || c.wallet?.address)
        .filter(Boolean);
      phones = data
        .map(c => c.privateKey)
        .filter(Boolean);
    } else if (typeof data === 'object' && data !== null) {
      // Jika JSON objek tunggal
      console.log('Ditemukan objek tunggal');
      if (data.address) addresses.push(data.address);
      else if (data.wallet?.address) addresses.push(data.wallet.address);

      if (data.phone) phones.push(data.phone);
    } else {
      console.warn('⚠️ Format JSON tidak didukung:', typeof data);
    }

    if (addresses.length === 0) console.warn('⚠️ Tidak ada address yang berhasil di-ekstrak');
    if (phones.length === 0)    console.warn('⚠️ Tidak ada phone yang berhasil di-ekstrak');

    // Tulis ke file
    await writeFile(ADDRESS_PATH, addresses.join('\n'), 'utf8');
    console.log(`✅ address.txt dibuat dengan ${addresses.length} baris`);

    await writeFile(privateKey_PATH, phones.join('\n'), 'utf8');
    console.log(`✅ phone.txt dibuat dengan ${phones.length} baris`);

  } catch (err) {
    console.error('❌ Terjadi kesalahan saat memproses data:', err);
  }
}

simpanDataKeFile();
