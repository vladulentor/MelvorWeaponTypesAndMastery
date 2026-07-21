export function patchFearLikeExtension() {
    const ourB = game.combatEffects.getObjectByID("WTM:Terrify").behaviours[4]; // this may be stupid


    game.combatEffects.allObjects.forEach(effect => {
        if (effect.effectGroups?.some(ef => ef._localID == "Fear") && effect.namespace !== "WTM") {

            effect.behaviours.push(ourB)
        }
   })

}