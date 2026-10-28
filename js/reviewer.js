/**
 * File: js/reviewer.js
 * Deskripsi: Logika interaktif Dashboard Reviewer LPPM UMSU & RisetMu
 * Dilengkapi dossier berkas usulan dosen (Identitas, Abstrak, Target Luaran, RAB, Berkas)
 */

// Data Usulan Komprehensif yang Ditugaskan ke Reviewer (Sinkron dengan input Dosen)
const REVIEW_PROPOSALS = {
  1: {
    id: 1,
    title: "Implementasi Deep Learning Multi-Modal untuk Deteksi Dini Penyakit Tanaman Padi Berbasis Citra Multispektral Drone",
    scheme: "Penelitian Fundamental Reguler",
    dana: "Rp 48.500.000",
    deadline: "15 Nov 2026 (H-3)",
    durasi: "12 Bulan (1 Tahun)",
    tkt: "TKT 3 ke TKT 5",
    bidangFokus: "Pangan & Pertanian",
    tema: "Kecerdasan Buatan & Sensor Presisi Pertanian",
    topik: "Deteksi Dini Penyakit Tanaman Padi Berbasis AI",
    rumpun: "Ilmu Komputer / Informatika",
    ketuaAsli: "Dr. Ir. Ahmad Syahril, M.Kom. (NIDN: 0115088201) &bull; Prodi Sistem Informasi UMSU",
    anggotaDosen: [
      "Rahmat Hidayat, S.P., M.Sc. (Dosen Agroteknologi UMSU)",
      "Nurul Farida, M.Kom. (Dosen Teknik Informatika UMSU)"
    ],
    anggotaMhs: [
      "Fajar Ramadhan (Mahasiswa NIM: 22018012)",
      "Annisa Tri Putri (Mahasiswa NIM: 22018045)"
    ],
    abstrak: "Penelitian ini mengembangkan arsitektur Convolutional Neural Network (CNN) multi-modal yang mengintegrasikan citra multispektral (Green, Red, Red-Edge, NIR) dari sensor drone dengan data mikroklimat tanah. Solusi ini mendeteksi gejala awal infeksi jamur Magnaporthe oryzae (penyakit blas) dan bakteri Xanthomonas oryzae (hawar daun) pada petak sawah secara presisi tinggi sebelum kerusakan menyebar luas. Metode yang digunakan adalah transfer learning EfficientNet-B4 dengan akurasi pengenalan ditargetkan mencapai minimal F1-Score 92% pada uji lapangan di Sumatera Utara.",
    bidangStrategis: "Pangan & Pertanian (Kedaulatan & Ketahanan Pangan Nasional)",
    metode: "Eksperimental Lapangan & Computer Vision (Penerbangan drone mingguan resolusi 5cm/px, segmentasi NDVI/NDRE, fine-tuning model di GPU Server)",
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
    dokumenPendukung: [
      { nama: "Surat Pernyataan Ketua Peneliti", status: "Lengkap & Bermeterai Rp 10.000", file: "Surat_Pernyataan_AhmadSyahril.pdf" },
      { nama: "Surat Kesediaan Mitra Kerjasama", status: "Disetujui Gapoktan Makmur Jaya", file: "Surat_Mitra_Gapoktan.pdf" },
      { nama: "Biodata Ketua & Anggota Tim", status: "Format Standar RisetMu Terverifikasi", file: "CV_Tim_Peneliti.pdf" }
    ],
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
    durasi: "8 Bulan",
    tkt: "TKT 6 ke TKT 7",
    bidangFokus: "Sosial Humaniora & PkM",
    tema: "Pemberdayaan Ekonomi Desa Berbasis Teknologi Tepat Guna",
    topik: "Smart Irrigation & Rantai Pasok Petani",
    rumpun: "Teknologi Pertanian & Manajemen",
    ketuaAsli: "Ir. Bambang Hermanto, M.T. (NIDN: 0102047501) &bull; Prodi Teknik Elektro UMSU",
    anggotaDosen: [
      "Dr. Siti Aminah, S.E., M.Si. (Dosen Manajemen)",
      "Zulfikar Lubis, S.T., M.T. (Dosen Teknik Sipil)"
    ],
    anggotaMhs: [
      "Riko Pratama (Mahasiswa NIM: 21019022)",
      "Dewi Lestari (Mahasiswa NIM: 22019034)"
    ],
    abstrak: "Program kemitraan masyarakat ini mengentaskan kendala kekeringan dan inefisiensi distribusi hasil panen pada Kelompok Tani Mandiri di Binjai. Solusi diterapkan melalui instalasi 5 unit smart drip irrigation berbasis sensor kelembaban tanah LoRaWAN dan pelatihan aplikasi marketplace tani terdesentralisasi.",
    bidangStrategis: "Pemberdayaan Masyarakat & Ekonomi Sirkular",
    metode: "Participatory Action Research (PAR), Fabrikasi Alat, Pelatihan & Pendampingan Mitra",
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
    dokumenPendukung: [
      { nama: "Surat Pernyataan Ketua Pengusul", status: "Bermeterai Rp 10.000 Sah", file: "Surat_Pernyataan_Bambang.pdf" },
      { nama: "Surat Perjanjian Kerjasama Mitra", status: "Ttd Kepala Desa & Ketua Gapoktan", file: "MoU_Mitra_Binjai.pdf" },
      { nama: "Peta Lokasi Mitra & Foto Kondisi", status: "Koordinat GPS Terverifikasi", file: "Denah_Mitra_Lapang.pdf" }
    ],
    scores: { c1: 85, c2: 88, c3: 82, c4: 0 },
    notes: { c1: "Latar belakang masalah mitra sangat konkret dan mendesak.", c2: "Metode pendampingan partisipatif sudah tepat.", c3: "RAB rasional dan efisien untuk kebutuhan TTG.", c4: "", general: "Usulan sangat potensial memberikan dampak ekonomi langsung bagi petani." },
    status: "draft"
  },
  3: {
    id: 3,
    title: "Pengembangan Sistem Telemedicine Syariah Berbasis Enkripsi Kuantum untuk Kerahasiaan Rekam Medis Rumah Sakit Muhammadiyah",
    scheme: "Penelitian Terapan Unggulan",
    dana: "Rp 65.000.000",
    deadline: "25 Nov 2026 (H-13)",
    durasi: "12 Bulan",
    tkt: "TKT 4 ke TKT 6",
    bidangFokus: "Kesehatan & Obat",
    tema: "Keamanan Data Kesehatan & Telemedicine Rumah Sakit",
    topik: "Enkripsi Kuantum Rekam Medis Elektronik",
    rumpun: "Teknologi Informasi & Rekayasa Medis",
    ketuaAsli: "Dr. Hendra Cipta, M.Si. (NIDN: 0108097802) &bull; Prodi Teknik Komputer UMSU",
    anggotaDosen: [
      "dr. Nurul Hasanah, Sp.A (Dosen Fakultas Kedokteran)",
      "Yusuf Maulana, M.Kom. (Dosen Cyber Security)"
    ],
    anggotaMhs: [
      "Aulia Rahma (NIM: 22018055)",
      "Bagas Satria (NIM: 22018067)"
    ],
    abstrak: "Mengembangkan protokol keamanan transmisi data rekam medis elektronik pasien antara klinik satelit dengan RS Muhammadiyah Sumatera Utara menggunakan algoritma Post-Quantum Cryptography (Kyber/Dilithium) yang diintegrasikan ke platform telekonsultasi dokter.",
    bidangStrategis: "Kesehatan & Ketahanan Siber Nasional",
    metode: "Software Development Life Cycle (SDLC) Agile, Uji Penetrasi Siber, dan Simulasi Beban Transaksi",
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
    dokumenPendukung: [
      { nama: "Surat Rekomendasi Komite Etik", status: "Lolos Uji Etik Penelitian Kesehatan", file: "Ethical_Clearance_RS.pdf" },
      { nama: "Surat Kesediaan RS Muhammadiyah", status: "Disetujui Direktur RS PKU", file: "Surat_Mitra_RS.pdf" },
      { nama: "Surat Pernyataan Bebas Plagiasi", status: "Turnitin 12% Bermeterai", file: "Surat_Bebas_Plagiasi.pdf" }
    ],
    scores: { c1: 80, c2: 78, c3: 0, c4: 0 },
    notes: { c1: "Topik quantum cryptography sangat relevan dengan isu privasi data medis.", c2: "Perlu diperjelas skenario pengujian pada jaringan internet rumah sakit daerah.", c3: "", c4: "", general: "" },
    status: "draft"
  },
  4: {
    id: 4,
    title: "Pelatihan Literasi Keuangan Digital dan Kurasi Produk Halal bagi Pelaku UMKM Aisyiyah Cabang Medan Denai",
    scheme: "Pengabdian Persyarikatan",
    dana: "Rp 25.000.000",
    deadline: "Selesai",
    durasi: "6 Bulan",
    tkt: "TKT 5 ke TKT 7",
    bidangFokus: "Ekonomi Syariah & Halal",
    tema: "Pemberdayaan Ranting & Cabang Persyarikatan",
    topik: "Sertifikasi Halal & Akuntansi Digital UMKM",
    rumpun: "Ekonomi Pembangunan & Manajemen",
    ketuaAsli: "Dra. Hj. Maimunah, M.A. (NIDN: 0110056901) &bull; Dosen FAI UMSU",
    anggotaDosen: [
      "Rini Anggraini, S.E., M.Ak. (Dosen Akuntansi)",
      "Khairul Anam, S.H.I., M.H. (Dosen Hukum Bisnis Syariah)"
    ],
    anggotaMhs: [
      "Zahra Amelia (Mahasiswa NIM: 22017011)",
      "Muhammad Ilham (Mahasiswa NIM: 22017025)"
    ],
    abstrak: "Pendampingan 25 UMKM binaan Pimpinan Cabang Aisyiyah Medan Denai dalam menyusun laporan keuangan otomatis menggunakan aplikasi SI APIK BI dan pengurusan sertifikasi halal jalur self-declare (BPJPH).",
    bidangStrategis: "Sosial Keagamaan & Industri Halal",
    metode: "Workshop Interaktif, Kurasi Produk, Pendampingan Sertifikasi Halal PPH",
    targetLuaran: [
      "1 Jurnal Pengabdian Nasional Ber-ISSN",
      "25 Sertifikat Halal Terbit untuk Pelaku Usaha Binaan",
      "Buku Panduan Pembukuan Digital untuk Wirausaha Pemula"
    ],
    naskahFile: "Proposal_Pengabdian_Halal_Aisyiyah.pdf",
    rabBreakdown: [
      { kategori: "Bahan & Modul Pelatihan", detail: "Pencetakan 50 buku modul akuntansi syariah, sertifikat peserta, kit kurasi", biaya: "Rp 8.000.000" },
      { kategori: "Penyelenggaraan Workshop", detail: "Sewa aula, sound system, konsumsi 30 peserta 4 kali pertemuan", biaya: "Rp 9.500.000" },
      { kategori: "Pendampingan Sertifikasi Halal", detail: "Bantuan biaya uji lab halal sederhana dan pendaftaran NIB/PIRT", biaya: "Rp 4.500.000" },
      { kategori: "Publikasi Jurnal & Media", detail: "Biaya publikasi jurnal PkM dan artikel media massa lokal", biaya: "Rp 3.000.000" }
    ],
    dokumenPendukung: [
      { nama: "Surat Pengantar PCA Medan Denai", status: "Rekomendasi Resmi Pimpinan Aisyiyah", file: "Surat_PCA_Aisyiyah.pdf" },
      { nama: "Daftar 25 UMKM Calon Penerima", status: "Terdata Lengkap NIK & Jenis Produk", file: "Daftar_Mitra_UMKM.pdf" },
      { nama: "Surat Pernyataan Kesanggupan", status: "Bermeterai Sah", file: "Surat_Pernyataan_Ketua.pdf" }
    ],
    scores: { c1: 90, c2: 88, c3: 92, c4: 88 },
    notes: { c1: "Sangat selaras dengan misi dakwah persyarikatan dan pemberdayaan perempuan.", c2: "Metode pendampingan terbukti efektif dengan target luaran 25 sertifikat halal.", c3: "Anggaran Rp 25jt sangat efisien dan terukur.", c4: "Luaran sertifikat halal sangat konkret.", general: "Rekomendasi lolos 100% dan sangat layak didanai hibah persyarikatan." },
    status: "done"
  }
};

