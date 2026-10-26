/**
 * Modul Tahap 3: Rencana Anggaran Belanja (RAB) - LPPM UMSU & RisetMu
 * Sesuai Standar Resmi BIMA / SIMLITABMAS Kemdikbudristek
 * File: js/rab.js
 */

// Katalog Kelompok & Komponen RAB Sesuai Screenshot Resmi BIMA
const rabKatalog = {
  "Bahan": [
    "ATK",
    "Barang Persediaan",
    "Bahan Penelitian (Habis Pakai)"
  ],
  "Sewa Peralatan": [
    "Transport Penelitian",
    "Ruang Penunjang Penelitian",
    "Peralaran Penelitian",
    "Kebun Percobaan",
    "Obyek Penelitian"
  ],
  "Pengumpulan Data": [
    "Penginapan",
    "Biaya Konsumsi",
    "HR Sekretariat/Administrasi Peneliti",
    "Tiket",
    "Uang Harian Rapat di dalam Kantor",
    "HR Petugas Survei",
    "FGD Persiapan Penelitian",
    "HR Pembantu Lapangan",
    "Transport",
    "HR Pembantu Peneliti",
    "Uang Harian Rapat di luar Kantor",
    "Uang Harian"
  ],
  "Pelaporan": [
    "Biaya Pembuatan Dokumen Uji Produk",
    "Biaya Pembuatan Dokumen Feasibility Study",
    "Biaya Seminar Internasional",
    "Publikasi Artikel di Jurnal Internasional",
    "HR Sekretariat/Administrasi Peneliti",
    "Biaya Pembuatan Dokumen Bussiness-plan",
    "Biaya Luaran Iptek Lainnya (Purwa rupa, TTG dll)",
    "Luaran KI (paten, hak cipta dll)",
    "Uang Harian Rapat di dalam Kantor",
    "Biaya Seminar Nasional",
    "Biaya Publikasi Artikel di Jurnal Nasional",
    "Biaya Konsumsi Rapat",
    "Biaya Penyusunan Buku Termasuk Book Chapter",
    "Uang Harian Rapat di luar Kantor"
  ],
  "Analisis Data": [
    "Transport Lokal",
    "HR Sekretariat/Administrasi Peneliti",
    "Tiket",
    "Biaya Analisis Sampel",
    "Biaya Konsumsi Rapat",
    "Penginapan",
    "Honorium Narasumber",
    "HR Pengolah Data",
    "Uang Harian"
  ]
};

// Data list item RAB (Default kosong, tidak ada baris dummy '-')
let rabItems = [];

let editingRabId = null;

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  restoreRabFromStorage();
  renderRabTable();
});

// Format Mata Uang IDR
function formatRupiah(num) {
  const val = Number(num) || 0;
  return 'Rp ' + val.toLocaleString('id-ID');
}

