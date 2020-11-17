$('#searchBtn').on('click', function(){
    let userInput = $('#city').val();
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=a19feae6aba79b23ca90858cd79bfdb3';
})
