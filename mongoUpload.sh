#!/bin/bash

echo Please check if you have Mongo Import installed or not.
echo If you don\'t have it installed, install it using the following command :
echo \$ sudo apt-get install mongodb-org-tools
echo
echo Enter path of your file which you want to upload to the database :
read path
echo
echo Enter collection name :
read collectionName

mongoimport -h ds163705.mlab.com:63705 -d btp -c $collectionName -u vkmavi11 -p bittu420 --file $path --type csv --headerline

