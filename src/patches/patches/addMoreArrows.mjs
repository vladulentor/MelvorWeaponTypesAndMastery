export function addMoreArrows() {
    const gs = game.combatEffectTables.getObjectByID("WTM:RandomCondition")
    const vs = game.combatEffectTables.getObjectByID("WTM:RandomConditionExtras")
    gs.table.push(...vs.table)
    gs.totalWeight += 2;
}

export function doubleArrowLength() {
    const gs = game.combatEffectTables.getObjectByID("WTM:RandomCondition")
    for (const cond of gs.table) {
        cond.applicator.effect.parameters.procs +=5
        cond.applicator.effect.damageGroups.total.damageCap *=2   
    }

}