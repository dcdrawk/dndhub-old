import * as angular from 'angular';
declare var firebase: any;
declare var config: any;

export default class FirebaseService {

  static $inject: Array<string> = ['$q', '$rootScope', '$state'];
  db: any;
  currentUser: any;

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService,
    private $state: ng.ui.IStateService
  ) {
    firebase.initializeApp(config);
    this.$rootScope = $rootScope;
    firebase.auth().onAuthStateChanged(function(user:any) {
      if (user) {
        // User is signed in.
        this.currentUser = user;
        $rootScope.$broadcast('USER_SIGNED_IN', user);
        $rootScope.$emit('USER_SIGNED_IN', user);
      } else {
        // No user is signed in.
      }
    });
  }

  //Sign up with an email and password
  signUp(email:string, password:string) {
    return this.$q((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
        console.log('Sign up Successful!');
      })      
      .catch((error) => {
        // Handle Errors here.
        reject();
      });
    });
  }

  //Get firebase data from a url
  getData(url:string) {
    return this.$q((resolve, reject) => {
      firebase.database().ref(url).on('value', (snapshot) => {
        resolve(snapshot.val());
      });
    });
  }

  //Write user data
  writeUserData(url:string, data:any) {
    console.log('Write user data');
    var userId = firebase.auth().currentUser.uid;
    return this.$q((resolve, reject) => {
      firebase.database().ref(url + '/' + userId).set(data);
    });
  }

  //Save a new character
  saveNewCharacter(character:any) {
    var userId = firebase.auth().currentUser.uid;
    return this.$q((resolve, reject) => {
      firebase.database().ref('characters/' + userId + '/').push(character).then(() => {
        resolve();
      });
    });
  }

  //Delete a character
  deleteCharacter(character:any) {
    var userId = firebase.auth().currentUser.uid;
    return this.$q((resolve, reject) => {
      firebase.database().ref('characters/' + userId + '/' + character.id).remove().then(() => {
        resolve();
      });
    });
  }

  //sign in to firebase with email and password
  signIn(email:string, password:string) {
    console.log('signing in...');

    return this.$q((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
        console.log('sign in successful.');
        resolve(response);
      }) 
      .catch(error => {
        // Handle Errors here.
        console.error('error signing in');
        reject();
      });
    });
  }

  //sign out of firebase
  signOut() {
    console.log('signing out...');
    return this.$q((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        // Sign-out successful. 
        // Set current user and local storage of characters to null
        this.currentUser = undefined;
        localStorage.setItem('selectedCharacterIndex', null);
        this.$rootScope.$broadcast('USER_SIGNED_OUT');
        this.$state.go('sign-in');
        resolve();
      }, (error) => {
        // An error happened.
        console.error('error signing out');
        reject();
      });
    });
  }

  //sign out of firebase
  updateProfile(updatedUser:any) {
    console.log('updating profile');
    var user = firebase.auth().currentUser;    
    return this.$q((resolve, reject) => {
      user.updateProfile(updatedUser).then(() => {
        // Update Profile successful.
        console.log('updating profile successful.');
        this.$rootScope.$broadcast('USER_UPDATED', angular.extend({}, user));
        resolve();
      }, (error) => {
        // An error happened.
        console.log('error updating profile.');
        reject();
      });
    });
  }

  //Get the current user
  getCurrentUser() {
    var user = firebase.auth().currentUser;
    if (user) {
      return angular.extend({}, user);
      // User is signed in.
    } else {
      // No user is signed in.
      return null;
    }
  }

  //Upload a file (e.g. profile photo)
  uploadFile(file:any) {
    console.log(file);
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + file.name).put(file);

    uploadTask.on('state_changed', function(snapshot:any){
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
    }, function(error:any) {
      console.error('upload error');
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      console.log('upload complete');
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL);
    });
  }

  //Upload a profile photo
  uploadProfilePhoto(file:any) {
    console.log(file);
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('profile-photos/' + file.name).put(file);

    return this.$q((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
      }, (error) => {        
        console.error('upload error');
        reject();
        // Handle unsuccessful uploads
      }, () => {
        console.log('upload complete');
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        var user = this.getCurrentUser();
        user.photoURL = downloadURL;
        this.updateProfile(user).then( () => {
          resolve();
        });        
      });
    });
  }
}
