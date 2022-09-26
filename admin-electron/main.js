//every electron project has one main process which are created  in this file
const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu } = electron;
//import from electron
//app is user life cyle of the app and use an events base api
let mainWindow;
let addWindow;

// create the BrowserWindow
const createWindow = () => {
  //create main window
  mainWindow = new BrowserWindow({
    title: "Far AND Close",
    width: 950,
    height: 800,
    icon: path.join(__dirname, "./frontend/assets/logo.ico"),
  });
  //load the html file into window`
  //just like file://dirname/abc/test.html
  mainWindow.loadFile(path.join(__dirname, "./frontend/admin.html"));

  //quit app when close
  mainWindow.on("close", () => {
    app.quit();
  });

  // build menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert the menu
  Menu.setApplicationMenu(mainMenu);
};

//run create window function
//the main event we need to listen is ready,this event will fire once when the  app is ready
app.on("ready", createWindow);

//create Menu
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];
