import * as fs from "fs";
import * as main from "./main";
import * as utils from "./utils";

export function startup() {
    setTimeout(() => {
        if(!fs.existsSync(__dirname.replace("dist", "")+"enc_keys.vsqlk")) {
            fs.writeFile(__dirname.replace("dist", "")+"enc_keys.vsqlk", utils.generateKey(5000), () => {
                main.start(utils.getArgsOfParam("create main"));       
            });
        } else {
            main.start(utils.getArgsOfParam("create main"));
        }
    }, 5000);
}