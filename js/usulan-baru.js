/**
 * Modul Pengajuan Usulan Baru Penelitian - LPPM UMSU & RisetMu
 * Sesuai format resmi Portal BIMA / RisetMu Tahap 1: Identitas Usulan
 * File: js/usulan-baru.js
 */

// Data Taksonomi Riset Resmi RisetMu / BIMA
const researchData = {
  bidangFokus: {
    "Pertahanan dan Keamanan": {
      temas: {
        "Teknologi Pendukung Pertahanan & Keamanan": [
          "Sistem radar dan komunikasi taktis",
          "Keamanan siber dan proteksi data strategis",
          "Teknologi pengawasan maritim dan perbatasan"
        ]
      }
    },
    "Produk rekayasa keteknikan": {
      temas: {
        "Pengembangan infrastruktur TIK": [
          "Pengembangan aplikasi sistem cerdas",
          "Machine Learning untuk klasifikasi dan prediksi",
          "Teknologi piranti TIK dan pendukung TIK"
        ],
        "Pengembangan sistem/platform berbasis Open Source": [
          "Pengembangan platform cloud & big data open source",
          "Integrasi middleware sistem enterprise"
        ],
        "Teknologi untuk Peningkatan Konten TIK": [
          "Computer Vision untuk analisis citra medis & dokumen",
          "Natural Language Processing untuk teks bahasa Indonesia"
        ],
        "Pengembangan sistem berbasis kecerdasan buatan": [
          "Pengembangan aplikasi sistem cerdas",
          "Machine Learning untuk klasifikasi dan prediksi",
          "Sistem cerdas Internet of Things (IoT)"
        ],
        "Teknologi dan manajemen bencana hidrometeorologi": [
          "Sistem peringatan dini banjir berbasis sensor IoT",
          "Pemodelan hidrologi dan mitigasi bencana daerah aliran sungai"
        ],
        "Teknologidan manajemen bencana kebakaran lahan dan hutan": [
          "Deteksi dini hotspot menggunakan citra satelit dan drone",
          "Sistem pemantauan kelembaban gambut otomatis"
        ]
      }
    },
    "Kemaritiman": {
      temas: {
        "Teknologi dan Pengelolaan Kemaritiman": [
          "Teknologi penangkapan dan budidaya laut berkelanjutan",
          "Instrumentasi oseanografi dan navigasi maritim",
          "Mitigasi abrasi pantai dan konservasi mangrove"
        ]
      }
    },
    "Transportasi": {
      temas: {
        "Sistem Transportasi Cerdas & Berkelanjutan": [
          "Kendaraan listrik dan sistem manajemen baterai",
          "Sistem keselamatan dan manajemen lalu lintas cerdas",
          "Perencanaan transportasi terintegrasi dan ramah lingkungan"
        ]
      }
    },
    "Energi": {
      temas: {
        "Pemanfaatan Energi Surya & Biomassa": [
          "Sistem Pembangkit Listrik Tenaga Surya Fotovoltaik",
          "Konversi limbah kelapa sawit menjadi biofuel",
          "Optimasi penyimpanan energi berbasis baterai ramah lingkungan"
        ],
        "Efisiensi dan Konservasi Energi": [
          "Smart Grid dan integrasi energi terbarukan",
          "Sistem pengkondisian udara hemat energi untuk gedung",
          "Material termoelektrik untuk pemanenan energi panas"
        ]
      }
    },
    "Kesehatan": {
      temas: {
        "Penemuan Senyawa Bahan Alam Herbal": [
          "Ekstraksi senyawa bioaktif tanaman obat Sumatera Utara",
          "Uji efikasi ekstrak herbal untuk antioksidan dan antimikroba",
          "Formulasi sediaan nano-herbal untuk terapi suportif"
        ],
        "Sistem Penanganan Penyakit Menular & Stunting": [
          "Pola intervensi gizi terintegrasi untuk pencegahan stunting",
          "Epidemiologi dan surveilans berbasis komunitas digital",
          "Edukasi pola hidup sehat ibu hamil di wilayah pesisir"
        ]
      }
    },
    "Sosial Humaniora": {
      temas: {
        "Inovasi Media dan Model Pembelajaran Digital": [
          "Pengembangan blended learning adaptif di perguruan tinggi",
          "Integrasi AI dalam evaluasi capaian pembelajaran siswa",
          "Gamifikasi dan augmented reality untuk edukasi sains"
        ],
        "Pemberdayaan Masyarakat & Ekonomi Kreatif": [
          "Digitalisasi UMKM berbasis kearifan lokal",
          "Model pemberdayaan ekonomi perempuan di pedesaan",
          "Strategi ketahanan ekonomi keluarga pra-sejahtera"
        ]
      }
    },
    "Pangan": {
      temas: {
        "Peningkatan Produktivitas & Pemuliaan Tanaman Pangan": [
          "Pemanfaatan teknik radiasi untuk pencarian galur mutan unggul",
          "Pemuliaan tanaman dengan teknologi berbasis bioteknologi",
          "Pemuliaan tanaman teknik konvensional",
          "Pertanian lahan sub-optimal lahan basah",
          "Potensi tumbuhan dataran rendah kering sebagai sumber pangan",
          "Optimasi sistem pertanian tropis"
        ],
        "Pengolahan dan Pengawetan Hasil Pangan": [
          "Penguatan agroindustri berbahan baku sumber daya lokal",
          "Teknologi iradiasi pengawetan hasil pertanian",
          "Pengendalian hama terpadu berbasis agen hayati lokal"
        ]
      }
    }
  },

  rumpunIlmu: {
    "ILMU BAHASA": {
      level2: {
        "BAHASA DAN SASTRA": [
          "Sastra Indonesia",
          "Sastra Inggris",
          "Linguistik",
          "Pendidikan Bahasa dan Sastra"
        ],
        "BAHASA ASING LAINNYA": [
          "Bahasa Arab",
          "Bahasa Jepang",
          "Bahasa Mandarin"
        ]
      }
    },
    "ILMU EKONOMI": {
      level2: {
        "EKONOMI DAN BISNIS": [
          "Manajemen",
          "Akuntansi",
          "Ekonomi Pembangunan",
          "Bisnis Digital",
          "Perbankan dan Keuangan Syariah"
        ]
      }
    },
    "ILMU SOSIAL HUMANIORA": {
      level2: {
        "ILMU SOSIAL DAN POLITIK": [
          "Ilmu Komunikasi",
          "Administrasi Publik",
          "Sosiologi",
          "Hubungan Internasional"
        ],
        "ILMU HUKUM": [
          "Hukum Tata Negara",
          "Hukum Pidana & Siber",
          "Hukum Perdata & Bisnis"
        ],
        "ILMU PENDIDIKAN": [
          "Teknologi Pendidikan",
          "Pendidikan Guru Sekolah Dasar (PGSD)",
          "Bimbingan dan Konseling"
        ]
      }
    },
    "MATEMATIKA DAN ILMU PENGETAHUAN ALAM (MIPA)": {
      level2: {
        "MATEMATIKA DAN STATISTIKA": [
          "Matematika Terapan",
          "Statistika & Sains Data",
          "Aktuaria"
        ],
        "ILMU KIMIA DAN FISIKA": [
          "Kimia Bahan Alam",
          "Fisika Material & Energi",
          "Instrumentasi dan Elektronika Nuklir"
        ],
        "BIOLOGI DAN LINGKUNGAN": [
          "Bioteknologi Lingkungan",
          "Mikrobiologi",
          "Ekologi & Biodiversitas"
        ]
      }
    },
    "ILMU TANAMAN": {
      level2: {
        "AGROTEKNOLOGI DAN HORTIKULTURA": [
          "Agronomi",
          "Ilmu Hama dan Penyakit Tanaman",
          "Ilmu Tanah dan Nutrisi Tanaman",
          "Bioteknologi Pemuliaan Tanaman"
        ]
      }
    },
    "ILMU HEWANI": {
      level2: {
        "PETERNAKAN DAN PERIKANAN": [
          "Nutrisi dan Pakan Ternak",
          "Produksi dan Pemuliaan Ternak",
          "Akuakultur dan Teknologi Perikanan",
          "Teknologi Hasil Ternak"
        ],
        "KEDOKTERAN HEWAN": [
          "Kesehatan Hewan & Zoonosis",
          "Klinik Veteriner"
        ]
      }
    },
    "ILMU KEDOKTERAN": {
      level2: {
        "KEDOKTERAN UMUM & SPESIALIS": [
          "Kedokteran Klinis & Biomedis",
          "Ilmu Kesehatan Anak",
          "Ilmu Penyakit Dalam",
          "Farmakologi & Terapi"
        ],
        "KESEHATAN MASYARAKAT DAN GIZI": [
          "Epidemiologi dan Biostatistika",
          "Ilmu Gizi Masyarakat & Stunting",
          "Administrasi dan Kebijakan Kesehatan",
          "Kesehatan Lingkungan dan K3"
        ],
        "FARMASI": [
          "Farmasi Klinik & Komunitas",
          "Teknologi Farmasi Herbal"
        ]
      }
    },
    "ILMU TEKNIK": {
      level2: {
        "TEKNIK ELEKTRO DAN INFORMATIKA": [
          "Sistem Informasi",
          "Teknik Informatika",
          "Ilmu Komputer",
          "Teknik Komputer",
          "Rekayasa Perangkat Lunak",
          "Teknik Elektro Telekomunikasi"
        ],
        "TEKNIK SIPIL DAN PERENCANAAN": [
          "Teknik Sipil",
          "Teknik Arsitektur",
          "Perencanaan Wilayah dan Kota (PWK)",
          "Teknik Lingkungan"
        ],
        "TEKNIK MESIN DAN INDUSTRI": [
          "Teknik Mesin",
          "Teknik Industri",
          "Rekayasa Manufaktur & Material",
          "Teknik Metalurgi"
        ]
      }
    }
  },

  skemaDana: {
    "Penelitian Fundamental Reguler": 35000000,
    "Penelitian Kerjasama Antar Perguruan Tinggi": 50000000,
    "Penelitian Pascasarjana Magister": 25000000,
    "Penelitian Dosen Pemula (PDP)": 20000000,
    "Penelitian Terapan Unggulan": 45000000
  }
};

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  initPortalSelects();
  initPortalModals();
  restoreSavedDraft();
});

