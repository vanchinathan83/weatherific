# Weatherific

### Installation
    * Download the repository and do "npm install"
    * Then start the server using "npm start"
    * Tests can be run via "npm test"
    
### IDE
    * Sublime Text
    
### Browsers Tested
    * Chrome
    * Safari
    * FireFox

### API's Used
    * Wunderground
    * Bing Search

### Description
    * Used Bootstrap to display the weather information in a carousel.
    * Used Bing Search to display location news and images based on the city for which the weather is displayed.
    * Used Tabbed Display for News and Images.
    * Used APICache middleware cache the API requests. This is to avoid reaching the API call limit for wunderground and bing search API's.
    * Used AJAX to populate the news and image tabs.
    * Used Async module to make the API calls in a aysnc fashion for 4 different cities. The Latency is 250ms, where as using series of calls made it 1 second.
    
### Features that are in progress
    * Ability to add more places dynamically.
    
