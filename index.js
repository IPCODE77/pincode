let main_box=document.getElementById("main_boxxxx");
let search_box=document.getElementById("search_boxxx");
let details_btn=document.getElementById("details_btn")
details_btn.addEventListener("click",()=>{
    main_box.style.display='none';
    search_box.style.display='flex';

})


let pincode=document.getElementById("pincode");
pincode.addEventListener("input",()=>{
    document.getElementById("error_para").style.display='none';
    if(pincode.value.length>=6){
        let newvalue=pincode.value.slice(0,6);
         pincode.value=newvalue
     }
})
let searchbtn=document.getElementById("search_btn_box");
let spinner=document.querySelector('.lds-roller');
let card_box=document.getElementById("details_card_box");

searchbtn.addEventListener("click",function(){
            const xhr=new XMLHttpRequest();
            
            xhr.open('GET',`https://api.postalpincode.in/pincode/${pincode.value}`,true);
            spinner.style.display='inline-block';
            xhr.onprogress=function(){
                console.log('on progress');
            }
            xhr.onreadystatechange=function(){
            }
            let str;
            xhr.onload=function(){
                if(this.status==200){
                    spinner.style.display='none';
                    let data=JSON.parse(this.responseText);
                    let main_data=data[0].PostOffice;
                    let result_para=document.getElementById('total_ressult');
                     if(main_data==null){
                        result_para.innerHTML=` Sorry! , There is no result present in this pincode`
                        if(result_para.innerText.includes('Sorry!')){
                            console.log('ok');
                            card_box.innerHTML='';
                        }
                    }
                    if(main_data.length>=1){
                        result_para.innerHTML=`Total Result present ${main_data.length}`
                    }
                   
                    for (key in main_data){
                        str+=`<div class="card" id="card_box">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">Name <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].Name}</li>
                        <li class="list-group-item">Block <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].Block}</li>
                        <li class="list-group-item">State <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].State}</li>
                    <li class="list-group-item">Country <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].Country}</li>
                    <li class="list-group-item">Postal Delivery <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].DeliveryStatus}</li>
                    <li class="list-group-item">District <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].District}</li>
                    <li class="list-group-item">Division <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].Division}</li>
                    <li class="list-group-item">DeliveryStatus <i class="fa-solid fa-arrow-right-long"></i> ${main_data[key].DeliveryStatus}</li>
                    </ul>
                    </div>`
                }
                card_box.innerHTML=str;
                let xx=document.getElementById("details_card_box");
                // xx.childNodes[0].style.display='none';
                xx.childNodes[0].textContent=''
            }
                else{
                    console.log(this.status);
                    
                }
            }
            xhr.send()
        
        })


        document.getElementById("pincode").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("search_btn_box").click();
    }
});

