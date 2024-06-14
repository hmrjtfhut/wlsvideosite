// Mock Upload Function
function uploadVideo() {
    alert("This is a mock upload functionality. In a real site, you would handle the file upload here.");
}

// Mock Sign In Function
function signIn() {
    alert("This is a mock sign-in functionality. You would implement user authentication here.");
}

// Search Functionality
function searchVideos() {
    const query = document.querySelector('.search-bar').value;
    alert(`You searched for: ${query}. This would trigger a search on the server.`);
}

// Event Listeners
document.querySelector('.upload-button').addEventListener('click', uploadVideo);
document.querySelector('.profile').addEventListener('click', signIn);
document.querySelector('.search-bar').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchVideos();
    }
});
