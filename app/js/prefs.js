document.addEventListener('DOMContentLoaded', () => {
    console.log("PREFERENCES/CONFIG/SETTINGS JS, event DOMContentLoaded fired successfully");

    try {
        const jsonData = JSON.parse(window.electron.requestConfigJson());

        if (!jsonData) {
            console.error("ERR: No settings JSON data received.");
        }

        console.log(jsonData);

        const theme = jsonData.theme || "dark";

        document.getElementById('showappnameherebruh').innerHTML = jsonData.appname;

        switch (theme) {
            case "dark":
                document.documentElement.setAttribute("data-bs-theme", "dark");
                break;
            case "light":
                document.documentElement.setAttribute("data-bs-theme", "light");
                break;
            case "darker":
                document.documentElement.setAttribute("data-bs-theme", "dark");
                document.documentElement.setAttribute("data-ovs-theme", "darker");
                break;
            case "green":
                document.documentElement.setAttribute("data-bs-theme", "dark");
                document.documentElement.setAttribute("data-ovs-theme", "green");
                break;
            default:
                document.documentElement.setAttribute("data-bs-theme", "dark");
                document.documentElement.setAttribute("data-ovs-theme", "darker");
                break;
        }
    } catch (error) {
        console.error("ERR: js/prefs.js at MAIN/ONLY EVENT: ", error.message);
        alert("ERR: An error occurred while loading preferences. Please try again later.");
    }
});
