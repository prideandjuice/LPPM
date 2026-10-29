/**
 * File: js/pimpinan.js
 * Deskripsi: Logika Interaktif Dashboard Pimpinan - LPPM UMSU & RisetMu
 * Sesuai Peran: Pimpinan Universitas / Rektorat
 * Fitur: Pengesahan Hasil Seleksi LPPM, Penerbitan SK Rektor, Dossier Usulan, Monitoring Laporan & Capaian
 */

// Data Usulan Hasil Seleksi LPPM Siap Pengesahan
const PIMPINAN_PROPOSALS = {
  1: {
    id: 1,
    title: "Implementasi Deep Learning Multi-Modal untuk Deteksi Dini Penyakit Tanaman Padi Berbasis Citra Multispektral Drone",
    scheme: "Penelitian Fundamental Reguler",
    fakultas: "Fakultas Pertanian",
    prodi: "Agroteknologi",
    danaUsulan: "Rp 48.500.000",
    danaRekomendasi: "Rp 48.500.000",
    plenoScore: 89.5,
    rev1Score: 90.0,
    rev2Score: 89.0,
    durasi: "12 Bulan (1 Tahun)",
    tkt: "TKT 3 ke TKT 5",
    bidangFokus: "Pangan & Pertanian",
    tema: "Kecerdasan Buatan & Sensor Presisi Pertanian",
    topik: "Deteksi Dini Penyakit Tanaman Padi Berbasis AI",
    rumpun: "Ilmu Komputer / Informatika",
    ketua: "Dr. Ir. Siti Rahmah, M.T. (NIDN: 0115088201)",
    anggotaDosen: [
      "Rahmat Hidayat, S.P., M.Sc. (Dosen Agroteknologi UMSU)",
      "Nurul Farida, M.Kom. (Dosen Teknik Informatika UMSU)"
    ],
    anggotaMhs: [
      "Fajar Ramadhan (Mahasiswa NIM: 22018012)",
      "Annisa Tri Putri (Mahasiswa NIM: 22018045)"
    ],
    abstrak: "Penelitian ini mengembangkan arsitektur Convolutional Neural Network (CNN) multi-modal yang mengintegrasikan citra multispektral (Green, Red, Red-Edge, NIR) dari sensor drone dengan data mikroklimat tanah. Solusi ini mendeteksi gejala awal infeksi jamur Magnaporthe oryzae (penyakit blas) dan bakteri Xanthomonas oryzae (hawar daun) pada petak sawah secara presisi tinggi sebelum kerusakan menyebar luas. Solusi ini sangat mendukung kedaulatan pangan Sumatera Utara.",
    rekomendasiReviewer: "Rekomendasi Seleksi LPPM: Sangat Layak Didanai. Proposal memiliki novelty tinggi dan luaran Scopus Q2 terukur. Alokasi sewa drone dan GPU cloud server dinilai rasional.",
    targetLuaran: [
      "1 Artikel di Jurnal Internasional Bereputasi Terindeks Scopus Q2 (Target: Computers and Electronics in Agriculture)",
      "1 Hak Cipta Program Komputer: Aplikasi PadiSense v1.0",
      "1 Buku Monograf Ber-ISBN terbitan UMSU Press"
    ],
    naskahFile: "Proposal_DeepLearning_Padi_RisetMu.pdf",
    rabBreakdown: [
      { kategori: "Bahan Habis Pakai", detail: "Reagen uji daun, memory card drone high speed, panel kalibrasi radiometrik", biaya: "Rp 14.500.000" },
      { kategori: "Pengumpulan Data Lapangan", detail: "Sewa drone multirotor + sensor multispektral, transportasi 10x survei ke Deli Serdang", biaya: "Rp 18.000.000" },
      { kategori: "Sewa Komputasi & Uji Lab", detail: "Cloud GPU Server (NVIDIA A100 40GB) selama 6 bulan pelatihan model", biaya: "Rp 8.000.000" },
      { kategori: "Pelaporan & Publikasi", detail: "Article Processing Charge (APC) jurnal Open Access Q2 & sertifikasi HKI", biaya: "Rp 8.000.000" }
    ],
    status: "pending",
    noSK: null,
    tglSah: null
  },
  2: {
    id: 2,
    title: "Pemberdayaan Kelompok Tani Mandiri melalui Penerapan Smart Irrigation System dan Manajemen Rantai Pasok Berkelanjutan",
    scheme: "Pengabdian Kemitraan Masyarakat",
    fakultas: "Fakultas Teknik",
    prodi: "Teknik Elektro",
    danaUsulan: "Rp 35.000.000",
    danaRekomendasi: "Rp 35.000.000",
    plenoScore: 86.0,
    rev1Score: 85.0,
    rev2Score: 87.0,
    durasi: "8 Bulan",
    tkt: "TKT 6 ke TKT 7",
    bidangFokus: "Sosial Humaniora & PkM",
    tema: "Pemberdayaan Ekonomi Desa Berbasis Teknologi Tepat Guna",
    topik: "Smart Irrigation & Rantai Pasok Petani",
    rumpun: "Teknologi Pertanian & Rekayasa",
    ketua: "Ir. Bambang Hermanto, M.T. (NIDN: 0102047501)",
    anggotaDosen: [
      "Dr. Siti Aminah, S.E., M.Si. (Dosen Manajemen)",
      "Zulfikar Lubis, S.T., M.T. (Dosen Teknik Sipil)"
    ],
    anggotaMhs: [
      "Riko Pratama (Mahasiswa NIM: 21019022)",
      "Dewi Lestari (Mahasiswa NIM: 22019034)"
    ],
    abstrak: "Program kemitraan masyarakat ini mengentaskan kendala kekeringan dan inefisiensi distribusi hasil panen pada Kelompok Tani Mandiri di Binjai. Solusi diterapkan melalui instalasi 5 unit smart drip irrigation berbasis sensor kelembaban tanah LoRaWAN dan pelatihan aplikasi marketplace tani terdesentralisasi.",
    rekomendasiReviewer: "Rekomendasi Seleksi LPPM: Layak Didanai Penuh. Kemitraan dengan kelompok tani sangat kuat dan teknologi tepat guna langsung operasional di lapangan.",
    targetLuaran: [
      "1 Jurnal Pengabdian Nasional Terakreditasi SINTA 3",
      "1 Produk Teknologi Tepat Guna (Smart Irrigation Kit) terpasang di mitra",
      "Publikasi Video Dokumenter di Media Sosial & Berita Koran Nasional"
    ],
    naskahFile: "Proposal_Pengabdian_SmartIrrigation.pdf",
    rabBreakdown: [
      { kategori: "Bahan Habis Pakai", detail: "Pipa HDPE, selang drip, micro controller ESP32, solenoid valve", biaya: "Rp 15.000.000" },
      { kategori: "Pelatihan & Pendampingan", detail: "Honor narasumber, konsumsi 30 peserta mitra kelompok tani 3 sesi", biaya: "Rp 9.500.000" },
      { kategori: "Publikasi & Diseminasi", detail: "Biaya publikasi jurnal SINTA 3 dan pembuatan video dokumenter", biaya: "Rp 5.500.000" },
      { kategori: "Transportasi & Operasional", detail: "Transportasi tim dosen dan mahasiswa ke lokasi mitra di Binjai", biaya: "Rp 5.000.000" }
    ],
    status: "pending",
    noSK: null,
    tglSah: null
  },
  3: {
    id: 3,
    title: "Pengembangan Sistem Telemedicine Syariah Berbasis Enkripsi Kuantum untuk Kerahasiaan Rekam Medis Rumah Sakit Muhammadiyah",
    scheme: "Penelitian Terapan Unggulan",
    fakultas: "Fakultas Kedokteran",
    prodi: "Pendidikan Dokter & Komputer Medis",
    danaUsulan: "Rp 65.000.000",
    danaRekomendasi: "Rp 65.000.000",
    plenoScore: 84.5,
    rev1Score: 85.0,
    rev2Score: 84.0,
    durasi: "12 Bulan",
    tkt: "TKT 4 ke TKT 6",
    bidangFokus: "Kesehatan & Siber",
    tema: "Keamanan Data Kesehatan & Telemedicine Rumah Sakit",
    topik: "Enkripsi Kuantum Rekam Medis Elektronik",
    rumpun: "Teknologi Informasi & Rekayasa Medis",
    ketua: "Dr. Aisyah Putri, M.Kom. (NIDN: 0108097802)",
    anggotaDosen: [
      "dr. Nurul Hasanah, Sp.A (Dosen Fakultas Kedokteran)",
      "Yusuf Maulana, M.Kom. (Dosen Cyber Security)"
    ],
    anggotaMhs: [
      "Aulia Rahma (NIM: 22018055)",
      "Bagas Satria (NIM: 22018067)"
    ],
    abstrak: "Mengembangkan protokol keamanan transmisi data rekam medis elektronik pasien antara klinik satelit dengan RS Muhammadiyah Sumatera Utara menggunakan algoritma Post-Quantum Cryptography (Kyber/Dilithium) yang diintegrasikan ke platform telekonsultasi dokter.",
    rekomendasiReviewer: "Rekomendasi Seleksi LPPM: Layak Didanai. Memiliki urgensi strategis untuk Rumah Sakit jejaring Muhammadiyah. Telah memiliki persetujuan komite etik kedokteran.",
    targetLuaran: [
      "1 Jurnal Internasional Bereputasi Scopus Q1/Q2",
      "Paten Sederhana Arsitektur Enkripsi Rekam Medis",
      "Aplikasi Sistem Telemedicine teruji di RS Muhammadiyah"
    ],
    naskahFile: "Proposal_Telemedicine_Enkripsi.pdf",
    rabBreakdown: [
      { kategori: "Bahan & Lisensi Server", detail: "Sertifikat keamanan SSL EV, sewa server HSM Cloud secure vault", biaya: "Rp 24.000.000" },
      { kategori: "Uji Coba Klinis & Ethical Clearance", detail: "Biaya komisi etik penelitian FK dan uji simulasi rekam medis 200 data", biaya: "Rp 16.000.000" },
      { kategori: "Publikasi Scopus & Paten", detail: "Pendaftaran paten sederhana di Ditjen KI & APC Scopus", biaya: "Rp 15.000.000" },
      { kategori: "Honor Tim Enumerator IT", detail: "Honor coding modul enkripsi untuk 2 mahasiswa pembantu", biaya: "Rp 10.000.000" }
    ],
    status: "pending",
    noSK: null,
    tglSah: null
  },
  4: {
    id: 4,
    title: "Pelatihan Literasi Keuangan Digital dan Kurasi Produk Halal bagi Pelaku UMKM Aisyiyah Cabang Medan Denai",
    scheme: "Pengabdian Persyarikatan",
    fakultas: "Fakultas Agama Islam",
    prodi: "Perbankan Syariah",
    danaUsulan: "Rp 25.000.000",
    danaRekomendasi: "Rp 25.000.000",
    plenoScore: 82.0,
    rev1Score: 81.0,
    rev2Score: 83.0,
    durasi: "6 Bulan",
    tkt: "TKT 5 ke TKT 6",
    bidangFokus: "Ekonomi Syariah & Industri Halal",
    tema: "Pemberdayaan Ekonomi Persyarikatan Aisyiyah",
    topik: "Literasi Keuangan Syariah & Sertifikasi Halal",
    rumpun: "Ekonomi Syariah",
    ketua: "Hj. Nurhasanah, S.Ag., M.Hum. (NIDN: 0110057201)",
    anggotaDosen: [
      "Drs. H. Syarifuddin, M.A. (Dosen FAI)",
      "Fatimah Zahra, M.E. (Dosen FEB)"
    ],
    anggotaMhs: [
      "Nurul Izzah (NIM: 22019011)"
    ],
    abstrak: "Pendampingan kurasi produk makanan halal dan digitalisasi sistem pembayaran QRIS bagi 25 pelaku UMKM binaan Pimpinan Cabang Aisyiyah Medan Denai.",
    rekomendasiReviewer: "Rekomendasi Seleksi LPPM: Telah Disahkan SK. Pendanaan penuh disetujui untuk penguatan persyarikatan Muhammadiyah/Aisyiyah.",
    targetLuaran: [
      "1 Jurnal Pengabdian Nasional Terakreditasi",
      "Sertifikat Halal Produk UMKM Mitra",
      "Publikasi Media Cetak & Video Kegiatan"
    ],
    naskahFile: "Proposal_Pengabdian_Aisyiyah.pdf",
    rabBreakdown: [
      { kategori: "Kurasi & Sertifikasi Halal", detail: "Biaya pendaftaran kurasi BPJPH dan uji lab kehalalan bahan", biaya: "Rp 12.000.000" },
      { kategori: "Pelatihan & Narasumber", detail: "Honor pemateri digital marketing & modul buku saku UMKM", biaya: "Rp 8.000.000" },
      { kategori: "Dokumentasi & Media", detail: "Pembuatan video profil UMKM dan publikasi berita harian", biaya: "Rp 5.000.000" }
    ],
    status: "approved",
    noSK: "SK-REK/UMSU/LPPM/2026/X-10",
    tglSah: "28 Okt 2026"
  }
};

