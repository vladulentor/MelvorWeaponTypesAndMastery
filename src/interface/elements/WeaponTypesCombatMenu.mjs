class WeaponTypeCombatMenuType{
    constructor(){
        
    }
}

class WeaponTypeCombatMenuCategory{
    constructor(){

    }
}

export class WeaponTypesCombatMenu {
    constructor() {
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('weapon-type-combat-menu'));
        this.container = getElementFromFragment(this._content,'weaponTypeCombatMenuContainer','div');
        this.content = getElementFromFragment(this._content,'weaponIDContent','div');
        this.selectedType = null;
        this.categories;
    }
}