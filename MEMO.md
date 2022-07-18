
# 1. app url :
    *  http://lb-486731550.ap-southeast-1.elb.amazonaws.com/chat


---

# 2. config : 
    * limitMilliseconds => in the time intervals limit socket event request time
    * actionUpperBound =>in the time intervals of limitMilliseconds, user action upper bound
    * prot => server port


---

# 3. class :
     socketHandler => listen socket event and parse client side data then assign to lobby
     lobby => acording to socket event, opertion peer
     peerManager => basic manager of peer
     peer => keep socket and user data in memory


---

# 4. impression:
    when i start the interesting test,
    but i did not do that in the end,
    because scrutinize require and what i     really want to show you.

    I thing it has three main parts

    1. Coding Style 
    2. Coding Habit
    3. Can i have master the programming language of javscript

---

# 5. How to start at local:

    server side start step

    $ npm install
    $ node main.js

    http://127.0.0.1:3310/chat


---
# 6. How to test:


    cd testClient
    $ npm install
    $ node chatClientCash.js

    it can test limit request time function



---
# 7. Unit test:

    $ npm mocha -g
    $ npm test

---

# 7. Others:
    I totally spend 9 to 10 hours
    in this test, it has three main parts
    
    1. Thinking require and design,2 hours
    2. server side coding 3 hour
    3. client side coding 4 to 5 hours
    It because i don't have any  experience of front end so i estimate not precise at this part.