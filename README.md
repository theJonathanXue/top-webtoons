# Top Webtoons

I created this project to sort [Webtoons](https://www.webtoons.com/en/) by "Ratings", "Views", and "Subscribers" since the official website only allows you to sort by "Popularity", "Likes", and "Dates". You can also filter by the [official genres](https://www.webtoons.com/en/genre#).

Project includes a multi-level animated dropdown and webtoon thumbnails displayed in a responsive grid.

# Scraper

I wrote a [Python script](https://github.com/theJonathanXue/webtoon-rating-scraper) to scrape the data for this project. Webtoon Data were scraped using BeautifulSoup4, while Webtoon thumbnails were scraped from google images using Selenium. Data was scraped on Jan 28, 2023.

[Live Demo](https://thejonathanxue.github.io/top-webtoons/) :point_left:

## Getting started

```
git clone https://github.com/theJonathanXue/top-webtoons.git
cd top-webtoons
npm install
npm start
```

## Built with

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Python](https://www.python.org/)
- [BeautifulSoup4](https://pypi.org/project/beautifulsoup4/)
- [Selenium](https://www.selenium.dev/)
