import DS from 'ember-data';
import host from 'karir/utils/host';
import { MODEL_PREFIX } from 'karir/utils/properties';

export default DS.RESTAdapter.extend({
    // namespace: 'api',
    // host: 'http://localhost:82',
    // host: 'http://127.0.0.1:5000',
    primaryKey:'id',

    createRecord(store, type, snapshot){
        let data = {};
        let serializer = store.serializerFor(type.modelName);
        const url = `${this.host}/api/data/post`;
        
        serializer.serializeIntoHash(data, type, snapshot);

        // snapshot.rollbackAttributes();

        return this.ajax(url, "POST", { data: data})
    },

    // findAll(store, type, sinceToken, snapshotRecordArray){
    //     let query = this.buildQuery(snapshotRecordArray);
    //     let url = `${this.host}/api/data/list`;
    
    //     if (sinceToken) {
    //       query.since = sinceToken;
    //     }
    
    //     return this.ajax(url, 'GET', { data: query });
    // },
    urlForFindAll(modelName) {
        return host(`${this._removePrefix(modelName)}.search`);
    },

    urlForFindRecord(id, modelName) {
        return host(`${this._removePrefix(modelName)}.find`).replace(/:id/, id);
      },

    _removePrefix(name) {
        return name.replace(`${MODEL_PREFIX}/`, '').replace(/\//g, '.');
    },

    // findRecord(store, type, id, snapshot) {
    //     // let url = this.buildURL(type.modelName, id, snapshot, 'findRecord');
    //     let url = `${this.host}/api/data/get/${id}`;
    //     let query = this.buildQuery(snapshot);
    
    //     return this.ajax(url, 'GET', { data: query });
    // },
    
    updateRecord(store, type, snapshot){
        let id = snapshot.id;
        let data = {};
        let serializer = store.serializerFor(type.modelName);
        const url = `${this.host}/api/data/update/${id}`

        serializer.serializeIntoHash(data, type, snapshot);

        return this.ajax(url, "PUT", { data: data});
    },

    deleteRecord(store, type, snapshot){
        let id = snapshot.id;
        const url = `${this.host}/api/data/delete/${id}`

        return this.ajax(url, "DELETE");
    },
    
    query(store, type, query) {
        
        // return new Promise((resolve, reject) => {
        //     this.findAll(store, type).then((data, ...args) => {
                
        //         resolve(data.filter((item) => {
        //             let isMatch = true;

        //             // for(let prop in query) {
        //             //     isMatch = isMatch && item[prop] === query[prop];
        //             // }

        //             return isMatch;
        //         }), ...args);

        //     }).catch(() => reject(...arguments));
        // });

        return new Promise((resolve, reject) => {
            this.findAll(store, type).then((payload, ...success) => {

                payload.datas = payload.datas.filter((item) => {
                    let isMatch = true;

                    for(let prop in query) {
                        isMatch = isMatch && item[prop].toLowerCase().match(query[prop].toLowerCase());
                    }

                    return isMatch;
                });

                resolve(payload, ...success);

            }).catch((...error) => reject(...error));
        });
    }   
});
