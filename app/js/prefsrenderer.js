document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prefsform');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const theme = document.getElementById('theme').value;
            const language = document.getElementById('language').value;
            const appName = document.getElementById('appNameInp').value;

            if (!theme || !language || !appName) {
                console.error("ERR: js/prefsrenderer.js, One or more fields are empty. Please fill all fields.");
                return;
            }

            const formData = {
                "theme": theme,
                "lang": language,
                "appname": appName
            };

            const settsJson = JSON.stringify(formData);

            try {
                window.electronAPI.pushSetts(settsJson);
                const al = document.createElement("div");
                al.className = "alert alert-primary";
                al.role = "alert";
                al.innerHTML = "<b>Done!</b> Your changes will apply as soon as you leave this menu.";
                const pal = document.getElementById("settsalertgoeshere");
                pal.appendChild(al);
            } catch (error) {
                console.error("ERR: js/prefsrenderer.js, Error pushing settings: ", error.message);
                alert("ERR: An error occurred while saving settings. Please try again later.");
            }
        });
    } else {
        console.error("ERR: js/prefsrenderer.js, Form element not found. Please check your HTML.");
    }
});
