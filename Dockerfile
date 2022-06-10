FROM abiosoft/caddy

RUN ["mkdir", "/usr/local/webstatic"]
WORKDIR /usr/local/webstatic

COPY ./src/ /usr/local/webstatic