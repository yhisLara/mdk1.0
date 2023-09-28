{
	"MainPage": "/ReporteDiarioMDK/Pages/Inicial.page",
	"OnLaunch": [
		"/ReporteDiarioMDK/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/ReporteDiarioMDK/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/ReporteDiarioMDK/Actions/Service/InitializeOffline.action",
	"Styles": "/ReporteDiarioMDK/Styles/Styles.less",
	"Version": "/ReporteDiarioMDK/Globals/AppDefinition_Version.global",
	"Localization": "/ReporteDiarioMDK/i18n/i18n.properties",
	"_SchemaVersion": "23.8",
	"_Name": "ReporteDiarioMDK"
}