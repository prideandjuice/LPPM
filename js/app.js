/**
 * RisetMu LPPM UMSU - Main Dashboard Application Logic
 * Standardized single-source JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initChart();
  initDropdowns();
  initLegacyDropdowns();
  initMonthlyChart();
  setupKeyboardShortcuts();
});

// Chart Instance reference
let chartInstance = null;

// Initialize Chart.js with exact data from screenshot
function initChart() {
  const ctx = document.getElementById('penelitianChart');
  if (!ctx) return;

  const labels = [
    '2012', '2013', '2014', '2015', '2016', 
    '2017', '2018', '2019', '2020', '2021', 
    '2022', '2023', '2024', '2025', '2026'
  ];

  const dataUsulan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2];
  const dataDidanai = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Usulan',
          data: dataUsulan,
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.08)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: false,
          pointBackgroundColor: '#7c3aed',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4.5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#6d28d9',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2.5
        },
        {
          label: 'Didanai',
          data: dataDidanai,
          borderColor: '#e83e8c',
          backgroundColor: 'rgba(232, 62, 140, 0.08)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: false,
          pointBackgroundColor: '#e83e8c',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4.5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#d63384',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1e295f',
          titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: '700' },
          bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
          padding: 10,
          cornerRadius: 8,
          boxPadding: 4,
          callbacks: {
            label: function(context) {
              return ' ' + context.dataset.label + ': ' + context.parsed.y + ' judul';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
            color: '#64748b'
          }
        },
        y: {
          min: 0,
          max: 2,
          ticks: {
            stepSize: 1,
            precision: 0,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
            color: '#64748b'
          },
          grid: {
            color: '#f1f5f9',
            drawBorder: false
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });
}

// Toggle datasets visibility from legend pills
function toggleDataset(index) {
  if (!chartInstance) return;
  const isVisible = chartInstance.isDatasetVisible(index);
  chartInstance.setDatasetVisibility(index, !isVisible);
  chartInstance.update();

  const buttonId = index === 0 ? 'toggleUsulan' : 'toggleDidanai';
  const btn = document.getElementById(buttonId);
  if (btn) {
    btn.style.opacity = isVisible ? '0.4' : '1';
    btn.style.textDecoration = isVisible ? 'line-through' : 'none';
  }
}

// Filter or highlight stats when clicking stat cards
function filterChart(type) {
  if (!chartInstance) return;
  
  if (type === 'penelitian') {
    showToast('Fokus: Riwayat Penelitian (4 Usulan Didanai)');
    chartInstance.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2];
    chartInstance.data.datasets[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    document.querySelector('.chart-title').textContent = 'Penelitian';
    document.querySelector('.chart-subtitle').textContent = 'Data riwayat usulan yang sudah Diterima dan pengumuman periode sudah berlalu.';
  } else if (type === 'pengabdian') {
    showToast('Fokus: Riwayat Pengabdian kepada Masyarakat (4 Didanai)');
    chartInstance.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0];
    chartInstance.data.datasets[1].data = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0];
    document.querySelector('.chart-title').textContent = 'Pengabdian kepada Masyarakat';
    document.querySelector('.chart-subtitle').textContent = 'Data riwayat pengabdian yang telah selesai dan didanai RisetMu.';
  } else if (type === 'artikel') {
    showToast('Fokus: Pendampingan Artikel Ilmiah');
    chartInstance.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    chartInstance.data.datasets[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    document.querySelector('.chart-title').textContent = 'Pendampingan Artikel';
    document.querySelector('.chart-subtitle').textContent = 'Belum ada usulan pendampingan artikel pada periode ini.';
  } else if (type === 'proposal') {
    showToast('Fokus: Pendampingan Proposal');
    chartInstance.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    chartInstance.data.datasets[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    document.querySelector('.chart-title').textContent = 'Pendampingan Proposal';
    document.querySelector('.chart-subtitle').textContent = 'Belum ada usulan pendampingan proposal pada periode ini.';
  }
  chartInstance.update();
}

// Dropdown Menus Controller
function initDropdowns() {
  const configs = [
    { btn: 'yearDropdownBtn', menu: 'yearDropdownMenu' },
    { btn: 'roleDropdownBtn', menu: 'roleDropdownMenu' },
    { btn: 'notifBtn', menu: 'notifMenu' },
    { btn: 'userProfileBtn', menu: 'userMenu' }
  ];

  configs.forEach(({ btn, menu }) => {
    const buttonEl = document.getElementById(btn);
    const menuEl = document.getElementById(menu);
    if (!buttonEl || !menuEl) return;

    buttonEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShown = menuEl.classList.contains('show');
      closeAllDropdowns();
      if (!isShown) {
        menuEl.classList.add('show');
        buttonEl.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Handle Year selection
  const yearItems = document.querySelectorAll('#yearDropdownMenu .dropdown-item');
  yearItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      yearItems.forEach(i => {
        i.classList.remove('active');
        const checkIcon = i.querySelector('.fa-check');
        if (checkIcon) checkIcon.remove();
      });
      item.classList.add('active');
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-check';
      item.insertBefore(icon, item.firstChild);

      const val = item.getAttribute('data-year');
      document.getElementById('selectedYear').textContent = val;
      closeAllDropdowns();
      showToast('Periode aktif diubah ke ' + val, 'success');
    });
  });

  // Handle Role selection
  const roleItems = document.querySelectorAll('#roleDropdownMenu .dropdown-item');
  roleItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      roleItems.forEach(i => {
        i.classList.remove('active');
        const checkIcon = i.querySelector('.fa-check');
        if (checkIcon) checkIcon.remove();
      });
      item.classList.add('active');
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-check';
      item.insertBefore(icon, item.firstChild);

      const val = item.getAttribute('data-role');
      document.getElementById('selectedRole').textContent = val;
      closeAllDropdowns();
      showToast('Peran dialihkan ke: ' + val, 'success');
    });
  });

  // Close menus on outside click
  document.addEventListener('click', () => {
    closeAllDropdowns();
  });
}

// Backward-compatible dropdowns for usulan-baru.html
function initLegacyDropdowns() {
  const yearBtn = document.getElementById('btnYearDropdown');
  const roleBtn = document.getElementById('btnRoleDropdown');
  const userBtn = document.getElementById('btnUserDropdown');

  if (yearBtn) {
    yearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Tahun Akademik: 2026/2027 (Aktif)');
    });
  }
  if (roleBtn) {
    roleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Peran Pengguna: DOSEN');
    });
  }
  if (userBtn) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProfileModal();
    });
  }
}

// Monthly trend canvas chart (if element exists)
function initMonthlyChart() {
  const canvas = document.getElementById('penelitianMonthlyChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const usulanData = [0.2, 0.6, 0.5, 0.9, 0.7, 1.1, 1.5, 1.9, 1.3, 1.4, 1.5, 1.7];
  const didanaiData = [0.2, 0.4, 0.3, 0.6, 0.5, 0.6, 0.8, 0.9, 0.7, 0.7, 0.8, 0.9];

  function draw() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const padLeft = 35;
    const padRight = 25;
    const padTop = 15;
    const padBottom = 25;

    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;
    const maxY = 2.5;

    ctx.font = '500 10.5px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';

    for (let i = 0; i <= 2; i++) {
      const yPos = padTop + plotH - (i / maxY) * plotH;
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padLeft, yPos);
      ctx.lineTo(w - padRight, yPos);
      ctx.stroke();
    }

    const stepX = plotW / (months.length - 1);
    months.forEach((m, i) => {
      const xPos = padLeft + i * stepX;
      ctx.fillText(m, xPos, h - 6);
    });

    function renderCurve(data, strokeColor) {
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = strokeColor;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      data.forEach((val, i) => {
        const xPos = padLeft + i * stepX;
        const yPos = padTop + plotH - (val / maxY) * plotH;
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      });
      ctx.stroke();
    }

    renderCurve(didanaiData, '#ec4899');
    renderCurve(usulanData, '#2563eb');
  }

  window.addEventListener('resize', draw);
  draw();
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.classList.remove('show');
  });
  document.querySelectorAll('.pill-btn, .icon-btn').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
  });
}

// Modal System
function openModal(modalId) {
  closeAllDropdowns();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

function openProfileModal() {
  openModal('profileModal');
}

function saveProfile(e) {
  e.preventDefault();
  const email = document.getElementById('contactEmail')?.value || 'yoshidasary@umsu.ac.id';
  const hp = document.getElementById('contactHp')?.value || '082167302000';
  const phone = document.getElementById('contactPhone')?.value || '-';

  closeModal('profileModal');
  showToast('Data profil dan kontak dosen berhasil disimpan!', 'success');
}

function reSyncPddikti() {
  const btn = document.getElementById('btnSyncPddikti');
  const timeEl = document.getElementById('pddiktiSyncTime');

  if (btn) {
    btn.classList.add('syncing');
    btn.disabled = true;
  }

  showToast('Menghubungkan ke API PDDIKTI Kemdikbud...', 'info');

  setTimeout(() => {
    if (btn) {
      btn.classList.remove('syncing');
      btn.disabled = false;
    }
    const now = new Date();
    const formatted = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
      now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (timeEl) timeEl.innerHTML = `<i class="fa-regular fa-clock"></i> Terakhir Sinkronisasi: ${formatted}`;
    showToast('Data PDDIKTI berhasil diperbarui secara real-time!', 'success');
  }, 1200);
}

function reSyncSinta() {
  const btn = document.getElementById('btnSyncSinta');
  const timeEl = document.getElementById('sintaSyncTime');

  if (btn) {
    btn.classList.add('syncing');
    btn.disabled = true;
  }

  showToast('Menghubungkan ke API SINTA Dikti & Scopus...', 'info');

  setTimeout(() => {
    if (btn) {
      btn.classList.remove('syncing');
      btn.disabled = false;
    }
    const now = new Date();
    const formatted = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
      now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (timeEl) timeEl.innerHTML = `<i class="fa-regular fa-clock"></i> Terakhir Sinkronisasi: ${formatted}`;
    showToast('Data SINTA, Scopus & WOS berhasil disinkronkan!', 'success');
  }, 1200);
}

/**
 * Sinkronisasi Data SINTA & PDDikti Kemdikbudristek
 */
