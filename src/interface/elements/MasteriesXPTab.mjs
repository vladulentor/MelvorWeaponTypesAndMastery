class CombatWeaponTypeProgressTableRow {
    constructor(body) {
        this.weaponTypeLevelContainers = [];

        const content = new DocumentFragment();
        content.append(getTemplateNode('combat-weapon-type-progress-table-row-template'));

        this.row = getElementFromFragment(content, 'row', 'tr');
        this.weaponTypeImage = getElementFromFragment(content, 'weapon-type-image', 'img');

        for (let i = 0; i < 3; i++) {
            this.weaponTypeLevelContainers.push(
                getAnyElementFromFragment(content, `weapon-type-level-container-${i}`)
            );
        }

        this.weaponTypeLevel = getElementFromFragment(content, 'weapon-type-level', 'small');
        this.weaponTypeLevelProgress = getElementFromFragment(content, 'weapon-type-level-progress', 'small');
        this.weaponTypeXp = getElementFromFragment(content, 'weapon-type-xp', 'small');


        this.weaponTypeProgressBarContainer = getElementFromFragment(
            content,
            'weapon-type-progress-bar-container',
            'div'
        );

        this.weaponTypeProgressBar = getElementFromFragment(
            content,
            'weapon-type-progress-bar',
            'div'
        );

        this.weaponTypeLevelContainers.push(this.weaponTypeProgressBarContainer);

        body.append(this.row);
    }

    setWeaponType(weaponType) {
        this.weaponTypeImage.src = weaponType.media;
    }

    updateXP(game, weaponType) {
        const xp = Math.floor(weaponType.xp);
        const level = weaponType.level;
        const nextxp = weaponType.xpAtLevel(level + 1);
        this.weaponTypeXp.textContent =
            `${numberWithCommas(xp)} / ${numberWithCommas(nextxp)}`;

        const progress = weaponType.progressToNextLevel;

        this.weaponTypeLevelProgress.textContent = formatPercent(Math.floor(progress));
        this.weaponTypeProgressBar.style.width = `${progress}%`;

        if (this.weaponTypeXPTooltip === undefined) {
            this.weaponTypeXPTooltip = this.createXPTooltip(this.weaponTypeProgressBarContainer);
        }

        this.weaponTypeXPTooltip.setContent(
            `<div class='text-center'>${this.weaponTypeXp.textContent}</div>`
        );
    }

    updateLevel(game, weaponType) {
        this.weaponTypeLevel.textContent =
            `${weaponType.level} / ${weaponType.levelCap}`;
    }

    destroy() {
        this.weaponTypeXPTooltip?.destroy();
        this.weaponTypeXPTooltip = undefined;
    }

    createXPTooltip(element) {
        return tippy(element, {
            allowHTML: true,
            placement: 'top',
            interactive: false,
            animation: false,
        });
    }
}

export class CombatWeaponTypeProgressTableElement extends HTMLElement {
    constructor() {
        super();
        this.tableRows = new Map();

        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('combat-weapon-type-progress-table-template'));
        // this.levelCapHeader = getElementFromFragment(this._content, 'level-cap-header', 'th');
        this.table = getElementFromFragment(this._content, 'table-id', 'table'); 
        this.tableBody = getElementFromFragment(this._content, 'table-body', 'tbody');
        this.eyething = getElementFromFragment(this._content, 'eye-segment', 'div');
        this.openeye = getElementFromFragment(this._content, 'weapon-type-menu-open', 'i');
        this.closedeye = getElementFromFragment(this._content, 'weapon-type-menu-closed', 'i');
        this.eyething.addEventListener('click', () => {
            this.table.classList.toggle('d-none');
            this.openeye.classList.toggle('d-none');
            this.closedeye.classList.toggle('d-none');
        })

    }

    connectedCallback() {
        this.appendChild(this._content);
    }

    disconnectedCallback() {
        this.tableRows.forEach((row) => row.destroy());
    }

    initialize(game) {
        game.weaponMasteries.allObjects.forEach((weaponType) => {
            const row = new CombatWeaponTypeProgressTableRow(this.tableBody);
            row.setWeaponType(weaponType);
            this.tableRows.set(weaponType, row);
        });
    }

    updateXP(game, weaponType) {
        this.tableRows.get(weaponType)?.updateXP(game, weaponType);
    }

    updateLevel(game, weaponType) {
        this.tableRows.get(weaponType)?.updateLevel(game, weaponType);
    }
}

window.customElements.define(
    'combat-weapon-type-progress-table',
    CombatWeaponTypeProgressTableElement
);