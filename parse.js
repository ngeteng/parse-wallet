// extractPrivateKeys.js

const fs = require('fs');
const path = require('path');

async function exportPrivateKeys(jsonFile, outputFile) {
  try {
    // 1. Tentukan path ke file accounts.json dan privatekey.txt
    const inputPath = path.resolve(__dirname, jsonFile);
    const outputPath = path.resolve(__dirname, outputFile);

    // 2. Baca dan parse JSON
    const rawData = await fs.promises.readFile(inputPath, 'utf8');
    const accounts = JSON.parse(rawData);

    // 3. Ekstrak semua privateKey
    const privateKeys = accounts.map(acc => acc.privateKey).filter(Boolean);

    if (privateKeys.length === 0) {
      console.warn('Tidak ada privateKey yang ditemukan di', jsonFile);
      return;
    }

    // 4. Gabungkan dengan newline dan tulis ke file
    const fileContent = privateKeys.join('\n');
    await fs.promises.writeFile(outputPath, fileContent, 'utf8');

    console.log(`Berhasil menulis ${privateKeys.length} privateKey ke ${outputFile}`);
  } catch (err) {
    console.error('Error saat memproses file:', err.message);
  }
}

// Jalankan fungsi dengan nama file input & output
(async () => {
  await exportPrivateKeys('accounts.json', 'privatekey.txt');
})();
