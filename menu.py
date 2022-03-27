import csv
import json
menuclass = ["Name","Description","Options","Dietry","Cost"]
drinkclass = ["Name","Description","Options","Cost"]
class Menu():

    def __init__(self):
        self.drinks_table = []
        self.menu_table = []

    def ReadMenu(self): # return a list of dictionaries
        '''reads the menu(csv file) than save to a dictionary'''
        with open("Menu.csv","r") as menu:
            reader2 = csv.reader(menu)
            for rows in reader2:
                temp = {}
                for index,string in enumerate(rows):
                    if "/" in string:
                        a = string.split("/")
                        temp.update({menuclass[index]:a})
                    else:
                        temp.update({menuclass[index]:string})
                self.menu_table.append(temp)
        return self.menu_table
    
   
                


    def ReadDrinks(self):
        
        with open("DrinksMenu.csv","r") as drinkmenu:
            reader = csv.reader(drinkmenu)
            for row in reader:
                temp = {}
                temp2 = {}
                for i,l in enumerate(row):
                    if drinkclass[i] == "Options" and "/" in l:
                        a = l.split("/")
                        temp.update({drinkclass[i]:a})

                    else:
                        temp.update({drinkclass[i]:l})
                self.drinks_table.append(temp)
                        
        return self.drinks_table


    def Orderwrite(self,dictionary,name):
        with open(f"orders/{name}.json","w") as f:
            json.dump(dictionary,f)
        f.close




m = Menu()
ma = m.ReadDrinks()
print(ma)



