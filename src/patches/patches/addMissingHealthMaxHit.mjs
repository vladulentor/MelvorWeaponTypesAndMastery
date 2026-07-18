export function addMissingHealthMaxHit({patch}){
    patch(Character, "getMaxHitModifier").after(function(maxhit){
        return maxhit + (this.modifiers.getValue("WTM:maxHitBasedOnMissingHitpoints", ModifierQuery.EMPTY) * (100 - this.hitpointsPercent)) / 10
    })
    
}