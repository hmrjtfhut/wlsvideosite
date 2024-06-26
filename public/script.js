document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home-section');
    const uploadSection = document.getElementById('upload-section');
    const homeButton = document.getElementById('home-button');
    const uploadButton = document.getElementById('upload-button');
    const form = document.getElementById('video-upload-form');
    const videoGrid = document.querySelector('.video-grid');
    const refreshButton = document.getElementById('refresh-button');

    homeButton.addEventListener('click', () => {
        uploadSection.classList.add('hidden');
        homeSection.classList.remove('hidden');
    });

    uploadButton.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const videoFile = document.getElementById('video-file').files[0];
        const videoTitle = document.getElementById('video-title').value;
        const videoDescription = document.getElementById('video-description').value;

        if (videoFile) {
            const formData = new FormData();
            formData.append('video', videoFile);
            formData.append('title', videoTitle);
            formData.append('description', videoDescription);

            fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadVideos();
                } else {
                    alert('Failed to upload video');
                }
            })
            .catch(error => {
                console.error('Error uploading video:', error);
                alert('Error uploading video');
            });
        }
    });

    refreshButton.addEventListener('click', loadVideos);

    function loadVideos() {
        fetch('/api/videos')
            .then(response => response.json())
            .then(videos => {
                videoGrid.innerHTML = '';
                videos.forEach(video => {
                    displayVideo(video);
                });
            })
            .catch(error => {
                console.error('Error loading videos:', error);
            });
    }

    function displayVideo(video) {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <a href="${video.url}" target="_blank">
                <video src="${video.url}" controls></video>
            </a>
            <h3>${video.title}</h3>
            <p>${video.description}</p>
        `;
        videoGrid.appendChild(videoCard);
    }

    // Load videos initially
    loadVideos();

    // Poll for new videos every 30 seconds
    setInterval(loadVideos, 30000);
});