let currentReviewId = 1;
let isBlindReviewHidden = true;

document.addEventListener('DOMContentLoaded', () => {
  syncWithLecturerLocalData();
  initReviewerTabs();
  initReviewSearch();
});

// Sinkronkan secara cerdas dengan data yang baru saja diinput Dosen di sesi browser (LocalStorage)
function syncWithLecturerLocalData() {
  try {
    const rawTahap1 = localStorage.getItem('risetmu_usulan_baru_draf');
    const rawTahap2 = localStorage.getItem('risetmu_tahap2_draf');
    const rawRab = localStorage.getItem('risetmu_rab_items');

    if (rawTahap1 || rawTahap2 || rawRab) {
      const draf1 = rawTahap1 ? JSON.parse(rawTahap1) : {};
      const draf2 = rawTahap2 ? JSON.parse(rawTahap2) : {};
      const rabItems = rawRab ? JSON.parse(rawRab) : null;

      // Update proposal 1 dengan inputan nyata dosen
      if (draf1.judul) REVIEW_PROPOSALS[1].title = draf1.judul;
      if (draf1.skema) REVIEW_PROPOSALS[1].scheme = draf1.skema;
      if (draf1.bidangFokus) REVIEW_PROPOSALS[1].bidangFokus = draf1.bidangFokus;
      if (draf1.tema) REVIEW_PROPOSALS[1].tema = draf1.tema;
      if (draf1.topik) REVIEW_PROPOSALS[1].topik = draf1.topik;
      if (draf1.rumpunIlmu) REVIEW_PROPOSALS[1].rumpun = draf1.rumpunIlmu;
      if (draf1.lamaKegiatan) REVIEW_PROPOSALS[1].durasi = draf1.lamaKegiatan + " Bulan";
      if (draf1.targetTkt) REVIEW_PROPOSALS[1].tkt = "TKT Target: " + draf1.targetTkt;

      if (draf2.ringkasan) REVIEW_PROPOSALS[1].abstrak = draf2.ringkasan;
      if (draf2.bidangStrategis) REVIEW_PROPOSALS[1].bidangStrategis = draf2.bidangStrategis;

      if (rabItems && Array.isArray(rabItems) && rabItems.length > 0) {
        let total = 0;
        const newBreakdown = rabItems.map(item => {
          const itemTotal = (item.volume || 1) * (item.hargaSatuan || 0);
          total += itemTotal;
          return {
            kategori: item.kategori || "Bahan & Operasional",
            detail: item.namaItem || "Keperluan penelitian",
            biaya: "Rp " + itemTotal.toLocaleString('id-ID')
          };
        });
        REVIEW_PROPOSALS[1].rabBreakdown = newBreakdown;
        REVIEW_PROPOSALS[1].dana = "Rp " + total.toLocaleString('id-ID');
      }

      console.log('Sinkronisasi data Usulan Dosen ke Dashboard Reviewer berhasil.');
    }
  } catch (err) {
    console.warn('Tidak dapat membaca data lokal dosen:', err);
  }
}

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

