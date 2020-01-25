# Source
alias source="source ~/app/back/tools/flint/aliases.sh"

# Welcome
alias welcome="printf '\n\e[93mWelcome to iGraph!\e[0m 😍\n\n'"

# Variables
alias cl="clear"
alias space="printf '\n'"

# Common
alias cwd="printf '\n\e[93mThe current working directory is:\e[0m ' && pwd && space"
alias lsa="printf '\n\e[93mAll the files in the current directory are:\e[0m\n\n' && ls -a && space"

# Python
alias py="python3"

# Fire
alias fire="space && py app/cli.py && space"

# Database
alias db-client="py app/cli.py find_client --log=True"
alias db-data="py app/cli.py find_database --log=True"
alias db-drop="py app/cli.py drop_database --log=True"

# Collections
alias col="py app/cli.py find_collection --log=True"
alias cols="py app/cli.py find_collections --log=True"
alias col-drop="py app/cli.py drop_collection --log=True"

# Indexes
alias ind="py app/cli.py find_index --log=True"
alias inds="py app/cli.py find_indexes --log=True"
alias upd-ind="py app/cli.py update_index --log=True"
alias upd-inds="py app/cli.py update_indexes --log=True"

# Startup
export PS1=" \e[5m\e[93m>>>\e[0m "
echo -ne "\e]10;#00ff00\e\\"
echo -ne "\e]11;#000000\e\\"
cl
welcome
cwd
lsa
