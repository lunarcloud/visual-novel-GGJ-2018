/*
    General functions and variables
*/
LIST player = Linden, Lucie
LIST Mell_Gender = Male, Female
LIST Korga_Gender = Male, Female
 
== function playerSirOrMiss() ==
    { player:
        - Linden: ~ return "sir"
        - Lucie: ~ return "miss"
    }
    
== function playerHeOrShe() ==
    { player:
        - Linden: ~ return "he"
        - Lucie: ~ return "she"
    }
    
== function playerHisOrHer() ==
    { player:
        - Linden: ~ return "his"
        - Lucie: ~ return "her"
    }
