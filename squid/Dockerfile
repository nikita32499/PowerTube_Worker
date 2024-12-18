FROM debian:bookworm-slim

ARG APPDIR

RUN apt update -y
RUN apt install squid-openssl apache2-utils libssl-dev openssl -y

RUN apt-get install libpq-dev -y

COPY ${APPDIR}/squid.conf /etc/squid/squid.conf
COPY ${APPDIR}/entry.sh /

RUN chmod a+x entry.sh

COPY ./auth_pg_helper/auth_pg_helper /auth_pg_helper

RUN chmod a+x /auth_pg_helper

CMD ["/entry.sh"]
