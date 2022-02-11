// Necesitamos respuestas predefinidas
// en caso que algo no vaya del todo bien
const statusMessages = {
    200: 'Done',
    201: 'Created',
    400: 'Invalid Format',
    500: 'Internal Error',
}


export const success = function (request, response, message, status=200){
    let statusCode = status;
    let statusMessage = message;
    
    if(!message){
        statusMessage = statusMessages[status];
    }

    response.status(statusCode).send({
        error:'',
        body: statusMessage,
    });
}

export const error = function (request, response, details, message, status=500){
    let statusCode = status;
    let statusMessage = message;
    
    if(!message){
        statusMessage = statusMessages[status];
    }
    console.error('\x1b[31m%s\x1b[0m','[response-error] ',details);
    response.status(statusCode).send({
        error:statusMessage,
        body: ''
    });
}

/* 

COLORES PARA LA CONSOLA DE NODE

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

*/