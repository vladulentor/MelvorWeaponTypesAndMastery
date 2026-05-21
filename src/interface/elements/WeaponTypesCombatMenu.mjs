// I was planning to do a OOP approach with making weapon overtype categories and weapon button classes, but the game doesn't, so I won't.
// Tell that guy above me he's a fucking moron right now to his face please ^ 

const ctx = mod.getContext(import.meta);

const { templateRielkLangStringWithNodes, templateRielkLangString, getRielkLangString } = await ctx.loadModule('src/language/translationManager.mjs');

// we should put these in a data type so that it's all connected by data and nice but... nobody is adding more weapon types, I'd like to see them try.
const weaponOverTypes = [
    { id: "melee", name: getLangString("ATTACK_TYPE_melee"), media: ctx.getResourceUrl('assets/melee.svg') },
    { id: "ranged", name: getLangString("ATTACK_TYPE_ranged"), media: ctx.getResourceUrl('assets/ranged.svg') },
    { id: "magic", name: getLangString("ATTACK_TYPE_magic"), media: ctx.getResourceUrl('assets/magic.svg') }
];

export class typeButtonElement extends HTMLElement {
    static borderClasses = ['border-success', 'border-2x', 'spell-selected'];
    static goldenClasses = ['border-2x', 'gold-selected'];
    static goldFilter = 'invert(79%) sepia(74%) saturate(2255%) hue-rotate(3deg) brightness(105%) contrast(105%)';
    constructor() {
        super();
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('weaponTypeButton'));
        this.link = getElementFromFragment(this._content, 'link', 'a');
        this.typeImage = getElementFromFragment(this._content, 'type-image', 'img');
        this.isGold = 0;
    }
    connectedCallback() {
        this.appendChild(this._content);
        this.tooltip = tippy(this.link, {
            content: '',
            placement: 'bottom',
            allowHTML: true,
            interactive: false,
            animation: false,
        });
    }
    setTypeButton(type) {
        this.typeImage.src = type.mediaCol;
        this.tooltip.setContent(type.name);
        this.link.onclick = () => {
            const weaponSelectEvent = new CustomEvent('wtm-type-selected', { // we use an event because I'm not fucking drilling down the arrowfunc from the big menu
                bubbles: true,
                composed: true,
                detail: { type }
            }); this.dispatchEvent(weaponSelectEvent);
        };
    }
    highlight() {
        this.link.classList.add(...(this.isGold ? typeButtonElement.goldenClasses : typeButtonElement.borderClasses));
        this.highlighted = 1;
    }
    unhighlight() {
        this.link.classList.remove(...(this.isGold ? typeButtonElement.goldenClasses : typeButtonElement.borderClasses));
        this.highlighted = 0;
    } // slight chance of fucking up if they are highlighting an element when it lvels up, I don't care
    setGoldButton() {
        if (this.isGold) return;
        let togh = 0;
        if (this.highlighted) { togh = 1; this.unhighlight(); }
        this.isGold = 1;
        this.link.classList.add('border-gold');
        // this.typeImage.style.setProperty('filter', typeButtonElement.goldFilter);
        if (togh)
            this.highlight();
    }
    unsetGoldButton() {
        if (!this.isGold) return;
        let togh = 0;
        if (this.highlighted) { togh = 1; this.unhighlight(); }
        this.isGold = 0;
        this.link.classList.remove('border-gold');
        // this.typeImage.style.removeProperty('filter');
        if (togh)
            this.highlight();

    }
}
window.customElements.define('type-button', typeButtonElement);


