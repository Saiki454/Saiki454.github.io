const guess_table = document.getElementById('guesses');
const guess_button = document.getElementById('button')
const guess = document.getElementById('guess');
const img_hint = document.getElementById('img-hint');
const hint_img = document.getElementById('hint-img');
const fields = ["gift_name","tier","cost","keyword","is_fusion","is_enhance","pack"]
const sin_color = {"wrath":"#fe0000","lust":"#fb6500","sloth":"#f7c729","gluttony":"#9dfe00","gloom":"#0dc1eb","pride":"#0049d3","envy":"#9300db"}
const names = {};

var s = 0;
for(g of GiftData){
    names[g.gift_name] =s ;
    s++
}

var list = document.getElementById("list");
for(n in names){
    var o = document.createElement("option");
    o.innerText = n
    //o.value = n;
    o.id = n;
    list.appendChild(o);
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

var seed = cyrb128(today);
var rand = splitmix32(seed[0]);
//var rng = new Math.seedrandom();
var today_guess = GiftData[Math.floor(rand() * 374)].gift_name;
var today_guess_img = "";
if(today_guess == "Cultivation: Cut, File, Carve, Polish"){
    today_guess_img = "imgs/gifts/Cultivation_Cut,_File,_Carve,_Polish_Gift.png";
}else if (today_guess == "T-1B Octagonal Bolt"){
    today_guess_img = "imgs/gifts/T1B_Octagonal_Bolt_Gift.png"
}else if(today_guess == "Pocket Watch : Type L"){
    today_guess_img = "imgs/gifts/Pocket_Watch_-_Type_L_Gift.png"
}else if(today_guess == "Pocket Watch : Type Y"){
    today_guess_img = "imgs/gifts/Pocket_Watch_-_Type_Y_Gift.png"
}else if(today_guess == "Pocket Watch : Type E"){
    today_guess_img = "imgs/gifts/Pocket_Watch_-_Type_E_Gift.png"
}else if(today_guess == "Pocket Watch : Type P"){
    today_guess_img = "imgs/gifts/Pocket_Watch_-_Type_P_Gift.png"
}else{
    today_guess_img = "imgs/gifts/"+ today_guess.replaceAll(" ","_").toString() + "_Gift.png";
}

hint_img.src = today_guess_img;

var guesses = 0;
var guessed = false;


window.addEventListener('keydown',function(e){
    if(!guessed && guess.value !== "" && e.key == "Enter"){
        for(n in names){
            if (n == guess.value){
                guesses++;
                img_hint.innerText = "A blured grayscale image of the gift will be revealed in "+Math.max(10-guesses,0)+" guess(es)"
                if (guesses == 10 ){
                    hint_img.style.visibility = "visible";
                }
                if (n == today_guess){
                    guessed = true;
                    var img = "imgs/gifts/" + today_guess.replaceAll(" ","_").toString()+"_Gift.png";
                    confettea.burst({
                        particleCount: 100,
                        origin: { x: 0.5, y: 1.5 },
                        colors: [],
                        shapes: [],
                        emojis: [],
                        images: [img],
                        scalar: -1
                    });
                }
                //s++
                //console.log(names[i])+
                add_guess(n);
                list.removeChild(document.getElementById(n))
            }
        }
        guess.value = "";
        //e.stopImmediatePropagation();
    }
});

function add_guess(nafn){
    var hints = compare_guess(nafn)
    var tr = guess_table.insertRow(1);
    for(var field of fields){
        var td = tr.insertCell();
        var div_ = document.createElement('div');
        if (field == "gift_name"){
            var div = document.createElement('div');
            var img = document.createElement('img');
            if(nafn == "Cultivation: Cut, File, Carve, Polish"){
                img.src = "imgs/gifts/Cultivation_Cut,_File,_Carve,_Polish_Gift.png";
            }else if (nafn == "T-1B Octagonal Bolt"){
                img.src = "imgs/gifts/T1B_Octagonal_Bolt_Gift.png"
            }else if(nafn == "Pocket Watch : Type L"){
                img.src = "imgs/gifts/Pocket_Watch_-_Type_L_Gift.png"
            }else if(nafn == "Pocket Watch : Type Y"){
                img.src = "imgs/gifts/Pocket_Watch_-_Type_Y_Gift.png"
            }else if(nafn == "Pocket Watch : Type E"){
                img.src = "imgs/gifts/Pocket_Watch_-_Type_E_Gift.png"
            }else if(nafn == "Pocket Watch : Type P"){
                img.src = "imgs/gifts/Pocket_Watch_-_Type_P_Gift.png"
            }else{
                img.src = "imgs/gifts/"+ nafn.replaceAll(" ","_").toString() + "_Gift.png";
            }
            div.id = "gift-name";
            div.innerText = GiftData[names[nafn]][field];
            div.style.background = sin_color[GiftData[names[nafn]]["sin_affinity"]];
            td.appendChild(img);
            td.appendChild(div);
            //? td.innerHTML = "<img src='imgs/gifts/80px-Hellterfly’s_Dream_Gift.png'><br><div id='gift-name'>" + GiftData[names[nafn]][field] + "</div>";
            
            //? td.style.background = sin_color[GiftData[names[nafn]]["sin_affinity"]];
            //? td.id = "gift-name";
        }else if (field == "tier"){
            div_.id = "tier";
            div_.style.fontWeight = "bolder";
            div_.style.fontFamily = "sans-serif";
            div_.style.fontSize = "150%"
            if(GiftData[names[nafn]][field] == 4){
                div_.innerText = "IV";
            }else if(GiftData[names[nafn]][field] == 5){
                div_.innerText = "V";
            }else if(GiftData[names[nafn]][field] == 6){
                div_.style.color = "#aaff00"
                div_.innerText = "EX";
            }else{
                var t = ""
                for(i=0;i<GiftData[names[nafn]][field];i++){
                    var j = "I";
                    t = t+j;
                }
                div_.innerText = t;
            }
            if (hints[0] != ""){
                td.style.background = "rgb(223, 5, 89)";
                div_.innerHTML = hints[0]+div_.innerHTML;
            }else{
                td.style.background = "rgb(0, 154, 85)";
            }
            td.appendChild(div_);
        }else if (field == "cost"){
            div_.innerHTML = "<img src='imgs/other/cost.png'>" + GiftData[names[nafn]][field];
            div_.id = "cost";
            if (hints[1] != ""){
                td.style.background = "rgba(223,5,89,1)";
                div_.innerHTML = hints[1]+div_.innerHTML;
            }else{
                td.style.background = "rgba(0,154,85,1)";
            }
            td.appendChild(div_);
        }else if (field == "keyword") {
            div_.id = "keyword";
            td.style.color = "#ffffff";
            var div = document.createElement('div');
            var img = document.createElement('img');
            if (GiftData[names[nafn]][field] != "None"){    
                console.log("ppp")
                div_.innerHTML = "<img src='imgs/other/"+GiftData[names[nafn]][field].toLowerCase()+".png'>"+GiftData[names[nafn]][field];
            }else{
                div_.innerText = GiftData[names[nafn]][field];
            }

            if (!hints[2]){
                td.style.background = "rgba(223,5,89,1)";
            }else{
                td.style.background = "rgba(0,154,85,1)";
            }
            td.appendChild(div_);
        }else if (field == "is_fusion"){
            div_.id = "fusion";
            if (!hints[3]){
                td.style.background = "rgba(223,5,89,1)";
            }else{
                td.style.background = "rgba(0,154,85,1)";
            }
            
            if (GiftData[names[nafn]][field]){
                div_.innerText = "Yes";
            }else{
                div_.innerText = "No";
            }
            td.appendChild(div_);
        }else if (field == "is_enhance"){
            div_.id = "enhance";
            if (!hints[4]){
                td.style.background = "rgba(223,5,89,1)";
            }else{
                td.style.background = "rgba(0,154,85,1)";
            }
            if (GiftData[names[nafn]][field] == true){

                div_.innerText = "Yes";
            }else{
                div_.innerText = "No";
            }
            td.appendChild(div_);
        }else if (field == "pack"){
            div_.id = "pack";
            if (!hints[5]){
                td.style.background = "rgba(223,5,89,1)";
            }else{
                td.style.background = "rgba(0,154,85,1)";
            }
            div_.innerText = GiftData[names[nafn]].pack;
            td.appendChild(div_);
        }else {
            div_.style.color = "#ffffff";
            div_.innerHTML = GiftData[names[nafn]][field];
            td.appendChild(div_);
        }
    }
    console.log("yep")
}

function compare_guess(nafn){
    //* ↑ ↓
    var t = (Math.sign(GiftData[names[nafn]].tier - GiftData[names[today_guess]].tier) == 0)? "" :(Math.sign(GiftData[names[nafn]].tier - GiftData[names[today_guess]].tier) < 0)? "↑" : "↓";
    var c = (Math.sign(GiftData[names[nafn]].cost - GiftData[names[today_guess]].cost) == 0)? "" :(Math.sign(GiftData[names[nafn]].cost - GiftData[names[today_guess]].cost) < 0)? "↑" : "↓";
    var k = (GiftData[names[nafn]].keyword == GiftData[names[today_guess]].keyword);
    var f = (GiftData[names[nafn]].is_fusion == GiftData[names[today_guess]].is_fusion);
    var e = (GiftData[names[nafn]].is_enhance == GiftData[names[today_guess]].is_enhance);
    var p = (GiftData[names[nafn]].pack == GiftData[names[today_guess]].pack);

    return [t,c,k,f,e,p];
}

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function splitmix32(a) {
    return function() {
        a |= 0;
        a = a + 0x9e3779b9 | 0;
        let t = a ^ a >>> 16;
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15;
        t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }  
}