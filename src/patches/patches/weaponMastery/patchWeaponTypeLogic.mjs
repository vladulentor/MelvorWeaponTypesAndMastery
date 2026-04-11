function giveWeaponMasteryXP(weap, amount) {
    if (!weap) {
        console.log("WHAT THE FUCK DID YOU DO")
        return;
    }
    const type = weap.weaponType;

    if (!type?.active || type.masteredWeapons.get(weap.id)) return;

    type.checkXP();

    game.combat.notifications.add({
        type: 'SkillXP',
        args: [weap.returnFakeSkillObj, amount]
    });

    combatMenus.weaponMastery.setXP(weap);
    combatSkillProgressTable.weaponTypesTable.updateXP(game, weap.weaponType);

    game.bank.renderQueue.mastery = true;

    if (type.perWepMod && weap.masteryMaxed != weap.isMaxMastery) {
        type.addweaponmastery(weap);
        combatSkillProgressTable.weaponTypesTable.updateLevel(game, weap.weaponType);

    }
}
let leftover = 0;
export function patchWeaponTypeLogic({ patch }) {
    patch(Player, "rewardForDamage").after(function (_, damage) {
        let toadd = this.equippedWeapon.weaponXPperSwing
        leftover += toadd - Math.trunc(toadd);
        while (leftover >= 1) { toadd += 1; leftover -= 1; }
        giveWeaponMasteryXP(this.equippedWeapon, toadd);
    });
    patch(CombatManager, "rewardForEnemyDeath").after(function () {
        let toadd = this.player.equippedWeapon.weaponXPperKill
        leftover += toadd - Math.trunc(toadd); //even though enemies all give 4.6 xp on death the xp increase mods can change that so we can't use a consistent value here  
        while (leftover >= 1) { toadd += 1; leftover -= 1; }
        giveWeaponMasteryXP(this.player.equippedWeapon, toadd);
    });
    patch(Game, "onLoad").after(function (_) {
        this.combat.player.equippedWeapon = this.combat.player.equipment.getItemInSlot("melvorD:Weapon")
        this.combat.player.equippedWeaponType = this.combat.player.equippedWeapon.weaponType ?? 0;
        for (const m of game.weaponMasteries.allObjects)
            m.onLoad()
    })
    patch(Player, "updateForEquipmentChange").before(function (_) {
        const newWeapon = this.equipment.getItemInSlot("melvorD:Weapon");
        const newType = newWeapon.weaponType;
        if (this.equippedWeaponType && this.equippedWeaponType !== newType) {
            leftover = 0;
            this.equippedWeaponType.unsetActiveWeapon();
            if (this.equippedWeaponType.isPerWepMod)
                this.equippedWeaponType.toggleMasteredWeaponStats(0);

        }
        if (this.equippedWeapon !== newWeapon) {
            this.equippedWeapon = newWeapon;
        }

        this.equippedWeaponType = newType;
        if (newType) {
            newType.ToggleActiveWeapon(newWeapon);
            if (newType.isPerWepMod) {
                newType.toggleMasteredWeaponStats(newWeapon.masteryMaxed);
            }
        }
    });
    patch(Player, "updateForEquipmentChange").after(function (_) {

    });
}

