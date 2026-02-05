// ==========================================
// Product Dashboard - Main JavaScript
// ==========================================

// API Configuration
const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Global State
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentSortField = null;
let currentSortOrder = 'asc';
let currentProductId = null;

// DOM Elements
const productTableBody = document.getElementById('productTableBody');
const pagination = document.getElementById('pagination');
const pageInfo = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchInput');
const itemsPerPageSelect = document.getElementById('itemsPerPage');
const loadingOverlay = document.getElementById('loading-overlay');
const tooltip = document.getElementById('tooltip');
const alertContainer = document.getElementById('alertContainer');

// Modal Elements
const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const createModal = new bootstrap.Modal(document.getElementById('createModal'));

// ==========================================
// Utility Functions
// ==========================================

// Show/Hide Loading Spinner
function showLoading(show) {
    if (show) {
        loadingOverlay.classList.add('show');
    } else {
        loadingOverlay.classList.remove('show');
    }
}

// Show Alert Message
function showAlert(message, type = 'success') {
    const alertId = 'alert-' + Date.now();
    const alertHtml = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        const alertEl = document.getElementById(alertId);
        if (alertEl) {
            alertEl.remove();
        }
    }, 5000);
}

// Handle Image Error - Show Placeholder
function handleImageError(img) {
    img.onerror = null;
    img.src = 'https://via.placeholder.com/50x50?text=No+Image';
}

// Format Price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Format DateTime
function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ==========================================
// API Functions
// ==========================================

