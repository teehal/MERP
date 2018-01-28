
const Classes = ['Animist', 'Bard', 'Mage', 'Ranger', 'Scout', 'Warrior'];
const Races = ['Dwarf', 'Elf', 'Hobbit', 'Human'];
const Weapons = ['Dagger', 'Longsword', 'Long Bow', 'Quarterstaff', 'Short Sword'];
const Armor = ['No Armor', 'Soft Leather', 'Rigid Leather', 'Chain Mail', 'Plate'];
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
        this.NPCarmor = this.ModifyArmor(armor);
        this.NPCaddarmor = addarmor; // Array [bool,bool,bool,bool] => [shield, helmet, arm armor, leg armor]
        this.NPCweapons = this.ModifyWeapons(weapons);  // Array, [primary weapon, secondary weapon]
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

    ModifyWeapons(weaponlist) {
        this.newlist=[];
        if ( !Array.isArray(weaponlist) ) {
            console.log("Not array.");
            return weaponlist;
        }

        for ( let i of weaponlist ) {
                console.log(" i " + i );
            switch(i) {
                case 'lsword':
                    this.newlist.push('Longsword');
                    break;
                case 'ssword':
                    this.newlist.push('Short sword');
                    break;
                case 'dagger':
                    this.newlist.push('Dagger');
                    break;
                case 'qstaff':
                    this.newlist.push('Quarterstaff');
                    break;
                case 'lbow':
                    this.newlist.push('Long bow');
                    break;
                default:
                    this.newlist.push(i);
            }
        }
        console.log(" mod weap " + typeof( this.newlist ) + " " + this.newlist[0] );
        return this.newlist;
    }

    ModifyArmor(arm) {
        let armo = "";
        switch(arm) {
            case 'noarmor':
                armo = 'No armor';
                break;
            case 'sleather':
                armo = 'Soft leather';
                break;
            case 'rleather':
                armo = 'Rigid leather';
                break;
            case 'chain':
                armo = 'Chain mail';
                break;
            case 'plate':
                armo = 'Plate mail';
                break;
            default:
                armo = arm;
        }
        return armo;
    }
}

