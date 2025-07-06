import  express  from "express";
import songController from '../controllers/song.controller.js';
const songRoutes = express.Router();

// Get all Albums
songRoutes.get('/albums', songController.getAllAlbums);
// Get all songs by album ID
songRoutes.get('/songs/album/:id', songController.getAllSongsByAlbumId);
// Get all songs
songRoutes.get('/songs', songController.getAllSongs);
// Get single song by ID
songRoutes.get('/songs/:id', songController.getSongById);



export default songRoutes;