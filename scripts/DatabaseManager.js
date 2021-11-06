function CreateSkill(user, name, description, eachInterval, perInterval){
    newSkill[name] = {
        description: description,
        interval: eachInterval,
        perInterval: perInterval,
        iterations: {

        }
    }
    console.log(newSkill)
    db.collection("users").doc(user.uid).set({
       Skills: {
          newSkill
        }
    })
}

function NewUser(user){
    db.collection("users").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        Skills: {
            dummySkill: {
                description: "Dummy Skill",
                interval: "Daily",
                perInterval: "2",
                iterations: {

                }
            }
        }
    })
}