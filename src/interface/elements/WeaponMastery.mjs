
const { loadModule } = mod.getContext(import.meta);

const { templateRielkLangStringWithNodes, templateRielkLangString, getRielkLangString } = await loadModule('src/language/translationManager.mjs');
const { uniqtoclass } = await loadModule('src/patches/patches/weaponMastery/weaponType.mjs');

const ctx = mod.getContext(import.meta);

export class WeaponMasteryUI {
    constructor() {
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('weaponMastery-template'));
        this.type = null;
        this.weapon = null;

        // Grab the outer wrapper as the main container
        this.container = getElementFromFragment(this._content, 'outercont', 'div');
        this.block = getElementFromFragment(this._content, 'weaponMasteryContainer', 'div');
        this.bgIcon = getElementFromFragment(this._content, 'weaponMasteryBgIcon', 'img');
        this.icon = getElementFromFragment(this._content, 'weaponMasteryIcon', 'img');
        this.text = getElementFromFragment(this._content, 'weaponMasteryText', 'h5');
        this.title = getElementFromFragment(this._content, 'weaponMasteryTitle', 'h5');
        const icon = document.createElement('i');
        icon.className = 'fa fa-question-circle';
        this.title.appendChild(icon);
        this.setWeaponMasteryTooltip(this.title);

        this.weaponItem = getElementFromFragment(this._content, 'weaponMasteryItem', 'div');
        this.weaponPic = getElementFromFragment(this._content, 'weaponPic', 'img');
        this.weaponInfo = getElementFromFragment(this._content, 'weaponInfo', 'div');
        this.weaponName = getElementFromFragment(this._content, 'weaponName', 'span');
        this.weaponRank = getElementFromFragment(this._content, 'weaponRank', 'span');
        // Why the fuck did I call it "weapon Rank"?
        this.setWeaponUniquenessTooltip(this.weaponRank);
        this.weaponXPBar = getElementFromFragment(this._content, 'weaponXPBar', 'div');
        this.weaponXPNumber = getElementFromFragment(this._content, 'weaponXPNumber', 'div');


        this.weaponXPFill = getElementFromFragment(this._content, 'weaponXpFill', 'div');
        this.weaponModDisc = getElementFromFragment(this._content, 'unlockedWeaponMod', 'div');
        this.weaponModText = getElementFromFragment(this._content, 'weaponModifierValue', 'div');

        this.typeProfBar = getElementFromFragment(this._content, 'weaponMasteryBar', 'div');
        this.typeProfFill = getElementFromFragment(this._content, 'weaponMasteryProgress', 'div');
        this.typeProfOvFill = getElementFromFragment(this._content, 'weaponMasteryOverfill', 'div');
        this.typeLabels = [
            getElementFromFragment(this._content, 'label-1', 'span'),
            getElementFromFragment(this._content, 'label-2', 'span'),
            getElementFromFragment(this._content, 'label-3', 'span'),
            getElementFromFragment(this._content, 'label-4', 'span'),
            getElementFromFragment(this._content, 'label-5', 'span'),
        ];
        this.typeMarkers = [
            getElementFromFragment(this._content, 'marker-1', 'div'),
            getElementFromFragment(this._content, 'marker-2', 'div'),
            getElementFromFragment(this._content, 'marker-3', 'div'),
            getElementFromFragment(this._content, 'marker-4', 'div'),
            getElementFromFragment(this._content, 'marker-5', 'div'),
        ];

        this.stepContainer = getElementFromFragment(this._content, 'weaponMasteryStepsContainer', 'div');
        this.cap = getElementFromFragment(this._content, 'weaponMasteryCap', 'div');
        this.spacer = getElementFromFragment(this._content, 'modifierSpacer', 'div');
        this.stepContainer.style.paddingTop = '0';
        this.stepsButton = getElementFromFragment(this._content, 'weaponMasteryStepsButton', 'div');

        this.modifierListContainer = getElementFromFragment(this._content, 'weaponMasteryModifiers', 'div');
        this.steps = [
            getElementFromFragment(this._content, 'modifierStep1', 'div'),
            getElementFromFragment(this._content, 'modifierStep2', 'div'),
            getElementFromFragment(this._content, 'modifierStep3', 'div'),
            getElementFromFragment(this._content, 'modifierStep4', 'div'),
            getElementFromFragment(this._content, 'modifierStep5', 'div'),
        ];
        this.locks = [
            getElementFromFragment(this._content, 'lock1', 'div'),
            getElementFromFragment(this._content, 'lock2', 'div'),
            getElementFromFragment(this._content, 'lock3', 'div'),
            getElementFromFragment(this._content, 'lock4', 'div'),
            getElementFromFragment(this._content, 'lock5', 'div'),
        ];
        this.wepModTypeApplic = getRielkLangString('MENU_GLOBAL_APPLIC'),
            this.wepModGlobApplic = getRielkLangString('MENU_TYPE_APPLIC'),

