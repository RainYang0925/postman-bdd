'use strict';

/**
 * Information about the Postman runtime we're running in
 */
module.exports = {
  /**
   * Are we running in Newman?
   */
  newman: detectNewman(),

  /**
   * Are we running the Chrome app?
   */
  chrome: detectChromeApp(),

  /**
   * Are we running in the Electron app?
   */
  electron: detectElectronApp(),

  /**
   * Are we running in the Postman Request Builder?
   */
  requestBuilder: detectRequestBuilder(),

  /**
   * Are we running in the Postman Collection Runner?
   */
  collectionRunner: detectCollectionRunner(),
};


function detectNewman() {
  return !process.browser;
}

function detectChromeApp() {
  // The Chrome App cannot access the parent document due cross-origin permissions
  return process.browser && !getParentDocument();
}

function detectElectronApp() {
  // The Electron App is able to access the parent document
  return process.browser && !!getParentDocument();
}

function detectRequestBuilder() {
  // We can only detect the Request Builder when running in the Electron App
  return detectElectronApp() && !!window.parent.document.querySelector('.requester-builder');
}

function detectCollectionRunner() {
  // In the Chrome App, we always default to Collection Runner mode
  return !detectRequestBuilder();
}

function getParentDocument() {
  try {
    return window.parent.document;
  }
  catch (err) {
    return null;
  }
}