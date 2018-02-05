var number_of_npc = 0;

class NPC {

    constructor( name, race, prof, lvl, ob_pri, ob_sec, db, hp, armor, addarmor, weapons ) {
        this.NPCname = name;
        this.NPCrace = race;
        this.NPCclass = prof;
        this.NPClvl = lvl;
        this.NPCob_pri = ko.observable(Number(ob_pri));
        this.NPCob_orig_pri = ob_pri;
        this.NPCob_sec = ko.observable(Number(ob_sec));
        this.NPCob_orig_sec = ob_sec;
        this.NPCdb = ko.observable(Number(db));
        this.NPCdb_orig = db;
        this.NPChp = ko.observable(Number(hp));
        this.NPChp_orig = Number(hp);
        this.NPCarmor = armor;
        this.NPCaddarmor = addarmor; // Array [bool,bool,bool,bool] => [shield, helmet, arm armor, leg armor]
        this.NPCweapons = weapons;  // Array, [primary weapon, secondary weapon]
        this.NPCsel_weap = ko.observable(this.NPCweapons[0]);
        this.NPCprim_weap_use = ko.computed( () => { if (this.NPCweapons[0] == this.NPCsel_weap()) return true; else return false; }, this);
        this.NPC_dead = ko.observable(false);
        this.NPC_shield = ko.observable(this.NPCaddarmor[0]);
        this.NPC_helm = ko.observable(this.NPCaddarmor[1]);
        this.NPC_arm = ko.observable(this.NPCaddarmor[2]);
        this.NPC_leg = ko.observable(this.NPCaddarmor[3]);
        this.NPCDefBon = ko.computed( () => {
          let i = this.NPC_shield() ? 25 : 0;
          return this.NPCdb() + i; }, this);
        this.NPCAttBon_pri = ko.computed( () => {
          let i = this.NPC_arm() ? -5 : 0;
          return this.NPCob_pri() + i;
        }, this)
        this.NPCAttBon_sec = ko.computed( () => {
          let i = this.NPC_arm() ? -5 : 0;
          return this.NPCob_sec() + i;
        }, this)
        this.NPCnumber = number_of_npc;
        this.prim_weap_in_use = ko.observable(true);
        number_of_npc++;
    }
}
