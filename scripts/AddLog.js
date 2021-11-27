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
            currentSkill = skillTemplate.replace("TITLE", (description + dateWrapper + displayTime))

            htmlObject.innerHTML = currentSkill
            document.getElementById("activity-history").appendChild(htmlObject)
        }
    })
    return logList
}

function GetSortedObjectKeys(object){
    console.log(object)
    let keyArray = Object.keys(object);
    console.log(keyArray)
    let sortedThing = keyArray.sort().reverse()
    console.log(sortedThing)
    return sortedThing
}