let currentActiveProposalId = 1;
let currentActiveModalTab = 'dossier'; // 'dossier' or 'approval'
let currentFilterType = 'usulan'; // 'usulan' | 'laporan' | 'semua'

// Status keterbacaan tab notifikasi (disimpan di sessionStorage agar badge hilang permanen selama sesi)
const tabReadStatus = {
  usulan: (function() {
    try { return sessionStorage.getItem('pimpinan_read_usulan') === 'true'; } catch(e) { return false; }
  })(),
  laporan: (function() {
    try { return sessionStorage.getItem('pimpinan_read_laporan') === 'true'; } catch(e) { return false; }
  })()
};

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
  initPimpinanDropdowns();

  // Terapkan status notifikasi yang sudah dibaca sebelumnya
  if (tabReadStatus.usulan) {
    hideBadgeInstant('badgeFilterUsulan');
    hideBadgeInstant('badgeNavPengesahan');
  } else {
    // Karena tab "Usulan Siap Pengesahan" adalah tab default yang langsung dilihat pimpinan saat dashboard dibuka,
    // buat badge notifikasi memudar otomatis setelah 2 detik melihat dashboard atau ketika pimpinan berinteraksi
    setTimeout(() => {
      markTabAsRead('usulan');
    }, 2000);
  }

  if (tabReadStatus.laporan) {
    hideBadgeInstant('badgeFilterLaporan');
    hideBadgeInstant('badgeNavLaporan');
  }

  showFilterUsulan(false);
  updatePimpinanCounters();
});

