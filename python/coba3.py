from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import json
import os
import base64
import re
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins":"*"}})

# POST article Data
@app.route('/api/article/post', methods=['POST'])
def postJsonArticleHandler():
    content = request.get_json()
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
            elif key2 == 'thumbImage':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                pass
              else:
                if not os.path.isdir("../public/assets/content/articles/article-image/" + str(content['article']['id'])):
                  os.mkdir("../public/assets/content/articles/article-image/" + str(content['article']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])
                img = re.findall(r'base64,(.*)', tempIMG[0], re.I | re.M)
                decodeData = base64.b64decode(img[0])
                source = "../public/assets/content/articles/article-image/" + str(
                  content['article']['id']) + '/thumbnail-image.jpg'
                splitSource = re.findall(r'public(.*)', source, re.I | re.M)
                image_result = open(source, 'wb')
                image_result.write(decodeData)
                image_result.close()
                temp[key2] = splitSource[0]
                temp2[key2] = splitSource[0]

            elif key2 == 'article':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                temp2[key2] = value2
              else:
                if not os.path.isdir("../public/assets/content/articles/article-image/" + str(content['article']['id'])):
                  os.mkdir("../public/assets/content/articles/article-image/" + str(content['article']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])

                count = 1
                tempSRC = []
                for toLocal in tempIMG:
                  img = re.findall(r'base64,(.*)', toLocal, re.I | re.M)
                  decodeData = base64.b64decode(img[0])
                  source = "../public/assets/content/articles/article-image/"+str(content['article']['id'])+'/image' + str(count) + '.jpg'
                  splitSource = re.findall(r'public/(.*)', source, re.I | re.M)
                  tempSRC.append(splitSource)
                  image_result = open(source , 'wb')
                  image_result.write(decodeData)
                  image_result.close()
                  count += 1
                for iterHTML, iterSRC in zip(html_img_tags, tempSRC):
                  iterHTML['src'] = iterSRC
                temp2[key2] = str(soup)
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
            elif key2 == 'thumbImage':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                pass
              else:
                if not os.path.isdir("../public/assets/content/articles/article-image/" + str(content['article']['id'])):
                  os.mkdir("../public/assets/content/articles/article-image/" + str(content['article']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])
                img = re.findall(r'base64,(.*)', tempIMG[0], re.I | re.M)
                decodeData = base64.b64decode(img[0])
                source = "../public/assets/content/articles/article-image/" + str(
                  content['article']['id']) + '/thumbnail-image.jpg'
                splitSource = re.findall(r'public(.*)', source, re.I | re.M)
                image_result = open(source, 'wb')
                image_result.write(decodeData)
                image_result.close()
                temp[key2] = splitSource[0]
                temp2[key2] = splitSource[0]
            elif key2 == 'article':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                temp2[key2] = value2
              else:
                if not os.path.isdir(
                  "../public/assets/content/articles/article-image/" + str(content['article']['id'])):
                  os.mkdir("../public/assets/content/articles/article-image/" + str(content['article']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])

                count = 1
                tempSRC = []
                for toLocal in tempIMG:
                  img = re.findall(r'base64,(.*)', toLocal, re.I | re.M)
                  decodeData = base64.b64decode(img[0])
                  source = "../public/assets/content/articles/article-image/" + str(
                    content['article']['id']) + '/image' + str(count) + '.jpg'
                  splitSource = re.findall(r'public/(.*)', source, re.I | re.M)
                  tempSRC.append(splitSource)
                  image_result = open(source, 'wb')
                  image_result.write(decodeData)
                  image_result.close()
                  count += 1
                for iterHTML, iterSRC in zip(html_img_tags, tempSRC):
                  iterHTML['src'] = iterSRC
                temp2[key2] = str(soup)
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
        # temp2 = {}
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
              # temp2[key2] = value2
            elif key2 == 'thought':
              soup = BeautifulSoup(value2, "html.parser")
              onlyText = soup.get_text()
              onlyText = onlyText.replace('\n',' ')
              temp[key2] = onlyText
              # temp2[key2] = onlyText
            elif key2 == 'thumbThought':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                pass
              else:
                if not os.path.isdir("../public/assets/content/thoughts/thoughts-image/" + str(content['thought']['id'])):
                  os.mkdir("../public/assets/content/thoughts/thoughts-image/" + str(content['thought']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])
                img = re.findall(r'base64,(.*)', tempIMG[0], re.I | re.M)
                decodeData = base64.b64decode(img[0])
                source = "../public/assets/content/thoughts/thoughts-image/" + str(
                  content['thought']['id']) + '/thumbnail-image.jpg'
                splitSource = re.findall(r'public(.*)', source, re.I | re.M)
                image_result = open(source, 'wb')
                image_result.write(decodeData)
                image_result.close()
                temp[key2] = splitSource[0]
                # temp2[key2] = splitSource[0]
            else:
              temp[key2] = value2
              # temp2[key2] = value2

        loadData.append(temp)
        tempDict = dict(thoughts=loadData)
        # tempDict2 = dict(thought=temp2)
        file.seek(0)
        file.truncate()
        file.write(json.dumps(tempDict))
        # f = open('../public/assets/content/thoughts/thought/' + str(content['thought']['id']) + '.json', 'w')
        # f.write(json.dumps(tempDict2))
        # f.close()
    else:
      with open('../public/assets/content/thoughts/data.json', 'w') as createThoughts:
        temp = {}
        # temp2 = {}
        content['thought']['id'] = 1
        for key, value in content.items():
          for key2, value2 in value.items():
            if key2 == 'name':
              temp[key2] = value2
              # temp2[key2] = value2
            elif key2 == 'thought':
              soup = BeautifulSoup(value2, "html.parser")
              onlyText = soup.get_text()
              onlyText = onlyText.replace('\n', ' ')
              temp[key2] = onlyText
              # temp2[key2] = onlyText
            elif key2 == 'thumbThought':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                pass
              else:
                if not os.path.isdir("../public/assets/content/thoughts/thoughts-image/" + str(content['thought']['id'])):
                  os.mkdir("../public/assets/content/thoughts/thoughts-image/" + str(content['thought']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])
                img = re.findall(r'base64,(.*)', tempIMG[0], re.I | re.M)
                decodeData = base64.b64decode(img[0])
                source = "../public/assets/content/thoughts/thoughts-image/" + str(
                  content['thought']['id']) + '/thumbnail-image.jpg'
                splitSource = re.findall(r'public(.*)', source, re.I | re.M)
                image_result = open(source, 'wb')
                image_result.write(decodeData)
                image_result.close()
                temp[key2] = splitSource[0]
                # temp2[key2] = splitSource[0]
            else:
              temp[key2] = value2
              # temp2[key2] = value2

        temp = [temp]
        tempDict = dict(thoughts=temp)
        # tempDict2 = dict(thought=temp2)

        createThoughts.write(json.dumps(tempDict))
        # f = open('../public/assets/content/thoughts/thought/'+str(content['thought']['id'])+'.json', 'w')
        # f.write(json.dumps(tempDict2))
        # f.close()

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
            elif key2 == 'qualification':
              temp2[key2] = value2
            elif key2 == 'thumbJob':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                pass
              else:
                if not os.path.isdir("../public/assets/content/jobs/jobs-image/" + str(content['job']['id'])):
                  os.mkdir("../public/assets/content/jobs/jobs-image/" + str(content['job']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])
                img = re.findall(r'base64,(.*)', tempIMG[0], re.I | re.M)
                decodeData = base64.b64decode(img[0])
                source = "../public/assets/content/jobs/jobs-image/" + str(
                  content['job']['id']) + '/thumbnail-image.png'
                splitSource = re.findall(r'public(.*)', source, re.I | re.M)
                image_result = open(source, 'wb')
                image_result.write(decodeData)
                image_result.close()
                temp[key2] = splitSource[0]
                temp2[key2] = splitSource[0]
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
            elif key2 == 'qualification':
              temp2[key2] = value2
            elif key2 == 'thumbJob':
              soup = BeautifulSoup(value2, "html.parser")
              html_img_tags = soup.findAll("img")
              if not html_img_tags:
                pass
              else:
                if not os.path.isdir("../public/assets/content/jobs/jobs-image/" + str(content['job']['id'])):
                  os.mkdir("../public/assets/content/jobs/jobs-image/" + str(content['job']['id']))
                else:
                  pass
                tempIMG = []
                for tag in html_img_tags:
                  tempIMG.append(tag['src'])
                img = re.findall(r'base64,(.*)', tempIMG[0], re.I | re.M)
                decodeData = base64.b64decode(img[0])
                source = "../public/assets/content/jobs/jobs-image/" + str(
                  content['job']['id']) + '/thumbnail-image.png'
                splitSource = re.findall(r'public(.*)', source, re.I | re.M)
                image_result = open(source, 'wb')
                image_result.write(decodeData)
                image_result.close()
                temp[key2] = splitSource[0]
                temp2[key2] = splitSource[0]
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
@app.route('/api/job/update/<int:job_id>', methods=['PUT'])
def updateJob(job_id):
  updateContent = request.get_json()
  unloadUpdate = updateContent['job']
  with open('../public/assets/content/jobs/data.json', 'r+') as read_file:
    data = json.load(read_file)
    loadDict = data['jobs']
    try:
      for loop in loadDict:
        if job_id == loop['id']:
          selectedJob = loop

      count = selectedJob['id']
      f = open('../public/assets/content/jobs/job/' + str(count) + '.json', 'r+')
      data2 = json.load(f)
      loadDict2 = data2['job']
      loadDict2.update(updateContent['job'])
      newDict = dict(job=loadDict2)

      f.seek(0)
      f.truncate()
      read_file.seek(0)
      read_file.truncate()
      f.write(json.dumps(newDict))
      f.close()
      unloadUpdate.pop("description")
      for loop2 in loadDict:
        if job_id == loop2['id']:
          loop2.update(unloadUpdate)
      newDict2 = dict(jobs=loadDict)
      read_file.write(json.dumps(newDict2))
      read_file.close()

      tempResponse = {}
      tempID = {}
      tempID["id"] = job_id
      tempResponse['jobs'] = tempID
      js = json.dumps(tempResponse)
      resp = Response(js, status=201, mimetype='application/json')
    except:
      resp = jsonify("ID Not Found")
  return resp
  # return "success"

