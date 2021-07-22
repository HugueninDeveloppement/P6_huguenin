###### SO PECOCKO , Projet 6 , OpenClassroom #####

Application permettant de poster une sauce et de la partager avec les autres utilisateurs inscrits.
Il est possible de liker/disliker les sauces presentes.

Cette API est à utiliser avec le frontend disponible sur le depot github
https://github.com/OpenClassrooms-Student-Center/dwj-projet6

###### Mise en route ########

Après avoir cloner le projet complet sur le repo github
https://github.com/HugueninDeveloppement/P6_huguenin

vous devez disposer de node.js (https://nodejs.org/en/)

installer les dependences : npm init
lancer le serveur : npm run start
le .env sera fournit au besoin

###### Routes ##############

Users 
-----

http://localhost:3000/auth/signup
Methode : POST

http://localhost:3000/auth/login
Methode : POST


Sauces 
------ 

http://localhost:3000/sauces/
Methode : POST

http://localhost:3000/sauces/:id
Methode : GET

http://localhost:3000/sauces/:id
Methode : PUT

http://localhost:3000/sauces/:id
Methode : DELETE

http://localhost:3000/sauces/:id/like
Methode : POST

http://localhost:3000/sauces/
Methode : GET