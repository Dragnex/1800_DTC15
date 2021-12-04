/**
 * Gets information from user and loads their skill information
 */
function populateInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    // ******** READ FROM DATABASE *******
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            var skillDescription = userDoc.data()["Skills"][localStorage.getItem("activeStreak")]["description"];
                            console.log(skillDescription)
                            var skillFrequencyInput = userDoc.data()["Skills"][localStorage.getItem("activeStreak")]["perInterval"];
                            var skillFrequencySelect = userDoc.data()["Skills"][localStorage.getItem("activeStreak")]["interval"];

                            //if the data fields are not empty, then write them in to the form.
                            if (skillDescription != null) {
                                document.getElementById("descriptionInput").value = skillDescription;
                            }
                            if (skillFrequencyInput != null) {
                                document.getElementById("frequencyInput").value = skillFrequencyInput;
                            }
                            if (skillFrequencySelect != null) {
                                document.getElementById("frequencySelect").value = skillFrequencySelect;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it
populateInfo();

/**
 * Updates the skill information
 * @param {object} user user information
 * @param {string} skillName skill's name
 */
async function saveSkillInfo(user, skillName) {
    skillDescription = document.getElementById("descriptionInput").value;
    skillFrequencySelect = document.getElementById("frequencySelect").value;
    let Skills = {}
    Skills[skillName] = {
        description: skillDescription,
        interval: skillFrequencySelect
    };
    // ******* WRITE TO DATABASE *******
    await db.collection("users").doc(user.uid).set({
        Skills
    }, { merge: true })
    .then(() => {
        console.log("Document successfully updated!");
    })
}

/**
 * Deletes the skill from the user's collection
 * @param {object} user a user object with a skills key
 * @param {string} skillName a string for which skill we are deleting
 */
async function deleteStreak(user, skillName){
    let userDoc = db.collection("users").doc(user.uid);
    let deleteJSON = {Skills: {}}
    deleteJSON["Skills"][skillName] = firebase.firestore.FieldValue.delete()

    console.log(userDoc[deleteJSON], deleteJSON)
    // ******* WRITE TO DATABASE *******
    await userDoc.set(deleteJSON, {merge: true})
    //alert("Deleted Successfully")
}