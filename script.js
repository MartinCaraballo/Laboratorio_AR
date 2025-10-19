const markers = {
    'marker-hiro': false,
    'marker-kanji': false,
    'marker-treasure': false
};

const countEl = document.getElementById('count');
const finalOverlay = document.getElementById('finalOverlay');
const replayBtn = document.getElementById('replay');
const winSound = document.getElementById('winSound');

function updateCount() {
    const found = Object.values(markers).filter(Boolean).length;
    countEl.textContent = found;
    if (found === 3) showFinal();
}

function showFinal() {
    if (winSound) {
        try { winSound.play(); } catch (e) { console.warn('Audio bloqueado por autoplay'); }
    }
    finalOverlay.style.display = 'grid';
}

function resetGame() {
    for (let k in markers) markers[k] = false;
    finalOverlay.style.display = 'none';
    updateCount();
}

window.addEventListener('DOMContentLoaded', () => {
    Object.keys(markers).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('markerFound', () => {
            if (!markers[id]) {
                markers[id] = true;
                console.log('Encontrado:', id);
                updateCount();
            }
        });

        el.addEventListener('markerLost', () => {
            console.log('Perdido:', id);
        });
    });

    replayBtn.addEventListener('click', resetGame);
});
