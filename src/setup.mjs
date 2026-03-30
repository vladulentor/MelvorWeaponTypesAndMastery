const { loadModule, loadTemplates, loadStylesheet } = mod.getContext(import.meta);

const { patchTranslations } = await loadModule('src/language/translationManager.mjs');

const { patchSkillsBeforeDataReg, patchSkillsAfterDataReg } = await loadModule('src/patches/skillPatchesCaller.mjs');
const { patchMods } = await loadModule('src/patches/modPatches/modPatchesCaller.mjs');



export async function setup(ctx) {
    setup = new Setup(ctx);
    await setup.loadInterfaceElements();

    await setup.applyPatches();
    await setup.loadData();
    await setup.applyOtherPatches();
    await setup.modCompatibility(ctx);
    await setup.lastChanges(ctx);
}


class Setup {
    constructor(ctx) {
        this.ctx = ctx;
        this.modList = [];
    }

    async loadInterfaceElements() {
        await loadStylesheet('src/interface/WTM-styles.css');
        await loadTemplates('src/interface/templates/WTM.html');
        await loadModule('src/interface/elements/WTMLangStringElement.mjs');
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
        await this.ctx.gameData.addPackage('src/data/data.json');

    }
    async modCompatibility(ctx) {
        this.ctx.onModsLoaded(() => {
            this.modList = mod.manager.getLoadedModList();
            patchMods(ctx, this.modList);
        });

    }
    async lastChanges(ctx) {

    }
}
