const markers = {
    'marker-hiro': false,
    'marker-kanji': false,
    'marker-treasure': false
};

let countEl, finalOverlay, replayBtn, winSound;

function updateCount() {
    const found = Object.values(markers).filter(Boolean).length;
    countEl.textContent = found;
    if (found === 3) showFinal();
}

function showFinal() {
    if (winSound) {
        try { winSound.play(); } catch (e) {}
    }
    finalOverlay.style.display = 'grid';
}

function resetGame() {
    Object.keys(markers).forEach(k => markers[k] = false);
    finalOverlay.style.display = 'none';
    updateCount();
}

window.addEventListener('DOMContentLoaded', () => {
    countEl = document.getElementById('count');
    finalOverlay = document.getElementById('finalOverlay');
    replayBtn = document.getElementById('replay');
    winSound = document.getElementById('winSound');

    Object.keys(markers).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('markerFound', () => {
            if (!markers[id]) {
                markers[id] = true;
                updateCount();
            }
        });

        el.addEventListener('markerLost', () => {});
    });

    if (replayBtn) replayBtn.addEventListener('click', resetGame);
    updateCount();
});