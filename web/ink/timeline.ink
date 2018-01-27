/*
    Time related functions and variables
*/

VAR hour_of_day = 13.25
LIST time_format = AM_PM, 24H

== function pass_little_time() ==
~ hour_of_day = hour_of_day + 0.25 // 15 minutis
~ return hour_of_day

== function pass_normal_time() ==
~ hour_of_day = hour_of_day + 0.50 // half an hour
~ return hour_of_day

== function get_time_minutes() ==
~ return (hour_of_day % 1) * 60

== function get_time_hours_24() ==
~ return hour_of_day - (hour_of_day % 1)

== function get_time_am_pm() ==
{ 
    - get_time_hours_24() == 0:
        ~ return "am" 
    - get_time_hours_24() > 12:
        ~ return "pm" 
    - else: 
        ~ return "am"
}

== function get_time_hours_12() ==
{
    - get_time_hours_24() == 0:
        ~ return 12 
    - get_time_hours_24() > 12:
        ~ return  get_time_hours_24() - 12
    - else: 
        ~ return get_time_hours_24()
}

== function time_24h() ==
~ return "{get_time_hours_24()}:{get_time_minutes()}"

== function time_12h() ==
~ return "{get_time_hours_12()}:{get_time_minutes()} {get_time_am_pm()}"

== function get_time_string() ==
{ time_format:
    - time_format.AM_PM: 
        ~ return "{time_12h()}"
    - time_format.24H: 
        ~ return "{time_24h()}"
    - else:
        ~ return "\{error!\}"
}
