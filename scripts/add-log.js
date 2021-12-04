/**
 * Creates a goal log
 * @param {object} user user information
 * @param {string} name name of the user
 * @param {string} description description of the log
 */
function CreateLog(user, name, description){
    let Skills = {}
    let timestamp = new Date().getTime()
    console.log(timestamp)
    console.log(user, name, description);
    Skills[name] = {
        iterations: {}
    };
    console.log(Skills[name], Skills[name]["iterations"])
    console.log(timestamp)
    Skills[name]["iterations"][timestamp] = {
        description: description
    }
    console.log(timestamp)
    db.collection("users").doc(user.uid).set({
        Skills
    }, { merge: true }).then(function(){
        window.location.assign("log-activity.html");
    })
}

/**
 * Reads and loads logs
 * @param {object} user user information
 * @param {string} skillName the skill's name
 * @returns the list of logs from the user's skill
 */
function PopulateLogs(user, skillName){
    let logList = db.collection("users").doc(user.uid).get().then(userData => {
        let skillTemplate = '<tr class="streak-title">TITLE</tr>'
        console.log(userData.data())
        sortedKeys = GetSortedObjectKeys(userData.data()["Skills"][skillName]["iterations"])
        console.log(sortedKeys)
        for (let key in sortedKeys){
            htmlObject = document.createElement('tr')
            // htmlObject.setAttribute("class", "list-group-item")
            let date = new Date(parseInt(sortedKeys[key])).toLocaleDateString("en-US")
            let today = new Date(new Date().getTime()).toLocaleDateString("en-US");
            let displayDate;
            if (date == today) {
                displayDate = "Today";
            } else {
                displayDate = date;
            }
            let displayTime = '<td class="streakTime">' + new Date(parseInt(sortedKeys[key])).toLocaleTimeString("en-US") + '</td>'
            console.log(displayTime)
            let dateWrapper = '<td class="streakDate">' + displayDate + '</td>'
            // let time = '<td class="streakTime">' + new Date(parseInt(sortedKeys[key])).toLocaleTimeString("en-US") + '</td>'
            let description = '<td class="streakDescription">' + userData.data()["Skills"][skillName]["iterations"][sortedKeys[key]]["description"] + '</td>'
            
            let deleteButton = '<td class="deleteButton" onclick="deleteLog(SKILLNAME, TIMESTAMP)"><span class="material-icons">delete</span></td>'
            
            currentSkill = skillTemplate.replace("TITLE", (description + dateWrapper + displayTime + deleteButton)).replace("SKILLNAME", ("'" + skillName + "'")).replace("TIMESTAMP", ("'" + sortedKeys[key] + "'"))

            htmlObject.innerHTML = currentSkill
            document.getElementById("activity-history").appendChild(htmlObject)
        }
    })
    return logList
}

/**
 * Gets the keys from an object and sorts them
 * @param {object} object 
 * @returns sorted array of keys from an object
 */
function GetSortedObjectKeys(object){
    console.log(object)
    let keyArray = Object.keys(object);
    console.log(keyArray)
    let sortedThing = keyArray.sort().reverse()
    console.log(sortedThing)
    return sortedThing
}

/**
 * Deletes the log from the user's skill
 * @param {object} user user information
 * @param {string} skillName the skill's name
 * @param {string} timestamp timestamp of when the log was made
 */
async function DeleteLog(user, skillName, timestamp){
    let userDoc = db.collection("users").doc(user.uid);
    let deleteJSON = {Skills: {}}
    deleteJSON["Skills"][skillName] = {iterations: {}}
    deleteJSON["Skills"][skillName]["iterations"][timestamp] = firebase.firestore.FieldValue.delete()
    
    await userDoc.set(deleteJSON, {merge: true})
    //alert("Deleted Successfully")
}