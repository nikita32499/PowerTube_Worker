#!/bin/sh

rm -f /run/squid.pid

exec "$(which squid)" -NYCd 1
