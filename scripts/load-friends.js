/**
 * Gets the user's friends and loads it to the page
 * @param {object} user user information
 * @param {object} template html template for friend
 */
async function LoadFriends(user, template){
    let friendTemplate = template;
    let friendArray = await db.collection("users").doc(user.uid).get().then(userData => {
        return userData.data()["Friends"];
    })
    console.log(friendArray)
    let friends = await db.collectionGroup('users').where('email', 'in', friendArray);
    
    friends.get().then(friendsData => {
        friendsData.forEach(doc => {
            friendData = doc.data();
            userId = doc.id
            console.log(userId)
            currentFriend = friendTemplate.replaceAll("NAME", friendData["name"]).replaceAll("UID", userId);
            console.log(userId)
            document.getElementById("friends-list").innerHTML += currentFriend;
        });
        console.log(friendsData)
    });
}

/**
 * Searches for friend's email and adds it to the user's friends
 * @param {object} user user information
 * @param {string} email searched email
 */
async function AddFriend(user, email){
    await db.collection("users").doc(user.uid).update({
        "Friends": firebase.firestore.FieldValue.arrayUnion(email)
    })
}