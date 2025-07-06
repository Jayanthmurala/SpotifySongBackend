import sql from "../db/config/db.connetion.js";
import TryCatch from "../errors/TryCatch.js";
import redisClient from "../redis/redis.setup.js";

// Get All Albums
const getAllAlbums = TryCatch(async (req: any, res: any) => {
  let albums;
  const cacheExpires = 1800; // 30 minutes in seconds
  if (redisClient.isReady) {
    albums = await redisClient.get("albums");
  }
  if (albums) {
    return res.status(200).json({
      status: "success",
      data: JSON.parse(albums),
    });
  } else {
    albums = await sql`SELECT * FROM albums`;
    if (albums.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No albums found",
      });
    }
    if (redisClient.isReady) {
      await redisClient.set("albums", JSON.stringify(albums), {
        EX: cacheExpires,
      });
    }
    res.status(200).json({
      status: "success",
      data: albums,
    });
  }
});

// Get all songs
const getAllSongs = TryCatch(async (req: any, res: any) => {
  let songs;
  const cacheExpires = 1800; // 30 minutes in seconds
  if (redisClient.isReady) {
    songs = await redisClient.get("songs");
  }
  if (songs) {
    return res.status(200).json({
      status: "success",
      data: JSON.parse(songs),
    });
  } else {
    songs = await sql`SELECT * FROM songs`;
    if (songs.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No songs found",
      });
    }
    if (redisClient.isReady) {
      await redisClient.set("songs", JSON.stringify(songs), {
        EX: cacheExpires,
      });
    }
    res.status(200).json({
      status: "success",
      data: songs,
    });
  }
});

//getAllSongs By Album ID
const getAllSongsByAlbumId = TryCatch(async (req: any, res: any) => {
  const albumId = req.params.id;
  if (!albumId) {
    return res.status(400).json({
      status: "fail",
      message: "Album ID is required",
    });
  }
  const redisExpires = 1800; // 30 minutes
  let album, songs;
  if (redisClient.isReady) {
    const cachedAlbum = await redisClient.get(`album:${albumId}`);
    const cachedSongs = await redisClient.get(`songs:${albumId}`);
    if (cachedAlbum && cachedSongs) {
      return res.status(200).json({
        status: "success",
        album: JSON.parse(cachedAlbum)[0],  
        data: JSON.parse(cachedSongs),
      });
    }
  }
  // Fallback to DB if not in Redis
  album = await sql`SELECT * FROM albums WHERE id = ${albumId}`;
  if (album.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Album not found",
    });
  }

  songs = await sql`SELECT * FROM songs WHERE album_id = ${albumId}`;
  if (songs.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No songs found for this album",
    });
  }

  // Save both to Redis for future requests
  if (redisClient.isReady) {
    await redisClient.set(`album:${albumId}`, JSON.stringify(album), {
      EX: redisExpires,
    });
    await redisClient.set(`songs:${albumId}`, JSON.stringify(songs), {
      EX: redisExpires,
    });
  }

  return res.status(200).json({
    status: "success",
    album: album[0],
    data: songs,
  });
});


// Single song by ID
const getSongById = TryCatch(async (req: any, res: any) => {
    const songId = req.params.id;
  if (!songId) {
    return res.status(400).json({
      status: "fail",
      message: "Song ID is required",
    });
  }
  let song;
  if(redisClient.isReady){
    song = await redisClient.get(`song:${songId}`);
    
}
if(song){
  return res.status(200).json({
    status: "success",
    data: JSON.parse(song),
  });
}else{
    song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`;
    if (song.length === 0) {
     return res.status(404).json({
       status: "fail",
       message: "Song not found",
     });
    }
    if (redisClient.isReady) {
      await redisClient.set(`song:${songId}`, JSON.stringify(song), {
        EX: 1800, // 30 minutes
      });
    }
    res.status(200).json({
      status: "success",
      data: song[0],
    });
}
});






// Exports
export default {
  getAllAlbums,
  getAllSongs,
  getAllSongsByAlbumId,
  getSongById,
};
