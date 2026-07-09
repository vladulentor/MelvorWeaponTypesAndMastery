const { loadModule } = mod.getContext(import.meta);


const { patchConditionalMod } = await loadModule('src/patches/patches/patchConditionalMod.mjs');
const { patchDataRegistration } = await loadModule('src/patches/patches/patchDataRegistration.mjs');
const { addCombatSkillXP } = await loadModule('src/patches/patches/addCombatSkillXP.mjs');


const { addParry } = await loadModule('src/patches/patches/addParry.mjs');

const { miscCombatPatches } = await loadModule('src/patches/patches/miscCombatPatches.mjs');
const { addMissingHealthMaxHit } = await loadModule('src/patches/patches/addMissingHealthMaxHit.mjs');



const { addWeaponMasteryUI } = await loadModule('src/patches/patches/weaponMastery/weaponMasteryUI.mjs');

const { patchWeaponTypeLogic } = await loadModule('src/patches/patches/weaponMastery/patchWeaponTypeLogic.mjs');

const {patchAccuracyRating} = await loadModule('src/patches/patches/patchAccuracyRating.mjs');

const {patchDodgeChance} = await loadModule('src/patches/patches/patchDodgeChance.mjs');
const {addPlayerBarrier} = await loadModule('src/patches/patches/addPlayerBarrier.mjs');
const {birthOfMonk} = await loadModule('src/patches/patches/birthOfMonk.mjs');

const {addSummonQuickenAttack} = await loadModule('src/patches/patches/addSummonQuickenAttack.mjs');

const {addSlashingToCompanion} = await loadModule('src/patches/patches/addSlashingToCompanion.mjs');
const {addRandomReductions} = await loadModule('src/patches/patches/addRandomReductions.mjs');



const { patchSkillNotif } = await loadModule('src/patches/patches/patchSkillNotif.mjs');

const { birthOfMonk2 } = await loadModule('src/patches/patches/makeGlovesWeapons.mjs');



export function patchSkillsBeforeDataReg(ctx) {
        patchDataRegistration(ctx);
        patchConditionalMod(ctx)
        addWeaponMasteryUI(ctx);
        patchWeaponTypeLogic(ctx);
        addMissingHealthMaxHit(ctx);
        addSlashingToCompanion(ctx);        
        addCombatSkillXP(ctx);
        addSummonQuickenAttack(ctx);
        miscCombatPatches(ctx);
        patchSkillNotif(ctx);
        patchAccuracyRating(ctx);
        patchDodgeChance(ctx);
        //addPlayerBarrier(ctx);
        addParry(ctx);
        addRandomReductions(ctx);
        birthOfMonk(ctx);
        birthOfMonk2(ctx);
}
export function patchSkillsAfterDataReg(ctx) {
        


}
/* TO DO
GET ALL TEXT TRANSLATED


MORE REWRITES FOR WEAPON TYPES (ONLY AFTER REBALANCES)
SCREAM AT EDWIN MORE BECAUSE OF TYPES (<- Important )
*/