from menu import Menu
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def myroot():
    #m = Menu()
    #return m.ReadMenu(),m.ReadDrinks()
    return " hello"

@app.route('/menu/')
def show_menu():
    m = Menu()
    menu = m.ReadMenu()
    print(menu)
    return render_template('menu.html', menu=menu, title="Cafe" )
    #return m.ReadMenu(),m.ReadDrinks()

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)
    

if __name__ == "__main__":
    app.run()