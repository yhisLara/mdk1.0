/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function OnWillUpdate(clientAPI) {
    setInterval(function() { clientAPI.executeAction('/ReporteDiarioMDK/Actions/Service/UploadOffline.action'); }, 6000);
    return clientAPI.executeAction('/ReporteDiarioMDK/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/ReporteDiarioMDK/Actions/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}