const { loadModule } = mod.getContext(import.meta);

const { getRielkLangString, templateRielkLangString } = await loadModule('src/language/translationManager.mjs');


const { WeaponMasteryUI } = await loadModule('src/interface/elements/WeaponMastery.mjs');
const { weaponMasteryTab } = await loadModule('src/interface/elements/WeaponMasteryTab.mjs');
const { CombatWeaponTypeProgressTableElement } = await loadModule('src/interface/elements/MasteriesXPTab.mjs');



export function addWeaponMasteryUI(ctx) {
    ctx.onInterfaceReady(async (ctx) => {
        const sidebar = bankSideBarMenu; // or however it’s added
        const menu = sidebar.selectedMenu;

        if (!menu.weaponMasteryUI) {
            menu.weaponMasteryUI = new WeaponMasteryUI();
            menu.equipItemContainer.after(menu.weaponMasteryUI.container);
        }

        const originalSetItem = menu.setItem.bind(menu);
        menu.setItem = (bankItem, bank) => {
            originalSetItem(bankItem, bank);

            if (bankItem.item instanceof WeaponItem && bankItem.item.weaponType && bankItem.item.weaponType.active) {
                menu.weaponMasteryUI.setWeapon(bankItem.item);
                menu.weaponMasteryUI.show();
            } else {
                menu.weaponMasteryUI.hide();
            }
        };
    });
    ctx.patch(Player, "renderEquipment").after(function (_) {
if (!game.weaponMasteries.allObjects?.length || game.weaponMasteries.allObjects[0].levelCap == 0) return;
        if (!combatMenus.weaponMastery) {
            combatMenus.weaponMastery = new weaponMasteryTab();
            combatMenus.equipment[1].parentElement.parentElement.parentElement.after(combatMenus.weaponMastery.container);
            combatSkillProgressTable.weaponTypesTable = new CombatWeaponTypeProgressTableElement();
            combatSkillProgressTable.weaponTypesTable.initialize(game);
            combatSkillProgressTable.parentElement.parentElement.parentElement.after(combatSkillProgressTable.weaponTypesTable);
            
        }
        let weapon = this.equippedWeapon;
        if (!weapon) weapon = this.equipment.getItemInSlot("melvorD:Weapon");
        if (weapon) { combatMenus.weaponMastery.setWeapon(weapon) }
        else waitForWeapon(this);
    }); // Lazy poll because FUCK this game man I'm not digging through the initialization render pipeline to find the right place to put this FUCK you!!!
    const waitForWeapon = (player) => {
        const weapon = player.equippedWeapon;

        if (weapon) {
            combatMenus.weaponMastery.setWeapon(weapon);
            return;
        }

        setTimeout(waitForWeapon(player), 100); 
    };

    ctx.patch(Bank, 'render').after(function (_) {
        if (this.renderQueue.mastery) {
            const masteryMenu = bankSideBarMenu.selectedMenu.weaponMasteryUI;
            if (masteryMenu && !masteryMenu.container.classList.contains("d-none") && masteryMenu.type === game.combat.player.equippedWeaponType)
                bankSideBarMenu.selectedMenu.weaponMasteryUI.render();
            this.renderQueue.mastery = false;
        }
    })


}
