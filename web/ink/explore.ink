/*
Role:   Main Character
Name:   Linden / Lucie Wright 
Type:   Ocielle
*/

== Explore ==
#music:explore

{not did_something_today: You sit in the park in Astam Junction's old district, | You head back to the park for a bit, } thinking of what to do with your time. #portrait:player
  * [visit the chocolatier] -> did_something_today (-> chocolatier)
  * {not sister.visit} [visit your sister] -> did_something_today (-> sister )
  * {sister.visit} [visit your sister, again] -> sister.follow_up
  * {did_something_today} [call it a day.] 
    { sister.visit and not sister.follow_up:
        - And so, {player} totally forgot about {playerHisOrHer()} sister and went to bed like a jerk.
        - {player} decided to call it a day.
    }
    -> END
  * {not did_something_today} stay put[].
    That was a rather boring story, {player}. -> END

TODO: More choices plx!

== did_something_today (-> return_to) ==
-> return_to
