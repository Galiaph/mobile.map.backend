#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Скрипт для заполнения базы данных из xlsx файла
"""

__author__ = "Vadim Shemyatin"

from openpyxl import load_workbook
import pymysql.cursors

def getBool(el):
    if el is None or el == 'Нет' or el == 'нет':
        return False
    return True

def getStatus(el):
    if el is None or el == 'Не в эфире':
        return False
    return True

if __name__ == "__main__":
    con = pymysql.connect(host='localhost', user='mobile', password='password', database='mobile', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    with con:
        with con.cursor() as cursor:
           wb = load_workbook('./test2.xlsx')
           #sheet = wb['МИР']
           sheet = wb['Лист1']
           e = sheet.iter_rows()
           cells = list(e)
           for i in cells:
               sql = "INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"
               cursor.execute(sql, (i[3].value, i[0].value, i[1].value, i[2].value, '3', getBool(i[4].value), getBool(i[5].value), getBool(i[6].value), getStatus(i[7].value)))
        con.commit()