// Dropdown Initializer
function initPimpinanDropdowns() {
  const dropdownConfigs = [
    { btnId: 'yearDropdownBtn', menuId: 'yearDropdownMenu' },
    { btnId: 'roleDropdownBtn', menuId: 'roleDropdownMenu' },
    { btnId: 'notifBtn', menuId: 'notifMenu' },
    { btnId: 'userProfileBtn', menuId: 'userMenu' }
  ];

  dropdownConfigs.forEach(({ btnId, menuId }) => {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('show');
      closeAllPimpinanDropdowns();
      if (!isOpen) {
        menu.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');
        if (btnId === 'notifBtn') {
          const dot = btn.querySelector('.notif-badge-dot');
          if (dot) dot.style.display = 'none';
        }
      }
    });
  });

  // Year items
  const yearItems = document.querySelectorAll('#yearDropdownMenu .dropdown-item');
  yearItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      yearItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const val = item.getAttribute('data-year') || item.textContent.trim();
      const el = document.getElementById('selectedYear');
      if (el) el.textContent = val.replace('(Aktif)', '').trim();
      closeAllPimpinanDropdowns();
      showToast('Periode aktif dialihkan ke ' + val, 'success');
    });
  });

  // Role items
  const roleItems = document.querySelectorAll('#roleDropdownMenu .dropdown-item');
  roleItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = item.getAttribute('data-role');
      document.getElementById('selectedRole').textContent = val;
      closeAllPimpinanDropdowns();
      showToast('Peran dialihkan ke: ' + val, 'success');

      if (val === 'DOSEN') {
        setTimeout(() => { window.location.href = 'index.html'; }, 350);
      } else if (val === 'REVIEWER') {
        setTimeout(() => { window.location.href = 'reviewer.html'; }, 350);
      } else if (val === 'ADMIN LPPM') {
        setTimeout(() => { window.location.href = 'admin-lppm.html'; }, 350);
      }
    });
  });

  // Close menus on outside click
  document.addEventListener('click', () => {
    closeAllPimpinanDropdowns();
  });
}

