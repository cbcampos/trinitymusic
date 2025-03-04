const player = document.getElementById('player');
const playlist = document.getElementById('playlist');
const title = document.getElementById('title');
const author = document.getElementById('author');
const key = document.getElementById('key');
const spotify = document.getElementById('spotify');

const SHEET_ID = '1XRULjhDMtzk72-Eo2zQqdeDo4eLwWp4Mv4mT4Ww5ohk';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

async function loadSongs() {
    try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        const json = JSON.parse(text.substr(47).slice(0, -2)); // Parse Google’s JSON response
        const songs = json.table.rows.map(row => ({
            title: row.c[0]?.v || '',
            author: row.c[1]?.v || '',
            key: row.c[2]?.v || '',
            spotify: row.c[3]?.v || '',
            mp3: row.c[4]?.v || ''
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
