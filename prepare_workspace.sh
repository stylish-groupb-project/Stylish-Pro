#!/bin/bash

declare -a students=(brandon carol cynthia erin henry lsabelle jade jerome jessie jonathan kevin louis michael_ho michael_wang michelle morrison sean victor vincent) 

# dir=workspace
# rm -r ./${dir}
# mkdir ${dir}
# cd ${dir}

# for i in "${students[@]}"
# do
#    :
#    echo add folder: students/${i} 
#    mkdir ${i}
#    touch ${i}/README.md
# done

for i in "${students[@]}"
do
   :
   echo ${i}_develop
   git branch ${i}_develop
   git push origin ${i}_develop
done
