/*
    Determine Player Preferences
*/
== opening_survey ==
Answer some basic questions before we begin...

What's the time? <>
 * [Use AM/PM notation.]
 ~ time_format = time_format.AM_PM
 * [Use 24 hour time.]
 ~ time_format = time_format.24H

-<> {get_time_string()}.
And this story is about? <>
 * [A boy.]Linden Wright
    ~ player = Linden
 * [A girl.]Lucie Wright
    ~ player = Lucie
-<> who is attracted... // Determine gender of other characters
 * only towards women.
    ~ Mell_Gender = Mell_Gender.Female
    ~ Korga_Gender = Korga_Gender.Female
 * more towards women.
    ~ Mell_Gender = Mell_Gender.Female
    ~ Korga_Gender = Korga_Gender.Male
 * more towards men.
    ~ Mell_Gender = Mell_Gender.Male
    ~ Korga_Gender = Korga_Gender.Female
 * only towards men.
    ~ Mell_Gender = Mell_Gender.Male
    ~ Korga_Gender = Korga_Gender.Male
-
Okay, now we can begin...
-> Explore
