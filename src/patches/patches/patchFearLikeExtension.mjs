export function patchFearLikeExtension(){
const ourB = game.combatEffects.getObjectByID("WTM:Terrify").behaviours[4]; // this may be stupid
game.combatEffects.allObjects.forEach(effect => {

    effect.exclusiveGroups.forEach(exclusive => {
        if (exclusive._localID == "Fear" && effect._localID!=="Terrify")
        {effect.behaviours.push(ourB)}
    })
})

}