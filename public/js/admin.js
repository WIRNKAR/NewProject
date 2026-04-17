let deleteTargetId = null;
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

// Check session on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/auth/me', {
            credentials: 'include'
        });

        if (!response.ok) {
            window.location.href = '/login.html';
            return;
        }

        const data = await response.json();
        document.getElementById('adminUsername').textContent = `Welcome, ${data.user.username}`;

        // Load initial content
        loadVideos();
        loadProductImages();
        loadProducts();
    } catch (error) {
        console.error('Auth check error:', error);
        window.location.href = '/login.html';
    }
});

// Load videos
async function loadVideos() {
    try {
        const response = await fetch('/api/videos');
        const data = await response.json();

        if (data.success) {
            renderVideos(data.data);
        }
    } catch (error) {
        console.error('Load videos error:', error);
    }
}

// Render videos
function renderVideos(videos) {
    const videoGrid = document.getElementById('videoGrid');

    if (!videos || videos.length === 0) {
        videoGrid.innerHTML = '<div class="col-12 text-center text-muted py-5">No videos uploaded yet</div>';
        return;
    }

    videoGrid.innerHTML = videos.map(video => `
        <div class="col-md-6 col-lg-4">
            <div class="item-card">
                <div class="item-video">
                    <i class="fas fa-play-circle fa-2x"></i>
                </div>
                <div class="item-info">
                    <strong>${video.originalName || video.fileName}</strong>
                    <p>${formatDate(video.uploadedAt)}</p>
                    <p>${formatFileSize(video.fileSize)}</p>
                    <button onclick="deleteVideo('${video._id}')" class="delete-btn">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load product images
async function loadProductImages() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();

        if (data.success) {
            renderProductImages(data.data);
        }
    } catch (error) {
        console.error('Load product images error:', error);
    }
}

// Render product images
function renderProductImages(products) {
    const productGrid = document.getElementById('productGrid');

    if (!products || products.length === 0) {
        productGrid.innerHTML = '<div class="col-12 text-center text-muted py-5">No product images uploaded yet</div>';
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="item-card">
                <img src="${product.imagePath}" alt="Product ${product.productId}" class="item-image">
                <div class="item-info">
                    <strong>Product ${product.productId}</strong>
                    <p>${formatDate(product.uploadedAt)}</p>
                    <button onclick="deleteProductImage('${product._id}')" class="delete-btn">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load products for dropdown
async function loadProducts() {
    const SAMPLE_PRODUCTS = [
        { id: '1', name: 'Structural Steel Welding' },
        { id: '2', name: 'Metal Gates & Barriers' },
        { id: '3', name: 'Stainless Steel Fabrication' },
        { id: '4', name: 'Pipe Welding Services' },
        { id: '5', name: 'Machinery Repair & Parts' },
        { id: '6', name: 'Custom Fabrication' }
    ];

    const select = document.getElementById('productSelect');
    select.innerHTML = '<option value="">-- Choose a product --</option>' +
        SAMPLE_PRODUCTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

// Video upload handlers
const videoDrop = document.getElementById('videoDrop');
const videoInput = document.getElementById('videoInput');

videoDrop.addEventListener('click', () => videoInput.click());
videoInput.addEventListener('change', (e) => uploadVideo(e.target.files[0]));

videoDrop.addEventListener('dragover', (e) => {
    e.preventDefault();
    videoDrop.classList.add('dragover');
});

videoDrop.addEventListener('dragleave', () => {
    videoDrop.classList.remove('dragover');
});

videoDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    videoDrop.classList.remove('dragover');
    if (e.dataTransfer.files[0]) {
        uploadVideo(e.dataTransfer.files[0]);
    }
});

async function uploadVideo(file) {
    if (!file) return;

    const validTypes = ['video/mp4', 'video/webm'];
    const maxSize = 100 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
        alert('Only MP4 and WebM files are allowed');
        return;
    }

    if (file.size > maxSize) {
        alert('Video size must be less than 100MB');
        return;
    }

    const formData = new FormData();
    formData.append('video', file);

    const uploadProgress = document.getElementById('uploadProgress');
    uploadProgress.classList.remove('d-none');

    try {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                document.getElementById('uploadProgressBar').style.width = percentComplete + '%';
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    loadVideos();
                    videoInput.value = '';
                    uploadProgress.classList.add('d-none');
                    showNotification('Video uploaded successfully', 'success');
                } else {
                    showNotification(response.message || 'Upload failed', 'danger');
                }
            } else {
                showNotification('Upload failed', 'danger');
            }
        });

        xhr.addEventListener('error', () => {
            showNotification('Network error', 'danger');
        });

        xhr.open('POST', '/api/upload/video');
        xhr.withCredentials = true;
        xhr.send(formData);
    } catch (error) {
        console.error('Upload error:', error);
        showNotification('Upload error', 'danger');
    }
}

// Image upload handlers
const imageDrop = document.getElementById('imageDrop');
const imageInput = document.getElementById('imageInput');

imageDrop.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', (e) => uploadProductImage(e.target.files[0]));

imageDrop.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageDrop.classList.add('dragover');
});

imageDrop.addEventListener('dragleave', () => {
    imageDrop.classList.remove('dragover');
});

imageDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    imageDrop.classList.remove('dragover');
    if (e.dataTransfer.files[0]) {
        uploadProductImage(e.dataTransfer.files[0]);
    }
});

async function uploadProductImage(file) {
    if (!file) return;

    const productId = document.getElementById('productSelect').value;
    if (!productId) {
        alert('Please select a product first');
        return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
        alert('Only JPG and PNG files are allowed');
        return;
    }

    if (file.size > maxSize) {
        alert('Image size must be less than 5MB');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('productId', productId);

    const uploadProgress = document.getElementById('imageUploadProgress');
    uploadProgress.classList.remove('d-none');

    try {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                document.getElementById('imageUploadProgressBar').style.width = percentComplete + '%';
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    loadProductImages();
                    imageInput.value = '';
                    document.getElementById('productSelect').value = '';
                    uploadProgress.classList.add('d-none');
                    showNotification('Image uploaded successfully', 'success');
                } else {
                    showNotification(response.message || 'Upload failed', 'danger');
                }
            } else {
                showNotification('Upload failed', 'danger');
            }
        });

        xhr.addEventListener('error', () => {
            showNotification('Network error', 'danger');
        });

        xhr.open('POST', '/api/upload/product-image');
        xhr.withCredentials = true;
        xhr.send(formData);
    } catch (error) {
        console.error('Upload error:', error);
        showNotification('Upload error', 'danger');
    }
}

// Delete handlers
function deleteVideo(id) {
    deleteTargetId = id;
    deleteModal.show();
}

function deleteProductImage(id) {
    deleteTargetId = id;
    deleteModal.show();
}

document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (!deleteTargetId) return;

    try {
        const isVideo = event.target.closest('.modal').previousElementSibling?.querySelector('#videoGrid')?.contains(event.target);
        const endpoint = isVideo ? `/api/videos/${deleteTargetId}` : `/api/products/${deleteTargetId}`;

        const response = await fetch(endpoint, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            deleteModal.hide();
            loadVideos();
            loadProductImages();
            showNotification('Deleted successfully', 'success');
        } else {
            showNotification(data.message || 'Delete failed', 'danger');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showNotification('Delete failed', 'danger');
    }

    deleteTargetId = null;
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/';
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showNotification(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container') || createAlertContainer();
    const alertId = 'alert-' + Date.now();
    const alertHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.insertAdjacentHTML('beforeend', alertHTML);

    setTimeout(() => {
        const alert = document.getElementById(alertId);
        if (alert) alert.remove();
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alert-container';
    container.className = 'position-fixed top-0 start-50 translate-middle-x';
    container.style.zIndex = '9999';
    container.style.width = '90%';
    container.style.maxWidth = '500px';
    container.style.marginTop = '20px';
    document.body.appendChild(container);
    return container;
}
