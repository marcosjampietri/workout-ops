#!/bin/bash
source venv/bin/activate
pip install "$@"
pip freeze > requirements.txt