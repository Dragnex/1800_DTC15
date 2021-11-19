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
        let skillTemplate = '<li class="streak-title">TITLE</li>'
        console.log(userData.data())
        sortedKeys = GetSortedObjectKeys(userData.data()["Skills"][skillName]["iterations"])
        console.log(sortedKeys)
        for (let key in sortedKeys){
            htmlObject = document.createElement('div')
            htmlObject.setAttribute("class", "list-group-item")
            let date = '<span class="streakDate">' + new Date(parseInt(sortedKeys[key])).toLocaleDateString("en-US") + '</span>'
            let time = '<span class="streakTime">' + new Date(parseInt(sortedKeys[key])).toLocaleTimeString("en-US") + '</span>'
            let description = '<span class="streakDescription">' + userData.data()["Skills"][skillName]["iterations"][sortedKeys[key]]["description"] + '</span>'
            currentSkill = skillTemplate.replace("TITLE", (description + " " + date.toString() + " " + time.toString()))

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