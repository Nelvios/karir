FROM docker-registry.default.svc:5000/cicd/nginx-vts:latest

MAINTAINER CARROLL

USER root

COPY ./dist /usr/share/nginx/html/

EXPOSE 8080

USER www-data
