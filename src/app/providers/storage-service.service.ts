import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  public static user_id;

  constructor(private storage: Storage) {
    this.init()
   }
   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }
  public storeData (data) {
    this.storage.set('user', data);
  }

  public storeDataByKey (Key: string, data: any) {
    this.storage.set(Key, data);
  }

  public async getStoredData(){
    try { return await this.storage.get('user') }
    catch(e) { console.log(e) }
  }

  public async getStoredDataByKey(Key: string){
    try { return await this.storage.get(Key) }
    catch(e) { console.log(e) }
  }

}
