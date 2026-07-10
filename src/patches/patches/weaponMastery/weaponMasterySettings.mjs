// Thank you Kuma for this great settings code!!!!!11!
const { loadModule } = mod.getContext(import.meta);

const { templateRielkLangStringWithNodes, templateRielkLangString, getRielkLangString } = await loadModule('src/language/translationManager.mjs');
const { deleteEverything } = await loadModule('src/patches/patches/weaponMastery/deleteEverything.mjs');

const baseGame = new Set(["melvorAoD", "melvorTotH", "melvorItA"]);
function buildRelnsSet() {
    const set = new Set();
    for (const m of game.items.weapons.namespaceMaps.keys())
        if (game.registeredNamespaces.registeredNamespaces.get(m).isModded) { set.add(m) };
    for (const m of game.weaponMasteries.namespaceMaps.keys())
        if(m !=="WTM") {set.add(m)};
    return set;
}
function returnDef(ns) {
    if (ns == "melvorItA")
        return "no-xp"
    return "full"
}
function getWeaponTypeDropdownOptions() {
    const createOptionNode = (id) => {
        const labelText = getRielkLangString(`MENU_SETTINGS_${id}`);
        const hoverText = getRielkLangString(`MENU_SETTINGS_HOVER_${id}`);
        const span = document.createElement('span');
        span.title = hoverText;
        span.textContent = labelText;
        return span;
    };

    return [

        {
            value: 'full',
            display: createOptionNode('TYPE')
        },

        {
            value: 'no-xp',
            display: createOptionNode('NOXP')
        },
        {
            value: 'none',
            display: createOptionNode('NONE')
        }
    ];
}
export const SettingsManager = {
    ctxSettings: null,

    async init(ctx) {
        this.ctxSettings = ctx.settings.section('──⚔──');
        this.ctxSettings.add([
            {

                type: 'switch',
                name: 'stupid-mode',
                label: 'silly mode',
                hint: 'Changes weapon names and tooltips',
                default: false,
                onChange: (newV, val) => this.updateButton(newV, val)

            },
            {
                type: 'label',
                label: (() => {
                    const el = document.createElement('span');
                    el.innerText = 'Weapon Type and Experience Settings';
                    el.style.fontWeight = '900';   // could have bootstrapped these but it's fine
                    el.style.fontSize = '1.2rem';
                    return el;
                })(),
                name: 'label',
                display: getRielkLangString('MENU_SETTINGS_WEAPONS_SECTION'),
            }]);

        const modSet = buildRelnsSet();
        const settingsToAdd = [];
        game.registeredNamespaces.registeredNamespaces.forEach(ns => {
            if (baseGame.has(ns.name) || modSet.has(ns.name))
                settingsToAdd.push(
                    {
                        type: 'dropdown',
                        name: ns.name,
                        label: ns.displayName,
                        hint: getRielkLangString('MENU_SETTINGS_TOOLTIP'),
                        default: returnDef(ns.name),
                        options:
                            getWeaponTypeDropdownOptions()
                        ,
                        onChange: (newV, val) => this.updateButton(newV, val)
                    }
                )
        })
        if (settingsToAdd.length > 0) this.ctxSettings.add(settingsToAdd);


        this.ctxSettings.add([

            {
                type: 'button',
                name: 'save-reload',
                display: 'Save and Reload',
                color: 'primary',
                onClick: () => {
                    saveData();
                    window.location.reload();
                }
            },
            {
                type: 'label',
                label: (() => {
                    const el = document.createElement('span');
                    el.classList = "text-danger";
                    el.innerText = getRielkLangString('MENU_DANGER_ZONE');
                    el.style.fontWeight = '900';   // could have bootstrapped these but it's fine
                    el.style.fontSize = '1.2rem';
                    return el;
                })(),
                name: 'label',
                display: getRielkLangString('MENU_SETTINGS_WEAPONS_SECTION'),
            },
            {
                type: 'button',
                name: 'resetStats',
                display: 'Reset Weapon Stats',
                color: 'danger',
                onClick: () => {
                    deleteEverything(ctx, null);
                }
            }
        ]);

        return [...baseGame, ...modSet, "melvorD", "melvorF"];
    },// I HATE THIS SHIT

    updateButton(newV, v) {
        const btn = document.getElementById(`WTM:save-reload`);
        if (btn && btn.classList.contains('btn-primary')) {
            btn.classList.replace('btn-primary', 'btn-danger');
        }
        return true;
    }
};