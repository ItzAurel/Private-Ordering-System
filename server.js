require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;


/*==================================================================================================*/
/*                                      MIDDLEWARE                                                  */
/*==================================================================================================*/

app.use(cors());

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || "rahasia-kasir",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

/*==================================================================================================*/
/*                                      FILE STATIC                                                 */
/*==================================================================================================*/

app.use(
    "/css",
    express.static(
        path.join(__dirname, "Sistem_Menu", "css")
    )
);

app.use(
    "/images",
    express.static(
        path.join(__dirname, "images")
    )
);


/*==================================================================================================*/
/*                                      KONEKSI MONGODB                                             */
/*==================================================================================================*/

let client = null;
let db = null;

async function koneksiMongoDB() {

    if (db) {
        return db;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI tidak ditemukan di Environment Variables.");
    }

    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    console.log("✅ MongoDB Connected");

    db = client.db("restoran");

    return db;
}

/*==================================================================================================*/
/*                                      LOGIN KASIR                                                  */
/*==================================================================================================*/

function harusLoginKasir(req, res, next) {

    if (!req.session.kasir) {
        return res.redirect("/kasir/login.html");
    }

    next();
}


/*==================================================================================================*/
/*                                      HALAMAN UTAMA                                                */
/*==================================================================================================*/

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "Sistem_Menu",
            "index.html"
        )
    );

});

app.get("/pelanggan.js", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "Sistem_Menu",
            "pelanggan.js"
        )
    );

});

app.get("/struk.html", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "Sistem_Menu",
            "struk.html"
        )
    );

});

/*==================================================================================================*/
/*                                      HALAMAN LOGIN                                                */
/*==================================================================================================*/

app.get("/kasir/login.html", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "Sistem_Menu",
            "login.html"
        )
    );

});


app.get("/kasir/kasir.js", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "Sistem_Menu",
            "kasir.js"
        )
    );

});


app.get(
    "/kasir/dashboard.html",
    harusLoginKasir,
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "Sistem_Menu",
                "dashboard.html"
            )
        );

    }
);

/*==================================================================================================*/
/*                                      LOGIN KASIR                                                  */
/*==================================================================================================*/

app.post("/login-kasir", async (req, res) => {

    try {

        const db = await koneksiMongoDB();

        const { username, password } = req.body;

        if (!username || !password) {

            return res.json({
                success: false,
                message: "Username dan password wajib diisi."
            });

        }

        const kasir = await db
            .collection("kasir")
            .findOne({
                username: username
            });

        if (!kasir) {

            return res.json({
                success: false,
                message: "Username atau password salah."
            });

        }

        const passwordCocok = await bcrypt.compare(
            password,
            kasir.password
        );

        if (!passwordCocok) {

            return res.json({
                success: false,
                message: "Username atau password salah."
            });

        }

        req.session.kasir = {
            username: kasir.username
        };

        return res.json({
            success: true,
            message: "Login berhasil."
        });

    }

    catch (error) {

        console.error("❌ Error login kasir:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server."
        });

    }

});


/*==================================================================================================*/
/*                                      AREA PESANAN                                                 */
/*==================================================================================================*/


// Simpan pesanan
app.post("/pesanan", async (req, res) => {

    try {

        const db = await koneksiMongoDB();

        const hasil = await db
            .collection("pesanan")
            .insertOne({
                ...req.body,
                createdAt: new Date()
            });

        res.json({
            success: true,
            id: hasil.insertedId
        });

    }

    catch (error) {

        console.error("❌ Error POST /pesanan:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// Ambil pesanan berdasarkan ID
app.get("/pesanan/:id", async (req, res) => {

    try {

        const db = await koneksiMongoDB();

        const data = await db
            .collection("pesanan")
            .findOne({
                _id: new ObjectId(req.params.id)
            });

        if (!data) {

            return res.status(404).json({
                success: false,
                message: "Pesanan tidak ditemukan"
            });

        }

        res.json({
            success: true,
            data: data
        });

    }

    catch (error) {

        console.error("❌ Error GET /pesanan/:id:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// Ambil pesanan yang masih diproses
app.get("/pesanan", harusLoginKasir, async (req, res) => {

    try {

        const db = await koneksiMongoDB();

        console.log("📥 Request GET /pesanan");
        console.log("👤 Session kasir:", req.session.kasir);

        const data = await db
            .collection("pesanan")
            .find({
                status: "Diproses"
            })
            .sort({
                createdAt: 1
            })
            .toArray();

        console.log("📦 Jumlah pesanan:", data.length);

        res.json({
            success: true,
            data: data
        });

    }

    catch (error) {

        console.error("❌ Error GET /pesanan:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// Selesaikan pesanan
app.put("/pesanan/:id", harusLoginKasir, async (req, res) => {

    try {

        const db = await koneksiMongoDB();

        const hasil = await db
            .collection("pesanan")
            .updateOne(
                {
                    _id: new ObjectId(req.params.id)
                },
                {
                    $set: {
                        status: "Selesai"
                    }
                }
            );

        if (hasil.matchedCount === 0) {

            return res.status(404).json({
                success: false,
                message: "Pesanan tidak ditemukan"
            });

        }

        res.json({
            success: true,
            message: "Pesanan berhasil diselesaikan"
        });

    }

    catch (error) {

        console.error("❌ Error PUT /pesanan/:id:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


/*==================================================================================================*/
/*                                      JALANKAN SERVER                                              */
/*==================================================================================================*/

// Untuk localhost
if (require.main === module) {

    app.listen(PORT, () => {

        console.log(
            `✅ Server berjalan di http://localhost:${PORT}`
        );

    });

}


// Untuk Vercel
module.exports = app;
