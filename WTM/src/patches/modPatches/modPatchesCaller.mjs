const { loadModule } = mod.getContext(import.meta);
const { skillBoostsCompatibility } = await loadModule('src/patches/modPatches/skillBoosts.mjs');
const { tinyIconsCompatibility } = await loadModule('src/patches/modPatches/tinyIcons.mjs');
const { skillsoundfxCompatibility } = await loadModule('src/patches/modPatches/skillsoundfx.mjs');
const { showItemSourcesAndUsesCompatibility } = await loadModule('src/patches/modPatches/showItemSourcesAndUses.mjs');



export function patchMods(ctx, modList) {
    if (modList.includes('Skill Boosts')) {
        skillBoostsCompatibility(ctx);
    }

    if (modList.includes('[Refurbished] Tiny Icons')) {
        tinyIconsCompatibility(ctx);
    }
    if (modList.includes('"The future is now..." Text remover')) {
    }

    if (modList.includes('Mastery Pool Can Overflow')) {
    }
    if (modList.includes('Ancient Relics Doubling and Preservation Enabled')) {
    }

    if (modList.includes('Ancient Relic Mode 1.3')) {
    }

}

// 90% of this is just a conosle message I want to send. Because I WANTED TO, god damn it!!!