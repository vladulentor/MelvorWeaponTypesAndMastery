const { loadModule, loadTemplates, loadStylesheet } = mod.getContext(import.meta);

const { patchTranslations } = await loadModule('src/language/translationManager.mjs');

const { patchSkillsBeforeDataReg, patchSkillsAfterDataReg } = await loadModule('src/patches/skillPatchesCaller.mjs');
const { patchMods } = await loadModule('src/patches/modPatches/modPatchesCaller.mjs');
const { getRielkLangString } = await loadModule('src/language/translationManager.mjs');


const { SettingsManager } = await loadModule('src/patches/patches/weaponMastery/weaponMasterySettings.mjs');
const { addWeaponType } = await loadModule('src/patches/patches/weaponMastery/addWeaponType.mjs');
const { firstTimePopup } = await loadModule('src/patches/patches/weaponMastery/firstTimePopup.mjs');



export async function setup(ctx) {
    setup = new Setup(ctx);
    await setup.loadInterfaceElements();

    await setup.applyPatches();
    await setup.loadData();
    await setup.applyOtherPatches();
    await setup.modCompatibility(ctx);
    await setup.lastChanges(ctx);
    let typeMap = new Set();
    ctx.onModsLoaded(async (ctx) => {
        typeMap = await setup.initSettings(ctx);
    })
    ctx.onCharacterLoaded(async (ctx) => {
        addWeaponType(ctx.settings.section('──⚔──'), typeMap);
        game.combat.player.equippedWeapon = game.combat.player.equipment.getItemInSlot("melvorD:Weapon"); // I don't think it's pretty either
        game.combat.player.equippedWeaponType = game.combat.player.equippedWeapon.weaponType ?? 0;
        for (const m of game.weaponMasteries.allObjects)
            m.onLoad()
        if (combatMenus.weaponMastery && game.combat.player.equippedWeaponType) {
            combatMenus.weaponMastery.setWeapon(game.combat.player.equippedWeapon);
            combatMenus.weaponMastery.highlightButton(game.combat.player.equippedWeaponType);
            game.combat.computeAllStats();
        }

    })
    ctx.onInterfaceReady(async (ctx) => {
        const popupS = ctx.characterStorage.getItem('popupSeen');
        if (!popupS && 0) // REMOVE THIS WHEN PUBLISHING DO NOT FORGET
            firstTimePopup(ctx);
        ctx.characterStorage.setItem('popupSeen', true);
    })
}


class Setup {
    constructor(ctx) {
        this.ctx = ctx;
        this.modList = [];
    }

    async loadInterfaceElements() {
        await loadStylesheet('src/interface/WTM-styles.css');
        await loadModule('src/interface/elements/WTMLangStringElement.mjs');

        await loadTemplates('src/interface/templates/WTM.html');
        await loadModule('src/interface/elements/WeaponMastery.mjs');

    }

    async applyPatches() {
        patchTranslations(this.ctx);
        patchSkillsBeforeDataReg(this.ctx);
    }
    async applyOtherPatches() {
        patchSkillsAfterDataReg(this.ctx);
    }
    async loadData() {
        await this.ctx.gameData.addPackage('src/data/data_preentry.json');
        await this.ctx.gameData.addPackage('src/data/data.json');
        if(cloudManager.hasAoDEntitlementAndIsEnabled)
        {await this.ctx.gameData.addPackage('src/data/data_AoD.json')}
    }
    async modCompatibility(ctx) {
        this.ctx.onModsLoaded(() => {
            this.modList = mod.manager.getLoadedModList();
            patchMods(ctx, this.modList);
        });

    }
    async initSettings(ctx) {
        return SettingsManager.init(ctx);
    }
    async lastChanges(ctx) {

    }
}
