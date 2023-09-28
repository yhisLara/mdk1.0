(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/ReporteDiarioMDK/i18n/i18n.properties":
/*!*****************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/i18n/i18n.properties ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/AppUpdateFailure.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/AppUpdateFailure.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/ReporteDiarioMDK/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/AppUpdateSuccess.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/AppUpdateSuccess.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/ReporteDiarioMDK/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/ReporteDiarioMDK/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/ReporteDiarioMDK/Services/ReporteDiarioMDK.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/ReporteDiarioMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/LineaFaena/LineaFaena_DeleteConfirmation.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/LineaFaena/LineaFaena_DeleteConfirmation.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/ReporteDiarioMDK/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/Maquina/Maquina_DeleteConfirmation.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/Maquina/Maquina_DeleteConfirmation.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/ReporteDiarioMDK/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReporteDiarioMDK/Actions/Maquina/Maquina_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/OnWillUpdate.js":
/*!******************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/OnWillUpdate.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  setInterval(function () {
    clientAPI.executeAction('/ReporteDiarioMDK/Actions/Service/UploadOffline.action');
  }, 6000);
  return clientAPI.executeAction('/ReporteDiarioMDK/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReporteDiarioMDK/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/Parametro/Parametro_DeleteConfirmation.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/Parametro/Parametro_DeleteConfirmation.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/ReporteDiarioMDK/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReporteDiarioMDK/Actions/Parametro/Parametro_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/Predio/Predio_DeleteConfirmation.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/Predio/Predio_DeleteConfirmation.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/ReporteDiarioMDK/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReporteDiarioMDK/Actions/Predio/Predio_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/ResetAppSettingsAndLogout.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/ResetAppSettingsAndLogout.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/ReporteDiarioMDK/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/TipoTiempoPerdido/TipoTiempoPerdido_DeleteConfirmation.js":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/TipoTiempoPerdido/TipoTiempoPerdido_DeleteConfirmation.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/ReporteDiarioMDK/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Rules/Turno/Turno_DeleteConfirmation.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Rules/Turno/Turno_DeleteConfirmation.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/ReporteDiarioMDK/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReporteDiarioMDK/Actions/Turno/Turno_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Styles/Styles.css":
/*!**************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Styles/Styles.css ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Styles/Styles.less":
/*!***************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Styles/Styles.less ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Styles/Styles.nss":
/*!**************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Styles/Styles.nss ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js":
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!********************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.1/node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_List.page":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Inicial.page":
/*!***************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Inicial.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"Header":{"Headline":"Yhisleyn Lara","SubHeadline":"Administrador","Icon":"sap-icon://business-card","Alignment":"center","IconIsCircular":false,"DisableIconText":false},"Sections":[{"_Name":"ReporteDiario","Items":[{"Title":"Reporte diario","Image":"sap-icon://document-text","PageToOpen":"/ReporteDiarioMDK/Pages/Reporte_diario_Create.page","_Name":"SideDrawerSection0Item0","Visible":true,"TextAlignment":"left","Styles":{}}],"Caption":"Reporte diario","Visible":true,"PreserveImageSpacing":true,"SeparatorEnabled":true},{"_Name":"Mantenedores","Items":[{"Title":"Linea Faenas","Image":"sap-icon://workflow-tasks","OnPress":"/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_List.action","PageToOpen":"/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_List.page","_Name":"MantenedoresLineaFaenas","Visible":true,"TextAlignment":"left","Styles":{}},{"Title":"Maquinas","Image":"sap-icon://machine","_Name":"MantenedoresMaquinas","Visible":true,"TextAlignment":"left","Styles":{}},{"Title":"Parámetros","Image":"sap-icon://action","_Name":"MantenedoresParametros","Visible":true,"TextAlignment":"left","Styles":{}},{"Title":"Predios","Image":"sap-icon://globe","_Name":"MantenedoresPredios","Visible":true,"TextAlignment":"left","Styles":{}},{"Title":"Tipo tiempos perdidos","Image":"sap-icon://away","_Name":"MantenedoresTiempoPerdido","Visible":true,"TextAlignment":"left","Styles":{}},{"Title":"Turnos","Image":"sap-icon://gantt-bars","_Name":"MantenedoresTurnos","Visible":true,"TextAlignment":"left","Styles":{}}],"Caption":"Mantenedores","Visible":true,"PreserveImageSpacing":true,"SeparatorEnabled":true}],"_Type":"Control.Type.SideDrawer","_Name":"SideDrawer0","AlwaysShowDrawerButton":false,"ClearHistory":false}],"_Type":"Page","_Name":"Inicial","Caption":"Inicial"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Create.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Create.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create LineaFaena Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"codigo","_Name":"codigo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"LineaFaena_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Detail.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Detail.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"LineaFaena Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"LineaFaena","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/ReporteDiarioMDK/Rules/LineaFaena/LineaFaena_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{codigo}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"codigo","Value":"{codigo}"},{"KeyName":"descripcion","Value":"{descripcion}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"LineaFaena_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Edit.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Edit.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update LineaFaena Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"LineaFaena","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"codigo","_Name":"codigo","Value":"{codigo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"LineaFaena_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_List.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_List.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"LineaFaena","ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{codigo}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"LineaFaena","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"LineaFaena_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Main.page":
/*!************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Main.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"LineaFaena","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_List.action"},{"_Name":"SectionButton1","Title":"Maquina","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_List.action"},{"_Name":"SectionButton2","Title":"Parametro","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/ReporteDiarioMDK/Actions/Parametro/NavToParametro_List.action"},{"_Name":"SectionButton3","Title":"Predio","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/ReporteDiarioMDK/Actions/Predio/NavToPredio_List.action"},{"_Name":"SectionButton4","Title":"TipoTiempoPerdido","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_List.action"},{"_Name":"SectionButton5","Title":"Turno","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/ReporteDiarioMDK/Actions/Turno/NavToTurno_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Mantenedores","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/ReporteDiarioMDK/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/ReporteDiarioMDK/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/ReporteDiarioMDK/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Mantenedores.page":
/*!********************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Mantenedores.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.BottomNavigation","_Name":"BottomNavigation0","Items":[{"_Type":"Control.Type.TabItem","Caption":"Linea Faneas","_Name":"TabItem0"},{"_Type":"Control.Type.TabItem","Caption":"Maquinas","_Name":"TabItem1"},{"_Type":"Control.Type.TabItem","Caption":"Parámetros","_Name":"TabItem2"},{"_Type":"Control.Type.TabItem","Caption":"Predios","_Name":"TabItem3"},{"_Type":"Control.Type.TabItem","Caption":"Tipo tiempos perdidos","_Name":"TabItem4"}]}],"_Type":"Page","_Name":"Mantenedores","Caption":"Mantenedores"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Create.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Create.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/ReporteDiarioMDK/Actions/Maquina/Maquina_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Maquina Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"proceso","_Name":"proceso","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"tipo","_Name":"tipo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"equipo","_Name":"equipo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cod_modelo","_Name":"cod_modelo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Maquina_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Detail.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Detail.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Maquina Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Maquina","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/ReporteDiarioMDK/Rules/Maquina/Maquina_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{proceso}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"proceso","Value":"{proceso}"},{"KeyName":"tipo","Value":"{tipo}"},{"KeyName":"equipo","Value":"{equipo}"},{"KeyName":"cod_modelo","Value":"{cod_modelo}"},{"KeyName":"descripcion","Value":"{descripcion}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Maquina_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Edit.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Edit.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Maquina Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Maquina","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/ReporteDiarioMDK/Actions/Maquina/Maquina_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"proceso","_Name":"proceso","Value":"{proceso}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"tipo","_Name":"tipo","Value":"{tipo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"equipo","_Name":"equipo","Value":"{equipo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"cod_modelo","_Name":"cod_modelo","Value":"{cod_modelo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Maquina_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_List.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_List.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Maquina","ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{proceso}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Maquina","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Maquina_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Create.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Create.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/ReporteDiarioMDK/Actions/Parametro/Parametro_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Parametro Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"param","_Name":"param","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"valor","_Name":"valor","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"glosa","_Name":"glosa","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Parametro_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Detail.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Detail.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Parametro Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Parametro","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/ReporteDiarioMDK/Rules/Parametro/Parametro_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{param}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"param","Value":"{param}"},{"KeyName":"valor","Value":"{valor}"},{"KeyName":"glosa","Value":"{glosa}"},{"KeyName":"descripcion","Value":"{descripcion}"},{"KeyName":"vigente","Value":"{vigente}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Parametro_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Edit.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Edit.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Parametro Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Parametro","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/ReporteDiarioMDK/Actions/Parametro/Parametro_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"param","_Name":"param","Value":"{param}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"valor","_Name":"valor","Value":"{valor}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"glosa","_Name":"glosa","Value":"{glosa}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":"{vigente}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Parametro_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_List.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_List.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Parametro","ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{param}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Parametro","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Parametro_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Create.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Create.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/ReporteDiarioMDK/Actions/Predio/Predio_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Predio Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"zona","_Name":"zona","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"rol","_Name":"rol","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Predio_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Detail.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Detail.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Predio Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Predio","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Predio/NavToPredio_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/ReporteDiarioMDK/Rules/Predio/Predio_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{zona}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"zona","Value":"{zona}"},{"KeyName":"rol","Value":"{rol}"},{"KeyName":"descripcion","Value":"{descripcion}"},{"KeyName":"vigente","Value":"{vigente}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Predio_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Edit.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Edit.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Predio Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Predio","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/ReporteDiarioMDK/Actions/Predio/Predio_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"zona","_Name":"zona","Value":"{zona}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"rol","_Name":"rol","Value":"{rol}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":"{vigente}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Predio_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_List.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_List.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Predio","ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Predio/NavToPredio_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/ReporteDiarioMDK/Actions/Predio/NavToPredio_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{zona}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Predio","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Predio_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Reporte_diario_Create.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Reporte_diario_Create.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Page","_Name":"Reporte_diario_Create","Controls":[{"StartColumn":{"_Name":"StartColumn"},"_Name":"FlexibleColumnLayout0","_Type":"Control.Type.FlexibleColumnLayout"}],"Caption":"Reporte_diario_Create"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Create.page":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Create.page ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create TipoTiempoPerdido Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"codigo","_Name":"codigo","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"proceso","_Name":"proceso","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"TipoTiempoPerdido_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Detail.page":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Detail.page ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"TipoTiempoPerdido Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"TipoTiempoPerdido","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/ReporteDiarioMDK/Rules/TipoTiempoPerdido/TipoTiempoPerdido_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{codigo}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"codigo","Value":"{codigo}"},{"KeyName":"proceso","Value":"{proceso}"},{"KeyName":"descripcion","Value":"{descripcion}"},{"KeyName":"vigente","Value":"{vigente}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"TipoTiempoPerdido_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Edit.page":
/*!************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Edit.page ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update TipoTiempoPerdido Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"TipoTiempoPerdido","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"codigo","_Name":"codigo","Value":"{codigo}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"proceso","_Name":"proceso","Value":"{proceso}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":"{vigente}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"TipoTiempoPerdido_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_List.page":
/*!************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_List.page ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"TipoTiempoPerdido","ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{codigo}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"TipoTiempoPerdido","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"TipoTiempoPerdido_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Create.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Create.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/ReporteDiarioMDK/Actions/Turno/Turno_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Turno Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"hora_inicial","_Name":"hora_inicial","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"hora_fin","_Name":"hora_fin","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Turno_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Detail.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Detail.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Turno Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Turno","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Turno/NavToTurno_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/ReporteDiarioMDK/Rules/Turno/Turno_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{descripcion}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"descripcion","Value":"{descripcion}"},{"KeyName":"hora_inicial","Value":"{hora_inicial}"},{"KeyName":"hora_fin","Value":"{hora_fin}"},{"KeyName":"vigente","Value":"{vigente}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Turno_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Edit.page":
/*!************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Edit.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Turno Detail","DesignTimeTarget":{"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","EntitySet":"Turno","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/ReporteDiarioMDK/Actions/Turno/Turno_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"hora_inicial","_Name":"hora_inicial","Value":"{hora_inicial}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"hora_fin","_Name":"hora_fin","Value":"{hora_fin}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":"{vigente}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Turno_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_List.page":
/*!************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_List.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Turno","ActionBar":{"Items":[{"OnPress":"/ReporteDiarioMDK/Actions/Turno/NavToTurno_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/ReporteDiarioMDK/Actions/Turno/NavToTurno_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{descripcion}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Turno","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Turno_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/ReporteDiarioMDK/Pages/Inicial.page","OnLaunch":["/ReporteDiarioMDK/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/ReporteDiarioMDK/Rules/OnWillUpdate.js","OnDidUpdate":"/ReporteDiarioMDK/Actions/Service/InitializeOffline.action","Styles":"/ReporteDiarioMDK/Styles/Styles.less","Version":"/ReporteDiarioMDK/Globals/AppDefinition_Version.global","Localization":"/ReporteDiarioMDK/i18n/i18n.properties","_SchemaVersion":"23.8","_Name":"ReporteDiarioMDK","StyleSheets":{"Styles":{"css":"/ReporteDiarioMDK/Styles/Styles.css","ios":"/ReporteDiarioMDK/Styles/Styles.nss","android":"/ReporteDiarioMDK/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdate.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/AppUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/ReporteDiarioMDK/Rules/AppUpdateFailure.js","OnSuccess":"/ReporteDiarioMDK/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdateFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/AppUpdateFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdateProgressBanner.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/AppUpdateProgressBanner.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/ReporteDiarioMDK/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdateSuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/AppUpdateSuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/CloseModalPage_Complete.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/CloseModalPage_Complete.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/ClosePage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/ClosePage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/ReporteDiarioMDK/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/DeleteConfirmation.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/DeleteConfirmation.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/ReporteDiarioMDK/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_CreateEntity.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_CreateEntity.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action","OnSuccess":"/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action","Properties":{"codigo":"#Control:codigo/#Value","descripcion":"#Control:descripcion/#Value"},"Target":{"EntitySet":"LineaFaena","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_DeleteEntity.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_DeleteEntity.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"LineaFaena","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_UpdateEntity.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_UpdateEntity.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"LineaFaena","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"Properties":{"codigo":"#Control:codigo/#Value","descripcion":"#Control:descripcion/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Create.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Create.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Detail.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Detail.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Detail.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Edit.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Edit.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_List.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_List.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_List.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Logout.action":
/*!******************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Logout.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/LogoutMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/LogoutMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/ReporteDiarioMDK/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_CreateEntity.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_CreateEntity.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action","OnSuccess":"/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action","Properties":{"proceso":"#Control:proceso/#Value","tipo":"#Control:tipo/#Value","equipo":"#Control:equipo/#Value","cod_modelo":"#Control:cod_modelo/#Value","descripcion":"#Control:descripcion/#Value"},"Target":{"EntitySet":"Maquina","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_DeleteEntity.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_DeleteEntity.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Maquina","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_UpdateEntity.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_UpdateEntity.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Maquina","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"Properties":{"proceso":"#Control:proceso/#Value","tipo":"#Control:tipo/#Value","equipo":"#Control:equipo/#Value","cod_modelo":"#Control:cod_modelo/#Value","descripcion":"#Control:descripcion/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Create.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Create.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Maquina/Maquina_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Detail.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Detail.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Maquina/Maquina_Detail.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Edit.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Edit.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Maquina/Maquina_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_List.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_List.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Maquina/Maquina_List.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/OnWillUpdate.action":
/*!************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/OnWillUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Create.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Create.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Parametro/Parametro_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Detail.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Detail.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Parametro/Parametro_Detail.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Edit.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Edit.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Parametro/Parametro_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_List.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_List.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Parametro/Parametro_List.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_CreateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_CreateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action","OnSuccess":"/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action","Properties":{"param":"#Control:param/#Value","valor":"#Control:valor/#Value","glosa":"#Control:glosa/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"Target":{"EntitySet":"Parametro","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_DeleteEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_DeleteEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Parametro","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_UpdateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_UpdateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Parametro","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"Properties":{"param":"#Control:param/#Value","valor":"#Control:valor/#Value","glosa":"#Control:glosa/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Create.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Create.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Predio/Predio_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Detail.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Detail.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Predio/Predio_Detail.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Edit.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Edit.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Predio/Predio_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_List.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_List.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Predio/Predio_List.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_CreateEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_CreateEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action","OnSuccess":"/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action","Properties":{"zona":"#Control:zona/#Value","rol":"#Control:rol/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"Target":{"EntitySet":"Predio","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_DeleteEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_DeleteEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Predio","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_UpdateEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_UpdateEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Predio","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"Properties":{"zona":"#Control:zona/#Value","rol":"#Control:rol/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOffline.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOffline.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/ReporteDiarioMDK/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOfflineFailureMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOfflineFailureMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOfflineSuccessMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/DownloadOffline.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/DownloadOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","DefiningRequests":[{"Name":"LineaFaena","Query":"LineaFaena"},{"Name":"Maquina","Query":"Maquina"},{"Name":"Parametro","Query":"Parametro"},{"Name":"Predio","Query":"Predio"},{"Name":"TipoTiempoPerdido","Query":"TipoTiempoPerdido"},{"Name":"Turno","Query":"Turno"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/ReporteDiarioMDK/Actions/Service/SyncFailureMessage.action","OnSuccess":"/ReporteDiarioMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/DownloadStartedMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/DownloadStartedMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/ReporteDiarioMDK/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOffline.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOffline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","DefiningRequests":[{"Name":"LineaFaena","Query":"LineaFaena"},{"Name":"Maquina","Query":"Maquina"},{"Name":"Parametro","Query":"Parametro"},{"Name":"Predio","Query":"Predio"},{"Name":"TipoTiempoPerdido","Query":"TipoTiempoPerdido"},{"Name":"Turno","Query":"Turno"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/ReporteDiarioMDK/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOfflineFailureMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/SyncFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/SyncFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/SyncStartedMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/SyncStartedMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/ReporteDiarioMDK/Actions/Service/UploadOffline.action","OnFailure":"/ReporteDiarioMDK/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/SyncSuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/SyncSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Service/UploadOffline.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Service/UploadOffline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/ReporteDiarioMDK/Actions/Service/DownloadStartedMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Create.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Create.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Detail.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Detail.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Detail.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Edit.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Edit.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_List.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_List.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_List.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_CreateEntity.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_CreateEntity.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action","OnSuccess":"/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action","Properties":{"codigo":"#Control:codigo/#Value","proceso":"#Control:proceso/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"Target":{"EntitySet":"TipoTiempoPerdido","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_DeleteEntity.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_DeleteEntity.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"TipoTiempoPerdido","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_UpdateEntity.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_UpdateEntity.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"TipoTiempoPerdido","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"Properties":{"codigo":"#Control:codigo/#Value","proceso":"#Control:proceso/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Create.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Create.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Turno/Turno_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Detail.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Detail.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Turno/Turno_Detail.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Edit.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Edit.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReporteDiarioMDK/Pages/Turno/Turno_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_List.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_List.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReporteDiarioMDK/Pages/Turno/Turno_List.page"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_CreateEntity.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_CreateEntity.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action","OnSuccess":"/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action","Properties":{"descripcion":"#Control:descripcion/#Value","hora_inicial":"#Control:hora_inicial/#Value","hora_fin":"#Control:hora_fin/#Value","vigente":"#Control:vigente/#Value"},"Target":{"EntitySet":"Turno","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_DeleteEntity.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_DeleteEntity.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Turno","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_UpdateEntity.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_UpdateEntity.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Turno","Service":"/ReporteDiarioMDK/Services/ReporteDiarioMDK.service","ReadLink":"{@odata.readLink}"},"Properties":{"descripcion":"#Control:descripcion/#Value","hora_inicial":"#Control:hora_inicial/#Value","hora_fin":"#Control:hora_fin/#Value","vigente":"#Control:vigente/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/ReporteDiarioMDK/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Globals/AppDefinition_Version.global":
/*!*********************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Globals/AppDefinition_Version.global ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Services/ReporteDiarioMDK.service":
/*!******************************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Services/ReporteDiarioMDK.service ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"ReporteDiarioMDK","PathSuffix":"/Mantenedor","OfflineEnabled":false,"SourceType":"Mobile","RestService":true}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let reportediariomdk_actions_appupdate_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/AppUpdate.action */ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdate.action")
let reportediariomdk_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/AppUpdateFailureMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdateFailureMessage.action")
let reportediariomdk_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/AppUpdateProgressBanner.action */ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdateProgressBanner.action")
let reportediariomdk_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/AppUpdateSuccessMessage.action")
let reportediariomdk_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action */ "./build.definitions/ReporteDiarioMDK/Actions/CloseModalPage_Cancel.action")
let reportediariomdk_actions_closemodalpage_complete_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/CloseModalPage_Complete.action */ "./build.definitions/ReporteDiarioMDK/Actions/CloseModalPage_Complete.action")
let reportediariomdk_actions_closepage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/ClosePage.action */ "./build.definitions/ReporteDiarioMDK/Actions/ClosePage.action")
let reportediariomdk_actions_createentityfailuremessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/CreateEntityFailureMessage.action")
let reportediariomdk_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/CreateEntitySuccessMessage.action")
let reportediariomdk_actions_deleteconfirmation_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/DeleteConfirmation.action */ "./build.definitions/ReporteDiarioMDK/Actions/DeleteConfirmation.action")
let reportediariomdk_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/DeleteEntityFailureMessage.action")
let reportediariomdk_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/DeleteEntitySuccessMessage.action")
let reportediariomdk_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let reportediariomdk_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let reportediariomdk_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/ReporteDiarioMDK/Actions/ErrorArchive/NavToErrorArchive_List.action")
let reportediariomdk_actions_lineafaena_lineafaena_createentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_CreateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_CreateEntity.action")
let reportediariomdk_actions_lineafaena_lineafaena_deleteentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_DeleteEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_DeleteEntity.action")
let reportediariomdk_actions_lineafaena_lineafaena_updateentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_UpdateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/LineaFaena_UpdateEntity.action")
let reportediariomdk_actions_lineafaena_navtolineafaena_create_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Create.action */ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Create.action")
let reportediariomdk_actions_lineafaena_navtolineafaena_detail_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Detail.action */ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Detail.action")
let reportediariomdk_actions_lineafaena_navtolineafaena_edit_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Edit.action */ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_Edit.action")
let reportediariomdk_actions_lineafaena_navtolineafaena_list_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_List.action */ "./build.definitions/ReporteDiarioMDK/Actions/LineaFaena/NavToLineaFaena_List.action")
let reportediariomdk_actions_logout_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Logout.action */ "./build.definitions/ReporteDiarioMDK/Actions/Logout.action")
let reportediariomdk_actions_logoutmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/LogoutMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/LogoutMessage.action")
let reportediariomdk_actions_maquina_maquina_createentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Maquina/Maquina_CreateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_CreateEntity.action")
let reportediariomdk_actions_maquina_maquina_deleteentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Maquina/Maquina_DeleteEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_DeleteEntity.action")
let reportediariomdk_actions_maquina_maquina_updateentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Maquina/Maquina_UpdateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/Maquina_UpdateEntity.action")
let reportediariomdk_actions_maquina_navtomaquina_create_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Create.action */ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Create.action")
let reportediariomdk_actions_maquina_navtomaquina_detail_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Detail.action */ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Detail.action")
let reportediariomdk_actions_maquina_navtomaquina_edit_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Edit.action */ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_Edit.action")
let reportediariomdk_actions_maquina_navtomaquina_list_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Maquina/NavToMaquina_List.action */ "./build.definitions/ReporteDiarioMDK/Actions/Maquina/NavToMaquina_List.action")
let reportediariomdk_actions_onwillupdate_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/OnWillUpdate.action */ "./build.definitions/ReporteDiarioMDK/Actions/OnWillUpdate.action")
let reportediariomdk_actions_parametro_navtoparametro_create_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Parametro/NavToParametro_Create.action */ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Create.action")
let reportediariomdk_actions_parametro_navtoparametro_detail_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Parametro/NavToParametro_Detail.action */ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Detail.action")
let reportediariomdk_actions_parametro_navtoparametro_edit_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Parametro/NavToParametro_Edit.action */ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_Edit.action")
let reportediariomdk_actions_parametro_navtoparametro_list_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Parametro/NavToParametro_List.action */ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/NavToParametro_List.action")
let reportediariomdk_actions_parametro_parametro_createentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Parametro/Parametro_CreateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_CreateEntity.action")
let reportediariomdk_actions_parametro_parametro_deleteentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Parametro/Parametro_DeleteEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_DeleteEntity.action")
let reportediariomdk_actions_parametro_parametro_updateentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Parametro/Parametro_UpdateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Parametro/Parametro_UpdateEntity.action")
let reportediariomdk_actions_predio_navtopredio_create_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Predio/NavToPredio_Create.action */ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Create.action")
let reportediariomdk_actions_predio_navtopredio_detail_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Predio/NavToPredio_Detail.action */ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Detail.action")
let reportediariomdk_actions_predio_navtopredio_edit_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Predio/NavToPredio_Edit.action */ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_Edit.action")
let reportediariomdk_actions_predio_navtopredio_list_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Predio/NavToPredio_List.action */ "./build.definitions/ReporteDiarioMDK/Actions/Predio/NavToPredio_List.action")
let reportediariomdk_actions_predio_predio_createentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Predio/Predio_CreateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_CreateEntity.action")
let reportediariomdk_actions_predio_predio_deleteentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Predio/Predio_DeleteEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_DeleteEntity.action")
let reportediariomdk_actions_predio_predio_updateentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Predio/Predio_UpdateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Predio/Predio_UpdateEntity.action")
let reportediariomdk_actions_service_closeoffline_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/CloseOffline.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOffline.action")
let reportediariomdk_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOfflineFailureMessage.action")
let reportediariomdk_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/CloseOfflineSuccessMessage.action")
let reportediariomdk_actions_service_downloadoffline_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/DownloadOffline.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/DownloadOffline.action")
let reportediariomdk_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/DownloadStartedMessage.action")
let reportediariomdk_actions_service_initializeoffline_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/InitializeOffline.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOffline.action")
let reportediariomdk_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOfflineFailureMessage.action")
let reportediariomdk_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/InitializeOfflineSuccessMessage.action")
let reportediariomdk_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/SyncFailureMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/SyncFailureMessage.action")
let reportediariomdk_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/SyncStartedMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/SyncStartedMessage.action")
let reportediariomdk_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/SyncSuccessMessage.action")
let reportediariomdk_actions_service_uploadoffline_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Service/UploadOffline.action */ "./build.definitions/ReporteDiarioMDK/Actions/Service/UploadOffline.action")
let reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_create_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Create.action */ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Create.action")
let reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_detail_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Detail.action */ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Detail.action")
let reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_edit_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Edit.action */ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_Edit.action")
let reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_list_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_List.action */ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/NavToTipoTiempoPerdido_List.action")
let reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_createentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_CreateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_CreateEntity.action")
let reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_deleteentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_DeleteEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_DeleteEntity.action")
let reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_updateentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_UpdateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/TipoTiempoPerdido/TipoTiempoPerdido_UpdateEntity.action")
let reportediariomdk_actions_turno_navtoturno_create_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Turno/NavToTurno_Create.action */ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Create.action")
let reportediariomdk_actions_turno_navtoturno_detail_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Turno/NavToTurno_Detail.action */ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Detail.action")
let reportediariomdk_actions_turno_navtoturno_edit_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Turno/NavToTurno_Edit.action */ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_Edit.action")
let reportediariomdk_actions_turno_navtoturno_list_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Turno/NavToTurno_List.action */ "./build.definitions/ReporteDiarioMDK/Actions/Turno/NavToTurno_List.action")
let reportediariomdk_actions_turno_turno_createentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Turno/Turno_CreateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_CreateEntity.action")
let reportediariomdk_actions_turno_turno_deleteentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Turno/Turno_DeleteEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_DeleteEntity.action")
let reportediariomdk_actions_turno_turno_updateentity_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/Turno/Turno_UpdateEntity.action */ "./build.definitions/ReporteDiarioMDK/Actions/Turno/Turno_UpdateEntity.action")
let reportediariomdk_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/UpdateEntityFailureMessage.action")
let reportediariomdk_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/ReporteDiarioMDK/Actions/UpdateEntitySuccessMessage.action")
let reportediariomdk_globals_appdefinition_version_global = __webpack_require__(/*! ./ReporteDiarioMDK/Globals/AppDefinition_Version.global */ "./build.definitions/ReporteDiarioMDK/Globals/AppDefinition_Version.global")
let reportediariomdk_i18n_i18n_properties = __webpack_require__(/*! ./ReporteDiarioMDK/i18n/i18n.properties */ "./build.definitions/ReporteDiarioMDK/i18n/i18n.properties")
let reportediariomdk_jsconfig_json = __webpack_require__(/*! ./ReporteDiarioMDK/jsconfig.json */ "./build.definitions/ReporteDiarioMDK/jsconfig.json")
let reportediariomdk_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_Detail.page")
let reportediariomdk_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/ReporteDiarioMDK/Pages/ErrorArchive/ErrorArchive_List.page")
let reportediariomdk_pages_inicial_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Inicial.page */ "./build.definitions/ReporteDiarioMDK/Pages/Inicial.page")
let reportediariomdk_pages_lineafaena_lineafaena_create_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Create.page */ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Create.page")
let reportediariomdk_pages_lineafaena_lineafaena_detail_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Detail.page */ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Detail.page")
let reportediariomdk_pages_lineafaena_lineafaena_edit_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Edit.page */ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_Edit.page")
let reportediariomdk_pages_lineafaena_lineafaena_list_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_List.page */ "./build.definitions/ReporteDiarioMDK/Pages/LineaFaena/LineaFaena_List.page")
let reportediariomdk_pages_main_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Main.page */ "./build.definitions/ReporteDiarioMDK/Pages/Main.page")
let reportediariomdk_pages_mantenedores_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Mantenedores.page */ "./build.definitions/ReporteDiarioMDK/Pages/Mantenedores.page")
let reportediariomdk_pages_maquina_maquina_create_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Maquina/Maquina_Create.page */ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Create.page")
let reportediariomdk_pages_maquina_maquina_detail_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Maquina/Maquina_Detail.page */ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Detail.page")
let reportediariomdk_pages_maquina_maquina_edit_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Maquina/Maquina_Edit.page */ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_Edit.page")
let reportediariomdk_pages_maquina_maquina_list_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Maquina/Maquina_List.page */ "./build.definitions/ReporteDiarioMDK/Pages/Maquina/Maquina_List.page")
let reportediariomdk_pages_parametro_parametro_create_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Parametro/Parametro_Create.page */ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Create.page")
let reportediariomdk_pages_parametro_parametro_detail_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Parametro/Parametro_Detail.page */ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Detail.page")
let reportediariomdk_pages_parametro_parametro_edit_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Parametro/Parametro_Edit.page */ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_Edit.page")
let reportediariomdk_pages_parametro_parametro_list_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Parametro/Parametro_List.page */ "./build.definitions/ReporteDiarioMDK/Pages/Parametro/Parametro_List.page")
let reportediariomdk_pages_predio_predio_create_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Predio/Predio_Create.page */ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Create.page")
let reportediariomdk_pages_predio_predio_detail_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Predio/Predio_Detail.page */ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Detail.page")
let reportediariomdk_pages_predio_predio_edit_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Predio/Predio_Edit.page */ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_Edit.page")
let reportediariomdk_pages_predio_predio_list_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Predio/Predio_List.page */ "./build.definitions/ReporteDiarioMDK/Pages/Predio/Predio_List.page")
let reportediariomdk_pages_reporte_diario_create_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Reporte_diario_Create.page */ "./build.definitions/ReporteDiarioMDK/Pages/Reporte_diario_Create.page")
let reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_create_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Create.page */ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Create.page")
let reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_detail_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Detail.page */ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Detail.page")
let reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_edit_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Edit.page */ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_Edit.page")
let reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_list_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_List.page */ "./build.definitions/ReporteDiarioMDK/Pages/TipoTiempoPerdido/TipoTiempoPerdido_List.page")
let reportediariomdk_pages_turno_turno_create_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Turno/Turno_Create.page */ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Create.page")
let reportediariomdk_pages_turno_turno_detail_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Turno/Turno_Detail.page */ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Detail.page")
let reportediariomdk_pages_turno_turno_edit_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Turno/Turno_Edit.page */ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_Edit.page")
let reportediariomdk_pages_turno_turno_list_page = __webpack_require__(/*! ./ReporteDiarioMDK/Pages/Turno/Turno_List.page */ "./build.definitions/ReporteDiarioMDK/Pages/Turno/Turno_List.page")
let reportediariomdk_rules_appupdatefailure_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/AppUpdateFailure.js */ "./build.definitions/ReporteDiarioMDK/Rules/AppUpdateFailure.js")
let reportediariomdk_rules_appupdatesuccess_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/AppUpdateSuccess.js */ "./build.definitions/ReporteDiarioMDK/Rules/AppUpdateSuccess.js")
let reportediariomdk_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/ReporteDiarioMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let reportediariomdk_rules_lineafaena_lineafaena_deleteconfirmation_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/LineaFaena/LineaFaena_DeleteConfirmation.js */ "./build.definitions/ReporteDiarioMDK/Rules/LineaFaena/LineaFaena_DeleteConfirmation.js")
let reportediariomdk_rules_maquina_maquina_deleteconfirmation_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/Maquina/Maquina_DeleteConfirmation.js */ "./build.definitions/ReporteDiarioMDK/Rules/Maquina/Maquina_DeleteConfirmation.js")
let reportediariomdk_rules_onwillupdate_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/OnWillUpdate.js */ "./build.definitions/ReporteDiarioMDK/Rules/OnWillUpdate.js")
let reportediariomdk_rules_parametro_parametro_deleteconfirmation_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/Parametro/Parametro_DeleteConfirmation.js */ "./build.definitions/ReporteDiarioMDK/Rules/Parametro/Parametro_DeleteConfirmation.js")
let reportediariomdk_rules_predio_predio_deleteconfirmation_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/Predio/Predio_DeleteConfirmation.js */ "./build.definitions/ReporteDiarioMDK/Rules/Predio/Predio_DeleteConfirmation.js")
let reportediariomdk_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/ReporteDiarioMDK/Rules/ResetAppSettingsAndLogout.js")
let reportediariomdk_rules_tipotiempoperdido_tipotiempoperdido_deleteconfirmation_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/TipoTiempoPerdido/TipoTiempoPerdido_DeleteConfirmation.js */ "./build.definitions/ReporteDiarioMDK/Rules/TipoTiempoPerdido/TipoTiempoPerdido_DeleteConfirmation.js")
let reportediariomdk_rules_turno_turno_deleteconfirmation_js = __webpack_require__(/*! ./ReporteDiarioMDK/Rules/Turno/Turno_DeleteConfirmation.js */ "./build.definitions/ReporteDiarioMDK/Rules/Turno/Turno_DeleteConfirmation.js")
let reportediariomdk_services_reportediariomdk_service = __webpack_require__(/*! ./ReporteDiarioMDK/Services/ReporteDiarioMDK.service */ "./build.definitions/ReporteDiarioMDK/Services/ReporteDiarioMDK.service")
let reportediariomdk_styles_styles_css = __webpack_require__(/*! ./ReporteDiarioMDK/Styles/Styles.css */ "./build.definitions/ReporteDiarioMDK/Styles/Styles.css")
let reportediariomdk_styles_styles_json = __webpack_require__(/*! ./ReporteDiarioMDK/Styles/Styles.json */ "./build.definitions/ReporteDiarioMDK/Styles/Styles.json")
let reportediariomdk_styles_styles_less = __webpack_require__(/*! ./ReporteDiarioMDK/Styles/Styles.less */ "./build.definitions/ReporteDiarioMDK/Styles/Styles.less")
let reportediariomdk_styles_styles_nss = __webpack_require__(/*! ./ReporteDiarioMDK/Styles/Styles.nss */ "./build.definitions/ReporteDiarioMDK/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	reportediariomdk_actions_appupdate_action : reportediariomdk_actions_appupdate_action,
	reportediariomdk_actions_appupdatefailuremessage_action : reportediariomdk_actions_appupdatefailuremessage_action,
	reportediariomdk_actions_appupdateprogressbanner_action : reportediariomdk_actions_appupdateprogressbanner_action,
	reportediariomdk_actions_appupdatesuccessmessage_action : reportediariomdk_actions_appupdatesuccessmessage_action,
	reportediariomdk_actions_closemodalpage_cancel_action : reportediariomdk_actions_closemodalpage_cancel_action,
	reportediariomdk_actions_closemodalpage_complete_action : reportediariomdk_actions_closemodalpage_complete_action,
	reportediariomdk_actions_closepage_action : reportediariomdk_actions_closepage_action,
	reportediariomdk_actions_createentityfailuremessage_action : reportediariomdk_actions_createentityfailuremessage_action,
	reportediariomdk_actions_createentitysuccessmessage_action : reportediariomdk_actions_createentitysuccessmessage_action,
	reportediariomdk_actions_deleteconfirmation_action : reportediariomdk_actions_deleteconfirmation_action,
	reportediariomdk_actions_deleteentityfailuremessage_action : reportediariomdk_actions_deleteentityfailuremessage_action,
	reportediariomdk_actions_deleteentitysuccessmessage_action : reportediariomdk_actions_deleteentitysuccessmessage_action,
	reportediariomdk_actions_errorarchive_errorarchive_syncfailure_action : reportediariomdk_actions_errorarchive_errorarchive_syncfailure_action,
	reportediariomdk_actions_errorarchive_navtoerrorarchive_detail_action : reportediariomdk_actions_errorarchive_navtoerrorarchive_detail_action,
	reportediariomdk_actions_errorarchive_navtoerrorarchive_list_action : reportediariomdk_actions_errorarchive_navtoerrorarchive_list_action,
	reportediariomdk_actions_lineafaena_lineafaena_createentity_action : reportediariomdk_actions_lineafaena_lineafaena_createentity_action,
	reportediariomdk_actions_lineafaena_lineafaena_deleteentity_action : reportediariomdk_actions_lineafaena_lineafaena_deleteentity_action,
	reportediariomdk_actions_lineafaena_lineafaena_updateentity_action : reportediariomdk_actions_lineafaena_lineafaena_updateentity_action,
	reportediariomdk_actions_lineafaena_navtolineafaena_create_action : reportediariomdk_actions_lineafaena_navtolineafaena_create_action,
	reportediariomdk_actions_lineafaena_navtolineafaena_detail_action : reportediariomdk_actions_lineafaena_navtolineafaena_detail_action,
	reportediariomdk_actions_lineafaena_navtolineafaena_edit_action : reportediariomdk_actions_lineafaena_navtolineafaena_edit_action,
	reportediariomdk_actions_lineafaena_navtolineafaena_list_action : reportediariomdk_actions_lineafaena_navtolineafaena_list_action,
	reportediariomdk_actions_logout_action : reportediariomdk_actions_logout_action,
	reportediariomdk_actions_logoutmessage_action : reportediariomdk_actions_logoutmessage_action,
	reportediariomdk_actions_maquina_maquina_createentity_action : reportediariomdk_actions_maquina_maquina_createentity_action,
	reportediariomdk_actions_maquina_maquina_deleteentity_action : reportediariomdk_actions_maquina_maquina_deleteentity_action,
	reportediariomdk_actions_maquina_maquina_updateentity_action : reportediariomdk_actions_maquina_maquina_updateentity_action,
	reportediariomdk_actions_maquina_navtomaquina_create_action : reportediariomdk_actions_maquina_navtomaquina_create_action,
	reportediariomdk_actions_maquina_navtomaquina_detail_action : reportediariomdk_actions_maquina_navtomaquina_detail_action,
	reportediariomdk_actions_maquina_navtomaquina_edit_action : reportediariomdk_actions_maquina_navtomaquina_edit_action,
	reportediariomdk_actions_maquina_navtomaquina_list_action : reportediariomdk_actions_maquina_navtomaquina_list_action,
	reportediariomdk_actions_onwillupdate_action : reportediariomdk_actions_onwillupdate_action,
	reportediariomdk_actions_parametro_navtoparametro_create_action : reportediariomdk_actions_parametro_navtoparametro_create_action,
	reportediariomdk_actions_parametro_navtoparametro_detail_action : reportediariomdk_actions_parametro_navtoparametro_detail_action,
	reportediariomdk_actions_parametro_navtoparametro_edit_action : reportediariomdk_actions_parametro_navtoparametro_edit_action,
	reportediariomdk_actions_parametro_navtoparametro_list_action : reportediariomdk_actions_parametro_navtoparametro_list_action,
	reportediariomdk_actions_parametro_parametro_createentity_action : reportediariomdk_actions_parametro_parametro_createentity_action,
	reportediariomdk_actions_parametro_parametro_deleteentity_action : reportediariomdk_actions_parametro_parametro_deleteentity_action,
	reportediariomdk_actions_parametro_parametro_updateentity_action : reportediariomdk_actions_parametro_parametro_updateentity_action,
	reportediariomdk_actions_predio_navtopredio_create_action : reportediariomdk_actions_predio_navtopredio_create_action,
	reportediariomdk_actions_predio_navtopredio_detail_action : reportediariomdk_actions_predio_navtopredio_detail_action,
	reportediariomdk_actions_predio_navtopredio_edit_action : reportediariomdk_actions_predio_navtopredio_edit_action,
	reportediariomdk_actions_predio_navtopredio_list_action : reportediariomdk_actions_predio_navtopredio_list_action,
	reportediariomdk_actions_predio_predio_createentity_action : reportediariomdk_actions_predio_predio_createentity_action,
	reportediariomdk_actions_predio_predio_deleteentity_action : reportediariomdk_actions_predio_predio_deleteentity_action,
	reportediariomdk_actions_predio_predio_updateentity_action : reportediariomdk_actions_predio_predio_updateentity_action,
	reportediariomdk_actions_service_closeoffline_action : reportediariomdk_actions_service_closeoffline_action,
	reportediariomdk_actions_service_closeofflinefailuremessage_action : reportediariomdk_actions_service_closeofflinefailuremessage_action,
	reportediariomdk_actions_service_closeofflinesuccessmessage_action : reportediariomdk_actions_service_closeofflinesuccessmessage_action,
	reportediariomdk_actions_service_downloadoffline_action : reportediariomdk_actions_service_downloadoffline_action,
	reportediariomdk_actions_service_downloadstartedmessage_action : reportediariomdk_actions_service_downloadstartedmessage_action,
	reportediariomdk_actions_service_initializeoffline_action : reportediariomdk_actions_service_initializeoffline_action,
	reportediariomdk_actions_service_initializeofflinefailuremessage_action : reportediariomdk_actions_service_initializeofflinefailuremessage_action,
	reportediariomdk_actions_service_initializeofflinesuccessmessage_action : reportediariomdk_actions_service_initializeofflinesuccessmessage_action,
	reportediariomdk_actions_service_syncfailuremessage_action : reportediariomdk_actions_service_syncfailuremessage_action,
	reportediariomdk_actions_service_syncstartedmessage_action : reportediariomdk_actions_service_syncstartedmessage_action,
	reportediariomdk_actions_service_syncsuccessmessage_action : reportediariomdk_actions_service_syncsuccessmessage_action,
	reportediariomdk_actions_service_uploadoffline_action : reportediariomdk_actions_service_uploadoffline_action,
	reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_create_action : reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_create_action,
	reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_detail_action : reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_detail_action,
	reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_edit_action : reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_edit_action,
	reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_list_action : reportediariomdk_actions_tipotiempoperdido_navtotipotiempoperdido_list_action,
	reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_createentity_action : reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_createentity_action,
	reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_deleteentity_action : reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_deleteentity_action,
	reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_updateentity_action : reportediariomdk_actions_tipotiempoperdido_tipotiempoperdido_updateentity_action,
	reportediariomdk_actions_turno_navtoturno_create_action : reportediariomdk_actions_turno_navtoturno_create_action,
	reportediariomdk_actions_turno_navtoturno_detail_action : reportediariomdk_actions_turno_navtoturno_detail_action,
	reportediariomdk_actions_turno_navtoturno_edit_action : reportediariomdk_actions_turno_navtoturno_edit_action,
	reportediariomdk_actions_turno_navtoturno_list_action : reportediariomdk_actions_turno_navtoturno_list_action,
	reportediariomdk_actions_turno_turno_createentity_action : reportediariomdk_actions_turno_turno_createentity_action,
	reportediariomdk_actions_turno_turno_deleteentity_action : reportediariomdk_actions_turno_turno_deleteentity_action,
	reportediariomdk_actions_turno_turno_updateentity_action : reportediariomdk_actions_turno_turno_updateentity_action,
	reportediariomdk_actions_updateentityfailuremessage_action : reportediariomdk_actions_updateentityfailuremessage_action,
	reportediariomdk_actions_updateentitysuccessmessage_action : reportediariomdk_actions_updateentitysuccessmessage_action,
	reportediariomdk_globals_appdefinition_version_global : reportediariomdk_globals_appdefinition_version_global,
	reportediariomdk_i18n_i18n_properties : reportediariomdk_i18n_i18n_properties,
	reportediariomdk_jsconfig_json : reportediariomdk_jsconfig_json,
	reportediariomdk_pages_errorarchive_errorarchive_detail_page : reportediariomdk_pages_errorarchive_errorarchive_detail_page,
	reportediariomdk_pages_errorarchive_errorarchive_list_page : reportediariomdk_pages_errorarchive_errorarchive_list_page,
	reportediariomdk_pages_inicial_page : reportediariomdk_pages_inicial_page,
	reportediariomdk_pages_lineafaena_lineafaena_create_page : reportediariomdk_pages_lineafaena_lineafaena_create_page,
	reportediariomdk_pages_lineafaena_lineafaena_detail_page : reportediariomdk_pages_lineafaena_lineafaena_detail_page,
	reportediariomdk_pages_lineafaena_lineafaena_edit_page : reportediariomdk_pages_lineafaena_lineafaena_edit_page,
	reportediariomdk_pages_lineafaena_lineafaena_list_page : reportediariomdk_pages_lineafaena_lineafaena_list_page,
	reportediariomdk_pages_main_page : reportediariomdk_pages_main_page,
	reportediariomdk_pages_mantenedores_page : reportediariomdk_pages_mantenedores_page,
	reportediariomdk_pages_maquina_maquina_create_page : reportediariomdk_pages_maquina_maquina_create_page,
	reportediariomdk_pages_maquina_maquina_detail_page : reportediariomdk_pages_maquina_maquina_detail_page,
	reportediariomdk_pages_maquina_maquina_edit_page : reportediariomdk_pages_maquina_maquina_edit_page,
	reportediariomdk_pages_maquina_maquina_list_page : reportediariomdk_pages_maquina_maquina_list_page,
	reportediariomdk_pages_parametro_parametro_create_page : reportediariomdk_pages_parametro_parametro_create_page,
	reportediariomdk_pages_parametro_parametro_detail_page : reportediariomdk_pages_parametro_parametro_detail_page,
	reportediariomdk_pages_parametro_parametro_edit_page : reportediariomdk_pages_parametro_parametro_edit_page,
	reportediariomdk_pages_parametro_parametro_list_page : reportediariomdk_pages_parametro_parametro_list_page,
	reportediariomdk_pages_predio_predio_create_page : reportediariomdk_pages_predio_predio_create_page,
	reportediariomdk_pages_predio_predio_detail_page : reportediariomdk_pages_predio_predio_detail_page,
	reportediariomdk_pages_predio_predio_edit_page : reportediariomdk_pages_predio_predio_edit_page,
	reportediariomdk_pages_predio_predio_list_page : reportediariomdk_pages_predio_predio_list_page,
	reportediariomdk_pages_reporte_diario_create_page : reportediariomdk_pages_reporte_diario_create_page,
	reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_create_page : reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_create_page,
	reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_detail_page : reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_detail_page,
	reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_edit_page : reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_edit_page,
	reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_list_page : reportediariomdk_pages_tipotiempoperdido_tipotiempoperdido_list_page,
	reportediariomdk_pages_turno_turno_create_page : reportediariomdk_pages_turno_turno_create_page,
	reportediariomdk_pages_turno_turno_detail_page : reportediariomdk_pages_turno_turno_detail_page,
	reportediariomdk_pages_turno_turno_edit_page : reportediariomdk_pages_turno_turno_edit_page,
	reportediariomdk_pages_turno_turno_list_page : reportediariomdk_pages_turno_turno_list_page,
	reportediariomdk_rules_appupdatefailure_js : reportediariomdk_rules_appupdatefailure_js,
	reportediariomdk_rules_appupdatesuccess_js : reportediariomdk_rules_appupdatesuccess_js,
	reportediariomdk_rules_errorarchive_errorarchive_checkforsyncerror_js : reportediariomdk_rules_errorarchive_errorarchive_checkforsyncerror_js,
	reportediariomdk_rules_lineafaena_lineafaena_deleteconfirmation_js : reportediariomdk_rules_lineafaena_lineafaena_deleteconfirmation_js,
	reportediariomdk_rules_maquina_maquina_deleteconfirmation_js : reportediariomdk_rules_maquina_maquina_deleteconfirmation_js,
	reportediariomdk_rules_onwillupdate_js : reportediariomdk_rules_onwillupdate_js,
	reportediariomdk_rules_parametro_parametro_deleteconfirmation_js : reportediariomdk_rules_parametro_parametro_deleteconfirmation_js,
	reportediariomdk_rules_predio_predio_deleteconfirmation_js : reportediariomdk_rules_predio_predio_deleteconfirmation_js,
	reportediariomdk_rules_resetappsettingsandlogout_js : reportediariomdk_rules_resetappsettingsandlogout_js,
	reportediariomdk_rules_tipotiempoperdido_tipotiempoperdido_deleteconfirmation_js : reportediariomdk_rules_tipotiempoperdido_tipotiempoperdido_deleteconfirmation_js,
	reportediariomdk_rules_turno_turno_deleteconfirmation_js : reportediariomdk_rules_turno_turno_deleteconfirmation_js,
	reportediariomdk_services_reportediariomdk_service : reportediariomdk_services_reportediariomdk_service,
	reportediariomdk_styles_styles_css : reportediariomdk_styles_styles_css,
	reportediariomdk_styles_styles_json : reportediariomdk_styles_styles_json,
	reportediariomdk_styles_styles_less : reportediariomdk_styles_styles_less,
	reportediariomdk_styles_styles_nss : reportediariomdk_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/Styles/Styles.json":
/*!***************************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/Styles/Styles.json ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/ReporteDiarioMDK/jsconfig.json":
/*!**********************************************************!*\
  !*** ./build.definitions/ReporteDiarioMDK/jsconfig.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});