export function patchDodgeChance({ patch }) {
    patch(Player, "computeCombatStats").before(function () {
        const dod = this.game.modifiers.getValue('WTM:dodgeChancePer1000EnemyAccuracyRating', ModifierQuery.EMPTY);
        if (dod) { 
            if(this.target.id !== this.targetForDodge){
            this.targetForDodge = this.target.id
            game.modifiers.removeModifiers('ExtraDodgeForEnemyAccuracy')
            const extradodgechance = Math.floor(this.target.stats._accuracy * dod / 10)/100;
            const dodge = new ModifierValue(
                game.modifierRegistry.getObjectByID('melvorD:dodgeChance'),
                extradodgechance,
                {}
            );
            game.modifiers.addModifiers('ExtraDodgeForEnemyAccuracy', [dodge], 1, 1);}
        }
    });

}