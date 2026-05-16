
export class EmptySlotCondition extends BooleanCondition {
  constructor(data) {
    super(data);
    this.type = 'EmptySlot';
    this.slots = [].concat(data.slotIDs);
  }

  _checkIfMet(manager) {
    return this.slots.every(slot => game.combat.player.equipment.getItemInSlot(slot)._localID === 'Empty_Equipment' )
  }

  _assignWrappedHandler(manager, handler) {
        manager.player.on('equipmentChanged', handler);
  }

  _unassignWrappedHandler(manager, handler) {
        manager.player.off('equipmentChanged', handler);
  }

  addTemplateData(templateData, prefix = '', postfix = '') {  }
}