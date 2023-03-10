import { getState } from './store';
import metadata from './metadata';
import resizeView from './resizeView';
import bindKeys from './controls/bindKeys';
import bindMouse from './controls/bindMouse';
import bindTouch from './controls/bindTouch';
import debug from './debug';
import startMusic from './startMusic';
import initScreen from './initScreen';
import initStatusBar from './statusBar/initStatusBar';
import initPlayer from './initPlayer';
import initDecorations from './decorations/initDecorations';
import initItems from './items/initItems';
import initEnemies from './enemies/initEnemies';
import initAutomap from './automap/initAutomap';
import gameCycle from './gameCycle';
import renderCycle from './renderCycle';

export default () => {
    const state = getState();
    metadata(state);
    resizeView();
    bindKeys(state);
    bindMouse(state);
    bindTouch(state);
    debug();
    startMusic();
    initScreen();
    initStatusBar(state);
    initPlayer(state);
	initDecorations(state);
	initItems(state);
	initEnemies(state);
	initAutomap();
	gameCycle();
	renderCycle();
};
