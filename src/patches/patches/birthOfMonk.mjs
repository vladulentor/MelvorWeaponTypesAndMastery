export function birthOfMonk({ patch }) {
    patch(Player, "trackWeaponStat").replace(function (_, stat, amount = 1) {
        const weapon = this.equipment.getItemInSlot("melvorD:Weapon" /* EquipmentSlotIDs.Weapon */);
        const quiver = this.equipment.getItemInSlot("melvorD:Quiver" /* EquipmentSlotIDs.Quiver */);
            this.addItemStat(weapon, stat, amount);
        
        if (this.attackType === 'ranged' && quiver !== this.game.emptyEquipmentItem && quiver !== weapon) {
            this.addItemStat(quiver, stat, amount);
        }


    })

}
