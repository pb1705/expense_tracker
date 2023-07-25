function addEventlistnertobutton(){document.getElementById("addexpensebtn").addEventListener('click',()=>{
    let div1= document.querySelector('.addexpense');
    div1.classList.remove("addexpense");
    let div2 = document.createElement("div")
    div2.classList.add("input-container");
    let divtitle = document.createElement("div")
    let divamount = document.createElement("div")
    let divdate = document.createElement("div")
    divtitle.classList.add("elements");
    divamount.classList.add("elements");
    divdate.classList.add("elements");
    let labeltitle= document.createElement("label");
    let labelamount= document.createElement("label");
    let labeldate= document.createElement("label");
    labeltitle.classList.add("form-titles")
    labelamount.classList.add("form-titles")
    labeldate.classList.add("form-titles")
    labeltitle.innerText ="Title";
    labelamount.innerText ="Amount";
    labeldate.innerText ="Date";
    let inputtitle = document.createElement("input");
    inputtitle.setAttribute("type","text");
    inputtitle.setAttribute("id","title");
    inputtitle.classList.add("form-control");
    inputtitle.setAttribute("placeholder","title");
    let inputamount = document.createElement("input");
    inputamount.setAttribute("type","text");
    inputamount.setAttribute("id","amount");
    inputamount.classList.add("form-control");
    inputamount.setAttribute("placeholder","0.01");

    let inputdate = document.createElement("input");
    inputdate.setAttribute("type","date");
    inputdate.setAttribute("id","date");
    inputdate.classList.add("form-control");
   divtitle.append(labeltitle);
   divtitle.append(inputtitle);
   div2.append(divtitle)
   divamount.append(labelamount);
   divamount.append(inputamount);
   div2.append(divamount)
   divdate.append(labeldate);
   divdate.append(inputdate);
   div2.append(divdate);
   div1.innerHTML="";
   div1.append(div2);
   let buttonsdiv =document.createElement('div');
   buttonsdiv.classList.add("buttons");
   let buttonclose = document.createElement("button");
   buttonclose.setAttribute("id","close");
   buttonclose.innerText ="Close";
   buttonsdiv.append(buttonclose);
   let buttonadd = document.createElement("button");
   buttonadd.setAttribute("id","add");
   buttonadd.innerText="Add Expense";
   buttonsdiv.append(buttonadd);
   div1.append(buttonsdiv);



document.querySelector("#add").addEventListener('click',()=>{
    let dateinput = document.querySelector("#date");
    let amountinput = document.querySelector("#amount");
    let titleinput = document.querySelector("#title");
    let date= dateinput.value;
    dateinput.value="";
    let years=localStorage.getItem("year");
    
    if(years==null){
        years = [];
        years.push(date.substr(0,4));
        
        localStorage.setItem("year",JSON.stringify(years));
        updateselctlistmain();
        
    }
    else{
        if(!(years.includes(date.substr(0,4)))){

        years = JSON.parse(years);
        years.push(date.substr(0,4));
        localStorage.setItem("year",JSON.stringify(years));
        updateselctlistmain();
        
        }
    }
    let dataofthatyear =localStorage.getItem(date.substr(0,4));
    // console.log(dataofthatyear)
    if(dataofthatyear==null){
        let data =[]
        let expenseobj =[]
        
        expenseobj.push(date)
        expenseobj.push(titleinput.value)
        expenseobj.push(amountinput.value)
        data.push(expenseobj)
        localStorage.setItem(date.substr(0,4),JSON.stringify(data));
        amountinput.value="";
        titleinput.value="";
        if(document.querySelector("#formselect").value==date.substr(0,4)){
            updategraphandhistory(date.substr(0,4));
        }
    }
    else{
        let data = JSON.parse(dataofthatyear);
        let expenseobj =[]
        
        expenseobj.push(date)
        expenseobj.push(titleinput.value)
        expenseobj.push(amountinput.value)
        data.push(expenseobj)
        localStorage.setItem(date.substr(0,4),JSON.stringify(data));
        amountinput.value="";
        titleinput.value="";
        if(document.querySelector("#formselect").value==date.substr(0,4)){
            console.log("ran")
            updategraphandhistory(date.substr(0,4));
        }
    }
   
})
document.querySelector("#close").addEventListener("click",()=>{
    let div1  =document.querySelector(".roundcorners")
    div1.innerHTML="";
    div1.classList.add("addexpense");
    let div2 = document.createElement('div');
    div2.classList.add("container");
    let button =document.createElement("button");
    button.setAttribute("id","addexpensebtn");
    button.setAttribute("type","submit");
    button.innerText="New Expense"
    
    div2.appendChild(button);
    div1.appendChild(div2);
    addEventlistnertobutton()
})
});
}
addEventlistnertobutton();
function addhistoryitem(month,day,year,title,amount,historydiv){
    let hr = document.createElement('hr');
    historydiv.append(hr);
    let div1 = document.createElement("div");
    div1.classList.add("history-item");
    let button = document.createElement("button");
    button.classList.add("monthbtn");
    button.innerHTML=month+'<br>'+day+'<br>'+year;
    div1.append(button);
    let h1 = document.createElement("h3");
    h1.innerText=title;
    if(window.screen.width>405){
    div1.append(h1);
    let amountbtn= document.createElement("button");
    amountbtn.classList.add("amountbtn");
    amountbtn.innerText="Rs "+amount;
    div1.append(amountbtn);
    historydiv.append(div1);
    historydiv.append(hr);
    }
    else{
        
        let divt = document.createElement("div");
        divt.classList.add("divt");
        let amountbtn= document.createElement("button");
        amountbtn.classList.add("amountbtn");
        amountbtn.innerText="Rs "+amount;
        divt.append(amountbtn);
        divt.append(h1);
        div1.append(divt);
        historydiv.append(div1);
        historydiv.append(hr);
    }
}
function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', { month: 'long' });
  }
