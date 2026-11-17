/*==================================================================================================*/
/*                                        NOTIFIKASI PUSH                                           */
/*==================================================================================================*/

function tampilkanNotifikasi(pesan, tipe = "error") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-notif ${tipe}`;

    const ikon = tipe === "success" ? "✅" : "⚠️";
    toast.innerHTML = `
        <span class="toast-icon">${ikon}</span>
        <span class="toast-text">${pesan}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");
        toast.addEventListener("transitionend", () => {
            toast.remove();
        });
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 400);
    }, 3000);
}

/*==================================================================================================*/
/*                                          AREA PEMESANAN                                          */
/*==================================================================================================*/

function hitungTotal() {
    let total = 0;
    const items = document.querySelectorAll('.menu-qty');
            
        items.forEach(item => {
                const harga = parseInt(item.getAttribute('data-harga'));
                const jumlah = parseInt(item.value) || 0;
                total += harga * jumlah;
        });

            document.getElementById('totalHarga').innerText = 'Rp ' + total.toLocaleString('id-ID');
            return total;
        }

async function prosesPesan() {
    const pemesan = document.getElementById('nomorMeja').value;
    const total = hitungTotal();

    if (!pemesan) {
        tampilkanNotifikasi('Silakan isi Nomor Meja terlebih dahulu bambang!', 'error');
        return;
    }

    if (total === 0) {
        tampilkanNotifikasi('Pilih minimal 1 menu sebelum memesan. Lu kesini sebenernya mau ngapain dah?', 'error');
        return;
    }

    let rincianPesanan = [];
    const items = document.querySelectorAll('.menu-qty');
    items.forEach(item => {
        const jumlah = parseInt(item.value) || 0;
        if (jumlah > 0) {
                rincianPesanan.push({
                id_menu: item.getAttribute('data-id'),
                nama: item.getAttribute('data-nama'),
                jumlah: jumlah,
                subtotal: parseInt(item.getAttribute('data-harga')) * jumlah
            });
        }
    });


    // Buat objek pesanan
    const dataPesanan = {
    nomorMeja: pemesan,
    items: rincianPesanan,
    totalHarga: total,
    status: "Diproses"
};

try {

    const response = await fetch(
        "/pesanan",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataPesanan)
        }
    );

    const hasil = await response.json();

    if (hasil.success) {

        tampilkanNotifikasi("Pesanan berhasil dikirim!", "success");

        setTimeout(() => {
            window.location.href = `/struk.html?id=${hasil.id}`;
        }, 1200);

    } else {

        tampilkanNotifikasi("Gagal menyimpan pesanan.", "error");

    }

} catch (error) {

    console.error(error);

    tampilkanNotifikasi("Gagal terhubung ke server.", "error");

}

}

function tampilkanPesanan() {
    const container = document.getElementById("hasilPesanan");

    let html = "";

    document.querySelectorAll(".menu-qty").forEach(item => {
        const qty = parseInt(item.value);
        const nama = item.dataset.nama;

        if (qty > 0) {
            html += `
                <div class="item-pesanan">
                    - ${nama} x${qty} <br>
                </div>
            `;
        }
    });

    container.innerHTML = html || "Belum ada pesanan";
}






/*==================================================================================================*/
/*                                         STRUK PEMESANAN                                          */
/*==================================================================================================*/

async function tampilkanStruk() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("daftarPesanan").innerText =
            "ID pesanan tidak ditemukan.";
        return;
    }

    try {

        const response = await fetch(`/pesanan/${id}`);

        const hasil = await response.json();

        if (!hasil.success) {
            document.getElementById("daftarPesanan").innerText =
                "Pesanan tidak ditemukan.";
            return;
        }

        const pesanan = hasil.data;

        document.getElementById("nomorMeja").innerText =
            pesanan.nomorMeja;

        document.getElementById("statusPesanan").innerText =
            pesanan.status;

        document.getElementById("totalHarga").innerText =
            "Rp " + pesanan.totalHarga.toLocaleString("id-ID");

        let html = "";

        pesanan.items.forEach(item => {

           html += `
<div class="item-pesanan">

    <div class="item-info">
        <strong>🍽️ ${item.nama}</strong>
        <small>${item.jumlah} porsi</small>
    </div>

    <div class="item-price">
        Rp ${item.subtotal.toLocaleString("id-ID")}
    </div>

</div>
`;
        });

        document.getElementById("daftarPesanan").innerHTML =
            html;

    } catch (error) {

        console.error(error);

        document.getElementById("daftarPesanan").innerText =
            "Gagal mengambil data pesanan.";

    }
}

async function cekStatusPesanan() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        return;
    }

    try {

        const response = await fetch(`/pesanan/${id}`);
        const hasil = await response.json();

        if (!hasil.success) {
            return;
        }

        const status = hasil.data.status;
        const statusPesanan = document.getElementById("statusPesanan");

        if (!statusPesanan) {
            return;
        }

        if (status === "Diproses") {

            statusPesanan.innerText =
                "Pesanan sedang diproses...";

        }

        else if (status === "Selesai") {

            statusPesanan.innerText =
                "Siap diantar ke meja";

        }

    } catch (error) {

        console.error("Gagal mengecek status:", error);

    }
}

const btnKirim =
document.getElementById("kirimPesanan");

if(btnKirim){

    btnKirim.addEventListener("click", () => {

        btnKirim.innerHTML =
        "✅ Pesanan Terkirim";

        btnKirim.style.background =
        "#27ae60";

        setTimeout(() => {

            btnKirim.innerHTML =
            "🍽️ Kirim Pesanan ke Kasir";

            btnKirim.style.background =
            "linear-gradient(135deg,#ff5722,#ff9800)";

        }, 2000);

    });

}
function ubahQty(button, perubahan) {

    const input =
        button.parentElement
              .querySelector(".menu-qty");

    let jumlah =
        parseInt(input.value) || 0;

    jumlah += perubahan;

    if (jumlah < 0) {
        jumlah = 0;
    }

    input.value = jumlah;

    hitungTotal();
    tampilkanPesanan();
}
cekStatusPesanan();

setInterval(cekStatusPesanan, 10000);
