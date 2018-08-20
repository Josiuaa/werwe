import songs from '../types/music';
import logAddEvent from './logAddEvent';
import { dispatch, getState } from './store';

const startMusic = () => {
    const songNames = Object.keys(songs).map(name => name);
    const randomIndex = Math.floor(Math.random() * (songNames.length - 1));
    const songName = songs[songNames[randomIndex]];
    const songNameFormatted = songName.replace(/ /g, '_').replace(/'/g, '_').replace(/\./g, '_');

    const song = new Audio(`/client/assets/music/${songNameFormatted}.mp3`);

    const volume = 0.3;

    song.volume = volume;
    song.loop = true;

    return song.play()
        .then(() => {
            console.log(`initMusic(): ${songName}`);
            dispatch({ type: 'SET_MUSIC', payload: { song, songName, volume } });
            logAddEvent(`Playing '${songName}'...`);
            return true;
        })
        .catch((error) => {
            console.error(`initMusic(): Couldn't play '${songName}'.`, { error });
            logAddEvent(`Couldn't play '${songName}'.`);
            return false;
        });
};

export default (dontListenForClick) => {
    if (dontListenForClick) {
        const { keyStrokes: { keyPressCount } } = getState();
        if (keyPressCount > 1) {
            startMusic();
            return true;    
        }
        return false;
    }
    
    document.addEventListener('keydown', startMusic, { once: true });
    return true;
};
