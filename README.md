# Home-Automation-Stack

## Frontend and Backend for the Home Automation System developed for the Techkriti ECDC-2021.

![Frontend Site](https://github.com/anshulagx/Home-Automation-Stack/blob/main/views/ui.png?raw=true)

### Features
* Responsive and Attractive UI
* Instant Communication with Gateway @ Home using MQTT Protocol
* Voice-Enabled Control
* Alarm-Based Control
* Realtime Data on Frontend

### Tech Stack: 
* Pure HTML CSS JS for Frontend
* Node.JS and Express.JS Backend
* Database maintained in MongoDB
* Hosted in [Herokuapp](https://controlhome.herokuapp.com)
* MQTT Broker using [Mosquitto](https://mosquitto.org) hosted in Amazon EC2 Instance

![MQTTJS](https://raw.githubusercontent.com/mqttjs/MQTT.js/137ee0e3940c1f01049a30248c70f24dc6e6f829/MQTT.js.png)

### How does it work?
* Frontend sends requests to backend for updates in data to show realtime data from MongoDB
* Backend Communicates with Gateway at Home through MQTT Protocol using our MQTT Broker
  * Backend subscribes to topic published from Gateway
  * Gateway subscribes to topic published from Backend
  * Fast and Secure Communication Possible through MQTT
* Gateway handles messages from Backend and controls components accordingly
* Sensor Data sent from Gateway put into MongoDB to be shown in the Frontend
* Voice-Control developed through [Annyang](https://github.com/TalAter/annyang) and [Speech KITT](https://github.com/TalAter/SpeechKITT)
