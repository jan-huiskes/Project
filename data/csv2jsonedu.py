# Jan Huiskes
# 10740929

import csv
import json
import sys
reload(sys)
sys.setdefaultencoding('utf8')


jsonfile = open('dataedu.json', 'w')
csvfile3 = open('dataedu.csv', 'r')

def p2f(x):
    return float(x.replace(',','.'))

jsonfile.write('{"data" : {')
jsonfile.write('\n')
i = 0
for row in csvfile3:
    row = row.split()
    if len(row) == 23:
        j = 1
    else:
        j = 0
    jsonfile.write('"' + row[1 + j] + '": [')
    jsonfile.write('\n')
    jsonfile.write('{"type": "advanced", "per":' + str(p2f(row[21 + j])) + '},')
    jsonfile.write('\n')
    jsonfile.write('{"type": "bachelor", "per":' + str(p2f(row[20 + j]) - p2f(row[21 + j])) + '},')
    jsonfile.write('\n')
    jsonfile.write('{"type": "highschool", "per":' + str(p2f(row[19 + j]) - p2f(row[20 + j])) + '},')
    jsonfile.write('\n')
    jsonfile.write('{"type": "none", "per":' + str(100 - p2f(row[19 + j])) + '}]')


    if i != 51: # dont write a comma after the last row
        jsonfile.write(',\n')
    else:
        jsonfile.write('\n')
    i += 1
jsonfile.write('\n')
jsonfile.write('}}')
jsonfile.close()
csvfile3.close()
