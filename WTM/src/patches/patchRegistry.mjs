const { loadModule } = mod.getContext(import.meta);


const { addSpecialAttack } = await loadModule('src/patches/patches/addSpecialAttack.mjs');
const { increaseRuneReduction } = await loadModule("src/patches/patches/increaseRuneReduction.mjs");

export const EffectRegistry = {
addSpecialAttack,
increaseRuneReduction
};
