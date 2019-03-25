from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins":"*"}})

# POST article Data
@app.route('/api/article/post', methods=['POST'])
def postJsonArticleHandler():
    content = request.get_json()
    print(content)
    if os.path.exists('../public/assets/content/articles/data.json'):
      with open('../public/assets/content/articles/data.json', 'r+') as file:
        temp = {}
        temp2 = {}
        data = json.load(file)
        loadData = data['articles']
        try:
          for loop in loadData:
            count = loop['id']
          content['article']['id'] = count+1
        except:
          content['article']['id'] = 1
        for key, value in content.items():
          for key2, value2 in value.items():
            if key2 == 'title':
              temp[key2] = value2
              temp2[key2] = value2
            elif key2 == 'article':
              temp2[key2] = value2
            else:
              temp[key2] = value2
              temp2[key2] = value2

        loadData.append(temp)
        tempDict = dict(articles=loadData)
        tempDict2 = dict(article=temp2)
        file.seek(0)
        file.truncate()
        file.write(json.dumps(tempDict))
        f = open('../public/assets/content/articles/article/' + str(content['article']['id']) + '.json', 'w')
        f.write(json.dumps(tempDict2))
        f.close()
    else:
      with open('../public/assets/content/articles/data.json', 'w') as createArticles:
        temp = {}
        temp2 = {}
        content['article']['id'] = 1
        for key, value in content.items():
          for key2, value2 in value.items():
            if key2 == 'title':
              temp[key2] = value2
              temp2[key2] = value2
            elif key2 == 'article':
              temp2[key2] = value2
            else:
              temp[key2] = value2
              temp2[key2] = value2

        temp = [temp]
        tempDict = dict(articles=temp)
        tempDict2 = dict(article=temp2)

        createArticles.write(json.dumps(tempDict))
        f = open('../public/assets/content/articles/article/'+str(content['article']['id'])+'.json', 'w')
        f.write(json.dumps(tempDict2))
        f.close()

    tempID = {}
    tempResponse = {}
    for key, value in content.items():
      for key2, value2 in value.items():
        if key2 == 'id':
          tempID[key2] = value2

    tempResponse['articles'] = tempID
    js = json.dumps(tempResponse)
    resp = Response(js, status=201, mimetype='application/json')
    resp.headers['Link'] = 'http://localhost:81'
    return resp

# POST Thought Data
@app.route('/api/thought/post', methods=['POST'])
def postJsonThoughtHandler():
    content = request.get_json()
    if os.path.exists('../public/assets/content/thoughts/data.json'):
      with open('../public/assets/content/thoughts/data.json', 'r+') as file:
        temp = {}
        temp2 = {}
        data = json.load(file)
        loadData = data['thoughts']
        try:
          for loop in loadData:
            count = loop['id']
          content['thought']['id'] = count+1
        except:
          content['thought']['id'] = 1
        for key, value in content.items():
          for key2, value2 in value.items():
            if key2 == 'name':
              temp[key2] = value2
              temp2[key2] = value2
            elif key2 == 'thought':
              temp2[key2] = value2
            else:
              temp[key2] = value2
              temp2[key2] = value2

        loadData.append(temp)
        tempDict = dict(thoughts=loadData)
        tempDict2 = dict(thought=temp2)
        file.seek(0)
        file.truncate()
        file.write(json.dumps(tempDict))
        f = open('../public/assets/content/thoughts/thought/' + str(content['thought']['id']) + '.json', 'w')
        f.write(json.dumps(tempDict2))
        f.close()
    else:
      with open('../public/assets/content/thoughts/data.json', 'w') as createThoughts:
        temp = {}
        temp2 = {}
        content['thought']['id'] = 1
        for key, value in content.items():
          for key2, value2 in value.items():
            if key2 == 'name':
              temp[key2] = value2
              temp2[key2] = value2
            elif key2 == 'thought':
              temp2[key2] = value2
            else:
              temp[key2] = value2
              temp2[key2] = value2

        temp = [temp]
        tempDict = dict(thoughts=temp)
        tempDict2 = dict(thought=temp2)

        createThoughts.write(json.dumps(tempDict))
        f = open('../public/assets/content/thoughts/thought/'+str(content['thought']['id'])+'.json', 'w')
        f.write(json.dumps(tempDict2))
        f.close()

    tempID = {}
    tempResponse = {}
    for key, value in content.items():
      for key2, value2 in value.items():
        if key2 == 'id':
          tempID[key2] = value2

    tempResponse['thoughts'] = tempID
    js = json.dumps(tempResponse)
    resp = Response(js, status=201, mimetype='application/json')
    resp.headers['Link'] = 'http://localhost:81'
    return resp

