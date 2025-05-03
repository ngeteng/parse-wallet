import { readFile, writeFile } from 'fs/promises';

async function simpanDataKeFile() {
  try {
    
    const raw = await readFile('./account.json', 'utf8');
    const customers = JSON.parse(raw);

    const addresses = customers.map(c => c.address);
    const privateKey    = customers.map(c => c.privateKey);

    const addressText = addresses.join('\n');
    const phoneText   = privateKey.join('\n');

    await writeFile('./address.txt', addressText, 'utf8');
    console.log('✅ Semua alamat berhasil disimpan di address.txt');

    await writeFile('./privateKey.txt', phoneText, 'utf8');
    console.log('✅ Semua berhasil disimpan di privateKey.txt');

  } catch (err) {
    console.error('❌ Terjadi kesalahan:', err);
  }
}

simpanDataKeFile();
