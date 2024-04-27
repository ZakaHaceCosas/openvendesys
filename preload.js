const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    requestDataJson: () => ipcRenderer.sendSync('request-data-json'),
    requestConfigJson: () => ipcRenderer.sendSync('request-config-json'),
    updateJson: (key, value) => ipcRenderer.send('update-json', key, value),
});

contextBridge.exposeInMainWorld('electronAPI', {
    pushF1UpdData: (data) => ipcRenderer.send('pushF1UpdData', data)
})

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updDataF1');

    form.addEventListener('submit', event => {
        const formData = new FormData(form);
        ipcRenderer.send('submit-form', formData);
    });
});
