import csv
drinks_table = {}
menu_table = {}


def ReadMenu():
    '''reads the menu(csv file) than save to a dictionary'''
    with open("DrinksMenu.csv","r") as drinkmenu:
        reader = csv.reader(drinkmenu)
        for row in reader:
            temp = []
            for i,l in enumerate(row):
                if i != 0:
                    temp.append(l) 
            drinks_table.update({row[0]:temp})
    with open("Menu.csv","r") as menu:
        reader2 = csv.reader(menu)
        for rows in reader2:
            temp2 = [] 
            for index,string in enumerate(rows):
                if index != 0:
                    temp2.append(string)
            menu_table.update({rows[0]:temp2})


def main():
    ReadMenu()
    print(drinks_table,menu_table)

if __name__ == "__main__":
    main()
