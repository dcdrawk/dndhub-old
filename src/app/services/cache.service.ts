import * as angular from 'angular';
import 'angular-material';

export default class CacheService {
  static $inject: Array<string> = ['$cacheFactory'];

  cache: any;

  constructor(
    private $cacheFactory: angular.ICacheFactoryService 
  ) {
    this.cache = $cacheFactory('cache');
  }

  //Retrieves named data stored in the Cache object.
  get(cacheId:string) {
    return this.cache.get(cacheId);    
  }

  //Inserts a named entry into the Cache object to be retrieved later.
  put(key:string, value: any) {
    this.cache.put(key, value);
  }

  //Removes an entry from the Cache object.
  remove(key:string) {
    this.cache.remove(key);
  }

  //Clears the cache object of any entries.
  removeAll() {
    this.cache.removeAll();
  }
}
