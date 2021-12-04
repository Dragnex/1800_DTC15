/**
 * Creates a skill in the user information
 * @param {object} user user information
 * @param {string} name skill's name
 * @param {string} description skill's description
 * @param {string} eachInterval skill's frequency
 */
function CreateSkill(user, name, description, eachInterval){
    let Skills = {}
    Skills[name] = {
        description: description,
        interval: eachInterval,
        iterations: {

        }
    }
    console.log(Skills)
    db.collection("users").doc(user.uid).set({
        Skills
    }, { merge: true }).then(function(){
        window.location.assign("main.html");
    })
}

/**
 * Creates a new collection for the user
 * @param {object} user a user object with name and email keys
 */
async function NewUser(user){
    // ******* WRITE TO DATABASE *******
    await db.collection("users").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        Skills: {}
    })
}

/**
 * Sets the active streak information
 * @param {string} id streak name
 * @param {string} id2 frequency of streak
 */
function setActiveStreak(id, id2){
    localStorage.setItem('activeStreak', id);
    localStorage.setItem('frequency', id2);
}