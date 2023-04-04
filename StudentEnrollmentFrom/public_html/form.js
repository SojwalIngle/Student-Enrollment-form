/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var connToken = "90932901|-31949282452021839|90948013";
var empDBName = 'EMP-DB';
var empRelationName = 'EmpData';
var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';


function resetdata() {
    $("#empId").val("");
    $("#empName").val("");
    $("#empSal").val("");
    $("#empHa").val("");
    $("#empDa").val("");
    $("#empDed").val("");

    $("#empId").prop(':disabled', false);
    $("#savebtn").prop(':disabled', true);
    $("#changebtn").prop(':disabled', true);
    $("#resetbtn").prop(':disabled', true);
    $("#empId").focus();

}


function validatedata() {
    var empid, empname, empsal, emphra, empda, empded;
    empid = $("#empId").val();
    empname = $("#empName").val();
    empsal = $("#empSal").val();
    emphra = $("#empHa").val();
    empda = $("#empDa").val();
    empded = $("#empDed").val();
    
    
    if(empid === ''){
        alert("empid is missing");
        $("#empId").focus();
        return '';
    }
    
     if(empname === ''){
        alert("empname is missing");
        $("#empName").focus();
        return '';
    }
    
     if(empsal === ''){
        alert("empsal is missing");
        $("#empSal").focus();
        return '';
    }
    
     if(empda === ''){
        alert("empda is missing");
        $("#empDa").focus();
        return '';
    }
    
     if(emphra === ''){
        alert("emphra is missing");
        $("#empHa").focus();
        return '';
    }
    
     if(empded === ''){
        alert("empded is missing");
        $("#empDed").focus();
        return '';
    }
    
    
    var jsonstrobj = {
        id : empid,
        name: empname,
        salery : empsal,
        hra: emphra,
        da:empda,
        deduction:empded
    };
    
    return JSON.stringify(jsonstrobj);
}


function savedata(){
    var jsonstrobj = validatedata();
    
    if(jsonstrobj === ''){
        return '';
    }
    
    var putRequest = createPutRequest(connToken ,jsonstrobj,empDBName , empRelationName );
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest , jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetdata();
    $('#empId').focus();
  
}


function changeData(){
    jsonchg = validatedata();
    var updateReq = createUPDATERecordRequest(connToken,jsonchg,empDBName,empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateReq , jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetdata();
    $('#empId').focus();
}

function getEmpIdAsJsonObj(){
    var empid = $('#empId').val();
    var jsonStr = {
       id : empid 
    };
    
    return JSON.stringify(jsonStr);
}

function save(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno" , lvData.rec_no);
}

function fillData(jsonObj){
    save(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#empName").val(data.name);
    $("#empSal").val(data.Salary);
    $("#empHa").val(data.hra);
    $("#empDa").val(data.da);
    $("#empDed").val(data.deduction);
}


function getEmp(){
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,empDBName,empRelationName,empIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandGivenbaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    
    if(resJsonObj.status === 400){
        $('#empName').focus();
    }
    else if(resJsonObj.status === 200){
        fillData(resJsonObj);
        $('#empName').focus();
    }
}