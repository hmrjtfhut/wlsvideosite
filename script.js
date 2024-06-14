// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the search button
    document.getElementById('search-button').addEventListener('click', () => {
        console.log('Search button clicked');
        alert('Search functionality is not yet implemented.');
    });

    // Add event listener to the sign-in button
    document.getElementById('sign-in-button').addEventListener('click', () => {
        console.log('Sign-in button clicked');
        alert('Sign-in functionality is not yet implemented.');
    });

    // Add event listeners to the like and dislike buttons
    const likeButtons = document.querySelectorAll('.like-button');
    const dislikeButtons = document.querySelectorAll('.dislike-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log('Like button clicked on', event.target.closest('.video-card').querySelector('h3').innerText);
            alert('Like functionality is not yet implemented.');
        });
    });

    dislikeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log('Dislike button clicked on', event.target.closest('.video-card').querySelector('h3').innerText);
            alert('Dislike functionality is not yet implemented.');
        });
    });
});
