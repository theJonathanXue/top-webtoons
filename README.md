# Top Webtoons

[Live Demo](https://thejonathanxue.github.io/top-webtoons/) :point_left:

I created this project to sort [Webtoons](https://www.webtoons.com/en/) by "Ratings", "Views", and "Subscribers" since the official website only allows you to sort by "Popularity", "Likes", and "Dates". You can also filter by the [official genres](https://www.webtoons.com/en/genre#).

Project includes a multi-level animated dropdown and webtoon thumbnails displayed in a responsive grid.

# Scraper

I wrote a [Python script](https://github.com/theJonathanXue/webtoon-rating-scraper) to scrape the data for this project. Webtoon Data were scraped using BeautifulSoup4, while Webtoon thumbnails were scraped from google images using Selenium. Data was scraped on Jan 28, 2023.

# Database
A challenge I faced here was deciding between using a relational vs. non-relational database.

The database for this project is responsible for storing Webtoon metrics and metadata. Currently I have scraped metrics such as rating, views, and subscribed count. Each webtoon can belong to multiple genres. In the future I might also want to add other metadata such as a summary for each webtoon, number of episodes, author, and release date.

With this in mind, I want a database that is suitable for my data schema, scalable, performant and flexible. 

Comparing the pros and cons of using a relational vs. non-relational database for webtoon data:
| Aspect | Relational Database | Non-Relational Database |
| --- | --- | --- |
| **Structured Data** | Suitable for storing structured data such as webtoon summaries, author details, etc. | Offers schema flexibility, allowing storage of unstructured or semi-structured data. |
| **Data Integrity** | Maintains ACID compliance for data integrity and referential integrity. | Sacrifices some level of ACID compliance for scalability and flexibility. |
| **Complex Queries** | Offers powerful querying capabilities for complex operations and analysis. | May not offer the same level of query complexity as relational databases. |
| **Relational Data** | Excels at managing data with well-defined relationships. | Well-suited for handling dynamic data and metrics like ratings and views. |
| **Schema Rigidity** | Requires a predefined schema, making it less flexible for dynamic data. | Provides schema flexibility, allowing accommodation of evolving webtoon metrics. |
| **Scalability Challenges** | Scaling horizontally can be complex and expensive. | Highly scalable, suitable for handling high volumes of dynamic data. |
| **High Performance** | Well-suited for traditional workloads and complex operations. | Designed for high-performance read and write operations for dynamic data. |
| **Dynamic Data** | Limited flexibility for accommodating dynamic data changes. | Well-suited for storing evolving metrics like ratings, views, and subscribed counts. |

I decided to go with a relational database since I have decided on the structure of my data and defined the relationships. I went with a MySQL database as I've been wanting to work with another relational database other than PostgreSQL.

# TODO
Other features I want to implement:
- Database with scraped webtoon data
- Node and Express API with CRUD operations to the database
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
