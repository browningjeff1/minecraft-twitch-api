import os

import socket
import json

s = socket.socket()
host = '10.0.0.171'
port = 3000

# pygame.init()
# pygame.joystick.init()
# controller = pygame.joystick.Joystick(0)
# controller.init()

def send(x):
    with socket.socket() as s:
        s.connect((host, port))
        s.sendall(str.encode(str(x)))

# axis_data = {}
# button_data = {}
# hat_data = {}

# for i in range(controller.get_numbuttons()):
#     button_data[i] = False

# for i in range(controller.get_numhats()):
#     hat_data[i] = (0, 0)
with open('data.txt') as json_file:
    data = json.load(json_file)
print (data["message"])
while True:

    if data:
        send(data)
    # for event in pygame.event.get():
    #     if event.type == pygame.JOYAXISMOTION:
    #         axis_data[event.axis] = round(event.value, 2)
    #         # dataSent = str(axis_data.get(1))
    #         # send(dataSent)               
    #     # elif event.type == pygame.JOYBUTTONDOWN:
    #     #     # button_data[event.button] = True
    #     #     # button = str(button_data[1])
    #     #     # print(dataSent)
            
            
    #     # elif event.type == pygame.JOYBUTTONUP:
    #     #     # button_data[event.button] = False
    #     #     # dataSent = str(button_data[1])
    #     #     # print(dataSent)
    #     elif event.type == pygame.JOYHATMOTION or event.type == pygame.JOYBUTTONDOWN or event.type == pygame.JOYBUTTONUP:
    #         if event.type == pygame.JOYBUTTONDOWN:
    #             button_data[event.button] = 1
    #         elif event.type == pygame.JOYBUTTONUP:
    #             button_data[event.button] = 0    
    #         elif event.type == pygame.JOYHATMOTION:
    #             hat_data[event.hat] = event.value

    #         button = str(button_data[1])
    #         xData = str(hat_data[0][0])
    #         yData = str(hat_data[0][1])
    #         print(button)
    #         send(xData, yData, button)