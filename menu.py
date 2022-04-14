import csv
import json
from flask import jsonify
import re
#to asign for dictionarys
menuclass = ["Name","Description","Options","Dietry","Cost"]
drinkclass = ["Name","Description","Options","Cost"]

def replacenum(string,K):
    '''standerdise a string so it does not have numbers'''
    for ele in string:
        if ele.isdigit():
            string = string.replace(ele, K)
    return string


class Menu():
        

    def __init__(self):
        '''runs when menu is called asigns to two list to be appended to'''
        self.drinks_table = []
        self.menu_table = []


    def ReadMenu(self): # return a list of dictionaries
        '''reads the menu(csv file) than save to a dictionary'''
        # opens menu.csv
        with open("Menu.csv","r") as menu:
            reader2 = csv.reader(menu)
            # runs through the csv
            for rows in reader2:
                temp = {}
                # runs through each row in the csv
                for index,string in enumerate(rows):
                    # breaks options into a list if there are mulitple options
                    if "/" in string:
                        a = string.split("/")
                        temp.update({menuclass[index]:a})
                    elif menuclass[index] == "Options" and string == "":
                        temp.update({menuclass[index]:[]})
                    else:
                        temp.update({menuclass[index]:string})
                self.menu_table.append(temp)
            
        return self.menu_table
    
   
    def ReadDrinks(self):
        '''makes drink menu from a csv'''
        # opens the csv
        with open("DrinksMenu.csv","r") as drinkmenu:
            reader = csv.reader(drinkmenu)
            # runs through the csv
            for row in reader:
                temp = {}
                # runs through each row of the csv  
                for i,l in enumerate(row):
                    # breaks options into a list if there are mulitple options
                    if drinkclass[i] == "Options" and "/" in l:
                        a = l.split("/")
                        temp.update({drinkclass[i]:a})
                    else:
                        temp.update({drinkclass[i]:l})
                self.drinks_table.append(temp)
                        
        return self.drinks_table


    def Orderwrite(self,dictionary,name):
        '''writes data from front end to a json file'''
        #standers the name
        name_lower = name.lower().replace(' ','')
        # dumps to the name of the order .json
        with open(f"orders/{name_lower}.json","w") as f:
            json.dump(dictionary,f)
        f.close


    def getorders(self,name):
        '''makes recites from dict to strings in a list '''
        # output data that will be the recites 
        output1 = []
        drinkmenu = self.ReadDrinks()
        menu = self.ReadMenu()
        name_lower = name.lower().replace(' ','')
        # opens the name that was inputed.json 
        with open(f"orders/{name_lower}.json") as fjson:
            dictionary = json.load(fjson)
        total = 0
        # runs through the input dictionary
        for index in dictionary:
            # gets the name of the order
            if index == 'ordername':
                row = f"order name or code: {dictionary[index]}"
            else:
                # sets options to None if there are no options
                if dictionary[index]['Options'] == '':
                    options = 'None'
                else:
                    options = dictionary[index]['Options']
                if dictionary[index]['Cost'] == '':
                    # if there is no cost from the data geting it
                    for i,l in enumerate(drinkmenu):
                        if drinkmenu[i]['Name'] == replacenum(index,'') or replacenum(index,'') in drinkmenu[i]['Options']:
                            dictionary[index]['Cost'] = drinkmenu[i]['Cost'] 
                            cost = dictionary[index]['Cost']
                            break
                    for indexs,letter in enumerate(menu): 
                        if menu[indexs]['Name'] == replacenum(index,''):
                            break
                else:
                    cost = dictionary[index]['Cost'].replace('_',' ')
                row = f"Name: {replacenum(index,'')} | Options: {options} | :{cost}"
                # gets rid of char that are not numbers like $ and .
                cost = re.sub('[^\d\.]', '', cost)
                # gets total cost
                print(cost)
                total += int(cost.replace('.',''))/100 
            if index == 'ordername':
                output1.insert(0,row)
            else:
                output1.append(row)
        output1.append('total: $'+str(round(total,0)))
        print(jsonify(output1))
        # outputs a jsonify string
        return jsonify(output1)