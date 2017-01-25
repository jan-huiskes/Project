# Jan Huiskes
# 10740929

import csv
import json
import sys
reload(sys)
sys.setdefaultencoding('utf8')


jsonfile = open('datalabel.json', 'w')
csvfile3 = open('data.csv', 'r')

def p2f(x):
    return float(x.strip('%'))

jsonfile.write('{"data" : {')
jsonfile.write('\n')
i = 0
for row in csvfile3:
    row = row.split()
    if len(row) == 12:
        j = 1
    else:
        j = 0
    jsonfile.write('"' + row[10 + j] + '" : ')
    if i != 51: # dont write a comma after the last row
        jsonfile.write('"' + str((int(row[4 + j]) + int(row[7 + j]))) + '",\n')
    else:
        jsonfile.write('"' + str((int(row[4 + j]) + int(row[7 + j]))) + '"\n')
    i += 1
jsonfile.write('\n')
jsonfile.write('}}')
jsonfile.close()
csvfile3.close()
