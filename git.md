```sh

git reset HEAD^        //回到未commit前的狀態，修改的內容還在，需要重新執行 git add 

git reset --soft HEAD^  //回到未commit前的狀態，修改的內容還在，不需要重新執行 git add

git reset --hard HEAD^  //回到未commit前的狀態，修改的內容會復原

git reset --hard <commit hash> //回到某一版本

git checkout <filename>  //復原修改的檔案

git checkout <commit hash> <filename> //將檔案還原到特定的commit

git stash       //將修改的內容暫存起來

git stash pop      //把暫存的內容丟出來

```
