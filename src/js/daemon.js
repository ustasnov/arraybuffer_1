import StonedCharacter from './stonedcharacter';

export default class Daemon extends StonedCharacter {
  constructor(name) {
    super(name, 'Daemon');
    this.attackValue = 100;
    this.defence = 40;
  }
}
