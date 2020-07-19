const { ipcRenderer } = require('electron')
const Timer = require('timer.js');

const start = () => {
    const workTimer = new Timer({
        ontick: update,
        onend() {
            notify();
        },
    });
    workTimer.start(10);
}

const update = (ms) => {
    const container = document.getElementById('timer-container');
    const s = parseInt(ms / 1000);
    const sec = s % 60;
    const min = parseInt(s / 60);
    container.innerText = `${min.toString().padStart(2, 0)}:${sec.toString().padStart(2, 0)}`
}

const notify = async () => {
    const res = await ipcRenderer.invoke('work-notification');
    res === 'REST' && setTimeout(() => alert('休息'), 5 * 1000);
    res === 'WORK' && start();
}

start();