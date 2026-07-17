export function addFunkyAttackCounts(){
    const bs = game.specialAttacks.getObjectByID("WTM:Blindside");
    Object.defineProperty(bs, 'attackCount', {
        get() {
            const stealth = game.modifiers.thievingStealth;
            const extraHits = Math.floor(stealth / 50);
            return 1 + extraHits;
        },
    });

    const ms = game.specialAttacks.getObjectByID("WTM:MultiShot");
 Object.defineProperty(ms, 'attackCount', {
        get() {
            const extrahits = game.modifiers.getValue("WTM:multiShotExtraShot", ModifierQuery.EMPTY);
            return 1 + extrahits;
        },
    });

    
}