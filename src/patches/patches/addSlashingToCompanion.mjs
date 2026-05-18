export function addSlashingToCompanion({patch}){
 patch(Player,"applySummonDamageModifiers").after(function(damn, dam, isBarier){
    console.log(this.equipmentStats);
    damn += this.modifiers.getValue("WTM:slashingOnSummon", ModifierQuery.EMPTY) * (this.equipmentStats.slashAttackBonus+this.modifiers.flatSlashAttackBonus) / 100
  }
);
}