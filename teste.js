//Animate Objects attack Macro by Lailor
//Configs
//set to 0 for no AC controll for your dm
let dmAcCheck = 1;

//Global Variables
let currentActor = "";
let currentTarget = "";
let attacksAos = "";
let mod = "";
let aosMod = 0; 
let aosDmg = 0;
let aosDie = "";
let aoSize = "";
let aosDieN = 1
let damageType = "";
let atkMode = "";

main ()

//Functions
async function main() {
//AO Token selected
        let selected = canvas.tokens.controlled;
        console.log(selected.length);
        if(selected.length ==0 || selected.length >1) {
            ui.notifications.error("Please select your Token");
          return;  
        }
//Target selected
        let targets = Array.from(game.user.targets);
            console.log(targets);
            if(targets.length ==0 || targets.length >1) {
                ui.notifications.error("Please select 1 Target");
            return;
            }
        currentActor = selected[0].actor;
        currentTarget = targets[0].actor;
//CSS + Popup
    let i = 0
    let numberAos = ""
        for(i = 0; i<20; i++){
            numberAos +=`<option value=${i+1}>${i+1}</option>`
        }
//default Number of AOs
        numberAos += '<option value="10" selected disabled hidden>10</option>'
//dmgtyp 
    let dmgTypes = `<option value=Bludgeoning}>Bludgeoning</option><option value=Slashing}>Slashing</option><option value=Piercing>Piercing</option>`
//PopupTemplate
    let dialogTemplate = `
    <h1><center>Animate Objects Attack </center></h1>
    <div style="display:flex">
      <div  style="font-size:19px;flex:3"><center>Number :    </center><p><center><select id="attacksAos">${numberAos}</select></center></p>                           </div>
      <div  style="font-size:19px;flex:3"><center>Damage Type:    </center><p><center><select id="dmgTypes">${dmgTypes}</select></center></p>                            </div>
      <span style="font-size:19px;flex:3"><center>AC Modifier: </center><p><center><input  id="mod" type="number" style="width:80px" value=0 /></center></p> </span>
      </div>
      <div>
      <center>
      <fieldset style="border: 0;font-size:16px ">
      <input type="radio" id="tiny" name="size" value="tiny" checked="checked" position: relative>
      <label> Tiny </label> 
      <input type="radio" id="small" name="size" value="small" position: relative>
      <label> Small</label>
      <input type="radio" id="medium" name="size" value="medium" position: relative>
      <labeL>Medium</label> 
      <input type="radio" id="large" name="size" value="large" position: relative>
      <label>Large</label> 
      <input type="radio" id="huge" name="size" value="huge" position: relative>
      <label> Huge</label> 
      </fieldset>
      </center>
  </div>
    `
    new Dialog({
        title: "Animate Objects Attack",
        content: dialogTemplate,
        buttons: {
            rollAtkDis: {
                label: "Disadvantage",                
                callback: (html) => {
                    attacksAos = html.find("#attacksAos")[0].value;
                    damageType = html.find("#dmgTypes")[0].value;
                    mod = html.find("#mod")[0].value;
                    if (html.find("#tiny")[0].checked === true){aoSize = "tiny"}
                        else if (html.find("#small")[0].checked === true){aoSize = "small"}
                            else if (html.find("#medium")[0].checked === true){aoSize = "medium"}
                                else if (html.find("#large")[0].checked === true){aoSize = "large"}
                                    else if (html.find("#huge")[0].checked === true){aoSize = "huge"};
                    atkMode = "attacked with Disadvantage";
                    atkFunc('2d20kl', mod);
                }
            },
            rollAtk: {
                label: "Roll Attack",               
                callback: (html) => {
                    attacksAos = html.find("#attacksAos")[0].value;
                    damageType = html.find("#dmgTypes")[0].value;
                    mod = html.find("#mod")[0].value;
                    if (html.find("#tiny")[0].checked === true){aoSize = "tiny"}
                        else if (html.find("#small")[0].checked === true){aoSize = "small"}
                            else if (html.find("#medium")[0].checked === true){aoSize = "medium"}
                                else if (html.find("#large")[0].checked === true){aoSize = "large"}
                                    else if (html.find("#huge")[0].checked === true){aoSize = "huge"};
                    atkMode = "attacked normal";
                    atkFunc('1d20', mod);
                }
            },
            rollAtkAdv: {
                label: "Advantage",                
                callback: (html) => {
                    attacksAos = html.find("#attacksAos")[0].value;
                    damageType = html.find("#dmgTypes")[0].value;
                    mod = html.find("#mod")[0].value;
                    if (html.find("#tiny")[0].checked === true){aoSize = "tiny"}
                        else if (html.find("#small")[0].checked === true){aoSize = "small"}
                            else if (html.find("#medium")[0].checked === true){aoSize = "medium"}
                                else if (html.find("#large")[0].checked === true){aoSize = "large"}
                                    else if (html.find("#huge")[0].checked === true){aoSize = "huge"};
                    atkMode = "attacked with Advantage";
                    atkFunc('2d20kh', mod);
                }
            }    
        }
    }).render(true);
}
async function atkFunc(aoHitRoll, mod) {
//Ac check target
    const actorMidi = game.actors.get(args[0].actor._id);
    const tokenMidi = canvas.tokens.get(args[0].tokenId);
    const itemMidi = args[0].item;
    let msgHistory = Object.values(MidiQOL.Workflow.workflows).filter(i=> i.actor.id === actorMidi.id && i.item?.name != itemMidi.name && i.workflowType === "Workflow");
    let mainTarget = canvas.tokens.get(args[0].hitTargets[0]._id);
    let enemieAC = currentTarget.data.data.attributes.ac.value + +mod;
    let nAtkDice = 0;
    let nAtkCrits = 0;
    let atks = 0;
    let allHitRolls = "";
    if (aoSize === "tiny"){
        aosMod = 8; 
        aosDmg = 4;
        aosDie = "d4";
        aosDieN = 1;
    } else if (aoSize === "small"){
            aosMod = 6; 
            aosDmg = 2;
            aosDie = "d8";
            aosDieN = 1;
        } else if (aoSize === "medium"){
                aosMod = 5; 
                aosDmg = 1;
                aosDie = "d6";
                aosDieN = 2;
            } else if (aoSize === "large"){
                    aosMod = 6; 
                    aosDmg = 2;
                    aosDie = "d10";
                    aosDieN = 2;
                } else if (aoSize === "huge"){
                        aosMod = 8; 
                        aosDmg = 4;
                        aosDie = "d12";
                        aosDieN = 2;
                    }
    for (atks = 0; atks < attacksAos; atks++) {
        let r1 = new Roll(aoHitRoll).roll();
        if (r1.result == 1){
            allHitRolls +=`<li class="roll die d20 min">` + +r1.result + "</li> "; 
        }
            else if (r1.result == 20){
                allHitRolls +=`<li class="roll die d20 max">` + +r1.result + "</li> ";   
            }
            else {
                    allHitRolls +=`<li class="roll die d20">` + +r1.result + "</li> ";
                }
        if (+r1.results == 20) {
            nAtkDice = nAtkDice + 2;
            nAtkCrits = nAtkCrits + 1;
        }
        else {
            if (+r1.results + +aosMod >= enemieAC) {
                nAtkDice = nAtkDice + 1;
            }
        }
    }
//Chat Update and Attackroll
    let nHits = nAtkDice - nAtkCrits;
    let chatContent = ` <span>
                            <div class="dice-roll">
                                <div class="dice-result">
                                    <div class="dice-formula" style="font-size:15px; font-weight: bold">${atks} ${atkMode}</div>
                                        <div class="dice-tooltip" style="display: none;">
                                            <div class="dice">
                                                <ol class="dice-rolls">${allHitRolls}</ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style="font-size:18px; text-align: center"">${nAtkDice - nAtkCrits} attacks with ${aoSize} AOs hit     </p>
                            <p style="font-size:18px; text-align: center">${nAtkCrits} attacks crit!              </p>
                        </span>
                      `;
    const flavor = `${currentTarget.data.name} AC is`;
    if (dmAcCheck == 1){
        let acRoll = new Roll(`${enemieAC}`).roll().toMessage({ rollMode: 'blindroll', flavor: flavor, speaker });
    };   
    const chatMessage = await game.messages.get(args[0].itemCardId);
    let content = await duplicate(chatMessage.data.content);
    const searchString =  `<div class="midi-qol-attack-roll"><div class="end-midi-qol-attack-roll">`;
    const replaceString = `<div class="midi-qol-attack-roll"><div class="end-midi-qol-attack-roll">${chatContent}`;
    content = await content.replace(searchString, replaceString);
    await chatMessage.update({content: content});
    let nAtkbns = nHits * aosDmg;
    let damageRoll = new Roll(`${nAtkDice * aosDieN}${aosDie} +${nAtkbns}`).roll();
    new MidiQOL.DamageOnlyWorkflow(actorMidi, tokenMidi, damageRoll.total, damageType, [mainTarget], damageRoll, {flavor: `(${damageType})`, itemCardId: args[0].itemCardId});
}