const SkillLevel = (lvl, start,stop, inc, inc_after) => {
// lvl - level of AddCharacter
// start - starting level of skill at 1st skill
// stop - last level when when the skill is incremented by inc
// inc - how much the skill is incremented each level up to level stop
// inc_after - how much the skill is incremented after reaching level stop
  console.log("lvl in SkillLevel " + lvl);
  return Number(start) + (( Number(lvl) - 1 ) < stop ? Number(lvl) - 1 : stop - 1) * Number(inc) + ( (Number(lvl) - stop) <= 0 ? 0 : lvl - stop ) * Number( inc_after );
}

const destroyClickedElement = (event) => {
    document.body.removeChild(event.target);
}

const FormatSkills = (obsArray, SkillArray) => {
  obsArray.removeAll();

  for (let i of SkillArray)
      obsArray.push(i);
}