class WeaponTypeMenuElement extends HTMLElement {
    constructor(container, oType) {
        super();
        this._content = getTemplateNode('WeaponTypesMenuElement');
        this.types = [];
        this.buttons = []
        this.typeMap = new Map();
        this.weaponContainer = getElementFromFragment(this._content, "weaponButtonsContainer", 'div');
        this.noticeContainer = getElementFromFragment(this._content, 'wtm-notice-container', 'div');
        this.noticeMessage = getElementFromFragment(this._content, 'wtm-notice-message', 'span');
    }
    appendWepMenu(wepElem) {
        this.weaponContainer.append(wepElem);
    }
    init(oType) {
        this.append(this._content);
        this.oType = oType
        this.types = game.weaponMasteries.allObjects.filter(mast => mast.Wtype === this.oType.id); // nice capitalization jackass
        this.setWeaponTypes();

    }

    setWeaponTypes() {
        while (this.buttons.length < this.types.length) {
            const button = createElement('type-button', {
                className: 'col-4 col-md-3 wtm-type-button'
            });

            this.appendWepMenu(button);

            this.buttons.push(button);
        }
        this.typeMap.clear();

        this.types.forEach((typeData, i) => {
            const button = this.buttons[i];
            button.setTypeButton(typeData);
            this.typeMap.set(typeData, button);
            showElement(button);

        });


    }
    unhighlightTypeButton() {
        if (this.highlightedButton) {
            this.highlightedButton.unhighlight();
        }
    }
    highlightTypeButton(type) {
        this.unhighlightTypeButton();
        if (this.typeMap.has(type)) {
            this.highlightedButton = this.typeMap.get(type)
            this.highlightedButton.highlight();
        }
    }
    upgradeType(type) {
        this.typeMap.get(type).setGoldButton();
    }
    unUpgradeTypes() {
        this.buttons.forEach(button => button.unsetGoldButton());
    }
}


const noXP = { name: "No XP", color: "#af0000", width: '0%' };
const stock = { name: "Stock", color: "#2dd432", width: '35%' };
const unusual = { name: "Unusual", color: "#3a9adf", width: '55%' };
const distinct = { name: "Distinct", color: "#d33290", width: '75%' };
const exotic = { name: "Exotic", color: "#ffaf02", width: '85%' };

const uniqtoclass = [noXP, stock, unusual, distinct, exotic, exotic, exotic, exotic, exotic];

window.customElements.define('weapon-types-menu', WeaponTypeMenuElement);

export class WeaponTypesCombatMenu {
    // This element grew like a tumor
    constructor() {
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('weapon-type-combat-menu'));
        this.container = getElementFromFragment(this._content, 'weaponTypeCombatMenuContainer', 'div');
        this.typeViewerCont = getElementFromFragment(this._content, 'typeViewerCont', 'div');
        this.menuViewerCont = getElementFromFragment(this._content, 'menuViewerCont', 'div');
        this.lookingAtType = 0;
        // WEAPON PARTS
        this.weaponItem = getElementFromFragment(this._content, 'weaponMasteryItem', 'div');
        this.weaponTypeMPic = getElementFromFragment(this._content, 'weaponTypeMiniPic', 'img');
        this.weaponTypeMiniTHing = getElementFromFragment(this._content, 'weaponTypeMiniTHing', 'div');
        this.weaponMaxedCheck = getElementFromFragment(this._content, 'weaponMaxedCheck', 'span');

        this.weaponTypeMTex = getElementFromFragment(this._content, 'WeaponTypeMiniText', 'span');
        this.weaponPic = getElementFromFragment(this._content, 'weaponPic', 'img');
        this.weaponName = getElementFromFragment(this._content, 'weaponName', 'div');
        this.weaponRank = getElementFromFragment(this._content, 'weaponRank', 'div');
        this.weaponXPBar = getElementFromFragment(this._content, 'weaponXPBar', 'div');
        this.weaponXPNumber = getElementFromFragment(this._content, 'weaponXPNumber', 'div');
        this.weaponXPFill = getElementFromFragment(this._content, 'weaponXpFill', 'div');
        this.emptyAsset = 'assets/media/bank/weapon_sword.png'
        this.noWeaponText = "No weapon Equipped"; //getRielkLangString()

