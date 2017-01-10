# Jan Huiskes
# 10740929

import csv
import json
# encoding = utf8, for characters that aren't recognized by python
import sys
reload(sys)
sys.setdefaultencoding('utf8')


# convert data to json
jsonfile = open('data.json', 'w')
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
    jsonfile.write('"' + row[10 + j] + '": {')
    # write rows based on the popualtion data
    if int(row[4 + j]) == 0:
        jsonfile.write('"fillKey": "republican",')
        jsonfile.write('\n')
        jsonfile.write('"kiesman": ' + row[7 + j] + ',')
    elif int(row[7 + j]) == 0:
        jsonfile.write('"fillKey": "democrat",')
        jsonfile.write('\n')
        jsonfile.write('"kiesman": ' + row[4 + j] + ',')
    else:
        jsonfile.write('"fillKey": "tot",')
        jsonfile.write('\n')
        jsonfile.write('"totkiesman": ' + str((int(row[4 + j]) + int(row[7 + j]))) + ',')
        jsonfile.write('\n')
        jsonfile.write('"Dkiesman": ' + row[4 + j] + ',')
        jsonfile.write('\n')
        jsonfile.write('"Rkiesman": ' + row[7 + j] + ',')
    jsonfile.write('\n')
    jsonfile.write('"Rvote": ' + str(p2f(row[6 + j])) + ',')
    jsonfile.write('\n')
    jsonfile.write('"Dvote": ' + str(p2f(row[3 + j])) + ',')
    jsonfile.write('\n')
    if j == 0:
        jsonfile.write('"state": "' + row[0] + '",')
    else:
        jsonfile.write('"state": "' + row[0] + '' + row[1] + '",')
    jsonfile.write('\n')
    jsonfile.write('"Lvote": ' + str(p2f(row[9 + j])) + ',')
    jsonfile.write('\n')
    jsonfile.write('"Ovote": ' + str((100 - p2f(row[3 + j]) - p2f(row[6 + j]) - p2f(row[9 + j]))) + '}')

    if i != 51: # dont write a comma after the last row
        jsonfile.write(',\n')
    else:
        jsonfile.write('\n')
    i += 1
jsonfile.write('\n')
jsonfile.write('}}')
jsonfile.close()
csvfile3.close()