# GET Job By ID
@app.route('/api/job/get/<int:job_id>', methods=['GET'])
def jobByID(job_id):
  with open('../public/assets/content/jobs/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['jobs']
    try:
      for loop in dictData:
        if job_id == loop['id']:
          selectedUser = loop
      count = selectedUser['id']
      f = open('../public/assets/content/jobs/job/'+str(count)+'.json', 'r')
      data2 = json.load(f)
      outDict = data2['job']
      selectedUser.update(outDict)
      f.close()
      forResp = dict(jobs=selectedUser)
      resp = jsonify(forResp)
    except:
      resp = jsonify("ID Not Found")
  return resp

# GET Article By ID
@app.route('/api/article/get/<int:article_id>', methods=['GET'])
def articleByID(article_id):
  with open('../public/assets/content/articles/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['articles']
    try:
      for loop in dictData:
        if article_id == loop['id']:
          selectedUser = loop
      count = selectedUser['id']
      f = open('../public/assets/content/articles/article/'+str(count)+'.json', 'r')
      data2 = json.load(f)
      outDict = data2['article']
      selectedUser.update(outDict)
      f.close()
      forResp = dict(articles=selectedUser)
      resp = jsonify(forResp)
    except:
      resp = jsonify("ID Not Found")
  return resp

#GET Latest article Data
@app.route('/api/article/list', methods=['GET'])
def latestArticleList():
  with open('../public/assets/content/articles/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['articles']
    latestArticle = dictData[-4:]
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
def latestThoughtList():
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

# #GET Featured Jobs Data
# @app.route('/api/featjob/list', methods=['GET'])
# def featuredJobList():
#   with open('../public/assets/content/jobs/data.json', 'r') as read_file:
#     data = json.load(read_file)
#     dictData = data['jobs']
#     # latestThought = dictData[-6:]
#     temp = []
#     for loop in latestThought:
#       count = loop['id']
#       f = open('../public/assets/content/thoughts/thought/'+str(count)+'.json', 'r')
#       data2 = json.load(f)
#       outDict = data2['thought']
#       loop.update(outDict)
#       f.close()
#
#     dictData.clear()
#     dictData.extend(latestThought)
#     return jsonify(data)

#GET Latest job Data
@app.route('/api/job/list', methods=['GET'])
def latestJobList():
  with open('../public/assets/content/jobs/data.json', 'r') as read_file:
    data = json.load(read_file)
    dictData = data['jobs']
    # print(dictData)
    # latestJob = dictData[-6:]
    # temp = []
    # for loop in latestJob:
    #   count = loop['id']
    #   f = open('../public/assets/content/jobs/job/'+str(count)+'.json', 'r')
    #   data2 = json.load(f)
    #   outDict = data2['job']
    #   loop.update(outDict)
    #   f.close()
    #
    # dictData.clear()
    # dictData.extend(latestJob)
    return jsonify(data)

# #GET all jobs Data
# @app.route('/api/job/listall', methods=['GET'])
# def allJobList():
#   with open('../public/assets/content/jobs/data.json', 'r') as read_file:
#     data = json.load(read_file)
#     dictData = data['jobs']
#     print(dictData)
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
#     # dictData.extend(latestArticle)
#     # with open()
#     return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
