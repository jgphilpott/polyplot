# Welcome
alias welcome="printf '\n\e[93mWelcome to iGraph!\e[0m 😍\n\n'"

# Variables
alias space="printf '\n'"
alias cl="clear"

# Common
alias cwd="printf '\n\e[93mThe current working directory is:\e[0m ' && pwd && space"
alias lsa="printf '\n\e[93mAll the files in the current directory are:\e[0m\n\n' && ls -a && space"

# Python
alias py="python3"

# Fire
alias fire="space && py cli.py && space"

# Database
alias db-client="py cli.py get_client --log=True"
alias db-database="py cli.py get_database --log=True"
alias db-drop="py cli.py drop_database --log=True"

# Collections
alias col="py cli.py get_collection --log=True"
alias cols="py cli.py get_collections --log=True"
alias col-get-ind="py cli.py collect_indicator --log=True"
alias col-get-inds="py cli.py collect_indicators --log=True"
alias col-drop="py cli.py drop_collection --log=True"

# Indicators
alias get-ind="py cli.py get_indicator --log=True"
alias get-inds="py cli.py get_indicators --log=True"

# Startup
export PS1=' \e[5m\e[93m>>>\e[0m '
cl
welcome
cwd
lsa
