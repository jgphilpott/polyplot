# Welcome
alias welcome="printf '\e[93mWelcome to iGraph!\e[0m 😍\n'"

# Variables
alias space="printf '\n'"
alias cl="clear"

# Common Use
alias cwd="space && printf '\e[93mThe current working directory is:\e[0m ' && pwd && space"
alias lsa="space && printf '\e[93mAll the files in the current directory are:\e[0m\n' && space && ls -a && space"

# Python
alias py="python3"

# Fire
alias fire="space && py cli.py && space"

# Database
alias db-drop="py cli.py drop_database"

# Collections
alias col="py cli.py get_collection"
alias cols="py cli.py get_collections"
alias col-get-ind="py cli.py collect_indicator"
alias col-get-inds="py cli.py collect_indicators"

# Indicators
alias get-ind="py cli.py get_indicator"
alias get-inds="py cli.py get_indicators"

# Startup Commands
export PS1=' \e[5m\e[93m>>>\e[0m '
cl
space
welcome
space
cwd
lsa
