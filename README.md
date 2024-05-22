**Fantasy Cricket Backend**

***Introduction***

This project is a simple backend application for a fantasy cricket app similar to Dream11. It allows users to create cricket teams, select players, assign captain and vice-captain, and then process match results to calculate points for each team.

*Tech Stack*

Node.js with Express for API development
MongoDB for database storage
Additional libraries may be used for validation and other functionalities as required

*Data*

*Players*
Data for players is provided in CSV and JSON formats under the data folder.
The data contains lists of players for two teams (RR and CSK 2022).

*Match*
Ball-by-ball match results are provided in CSV and JSON formats under the data folder.
These results are used for generating match points for team entries.

*Rules*
Each cricket team entry must consist of 11 players.
A maximum of 10 players can be selected from any one of the teams (RR or CSK 2022).
Players must be selected based on their type: Wicket Keeper, Batter, All Rounder, or Bowler.
Each team entry must assign a captain and vice-captain.
The captain earns double points, while the vice-captain earns 1.5x points.

*Batting Points*
Run: +1 point
Boundary Bonus: +1 point
Six Bonus: +2 points
30 Run Bonus: +4 points
Half-century Bonus: +8 points
Century Bonus: +16 points
Dismissal for a duck: -2 points (for Batter, Wicket-Keeper, and All-Rounder)

*Bowling Points*
Wicket (excluding Run Out): +25 points
Bonus (LBW / Bowled): +8 points
3 Wicket Bonus: +4 points
4 Wicket Bonus: +8 points
5 Wicket Bonus: +16 points
Maiden Over: +12 points

*Fielding Points*
Catch: +8 points
3 Catch Bonus: +4 points
Stumping: +12 points
Run out: +6 points

*Endpoints*


*Add Team Entry POST /add-team*
Users can submit new team entries using this endpoint.
Validation is performed for player selection rules.

*Input Parameters:*
Your Team Name (required)
Players (required, list of player names)
Captain (required, player name)
Vice-Captain (required, player name)

*Process Match Result POST /process-result*
This endpoint processes match results to calculate points for players and assigns them to team entries.
Input Parameters: None (match results are fetched from data/match.json for CSKvRR 2022).
View Teams Results GET /team-result
Displays a list of team entries with their scored points and total team points.
Shows the winning team(s) with the highest score.
Input Parameters: None (results are shown for CSKvRR 2022).

*Setup*
Clone this repository.
Install dependencies using npm install.
Ensure MongoDB is installed and running.
Run the server using node server.js.
