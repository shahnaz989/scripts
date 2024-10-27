#!/bin/bash

# URL to send the  request to
CHAT_APP_WS_SERVER="https://chat-app-5sl1.onrender.com/health"
TASK_MANAGER_SERVER="https://task-manager-backend-sigma.vercel.app/user/login"

# Body for the POST request
TASK_MANAGER_BODY='{
  "email": "fkk992638@gmail.com",
  "password": "wrongpassword"
}'

# 
node ./keepDbAlive.js &

while true
do

  # Send a POST request to the login endpoint and capture the response
  TASK_MANAGER_SERVER_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$TASK_MANAGER_BODY" $TASK_MANAGER_SERVER)
  echo "task manager at $(date): $TASK_MANAGER_SERVER_RESPONSE"

  # Send a GET request to the server and capture the response
  CHAT_APP_WS_SERVER_RESPONSE=$(curl -s -X GET $CHAT_APP_WS_SERVER)
  
  # Log the response to the console
  echo "chat ws server at $(date): $CHAT_APP_WS_SERVER_RESPONSE"

  # Wait for 5 minutes (300 seconds)
  sleep 300
done