        // MENU SELECT PARTS
        this.weaponButtonGroup = getElementFromFragment(this._content, 'weaponIDButtonGroup', 'div');
        this.weaponMenuPlace = getElementFromFragment(this._content, 'weaponMenuPlace', 'div');
        this.headerText = getElementFromFragment(this._content, 'wtm-header-text', 'h5');
        this.infoBox = getElementFromFragment(this._content, 'wtm-info-box', 'div');
        //this.infoText = getElementFromFragment(this._content, 'wtm-info-text', 'div');
        this.selectedButton = null;
        this.selectedMenu = null;
        this.selectedOType = null;
        this.tooltips = [];


        // TYPE MENU PARTS
        this.typeMenu = {
            type: { id: "" }, //init that doesn't break
            bgIcon: getElementFromFragment(this._content, 'weaponMasteryBgIcon', 'img'),
            text: getElementFromFragment(this._content, 'weaponMasteryText', 'h5'),
            title: getElementFromFragment(this._content, 'weaponMasteryTitle', 'h4'),
            typeFlvText: getElementFromFragment(this._content, 'weaponFlavorText', 'div'),
            wepModText: getElementFromFragment(this._content, 'weaponModifierValue', 'div'),
            wepModType: getElementFromFragment(this._content, 'weaponModifierTypeText', 'div'),
            wepModPermanent: getRielkLangString('MENU_PERMANENT'),
            wepModEquipped: getRielkLangString('MENU_EQUIPPED'),
            wepModPermanentTool: getRielkLangString('MENU_PERMANENT_TOOLTIP'),
            wepModEquippedTool: getRielkLangString('MENU_EQUIPPED_TOOLTIP'),
            wepModTypeApplic: getRielkLangString('MENU_GLOBAL_APPLIC'),
            wepModGlobApplic: getRielkLangString('MENU_TYPE_APPLIC'),
            stepContainer: getElementFromFragment(this._content, 'weaponMasteryStepsContainer', 'div'),
            spacer: getElementFromFragment(this._content, 'modifierSpacer', 'div'),
            modifierListContainer: getElementFromFragment(this._content, 'weaponMasteryModifiers', 'div'),

            profBar: getElementFromFragment(this._content, 'weaponMasteryBar', 'div'),
            profFill: getElementFromFragment(this._content, 'weaponMasteryProgress', 'div'),
            profOvFill: getElementFromFragment(this._content, 'weaponMasteryOverfill', 'div'),

            labels: [
                getElementFromFragment(this._content, 'label-1', 'span'),
                getElementFromFragment(this._content, 'label-2', 'span'),
                getElementFromFragment(this._content, 'label-3', 'span'),
                getElementFromFragment(this._content, 'label-4', 'span'),
                getElementFromFragment(this._content, 'label-5', 'span'),
            ],
            markers: [
                getElementFromFragment(this._content, 'marker-1', 'div'),
                getElementFromFragment(this._content, 'marker-2', 'div'),
                getElementFromFragment(this._content, 'marker-3', 'div'),
                getElementFromFragment(this._content, 'marker-4', 'div'),
                getElementFromFragment(this._content, 'marker-5', 'div'),
            ],
            steps: [
                getElementFromFragment(this._content, 'modifierStep1', 'div'),
                getElementFromFragment(this._content, 'modifierStep2', 'div'),
                getElementFromFragment(this._content, 'modifierStep3', 'div'),
                getElementFromFragment(this._content, 'modifierStep4', 'div'),
                getElementFromFragment(this._content, 'modifierStep5', 'div'),
            ],
            locks: [
                getElementFromFragment(this._content, 'lock1', 'div'),
                getElementFromFragment(this._content, 'lock2', 'div'),
                getElementFromFragment(this._content, 'lock3', 'div'),
                getElementFromFragment(this._content, 'lock4', 'div'),
                getElementFromFragment(this._content, 'lock5', 'div'),
            ]
        };
        this.settypeBonusTooltip(this.typeMenu.wepModType);
        this.settypeBonusTooltip(this.weaponMaxedCheck);
        this.weaponMaxedCheck._tippy.setContent(`<div class="text-center">${getRielkLangString('MENU_WEP_MAXED')}</div>`);


    }
    // ----------TYPE MENU FUNCTIONS ------------
    settypeBonusTooltip(elem) {
        tippy(elem, {
            content: elem.tooltipContent,
            placement: 'top',
            allowHTML: true,
            interactive: true,
            animation: false,
            appendTo: document.body,
            popperOptions: {
                strategy: 'fixed',
                modifiers: [
                    { name: 'flip', options: { fallbackPlacements: ['top'] } },
                    { name: 'preventOverflow', options: { altAxis: true, tether: false } },
                ],
            },
        });
    };
    setWeaponMasteryTooltip(elem) {
        elem.tippyContent = createElement("div");

        const expl = createElement("div", {
            className: 'text-center text-size-sm mb-1 font-w400'
        });
        expl.innerText = "Weapon Masteries represent your use with a weapon and weapons of that type.";
        elem.tippyContent.appendChild(expl);

        elem.tippyContent.appendChild(createElement('div', { className: 'dropdown-divider' }));

        const hint = createElement("div", {
            className: 'text-center text-size-sm font-w400 text-muted'
        });
        hint.innerText = "Mastery with a weapon is increased primarily by attacking with it, and secondarily by killing enemies.";
        elem.tippyContent.appendChild(hint);
        elem.tippyContent.appendChild(createElement('div', { className: 'dropdown-divider' }));

        const hint2 = createElement("div", {
            className: 'text-center text-size-sm font-w400 text-muted'
        });
        hint2.innerText = "Hover over different elements to learn more about them!";
        elem.tippyContent.appendChild(hint2);

        tippy(elem, {
            content: elem.tippyContent,
            placement: 'top',
            allowHTML: true,
            interactive: true,
            animation: false,
            appendTo: document.body,
            popperOptions: {
                strategy: 'fixed',
                modifiers: [
                    { name: 'flip', options: { fallbackPlacements: ['top'] } },
                    { name: 'preventOverflow', options: { altAxis: true, tether: false } },
                ],
            },
        });

    }


    setType(type) {
        if (this.typeMenu.type == type) return;
        this.typeMenu.text.innerHTML = type.name;
        this.typeMenu.text.classList.remove('construction-victory', 'text-success');
        this.typeMenu.text.classList.toggle(`${type.maxed ? 'construction-victory' : 'text-success'}`, type.activeWeapon);
        this.typeMenu.bgIcon.src = type.media;
        this.typeMenu.type = type;
        const [typeLabel, toolTipText] = type.isPerWepMod // yay for needlessly optimal code
            ? [this.typeMenu.wepModEquipped, this.typeMenu.wepModEquippedTool]
            : [this.typeMenu.wepModPermanent, this.typeMenu.wepModPermanentTool];
        this.typeMenu.wepModType.innerText = typeLabel;
        const typeWM = type.activeWeapon && game.combat.player.equippedWeapon.masteryMaxed

        this.typeMenu.wepModType.classList.toggle("text-success", typeWM);

        this.typeMenu.wepModType._tippy.setContent(`<div class="text-center">${toolTipText}</div>`);
        this.typeMenu.typeFlvText.innerText = type.flavorText || " ";
        this.setMods();
        this.typeMenu.wepModText.querySelectorAll('span').forEach(span => { // Annoying retarded bullshit that I hate
            span.classList.toggle("text-success", typeWM);
            span.classList.toggle("text-danger", !typeWM);
        });

    }
    setWeaponMastery() {
        this.typeMenu.wepModText.querySelectorAll('span').forEach(span => { // Annoying retarded bullshit that I hate
            span.classList.toggle("text-success", typeWM);
            span.classList.toggle("text-danger", !typeWM);
        });
    }
    renderTypeXP() {
        this.setXP();
    }

    setXP(performant = 1) {
        this.typeMenu.profOvFill.style.width = this.typeMenu.type.uncappedxpPercent + "%";
        const percentCapped = this.typeMenu.type.xpPercent;
        this.typeMenu.profFill.style.width = percentCapped + "%";

        this.weaponTypeMiniTHing.style.top = (this.weaponItem.clientWidth < 350) ? "0px" : "12px";

        if (performant && this.typeMenu.type.level !== this.typeMenu.levelCache) return;
        for (let i = 0; i < 5; i++) {
            const fancy = this.typeMenu.type.level > i;
            this.typeMenu.labels[i].classList.toggle("text-combat-smoke", !fancy);
            this.typeMenu.markers[i].classList.toggle("construction-bar", fancy);
            this.typeMenu.labels[i].classList.toggle("construction-victory", fancy);
            this.typeMenu.steps[i].classList.toggle("locked", !fancy);

        }
        this.typeMenu.levelCache = this.typeMenu.type.level;
    }

    generateModifierElements(level) {
        const statObject = level.uiMods;
        const isShiny = !!level.shiny;
        const elements = [];
        const globToltip = this.typeMenu.wepModGlobApplic;
        const typeToltip = this.typeMenu.wepModTypeApplic
        let i = 1;

        // Behold the most overdesign piece of garbage ever to just make some tooltips my god
        // We make a div, and then two wrappers to the right and left, just to put some tooltips on them
        function createModifierRow(desc, isWeaponCondition) {

            let infoTooltipKey = null;
            if (level.tooltips && level.tooltips[i]) {
                infoTooltipKey = level.tooltips[i];
            }
            if (level.overwriteTypeIcons)
                isWeaponCondition = level.overwriteTypeIcons[i - 1];
            const cls = 'modifierHolder fuck-you text-center ' + (isShiny ? 'special' : '');
            const rowWrapper = createElement('div', {
                className: 'w-100 position-relative d-flex justify-content-center align-items-center modifier-row-hover'
            });
            const textSpan = createElement('span', {
                className: `my-1 font-size-sm ${cls}`,
                innerHTML: desc.text
            });
            textSpan.style.display = 'block';
            textSpan.style.paddingLeft = '0';
            textSpan.style.paddingRight = '0';

            rowWrapper.append(textSpan);

            const leftContainer = createElement('div', {
                className: 'position-absolute p-1 pointer-link'
            });
            leftContainer.style.left = '-1.75rem';
            leftContainer.style.top = '50%';
            leftContainer.style.transform = 'translateY(-50%)';

            const iconClass = `modifier-flank fas fuck-you fa-lg ` + (isWeaponCondition ? 'fa-star ' : 'fa-globe ') + (isShiny ? 'special' : '');
            const conditionTooltipText = isWeaponCondition ? globToltip : typeToltip;
            const conditionIcon = createElement('i', { className: iconClass });

            tippy(conditionIcon, { content: conditionTooltipText, placement: 'top', animation: false }); // this tippy is fine as it is (let's hope)
            leftContainer.append(conditionIcon);
            rowWrapper.append(leftContainer);

            if (infoTooltipKey) {
                const rightContainer = createElement('div', {
                    className: 'position-absolute pointer-link modifierHolder'
                });
                rightContainer.style.right = '-1.5rem';
                rightContainer.style.top = '50%';
                rightContainer.style.transform = 'translateY(-50%)';
                const iconClass = `modifier-flank fas fuck-you fa-question-circle fa-lg ` + (isShiny ? 'special' : '');
                const infoIcon = createElement('i', { className: iconClass });
                tippy(infoIcon, {
                    content: infoTooltipKey,
                    placement: 'top',
                    allowHTML: true,
                    interactive: true,
                    animation: false,
                    appendTo: document.body,
                    popperOptions: {
                        strategy: 'fixed',
                        modifiers: [
                            { name: 'flip', options: { fallbackPlacements: ['top'] } },
                            { name: 'preventOverflow', options: { altAxis: true, tether: false } },
                        ],
                    },
                });
                rightContainer.append(infoIcon);
                rowWrapper.append(rightContainer);
            }
            i += 1;
            return rowWrapper;
        }
        if (level.order) {
            return this.getOrderedShit(statObject, level.order, createModifierRow);
        }
        // we had to unroll the StatObject.describe functions or whatever into ours just so we can pinpoint...
        if (statObject.modifiers !== undefined) {
            statObject.modifiers.forEach((modValue) => {
                if (StatObject.showDescription(modValue.isNegative, 1, 1, true)) {
                    elements.push(createModifierRow(modValue.print(1, 1), false));
                }
            });
        }

        if (statObject.combatEffects !== undefined) {
            statObject.combatEffects.forEach((applicator) => {
                const desc = applicator.getDescription(1, 1);
                if (desc !== undefined && StatObject.showDescription(applicator.isNegative, 1, 1, true)) {
                    const isWeaponCondition = (applicator.conditionChances?.some(cond => cond.condition.type === 'WeaponType') || applicator.condition?.conditions?.some(cond => cond.type === 'WeaponType')); // <-- This! But we don't even use it that much... so fuck.

                    elements.push(createModifierRow(desc, isWeaponCondition));
                }
            });
        }
        if (statObject.conditionalModifiers !== undefined) {
            statObject.conditionalModifiers.forEach((conditional) => {
                const desc = conditional.getDescription(1, 1);
                if (desc !== undefined && StatObject.showDescription(conditional.isNegative, 1, 1, true)) {
                    const isWeaponCondition = (conditional.condition.type === 'WeaponType' || conditional.condition.conditions?.some(cond => cond.type === 'WeaponType')); // <-- Also this apparently

                    elements.push(createModifierRow(desc, isWeaponCondition));
                }
            });
        }

        if (statObject.enemyModifiers !== undefined) {
            statObject.enemyModifiers.forEach((modValue, id) => {
                if (StatObject.showDescription(!modValue.isNegative, 1, 1, true)) {

                    elements.push(createModifierRow(modValue.printEnemy(1, 1, 2, id === 0), false));
                }
            });
        }

        return elements;
    }
    getOrderedShit(statObject, order, createRow) {
        const elements = [];
        let mIdx = 0, eIdx = 0, cIdx = 0, yIdx = 0;

        order.forEach((type) => {
            if (type === 'm' && statObject.modifiers?.[mIdx]) {
                const modValue = statObject.modifiers[mIdx++];
                if (StatObject.showDescription(modValue.isNegative, 1, 1, true)) {
                    elements.push(createRow(modValue.print(1, 1), false));
                }
            }
            else if (type === 'e' && statObject.combatEffects?.[eIdx]) {
                const applicator = statObject.combatEffects[eIdx++];
                const desc = applicator.getDescription(1, 1);
                if (desc !== undefined && StatObject.showDescription(applicator.isNegative, 1, 1, true)) {
                    const isWeaponCondition = (applicator.condition?.type === 'WeaponType' || applicator.condition?.conditions?.some(cond => cond.type === 'WeaponType'));
                    elements.push(createRow(desc, isWeaponCondition));
                }
            }
            else if (type === 'c' && statObject.conditionalModifiers?.[cIdx]) {
                const conditional = statObject.conditionalModifiers[cIdx++];
                const desc = conditional.getDescription(1, 1);
                if (desc !== undefined && StatObject.showDescription(conditional.isNegative, 1, 1, true)) {
                    const isWeaponCondition = (conditional.condition?.type === 'WeaponType' || conditional.condition?.conditions?.some(cond => cond.type === 'WeaponType'));
                    elements.push(createRow(desc, isWeaponCondition));
                }
            }
            else if (type === 'y' && statObject.enemyModifiers?.[yIdx]) {
                const currentId = yIdx;
                const modValue = statObject.enemyModifiers[yIdx++];
                if (StatObject.showDescription(!modValue.isNegative, 1, 1, true)) {
                    elements.push(createRow(modValue.printEnemy(1, 1, 2, currentId === 0), false));
                }
            }
        });

        return elements;
    }
    setMods() {
        this.typeMenu.wepModText.innerHTML = this.typeMenu.type._uiWepMod.describeLineBreak(1, this.typeMenu.type.doubledIndBonuses);
        for (let i = 0; i < this.typeMenu.steps.length; i++) {
            let lockText = !this.typeMenu.type.fixture ? "" : this.typeMenu.type.fixture.length > 1 ? templateRielkLangStringWithNodes(
                "MENU_UPGRADE_TYPE3",
                {
                    fixImg0: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.typeMenu.type.fixture[0].media]] }),
                    fixImg1: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.typeMenu.type.fixture[1].media]] }),
                    fixImg2: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.typeMenu.type.fixture[2].media]] })
                },
                {
                    fixName0: this.typeMenu.type.fixture[0].name,
                    fixName1: this.typeMenu.type.fixture[1].name,
                    fixName2: this.typeMenu.type.fixture[2].name
                }
            )
                : templateRielkLangStringWithNodes("MENU_UPGRADE_TYPE",
                    { fixImg: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.typeMenu.type.fixture[0].media]] }) }, { fixName: this.typeMenu.type.fixture[0].name });

            const shiny = !!this.typeMenu.type.levels[i].shiny;

            if (this.typeMenu.type.levelCap <= i) {
                this.typeMenu.locks[i].innerHTML = '';
                this.typeMenu.locks[i].append(...lockText);
                this.typeMenu.locks[i].classList.toggle('text-danger', !shiny);
                this.typeMenu.locks[i].classList.toggle('text-warning', shiny);
                showElement(this.typeMenu.locks[i]);
                this.typeMenu.steps[i].classList.add("hidden");

            }
            else {
                const spans = this.generateModifierElements(this.typeMenu.type.levels[i]);
                this.typeMenu.steps[i].innerHTML = '';
                this.typeMenu.steps[i].append(...spans);

                hideElement(this.typeMenu.locks[i]);
                this.typeMenu.steps[i].classList.remove("hidden");

            }
        }
    }


    // ----------WEAPON TAB FUNCTIONS ------------

    setWeapon(weapon) {
        if (this.checkmarkSet) {
            hideElement(this.weaponMaxedCheck);
            this.checkmarkSet = 0;
        }
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
            this.weaponTypeMPic.src = weapon.weaponType.mediaCol;
            this.weaponTypeMTex.innerText = weapon.weaponType.name;
            this.weaponMaxedCheck.style.color = this.uniqclass.color;
            this.weaponRank.style.color = this.uniqclass.color;
            this.weaponXPBar.style.width = this.uniqclass.width;
            this.weaponXPFill.style.backgroundColor = this.uniqclass.color;
            this.weaponRank.innerHTML = this.uniqclass.name;
            showElement(this.weaponTypeMPic);
            showElement(this.weaponTypeMTex);
            this.weaponXPBar.style.setProperty('display', 'inline-flex', 'important'); //Truly how much I hate this shit
            showElement(this.weaponXPNumber);
            showElement(this.weaponXPFill);

        }
        else {
            this.weaponRank.innerHTML = "None";
            this.weaponRank.style.color = "#FFFFFF";

            hideElement(this.weaponTypeMPic);
            hideElement(this.weaponTypeMTex);
            this.weaponXPBar.style.setProperty('display', 'none', 'important');
            hideElement(this.weaponXPNumber);
            hideElement(this.weaponXPFill);


        }
        this.setwepXP(weapon);
    };

    setwepXP(weapon) {
        //if (!weapon.masteryMaxed) this.weaponXPNumber.innerText = `${weapon._weaponXP}/${weapon.weaponXPCap}`
        this.weaponTypeMiniTHing.style.top = (this.weaponItem.clientWidth < 350) ? "2px" : "12px";
        const wepxp = weapon.weaponXPPercentCapped
        this.weaponXPFill.style.width = wepxp + "%";
        if (!this.checkmarkSet && wepxp == 100) {
            showElement(this.weaponMaxedCheck);
            this.checkmarkSet = 1;
        }
    }
    // ---------- TYPES SELECT MENU FUNCTIONS ------------
    changeSelectedButton(button) {
        this.selectedButton.classList.replace('btn-outline-success', 'btn-outline-secondary');
        this.selectedButton.menu.classList.add('d-none');
        button.classList.replace('btn-outline-secondary', 'btn-outline-success');
        button.menu.classList.remove('d-none');
        this.selectedButton = button;
    }
    changeSelectedMenu(menu) {
        hideElement(this.selectedMenu);
        showElement(menu);
        this.selectedMenu = menu;
    }

    addTooltip(button, bookName) {
        this.tooltips.push(tippy(button, {
            content: bookName,
            placement: 'bottom',
            interactive: false,
            animation: false,
        }));
    }
    init(game) {
        let firstWep = true;
        this.buttonList = [];
        for (const overT of weaponOverTypes) {
            const button = createElement('button', {
                parent: this.weaponButtonGroup,
                className: 'btn btn-sm btn-outline-secondary flex-fill',
            });
            createElement('img', { parent: button, className: 'skill-icon-xs table-type-image', attributes: [['src', overT.media]] });
            button.onclick = () => this.selectOType(game, overT, button);
            button.oType = overT.id;
            button.menu = createElement('weapon-types-menu', {
                parent: this.weaponMenuPlace,
                className: 'd-none'
            });
            button.menu.init(overT);
            this.addTooltip(button, overT.name);
            if (firstWep) {
                this.selectedButton = button;
                this.selectedMenu = button.menu;
                this.selectedOType = overT.name;
                this.changeSelectedButton(button);
                this.changeSelectedMenu(button.menu);
                // this is stupid I just want it to work
                //this.attackSpellMenu.setBook(book);
                //this.selectedAttackBook = book;
                firstWep = false;
            }
            this.buttonList.push(button);
        };
        this.typeMenu.title.onclick = () => (this.drillUp());
        this.typeMenu.title.style.cursor = 'pointer';
        this.typeMenu.title.style.setProperty('transition', 'color 0.2s ease', 'important');
        this.typeMenu.title.onmouseenter = () => {
            this.typeMenu.title.style.setProperty('color', '#acacac', 'important');
        };

        this.typeMenu.title.onmouseleave = () => {
            this.typeMenu.title.style.removeProperty('color');
        };

        this.container.addEventListener('wtm-type-selected', (event) => {
            const selectedType = event.detail.type;
            this.drillDown(selectedType);
        });
    };
    drillDown(type) {
        this.setType(type);
        this.setXP(0);
        hideElement(this.menuViewerCont);
        showElement(this.typeViewerCont);
        this.lookingAtType = 1;

    }
    drillUp() {
        hideElement(this.typeViewerCont);
        showElement(this.menuViewerCont);
        this.lookingAtType = 0;

    }
    upgradeButton(type) {
        for (const button of this.buttonList) {
            if (button.oType == type.Wtype) { button.menu.upgradeType(type) }
        }
    }
    raiseCaps(oType) {
        for (const button of this.buttonList) {
            if (button.oType == oType) { button.menu.unUpgradeTypes() }
        }
    }
    highlightButton(type) {
        if (!type) {
            for (const button of this.buttonList)
                button.menu.unhighlightTypeButton();
            return;
        };
        const OType = type.Wtype;
        for (const button of this.buttonList) {
            if (button.oType == OType)
                button.menu.highlightTypeButton(type);
            else button.menu.unhighlightTypeButton();
        }
    }
    selectOType(game, Otype, button) {
        if (this.selectedOType === Otype.name)
            return;

        this.changeSelectedMenu(button.menu);
        this.changeSelectedButton(button);
        this.selectedOType = Otype.name
    }

}