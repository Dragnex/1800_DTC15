function PopulateSkills(user){
    let finalSkills = db.collection("users").doc(user.uid).get().then(userData => {
        let skillTemplate = '<input type="button" value="VALUE" class="streak-count" onClick="RedirectStreakDetails()"/><h4 class="streak-title">TITLE</h4>'
        console.log(userData.data())
        for (let [key, value] of Object.entries(userData.data()["Skills"])){
            console.log(key, value)
            htmlObject = document.createElement('div')
            htmlObject.setAttribute("class", "list-group-item")
            interval = value["perInterval"] + " " + value["interval"]
            currentSkill = skillTemplate.replace("VALUE", interval).replace("TITLE", key)

            htmlObject.innerHTML = currentSkill
            document.getElementById("list-of-streaks").appendChild(htmlObject)
        }
    })
    return finalSkills
}

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var user_Name = userDoc.data().name;
               console.log(user_Name);
               //method #1:  insert with html only
               //document.getElementById("name-goes-here").innerText = n;    //using javascript
               //method #2:  insert using jquery
               $("#name-goes-here").text(user_Name);                         //using jquery
            })
        } else {
            // No user is signed in.
        }
    });
}


function RedirectStreakDetails(){
    window.location.assign("activity-streak-details.html");
}