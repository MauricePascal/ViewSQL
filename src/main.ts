import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as utils from "./utils";
import * as startup from "./startup";

export const start_params = JSON.parse(fs.readFileSync(__dirname.replace("dist", "")+"start_parameter.json").toString());

export const windows = new Map();

export function start(params: string[]) {
  if(params.length == 0 || params == undefined || params == null) {
    return app.quit();
  }
  switch(params[0]) {
    case "startup":
      startup.startup();
      // Create the browser window.
      const startup_window = new BrowserWindow({
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
      });
    
      // and load the index.html of the app.
      startup_window.loadFile(path.join(__dirname, "../startup.html"));
      windows.set("startup", startup_window);
      break;
    case "create-main":
      // Create the browser window.
      const main_window = new BrowserWindow({
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
      });

      // Close the startup window
      const startup_win:BrowserWindow = windows.get("startup");
      startup_win.close();
    
      // and load the index.html of the app.
      main_window.loadFile(path.join(__dirname, "../index.html"));
      break;
    default:
      return app.quit();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  start(utils.getArgsOfParam("startup"));

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) start(utils.getArgsOfParam("startup"));
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