function syncData() {
  const syncBtn = document.getElementById('syncBtn');
  const syncIcon = syncBtn ? syncBtn.querySelector('.sync-icon') : null;

  if (syncBtn && syncBtn.disabled) return;

  if (syncIcon) syncIcon.classList.add('rotating');
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.style.opacity = '0.75';
    syncBtn.style.cursor = 'wait';
  }

  showToast('Menghubungkan ke SINTA & PDDikti...', 'info');

  setTimeout(() => {
    if (syncIcon) syncIcon.classList.remove('rotating');
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.style.opacity = '';
      syncBtn.style.cursor = '';
    }

    const sintaEl = document.getElementById('sintaScore');
    if (sintaEl) {
      const prev = parseInt(sintaEl.textContent) || 599;
      const updated = prev + 13;
      sintaEl.textContent = updated;
      sintaEl.style.transition = 'all 0.3s ease';
      sintaEl.style.color = '#10b981';
      sintaEl.style.transform = 'scale(1.15)';
      setTimeout(() => {
        sintaEl.style.color = '';
        sintaEl.style.transform = '';
      }, 1200);
    }

    showToast('Sinkronisasi SINTA & PDDikti selesai! Data terbarui.', 'success');
  }, 1200);
}

// Mock Database Proposal Pengabdian
const proposalDatabase = {
  1: {
    title: 'Pelatihan Literasi Digital dan Pemanfaatan Platform E-Commerce untuk UMKM di Lingkungan Aisyiyah Daerah Kota Medan',
    skema: 'Program Kemitraan Masyarakat (PKM)',
    tahun: '2024/2025',
    ketua: 'Yoshida Sary, M.Kom.',
    anggota: '1. Dr. Nurul Hidayah, M.Si.\n2. Muhammad Ihsan, M.Kom.',
    mitra: 'Pimpinan Daerah Aisyiyah Kota Medan',
    dana: 'Rp 20.000.000,- (Didanai RisetMu)',
    status: 'Selesai (Laporan Akhir Terverifikasi)',
    tahapan: 'Telah Selesai 100%'
  },
  2: {
    title: 'Pemberdayaan Ekonomi Perempuan Melalui Digital Marketing Pada Anggota Ranting Aisyiyah Cabang Helvetia (Tahap Lanjutan)',
    skema: 'Program Kemitraan Masyarakat Lanjutan (PKM-L)',
    tahun: '2025/2026',
    ketua: 'Yoshida Sary, M.Kom.',
    anggota: '1. Dr. Nurul Hidayah, M.Si.\n2. Muhammad Ihsan, M.Kom.',
    mitra: 'Pimpinan Ranting Aisyiyah Cabang Helvetia',
    dana: 'Rp 22.000.000,- (Didanai RisetMu)',
    status: 'Selesai (Laporan Akhir Terverifikasi)',
    tahapan: 'Telah Selesai 100%'
  }
};

