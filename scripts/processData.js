const  ProcessData = (data, obsArray) => {
  console.log("Length " + obsArray().length);

  for (let i of data) {
    let tempNPC = new NPC(i.NPCname, i.NPCrace, i.NPCclass, i.NPClvl,
      i.NPCob_orig_pri, i.NPCob_orig_sec, i.NPCdb_orig, i.NPChp_orig,
      i.NPCarmor, i.NPCaddarmor, i.NPCweapons);
    
    obsArray.push(tempNPC);
    for (let j in i) {
      console.log(`i.${j} = ${i[j]}`);
    }
  }
};
