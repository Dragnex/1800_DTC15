function CreateLog(user, name, description){
    let Skills = {}
    +new Date
    let timestamp = Date.now
    Skills[name][iterations][log] = {
        description: description,
        timestamp: timestamp
    }
    console.log(Logs)
    db.collection("users").doc(user.uid).set({
        Logs
    }, { merge: true }).then(function(){
        window.location.assign("log-activity.html");
    })
}

function PopulateLogs(user){
    let logList = db.collection("users").doc(user.uid).get().then(userData => {
        let skillTemplate = '<p class="streak-title">TITLE</p>'
        console.log(userData.data())
        for (let [key, value] of Object.entries(userData.data()["Logs"])){
            console.log(key, value)
            htmlObject = document.createElement('div')
            htmlObject.setAttribute("class", "list-group-item")
            currentSkill = skillTemplate.replace("TITLE", key)

            htmlObject.innerHTML = currentSkill
            document.getElementById("activity-history").appendChild(htmlObject)
        }
    })
    return logList
}