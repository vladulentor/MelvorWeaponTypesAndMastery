export function patchStealthBonuses({ patch }) {


    patch(CombatManager, 'getLootDoublingChance').after(function (ret, monster) {
        return ret + Math.floor(this.player.modifiers.thievingStealth / 25) * this.player.modifiers.getValue("WTM:doubleLootChance25Stealth", ModifierQuery.EMPTY);

    });
    patch(Player, 'modifyAttackInterval').after(function (ret, int) {
        return ret + Math.floor(this.modifiers.thievingStealth / 100) * this.modifiers.getValue("WTM:flatAttackInterval100Stealth", ModifierQuery.EMPTY);

    });
    patch(Player, 'getDamageTakenModifier').after(function (ret, int) {
        return ret + Math.floor(this.modifiers.thievingStealth / 25) * this.modifiers.getValue("WTM:damageTaken25Stealth", ModifierQuery.EMPTY);

    });
  
}