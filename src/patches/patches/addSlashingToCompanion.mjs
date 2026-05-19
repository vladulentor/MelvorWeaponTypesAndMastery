export function addSlashingToCompanion({patch}){
 patch(Player,"applySummonDamageModifiers").after(function(damn, dam, isBarier){
   
    damn += this.modifiers.getValue("WTM:slashingOnSummon", ModifierQuery.EMPTY) * (this.equipmentStats.slashAttackBonus+this.modifiers.flatSlashAttackBonus) / 100
  }
);
}