from flask import Flask, render_template, jsonify
from flaskext.mysql import MySQL
from bson import json_util

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'diksha143'
app.config['MYSQL_DATABASE_DB'] = 'movies'
app.config['MYSQLmongo.db._DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor =conn.cursor()

cursor.execute("SELECT * from data")
data = cursor.fetchall()
# print(data)
@app.route('/hello')
@cross_origin()
def mys():
    # return render_template('ind.ejs', data=data)
    return json_util.dumps(data)

@app.route('/hola')
@cross_origin()
def mong():
    from flask import Flask
    from flask_pymongo import PyMongo

    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/movies"
    mongo = PyMongo(app)
    data = mongo.db.data.find({}, {'_id': False})
    return json_util.dumps(data)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)