// Render Tabel RAB
function renderRabTable() {
  const tbody = document.getElementById('rabTableBody');
  const totalCell = document.getElementById('tableTotalHarga');
  const alertTotal = document.getElementById('alertTotalDirencanakan');
  const progressBar = document.getElementById('budgetProgressBar');
  const statusBadge = document.getElementById('budgetStatusBadge');
  const maxDana = 10000000; // Rp 10.000.000 / Tahun

  if (!tbody) return;

  // Filter hanya item yang valid (bukan item kosong dummy)
  const validItems = rabItems.filter(item => 
    (item.komponen && item.komponen.trim() !== '') || 
    (item.item && item.item.trim() !== '') || 
    (Number(item.total) > 0)
  );

  if (validItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="rab-empty-state">
          <div class="rab-empty-content">
            <div class="rab-empty-icon">
              <i class="fa-solid fa-receipt"></i>
            </div>
            <div class="rab-empty-text">
              <h5>Belum Ada Rincian Anggaran</h5>
              <p>Daftar pos belanja penelitian Tahun ke-1 masih kosong. Klik tombol di bawah untuk menambahkan item anggaran baru.</p>
            </div>
            <button type="button" class="btn-rab-primary" onclick="openModalTambahRab()">
              <i class="fa-solid fa-plus"></i>
              <span>Tambah Item Anggaran</span>
            </button>
          </div>
        </td>
      </tr>
    `;
    if (totalCell) totalCell.textContent = 'Rp 0';
    if (alertTotal) alertTotal.textContent = 'Rp 0';
    if (progressBar) progressBar.style.width = '0%';
    if (statusBadge) {
      statusBadge.className = 'budget-badge badge-safe';
      statusBadge.textContent = 'Sesuai Plafon';
    }
    return;
  }

  let totalKeseluruhan = 0;

  tbody.innerHTML = validItems.map((item, index) => {
    const itemTotal = Number(item.total) || 0;
    totalKeseluruhan += itemTotal;

    return `
      <tr data-id="${item.id}">
        <td>
          <div class="table-komponen-badge">${item.komponen || '-'}</div>
          ${item.kelompok ? `<span class="table-kelompok-tag">${item.kelompok}</span>` : ''}
        </td>
        <td>
          <div class="table-item-desc">${item.item || '-'}</div>
        </td>
        <td style="text-align: center;">
          <span class="table-satuan-pill">${item.satuan || '-'}</span>
        </td>
        <td style="text-align: center; font-weight: 700; color: #1e293b;">${item.volume || 0}</td>
        <td style="text-align: right; color: #475569;">${formatRupiah(item.harga)}</td>
        <td style="text-align: right; font-weight: 700; color: #0f172a;">${formatRupiah(item.total)}</td>
        <td style="text-align: center;">
          <div class="rab-opsi-actions">
            <button type="button" class="btn-rab-op btn-edit" title="Edit Item" onclick="editRabItem(${item.id})">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn-rab-op btn-del" title="Hapus Item" onclick="deleteRabItem(${item.id})">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (totalCell) totalCell.textContent = formatRupiah(totalKeseluruhan);
  if (alertTotal) alertTotal.textContent = formatRupiah(totalKeseluruhan);

  // Update Progress Bar & Status Badge
  const pct = Math.min(100, Math.round((totalKeseluruhan / maxDana) * 100));
  if (progressBar) {
    progressBar.style.width = pct + '%';
    if (totalKeseluruhan > maxDana) {
      progressBar.style.background = '#ef4444';
    } else {
      progressBar.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    }
  }

  if (statusBadge) {
    if (totalKeseluruhan > maxDana) {
      statusBadge.className = 'budget-badge badge-danger';
      statusBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Melebihi Plafon';
    } else if (totalKeseluruhan === maxDana) {
      statusBadge.className = 'budget-badge badge-warning';
      statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Plafon Maksimal';
    } else {
      statusBadge.className = 'budget-badge badge-safe';
      statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sesuai Plafon';
    }
  }
}

// Buka Modal Tambah RAB
function openModalTambahRab() {
  editingRabId = null;

  const modal = document.getElementById('modalTambahRab');
  const modalTitle = document.getElementById('modalRabTitle');
  if (modalTitle) modalTitle.textContent = 'Tambah RAB';

  // Reset form
  const selectTahun = document.getElementById('modalRabTahun');
  const selectKelompok = document.getElementById('modalRabKelompok');
  const selectKomponen = document.getElementById('modalRabKomponen');
  const inputItem = document.getElementById('modalRabItem');
  const selectSatuan = document.getElementById('modalRabSatuan');
  const inputVolume = document.getElementById('modalRabVolume');
  const inputHarga = document.getElementById('modalRabHarga');
  const inputTotal = document.getElementById('modalRabTotal');

  if (selectTahun) selectTahun.value = '1';
  if (selectKelompok) {
    selectKelompok.value = 'Sewa Peralatan';
    onKelompokChange();
  }
  if (selectKomponen) {
    selectKomponen.value = 'Peralaran Penelitian';
  }
  if (inputItem) inputItem.value = '';
  if (selectSatuan) selectSatuan.value = '';
  if (inputVolume) inputVolume.value = '1';
  if (inputHarga) inputHarga.value = '';
  if (inputTotal) inputTotal.value = 'Rp 0';

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Tutup Modal Tambah RAB
function closeModalRab() {
  const modal = document.getElementById('modalTambahRab');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  editingRabId = null;
}

// Ketika Pilihan Kelompok Berubah -> Muat Komponen Terkait
function onKelompokChange() {
  const kelompok = document.getElementById('modalRabKelompok')?.value;
  const komponenSelect = document.getElementById('modalRabKomponen');
  if (!komponenSelect) return;

  if (!kelompok || !rabKatalog[kelompok]) {
    komponenSelect.innerHTML = '<option value="">-Pilih-</option>';
    return;
  }

  const list = rabKatalog[kelompok];
  komponenSelect.innerHTML = '<option value="">-Pilih-</option>' + 
    list.map(k => `<option value="${k}">${k}</option>`).join('');
}

// Hitung Otomatis Total (Volume * Harga Satuan)
function hitungModalRabTotal() {
  const volume = parseFloat(document.getElementById('modalRabVolume')?.value) || 0;
  const harga = parseFloat(document.getElementById('modalRabHarga')?.value) || 0;
  const total = volume * harga;

  const totalInput = document.getElementById('modalRabTotal');
  if (totalInput) {
    totalInput.value = formatRupiah(total);
  }
}

// Simpan Item RAB (Baru atau Edit)
function simpanRabItem() {
  const tahun = parseInt(document.getElementById('modalRabTahun')?.value) || 1;
  const kelompok = document.getElementById('modalRabKelompok')?.value;
  const komponen = document.getElementById('modalRabKomponen')?.value;
  const item = document.getElementById('modalRabItem')?.value.trim();
  const satuan = document.getElementById('modalRabSatuan')?.value;
  const volume = parseFloat(document.getElementById('modalRabVolume')?.value) || 0;
  const harga = parseFloat(document.getElementById('modalRabHarga')?.value) || 0;
  const total = volume * harga;

  if (!kelompok) {
    if (typeof showToast === 'function') showToast('Harap pilih Kelompok anggaran!', 'warning');
    document.getElementById('modalRabKelompok')?.focus();
    return;
  }

  if (!komponen) {
    if (typeof showToast === 'function') showToast('Harap pilih Komponen anggaran!', 'warning');
    document.getElementById('modalRabKomponen')?.focus();
    return;
  }

  if (!item) {
    if (typeof showToast === 'function') showToast('Harap isi deskripsi Item anggaran!', 'warning');
    document.getElementById('modalRabItem')?.focus();
    return;
  }

  if (!satuan) {
    if (typeof showToast === 'function') showToast('Harap pilih Satuan!', 'warning');
    document.getElementById('modalRabSatuan')?.focus();
    return;
  }

  if (volume <= 0) {
    if (typeof showToast === 'function') showToast('Volume harus lebih besar dari 0!', 'warning');
    document.getElementById('modalRabVolume')?.focus();
    return;
  }

  if (harga <= 0) {
    if (typeof showToast === 'function') showToast('Harga satuan harus lebih besar dari 0!', 'warning');
    document.getElementById('modalRabHarga')?.focus();
    return;
  }

  if (editingRabId !== null) {
    // Mode Update
    const idx = rabItems.findIndex(r => r.id === editingRabId);
    if (idx !== -1) {
      rabItems[idx] = {
        id: editingRabId,
        tahun,
        kelompok,
        komponen,
        item,
        satuan,
        volume,
        harga,
        total
      };
      if (typeof showToast === 'function') showToast('Item RAB berhasil diperbarui!', 'success');
    }
  } else {
    // Jika ada row kosong default (id: 1 dengan komponen kosong), replace saja
    if (rabItems.length === 1 && !rabItems[0].komponen && rabItems[0].total === 0) {
      rabItems = [];
    }

    // Mode Tambah Baru
    const newId = Date.now();
    rabItems.push({
      id: newId,
      tahun,
      kelompok,
      komponen,
      item,
      satuan,
      volume,
      harga,
      total
    });
    if (typeof showToast === 'function') showToast('Item RAB berhasil ditambahkan!', 'success');
  }

  saveRabToStorage();
  renderRabTable();
  closeModalRab();
}

// Edit Item RAB
function editRabItem(id) {
  const item = rabItems.find(r => r.id === id);
  if (!item) return;

  editingRabId = id;

  const modal = document.getElementById('modalTambahRab');
  const modalTitle = document.getElementById('modalRabTitle');
  if (modalTitle) modalTitle.textContent = 'Edit Rincian RAB';

  const selectTahun = document.getElementById('modalRabTahun');
  const selectKelompok = document.getElementById('modalRabKelompok');
  const selectKomponen = document.getElementById('modalRabKomponen');
  const inputItem = document.getElementById('modalRabItem');
  const selectSatuan = document.getElementById('modalRabSatuan');
  const inputVolume = document.getElementById('modalRabVolume');
  const inputHarga = document.getElementById('modalRabHarga');
  const inputTotal = document.getElementById('modalRabTotal');

  if (selectTahun) selectTahun.value = item.tahun || '1';
  if (selectKelompok) {
    selectKelompok.value = item.kelompok || 'Bahan';
    onKelompokChange();
  }
  if (selectKomponen) selectKomponen.value = item.komponen || '';
  if (inputItem) {
    if (item.item && !Array.from(inputItem.options).some(o => o.value === item.item)) {
      const opt = document.createElement('option');
      opt.value = item.item;
      opt.textContent = item.item;
      inputItem.appendChild(opt);
    }
    inputItem.value = item.item || '';
  }
  if (selectSatuan) selectSatuan.value = item.satuan || '';
  if (inputVolume) inputVolume.value = item.volume || '1';
  if (inputHarga) inputHarga.value = item.harga || '0';
  if (inputTotal) inputTotal.value = formatRupiah(item.total);

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Hapus Item RAB
function deleteRabItem(id) {
  if (confirm('Apakah Anda yakin ingin menghapus item anggaran ini?')) {
    rabItems = rabItems.filter(r => r.id !== id);
    saveRabToStorage();
    renderRabTable();
    if (typeof showToast === 'function') showToast('Item RAB berhasil dihapus!', 'info');
  }
}

// Collapse / Expand Card RAB
function toggleRabCollapse() {
  const body = document.getElementById('rabCardBody');
  const icon = document.getElementById('rabCollapseIcon');
  if (!body) return;

  if (body.style.display === 'none') {
    body.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    body.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

// Cetak / Print RAB Usulan
function cetakRabUsulan() {
  if (typeof showToast === 'function') showToast('Menyiapkan format cetak RAB Usulan...', 'info');
  setTimeout(() => {
    window.print();
  }, 400);
}

// Simpan Draf RAB ke LocalStorage
function simpanDrafRab() {
  saveRabToStorage();
  if (typeof showToast === 'function') {
    showToast('Draf Rencana Anggaran Belanja (RAB) berhasil disimpan!', 'success');
  }
}

function saveRabToStorage() {
  try {
    localStorage.setItem('risetmu_rab_items', JSON.stringify(rabItems));
  } catch (e) {
    // silent
  }
}

function restoreRabFromStorage() {
  try {
    const raw = localStorage.getItem('risetmu_rab_items');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        rabItems = parsed.filter(i => 
          (i.komponen && i.komponen.trim() !== '') || 
          (i.item && i.item.trim() !== '') || 
          (Number(i.total) > 0)
        );
      }
    }
  } catch (e) {
    // silent
  }
}

// Navigasi Antar Halaman
function kembaliKeTahap2() {
  window.location.href = 'subtansi-usulan.html';
}

function lanjutTahap4() {
  simpanDrafRab();
  if (typeof showToast === 'function') {
    showToast('Data RAB tersimpan. Menuju Tahap 4: Dokumen Pendukung...', 'success');
  }
  setTimeout(() => {
    window.location.href = 'dokumen-pendukung.html';
  }, 800);
}

