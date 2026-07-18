const { loadModule } = mod.getContext(import.meta);

const { getRielkLangString, templateRielkLangString } = await loadModule('src/language/translationManager.mjs');


const { WeaponMasteryUI } = await loadModule('src/interface/elements/WeaponMastery.mjs');
const { CombatWeaponTypeProgressTableElement } = await loadModule('src/interface/elements/MasteriesXPTab.mjs');
const { WeaponTypesCombatMenu } = await loadModule('src/interface/elements/WeaponTypesCombatMenu.mjs');



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

            if (bankItem.item instanceof EquipmentItem && bankItem.item.weaponType && bankItem.item.weaponType.active) {
                menu.weaponMasteryUI.setWeapon(bankItem.item);
                menu.weaponMasteryUI.show();
            } else {
                menu.weaponMasteryUI.hide();
            }
        };
    });
    ctx.patch(Player, "renderEquipment").after(function (_) {// This is where we make all the menus and stuff. I hope it can hold HP... well
        if (!game.weaponMasteries.allObjects?.length || game.weaponMasteries.allObjects.every(mast => mast.levelCap == 0 )) return;
        if (!combatMenus.weaponMastery) {
            // Top stuff

            combatSkillProgressTable.weaponTypesTable = new CombatWeaponTypeProgressTableElement();
            combatSkillProgressTable.weaponTypesTable.initialize(game);
            combatSkillProgressTable.parentElement.parentElement.parentElement.after(combatSkillProgressTable.weaponTypesTable);


            // Menu
            const coolbanner = document.createElement("img");
            coolbanner.className = "combat-menu-img border-rounded-equip p-1 m-1 pointer-enabled";
            coolbanner.style.marginLeft = "-1px"; // look man idk why but i need to scoot it over like one pixel to the right to make it look right
            coolbanner.id = "combat-menu-item-8";
            coolbanner.src = ctx.getResourceUrl('assets/banner.png');
            coolbanner.onclick = () => changeCombatMenu(8);
            combatMenus.menuTabs.push(coolbanner)
            combatMenus.menuTabs[0].parentElement.insertBefore(coolbanner, combatMenus.menuTabs[1]);
            tippy(coolbanner, {
                content: "View Weapon Types",
                placement: 'bottom',
                allowHTML: false,
                interactive: false,
                animation: false,

                popperOptions: {
                    strategy: 'fixed',
                    modifiers: [
                        { name: 'flip', options: { fallbackPlacements: ['top'] } },
                        { name: 'preventOverflow', options: { altAxis: true, tether: false } },
                    ],
                },
            });
            const combatTab = new WeaponTypesCombatMenu();

            combatMenus.menuPanels[8] = combatTab.container;
            combatMenus.menuPanels[0].parentElement.after(combatTab.container);
            combatMenus.weaponMastery = combatTab;

            combatTab.init(game);
            // We want our menu to be drilled up when the player sees it
            /*  const originalChangeCombatMenu = changeCombatMenu;

            changeCombatMenu = function (id) {
                if (selectedCombatMenu === 8) {
                  if (combatTab.lookingAtType) {
                        combatTab.drillUp();
                    }
                }
                originalChangeCombatMenu(id);
            }; */
            // I don't know if it's more QoL to have this or not. Normally you'd think so but... in reality it seems kind of annoying. Idk 
        }
        let weapon = this.equippedWeapon ?? this.equipment.getItemInSlot("melvorD:Weapon");
        if (weapon) { combatMenus.weaponMastery.setWeapon(weapon) }
        else waitForWeapon(this);
    }); // Lazy poll because FUCK this game man I'm not digging through the initialization render pipeline to find the right place to put this FUCK you!!!
    const waitForWeapon = (player) => {
        const weapon = player.equippedWeapon;

        if (weapon) {
            combatMenus.weaponMastery.setWeapon(weapon);
            return;
        }

        setTimeout(() => waitForWeapon(player), 100);
    };

    ctx.patch(Bank, 'render').after(function (_) {
        if (this.renderQueue.mastery) {
            const masteryMenu = bankSideBarMenu.selectedMenu.weaponMasteryUI;
            if (masteryMenu && !masteryMenu.container.classList.contains("d-none") && masteryMenu.type === game.combat.player.equippedWeaponType)
                bankSideBarMenu.selectedMenu.weaponMasteryUI.render();
            this.renderQueue.mastery = false;
        }
    })
    ctx.patch(CombatManager, 'render').after(function (_) {
        if (this.renderQueue.mastery) {
            const weaponTab = combatMenus.weaponMastery;
            if (weaponTab && !weaponTab.container.classList.contains("d-none") && weaponTab.lookingAtType && weaponTab.typeMenu.type === game.combat.player.equippedWeaponType)
                weaponTab.renderTypeXP();
            this.renderQueue.mastery = false;
        }
    })
}
