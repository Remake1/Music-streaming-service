
## Screenshots
![Screenshot](./docs/songs_comments.png)
![Screenshot](./docs/playlist.png)
![Screenshot](./docs/playlist-1.png)
![Screenshot](./docs/songs.png)


## Web client Setup

Install packages:
```bash
yarn install
```

Run:
```bash
yarn serve
```

Navigate to `http://localhost:8080/`


## API Setup

Setup and configure mongo DB uri at `src/app.module.ts`

Install packages:
```bash
yarn install
```

Run:
```bash
yarn start:dev
```

Static files stored in `dist/static/`

Locally `http://localhost:3000/`

## Routes

| ***Request type, path***    | ***Description of the request*** |
|-----------------------------| -------------------------- |
| **Authorization**               |
| POST/auth/login             | Authorization              |
| POST/auth/reg               | Registration               |
| **Songs**                   |
| POST/songs                  | Add a song                 |
| GET/songs                   | Get all songs              |
| GET/songs/user              | Get all songs,             |
| added by certain            |
| by the user                 |
| GET/songs/search            | Search for a song          |
| GET/songs/number            | Number of all songs        |
| GET/songs/{id}              | Get song by ID             |
| DELETE/songs/{id}           | Delete a song              |
| POST/songs/comment          | Add a comment              |
| to the song                 |
| POST/songs/listen/{id}      | Add                        |
| listening to a song         |
| **Albums**                      |
| POST/album                  | Create an album            |
| GET/album                   | Get all albums             |
| GET/album/count             | Number of all albums       |
| GET/album/search            | Search albums              |
| GET/album/{id}              | Get album by ID            |
| DELETE/album/{id}           | Delete album               |
| PUT/album/{id}/{songId}     | Add a song to an album     |
| **Playlists**                   |
| POST/playlists              | Create a playlist          |
| GET/playlists               | Get all playlists          |
| user                        |
| GET/playlists/{id}          | Get playlist by ID         |
| PATCH/playlists/{id}        | Make a playlist            |
| public                      |
| DELETE/playlists/{id}       | Delete playlist            |
| GET/playlists/anon/{id}     | Get public                 |
| playlist from another       |
| user by ID                  |
| PUT/playlists/{id}/{songId} | Add a song to              |


## License

MIT licensed