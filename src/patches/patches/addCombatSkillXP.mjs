export function addCombatSkillXP({patch}){
      patch(Skill, "getXPModifier").after(function (mod, action) {
        if (this.isCombat)
           return mod + this.game.modifiers.getValue("WTM:combatSkillXP", ModifierQuery.EMPTY);
    })
    patch(Skill, "_buildXPSources").after(function (builder, action) {
        if(this.isCombat)
        builder.addSources("WTM:combatSkillXP", undefined /* this shit is global so no query */, 1);
    });
}