# POST Jobs Data
@app.route('/api/job/post', methods=['POST'])
def postJsonJobHandler():
    content = request.get_json()
    if os.path.exists('../public/assets/content/jobs/data.json'):
      with open('../public/assets/content/jobs/data.json', 'r+') as file:
        temp = {}
        temp2 = {}
        data = json.load(file)
        loadData = data['jobs']
        try:
          for loop in loadData:
            count = loop['id']
          content['job']['id'] = count+1
        except:
          content['job']['id'] = 1
        for key, value in content.items():
          for key2, value2 in value.items():
            if key2 == 'name':
              temp[key2] = value2
              temp2[key2] = value2
            elif key2 == 'description':
              temp2[key2] = value2
            else:
              temp[key2] = value2
              temp2[key2] = value2

        loadData.append(temp)
        tempDict = dict(jobs=loadData)
        tempDict2 = dict(job=temp2)
        file.seek(0)
        file.truncate()
        file.write(json.dumps(tempDict))
        f = open('../public/assets/content/jobs/job/' + str(content['job']['id']) + '.json', 'w')
        f.write(json.dumps(tempDict2))
        f.close()
    else:
      with open('../public/assets/content/jobs/data.json', 'w') as createJob:
        temp = {}
        temp2 = {}
        content['job']['id'] = 1
        for key, value in content.items():
          for key2, value2 in value.items():
            if key2 == 'name':
              temp[key2] = value2
              temp2[key2] = value2
            elif key2 == 'description':
              temp2[key2] = value2
            else:
              temp[key2] = value2
              temp2[key2] = value2

        temp = [temp]
        tempDict = dict(jobs=temp)
        tempDict2 = dict(job=temp2)

        createJob.write(json.dumps(tempDict))
        f = open('../public/assets/content/jobs/job/'+str(content['job']['id'])+'.json', 'w')
        f.write(json.dumps(tempDict2))
        f.close()

    tempID = {}
    tempResponse = {}
    for key, value in content.items():
      for key2, value2 in value.items():
        if key2 == 'id':
          tempID[key2] = value2

    tempResponse['jobs'] = tempID
    js = json.dumps(tempResponse)
    resp = Response(js, status=201, mimetype='application/json')
    resp.headers['Link'] = 'http://localhost:81'
    return resp

# DELETE Data
@app.route('/api/data/delete/<int:user_id>', methods=['DELETE'])
def deleteUser(user_id):
  with open('../public/assets/content/articles/data.json', 'r+') as read_file:
    newDict = {}
    data = json.load(read_file)
    loadDict = data['datas']
    try:
      for loop in loadDict:
        if user_id == loop['id']:
          selectedUser = loop

      count = selectedUser['id']
      os.remove('../public/assets/content/articles/article/' + str(count) + '.json')

      loadDict.remove(selectedUser)
      read_file.seek(0)
      read_file.truncate()
      newDict['datas'] = loadDict
      read_file.write(json.dumps(newDict))
      resp = jsonify(selectedUser)
    except:
      resp = jsonify("ID Not Found")
  return resp

