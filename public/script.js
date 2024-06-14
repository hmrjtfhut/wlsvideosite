// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('video-upload-form');
    const videoGrid = document.querySelector('.video-grid');

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
                    displayVideo(videoTitle, videoDescription, URL.createObjectURL(videoFile));
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

    function displayVideo(title, description, videoURL) {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <video src="${videoURL}" controls></video>
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="like-button">Like</button>
            <button class="dislike-button">Dislike</button>
        `;
        videoGrid.appendChild(videoCard);

        // Add event listeners for like and dislike buttons
        videoCard.querySelector('.like-button').addEventListener('click', () => {
            alert('Like functionality is not yet implemented.');
        });
        videoCard.querySelector('.dislike-button').addEventListener('click', () => {
            alert('Dislike functionality is not yet implemented.');
        });
    }
});
