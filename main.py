import json
from menu import Menu
from flask import Flask, render_template, send_from_directory, request, jsonify
import os
# instalizes flask
app = Flask(__name__)

@app.route('/')
def myroot():
    return render_template('main.html')
# sets up the page /menu/
@app.route('/menu/')
def show_menu():
    '''gets menu from the csv and then renders the html template'''
    # gets the data from the csv files with the menu class
    m = Menu()
    # menu in dict form
    menu = m.ReadMenu()
    # drink menu in dict form
    a = m.ReadDrinks()
    # renders a template so I can use jinja in html
    return render_template('menu.html', menu=menu, title="Cafe",drinkmenu = a, nothing = "" )
    #return m.ReadMenu(),m.ReadDrinks()
# lets us use app.js and styles.css
@app.route('/static/<path:path>')
def send_static(path):
    '''make sure the templates can find the js and css files'''
    return send_from_directory('static', path)
    
@app.route('/orders/')
def orderspage():
    '''renders the template for the orders.html'''
    return render_template('orders.html')

@app.route('/order',methods=['POST'])
def orders():
    '''recives the data inputed to the menu page'''
    # gets the order data from the front end
    data = request.get_json()
    # instalizes Menu
    m = Menu()
    # writes the data to a json
    m.Orderwrite(data,data["ordername"])
    # returns the recit data
    return m.getorders(data['ordername']) 

@app.route('/orders/name',methods=["POST"])
def ordersname():
    '''gets the name of the persons geting there order and send the display for them'''
    name = request.get_json()
    m = Menu()
    print(m.getorders(name['Name']))
    return m.getorders(name['Name'])

@app.route('/kitchen/')
def kitchen():
    '''run kitchen.html'''
    output = []
    for file in os.listdir('/Users/micah/Documents/GitHub/csc-pointofsalsesystems/orders'):
        if file.endswith('.json'):
            file_split = file.split('.')
            file_name = file_split[0]
            m = Menu()
            output.append(m.getorders(file_name))
    return render_template('kitchen.html',orders = output)

@app.route('/admin/')
def admin():
    return render_template('admin.htmld')

if __name__ == "__main__":
    app.debug = True
    app.run()