# Booktrader
## By Brian Shih, Cece Combemale, Rohit Nawani, and Will Greenberg

This is our final project for Large Scale Web Apps with Yair Sovran at NYU, 2019.

Django+React Tutorial: https://wsvincent.com/django-rest-framework-react-tutorial/


## Build Python packages using virtualenv 
`python3 -m venv env
source env/bin/activate
pip install -r requirements.txt`

## Build elasticsearch package
### download elastic search package - mac os
```wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-darwin-x86_64.tar.gz```

```tar -xzf elasticsearch-7.5.0-darwin-x86_64.tar.gz```

### download elastic search package - linux
```wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-linux-x86_64.tar.gz```

```tar -xzf elasticsearch-7.5.0-linux-x86_64.tar.gz```


### run elastic search server
`cd elasticsearch-7.5.0/bin
./elasticsearch`

### build indexing in elastic search server
`python manage.py search_index --rebuild`


### Enable Cors to send Cross Domain Request
Add this to the /config/elasticsearch.yml file
```
http.cors.enabled : true
http.cors.allow-origin : "*"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```
