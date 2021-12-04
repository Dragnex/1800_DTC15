/**
 * Logs the user out and redirects to login page
 * @param {object} user user information
 */
function logout(user) {
    firebase.auth().signOut().then(() => {
        console.log('user signed out');
        window.location.assign('../html/login.html')
    })
}
