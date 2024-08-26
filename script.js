function encode() {
    var input = getInput();

    if (input == ''){
        clearOutput();
        return;
    }else{
        var output = encoded(input);
        updateOutput(output);
    }
}

function decode() {
    var input = getInput();

    if (input == ''){
        clearOutput();
        return;
    }else{
        var output = decoded(input);
        updateOutput(output);
    }
}

function copyOutput() {
    var output = document.getElementById("output").value;
    var copy = document.getElementsByClassName("copy-txt")[0];
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(output).then(
                () => {
                    copy.innerHTML = "Copiado!";
                    setTimeout(function(){
                        copy.innerHTML = "Copiar";
                    }, 800);
                },
                () => {
                  console.error("Unable to copy to clipboard.");
                },
            );
        }
    });
}

function updateOutput(text){
    var decodedOutput = document.getElementsByClassName("output-result");
    var empty = document.getElementsByClassName("empty-output");
    var output = document.getElementById("output");
    empty[0].style.display = "none"; 
    decodedOutput[0].style.display = "block";
    decodedOutput[0].style.height = '100%';
    output.innerHTML = text;
}

function clearOutput(){
    var decodedOutput = document.getElementsByClassName("output-result");
    var empty = document.getElementsByClassName("empty-output");
    empty[0].style.display = "block"; 
    decodedOutput[0].style.display = "none";
}

function getInput() {
    var input = document.getElementById("input").value;
    return input;
}

function encoded(text){
    var keys = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat',
    }
    var encodedText = '';
    for (var i = 0; i < text.length; i++){
        if (text[i] in keys){
            encodedText += keys[text[i]];
        } else {
            encodedText += text[i];
        }
    }

    return encodedText;
}

function decoded(text){
    var subA, subE, subI, subO, subU;

    subA = subE = subI = subO = subU = '';
    
    for (var i = 0; i < text.length; i++){
        var result = trackDecode(text[i], text, subA, 'ai', 'a');
        subA = result['subText'];
        if (text != result['text']){
            subA = subE = subI = subO = subU = '';
            text = result['text'];
        }
        
        result = trackDecode(text[i], text, subE, 'enter', 'e');
        subE = result['subText'];
        if (text != result['text']){
            subA = subE = subI = subO = subU = '';
            text = result['text'];
            i -= 3;
        }
        
        result = trackDecode(text[i], text, subI, 'imes', 'i');
        subI = result['subText'];
        if (text != result['text']){
            subA = subE = subI = subO = subU = '';
            text = result['text'];
            i -= 2;
        }

        result = trackDecode(text[i], text, subO, 'ober', 'o');
        subO = result['subText'];
        if (text != result['text']){
            subA = subE = subI = subO = subU = '';
            text = result['text'];
            i -= 2;
        }

        result = trackDecode(text[i], text, subU, 'ufat', 'u');
        subU = result['subText'];
        if (text != result['text']){
            subA = subE = subI = subO = subU = '';
            text = result['text'];
            i -= 2;
        }
    }

    return text;
}

function trackDecode(input, text, subText, key, decodedKey){
    var result = {};
    result['text'] = text;

    if (key.startsWith(subText + input))
        subText += input;
    else
        subText = '';
    result['subText'] = subText;

    if (subText == key){
        text = text.replace(subText, decodedKey);
        result['text'] = text;
        result['subText'] = '';
    }

    return result;
}

