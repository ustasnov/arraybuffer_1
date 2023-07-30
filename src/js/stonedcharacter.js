import Character from './character';

export default class StonedCharacter extends Character {
  constructor(name, type) {
    super(name, type);
    this.stoned = true;
  }

  get attack() {
    return (this.attackValue * Math.max(11 - this.attackDistance, 0)) / 10
      - (this.stoned ? Math.log2(this.attackDistance) * 5 : 0);
  }
}