function updategraphandhistory(year){
    document.querySelector(".history").innerHTML="";
    let monthstotal =[0,0,0,0,0,0,0,0,0,0,0,0]
    let yearslist = localStorage.getItem(year);
    if(yearslist!=null){
        let expenditure =0;
        yearslist= JSON.parse(yearslist);
        for(let i= yearslist.length-1;i>=0;i--){
            let month = yearslist[i][0].substring(5,7);
            let day = yearslist[i][0].substring(8,10);
            let year=yearslist[i][0].substring(0,4)
            monthstotal[month-1]+= Number.parseInt(yearslist[i][2]);
            expenditure+= Number.parseInt(yearslist[i][2])
            addhistoryitem(getMonthName(Number.parseInt(month)),day,year,yearslist[i][1],yearslist[i][2],document.querySelector(".history"))
        }
        for(let i=0;i<12;i++){
          
            document.querySelector("#"+getMonthName(Number.parseInt(i+1))).style.height= (monthstotal[i]*100)/expenditure +"%";
        }
    }
   
}
function updateselectlist(select,year){
    let option = document.createElement("option");
    option.setAttribute("value",year);
    option.innerText=year;
    select.appendChild(option);
}
document.querySelector("#formselect").addEventListener("change",()=>{
    updategraphandhistory((document.querySelector("#formselect")).value);
})
function updateselctlistmain(){
    const date = new Date();
let select =document.querySelector("#formselect");
select.innerHTML="";
let currentyear = date.getFullYear();
let option = document.createElement("option");
option.setAttribute("selected",true);
option.setAttribute("value",currentyear);
option.innerText=currentyear;
select.appendChild(option);
let years = JSON.parse(localStorage.getItem("year"));
function comparefunction(a, b){return a-b}
if(years!=null){
years.sort(comparefunction)
    for(let i =years.length-1;i>=0;i--){
        if(years[i]!=currentyear){
            updateselectlist(select,years[i]);
        }
    }
}
updategraphandhistory(date.getFullYear());
}

updateselctlistmain();

