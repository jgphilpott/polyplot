def warning_loop(warning="", yes_message="", no_message=""):

    print(warning)

    while True:

        prompt = "\033[93my or n:\033[0m "
        reply = input(prompt).lower()

        if reply == "y":

            print(yes_message)
            return True

        elif reply == "n":

            print(no_message)
            return False
