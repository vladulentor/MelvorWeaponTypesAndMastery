const noXP = { name: "No XP", color: "#af0000", width: '0%' };
const stock = { name: "Stock", color: "#2dd432", width: '40%' };
const unusual = { name: "Unusual", color: "#3a9adf", width: '60%' };
const distinct = { name: "Distinct", color: "#d33290", width: '80%' };
const exotic = { name: "Exotic", color: "#ffaf02", width: '90%' };

const { loadModule } = mod.getContext(import.meta);

const { templateRielkLangStringWithNodes, templateRielkLangString, getRielkLangString } = await loadModule('src/language/translationManager.mjs');

const uniqtoclass = [noXP, stock, unusual, distinct, exotic, exotic, exotic, exotic, exotic];


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
        const rect = this.spacer.getBoundingClientRect();
        const parentRect = this.stepContainer.getBoundingClientRect();
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
        else { showElement(this.weaponXPNumber);hideElement(this.weaponModDisc); }
        if (this.modifierListContainer.classList.contains('collapsed')) {
            this.cap.classList.add('no-transition');
            this.cap.style.top = this.stepsButton.offsetTop + "px";
            requestAnimationFrame(() => {
                this.cap.classList.remove('no-transition');
            });
        }
    }
    generateModifierElements(level) {
        const descs = StatObject.getDescriptions(level.wepModifiers);

        const isShiny = !!level.shiny;

        return descs.map((desc) => {
            const cls = 'modifierHolder fuck-you text-center ' + (isShiny ? 'special' : '');
            const span = createElement('span', {
                className: `m-1 font-size-sm ${cls}`,
                innerHTML: desc.text
            });
            span.style.display = 'block';
            return span;
        });
    }
    setMods() {

        for (let i = 0; i < this.steps.length; i++) {
            let lockText = this.type.fixture.length > 1 ? templateRielkLangStringWithNodes(
                "MENU_UPGRADE_TYPE3",
                {
                    fixImg0: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.type.fixture[0].media]] }),
                    fixImg1: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.type.fixture[1].media]] }),
                    fixImg2: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.type.fixture[2].media]] })
                },
                {
                    fixName0: this.type.fixture[0].name,
                    fixName1: this.type.fixture[1].name,
                    fixName2: this.type.fixture[2].name
                }
            )
                : templateRielkLangStringWithNodes("MENU_UPGRADE_TYPE",
                    { fixImg: createElement('img', { className: 'skill-icon-xs', attributes: [['src', this.type.fixture[0].media]] }) }, { fixName: this.type.fixture[0].name });

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
