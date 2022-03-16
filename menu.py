import csv
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
                temp1 = {}

                for index,string in enumerate(rows):
                    temp1.update({menuclass[index]:string})
                self.menu_table.append(temp1)
        return self.menu_table
    
    def MenuItems(self,menu):
        for i,l in enumerate(menu):
            for index,letters in enumerate(menu[i]):
                pass
                


    def ReadDrinks(self):
        
        with open("DrinksMenu.csv","r") as drinkmenu:
            reader = csv.reader(drinkmenu)
            for row in reader:
                temp = []
                for i,l in enumerate(row):
                    self.drinks_table.append({drinkclass[i]:l})
                        
        return self.drinks_table

m = Menu()
am = m.ReadMenu()
print(am)


