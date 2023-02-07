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
let personagem ="Toruviel";
let ataMod = "";

main ()

//Functions
async function main() {
//CSS + Popup
    let i = 0
    let numberAos = ""
        for(i = 0; i<10; i++){
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
        <div hidden style="font-size:19px;flex:3"><center>Damage Type:    </center><p><center><select id="dmgTypes">${dmgTypes}</select></center></p>                            </div>
        <span hidden style="font-size:19px;flex:3"><center>AC Modifier: </center><p><center><input  id="mod" type="number" style="width:80px" value=0 /></center></p> </span>
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
                    if (html.find("#tiny")[0].checked === true){aoSize = "Tiny"}
                        else if (html.find("#small")[0].checked === true){aoSize = "Small"}
                            else if (html.find("#medium")[0].checked === true){aoSize = "Medium"}
                                else if (html.find("#large")[0].checked === true){aoSize = "Large"}
                                    else if (html.find("#huge")[0].checked === true){aoSize = "Huge"};
                    
                    atkMode = "attacked with Disadvantage";
                    //atkFunc('2d20kl', aoSize);
                    if(aoSize=="tiny"||aoSize == "huge"){ataMod = "8"}
                    else if(aoSize=="small"||aoSize == "large"){ataMod = "6"}
                    else if(aoSize=="medium"){ataMod = "5"}
                    repeteAtaque(attacksAos,'2d20kl', aoSize, ataMod);
                }
            },
            rollAtk: {
                label: "Roll Attack",               
                callback: (html) => {
                    attacksAos = html.find("#attacksAos")[0].value;
                    damageType = html.find("#dmgTypes")[0].value;
                    mod = html.find("#mod")[0].value;
                    if (html.find("#tiny")[0].checked === true){aoSize = "Tiny"}
                        else if (html.find("#small")[0].checked === true){aoSize = "Small"}
                            else if (html.find("#medium")[0].checked === true){aoSize = "Medium"}
                                else if (html.find("#large")[0].checked === true){aoSize = "Large"}
                                    else if (html.find("#huge")[0].checked === true){aoSize = "Huge"};
                    
                    atkMode = "attacked normal";
                    //atkFunc('1d20', aoSize);
                    if(aoSize=="tiny"||aoSize == "huge"){ataMod = "8"}
                    else if(aoSize=="small"||aoSize == "large"){ataMod = "6"}
                    else if(aoSize=="medium"){ataMod = "5"}
                    repeteAtaque(attacksAos,'1d20', aoSize, ataMod);
                    
                }
            },
            rollAtkAdv: {
                label: "Advantage",                
                callback: (html) => {
                    attacksAos = html.find("#attacksAos")[0].value;
                    damageType = html.find("#dmgTypes")[0].value;
                    mod = html.find("#mod")[0].value;
                    if (html.find("#tiny")[0].checked === true){aoSize = "Tiny"}
                        else if (html.find("#small")[0].checked === true){aoSize = "Small"}
                            else if (html.find("#medium")[0].checked === true){aoSize = "Medium"}
                                else if (html.find("#large")[0].checked === true){aoSize = "Large"}
                                    else if (html.find("#huge")[0].checked === true){aoSize = "Huge"};
                    
                    atkMode = "attacked with Advantage";
                    //atkFunc('2d20kh', aoSize);
                    if(aoSize=="Tiny"||aoSize == "Huge"){ataMod = "8"}
                    else if(aoSize=="Ssmall"||aoSize == "Large"){ataMod = "6"}
                    else if(aoSize=="Medium"){ataMod = "5"}
                    repeteAtaque(attacksAos,'2d20kh', aoSize, ataMod);
                }
            }    
        }
    }).render(true);
}

//attacksAos = quantidade de ataques selecionados
async function repeteAtaque (attacksAos,aoHitRoll, aoSize, ataMod){
    let chatDataIntro = {//Criar mensagem char
        user: game.user._id,
        speaker: {alias: "Animate Objects"},
        //content: `<b>[[${aoHitRoll} + ${mod}]] Creatures:</b> aoHitRoll + ${mod}`
        //content: `<i>Os objetos animados (${aoSize}) de ${personagem} atacam tal criatura...</i> `
        content: `<i>${personagem} se concentra e seus objetos animados (${aoSize}) atacam ...</i> `
    };
    ChatMessage.create(chatDataIntro, {});
    for(atks = 1; atks <= attacksAos; atks++){
        atkFunc(aoHitRoll, ataMod, atks);
    }
}


//async function atkFunc(aoHitRoll, mod) {
//async function atkFunc(aoHitRoll, aoSize) { //Passa se é vantagem ou não e o modificador do tamanho
async function atkFunc(aoHitRoll, aoSize,atks) { //APENAS TESTE
    let chatData = {//Criar mensagem char
        user: game.user._id,
        speaker: {alias: "Animate Objects"},
        //content: `<b>[[${aoHitRoll} + ${mod}]] Creatures:</b> aoHitRoll + ${mod}`
        content: `<b><i>${atks}º Ataque:</i></b> [[${aoHitRoll} + ${aoSize}]]`
    };
    ChatMessage.create(chatData, {});
    /*
    for(atks = 0; atks < attacksAos; atks++){
        //aoHitRoll, mod
        [[d20]]
    }
    */
}