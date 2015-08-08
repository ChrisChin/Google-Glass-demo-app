# Google-Glass-demo-app
Demo apps for Google Class using Javascript (D3 library)

The demo has 2 applications – Pizza toppings app and a Sea conditions app. This demo simulates swiping forwards and backwards on the side of the Victoria Viewers by using the left and right arrow key respectively. Also clicking is used to simulate the user tapping on the side of their Viewers

----------------------------------------------------------------------------------------------------------------------------
**Main Menu**
The menu has 2 buttons for each app.

**Swiping (left arrow/right arrow)**
The user can use the left and right arrow to move the panels to cycle through all the apps.

**Tapping (clicking)**
The user can then select the app displayed in the middle by clicking on the circle

**Applications**
Each application has a back button in the top left corner which returns back to the menu

----------------------------------------------------------------------------------------------------------------------------
**Pizza App**
**Environment**
The environment is set in a pizza shop. This app would be used by the pizza shop staff to find out which toppings to put on the pizza orders.

**Swiping (left arrow/right arrow)**
The user can use the left and right arrow to move the panels to cycle through all the pizzas.

**Fill Colour**
Each panel is coloured either green or blue – green for vegetarian and blue for non-vegetarian.

**Json**
The app takes a json which has
1. name – name of the pizza
2. ingre – list of ingredients
3. vegetarian – Boolean whether it is vegetarian

----------------------------------------------------------------------------------------------------------------------------
**Sea Conditions App**
**Environment**
The environment is set in a boat. This app would be used by boat owners to monitor the sea conditions in their current region whilst out at sea.

**Swiping (left arrow/right arrow)**
The user can use the left and right arrow to move the panels to cycle through all the different times.

**Tapping (clicking)**
The user can click on the middle (3rd) panel to display more information. This displays the swell direction, swell height, wind direction, average wind and max gust.

**Display**
The legend in the top right shows the spectrum of colours between red and yellow. Poor sea condition is shown by a lower panel height and a colour towards the red spectrum whilst good sea condition is shown by a higher panel height and a colour towards the yellow spectrum.
A scale on the left hand side is used for the height of the panels which shows the sea condition at each time.

**Json**
The app takes a json which has
1. time – Time on the hour
2. seaCon – Sea condition which ranges from 2-6
3. maxGust - Maximum gust
4. avgWind – Average wind
5. windDir – Wind direction
6. swellHeight – Swell Height
7. swellDir – Swell Direction
