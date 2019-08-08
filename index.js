var API = "https://frontend-test-api.alex93.now.sh/api/languages";
var selectLanguage = null;


$(document).ready(function() {
  function cardHtml(data) {
    return (
      '<div class="card" style="width: 400px"> <div class="card-body d-flex"> <div class="row"> <div class="col-md-5"> <img width="100%" src="' +
      data.logo +
      '"> </div> <div class="col-md-7"> <h5 class="card-title">' +
      data.name +
      '</h5> <p class="card-text"> <div>Основан в ' +
      data.year +
      "</div> <div>" +
      data.projectsCount +
      ' проектов на GitHub</div> </p> <a href="'+
      data.docs +
      '" >Документация</a> </div> </div> </div> </div>'
    );
  }

  $("#languages-select").change(function() {
    selectLanguage = this.value;
  });

  $("#load-btn").click(function(e) {
    e.preventDefault();

    if (!selectLanguage) {
      alert("Пожалуйста, выберите категорию технологии из списка");
      return;
    }

    $.get(API + "?group=" + selectLanguage).then(function(data) {
      var result = JSON.parse(data).data;
      var html = "";
      result.forEach(function(data) {
        if (data.logo) {
          html += cardHtml(data);
          $("#languages-list").html(html);
        }
      });
    });
  });
});