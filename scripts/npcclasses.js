const Warrior = (lvl) => {
  this.hitPoints = SkillLevel(lvl, 34, 6, 13, 7);
  this.DB = 15;
  this.OBprimary = SkillLevel(lvl, 43, 5, 13, 5);
  this.OBsecondary = SkillLevel(lvl, 28, 7, 8, 5);
  this.perception = SkillLevel(lvl, 5, 30, 3, 1);
  this.stalkhide = SkillLevel(lvl, 5, 30, 3, 1);
  return [this.hitPoints, this.DB, this.OBprimary, this.OBsecondary, this.perception, this.stalkhide];
}

const Scout = (lvl) => {
  this.hitPoints = SkillLevel(lvl, 27, 20, 5, 1);
  this.DB = 20;
  this.OBprimary = SkillLevel(lvl, 41, 4, 11, 3);
  this.OBsecondary = SkillLevel(lvl, 31, 9, 6, 3);
  this.perception = SkillLevel(lvl, 13, 8, 8, 3);
  this.stalkhide = SkillLevel(lvl, 12, 8, 7, 3);
  return [this.hitPoints, this.DB, this.OBprimary, this.OBsecondary, this.perception, this.stalkhide];
}

const Ranger = (lvl) => {
  this.hitPoints = SkillLevel(lvl, 32, 10, 5, 3);
  this.DB = 10;
  this.OBprimary = SkillLevel(lvl, 42, 4, 12, 4);
  this.OBsecondary = SkillLevel(lvl, 22, 9, 7, 4);
  this.perception = SkillLevel(lvl, 12, 9, 7, 4);
  this.stalkhide = SkillLevel(lvl, 12, 9, 7, 4);
  return [this.hitPoints, this.DB, this.OBprimary, this.OBsecondary, this.perception, this.stalkhide];
}

const Mage = (lvl) => {
  this.hitPoints = SkillLevel(lvl, 16, 10, 6, 3);
  this.DB = 5;
  this.OBprimary = 10;
  this.OBsecondary = 5;
  this.perception = 15;
  this.stalkhide = 10;
  return [this.hitPoints, this.DB, this.OBprimary, this.OBsecondary, this.perception, this.stalkhide];
}

const Animist = (lvl) => {
  this.hitPoints = SkillLevel(lvl, 16, 10, 6, 3);
  this.DB = 5;
  this.OBprimary = SkillLevel(lvl, 15, 9, 5, 2);
  this.OBsecondary = SkillLevel(lvl, 15, 9, 5, 2);
  this.perception = SkillLevel(lvl, 21, 6, 9, 1);
  this.stalkhide = SkillLevel(lvl, 5, 9, 5, 1);
  return [this.hitPoints, this.DB, this.OBprimary, this.OBsecondary, this.perception, this.stalkhide];
}

const Bard = (lvl) => {
  this.hitPoints = SkillLevel(lvl, 16, 10, 6, 3);
  this.DB = 5;
  this.OBprimary = SkillLevel(lvl, 16, 9, 6, 3);
  this.OBsecondary = SkillLevel(lvl, 11, 9, 6, 3);
  this.perception = SkillLevel(lvl, 16, 9, 6, 3);
  this.stalkhide = SkillLevel(lvl, 16, 9, 6, 3);
  return [this.hitPoints, this.DB, this.OBprimary, this.OBsecondary, this.perception, this.stalkhide];
}

const getSkills = (lvl, npc_class) => {
  switch(npc_class) {
    case 'Animist':
      return Animist(lvl);
      break;
    case 'Bard':
      return Bard(lvl);
      break;
    case 'Mage':
      return Mage(lvl);
      break;
    case 'Ranger':
      return Ranger(lvl);
      break;
    case 'Scout':
      return Scout(lvl);
      break;
    case 'Warrior':
      return Warrior(lvl);
      break;
    default:
      return [0,0,0,0,0,0];
    }
}
