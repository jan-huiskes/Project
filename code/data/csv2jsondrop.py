# Jan Huiskes
# 10740929

import csv
import json
# encoding = utf8, for characters that aren't recognized by python
import sys
reload(sys)
sys.setdefaultencoding('utf8')


# convert data to json
jsonfile = open('datadrop.json', 'w')
csvfile3 = open('data.csv', 'r')

def p2f(x):
    return float(x.strip('%'))

jsonfile.write('{"data" : [')
jsonfile.write('\n')
i = 0
for row in csvfile3:
    row = row.split()
    if len(row) == 12:
        j = 1
    else:
        j = 0
    jsonfile.write('{"id": "' + row[10 + j] + '",')
    # write rows based on the popualtion data
    if j == 0:
        jsonfile.write('"state": "' + row[0] + '"}')
    else:
        jsonfile.write('"state": "' + row[0] + ' ' + row[1] + '"}')

    if i != 51: # dont write a comma after the last row
        jsonfile.write(',\n')
    else:
        jsonfile.write('\n')
    i += 1
jsonfile.write('\n')
jsonfile.write(']}')
jsonfile.close()
csvfile3.close()
