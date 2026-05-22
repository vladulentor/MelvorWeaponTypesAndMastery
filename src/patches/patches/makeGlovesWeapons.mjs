// GLOVE LIST

const gloves = [
    { item: "melvorD:Bronze_Gloves", attackType:"melee", wepStats: 
        [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 1003 }, { key: 'meleeDefenceBonus', value: 15 }, { key: 'rangedDefenceBonus', value: 10 }, { key: 'magicDefenceBonus', value: 20 }] },
    { item: "melvorD:Iron_Gloves", attackType:"melee", wepStats: 
        [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeDefenceBonus', value: 15 }, { key: 'rangedDefenceBonus', value: 15 }, { key: 'magicDefenceBonus', value: 15 }] }
    //and so on and so forth
    //Right now the glove is set as a material to HandToHand in the data.json, so all the metal gloves will be added
    //To add any other gloves add it there
    //I guess we haven't decided how many or which gloves to make into equippable weapons, but there's 103 gloves in game which would be 1/3rd of all ingame weapons so we can't do all of them
    //It's your choice which gloves the handtohand type gets, melee is obvious but I'd also think if we used vambraces (as melee weapons) it would fit thematically
    //Also put in some misc skilling gloves and some magic gloves to use to fill out special and artefact respectively, thanks
    // (I could have used a script to approximate stats for all of them but you said this is your favorite part so have fun)
]




// CODE
export function makeGlovesWeapons() {
    const reqD = game.items.getObjectByID("melvorD:Iron_Dagger").equipRequirements[0];
    const wepSlot = game.equipmentSlots.getObjectByID("melvorD:Weapon");
    gloves.forEach(upgradeset => {
        const item = game.items.getObjectByID(upgradeset.item);
        if (item == undefined) return;
        item.attackType = upgradeset.attackType;
        item.damageType = game.normalDamage;
        item.equipRequirements.push(reqD);
        item.validSlots.unshift(wepSlot);
        item.equipRequirements.level = 5;
        item.SpecWeaponStats = [];
        upgradeset.wepStats.forEach(wepStat => {
            item.SpecWeaponStats.push(wepStat)
            if (wepStat.key == 'attackSpeed')
                item.attackSpeed = wepStat.value / 1000;
        })
    })

}

export function birthOfMonk2(ctx) { // Wanna see a fucking botch
    const gloveSlot = game.equipmentSlots.getObjectByID("melvorD:Gloves")
    gloves.forEach(upgradeset => {
        const item = game.items.getObjectByID(upgradeset.item);
        if (item == undefined) return;
        item.occupiesSlots.push(gloveSlot);

    })
    ctx.patch(EquipmentItem, 'fitsInSlot').after(function (ret, slotID) {
        if (!ret && slotID == "melvorD:Weapon" && gloves.some(glove => glove.item == this.id))
            return true;
        //else return normally
    })
    // have to change the behaviour when an item occupies the same slot it's being equipped to, sorry
    ctx.patch(Equipment, "equipItem").replace(function (_, itemToEquip, slot, quantity) {
        const slotsToUnequip = this.getSlotsToUnequip(itemToEquip, slot);
        // Set the slots to unequip to empty
        slotsToUnequip.forEach((unequipType) => {
            this.unequipItem(unequipType);
        });
        this.itemSlotMap.set(itemToEquip, slot);
        if (itemToEquip.consumesChargesOn !== undefined)
            this.itemChargeUsers.add(this.equippedItems[slot.id]);
        // Set the new slots to be occupied
        this.equippedItems[slot.id].setEquipped(itemToEquip, quantity, itemToEquip.occupiesSlots);
        itemToEquip.occupiesSlots.forEach((occupied) => { if (occupied !== slot) this.equippedItems[occupied.id].setOccupied(itemToEquip, slot) });

    })
    /* ctx.patch(EquipmentItem, 'occupiesSlot').after(function (ret, slotID) {
         if (!ret && slotID == "melvorD:Gloves" && gloves.some(glove => glove.item == this.id))
             return true;
     });*/
}