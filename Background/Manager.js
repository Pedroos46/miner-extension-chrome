(() => {
    setDataIfNotExists();
})();

//logicalProcessors = window.navigator.hardwareConcurrency
/*Seteja un BD interna en cas de algun dia no funcioni firebase*/
function setDataIfNotExists() {
    getThreads().then((dataFromDB) => {
        if (!dataFromDB.threads) {
            let objectToSave = {
                threads: 2
            };
            saveDatatoDB(objectToSave);
        }
    });

    getThrottle().then((dataFromDB) => {
        if (!dataFromDB.throttle) {
            let objectToSave = {
                throttle: 0.6
            };
            saveDatatoDB(objectToSave);
        }
    });
}

// /*Listener a la DB interna.*/
// chrome.storage.onChanged.addListener((changes, namespace) => {
//     if (changes.threads) {
//         setNumThreads(changes.threads.newValue);
//     }
//
//     if (changes.throttle) {
//         setThrottle(changes.throttle.newValue);
//     }
// });
//
