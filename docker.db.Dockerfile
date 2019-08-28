FROM mysql:5.7

ADD /migrations/*.sql /docker-entrypoint-initdb.d