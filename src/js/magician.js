import StonedCharacter from './stonedcharacter';

export default class Magician extends StonedCharacter {
  constructor(name) {
    super(name, 'Magician');
    this.attackValue = 100;
    this.defence = 40;
  }
}
