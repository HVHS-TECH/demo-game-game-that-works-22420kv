const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');

import { initializeApp }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
 import { getAuth, GoogleAuthProvider, signInWithPopup }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
 export { fb_authenticate, fb_write, fb_readRecord};

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

    
var FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
var FB_GAMEDB  = getDatabase(FB_GAMEAPP);
console.log(FB_GAMEDB);


var currentUser = null;
var userId = null;


function status () {
    console.log('status working..');
}

/***********************************/
// fb_authenticate()
// Called by authenticate Button
// To firebase - cia signInwIthPopup
// Input: n/a
// Return: n/a
/***********************************/
function fb_authenticate() {
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

/***********************************/
// fb_writeRecord()
// Called by write record Button
// A record to firebase - via set
// Input: n/a
// Return: n/a
/***********************************/
function fb_write() {
    console.log('%c fb_write(): ',
        'color: ' + COL_C + '; background-color: hotPink'
    );

    //if (!currentUser) {
    //    alert("You must be logged in to proceed!");
    //    return;
    //} else {
    //    console.log("in the right place")
    //} 

    var score = document.getElementById("score").value;
    const dbReference = ref(FB_GAMEDB, 'House/People/');
    set(dbReference, score).then(() => {  
        console.log('successfull write');
        //✅ Code for a successful write goes here
    }).catch((error) => {
        console.log(error);
        //❌ Code for a write error goes here
    });

}


function fb_readRecord() {
    console.log("Didnt make it");
    console.log('%c fb_readRecord(): ',
        'color: ' + COL_C + '; background-color: lightPink'
    );
    
    const dbReference = ref(FB_GAMEDB, 'users/' + userId);
    
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