function closeAllPimpinanDropdowns() {
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
  document.querySelectorAll('[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}

// Subnav Tab Active Helper
function setActiveSubnavTab(element) {
  document.querySelectorAll('.subnav-tab-link').forEach(link => {
    link.classList.remove('active');
  });
  element.classList.add('active');
}

// Filter Switcher: 'usulan' vs 'laporan' vs 'semua'
function switchFilter(type) {
  currentFilterType = type;
  const segmentedBtns = document.querySelectorAll('.pimpinan-segmented-control .segmented-btn');
  segmentedBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === type) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const usulanList = document.getElementById('pimpinanUsulanList');
  const laporanList = document.getElementById('pimpinanLaporanList');

  // Notifikasi badge: tandai sudah dibaca dan hilangkan badge jika tab dibuka
  markTabAsRead(type);

  if (type === 'laporan') {
    if (usulanList) usulanList.style.display = 'none';
    if (laporanList) laporanList.style.display = 'flex';
    showToast('Menampilkan Laporan Kemajuan & Capaian Luaran', 'info');
  } else if (type === 'usulan') {
    if (usulanList) usulanList.style.display = 'flex';
    if (laporanList) laporanList.style.display = 'none';
    showFilterUsulan(false);
    showToast('Menampilkan Usulan Siap Pengesahan SK', 'info');
  } else {
    // semua usulan (termasuk yang telah disahkan)
    if (usulanList) usulanList.style.display = 'flex';
    if (laporanList) laporanList.style.display = 'none';
    showFilterUsulan(true);
    showToast('Menampilkan Semua Usulan Batch 10', 'info');
  }
}

// Fungsi Menghilangkan Badge Notifikasi saat Tab Dibaca
function markTabAsRead(tabKey) {
  if (tabKey === 'laporan' && !tabReadStatus.laporan) {
    tabReadStatus.laporan = true;
    try { sessionStorage.setItem('pimpinan_read_laporan', 'true'); } catch (e) {}
    hideBadgeWithFade('badgeFilterLaporan');
    hideBadgeWithFade('badgeNavLaporan');
  } else if (tabKey === 'usulan' && !tabReadStatus.usulan) {
    tabReadStatus.usulan = true;
    try { sessionStorage.setItem('pimpinan_read_usulan', 'true'); } catch (e) {}
    hideBadgeWithFade('badgeFilterUsulan');
    hideBadgeWithFade('badgeNavPengesahan');
  }
}

function hideBadgeInstant(badgeId) {
  const badge = document.getElementById(badgeId);
  if (badge) {
    badge.style.display = 'none';
  }
}

function hideBadgeWithFade(badgeId) {
  const badge = document.getElementById(badgeId);
  if (badge && badge.style.display !== 'none') {
    badge.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8)';
    setTimeout(() => {
      badge.style.display = 'none';
    }, 250);
  }
}

