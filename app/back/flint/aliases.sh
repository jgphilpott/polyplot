# Source
alias source="source /root/app/back/flint/aliases.sh"

# Welcome
alias welcome="printf '\e[93mWelcome to Polyplot!\e[0m 😍\n'"

# Variables
alias cl="clear"
alias space="printf '\n'"

# Common
alias cwd="printf '\n\e[93mThe current working directory is:\e[0m ' && pwd && space"
alias lsa="printf '\n\e[93mAll the files in the current working directory are:\e[0m\n\n' && ls -a && space"

# Python
alias py="python3"

# CLI
alias spark="space && py app/spark.py && space"
alias fire="py app/spark.py"

# Database
alias db="fire find_database"
alias db-drop="fire drop_database"

# Collections
alias col="fire find_collection"
alias cols="fire find_collections"
alias col-drop="fire drop_collection"

# Clients
alias cent="fire find_client"
alias cents="fire find_clients"

# Countries
alias coun="fire find_country"
alias couns="fire find_countries"

# Indicators
alias ind="fire find_indicator"
alias inds="fire find_indicators"
alias ind-upd="fire update_indicator"
alias inds-upd="fire update_indicators"

# Maps
alias map="fire find_map"
alias maps="fire find_maps"

# Meta
alias meta="fire find_meta"

# Styling
alias sass="fire compile_sass app/front"

# Startup
export PS1=" \e[5m\e[93m>>>\e[0m "
echo -ne "\e]10;#00ff00\e\\"
echo -ne "\e]11;#000000\e\\"
cl
space
welcome
space
