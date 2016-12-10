#Brief : Here, we want to implement Flight search functionality. You have a form, where user can input
and search for the flights. Then user will be able to see the search results, user can refine the
search using a slider for prices.

#Technology:
AngularJs
Jquery
NodeJS
HTML5
CSS

#Guide to use application:
install dependency presents inside flight folder using command: "npm install"

This command will install all dependency to host application at node server

Run "node server.js" to run local node server at "http://localhost:9000/#"

#Application flow:
After hosting this application, by default user will landed to home page, where he can see flight details form.
He can enter flight details like source destination, date, no of passengers according to his requirement and submit to see result in the form of flight lists.

After getting this details he can also play with slider to change fare according to his requitement.

Also he can go for return ticket, where he will see total fare of round trip.


#Note:
Json list is presents at app\public\json\flightList.json

#use case: selet flight from PUNE->MUMBAI on 28th of dec 2016(3 results)
			select return date for above on 29th of dec 2016(2 results)
