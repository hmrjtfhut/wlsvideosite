document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('video-upload-form');
    const videoGrid = document.querySelector('.video-grid');
    const refreshButton = document.getElementById('refresh-button');

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

            fetch('/upload', {
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
        fetch('/videos')
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
});
