import * as main from "./main";

export function generateKey(length: number): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"§$%&/()=?´*+#\'\\}][{_-.:,;|<>^°´€@`';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getArgsOfParam(param: string): string[] {
    const args:string = main.start_params[param]["args"];
    return args.split(" ");
}