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
Relational Database (Pros):
Structured Data: Relational databases are well-suited for structured data, making them an ideal choice for storing information like webtoon summaries, author details, number of episodes, and release dates.

Data Integrity: Relational databases maintain ACID compliance, ensuring data integrity, transactional consistency, and referential integrity, which is crucial for maintaining relationships between entities like webtoons, genres, and authors.

Complex Queries: SQL databases offer powerful querying capabilities, allowing you to perform complex queries, aggregations, and joins easily. This is advantageous when you need to retrieve and analyze data across various tables.

Relational Data: Relational databases excel at managing data that has well-defined relationships, such as the connection between webtoons, authors, and genres.

Relational Database (Cons):
Schema Rigidity: Relational databases require a predefined schema, making it less flexible for handling dynamic data, like changing metrics for webtoons, without frequent schema modifications.

Scalability Challenges: While they can handle traditional workloads well, scaling relational databases horizontally can be complex and expensive. This can become a limitation as your application and data grow.

Non-Relational Database (Pros):
Schema Flexibility: NoSQL databases provide schema flexibility, allowing you to store unstructured or semi-structured data, making them ideal for accommodating evolving webtoon metrics.

Scalability: Non-relational databases are highly scalable, making them suitable for handling high volumes of dynamic data and accommodating growth without major disruptions.

High Performance: NoSQL databases are designed for high-performance read and write operations, which is valuable for quickly updating and retrieving webtoon metrics that may experience frequent changes.

Dynamic Data: NoSQL databases are well-suited for dynamic data, making them a good choice for storing metrics like ratings, views, and subscribed counts.

Non-Relational Database (Cons):
Lack of ACID Compliance: Most NoSQL databases sacrifice some level of ACID compliance for scalability and flexibility. This means they may not guarantee the same level of transactional integrity as relational databases.

Complex Queries: Non-relational databases may not offer the same level of query complexity and aggregation capabilities as relational databases, making them less suitable for data analysis across multiple tables.

# TODO
Other features I want to implement:
- database with scraped webtoon data
- Node and Express API with CRUD operations to the database
- Host frontend and backend on AWS
- Setup CI/CD pipelines

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