function openProposalDetailModal(id) {
  const p = proposalDatabase[id];
  if (!p) return;

  const titleEl = document.getElementById('modalProposalTitle');
  if (titleEl) titleEl.textContent = 'Detail Usulan Pengabdian Masyarakat';

  const bodyEl = document.getElementById('modalProposalBody');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <table class="detail-table">
        <tr>
          <th>Judul Kegiatan</th>
          <td><strong>${p.title}</strong></td>
        </tr>
        <tr>
          <th>Skema Usulan</th>
          <td><span class="status-pill-success">${p.skema}</span></td>
        </tr>
        <tr>
          <th>Tahun Pelaksanaan</th>
          <td>${p.tahun}</td>
        </tr>
        <tr>
          <th>Ketua Pelaksana</th>
          <td>${p.ketua}</td>
        </tr>
        <tr>
          <th>Anggota Pelaksana</th>
          <td style="white-space: pre-line;">${p.anggota}</td>
        </tr>
        <tr>
          <th>Mitra Sasaran</th>
          <td>${p.mitra}</td>
        </tr>
        <tr>
          <th>Persetujuan Pendanaan</th>
          <td><strong style="color: #059669;">${p.dana}</strong></td>
        </tr>
        <tr>
          <th>Status Usulan</th>
          <td><span class="status-pill-success"><i class="fa-solid fa-check"></i> ${p.status}</span></td>
        </tr>
        <tr>
          <th>Tahapan Saat Ini</th>
          <td>${p.tahapan}</td>
        </tr>
      </table>
    `;
  }

  openModal('proposalModal');
}

// Toast Notifications System
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast ' + (type === 'success' ? 'toast-success' : '');
  
  const icon = type === 'success' ? 'fa-circle-check text-green' : 'fa-circle-info text-blue';
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      toast.remove();
    }, 250);
  }, 3200);
}

// Keyboard shortcuts (e.g. Esc to close modal)
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('proposalModal');
      closeModal('profileModal');
      closeModal('usulanPenelitianModal');
      if (typeof closePortalModal === 'function') closePortalModal();
      closeAllDropdowns();
    }
  });
}

// -----------------------------------------------------------------------------
// Portal Modal Base Engine (Universal Across All Pages)
// -----------------------------------------------------------------------------
function initPortalModals() {
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

function openPortalModal(titleHtml, bodyHtml, footerButtonsHtml = '', customMaxWidth = '560px') {
  initPortalModals();
  const container = document.getElementById('portalModalContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="portal-modal-card" style="max-width: ${customMaxWidth}; width: 100%;">
      <div class="portal-modal-header">
        <h4 class="portal-modal-title">${titleHtml}</h4>
        <button type="button" class="portal-modal-close" onclick="closePortalModal()" aria-label="Tutup">&times;</button>
      </div>
      <div class="portal-modal-body">
        ${bodyHtml}
      </div>
      ${footerButtonsHtml ? `<div class="portal-modal-footer">${footerButtonsHtml}</div>` : ''}
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

// Toggle accordion collapsible
function toggleEligSection(listId, chevronId) {
  const list = document.getElementById(listId);
  const chevron = document.getElementById(chevronId);
  if (!list) return;

  if (list.style.display === 'none') {
    list.style.display = 'flex';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  } else {
    list.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

// Rincian Detail Ketidaksesuaian Skema
function showDetailIneligible(schemeKey) {
  const details = {
    'pui_pt': {
      title: 'Pusat Unggulan Iptek Perguruan Tinggi',
      reasons: [
        { label: 'Status Kelembagaan PUI-PT', status: 'Tidak Memenuhi', desc: 'Perguruan Tinggi belum memiliki SK Penetapan Lembaga Pusat Unggulan Iptek (PUI-PT) aktif dari Kemendikbudristek.', ok: false },
        { label: 'Kualifikasi Pendidikan Ketua Pengusul', status: 'Tidak Memenuhi', desc: 'Disyaratkan berpendidikan Doktor (S3). Kualifikasi Anda saat ini: Magister (S2).', ok: false },
        { label: 'Jabatan Fungsional Ketua Pengusul', status: 'Tidak Memenuhi', desc: 'Disyaratkan minimal Lektor Kepala atau Guru Besar. Jabatan Anda saat ini: Lektor.', ok: false },
        { label: 'Rekam Jejak Publikasi Bereputasi', status: 'Memenuhi', desc: 'Memenuhi persyaratan memiliki artikel di jurnal internasional bereputasi.', ok: true }
      ]
    },
    'terapan_model': {
      title: 'Penelitian Terapan - Luaran Model',
      reasons: [
        { label: 'Tingkat Kesiapterapan Teknologi (TKT)', status: 'Tidak Memenuhi', desc: 'Target skema mensyaratkan TKT awal usulan minimal level 4. Pengukuran TKT saat ini: level 2.', ok: false },
        { label: 'SINTA Score 3 Years', status: 'Tidak Memenuhi', desc: 'Minimal SINTA Score 3 Tahun adalah 150 poin untuk skema ini. Skor Anda saat ini: 145 poin.', ok: false },
        { label: 'Bebas Tanggungan Laporan', status: 'Memenuhi', desc: 'Tidak memiliki tanggungan laporan kemajuan/akhir pada tahun pendanaan sebelumnya.', ok: true },
        { label: 'Kualifikasi Dosen Pengusul', status: 'Memenuhi', desc: 'Memenuhi syarat minimal Asisten Ahli dengan pendidikan S2.', ok: true }
      ]
    }
  };

  const item = details[schemeKey];
  if (!item) return;

  const html = `
    <div style="font-size: 0.85rem; color: #1e293b; line-height: 1.55;">
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px 14px; margin-bottom: 14px;">
        <div style="font-weight: 700; color: #991b1b; font-size: 0.88rem; margin-bottom: 2px;">
          <i class="fa-solid fa-circle-xmark" style="color: #ef4444; margin-right: 6px;"></i>Status: Tidak Eligible
        </div>
        <div style="color: #7f1d1d; font-size: 0.82rem;">Usulan Anda tidak memenuhi kualifikasi administratif atau substantif untuk skema <strong>${item.title}</strong>.</div>
      </div>

      <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px;">Rincian Kriteria & Ketidaksesuaian:</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
        ${item.reasons.map(r => `
          <div style="border: 1px solid ${r.ok ? '#bbf7d0' : '#fecaca'}; background: ${r.ok ? '#f0fdf4' : '#fff5f5'}; border-radius: 6px; padding: 9px 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
              <span style="font-weight: 600; color: ${r.ok ? '#166534' : '#991b1b'}; font-size: 0.84rem;">
                <i class="fa-solid ${r.ok ? 'fa-check' : 'fa-xmark'}" style="margin-right: 6px; color: ${r.ok ? '#16a34a' : '#ef4444'};"></i>${r.label}
              </span>
              <span style="font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; background: ${r.ok ? '#dcfce7' : '#fee2e2'}; color: ${r.ok ? '#15803d' : '#b91c1c'};">
                ${r.status}
              </span>
            </div>
            <div style="font-size: 0.79rem; color: #475569; padding-left: 20px;">${r.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  openPortalModal(
    `<span style="display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: #1e293b; font-size: 1rem;"><i class="fa-solid fa-circle-info" style="color: #1e3a8a;"></i> Detail Ketidaksesuaian: ${item.title}</span>`,
    html,
    `
      <button type="button" onclick="showModalEligibilitas()" style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; border-radius: 6px; padding: 7px 16px; font-size: 0.84rem; font-weight: 600; cursor: pointer; margin-right: auto; transition: background 0.15s;">
        <i class="fa-solid fa-arrow-left" style="margin-right: 4px;"></i> Kembali
      </button>
      <button type="button" class="btn-modal-tutup" onclick="closePortalModal()">
        Tutup
      </button>
    `,
    '540px'
  );
}

// Toggle Accordion Dropdown for Riwayat Usulan on Dashboard
function toggleProposalAccordion(id) {
  const item = document.getElementById(id);
  if (!item) return;
  item.classList.toggle('active');
}

