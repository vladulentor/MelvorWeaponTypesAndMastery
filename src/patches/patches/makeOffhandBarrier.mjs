// OFFHAND LIST

const offhands = [
    { item: "melvorD:Bronze_Shield", runeCost:15, barrierHP:{type:"fixed", value:10}},
    { item: "melvorD:Bronze_Shield_T_S", runeCost:15, barrierHP:{type:"fixed", value:10} }


]




// CODE
export function makeGlovesWeapons() {
    offhands.forEach(upgradeset => {
        const item = game.items.getObjectByID(upgradeset.item);
        if (item == undefined) return;
        item.runeCost = upgradeset.runeCost;
        item.barrierHP = upgradeset.barrierHP;
        if(upgradeset.barrierOnEffect)
            item.barrierOnEffect = new StatObject();
    })

}