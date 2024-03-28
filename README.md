# sequence_rework_simulator


This simulator was created to attempt to get a good idea about the effect of rework on lead times.
Unfortunatley my maths is no longer good enough to look at the problem and solve - however i can write potentially non-terminating code to see what happens!


At this point the code is very simple

## Dependencies

## back to start simulator 
This is a process that when it fails it goes all the way back to the start and tries again.

This is a very common situation and models some of the worst structures very well

For instance:
3 teams: Product, Build + QA

A very common pattern in teams is 
1. Product defines, refines and prioritises requirements against an ever changing backlog and set of needs
2. Build goes off builds and then attempts to start the route to production - however sometimes they find a requirements problem and so it goes back to prodcut
3. QA comes along, tests and finds failures - however because the Build team have gone onto the next piece of work the defect needs to be categorised as severe enough to fix now and then get prioritised back into build team.


This is a terrible way to organise teams to deliver outcomes, yet it is completley normal



MIT License


