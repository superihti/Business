$(function() {
    var form = $('.analysis-form-container'),
        openForm = $('.analysis__open-form'),
        closeForm = $('.analysis-form-close__btn');
    
    openForm.on('click', function(){
      form.show(300);
  })  
    closeForm.on('click', function(){
      form.hide(300);
  })  
    
});