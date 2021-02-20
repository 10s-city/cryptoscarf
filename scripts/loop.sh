#!/usr/bin/env bash

echo "start"
while true; do
        # python sync.py
	psql -c 'SELECT sync_block()'
	if [[ $? -ne 0 ]] ; then
                echo "wait"
        else 
		echo "sync $(date)"
	fi
	sleep 600 # sync 1 block every 10 min
done
