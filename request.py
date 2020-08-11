import requests

url = "https://streamlabs.com/api/v1.0/socket/token"

querystring = {"access_token":"access_token"}

response = requests.request("GET", url, params=querystring)

print(response.text)