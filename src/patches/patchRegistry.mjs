const { loadModule } = mod.getContext(import.meta);


const { addSpecialAttack } = await loadModule('src/patches/patches/addSpecialAttack.mjs');
const { increaseRuneReduction } = await loadModule("src/patches/patches/increaseRuneReduction.mjs");
const { increaseSpecialAttackChance } = await loadModule("src/patches/patches/addSpecialAttack.mjs");

const { makeWeaponsOffhand } = await loadModule("src/patches/patches/makeWeaponsOffhand.mjs");
const { makeGlovesWeapons } = await loadModule("src/patches/patches/makeGlovesWeapons.mjs");
const { modifySpecialAttack } = await loadModule("src/patches/patches/modifySpecialAttack.mjs");



export const EffectRegistry = {
addSpecialAttack,
increaseSpecialAttackChance,
increaseRuneReduction,
makeWeaponsOffhand,
makeGlovesWeapons,
modifySpecialAttack
};
