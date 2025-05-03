// extractPrivateKeys.js

const fs = require('fs');
const path = require('path');

/**
 * Recursively mencari semua nilai privateKey di dalam objek.
 * @param {Object} obj - Objek JSON yang akan di-scan.
 * @returns {string[]} Array daftar privateKey.
 */
function findPrivateKeys(obj) {
  let keys = [];
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (k.toLowerCase() === 'privatekey' && typeof v === 'string') {
        keys.push(v);
      } else if (typeof v === 'object' && v !== null) {
        keys = keys.concat(findPrivateKeys(v));
      }
    }
  }
  return keys;
}

async function exportPrivateKeys(jsonFile, outputFile) {
  try {
    // 1. Tentukan path ke file input & output
    const inputPath = path.resolve(__dirname, jsonFile);
    const outputPath = path.resolve(__dirname, outputFile);

    // 2. Baca dan parse JSON
    const rawData = await fs.promises.readFile(inputPath, 'utf8');
    const parsed = JSON.parse(rawData);

    // 3. Temukan semua privateKey secara rekursif
    const privateKeys = findPrivateKeys(parsed);

    if (privateKeys.length === 0) {
      console.warn(`Tidak ada privateKey yang ditemukan di ${jsonFile}`);
      return;
    }

    // 4. Tulis hasil ke file, setiap key pada baris baru
    const fileContent = privateKeys.join('\n');
    await fs.promises.writeFile(outputPath, fileContent, 'utf8');

    console.log(`Berhasil menulis ${privateKeys.length} privateKey ke ${outputFile}`);
  } catch (err) {
    console.error('Error saat memproses file:', err.message);
  }
}

// Jalankan fungsi, ganti nama file jika perlu
e (async () => {
  await exportPrivateKeys('accounts.json', 'privatekey.txt');
})();
