import sys
import json

# Receive JSON from Node.js
data = json.loads(sys.argv[1])

# Create a response
result = {
    "status": "success",
    "message": "Python engine received the data",
    "repository": data["repository"],
    "branch": data["branch"]
}

# Send JSON back to Node.js
print(json.dumps(result))