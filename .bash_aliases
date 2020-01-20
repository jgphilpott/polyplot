# Welcome Message
alias welcome="printf '\e[93mWelcome to iGraph!\e[0m 😍\n'"

# Variables
alias space="printf '\n'"
alias cl="clear"

# Common Use
alias cwd="space && printf '\e[93mThe current working directory is:\e[0m ' && pwd && space"
alias lsa="space && printf '\e[93mThe files in the current directory are:\e[0m\n' && space && ls -a && space"

# Startup Commands
export PS1=' \e[5m\e[93m>>>\e[0m '
cl
space
welcome
space
cwd
lsa
