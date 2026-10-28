/**
 * Dashboard Admin LPPM - Logic & Interactivity
 * RisetMu LPPM Universitas Muhammadiyah Sumatera Utara
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminDropdowns();
  initPipelineFilter();
});

// Dropdown interactions
function initAdminDropdowns() {
  const dropdownConfigs = [
    { btnId: 'yearDropdownBtn', menuId: 'yearDropdownMenu' },
    { btnId: 'roleDropdownBtn', menuId: 'roleDropdownMenu' },
    { btnId: 'notifBtn', menuId: 'notifMenu' },
    { btnId: 'userProfileBtn', menuId: 'userMenu' },
    { btnId: 'batchSelectBtn', menuId: 'batchSelectMenu' }
  ];

  dropdownConfigs.forEach(({ btnId, menuId }) => {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('show');
      closeAllAdminDropdowns();
      if (!isOpen) {
        menu.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Year select items
  const yearItems = document.querySelectorAll('#yearDropdownMenu .dropdown-item');
  yearItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      yearItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const val = item.getAttribute('data-year') || item.textContent.trim();
      const el = document.getElementById('selectedYear');
      if (el) el.textContent = val.replace('(Aktif)', '').trim();
      closeAllAdminDropdowns();
      showToast('Periode aktif dialihkan ke ' + val, 'success');
    });
  });

  // Role select items
  const roleItems = document.querySelectorAll('#roleDropdownMenu .dropdown-item');
  roleItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = item.getAttribute('data-role');
      document.getElementById('selectedRole').textContent = val;
      closeAllAdminDropdowns();
      showToast('Peran dialihkan ke: ' + val, 'success');

      if (val === 'DOSEN') {
        setTimeout(() => { window.location.href = 'index.html'; }, 350);
      } else if (val === 'REVIEWER') {
        setTimeout(() => { window.location.href = 'reviewer.html'; }, 350);
      } else if (val === 'PIMPINAN') {
        setTimeout(() => { window.location.href = 'pimpinan.html'; }, 350);
      }
    });
  });

  // Batch Select Items
  const batchItems = document.querySelectorAll('#batchSelectMenu .dropdown-item');
  batchItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      batchItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const val = item.getAttribute('data-batch') || item.textContent.trim();
      const el = document.getElementById('selectedBatchLabel');
      if (el) el.textContent = val;
      closeAllAdminDropdowns();
      showToast('Menampilkan data ' + val, 'info');
    });
  });

  // Close menus on document click
  document.addEventListener('click', () => {
    closeAllAdminDropdowns();
  });
}

function closeAllAdminDropdowns() {
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
  document.querySelectorAll('[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}

// Pipeline Stage Filter (Semua, Penelitian, Pengabdian)
const pipelineData = {
  semua: [
    { count: 48, height: '100%', title: 'Draf diajukan', role: 'Dosen', roleClass: 'dosen' },
    { count: 36, height: '75%', title: 'Verifikasi', role: 'Admin LPPM', roleClass: 'admin' },
    { count: 24, height: '50%', title: 'Review substantif', role: 'Reviewer', roleClass: 'reviewer' },
    { count: 18, height: '38%', title: 'Keputusan', role: 'Pimpinan', roleClass: 'pimpinan' },
    { count: 14, height: '30%', title: 'Didanai', role: 'Admin LPPM', roleClass: 'admin' },
    { count: 12, height: '25%', title: 'Laporan akhir', role: 'Dosen', roleClass: 'dosen' }
  ],
  penelitian: [
    { count: 28, height: '100%', title: 'Draf diajukan', role: 'Dosen', roleClass: 'dosen' },
    { count: 22, height: '78%', title: 'Verifikasi', role: 'Admin LPPM', roleClass: 'admin' },
    { count: 15, height: '54%', title: 'Review substantif', role: 'Reviewer', roleClass: 'reviewer' },
    { count: 11, height: '39%', title: 'Keputusan', role: 'Pimpinan', roleClass: 'pimpinan' },
    { count: 9, height: '32%', title: 'Didanai', role: 'Admin LPPM', roleClass: 'admin' },
    { count: 8, height: '28%', title: 'Laporan akhir', role: 'Dosen', roleClass: 'dosen' }
  ],
  pengabdian: [
    { count: 20, height: '100%', title: 'Draf diajukan', role: 'Dosen', roleClass: 'dosen' },
    { count: 14, height: '70%', title: 'Verifikasi', role: 'Admin LPPM', roleClass: 'admin' },
    { count: 9, height: '45%', title: 'Review substantif', role: 'Reviewer', roleClass: 'reviewer' },
    { count: 7, height: '35%', title: 'Keputusan', role: 'Pimpinan', roleClass: 'pimpinan' },
    { count: 5, height: '25%', title: 'Didanai', role: 'Admin LPPM', roleClass: 'admin' },
    { count: 4, height: '20%', title: 'Laporan akhir', role: 'Dosen', roleClass: 'dosen' }
  ]
};

function initPipelineFilter() {
  const pillBtns = document.querySelectorAll('.pipeline-pill-btn');
  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'semua';
      renderPipeline(filter);
    });
  });
}

function renderPipeline(type) {
  const data = pipelineData[type] || pipelineData.semua;
  const container = document.getElementById('pipelineFunnelContainer');
  if (!container) return;

  container.innerHTML = '';
  data.forEach((stage, idx) => {
    const col = document.createElement('div');
    col.className = 'pipeline-col';
    col.setAttribute('title', `Klik untuk melihat ${stage.count} usulan pada tahap ${stage.title}`);
    col.onclick = () => showStageDetail(stage.title, stage.count, stage.role);

    col.innerHTML = `
      <div class="pipeline-num-label">${stage.count < 10 ? '0' + stage.count : stage.count}</div>
      <div class="pipeline-bar-wrapper">
        <div class="pipeline-bar" style="height: ${stage.height};"></div>
      </div>
      <div class="pipeline-stage-info">
        <span class="pipeline-stage-title">${stage.title}</span>
        <span class="pipeline-role-pill ${stage.roleClass}">${stage.role}</span>
      </div>
    `;
    container.appendChild(col);
  });
}

function showStageDetail(stageTitle, count, role) {
  showToast(`Membuka daftar ${count} usulan pada tahap: "${stageTitle}" (Penanggung jawab: ${role})`, 'info');
}

// Verification Modal for Proposal
const mockProposals = {
  1: {
    title: "Implementasi AI & Drone Multispektral untuk Deteksi Dini Penyakit Padi",
    proposer: "Dr. Ir. Siti Rahmah, M.T.",
    nidn: "0112038501",
    scheme: "Penelitian Fundamental",
    dana: "Rp 48.500.000",
    masuk: "2 hari lalu (26 Okt 2026)",
    files: [
      { name: "Surat Pengantar Dekan Fakultas Pertanian", valid: true },
      { name: "Berkas Substansi Proposal Lengkap (PDF)", valid: true },
      { name: "Rincian Anggaran Biaya (RAB) Terstandar", valid: true },
      { name: "Lembar Pengesahan Bertanda Tangan & Cap", valid: true },
      { name: "Surat Pernyataan Keaslian & Bebas Plagiasi", valid: true }
    ]
  },
  2: {
    title: "Pemberdayaan UMKM Kopi Liberika Melalui Penerapan Smart Packaging",
    proposer: "Muhammad Fauzi, S.E., M.Si.",
    nidn: "0105078902",
    scheme: "Pengabdian Kemitraan",
    dana: "Rp 35.000.000",
    masuk: "3 hari lalu (25 Okt 2026)",
    files: [
      { name: "Surat Kesediaan Kerjasama Mitra Sasaran", valid: true },
      { name: "Berkas Proposal Lengkap PkM", valid: true },
      { name: "RAB Kegiatan Pengabdian", valid: true },
      { name: "Surat Pengesahan Ketua Lembaga", valid: true },
      { name: "Denah Lokasi Mitra (Belum Terlampir)", valid: false }
    ]
  },
  3: {
    title: "Rancang Bangun Turbin Angin Sumbu Vertikal pada Pesisir Belawan",
    proposer: "Ir. Bambang Wicaksono, M.Eng.",
    nidn: "0119047903",
    scheme: "Penelitian Terapan",
    dana: "Rp 65.000.000",
    masuk: "3 hari lalu (25 Okt 2026)",
    files: [
      { name: "Surat Pengantar Fakultas Teknik", valid: true },
      { name: "Substansi Proposal Lengkap", valid: true },
      { name: "RAB Penelitian Terapan", valid: true },
      { name: "Lembar Pengesahan", valid: true },
      { name: "Roadmap Riset Pengusul", valid: true }
    ]
  },
  4: {
    title: "Literasi Keuangan Syariah dan Akselerasi Sertifikasi Halal Aisyiyah",
    proposer: "Hj. Nurhasanah, S.Ag., M.Hum.",
    nidn: "0123018204",
    scheme: "Pengabdian Persyarikatan",
    dana: "Rp 25.000.000",
    masuk: "4 hari lalu (24 Okt 2026)",
    files: [
      { name: "Surat Rekomendasi Pimpinan Cabang Aisyiyah", valid: true },
      { name: "Proposal Pengabdian Persyarikatan", valid: true },
      { name: "RAB Sederhana", valid: true },
      { name: "Surat Pengesahan", valid: true },
      { name: "Daftar Calon Peserta Pelatihan", valid: false }
    ]
  },
  5: {
    title: "Sintesis Membran Kitosan Nanokomposit untuk Pengolahan Air Bersih",
    proposer: "Dr. rer. nat. Hendra Gunawan",
    nidn: "0108098005",
    scheme: "Penelitian Fundamental",
    dana: "Rp 50.000.000",
    masuk: "5 hari lalu (23 Okt 2026)",
    files: [
      { name: "Surat Pengantar Dekan", valid: true },
      { name: "Proposal Penelitian Lengkap", valid: true },
      { name: "RAB Penelitian", valid: true },
      { name: "Lembar Pengesahan", valid: true },
      { name: "Surat Bebas Plagiasi Turnitin <20%", valid: true }
    ]
  }
};

let currentVerifId = 1;

function openVerifModal(propId) {
  currentVerifId = propId;
  const prop = mockProposals[propId] || mockProposals[1];

  document.getElementById('modalPropTitle').textContent = prop.title;
  document.getElementById('modalPropProposer').textContent = `${prop.proposer} (NIDN: ${prop.nidn})`;
  document.getElementById('modalPropScheme').textContent = prop.scheme;
  document.getElementById('modalPropDana').textContent = prop.dana;
  document.getElementById('modalPropMasuk').textContent = prop.masuk;

  const fileListEl = document.getElementById('modalPropFilesList');
  if (fileListEl) {
    fileListEl.innerHTML = '';
    prop.files.forEach((file, i) => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.justifyContent = 'space-between';
      item.style.padding = '8px 12px';
      item.style.background = '#f8fafc';
      item.style.border = '1px solid #e2e8f0';
      item.style.borderRadius = '6px';
      item.style.marginBottom = '6px';

      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" id="chkFile_${i}" ${file.valid ? 'checked' : ''} style="cursor: pointer;">
          <label for="chkFile_${i}" style="font-size: 12.5px; color: #334155; cursor: pointer;">
            <i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 4px;"></i> ${file.name}
          </label>
        </div>
        <button type="button" class="btn-batch-select" style="padding: 3px 8px; font-size: 11px;" onclick="showToast('Mengunduh berkas pratinjau...', 'info')">
          <i class="fa-solid fa-eye"></i> Cek
        </button>
      `;
      fileListEl.appendChild(item);
    });
  }

  const modal = document.getElementById('verifModal');
  if (modal) modal.style.display = 'flex';
}

function closeVerifModal() {
  const modal = document.getElementById('verifModal');
  if (modal) modal.style.display = 'none';
}

function submitVerification(decision) {
  const notes = document.getElementById('verifNotesInput').value;
  closeVerifModal();

  if (decision === 'pass') {
    showToast('Usulan disetujui administrasi! Siap ditugaskan ke Reviewer.', 'success');
  } else if (decision === 'revise') {
    showToast('Catatan perbaikan berkas telah dikirimkan ke pengusul.', 'info');
  } else {
    showToast('Usulan ditolak administrasi.', 'error');
  }
}

// Assign Reviewer Modal
function openAssignReviewerModal() {
  const modal = document.getElementById('assignModal');
  if (modal) modal.style.display = 'flex';
}

function closeAssignReviewerModal() {
  const modal = document.getElementById('assignModal');
  if (modal) modal.style.display = 'none';
}

function submitAssignReviewer() {
  closeAssignReviewerModal();
  showToast('Penugasan reviewer berhasil disimpan dan notifikasi telah dikirim!', 'success');
}

// Schedule Batch Modal
function openScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.style.display = 'flex';
}

function closeScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.style.display = 'none';
}

function saveScheduleBatch() {
  closeScheduleModal();
  showToast('Jadwal tenggat Batch 10 berhasil diperbarui!', 'success');
}

// Announcement Modal
function openAnnouncementModal() {
  const modal = document.getElementById('announcementModal');
  if (modal) modal.style.display = 'flex';
}

function closeAnnouncementModal() {
  const modal = document.getElementById('announcementModal');
  if (modal) modal.style.display = 'none';
}

function sendAnnouncement() {
  const title = document.getElementById('announcementTitle').value;
  if (!title) {
    showToast('Silakan isi judul pengumuman terlebih dahulu', 'error');
    return;
  }
  closeAnnouncementModal();
  showToast(`Pengumuman "${title}" berhasil disiarkan ke portal Dosen & Reviewer!`, 'success');
}

// New Batch Modal
function openNewBatchModal() {
  const modal = document.getElementById('newBatchModal');
  if (modal) modal.style.display = 'flex';
}

function closeNewBatchModal() {
  const modal = document.getElementById('newBatchModal');
  if (modal) modal.style.display = 'none';
}

function createNewBatch() {
  closeNewBatchModal();
  showToast('Batch Baru 11 (Periode 2026/2027) berhasil dibuka!', 'success');
}

// Toast notification helper
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
  toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';
  toast.style.fontSize = '13px';
  toast.style.fontWeight = '600';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  toast.style.transition = 'all 0.25s ease';

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
  }, 3200);
}
