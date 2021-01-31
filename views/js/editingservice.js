let noOfComapany = parseInt($("#noOfCompanies").val())

$('#addcompany').click(()=>{
    noOfComapany +=1
    let html = `<br><label for="servicecompany${noOfComapany}">Comapany Name </label>
    <input type="text" name="servicecompanyname${noOfComapany}" id="servicecompanyname${noOfComapany}">
    <label for="servicecompany${noOfComapany}">Price for suv </label>
    <input type="text" name="company${noOfComapany}suvprice" id="company${noOfComapany}suvprice">
    <label for="servicecompany${noOfComapany}">Price for minivan </label>
    <input type="text" name="company${noOfComapany}minivanprice" id="company${noOfComapany}minivanprice">
    <label for="servicecompany${noOfComapany}">Price for sedan </label>
    <input type="text" name="company${noOfComapany}sedanprice" id="company${noOfComapany}sedanprice">`

    $('#serviceform').append(html)
    $("#noOfCompanies").val(noOfComapany)
})

$('#submitBttn').click((e)=>{
    e.preventDefault()
    let Companies = new Array
    console.log(noOfComapany)
    for(let i =1;i<=noOfComapany;i++){
        
        let Company= {
            name: $(`#servicecompanyname${i}`).val(),
            suvprice : $(`#company${i}suvprice`).val(),
            minivanprice: $(`#company${i}minivanprice`).val(),
            sedanprice: $(`#company${i}sedanprice`).val(),
        }
        Companies.push(Company)
    }
    let Data = {
        title: $('#title').val(),
        description: $('#description').val(),
        companies : Companies
    }
    console.log(Data)
    $.ajax({
        type: "POST",
        url: $('#link').val(),
        data: Data,
      });
      window.location.replace("/users/dashboard")
})