let produkDipilih = "";

const varianData = {
  "Cheese Roll": ["Coklat", "Matcha", "Tiramisu"],
  "Kebab": ["Pedas", "Tidak Pedas"]
};

function pesan(namaProduk) {
  produkDipilih = namaProduk;
  document.getElementById("judulModal").innerText = `Pesan ${namaProduk}`;
  const select = document.getElementById("varian");
  select.innerHTML = "";

  // Menambahkan varian sesuai produk
  varianData[namaProduk].forEach(v => {
    const option = document.createElement("option");
    option.value = v;
    option.textContent = v;
    select.appendChild(option);
  });

  // Menyembunyikan opsi pembayaran dan QR section
  document.getElementById("pembayaran").classList.add("hidden");
  document.getElementById("qr-section").classList.add("hidden");
  document.getElementById("cash-section").classList.add("hidden");

  // Menampilkan modal
  document.getElementById("modal").classList.remove("hidden");

  // Menyembunyikan pilihan topping jika bukan Cheese Roll
  if (namaProduk === "Cheese Roll") {
    document.getElementById("toping-section").classList.remove("hidden");
  } else {
    document.getElementById("toping-section").classList.add("hidden");
  }

  // Menambahkan event listener untuk varian
  select.addEventListener("change", () => {
    document.getElementById("pembayaran").classList.remove("hidden");
  });
}

function pembayaran(metode) {
  if (metode === "cash") {
    document.getElementById("cash-section").classList.remove("hidden");
    document.getElementById("qr-section").classList.add("hidden");
  } else {
    document.getElementById("qr-section").classList.remove("hidden");
    document.getElementById("cash-section").classList.add("hidden");
  }
}

function kirimWA(isQR) {
  const varian = document.getElementById("varian").value;
  const jumlah = document.getElementById("jumlah").value;
  let toping = "";

  // Cek apakah topping dipilih untuk Cheese Roll
  if (produkDipilih === "Cheese Roll") {
    toping = document.getElementById("toping").value;
  }

  if (jumlah < 1) {
    alert("Jumlah minimal 1");
    return;
  }

  let pesan = `Halo! Saya ingin pesan ${produkDipilih} varian ${varian}, sebanyak ${jumlah} pcs.`;

  if (produkDipilih === "Cheese Roll" && toping) {
    pesan += ` Dengan topping ${toping}.`;
  }

  if (isQR) {

    pesan += " Saya akan membayar secara Qris.";
  } else {
    pesan += " Saya akan membayar secara cash.";
  }

  const encodedPesan = encodeURIComponent(pesan);
  const waURL = `https://wa.me/6281317768135?text=${encodedPesan}`;
  window.open(waURL, "_blank");
}

function tutupModal() {
  document.getElementById("modal").classList.add("hidden");
}
