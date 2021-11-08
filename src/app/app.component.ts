import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from "./services/data/data.service";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {

	badge: number = null

	public appPages = [
		{
			title: 'Inicio',
			url: '/home',
			icon: 'home'
		},
		{
			title: 'Mis encuestas',
			url: '/misencuestas',
			icon: 'folder',
			badge: true
		},
		{
			title: 'Configuración',
			url: '/configuracion',
			icon: 'settings'
		}
	];

	constructor(
		private platform: Platform, 
		public alertCtrl: AlertController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private data: DataService
	) {
		// Badge
		this.data.gioEncuestasTotales.subscribe(data => {

			try {
				let encuestas = JSON.parse(data)
				this.badge = Object.keys(encuestas).length
			} catch (error) {
				this.badge = Object.keys(data).length
			}
			
		})



		this.initializeApp();
		this.comprobarSiURLExiste();
	}



	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}




	comprobarSiURLExiste(){
		let url = this.data.getURL();
		console.log("urlServer", url);

		if(!url) {
			this.cambiarUsuario();
		}
	}




	async cambiarUsuario() {
		let prompt = await this.alertCtrl.create({
			header: 'Hace falta una URL de API de configuración.',
			message: "Ingrese una URL para conectar con la API, si no la conoce, solicitela al administrador.",
			inputs: [
				{
					name: 'urlGuardada',
					placeholder: 'http://afondoencuestas.aplicaciones.io'
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Guardar',
					handler: data => {
						this.data.setURL(data.urlGuardada)
					}
				}
			]
		});
		await prompt.present();
	}
}
