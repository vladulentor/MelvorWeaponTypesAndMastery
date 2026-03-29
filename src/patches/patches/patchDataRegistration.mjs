// To not fuck with how the game registers data, we just add the field reading to a random skill

const { loadModule } = mod.getContext(import.meta);

const { WeaponMastery } = await loadModule('src/patches/patches/weaponMastery/weaponType.mjs');

export function patchDataRegistration({ patch }) {
    game.weaponMasteries = new NamespaceRegistry(game.registeredNamespaces, 'WeaponMastery');
    patch(Agility, "registerData").before(function (namespace, data) {
        var _a;
        (_a = data.weaponMasteries) === null || _a === void 0 ? void 0 : _a.forEach(weaponMastery => {
            game.weaponMasteries.registerObject(
                new WeaponMastery(namespace, weaponMastery, this.game)
            );
        });
    });
}