            this.stepsButton.onclick = () => this.toggleModifierList();
    }
    // --- Tooltip shit --


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
        hint2.innerText = "Hover over different elements to learn more about weapon masteries";
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
    setWeaponUniquenessTooltip(elem) {
        elem.tippyContent = createElement("div");

        const expl = createElement("div", {
            className: 'text-center text-size-sm mb-1 font-w400'
        });
        expl.innerHTML = "A weapon's <span class='text-success'>Uniqueness</span> determines how much training can be gotten out of it. Rare and unusual weapons are more unique.";
        elem.tippyContent.appendChild(expl);

        elem.tippyContent.appendChild(createElement('div', { className: 'dropdown-divider' }));

        const hint = createElement("div", {
            className: 'text-center text-size-sm font-w400 text-muted'
        });
        hint.innerText = "A weapon's uniqueness is unrelated to its strength.";
        elem.tippyContent.appendChild(hint);

        elem.tippy = tippy(elem, {
            content: elem.tippyContent,
            placement: 'top',
            allowHTML: true,
            interactive: false,
            animation: false,
            appendTo: this.title,
            popperOptions: {
                strategy: 'fixed',
                modifiers: [
                    { name: 'flip', options: { fallbackPlacements: ['top'] } },
                    { name: 'preventOverflow', options: { altAxis: true, tether: false } },
                ],
            },
        });
    }
    openModifierList() {
        this.modifierListContainer.classList.remove('collapsed');
        this.modifierListContainer.classList.add('open');
        const contentHeight = this.modifierListContainer.scrollHeight;
        this.modifierListContainer.style.maxHeight = contentHeight + "px";
        this.stepContainer.classList.add('expanded');
        this.stepsButton.classList.add('open');
        requestAnimationFrame(() => {
            this.cap.style.top = this.spacer.offsetTop + "px";
        });
    }

    closeModifierList() {
        this.modifierListContainer.style.maxHeight = "0px";
        this.modifierListContainer.classList.remove('open');
        this.modifierListContainer.classList.add('collapsed');
        this.stepContainer.classList.remove('expanded');
        this.stepsButton.classList.remove('open');
        requestAnimationFrame(() => {
            this.cap.style.top = this.stepsButton.offsetTop + "px";
        });
    }

    toggleModifierList() {
        if (this.modifierListContainer.classList.contains('collapsed')) {
            this.openModifierList();
        } else {
            this.closeModifierList();
        }
    }
    setWeapon(weapon) {

        if (this.weapon !== weapon) {
            this.weapon = weapon;
            this.setWeaponSegment(weapon, this.type);
        }

        let changedType = 0;
        if (this.type !== weapon.weaponType) {
            changedType = 1;
            this.type = weapon.weaponType;
            this.setType();
        }

        this.setXP();
    }
    setType() {
        this.icon.src = this.type.media
        this.text.innerHTML = this.type.name;
        this.bgIcon.src = this.type.media;
        this.weaponModText.innerHTML = this.type._uiWepMod.describeLineBreak(1, this.type.doubledIndBonuses);

        if (this.modifierListContainer.classList.contains('open'))
            this.closeModifierList()
        this.setMods();

    }
    render() {
        this.setXP();
    }
    setXP() {
        if (!this.weapon.masteryMaxed) this.weaponXPNumber.innerText = `${this.weapon._weaponXP}/${this.weapon.weaponXPCap}`
        this.weaponXPFill.style.width = this.weapon.weaponXPPercentCapped + "%"
        this.typeProfOvFill.style.width = this.type.uncappedxpPercent + "%";
        const percentCapped = this.type.xpPercent;
        this.typeProfFill.style.width = percentCapped + "%";
        for (let i = 0; i < 5; i++) {
            const fancy = this.type.level > i;
            this.typeLabels[i].classList.toggle("text-combat-smoke", !fancy);
            this.typeMarkers[i].classList.toggle("construction-bar", fancy);
            this.typeLabels[i].classList.toggle("construction-victory", fancy);
            this.steps[i].classList.toggle("locked", !fancy);
        }
    }
    setWeaponSegment(weapon, type) {
        this.weaponPic.src = weapon.media;
        this.weaponName.innerHTML = weapon.name;
        this.uniqclass = uniqtoclass[weapon.uniqueness];
        this.weaponRank.innerHTML = this.uniqclass.name;
        this.weaponRank.style.color = this.uniqclass.color;
        this.weaponXPBar.style.width = this.uniqclass.width;
        this.weaponXPFill.style.backgroundColor = this.uniqclass.color;
    }

    toggleWeaponMod(maxed) {
        if (maxed) {
            hideElement(this.weaponXPNumber);
            if (this.type.IndMods) { showElement(this.weaponModDisc); }
            else { hideElement(this.weaponModDisc); }


        }
        else { showElement(this.weaponXPNumber); hideElement(this.weaponModDisc); }
        if (this.modifierListContainer.classList.contains('collapsed')) {
            this.cap.classList.add('no-transition');
            this.cap.style.top = this.stepsButton.offsetTop + "px";
            requestAnimationFrame(() => {
                this.cap.classList.remove('no-transition');
            });
        }
    }
    generateModifierElements(level) {
        const statObject = level.uiMods;
        const isShiny = !!level.shiny;
        const elements = [];
        const globToltip = this.wepModGlobApplic;
        const typeToltip = this.wepModTypeApplic
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
            leftContainer.style.left = '-1.15rem';
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
                rightContainer.style.right = '-3rem';
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
        for (let i = 0; i < this.steps.length; i++) {
            let lockText = !this.type.fixture ? "" : templateRielkLangStringWithNodes("MENU_UPGRADE_TYPE",
                { fixImg: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.type.fixture.media]] }) }, { fixName: this.type.fixture.name });

            const shiny = !!this.type.levels[i].shiny;
            if (this.type.levelCap <= i) {
                this.locks[i].innerHTML = '';
                this.locks[i].append(...lockText)
                this.locks[i].classList.toggle('text-danger', !shiny);
                this.locks[i].classList.toggle('text-warning', shiny);

                showElement(this.locks[i]);
                this.steps[i].classList.add("hidden");
            }
            else {
                const spans = this.generateModifierElements(this.type.levels[i]);
                this.steps[i].innerHTML = '';
                this.steps[i].append(...spans);

                hideElement(this.locks[i]);
                this.steps[i].classList.remove("hidden");

            }
        }

    }
    show() {
        showElement(this.container);
        this.toggleWeaponMod(this.weapon.masteryMaxed);

    }
    hide() {
        hideElement(this.container);
        this.closeModifierList();
    }
}
