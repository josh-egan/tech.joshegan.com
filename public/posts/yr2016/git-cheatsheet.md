#  
## Git Resources

Resource                                                  | Notes
--------------------------------------------------------- | --------------------------------------------------------------------
http://git-scm.com/                                       | Official git website
http://git-scm.com/docs                                   | Git docs
https://help.github.com/articles/generating-ssh-keys/     | Generate an SSH Key
https://help.github.com/articles/changing-a-remote-s-url/ | Setup the Remote URL
https://github.com/pluralsight/git-switch                 | GitSwitch is a windows utility for managing multiple git credentials
https://github.com/pluralsight/pairing-station            | PairingStation is a mac app for managing multiple git credentials

## Awesome Git Aliases

```bash
git config --global alias.lga "log --all --color --graph --pretty=format:'%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.s "status -su"
git config --global alias.pr "pull --rebase"
git config --global alias.cm "commit -m"
git config --global alias.cam "commit -am"
git config --global alias.d "diff"
git config --global alias.ds "diff --staged"
```

## Global Configuration Preferences

```bash
git config --global core.autocrlf true
git config --global core.safecrlf false
git config --global push.default simple
git config --global color.ui true
```

## Git Commands
When working with `git` commands, options can be combined. For example, `git commit -am` is the same as `git commit -a -m` and `git status -su` is the same as `git status -s -u`.

### git help

Command              | Description
-------------------- | ---------------------------------------------------------------------------------------------------------
`git help`           | Prints basic usage for the `help` command to the console.
`git help <command>` | Launches detailed help docs for the specified command. For example, `git help commit` or `git help clone`

### git config
For a large, but not necessarily complete, list of configuration variables, see [http://git-scm.com/docs/git-config#_variables](http://git-scm.com/docs/git-config#_variables)

Command                                                      | Description
------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------
`git config`                                                 | Prints basic usage for the `config` command to the console.
`git config --global`                                        | Use the global user configuration
`git config --system`                                        | Use the system configuration, i.e. the config for all users on the computer
`git config --list`                                          | Prints the applicable configurations for the repository, namely the local, global, and system configurations, so some variables might be listed multiple times.
`git config <variable> <value>`                              | Set the value for a config variable. For example, `git config --global color.ui true`
`git config --get <variable>`                                | Get the value for a config variable. For example, `git config --global --get color.ui`
`git config --unset <variable>`                              | Remove a variable from the config.
`git config --global alias.<alias-name> "<aliased command>"` | Set a command alias. For example, `git config --global alias.pr "pull --rebase"` then use `git pr`
`git config --global user.name "User Name"`                  | Set the global user name
`git config --global user.email "user@site.com"`             | Set the global email address
`git config --global core.autocrlf true`                     | Set the global line endings policy to \r\n (carriage return) on checkout and \n (line feed) on commit
`git config --global core.autocrlf input`                    | Changes the line ending to \n on commit.
`git config --global core.editor <editor-command>`           | Set the global editor used by git for things like commit messages

### git init

Command    | Description
---------- | -----------------------------------
`git init` | Create a new, empty git repository.

### git status

Command         | Description
--------------- | ---------------------------------------------------------------
`git status`    | Shows changes since the last commit
`git status -s` | Displays a short, condensed status message. Alias for `--short`
`git status -u` | Show untracked files. Alias for `--untracked`

### git diff
When viewing the diff in a bash console, hit `q` to exit.

Command                          | Description
-------------------------------- | --------------------------------------------------------------------------------
`git diff`                       | Show the differences in tracked, unstaged files.
`git diff --staged`              | Show the differences in staged files. Synonymous with `git diff --cached`
`git diff <file>`                | Show the differences in the specified file.
`git diff <commit>`              | Show the changes you have in your working tree relative to the named `<commit>`.
`git diff <branch-1> <branch-2>` | Show the differences between two branches.
`git diff HEAD~5`                | Show the differences in the working tree against 5 commits back.

### git add

Command           | Description
----------------- | ---------------------------------------------------------------------------------------------------
`git add <path>`  | Add the specified file or folder to the staging area.
`git add -A`      | Add all modified and untracked files to the staging area. Alias for `--all`
`git add .`       | Functionally equivalent to `--all`
`git add *.txt`   | Wildcards are supported. A command like this would add all .txt files in the top level folder.
`git add "*.txt"` | Adding quotes around the wildcard will make it work in the top level folder and in all sub folders.

### git commit

Command                   | Description
------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------
`git commit`              | Commit the staged files. This will open up an editor to type in your commit message.
`git commit -m "message"` | Commit staged files with the specified commit message.
`git commit -a`           | Add all modified tracked files and then commit. This DOES NOT add untracked files. Alias for `--all`
`git commit --amend`      | Amend the last commit by adding additional files or changing the commit message. Do not amend commits that have been pushed to a remote repository!
`git commit --dry-run`    | Does not create a commit, but instead shows what would have been committed.

### git reset
Never use the `reset` command to undo changes that have been pushed! If changes have been pushed, use `git revert` to undo commits.

Command                     | Description
--------------------------- | -------------------------------------------------------------------------------------------
`git reset`                 | Unstage all files that have been staged using the `add` command.
`git reset <path>`          | Unstage the specified file or folder.
`git reset --soft HEAD^`    | Undo, or reset, the last commit and put the changes from that commit into the staging area.
`git reset --hard HEAD^`    | Undo, or reset, the last commit and discard the changes.
`git reset --hard HEAD^^^`  | Completely blow away the last three commits.
`git reset --soft <commit>` | Undo changes back to the specified commit.

### git log
When viewing the diff in a bash console, hit `q` to exit.

Command                   | Description
------------------------- | -------------------------------------------------------------------------------------------
`git log`                 | Show the commit log.
`git log --graph`         | Show a text based representation of the branches.
`git log --all`           | Show all of the commits as if they had been specified on the command line.
`git log --oneline`       | Show each commit on a single line.
`git log --abbrev-commit` | Show only the first 7 characters of the commit instead of the full 40 byte hex object name.
