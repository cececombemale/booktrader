# Booktrader
## By Brian Shih, Cece Combemale, Rohit Nawani, and Will Greenberg

This is our final project for Large Scale Web Apps with Yair Sovran at NYU, 2019.

# Demo

Once connected to the site, go through the following guide for a tour of features:

1. Click on the Login/Register tab in the upper right of the page and create a new user.
2. You will be redirected to a profile page. Create a new book (any made up ISBN is fine,
such as 1111111111, and any title/author/edition number) in the bottom form. If the ISBN is
already in the DB, it will overwrite the other book's title/author/edition. Then, create 
a listing in the top form of your new book (type it's isbn, e.g. 1111111111). 
The system will reject your listing if it is not for a book already registered in the DB. 
On success, you should see your new listing on the left hand side.
3. Go to the search tab and see all books currently in the DB with associated listings. Try
searching for authors, titles, and ISBNs to see which books come up. You can search by a single
word in a title/author's name, such as "Frank" for books by Frank Herbert. Note that on the fly,
elasticsearch has indexed your new book that you just added.
4. To confirm that your new book and listing are posted for all users, try opening the site in
another browser that's not logged in and search for the book you just added.
5. Play around as you like! You could try adding listings of other books you find in the search
(try adding a listing for ISBN 123456789), adding more listings for the same book, logging out 
and back in, etc.

# Explanation of implementation

Our web app is running on Amazon EC2 in micro Linux instances. There are two instances: Django, 
React, and elasticsearch are running on one, and the primary database, PostgreSQL, on another. 
Django handles the PostgreSQL connection and all of our primary backend data pipeline. We're using
Django's auth User model, and our own Listing (previously named Has) and Book models. React 
runs the frontend client and makes RESTful API calls to Django (which we designed). Elasticsearch
handles the searching functionality, indexing Books on the fly, and React + Django REST match up
Listings with Books on search.

# Known bugs/shortcomings

We would have loved to get everything running perfectly, but the technology stack behind this
project was totally new to most of us. That naturally brought about challenges and some delay;
here are some of the known bugs and pivots we had to make to finish with a working app on time:
- We originally intended to containerize our app with Docker, but finishing the React + Django REST
portion took a lot longer than anticipated, leaving us with insufficient time to containerize.
- On search, the listings associated with each book are listed by User ID number. It certainly
wouldn't be ideal for this to be used in production; we intended for this to be the username.
- Our Amazon EC2 instance appears to time out every couple hours or so. We aren't sure if this is
an issue with elasticsearch eating up too much memory (a problem we have been having) or something
else. Restarting the instance brings it back up.
- If a book is added with an ISBN already present in the Books table, that book's title/author/edition
will be overwritten but its listings will remain.

# Instructions for building the app yourself (ignore for demo purposes)

Django+React Tutorial: https://wsvincent.com/django-rest-framework-react-tutorial/

## Build Python packages using virtualenv 
```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

## Build elasticsearch package
### download elastic search package - mac os
```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-darwin-x86_64.tar.gz
tar -xzf elasticsearch-7.5.0-darwin-x86_64.tar.gz
```

### download elastic search package - linux
```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-linux-x86_64.tar.gz
tar -xzf elasticsearch-7.5.0-linux-x86_64.tar.gz
```
### edit the jvm.options file for aws free tier usage (utilize less RAM)
```
-Xms256m
-Xmx256m
```

### run elastic search server
```
cd elasticsearch-7.5.0/bin
./elasticsearch
```

### build indexing in elastic search server
```
python manage.py search_index --rebuild
```


### Enable Cors to send Cross Domain Request
Add this to the /config/elasticsearch.yml file
```
http.cors.enabled : true
http.cors.allow-origin : "*"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```

### Add public access to Elastic Search service
Add this to the /config/elasticsearch.yml file
```
transport.host: localhost
transport.tcp.port: 9300
http.port: 9200
network.host: 0.0.0.0
```

### rerun elastic search server
```
cd elasticsearch-7.5.0/bin
./elasticsearch
```
