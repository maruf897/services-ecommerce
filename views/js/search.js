$('.submit').click((e)=>{
    e.preventDefault()
    let word = $('#searchbox').val()
    $.ajax({
        type: "POST",
        url: "/service/search",
        data: {key: word},
        success: (results)=>{
            $('.searchedItems').empty()
            results.forEach((result)=>{
                let html = `<a href="/service/${result._id}">${result.title}</a> <br>`
                $('.searchedItems').append(html)
                

            })
            $('#searchbox').val("")
            
        }
      });

})
