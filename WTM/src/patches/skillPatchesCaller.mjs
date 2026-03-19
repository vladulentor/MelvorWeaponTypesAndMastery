const { loadModule } = mod.getContext(import.meta);


const { patchConditionalMod } = await loadModule('src/patches/patchConditionalMod.mjs');


const { addWeaponType } = await loadModule('src/patches/skillPatches/combat/weaponMastery/addWeaponType.mjs');
const { addWeaponMasteryUI } = await loadModule('src/patches/skillPatches/combat/weaponMastery/weaponMasteryUI.mjs');

const { patchWeaponTypeLogic } = await loadModule('src/patches/skillPatches/combat/weaponMastery/patchWeaponTypeLogic.mjs');







export function patchSkillsBeforeDataReg(ctx) {
        patchConditionalMod(ctx)
        addWeaponMasteryUI();
        patchWeaponTypeLogic(ctx);
}
export function patchSkillsAfterDataReg(ctx) {
        addWeaponType(ctx);


}
