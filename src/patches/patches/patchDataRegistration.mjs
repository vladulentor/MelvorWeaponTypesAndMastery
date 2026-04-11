// To not fuck with how the game registers data, we just add the field reading to a random skill

const { loadModule } = mod.getContext(import.meta);

const { WeaponMastery } = await loadModule('src/patches/patches/weaponMastery/weaponType.mjs');
function deletething(regist, object) {

    const key = `${object.namespace}:${object.localID}`;
    regist.registeredObjects.delete(key);
    const map = regist.namespaceMaps.get(object.namespace);
    if (map) {
        map.delete(object.localID);
        if (map.size === 0) // how though, but whatever
            regist.namespaceMaps.delete(object.namespace)
    }
}
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
    patch(Agility, "modifyData").before(function (data) {
        var _a;
        (_a = data.weaponMasteries) === null || _a === void 0 ? void 0 : _a.forEach((modData) => {
            const mastery = game.weaponMasteries.getObjectByID(modData.id);
            mastery.applyDataModification(modData, this.game);
            //KILL
            for (const m of game.weaponMasteries.allObjects) {
                if (m.shouldDie) {
                    deletething(game.weaponMasteries, m);
                }
            }
        });
    });
}