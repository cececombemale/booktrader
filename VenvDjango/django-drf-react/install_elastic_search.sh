## download elastic search package - mac os
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-darwin-x86_64.tar.gz
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-darwin-x86_64.tar.gz.sha512
shasum -a 512 -c elasticsearch-7.5.0-darwin-x86_64.tar.gz.sha512 
tar -xzf elasticsearch-7.5.0-darwin-x86_64.tar.gz

## download elastic search package - linux
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-linux-x86_64.tar.gz
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.5.0-linux-x86_64.tar.gz.sha512
shasum -a 512 -c elasticsearch-7.5.0-linux-x86_64.tar.gz.sha512
tar -xzf elasticsearch-7.5.0-linux-x86_64.tar.gz


## run elastic search server
cd elasticsearch-7.5.0/bin
./elasticsearch

## build indexing in elastic search server
python manage.py search_index --rebuild

