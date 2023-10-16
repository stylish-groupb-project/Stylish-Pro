#!/bin/bash

declare -a students=(ramy vincent josh jolie yuna sandy nick ann tim jason joe martin lando jaren) 

dir=workspace
rm -r ./${dir}
mkdir ${dir}
cd ${dir}

for i in "${students[@]}"
do
   :
   echo add folder: students/${i} 
   mkdir ${i}
   touch ${i}/README.md
done

for i in "${students[@]}"
do
   :
   echo ${i}_develop
   git branch ${i}_develop
   git push origin ${i}_develop
done