# PUT Data
@app.route('/api/data/update/<int:user_id>', methods=['PUT'])
def updateUser(user_id):
  updateContent = request.get_json()
  with open('../public/assets/content/articles/data.json', 'r+') as read_file:
    data = json.load(read_file)
    loadDict = data['datas']
    try:
      for loop in loadDict:
        if user_id == loop['id']:
          selectedUser = loop

      count = selectedUser['id']
      f = open('../public/assets/content/articles/article/' + str(count) + '.json', 'r+')
      data2 = json.load(f)
      loadDict2 = data2['data']
      loadDict2.update(updateContent['data'])
      newDict = dict(data=loadDict2)

      selectedUser['title'] = updateContent['data']['title']

      f.seek(0)
      f.truncate()
      read_file.seek(0)
      read_file.truncate()
      newDict2 = dict(datas=loadDict)
      read_file.write(json.dumps(newDict2))
      f.write(json.dumps(newDict))
      f.close()
      resp = jsonify(selectedUser)
    except:
      resp = jsonify("ID Not Found")
  return resp

# GET Data By ID
@app.route('/api/data/get/<int:user_id>', methods=['GET'])
def userListbyID(user_id):
  with open('../public/assets/content/jobs/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['jobs']
    try:
      for loop in dictData:
        if user_id == loop['id']:
          selectedUser = loop
      count = selectedUser['id']
      f = open('../public/assets/content/jobs/job/'+str(count)+'.json', 'r')
      data2 = json.load(f)
      outDict = data2['job']
      selectedUser.update(outDict)
      f.close()
      resp = jsonify(selectedUser)
      print(selectedUser)
    except:
      resp = jsonify("ID Not Found")
  return resp

# #GET Latest Data
# @app.route('/api/data/list', methods=['GET'])
# def userList():
#   with open('../public/assets/content/articles/data.json', 'r') as read_file:
#     data = json.load(read_file)
#     dictData = data['datas']
#     latestArticle = dictData[-3:]
#     # temp = []
#     # for loop in latestNews:
#     #   count = loop['id']
#     #   f = open('../public/assets/content/articles/article/'+str(count)+'.json', 'r')
#     #   data2 = json.load(f)
#     #   outDict = data2['data']
#     #   loop.update(outDict)
#     #   f.close()
#     #
#     dictData.clear()
#     dictData.extend(latestArticle)
#     with open()
#     return jsonify(data)

#GET Latest article Data
@app.route('/api/article/list', methods=['GET'])
def articleList():
  with open('../public/assets/content/articles/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['articles']
    latestArticle = dictData[-3:]
    temp = []
    for loop in latestArticle:
      count = loop['id']
      f = open('../public/assets/content/articles/article/'+str(count)+'.json', 'r')
      data2 = json.load(f)
      outDict = data2['article']
      loop.update(outDict)
      f.close()

    dictData.clear()
    dictData.extend(latestArticle)
    return jsonify(data)

#GET Latest Thought Data
@app.route('/api/thought/list', methods=['GET'])
def thoughtList():
  with open('../public/assets/content/thoughts/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['thoughts']
    latestThought = dictData[-6:]
    temp = []
    for loop in latestThought:
      count = loop['id']
      f = open('../public/assets/content/thoughts/thought/'+str(count)+'.json', 'r')
      data2 = json.load(f)
      outDict = data2['thought']
      loop.update(outDict)
      f.close()

    dictData.clear()
    dictData.extend(latestThought)
    return jsonify(data)

#GET Latest job Data
@app.route('/api/job/list', methods=['GET'])
def jobList():
  with open('../public/assets/content/jobs/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['jobs']
    latestThought = dictData[-6:]
    temp = []
    for loop in latestThought:
      count = loop['id']
      f = open('../public/assets/content/jobs/job/'+str(count)+'.json', 'r')
      data2 = json.load(f)
      outDict = data2['job']
      loop.update(outDict)
      f.close()

    dictData.clear()
    dictData.extend(latestThought)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