// =============================================================================
// 1. SELECTS & CASCADING DROPDOWNS
// =============================================================================
function initPortalSelects() {
  const selectBidang = document.getElementById('selectBidangFokus');
  const selectTema = document.getElementById('selectTemaPenelitian');
  const selectTopik = document.getElementById('selectTopikPenelitian');

  const selectRumpun1 = document.getElementById('selectRumpun1');
  const selectRumpun2 = document.getElementById('selectRumpun2');
  const selectRumpun3 = document.getElementById('selectRumpun3');

  const selectRuangLingkup = document.getElementById('selectRuangLingkup');
  const inputBesaranDana = document.getElementById('inputBesaranDana');

  // Skema & Ruang Lingkup Plafon Dana
  if (selectRuangLingkup && inputBesaranDana) {
    selectRuangLingkup.addEventListener('change', () => {
      const dana = researchData.skemaDana[selectRuangLingkup.value] || 0;
      inputBesaranDana.value = dana.toLocaleString('id-ID');
      inputBesaranDana.classList.remove('readonly-input');
    });
  }

  // Cascading Bidang Fokus -> Tema -> Topik
  if (selectBidang && selectTema && selectTopik) {
    selectBidang.addEventListener('change', () => {
      const bidang = selectBidang.value;
      selectTema.innerHTML = '<option value="">Pilih Tema Penelitian</option>';
      selectTopik.innerHTML = '<option value="">Pilih Topik Penelitian</option>';

      if (bidang && researchData.bidangFokus[bidang]) {
        const temas = Object.keys(researchData.bidangFokus[bidang].temas);
        temas.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          selectTema.appendChild(opt);
        });
      } else {
        selectTema.innerHTML = '<option value="">Pilih Bidang Fokus</option>';
      }
    });

    selectTema.addEventListener('change', () => {
      const bidang = selectBidang.value;
      const tema = selectTema.value;
      selectTopik.innerHTML = '<option value="">Pilih Topik Penelitian</option>';

      if (bidang && tema && researchData.bidangFokus[bidang]?.temas[tema]) {
        const topiks = researchData.bidangFokus[bidang].temas[tema];
        topiks.forEach(top => {
          const opt = document.createElement('option');
          opt.value = top;
          opt.textContent = top;
          selectTopik.appendChild(opt);
        });
      }
    });
  }

  // Cascading Rumpun Ilmu Level 1 -> Level 2 -> Level 3
  if (selectRumpun1 && selectRumpun2 && selectRumpun3) {
    selectRumpun1.addEventListener('change', () => {
      const r1 = selectRumpun1.value;
      selectRumpun2.innerHTML = '<option value="">Pilih Rumpun Ilmu Level 2</option>';
      selectRumpun3.innerHTML = '<option value="">Pilih Rumpun Ilmu Level 3</option>';

      if (r1 && researchData.rumpunIlmu[r1]) {
        const level2Keys = Object.keys(researchData.rumpunIlmu[r1].level2 || {});
        level2Keys.forEach(l2 => {
          const opt = document.createElement('option');
          opt.value = l2;
          opt.textContent = l2;
          selectRumpun2.appendChild(opt);
        });
      }
    });

    selectRumpun2.addEventListener('change', () => {
      const r1 = selectRumpun1.value;
      const r2 = selectRumpun2.value;
      selectRumpun3.innerHTML = '<option value="">Pilih Rumpun Ilmu Level 3</option>';

      if (r1 && r2 && researchData.rumpunIlmu[r1]?.level2[r2]) {
        const level3List = researchData.rumpunIlmu[r1].level2[r2];
        level3List.forEach(l3 => {
          const opt = document.createElement('option');
          opt.value = l3;
          opt.textContent = l3;
          selectRumpun3.appendChild(opt);
        });
      }
    });
  }
}

