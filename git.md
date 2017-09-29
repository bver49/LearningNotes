
尚未PUSH之前，可以做的修改

```sh

git reset HEAD^        //回到未commit前的狀態，修改的內容還在，需要重新執行 git add 

git reset --soft HEAD^  //回到未commit前的狀態，修改的內容還在，不需要重新執行 git add

git reset --hard HEAD^  //回到未commit前的狀態，修改的內容會復原

git checkout filename  //復原修改的檔案

```

把修改的內容換到新的branch

```sh

git stash       //將修改的內容暫存起來

git checkout -b 'newbranch'  //開一個新branch並切換過去

git stash pop      //把在舊的branch修改的內容加到新的branch

```
