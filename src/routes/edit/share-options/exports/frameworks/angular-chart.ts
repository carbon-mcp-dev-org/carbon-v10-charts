// Used to map chart types to corresponding angular tag.
const chartTagMap: Record<string, string> = {
	'simple-bar-chart': 'ibm-simple-bar-chart',
	'grouped-bar-chart': 'ibm-grouped-bar-chart',
	'stacked-bar-chart': 'ibm-stacked-bar-Chart',
	'line-chart': 'ibm-line-chart',
	'area-chart': 'ibm-area-chart',
	'stacked-area-chart': 'ibm-stacked-area-chart',
	'scatter-chart': 'ibm-scatter-chart',
	'pie-chart': 'ibm-pie-chart',
	'donut-chart': 'ibm-donut-chart'
};

export const createAngularChartApp = (chart: any) => {
	const chartData = JSON.stringify(chart.data, null, '\t');
	const chartType = `${chart.type}`;
	let chartOptions = '';
	let theme;
	if (chart && chart.options && chart.options.rawChartOptions) {
		// eslint-disable-next-line prefer-destructuring
		theme = chart.options.rawChartOptions.theme;
		chartOptions = JSON.stringify(chart.options.rawChartOptions, null, '\t');
	}

	let chartTheme = '@carbon/charts-angular/styles.css';
	if (theme && theme !== 'default') {
		chartTheme = `@carbon/charts-angular/styles-${theme}.css`;
	}

	const appComponentHtml
= `<${chartTagMap[chartType]} [data]='data' [options]='options'></${chartTagMap[chartType]}>
`;
	const appComponentTs
= `import { Component } from '@angular/core';
import '${chartTheme}';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	data = ${chartData};
	options = ${chartOptions};
}
`;
	const appModule
= `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from '@carbon/charts-angular';
import { AppComponent } from './app.component';
@NgModule({
	imports: [BrowserModule, ChartsModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
`;

	const indexHtml
= `<!DOCTYPE html>
<html lang='en'>
	<head>
		<meta charset='utf-8' />
		<title>Angular</title>
	</head>
	<body>
		<app-root></app-root>
	</body>
</html>
`;

	const mainTs
= `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.log(err));
`;

	const angularCliJson
= `{
	"apps": [
		{
			"root": "src",
			"outDir": "dist",
			"assets": ["assets", "favicon.ico"],
			"index": "index.html",
			"main": "main.ts",
			"polyfills": "polyfills.ts",
			"prefix": "app",
			"styles": ["styles.css"],
			"scripts": [],
			"environmentSource": "environments/environment.ts",
			"environments": {
				"dev": "environments/environment.ts",
				"prod": "environments/environment.prod.ts"
			}
		}
	]
}
`;

	const packageJson = {
		dependencies: {
			'@angular/animations': '^17.0.0',
			'@angular/common': '^17.0.0',
			'@angular/compiler': '^17.0.0',
			'@angular/core': '^17.0.0',
			'@angular/forms': '^17.0.0',
			'@angular/platform-browser': '^17.0.0',
			'@angular/platform-browser-dynamic': '^17.0.0',
			'@angular/router': '^17.0.0',
			'@carbon/charts': '^1.27.11',
			'@carbon/charts-angular': '^1.27.11',
			d3: '7.8.5',
			rxjs: '~7.8.0',
			'zone.js': '~0.14.0'
		}
	};

	return {
		'src/index.html': indexHtml,
		'src/main.ts': mainTs,
		'src/app/app.component.html': appComponentHtml,
		'src/app/app.component.ts': appComponentTs,
		'src/app/app.module.ts': appModule,
		'.angular-cli.json': angularCliJson,
		'package.json': packageJson
	};
};
