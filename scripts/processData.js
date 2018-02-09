const  ProcessData = (data, obsArray) => {
  console.log("Length " + obsArray().length);

  for (let i of data) {
    let tempNPC = new NPC(i.NPCname, i.NPCrace, i.NPCclass, i.NPClvl,
      i.NPCob_orig_pri, i.NPCob_orig_sec, i.NPCdb_orig, i.NPChp_orig,
      i.NPCarmor, i.NPCaddarmor, i.NPCweapons);
    tempNPC.NPCob_pri( i.NPCob_pri );
    tempNPC.NPCob_sec( i.NPCob_sec );
    tempNPC.NPCdb( i.NPCdb );
    tempNPC.NPChp( i.NPChp );
    tempNPC.NPCsel_weap( i.NPCsel_weap );
    tempNPC.NPC_dead( i.NPC_dead );
    tempNPC.NPC_shield( i.NPC_shield );
    tempNPC.NPC_helm( i.NPC_helm );
    tempNPC.NPC_arm( i.NPC_arm );
    tempNPC.NPC_leg( i.NPC_leg );
    tempNPC.prim_weap_in_use( i.prim_weap_in_use );
    tempNPC.SkillArray = i.SkillArray;
    obsArray.push(tempNPC);
    for (let j in i) {
      console.log(`i.${j} = ${i[j]}`);
    }
  }
};