function showFilterUsulan(showAll) {
  const cards = document.querySelectorAll('#pimpinanUsulanList .proposal-clean-card');
  let visiblePending = 0;

  cards.forEach(card => {
    const status = card.getAttribute('data-status');
    if (showAll) {
      // Pada tab "Semua Usulan", tampilkan seluruhnya
      card.style.display = 'block';
    } else {
      // Pada tab "Siap Pengesahan", hanya tampilkan yang berstatus 'pending'
      if (status === 'pending') {
        card.style.display = 'block';
        visiblePending++;
      } else {
        card.style.display = 'none';
      }
    }
  });

  const emptyMsg = document.getElementById('emptyPendingUsulan');
  if (emptyMsg) {
    if (!showAll && visiblePending === 0) {
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
    }
  }
}

// Sinkronisasi Penghitung Counter Badge
function updatePimpinanCounters() {
  const pendingCards = document.querySelectorAll('#pimpinanUsulanList .proposal-clean-card[data-status="pending"]');
  const count = pendingCards.length;

  if (!tabReadStatus.usulan) {
    const badgeNav = document.getElementById('badgeNavPengesahan');
    if (badgeNav && badgeNav.style.display !== 'none') {
      badgeNav.textContent = count;
      if (count === 0) badgeNav.style.display = 'none';
    }

    const badgeFilter = document.getElementById('badgeFilterUsulan');
    if (badgeFilter && badgeFilter.style.display !== 'none') {
      badgeFilter.textContent = count;
      if (count === 0) badgeFilter.style.display = 'none';
    }
  }

  const metricPending = document.getElementById('metricPendingCount');
  if (metricPending) metricPending.textContent = String(count).padStart(2, '0');

  const approvedCards = document.querySelectorAll('#pimpinanUsulanList .proposal-clean-card[data-status="approved"]');
  const metricApproved = document.getElementById('metricApprovedCount');
  if (metricApproved) {
    // 13 + usulan yang sudah disahkan
    metricApproved.textContent = String(13 + approvedCards.length);
  }

  // Jika sedang di filter 'usulan' dan tidak ada lagi yang pending
  const emptyMsg = document.getElementById('emptyPendingUsulan');
  if (emptyMsg && currentFilterType === 'usulan') {
    emptyMsg.style.display = count === 0 ? 'block' : 'none';
  }
}

