export function birthOfMonk({ patch }) {
    patch(Player, "trackWeaponStat").replace(function (_, stat, amount = 1) {
        const weapon = this.equipment.getItemInSlot("melvorD:Weapon" /* EquipmentSlotIDs.Weapon */);
        const quiver = this.equipment.getItemInSlot("melvorD:Quiver" /* EquipmentSlotIDs.Quiver */);
        this.addItemStat(weapon, stat, amount);

        if (this.attackType === 'ranged' && quiver !== this.game.emptyEquipmentItem && quiver !== weapon) {
            this.addItemStat(quiver, stat, amount);
        }


    })
    patch(Player, 'computeAttackType').replace(function (_) {
        const item = this.equipment.getItemInSlot("melvorD:Weapon" /* EquipmentSlotIDs.Weapon */);
        if (item instanceof WeaponItem || item instanceof EquipmentItem ) {
            this.attackType = item.attackType;
        }
        else {
            throw new Error(`Equipped weapon ${item.name} is not a weapon or equipment!`);
        }
        this.renderQueue.combatTriangle = true;

    })
    patch(Player, 'getEquipmentDamageType').replace(function (_) {
        const item = this.equipment.getItemInSlot("melvorD:Weapon" /* EquipmentSlotIDs.Weapon */);
        if (item instanceof WeaponItem) {
            return item.damageType;
        }
        else if (item instanceof EquipmentItem) {
            return this.game.normalDamage;

        }
        else {
            throw new Error(`Equipped weapon ${item.name} is not a weapon or equipment!`);
        }
    })
}