// =============================================================================
// 2. MODAL & DIALOG INTERACTIONS (ELIGIBILITAS, TKT, ANGGOTA)
// =============================================================================
function initPortalModals() {
  // Pastikan container modal tersedia di halaman
  let modalContainer = document.getElementById('portalModalContainer');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'portalModalContainer';
    modalContainer.className = 'portal-modal-backdrop';
    modalContainer.style.display = 'none';
    document.body.appendChild(modalContainer);

    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        closePortalModal();
      }
    });
  }
}

function openPortalModal(title, bodyHtml, footerButtonsHtml = '', customMaxWidth = '560px') {
  const container = document.getElementById('portalModalContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="portal-modal-card" style="max-width: ${customMaxWidth}; width: 100%;">
      <div class="portal-modal-header" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; background: #ffffff;">
        <h4 class="portal-modal-title" style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #0f172a;">${title}</h4>
        <button type="button" class="portal-modal-close" onclick="closePortalModal()">&times;</button>
      </div>
      <div class="portal-modal-body" style="padding: 18px 20px; max-height: 82vh; overflow-y: auto;">
        ${bodyHtml}
      </div>
      ${footerButtonsHtml ? `<div class="portal-modal-footer" style="padding: 12px 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; background: #f8fafc;">${footerButtonsHtml}</div>` : ''}
    </div>
  `;

  container.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closePortalModal() {
  const container = document.getElementById('portalModalContainer');
  if (container) {
    container.style.display = 'none';
    container.innerHTML = '';
  }
  document.body.style.overflow = '';
}

// -----------------------------------------------------------------------------
// Modul: Info Eligibilitas (Sesuai Gambar BIMA / SIMLITABMAS Kemdikbud)
// -----------------------------------------------------------------------------
function showModalEligibilitas() {
  initPortalModals();

  const titleHtml = `
    <span style="display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: #1e293b; font-size: 1.05rem;">
      <i class="fa-solid fa-circle-info" style="color: #1e3a8a; font-size: 1.15rem;"></i>
      <span>Info Eligibilitas</span>
    </span>
  `;

  const bodyHtml = `
    <div class="eligibilitas-modal-content" style="font-size: 0.88rem; color: #1e293b;">
      
      <!-- 1. SKEMA YANG ELIGIBLE -->
      <div class="elig-group">
        <div class="elig-header-box elig-header-eligible" onclick="toggleEligSection('eligibleList', 'chevronEligible')" title="Klik untuk ciutkan / bentangkan">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.05rem;"></i>
            <span style="font-weight: 700; color: #1e293b; font-size: 0.88rem;">Skema yang Eligible</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="elig-counter-badge elig-badge-green">2</span>
            <i class="fa-solid fa-chevron-up" id="chevronEligible" style="color: #334155; font-size: 0.8rem; transition: transform 0.2s;"></i>
          </div>
        </div>

        <div id="eligibleList" class="elig-list-container">
          <div class="elig-item-card elig-item-blue">
            Penelitian Kerjasama Luar Negeri - ISPF
          </div>
          <div class="elig-item-card elig-item-blue">
            Penelitian Kerjasama Luar Negeri - NWO
          </div>
        </div>
      </div>

      <!-- 2. SKEMA YANG TIDAK ELIGIBLE -->
      <div class="elig-group">
        <div class="elig-header-box elig-header-ineligible" onclick="toggleEligSection('ineligibleList', 'chevronIneligible')" title="Klik untuk ciutkan / bentangkan">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-circle-xmark" style="color: #ef4444; font-size: 1.05rem;"></i>
            <span style="font-weight: 700; color: #1e293b; font-size: 0.88rem;">Skema yang Tidak Eligible</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="elig-counter-badge elig-badge-red">2</span>
            <i class="fa-solid fa-chevron-up" id="chevronIneligible" style="color: #334155; font-size: 0.8rem; transition: transform 0.2s;"></i>
          </div>
        </div>

        <div id="ineligibleList" class="elig-list-container">
          <!-- Item 1 -->
          <div class="elig-item-card elig-item-yellow">
            <span style="color: #1e293b; font-size: 0.86rem; font-weight: 500;">Pusat Unggulan Iptek Perguruan Tinggi</span>
            <button type="button" class="btn-elig-detail" onclick="showDetailIneligible('pui_pt')">
              Detail
            </button>
          </div>
          <!-- Item 2 -->
          <div class="elig-item-card elig-item-yellow">
            <span style="color: #1e293b; font-size: 0.86rem; font-weight: 500;">Penelitian Terapan - Luaran Model</span>
            <button type="button" class="btn-elig-detail" onclick="showDetailIneligible('terapan_model')">
              Detail
            </button>
          </div>
        </div>
      </div>

    </div>
  `;

  const footerHtml = `
    <button type="button" class="btn-modal-tutup" onclick="closePortalModal()">
      Tutup
    </button>
  `;

  openPortalModal(titleHtml, bodyHtml, footerHtml, '540px');
}

// -----------------------------------------------------------------------------
// Modul: Perhitungan TKT Resmi BIMA Kemdikbudristek (Tingkat Kesiapterapan Teknologi)
// -----------------------------------------------------------------------------
const tktIndicatorsCatalog = {
  "TIK - Software": {
    1: [
      "Merupakan ranah baru dalam perangkat lunak yang sedang didalami oleh komunitas riset dasar",
      "Merupakan tingkat terendah dari kesiapan teknologi perangkat lunak",
      "Mencakup juga pengembangan dari penggunaan tingkat dasar, sifat dasar dari arsitektur perangkat lunak, formulasi matematika, konsep perangkat yang dapat direalisasikan, kajian prinsip dasar perangkat lunak, prinsip ilmiah, formulasi hipotesis riset, dan algoritma umum"
    ],
    2: [
      "Setelah prinsip dasar teramati, berlanjut pada pembuatan aplikasi yang bersifat praktis",
      "Aplikasi bersifat spekulatif, dan terdapat kemungkinan tidak memiliki bukti atau analisis rinci untuk mendukung asumsi yang ada/dilakukan",
      "Contoh-contoh dibatasi pada studi analitik dengan menggunakan data sintetis (buatan)",
      "Pengguna/customer sudah dapat diidentifikasi, penerapan sistem atau subsistem sudah diidentifikasi.",
      "Studi kelayakan aplikasi perangkat lunak.",
      "Solusi desain empiris maupun teoritis sudah diidentifikasi.",
      "Komponen teknologi secara parsial sudah dikarakterisasi.",
      "Prediksi kinerja setiap elemen sudah dibuat",
      "Telah dilakukan kajian kesan/minat pengguna/customer terhadap perangkat lunak."
    ],
    3: [
      "Terdapat pemodelan sistem atau simulasi perangkat lunak untuk membuktikan kelayakan desain.",
      "Algoritma telah dikonversi menjadi kode perangkat lunak awal (prototipe laboratorium).",
      "Pengujian analitis dan eksperimental telah membuktikan konsep dasar (Proof of Concept).",
      "Komponen piranti lunak secara terpisah telah diuji pada lingkungan terbatas."
    ],
    4: [
      "Komponen perangkat lunak dasar telah terintegrasi untuk bekerja sama.",
      "Arsitektur perangkat lunak awal telah terpasang dan diuji coba dengan data riil skala kecil.",
      "Kesiapan integrasi sistem menunjukkan kesesuaian dengan persyaratan pengguna."
    ]
  },
  "Kesehatan - Farmasi/Obat": {
    1: [
      "Kajian pustaka dan identifikasi target biologis/senyawa aktif telah lengkap.",
      "Formulasi hipotesis awal mekanisme aksi pengobatan telah dirumuskan."
    ],
    2: [
      "Skrining in vitro dan sintesis kandidat senyawa skala laboratorium telah dimulai.",
      "Karakterisasi awal struktur kimia dan sifat fisikokimia bahan telah terdefinisi."
    ],
    3: [
      "Uji efikasi in vitro membuktikan Proof of Concept.",
      "Uji toksisitas seluler awal telah menunjukkan profil keamanan kandidat."
    ]
  },
  "Pertanian / Pangan": {
    1: [
      "Prinsip dasar biologi/agronomi telah diobservasi dan dilaporkan.",
      "Karakteristik genetik atau sifat fisiologis awal telah diidentifikasi."
    ],
    2: [
      "Formulasi konsep rekayasa varietas atau teknologi budidaya telah disusun.",
      "Aplikasi praktis pemuliaan atau pengolahan telah teridentifikasi."
    ],
    3: [
      "Uji coba laboratorium atau rumah kaca skala kecil menunjukkan pembuktian konsep (PoC)."
    ]
  },
  "Produk Rekayasa Keteknikan": {
    1: [
      "Prinsip dasar ilmiah fenomena fisika/material telah diamati dan dicatat.",
      "Kajian teoritis dan perumusan matematis model rekayasa telah lengkap."
    ],
    2: [
      "Formulasi aplikasi teknologi dan konsep desain teknik telah terdefinisi.",
      "Karakterisasi awal komponen mekanik/elektronika telah diidentifikasi."
    ],
    3: [
      "Pembuktian konsep fungsi mekanis/elektris melalui eksperimen analitis laboratorium."
    ]
  }
};

let currentTktState = {
  kategori: "TIK - Software",
  level: 2,
  teknologi: "Sistem Informasi Rekomendasi Terintegrasi",
  percentages: {}
};

function showModalUkurTkt() {
  const currentVal = parseInt(document.getElementById('inputTktSaatIni')?.value) || 2;
  currentTktState.level = currentVal >= 1 && currentVal <= 9 ? currentVal : 2;

  const html = `
    <div style="font-size: 0.82rem; line-height: 1.5; color: #1e293b;">
      <!-- Grid Top Inputs: Teknologi & Kategori Indikator -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div>
          <label style="display: flex; align-items: center; gap: 5px; font-weight: 600; margin-bottom: 5px; color: #1e293b;">
            Teknologi yang dikembangkan
            <i class="fa-solid fa-circle-question" style="color: #64748b; font-size: 11px; cursor: pointer;" title="Tuliskan nama teknologi, sistem, atau perangkat yang dikembangkan"></i>
          </label>
          <input type="text" id="modalTktTeknologiInput" class="portal-input" value="${currentTktState.teknologi}" placeholder="Contoh: Sistem AI / Software Web" style="width: 100%;">
        </div>

        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1e293b;">
            Kategori Indikator TKT
          </label>
          <select id="modalTktKategoriSelect" class="portal-select" style="width: 100%;" onchange="onTktKategoriChanged(this.value)">
            <option value="">Pilih Kategori Indikator TKT</option>
            <option value="TIK - Software" ${currentTktState.kategori === 'TIK - Software' ? 'selected' : ''}>TIK - Software</option>
            <option value="Kesehatan - Farmasi/Obat" ${currentTktState.kategori === 'Kesehatan - Farmasi/Obat' ? 'selected' : ''}>Kesehatan - Farmasi/Obat</option>
            <option value="Pertanian / Pangan" ${currentTktState.kategori === 'Pertanian / Pangan' ? 'selected' : ''}>Pertanian / Pangan</option>
            <option value="Produk Rekayasa Keteknikan" ${currentTktState.kategori === 'Produk Rekayasa Keteknikan' ? 'selected' : ''}>Produk Rekayasa Keteknikan</option>
          </select>
        </div>
      </div>

      <!-- Section Capaian Indikator TKT -->
      <div style="margin-bottom: 10px;">
        <h5 style="margin: 0 0 8px 0; font-size: 0.85rem; font-weight: 700; color: #0f172a;">Capaian Indikator TKT</h5>
        <div id="tktDynamicContainer">
          ${getTktDynamicContentHtml()}
        </div>
      </div>
    </div>
  `;

  openPortalModal(
    'Perhitungan TKT',
    html,
    `
      <button type="button" class="btn-portal-save" style="border: 1px solid #ef4444; color: #ef4444; background: #ffffff; padding: 7px 20px; font-weight: 600;" onclick="closePortalModal()">Tutup</button>
      <button type="button" class="btn-portal-next" style="background: #1d4ed8; color: #ffffff; padding: 7px 24px; font-weight: 600;" onclick="selesaiHitungTkt()">Selesai</button>
    `,
    '820px'
  );
}

function onTktKategoriChanged(kategori) {
  currentTktState.kategori = kategori;
  currentTktState.percentages = {};
  const container = document.getElementById('tktDynamicContainer');
  if (container) {
    container.innerHTML = getTktDynamicContentHtml();
  }
}

function getTktDynamicContentHtml() {
  const kat = currentTktState.kategori;
  if (!kat) {
    return `
      <div style="background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 6px; padding: 12px 16px; color: #0284c7; display: flex; align-items: center; gap: 8px; font-size: 0.82rem;">
        <i class="fa-solid fa-circle-info"></i>
        <span>Silakan pilih Kategori Indikator TKT terlebih dahulu, untuk melanjutkan perhitungan.</span>
      </div>
    `;
  }

  const levelData = (tktIndicatorsCatalog[kat] && tktIndicatorsCatalog[kat][currentTktState.level]) || tktIndicatorsCatalog["TIK - Software"][2];

  let rowsHtml = '';
  levelData.forEach((desc, idx) => {
    const no = idx + 1;
    const currentPercent = currentTktState.percentages[no] || '0%';
    rowsHtml += `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="text-align: center; vertical-align: top; padding: 10px 8px; color: #64748b;">${no}</td>
        <td style="vertical-align: top; padding: 10px 12px; color: #1e293b; line-height: 1.45;">${desc}</td>
        <td style="text-align: center; vertical-align: top; padding: 8px 10px; width: 115px;">
          <select class="portal-select" style="width: 100%; padding: 5px 8px; font-size: 0.8rem;" onchange="onTktPercentChange(${no}, this.value)">
            <option value="0%" ${currentPercent === '0%' ? 'selected' : ''}>0%</option>
            <option value="20%" ${currentPercent === '20%' ? 'selected' : ''}>20%</option>
            <option value="40%" ${currentPercent === '40%' ? 'selected' : ''}>40%</option>
            <option value="60%" ${currentPercent === '60%' ? 'selected' : ''}>60%</option>
            <option value="80%" ${currentPercent === '80%' ? 'selected' : ''}>80%</option>
            <option value="100%" ${currentPercent === '100%' ? 'selected' : ''}>100%</option>
          </select>
        </td>
      </tr>
    `;
  });

  return `
    <div>
      <!-- Banner Status Level -->
      <div style="background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 6px; padding: 10px 14px; color: #0284c7; display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-circle-info"></i>
          <span>Level TKT saat ini <strong><span id="tktCurrentLevelNum">${currentTktState.level}</span> dari 9</strong></span>
        </div>
        <!-- Pilihan Level Tab Cepat -->
        <div style="display: flex; gap: 4px;">
          ${[1, 2, 3, 4, 5, 6].map(lvl => `
            <button type="button" onclick="switchTktLevel(${lvl})" style="border: 1px solid ${currentTktState.level === lvl ? '#0284c7' : '#cbd5e1'}; background: ${currentTktState.level === lvl ? '#0284c7' : '#ffffff'}; color: ${currentTktState.level === lvl ? '#ffffff' : '#475569'}; border-radius: 4px; padding: 2px 7px; font-size: 0.73rem; cursor: pointer; font-weight: 600;">
              L${lvl}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Action Button Reset -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
        <button type="button" onclick="resetTktIndicators()" style="background: #f59e0b; color: #ffffff; border: none; border-radius: 6px; padding: 6px 18px; font-weight: 600; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
          <i class="fa-solid fa-rotate-left"></i> Reset
        </button>
      </div>

      <!-- Table Indikator -->
      <div style="border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #475569; font-weight: 600;">
              <th style="width: 45px; text-align: center; padding: 10px 8px;">No</th>
              <th style="text-align: left; padding: 10px 12px;">Indikator</th>
              <th style="width: 120px; text-align: center; padding: 10px 10px;">Presentase (%)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function switchTktLevel(level) {
  currentTktState.level = level;
  currentTktState.percentages = {};
  const container = document.getElementById('tktDynamicContainer');
  if (container) {
    container.innerHTML = getTktDynamicContentHtml();
  }
}

function onTktPercentChange(no, val) {
  currentTktState.percentages[no] = val;
}

function resetTktIndicators() {
  currentTktState.percentages = {};
  const container = document.getElementById('tktDynamicContainer');
  if (container) {
    container.innerHTML = getTktDynamicContentHtml();
  }
  showToast('Indikator TKT direset ke 0%', 'info');
}

function selesaiHitungTkt() {
  const tekInput = document.getElementById('modalTktTeknologiInput');
  if (tekInput && tekInput.value.trim()) {
    currentTktState.teknologi = tekInput.value.trim();
  }

  const inputSaatIni = document.getElementById('inputTktSaatIni');
  const inputTarget = document.getElementById('inputTargetTkt');

  const levelVal = currentTktState.level || 2;
  const targetVal = Math.min(levelVal + 2, 9);

  if (inputSaatIni) inputSaatIni.value = levelVal;
  if (inputTarget) inputTarget.value = targetVal;

  closePortalModal();
  showToast(`Perhitungan TKT Selesai! TKT Saat Ini diatur ke Level ${levelVal}, Target Akhir TKT Level ${targetVal}`, 'success');
}

// -----------------------------------------------------------------------------
// Modul: Tambah Anggota Dosen (1.3) - Searchable Combobox
// -----------------------------------------------------------------------------
const DAFTAR_DOSEN_ANGGOTA = [
  { nama: 'Dr. Al-Khawarizmi, M.Kom.', nidn: '0112348901', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Sistem Informasi', tipe: 'umsu' },
  { nama: 'Fachruddin, S.T., M.T.', nidn: '0122998877', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Teknik Elektro', tipe: 'umsu' },
  { nama: 'Dr. Rahmad Syah, M.Kom.', nidn: '0105058801', institusi: 'Universitas Medan Area', prodi: 'Ilmu Komputer', tipe: 'mitra' },
  { nama: 'Dr. Emilda Sary, S.T., M.Eng.', nidn: '0115088201', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Teknik Sipil', tipe: 'umsu' },
  { nama: 'Dr. Ade Faisal, S.T., M.Sc.', nidn: '0123047601', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Teknik Sipil', tipe: 'umsu' },
  { nama: 'Prof. Dr. Agussani, M.AP.', nidn: '0114086201', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Ilmu Administrasi', tipe: 'umsu' },
  { nama: 'Dr. Muhammad Qorib, M.A.', nidn: '0117097401', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Studi Islam', tipe: 'umsu' },
  { nama: 'Dr. Rudianto, M.Si.', nidn: '0112057701', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Ilmu Komunikasi', tipe: 'umsu' },
  { nama: 'Dr. Elviera Zahara, S.E., M.Si.', nidn: '0104037501', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Manajemen', tipe: 'umsu' },
  { nama: 'Ahmad Syauqi, S.Kom., M.Cs.', nidn: '0127088902', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Teknologi Informasi', tipe: 'umsu' },
  { nama: 'Dr. Ir. Hj. Siti Mardiana, M.Si.', nidn: '0108096301', institusi: 'Universitas Sumatera Utara', prodi: 'Pertanian', tipe: 'mitra' },
  { nama: 'Dr. Syahril, M.Hum.', nidn: '0115047802', institusi: 'Universitas Negeri Medan', prodi: 'Pendidikan Bahasa', tipe: 'mitra' },
  { nama: 'Dr. Rini Astuti, S.E., M.M.', nidn: '0120067901', institusi: 'Universitas Muhammadiyah Sumatera Utara', prodi: 'Akuntansi', tipe: 'umsu' },
  { nama: 'Dr. Hendra Cipta, M.Si.', nidn: '0106078301', institusi: 'UIN Sumatera Utara', prodi: 'Matematika', tipe: 'mitra' }
];

let selectedDosenItem = null;
let currentDosenHighlightIndex = -1;

function renderDosenOptions(filterText = '') {
  const container = document.getElementById('dosenDropdownList');
  if (!container) return;

  const q = (filterText || '').toLowerCase().trim();
  const filtered = DAFTAR_DOSEN_ANGGOTA.filter(d => 
    !q || 
    d.nama.toLowerCase().includes(q) || 
    d.nidn.includes(q) || 
    d.institusi.toLowerCase().includes(q) || 
    d.prodi.toLowerCase().includes(q)
  );

  currentDosenHighlightIndex = -1;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="dosen-empty-state">
        <i class="fa-solid fa-user-slash" style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 4px; display: block;"></i>
        Tidak ada dosen yang cocok dengan kata kunci "<strong>${filterText}</strong>".
      </div>
    `;
    return;
  }

      container.innerHTML = filtered.map((d, idx) => {
    const isSelected = selectedDosenItem && selectedDosenItem.nidn === d.nidn;
    const escapedValue = `${d.nama.toUpperCase()}|${d.nidn}|${d.institusi}`;

    return `
      <div class="dosen-item-option ${isSelected ? 'selected' : ''}" 
           data-index="${idx}"
           onclick="selectDosenOption('${d.nama.replace(/'/g, "\\'")}', '${d.nidn}', '${d.institusi.replace(/'/g, "\\'")}', '${escapedValue}')">
        <div class="dosen-item-info">
          <div class="dosen-item-name">${d.nama}</div>
          <div class="dosen-item-meta">
            <span>NIDN: ${d.nidn}</span>
            <span>•</span>
            <span>${d.prodi}</span>
          </div>
        </div>
        ${isSelected ? '<i class="fa-solid fa-check" style="color: #2563eb; font-size: 0.85rem;"></i>' : ''}
      </div>
    `;
  }).join('');
} // <--- Tanda kurung kurawal penutup ini yang tadi hilang!




function openDosenDropdown() {
  const dropdown = document.getElementById('dosenDropdownList');
  if (dropdown) {
    const searchInput = document.getElementById('dosenSearchInput');
    renderDosenOptions(searchInput ? searchInput.value : '');
    dropdown.style.display = 'block';
  }
}

function closeDosenDropdown() {
  const dropdown = document.getElementById('dosenDropdownList');
  if (dropdown) {
    dropdown.style.display = 'none';
  }
}

function filterDosenList(val) {
  openDosenDropdown();
  renderDosenOptions(val);
  const clearBtn = document.getElementById('dosenClearBtn');
  if (clearBtn) {
    clearBtn.style.display = val && val.trim() ? 'flex' : 'none';
  }
}

function selectDosenOption(nama, nidn, institusi, valueStr) {
  selectedDosenItem = { nama, nidn, institusi };
  
  const searchInput = document.getElementById('dosenSearchInput');
  const modalSelectDosen = document.getElementById('modalSelectDosen');
  const nidnInput = document.getElementById('modalNidnDosen');
  const clearBtn = document.getElementById('dosenClearBtn');

  if (searchInput) searchInput.value = `${nama} (NIDN: ${nidn})`;
  if (modalSelectDosen) modalSelectDosen.value = valueStr;
  if (nidnInput) nidnInput.value = nidn;
  if (clearBtn) clearBtn.style.display = 'flex';

  closeDosenDropdown();
}

function clearDosenSelection() {
  selectedDosenItem = null;
  const searchInput = document.getElementById('dosenSearchInput');
  const modalSelectDosen = document.getElementById('modalSelectDosen');
  const nidnInput = document.getElementById('modalNidnDosen');
  const clearBtn = document.getElementById('dosenClearBtn');

  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  if (modalSelectDosen) modalSelectDosen.value = '';
  if (nidnInput) nidnInput.value = '';
  if (clearBtn) clearBtn.style.display = 'none';

  renderDosenOptions('');
  openDosenDropdown();
}

function handleDosenKeyDown(e) {
  const dropdown = document.getElementById('dosenDropdownList');
  if (!dropdown || dropdown.style.display === 'none') {
    if (e.key === 'ArrowDown' || e.key === 'Enter') {
      openDosenDropdown();
      e.preventDefault();
    }
    return;
  }

  const items = dropdown.querySelectorAll('.dosen-item-option');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    currentDosenHighlightIndex = (currentDosenHighlightIndex + 1) % items.length;
    updateDosenHighlight(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    currentDosenHighlightIndex = (currentDosenHighlightIndex - 1 + items.length) % items.length;
    updateDosenHighlight(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (currentDosenHighlightIndex >= 0 && items[currentDosenHighlightIndex]) {
      items[currentDosenHighlightIndex].click();
    }
  } else if (e.key === 'Escape') {
    closeDosenDropdown();
  }
}

function updateDosenHighlight(items) {
  items.forEach((item, idx) => {
    if (idx === currentDosenHighlightIndex) {
      item.classList.add('highlighted');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('highlighted');
    }
  });
}

function showModalTambahDosen() {
  selectedDosenItem = null;
  const html = `
    <div style="font-size: 0.82rem; line-height: 1.5; color: #1e293b;">
      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">
          Pilih Dosen Anggota (UMSU / Mitra) <span style="color:red">*</span>
        </label>
        
        <!-- Searchable Dosen Combobox -->
        <div class="dosen-combobox-wrapper" id="dosenComboboxWrapper">
          <div class="dosen-combobox-input-wrap">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" 
                   id="dosenSearchInput" 
                   class="dosen-combobox-input" 
                   placeholder="Cari nama dosen, NIDN, atau prodi..." 
                   autocomplete="off"
                   onfocus="openDosenDropdown()"
                   oninput="filterDosenList(this.value)"
                   onkeydown="handleDosenKeyDown(event)">
            <button type="button" 
                    id="dosenClearBtn" 
                    class="dosen-combobox-clear" 
                    onclick="clearDosenSelection()" 
                    style="display: none;" 
                    title="Hapus / Reset Pilihan">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Dropdown Options List -->
          <div id="dosenDropdownList" class="dosen-combobox-dropdown" style="display: none;">
          </div>

          <!-- Hidden input for backward compatibility with submitTambahDosen() -->
          <input type="hidden" id="modalSelectDosen" value="">
        </div>
        <div style="font-size: 0.73rem; color: #64748b; margin-top: 5px; display: flex; align-items: center; gap: 4px;">
          <i class="fa-solid fa-circle-info" style="color: #2563eb;"></i> 
          <span>Ketik nama, NIDN, atau asal institusi/prodi untuk mencari tanpa scroll</span>
        </div>
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">NIDN <span style="color:red">*</span></label>
        <input type="text" id="modalNidnDosen" class="portal-input readonly-input" placeholder="Otomatis terisi saat dosen dipilih" readonly>
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">Peran dalam Penelitian <span style="color:red">*</span></label>
        <input type="text" class="portal-input readonly-input" value="Anggota Pengusul" readonly>
      </div>

      <div style="margin-bottom: 8px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">Deskripsi Tugas Spesifik <span style="color:red">*</span></label>
        <textarea id="modalTugasDosen" class="portal-input" style="height: 70px; resize: none; padding: 8px;" placeholder="Contoh: Mengembangkan modul akuisisi data dan pengujian algoritma machine learning"></textarea>
      </div>
    </div>
  `;

  openPortalModal(
    '<i class="fa-solid fa-user-plus" style="color: #2563eb; margin-right: 8px;"></i> Tambah Anggota Peneliti Dosen',
    html,
    `
      <button type="button" class="btn-portal-save" onclick="closePortalModal()">Batal</button>
      <button type="button" class="btn-portal-next" onclick="submitTambahDosen()">Simpan Anggota</button>
    `
  );

  // Setup click outside listener to close dropdown smoothly
  setTimeout(() => {
    const wrapper = document.getElementById('dosenComboboxWrapper');
    const onModalClick = (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        closeDosenDropdown();
      }
    };
    document.addEventListener('click', onModalClick);
  }, 100);
}

function submitTambahDosen() {
  const selectDosen = document.getElementById('modalSelectDosen');
  const txtTugas = document.getElementById('modalTugasDosen');
  const inputNidn = document.getElementById('modalNidnDosen');

  if (!selectDosen || !selectDosen.value) {
    showToast('Harap pilih dosen anggota terlebih dahulu!', 'warning');
    return;
  }

  const [nama, defaultNidn, institusi] = selectDosen.value.split('|');
  const nidn = (inputNidn && inputNidn.value.trim()) ? inputNidn.value.trim() : defaultNidn;
  const tugas = txtTugas ? txtTugas.value.trim() : '';

  const tableBody = document.querySelector('#tabelAnggotaDosen tbody');
  if (tableBody) {
    const rowCount = tableBody.querySelectorAll('tr').length + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center;">${rowCount}</td>
      <td>${nidn}</td>
      <td style="font-weight: 600;">${nama}</td>
      <td>Anggota Pengusul</td>
      <td>${institusi}</td>
      <td>${tugas || '-'}</td>
      <td style="text-align: center;">
        <span class="badge-portal-status status-menyetujui" style="background: #f59e0b;">Menunggu</span>
      </td>
      <td style="text-align: center;">
        <button type="button" class="btn-portal-edit" title="Hapus Anggota" style="border-color: #ef4444; color: #ef4444;" onclick="this.closest('tr').remove(); showToast('Anggota dosen dihapus');">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(tr);
    closePortalModal();
    showToast(`Dosen ${nama} berhasil ditambahkan sebagai Anggota Pengusul`, 'success');
  }
}

// -----------------------------------------------------------------------------
// Modul: Tambah Anggota Non Dosen (1.4)
// -----------------------------------------------------------------------------
function showModalTambahNonDosen() {
  const html = `
    <div style="font-size: 0.82rem; line-height: 1.5; color: #1e293b;">
      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">Jenis Anggota Non-Dosen <span style="color:red">*</span></label>
        <select id="modalJenisNonDosen" class="portal-select" style="width: 100%;">
          <option value="Mahasiswa">Mahasiswa</option>
          <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
          <option value="Praktisi / Industri">Praktisi / Industri</option>
        </select>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 4px;">ID Identitas (NIM) <span style="color:red">*</span></label>
          <input type="text" id="modalIdNonDosen" class="portal-input" placeholder="Contoh: 2109010045">
        </div>
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 4px;">Jenjang Pendidikan</label>
          <select id="modalJenjangNonDosen" class="portal-select">
            <option value="S1">S1 (Sarjana)</option>
            <option value="S2">S2 (Magister)</option>
            <option value="S3">S3 (Doktor)</option>
            <option value="D3/D4">Vokasi (D3/D4)</option>
            <option value="-">- Non Akademik -</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">Nama Lengkap <span style="color:red">*</span></label>
        <input type="text" id="modalNamaNonDosen" class="portal-input" placeholder="Nama lengkap anggota non dosen">
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">Institusi Asal</label>
        <input type="text" id="modalInstitusiNonDosen" class="portal-input" value="Universitas Muhammadiyah Sumatera Utara">
      </div>

      <div style="margin-bottom: 8px;">
        <label style="display: block; font-weight: 600; margin-bottom: 4px;">Tugas dalam Penelitian</label>
        <input type="text" id="modalTugasNonDosen" class="portal-input" placeholder="Contoh: Membantu pengujian aplikasi dan penyusunan instrumen">
      </div>
    </div>
  `;

  openPortalModal(
    '<i class="fa-solid fa-user-graduate" style="color: #2563eb; margin-right: 8px;"></i> Tambah Anggota Peneliti Non Dosen',
    html,
    `
      <button type="button" class="btn-portal-save" onclick="closePortalModal()">Batal</button>
      <button type="button" class="btn-portal-next" onclick="submitTambahNonDosen()">Simpan Anggota</button>
    `
  );
}

function submitTambahNonDosen() {
  const jenis = document.getElementById('modalJenisNonDosen')?.value || 'Mahasiswa';
  const idNon = document.getElementById('modalIdNonDosen')?.value.trim();
  const jenjang = document.getElementById('modalJenjangNonDosen')?.value || 'S1';
  const nama = document.getElementById('modalNamaNonDosen')?.value.trim();
  const inst = document.getElementById('modalInstitusiNonDosen')?.value.trim() || 'Universitas Muhammadiyah Sumatera Utara';
  const tugas = document.getElementById('modalTugasNonDosen')?.value.trim() || '-';

  if (!idNon || !nama) {
    showToast('Harap lengkapi ID Identitas (NIM/NIK) dan Nama Lengkap!', 'warning');
    return;
  }

  const tableBody = document.querySelector('#tabelAnggotaNonDosen tbody');
  if (tableBody) {
    const emptyRow = tableBody.querySelector('.portal-table-empty');
    if (emptyRow) {
      emptyRow.closest('tr').remove();
    }

    const rowCount = tableBody.querySelectorAll('tr').length + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center;">${rowCount}</td>
      <td>${idNon}</td>
      <td>${jenis}</td>
      <td>${jenjang}</td>
      <td style="font-weight: 600;">${nama}</td>
      <td>${inst}</td>
      <td>${tugas}</td>
      <td style="text-align: center;">
        <button type="button" class="btn-portal-edit" title="Hapus" style="border-color: #ef4444; color: #ef4444;" onclick="hapusRowNonDosen(this)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(tr);
    closePortalModal();
    showToast(`Anggota non-dosen ${nama} berhasil ditambahkan ke Bagian 1.4`, 'success');
  }
}

function hapusRowNonDosen(btn) {
  const tr = btn.closest('tr');
  const tableBody = document.querySelector('#tabelAnggotaNonDosen tbody');
  if (tr) tr.remove();
  if (tableBody && tableBody.querySelectorAll('tr').length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="portal-table-empty">
          Data tidak tersedia!
        </td>
      </tr>
    `;
  }
  showToast('Anggota non-dosen dihapus', 'info');
}

// -----------------------------------------------------------------------------
// Modul: Edit Tugas Ketua Pengusul
// -----------------------------------------------------------------------------
function showModalEditTugasKetua() {
  const ketuaRow = document.querySelector('#tabelAnggotaDosen tbody tr:first-child');
  const currentTugas = ketuaRow ? ketuaRow.children[5].textContent.trim() : '';

  const html = `
    <div style="font-size: 0.82rem; line-height: 1.5; color: #1e293b;">
      <p style="margin-bottom: 12px; color: #475569;">
        Tentukan uraian tugas spesifik untuk <strong>Yoshida Sary</strong> sebagai <strong>Ketua Pengusul</strong>:
      </p>
      <textarea id="modalInputTugasKetua" class="portal-input" style="height: 90px; resize: none; padding: 10px;" placeholder="Tuliskan tugas ketua, contoh: Penanggung jawab umum, perancangan arsitektur sistem, dan koordinasi publikasi jurnal">${currentTugas}</textarea>
    </div>
  `;

  openPortalModal(
    '<i class="fa-solid fa-pen-to-square" style="color: #f59e0b; margin-right: 8px;"></i> Ubah Tugas Ketua Pengusul',
    html,
    `
      <button type="button" class="btn-portal-save" onclick="closePortalModal()">Batal</button>
      <button type="button" class="btn-portal-next" onclick="simpanTugasKetua()">Simpan Tugas</button>
    `
  );
}

function simpanTugasKetua() {
  const input = document.getElementById('modalInputTugasKetua');
  const ketuaRow = document.querySelector('#tabelAnggotaDosen tbody tr:first-child');
  if (input && ketuaRow) {
    ketuaRow.children[5].textContent = input.value.trim() || 'Penanggung jawab utama penelitian';
    closePortalModal();
    showToast('Tugas Ketua Pengusul berhasil diperbarui', 'success');
  }
}

// =============================================================================
// 3. PERSISTENCE & ACTIONS (SIMPAN DRAF & NEXT)
// =============================================================================
function simpanDrafPortal() {
  const draf = {
    judul: document.getElementById('inputJudulPenelitian')?.value || '',
    tktSaatIni: document.getElementById('inputTktSaatIni')?.value || '',
    targetTkt: document.getElementById('inputTargetTkt')?.value || '',
    kelompokSkema: document.getElementById('selectKelompokSkema')?.value || '',
    ruangLingkup: document.getElementById('selectRuangLingkup')?.value || '',
    besaranDana: document.getElementById('inputBesaranDana')?.value || '0',
    bidangFokus: document.getElementById('selectBidangFokus')?.value || '',
    tema: document.getElementById('selectTemaPenelitian')?.value || '',
    topik: document.getElementById('selectTopikPenelitian')?.value || '',
    rumpun1: document.getElementById('selectRumpun1')?.value || '',
    rumpun2: document.getElementById('selectRumpun2')?.value || '',
    rumpun3: document.getElementById('selectRumpun3')?.value || '',
    prioritas: document.getElementById('selectPrioritasRiset')?.value || '',
    tahunPertama: document.getElementById('inputTahunPertamaUsulan')?.value || '',
    lamaKegiatan: document.getElementById('selectLamaKegiatan')?.value || '',
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('risetmu_usulan_baru_draf', JSON.stringify(draf));
    showToast('Draf Identitas Usulan berhasil disimpan di browser', 'success');
  } catch (err) {
    showToast('Draf berhasil disimpan sementara', 'info');
  }
}

// =============================================================================
// 4. STEP NAVIGATION (WIZARD TAHAP 1 s/d TAHAP 5)
// =============================================================================
function goToStep(step) {
  // Hide all step pages
  const p1 = document.getElementById('stepPage1');
  const p2 = document.getElementById('stepPage2');
  if (p1) p1.style.display = (step === 1) ? 'block' : 'none';
  if (p2) p2.style.display = (step === 2) ? 'block' : 'none';

  // Update stepper visual track
  const stepItems = document.querySelectorAll('.stepper-track .step-item');
  stepItems.forEach(item => {
    const s = parseInt(item.getAttribute('data-step'));
    item.classList.remove('active', 'completed');
    const bubble = item.querySelector('.step-bubble');
    if (s < step) {
      item.classList.add('completed');
      if (bubble) bubble.innerHTML = '<i class="fa-solid fa-check" style="font-size:0.85rem;"></i>';
    } else if (s === step) {
      item.classList.add('active');
      if (bubble) bubble.innerHTML = `<span class="step-num">${s}</span>`;
    } else {
      if (bubble) bubble.innerHTML = `<span class="step-num">${s}</span>`;
    }
  });

  // Update info bar text
  const infoTitle = document.querySelector('.info-title-text');
  if (infoTitle) {
    if (step === 1) {
      infoTitle.textContent = 'Identitas Usulan Penelitian Baru';
    } else if (step === 2) {
      infoTitle.textContent = 'Substansi Usulan Penelitian - Tahap 2';
    }
  }

  // Smooth scroll to top of form
  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function lanjutTahap2() {
  const inputJudul = document.getElementById('inputJudulPenelitian');
  if (inputJudul && !inputJudul.value.trim()) {
    inputJudul.value = 'Pengembangan Sistem Rekomendasi Riset Cerdas Menggunakan Model Machine Learning';
  }

  simpanDrafPortal();
  showToast('Menuju Tahap 2: Substansi Usulan...', 'info');
  setTimeout(() => {
    window.location.href = 'subtansi-usulan.html';
  }, 350);
}

// Catatan: Seluruh logika dan modal Tahap 2 (Substansi Usulan) telah dipisahkan ke js/subtansi-usulan.js

function restoreSavedDraft() {
  try {
    const raw = localStorage.getItem('risetmu_usulan_baru_draf');
    if (!raw) return;
    const draf = JSON.parse(raw);
    if (draf.judul && document.getElementById('inputJudulPenelitian')) {
      document.getElementById('inputJudulPenelitian').value = draf.judul;
    }
  } catch (e) {
    // silent
  }
}
