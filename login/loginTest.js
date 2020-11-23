import { centralDataBase } from "../firebaseCentral.js"

$("#btnLogin").on('click', login)
$("#btnSignUp").on('click', signUp)
$("#btnLogout").on('click', logOut)

export function login() {
    let firebase = centralDataBase();
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    console.log('reach login')
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    // sign in 
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // console.log(firebaseUser)
            console.log('logged in as: ' + firebaseUser.email);
            // testUser = firebaseUser.email;
            // getUser(firebaseUser.email)

            window.localStorage.setItem('user',firebaseUser.email);
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
        }
    });
}

export function logOut() {
    let firebase = centralDataBase();
    firebase.auth().signOut();
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if (firebaseUser) {
    //         // console.log(firebaseUser)
    //         console.log('logged in as: ' + firebaseUser.email);
    //         testUser = firebaseUser;
    //         btnLogout.classList.remove('hide');
    //     } else {
    //         console.log('not logged in');
    //         btnLogout.classList.add('hide');
    //     }
    // });
}

export function signUp() {
    let firebase = centralDataBase()

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');

    // todo: check for real email
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    // create user
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // console.log(firebaseUser)
            console.log('logged in as: ' + firebaseUser.email);
            btnLogout.classList.remove('hide');
            let content = "<span class='text1'>Signup successful, press login to continue</span>"
            $("#text").html(content);
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
        }
    });
}

// export function getUser () {
//     return testUser
// }

