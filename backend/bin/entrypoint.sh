#!/usr/bin/env bash
set -e

if [[ "$CONFIG" == "config/local.py" ]]; then
  # only do this in the local setup
  flask db upgrade
fi

python -m flask run --port 5000 --host=0.0.0.0
