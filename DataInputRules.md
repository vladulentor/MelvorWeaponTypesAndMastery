# Weapon Mastery Data Format

Short write-up on how to input ''Weapon Mastery'' data.
---

## Overview

Weapon Masteries (Weapon Types, but their internal name is Weapon Masteries, it's confusing I know)

A mastery consists of:
- Basic metadata (id, name, media)
- List of Weapons that it is a type for
- 5 progression levels
- Weapon-specific modifiers (`wepModifiers`)

---

## Weapon Mastery Structure

```json
{
  "id": "example_Mastery",
  "name": "Example Mastery",
  "media": "assets/media/example.png",
  "mat": ["exampleItemLine"],
  "kind": "example",
  "uniq": ["Example_Item1", "Example_Another_Item3"],
  "wepModifiers": {}
  "levels": [
    {
      "id": "example_mastery1",
      "name": "example_mastery1",
      "modifiers": {}
    },
    {
      "id": "example_mastery2",
      "name": "example_mastery2",
      "modifiers": {}
    },
    {
      "id": "example_mastery3",
      "name": "example_mastery3",
      "modifiers": {}
    },
    {
      "id": "example_mastery4",
      "name": "example_mastery4",
      "modifiers": {}
    },
    {
      "id": "example_mastery5",
      "name": "example_mastery5",
      "modifiers": {}
    }
  ]
}
````

---
 (Also all of them are in Agility's Skill Data, this is for technical reasons)

## Fields

### `id`

* Unique identifier for the mastery

---

### `name`

* Display name of the mastery (Note, we'll be using lang-strings for this later, but now it's just all English)

---
### `mat` (optional)

* Name of crafted series of weapons that belong in this category (e.g. "Scimitars"), requires `kind` field to work.

### `kind` (optional)

* Material list from which the crafted series of weapons is made (e.g. "Bronze", "Iron" etc.), requires the `mat` field to work. Has 3 default values of "melee", "ranged", and "magic". But can accept any array of strings.

### `uniq` (optional)

* List of items that belong to the weapon mastery. Written as an array of strings that are composed of the item's local ID and uniqueness.

---

### `media`

* Image used for the mastery
* Should be a **white outline icon**, there's filters to make it look good in all styles.

---

### `fixture`

* This is for Construction to hook into later.

---

### `levels`

* Array of 5 level structures
* Each level unlocks bonuses when achieved

#### Level Structure

```json
{
  "name":"example_Mastery1",
  "id":"example_Mastery1",
  "modifiers": {},
  "enemyModifiers": {},
  "conditionalModifiers": [],
  "changeFunc":"exampleFunc",
  "shiny": true
}
```

#### Supported Properties

* `statObject`
Any modifiers, enemymodifiers, conditionalModifiers are supported.

* `shiny` (optional)

  * Changes the visual style of the level


| State    | Normal | Shiny           |
| -------- | ------ | --------------- |
| Locked   | Red    | Washed-out gold |
| Unlocked | Green  | Blood orange    |

* `changeFunc` (optional)
  * Used to make modifiers that do cool stuff like add attacks, kind of hard to set up. Has to be the name of a function as defined in the `patchRegistry` file. Will execute that function on level Up or load. Creates no text so a fake modifier has to be used to explain the effect. 

---

### `wepModifiers`

* A **StatObject**
* A wepModifier is applied to the player for every weapon of that WeaponMasteries with filled mastery. They can be global, tied to type, or tied to the weapon itself.

---

## Weapon Modifier Behavior

To make `wepModifiers` apply **only to a specific weapon type**:

1. Add the following flag to the weapon type:

   ```json
   {
     "isPerWepMod": true
   }
   ```

2. Define your modifiers inside `wepModifiers`

The system will automatically add the wepModifiers to the `Player` object when the weapon is equipped.
---

# Adding weapons to an existing WeaponMastery object.
A weapon Mastery Modification can be used to add new individual weapons, crafted weapon series, or crafted weapon series materials. Included in the 'modifications' field of a .json file.
```json
{
"id":"ExampleNamespace:Example",
"mat": ["Example"],
"kind": ["ExampleMaterial"],
"uniq": ["Example_Item2", "Example_Item0"],
}
```
 (All of them are still in Agility's Skill Data in Modifications)

## Fields

### `id`
* The namespaced id of the weapon modified weapon mastery

### `mat` (optional)

* The added crafted weapon series' names to be added to the modified weapon mastery

### `kind` (optional)

* The added crafted weapon series' materials to be added to the modified weapon mastery

### `uniq` (optional)

* List of items that are to be added to the modified weapon mastery. Written as an array of strings that are composed of the item's local ID and uniqueness.

## P.S. Using WeaponType and Weapon Conditional Modifiers.
Most of a type's level modifiers should be conditionalModifiers scoped to their own weaponType, the weapon conditionalModifier is what the system creates if `isPerWepMod` is active. These conditionalModifiers can be used anywhere a StatObject is accepted.
### Weapon Type
```json
                  "conditionalModifiers": [
                    {
                      "condition": {
                        "type": "WeaponType",
                        "weaponType": "exampleType"
                      },
                      "modifiers": {
                      },
                      "description": "Example_Condition"
                    }
                  ]

```
### Weapon
```json
                  "conditionalModifiers": [
                    {
                      "condition": {
                        "type": "Weapon",
                        "weapon": "exampleWeaponLocalID"
                      },
                      "modifiers": {
                      },
                      "description": "Example_Condition"
                    }
                  ]

```
