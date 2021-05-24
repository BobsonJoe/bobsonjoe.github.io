function Display (message){
    var o = document.getElementById("output");
    var f = document.createElement("p");
    f.setAttribute("class", "output_title");
    o.appendChild(f);
    f.append(message);
    f = document.createElement("p");
    f.setAttribute("class", "output_box");
    o.appendChild(f);
    return f;
}

function Error(message){
	var o = document.getElementById("output");
    var f = document.createElement("p");
    f.setAttribute("class", "output_title");
    o.appendChild(f);
    f.append("Error");
	f = document.createElement("p");
    f.setAttribute("class", "error_box");
    o.appendChild(f);
    f.append(message);
}

function Submission (form) {
    document.getElementById("output").innerHTML = "";
    var e = form.experimental.value;
    var respect = form.respect_to.value;
    var sh = shunting_yard(e);
    var ptr = parse(sh);
	if(respect == ""){
		for(var i = 0; i < 26; i ++){
			if(global_vars[i] !== 0 && respect != "x"){
				respect = String.fromCharCode(i + 'a'.charCodeAt(0));
			}
		}
	}
	var str = "Your input";
    str += ", with respect to ";
	str += respect;
    str += ":";
    ptr.print(Display(str));
    ptr.diff(respect);
    Display("In reverse Polish:").append(sh);
    ptr.derivative.print(Display("Derivative:"));
}

function Roots (form) {
	document.getElementById("output").innerHTML = "";
	var func = form.func.value;
	var sh = shunting_yard(func);
	var respect = form.wrt.value;
	var flag = false;
	var ptr = parse(sh);
	if(respect === ""){
		for(var i = 0; i < 26; i ++){
			if(global_vars[i] !== 0){
				if(respect !== ""){
					flag = true;
					break;
				}
				respect = String.fromCharCode(i + 'a'.charCodeAt(0));
			}
		}
	}
	if(flag === false){
		ptr.print(Display("Your input"));
		var x = Newton(ptr, respect, parseInt(form.guess.value), 30);
		var str = "Root, near ";
		str += form.guess.value;
		Display(str).append(x);
	}
	else{
		Error("too many variables");
	}
}