function viewModel() {
    this.create_new = ko.observable(false);
    this.NPClist = ko.observableArray();
    this.char_class = ko.observable();
    this.char_lvl = ko.observable(1);
    this.char_race = ko.observable();
    this.char_1stw = ko.observable();
    this.char_armor = ko.observable();
    this.char_hp = ko.pureComputed( () => { let i = getSkills(this.char_lvl(), this.char_class())[0];
                                        return i;}, this);
    this.char_db = ko.pureComputed( () => { let i = getSkills(this.char_lvl(), this.char_class())[1];
                                        return i;}, this);
    this.char_ob_pri = ko.pureComputed( () => { let i = getSkills(this.char_lvl(), this.char_class())[2];
                                        return i;}, this);
    this.char_ob_sec = ko.pureComputed( () => { let i = getSkills(this.char_lvl(), this.char_class())[3];
                                        return i;}, this);
    this.char_2stw = ko.observable();
    var self = this;
    this.RemovedNPC = ko.observableArray();
    this.AvailableClasses = ko.observableArray(Classes);
    this.AvailableRaces = ko.observable(Races);

    this.NewCharacter = () => {
        let temp_value = self.create_new() ? false : true;
        self.create_new( temp_value );
        this.char_armor('null');
        this.char_class('null');
        this.char_race('null');
        this.char_1stw('null');
        this.char_hp();
        this.char_2stw('null');
    };

    this.AddCharacter = () => {
        let d = document;
        this.weap = [];
        let name = d.getElementById('npcname').value;
        let prof = d.getElementById('npcclass').value;
        let race = d.getElementById('npcrace').value;
        let lvl = d.getElementById('npclvl').value;
        let hp = d.getElementById('npchp').value;
        let ob = d.getElementById('npcofb').value;
        let ob_sec = d.getElementById('npcofb_sec').value;
        let db = d.getElementById('npcdef').value;
        let arm = d.getElementById('armor').value;
        let aarm = [ d.getElementById('shield').checked, d.getElementById('helmet').checked, d.getElementById('aarmor').checked, d.getElementById('larmor').checked ];
        this.weap.push( d.getElementById('primweap').value );
        this.weap.push( d.getElementById('secweap').value );

        self.NPClist.push( new NPC(name,race,prof,lvl,ob, ob_sec, db,hp,arm,aarm,this.weap, document) );

    };

    this.Damage = (NPC) => {
        let dmg = document.getElementById('damage' + NPC.NPCnumber).value;
        NPC.NPChp( NPC.NPChp() - dmg);
        if ( NPC.NPChp() <= 0 ) {
          NPC.NPC_dead(true);
        }
    };

    this.Heal = (NPC) => {
      let hl = document.getElementById('heal' + NPC.NPCnumber).value;
      let hp_hl = NPC.NPChp() + Number(hl);
      NPC.NPChp( (hp_hl > NPC.NPChp_orig) ? NPC.NPChp_orig : hp_hl );
      if ( NPC.NPChp() > 0 && NPC.NPC_dead ) {
        NPC.NPC_dead(false);
      }
    };

    this.Edit = (NPC) => {
      console.log("Edit");
    };

    this.Duplicate = (NPCdup) => {
      let i = this.NPClist.indexOf(NPCdup);
      let tmp_arr = this.NPClist.slice(i, i+1);
      let Nn = tmp_arr[0].NPCname;
      let Nr = tmp_arr[0].NPCrace;
      let Nc = tmp_arr[0].NPCclass;
      let Nl = tmp_arr[0].NPClvl;
      let No = tmp_arr[0].NPCob_orig_pri;
      let Nos = tmp_arr[0].NPCob_orig_sec;
      let Nd = tmp_arr[0].NPCdb_orig;
      let Nh = tmp_arr[0].NPChp_orig;
      let Na = tmp_arr[0].NPCarmor;
      let Naa = tmp_arr[0].NPCaddarmor;
      let Nw = tmp_arr[0].NPCweapons;
      this.NPClist.push( new NPC(Nn, Nr, Nc, Nl, No, Nos, Nd, Nh, Na, Naa, Nw) );
    };

    this.Remove = (NPC) => {
      let i = this.NPClist.indexOf(NPC);
      this.RemovedNPC.push(this.NPClist.splice(i,1));
      console.log( this.RemovedNPC()[0] )
    };

    this.ReturnNPC = () => {
      let tmp_arr = this.RemovedNPC.pop();
      this.NPClist.push( tmp_arr[0] );
    };

    this.Defend = (NPC) => {
      let d = Number(document.getElementById('defence' + NPC.NPCnumber).value);
      let i = NPC.NPCdb();
      let j = NPC.NPCprim_weap_use() ? NPC.NPCob_pri() : NPC.NPCob_sec();
      if ( d == 0 || isNaN(d) ) {
        NPC.NPCdb( Number(NPC.NPCdb_orig) );
        NPC.NPCob_pri( (i - NPC.NPCdb()) + NPC.NPCob_pri() );
        NPC.NPCob_sec( (i - NPC.NPCdb()) + NPC.NPCob_sec() );
        return;
      }
      if ( d > j ) {
        if ( j <= 0 ) {
          d = 0;
        }
        else {
          d = j;
        }
      }
      NPC.NPCdb( d + i );
      NPC.NPCob_pri( NPC.NPCob_pri() - d );
      NPC.NPCob_sec( NPC.NPCob_sec() - d );
    };

    this.Penalize = (NPC) => {
      let d = Number(document.getElementById('penalty' + NPC.NPCnumber).value);
      let i = NPC.NPCdb();
      let j = NPC.NPCob_pri();
      let j_s = NPC.NPCob_sec();
      let k = Number(NPC.NPCob_orig_pri);
      let k_s = Number(NPC.NPCob_orig_sec);
      let l = Number(NPC.NPCdb_orig);
      console.log(" l is i is d " +  l + i + d);
      if ( d == 0 || isNaN(d) ) {
        NPC.NPCob_pri( k - ( i - l ) );
        NPC.NPCob_sec( k_s - ( i - l ) );
        console.log("OB " + NPC.NPCob_pri());
        return;
      }
      if ( j - d < 0 && i - l != 0 ) {
        let tmp = Math.abs(j - d);
        console.log(tmp + " " + l);
        NPC.NPCdb( i - tmp >= l ? i - tmp : l);
        NPC.NPCob_pri( j + ( i - NPC.NPCdb() ) - d );
        NPC.NPCob_sec( j_s + ( i - NPC.NPCdb() ) - d );
        return;
      }
      NPC.NPCob_pri( j - d );
      NPC.NPCob_sec( j_s - d );
    };

    this.NPCcreator = () => {
      console.log("NPCcreator");
    };


}
