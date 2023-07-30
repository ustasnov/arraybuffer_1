import Character from '../character';
import Bowerman from '../bowerman';
import Swordsman from '../swordsman';
import Magician from '../magician';
import Undead from '../undead';
import Zombie from '../zombie';
import Daemon from '../daemon';

// Character test

test('name must be string', () => {
  function testName() {
    const character = new Character(55, 'Any');
    return character;
  }

  expect(testName).toThrow(Error('Имя должно быть строкой!'));
});

test('name length must be >= 2', () => {
  function testName() {
    const character = new Character('X', 'Bowerman');
    return character;
  }
  expect(testName).toThrow(Error('Длина имени не должна быть менее 2 и более 10 символов!'));
});

test('name length must be <= 10', () => {
  function testName() {
    const character = new Character('character10', 'Bowerman');
    return character;
  }
  expect(testName).toThrow(Error('Длина имени не должна быть менее 2 и более 10 символов!'));
});

test('type must be string', () => {
  function testType() {
    const character = new Character('Any', 55);
    return character;
  }
  expect(testType).toThrow(Error('Тип персонажа должен быть строкой!'));
});

test('type class name must be legal', () => {
  function testWrongType() {
    const character = new Character('character1', 'Any');
    return character;
  }
  expect(testWrongType).toThrow(Error('Неверный тип персонажа!'));
});

test('levelUp method must be work with not dead character', () => {
  function testOnDeadCharacter() {
    const character = new Character('character1', 'Bowerman');
    character.health = 0;
    character.levelUp();
  }
  expect(testOnDeadCharacter).toThrow(Error('Нельзя повысить уровень умершего персонажа!'));
});

test('levelUp method must set correct values for level, attack and defence properties', () => {
  const result = (function testLevelUp() {
    const sourceObject = new Character('character1', 'Bowerman');
    sourceObject.health = 10;
    sourceObject.levelUp();

    const destObject = new Character('character1', 'Bowerman');
    destObject.level = 2;
    destObject.attack = 12;
    destObject.defence = 12;

    return { sourceObject, destObject };
  }());
  expect(result.sourceObject).toEqual(result.destObject);
});

test('damage method must evaluate and set correct value for health property', () => {
  const result = (function testDamage() {
    const character = new Character('character1', 'Bowerman');
    character.damage(10);
    return character.health;
  }());

  expect(result).toBe(91);
});

test('health should be 0 when damage method decrease health less than 0', () => {
  const result = (function testDamage() {
    const character = new Character('character1', 'Bowerman');
    character.damage(500);
    return character.health;
  }());

  expect(result).toBe(0);
});

// Character descendants test

test.each([
  ['character1', 25, 25, false, Bowerman],
  ['character2', 40, 10, false, Swordsman],
  ['character3', 100, 40, true, Magician],
  ['character4', 100, 40, true, Daemon],
  ['character5', 25, 25, false, Undead],
  ['character6', 40, 10, false, Zombie],
])(
  ('for %s attack value must be %s, defence value must be %s'),
  (name, attack, defence, stoned, TypeClass) => {
    const currentCharacter = new TypeClass(name);
    const sourseObject = {
      attack: currentCharacter.attack,
      defence: currentCharacter.defence,
      stoned: currentCharacter.stoned,
    };
    const destObject = { attack, defence, stoned };

    expect(sourseObject).toEqual(destObject);
  },
);

// StonedCharacter descendants test

test.each([
  ['character1', 100, 1, Magician],
  ['character2', 90, 2, Magician],
  ['character3', 80, 3, Magician],
  ['character4', 70, 4, Magician],
  ['character5', 60, 5, Magician],
])(
  ('for %s attack value must be %s for distance %s without stoned'),
  (name, attack, distance, TypeClass) => {
    const currentCharacter = new TypeClass(name);
    currentCharacter.stoned = false;
    currentCharacter.attackDistance = distance;

    expect(currentCharacter.attack).toBe(attack);
  },
);

test.each([
  ['character1', 100, 1, Daemon],
  ['character2', 85, 2, Daemon],
  ['character3', 72, 3, Daemon],
  ['character4', 60, 4, Daemon],
  ['character5', 48, 5, Daemon],
])(
  ('for %s attack value must be %s for distance %s with stoned'),
  (name, attack, distance, TypeClass) => {
    const currentCharacter = new TypeClass(name);
    currentCharacter.stoned = true;
    currentCharacter.attackDistance = distance;

    expect(currentCharacter.attack).toBeCloseTo(attack, 0);
  },
);
