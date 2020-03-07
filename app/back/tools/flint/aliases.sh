# Source
alias source="source ~/app/back/tools/flint/aliases.sh"

# Welcome
alias welcome="printf '\n\e[93mWelcome to Polyplot!\e[0m 😍\n\n'"

# Variables
alias cl="clear"
alias space="printf '\n'"

# Common
alias cwd="printf '\n\e[93mThe current working directory is:\e[0m ' && pwd && space"
alias lsa="printf '\n\e[93mAll the files in the current directory are:\e[0m\n\n' && ls -a && space"

# Python
alias py="python3"

# CLI
alias flint="space && py app/spark.py && space"
alias fire="py app/spark.py"

# Database
alias db-client="fire find_client --log=True"
alias db-data="fire find_database --log=True"
alias db-drop="fire drop_database --log=True"

# Collections
alias col="fire find_collection --log=True"
alias cols="fire find_collections --log=True"
alias col-drop="fire drop_collection --log=True"

# Countries
alias coun="fire find_country --log=True"
alias couns="fire find_countries --log=True"

# Indicators
alias ind="fire find_indicator --log=True"
alias inds="fire find_indicators --log=True"
alias ind-upd="fire update_indicator --log=True"
alias inds-upd="fire update_indicators --log=True"

# Styling
alias sass="fire compile_sass app/front"

# Startup
export PS1=" \e[5m\e[93m>>>\e[0m "
echo -ne "\e]10;#00ff00\e\\"
echo -ne "\e]11;#000000\e\\"
cl
welcome
cwd
lsa
