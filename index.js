const { app, BrowserWindow, ipcMain } = require("electron"),
    path = require("path"),
    url = require("url"),
    request = require("request"),
    applicationId = "",
    sharedSecret = "";

let window = null;

ipcMain.on("dosomething", (event, somevalue) => {
    // console.log(`++++ ipcMain ${somevalue}`);
});

const createWindow = async (event) => {

    await authenticateApp();

    window = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadURL(url.format({
        pathname: path.join(__dirname, "app/views/index.html"),
        protocol: "file",
        slashes: true
    }));

    // window.webContents.openDevTools();

    window.on("closed", (event) => {
        window = null;
    });
};

const makeRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error);
            let { statusCode, statusMessage } = response;
            if (statusCode != 200) reject(statusMessage);
            resolve(body);
        });
    });
};

const authenticateApp = async () => {
    let url = new URL("https://home.mozu.com");
    url.pathname = "api/platform/applications/authtickets";
    url.search = new URLSearchParams({
        responseFields: "accessToken,refreshToken"
    });

    let options = {
        method: "POST",
        url: url.toString(),
        json: {
            "applicationId": applicationId,
            "sharedSecret": sharedSecret
        }
    };

    try {
        const response = await makeRequest(options);
        global.mozu = response;
    }
    catch (error) { console.log(`authenticateApp::${error}`); }
};

app.on("ready", createWindow);