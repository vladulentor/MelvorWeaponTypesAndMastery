const noXP = { name: "No XP", color: "#af0000", width: '0%' };
const stock = { name: "Stock", color: "#2dd432", width: '40%' };
const unusual = { name: "Unusual", color: "#3a9adf", width: '60%' };
const distinct = { name: "Distinct", color: "#d33290", width: '80%' };
const exotic = { name: "Exotic", color: "#ffaf02", width: '90%' };

const { loadModule } = mod.getContext(import.meta);

const { templateRielkLangStringWithNodes, templateRielkLangString, getRielkLangString } = await loadModule('src/language/translationManager.mjs');

const uniqtoclass = [noXP, stock, unusual, distinct, exotic, exotic, exotic, exotic, exotic];


export class weaponMasteryTab {
    constructor() {
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('weaponMasteryTab-template'));
        this.container = getElementFromFragment(this._content, 'outerCont', 'div');
        this.weaponItem = getElementFromFragment(this._content, 'weaponMasteryItem', 'div');
        this.weaponPic = getElementFromFragment(this._content, 'weaponPic', 'img');
        this.weaponName = getElementFromFragment(this._content, 'weaponName', 'div');
        this.weaponRank = getElementFromFragment(this._content, 'weaponRank', 'div');
        this.weaponXPBar = getElementFromFragment(this._content, 'weaponXPBar', 'div');
        this.weaponXPNumber = getElementFromFragment(this._content, 'weaponXPNumber', 'div');
        this.weaponXPFill = getElementFromFragment(this._content, 'weaponXpFill', 'div');
        this.emptyAsset = 'assets/media/bank/weapon_sword.png'
        this.noWeaponText =  "No weapon Equipped"; //getRielkLangString()

    };
    setWeapon(weapon) {
        if (weapon._localID == "Empty_Equipment") { 
            this.weaponPic.src = this.emptyAsset;
            this.weaponName.innerHTML = this.noWeaponText
        }
        else {
            this.weaponPic.src = weapon.media;
            this.weaponName.innerHTML = weapon.name;
        }
        if (weapon.weaponType) {
            this.uniqclass = uniqtoclass[weapon.uniqueness];
            this.weaponRank.innerHTML = this.uniqclass.name;
            this.weaponRank.style.color = this.uniqclass.color;
            this.weaponXPBar.style.width = this.uniqclass.width;
            this.weaponXPFill.style.backgroundColor = this.uniqclass.color;

            showElement(this.weaponXPBar);
            showElement(this.weaponXPNumber);
            showElement(this.weaponXPFill);

        }
        else {
            this.weaponRank.innerHTML = "None";
            this.weaponRank.style.color = "#FFFFFF";
            hideElement(this.weaponXPBar);
            hideElement(this.weaponXPNumber);
            hideElement(this.weaponXPFill);


        }
        this.setXP(weapon);
    };
    setXP(weapon) {
        //if (!weapon.masteryMaxed) this.weaponXPNumber.innerText = `${weapon._weaponXP}/${weapon.weaponXPCap}`

        this.weaponXPFill.style.width = weapon.weaponXPPercentCapped + "%"
    }

}