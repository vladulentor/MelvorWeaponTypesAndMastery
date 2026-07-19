// it's entirely possible the modifications data parser allows us to do this in the .json but I'm too shmooving to check that shit
                        //Bless me and my big chungus life

export function addEffectGroupToConditions(){
   const f=  game.combatEffectGroups.getObjectSafe("WTM:LBowDebuffs");
game.combatEffects.getObjectByID("melvorD:Burn").effectGroups.push(f);
game.combatEffects.getObjectByID("melvorD:Bleed100").effectGroups.push(f);
game.combatEffects.getObjectByID("melvorD:Burn").effectGroups.push(f);
game.combatEffects.getObjectByID("WTM:Immobilize").effectGroups.push(f);
game.combatEffects.getObjectByID("melvorD:Slow").effectGroups.push(f);  
}

