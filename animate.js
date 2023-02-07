function postToChat(option){
    let dice = "d4"; //Tiny
    let bonus = "4";//+4 de dano
    //let damage = "";
    /*
    Tiny	+8 to hit, 1d4 + 4 damage
    Small	+6 to hit, 1d8 + 2 damage
    Medium	+5 to hit, 2d6 + 1 damage
    Large	+6 to hit, 2d10 + 2 damage
    Huge	+8 to hit, 2d12 + 4 damage
    */
    
    //let damage = "slashing";
    let ataques = "10";
    let damage = "bludgeoning";
    let tamanho = "Tiny";
    if (option == 1){ataques = 1} 
    else if (option == 2){ataques = 2}
    else if (option == 3){ataques = 3}
    else if (option == 4){ataques = 4}
    else if (option == 5){ataques = 5}
    else if (option == 6){ataques = 6}
    else if (option == 7){ataques = 7}
    else if (option == 8){ataques = 8}
    else if (option == 9){ataques = 9}
    else if (option == 10){ataques = 10}
    console.log (dice);
    
    let chatData = {//Criar mensagem char
        user: game.user._id,
        speaker: {alias: "Animate Objects"},
        content: `<i>... totalizando:</i> [[${ataques}${dice}+${bonus}*${ataques} ]] <i>${damage}  damage.</i>`
    };
        ChatMessage.create(chatData, {});
    };

let d = new Dialog({ //dialog object creates the window with all the buttons
    title: "Animate Objects Damage",
    content: `<h2>How many hit?<h2>`,
    buttons: {
    one: {
        label: "1",
        callback: () => {postToChat(1)}
    },
    two: {
        label: "2",
        callback: () => {postToChat(2)}
    },
    three: {
        label: "3",
        callback: () => {postToChat(3)}
    },
    four: {
        label: "4",
        callback: () => {postToChat(4)}
    },
    five: {
        label: "5",
        callback: () => {postToChat(5)}
    },
    six: {
        label: "6",
        callback: () => {postToChat(6)}
    },
    seven: {
        label: "7",
        callback: () => {postToChat(7)}
    },
    eight: {
        label: "8",
        callback: () => {postToChat(8)}
    },
    nine: {
        label: "9",
        callback: () => {postToChat(9)}
    },
    ten: {
        label: "10",
        callback: () => {postToChat(10)}
    },
    
},
default: "one",
render: html => console.log("Register interactivity in the rendered dialog"),
close: html => console.log("This always is logged no matter which option is chosen")
});

d.render(true);