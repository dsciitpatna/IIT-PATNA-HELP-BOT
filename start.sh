trap "killall background" EXIT
node stt.js > stt.log &
node server.js > server.log &
tail -f stt.log server.log

