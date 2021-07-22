from flask import Flask, jsonify, make_response
import MySQLdb
import os
import json
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)

ufile = open('user.txt','r')
user = ufile.read()[:-1]
ufile.close()
pfile = open('password.txt','r')
password = pfile.read()[:-1]
pfile.close()

@app.route('/')
def index():
    return "<h1>Welcome to CRUD API!</h1>"

@app.route("/get_visitor_by_id/<int:id>", methods=['GET'])
def get_visitor(id):
    db = MySQLdb.connect("130.61.147.255", user, password, "birthday")
    cur = db.cursor()
    proc = "get_visitor_by_id"
    cur.callproc(proc,[id])
    
    columns=[x[0] for x in cur.description]
    data = cur.fetchall()
    json_data = []
    for result in data:
        json_data.append(dict(zip(columns,result)))
    # print("json_data (proc):")
    # print(json_data)
    response = {'data': json_data}
    # print(response)
    return make_response(jsonify(response), 200)

@app.route("/create_visitor/<string:visitor_name>/<string:visitor_last_name>/<int:visitor_age>", methods=['POST'])
def create_visitor(visitor_name, visitor_last_name, visitor_age):
    db = MySQLdb.connect("130.61.147.255", user, password, "birthday")
    cur = db.cursor()
    proc = "create_visitor"
    cur.callproc(proc,[visitor_name, visitor_last_name, visitor_age])
    response = {'data': f'["Name": "{visitor_name}", "Last name": "{visitor_last_name}", "Age": "{visitor_age}"]'}
    return make_response(jsonify(response), 200)
    
@app.route("/delete_visitor_by_id/<int:id>", methods=['DELETE'])
def delete_visitor(id):
    db = MySQLdb.connect("130.61.147.255", user, password, "birthday")
    cur = db.cursor()
    proc = "delete_visitor_by_id"
    results = cur.callproc(proc,[id])
    # cur.commit()
    print(results)
    response = {'data': f'["Deleted": "{id}"]'}
    return make_response(jsonify(response), 200)

if __name__ == '__main__':
    app.run(host="130.61.147.255", port=5000)