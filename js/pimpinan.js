/**
 * Dashboard Pimpinan - Logic & Interactivity
 * RisetMu LPPM Universitas Muhammadiyah Sumatera Utara
 */

document.addEventListener('DOMContentLoaded', () => {
  initPimpinanDropdowns();
});

function initPimpinanDropdowns() {
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
      closeAllPimpinanDropdowns();
      if (!isOpen) {
        menu.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');
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
      closeAllPimpinanDropdowns();
      showToast('Menampilkan data ' + val, 'info');
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

// Modal: Tinjau Rekomendasi
function openReviewModal() {
  const modal = document.getElementById('tinjauModal');
  if (modal) modal.style.display = 'flex';
}

function closeReviewModal() {
  const modal = document.getElementById('tinjauModal');
  if (modal) modal.style.display = 'none';
}

// Modal: Sahkan Batch
function openSahkanModal() {
  const modal = document.getElementById('sahkanModal');
  if (modal) modal.style.display = 'flex';
}

function closeSahkanModal() {
  const modal = document.getElementById('sahkanModal');
  if (modal) modal.style.display = 'none';
}

function submitSahkanBatch() {
  closeSahkanModal();
  showToast('Surat Keputusan (SK) Pengesahan Batch 10 berhasil diterbitkan dan ditandatangani secara digital!', 'success');
}

// Download PDF Summary
function downloadSummaryPDF() {
  showToast('Menyiapkan berkas Ringkasan Eksekutif Batch 10 (PDF)...', 'info');
  setTimeout(() => {
    showToast('Ringkasan Eksekutif Batch 10 berhasil diunduh.', 'success');
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
