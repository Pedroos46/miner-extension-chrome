/*Copyright (C) 2017, Roger Pedros All rights reserved.*/


/*Guarda l'obecjte que l'hi pasis a la BD interna*/
function saveDatatoDB(objectToSave) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(objectToSave, (result) => {
            resolve();
        });
    });
}


/*Recupera de la BD la configuració del usuari*/
function getThreads() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('threads', (result) => {
            resolve(result);
        });
    });
}

function getThrottle() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('throttle', (result) => {
            resolve(result);
        });
    });
}
