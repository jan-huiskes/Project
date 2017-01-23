# Jan Huiskes
# 10740929

import csv
import json
# encoding = utf8, for characters that aren't recognized by python
import sys
reload(sys)
sys.setdefaultencoding('utf8')
from itertools import izip

def p2f(x):
    return float(x.strip('%'))

def c2p(x):
    return float(x.replace(',','.'))


# convert data to json

jsonfile = open('datascatter.json', 'w')
with open('data.csv', 'r') as file1, open('dataedu.csv', 'r') as file2:
    jsonfile.write('{"data" : [')
    jsonfile.write('\n')
    i = 0
    for x, y in izip(file1, file2):
        x = x.split()
        y = y.split()
        if len(x) == 12:
            j = 1
        else:
            j = 0
        # skip DC and total votes
        if x[10 + j] != 'tot' and x[10 + j] != 'DC':
            jsonfile.write('{ "id" : "' + x[10 + j] + '",')
            # write rows based on the popualtion data
            if int(x[4 + j]) == 0:
                jsonfile.write('"color": "#B01733",')
                jsonfile.write('\n')
                jsonfile.write('"vote": ' + str(p2f(x[6 + j])) + ',')
            elif int(x[7 + j]) == 0:
                jsonfile.write('"color": "#1441C7",')
                jsonfile.write('\n')
                jsonfile.write('"vote": ' + str(p2f(x[3 + j])) + ',')
            else:
                jsonfile.write('"color": "#1441C7",')
                jsonfile.write('\n')
                jsonfile.write('"vote": ' + str(p2f(x[3 + j])) + ',')
            jsonfile.write('\n')
            jsonfile.write('"kiesman": ' + str((int(x[4 + j]) + int(x[7 + j]))) + ',')
            jsonfile.write('\n')
            if j == 0:
                jsonfile.write('"state": "' + x[0] + '",')
            else:
                jsonfile.write('"state": "' + x[0] + ' ' + x[1] + '",')
            jsonfile.write('\n')
            jsonfile.write('"smart": ' + str(c2p(y[20 + j])) + ',')
            jsonfile.write('\n')
            jsonfile.write('"radius": ' + str(2*((int(x[4 + j]) + int(x[7 + j]))**0.5)) + '}')

            if i != 49: # dont write a comma after the last row
                jsonfile.write(',\n')
            else:
                jsonfile.write('\n')
            i += 1
    jsonfile.write('\n')
    jsonfile.write(']}')
    jsonfile.close()
    file1.close()
    file2.close()
