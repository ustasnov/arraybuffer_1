import Character from './character';

export default class Magician extends Character {
  constructor(name) {
    super(name, 'Magician');
    this.attackValue = 100;
    this.defence = 40;
  }
}
