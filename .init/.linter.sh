#!/bin/bash
cd /home/kavia/workspace/code-generation/react-web-application-243771-243785/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

