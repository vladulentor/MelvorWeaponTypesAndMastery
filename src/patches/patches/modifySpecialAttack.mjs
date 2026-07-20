//Edit, plish this up for later.
//Update this isn't for specialAttacks but for combateffects... well whatever who's checking, you!? You're not gonna rat me out, I know who you are. I KNOW you.
export function modifySpecialAttack() {
    if (this._localID == "Daggers4") {
        const dodge = new ModifierValue(
            game.modifierRegistry.getObjectByID('WTM:critChance25Stealth'),
            1.5,
            {}
        );
        game.combatEffects.getObjectByID("WTM:Shrouded").statGroups.theStuff.modifiers.push(dodge);
    }
    if (this._localID == "Daggers5") {
        const dodge = new ModifierValue(
            game.modifierRegistry.getObjectByID('WTM:flatAttackInterval100Stealth'),
            -150,
            {}
        );
        game.combatEffects.getObjectByID("WTM:Shrouded").statGroups.theStuff.modifiers.push(dodge);
    }
    if (this._localID == "Thrown3") {
        game.combatEffects.getObjectByID("WTM:Alacrity").parameters.maxStacks += 15;

    }
}