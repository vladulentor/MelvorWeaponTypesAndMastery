

const { loadModule } = mod.getContext(import.meta);

const { PlayerSpellShield } = await loadModule('src/patches/patches/addPlayerBarrier.mjs');

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
    game.combat.renderQueue.mastery = true;

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
        leftover += toadd - Math.trunc(toadd); //even though enemies all give 4.6 xp on death the xp increase mods can changed so we can't use a consistent value here  
        while (leftover >= 1) { toadd += 1; leftover -= 1; }
        giveWeaponMasteryXP(this.player.equippedWeapon, toadd);
    });
    patch(Game, "onLoad").after(function (_) {


    })

    patch(BaseManager, "computeAllStats").before(function (_) { // Again not the best place to put it, but it should work, I forgot why this isn't going through our weaponMod like things, it is what it is I guess.
        const pl = game.combat.player;

        const newWeapon = pl.equipment.getItemInSlot("melvorD:Weapon");
        const newType = newWeapon.weaponType;

        // we should probably have used an event here
        // well it's written down at works already so
        if (combatMenus.weaponMastery) combatMenus.weaponMastery.highlightButton(newType);
        if (pl.equippedWeaponType && pl.equippedWeaponType !== newType) {

            leftover = 0;
            pl.equippedWeaponType.unsetActiveWeapon();
            if (pl.equippedWeaponType.isPerWepMod)
                pl.equippedWeaponType.toggleMasteredWeaponStats(0);

        }
        // special code for special stats of gloves because I am such a special boy and make so much special code
        if (pl.equippedWeapon !== newWeapon) {
            pl.equippedWeapon = newWeapon;
        }

        pl.equippedWeaponType = newType;
        if (newType) {
            newType.ToggleActiveWeapon(newWeapon);
            if (newType.isPerWepMod) {
                newType.toggleMasteredWeaponStats(newWeapon.masteryMaxed);
            }
        }
    });

    //Super waepon shit
    patch(Equipment, "addEquipmentStats").after(function (ret, stats) {
        if (game.combat.player.equippedWeapon?.SpecWeaponStats)
            stats.addStats(game.combat.player.equippedWeapon.SpecWeaponStats);
    });
    patch(Player, "addEquippedItemModifiers").after(function () {
        if (this.equippedWeapon?.SpecWeaponMods?.modifiers)
            this.modifiers.addModifiers(this.equippedWeapon, this.equippedWeapon?.SpecWeaponMods.modifiers);
    });
    patch(Enemy, "addPlayerEquipmentModifiers").after(function () {
        if (this.manager.player.equippedWeapon?.SpecWeaponMods?.enemyModifiers)
            this.modifiers.addModifiers(this.manager.player.equippedWeapon, this.manager.player.equippedWeapon?.SpecWeaponMods.enemyModifiers);

    });
     patch(Player, "mergeInheritedEffectApplicators").after(function () {
        if (this.equippedWeapon?.SpecWeaponMods?.combatEffects)
            this.mergeEffectApplicators( this.equippedWeapon?.SpecWeaponMods.combatEffects);
    });

    /*patch(Player, "updateForEquipmentChange").after(function (_) {
        this.spellShield.changeShield(game.combat.player.equipment.getItemInSlot("melvorD:Shield"), game.modifiers.getValue("WTM:addSpellBarrier", ModifierQuery.EMPTY))
    });*/

    /*patch(Player, "computeEquipmentStats").before(function () {

    })

    */
}

