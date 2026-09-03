    document.querySelectorAll('section').forEach(function(section, i){
      setTimeout(function(){
        section.classList.add('in');
      }, 300 + i * 160);
    });
