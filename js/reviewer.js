/**
 * File: js/reviewer.js
 * Deskripsi: Logika interaktif Dashboard Reviewer LPPM UMSU & RisetMu
 */

// Data Usulan yang Ditugaskan ke Reviewer
const REVIEW_PROPOSALS = {
  1: {
    id: 1,
    title: "Implementasi Deep Learning Multi-Modal untuk Deteksi Dini Penyakit Tanaman Padi Berbasis Citra Multispektral Drone",
    scheme: "Penelitian Fundamental Reguler",
    dana: "Rp 48.500.000",
    deadline: "15 Nov 2026 (H-3)",
    scores: { c1: 0, c2: 0, c3: 0, c4: 0 },
    notes: { c1: "", c2: "", c3: "", c4: "", general: "" },
    status: "pending"
  },
  2: {
    id: 2,
    title: "Pemberdayaan Kelompok Tani Mandiri melalui Penerapan Smart Irrigation System dan Manajemen Rantai Pasok Berkelanjutan",
    scheme: "Pengabdian Kemitraan Masyarakat",
    dana: "Rp 35.000.000",
    deadline: "20 Nov 2026 (H-8)",
    scores: { c1: 85, c2: 88, c3: 82, c4: 0 },
    notes: { c1: "Latar belakang kuat", c2: "Metode teruji", c3: "RAB rasional", c4: "", general: "Usulan sangat potensial." },
    status: "draft"
  },
  3: {
    id: 3,
    title: "Pengembangan Sistem Telemedicine Syariah Berbasis Enkripsi Kuantum untuk Kerahasiaan Rekam Medis Rumah Sakit Muhammadiyah",
    scheme: "Penelitian Terapan Unggulan",
    dana: "Rp 65.000.000",
    deadline: "25 Nov 2026 (H-13)",
    scores: { c1: 80, c2: 78, c3: 0, c4: 0 },
    notes: { c1: "Konsep menarik", c2: "Perlu uji klinis", c3: "", c4: "", general: "" },
    status: "draft"
  },
  4: {
    id: 4,
    title: "Pelatihan Literasi Keuangan Digital dan Kurasi Produk Halal bagi Pelaku UMKM Aisyiyah Cabang Medan Denai",
    scheme: "Pengabdian Persyarikatan",
    dana: "Rp 25.000.000",
    deadline: "Selesai",
    scores: { c1: 90, c2: 88, c3: 92, c4: 88 },
    notes: { c1: "Sangat relevan", c2: "Mitra siap", c3: "Efisien", c4: "Luaran jelas", general: "Rekomendasi lolos 100%." },
    status: "done"
  }
};

let currentReviewId = 1;

document.addEventListener('DOMContentLoaded', () => {
  initReviewerTabs();
  initReviewSearch();
});

// Switch Filter antara 'Review Usulan' dan 'Evaluasi Laporan'
function initReviewerTabs() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-filter');
      const usulanContainer = document.getElementById('reviewUsulanList');
      const laporanContainer = document.getElementById('evaluasiLaporanList');

      if (filterType === 'usulan') {
        if (usulanContainer) usulanContainer.style.display = 'flex';
        if (laporanContainer) laporanContainer.style.display = 'none';
        showToast('Menampilkan daftar Review Usulan Baru (4 tugas)', 'info');
      } else {
        if (usulanContainer) usulanContainer.style.display = 'none';
        if (laporanContainer) laporanContainer.style.display = 'flex';
        showToast('Menampilkan daftar Evaluasi Laporan Kemajuan (2 tugas)', 'info');
      }
    });
  });
}

