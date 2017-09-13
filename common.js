function preProcessText(text) {
    var aText = [];
    text = text.trim();
    var aTempString = text.split(/\n/);
    for(var i = 0; i < aTempString.length; i++){
        var aTemp = (aTempString[i].trim()).split(/[\s\t\_.-]/);
        aText[i] = [];
        for(var j = 0; j< aTemp.length; j++){
            aText[i].push(aTemp[j]);
        }
    }
    return aText;
}

function wrapText(text,limit,test = false) {
    var aResult = [];
    var aText = preProcessText(text);
    for(var i = 0; i < aText.length; i++){
        aResult[i] = [];
        var tTemp = '';
        for(var j = 0; j< aText[i].length; j++){
            if((tTemp + aText[i][j]).length > limit){
                if(tTemp != '')
                    aResult[i].push(tTemp.trim());
                tTemp = aText[i][j] + " ";
            } else {
                tTemp += aText[i][j] + " ";
            }
            if(j == aText[i].length - 1){
                aResult[i].push(tTemp.trim());
            }
        }
    }
    if(test){
        return aResult;
    }
    document.getElementById("result").innerHTML = '';
    for(var i = 0; i< aResult.length; i++){
        document.getElementById("result").innerHTML += (document.getElementById("result").innerHTML != '') ? "<br>" : "";
        document.getElementById("result").innerHTML += aResult[i];
    }
    document.getElementById("result").innerHTML = "<pre>" + document.getElementById("result").innerHTML + "</pre>";
}

function clickAction() {
    var text = document.querySelector('#text').value;
    var limit = document.querySelector('#limit').value;
    if(text.length < 0){
        alert("Text field must be require.");
        return 0;
    }
    wrapText(text, limit);
}
function unitTest() {
    var text = "Công ty cổ phần thương mại";
    var aLimit = [5,9,12];
    var aCheck = [
        ["Công","ty cổ","phần","thương","mại"],
        ["Công ty","cổ phần","thương","mại"],
        ["Công ty cổ","phần thương","mại"]
    ];
    document.getElementById("unittest").getElementsByTagName("tbody")[0].innerHTML = '';
    for(var i = 0; i < aLimit.length; i++){
        var aResult = wrapText(text, aLimit[i], true);
        var html = '<tr>';
        html += "<td style='text-align: center'>"+aLimit[i]+"</td>";
        html += "<td>"+aCheck[i]+"</td>";
        html += "<td>"+aResult+"</td>";
        if(aCheck[i].toString() == aResult.toString()){
            html += "<td style='text-align: center'>Passed</td>";
        } else {
            html += "<td style='text-align: center'>Failed</td>";
        }
        html += "</tr>";
        document.getElementById("unittest").getElementsByTagName("tbody")[0].innerHTML += html;
    }

}