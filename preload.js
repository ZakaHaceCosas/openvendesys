const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    requestDataJson: () => ipcRenderer.sendSync('request-data-json'),
    requestConfigJson: () => ipcRenderer.sendSync('request-config-json'),
    updateJson: (key, value) => ipcRenderer.send('update-json', key, value),
    updatePrefs: (prefs) => ipcRenderer.sendSync('pushSetts', prefs)
});

contextBridge.exposeInMainWorld('electronAPI', {
    pushF1UpdData: (data) => ipcRenderer.send('pushF1UpdData', data),
    pushSetts: (prefs) => ipcRenderer.send('pushSetts', prefs)
})

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updDataF1');

    if (form) {
        form.addEventListener('submit', event => {
            const formData = new FormData(form);
            ipcRenderer.send('submit-form', formData);
        });
    } else {
        console.log("EY! Form with id 'updDataF1' not found.");
    }
});