// Live Search
function handleTaskSearch(keyword) {
  const term = (keyword || '').toLowerCase().trim();
  const cards = document.querySelectorAll('#pimpinanUsulanList .proposal-clean-card');

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!term || text.includes(term)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Modal Open & Populate: Dossier vs Scoring / Approval
function openModalPengesahan(propId, initialTab = 'dossier') {
  currentActiveProposalId = propId;
  const p = PIMPINAN_PROPOSALS[propId];
  if (!p) return;

  const modal = document.getElementById('modalPengesahan');
  if (!modal) return;

  // Header Title & Tag
  const tagStatus = document.getElementById('modalPimpinanTagStatus');
  if (tagStatus) {
    if (p.status === 'approved') {
      tagStatus.innerHTML = `<span style="color: #059669;"><i class="fa-solid fa-check-circle"></i> Status: Telah Disahkan SK (${p.noSK})</span>`;
    } else {
      tagStatus.innerHTML = `<span style="color: #d97706;"><i class="fa-solid fa-hourglass-half"></i> Status: Menunggu Pengesahan Pimpinan</span>`;
    }
  }

  // Populate Tab 1: Dossier Berkas Usulan
  document.getElementById('dossierSchemeBadge').textContent = p.scheme;
  document.getElementById('dossierFacultyBadge').innerHTML = `<i class="fa-solid fa-building-columns"></i> ${p.fakultas}`;
  document.getElementById('dossierTitle').textContent = p.title;
  document.getElementById('dossierDana').textContent = p.danaRekomendasi;
  document.getElementById('dossierDurasi').textContent = p.durasi;
  document.getElementById('dossierTKT').textContent = p.tkt;

  document.getElementById('dossierBidangFokus').textContent = p.bidangFokus;
  document.getElementById('dossierTema').textContent = p.tema;
  document.getElementById('dossierTopik').textContent = p.topik;
  document.getElementById('dossierRumpun').textContent = p.rumpun;

  // Tim Peneliti
  const timContainer = document.getElementById('dossierTimContainer');
  let timHtml = `<div><strong>Ketua:</strong> ${p.ketua}</div>`;
  if (p.anggotaDosen && p.anggotaDosen.length > 0) {
    timHtml += `<div style="margin-top: 4px;"><strong>Anggota Dosen:</strong> ${p.anggotaDosen.join(', ')}</div>`;
  }
  if (p.anggotaMhs && p.anggotaMhs.length > 0) {
    timHtml += `<div style="margin-top: 4px;"><strong>Mahasiswa:</strong> ${p.anggotaMhs.join(', ')}</div>`;
  }
  timContainer.innerHTML = timHtml;

  // Abstrak & Catatan Pleno
  document.getElementById('dossierAbstrak').textContent = p.abstrak;
  document.getElementById('dossierReviewerNote').textContent = p.rekomendasiReviewer;

  // Target Luaran
  const luaranContainer = document.getElementById('dossierLuaranList');
  luaranContainer.innerHTML = p.targetLuaran.map(item => `
    <div class="dossier-luaran-item">
      <i class="fa-solid fa-circle-check" style="color: #059669; font-size: 13px;"></i>
      <span>${item}</span>
    </div>
  `).join('');

  // Breakdown RAB
  const rabTbody = document.getElementById('dossierRabTableBody');
  if (rabTbody && p.rabBreakdown) {
    rabTbody.innerHTML = p.rabBreakdown.map(r => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 8px 10px; font-weight: 700; color: #0f172a;">${r.kategori}</td>
        <td style="padding: 8px 10px; color: #475569;">${r.detail}</td>
        <td style="padding: 8px 10px; text-align: right; font-weight: 700; color: #0284c7;">${r.biaya}</td>
      </tr>
    `).join('');
  }

  // Populate Tab 2: Form Pengesahan
  document.getElementById('plenoProposalTitle').textContent = p.title;
  document.getElementById('plenoProposalKetua').textContent = p.ketua;
  document.getElementById('plenoSkorAngka').textContent = p.plenoScore.toFixed(1);
  document.getElementById('plenoRev1Score').textContent = p.rev1Score.toFixed(1);
  document.getElementById('plenoRev2Score').textContent = p.rev2Score.toFixed(1);
  document.getElementById('plenoRekomendasiDana').textContent = p.danaRekomendasi;
  const facBadge = document.getElementById('plenoFacultyBadge');
  if (facBadge) {
    facBadge.innerHTML = `<i class="fa-solid fa-building-columns"></i> ${p.fakultas}`;
  }

  const danaInput = document.getElementById('inputDanaDisetujui');
  if (danaInput) {
    danaInput.value = p.danaRekomendasi;
  }

  const skField = document.getElementById('fieldNoSKRektor');
  if (skField) {
    skField.textContent = p.noSK || `SK-REK/UMSU/LPPM/2026/X-${String(p.id).padStart(2, '0')}`;
  }

  // Decision state check
  selectDecision('approve');

  // Switch to initial tab
  switchPimpinanModalTab(initialTab);

  modal.style.display = 'flex';
}

function closeModalPengesahan() {
  const modal = document.getElementById('modalPengesahan');
  if (modal) modal.style.display = 'none';
}

// Switch tabs inside modal
function switchPimpinanModalTab(tabKey) {
  currentActiveModalTab = tabKey;
  const btnDossier = document.getElementById('tabBtnDossier');
  const btnApproval = document.getElementById('tabBtnApproval');
  const contentDossier = document.getElementById('tabContentDossier');
  const contentApproval = document.getElementById('tabContentApproval');

  if (tabKey === 'dossier') {
    btnDossier.classList.add('active');
    btnApproval.classList.remove('active');
    contentDossier.style.display = 'block';
    contentApproval.style.display = 'none';
  } else {
    btnDossier.classList.remove('active');
    btnApproval.classList.add('active');
    contentDossier.style.display = 'none';
    contentApproval.style.display = 'block';
  }
}

// Select Decision Option
function selectDecision(type) {
  const labels = document.querySelectorAll('.decision-card-label');
  labels.forEach(l => l.classList.remove('selected'));

  const target = document.getElementById('decisionLabel_' + type);
  if (target) {
    target.classList.add('selected');
    const radio = target.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }

  const danaInputWrapper = document.getElementById('wrapperDanaInput');
  if (type === 'reject') {
    if (danaInputWrapper) danaInputWrapper.style.opacity = '0.5';
  } else {
    if (danaInputWrapper) danaInputWrapper.style.opacity = '1';
  }
}

// Submit Pengesahan Pimpinan & Terbitkan SK
function submitPengesahanPimpinan() {
  const p = PIMPINAN_PROPOSALS[currentActiveProposalId];
  if (!p) return;

  const chkAgree = document.getElementById('chkAgreePimpinan');
  if (chkAgree && !chkAgree.checked) {
    showToast('Harap centang persetujuan penerbitan SK sebelum melanjutkan.', 'error');
    return;
  }

  const nominal = document.getElementById('inputDanaDisetujui').value;
  const noSK = `SK-REK/UMSU/LPPM/2026/X-${String(p.id).padStart(2, '0')}`;

  // Update Data State
  p.status = 'approved';
  p.danaRekomendasi = nominal;
  p.noSK = noSK;
  p.tglSah = 'Hari ini, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  // Update DOM Proposal Card
  const card = document.getElementById('proposalCard_' + p.id);
  if (card) {
    card.setAttribute('data-status', 'approved');
    card.classList.remove('urgent');
    card.classList.add('completed');

    // Update Status Badge
    const statusPill = card.querySelector('.pill-status');
    if (statusPill) {
      statusPill.className = 'pill-status done';
      statusPill.innerHTML = `<i class="fa-solid fa-circle-check"></i> Telah Disahkan SK`;
    }

    // Update Status Tag
    const skTag = card.querySelector('.card-deadline-text');
    if (skTag) {
      skTag.className = 'card-deadline-text done';
      skTag.innerHTML = `<i class="fa-solid fa-stamp"></i> No. SK: ${noSK}`;
    }

    // Update Progress Fill
    const fill = card.querySelector('.compact-progress-fill');
    if (fill) {
      fill.className = 'compact-progress-fill emerald';
      fill.style.width = '100%';
    }

    // Update Action Button
    const btnAction = card.querySelector('.card-action-footer .btn-primary-pim');
    if (btnAction) {
      btnAction.className = 'btn-ghost-pim';
      btnAction.style.borderColor = '#10b981';
      btnAction.style.color = '#047857';
      btnAction.innerHTML = `<i class="fa-solid fa-file-contract"></i> <span>Salinan SK Rektor</span>`;
      btnAction.onclick = () => openModalPengesahan(p.id, 'approval');
    }

    // Jika sedang di filter "Usulan Siap Pengesahan", sembunyikan kartu yang baru saja disahkan
    if (currentFilterType === 'usulan') {
      card.style.display = 'none';
    }
  }

  // Tambahkan baris baru ke Tabel Riwayat SK Rektor secara dinamis
  const riwayatTbody = document.querySelector('#tabelRiwayatPimpinan tbody');
  if (riwayatTbody) {
    const existingRows = riwayatTbody.querySelectorAll('tr').length;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td style="text-align: center; font-weight: 600; color: #64748b;">${existingRows + 1}</td>
      <td>
        <strong style="color: #0f172a;">${p.title}</strong>
        <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Ketua: ${p.ketua}</div>
      </td>
      <td style="white-space: nowrap;"><span class="pill-scheme">${p.scheme}</span><br><small style="color: #64748b;">${p.fakultas}</small></td>
      <td style="text-align: right; font-weight: 700; color: #0f172a; white-space: nowrap;">${p.danaRekomendasi}</td>
      <td class="cell-sk"><span class="sk-number-pill"><i class="fa-solid fa-stamp" style="font-size: 10px; color: #0284c7;"></i> ${noSK}</span></td>
      <td style="text-align: center; color: #64748b; font-size: 12px; white-space: nowrap;">${p.tglSah}</td>
      <td style="text-align: center; white-space: nowrap;"><span class="pill-status done">Disahkan</span></td>
      <td style="text-align: center;">
        <button type="button" class="btn-ghost-pim" onclick="openModalPengesahan(${p.id}, 'approval')" style="padding: 4px 8px;" title="Lihat SK">
          <i class="fa-solid fa-eye"></i>
        </button>
      </td>
    `;
    riwayatTbody.prepend(newRow);
  }

  // Update Counters & Badges
  updatePimpinanCounters();

  closeModalPengesahan();
  showToast(`Usulan "${p.title.substring(0, 32)}..." berhasil disahkan & dialihkan ke tab 'Semua Usulan'!`, 'success');
}

// Download PDF / Excel Summary
function downloadSummaryPDF() {
  showToast('Menyiapkan Berkas Ringkasan Portofolio & Surat Keputusan (PDF)...', 'info');
  setTimeout(() => {
    showToast('Ringkasan Eksekutif & SK Rektor Batch 10 berhasil diunduh.', 'success');
  }, 1200);
}

// Toast helper
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '24px';
    container.style.right = '24px';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.background = '#0f172a';
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 18px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
  toast.style.fontSize = '13px';
  toast.style.fontWeight = '600';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  toast.style.transition = 'all 0.25s ease';
  toast.style.maxWidth = '420px';

  let icon = 'fa-circle-info';
  let iconColor = '#38bdf8';
  if (type === 'success') {
    icon = 'fa-circle-check';
    iconColor = '#10b981';
  } else if (type === 'error') {
    icon = 'fa-circle-xmark';
    iconColor = '#ef4444';
  }

  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${iconColor};"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3400);
}
