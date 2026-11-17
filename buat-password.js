require("dotenv").config();

const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new MongoClient(process.env.MONGODB_URI);

function tanya(pertanyaan) {
    return new Promise((resolve) => {
        rl.question(pertanyaan, resolve);
    });
}

async function buatAkun() {

    try {

        console.log("=== BUAT AKUN KASIR ===\n");

        const username = await tanya("Username: ");
        const password = await tanya("Password: ");

        if (!username || !password) {

            console.log("\n❌ Username dan password wajib diisi.");

            return;
        }

        console.log("\n🔄 Menghubungkan ke MongoDB...");

        await client.connect();

        const db = client.db("restoran");
        const koleksi = db.collection("kasir");

        // Cek username
        const akunAda = await koleksi.findOne({
            username: username
        });

        if (akunAda) {

            console.log("\n❌ Username sudah digunakan.");

            return;
        }

        // Hash password
        const hash = await bcrypt.hash(
            password,
            10
        );

        // Simpan akun
        await koleksi.insertOne({
            username: username,
            password: hash
        });

        console.log("\n✅ Akun kasir berhasil dibuat!");
        console.log("Username :", username);
        console.log("Password :", password);

    } catch (error) {

        console.error(
            "\n❌ Gagal membuat akun:",
            error.message
        );

    } finally {

        await client.close();
        rl.close();

    }

}

buatAkun();
