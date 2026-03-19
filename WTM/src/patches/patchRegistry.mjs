const { loadModule } = mod.getContext(import.meta);


const { addSpecialAttack } = await loadModule('src/patches/skillPatches/combat/addSpecialAttack.mjs');
const { increaseRuneReduction } = await loadModule("src/patches/skillPatches/combat/increaseRuneReduction.mjs");

export const EffectRegistry = {
addSpecialAttack,
increaseRuneReduction
};
