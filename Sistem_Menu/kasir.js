/*==================================================================================================*/
/*                                           AREA LOGIN                                             */
/*==================================================================================================*/

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const pesanLogin =
            document.getElementById("pesanLogin");

        try {

            const response =
                await fetch("/login-kasir", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

            const hasil =
                await response.json();

            if (hasil.success) {

                pesanLogin.innerText =
                    "Login berhasil.";

                window.location.href =
                    "/kasir/dashboard.html";

            } else {

                pesanLogin.innerText =
                    hasil.message;

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


        /*==========================================================================================*/
        /*                                      JUMLAH PESANAN                                       */
        /*==========================================================================================*/

        const jumlahPesanan =
            document.getElementById("jumlahPesanan");

        if (jumlahPesanan) {

            jumlahPesanan.textContent =
                data.length;

        }


        /*==========================================================================================*/
        /*                                      TAMPILKAN DATA                                       */
        /*==========================================================================================*/

        container.innerHTML = "";


        if (data.length === 0) {

            container.innerHTML =
                "<p>Belum ada pesanan.</p>";

            return;

        }


        data.forEach(pesanan => {

            const divPesanan =
                document.createElement("div");

            divPesanan.className =
                "pesanan";

            divPesanan.dataset.id =
                pesanan._id;


            /*======================================================================================*/
            /*                                      ITEM PESANAN                                     */
            /*======================================================================================*/

            let htmlItem = "";

            pesanan.items.forEach(item => {

                htmlItem += `
                    <div class="item-list">
                        🍽️ ${item.nama}
                        x${item.jumlah}
                    </div>
                `;

            });


            /*======================================================================================*/
            /*                                    TAMPILKAN PESAN                                    */
            /*======================================================================================*/

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

        console.error(
            "Gagal mengambil pesanan:",
            error
        );

    }

}


/*==================================================================================================*/
/*                                      SELESAIKAN PESANAN                                         */
/*==================================================================================================*/

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


        /*==========================================================================================*/
        /*                                HAPUS PESANAN DARI LAYAR                                  */
        /*==========================================================================================*/

        const pesanan =
            document.querySelector(
                `[data-id="${id}"]`
            );

        if (pesanan) {

            pesanan.remove();

        }


        /*==========================================================================================*/
        /*                                    UPDATE JUMLAH                                          */
        /*==========================================================================================*/

        const jumlahPesanan =
            document.getElementById(
                "jumlahPesanan"
            );

        if (jumlahPesanan) {

            let jumlah =
                parseInt(
                    jumlahPesanan.textContent
                ) || 0;

            jumlahPesanan.textContent =
                Math.max(0, jumlah - 1);
        }


        const jumlahSelesai =
            document.getElementById(
                "jumlahSelesai"
            );

        if (jumlahSelesai) {

            let jumlah =
                parseInt(
                    jumlahSelesai.textContent
                ) || 0;

            jumlahSelesai.textContent =
                jumlah + 1;

        }


        /*==========================================================================================*/
        /*                              CEK APAKAH MASIH ADA PESANAN                                 */
        /*==========================================================================================*/

        const container =
            document.getElementById(
                "daftarPesanan"
            );

        if (
            container &&
            container.children.length === 0
        ) {

            container.innerHTML =
                "<p>Belum ada pesanan.</p>";
        }

    } catch (error) {

        console.error(error);

        alert(
            "Gagal menyelesaikan pesanan."
        );

    }

}


/*==================================================================================================*/
/*                                      AUTO REFRESH PESANAN                                        */
/*==================================================================================================*/

// Tampilkan pesanan saat dashboard pertama kali dibuka
tampilkanPesanan();


// Cek pesanan baru setiap 10 detik
setInterval(() => {

    tampilkanPesanan();

}, 10000);
