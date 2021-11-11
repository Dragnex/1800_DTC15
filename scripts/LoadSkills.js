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

function RedirectStreakDetails(){
    window.location.assign("activity-streak-details.html");
}