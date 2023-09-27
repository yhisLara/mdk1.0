{
	"_Name": "ReporteDiarioMDK",
	"Version": "/ReporteDiarioMDK/Globals/AppDefinition_Version.global",
	"MainPage": "/ReporteDiarioMDK/Pages/Main.page",
	"OnLaunch": [
		"/ReporteDiarioMDK/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/ReporteDiarioMDK/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/ReporteDiarioMDK/Actions/Service/InitializeOffline.action",
	"Styles": "/ReporteDiarioMDK/Styles/Styles.less",
	"Localization": "/ReporteDiarioMDK/i18n/i18n.properties",
	"_SchemaVersion": "23.8"
}