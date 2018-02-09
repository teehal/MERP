
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
    this.perception_bonus = ko.pureComputed( () => { return getSkills(this.char_lvl(), this.char_class())[4]; }, this);
    this.stalk_hide_bonus = ko.pureComputed( () => { console.log("stalk_hide " + getSkills(this.char_lvl(), this.char_class())[5]); return getSkills(this.char_lvl(), this.char_class())[5]; }, this);
    this.char_2stw = ko.observable();
    var self = this;
    this.RemovedNPC = ko.observableArray();
    this.AvailableClasses = ko.observableArray(Classes);
    this.AvailableRaces = ko.observable(Races);
    this.NPCSkills = ko.observableArray();
    this.NPCSkills.push({'SkillName':'Perception', 'SkillBonus':this.perception_bonus});
    this.NPCSkills.push({'SkillName':'Stalk and hide', 'SkillBonus':this.stalk_hide_bonus});
    this.NPCskillsArray;
    this.NPCTextFile = ko.observable();
    let jsonData = [];

    this.NewCharacter = () => {
        FormatSkills(this.NPCSkills, [{'SkillName':'Stalk and hide', 'SkillBonus':this.stalk_hide_bonus},
          {'SkillName':'Stalk and hide', 'SkillBonus':this.stalk_hide_bonus}]);
        let temp_value = this.create_new() ? false : true;
        this.create_new( temp_value );
        this.char_armor('null');
        this.char_class('null');
        this.char_race('null');
        this.char_1stw('null');
        this.char_hp();
        this.char_2stw('null');
    };

    this.AddCharacter = () => {
        this.NPCskillsArray = [];
        let skills = JSON.parse(ko.toJSON(this.NPCSkills));

        for ( let i = 0; i < skills.length; i++ )
          this.NPCskillsArray.push( {'SkillName':skills[i].SkillName, 'SkillBonus':skills[i].SkillBonus} );

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
        let tempNPC = new NPC(name,race,prof,lvl,ob, ob_sec, db,hp,arm,aarm,this.weap);
        tempNPC.SkillArray = this.NPCskillsArray;
        self.NPClist.push(tempNPC);
    };


    this.AddSkill = () => {
      let d = document;
      let skill_name = d.getElementById('skill_name').value;
      let skill_bonus = d.getElementById('skill_bonus').value;
      this.NPCSkills.push({'SkillName':skill_name, 'SkillBonus':skill_bonus});
      this.NPCSkills.sort( (left, right) => {
        return left.SkillName.toUpperCase() == right.SkillName.toUpperCase() ? 0
          : ( left.SkillName.toUpperCase() < right.SkillName.toUpperCase() ? -1 : 1)
      });
      d.getElementById('skill_name').value = '';
      d.getElementById('skill_bonus').value = '';
    };

    this.Damage = (NPC) => {
        let dmg = document.getElementById('damage' + NPC.NPCnumber).value;
        NPC.NPChp( NPC.NPChp() - dmg);

        if ( NPC.NPChp() <= 0 )
          NPC.NPC_dead(true);
    };

    this.Export = () => {
      console.log("Export");
      jsonData = ko.toJSON(this.NPClist);
      console.log("Json " + jsonData);
      let dataBlob = new Blob([jsonData], {type:"text/plain"});
      let dataBlobURL = window.URL.createObjectURL(dataBlob);
      let downloadLink = document.createElement("a");
      downloadLink.download = 'MERP_NPCs.txt';
      downloadLink.innerHTML = "Save file";
      downloadLink.href = dataBlobURL;
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);

      downloadLink.click();
    };

    this.Heal = (NPC) => {
      let hl = document.getElementById('heal' + NPC.NPCnumber).value;
      let hp_hl = NPC.NPChp() + Number(hl);
      NPC.NPChp( (hp_hl > NPC.NPChp_orig) ? NPC.NPChp_orig : hp_hl );
      if ( NPC.NPChp() > 0 && NPC.NPC_dead ) {
        NPC.NPC_dead(false);
      }
    };

    this.Import = () => {
      let d = document.getElementById('NPCFile');
      let NPCsFromFile;
      let fileToLoad = d.files[0];
      let fileReader = new FileReader();
      let parsed = [];

      let testF = (Reader) => {
        return new Promise((resolve, reject) => {
          Reader.readAsText(fileToLoad, "UTF-8");

          Reader.onload = () => {
            resolve(Reader.result);
          };
          Reader.onerror = () => {
            reject('Error');
          };
        });
      };
      //fileReader.onload = (fileLoadedEvent) => {
      //    textFromNPCFile = fileLoadedEvent.target.result;
      //};
      NPCsFromFile = testF(fileReader).then( JSON.parse).then( (response) => {
      ProcessData(response, this.NPClist);
      });


      console.log("Import");

    //  console.log("parsed " + textFromNPCFile);

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
      let tempNPC = new NPC(Nn, Nr, Nc, Nl, No, Nos, Nd, Nh, Na, Naa, Nw);
      tempNPC.SkillArray = tmp_arr[0].SkillArray;
      this.NPClist.push( tempNPC );
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

    this.RemoveSkill = (skill) => {
      let i = this.NPCSkills.indexOf(skill);
      this.NPCSkills.splice(i, 1);
    };

    this.NPCcreator = () => {
      console.log("NPCcreator");
    };
}
