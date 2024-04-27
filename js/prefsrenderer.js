document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prefsform');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const theme = document.getElementById('theme').value;
        const language = document.getElementById('language').value;
        const appName = document.getElementById('appNameInp').value;

        const formData = {
            "theme": theme,
            "lang": language,
            "appname": appName
        };

        const settsJson = JSON.stringify(formData);

        console.log(settsJson);
        window.electronAPI.pushSetts(settsJson)

        const b = document.createElement('a');
        b.href = "index.html?updatedAppname=true";
        b.click();
    });
});
