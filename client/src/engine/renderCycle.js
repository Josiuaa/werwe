import { getState, dispatch } from './store';
import updateAutomap from './automap/updateAutomap';
import clearDecorations from './clearDecorations';
import castRays from './castRays';
import renderDecorations from './renderDecorations';
import renderEnemies from './enemies/renderEnemies';
import updateFPS from './updateFPS';

const renderCycle = () => {
    const state = getState();
    const {
        game: {
            delay,
            lastRender,
            paused,
        },
        automap: {
            showAutomap,
            showViewingCone,
        },
    } = state;

    if (delay <= 0) {
        console.error('Invalid value: game.delay should be a number greater than zero.');
        return false;
    }

    if (paused) {
        setTimeout(renderCycle, delay);
        return false;
    }

    updateAutomap(state);
    
    if (!showAutomap || (showAutomap && showViewingCone)) {
        castRays();
    }
    if (!showAutomap) {
        clearDecorations();
        renderDecorations();
        renderEnemies();
    }

	// time since last rendering
	const now = new Date().getTime();
	const timeDelta = now - lastRender;
	let cycleDelay = delay;
	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
    }
    
    dispatch({ type: 'SET_LAST_RENDER_CYCLE_TIME', payload: now });

    setTimeout(renderCycle, cycleDelay);
    
    updateFPS(timeDelta);
};

export default renderCycle;
