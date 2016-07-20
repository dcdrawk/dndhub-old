import * as angular from 'angular';
declare var firebase: any;
declare var config: any;

export default class FirebaseService {

  static $inject: Array<string> = ['$q', '$rootScope'];
  db: any;
  currentUser: any;

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService
  ) {
    firebase.initializeApp(config);
    this.$rootScope = $rootScope;
    firebase.auth().onAuthStateChanged(function(user:any) {
      if (user) {
        // User is signed in.
        console.log('a user has signed in');
        this.currentUser = user;
        $rootScope.$broadcast('USER_SIGNED_IN', user);
      } else {
        // No user is signed in.
        console.log('no user signed in');
      }
    });
  }

  signUp(email:string, password:string) {
    return this.$q((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Sign up Successful!');
      })      
      .catch((error) => {
        // Handle Errors here.
      });
    });
  }

  getData(url) {
    console.log('get user data');
    var userId = firebase.auth().currentUser.uid;
    return this.$q((resolve, reject) => {
      firebase.database().ref(url).on('value', (snapshot) => {
        console.log('Got data');
        console.log(snapshot.val());

        resolve(snapshot.val());
        // updateStarCount(postElement, snapshot.val());
      });
    });
  }

  writeUserData(url, data) {
    console.log('Write user data');
    var userId = firebase.auth().currentUser.uid;
    return this.$q((resolve, reject) => {
      firebase.database().ref(url + '/' + userId).set(data);
    });
  }

  saveNewCharacter(character) {
    console.log('Save Character');
    var userId = firebase.auth().currentUser.uid;

    return this.$q((resolve, reject) => {
      firebase.database().ref('characters/' + userId + '/').push(character).then(() => {
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
        console.log('sign out successful.');
        this.currentUser = undefined;
        this.$rootScope.$broadcast('USER_SIGNED_OUT');
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

  getCurrentUser() {
    console.log('getting current user');
    var user = firebase.auth().currentUser;
    console.log(user);
    console.log('getting current user');
    if (user) {
      return angular.extend({}, user);
      // User is signed in.
    } else {
      // No user is signed in.
      return null;
    }
  }

  uploadFile(file:any) {
    console.log(file);
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + file.name).put(file);

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
    }, function(error) {
      console.error('upload error');
      // Handle unsuccessful uploads
    }, function() {
      console.log('upload complete');
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL);
    });
  }

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
        
      })
    });
  }
    // Create a root reference
  //   var storageRef = firebase.storage().ref();

  //   // Create a reference to 'mountains.jpg'
  //   var mountainsRef = storageRef.child('mountains.jpg');

  //   // Create a reference to 'images/mountains.jpg'
  //   var mountainImagesRef = storageRef.child('images/mountains.jpg');

  //   // While the file names are the same, the references point to different files
  //   mountainsRef.name === mountainImagesRef.name            // true
  //   mountainsRef.fullPath === mountainImagesRef.fullPath    // false
  // }
}
