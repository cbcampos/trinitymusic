const player = document.getElementById('player');
const playlist = document.getElementById('playlist');
const title = document.getElementById('title');
const author = document.getElementById('author');
const key = document.getElementById('key');
const spotify = document.getElementById('spotify');

const SHEET_ID = '1XRULjhDMtzk72-Eo2zQqdeDo4eLwWp4Mv4mT4Ww5ohk';
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your Google API key, or use the public method below
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A2:E?key=${API_KEY}`;

// Alternative public method (uncomment if not using API key):
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

async function loadSongs() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        const songs = data.values.map(row => ({
            title: row[0],
            author: row[1],
            key: row[2],
            spotify: row[3],
            mp3: row[4]
        }));

        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="song-title">${song.title}</div>
                <div class="song-details">Author: ${song.author} | Key: ${song.key}</div>
                <a href="${song.spotify}" target="_blank" class="spotify-link">Listen on Spotify</a>
            `;
            li.addEventListener('click', () => playSong(song));
            playlist.appendChild(li);
        });

        if (songs.length > 0) playSong(songs[0]);
    } catch (error) {
        console.error('Error loading songs:', error);
        playlist.innerHTML = '<li>Error loading playlist. Check console.</li>';
    }
}

function playSong(song) {
    player.src = song.mp3;
    player.play();
    title.textContent = song.title;
    author.textContent = `Author: ${song.author}`;
    key.textContent = `Key: ${song.key}`;
    spotify.href = song.spotify;
}

loadSongs();
