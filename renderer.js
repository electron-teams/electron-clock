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
    container.innerText = ms
}

const notify = async () => {
    const res = await ipcRenderer.invoke('work-notification');
    res === 'REST' && setTimeout(() => alert('休息'), 5 * 1000);
    res === 'WORK' && start();
}

start();