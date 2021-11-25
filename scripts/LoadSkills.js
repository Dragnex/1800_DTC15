function PopulateSkills(user, template){
    let skillTemplate = template;
    let finalSkills = db.collection("users").doc(user.uid).get().then(userData => {
        console.log(userData.data())
        let timestamp = new Date().getTime();
        for (let [key, value] of Object.entries(userData.data()["Skills"])){
            //htmlObject = document.createElement('div');
            //htmlObject.setAttribute("class", "list-group-item");
            interval = value["interval"];
            let logs = userData.data()["Skills"][key]["iterations"];
            let intervalObj = {"weekly": 604800000, "monthly": 2419000000, "daily": 86400000}
            let done = 0;
            for (let [objKey, objValue] of Object.entries(logs)) {
                console.log(timestamp, parseInt(objKey));
                if (timestamp - parseInt(objKey) < intervalObj[value["interval"]]){
                    done++;
                }
            }
            currentSkill = skillTemplate.replaceAll("FREQUENCY", interval).replaceAll("TITLE", key).replaceAll("AMOUNT", done);
            document.getElementById("table-of-streaks").innerHTML += currentSkill;
            //htmlObject.innerHTML = currentSkill;
            //document.getElementById("list-of-streaks").appendChild(htmlObject);
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


function RedirectStreakDetails(id){
    console.log("AAAAAAAAAAA" + id);
    setActiveStreak(id);
    window.location.assign("log-activity.html");
}