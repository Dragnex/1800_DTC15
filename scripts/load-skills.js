/**
 * Gets user's skills and loads it to the page
 * @param {object} user user information
 * @param {object} template html template for skill
 * @returns an object containing user skills info
 */
function PopulateSkills(user, template){
    let skillTemplate = template;
    // ******* DATABASE READ *******
    let finalSkills = db.collection("users").doc(user.uid).get().then(userData => {
        console.log(userData.data())
        let timestamp = new Date().getTime();
        for (let [key, value] of Object.entries(userData.data()["Skills"])){
            interval = value["interval"].toLowerCase();
            let logs = userData.data()["Skills"][key]["iterations"];
            let logKeys = GetSortedObjectKeys(logs)
            let done = GetStreakLength(logs, key, value, interval, logKeys)
            currentSkill = skillTemplate.replaceAll("FREQUENCY", interval).replaceAll("TITLE", key).replaceAll("AMOUNT", done);
            document.getElementById("table-of-streaks").innerHTML += currentSkill;
        }
    })
    return finalSkills
}

/**
 * Gets user's name and loads it to the welcome message
 */
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here:
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            // ******** DATABASE READ ********
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

/**
 * Sets active streak and redirects to log activity page
 * @param {string} id streak's name
 * @param {string} id2 streak's frequency
 */
function RedirectStreakDetails(id, id2){
    console.log(id, id2);
    setActiveStreak(id, id2);
    window.location.assign("log-activity.html");
}

/**
 * Gets the streak's duration and returns the number of times the streak is going
 * @param {Array} logs array of streak logs
 * @param {string} key key of logs
 * @param {string} value value of logs
 * @param {string} interval interval of log
 * @param {Array} logKeys array of keys for logs
 * @returns how many days in a row a user has completed a task
 */
function GetStreakLength(logs, key, value, interval, logKeys) {
    let intervalObj = {"weekly": 604800000, "monthly": 2419000000, "daily": 86400000}
    // intervalObj = {"weekly": 7, "monthly": 30, "daily": 1}
    let streak = 0
    let todayDone = false;
    let timestamp = new Date().getTime();
    let lastInterval = Math.floor(parseInt(timestamp) / parseInt(intervalObj[interval]))
    for (let objKey of logKeys) {
        let logInterval = Math.floor(parseInt(objKey) / parseInt(intervalObj[interval]))
        console.log(Math.floor((logInterval - lastInterval)));
        if (Math.floor((logInterval - lastInterval) == -1)){
            streak++;
            lastInterval = logInterval;
        }
        else if (!todayDone && (Math.floor((logInterval - lastInterval) == 0))){
            streak++;
            lastInterval = logInterval;
            todayDone = true
        }
    }
    return streak
}