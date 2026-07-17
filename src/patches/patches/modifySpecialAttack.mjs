//Edit, plish this up for later.
export function modifySpecialAttack() {
    if (this._localID === "Daggers4") {
        const dodge = new ModifierValue(
            game.modifierRegistry.getObjectByID('WTM:critChance25Stealth'),
            1.5,
            {}
        );
        game.combatEffects.getObjectByID("WTM:Shrouded").statGroups.theStuff.modifiers.push(dodge);
    }
    if (this._localID === "Daggers5") {
        const dodge = new ModifierValue(
            game.modifierRegistry.getObjectByID('WTM:flatAttackInterval100Stealth'),
            -150,
            {}
        );
        game.combatEffects.getObjectByID("WTM:Shrouded").statGroups.theStuff.modifiers.push(dodge);
    }

}