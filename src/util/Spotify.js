//import SearchBar from "../Components/SearchBar/SearchBar";

const clientID = 'number'
const redirectURI = "http://localhost:3000/"; 



let token;
const Spotify = {
    getAccesToken() {
        if(token){
            return token;
        }

        const accesToken = window.location.href.match(/access_token=([^&]*)/);
        const expirationTime = window.location.href.match(/expires_in=([^&]*)/);

        
        if(accesToken && expirationTime) {
            token = accesToken[1];
            const expiresIn = Number(expirationTime[1]);

            window.setTimeout(() => token = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return token;
        } else {
            const accesUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accesUrl;
        }   
    },

    search(term) {
        const token = Spotify.getAccesToken();
         return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({ 
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
        
        },

    savePlaylist(playlistName, Uri) {
        if(!playlistName || !Uri.length) {
            return;
        }

        const token = Spotify.getAccesToken();
        const headers = { Authorization: `Bearer ${token}`};
        let userId; 

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
              {
                headers: headers, 
                method: 'POST', 
                body: JSON.stringify({ playlistName: playlistName }) 
            }).then(response =>  response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                  headers: headers,
                  method: 'POST',
                  body:  JSON.stringify({ uris: Uri })
                })
            })
        })

        
    }
    }

export default Spotify;




