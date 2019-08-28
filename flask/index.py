from flask import Flask, render_template, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'diksha143'
app.config['MYSQL_DATABASE_DB'] = 'movies'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor =conn.cursor()

cursor.execute("SELECT * from data")
data = cursor.fetchall()
# print(data)
@app.route('/hello')
@cross_origin()
def index_as_get():
    # return render_template('ind.ejs', data=data)
    return jsonify(data)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)
