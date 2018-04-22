#!/bin/bash

declare -a cmd_list=(
    "celery -A application worker -l info -P eventlet -c 4 -Q vk,default"
    "celery -A application worker -l info -B -Q beat"
    "celery -A application worker -l info -P eventlet -c 2 -Q text"
)

for cmd in "${cmd_list[@]}"; do {
  echo "Process \"$cmd\" started";
  $cmd & pid=$!
  PID_LIST+=" $pid";
} done

trap "kill $PID_LIST" SIGINT

echo "Parallel processes have started";

wait $PID_LIST

echo
echo "All processes have completed";