// Buka Modal Penilaian & Dossier Usulan Dosen
function openModalPenilaian(id, defaultTab = 'dossier') {
  currentReviewId = id;
  const prop = REVIEW_PROPOSALS[id];
  if (!prop) return;

  // 1. Render Dossier Berkas Dosen
  renderProposalDossier(prop);

  // 2. Set Nilai Form Scoring
  document.getElementById('scoreC1').value = prop.scores.c1 || '';
  document.getElementById('scoreC2').value = prop.scores.c2 || '';
  document.getElementById('scoreC3').value = prop.scores.c3 || '';
  document.getElementById('scoreC4').value = prop.scores.c4 || '';

  // Sync sliders
  const s1 = document.getElementById('sliderC1'); if (s1) s1.value = prop.scores.c1 || 0;
  const s2 = document.getElementById('sliderC2'); if (s2) s2.value = prop.scores.c2 || 0;
  const s3 = document.getElementById('sliderC3'); if (s3) s3.value = prop.scores.c3 || 0;
  const s4 = document.getElementById('sliderC4'); if (s4) s4.value = prop.scores.c4 || 0;

  document.getElementById('catatanC1').value = prop.notes.c1 || '';
  document.getElementById('catatanC2').value = prop.notes.c2 || '';
  document.getElementById('catatanC3').value = prop.notes.c3 || '';
  document.getElementById('catatanC4').value = prop.notes.c4 || '';
  document.getElementById('catatanUmum').value = prop.notes.general || '';

  // Mode lihat penilaian jika sudah terkirim
  const isDone = prop.status === 'done';
  const btnSubmit = document.getElementById('btnSubmitPenilaian');
  const btnDraft = document.getElementById('btnSaveDraftPenilaian');
  if (btnSubmit) btnSubmit.style.display = isDone ? 'none' : 'inline-flex';
  if (btnDraft) btnDraft.style.display = isDone ? 'none' : 'inline-flex';
  
  const tagStatus = document.getElementById('modalPenilaianTagStatus');
  if (tagStatus) {
    tagStatus.textContent = isDone ? 'Status: SUDAH TERKIRIM (FINAL)' : 'Status: PENILAIAN DRAF AKTIF';
    tagStatus.style.color = isDone ? '#10b981' : '#0284c7';
  }

  calculateTotalScore();

  // Buka Tab yang diminta
  switchReviewModalTab(defaultTab);

  const modal = document.getElementById('modalPenilaian');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Switch Tab di dalam Modal Reviewer (1. Berkas Usulan Dosen vs 2. Lembar Nilai)
function switchReviewModalTab(tabName) {
  const tabDossier = document.getElementById('tabContentDossier');
  const tabScoring = document.getElementById('tabContentScoring');
  const btnDossier = document.getElementById('tabBtnDossier');
  const btnScoring = document.getElementById('tabBtnScoring');

  if (tabName === 'dossier') {
    if (tabDossier) tabDossier.style.display = 'block';
    if (tabScoring) tabScoring.style.display = 'none';
    if (btnDossier) btnDossier.classList.add('active');
    if (btnScoring) btnScoring.classList.remove('active');
  } else {
    if (tabDossier) tabDossier.style.display = 'none';
    if (tabScoring) tabScoring.style.display = 'block';
    if (btnDossier) btnDossier.classList.remove('active');
    if (btnScoring) btnScoring.classList.add('active');
  }
}

// Render Berkas Lengkap Usulan Dosen ke dalam Modal
function renderProposalDossier(prop) {
  // Banner Header
  document.getElementById('dossierTitle').textContent = prop.title;
  document.getElementById('dossierSchemeBadge').textContent = prop.scheme;
  document.getElementById('dossierDana').textContent = prop.dana;
  document.getElementById('dossierDurasi').textContent = prop.durasi || "12 Bulan";
  document.getElementById('dossierTKT').textContent = prop.tkt || "TKT 3 ke 5";

  // Identitas Meta Grid
  document.getElementById('dossierBidangFokus').textContent = prop.bidangFokus || "-";
  document.getElementById('dossierTema').textContent = prop.tema || "-";
  document.getElementById('dossierTopik').textContent = prop.topik || "-";
  document.getElementById('dossierRumpun').textContent = prop.rumpun || "-";

  // Tim Peneliti
  renderTimPeneliti(prop);

  // Substansi Usulan
  document.getElementById('dossierAbstrak').textContent = prop.abstrak || "Abstrak belum diisi oleh pengusul.";
  document.getElementById('dossierBidangStrategis').textContent = prop.bidangStrategis || "Pangan & Pertanian";
  document.getElementById('dossierMetode').textContent = prop.metode || "Eksperimental";
  document.getElementById('dossierNaskahNamaFile').textContent = prop.naskahFile || "Proposal_RisetMu_Lengkap.pdf";

  // Luaran
  const luaranContainer = document.getElementById('dossierLuaranList');
  if (luaranContainer && prop.targetLuaran) {
    luaranContainer.innerHTML = prop.targetLuaran.map(l => `
      <div class="dossier-luaran-item">
        <i class="fa-solid fa-check-circle" style="color: #16a34a; margin-top: 2px;"></i>
        <span>${l}</span>
      </div>
    `).join('');
  }

  // RAB Table
  const rabBody = document.getElementById('dossierRabTableBody');
  if (rabBody && prop.rabBreakdown) {
    let rowsHtml = prop.rabBreakdown.map((item, idx) => `
      <tr>
        <td style="text-align: center; color: #64748b;">${idx + 1}</td>
        <td><strong style="color: #0f172a;">${item.kategori}</strong></td>
        <td>${item.detail}</td>
        <td style="text-align: right; font-weight: 700; color: #0284c7;">${item.biaya}</td>
      </tr>
    `).join('');

    rowsHtml += `
      <tr class="dossier-rab-total-row">
        <td colspan="3" style="text-align: right; padding-right: 14px; text-transform: uppercase;">Total Usulan Dana:</td>
        <td style="text-align: right; font-size: 0.95rem; color: #0f172a;">${prop.dana}</td>
      </tr>
    `;
    rabBody.innerHTML = rowsHtml;
  }

  // Dokumen Pendukung
  const docContainer = document.getElementById('dossierDocList');
  if (docContainer && prop.dokumenPendukung) {
    docContainer.innerHTML = prop.dokumenPendukung.map(doc => `
      <div class="dossier-doc-card">
        <div class="dossier-doc-info">
          <i class="fa-solid fa-file-shield" style="color: #0284c7;"></i>
          <div>
            <strong style="font-size: 0.82rem; color: #0f172a; display: block;">${doc.nama}</strong>
            <small style="color: #16a34a; font-weight: 600;"><i class="fa-solid fa-circle-check"></i> ${doc.status}</small>
          </div>
        </div>
        <button type="button" class="btn-subnav-action" onclick="showToast('Membuka file: ${doc.file}', 'info')" style="padding: 4px 8px; font-size: 0.72rem;">
          <i class="fa-solid fa-eye"></i> Lihat
        </button>
      </div>
    `).join('');
  }
}

// Render Komposisi Tim Peneliti (Dengan Fitur Double-Blind Review)
function renderTimPeneliti(prop) {
  const container = document.getElementById('dossierTimContainer');
  if (!container) return;

  const ketuaDisplay = isBlindReviewHidden
    ? '<span style="background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 4px; font-style: italic;"><i class="fa-solid fa-user-secret"></i> [Identitas Ketua Disamarkan demi Objektivitas Review]</span>'
    : `<strong style="color: #0284c7;">${prop.ketuaAsli}</strong>`;

  const anggotaDosenDisplay = isBlindReviewHidden
    ? '<span style="color: #64748b; font-style: italic;">[2 Dosen Anggota Disamarkan]</span>'
    : (prop.anggotaDosen || []).join(', ');

  const anggotaMhsDisplay = isBlindReviewHidden
    ? '<span style="color: #64748b; font-style: italic;">[2 Mahasiswa Pembantu Disamarkan]</span>'
    : (prop.anggotaMhs || []).join(', ');

  container.innerHTML = `
    <div style="margin-bottom: 4px;"><strong>Ketua Peneliti:</strong> ${ketuaDisplay}</div>
    <div style="margin-bottom: 4px;"><strong>Dosen Anggota:</strong> ${anggotaDosenDisplay}</div>
    <div><strong>Mahasiswa Pembantu:</strong> ${anggotaMhsDisplay}</div>
  `;

  // Update badge & toggle button text
  const blindBadge = document.getElementById('dossierBlindStatus');
  const toggleBtnText = document.getElementById('btnBlindToggleText');
  if (blindBadge && toggleBtnText) {
    if (isBlindReviewHidden) {
      blindBadge.innerHTML = '<i class="fa-solid fa-user-secret"></i> Double-Blind Review Aktif';
      blindBadge.className = 'badge-blind-review';
      toggleBtnText.textContent = 'Buka Samaran';
    } else {
      blindBadge.innerHTML = '<i class="fa-solid fa-unlock"></i> Identitas Dosen Terbuka';
      blindBadge.className = 'badge-scheme-tag';
      toggleBtnText.textContent = 'Samarkan Lagi';
    }
  }
}

// Toggle buka/tutup samaran identitas pengusul
function toggleBlindReviewRevealer() {
  isBlindReviewHidden = !isBlindReviewHidden;
  const prop = REVIEW_PROPOSALS[currentReviewId];
  if (prop) renderTimPeneliti(prop);
  showToast(isBlindReviewHidden ? 'Mode Blind Review diaktifkan (nama disamarkan).' : 'Identitas pengusul dibuka untuk reviewer.', 'info');
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

  const displayEl = document.getElementById('totalScoreDisplay');
  if (displayEl) displayEl.textContent = formatted;

  const tabBadgeEl = document.getElementById('modalTabBadgeScore');
  if (tabBadgeEl) tabBadgeEl.textContent = `Skor: ${formatted}`;

  const verdict = document.getElementById('verdictDisplay');
  if (verdict) {
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
}

// Simpan Draf
function saveDraftPenilaian() {
  const prop = REVIEW_PROPOSALS[currentReviewId];
  if (prop) {
    prop.scores.c1 = parseFloat(document.getElementById('scoreC1').value) || 0;
    prop.scores.c2 = parseFloat(document.getElementById('scoreC2').value) || 0;
    prop.scores.c3 = parseFloat(document.getElementById('scoreC3').value) || 0;
    prop.scores.c4 = parseFloat(document.getElementById('scoreC4').value) || 0;
    prop.notes.c1 = document.getElementById('catatanC1').value;
    prop.notes.c2 = document.getElementById('catatanC2').value;
    prop.notes.c3 = document.getElementById('catatanC3').value;
    prop.notes.c4 = document.getElementById('catatanC4').value;
    prop.notes.general = document.getElementById('catatanUmum').value;
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
    prop.notes.general = document.getElementById('catatanUmum').value;
  }

  closeModalPenilaian();
  showToast('Penilaian berhasil dikirimkan ke Komite LPPM UMSU!', 'success');

  // Perbarui UI pada kartu
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
