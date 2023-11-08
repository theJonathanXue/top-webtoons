# Top Webtoons

[Live Demo](https://thejonathanxue.github.io/top-webtoons/) :point_left:

I created this project to sort and filter [Webtoons](https://www.webtoons.com/en/) more comprehensively. We can sort by "Ratings", "Views", and "Subscribers" while the official website only allows you to sort by "Popularity", "Likes", and "Dates". You can also filter by the [official genres](https://www.webtoons.com/en/genre#).

Project includes a multi-level animated dropdown and webtoon thumbnails displayed in a responsive grid.

# Scraper

I wrote a [Python script](https://github.com/theJonathanXue/webtoon-rating-scraper) to scrape the data for this project. Webtoon Data were scraped using BeautifulSoup4, while Webtoon thumbnails were scraped from google images using Selenium. Data was scraped on Jan 28, 2023.

# TODO
Other features I want to implement:
- [🚧 IN PROGRESS](https://github.com/theJonathanXue/webtoon-mysql-database) Database with scraped webtoon data
- [🚧 IN PROGRESS](https://github.com/theJonathanXue/webtoon-api) Node and Express API with CRUD operations to the database 
- Host frontend, backend, and database on AWS
- Setup CI/CD pipelines
- Get feedback from users online

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
