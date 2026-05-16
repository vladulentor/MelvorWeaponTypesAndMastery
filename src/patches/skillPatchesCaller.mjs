const { loadModule } = mod.getContext(import.meta);


const { patchConditionalMod } = await loadModule('src/patches/patches/patchConditionalMod.mjs');
const { patchDataRegistration } = await loadModule('src/patches/patches/patchDataRegistration.mjs');
const { addCombatSkillXP } = await loadModule('src/patches/patches/addCombatSkillXP.mjs');


const { addWeaponType } = await loadModule('src/patches/patches/weaponMastery/addWeaponType.mjs');
const { addParry } = await loadModule('src/patches/patches/addParry.mjs');


const { addWeaponMasteryUI } = await loadModule('src/patches/patches/weaponMastery/weaponMasteryUI.mjs');

const { patchWeaponTypeLogic } = await loadModule('src/patches/patches/weaponMastery/patchWeaponTypeLogic.mjs');

const {patchAccuracyRating} = await loadModule('src/patches/patches/patchAccuracyRating.mjs');

const {patchDodgeChance} = await loadModule('src/patches/patches/patchDodgeChance.mjs');
const {addPlayerBarrier} = await loadModule('src/patches/patches/addPlayerBarrier.mjs');


const { patchSkillNotif } = await loadModule('src/patches/patches/patchSkillNotif.mjs');




export function patchSkillsBeforeDataReg(ctx) {
        patchDataRegistration(ctx);
        patchConditionalMod(ctx)
        addWeaponMasteryUI(ctx);
        patchWeaponTypeLogic(ctx);

        addCombatSkillXP(ctx);
        patchSkillNotif(ctx);
        patchAccuracyRating(ctx);
        patchDodgeChance(ctx);
        addPlayerBarrier(ctx);
        addParry(ctx);
}
export function patchSkillsAfterDataReg(ctx) {
        addWeaponType(ctx);


}
