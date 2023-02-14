# System Design for an Ecommerce Website
- Inherited a front-end e-commerce web application. Was tasked with replacing a monolithic API with microservices to support the inherited website.
- The previous API had very slow response times, and could only handle around 20 requests per second.

<h2>Set Up<h2>
- First Fork and Clone the Repo
- Run `npm install` or `npm i`
- In the main directory, create a config.js file following the example_config.js format. Use a valid Github token. 

<h2>Tech Stack</h2>
<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" />
  <img src="https://img.shields.io/badge/Express.js-000000.svg?style=for-the-badge&logo=Express&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white" />
  <img src="https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white" />
  <img src="https://img.shields.io/badge/k6-7D64FF.svg?style=for-the-badge&logo=k6&logoColor=white" />
  <img src="https://img.shields.io/badge/NGINX-009639.svg?style=for-the-badge&logo=NGINX&logoColor=white" />
  <img src="https://img.shields.io/badge/New%20Relic-008C99.svg?style=for-the-badge&logo=New-Relic&logoColor=white" />
</div>

<h2>Results</h2>
<h3>Goal</h3>
<p>The client requested the new back end be able to handle 1000 requests per second with an average response time of less than 2 seconds and an error rate of under 1%.</p>
<table>
  <tr>
    <th>Throughput</th>
    <th>Latency</th>
    <th>Error Rate</th>
  </tr>
  <tr>
    <td>1000rps</td>
    <td>2000ms</td>
    <td><1%</td>
  </tr>
</table>

<h3>Data</h3>
<p>I worked with over 12 million lines of data. I was given 3 seperate CSV files, each containing a different piece of related data. I designed a postgreSQL schema with 3 tables and loaded all of the data into my database.</p>

<h3>Server Build</h3>
<p>I built my server using Node.js and Express.js and connected to my postgreSQL database. I used nested queries to access the data I needed from all 3 tables simultaneously.</p>

<h3>Deployment</h3>
<p>Before deployment I tested my server locally using k6.</p>
<table>
  <tr>
    <th>Throughput</th>
    <th>Latency</th>
    <th>Error Rate</th>
  </tr>
  <tr>
    <td>2000rps</td>
    <td>30ms</td>
    <td>0%</td>
  </tr>
</table>

<h3>Deployment</h3>
<p>I first deployed the server and database to AWS using an EC2 T2 micro instance. I stress tested using Loader.io with a random productID in the last 10% of my database.</p>
<table>
  <tr>
    <th>Throughput</th>
    <th>Latency</th>
    <th>Error Rate</th>
  </tr>
  <tr>
    <td>1000rps</td>
    <td>90ms</td>
    <td>0%</td>
  </tr>
</table>

<h3>Load Balancer</h3>
<p>Since I was already meeting the client's goals for the backend, I scaled my server horizontally by implementing a load balancer. I used a NGINX load balancer with a least connection balancing method. Adding a second server added some security in case one server went down and also allowed me to double my Throughput, at the expense of a small amount of latency.</p>
<table>
  <tr>
    <th>Throughput</th>
    <th>Latency</th>
    <th>Error Rate</th>
  </tr>
  <tr>
    <td>2000rps</td>
    <td>135ms</td>
    <td>0%</td>
  </tr>
</table>
