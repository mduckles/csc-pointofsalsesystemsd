from menu import Menu
from flask import Flask, render_template, send_from_directory, request, jsonify
# instalizes flask
app = Flask(__name__)

@app.route('/')
def myroot():
    #m = Menu()
    #return m.ReadMenu(),m.ReadDrinks()
    return " hello"
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
    data = request.get_json()
    data["Name"] = data["Name"].lower()
    data["Name"] = data["Name"].replace(" ","")
    m = Menu()
    m.Orderwrite(data,data["Name"])
    return jsonify(data)

@app.route('/orders/name',methods=["POST"])
def ordersname():
    '''gets the name of the persons geting there order and send the display for them'''
    name = request.get_json()
    print(name)
    return jsonify(name)

if __name__ == "__main__":
    app.run()