// Fetch All Products
async function fetchProducts() {
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allProducts = await response.json();
        filteredProducts = [...allProducts];
        
        renderTable();
        updatePagination();
        updatePageInfo();
        
    } catch (error) {
        console.error('Fetch error:', error);
        showAlert('Không thể tải danh sách sản phẩm. Vui lòng thử lại!', 'danger');
        productTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger py-4">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Lỗi khi tải dữ liệu. Vui lòng refresh trang.
                </td>
            </tr>
        `;
    } finally {
        showLoading(false);
    }
}

// Fetch Single Product by ID
async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch product error:', error);
        showAlert('Không thể tải thông tin sản phẩm!', 'danger');
        return null;
    }
}

// Create New Product
async function createProduct(data) {
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Create product error:', error);
        throw error;
    } finally {
        showLoading(false);
    }
}

// Update Product
async function updateProduct(id, data) {
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Update product error:', error);
        throw error;
    } finally {
        showLoading(false);
    }
}

// Delete Product
async function deleteProduct(id) {
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return true;
    } catch (error) {
        console.error('Delete product error:', error);
        throw error;
    } finally {
        showLoading(false);
    }
}

// ==========================================
// Table Rendering
// ==========================================

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    if (pageProducts.length === 0) {
        productTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-muted py-4">
                    <i class="fas fa-inbox me-2"></i>
                    Không tìm thấy sản phẩm nào.
                </td>
            </tr>
        `;
        return;
    }
    
    productTableBody.innerHTML = pageProducts.map(product => {
        const imageUrl = product.images && product.images[0] 
            ? product.images[0].replace(/[\[\]"]/g, '') 
            : 'https://via.placeholder.com/50x50?text=No+Image';
        const categoryName = product.category ? product.category.name : 'N/A';
        const slug = product.slug || 'N/A';
        const creationAt = formatDate(product.creationAt);
        
        return `
            <tr data-id="${product.id}" data-description="${escapeHtml(product.description || '')}">
                <td>${product.id}</td>
                <td class="product-title">${escapeHtml(product.title)}</td>
                <td><small class="text-muted">${escapeHtml(slug)}</small></td>
                <td>${formatPrice(product.price)}</td>
                <td><span class="badge bg-secondary">${escapeHtml(categoryName)}</span></td>
                <td>
                    <img src="${imageUrl}" 
                         alt="${escapeHtml(product.title)}" 
                         class="product-img"
                         onerror="handleImageError(this)">
                </td>
                <td><small>${creationAt}</small></td>
                <td>
                    <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${product.id}" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// Pagination Functions
// ==========================================

function calculatePagination() {
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    return {
        totalItems,
        totalPages,
        startIndex,
        endIndex,
        currentPage
    };
}

function updatePagination() {
    const { totalPages } = calculatePagination();
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHtml = '';
    
    // Previous button
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>`;
        if (startPage > 2) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a></li>`;
    }
    
    // Next button
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;
    
    pagination.innerHTML = paginationHtml;
}

function updatePageInfo() {
    const { totalItems, startIndex, endIndex } = calculatePagination();
    
    if (totalItems === 0) {
        pageInfo.textContent = 'Không có sản phẩm';
        return;
    }
    
    pageInfo.textContent = `Hiển thị ${startIndex + 1}-${endIndex} của ${totalItems} sản phẩm`;
}

function goToPage(page) {
    const { totalPages } = calculatePagination();
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderTable();
    updatePagination();
    updatePageInfo();
    
    // Scroll to top of table
    document.querySelector('.table-container').scrollIntoView({ behavior: 'smooth' });
}

function changeItemsPerPage(count) {
    itemsPerPage = parseInt(count);
    currentPage = 1;
    renderTable();
    updatePagination();
    updatePageInfo();
}

// ==========================================
// Search Function
// ==========================================

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
    }
    
    // Reapply sort if active
    if (currentSortField) {
        applySorting();
    }
    
    currentPage = 1;
    renderTable();
    updatePagination();
    updatePageInfo();
}

// ==========================================
// Sorting Functions
// ==========================================

function handleSort(field) {
    if (currentSortField === field) {
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortField = field;
        currentSortOrder = 'asc';
    }
    
    applySorting();
    updateSortIcons();
    renderTable();
}

function applySorting() {
    if (!currentSortField) return;
    
    filteredProducts.sort((a, b) => {
        let valueA, valueB;
        
        if (currentSortField === 'title') {
            valueA = a.title.toLowerCase();
            valueB = b.title.toLowerCase();
            return currentSortOrder === 'asc' 
                ? valueA.localeCompare(valueB) 
                : valueB.localeCompare(valueA);
        } else if (currentSortField === 'price') {
            valueA = a.price;
            valueB = b.price;
            return currentSortOrder === 'asc' 
                ? valueA - valueB 
                : valueB - valueA;
        } else if (currentSortField === 'creationAt') {
            valueA = new Date(a.creationAt || 0);
            valueB = new Date(b.creationAt || 0);
            return currentSortOrder === 'asc' 
                ? valueA - valueB 
                : valueB - valueA;
        }
        
        return 0;
    });
}

function updateSortIcons() {
    const sortIconTitle = document.getElementById('sortIconTitle');
    const sortIconPrice = document.getElementById('sortIconPrice');
    const sortIconCreationAt = document.getElementById('sortIconCreationAt');
    
    // Reset all icons
    sortIconTitle.className = 'fas fa-sort sort-icon';
    sortIconPrice.className = 'fas fa-sort sort-icon';
    sortIconCreationAt.className = 'fas fa-sort sort-icon';
    
    // Set active icon
    if (currentSortField === 'title') {
        sortIconTitle.className = `fas fa-sort-${currentSortOrder === 'asc' ? 'up' : 'down'} sort-icon active`;
    } else if (currentSortField === 'price') {
        sortIconPrice.className = `fas fa-sort-${currentSortOrder === 'asc' ? 'up' : 'down'} sort-icon active`;
    } else if (currentSortField === 'creationAt') {
        sortIconCreationAt.className = `fas fa-sort-${currentSortOrder === 'asc' ? 'up' : 'down'} sort-icon active`;
    }
}

// ==========================================
// Tooltip Functions
// ==========================================

function showTooltip(e, description) {
    if (!description) return;
    
    tooltip.textContent = description;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top = (e.pageY + 15) + 'px';
}

function moveTooltip(e) {
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top = (e.pageY + 15) + 'px';
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

// ==========================================
// Modal Functions
// ==========================================

function openDetailModal(productId) {
    const product = allProducts.find(p => p.id === parseInt(productId));
    
    if (!product) {
        showAlert('Không tìm thấy sản phẩm!', 'danger');
        return;
    }
    
    currentProductId = product.id;
    
    document.getElementById('detailTitle').textContent = product.title;
    document.getElementById('detailCategory').textContent = product.category ? product.category.name : 'N/A';
    document.getElementById('detailSlug').textContent = product.slug || 'N/A';
    document.getElementById('detailPrice').textContent = formatPrice(product.price);
    document.getElementById('detailDescription').textContent = product.description || 'Không có mô tả';
    document.getElementById('detailCreationAt').textContent = formatDateTime(product.creationAt);
    document.getElementById('detailUpdatedAt').textContent = formatDateTime(product.updatedAt);
    
    // Render images
    const imagesContainer = document.getElementById('detailImages');
    if (product.images && product.images.length > 0) {
        imagesContainer.innerHTML = product.images.map(img => {
            const cleanUrl = img.replace(/[\[\]"]/g, '');
            return `<img src="${cleanUrl}" alt="${escapeHtml(product.title)}" onerror="handleImageError(this)">`;
        }).join('');
    } else {
        imagesContainer.innerHTML = '<p class="text-muted">Không có hình ảnh</p>';
    }
    
    detailModal.show();
}

function openEditModal() {
    const product = allProducts.find(p => p.id === currentProductId);
    
    if (!product) {
        showAlert('Không tìm thấy sản phẩm!', 'danger');
        return;
    }
    
    document.getElementById('editTitle').value = product.title;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editDescription').value = product.description || '';
    document.getElementById('editCategoryId').value = product.category ? product.category.id : '';
    document.getElementById('editImages').value = product.images ? product.images.map(img => img.replace(/[\[\]"]/g, '')).join('\n') : '';
    
    detailModal.hide();
    editModal.show();
}

function openCreateModal() {
    document.getElementById('createForm').reset();
    createModal.show();
}

// ==========================================
// Form Validation
// ==========================================

function validateForm(formData) {
    const errors = [];
    
    if (!formData.title || !formData.title.trim()) {
        errors.push('Tên sản phẩm không được để trống');
    }
    
    if (!formData.price || formData.price <= 0) {
        errors.push('Giá phải lớn hơn 0');
    }
    
    if (!formData.description || !formData.description.trim()) {
        errors.push('Mô tả không được để trống');
    }
    
    if (!formData.categoryId || formData.categoryId <= 0) {
        errors.push('Category ID không hợp lệ');
    }
    
    return errors;
}

// ==========================================
// CRUD Handlers
// ==========================================

async function handleUpdate() {
    const formData = {
        title: document.getElementById('editTitle').value,
        price: parseFloat(document.getElementById('editPrice').value),
        description: document.getElementById('editDescription').value,
        categoryId: parseInt(document.getElementById('editCategoryId').value),
        images: document.getElementById('editImages').value
            .split('\n')
            .map(url => url.trim())
            .filter(url => url !== '')
    };
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showAlert(errors.join('<br>'), 'danger');
        return;
    }
    
    try {
        await updateProduct(currentProductId, formData);
        showAlert('Cập nhật sản phẩm thành công!', 'success');
        editModal.hide();
        
        // Refresh products
        await fetchProducts();
        
    } catch (error) {
        showAlert('Lỗi khi cập nhật sản phẩm. Vui lòng thử lại!', 'danger');
    }
}

async function handleCreate() {
    const formData = {
        title: document.getElementById('createTitle').value,
        price: parseFloat(document.getElementById('createPrice').value),
        description: document.getElementById('createDescription').value,
        categoryId: parseInt(document.getElementById('createCategoryId').value),
        images: document.getElementById('createImages').value
            .split('\n')
            .map(url => url.trim())
            .filter(url => url !== '')
    };
    
    // Default image if none provided
    if (formData.images.length === 0) {
        formData.images = ['https://via.placeholder.com/150'];
    }
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showAlert(errors.join('<br>'), 'danger');
        return;
    }
    
    try {
        await createProduct(formData);
        showAlert('Tạo sản phẩm mới thành công!', 'success');
        createModal.hide();
        
        // Refresh products
        await fetchProducts();
        
    } catch (error) {
        showAlert('Lỗi khi tạo sản phẩm. Vui lòng thử lại!', 'danger');
    }
}

// Delete Handler
async function handleDelete(productId) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        return;
    }
    
    try {
        await deleteProduct(productId);
        showAlert('Xóa sản phẩm thành công!', 'success');
        
        // Close modal if open
        detailModal.hide();
        
        // Refresh products
        await fetchProducts();
        
    } catch (error) {
        showAlert('Lỗi khi xóa sản phẩm. Vui lòng thử lại!', 'danger');
    }
}

// ==========================================
// CSV Export
// ==========================================

function escapeCSV(value) {
    if (value === null || value === undefined) return '';
    
    const stringValue = String(value);
    
    // If contains comma, quote, or newline, wrap in quotes and escape quotes
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return '"' + stringValue.replace(/"/g, '""') + '"';
    }
    
    return stringValue;
}

function exportToCSV() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    if (pageProducts.length === 0) {
        showAlert('Không có dữ liệu để xuất!', 'warning');
        return;
    }
    
    // CSV Header - All fields from API
    const headers = ['ID', 'Title', 'Slug', 'Price', 'Category', 'Category ID', 'Description', 'Images', 'Created At', 'Updated At'];
    let csvContent = headers.join(',') + '\n';
    
    // CSV Data
    pageProducts.forEach(product => {
        const row = [
            escapeCSV(product.id),
            escapeCSV(product.title),
            escapeCSV(product.slug),
            escapeCSV(product.price),
            escapeCSV(product.category ? product.category.name : ''),
            escapeCSV(product.category ? product.category.id : ''),
            escapeCSV(product.description),
            escapeCSV(product.images ? product.images.join('; ') : ''),
            escapeCSV(product.creationAt),
            escapeCSV(product.updatedAt)
        ];
        csvContent += row.join(',') + '\n';
    });
    
    // Generate filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `products_page_${currentPage}_${timestamp}.csv`;
    
    // Create and download
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    showAlert(`Đã xuất ${pageProducts.length} sản phẩm ra file CSV!`, 'success');
}

// ==========================================
// Event Listeners
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    fetchProducts();
    
    // Search input
    searchInput.addEventListener('input', handleSearch);
    
    // Items per page
    itemsPerPageSelect.addEventListener('change', (e) => {
        changeItemsPerPage(e.target.value);
    });
    
    // Pagination clicks
    pagination.addEventListener('click', (e) => {
        e.preventDefault();
        const pageLink = e.target.closest('[data-page]');
        if (pageLink && !pageLink.parentElement.classList.contains('disabled')) {
            goToPage(parseInt(pageLink.dataset.page));
        }
    });
    
    // Sort headers
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            handleSort(header.dataset.sort);
        });
    });
    
    // Table row click (for detail modal)
    productTableBody.addEventListener('click', (e) => {
        // Check if clicked on delete button
        const deleteBtn = e.target.closest('.btn-delete');
        if (deleteBtn) {
            e.stopPropagation();
            handleDelete(deleteBtn.dataset.id);
            return;
        }
        
        const row = e.target.closest('tr');
        if (row && row.dataset.id) {
            openDetailModal(row.dataset.id);
        }
    });
    
    // Tooltip events
    productTableBody.addEventListener('mouseover', (e) => {
        const row = e.target.closest('tr');
        if (row && row.dataset.description) {
            showTooltip(e, row.dataset.description);
        }
    });
    
    productTableBody.addEventListener('mousemove', (e) => {
        const row = e.target.closest('tr');
        if (row && row.dataset.description) {
            moveTooltip(e);
        }
    });
    
    productTableBody.addEventListener('mouseout', (e) => {
        const row = e.target.closest('tr');
        if (row) {
            hideTooltip();
        }
    });
    
    // Create button
    document.getElementById('btnCreate').addEventListener('click', openCreateModal);
    
    // Export button
    document.getElementById('btnExport').addEventListener('click', exportToCSV);
    
    // Edit from detail modal
    document.getElementById('btnEditFromDetail').addEventListener('click', openEditModal);
    
    // Save edit
    document.getElementById('btnSaveEdit').addEventListener('click', handleUpdate);
    
    // Save create
    document.getElementById('btnSaveCreate').addEventListener('click', handleCreate);
    
    // Delete from detail modal
    document.getElementById('btnDeleteFromDetail').addEventListener('click', () => {
        handleDelete(currentProductId);
    });
});
