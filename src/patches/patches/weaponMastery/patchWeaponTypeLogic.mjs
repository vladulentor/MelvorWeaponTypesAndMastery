export function patchWeaponTypeLogic({ patch }) {
    patch(Player, "rewardForDamage").after(function (_, damage) {
        const weap = this.equipment.getItemInSlot("melvorD:Weapon");
        const type = weap.weaponType;

        if (type?.active && !type.masteredWeapons.get(weap.id)) {
            type.checkXP();
            this.game.combat.notifications.add({
                type: 'SkillXP',
                args: [weap.returnFakeSkillObj, weap.weaponXPperSwing]
            });
            game.bank.renderQueue.mastery = true;
            if (type.perWepMod && weap.masteryMaxed != weap.isMaxMastery)
                type.addweaponmastery(weap);
        }
    });
    patch(CombatManager, "rewardForEnemyDeath").after(function () {
        const weap = this.player.equipment.getItemInSlot("melvorD:Weapon");
        const type = weap.weaponType;
        if (type?.active && !type.masteredWeapons.get(weap.id)) {
            type.checkXP();
            this.game.combat.notifications.add({
                type: 'SkillXP',
                args: [weap.returnFakeSkillObj, weap.weaponXPperKill]
            });
            game.bank.renderQueue.mastery = true;
            if (type.perWepMod && weap.masteryMaxed != weap.isMaxMastery)
                type.addweaponmastery(weap);
        }
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