// Buka Modal Penilaian Proposal
function openModalPenilaian(id) {
  currentReviewId = id;
  const prop = REVIEW_PROPOSALS[id];
  if (!prop) return;

  document.getElementById('modalReviewTitle').textContent = prop.title;
  document.getElementById('modalReviewScheme').textContent = prop.scheme;
  document.getElementById('modalReviewDana').textContent = prop.dana;

  // Set nilai form
  document.getElementById('scoreC1').value = prop.scores.c1 || '';
  document.getElementById('scoreC2').value = prop.scores.c2 || '';
  document.getElementById('scoreC3').value = prop.scores.c3 || '';
  document.getElementById('scoreC4').value = prop.scores.c4 || '';

  document.getElementById('catatanC1').value = prop.notes.c1 || '';
  document.getElementById('catatanC2').value = prop.notes.c2 || '';
  document.getElementById('catatanC3').value = prop.notes.c3 || '';
  document.getElementById('catatanC4').value = prop.notes.c4 || '';
  document.getElementById('catatanUmum').value = prop.notes.general || '';

  // Mode lihat penilaian jika sudah terkirim
  const isDone = prop.status === 'done';
  document.getElementById('btnSubmitPenilaian').style.display = isDone ? 'none' : 'inline-flex';
  document.getElementById('btnSaveDraftPenilaian').style.display = isDone ? 'none' : 'inline-flex';
  document.getElementById('modalPenilaianTagStatus').textContent = isDone ? 'Status: SUDAH TERKIRIM (FINAL)' : 'Status: PENILAIAN DRAF';

  calculateTotalScore();

  const modal = document.getElementById('modalPenilaian');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModalPenilaian() {
  const modal = document.getElementById('modalPenilaian');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Hitung total skor terbobot otomatis
function calculateTotalScore() {
  const c1 = parseFloat(document.getElementById('scoreC1').value) || 0;
  const c2 = parseFloat(document.getElementById('scoreC2').value) || 0;
  const c3 = parseFloat(document.getElementById('scoreC3').value) || 0;
  const c4 = parseFloat(document.getElementById('scoreC4').value) || 0;

  // Bobot: C1(25%), C2(30%), C3(20%), C4(25%)
  const total = (c1 * 0.25) + (c2 * 0.30) + (c3 * 0.20) + (c4 * 0.25);
  const formatted = total.toFixed(1);

  document.getElementById('totalScoreDisplay').textContent = formatted;

  const verdict = document.getElementById('verdictDisplay');
  if (total >= 80) {
    verdict.textContent = "DIREKOMENDASIKAN (SANGAT BAIK)";
    verdict.style.color = "#10b981";
  } else if (total >= 70) {
    verdict.textContent = "DIPERTIMBANGKAN DENGAN REVISI";
    verdict.style.color = "#f59e0b";
  } else if (total > 0) {
    verdict.textContent = "TIDAK DIREKOMENDASIKAN";
    verdict.style.color = "#ef4444";
  } else {
    verdict.textContent = "BELUM DINILAI";
    verdict.style.color = "#94a3b8";
  }
}

// Simpan Draf
function saveDraftPenilaian() {
  const prop = REVIEW_PROPOSALS[currentReviewId];
  if (prop) {
    prop.scores.c1 = parseFloat(document.getElementById('scoreC1').value) || 0;
    prop.scores.c2 = parseFloat(document.getElementById('scoreC2').value) || 0;
    prop.scores.c3 = parseFloat(document.getElementById('scoreC3').value) || 0;
    prop.scores.c4 = parseFloat(document.getElementById('scoreC4').value) || 0;
    prop.status = 'draft';
  }
  closeModalPenilaian();
  showToast('Draf penilaian berhasil disimpan otomatis!', 'success');
}

// Kirim Penilaian Final ke LPPM
function submitPenilaianFinal() {
  const c1 = parseFloat(document.getElementById('scoreC1').value) || 0;
  const c2 = parseFloat(document.getElementById('scoreC2').value) || 0;
  const c3 = parseFloat(document.getElementById('scoreC3').value) || 0;
  const c4 = parseFloat(document.getElementById('scoreC4').value) || 0;

  if (c1 === 0 || c2 === 0 || c3 === 0 || c4 === 0) {
    alert('Harap lengkapi nilai untuk semua 4 kriteria sebelum mengirimkan penilaian final.');
    return;
  }

  if (!confirm('Apakah Anda yakin ingin mengirimkan penilaian final ini ke LPPM? Penilaian yang sudah dikirim tidak dapat diubah kembali.')) {
    return;
  }

  const prop = REVIEW_PROPOSALS[currentReviewId];
  if (prop) {
    prop.status = 'done';
    prop.scores = { c1, c2, c3, c4 };
  }

  closeModalPenilaian();
  showToast('Penilaian berhasil dikirimkan ke Komite LPPM UMSU!', 'success');

  // Perbarui UI pada kartu jika ada
  setTimeout(() => {
    window.location.reload();
  }, 1200);
}

// Modal Konflik Kepentingan
function openModalKonflik() {
  const modal = document.getElementById('modalKonflik');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModalKonflik() {
  const modal = document.getElementById('modalKonflik');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function submitKonflikForm(e) {
  e.preventDefault();
  closeModalKonflik();
  showToast('Deklarasi konflik kepentingan berhasil dicatat. Usulan dialihkan ke reviewer lain.', 'success');
}

// Modal Panduan Rubrik
function openModalPanduanRubrik() {
  const modal = document.getElementById('modalRubrikFull');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModalPanduanRubrik() {
  const modal = document.getElementById('modalRubrikFull');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Pencarian di Riwayat Review
function initReviewSearch() {
  const searchInput = document.getElementById('searchReviewHistory');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#tabelRiwayatReview tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(val) ? '' : 'none';
    });
  });
}
