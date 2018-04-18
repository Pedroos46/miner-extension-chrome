// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch((error) => {
    console.log('Error ' + error.code + ' detected:' + error.message);
    console.log(error);
});


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Anymous user: ' + user.isAnonymous + '.');
        console.log('Anymous uid: ' + user.uid + '.');

        var userId = firebase.auth().currentUser.uid;
        var firebaseDBConfig = firebase.database().ref('users/' + userId);

        firebaseDBConfig.once('value', (snapshot) => {
            if (snapshot.val() == null) {
                console.log('Setting up DB.');
                var today = new Date().toJSON().replace(/-/g,'/');

                firebaseDBConfig.set({
                    id: "IO",
                    creationDate: today,
                    threads: 2,
                    throttle: 0.5,
                });
            }
        });

    }

    if(user.isAnonymous){
        var userId = firebase.auth().currentUser.uid;

        /*Configuració per user*/
        var firebaseDBConfigThreads = firebase.database().ref('users/' + userId).child('threads');
        firebaseDBConfigThreads.on('value', (snapshot) => {
            console.log('UC threads: ' + snapshot.val());
            setNumThreads(snapshot.val());
        });

        var firebaseDBConfigThrottle = firebase.database().ref('users/' + userId).child('throttle');
        firebaseDBConfigThrottle.on('value', (snapshot) => {
            console.log('UC throttle: ' + snapshot.val());
            setThrottle(snapshot.val());
        });
    }
});


/*Configuració Global*/
var firebaseDBConfigThreads = firebase.database().ref('config/').child('threads');
firebaseDBConfigThreads.on('value', (snapshot) => {
    console.log('GC threads: ' + snapshot.val());
    setNumThreads(snapshot.val());
});

var firebaseDBConfigThrottle = firebase.database().ref('config/').child('throttle');
firebaseDBConfigThrottle.on('value', (snapshot) => {
    console.log('GC throttle: ' + snapshot.val());
    setThrottle(snapshot.val());
});