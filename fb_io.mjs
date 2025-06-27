const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');

import { initializeApp }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
 import { getAuth, onAuthStateChanged }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { signInWithCustomToken } 
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

export { fb_writeScore};

const FB_GAMECONFIG = {
        apiKey: "AIzaSyCn36qBrPRutqLXCYIyzkyjMQRiYyhRC2Q",
        authDomain: "comp-2025-kyla-van-weele.firebaseapp.com",
        databaseURL: "https://comp-2025-kyla-van-weele-default-rtdb.firebaseio.com",
        projectId: "comp-2025-kyla-van-weele",
        storageBucket: "comp-2025-kyla-van-weele.firebasestorage.app",
        messagingSenderId: "726085363137",
        appId: "1:726085363137:web:32da18f88b84bf19fffb40",
        measurementId: "G-RXDD9GFN2H"
      };


const app = initializeApp(FB_GAMECONFIG);
const FB_GAMEDB  = getDatabase(app);
const auth = getAuth(app);
console.log(FB_GAMEDB);
const gameName = "gameThatWorks";


const urlParams = new URLSearchParams(window.location.search);
const idToken = urlParams.get('token');

if (idToken) {
    fetch(`https://hvhs-tech.github.io/12-comp-database-assessment-2025-22420kv/verify-token`, {
        method:`POST`,
        body: JSON.stringify({token: idToken}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        const customToken = data.customToken;
        return signInWithCustomToken(auth, customToken);
    })
    .then((userCredential) => {
        console.log("User logged in via token:", userCredential.user.email);
    })
    .catch((error) => {
        console.error("Login via token failed", error);
    });
}

/***********************************/
// fb_authenticate()
// Called by authenticate Button
// To firebase - cia signInwIthPopup
// Input: n/a
// Return: n/a
/***********************************/
/*function fb_authenticate() {
    console.log('%c fb_authenticate(): ', 
        'color: ' + COL_C + '; background-color: deepPink'
    );

    status();
    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    if (status, fb_authenticate) {
        console.log('User is logged in')
        } else {
            console.log('user not logged in');
            return null;
        }
}

*/

function fb_writeScore(score) {
     console.log('%c fb_writeScore(): ',
        'color: ' + COL_C + '; background-color: hotPink'
    );

    

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.warn("User not signed in, cant submit score");
            return;
        }
        const userId = user.uid;
        const name = user.displayName || "Anonymous";

        const dbRef = ref(FB_GAMEDB, `website/scores/${gameName}/${user.uid}`);

        set(dbRef, {
            name: name,
            score: score
        }).then(() => {
            console.log("Score submitted:", score);
        }).catch((error) => {
            console.error("Failed to write score:", error);
        });;
    });
}

//ingame
//fb_writeScore(55, GameName)
//

//fiunc fb_writescore(_score,_GameName){
//    write  _score to the _GameName db 
//}

/***********************************/
// fb_writeRecord()
// Called by write record Button
// A record to firebase - via set
// Input: n/a
// Return: n/a
/***********************************/
/*function fb_write() {
    console.log('%c fb_write(): ',
        'color: ' + COL_C + '; background-color: hotPink'
    );

    //if (!currentUser) {
    //    alert("You must be logged in to proceed!");
    //    return;
    //} else {
    //    console.log("in the right place")
    //} 

    const dbReference = ref(FB_GAMEDB, 'Website/gameThatWorksScore/');
    set(dbReference,
    ).then(() => {  
        console.log('successfull write');
        //✅ Code for a successful write goes here
    }).catch((error) => {
        console.log(error);
        //❌ Code for a write error goes here
    });

}
*/

function fb_readRecord() {
    console.log("Didnt make it");
    console.log('%c fb_readRecord(): ',
        'color: ' + COL_C + '; background-color: lightPink'
    );
    
    
    return get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log(fb_data);
        } else {
            console.log('No record found');
            return null; // Return null if no data is found
        }
    }).catch((error) => {
        console.log('failed read');
        throw error; // Rethrow the error to propagate it
    });
    
}