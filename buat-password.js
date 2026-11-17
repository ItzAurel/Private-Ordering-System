const bcrypt = require("bcrypt");



// P🛑🛑🛑 ERHATIKAN BARIS INI 🛑🛑🛑
// =====================================================================================
const username = "USERNAME";  // Ganti menjadi username-mu. Misal "Kasir"              |
const password = "PASSWORD";  // Ganti menjadi password pilihanmu Misal "Login#1234"   |
// =====================================================================================




bcrypt.hash(password, 10, (err, hash) => {

    if (err) {
        console.error(err);
        return;
    }

    console.log("=== AKUN KASIR ===");
    console.log("Username :", username);
    console.log("Password :", password);
    console.log("Hash     :", hash);

});
