function populateInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
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

function saveSkillInfo(user, skillName) {
    skillDescription = document.getElementById("descriptionInput").value;
    skillFrequencyInput = document.getElementById("frequencyInput").value;
    skillFrequencySelect = document.getElementById("frequencySelect").value;
    let Skills = {}
    Skills[skillName] = {
        description: skillDescription,
        interval: skillFrequencySelect,
        perInterval: skillFrequencyInput
    };
    db.collection("users").doc(user.uid).set({
        Skills
    }, { merge: true })
    .then(() => {
        console.log("Document successfully updated!");
    })
}

async function deleteStreak(user, skillName){
    let userDoc = db.collection("users").doc(user.uid);
    let deleteJSON = {Skills: {}}
    deleteJSON["Skills"][skillName] = firebase.firestore.FieldValue.delete()

    console.log(userDoc[deleteJSON], deleteJSON)
    await userDoc.set(deleteJSON, {merge: true})
    //alert("Deleted Successfully")
}