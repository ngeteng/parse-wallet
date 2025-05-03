import { readFile, writeFile, access } from 'fs/promises';
import { constants } from 'fs';

const JSON_PATH    = './accounts.json';
const ADDRESS_PATH = './address.txt';
const PHONE_PATH   = './phone.txt';

async function simpanDataKeFile() {
  try {
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
      addresses = data
        .map(c => c.address || c.wallet?.address)
        .filter(Boolean);

      phones = data
        .map(c => c.privateKey != null ? String(c.privateKey) : null)
        .filter(Boolean);
    } else if (data && typeof data === 'object') {
      if (data.address) addresses.push(data.address);
      else if (data.wallet?.address) addresses.push(data.wallet.address);

      if (data.privateKey != null) phones.push(String(data.privateKey));
    }

    await writeFile(ADDRESS_PATH, addresses.join('\n'), 'utf8');
    console.log(`✅ address.txt dibuat dengan ${addresses.length} baris`);

    await writeFile(PHONE_PATH, phones.join('\n'), 'utf8');
    console.log(`✅ phone.txt dibuat dengan ${phones.length} baris`);
  } catch (err) {
    console.error('❌ Terjadi kesalahan saat memproses data:', err);
  }
}

simpanDataKeFile();
