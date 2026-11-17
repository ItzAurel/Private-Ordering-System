/*==================================================================================================*/
/*                                           AREA LOGIN                                             */
/*==================================================================================================*/

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const pesanLogin = document.getElementById("pesanLogin");

        try {

            const response = await fetch("/login-kasir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const hasil = await response.json();

            if (hasil.success) {

                pesanLogin.innerText = "Login berhasil.";

                window.location.href = "/kasir/dashboard.html";

            } else {

                pesanLogin.innerText = hasil.message;

            }

        } catch (error) {

            console.error(error);

            pesanLogin.innerText =
                "Gagal terhubung ke server.";

        }

    });

}


/*==================================================================================================*/
/*                                          AREA DASHBOARD                                          */
/*==================================================================================================*/

let pesananDitampilkan = new Set();

async function tampilkanPesanan() {

    const container =
        document.getElementById("daftarPesanan");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch("/pesanan");

        const hasil =
            await response.json();

        if (!hasil.success) {

            container.innerHTML =
                "<p>Gagal mengambil pesanan.</p>";

            return;
        }

        const data =
            hasil.data || [];

        const jumlahPesanan =
            document.getElementById(
                "jumlahPesanan"
            );

        const jumlahSelesai =
            document.getElementById(
                "jumlahSelesai"
            );

        if (jumlahPesanan) {
            jumlahPesanan.textContent =
                data.length;
        }

        if (!container.dataset.loaded) {
            container.innerHTML = "";
            container.dataset.loaded = "true";
        }

        if (data.length === 0) {

            container.innerHTML =
                "<p>Belum ada pesanan.</p>";

            return;
        }

        data.forEach(pesanan => {

            if (
                pesananDitampilkan.has(
                    pesanan._id
                )
            ) {
                return;
            }

            pesananDitampilkan.add(
                pesanan._id
            );

            const divPesanan =
                document.createElement("div");

            divPesanan.className =
                "pesanan";

            divPesanan.dataset.id =
                pesanan._id;

            let htmlItem = "";

            pesanan.items.forEach(item => {

                htmlItem += `
                    <div class="item-list">
                        🍽️ ${item.nama}
                        x${item.jumlah}
                    </div>
                `;

            });

            divPesanan.innerHTML = `

                <h3>
                    🪑 Meja
                    ${pesanan.nomorMeja}
                </h3>

                <div>
                    ${htmlItem}
                </div>

                <p>
                    <strong>
                        Total:
                        Rp ${pesanan.totalHarga.toLocaleString("id-ID")}
                    </strong>
                </p>

                <button
                    class="btn-selesai"
                    onclick="selesaikanPesanan('${pesanan._id}')"
                >
                    ✅ Selesaikan
                </button>

            `;

            container.appendChild(
                divPesanan
            );

        });

    } catch (error) {

        console.error(error);

    }
}

async function selesaikanPesanan(id) {

    try {

        const response =
            await fetch(
                `/pesanan/${id}`,
                {
                    method: "PUT"
                }
            );

        const hasil =
            await response.json();

        if (!hasil.success) {

            alert(
                hasil.message
            );

            return;
        }

        const pesanan =
            document.querySelector(
                `[data-id="${id}"]`
            );

        if (pesanan) {

            pesanan.remove();

            const jumlahPesanan =
                document.getElementById(
                    "jumlahPesanan"
                );

            jumlahPesanan.textContent =
                parseInt(
                    jumlahPesanan.textContent
                ) - 1;

            const jumlahSelesai =
                document.getElementById(
                    "jumlahSelesai"
                );

            jumlahSelesai.textContent =
                parseInt(
                    jumlahSelesai.textContent
                ) + 1;
        }

    } catch (error) {

        console.error(error);

        alert(
            "Gagal menyelesaikan pesanan."
        );

    }
}

tampilkanPesanan();

setInterval(
    tampilkanPesanan,
    10000
);
