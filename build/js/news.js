'use strict';

(function () {
  var newsBlock = document.querySelector('.news');
  var newsDataTemplate = document.getElementById('news-data-template');

  window.load(NEWS_SERVICE_URL, null, function (news) {
    var newsData = news.data;
    for (var i = 0; i < newsData.length; i++) {
      var newsArticle = newsDataTemplate.content.querySelector('.news__article').cloneNode(true);
      var newsTitle = newsArticle.querySelector('.news__title');
      var newsContent = newsArticle.querySelector('.news__content');
      var newsDate = newsArticle.querySelector('.news__date');

      newsTitle.textContent = newsData[i].name;
      newsContent.textContent = newsData[i].content;
      newsDate.textContent = newsData[i].date.split('T')[0].split('-').reverse().join('.');;

      newsBlock.appendChild(newsArticle);
    }
  });
})();
