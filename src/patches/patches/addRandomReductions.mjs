export function addRandomReductions({ patch }) {
    patch(Player, "getRuneCosts").after(function (cost, spell) {
        if (game.modifiers.getValue("WTM:RandomUpSpellDamRune", ModifierQuery.EMPTY)) {
            const min = 50 + game.modifiers.getValue("WTM:RandomRuneReduction", ModifierQuery.EMPTY)
            const randMod = Math.floor(Math.random() * (250 - min + 1)) + min;
            cost.forEach(rune => rune.quantity = Math.ceil(rune.quantity * randMod / 100));
            return cost;
        }
    });
    patch(Player, "applyDamageModifiers").after(function (dam, target, damage) {
        if (game.modifiers.getValue("WTM:RandomUpSpellDamRune", ModifierQuery.EMPTY)) {
            const max = 250 + game.modifiers.getValue("WTM:RandomDamIncrease", ModifierQuery.EMPTY)
            return dam * (Math.floor(Math.random() * (max - 50 + 1)) + 50) / 100;
        }

    })
}