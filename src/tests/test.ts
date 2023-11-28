import ffmpeg from 'fluent-ffmpeg';

// URL de la vidéo que vous souhaitez traiter
const videoURL = 'https://s22.anime-sama.fr/videos/Dark%20Gathering/Dark_Gathering_17_VOSTFR.mp4';

// Définissez le chemin où vous souhaitez enregistrer l'image extraite
const outputImagePath = 'output';

// Fonction pour extraire l'image au milieu de la vidéo
function extractMiddleImage() {
    ffmpeg()
        .input(videoURL)
        .screenshots({
            count: 1,
            folder: outputImagePath,
            filename: 'middle_image',
            //size: '640x360', // Image size
            timemarks: ['10%'], // Extract at specific timemarks
        })
        .on('end', () => {
            console.log('Image extraite avec succès.');
        })
        .on('error', (err) => {
            console.error("Erreur lors de l'extraction de l'image :", err);
        });
}

export default extractMiddleImage;
