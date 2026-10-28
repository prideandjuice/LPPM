/**
 * JavaScript Logika Tahap 4: Dokumen Pendukung
 * LPPM UMSU & RisetMu Portal
 */

const STORAGE_KEY = 'risetmu_dokumen_pendukung_v1';
let daftarMitra = [];
let editingId = null;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadMitraData();
  renderMitraTable();
  initDragAndDrop();
});

// Toggle collapsible card
function toggleDocCollapse() {
  const body = document.getElementById('docCardBody');
  const chevron = document.getElementById('docChevron');
  if (!body) return;

  if (body.style.display === 'none') {
    body.style.display = 'block';
    if (chevron) chevron.classList.remove('rotate-180');
  } else {
    body.style.display = 'none';
    if (chevron) chevron.classList.add('rotate-180');
  }
}

// Load data from localStorage
function loadMitraData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      daftarMitra = JSON.parse(raw);
    } else {
      daftarMitra = [];
    }
  } catch (e) {
    console.error('Error loading data:', e);
    daftarMitra = [];
  }
}

// Save data to localStorage
function saveMitraData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarMitra));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

// Format Currency
function formatRupiah(val) {
  const num = parseInt(val, 10) || 0;
  return 'Rp ' + num.toLocaleString('id-ID');
}

// Render Table or Empty State
function renderMitraTable() {
  const emptyState = document.getElementById('mitraEmptyState');
  const tableWrap = document.getElementById('mitraTableWrap');
  const tableBody = document.getElementById('mitraTableBody');
  const countBadge = document.getElementById('mitraCountBadge');

  if (countBadge) {
    countBadge.textContent = daftarMitra.length;
  }

  if (!daftarMitra || daftarMitra.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (tableWrap) tableWrap.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (tableWrap) tableWrap.style.display = 'block';

  if (!tableBody) return;
  tableBody.innerHTML = '';

  daftarMitra.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center; font-weight: 700; color: #64748b;">${index + 1}</td>
      <td>
        <span class="mitra-badge-type">${escapeHtml(item.jenisMitra || 'Mitra Kerjasama')}</span>
      </td>
      <td>
        <strong style="color: #0f172a; display: block;">${escapeHtml(item.namaMitra || '-')}</strong>
        <span style="font-size: 0.8rem; color: #64748b;">${escapeHtml(item.institusiMitra || '-')}</span>
      </td>
      <td>
        <div style="font-size: 0.82rem; font-weight: 600; color: #1e293b;">${escapeHtml(item.bentukKontribusi || 'In-Kind')}</div>
        <div style="font-size: 0.78rem; color: #059669; font-weight: 700;">${formatRupiah(item.nilaiKontribusi)}</div>
      </td>
      <td>
        ${item.fileName ? `
          <a href="javascript:void(0)" class="mitra-doc-btn" onclick="previewDoc('${escapeHtml(item.fileName)}')">
            <i class="fa-regular fa-file-pdf"></i>
            <span>${escapeHtml(item.fileName)}</span>
          </a>
        ` : `
          <span style="color: #94a3b8; font-style: italic; font-size: 0.8rem;">Tidak ada file</span>
        `}
      </td>
      <td style="text-align: center;">
        <div class="action-btn-group" style="justify-content: center;">
          <button type="button" class="btn-table-action btn-table-edit" title="Edit Mitra" onclick="openEditModal(${item.id})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="btn-table-action btn-table-delete" title="Hapus Mitra" onclick="deleteMitra(${item.id})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Modal open for "+ Data Baru"
function openModalMitra() {
  editingId = null;
  document.getElementById('modalMitraTitle').textContent = 'Tambah Mitra / Dokumen Pendukung';
  document.getElementById('formMitra').reset();
  document.getElementById('fileUploadLabel').textContent = 'Pilih file PDF (Surat Kesediaan Kerjasama / LoI / MoA) maks 5MB';
  document.getElementById('modalMitra').style.display = 'flex';
}

// Modal open for Edit
function openEditModal(id) {
  const item = daftarMitra.find(m => m.id === id);
  if (!item) return;

  editingId = id;
  document.getElementById('modalMitraTitle').textContent = 'Edit Data Mitra';
  document.getElementById('modalJenisMitra').value = item.jenisMitra || '';
  document.getElementById('modalNamaMitra').value = item.namaMitra || '';
  document.getElementById('modalInstitusiMitra').value = item.institusiMitra || '';
  document.getElementById('modalBentukKontribusi').value = item.bentukKontribusi || 'In-Kind';
  document.getElementById('modalNilaiKontribusi').value = item.nilaiKontribusi || 0;
  document.getElementById('fileUploadLabel').textContent = item.fileName ? `File: ${item.fileName}` : 'Pilih file PDF baru (opsional)';
  
  document.getElementById('modalMitra').style.display = 'flex';
}

// Modal close
function closeModalMitra() {
  document.getElementById('modalMitra').style.display = 'none';
  editingId = null;
}

// Handle Form Submission
function saveMitraForm(event) {
  event.preventDefault();

  const jenisMitra = document.getElementById('modalJenisMitra').value;
  const namaMitra = document.getElementById('modalNamaMitra').value.trim();
  const institusiMitra = document.getElementById('modalInstitusiMitra').value.trim();
  const bentukKontribusi = document.getElementById('modalBentukKontribusi').value;
  const nilaiKontribusi = parseInt(document.getElementById('modalNilaiKontribusi').value, 10) || 0;
  const fileInput = document.getElementById('modalFileInput');

  if (!namaMitra) {
    alert('Nama mitra atau penanggung jawab wajib diisi.');
    return;
  }

  let fileName = '';
  if (fileInput.files && fileInput.files[0]) {
    fileName = fileInput.files[0].name;
  } else if (editingId) {
    const existing = daftarMitra.find(m => m.id === editingId);
    if (existing) fileName = existing.fileName || '';
  }

  if (!fileName) {
    fileName = 'Surat_Kesediaan_Mitra.pdf';
  }

  if (editingId) {
    // Update
    const idx = daftarMitra.findIndex(m => m.id === editingId);
    if (idx !== -1) {
      daftarMitra[idx] = {
        ...daftarMitra[idx],
        jenisMitra,
        namaMitra,
        institusiMitra,
        bentukKontribusi,
        nilaiKontribusi,
        fileName
      };
    }
  } else {
    // Add New
    const newMitra = {
      id: Date.now(),
      jenisMitra,
      namaMitra,
      institusiMitra,
      bentukKontribusi,
      nilaiKontribusi,
      fileName
    };
    daftarMitra.push(newMitra);
  }

  saveMitraData();
  renderMitraTable();
  closeModalMitra();

  showToastNotification('Data mitra berhasil disimpan!');
}

// Delete item
function deleteMitra(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus data mitra ini?')) return;

  daftarMitra = daftarMitra.filter(m => m.id !== id);
  saveMitraData();
  renderMitraTable();
  showToastNotification('Data mitra telah dihapus.');
}

// Preview file doc
function previewDoc(fileName) {
  showToastNotification(`Membuka berkas: ${fileName}`, 'info');
}

// Drag & drop file handler
function initDragAndDrop() {
  const fileInput = document.getElementById('modalFileInput');
  const uploadLabel = document.getElementById('fileUploadLabel');

  if (fileInput && uploadLabel) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        uploadLabel.textContent = `File terpilih: ${fileInput.files[0].name} (${(fileInput.files[0].size / 1024).toFixed(1)} KB)`;
      }
    });
  }
}

// Save Draft Button
function simpanDrafDokumen() {
  saveMitraData();
  showToastNotification('Draf Dokumen Pendukung berhasil disimpan.', 'success');
}

// Navigation to Step 5
function lanjutTahap5() {
  saveMitraData();
  showToastNotification('Menyimpan Tahap 4 & Menyiapkan Pratinjau Usulan...', 'success');
  setTimeout(() => {
    alert('Selamat! Semua tahapan usulan (Tahap 1 s.d. 4) telah lengkap. Usulan Anda siap untuk dikirim (Submit Proposal).');
  }, 600);
}

// Toast notification helper
function showToastNotification(msg, type = 'success') {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '600';
    toast.style.color = '#ffffff';
    toast.style.zIndex = '999999';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.style.background = type === 'info' ? '#2563eb' : '#10b981';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${escapeHtml(msg)}`;
  toast.style.opacity = '1';
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 2500);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
