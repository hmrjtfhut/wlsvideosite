// Mock Upload Function
function uploadVideo(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('uploadForm'));
    
    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeModal('uploadModal');
    })
    .catch(error => console.error('Error:', error));
}

// Mock Sign In Function
function signIn(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('signInForm'));
    
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful');
            closeModal('signInModal');
        } else {
            alert('Login failed');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Mock Register Function
function register(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('registerForm'));
    
    fetch('/register', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeModal('registerModal');
    })
    .catch(error => console.error('Error:', error));
}

// Search Functionality
function searchVideos() {
    const query = document.querySelector('.search-bar').value;
    alert(`You searched for: ${query}. This would trigger a search on the server.`);
}

// Modal Control
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event Listeners
document.querySelector('.upload-button').addEventListener('click', () => openModal('uploadModal'));
document.querySelector('.profile').addEventListener('click', () => openModal('signInModal'));
document.querySelector('.search-bar').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchVideos();
    }
});

document.querySelector('#uploadForm').addEventListener('submit', uploadVideo);
document.querySelector('#signInForm').addEventListener('submit', signIn);
document.querySelector('#registerForm').addEventListener('submit', register);

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.parentElement.parentElement.style.display = 'none';
    });
});

document.getElementById('showRegisterForm').addEventListener('click', function() {
    closeModal('signInModal');
    openModal('registerModal');
});
